import { menuTagLabels, type MenuCategory, type MenuTag } from "@/config/menu";
import { Reveal } from "./Reveal";

// Editorial menu category rendered as a two-column list on desktop.
// Tags always include a text label; icons/glyphs never carry meaning alone.
export function MenuCategorySection({ category }: { category: MenuCategory }) {
  return (
    <section
      id={category.id}
      aria-labelledby={`${category.id}-title`}
      className="menu-category scroll-mt-28 py-14 md:py-20"
    >
      <div className="grid gap-8 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-4">
          <Reveal>
            <p className="eyebrow">Categoria</p>
          </Reveal>
          <Reveal delay={80} className="mt-4">
            <h2
              id={`${category.id}-title`}
              className="text-3xl font-medium leading-tight md:text-4xl"
            >
              {category.label}
            </h2>
          </Reveal>
          {category.intro && (
            <Reveal delay={160} className="mt-4">
              <p className="text-muted-foreground">{category.intro}</p>
            </Reveal>
          )}
        </div>
        <Reveal delay={160} className="md:col-span-8">
          <ul className="divide-y divide-border/70">
            {category.items.map((item) => (
              <li
                key={item.id}
                className="grid grid-cols-[1fr_auto] items-baseline gap-4 py-5 md:gap-8"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <p className="font-display text-xl leading-tight">
                      {item.name}
                    </p>
                    {item.tags && item.tags.length > 0 && (
                      <TagList tags={item.tags} />
                    )}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.desc}
                  </p>
                </div>
                <span
                  aria-label={`Prezzo ${item.price} euro`}
                  className="shrink-0 font-display text-lg text-terracotta-ink"
                >
                  €{item.price}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

function TagList({ tags }: { tags: MenuTag[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Caratteristiche del piatto">
      {tags.map((t) => (
        <li
          key={t}
          className="inline-flex items-center rounded-full border border-border bg-secondary/50 px-2 py-0.5 text-[11px] uppercase tracking-wider text-foreground/70"
        >
          {menuTagLabels[t]}
        </li>
      ))}
    </ul>
  );
}

// Compact preview used on the homepage — single column, no category header.
export function MenuPreviewList({
  items,
}: {
  items: readonly import("@/config/menu").MenuItem[];
}) {
  return (
    <ul className="divide-y divide-border/70">
      {items.map((item) => (
        <li
          key={item.id}
          className="grid grid-cols-[1fr_auto] items-baseline gap-4 py-5"
        >
          <div className="min-w-0">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <p className="font-display text-xl leading-tight">{item.name}</p>
              {item.tags && item.tags.length > 0 && <TagList tags={item.tags} />}
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
          </div>
          <span
            aria-label={`Prezzo ${item.price} euro`}
            className="shrink-0 font-display text-lg text-terracotta-ink"
          >
            €{item.price}
          </span>
        </li>
      ))}
    </ul>
  );
}
