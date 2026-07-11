import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { MenuCategoryNav } from "@/components/site/MenuCategoryNav";
import { MenuCategorySection } from "@/components/site/MenuList";
import { CTASection } from "@/components/site/CTASection";
import { menu } from "@/config/menu";
import { pagesMeta } from "@/config/pages";
import { seoMeta, seoLinks } from "@/lib/seo";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: seoMeta({
      title: pagesMeta.menu.title,
      description: pagesMeta.menu.description,
      path: "/menu",
    }),
    links: seoLinks("/menu"),
  }),
  component: MenuPage,
});

function MenuPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Menu"
        title={`Dal forno,\ndalla cucina,\ndalla stagione.`}
        subtitle="Una selezione essenziale che cambia con il mercato. Chiedi al personale le proposte del giorno e per allergeni o intolleranze."
      />

      <MenuCategoryNav categories={menu} />

      <div className="container-page">
        {menu.map((c) => (
          <MenuCategorySection key={c.id} category={c} />
        ))}

        <aside
          role="note"
          className="my-14 rounded-2xl border border-border bg-secondary/40 p-6 text-sm text-muted-foreground md:my-16 md:p-8"
        >
          <p className="font-medium text-foreground">Allergeni e intolleranze</p>
          <p className="mt-2">
            Le nostre preparazioni possono contenere allergeni. Segnala eventuali
            intolleranze o allergie al momento della prenotazione o al personale
            in sala: cercheremo insieme la proposta più adatta.
          </p>
        </aside>
      </div>

      <CTASection
        title="Prenota un tavolo"
        accent="per assaggiarli."
        body="Scrivici su WhatsApp: ti confermiamo disponibilità e orario in pochi minuti."
      />
    </SiteLayout>
  );
}