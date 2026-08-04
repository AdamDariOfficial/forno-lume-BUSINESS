import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { CTASection } from "@/components/site/CTASection";
import { aboutContent } from "@/config/about";
import { pagesMeta } from "@/config/pages";
import { genericPageJsonLd, jsonLdScripts, seoLinks, seoMeta } from "@/lib/seo";

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
    scripts: jsonLdScripts(
      genericPageJsonLd({
        type: "AboutPage",
        path: "/chi-siamo",
        title: pagesMeta.about.title,
        description: pagesMeta.about.description,
      }),
    ),
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
        <div className="grid items-center gap-10 md:grid-cols-12 md:gap-14">
          <div className="md:col-span-6">
            <Reveal>
              <p className="eyebrow">{origine.eyebrow}</p>
            </Reveal>
            <Reveal delay={80} className="mt-4">
              <h2 className="font-display text-3xl leading-tight md:text-4xl">{origine.title}</h2>
            </Reveal>
            <Reveal delay={160} className="mt-5">
              <p className="text-muted-foreground md:text-lg">{origine.body}</p>
            </Reveal>
          </div>
          <Reveal variant="image" delay={240} className="md:col-span-6">
            <div className="overflow-hidden rounded-3xl border border-border shadow-[var(--shadow-soft)]">
              <img
                src={aboutImg}
                alt="Le mani di un pizzaiolo preparano una base con pomodoro e mozzarella"
                loading="lazy"
                width={1200}
                height={1500}
                className="h-72 w-full object-cover md:h-[460px]"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Filosofia — blocco tipografico manifesto */}
      <section className="border-y border-border bg-secondary/30">
        <div className="container-page py-20 md:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <p className="eyebrow justify-center">{filosofia.eyebrow}</p>
            </Reveal>
            <Reveal delay={80} className="mt-6">
              <h2 className="font-display text-3xl leading-[1.15] md:text-[2.6rem]">
                {filosofia.title}
              </h2>
            </Reveal>
            <Reveal delay={160} className="mt-6">
              <p className="text-muted-foreground md:text-lg">{filosofia.body}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Il forno — immagine a sinistra, testo a destra */}
      <section className="container-page py-16 md:py-24">
        <div className="grid items-center gap-10 md:grid-cols-12 md:gap-14">
          <div className="md:order-2 md:col-span-5">
            <Reveal>
              <p className="eyebrow">{forno.eyebrow}</p>
            </Reveal>
            <Reveal delay={80} className="mt-4">
              <h2 className="font-display text-3xl leading-tight md:text-4xl">{forno.title}</h2>
            </Reveal>
            <Reveal delay={160} className="mt-5">
              <p className="text-muted-foreground md:text-lg">{forno.body}</p>
            </Reveal>
          </div>
          <Reveal variant="image" delay={240} className="md:order-1 md:col-span-7">
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
          </Reveal>
        </div>
      </section>

      {/* La cucina — layout compatto testo + piatto */}
      <section className="container-page pb-16 md:pb-24">
        <div className="grid items-center gap-10 md:grid-cols-12 md:gap-14">
          <div className="md:col-span-6">
            <Reveal>
              <p className="eyebrow">{cucina.eyebrow}</p>
            </Reveal>
            <Reveal delay={80} className="mt-4">
              <h2 className="font-display text-3xl leading-tight md:text-4xl">{cucina.title}</h2>
            </Reveal>
            <Reveal delay={160} className="mt-5">
              <p className="text-muted-foreground md:text-lg">{cucina.body}</p>
            </Reveal>
          </div>
          <Reveal variant="image" delay={240} className="md:col-span-6">
            <div className="overflow-hidden rounded-3xl border border-border shadow-[var(--shadow-soft)]">
              <img
                src={piattoImg}
                alt="Piatto di pasta ai frutti di mare con olive e calice di vino"
                loading="lazy"
                width={1400}
                height={1400}
                className="aspect-[4/5] w-full object-cover md:aspect-auto md:h-[480px]"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Ingredienti + Atmosfera — sezione conclusiva con grande immagine */}
      <section className="border-t border-border bg-secondary/30">
        <div className="container-page py-20 md:py-28">
          <Reveal
            variant="image"
            className="overflow-hidden rounded-3xl border border-border shadow-[var(--shadow-soft)]"
          >
            <img
              src={salaImg}
              alt="Interno accogliente di un ristorante italiano con arredi in legno"
              loading="lazy"
              width={1600}
              height={1200}
              className="h-72 w-full object-cover md:h-[520px]"
            />
          </Reveal>
          <div className="mt-14 grid gap-10 md:grid-cols-2 md:gap-16">
            <div>
              <Reveal>
                <p className="eyebrow">{ingredienti.eyebrow}</p>
              </Reveal>
              <Reveal delay={80} className="mt-4">
                <h2 className="font-display text-2xl leading-tight md:text-3xl">
                  {ingredienti.title}
                </h2>
              </Reveal>
              <Reveal delay={160} className="mt-4">
                <p className="text-muted-foreground md:text-lg">{ingredienti.body}</p>
              </Reveal>
            </div>
            <div>
              <Reveal>
                <p className="eyebrow">{atmosfera.eyebrow}</p>
              </Reveal>
              <Reveal delay={80} className="mt-4">
                <h2 className="font-display text-2xl leading-tight md:text-3xl">
                  {atmosfera.title}
                </h2>
              </Reveal>
              <Reveal delay={160} className="mt-4">
                <p className="text-muted-foreground md:text-lg">{atmosfera.body}</p>
              </Reveal>
            </div>
          </div>
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
