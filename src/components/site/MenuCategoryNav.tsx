import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import type { MenuCategory } from "@/config/menu";

type IndicatorGeometry = {
  left: number;
  width: number;
};

const INTERRUPT_KEYS = new Set(["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "]);

export function MenuCategoryNav({
  categories,
  offsetPx = 140,
}: {
  categories: readonly MenuCategory[];
  offsetPx?: number;
}) {
  const [active, setActive] = useState<string>(categories[0]?.id ?? "");
  const [indicator, setIndicator] = useState<IndicatorGeometry | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const navListRef = useRef<HTMLUListElement | null>(null);
  const itemRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());
  const didInitialScroll = useRef(false);
  const viewportFrameRef = useRef<number | null>(null);
  const viewportCleanupRef = useRef<(() => void) | null>(null);
  const isProgrammaticScroll = useRef(false);

  const updateIndicator = useCallback(() => {
    const item = itemRefs.current.get(active);
    const list = navListRef.current;
    if (!item || !list) return;

    const itemRect = item.getBoundingClientRect();
    const listRect = list.getBoundingClientRect();
    setIndicator({
      left: itemRect.left - listRect.left,
      width: itemRect.width,
    });
  }, [active]);

  const cancelViewportAnimation = useCallback(() => {
    if (viewportFrameRef.current !== null) {
      window.cancelAnimationFrame(viewportFrameRef.current);
      viewportFrameRef.current = null;
    }
    viewportCleanupRef.current?.();
    viewportCleanupRef.current = null;
    isProgrammaticScroll.current = false;
  }, []);

  const animateViewportTo = useCallback(
    (targetTop: number, id: string) => {
      cancelViewportAnimation();

      const hash = `#${id}`;
      const commitHash = () => {
        if (window.location.hash !== hash) {
          window.history.pushState(null, "", hash);
        }
      };
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduced) {
        window.scrollTo({ top: targetTop, behavior: "auto" });
        setActive(id);
        commitHash();
        return;
      }

      const startTop = window.scrollY;
      const distance = targetTop - startTop;
      if (Math.abs(distance) < 1) {
        setActive(id);
        commitHash();
        return;
      }

      const duration = Math.min(760, Math.max(440, Math.abs(distance) * 0.32));
      const startedAt = window.performance.now();
      isProgrammaticScroll.current = true;

      const removeInterruptListeners = () => {
        window.removeEventListener("wheel", cancelViewportAnimation);
        window.removeEventListener("touchstart", cancelViewportAnimation);
        window.removeEventListener("pointerdown", cancelViewportAnimation);
        window.removeEventListener("keydown", handleInterruptKey);
      };
      const handleInterruptKey = (event: KeyboardEvent) => {
        if (INTERRUPT_KEYS.has(event.key)) {
          cancelViewportAnimation();
        }
      };

      viewportCleanupRef.current = removeInterruptListeners;
      window.addEventListener("wheel", cancelViewportAnimation, { passive: true });
      window.addEventListener("touchstart", cancelViewportAnimation, { passive: true });
      window.addEventListener("pointerdown", cancelViewportAnimation, { passive: true });
      window.addEventListener("keydown", handleInterruptKey);

      const step = (now: number) => {
        const progress = Math.min((now - startedAt) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        window.scrollTo(0, startTop + distance * eased);

        if (progress < 1) {
          viewportFrameRef.current = window.requestAnimationFrame(step);
          return;
        }

        viewportFrameRef.current = null;
        removeInterruptListeners();
        viewportCleanupRef.current = null;
        isProgrammaticScroll.current = false;
        window.scrollTo({ top: targetTop, behavior: "auto" });
        setActive(id);
        commitHash();
      };

      viewportFrameRef.current = window.requestAnimationFrame(step);
    },
    [cancelViewportAnimation],
  );

  const handleCategoryClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>, id: string) => {
      event.preventDefault();
      const target = document.getElementById(id);
      if (!target) return;

      setActive(id);
      const top = target.getBoundingClientRect().top + window.scrollY - offsetPx;
      animateViewportTo(Math.max(top, 0), id);
    },
    [animateViewportTo, offsetPx],
  );

  useEffect(() => cancelViewportAnimation, [cancelViewportAnimation]);

  useEffect(() => {
    const ids = categories.map((c) => c.id);
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (els.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (isProgrammaticScroll.current) return;

        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]?.target.id) {
          setActive(visible[0].target.id);
        }
      },
      {
        rootMargin: `-${offsetPx + 20}px 0px -60% 0px`,
        threshold: 0,
      },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [categories, offsetPx]);

  useEffect(() => {
    if (!didInitialScroll.current) {
      didInitialScroll.current = true;
      return;
    }
    const el = itemRefs.current.get(active);
    const container = listRef.current;
    if (!el || !container) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const elRect = el.getBoundingClientRect();
    const cRect = container.getBoundingClientRect();
    const target =
      container.scrollLeft + (elRect.left - cRect.left) - cRect.width / 2 + elRect.width / 2;
    container.scrollTo({
      left: Math.max(target, 0),
      behavior: reduced ? "auto" : "smooth",
    });
  }, [active]);

  useEffect(() => {
    let frame = window.requestAnimationFrame(updateIndicator);
    const list = navListRef.current;
    const item = itemRefs.current.get(active);
    const observer =
      typeof ResizeObserver !== "undefined" ? new ResizeObserver(updateIndicator) : null;

    if (list) observer?.observe(list);
    if (item) observer?.observe(item);
    window.addEventListener("resize", updateIndicator);

    void document.fonts?.ready.then(() => {
      frame = window.requestAnimationFrame(updateIndicator);
    });

    return () => {
      window.cancelAnimationFrame(frame);
      observer?.disconnect();
      window.removeEventListener("resize", updateIndicator);
    };
  }, [active, updateIndicator]);

  return (
    <div className="sticky top-16 z-30 md:top-20">
      <div className="relative border-y border-border bg-background/95 backdrop-blur">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-6 bg-gradient-to-r from-background to-transparent md:hidden"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-6 bg-gradient-to-l from-background to-transparent md:hidden"
        />
        <div
          ref={listRef}
          className="overflow-x-auto overflow-y-hidden overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ scrollPaddingInline: "1.25rem" }}
        >
          <nav aria-label="Categorie del menu">
            <ul
              ref={navListRef}
              className="relative flex w-max gap-6 px-5 py-1 md:mx-auto md:max-w-6xl md:gap-8 md:px-8"
            >
              {categories.map((c) => {
                const isActive = c.id === active;
                return (
                  <li key={c.id} className="shrink-0">
                    <a
                      ref={(node: HTMLAnchorElement | null) => {
                        if (node) itemRefs.current.set(c.id, node);
                        else itemRefs.current.delete(c.id);
                      }}
                      href={`#${c.id}`}
                      onClick={(event: MouseEvent<HTMLAnchorElement>) =>
                        handleCategoryClick(event, c.id)
                      }
                      aria-current={isActive ? "true" : undefined}
                      className={`inline-flex min-h-11 items-center whitespace-nowrap text-sm transition-colors duration-300 ${
                        isActive
                          ? "text-terracotta-ink"
                          : "text-foreground/70 hover:text-terracotta-ink"
                      }`}
                    >
                      {c.label}
                    </a>
                  </li>
                );
              })}
              <li
                aria-hidden="true"
                role="presentation"
                className={`pointer-events-none absolute bottom-1 left-0 h-0.5 rounded-full bg-terracotta transition-[width,transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                  indicator ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  width: indicator?.width ?? 0,
                  transform: `translateX(${indicator?.left ?? 0}px)`,
                }}
              />
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
