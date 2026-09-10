// Central configuration for the Forno Lume BUSINESS template (Tretnix).
// BUSINESS preserves the approved START product base and extends it with
// multipage content, richer navigation, SEO and additional detail surfaces.

export type MainNavItem = {
  to: "/" | "/menu" | "/chi-siamo" | "/galleria" | "/contatti";
  label: string;
};

export type StructuredDataConfig = {
  commercialEntityEnabled: boolean;
};

export type SeoConfig = {
  isDemo: boolean;
  robots: "noindex, follow" | "index, follow";
  structuredData: StructuredDataConfig;
};

type ReviewBase = {
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  dateLabel?: string;
};

export type DemoReview = ReviewBase & {
  reviewUrl?: never;
};

export type AuthenticReview = ReviewBase & {
  reviewUrl?: string;
};

export type DemoReviewsConfig = {
  enabled: boolean;
  mode: "demo";
  platform?: never;
  profileUrl?: never;
  averageRating?: never;
  reviewCount?: never;
  reviews: readonly DemoReview[];
};

export type AuthenticReviewsConfig = {
  enabled: boolean;
  mode: "authentic";
  platform?: string;
  profileUrl?: string;
  averageRating?: number;
  reviewCount?: number;
  reviews: readonly AuthenticReview[];
};

export type ReviewsConfig = DemoReviewsConfig | AuthenticReviewsConfig;

export type ContactIntent = "booking" | "contact";
export type ContactChannel = "whatsapp" | "email" | "phone";

export type WeeklyHour = {
  day: string;
  short: string;
  label: string;
  closed?: boolean;
  opens?: string;
  closes?: string;
  dayOfWeek?:
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday"
    | "Sunday";
};

const mapQuery = "Prato della Valle, Padova";
const encodedMapQuery = encodeURIComponent(mapQuery);

