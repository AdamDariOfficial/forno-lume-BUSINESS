// SEO helpers. Absolute URLs are derived from site.url; when the domain is
// not yet configured (empty site.url), canonical/og:url/og:image are simply
// omitted rather than falling back to a placeholder or the START domain.

import { site } from "@/config/site";

export function absUrl(path: string): string | null {
  const base = site.url?.trim();
  if (!base) return null;
  const b = base.replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${b}${p}`;
}

type MetaEntry =
  | { title: string }
  | { name: string; content: string }
  | { property: string; content: string };

export function seoMeta(opts: {
  title: string;
  description: string;
  path: string;
  ogType?: "website" | "article";
  image?: string;
}): MetaEntry[] {
  const url = absUrl(opts.path);
  const img = opts.image ? absUrl(opts.image) : null;
  const entries: MetaEntry[] = [
    { title: opts.title },
    { name: "description", content: opts.description },
    { property: "og:title", content: opts.title },
    { property: "og:description", content: opts.description },
    { property: "og:type", content: opts.ogType ?? "website" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: opts.title },
    { name: "twitter:description", content: opts.description },
  ];
  if (url) entries.push({ property: "og:url", content: url });
  if (img) {
    entries.push({ property: "og:image", content: img });
    entries.push({ name: "twitter:image", content: img });
  }
  return entries;
}

export function seoLinks(path: string): Array<{ rel: string; href: string }> {
  const url = absUrl(path);
  return url ? [{ rel: "canonical", href: url }] : [];
}

// One canonical Restaurant node. Stable @id so pages referencing the same
// entity don't create duplicates. No aggregateRating, reviews, or awards.
export function restaurantJsonLd() {
  const id = absUrl("/#restaurant") ?? "urn:fornolume:restaurant";
  const url = absUrl("/");
  const openingHoursSpecification = site.hoursWeekly
    .filter((h) => !h.closed && h.opens && h.closes && h.dayOfWeek)
    .map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.dayOfWeek,
      opens: h.opens,
      closes: h.closes,
    }));

  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": id,
    name: site.brand.name,
    description: site.brand.shortDescription,
    servesCuisine: ["Italian", "Pizza", "Mediterranean"],
    priceRange: "€€",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.contact.streetAddress,
      addressLocality: site.contact.city,
      addressRegion: site.contact.region,
      postalCode: site.contact.postalCode,
      addressCountry: site.contact.country,
    },
    telephone: site.contact.phone,
    email: site.contact.email,
    ...(url ? { url } : {}),
    ...(openingHoursSpecification.length
      ? { openingHoursSpecification }
      : {}),
  };
}