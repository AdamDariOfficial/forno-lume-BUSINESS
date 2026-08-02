import { useEffect, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { site, primaryCtaHref } from "@/config/site";
import { useModalAccessibility } from "@/hooks/use-modal-accessibility";

// BUSINESS preserves START's perceived navbar behavior while keeping
// route-based navigation and active states for the multipage architecture.
export function Navbar() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const rafRef = useRef<number | null>(null);
  const modalRef = useRef<HTMLElement | null>(null);
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const menuTriggerRef = useRef<HTMLButtonElement | null>(null);
  const firstDrawerLinkRef = useRef<HTMLAnchorElement | null>(null);
  const restoreFocusRef = useRef(false);

  const isHome = pathname === "/";

  // Match START: hidden inside the hero and revealed as the first editorial
  // section approaches the viewport. Internal routes remain visible at once.
  useEffect(() => {
    if (!isHome) {
      setVisible(true);
      return;
    }

    const compute = () => {
      rafRef.current = null;
      const scrollY = window.scrollY;
      const marker = document.querySelector<HTMLElement>("[data-navbar-threshold]");

      if (!marker) {
        setVisible(scrollY >= window.innerHeight * 0.35);
        return;
      }

      const markerTop = marker.getBoundingClientRect().top + scrollY;
      setVisible(scrollY + 120 >= markerTop);
    };

    const onScroll = () => {
      if (rafRef.current != null) return;
      rafRef.current = window.requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current != null) window.cancelAnimationFrame(rafRef.current);
    };
  }, [isHome]);

  // Close the mobile dialog at the desktop breakpoint.
  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const onChange = (event: MediaQueryListEvent) => {
      if (!event.matches) return;
      restoreFocusRef.current = false;
      setOpen(false);
    };

    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  // Close the mobile dialog after route navigation.
  useEffect(() => {
    restoreFocusRef.current = false;
    setOpen(false);
  }, [pathname]);

  // Reliable click-outside behavior, matching the corrected START menu.
  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (drawerRef.current?.contains(target)) return;
      if (menuTriggerRef.current?.contains(target)) return;

      restoreFocusRef.current = true;
      setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

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

  const shown = visible || open || !isHome;

  return (
    <header
      ref={modalRef}
      role={open ? "dialog" : undefined}
      aria-modal={open ? true : undefined}
      aria-label={open ? "Menu di navigazione" : undefined}
      aria-hidden={shown ? undefined : true}
      inert={!shown}
      tabIndex={open ? -1 : undefined}
      className={`fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-md transition-[opacity,transform,translate] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] [will-change:opacity,transform] ${
        shown
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 -translate-y-full pointer-events-none"
      } motion-reduce:transition-opacity motion-reduce:transform-none`}
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
          {site.mainNav.map((item) => {
            const active = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={item.to === "/" ? { exact: true } : undefined}
                aria-current={active ? "page" : undefined}
                className={`relative text-sm transition-colors ${
                  active ? "text-terracotta-ink" : "text-foreground/80 hover:text-terracotta-ink"
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute -bottom-1.5 left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-terracotta transition-all duration-300 ${
                    active ? "w-4 opacity-100" : "w-0 opacity-0"
                  }`}
                />
              </Link>
            );
          })}
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
          aria-haspopup="dialog"
          aria-controls="mobile-nav"
          onClick={() => {
            if (open) {
              close();
            } else {
              restoreFocusRef.current = false;
              setOpen(true);
            }
          }}
          className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-background/70 backdrop-blur md:hidden"
        >
          <Menu
            aria-hidden="true"
            className={`absolute h-5 w-5 transition-all duration-300 ${
              open ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
            }`}
          />
          <X
            aria-hidden="true"
            className={`absolute h-5 w-5 transition-all duration-300 ${
              open ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
            }`}
          />
        </button>
      </div>

      <div
        ref={drawerRef}
        id="mobile-nav"
        aria-hidden={open ? undefined : true}
        inert={!open}
        className={`absolute inset-x-0 top-full z-50 origin-top transition-all duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden ${
          open
            ? "max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain opacity-100 translate-y-0"
            : "max-h-0 overflow-hidden opacity-0 -translate-y-2"
        } motion-reduce:transition-none motion-reduce:transform-none`}
      >
        <div className="container-page pb-6 pt-2">
          <div className="rounded-2xl border border-border bg-card/95 p-4 shadow-[var(--shadow-soft)] backdrop-blur">
            <nav className="flex flex-col" aria-label="Navigazione mobile">
              {site.mainNav.map((item, index) => {
                const active = pathname === item.to;
                return (
                  <Link
                    ref={index === 0 ? firstDrawerLinkRef : undefined}
                    key={item.to}
                    to={item.to}
                    activeOptions={item.to === "/" ? { exact: true } : undefined}
                    onClick={() => close(false)}
                    aria-current={active ? "page" : undefined}
                    style={{ transitionDelay: `${open ? index * 40 : 0}ms` }}
                    className={`flex items-center justify-between border-b border-border/60 py-4 text-base transition-all duration-300 last:border-b-0 ${
                      open ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"
                    } ${active ? "text-terracotta-ink" : ""}`}
                  >
                    <span>{item.label}</span>
                    {active && (
                      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-terracotta" />
                    )}
                  </Link>
                );
              })}
            </nav>
            <a
              href={primaryCtaHref()}
              target={site.primaryCta.kind === "whatsapp" ? "_blank" : undefined}
              rel={site.primaryCta.kind === "whatsapp" ? "noopener noreferrer" : undefined}
              onClick={() => close(false)}
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
