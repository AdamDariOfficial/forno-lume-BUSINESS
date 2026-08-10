import { useId } from "react";

interface GalleryGestureIndicatorProps {
  progress: number;
  direction: "left" | "right";
  armed: boolean;
  className?: string;
}

const viewBoxWidth = 88;

export function GalleryGestureIndicator({
  progress,
  direction,
  armed,
  className = "",
}: GalleryGestureIndicatorProps) {
  const clipId = `forno-gallery-gesture-${useId().replace(/:/g, "")}`;
  const normalizedProgress = Math.min(1, Math.max(0, progress));
  const clipWidth = viewBoxWidth * normalizedProgress;
  const clipX = 0;
  const pathTransform = direction === "left" ? "rotate(180 44 10)" : undefined;

  return (
    <span
      aria-hidden="true"
      data-armed={armed ? "true" : "false"}
      data-progress={normalizedProgress.toFixed(3)}
      className={`pointer-events-none inline-flex select-none transition-[color,opacity] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
        normalizedProgress > 0 ? "opacity-100" : "opacity-0"
      } ${className}`}
    >
      <svg
        aria-hidden="true"
        className="block shrink-0 overflow-visible"
        width="40"
        height="20"
        viewBox="0 0 88 20"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
            <rect x={clipX} y="0" width={clipWidth} height="20" />
          </clipPath>
        </defs>
        <path
          d="M4 10H84M76 3L84 10L76 17"
          transform={pathTransform}
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.25"
          vectorEffect="non-scaling-stroke"
          opacity="0.22"
        />
        <path
          d="M4 10H84M76 3L84 10L76 17"
          transform={pathTransform}
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={armed ? 1.9 : 1.55}
          vectorEffect="non-scaling-stroke"
          clipPath={`url(#${clipId})`}
        />
      </svg>
    </span>
  );
}
