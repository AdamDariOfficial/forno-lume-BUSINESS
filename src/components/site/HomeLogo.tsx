import { Link, useRouterState } from "@tanstack/react-router";
import type { MouseEvent } from "react";

import { site } from "@/config/site";
import { prefersReducedMotion } from "@/lib/nav";

type HomeLogoProps = {
  className?: string;
  inert?: boolean;
  onActivate?: () => void;
};

export function HomeLogo({ className = "", inert, onActivate }: HomeLogoProps) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    onActivate?.();

    if (pathname !== "/") return;

    event.preventDefault();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  };

  return (
    <Link
      to="/"
      inert={inert}
      onClick={handleClick}
      aria-label={`${site.brand.name}, torna all'inizio`}
      className={`group inline-flex items-center gap-2 font-display tracking-tight transition-colors hover:text-terracotta ${className}`}
    >
      <span
        aria-hidden
        className="inline-block h-2 w-2 rounded-full bg-terracotta transition-colors group-hover:bg-primary"
      />
      {site.brand.name}
    </Link>
  );
}