export const site = {
  url: "https://forno-lume-business.tretnix.com",

  seo: {
    isDemo: true,
    robots: "noindex, follow",
    structuredData: {
      commercialEntityEnabled: false,
    },
  } satisfies SeoConfig,

  brand: {
    name: "Forno Lume",
    tagline: "Cucina semplice, atmosfera calda, dettagli curati.",
    description:
      "Cucina essenziale, ingredienti selezionati e un'atmosfera calda nel cuore di Padova.",
    shortDescription:
      "Bistrot e pizzeria contemporanea. Forno a legna, cucina di stagione, atmosfera calda.",
    kicker: "Bistrot · Pizzeria · Padova",
  },

  contact: {
    whatsappNumber: "+39 049 000 0000",
    whatsappLink: "https://wa.me/390490000000",
    whatsappReserveMessage:
      "Ciao! Vorrei prenotare un tavolo da Forno Lume.",
    whatsappMenuMessage:
      "Ciao! Potreste inviarmi la proposta del menu di oggi?",
    email: "info@fornolume.example",
    phone: "+39 049 000 0000",
    city: "Padova centro",
    area: "Prato della Valle",
    locationLabel: "Padova centro · zona Prato della Valle",
    locationDetail:
      "Una zona centrale e facilmente raggiungibile. L'indirizzo esatto viene confermato al momento della prenotazione.",
    address: "Padova centro · zona Prato della Valle",
    streetAddress: "Zona Prato della Valle",
    postalCode: "35123",
    region: "PD",
    country: "IT",
    hours: "Mar–Dom 18:30–23:00 · Lun chiuso",
    hoursClosed: "Lun chiuso",
    hoursOpen: "Mar–Dom 18:30–23:00",
    mapQuery,
    mapTitle: "Mappa interattiva dell'area di Prato della Valle, Padova",
    mapEmbedUrl: `https://www.google.com/maps?q=${encodedMapQuery}&z=15&output=embed`,
    mapExternalUrl: `https://www.google.com/maps/search/?api=1&query=${encodedMapQuery}`,
  },

  conversion: {
    booking: ["whatsapp", "phone"],
    contact: ["email", "phone"],
  } satisfies Record<ContactIntent, readonly ContactChannel[]>,

  mainNav: [
    { to: "/", label: "Home" },
    { to: "/menu", label: "Menu" },
    { to: "/chi-siamo", label: "Chi siamo" },
    { to: "/galleria", label: "Galleria" },
    { to: "/contatti", label: "Contatti" },
  ] satisfies readonly MainNavItem[],

  primaryCta: {
    label: "Prenota un tavolo",
    kind: "whatsapp" as const,
  },

  offer: [
    {
      title: "Cucina di stagione",
      body: "Piatti essenziali e ingredienti scelti, seguendo il ritmo delle stagioni.",
      detail: "Materie prime locali",
    },
    {
      title: "Pizza e lievitati",
      body: "Impasti curati, cotture fragranti e abbinamenti semplici ma riconoscibili.",
      detail: "Forno a legna",
    },
    {
      title: "Aperitivi e serate",
      body: "Un ambiente caldo per un calice, qualcosa da condividere e una serata senza fretta.",
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
      body: "Cena, aperitivo o serata informale: scegli quando passare.",
    },
    {
      step: "02",
      title: "Prenota in un attimo",
      body: "Scegli WhatsApp o telefono: confermiamo disponibilità e orario.",
    },
    {
      step: "03",
      title: "Vivi l'esperienza",
      body: "Siediti e goditi cucina semplice, servizio attento e atmosfera calda.",
    },
  ],

  reviews: {
    enabled: true,
    mode: "demo",
    reviews: [
      {
        author: "M.R.",
        rating: 5,
        text: "Impasto leggero, ingredienti curati e un'atmosfera davvero piacevole. Ci siamo fermati anche per un calice dopo cena.",
        dateLabel: "Contenuto dimostrativo",
      },
      {
        author: "G.P.",
        rating: 5,
        text: "Locale raccolto e accogliente, servizio attento senza essere invadente. La pizza era fragrante e ben equilibrata.",
        dateLabel: "Contenuto dimostrativo",
      },
      {
        author: "A.M.",
        rating: 4,
        text: "Menu essenziale, materie prime ben scelte e tempi giusti. Un'atmosfera adatta a una cena tranquilla.",
        dateLabel: "Contenuto dimostrativo",
      },
    ],
  } satisfies ReviewsConfig,

  faq: [
    {
      q: "È consigliata la prenotazione?",
      a: "Sì, soprattutto nel weekend. Puoi prenotare via WhatsApp o telefono.",
    },
    {
      q: "Fate anche asporto?",
      a: "Sì, alcune proposte sono disponibili da asporto. Contattaci per la disponibilità del giorno.",
    },
    {
      q: "Avete opzioni vegetariane?",
      a: "Sì, ci sono proposte vegetariane e stagionali, variabili secondo gli ingredienti disponibili.",
    },
    {
      q: "Posso organizzare una piccola cena di gruppo?",
      a: "Sì, accogliamo piccoli gruppi su prenotazione. Contattaci in anticipo per organizzare tavoli e orari.",
    },
    {
      q: "Come posso contattarvi?",
      a: "Per informazioni puoi scegliere email o telefono; per prenotare, WhatsApp o telefono.",
    },
  ],

  hoursWeekly: [
    {
      day: "Lunedì",
      short: "Lun",
      label: "Chiuso",
      closed: true,
      dayOfWeek: "Monday",
    },
    {
      day: "Martedì",
      short: "Mar",
      label: "18:30 – 23:00",
      opens: "18:30",
      closes: "23:00",
      dayOfWeek: "Tuesday",
    },
    {
      day: "Mercoledì",
      short: "Mer",
      label: "18:30 – 23:00",
      opens: "18:30",
      closes: "23:00",
      dayOfWeek: "Wednesday",
    },
    {
      day: "Giovedì",
      short: "Gio",
      label: "18:30 – 23:00",
      opens: "18:30",
      closes: "23:00",
      dayOfWeek: "Thursday",
    },
    {
      day: "Venerdì",
      short: "Ven",
      label: "18:30 – 23:30",
      opens: "18:30",
      closes: "23:30",
      dayOfWeek: "Friday",
    },
    {
      day: "Sabato",
      short: "Sab",
      label: "12:30 – 15:00 · 18:30 – 23:30",
      opens: "18:30",
      closes: "23:30",
      dayOfWeek: "Saturday",
    },
    {
      day: "Domenica",
      short: "Dom",
      label: "12:30 – 15:00 · 18:30 – 23:00",
      opens: "18:30",
      closes: "23:00",
      dayOfWeek: "Sunday",
    },
  ] satisfies readonly WeeklyHour[],

  social: [] as ReadonlyArray<{ label: string; href: string }>,

  legal: {
    company: "Forno Lume",
    lastUpdate: "4 agosto 2026",
  },
} as const;

export const waLink = (message?: string) => {
  const base = site.contact.whatsappLink;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
};

export const mailLink = (subject?: string) =>
  `mailto:${site.contact.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;

export const telLink = () => `tel:${site.contact.phone.replace(/\s/g, "")}`;

export const primaryCtaHref = (message?: string) =>
  site.primaryCta.kind === "whatsapp"
    ? waLink(message ?? site.contact.whatsappReserveMessage)
    : telLink();
