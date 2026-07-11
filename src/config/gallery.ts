// Gallery images. Reuses START assets first; extra images generated for
// the BUSINESS gallery live under src/assets/gallery/ and are added here.

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
};

export const gallery: GalleryImage[] = [
  {
    id: "sala-hero",
    src: heroImg,
    alt: "Interno di Forno Lume con forno a legna acceso e pizza in primo piano",
    w: 1600,
    h: 1808,
    span: "tall",
  },
  {
    id: "forno-lavoro",
    src: forno,
    alt: "Il forno a legna acceso, con la fiamma che riscalda la volta",
    w: 1600,
    h: 1200,
    span: "wide",
  },
  {
    id: "impasto",
    src: aboutImg,
    alt: "Le mani del fornaio lavorano l'impasto sul tagliere infarinato",
    w: 1408,
    h: 1600,
    span: "normal",
  },
  {
    id: "burrata",
    src: dishImg,
    alt: "Burrata con pomodorini datterino e basilico servita su ceramica rustica",
    w: 1408,
    h: 1408,
    span: "normal",
  },
  {
    id: "piatto-stagione",
    src: piatto,
    alt: "Piatto di verdure arrostite con crema alle erbe fresche",
    w: 1408,
    h: 1408,
    span: "normal",
  },
  {
    id: "tavolo",
    src: tavolo,
    alt: "Tavolo apparecchiato con calice di vino rosso e pane caldo",
    w: 1600,
    h: 1200,
    span: "wide",
  },
  {
    id: "calice",
    src: calice,
    alt: "Calice di vino rosso in controluce, atmosfera calda",
    w: 1408,
    h: 1600,
    span: "tall",
  },
  {
    id: "sala-luce",
    src: sala,
    alt: "Angolo della sala con luce calda e tavoli in legno",
    w: 1600,
    h: 1200,
    span: "wide",
  },
];

export const galleryPreview: readonly GalleryImage[] = [
  gallery[1],
  gallery[3],
  gallery[5],
  gallery[6],
];