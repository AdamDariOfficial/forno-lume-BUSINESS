import { useEffect, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { site, primaryCtaHref } from "@/config/site";
import { useModalAccessibility } from "@/hooks/use-modal-accessibility";

// Navbar
// - Route-based (no scroll-spy on hash anchors).
// - On the homepage keeps the validated "hidden inside hero, appears after
//   the hero threshold" behavior.
// - On every other route it is visible immediately.
// - Home link uses exact matching (so it isn't active on /menu, etc.).
export function Navbar() {
  const [open, setOpen] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const rafRef = useRef<number | null>(null);
  const modalRef = useRef<HTMLElement | null>(null);
  const menuTriggerRef = useRef<HTMLButtonElement | null>(null);
  const firstDrawerLinkRef = useRef<HTMLAnchorElement | null>(null);
  const restoreFocusRef = useRef(false);

  const isHome = pathname === "/";

  // Homepage-only: navbar is hidden until the user has scrolled past ~35%
  // of the viewport, then appears with a soft transition (validated
  // behavior from START).
  useEffect(() => {
    if (!isHome) {
      setHeroVisible(true);
      return;
    }

    setHeroVisible(false);

    const compute = () => {
      rafRef.current = null;
      const y = window.scrollY;
      const threshold = window.innerHeight * 0.35;
      setHeroVisible(y >= threshold);
    };

    const onScroll = () => {
      if (rafRef.current != null) return;
      rafRef.current = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [isHome]);

  // Close the mobile dialog whenever the desktop breakpoint is reached.
  useEffect(() => {
    const closeOnDesktop = () => {
      if (window.innerWidth < 768) return;

      restoreFocusRef.current = false;
      setOpen((current) => (current ? false : current));
    };

    const mq = window.matchMedia("(min-width: 768px)");
    mq.addEventListener("change", closeOnDesktop);
    window.addEventListener("resize", closeOnDesktop);
    closeOnDesktop();

    return () => {
      mq.removeEventListener("change", closeOnDesktop);
      window.removeEventListener("resize", closeOnDesktop);
    };
  }, []);

  // Some viewport updates do not dispatch resize or media-query events. Keep
  // this fallback active only while the mobile dialog is open.
  useEffect(() => {
    if (!open) return;

    const closeIfDesktop = () => {
      if (window.innerWidth < 768) return false;

      restoreFocusRef.current = false;
      setOpen((current) => (current ? false : current));
      return true;
    };

    if (closeIfDesktop()) return;

    const checkBreakpoint = window.setInterval(() => {
      if (closeIfDesktop()) window.clearInterval(checkBreakpoint);
    }, 150);

    return () => window.clearInterval(checkBreakpoint);
  }, [open]);

  // Close drawer on route change.
  useEffect(() => {
    restoreFocusRef.current = false;
    setOpen(false);
  }, [pathname]);

  const close = (shouldRestoreFocus = true) => {
    if (!open) return;
    restoreFocusRef.current = shouldRestoreFocus;
    setOpen(false);
  };

  useModalAccessibility({
    open,
    modalRef,
    initialFocusRef: firstDrawerLinkRef,
    returnFocusElement: menuTriggerRef.current,
    restoreFocusRef,
    onEscape: () => close(),
  });

  // Drawer forces visibility regardless of scroll position.
  const shown = heroVisible || open || !isHome;

  return (
    <header
      ref={modalRef}
      role={open ? "dialog" : undefined}
      aria-modal={open ? true : undefined}
      aria-label={open ? "Menu di navigazione" : undefined}
      aria-hidden={shown ? undefined : true}
      inert={!shown}
      tabIndex={open ? -1 : undefined}
      className={`fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-md transition-[opacity,translate,transform] duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] [will-change:opacity,translate,transform] ${
        shown
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 -translate-y-full pointer-events-none"
      } motion-reduce:translate-y-0 motion-reduce:transform-none motion-reduce:transition-none`}
    >
      <div className="container-page flex h-16 items-center justify-between md:h-20">
        <Link
          to="/"
          inert={open}
          onClick={() => close(false)}
          className="flex items-center gap-2 font-display text-xl tracking-tight sm:text-2xl"
          aria-label={`${site.brand.name} — Home`}
        >
          <span className="inline-block h-2 w-2 rounded-full bg-terracotta" />
          {site.brand.name}
        </Link>

        <nav
          inert={open}
          className="hidden items-center gap-8 md:flex"
          aria-label="Navigazione principale"
        >
          {site.mainNav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={n.to === "/" ? { exact: true } : undefined}
              activeProps={{
                className:
                  "relative text-sm text-terracotta after:absolute after:-bottom-1.5 after:left-1/2 after:h-[2px] after:w-4 after:-translate-x-1/2 after:rounded-full after:bg-terracotta after:content-['']",
              }}
              inactiveProps={{
                className:
                  "relative text-sm text-foreground/80 transition-colors hover:text-terracotta",
              }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <a
          href={primaryCtaHref()}
          target={site.primaryCta.kind === "whatsapp" ? "_blank" : undefined}
          rel={site.primaryCta.kind === "whatsapp" ? "noopener noreferrer" : undefined}
          inert={open}
          className="motion-cta hidden rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 md:inline-flex"
        >
          {site.primaryCta.label}
        </a>

        <button
          ref={menuTriggerRef}
          type="button"
          aria-label={open ? "Chiudi menu" : "Apri menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => {
            if (open) {
              close();
            } else {
              restoreFocusRef.current = false;
              setOpen(true);
            }
          }}
          className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-background/70 backdrop-blur md:hidden"
        >
          <Menu
            aria-hidden="true"
            className={`absolute h-5 w-5 transition-[opacity,transform] duration-300 motion-reduce:transform-none motion-reduce:transition-none ${
              open ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
            }`}
          />
          <X
            aria-hidden="true"
            className={`absolute h-5 w-5 transition-[opacity,transform] duration-300 motion-reduce:transform-none motion-reduce:transition-none ${
              open ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
            }`}
          />
        </button>
      </div>

      {/* Overlay */}
      <div
        aria-hidden
        onClick={() => close()}
        className={`absolute inset-x-0 top-full z-40 h-[calc(100dvh-4rem)] bg-ink/30 backdrop-blur-sm transition-opacity duration-300 motion-reduce:transition-none md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Drawer */}
      <div
        id="mobile-nav"
        aria-hidden={open ? undefined : true}
        inert={!open}
        className={`absolute inset-x-0 top-full z-50 origin-top overflow-hidden transition-[max-height,opacity,transform] duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:translate-y-0 motion-reduce:transform-none motion-reduce:transition-none md:hidden ${
          open
            ? "max-h-[80vh] opacity-100 translate-y-0"
            : "max-h-0 opacity-0 -translate-y-2"
        }`}
      >
        <div className="container-page pb-6 pt-2">
          <div className="rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-warm)]">
            <nav className="flex flex-col" aria-label="Navigazione mobile">
              {site.mainNav.map((n, i) => (
                <Link
                  ref={i === 0 ? firstDrawerLinkRef : undefined}
                  key={n.to}
                  to={n.to}
                  activeOptions={n.to === "/" ? { exact: true } : undefined}
                  onClick={() => close(false)}
                  activeProps={{
                    className:
                      "flex items-center justify-between border-b border-border/60 py-4 text-base text-terracotta transition-colors duration-300 last:border-b-0",
                  }}
                  inactiveProps={{
                    className:
                      "flex items-center justify-between border-b border-border/60 py-4 text-base transition-colors duration-300 last:border-b-0",
                  }}
                >
                  <span>{n.label}</span>
                </Link>
              ))}
            </nav>
            <a
              href={primaryCtaHref()}
              target={site.primaryCta.kind === "whatsapp" ? "_blank" : undefined}
              rel={site.primaryCta.kind === "whatsapp" ? "noopener noreferrer" : undefined}
              onClick={() => close()}
              className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-primary px-5 py-3.5 text-sm font-medium text-primary-foreground shadow-[var(--shadow-warm)]"
            >
              {site.primaryCta.label}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
