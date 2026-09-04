import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import type { MenuCategory } from "@/config/menu";

const INTERRUPT_KEYS = new Set(["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "]);

const smoothStep = (progress: number) => 1 - Math.pow(1 - progress, 3);

export function MenuCategoryNav({
  categories,
  offsetPx = 140,
}: {
  categories: readonly MenuCategory[];
  offsetPx?: number;
}) {
  const [active, setActive] = useState<string>(categories[0]?.id ?? "");
  const listRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());
  const rafRef = useRef<number | null>(null);
  const scrollAnimationRef = useRef<number | null>(null);
  const pendingTargetRef = useRef<string | null>(null);

  const getSections = useCallback(
    () =>
      categories
        .map((category) => document.getElementById(category.id))
        .filter((section): section is HTMLElement => section !== null),
    [categories],
  );

  const targetScrollTop = useCallback(
    (target: HTMLElement) =>
      Math.max(target.getBoundingClientRect().top + window.scrollY - offsetPx, 0),
    [offsetPx],
  );

  const cancelScrollAnimation = useCallback(() => {
    if (scrollAnimationRef.current !== null) {
      window.cancelAnimationFrame(scrollAnimationRef.current);
      scrollAnimationRef.current = null;
    }
  }, []);

  const animateScrollTo = useCallback(
    (targetTop: number) => {
      cancelScrollAnimation();

      const startTop = window.scrollY;
      const distance = targetTop - startTop;
      if (Math.abs(distance) <= 2) {
        window.scrollTo({ top: targetTop, behavior: "auto" });
        return;
      }

      const duration = Math.min(700, Math.max(420, Math.abs(distance) * 0.35));
      let startedAt: number | null = null;

      const step = (timestamp: number) => {
        if (startedAt === null) startedAt = timestamp;
        const progress = Math.min((timestamp - startedAt) / duration, 1);
        window.scrollTo({ top: startTop + distance * smoothStep(progress), behavior: "auto" });

        if (progress < 1) {
          scrollAnimationRef.current = window.requestAnimationFrame(step);
        } else {
          scrollAnimationRef.current = null;
        }
      };

      scrollAnimationRef.current = window.requestAnimationFrame(step);
    },
    [cancelScrollAnimation],
  );

  const computeActive = useCallback(() => {
    rafRef.current = null;
    const sections = getSections();
    if (sections.length === 0) return;

    const pendingId = pendingTargetRef.current;
    if (pendingId) {
      const pendingTarget = document.getElementById(pendingId);
      if (pendingTarget) {
        const desiredTop = targetScrollTop(pendingTarget);
        const nearTarget = Math.abs(window.scrollY - desiredTop) <= 2;
        const nearBottom =
          window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
        const isLast = pendingId === sections.at(-1)?.id;

        if (!nearTarget && !(nearBottom && isLast)) {
          setActive((current) => (current === pendingId ? current : pendingId));
          return;
        }
      }
      pendingTargetRef.current = null;
    }

    const activationY = window.scrollY + offsetPx + 24;
    let next = sections[0].id;

    for (const section of sections) {
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      if (sectionTop <= activationY) next = section.id;
      else break;
    }

    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
      next = sections.at(-1)?.id ?? next;
    }

    setActive((current) => (current === next ? current : next));
  }, [getSections, offsetPx, targetScrollTop]);

  const requestActiveUpdate = useCallback(() => {
    if (rafRef.current !== null) return;
    rafRef.current = window.requestAnimationFrame(computeActive);
  }, [computeActive]);

  const clearPendingTarget = useCallback(() => {
    pendingTargetRef.current = null;
    cancelScrollAnimation();
  }, [cancelScrollAnimation]);

  const handleInterruptKey = useCallback(
    (event: KeyboardEvent) => {
      if (INTERRUPT_KEYS.has(event.key)) clearPendingTarget();
    },
    [clearPendingTarget],
  );

  const scrollToCategory = useCallback(
    (id: string) => {
      const target = document.getElementById(id);
      if (!target) return;

      cancelScrollAnimation();
      window.scrollTo({ top: targetScrollTop(target), behavior: "auto" });
    },
    [cancelScrollAnimation, targetScrollTop],
  );

  const handleCategoryClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>, id: string) => {
      event.preventDefault();
      const target = document.getElementById(id);
      if (!target) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      pendingTargetRef.current = id;
      setActive(id);

      if (window.location.hash !== `#${id}`) {
        window.history.pushState(null, "", `#${id}`);
      }

      const targetTop = targetScrollTop(target);
      if (reduced) {
        cancelScrollAnimation();
        window.scrollTo({ top: targetTop, behavior: "auto" });
      } else {
        animateScrollTo(targetTop);
      }
    },
    [animateScrollTo, cancelScrollAnimation, targetScrollTop],
  );

  useEffect(() => {
    computeActive();
    window.addEventListener("scroll", requestActiveUpdate, { passive: true });
    window.addEventListener("resize", requestActiveUpdate);
    window.addEventListener("wheel", clearPendingTarget, { passive: true });
    window.addEventListener("touchstart", clearPendingTarget, { passive: true });
    window.addEventListener("pointerdown", clearPendingTarget, { passive: true });
    window.addEventListener("keydown", handleInterruptKey);

    return () => {
      window.removeEventListener("scroll", requestActiveUpdate);
      window.removeEventListener("resize", requestActiveUpdate);
      window.removeEventListener("wheel", clearPendingTarget);
      window.removeEventListener("touchstart", clearPendingTarget);
      window.removeEventListener("pointerdown", clearPendingTarget);
      window.removeEventListener("keydown", handleInterruptKey);
      if (rafRef.current !== null) window.cancelAnimationFrame(rafRef.current);
      cancelScrollAnimation();
    };
  }, [cancelScrollAnimation, clearPendingTarget, computeActive, handleInterruptKey, requestActiveUpdate]);

  useEffect(() => {
    const syncFromLocation = () => {
      const hashId = decodeURIComponent(window.location.hash.replace(/^#/, ""));
      if (!hashId || !categories.some((category) => category.id === hashId)) {
        pendingTargetRef.current = null;
        cancelScrollAnimation();
        requestActiveUpdate();
        return;
      }

      pendingTargetRef.current = null;
      setActive(hashId);
      window.requestAnimationFrame(() => scrollToCategory(hashId));
    };

    let innerInitialFrame: number | null = null;
    const initialFrame = window.requestAnimationFrame(() => {
      innerInitialFrame = window.requestAnimationFrame(syncFromLocation);
    });

    window.addEventListener("popstate", syncFromLocation);
    window.addEventListener("hashchange", syncFromLocation);
    return () => {
      window.cancelAnimationFrame(initialFrame);
      if (innerInitialFrame !== null) window.cancelAnimationFrame(innerInitialFrame);
      window.removeEventListener("popstate", syncFromLocation);
      window.removeEventListener("hashchange", syncFromLocation);
    };
  }, [cancelScrollAnimation, categories, requestActiveUpdate, scrollToCategory]);

  useEffect(() => {
    const item = itemRefs.current.get(active);
    const container = listRef.current;
    if (!item || !container || container.scrollWidth <= container.clientWidth + 1) return;

    const itemRect = item.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const target =
      container.scrollLeft +
      (itemRect.left - containerRect.left) -
      containerRect.width / 2 +
      itemRect.width / 2;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    container.scrollTo({
      left: Math.max(target, 0),
      behavior: reduced || pendingTargetRef.current === null ? "auto" : "smooth",
    });
  }, [active]);

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
            <ul className="flex w-max gap-6 px-5 py-1 md:mx-auto md:max-w-6xl md:gap-8 md:px-8">
              {categories.map((category) => {
                const isActive = category.id === active;
                return (
                  <li key={category.id} className="shrink-0">
                    <a
                      ref={(node: HTMLAnchorElement | null) => {
                        if (node) itemRefs.current.set(category.id, node);
                        else itemRefs.current.delete(category.id);
                      }}
                      href={`#${category.id}`}
                      onClick={(event: MouseEvent<HTMLAnchorElement>) => handleCategoryClick(event, category.id)}
                      aria-current={isActive ? "true" : undefined}
                      className={`relative inline-flex min-h-11 items-center whitespace-nowrap text-sm transition-colors duration-200 ${
                        isActive
                          ? "text-terracotta-ink"
                          : "text-foreground/70 hover:text-terracotta-ink"
                      }`}
                    >
                      {category.label}
                      <span
                        aria-hidden
                        className={`pointer-events-none absolute inset-x-0 bottom-1 h-0.5 origin-center rounded-full bg-terracotta transition-[opacity,transform] duration-200 motion-reduce:transition-none ${
                          isActive ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
                        }`}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
