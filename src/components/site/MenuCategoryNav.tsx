import { useCallback, useEffect, useRef, useState } from "react";
import type { MenuCategory } from "@/config/menu";

type IndicatorGeometry = {
  left: number;
  width: number;
};

// Sticky category selector: horizontally scrollable on mobile without
// causing page-level overflow. Uses IntersectionObserver to track the
// currently visible category and a shared underline to animate state changes.
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

  useEffect(() => {
    const ids = categories.map((c) => c.id);
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (els.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
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
                      ref={(node) => {
                        if (node) itemRefs.current.set(c.id, node);
                        else itemRefs.current.delete(c.id);
                      }}
                      href={`#${c.id}`}
                      onClick={() => setActive(c.id)}
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
