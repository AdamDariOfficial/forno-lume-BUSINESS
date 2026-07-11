import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Clock,
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Leaf,
  Flame,
  Wine,
  ChevronDown,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter, useRouterState } from "@tanstack/react-router";

import heroImg from "@/assets/hero.jpg";
import aboutImg from "@/assets/about.jpg";
import dishImg from "@/assets/dish.jpg";
import { site, waLink, mailLink, telLink } from "@/config/site";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";
import { scrollToSection } from "@/lib/nav";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Forno Lume | Bistrot e pizzeria contemporanea a Padova" },
      {
        name: "description",
        content:
          "Un piccolo locale contemporaneo con cucina semplice, ingredienti selezionati, pizza curata e atmosfera calda. Prenota su WhatsApp.",
      },
      {
        property: "og:title",
        content: "Forno Lume | Bistrot e pizzeria contemporanea a Padova",
      },
      {
        property: "og:description",
        content:
          "Un piccolo locale contemporaneo con cucina semplice, ingredienti selezionati, pizza curata e atmosfera calda. Prenota su WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Restaurant",
          name: "Forno Lume",
          description:
            "Bistrot e pizzeria contemporanea con cucina semplice e atmosfera calda.",
          servesCuisine: ["Italian", "Pizza"],
          address: {
            "@type": "PostalAddress",
            streetAddress: "Via Roma 24",
            addressLocality: "Padova",
            addressCountry: "IT",
          },
          telephone: "+39 000 000 0000",
          openingHours: "Tu-Su 18:30-23:00",
        }),
      },
    ],
  }),
  component: HomePage,
});

const offerIcons = [Leaf, Flame, Wine];

