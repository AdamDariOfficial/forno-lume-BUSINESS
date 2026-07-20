import { useCallback, useRef } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { GalleryImage } from "@/config/gallery";
import { useModalAccessibility } from "@/hooks/use-modal-accessibility";

// Accessible lightbox:
// - Escape closes
// - Arrow keys navigate
// - Click on overlay closes; click on image does not
// - Focus remains inside the dialog while open
// - Body scroll locked while open
export function GalleryLightbox({
  images,
  index,
  returnFocusElement,
  onClose,
  onIndexChange,
}: {
  images: GalleryImage[];
  index: number;
  returnFocusElement: HTMLElement | null;
  onClose: () => void;
  onIndexChange: (i: number) => void;
}) {
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  const goPrev = useCallback(() => {
    onIndexChange((index - 1 + images.length) % images.length);
  }, [index, images.length, onIndexChange]);

  const goNext = useCallback(() => {
    onIndexChange((index + 1) % images.length);
  }, [index, images.length, onIndexChange]);

  useModalAccessibility({
    open: true,
    modalRef: dialogRef,
    initialFocusRef: closeBtnRef,
    returnFocusElement,
    onEscape: onClose,
    onKeyDown: (event) => {
      if (event.key === "ArrowLeft") goPrev();
      else if (event.key === "ArrowRight") goNext();
    },
  });

  const img = images[index];

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Visualizzatore immagini"
      tabIndex={-1}
      onClick={onClose}
      className="fixed inset-0 z-[80] bg-ink/85 backdrop-blur-sm"
      style={{
        height: "100dvh",
        paddingTop: "calc(env(safe-area-inset-top) + 0.75rem)",
        paddingBottom: "calc(env(safe-area-inset-bottom) + 0.75rem)",
        paddingLeft: "env(safe-area-inset-left)",
        paddingRight: "env(safe-area-inset-right)",
      }}
    >
      <button
        ref={closeBtnRef}
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Chiudi lightbox"
        className="absolute right-3 top-3 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full bg-background/95 text-foreground shadow transition hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta sm:right-6 sm:top-6"
      >
        <X aria-hidden="true" className="h-5 w-5" />
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          goPrev();
        }}
        aria-label="Immagine precedente"
        className="absolute left-3 top-1/2 z-20 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-background/95 text-foreground shadow transition hover:bg-background sm:left-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
      >
        <ChevronLeft aria-hidden="true" className="h-5 w-5" />
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          goNext();
        }}
        aria-label="Immagine successiva"
        className="absolute right-3 top-1/2 z-20 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-background/95 text-foreground shadow transition hover:bg-background sm:right-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
      >
        <ChevronRight aria-hidden="true" className="h-5 w-5" />
      </button>

      <figure
        onClick={(e) => e.stopPropagation()}
        className="mx-auto flex h-full max-w-[92vw] flex-col items-center justify-center gap-3 px-16 sm:px-20"
      >
        <img
          src={img.src}
          alt={img.alt}
          width={img.w}
          height={img.h}
          className="max-h-[calc(100dvh-8rem)] w-auto max-w-full rounded-lg object-contain"
        />
        <figcaption
          aria-hidden="true"
          className="text-center text-sm text-background/80"
        >
          {img.alt}
        </figcaption>
      </figure>
    </div>
  );
}
