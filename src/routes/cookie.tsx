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
      intro="Le tecnologie utilizzate dal sito e il funzionamento dei contenuti esterni attivabili dall'utente."
    >
      <section>
        <h2>Configurazione attuale</h2>
        <p>
          Il sito non attiva strumenti di analytics, advertising, profilazione o remarketing. Non
          viene caricato alcun contenuto cartografico di Google durante la normale apertura della
          pagina.
        </p>
      </section>

      <section>
        <h2>Funzioni tecniche</h2>
        <p>
          L'hosting può utilizzare meccanismi tecnici strettamente necessari al caricamento, alla
          sicurezza e alla distribuzione del sito. La presenza effettiva di cookie o storage tecnico
          dipende dall'ambiente di pubblicazione e deve essere verificata periodicamente.
        </p>
      </section>

      <section>
        <h2>Google Fonts</h2>
        <p>
          I caratteri tipografici vengono richiesti a Google Fonts. Il fornitore può ricevere dati
          tecnici della connessione, come indirizzo IP, user agent e informazioni necessarie a
          consegnare la risorsa richiesta.
        </p>
      </section>

      <section>
        <h2>Mappa Google attivabile</h2>
        <p>
          La mappa interattiva resta disattivata finché l'utente non seleziona il pulsante dedicato.
          Solo dopo tale scelta viene creato l'iframe e il browser contatta Google per caricare la
          mappa. Google può quindi trattare dati tecnici e utilizzare proprie tecnologie secondo le
          condizioni e informative applicabili al servizio.
        </p>
        <p>
          Il collegamento “Apri su Google Maps” porta invece al servizio esterno in una nuova
          scheda. La mappa può essere nuovamente disattivata dalla pagina, rimuovendo l'iframe.
        </p>
      </section>

      <section>
        <h2>Banner e modifiche future</h2>
        <p>
          Nella configurazione attuale non viene attivato un banner preventivo per la mappa, perché
          il contenuto Google non viene richiesto prima dell'azione esplicita dell'utente.
          L'eventuale introduzione di analytics, advertising, widget o altre tecnologie richiede una
          nuova verifica della policy e della gestione del consenso.
        </p>
      </section>
    </PolicyLayout>
  );
}
