// Menu content — categorized. Rebrand friendly: change categories + items
// without touching menu components.

export type MenuTag = "vegetarian" | "spicy" | "signature" | "seasonal";

export type MenuItem = {
  id: string;
  name: string;
  desc: string;
  price: string; // in EUR, without symbol
  tags?: MenuTag[];
};

export type MenuCategory = {
  id: string;
  label: string;
  intro?: string;
  items: MenuItem[];
};

export const menu: MenuCategory[] = [
  {
    id: "condividere",
    label: "Da condividere",
    intro:
      "Piccoli piatti pensati per iniziare la serata al centro del tavolo.",
    items: [
      {
        id: "tagliere-casa",
        name: "Tagliere della casa",
        desc: "Selezione di salumi e formaggi con mostarde e pane caldo del forno.",
        price: "16",
        tags: ["signature"],
      },
      {
        id: "burrata-datterino",
        name: "Burrata, datterino confit e basilico",
        desc: "Burrata pugliese, pomodorini confit, foglie di basilico fresco, olio EVO.",
        price: "12",
        tags: ["vegetarian", "signature"],
      },
      {
        id: "focaccia-rosmarino",
        name: "Focaccia al rosmarino",
        desc: "Impasto a lunga lievitazione, rosmarino fresco, sale marino.",
        price: "6",
        tags: ["vegetarian"],
      },
      {
        id: "olive-taggiasche",
        name: "Olive taggiasche e mandorle tostate",
        desc: "Piccolo assaggio da accompagnare al calice.",
        price: "5",
        tags: ["vegetarian"],
      },
    ],
  },
  {
    id: "forno",
    label: "Dal forno",
    intro:
      "Impasti a lunga lievitazione, cotti nel forno a legna. Bordi fragranti, cuore morbido.",
    items: [
      {
        id: "margherita",
        name: "Margherita del Forno",
        desc: "Pomodoro San Marzano, fior di latte, basilico, olio EVO.",
        price: "10",
        tags: ["vegetarian", "signature"],
      },
      {
        id: "marinara-aglio-nero",
        name: "Marinara all'aglio nero",
        desc: "San Marzano, aglio nero fermentato, origano di montagna, olio EVO.",
        price: "10",
        tags: ["vegetarian"],
      },
      {
        id: "diavola",
        name: "Diavola contemporanea",
        desc: "Pomodoro, fior di latte, salame piccante artigianale, miele di castagno.",
        price: "13",
        tags: ["spicy"],
      },
      {
        id: "boscaiola",
        name: "Boscaiola d'autunno",
        desc: "Fior di latte, funghi misti, salsiccia, timo fresco.",
        price: "14",
        tags: ["seasonal"],
      },
      {
        id: "orto-stagione",
        name: "Orto di stagione",
        desc: "Verdure arrostite, stracciatella, pesto di erbe, scorza di limone.",
        price: "13",
        tags: ["vegetarian", "seasonal"],
      },
      {
        id: "quattro-formaggi",
        name: "Quattro formaggi al miele",
        desc: "Fior di latte, gorgonzola, taleggio, pecorino, miele millefiori.",
        price: "14",
        tags: ["vegetarian"],
      },
    ],
  },
  {
    id: "cucina",
    label: "Dalla cucina",
    intro:
      "Piatti semplici, di stagione, con materie prime che cambiano con il mercato.",
    items: [
      {
        id: "verdure-arrosto",
        name: "Verdure arrostite e crema alle erbe",
        desc: "Ortaggi di stagione al forno, emulsione di erbe fresche, olio EVO.",
        price: "11",
        tags: ["vegetarian", "seasonal"],
      },
      {
        id: "pasta-giorno",
        name: "Pasta del giorno",
        desc: "Formato e condimento cambiano ogni sera in base al mercato.",
        price: "14",
        tags: ["seasonal"],
      },
      {
        id: "polpette-sugo",
        name: "Polpette al sugo lento",
        desc: "Manzo e maiale, salsa di pomodoro cotta a fuoco basso, pane tostato.",
        price: "15",
      },
      {
        id: "guancia-brasata",
        name: "Guancia di manzo brasata",
        desc: "Cotta a bassa temperatura nel suo fondo, purea di patate all'olio.",
        price: "19",
        tags: ["signature"],
      },
      {
        id: "pesce-mercato",
        name: "Pesce del mercato",
        desc: "Preparazione semplice, valorizza il pescato del giorno.",
        price: "22",
        tags: ["seasonal"],
      },
    ],
  },
  {
    id: "dolci",
    label: "Dolci",
    intro: "Pochi dolci, preparati in casa. Chiedete al personale il dolce di oggi.",
    items: [
      {
        id: "tiramisu",
        name: "Tiramisù della casa",
        desc: "Mascarpone montato al momento, savoiardi bagnati al caffè.",
        price: "7",
        tags: ["signature"],
      },
      {
        id: "torta-mele",
        name: "Torta di mele calda",
        desc: "Mele renette, cannella, gelato al fior di latte.",
        price: "7",
        tags: ["seasonal"],
      },
      {
        id: "cioccolato-fondente",
        name: "Cuore di cioccolato fondente",
        desc: "Tortino tiepido, cuore morbido, sale Maldon.",
        price: "8",
      },
      {
        id: "sorbetto",
        name: "Sorbetto di stagione",
        desc: "Frutta fresca, senza latte.",
        price: "6",
        tags: ["vegetarian", "seasonal"],
      },
    ],
  },
  {
    id: "bere",
    label: "Bere",
    intro:
      "Una carta breve e curata: vini naturali, birre artigianali, cocktail essenziali.",
    items: [
      {
        id: "calice-casa",
        name: "Calice della casa",
        desc: "Rossi, bianchi e bollicine dalla nostra carta rotante.",
        price: "6",
      },
      {
        id: "bottiglia-casa",
        name: "Bottiglia della casa",
        desc: "Selezione mensile, italiana e naturale.",
        price: "28",
      },
      {
        id: "birra-artigianale",
        name: "Birra artigianale alla spina",
        desc: "Ruota su birrifici italiani indipendenti.",
        price: "6",
      },
      {
        id: "spritz-casa",
        name: "Spritz della casa",
        desc: "Bitter artigianale, prosecco, soda, scorza di arancia.",
        price: "7",
      },
      {
        id: "negroni",
        name: "Negroni",
        desc: "Gin, vermouth rosso, bitter. Semplice, come dovrebbe essere.",
        price: "9",
      },
      {
        id: "acqua-caraffa",
        name: "Acqua microfiltrata in caraffa",
        desc: "Naturale o frizzante, servita al tavolo.",
        price: "2",
      },
    ],
  },
];

export const menuTagLabels: Record<MenuTag, string> = {
  vegetarian: "Vegetariano",
  spicy: "Piccante",
  signature: "Signature",
  seasonal: "Stagionale",
};

// Signature selection surfaced on the homepage preview.
export const signatureItems: readonly MenuItem[] = menu
  .flatMap((c) => c.items)
  .filter((i) => i.tags?.includes("signature"))
  .slice(0, 5);