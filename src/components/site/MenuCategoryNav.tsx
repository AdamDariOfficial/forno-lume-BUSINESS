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
    <div className="sticky top-16 z-30 -mx-5 md:top-20 md:mx-0">
      <div className="border-y border-border bg-background/95 backdrop-blur">
        <div
          ref={listRef}
          className="container-page overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <nav aria-label="Categorie del menu">
            <ul className="flex min-w-max gap-6 py-3.5 md:gap-8">
              {categories.map((c) => {
                const isActive = c.id === active;
                return (
                  <li key={c.id}>
                    <a
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