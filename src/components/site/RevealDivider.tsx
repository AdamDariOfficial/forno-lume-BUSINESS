import { useEffect, useLayoutEffect, useRef, useState } from "react";

type RevealDividerProps = {
  className: string;
};

const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export function RevealDivider({ className }: RevealDividerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [phase, setPhase] = useState<"visible" | "pending" | "revealed">("visible");

  useIsomorphicLayoutEffect(() => {
    const divider = ref.current;
    if (!divider) return;
    if (!("matchMedia" in window) || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setPhase("pending");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setPhase("revealed");
        observer.disconnect();
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(divider);
    return () => observer.disconnect();
  }, []);

  const motionClass =
    phase === "pending"
      ? "opacity-0 transition-none"
      : phase === "revealed"
        ? "opacity-100 transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
        : "opacity-100 transition-none";

  return (
    <span
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute block motion-reduce:opacity-100 motion-reduce:transition-none ${motionClass} ${className}`}
    />
  );
}
