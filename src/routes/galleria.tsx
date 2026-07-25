import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { GalleryGrid } from "@/components/site/GalleryGrid";
import { CTASection } from "@/components/site/CTASection";
import { gallery } from "@/config/gallery";
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
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Galleria"
        title={`Uno sguardo\ndentro Forno Lume.`}
        subtitle="Il forno, i piatti, i dettagli e l'atmosfera della sala. Clicca su un'immagine per vederla più grande."
      />
      <section className="container-page pb-20 md:pb-28">
        <GalleryGrid images={gallery} />
      </section>
      <CTASection
        title="Vieni a vederlo"
        accent="con i tuoi occhi."
        body="Prenota un tavolo su WhatsApp: bastano pochi secondi."
      />
    </SiteLayout>
  );
}