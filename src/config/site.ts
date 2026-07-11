// Central config for the Forno Lume demo (Tretnix START template).
// Change these values to re-skin the demo for another food/hospitality brand.

export const site = {
  brand: {
    name: "Forno Lume",
    tagline: "Cucina semplice, atmosfera calda, dettagli curati.",
    description:
      "Forno Lume è un piccolo locale contemporaneo dove sapori autentici, ingredienti selezionati e accoglienza si incontrano in un'esperienza essenziale ma memorabile.",
    kicker: "Bistrot · Pizzeria · Padova",
  },
  contact: {
    whatsappNumber: "+39 000 000 0000",
    // international format without + or spaces for wa.me
    whatsappLink: "https://wa.me/390000000000",
    whatsappReserveMessage:
      "Ciao! Vorrei prenotare un tavolo da Forno Lume.",
    whatsappMenuMessage:
      "Ciao! Potreste inviarmi la proposta del menu di oggi?",
    email: "info@fornolume.it",
    phone: "+39 000 000 0000",
    address: "Via Roma 24, Padova",
    hours: "Mar–Dom 18:30–23:00 · Lun chiuso",
    mapTitle: "Mappa: Forno Lume — Via Roma 24, Padova",
    mapEmbedUrl:
      "https://www.google.com/maps?q=Via%20Roma%2024%2C%20Padova&output=embed",
    mapExternalUrl:
      "https://www.google.com/maps/search/?api=1&query=Via%20Roma%2024%2C%20Padova",
  },
  nav: [
    { href: "#esperienza", label: "Esperienza" },
    { href: "#menu", label: "Menu" },
    { href: "#chi-siamo", label: "Chi siamo" },
    { href: "#info", label: "Info" },
    { href: "#faq", label: "FAQ" },
  ],
  trust: [
    { label: "Ingredienti selezionati" },
    { label: "Impasti curati" },
    { label: "Atmosfera accogliente" },
    { label: "Prenotazione veloce" },
  ],
  offer: [
    {
      title: "Cucina di stagione",
      body: "Piatti semplici, ingredienti scelti e preparazioni curate per valorizzare ogni periodo dell'anno.",
      detail: "Materie prime locali",
    },
    {
      title: "Pizza e lievitati",
      body: "Impasti lavorati con attenzione, cotture fragranti e abbinamenti essenziali ma riconoscibili.",
      detail: "Forno a legna",
    },
    {
      title: "Aperitivi e serate",
      body: "Un ambiente caldo dove fermarsi per un calice, condividere qualcosa di buono e vivere la serata con calma.",
      detail: "Carta dei vini curata",
    },
  ],
  menu: [
    {
      name: "Margherita del Forno",
      desc: "Pomodoro San Marzano, fior di latte, basilico, olio EVO.",
      price: "10",
    },
    {
      name: "Burrata, pomodorini e basilico",
      desc: "Burrata pugliese, datterino confit, foglie di basilico fresco.",
      price: "12",
    },
    {
      name: "Tagliere della casa",
      desc: "Selezione di salumi e formaggi con mostarde e pane caldo.",
      price: "16",
    },
    {
      name: "Verdure arrostite e crema alle erbe",
      desc: "Ortaggi di stagione al forno con emulsione di erbe fresche.",
      price: "11",
    },
    {
      name: "Dolce del giorno",
      desc: "Preparazione artigianale, cambia con la stagione.",
      price: "7",
    },
    {
      name: "Calice selezione della casa",
      desc: "Rossi, bianchi e bollicine dalla nostra carta rotante.",
      price: "6",
    },
  ],
  experience: [
    {
      step: "01",
      title: "Scegli il momento",
      body: "Decidi quando passare da noi: per una cena tranquilla, un aperitivo o una serata informale.",
    },
    {
      step: "02",
      title: "Prenota con un messaggio",
      body: "Scrivici su WhatsApp e ti confermiamo disponibilità, orario e dettagli.",
    },
    {
      step: "03",
      title: "Vivi l'esperienza",
      body: "Arriva, siediti e goditi cucina semplice, servizio attento e atmosfera calda.",
    },
  ],
  faq: [
    {
      q: "È consigliata la prenotazione?",
      a: "Sì, soprattutto nel weekend. Puoi scriverci su WhatsApp per verificare disponibilità e orari.",
    },
    {
      q: "Fate anche asporto?",
      a: "Sì, alcune proposte sono disponibili anche da asporto. Scrivici per sapere cosa è disponibile oggi.",
    },
    {
      q: "Avete opzioni vegetariane?",
      a: "Sì, il menu include proposte vegetariane e piatti stagionali. La disponibilità può cambiare in base agli ingredienti.",
    },
    {
      q: "Posso organizzare una piccola cena di gruppo?",
      a: "Sì, accogliamo piccoli gruppi su prenotazione. Contattaci in anticipo così possiamo organizzare al meglio tavoli e orari.",
    },
    {
      q: "Come posso contattarvi?",
      a: "Il modo più veloce è WhatsApp. In alternativa puoi scriverci via email o chiamarci negli orari di apertura.",
    },
  ],
  legal: {
    company: "Forno Lume",
    lastUpdate: "Gennaio 2026",
  },
} as const;

export const waLink = (message?: string) => {
  const base = site.contact.whatsappLink;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
};

export const mailLink = (subject?: string) =>
  `mailto:${site.contact.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;

export const telLink = () => `tel:${site.contact.phone.replace(/\s/g, "")}`;
