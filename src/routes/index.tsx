import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, MessageCircle, Clock, MapPin, Leaf } from "lucide-react";

import heroImg from "@/assets/hero.jpg";
import aboutImg from "@/assets/about.jpg";
import dishImg from "@/assets/dish.jpg";
import fornoImg from "@/assets/gallery/forno.jpg";
import salaImg from "@/assets/gallery/sala.jpg";

import { site, waLink } from "@/config/site";
import { homeContent } from "@/config/home";
import { signatureItems } from "@/config/menu";
import { galleryPreview } from "@/config/gallery";
import { testimonials } from "@/config/testimonials";
import { pagesMeta } from "@/config/pages";
import { seoMeta, seoLinks, restaurantJsonLd } from "@/lib/seo";

import { HomeLayout } from "@/components/site/HomeLayout";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { MenuPreviewList } from "@/components/site/MenuList";
import { GalleryPreviewGrid } from "@/components/site/GalleryGrid";
import { TestimonialCard } from "@/components/site/TestimonialCard";
import { FAQAccordion } from "@/components/site/FAQAccordion";
import { CTASection } from "@/components/site/CTASection";
import { MapEmbed } from "@/components/site/MapEmbed";
import { OpeningHours } from "@/components/site/OpeningHours";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: seoMeta({
      title: pagesMeta.home.title,
      description: pagesMeta.home.description,
      path: "/",
    }),
    links: seoLinks("/"),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(restaurantJsonLd()),
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <HomeLayout>
      <Hero />
      <TrustStrip />
      <IntroSection />
      <SignaturePreview />
      <ExperienceTrio />
      <GalleryPreview />
      <TestimonialsSection />
      <PracticalPreview />
      <FAQPreview />
      <CTASection
        title="Vuoi riservare un tavolo"
        accent="per questa sera?"
        body="Scrivici in pochi secondi: ti confermeremo disponibilità, orari e dettagli."
      />
    </HomeLayout>
  );
}

