import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Reveal } from "./Reveal";

// Single-open accordion. Same visual + a11y contract as the START version.
export function FAQAccordion({
  items,
  initialOpen = 0,
}: {
  items: readonly { q: string; a: string }[];
  initialOpen?: number | null;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(initialOpen);
  return (
    <ul className="divide-y divide-border">
      {items.map((f, i) => {
        const open = openIndex === i;
        const panelId = `faq-panel-${i}`;
        const btnId = `faq-btn-${i}`;
        return (
          <Reveal as="li" key={f.q} delay={Math.min(i * 70, 280)}>
            <button
              id={btnId}
              type="button"
              onClick={() => setOpenIndex(open ? null : i)}
              aria-expanded={open}
              aria-controls={panelId}
              className="flex w-full cursor-pointer items-center justify-between gap-6 py-6 text-left transition-colors hover:text-terracotta-ink"
            >
              <span className="font-display text-lg md:text-xl">{f.q}</span>
              <span
                aria-hidden
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-terracotta transition-[transform,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                  open ? "rotate-180 bg-terracotta/10" : "rotate-0"
                }`}
              >
                <ChevronDown className="h-4 w-4" />
              </span>
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                open
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="min-h-0 pb-6">
                <p className="max-w-2xl text-[15px] text-muted-foreground">
                  {f.a}
                </p>
              </div>
            </div>
          </Reveal>
        );
      })}
    </ul>
  );
}
