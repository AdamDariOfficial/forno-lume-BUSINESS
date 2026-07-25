import { createFileRoute } from "@tanstack/react-router";
import { PolicyLayout } from "@/components/site/PolicyLayout";
import { pagesMeta } from "@/config/pages";
import { genericPageJsonLd, jsonLdScripts, seoLinks, seoMeta } from "@/lib/seo";

export const Route = createFileRoute("/cookie")({
  head: () => ({
    meta: seoMeta({
      title: pagesMeta.cookie.title,
      description: pagesMeta.cookie.description,
      path: "/cookie",
    }),
    links: seoLinks("/cookie"),
    scripts: jsonLdScripts(
      genericPageJsonLd({
        type: "WebPage",
        path: "/cookie",
        title: pagesMeta.cookie.title,
        description: pagesMeta.cookie.description,
      }),
    ),
  }),
  component: CookiePage,
});

function CookiePage() {
  return (
    <PolicyLayout
      title="Cookie policy"
      intro="Come vengono utilizzati i cookie in questo sito. Anche questa pagina è un placeholder da adattare all'attività reale."
    >
      <h2>Utilizzo dei cookie</h2>
      <p>
        Questo sito non utilizza cookie di profilazione, non effettua
        tracciamento pubblicitario e non condivide dati con circuiti di
        advertising di terze parti.
      </p>

      <h2>Cookie tecnici</h2>
      <p>
        Possono essere presenti esclusivamente cookie tecnici necessari al
        corretto funzionamento del sito (ad esempio per ricordare preferenze
        di navigazione). Non richiedono consenso preventivo.
      </p>

      <h2>Servizi esterni e contenuti incorporati</h2>
      <p>
        Alcuni link portano a servizi esterni come WhatsApp o al client email
        del dispositivo. Inoltre, nella pagina Contatti è incorporata una mappa
        di Google Maps tramite iframe, che consente di visualizzare la posizione
        del locale e aprirla su Google Maps. L'utilizzo di questi servizi
        esterni può comportare l'impostazione di cookie o il trattamento di dati
        (ad esempio indirizzo IP) da parte dei rispettivi provider, secondo le
        loro policy, consultabili direttamente sui loro siti.
      </p>

      <h2>Gestione delle preferenze</h2>
      <p>
        È possibile bloccare o eliminare i cookie tramite le impostazioni del
        proprio browser. La disattivazione di cookie tecnici può influire sul
        funzionamento del sito.
      </p>

      <h2>Modifiche</h2>
      <p>
        Questa informativa può essere aggiornata in qualsiasi momento. La data
        dell'ultima revisione è indicata in fondo alla pagina.
      </p>
    </PolicyLayout>
  );
}