/* Hero */
function Hero() {
  return (
    <section className="relative overflow-hidden pt-24 md:pt-28">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(1200px 600px at 80% -10%, oklch(0.86 0.06 60 / 0.5), transparent 60%), radial-gradient(900px 500px at -10% 20%, oklch(0.9 0.04 90 / 0.5), transparent 60%)",
        }}
      />
      <div className="container-page grid gap-10 pb-16 pt-8 md:grid-cols-12 md:gap-12 md:pb-24 md:pt-14">
        <div className="fade-up md:col-span-6 md:pt-10">
          <p className="eyebrow">{site.brand.kicker}</p>
          <h1 className="mt-5 text-[2.6rem] leading-[1.05] font-medium tracking-tight text-foreground sm:text-6xl md:text-[4.2rem]">
            Cucina semplice,
            <br />
            <span className="italic text-terracotta">atmosfera calda</span>,
            <br />
            dettagli curati.
          </h1>
          <p className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
            {site.brand.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={waLink(site.contact.whatsappReserveMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-[var(--shadow-warm)] transition hover:opacity-90"
            >
              <MessageCircle className="h-4 w-4" />
              Prenota su WhatsApp
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 text-sm font-medium transition hover:bg-secondary"
            >
              Scopri il menu
            </Link>
          </div>
          <div className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-border pt-6 text-xs text-muted-foreground">
            <div className="flex flex-col gap-1">
              <Clock className="h-4 w-4 text-terracotta" />
              <span>Mar–Dom<br />18:30–23:00</span>
            </div>
            <div className="flex flex-col gap-1">
              <MapPin className="h-4 w-4 text-terracotta" />
              <span>{site.contact.streetAddress}<br />{site.contact.city}</span>
            </div>
            <div className="flex flex-col gap-1">
              <Leaf className="h-4 w-4 text-terracotta" />
              <span>Prenotazione consigliata</span>
            </div>
          </div>
        </div>
        <div className="fade-up md:col-span-6">
          <div className="relative">
            <div className="absolute -inset-3 -z-10 rounded-[2rem] bg-gradient-to-br from-accent/40 to-terracotta/10 blur-2xl" />
            <div className="overflow-hidden rounded-[1.75rem] border border-border shadow-[var(--shadow-warm)]">
              <img
                src={heroImg}
                alt="Interno accogliente di Forno Lume con forno a legna acceso e pizza Margherita fumante in primo piano"
                width={1600}
                height={1808}
                fetchPriority="high"
                className="h-[520px] w-full object-cover md:h-[640px]"
              />
            </div>
            <div className="absolute -bottom-4 left-4 hidden rounded-2xl border border-border bg-card/95 px-5 py-4 shadow-[var(--shadow-soft)] backdrop-blur sm:block md:-left-6">
              <p className="eyebrow">Stasera</p>
              <p className="mt-1 font-display text-lg leading-tight">
                Forno acceso alle 18:30
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Trust strip */
function TrustStrip() {
  return (
    <section className="border-y border-border bg-secondary/40">
      <div className="container-page grid grid-cols-2 gap-6 py-8 md:grid-cols-4 md:gap-4 md:py-10">
        {homeContent.trust.map((t) => (
          <div
            key={t.label}
            className="flex items-center gap-3 text-sm md:justify-center"
          >
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-terracotta" />
            <span className="text-foreground/80">{t.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* Intro — assorbe il teaser "Chi siamo": include immagine editoriale
   e CTA verso /chi-siamo. */
function IntroSection() {
  return (
    <section className="container-page py-20 md:py-28">
      <div className="grid items-center gap-10 md:grid-cols-12 md:gap-14">
        <div className="md:col-span-7">
          <SectionHeading
            eyebrow={homeContent.intro.eyebrow}
            title={homeContent.intro.title}
          />
          <p className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
            {homeContent.intro.body}
          </p>
          <Link
            to="/chi-siamo"
            className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-terracotta transition-colors hover:text-terracotta/80"
          >
            <span className="border-b border-terracotta/40 pb-0.5 transition-colors group-hover:border-terracotta">
              {homeContent.intro.linkLabel}
            </span>
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
        <Reveal className="md:col-span-5">
          <div className="overflow-hidden rounded-3xl border border-border shadow-[var(--shadow-soft)]">
            <img
              src={aboutImg}
              alt="Le mani di un fornaio lavorano l'impasto su un tagliere infarinato"
              loading="lazy"
              width={1408}
              height={1600}
              className="h-72 w-full object-cover md:h-[440px]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* Signature menu preview */
function SignaturePreview() {
  return (
    <section className="relative py-20 md:py-28">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-secondary/50 to-transparent"
      />
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Proposte signature" title="Una piccola selezione" />
          <p className="max-w-md text-sm text-muted-foreground md:text-[15px]">
            Una selezione essenziale delle proposte più rappresentative di
            Forno Lume. Il menu completo cambia con le stagioni.
          </p>
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <MenuPreviewList items={signatureItems} />
            <Link
              to="/menu"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-medium transition hover:bg-secondary"
            >
              Vedi il menu completo
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="md:col-span-5">
            <div className="sticky top-24 overflow-hidden rounded-3xl border border-border">
              <img
                src={dishImg}
                alt="Burrata con pomodorini datterino e basilico su ceramica rustica"
                loading="lazy"
                width={1408}
                height={1408}
                className="h-72 w-full object-cover md:h-[440px]"
              />
              <div className="bg-card p-6">
                <p className="text-sm text-muted-foreground">
                  Vuoi scoprire cosa c'è in carta questa sera? Scrivici per
                  prenotare il tuo tavolo.
                </p>
                <a
                  href={waLink(site.contact.whatsappReserveMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90"
                >
                  <MessageCircle className="h-4 w-4" />
                  Prenota un tavolo
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Experience trio — alternating rows, not identical cards */
function ExperienceTrio() {
  const imgs = [fornoImg, dishImg, salaImg];
  const alts = [
    "Il forno a legna acceso, con la fiamma che riscalda la volta",
    "Piatto di burrata con datterini confit su ceramica rustica",
    "Angolo della sala con luce calda e tavoli in legno",
  ];
  return (
    <section className="border-y border-border bg-secondary/30">
      <div className="container-page py-20 md:py-24">
        <div className="max-w-2xl">
          <SectionHeading
            eyebrow="L'esperienza"
            title="Poche cose, scelte bene."
          />
        </div>
        <div className="mt-14 space-y-16 md:space-y-24">
          {homeContent.experience.map((s, i) => {
            const reverse = i % 2 === 1;
            return (
              <div
                key={s.id}
                className="grid items-center gap-8 md:grid-cols-12 md:gap-14"
              >
                <Reveal
                  className={`md:col-span-6 ${reverse ? "md:order-1" : "md:order-2"}`}
                >
                  <p className="eyebrow">{s.eyebrow}</p>
                  <h3 className="mt-4 font-display text-3xl leading-tight md:text-4xl">
                    {s.title}
                  </h3>
                  <p className="mt-4 text-muted-foreground md:text-lg">
                    {s.body}
                  </p>
                </Reveal>
                <Reveal
                  delay={80}
                  className={`md:col-span-6 ${reverse ? "md:order-2" : "md:order-1"}`}
                >
                  <div className="overflow-hidden rounded-3xl border border-border shadow-[var(--shadow-soft)]">
                    <img
                      src={imgs[i]}
                      alt={alts[i]}
                      loading="lazy"
                      width={1600}
                      height={1200}
                      className="h-72 w-full object-cover md:h-[420px]"
                    />
                  </div>
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* Gallery preview */
function GalleryPreview() {
  return (
    <section className="container-page pb-20 md:pb-28">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow={homeContent.galleryPreview.eyebrow}
          title={homeContent.galleryPreview.title}
        />
        <Link
          to="/galleria"
          className="inline-flex items-center gap-2 text-sm font-medium text-terracotta transition hover:opacity-80"
        >
          Apri la galleria
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="mt-10">
        <GalleryPreviewGrid images={galleryPreview} />
      </div>
    </section>
  );
}

/* Testimonials */
function TestimonialsSection() {
  return (
    <section className="border-t border-border bg-secondary/30">
      <div className="container-page py-20 md:py-24">
        <SectionHeading eyebrow="Cosa dicono" title="Parole di chi è tornato." />
        <ul className="mt-12 grid gap-5 md:grid-cols-3 md:gap-6">
          {testimonials.map((t, i) => (
            <Reveal as="li" key={t.name} delay={i * 100}>
              <TestimonialCard item={t} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* Practical info preview — tabella completa degli orari + mappa. */
function PracticalPreview() {
  return (
    <section className="container-page py-20 md:py-28">
      <div className="grid gap-10 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-5">
          <SectionHeading
            eyebrow="Informazioni pratiche"
            title={"Dove siamo, \nquando siamo aperti."}
          />
          <p className="mt-6 text-sm text-muted-foreground md:text-[15px]">
            Cucina aperta dal martedì alla domenica. Nel weekend consigliamo
            di prenotare in anticipo.
          </p>
          <div className="mt-8 rounded-2xl border border-border bg-card/60 p-5 md:p-6">
            <OpeningHours />
          </div>
          <Link
            to="/contatti"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-medium transition hover:bg-secondary"
          >
            Vedi tutti i contatti
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="min-w-0 md:col-span-7">
          <MapEmbed />
          <p className="mt-4 flex items-start gap-2 text-sm text-muted-foreground">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-terracotta" />
            <span>{site.contact.address}</span>
          </p>
        </div>
      </div>
    </section>
  );
}

/* FAQ preview */
function FAQPreview() {
  return (
    <section className="border-t border-border bg-secondary/30">
      <div className="container-page py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <SectionHeading
              eyebrow="Domande frequenti"
              title="Le risposte più comuni."
            />
            <p className="mt-4 text-muted-foreground">
              Non trovi quello che cerchi? Scrivici su WhatsApp, rispondiamo in breve tempo.
            </p>
          </div>
          <div className="md:col-span-8">
            <FAQAccordion items={homeContent.faq} />
          </div>
        </div>
      </div>
    </section>
  );
}
