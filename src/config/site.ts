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
  label: string;
  closed?: boolean;
  opens?: string;
  closes?: string;
  dayOfWeek?: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
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
      "Forno Lume è un piccolo locale contemporaneo dove sapori autentici, ingredienti selezionati e accoglienza si incontrano in un'esperienza essenziale ma memorabile.",
    shortDescription:
      "Bistrot e pizzeria contemporanea. Forno a legna, cucina di stagione, atmosfera calda.",
    kicker: "Bistrot · Pizzeria · Padova",
  },

  contact: {
    whatsappNumber: "+39 049 000 0000",
    whatsappLink: "https://wa.me/390490000000",
    whatsappReserveMessage: "Ciao! Vorrei prenotare un tavolo da Forno Lume.",
    whatsappMenuMessage: "Ciao! Potreste inviarmi la proposta del menu di oggi?",
    email: "info@fornolume.example",
    phone: "+39 049 000 0000",
    city: "Padova centro",
    area: "Zona Prato della Valle",
    locationLabel: "Padova centro · zona Prato della Valle",
    locationDetail:
      "Una zona centrale e facilmente raggiungibile. L'indirizzo esatto viene confermato al momento della prenotazione.",
    address: "Padova centro · zona Prato della Valle",
    streetAddress: "Zona Prato della Valle",
    postalCode: "35123",
    region: "PD",
    country: "IT",
    hours: "Mar–Dom 18:30–23:00 · Lun chiuso",
    mapQuery,
    mapTitle: "Mappa interattiva dell'area di Prato della Valle, Padova",
    mapEmbedUrl: `https://www.google.com/maps?q=${encodedMapQuery}&z=15&output=embed`,
    mapExternalUrl: `https://www.google.com/maps/search/?api=1&query=${encodedMapQuery}`,
  },

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
