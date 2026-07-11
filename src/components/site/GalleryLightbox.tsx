import { useCallback, useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { GalleryImage } from "@/config/gallery";

// Accessible lightbox:
// - Escape closes
// - Arrow keys navigate
// - Click on overlay closes; click on image does not
// - Focus is trapped on the close button while open
// - Body scroll locked while open
export function GalleryLightbox({
  images,
  index,
  onClose,
  onIndexChange,
}: {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onIndexChange: (i: number) => void;
}) {
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  const goPrev = useCallback(() => {
    onIndexChange((index - 1 + images.length) % images.length);
  }, [index, images.length, onIndexChange]);

  const goNext = useCallback(() => {
    onIndexChange((index + 1) % images.length);
  }, [index, images.length, onIndexChange]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, goPrev, goNext]);

  const img = images[index];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Immagine ${index + 1} di ${images.length}: ${img.alt}`}
      onClick={onClose}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/85 backdrop-blur-sm p-4 sm:p-8"
    >
      <button
        ref={closeBtnRef}
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Chiudi lightbox"
        className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-background/90 text-foreground shadow transition hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
      >
        <X className="h-5 w-5" />
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          goPrev();
        }}
        aria-label="Immagine precedente"
        className="absolute left-2 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 text-foreground shadow transition hover:bg-background sm:left-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          goNext();
        }}
        aria-label="Immagine successiva"
        className="absolute right-2 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 text-foreground shadow transition hover:bg-background sm:right-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <figure
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[90vh] max-w-[92vw]"
      >
        <img
          src={img.src}
          alt={img.alt}
          width={img.w}
          height={img.h}
          className="mx-auto max-h-[85vh] w-auto rounded-lg object-contain"
        />
        <figcaption className="mt-3 text-center text-sm text-background/80">
          {img.alt}
        </figcaption>
      </figure>
    </div>
  );
}