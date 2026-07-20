import { useEffect, useRef, type MutableRefObject, type RefObject } from "react";

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "area[href]",
  "button:not([disabled])",
  "input:not([disabled]):not([type='hidden'])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "iframe",
  "details > summary:first-of-type",
  "[contenteditable='true']",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

type BackgroundState = {
  count: number;
  inertAttribute: string | null;
  ariaHiddenAttribute: string | null;
};

const backgroundStates = new Map<HTMLElement, BackgroundState>();
const activeModalTokens: symbol[] = [];
let bodyScrollLockCount = 0;
let bodyOverflowBeforeLock = "";

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
  ).filter((element) => {
    if (!element.isConnected || element.closest("[inert]")) return false;
    if (element.closest('[aria-hidden="true"]')) return false;

    const style = window.getComputedStyle(element);
    return (
      style.display !== "none" &&
      style.visibility !== "hidden" &&
      element.getClientRects().length > 0
    );
  });
}

function setBackgroundInert(modal: HTMLElement): () => void {
  const affectedElements = new Set<HTMLElement>();
  let current: HTMLElement = modal;

  while (current !== document.body) {
    const parent = current.parentElement;
    if (!parent) break;

    for (const sibling of parent.children) {
      if (sibling !== current && sibling instanceof HTMLElement) {
        affectedElements.add(sibling);
      }
    }

    current = parent;
  }

  for (const element of affectedElements) {
    const existingState = backgroundStates.get(element);
    if (existingState) {
      existingState.count += 1;
      continue;
    }

    backgroundStates.set(element, {
      count: 1,
      inertAttribute: element.getAttribute("inert"),
      ariaHiddenAttribute: element.getAttribute("aria-hidden"),
    });
    element.inert = true;
    element.setAttribute("aria-hidden", "true");
  }

  return () => {
    for (const element of affectedElements) {
      const state = backgroundStates.get(element);
      if (!state) continue;

      state.count -= 1;
      if (state.count > 0) continue;

      if (state.inertAttribute === null) {
        element.removeAttribute("inert");
      } else {
        element.setAttribute("inert", state.inertAttribute);
      }

      if (state.ariaHiddenAttribute === null) {
        element.removeAttribute("aria-hidden");
      } else {
        element.setAttribute("aria-hidden", state.ariaHiddenAttribute);
      }

      backgroundStates.delete(element);
    }
  };
}

function lockBodyScroll(): () => void {
  if (bodyScrollLockCount === 0) {
    bodyOverflowBeforeLock = document.body.style.overflow;
    document.body.style.overflow = "hidden";
  }
  bodyScrollLockCount += 1;

  return () => {
    bodyScrollLockCount = Math.max(0, bodyScrollLockCount - 1);
    if (bodyScrollLockCount === 0) {
      document.body.style.overflow = bodyOverflowBeforeLock;
    }
  };
}

function canRestoreFocus(element: HTMLElement): boolean {
  if (!element.isConnected || element.closest("[inert]")) return false;
  if (element.closest('[aria-hidden="true"]')) return false;

  const style = window.getComputedStyle(element);
  return (
    style.display !== "none" &&
    style.visibility !== "hidden" &&
    element.getClientRects().length > 0
  );
}

type UseModalAccessibilityOptions = {
  open: boolean;
  modalRef: RefObject<HTMLElement | null>;
  initialFocusRef: RefObject<HTMLElement | null>;
  returnFocusElement: HTMLElement | null;
  restoreFocusRef?: MutableRefObject<boolean>;
  onEscape: () => void;
  onKeyDown?: (event: KeyboardEvent) => void;
};

export function useModalAccessibility({
  open,
  modalRef,
  initialFocusRef,
  returnFocusElement,
  restoreFocusRef,
  onEscape,
  onKeyDown,
}: UseModalAccessibilityOptions) {
  const onEscapeRef = useRef(onEscape);
  const onKeyDownRef = useRef(onKeyDown);

  useEffect(() => {
    onEscapeRef.current = onEscape;
    onKeyDownRef.current = onKeyDown;
  }, [onEscape, onKeyDown]);

  useEffect(() => {
    if (!open) return;

    const modal = modalRef.current;
    if (!modal) return;

    const token = Symbol("modal");
    activeModalTokens.push(token);

    const initialFocus =
      initialFocusRef.current ?? getFocusableElements(modal)[0] ?? modal;
    initialFocus.focus({ preventScroll: true });

    const restoreBackground = setBackgroundInert(modal);
    const unlockBodyScroll = lockBodyScroll();

    const isTopModal = () => activeModalTokens.at(-1) === token;

    const focusInsideModal = (preferLast = false) => {
      const focusable = getFocusableElements(modal);
      const target = preferLast ? focusable.at(-1) : focusable[0];
      (target ?? modal).focus({ preventScroll: true });
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isTopModal()) return;

      if (event.key === "Escape") {
        event.preventDefault();
        onEscapeRef.current();
        return;
      }

      if (event.key === "Tab") {
        const focusable = getFocusableElements(modal);
        if (focusable.length === 0) {
          event.preventDefault();
          modal.focus({ preventScroll: true });
          return;
        }

        const activeElement = document.activeElement;
        const activeIndex =
          activeElement instanceof HTMLElement
            ? focusable.indexOf(activeElement)
            : -1;

        if (activeIndex === -1) {
          event.preventDefault();
          focusInsideModal(event.shiftKey);
        } else if (event.shiftKey && activeIndex === 0) {
          event.preventDefault();
          focusable.at(-1)?.focus({ preventScroll: true });
        } else if (!event.shiftKey && activeIndex === focusable.length - 1) {
          event.preventDefault();
          focusable[0]?.focus({ preventScroll: true });
        }
        return;
      }

      onKeyDownRef.current?.(event);
    };

    const handleFocusIn = (event: FocusEvent) => {
      if (!isTopModal()) return;
      if (event.target instanceof Node && modal.contains(event.target)) return;
      focusInsideModal();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("focusin", handleFocusIn);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("focusin", handleFocusIn);

      const tokenIndex = activeModalTokens.lastIndexOf(token);
      if (tokenIndex >= 0) activeModalTokens.splice(tokenIndex, 1);

      restoreBackground();
      unlockBodyScroll();

      const shouldRestoreFocus = restoreFocusRef?.current ?? true;
      if (restoreFocusRef) restoreFocusRef.current = false;

      if (
        shouldRestoreFocus &&
        returnFocusElement &&
        canRestoreFocus(returnFocusElement)
      ) {
        returnFocusElement.focus({ preventScroll: true });
      } else {
        const activeElement = document.activeElement;
        if (
          activeElement instanceof HTMLElement &&
          modal.contains(activeElement)
        ) {
          activeElement.blur();
        }
      }
    };
  }, [initialFocusRef, modalRef, open, restoreFocusRef, returnFocusElement]);
}