function HomePage() {
  const router = useRouter();
  const scrollTo = useRouterState({
    select: (s) => (s.location.state as { scrollTo?: string } | undefined)?.scrollTo,
  });

  useEffect(() => {
    if (!scrollTo) return;
    // Wait a frame so the target section is mounted, then scroll and clear state.
    const id = scrollTo;
    const t = window.setTimeout(() => {
      scrollToSection(id);
      router.navigate({
        to: ".",
        replace: true,
        state: (prev) => {
          const { scrollTo: _drop, ...rest } = (prev ?? {}) as unknown as Record<string, unknown>;
          return rest as never;
        },
      });
    }, 60);
    return () => window.clearTimeout(t);
  }, [scrollTo, router]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <ExperienceSection />
        <OfferSection />
        <MenuPreview />
        <AboutSection />
        <MethodSection />
        <CTASection />
        <PracticalInfo />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}

/* ─────────── Hero ─────────── */
function Hero() {
  return (
    <section className="relative overflow-hidden pt-24 md:pt-28">
      {/* soft warm background */}
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
            <a
              href="#menu"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 text-sm font-medium transition hover:bg-secondary"
            >
              Scopri il menu
            </a>
          </div>

          <div className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-border pt-6 text-xs text-muted-foreground">
            <div className="flex flex-col gap-1">
              <Clock className="h-4 w-4 text-terracotta" />
              <span>Mar–Dom<br />18:30–23:00</span>
            </div>
            <div className="flex flex-col gap-1">
              <MapPin className="h-4 w-4 text-terracotta" />
              <span>Via Roma 24<br />Padova</span>
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

/* ─────────── Trust strip ─────────── */
function TrustStrip() {
  return (
    <section className="border-y border-border bg-secondary/40">
      <div className="container-page grid grid-cols-2 gap-6 py-8 md:grid-cols-4 md:gap-4 md:py-10">
        {site.trust.map((t) => (
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

/* ─────────── Experience anchor section (offering intro) ─────────── */
function ExperienceSection() {
  return (
    <section id="esperienza" className="container-page py-20 md:py-28">
      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="eyebrow">L'esperienza</p>
          <h2 className="mt-4 text-4xl font-medium leading-[1.1] md:text-5xl">
            Poche cose,
            <br />
            <span className="italic text-terracotta">scelte bene.</span>
          </h2>
        </div>
        <p className="md:col-span-7 md:pt-4 text-base text-muted-foreground md:text-lg">
          Forno Lume è pensato come un piccolo rifugio urbano. Un menu essenziale
          che cambia con le stagioni, impasti curati, una carta dei vini
          selezionata e un servizio che mette a proprio agio senza formalità
          inutili.
        </p>
      </div>
    </section>
  );
}

/* ─────────── Offer / three cards ─────────── */
function OfferSection() {
  return (
    <section className="container-page pb-8 md:pb-16">
      <div className="grid gap-5 md:grid-cols-3 md:gap-6">
        {site.offer.map((o, i) => {
          const Icon = offerIcons[i] ?? Leaf;
          return (
            <Reveal key={o.title} as="article" delay={i * 120}>
              <div className="experience-card relative h-full overflow-hidden rounded-3xl border border-border bg-card p-7 md:p-8">
                <div className="experience-card-icon flex h-11 w-11 items-center justify-center rounded-full bg-terracotta/10 text-terracotta">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="experience-card-title mt-6 font-display text-2xl leading-tight">
                  {o.title}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground md:text-[15px]">
                  {o.body}
                </p>
                <div className="mt-8 flex items-center gap-2 border-t border-border pt-4 text-xs uppercase tracking-widest text-muted-foreground">
                  <span className="h-px w-6 bg-terracotta" />
                  {o.detail}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

/* ─────────── Menu preview ─────────── */
function MenuPreview() {
  return (
    <section id="menu" className="relative py-20 md:py-28">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-secondary/50 to-transparent"
      />
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Anteprima menu</p>
            <h2 className="mt-4 text-4xl font-medium md:text-5xl">
              Una piccola selezione
            </h2>
          </div>
          <p className="max-w-md text-sm text-muted-foreground md:text-[15px]">
            Una selezione essenziale delle proposte più rappresentative di
            Forno Lume: piatti semplici, lievitati curati e piccoli assaggi
            pensati per accompagnare la serata.
          </p>
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-12">
          <ul className="md:col-span-7 divide-y divide-border/70">
            {site.menu.map((m, i) => (
              <Reveal
                key={m.name}
                as="li"
                delay={i * 70}
                className="grid grid-cols-[1fr_auto] items-baseline gap-4 py-5"
              >
                <div className="min-w-0">
                  <p className="font-display text-xl leading-tight">
                    {m.name}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{m.desc}</p>
                </div>
                <span className="shrink-0 font-display text-lg text-terracotta">
                  €{m.price}
                </span>
              </Reveal>
            ))}
          </ul>

          <div className="md:col-span-5">
            <div className="sticky top-24 overflow-hidden rounded-3xl border border-border">
              <img
                src={dishImg}
                alt="Burrata con pomodorini e basilico servita su ceramica rustica"
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
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90 hover:-translate-y-0.5"
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

/* ─────────── About ─────────── */
function AboutSection() {
  return (
    <section id="chi-siamo" className="container-page py-20 md:py-28">
      <div className="grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-6">
          <div className="overflow-hidden rounded-3xl border border-border shadow-[var(--shadow-soft)]">
            <img
              src={aboutImg}
              alt="Le mani di un fornaio lavorano l'impasto su un tagliere di legno infarinato"
              loading="lazy"
              width={1408}
              height={1600}
              className="h-[420px] w-full object-cover md:h-[560px]"
            />
          </div>
        </div>
        <div className="md:col-span-6 md:pt-6">
          <p className="eyebrow">Chi siamo</p>
          <h2 className="mt-4 text-4xl font-medium leading-[1.1] md:text-5xl">
            Un locale piccolo,
            <br />
            <span className="italic text-terracotta">curato e sincero.</span>
          </h2>
          <p className="mt-6 text-base text-muted-foreground md:text-lg">
            Forno Lume nasce dall'idea di un locale piccolo, curato e sincero:
            pochi elementi, scelti bene. Ogni dettaglio — dall'impasto al
            servizio, dalla luce dei tavoli alla selezione degli ingredienti — è
            pensato per far sentire le persone accolte senza formalità inutili.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-6 border-t border-border pt-6">
            <div>
              <p className="font-display text-3xl text-terracotta">01</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Un menu essenziale che cambia con le stagioni.
              </p>
            </div>
            <div>
              <p className="font-display text-3xl text-terracotta">02</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Un servizio che accoglie, senza mai imporsi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────── Method / 3 steps ─────────── */
function MethodSection() {
  return (
    <section className="border-y border-border bg-secondary/30">
      <div className="container-page py-20 md:py-24">
        <div className="max-w-2xl">
          <p className="eyebrow">Come funziona</p>
          <h2 className="mt-4 text-3xl font-medium md:text-4xl">
            Da un messaggio al tavolo, in pochi minuti.
          </h2>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3 md:gap-6">
          {site.experience.map((s, i) => (
            <Reveal key={s.step} delay={i * 140} className="relative">
              <div className="flex items-center gap-4">
                <span className="font-display text-4xl text-terracotta">
                  {s.step}
                </span>
                {i < site.experience.length - 1 && (
                  <span
                    aria-hidden
                    className="hidden h-px flex-1 bg-border md:block"
                  />
                )}
              </div>
              <h3 className="mt-5 font-display text-2xl leading-tight">
                {s.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground md:text-[15px]">
                {s.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────── Central CTA ─────────── */
function CTASection() {
  return (
    <section className="container-page py-20 md:py-28">
      <div
        className="relative overflow-hidden rounded-[2rem] border border-border p-10 md:p-16"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.30 0.05 40) 0%, oklch(0.42 0.10 40) 55%, oklch(0.55 0.13 45) 100%)",
        }}
      >
        <div
          aria-hidden
          className="absolute right-0 top-0 h-48 w-48 rounded-full bg-accent/30 blur-3xl md:h-72 md:w-72"
        />
        <div className="relative max-w-2xl text-primary-foreground">
          <p className="eyebrow" style={{ color: "oklch(0.86 0.08 82)" }}>
            <span className="opacity-80">Prenota ora</span>
          </p>
          <h2 className="mt-4 text-4xl font-medium leading-[1.05] md:text-5xl">
            Vuoi riservare un tavolo
            <br />
            <span className="italic" style={{ color: "oklch(0.86 0.08 82)" }}>
              per questa sera?
            </span>
          </h2>
          <p className="mt-5 max-w-lg text-base opacity-85 md:text-lg">
            Scrivici in pochi secondi: ti confermeremo disponibilità, orari e
            dettagli.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={waLink(site.contact.whatsappReserveMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-background px-6 py-3.5 text-sm font-medium text-foreground transition hover:opacity-90"
            >
              <MessageCircle className="h-4 w-4" />
              Scrivici su WhatsApp
            </a>
            <a
              href={mailLink("Prenotazione Forno Lume")}
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-sm font-medium text-primary-foreground transition hover:bg-white/10"
            >
              <Mail className="h-4 w-4" />
              Contattaci via email
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────── Practical info ─────────── */
function PracticalInfo() {
  return (
    <section id="info" className="container-page pb-20 md:pb-28">
      <div className="grid gap-8 md:grid-cols-12 md:gap-10">
        <div className="min-w-0 md:col-span-5">
          <p className="eyebrow">Informazioni pratiche</p>
          <h2 className="mt-4 text-4xl font-medium md:text-5xl">Dove siamo</h2>
          <p className="mt-4 text-muted-foreground">
            Un locale intimo nel centro di Padova. La prenotazione è consigliata,
            soprattutto nei weekend.
          </p>

          <dl className="mt-8 space-y-5">
            <InfoRow icon={MapPin} label="Indirizzo" value={site.contact.address} />
            <InfoRow icon={Clock} label="Orari" value={site.contact.hours} />
            <InfoRow
              icon={Phone}
              label="Telefono"
              value={site.contact.phone}
              href={telLink()}
            />
            <InfoRow
              icon={Mail}
              label="Email"
              value={site.contact.email}
              href={mailLink()}
            />
          </dl>
        </div>

        <div className="min-w-0 md:col-span-7">
          <div className="max-w-full overflow-hidden rounded-3xl border border-border shadow-[var(--shadow-soft)]">
            <div className="relative min-w-0 max-w-full overflow-hidden">
              <div className="relative min-h-[280px] min-w-0 max-w-full overflow-hidden sm:aspect-[16/10] md:aspect-[5/4] md:min-h-0">
                <iframe
                  title={site.contact.mapTitle}
                  src={site.contact.mapEmbedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  className="absolute inset-0 block h-full w-full max-w-full border-0"
                />
              </div>
              {/* Desktop overlay card */}
              <a
                href={site.contact.mapExternalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 left-4 right-4 hidden items-center justify-between gap-4 rounded-2xl bg-card/95 p-4 backdrop-blur transition hover:bg-card md:flex"
              >
                <span>
                  <span className="block text-xs uppercase tracking-widest text-muted-foreground">
                    Come raggiungerci
                  </span>
                  <span className="mt-1 block text-sm">
                    {site.contact.address}
                  </span>
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-terracotta/10 px-3 py-1.5 text-xs font-medium text-terracotta">
                  Apri su Google Maps
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </a>
            </div>
            {/* Mobile inline card below map (keeps map fully visible) */}
            <a
              href={site.contact.mapExternalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="grid min-w-0 grid-cols-1 gap-3 border-t border-border bg-card p-4 transition hover:bg-secondary/60 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center md:hidden"
            >
              <span className="min-w-0">
                <span className="block text-xs uppercase tracking-widest text-muted-foreground">
                  Come raggiungerci
                </span>
                <span className="mt-1 block truncate text-sm">
                  {site.contact.address}
                </span>
              </span>
              <span className="inline-flex w-fit max-w-full items-center gap-1 rounded-full bg-terracotta/10 px-3 py-1.5 text-xs font-medium text-terracotta">
                Apri su Maps
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}


function InfoRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof MapPin;
  label: string;
  value: string;
  href?: string;
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
    <a href={href} className="block transition hover:text-terracotta">
      {content}
    </a>
  ) : (
    content
  );
}

/* ─────────── FAQ ─────────── */
function FAQSection() {
  return (
    <section id="faq" className="border-t border-border bg-secondary/30">
      <div className="container-page py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="eyebrow">Domande frequenti</p>
            <h2 className="mt-4 text-4xl font-medium leading-[1.1] md:text-5xl">
              Le risposte più comuni.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Non trovi quello che cerchi? Scrivici su WhatsApp, rispondiamo in
              breve tempo.
            </p>
          </div>
          <div className="md:col-span-8">
            <FAQList items={site.faq} />
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQList({ items }: { items: readonly { q: string; a: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return (
    <ul className="divide-y divide-border">
      {items.map((f, i) => {
        const open = openIndex === i;
        const panelId = `faq-panel-${i}`;
        const btnId = `faq-btn-${i}`;
        return (
          <li key={f.q}>
            <button
              id={btnId}
              type="button"
              onClick={() => setOpenIndex(open ? null : i)}
              aria-expanded={open}
              aria-controls={panelId}
              className="flex w-full cursor-pointer items-center justify-between gap-6 py-6 text-left transition-colors hover:text-terracotta"
            >
              <span className="font-display text-lg md:text-xl">{f.q}</span>
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-terracotta transition-all duration-300 ${
                  open ? "rotate-180 bg-terracotta/10" : "rotate-0"
                }`}
              >
                <ChevronDown className="h-4 w-4" />
              </span>
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              className={`grid overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                open ? "grid-rows-[1fr] pb-6 opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="min-h-0">
                <p className="max-w-2xl text-[15px] text-muted-foreground">
                  {f.a}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

