import { Link } from "@tanstack/react-router";
import { site, mailLink, telLink } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 font-display text-2xl">
              <span className="inline-block h-2 w-2 rounded-full bg-terracotta" />
              {site.brand.name}
            </div>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              {site.brand.tagline}
            </p>
          </div>

          <div className="text-sm">
            <p className="eyebrow">Contatti</p>
            <ul className="mt-4 space-y-2 text-foreground/80">
              <li>
                <a className="hover:text-terracotta" href={mailLink()}>
                  {site.contact.email}
                </a>
              </li>
              <li>
                <a className="hover:text-terracotta" href={telLink()}>
                  {site.contact.phone}
                </a>
              </li>
              <li>{site.contact.address}</li>
              <li className="text-muted-foreground">{site.contact.hours}</li>
            </ul>
          </div>

          <div className="text-sm">
            <p className="eyebrow">Legale</p>
            <ul className="mt-4 space-y-2">
              <li>
                <Link className="hover:text-terracotta" to="/privacy">
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link className="hover:text-terracotta" to="/cookie">
                  Cookie policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {site.legal.company}. Tutti i diritti
            riservati.
          </p>
          <p className="opacity-70">Demo template by Tretnix</p>
        </div>
      </div>
    </footer>
  );
}
