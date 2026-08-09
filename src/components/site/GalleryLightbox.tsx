import {
  useCallback,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { GalleryImage } from "@/config/gallery";
import { useModalAccessibility } from "@/hooks/use-modal-accessibility";
import { GalleryGestureIndicator } from "./GalleryGestureIndicator";

type DragAxis = "pending" | "horizontal" | "vertical";
type GestureDirection = "left" | "right";

interface DragState {
  pointerId: number;
  startX: number;
  startY: number;
  lastX: number;
  axis: DragAxis;
}

const swipeThreshold = 52;
const lightboxRevealDistance = 56;

// Accessible lightbox:
// - Escape closes
// - Arrow keys navigate
// - Click on overlay closes; click on image does not
// - Focus remains inside the dialog while open
// - Body scroll locked while open
// - Horizontal pointer gestures navigate only after an intentional threshold
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
  const dragRef = useRef<DragState | null>(null);
  const dragArmedRef = useRef(false);
  const [stepDirection, setStepDirection] = useState<-1 | 1>(1);
  const [dragOffset, setDragOffset] = useState(0);
  const [dragDirection, setDragDirection] = useState<GestureDirection | null>(null);
  const [dragProgress, setDragProgress] = useState(0);
  const [dragArmed, setDragArmed] = useState(false);
  const [dragAnnouncement, setDragAnnouncement] = useState("");

  const resetGestureState = useCallback(() => {
    dragRef.current = null;
    dragArmedRef.current = false;
    setDragOffset(0);
    setDragDirection(null);
    setDragProgress(0);
    setDragArmed(false);
    setDragAnnouncement("");
  }, []);

  const move = useCallback(
    (direction: -1 | 1) => {
      if (!images.length) return;
      setStepDirection(direction);
      onIndexChange((index + direction + images.length) % images.length);
      resetGestureState();
    },
    [images.length, index, onIndexChange, resetGestureState],
  );

  const goPrev = useCallback(() => move(-1), [move]);
  const goNext = useCallback(() => move(1), [move]);

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

  function handlePointerDown(event: ReactPointerEvent<HTMLElement>) {
    if (event.button !== 0) return;
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      lastX: event.clientX,
      axis: "pending",
    };
    dragArmedRef.current = false;
    setDragOffset(0);
    setDragDirection(null);
    setDragProgress(0);
    setDragArmed(false);
    setDragAnnouncement("");
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLElement>) {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - drag.startX;
    const deltaY = event.clientY - drag.startY;

    if (drag.axis === "pending") {
      if (Math.max(Math.abs(deltaX), Math.abs(deltaY)) < 10) return;
      drag.axis = Math.abs(deltaX) > Math.abs(deltaY) * 1.2 ? "horizontal" : "vertical";
      if (drag.axis === "horizontal") event.currentTarget.setPointerCapture(event.pointerId);
    }

    if (drag.axis !== "horizontal") return;

    event.preventDefault();
    drag.lastX = event.clientX;

    const nextProgress = Math.min(1, Math.abs(deltaX) / swipeThreshold);
    const nextDirection: GestureDirection | null =
      deltaX < 0 ? "right" : deltaX > 0 ? "left" : null;
    const nextOffset =
      nextDirection === "right"
        ? -nextProgress * lightboxRevealDistance
        : nextDirection === "left"
          ? nextProgress * lightboxRevealDistance
          : 0;
    const nextArmed = nextProgress >= 1;

    setDragOffset(nextOffset);
    setDragDirection(nextDirection);
    setDragProgress(nextProgress);
    setDragAnnouncement(
      nextArmed
        ? `Rilascia per mostrare l'immagine ${deltaX < 0 ? "successiva" : "precedente"}`
        : "",
    );

    if (nextArmed !== dragArmedRef.current) {
      dragArmedRef.current = nextArmed;
      setDragArmed(nextArmed);
    }
  }

  function releasePointerGesture(event: ReactPointerEvent<HTMLElement>) {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    resetGestureState();
  }

  function finishPointerGesture(event: ReactPointerEvent<HTMLElement>) {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    const distance = drag.lastX - drag.startX;
    const shouldMove = drag.axis === "horizontal" && dragArmedRef.current;
    releasePointerGesture(event);

    if (shouldMove) move(distance < 0 ? 1 : -1);
  }

  function cancelPointerGesture(event: ReactPointerEvent<HTMLElement>) {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    releasePointerGesture(event);
  }

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
        className="absolute left-3 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-background/95 text-foreground shadow transition hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta xl:left-6 xl:inline-flex"
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
        className="absolute right-3 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-background/95 text-foreground shadow transition hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta xl:right-6 xl:inline-flex"
      >
        <ChevronRight aria-hidden="true" className="h-5 w-5" />
      </button>

      <figure
        onClick={(e) => e.stopPropagation()}
        className="relative mx-auto flex h-full w-full max-w-[calc(100vw-1.5rem)] select-none flex-col items-center justify-center gap-3 px-0 xl:max-w-[92vw] xl:px-20"
      >
        <div
          data-js-only
          aria-hidden
          className={`pointer-events-none absolute top-1/2 z-0 hidden w-11 -translate-y-1/2 xl:flex ${
            dragDirection === "right"
              ? "right-2 justify-end"
              : "left-2 justify-start"
          }`}
        >
          <GalleryGestureIndicator
            progress={dragProgress}
            armed={dragArmed}
            direction={dragDirection ?? "right"}
            className="text-background/55 data-[armed=true]:text-gold"
          />
        </div>
        <div
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={finishPointerGesture}
          onPointerCancel={cancelPointerGesture}
          className="relative flex min-h-0 w-full flex-1 touch-pan-y items-center justify-center px-6 sm:px-8 xl:px-0"
        >
          <div className="relative inline-flex min-h-0 max-w-full items-center justify-center">
            <div
              data-js-only
              aria-hidden
              className={`pointer-events-none absolute top-1/2 z-0 flex w-10 -translate-y-1/2 xl:hidden ${
                dragDirection === "right"
                  ? "left-full -ml-4 justify-start sm:-ml-2"
                  : "right-full -mr-4 justify-end sm:-mr-2"
              }`}
            >
              <GalleryGestureIndicator
                progress={dragProgress}
                armed={dragArmed}
                direction={dragDirection ?? "right"}
                className="text-background/55 data-[armed=true]:text-gold"
              />
            </div>

            <div
              key={img.id}
              className="forno-gallery-step-image relative z-10 inline-flex min-h-0 max-w-full items-center justify-center"
              style={{ ["--gallery-direction" as string]: stepDirection }}
            >
              <img
                src={img.src}
                alt={img.alt}
                width={img.w}
                height={img.h}
                draggable={false}
                className={`relative z-10 block max-h-[calc(100dvh-7.75rem)] h-auto w-auto max-w-full rounded-lg object-contain will-change-transform xl:max-h-[calc(100dvh-9rem)] ${
                  dragOffset === 0
                    ? "transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    : "transition-none"
                }`}
                style={{ transform: `translateX(${dragOffset}px)` }}
              />
            </div>
          </div>

        </div>

        <div className="relative grid w-full shrink-0 grid-cols-[2.75rem_minmax(0,1fr)_2.75rem] items-center gap-3 xl:hidden">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            aria-label="Immagine precedente"
            className="relative z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-background/95 text-foreground shadow transition hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
          >
            <ChevronLeft aria-hidden="true" className="h-5 w-5" />
          </button>

          <div className="relative z-10 min-w-0 text-center">
            <figcaption
              aria-hidden="true"
              className="max-h-10 overflow-hidden text-sm leading-5 text-background/80"
            >
              {img.alt}
            </figcaption>
            <div
              className="mt-1 flex items-center justify-center gap-2 text-xs tabular-nums text-background/65"
              aria-live="polite"
            >
              <span aria-hidden className="h-px w-6 bg-gold/70" />
              <span>
                {index + 1} / {images.length}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            aria-label="Immagine successiva"
            className="relative z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-background/95 text-foreground shadow transition hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
          >
            <ChevronRight aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>

        <figcaption
          aria-hidden="true"
          className="hidden text-center text-sm text-background/80 xl:block"
        >
          {img.alt}
        </figcaption>

        <div
          className="hidden items-center gap-3 text-xs tabular-nums text-background/65 xl:flex"
          aria-live="polite"
        >
          <span aria-hidden className="h-px w-7 bg-gold/70" />
          <span>
            {index + 1} / {images.length}
          </span>
        </div>

        <p className="sr-only" aria-live="polite" aria-atomic="true">
          {dragAnnouncement}
        </p>
      </figure>

      <style>{`
        @keyframes forno-gallery-step {
          from {
            opacity: 0.58;
            transform: translateX(calc(var(--gallery-direction, 1) * 0.9rem));
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .forno-gallery-step-image {
          animation: forno-gallery-step 280ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        @media (prefers-reduced-motion: reduce) {
          .forno-gallery-step-image {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
}
