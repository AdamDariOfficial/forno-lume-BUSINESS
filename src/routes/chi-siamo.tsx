import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { CTASection } from "@/components/site/CTASection";
import { aboutContent } from "@/config/about";
import { pagesMeta } from "@/config/pages";
import { seoMeta, seoLinks } from "@/lib/seo";

import aboutImg from "@/assets/about.jpg";
import fornoImg from "@/assets/gallery/forno.jpg";
import piattoImg from "@/assets/gallery/piatto.jpg";
import salaImg from "@/assets/gallery/sala.jpg";

export const Route = createFileRoute("/chi-siamo")({
  head: () => ({
    meta: seoMeta({
      title: pagesMeta.about.title,
      description: pagesMeta.about.description,
      path: "/chi-siamo",
    }),
    links: seoLinks("/chi-siamo"),
  }),
  component: AboutPage,
});

function AboutPage() {
  const sections = aboutContent.sections;
  const origine = sections.find((s) => s.eyebrow === "Origine")!;
  const filosofia = sections.find((s) => s.eyebrow === "Filosofia")!;
  const forno = sections.find((s) => s.eyebrow === "Il forno")!;
  const cucina = sections.find((s) => s.eyebrow === "La cucina")!;
  const ingredienti = sections.find((s) => s.eyebrow === "Ingredienti")!;
  const atmosfera = sections.find((s) => s.eyebrow === "L'atmosfera")!;
  return (
    <SiteLayout>
      <PageHero
        eyebrow={aboutContent.hero.eyebrow}
        title={aboutContent.hero.title}
        subtitle={aboutContent.hero.subtitle}
      />

      {/* Origine — testo + immagine (immagine a destra) */}
      <section className="container-page py-16 md:py-24">
        <Reveal className="grid items-center gap-10 md:grid-cols-12 md:gap-14">
          <div className="md:col-span-6">
            <p className="eyebrow">{origine.eyebrow}</p>
            <h2 className="mt-4 font-display text-3xl leading-tight md:text-4xl">
              {origine.title}
            </h2>
            <p className="mt-5 text-muted-foreground md:text-lg">
              {origine.body}
            </p>
          </div>
          <div className="md:col-span-6">
            <div className="overflow-hidden rounded-3xl border border-border shadow-[var(--shadow-soft)]">
              <img
                src={aboutImg}
                alt="Le mani di un fornaio lavorano l'impasto su un tagliere infarinato"
                loading="lazy"
                width={1408}
                height={1600}
                className="h-72 w-full object-cover md:h-[460px]"
              />
            </div>
          </div>
        </Reveal>
      </section>

      {/* Filosofia — blocco tipografico manifesto */}
      <section className="border-y border-border bg-secondary/30">
        <div className="container-page py-20 md:py-28">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="eyebrow justify-center">{filosofia.eyebrow}</p>
            <p className="mt-6 font-display text-3xl leading-[1.15] md:text-[2.6rem]">
              {filosofia.title}
            </p>
            <p className="mt-6 text-muted-foreground md:text-lg">
              {filosofia.body}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Il forno — immagine a sinistra, testo a destra */}
      <section className="container-page py-16 md:py-24">
        <Reveal className="grid items-center gap-10 md:grid-cols-12 md:gap-14">
          <div className="md:col-span-7">
            <div className="overflow-hidden rounded-3xl border border-border shadow-[var(--shadow-soft)]">
              <img
                src={fornoImg}
                alt="Il forno a legna acceso, con la fiamma che riscalda la volta"
                loading="lazy"
                width={1600}
                height={1200}
                className="h-72 w-full object-cover md:h-[480px]"
              />
            </div>
          </div>
          <div className="md:col-span-5">
            <p className="eyebrow">{forno.eyebrow}</p>
            <h2 className="mt-4 font-display text-3xl leading-tight md:text-4xl">
              {forno.title}
            </h2>
            <p className="mt-5 text-muted-foreground md:text-lg">
              {forno.body}
            </p>
          </div>
        </Reveal>
      </section>

      {/* La cucina — layout compatto testo + piatto */}
      <section className="container-page pb-16 md:pb-24">
        <Reveal className="grid items-center gap-10 md:grid-cols-12 md:gap-14">
          <div className="md:col-span-6 md:order-2">
            <div className="overflow-hidden rounded-3xl border border-border shadow-[var(--shadow-soft)]">
              <img
                src={piattoImg}
                alt="Piatto di stagione impiattato con cura"
                loading="lazy"
                width={1408}
                height={1408}
                className="aspect-[4/5] w-full object-cover md:aspect-auto md:h-[480px]"
              />
            </div>
          </div>
          <div className="md:col-span-6 md:order-1">
            <p className="eyebrow">{cucina.eyebrow}</p>
            <h2 className="mt-4 font-display text-3xl leading-tight md:text-4xl">
              {cucina.title}
            </h2>
            <p className="mt-5 text-muted-foreground md:text-lg">
              {cucina.body}
            </p>
          </div>
        </Reveal>
      </section>

      {/* Ingredienti + Atmosfera — sezione conclusiva con grande immagine */}
      <section className="border-t border-border bg-secondary/30">
        <div className="container-page py-20 md:py-28">
          <Reveal className="overflow-hidden rounded-3xl border border-border shadow-[var(--shadow-soft)]">
            <img
              src={salaImg}
              alt="Angolo della sala con luce calda e tavoli in legno"
              loading="lazy"
              width={1600}
              height={1000}
              className="h-72 w-full object-cover md:h-[520px]"
            />
          </Reveal>
          <div className="mt-14 grid gap-10 md:grid-cols-2 md:gap-16">
            <Reveal>
              <p className="eyebrow">{ingredienti.eyebrow}</p>
              <h3 className="mt-4 font-display text-2xl leading-tight md:text-3xl">
                {ingredienti.title}
              </h3>
              <p className="mt-4 text-muted-foreground md:text-lg">
                {ingredienti.body}
              </p>
            </Reveal>
            <Reveal>
              <p className="eyebrow">{atmosfera.eyebrow}</p>
              <h3 className="mt-4 font-display text-2xl leading-tight md:text-3xl">
                {atmosfera.title}
              </h3>
              <p className="mt-4 text-muted-foreground md:text-lg">
                {atmosfera.body}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="container-page py-16 md:py-20">
        <div className="flex flex-wrap gap-3">
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            Vai al menu
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link
            to="/contatti"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-medium transition hover:bg-secondary"
          >
            Contatti e mappa
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <CTASection
        variant="soft"
        title="Vieni a trovarci."
        body="Un tavolo per due, un aperitivo al banco o una piccola cena tra amici: c'è spazio per te."
      />
    </SiteLayout>
  );
}