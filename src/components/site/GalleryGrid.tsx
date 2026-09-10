import { useEffect, useRef, useState, type MouseEvent } from "react";
import { ArrowRight } from "lucide-react";
import type { GalleryImage } from "@/config/gallery";
import { GalleryLightbox } from "./GalleryLightbox";
import { Reveal } from "./Reveal";

// Editorial grid: alternating spans (wide/tall/normal) for a magazine feel.
// Clicking a tile opens the lightbox.
export function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);

  const spanClass = (span?: GalleryImage["span"]) => {
    if (span === "wide") return "sm:col-span-2";
    if (span === "tall") return "sm:row-span-2";
    return "";
  };

  return (
    <>
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:auto-rows-[220px] md:gap-4 md:auto-rows-[260px]">
        {images.map((img, i) => (
          <Reveal
            as="li"
            key={img.id}
            variant="image"
            delay={(i % 3) * 70}
            className={spanClass(img.span)}
          >
            <button
              type="button"
              onClick={(event: MouseEvent<HTMLButtonElement>) => {
                openerRef.current = event.currentTarget;
                setOpenIndex(i);
              }}
              className="group relative block h-full w-full overflow-hidden rounded-2xl border border-border bg-secondary/30 transition-[border-color,box-shadow] duration-300 hover:border-terracotta/45 hover:shadow-[var(--shadow-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
              aria-label={`Apri immagine: ${img.alt}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                width={img.w}
                height={img.h}
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.018] motion-reduce:transform-none motion-reduce:transition-none"
              />
            </button>
          </Reveal>
        ))}
      </ul>

      {openIndex !== null && (
        <GalleryLightbox
          images={images}
          index={openIndex}
          returnFocusElement={openerRef.current}
          onClose={() => setOpenIndex(null)}
          onIndexChange={setOpenIndex}
        />
      )}
    </>
  );
}

// Homepage preview rail — no lightbox; the explicit CTA remains the route entry point.
const previewDescriptionId = "forno-business-gallery-preview-description";

export function GalleryPreviewRail({ images }: { images: readonly GalleryImage[] }) {
  const railRef = useRef<HTMLUListElement>(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const update = () => setHasMore(rail.scrollWidth - rail.clientWidth - rail.scrollLeft > 8);
    const frame = window.requestAnimationFrame(update);
    rail.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    const observer = "ResizeObserver" in window ? new ResizeObserver(update) : null;
    observer?.observe(rail);

    return () => {
      window.cancelAnimationFrame(frame);
      rail.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      observer?.disconnect();
    };
  }, []);

  return (
    <>
      <p id={previewDescriptionId} className="sr-only">
        Su schermi piccoli, scorri orizzontalmente per visualizzare tutte le immagini. Usa il link
        Apri la galleria per visitare la raccolta completa.
      </p>
      <div className="relative min-w-0">
        <ul
          ref={railRef}
          tabIndex={0}
          aria-describedby={previewDescriptionId}
          className="-mx-5 flex min-w-0 snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-hidden overscroll-x-contain px-5 pb-2 sm:-mx-6 sm:px-6 md:mx-0 md:grid md:grid-cols-4 md:gap-4 md:overflow-visible md:px-0"
        >
          {images.map((img, i) => (
            <Reveal
              as="li"
              key={img.id}
              variant="image"
              delay={(i % 4) * 60}
              className="w-[76%] shrink-0 snap-start overflow-hidden rounded-2xl border border-border bg-secondary/30 sm:w-[54%] md:w-auto"
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                width={img.w}
                height={img.h}
                className="aspect-[4/5] h-full w-full object-cover"
              />
            </Reveal>
          ))}
        </ul>
        <div aria-hidden className={`pointer-events-none absolute inset-y-0 -right-5 w-16 bg-gradient-to-l from-secondary to-transparent transition-opacity duration-200 motion-reduce:transition-none md:hidden ${hasMore ? "opacity-100" : "opacity-0"}`} />
        <div aria-hidden className={`pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 transition-opacity duration-200 motion-reduce:transition-none md:hidden ${hasMore ? "opacity-100" : "opacity-0"}`}>
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card/90 text-terracotta shadow-[var(--shadow-soft)] backdrop-blur-sm">
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </>
  );
}
