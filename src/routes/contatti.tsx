import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Clock, Phone, Mail, MessageCircle } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { ContactActions } from "@/components/site/ContactActions";
import { OpeningHours } from "@/components/site/OpeningHours";
import { MapEmbed } from "@/components/site/MapEmbed";
import { CTASection } from "@/components/site/CTASection";
import { Reveal } from "@/components/site/Reveal";
import { site, mailLink, telLink, waLink } from "@/config/site";
import { pagesMeta } from "@/config/pages";
import { genericPageJsonLd, jsonLdScripts, seoLinks, seoMeta } from "@/lib/seo";

export const Route = createFileRoute("/contatti")({
  head: () => ({
    meta: seoMeta({
      title: pagesMeta.contact.title,
      description: pagesMeta.contact.description,
      path: "/contatti",
    }),
    links: seoLinks("/contatti"),
    scripts: jsonLdScripts(
      genericPageJsonLd({
        type: "ContactPage",
        path: "/contatti",
        title: pagesMeta.contact.title,
        description: pagesMeta.contact.description,
      }),
    ),
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Contatti"
        title={`Ci trovi\nin centro a ${site.contact.city}.`}
        subtitle="Il modo più veloce per prenotare è WhatsApp. Ti rispondiamo in breve tempo con disponibilità e orario."
      />

      <section className="container-page pb-8">
        <ContactActions />
      </section>

      <section className="container-page py-14 md:py-20">
        <div className="grid gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-5">
            <Reveal>
              <p className="eyebrow">Informazioni</p>
            </Reveal>
            <Reveal delay={80} className="mt-4">
              <h2 className="font-display text-3xl md:text-4xl">Dove siamo</h2>
            </Reveal>

            <Reveal delay={160} className="mt-8">
              <dl className="space-y-5 text-sm">
                <InfoRow icon={MapPin} label="Indirizzo" value={site.contact.address} />
                <InfoRow
                  icon={Phone}
                  label="Telefono"
                  value={site.contact.phone}
                  href={telLink()}
                />
                <InfoRow
                  icon={MessageCircle}
                  label="WhatsApp"
                  value={site.contact.whatsappNumber}
                  href={waLink(site.contact.whatsappReserveMessage)}
                  external
                />
                <InfoRow
                  icon={Mail}
                  label="Email"
                  value={site.contact.email}
                  href={mailLink()}
                />
              </dl>
            </Reveal>

            <Reveal delay={240} className="mt-10">
              <p className="eyebrow">Orari settimanali</p>
              <div className="mt-4 flex items-start gap-3">
                <Clock className="mt-1 h-4 w-4 shrink-0 text-terracotta" />
                <div className="min-w-0 flex-1">
                  <OpeningHours />
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={240} className="min-w-0 md:col-span-7">
            <MapEmbed />
            <p className="mt-4 text-sm text-muted-foreground">
              Siamo in centro a {site.contact.city}, ben serviti da mezzi
              pubblici e a breve distanza dai principali parcheggi cittadini.
            </p>
          </Reveal>
        </div>
      </section>

      <CTASection
        title="Un messaggio,"
        accent="e il tavolo è tuo."
        body="Scrivici su WhatsApp con giorno, orario e numero di persone: ti confermiamo in breve tempo."
      />
    </SiteLayout>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
  href,
  external,
}: {
  icon: typeof MapPin;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}) {
  const content = (
    <div className="flex items-start gap-4">
      <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-terracotta/10 text-terracotta">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <dt className="text-xs uppercase tracking-widest text-muted-foreground">
          {label}
        </dt>
        <dd className="mt-1 text-[15px] text-foreground">{value}</dd>
      </div>
    </div>
  );
  return href ? (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="block transition hover:text-terracotta-ink"
    >
      {content}
    </a>
  ) : (
    content
  );
}
