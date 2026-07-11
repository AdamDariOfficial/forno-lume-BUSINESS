import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { site, waLink } from "@/config/site";
import { scrollToSection } from "@/lib/nav";

function idFromHref(href: string): string | null {
  const i = href.indexOf("#");
  return i >= 0 ? href.slice(i + 1) : null;
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const rafRef = useRef<number | null>(null);

  const isHome = pathname === "/";

  // Scroll-spy + visibility (home only). Elsewhere navbar is always visible.
  useEffect(() => {
    if (!isHome) {
      setVisible(true);
      setActive(null);
      return;
    }

    const ids = site.nav
      .map((n) => idFromHref(n.href))
      .filter((v): v is string => !!v);

    const compute = () => {
      rafRef.current = null;
      const y = window.scrollY;
      const activation = y + window.innerHeight * 0.35;

      const sections = ids
        .map((id) => {
          const el = document.getElementById(id);
          if (!el) return null;
          return { id, top: el.getBoundingClientRect().top + y };
        })
        .filter((s): s is { id: string; top: number } => !!s)
        .sort((a, b) => a.top - b.top);

      const first = sections[0];

      if (!first || activation < first.top - 8) {
        // still in hero
        setVisible(false);
        setActive(null);
        return;
      }

      setVisible(true);
      let current: string | null = null;
      for (const s of sections) {
        if (s.top <= activation) current = s.id;
        else break;
      }
      setActive(current);
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

  // Close drawer when resizing to desktop
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Lock body scroll while drawer is open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  const close = () => setOpen(false);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    const id = idFromHref(href);
    if (!id) return;
    e.preventDefault();
    close();
    if (isHome) {
      scrollToSection(id);
    } else {
      navigate({ to: "/", state: { scrollTo: id } as never });
    }
  };

  // Force visible whenever the drawer is open, regardless of scroll position.
  const shown = visible || open || !isHome;

  return (
    <header
      aria-hidden={!shown}
      className={`fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-md transition-[opacity,transform,translate] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] [will-change:opacity,transform] ${
        shown
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 -translate-y-full pointer-events-none"
      } motion-reduce:transition-opacity motion-reduce:transform-none`}
    >

      <div className="container-page flex h-16 items-center justify-between md:h-20">
        <Link
          to="/"
          onClick={close}
          className="flex items-center gap-2 font-display text-xl tracking-tight sm:text-2xl"
        >
          <span className="inline-block h-2 w-2 rounded-full bg-terracotta" />
          {site.brand.name}
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Sezioni">
          {site.nav.map((n) => {
            const id = idFromHref(n.href);
            const isActive = !!id && active === id;
            return (
              <a
                key={n.href}
                href={n.href}
                onClick={(e) => handleNavClick(e, n.href)}
                aria-current={isActive ? "true" : undefined}
                className={`relative text-sm transition-colors ${
                  isActive
                    ? "text-terracotta"
                    : "text-foreground/80 hover:text-terracotta"
                }`}
              >
                {n.label}
                <span
                  aria-hidden
                  className={`pointer-events-none absolute -bottom-1.5 left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-terracotta transition-all duration-300 ${
                    isActive ? "w-4 opacity-100" : "w-0 opacity-0"
                  }`}
                />
              </a>
            );
          })}
        </nav>

        <a
          href={waLink(site.contact.whatsappReserveMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90 md:inline-flex"
        >
          Prenota un tavolo
        </a>

        <button
          type="button"
          aria-label={open ? "Chiudi menu" : "Apri menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
          className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-background/70 backdrop-blur md:hidden"
        >
          <Menu
            className={`absolute h-5 w-5 transition-all duration-300 ${
              open ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
            }`}
          />
          <X
            className={`absolute h-5 w-5 transition-all duration-300 ${
              open ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
            }`}
          />
        </button>
      </div>

      {/* Overlay */}
      <div
        aria-hidden
        onClick={close}
        className={`fixed inset-0 top-16 z-40 bg-ink/30 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Drawer */}
      <div
        id="mobile-nav"
        className={`md:hidden absolute inset-x-0 top-full z-50 origin-top overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open
            ? "max-h-[80vh] opacity-100 translate-y-0"
            : "max-h-0 opacity-0 -translate-y-2"
        }`}
      >
        <div className="container-page pb-6 pt-2">
          <div className="rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-warm)]">
            <nav className="flex flex-col" aria-label="Sezioni mobile">
              {site.nav.map((n, i) => {
                const id = idFromHref(n.href);
                const isActive = !!id && active === id;
                return (
                  <a
                    key={n.href}
                    href={n.href}
                    onClick={(e) => handleNavClick(e, n.href)}
                    aria-current={isActive ? "true" : undefined}
                    style={{ transitionDelay: `${open ? i * 40 : 0}ms` }}
                    className={`flex items-center justify-between border-b border-border/60 py-4 text-base transition-all duration-300 last:border-b-0 ${
                      open ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"
                    } ${isActive ? "text-terracotta" : ""}`}
                  >
                    <span>{n.label}</span>
                    {isActive && (
                      <span
                        aria-hidden
                        className="h-1.5 w-1.5 rounded-full bg-terracotta"
                      />
                    )}
                  </a>
                );
              })}
            </nav>
            <a
              href={waLink(site.contact.whatsappReserveMessage)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}
              className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-primary px-5 py-3.5 text-sm font-medium text-primary-foreground shadow-[var(--shadow-warm)]"
            >
              Prenota un tavolo
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
