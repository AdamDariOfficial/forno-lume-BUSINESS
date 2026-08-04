import { createFileRoute } from "@tanstack/react-router";
import { PolicyLayout } from "@/components/site/PolicyLayout";
import { pagesMeta } from "@/config/pages";
import { genericPageJsonLd, jsonLdScripts, seoLinks, seoMeta } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: seoMeta({
      title: pagesMeta.privacy.title,
      description: pagesMeta.privacy.description,
      path: "/privacy",
    }),
    links: seoLinks("/privacy"),
    scripts: jsonLdScripts(
      genericPageJsonLd({
        type: "WebPage",
        path: "/privacy",
        title: pagesMeta.privacy.title,
        description: pagesMeta.privacy.description,
      }),
    ),
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <PolicyLayout
      title="Privacy policy"
      intro="Come vengono gestite le informazioni durante la navigazione e l'uso dei collegamenti esterni."
    >
      <section>
        <h2>Configurazione del sito</h2>
        <p>
          Il sito non include account, login, pagamenti, disponibilità in tempo reale o moduli che
          trasmettono dati a un database applicativo. Le richieste di prenotazione avvengono tramite
          collegamenti a servizi esterni.
        </p>
      </section>

      <section>
        <h2>Contatti esterni</h2>
        <p>
          I collegamenti a WhatsApp, telefono ed email aprono applicazioni o servizi esterni scelti
          dall'utente. Le informazioni eventualmente comunicate dopo l'uscita dal sito sono trattate
          dai rispettivi provider e, in un progetto reale, dal titolare indicato nella versione
          definitiva dell'informativa.
        </p>
      </section>

      <section>
        <h2>Dati tecnici di navigazione</h2>
        <p>
          L'hosting e le risorse necessarie al caricamento della pagina possono ricevere dati
          tecnici ordinari, come indirizzo IP, tipo di browser, data e ora della richiesta e
          informazioni utili alla sicurezza e alla distribuzione dei contenuti.
        </p>
      </section>

      <section>
        <h2>Google Fonts</h2>
        <p>
          Il sito richiede i caratteri tipografici a Google Fonts. Durante questa richiesta Google
          può ricevere dati tecnici della connessione, inclusi indirizzo IP e informazioni del
          browser necessarie a fornire la risorsa.
        </p>
      </section>

      <section>
        <h2>Mappa Google su richiesta</h2>
        <p>
          Le pagine mostrano inizialmente un pannello locale, senza iframe e senza richiesta alla
          mappa di Google. Il contenuto interattivo viene creato soltanto quando l'utente seleziona
          “Attiva la mappa interattiva”. Da quel momento il browser comunica con Google, che può
          ricevere indirizzo IP, informazioni sul dispositivo e altri dati tecnici secondo le
          proprie condizioni e informative.
        </p>
        <p>
          La mappa può essere disattivata nuovamente dalla pagina. Il collegamento esterno a Google
          Maps apre invece direttamente il servizio in una nuova scheda.
        </p>
      </section>

      <section>
        <h2>Titolare e diritti</h2>
        <p>
          Questa versione dimostrativa utilizza dati di contatto non operativi. Prima della
          pubblicazione per un cliente reale devono essere indicati titolare del trattamento,
          contatti, basi giuridiche, destinatari, tempi di conservazione e modalità per esercitare i
          diritti previsti dalla normativa applicabile.
        </p>
      </section>
    </PolicyLayout>
  );
}
