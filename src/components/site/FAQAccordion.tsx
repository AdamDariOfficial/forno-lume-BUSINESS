import { useState } from "react";
import { ChevronDown } from "lucide-react";

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
          <li key={f.q}>
            <button
              id={btnId}
              type="button"
              onClick={() => setOpenIndex(open ? null : i)}
              aria-expanded={open}
              aria-controls={panelId}
              className="flex w-full cursor-pointer items-center justify-between gap-6 py-6 text-left transition-colors hover:text-terracotta"
            >
              <span className="font-display text-lg md:text-xl">{f.q}</span>
              <span
                aria-hidden
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-terracotta transition-all duration-300 ${
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
              className={`grid overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                open
                  ? "grid-rows-[1fr] pb-6 opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="min-h-0">
                <p className="max-w-2xl text-[15px] text-muted-foreground">
                  {f.a}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}