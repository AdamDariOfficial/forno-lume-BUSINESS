// Real editorial photography approved for the BUSINESS demo.
// Exact source, license, dimensions and SHA-256 values are recorded in
// docs/ASSET_PROVENANCE.md.

import heroImg from "@/assets/hero.jpg";
import aboutImg from "@/assets/about.jpg";
import dishImg from "@/assets/dish.jpg";
import forno from "@/assets/gallery/forno.jpg";
import tavolo from "@/assets/gallery/tavolo.jpg";
import calice from "@/assets/gallery/calice.jpg";
import piatto from "@/assets/gallery/piatto.jpg";
import sala from "@/assets/gallery/sala.jpg";

export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  w: number;
  h: number;
  span?: "wide" | "tall" | "normal";
  category: GalleryCategoryId;
};

export type GalleryCategoryId = "forno-cucina" | "piatti" | "sala" | "atmosfera";

export type GalleryFilterId = "all" | GalleryCategoryId;

export const galleryCategories: readonly { id: GalleryFilterId; label: string }[] = [
  { id: "all", label: "Tutte" },
  { id: "forno-cucina", label: "Forno e cucina" },
  { id: "piatti", label: "Piatti" },
  { id: "sala", label: "Sala" },
  { id: "atmosfera", label: "Atmosfera" },
];

export const gallery: GalleryImage[] = [
  {
    id: "sala-hero",
    src: heroImg,
    alt: "Una pizza artigianale viene infornata nel forno a legna",
    w: 1440,
    h: 1620,
    span: "tall",
    category: "forno-cucina",
  },
  {
    id: "forno-lavoro",
    src: forno,
    alt: "Una pizza cuoce nel calore di un forno a legna tradizionale",
    w: 1600,
    h: 1200,
    span: "wide",
    category: "forno-cucina",
  },
  {
    id: "impasto",
    src: aboutImg,
    alt: "Le mani di un pizzaiolo completano una base con pomodoro e mozzarella",
    w: 1200,
    h: 1500,
    span: "normal",
    category: "forno-cucina",
  },
  {
    id: "burrata",
    src: dishImg,
    alt: "Pizza Margherita servita su un tavolo rustico",
    w: 1400,
    h: 1400,
    span: "normal",
    category: "piatti",
  },
  {
    id: "piatto-stagione",
    src: piatto,
    alt: "Piatto di pasta ai frutti di mare con olive e calice di vino",
    w: 1400,
    h: 1400,
    span: "normal",
    category: "piatti",
  },
  {
    id: "tavolo",
    src: tavolo,
    alt: "Tavolo rustico apparecchiato con vino e luce calda",
    w: 1600,
    h: 1200,
    span: "wide",
    category: "atmosfera",
  },
  {
    id: "calice",
    src: calice,
    alt: "Calice di vino rosso in un ristorante dalla luce soffusa",
    w: 1200,
    h: 1500,
    span: "tall",
    category: "atmosfera",
  },
  {
    id: "sala-luce",
    src: sala,
    alt: "Interno accogliente di un ristorante italiano con arredi in legno",
    w: 1600,
    h: 1200,
    span: "wide",
    category: "sala",
  },
];

export const galleryPreview: readonly GalleryImage[] = [
  gallery[1],
  gallery[3],
  gallery[5],
  gallery[6],
];
