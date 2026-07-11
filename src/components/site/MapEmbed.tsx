import { ArrowUpRight } from "lucide-react";
import { site } from "@/config/site";

// Reusable responsive map embed with an accessible external-link fallback.
export function MapEmbed() {
  return (
    <div className="max-w-full overflow-hidden rounded-3xl border border-border shadow-[var(--shadow-soft)]">
      <div className="relative min-w-0 max-w-full overflow-hidden">
        <div className="relative min-h-[280px] min-w-0 max-w-full overflow-hidden sm:aspect-[16/10] md:aspect-[5/4] md:min-h-0">
          <iframe
            title={site.contact.mapTitle}
            src={site.contact.mapEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="absolute inset-0 block h-full w-full max-w-full border-0"
          />
        </div>
      </div>
      <a
        href={site.contact.mapExternalUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-t border-border bg-card p-4 transition hover:bg-secondary/60"
      >
        <span className="min-w-0">
          <span className="block text-xs uppercase tracking-widest text-muted-foreground">
            Come raggiungerci
          </span>
          <span className="mt-1 block truncate text-sm">
            {site.contact.address}
          </span>
        </span>
        <span className="inline-flex w-fit max-w-full items-center gap-1 rounded-full bg-terracotta/10 px-3 py-1.5 text-xs font-medium text-terracotta">
          Apri su Maps
          <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </a>
    </div>
  );
}