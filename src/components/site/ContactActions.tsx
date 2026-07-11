import { MessageCircle, Phone, MapPin } from "lucide-react";
import { site, waLink, telLink } from "@/config/site";

export function ContactActions() {
  return (
    <ul className="grid gap-3 sm:grid-cols-3">
      <li>
        <a
          href={waLink(site.contact.whatsappReserveMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex h-full items-center gap-3 rounded-2xl border border-border bg-card p-5 transition hover:border-terracotta/40 hover:bg-secondary/40"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-terracotta/10 text-terracotta">
            <MessageCircle className="h-5 w-5" />
          </span>
          <span className="min-w-0">
            <span className="block text-xs uppercase tracking-widest text-muted-foreground">
              WhatsApp
            </span>
            <span className="mt-0.5 block truncate text-sm text-foreground">
              Scrivici su WhatsApp
            </span>
          </span>
        </a>
      </li>
      <li>
        <a
          href={telLink()}
          className="group flex h-full items-center gap-3 rounded-2xl border border-border bg-card p-5 transition hover:border-terracotta/40 hover:bg-secondary/40"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-terracotta/10 text-terracotta">
            <Phone className="h-5 w-5" />
          </span>
          <span className="min-w-0">
            <span className="block text-xs uppercase tracking-widest text-muted-foreground">
              Telefono
            </span>
            <span className="mt-0.5 block truncate text-sm text-foreground">
              {site.contact.phone}
            </span>
          </span>
        </a>
      </li>
      <li>
        <a
          href={site.contact.mapExternalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex h-full items-center gap-3 rounded-2xl border border-border bg-card p-5 transition hover:border-terracotta/40 hover:bg-secondary/40"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-terracotta/10 text-terracotta">
            <MapPin className="h-5 w-5" />
          </span>
          <span className="min-w-0">
            <span className="block text-xs uppercase tracking-widest text-muted-foreground">
              Maps
            </span>
            <span className="mt-0.5 block truncate text-sm text-foreground">
              Apri su Google Maps
            </span>
          </span>
        </a>
      </li>
    </ul>
  );
}