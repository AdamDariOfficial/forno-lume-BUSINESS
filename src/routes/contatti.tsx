import { createFileRoute } from "@tanstack/react-router";
import { Clock } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { ContactActions } from "@/components/site/ContactActions";
import { OpeningHours } from "@/components/site/OpeningHours";
import { MapEmbed } from "@/components/site/MapEmbed";
import { CTASection } from "@/components/site/CTASection";
import { Reveal } from "@/components/site/Reveal";
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
        title={`Ci trovi\nin zona Prato della Valle.`}
        subtitle="Il modo più veloce per prenotare è WhatsApp. Ti rispondiamo in breve tempo con disponibilità e orario."
      />

      <section className="container-page pb-10 md:pb-12">
        <ContactActions />
      </section>

      <section className="container-page py-14 sm:py-16 md:py-20 min-[1100px]:py-24">
        <div className="mb-7 sm:mb-8 md:mb-10">
          <Reveal>
            <p className="eyebrow">Dove siamo &amp; orari</p>
          </Reveal>
          <Reveal delay={80} className="mt-4">
            <h2 className="font-display text-3xl leading-tight md:text-4xl">
              Orari e posizione, in un colpo d'occhio.
            </h2>
          </Reveal>
        </div>

        <div className="grid items-start gap-6 sm:gap-8 min-[1100px]:grid-cols-12 min-[1100px]:items-stretch min-[1100px]:gap-10 xl:gap-12">
          <Reveal delay={160} className="min-w-0 min-[1100px]:col-span-5">
            <div className="flex items-start gap-3 rounded-3xl border border-border bg-secondary/30 p-5 sm:p-6 md:p-7 min-[1100px]:h-full min-[1100px]:p-8">
              <Clock className="mt-1 h-4 w-4 shrink-0 text-terracotta" />
              <div className="min-w-0 flex-1">
                <p className="eyebrow">Orari settimanali</p>
                <div className="mt-4">
                  <OpeningHours />
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={160} className="min-w-0 min-[1100px]:col-span-7">
            <MapEmbed />
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
