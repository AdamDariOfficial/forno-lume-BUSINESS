import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { GalleryGrid } from "@/components/site/GalleryGrid";
import { CTASection } from "@/components/site/CTASection";
import { gallery, galleryCategories, type GalleryFilterId } from "@/config/gallery";
import { pagesMeta } from "@/config/pages";
import { genericPageJsonLd, jsonLdScripts, seoLinks, seoMeta } from "@/lib/seo";

export const Route = createFileRoute("/galleria")({
  head: () => ({
    meta: seoMeta({
      title: pagesMeta.gallery.title,
      description: pagesMeta.gallery.description,
      path: "/galleria",
    }),
    links: seoLinks("/galleria"),
    scripts: jsonLdScripts(
      genericPageJsonLd({
        type: "CollectionPage",
        path: "/galleria",
        title: pagesMeta.gallery.title,
        description: pagesMeta.gallery.description,
      }),
    ),
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<GalleryFilterId>("all");
  const filteredGallery =
    activeCategory === "all"
      ? gallery
      : gallery.filter((image) => image.category === activeCategory);

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Galleria"
        title={`Uno sguardo\ndentro Forno Lume.`}
        subtitle="Il forno, i piatti, i dettagli e l'atmosfera della sala. Clicca su un'immagine per vederla più grande."
      />
      <section className="container-page pb-20 md:pb-28">
        <div
          role="group"
          aria-label="Filtra le immagini per categoria"
          className="-mx-5 mb-9 flex min-w-0 gap-2 overflow-x-auto overscroll-x-contain px-5 pb-2 sm:-mx-6 sm:px-6 md:mx-0 md:flex-wrap md:overflow-visible md:px-0"
        >
          {galleryCategories.map((category) => {
            const active = activeCategory === category.id;
            return (
              <button
                key={category.id}
                type="button"
                aria-pressed={active}
                onClick={() => setActiveCategory(category.id)}
                className={`motion-cta inline-flex min-h-11 shrink-0 items-center rounded-full border px-5 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none ${
                  active
                    ? "border-terracotta bg-terracotta text-white"
                    : "border-border bg-card text-foreground hover:border-terracotta/45 hover:text-terracotta"
                }`}
              >
                {category.label}
              </button>
            );
          })}
        </div>
        <p className="sr-only" aria-live="polite">
          {filteredGallery.length} immagini nella categoria selezionata.
        </p>
        <GalleryGrid key={activeCategory} images={filteredGallery} />
      </section>
      <CTASection
        title="Vieni a vederlo"
        accent="con i tuoi occhi."
        body="Prenota un tavolo su WhatsApp: bastano pochi secondi."
      />
    </SiteLayout>
  );
}
