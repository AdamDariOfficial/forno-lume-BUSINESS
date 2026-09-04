import { useState } from "react";
import { ExternalLink, MapPin } from "lucide-react";

import { site } from "@/config/site";

export function MapEmbed() {
  const [mapActive, setMapActive] = useState(false);

  return (
    <div className="max-w-full overflow-hidden rounded-3xl border border-border shadow-[var(--shadow-soft)]">
      <div
        className="relative min-h-[280px] min-w-0 max-w-full overflow-hidden bg-secondary/35 sm:aspect-[16/10] min-[1100px]:aspect-[5/4] min-[1100px]:min-h-0"
        aria-live="polite"
      >
        {mapActive ? (
          <iframe
            title={site.contact.mapTitle}
            src={site.contact.mapEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="absolute inset-0 block h-full w-full max-w-full border-0"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center px-7 py-10 text-center sm:px-12">
            <MapPin aria-hidden className="mb-4 h-8 w-8 text-terracotta" strokeWidth={1.5} />
            <p className="font-display text-2xl leading-tight text-foreground sm:text-3xl">
              {site.contact.area}
            </p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
              La mappa di Google viene caricata soltanto dopo una tua scelta esplicita.
            </p>
            <button
              data-js-only
              type="button"
              onClick={() => setMapActive(true)}
              className="motion-cta mt-7 inline-flex min-h-12 w-full max-w-xs items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground hover:opacity-90 sm:w-auto"
            >
              Attiva la mappa interattiva
            </button>
            <noscript>
              <a
                href={site.contact.mapExternalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="motion-cta mt-7 inline-flex min-h-12 w-full max-w-xs items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground hover:opacity-90 sm:w-auto"
              >
                Apri la mappa su Google Maps
                <ExternalLink aria-hidden className="h-4 w-4" />
              </a>
            </noscript>
          </div>
        )}
      </div>

      <div className="flex min-w-0 items-center justify-between gap-4 border-t border-border bg-card p-4 text-xs text-muted-foreground">
        <div className="min-w-0">
          {mapActive && (
            <button
              type="button"
              onClick={() => setMapActive(false)}
              className="rounded-sm underline-offset-4 transition-colors hover:text-terracotta hover:underline"
            >
              Disattiva mappa
            </button>
          )}
        </div>
        <a
          href={site.contact.mapExternalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-sm font-medium text-terracotta underline-offset-4 hover:underline"
        >
          Apri su Google Maps
          <ExternalLink aria-hidden className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}
