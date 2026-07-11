import { createFileRoute } from "@tanstack/react-router";
import { PolicyLayout } from "@/components/site/PolicyLayout";

export const Route = createFileRoute("/cookie")({
  head: () => ({
    meta: [
      { title: "Cookie policy | Forno Lume" },
      {
        name: "description",
        content:
          "Informativa cookie del sito demo Forno Lume. Nessun cookie di profilazione o tracciamento avanzato.",
      },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Cookie policy | Forno Lume" },
      { property: "og:url", content: "/cookie" },
    ],
    links: [{ rel: "canonical", href: "/cookie" }],
  }),
  component: CookiePage,
});

function CookiePage() {
  return (
    <PolicyLayout
      title="Cookie policy"
      intro="Come vengono utilizzati i cookie in questo sito demo. Anche questa pagina è un placeholder da adattare al cliente reale."
    >
      <h2>Utilizzo dei cookie</h2>
      <p>
        Questo sito demo non utilizza cookie di profilazione, non effettua
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
        del dispositivo. Inoltre, nella sezione "Dove siamo" è incorporata una
        mappa di Google Maps tramite iframe, che consente di visualizzare la
        posizione del locale e aprirla su Google Maps. L'utilizzo di questi
        servizi esterni può comportare l'impostazione di cookie o il
        trattamento di dati (ad esempio indirizzo IP) da parte dei rispettivi
        provider, secondo le loro policy, consultabili direttamente sui loro
        siti.
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
