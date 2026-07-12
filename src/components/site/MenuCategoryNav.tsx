import { useEffect, useRef, useState } from "react";
import type { MenuCategory } from "@/config/menu";

// Sticky category selector: horizontally scrollable on mobile without
// causing page-level overflow. Uses IntersectionObserver to track the
// currently visible category.
export function MenuCategoryNav({
  categories,
  offsetPx = 96,
}: {
  categories: readonly MenuCategory[];
  offsetPx?: number;
}) {
  const [active, setActive] = useState<string>(categories[0]?.id ?? "");
  const listRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());
  const didInitialScroll = useRef(false);

  useEffect(() => {
    const ids = categories.map((c) => c.id);
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (els.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to the top that is intersecting.
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

  // Keep the active category visible inside the horizontally-scrollable
  // bar. Skip the very first run so we do not scroll the page on mount.
  useEffect(() => {
    if (!didInitialScroll.current) {
      didInitialScroll.current = true;
      return;
    }
    const el = itemRefs.current.get(active);
    const container = listRef.current;
    if (!el || !container) return;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const elRect = el.getBoundingClientRect();
    const cRect = container.getBoundingClientRect();
    const target =
      container.scrollLeft +
      (elRect.left - cRect.left) -
      cRect.width / 2 +
      elRect.width / 2;
    container.scrollTo({
      left: Math.max(target, 0),
      behavior: reduced ? "auto" : "smooth",
    });
  }, [active]);

  const handleClick = (id: string) => (e: React.MouseEvent) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    const top = el.getBoundingClientRect().top + window.scrollY - offsetPx;
    window.scrollTo({
      top: Math.max(top, 0),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  };

  return (
    <div className="sticky top-16 z-30 md:top-20">
      <div className="relative border-y border-border bg-background/95 backdrop-blur">
        {/* Edge fades — hint at scrollability without covering text */}
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
            <ul className="flex w-max gap-6 px-5 py-3.5 md:mx-auto md:max-w-6xl md:gap-8 md:px-8">
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
                      onClick={handleClick(c.id)}
                      aria-current={isActive ? "true" : undefined}
                      className={`inline-block whitespace-nowrap border-b-2 pb-1 text-sm transition-colors ${
                        isActive
                          ? "border-terracotta text-terracotta"
                          : "border-transparent text-foreground/70 hover:text-terracotta"
                      }`}
                    >
                      {c.label}
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