// SEO helpers. Absolute URLs are derived from site.url; when the domain is
// not yet configured (empty site.url), canonical/og:url/og:image and
// structured data are omitted rather than falling back to placeholders.

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

export type GenericPageSchemaType =
  | "WebPage"
  | "AboutPage"
  | "CollectionPage"
  | "ContactPage";

export function genericPageJsonLd(opts: {
  type: GenericPageSchemaType;
  path: string;
  title: string;
  description: string;
}) {
  const websiteUrl = absUrl("/");
  const pageUrl = absUrl(opts.path);
  if (!websiteUrl || !pageUrl) return null;

  const websiteId = `${websiteUrl}#website`;
  const pageId = `${pageUrl}#webpage`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: websiteUrl,
        name: site.brand.name,
        description: site.brand.shortDescription,
        inLanguage: "it-IT",
      },
      {
        "@type": opts.type,
        "@id": pageId,
        url: pageUrl,
        name: opts.title,
        description: opts.description,
        inLanguage: "it-IT",
        isPartOf: {
          "@id": websiteId,
        },
      },
    ],
  };
}

export function jsonLdScripts(value: unknown | null) {
  if (value == null) return [];
  return [
    {
      type: "application/ld+json" as const,
      children: JSON.stringify(value).replace(/</g, "\\u003c"),
    },
  ];
}
