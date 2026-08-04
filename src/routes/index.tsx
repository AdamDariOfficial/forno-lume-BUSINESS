import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, MessageCircle } from "lucide-react";

import heroImg from "@/assets/hero.jpg";
import heroMobileImg from "@/assets/hero-mobile.jpg";
import aboutImg from "@/assets/about.jpg";
import dishImg from "@/assets/dish.jpg";
import fornoImg from "@/assets/gallery/forno.jpg";
import piattoImg from "@/assets/gallery/piatto.jpg";
import salaImg from "@/assets/gallery/sala.jpg";

import { site, waLink } from "@/config/site";
import { homeContent } from "@/config/home";
import { signatureItems } from "@/config/menu";
import { galleryPreview } from "@/config/gallery";
import { testimonials } from "@/config/testimonials";
import { pagesMeta } from "@/config/pages";
import { genericPageJsonLd, jsonLdScripts, seoLinks, seoMeta } from "@/lib/seo";

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
    scripts: jsonLdScripts(
      genericPageJsonLd({
        type: "WebPage",
        path: "/",
        title: pagesMeta.home.title,
        description: pagesMeta.home.description,
      }),
    ),
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <HomeLayout>
      <Hero />
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

/* Hero - editorial quiet, viewport-safe, staggered content */
function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-background md:pt-28">
      <div
        aria-hidden
        className="absolute inset-0 -z-30 hidden md:block"
        style={{
          background:
            "radial-gradient(1200px 600px at 80% -10%, oklch(0.86 0.06 60 / 0.5), transparent 60%), radial-gradient(900px 500px at -10% 20%, oklch(0.9 0.04 90 / 0.5), transparent 60%)",
        }}
      />

      <div className="relative w-full min-w-0 md:mx-auto md:grid md:max-w-[76rem] md:grid-cols-12 md:items-start md:gap-12 md:px-8 md:pb-24 md:pt-14">
        <div className="relative h-[clamp(300px,47svh,420px)] w-full min-w-0 overflow-hidden bg-[#342016] md:order-2 md:col-span-6 md:h-auto md:min-h-0 md:w-auto md:overflow-visible md:bg-transparent">
          <div className="absolute -inset-3 -z-10 hidden rounded-[2rem] bg-gradient-to-br from-accent/40 to-terracotta/10 blur-2xl md:block" />
          <div className="h-full overflow-hidden md:rounded-[1.75rem] md:border md:border-border md:shadow-[var(--shadow-warm)]">
            <picture>
              <source media="(max-width: 767px)" srcSet={heroMobileImg} />
              <img
                src={heroImg}
                alt="Una pizza artigianale viene infornata nel forno a legna"
                width={1440}
                height={1620}
                fetchPriority="high"
                className="h-full w-full object-cover object-[50%_42%] md:h-[640px] md:object-center"
              />
            </picture>
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(23,14,9,0.16),transparent_33%),linear-gradient(to_top,rgba(27,18,13,0.35),transparent_38%)] md:hidden"
          />
          <div className="absolute left-4 top-4 z-10 inline-flex items-center gap-2 rounded-full border border-white/35 bg-[#170e0961] px-3 py-2 text-[0.66rem] font-medium uppercase tracking-[0.08em] text-white backdrop-blur-md md:-bottom-4 md:-left-6 md:top-auto md:block md:rounded-2xl md:border-border md:bg-card/95 md:px-5 md:py-4 md:text-foreground md:shadow-[var(--shadow-soft)]">
            <span
              aria-hidden
              className="h-1.5 w-1.5 rounded-full bg-[#e4a076] shadow-[0_0_0_4px_rgba(228,160,118,0.16)] md:hidden"
            />
            <span className="hidden text-[0.64rem] font-medium uppercase tracking-[0.2em] text-muted-foreground md:block">
              Stasera
            </span>
            <span className="font-display normal-case tracking-normal md:mt-1 md:block md:text-lg md:leading-tight">
              Forno acceso alle 18:30
            </span>
          </div>
        </div>

        <div className="relative z-10 mx-auto -mt-12 w-[calc(100%-2rem)] min-w-0 rounded-t-[1.75rem] border border-border/70 bg-background px-5 pb-6 pt-6 shadow-[0_-18px_48px_rgba(37,23,15,0.14)] min-[390px]:px-6 md:order-1 md:col-span-6 md:mx-0 md:mt-0 md:w-auto md:rounded-none md:border-0 md:bg-transparent md:px-0 md:pb-0 md:pt-10 md:shadow-none">
          <p className="eyebrow fade-up">{site.brand.kicker}</p>
          <h1
            className="fade-up mt-3 max-w-[19rem] text-[clamp(2rem,8.7vw,2.4rem)] font-medium leading-[0.99] tracking-[-0.04em] text-foreground md:mt-5 md:max-w-none md:text-[4.2rem] md:leading-[1.05] md:tracking-tight"
            style={{ animationDelay: "80ms" }}
          >
            Cucina semplice,
            <br />
            <span className="italic text-terracotta">atmosfera calda</span>,
            <br />
            dettagli curati.
          </h1>
          <p
            className="fade-up mt-4 max-w-none text-[0.8rem] leading-[1.5] text-muted-foreground md:mt-6 md:max-w-xl md:text-lg"
            style={{ animationDelay: "160ms" }}
          >
            {site.brand.description}
          </p>
          <div
            className="fade-up mt-5 flex min-w-0 flex-col gap-2.5 md:mt-8 md:flex-row md:flex-wrap md:items-center md:gap-3"
            style={{ animationDelay: "240ms" }}
          >
            <a
              href={waLink(site.contact.whatsappReserveMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="motion-cta group inline-flex min-h-12 w-full min-w-0 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-primary px-4 py-3 text-sm font-medium text-primary-foreground shadow-[var(--shadow-warm)] hover:opacity-90 md:w-auto md:px-6 md:py-3.5"
            >
              <MessageCircle className="h-4 w-4" />
              Prenota su WhatsApp
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transform-none" />
            </a>
            <Link
              to="/menu"
              className="inline-flex min-h-10 w-full items-center justify-center whitespace-nowrap px-2 text-xs font-semibold text-terracotta-ink underline decoration-terracotta/40 underline-offset-4 transition-colors hover:decoration-terracotta md:min-h-0 md:w-auto md:rounded-full md:border md:border-border md:bg-card md:px-6 md:py-3.5 md:text-sm md:no-underline md:hover:bg-secondary"
            >
              Scopri il menu
            </Link>
          </div>
          <div
            className="fade-up mt-4 grid min-w-0 grid-cols-2 gap-x-4 gap-y-3 border-t border-border/70 pt-4 text-[0.64rem] leading-[1.35] text-muted-foreground md:mt-10 md:max-w-md md:grid-cols-3 md:gap-4 md:pt-6 md:text-xs"
            style={{ animationDelay: "320ms" }}
          >
            <div className="min-w-0">
              <strong className="mb-0.5 block font-semibold text-foreground">Orari</strong>
              <span>{"Mar\u2013Dom \u00B7 18:30\u201323:00"}</span>
            </div>
            <div className="min-w-0">
              <strong className="mb-0.5 block font-semibold text-foreground">Dove</strong>
              <span>{site.contact.area}</span>
            </div>
            <div className="col-span-2 min-w-0 md:col-span-1">
              <strong className="mb-0.5 block font-semibold text-foreground">Consiglio</strong>
              <span>Prenota prima</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Intro — assorbe il teaser "Chi siamo": include immagine editoriale
   e CTA verso /chi-siamo. */
function IntroSection() {
  return (
    <section data-navbar-threshold className="container-page py-20 md:py-28">
      <div className="grid items-center gap-10 md:grid-cols-12 md:gap-14">
        <div className="md:order-2 md:col-span-7">
          <SectionHeading eyebrow={homeContent.intro.eyebrow} title={homeContent.intro.title} />
          <Reveal delay={160} className="mt-6">
            <p className="max-w-xl text-base text-muted-foreground md:text-lg">
              {homeContent.intro.body}
            </p>
          </Reveal>
          <Reveal delay={240} className="mt-8">
            <Link
              to="/chi-siamo"
              className="group inline-flex items-center gap-2 text-sm font-medium text-terracotta-ink transition-colors duration-300 hover:text-terracotta-ink"
            >
              <span className="border-b border-terracotta/40 pb-0.5 transition-colors group-hover:border-terracotta">
                {homeContent.intro.linkLabel}
              </span>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transform-none" />
            </Link>
          </Reveal>
        </div>
        <Reveal variant="image" delay={240} className="md:order-1 md:col-span-5">
          <div className="overflow-hidden rounded-3xl border border-border shadow-[var(--shadow-soft)]">
            <img
              src={aboutImg}
              alt="Le mani di un pizzaiolo preparano una base con pomodoro e mozzarella"
              loading="lazy"
              width={1200}
              height={1500}
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
          <Reveal delay={160}>
            <p className="max-w-md text-sm text-muted-foreground md:text-[15px]">
              Una selezione essenziale delle proposte più rappresentative di Forno Lume. Il menu
              completo cambia con le stagioni.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <MenuPreviewList items={signatureItems} />
            <Reveal delay={160} className="mt-8">
              <Link
                to="/menu"
                className="motion-cta inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-medium hover:bg-secondary"
              >
                Vedi il menu completo
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
          <div className="md:col-span-5">
            <div className="sticky top-24">
              <Reveal variant="image" delay={160}>
                <div className="overflow-hidden rounded-3xl border border-border">
                  <img
                    src={dishImg}
                    alt="Pizza Margherita servita su un tavolo rustico"
                    loading="lazy"
                    width={1400}
                    height={1400}
                    className="h-72 w-full object-cover md:h-[440px]"
                  />
                  <div className="bg-card p-6">
                    <p className="text-sm text-muted-foreground">
                      Vuoi scoprire cosa c'è in carta questa sera? Scrivici per prenotare il tuo
                      tavolo.
                    </p>
                    <a
                      href={waLink(site.contact.whatsappReserveMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="motion-cta mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:opacity-90"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Prenota un tavolo
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Experience trio — alternating rows, not identical cards */
function ExperienceTrio() {
  const media = [
    {
      src: fornoImg,
      alt: "Una pizza cuoce nel calore di un forno a legna tradizionale",
      width: 1600,
      height: 1200,
    },
    {
      src: piattoImg,
      alt: "Piatto di pasta ai frutti di mare con olive e calice di vino",
      width: 1400,
      height: 1400,
    },
    {
      src: salaImg,
      alt: "Interno accogliente di un ristorante italiano con arredi in legno",
      width: 1600,
      height: 1200,
    },
  ] as const;

  return (
    <section className="border-y border-border bg-secondary/30">
      <div className="container-page py-20 md:py-24">
        <div className="max-w-2xl">
          <SectionHeading eyebrow="L'esperienza" title="Poche cose, scelte bene." />
        </div>
        <div className="mt-14 space-y-16 md:space-y-24">
          {homeContent.experience.map((s, i) => {
            const reverse = i % 2 === 1;
            const image = media[i];
            return (
              <div key={s.id} className="grid items-center gap-8 md:grid-cols-12 md:gap-14">
                <div className={`md:col-span-6 ${reverse ? "md:order-1" : "md:order-2"}`}>
                  <Reveal>
                    <p className="eyebrow">{s.eyebrow}</p>
                  </Reveal>
                  <Reveal delay={80} className="mt-4">
                    <h3 className="font-display text-3xl leading-tight md:text-4xl">{s.title}</h3>
                  </Reveal>
                  <Reveal delay={160} className="mt-4">
                    <p className="text-muted-foreground md:text-lg">{s.body}</p>
                  </Reveal>
                </div>
                <Reveal
                  variant="image"
                  delay={240}
                  className={`md:col-span-6 ${reverse ? "md:order-2" : "md:order-1"}`}
                >
                  <div className="overflow-hidden rounded-3xl border border-border shadow-[var(--shadow-soft)]">
                    <img
                      src={image.src}
                      alt={image.alt}
                      loading="lazy"
                      width={image.width}
                      height={image.height}
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
    <section className="container-page py-20 md:py-28">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow={homeContent.galleryPreview.eyebrow}
          title={homeContent.galleryPreview.title}
        />
        <Reveal delay={160}>
          <Link
            to="/galleria"
            className="inline-flex items-center gap-2 text-sm font-medium text-terracotta-ink transition-opacity duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:opacity-95"
          >
            Apri la galleria
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Reveal>
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
            <Reveal as="li" key={t.name} delay={i * 80}>
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
          <Reveal delay={160} className="mt-6">
            <p className="text-sm text-muted-foreground md:text-[15px]">
              Cucina aperta dal martedì alla domenica. Nel weekend consigliamo di prenotare in
              anticipo.
            </p>
          </Reveal>
          <Reveal delay={160} className="mt-8">
            <div className="rounded-2xl border border-border bg-card/60 p-5 md:p-6">
              <OpeningHours />
            </div>
          </Reveal>
          <Reveal delay={240} className="mt-8">
            <Link
              to="/contatti"
              className="motion-cta inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-medium hover:bg-secondary"
            >
              Vedi tutti i contatti
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
        <Reveal delay={240} className="min-w-0 md:col-span-7">
          <MapEmbed />
        </Reveal>
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
            <SectionHeading eyebrow="Domande frequenti" title="Le risposte più comuni." />
            <Reveal delay={160} className="mt-4">
              <p className="text-muted-foreground">
                Non trovi quello che cerchi? Scrivici su WhatsApp, rispondiamo in breve tempo.
              </p>
            </Reveal>
          </div>
          <div className="md:col-span-8">
            <FAQAccordion items={homeContent.faq} />
          </div>
        </div>
      </div>
    </section>
  );
}
