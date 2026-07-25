import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { site, mailLink, telLink, waLink } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link
              to="/"
              className="flex items-center gap-2 font-display text-2xl"
            >
              <span className="inline-block h-2 w-2 rounded-full bg-terracotta" />
              {site.brand.name}
            </Link>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              {site.brand.tagline}
            </p>
          </div>

          <div className="text-sm">
            <p className="eyebrow">Naviga</p>
            <ul className="mt-4 space-y-2 text-foreground/80">
              {site.mainNav.map((n) => (
                <li key={n.to}>
                  <Link
                    to={n.to}
                    activeOptions={n.to === "/" ? { exact: true } : undefined}
                    className="transition-colors hover:text-terracotta-ink"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-sm">
            <p className="eyebrow">Contatti</p>
            <ul className="mt-4 space-y-2 text-foreground/80">
              <li>
                <a className="hover:text-terracotta-ink" href={mailLink()}>
                  {site.contact.email}
                </a>
              </li>
              <li>
                <a className="hover:text-terracotta-ink" href={telLink()}>
                  {site.contact.phone}
                </a>
              </li>
              <li>
                <a
                  className="hover:text-terracotta-ink"
                  href={waLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
              </li>
              <li>{site.contact.address}</li>
            </ul>
          </div>

          <div className="text-sm">
            <p className="eyebrow">Orari</p>
            <ul className="mt-4 space-y-1.5 text-foreground/80">
              {site.hoursWeekly.map((h) => (
                <li
                  key={h.day}
                  className="flex items-baseline justify-between gap-4"
                >
                  <span className="text-muted-foreground">{h.short}</span>
                  <span className={h.closed ? "text-muted-foreground" : ""}>
                    {h.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {site.legal.company}. Tutti i diritti
            riservati.
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 sm:justify-end">
            <p>
              Progettato e sviluppato da{" "}
              <a
                href="https://tretnix.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-medium text-terracotta-ink underline decoration-terracotta/45 underline-offset-4 transition-colors hover:text-terracotta-ink hover:decoration-terracotta focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Tretnix
                <ArrowUpRight aria-hidden="true" className="h-3 w-3" />
              </a>
            </p>
            <ul className="flex gap-4">
              <li>
                <Link className="hover:text-terracotta-ink" to="/privacy">
                  Privacy
                </Link>
              </li>
              <li>
                <Link className="hover:text-terracotta-ink" to="/cookie">
                  Cookie
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}