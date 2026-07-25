// Central configuration for the Forno Lume BUSINESS template (Tretnix).
// Only global/brand-level data lives here. Editorial content lives in
// dedicated files (home.ts, about.ts, menu.ts, gallery.ts, testimonials.ts,
// pages.ts). Contact info, opening hours and navigation stay centralized so
// the template can be rebranded for another Food/Hospitality client without
// touching components.

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

export type WeeklyHour = {
  day: string;
  short: string;
  label: string; // human label ("18:30 – 23:00" or "Chiuso")
  closed?: boolean;
  opens?: string; // "18:30" — for JSON-LD OpeningHoursSpecification
  closes?: string; // "23:00"
  dayOfWeek?:
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday"
    | "Sunday";
};

export const site = {
  // Absolute base URL used to build canonical/og:url/og:image.
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
      "Forno Lume è un piccolo locale contemporaneo dove sapori autentici, ingredienti selezionati e accoglienza si incontrano in un'esperienza essenziale ma memorabile.",
    shortDescription:
      "Bistrot e pizzeria contemporanea. Forno a legna, cucina di stagione, atmosfera calda.",
    kicker: "Bistrot · Pizzeria · Padova",
  },

  contact: {
    whatsappNumber: "+39 000 000 0000",
    whatsappLink: "https://wa.me/390000000000",
    whatsappReserveMessage:
      "Ciao! Vorrei prenotare un tavolo da Forno Lume.",
    whatsappMenuMessage:
      "Ciao! Potreste inviarmi la proposta del menu di oggi?",
    email: "info@fornolume.it",
    phone: "+39 000 000 0000",
    address: "Via Roma 24, Padova",
    streetAddress: "Via Roma 24",
    postalCode: "35100",
    city: "Padova",
    region: "PD",
    country: "IT",
    hours: "Mar–Dom 18:30–23:00 · Lun chiuso",
    mapTitle: "Mappa: Forno Lume — Via Roma 24, Padova",
    mapEmbedUrl:
      "https://www.google.com/maps?q=Via%20Roma%2024%2C%20Padova&output=embed",
    mapExternalUrl:
      "https://www.google.com/maps/search/?api=1&query=Via%20Roma%2024%2C%20Padova",
  },

  mainNav: [
    { to: "/", label: "Home" },
    { to: "/menu", label: "Menu" },
    { to: "/chi-siamo", label: "Chi siamo" },
    { to: "/galleria", label: "Galleria" },
    { to: "/contatti", label: "Contatti" },
  ] satisfies readonly MainNavItem[],

  primaryCta: {
    label: "Prenota",
    // "whatsapp" | "tel" — component decides how to render the link
    kind: "whatsapp" as const,
  },

  hoursWeekly: [
    { day: "Lunedì",   short: "Lun", label: "Chiuso", closed: true, dayOfWeek: "Monday" },
    { day: "Martedì",  short: "Mar", label: "18:30 – 23:00", opens: "18:30", closes: "23:00", dayOfWeek: "Tuesday" },
    { day: "Mercoledì",short: "Mer", label: "18:30 – 23:00", opens: "18:30", closes: "23:00", dayOfWeek: "Wednesday" },
    { day: "Giovedì",  short: "Gio", label: "18:30 – 23:00", opens: "18:30", closes: "23:00", dayOfWeek: "Thursday" },
    { day: "Venerdì",  short: "Ven", label: "18:30 – 23:30", opens: "18:30", closes: "23:30", dayOfWeek: "Friday" },
    { day: "Sabato",   short: "Sab", label: "12:30 – 15:00 · 18:30 – 23:30", opens: "18:30", closes: "23:30", dayOfWeek: "Saturday" },
    { day: "Domenica", short: "Dom", label: "12:30 – 15:00 · 18:30 – 23:00", opens: "18:30", closes: "23:00", dayOfWeek: "Sunday" },
  ] satisfies readonly WeeklyHour[],

  social: [] as ReadonlyArray<{ label: string; href: string }>,

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

export const primaryCtaHref = (message?: string) =>
  site.primaryCta.kind === "whatsapp"
    ? waLink(message ?? site.contact.whatsappReserveMessage)
    : telLink();