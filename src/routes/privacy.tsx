import { createFileRoute } from "@tanstack/react-router";
import { PolicyLayout } from "@/components/site/PolicyLayout";
import { site } from "@/config/site";
import { pagesMeta } from "@/config/pages";
import { seoMeta, seoLinks } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      ...seoMeta({
        title: pagesMeta.privacy.title,
        description: pagesMeta.privacy.description,
        path: "/privacy",
      }),
      { name: "robots", content: "noindex" },
    ],
    links: seoLinks("/privacy"),
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <PolicyLayout
      title="Privacy policy"
      intro="Questa pagina descrive come vengono trattate le informazioni all'interno di questo sito. È un placeholder pensato per essere adattato all'attività reale."
    >
      <h2>Natura di questo sito</h2>
      <p>
        Il sito di {site.legal.company} è un sito informativo: presenta il
        locale, il menu, la galleria e i contatti. Non gestisce prenotazioni
        online reali, non memorizza ordini e non ospita un'area riservata.
      </p>

      <h2>Cosa il sito non fa</h2>
      <ul>
        <li>Non è presente alcun sistema di login o area riservata.</li>
        <li>Non vengono raccolti pagamenti online.</li>
        <li>Non è presente un database che memorizza dati degli utenti.</li>
        <li>
          Non vengono gestite prenotazioni reali tramite backend proprio del sito.
        </li>
      </ul>

      <h2>Contatti</h2>
      <p>
        Eventuali contatti avvengono esclusivamente tramite servizi esterni come
        WhatsApp o posta elettronica. I dati che l'utente sceglie di inviare
        (nome, numero di telefono, testo del messaggio) sono gestiti dai
        rispettivi provider (es. WhatsApp/Meta, provider email dell'utente e del
        destinatario), secondo le loro policy.
      </p>

      <h2>Titolare del trattamento</h2>
      <p>
        In un'installazione reale, in questa sezione verranno indicati il
        titolare del trattamento, la sua sede e i riferimenti di contatto per
        l'esercizio dei diritti previsti dal GDPR. Nella demo questi campi sono
        placeholder: {site.legal.company}, {site.contact.address}.
      </p>

      <h2>Modifiche</h2>
      <p>
        Il contenuto di questa informativa può essere aggiornato in qualsiasi
        momento. La data di ultima revisione è indicata in fondo alla pagina.
      </p>
    </PolicyLayout>
  );
}