import { useEffect, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, MessageCircle, X } from "lucide-react";

import { site, type MainNavItem } from "@/config/site";
import { useModalAccessibility } from "@/hooks/use-modal-accessibility";
import { ContactChoiceDialog } from "./ContactChoiceDialog";
import { HomeLogo } from "./HomeLogo";

const mainNav: readonly MainNavItem[] = site.mainNav;

// BUSINESS keeps START's perceived navbar and CTA behavior while preserving
// route-based navigation, history and multipage active states.
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
  const navItems = mainNav;

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

  // START's final density breakpoint is also appropriate after restoring the
  // full base interaction set plus BUSINESS route navigation.
  useEffect(() => {
    const media = window.matchMedia("(min-width: 1100px)");
    const onChange = (event: MediaQueryListEvent) => {
      if (!event.matches) return;
      restoreFocusRef.current = false;
      setOpen(false);
    };

    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    restoreFocusRef.current = false;
    setOpen(false);
  }, [pathname]);

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
        <HomeLogo
          inert={open}
          onActivate={() => close(false)}
          className="text-xl sm:text-2xl"
        />

        <nav
          inert={open}
          className="hidden items-center gap-6 min-[1100px]:flex xl:gap-8"
          aria-label="Navigazione principale"
        >
          {navItems.map((item) => {
            const active = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={item.to === "/" ? { exact: true } : undefined}
                aria-current={active ? "page" : undefined}
                className={`relative text-sm transition-colors ${
                  active ? "text-terracotta" : "text-foreground/80 hover:text-terracotta"
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

        <ContactChoiceDialog kind="booking">
          <button
            type="button"
            inert={open}
            className="motion-cta hidden items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 min-[1100px]:inline-flex"
          >
            <MessageCircle aria-hidden className="h-4 w-4" />
            {site.primaryCta.label}
          </button>
        </ContactChoiceDialog>

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
          className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-background/70 backdrop-blur transition-colors hover:bg-secondary min-[1100px]:hidden"
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
        className={`absolute inset-x-0 top-full z-50 origin-top transition-all duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] min-[1100px]:hidden ${
          open
            ? "max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain opacity-100 translate-y-0 md:max-h-[calc(100dvh-5rem)]"
            : "max-h-0 overflow-hidden opacity-0 -translate-y-2"
        } motion-reduce:transition-none motion-reduce:transform-none`}
      >
        <div className="container-page pb-6 pt-2">
          <div className="rounded-2xl border border-border bg-card/95 p-4 shadow-[var(--shadow-soft)] backdrop-blur">
            <nav className="flex flex-col" aria-label="Navigazione mobile">
              {navItems.map((item, index) => {
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
                    } ${active ? "text-terracotta" : "hover:text-terracotta"}`}
                  >
                    <span>{item.label}</span>
                    {active && (
                      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-terracotta" />
                    )}
                  </Link>
                );
              })}
            </nav>

            <ContactChoiceDialog kind="booking">
              <button
                type="button"
                onClick={() => close(false)}
                className="motion-cta mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3.5 text-sm font-medium text-primary-foreground shadow-[var(--shadow-warm)]"
              >
                <MessageCircle aria-hidden className="h-4 w-4" />
                {site.primaryCta.label}
              </button>
            </ContactChoiceDialog>
          </div>
        </div>
      </div>
    </header>
  );
}
