import { ArrowUpRight, Mail, MessageCircle, Phone } from "lucide-react";

import { mailLink, site, telLink, waLink } from "@/config/site";
import { Reveal } from "./Reveal";

export function ContactActions() {
  return (
    <ul className="grid gap-3 md:grid-cols-2">
      <Reveal as="li" className="md:col-span-2">
        <a
          href={waLink(site.contact.whatsappReserveMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="featured-action-card group flex min-h-32 items-center justify-between gap-5 rounded-3xl border border-terracotta/30 bg-primary p-6 text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:p-7"
        >
          <span className="flex min-w-0 items-center gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/12 text-primary-foreground">
              <MessageCircle aria-hidden className="h-5 w-5" />
            </span>
            <span className="min-w-0">
              <span className="block text-xs uppercase tracking-[0.18em] text-primary-foreground/75">
                Prenotazione
              </span>
              <span className="mt-1 block text-lg font-medium sm:text-xl">Prenota su WhatsApp</span>
              <span className="mt-1 block text-sm text-primary-foreground/80">
                Scrivi giorno, orario e numero di persone.
              </span>
            </span>
          </span>
          <ArrowUpRight
            aria-hidden
            className="hidden h-5 w-5 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none sm:block"
          />
        </a>
      </Reveal>

      <Reveal as="li" delay={70}>
        <a
          href={telLink()}
          className="interactive-card group flex h-full items-center gap-3 rounded-2xl border border-border bg-card p-5"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-terracotta/10 text-terracotta">
            <Phone aria-hidden className="h-5 w-5" />
          </span>
          <span className="min-w-0">
            <span className="block text-xs uppercase tracking-widest text-muted-foreground">Telefono</span>
            <span className="mt-0.5 block truncate text-sm text-foreground">{site.contact.phone}</span>
          </span>
        </a>
      </Reveal>

      <Reveal as="li" delay={140}>
        <a
          href={mailLink()}
          className="interactive-card group flex h-full items-center gap-3 rounded-2xl border border-border bg-card p-5"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-terracotta/10 text-terracotta">
            <Mail aria-hidden className="h-5 w-5" />
          </span>
          <span className="min-w-0">
            <span className="block text-xs uppercase tracking-widest text-muted-foreground">Email</span>
            <span className="mt-0.5 block truncate text-sm text-foreground">{site.contact.email}</span>
          </span>
        </a>
      </Reveal>
    </ul>
  );
}
