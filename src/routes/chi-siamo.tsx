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
  return (
    <SiteLayout>
      <PageHero
        eyebrow={aboutContent.hero.eyebrow}
        title={aboutContent.hero.title}
        subtitle={aboutContent.hero.subtitle}
      />

      <section className="container-page pb-8">
        <div className="overflow-hidden rounded-3xl border border-border shadow-[var(--shadow-soft)]">
          <img
            src={aboutImg}
            alt="Le mani di un fornaio lavorano l'impasto su un tagliere infarinato"
            loading="lazy"
            width={1408}
            height={900}
            className="h-72 w-full object-cover md:h-[480px]"
          />
        </div>
      </section>

      <section className="container-page py-16 md:py-24">
        <div className="mx-auto max-w-3xl space-y-14 md:space-y-20">
          {aboutContent.sections.map((s) => (
            <Reveal key={s.eyebrow} as="article">
              <p className="eyebrow">{s.eyebrow}</p>
              <h2 className="mt-4 font-display text-3xl leading-tight md:text-4xl">
                {s.title}
              </h2>
              <p className="mt-4 text-muted-foreground md:text-lg">{s.body}</p>
            </Reveal>
          ))}
        </div>

        <div className="mx-auto mt-16 flex max-w-3xl flex-wrap gap-3">
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