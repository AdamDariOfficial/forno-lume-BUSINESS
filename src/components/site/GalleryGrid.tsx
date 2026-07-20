import { useRef, useState } from "react";
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
              onClick={(event) => {
                openerRef.current = event.currentTarget;
                setOpenIndex(i);
              }}
              className="group relative block h-full w-full overflow-hidden rounded-2xl border border-border bg-secondary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              aria-label={`Apri immagine: ${img.alt}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                width={img.w}
                height={img.h}
                className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
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

// Simple 4-tile preview grid for the homepage — no lightbox, links to /galleria
// are the user's next step.
export function GalleryPreviewGrid({ images }: { images: readonly GalleryImage[] }) {
  return (
    <ul className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
      {images.map((img, i) => (
        <Reveal
          as="li"
          key={img.id}
          variant="image"
          delay={(i % 4) * 60}
          className="overflow-hidden rounded-2xl border border-border bg-secondary/30"
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
  );
}
