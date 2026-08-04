import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import type { ReactNode } from "react";

import appCss from "../styles.css?url";
import { Navbar } from "../components/site/Navbar";
import { Footer } from "../components/site/Footer";
import { RouteErrorFallback } from "../components/site/RouteErrorFallback";
import { RouteFocus } from "../components/site/RouteFocus";
import { pagesMeta } from "../config/pages";
import { site } from "../config/site";

const SITE_TITLE = `${site.brand.name} — ${site.brand.kicker}`;
const SITE_DESC = site.brand.shortDescription;

function NotFoundComponent() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16 md:pt-20">
        <div className="container-page flex min-h-[70vh] items-center justify-center py-20">
          <div className="max-w-lg text-center">
            <p className="eyebrow fade-up justify-center">Errore 404</p>
            <h1
              className="fade-up mt-5 text-4xl font-medium sm:text-5xl"
              style={{ animationDelay: "80ms" }}
            >
              Questa pagina non è nel menu.
            </h1>
            <p
              className="fade-up mt-4 text-base text-muted-foreground"
              style={{ animationDelay: "160ms" }}
            >
              Torniamo alla sala principale: qui sotto trovi i collegamenti utili.
            </p>
            <div
              className="fade-up mt-8 flex flex-wrap justify-center gap-3"
              style={{ animationDelay: "240ms" }}
            >
              <Link
                to="/"
                className="motion-cta inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium tracking-wide text-primary-foreground hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Torna alla home
              </Link>
              <Link
                to="/menu"
                className="motion-cta inline-flex items-center justify-center rounded-full border border-border bg-card px-6 py-3 text-sm font-medium hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Vedi il menu
              </Link>
              <Link
                to="/contatti"
                className="motion-cta inline-flex items-center justify-center rounded-full border border-border bg-card px-6 py-3 text-sm font-medium hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Contattaci
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: ({ matches }) => {
    const isNotFound = matches.some((match) => match.status === "notFound" || match.globalNotFound);
    const title = isNotFound ? pagesMeta.notFound.title : SITE_TITLE;
    const description = isNotFound ? pagesMeta.notFound.description : SITE_DESC;

    return {
      // Sitewide defaults only. Leaf routes override title, description,
      // canonical and social metadata. Demo indexing policy stays global.
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "theme-color", content: "#f5efe1" },
        { name: "robots", content: site.seo.robots },
        { property: "og:site_name", content: site.brand.name },
        { property: "og:type", content: "website" },
        { property: "og:locale", content: "it_IT" },
        { title },
        { property: "og:title", content: title },
        { name: "twitter:title", content: title },
        { name: "description", content: description },
        { property: "og:description", content: description },
        { name: "twitter:description", content: description },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [
        { rel: "stylesheet", href: appCss },
        { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
        { rel: "alternate icon", href: "/favicon.ico", type: "image/x-icon" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossOrigin: "anonymous",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600&family=Inter:wght@300;400;500;600&display=swap",
        },
      ],
    };
  },
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: RouteErrorFallback,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="it">
      <head>
        <HeadContent />
        <noscript>
          <style>{`[data-js-only] { display: none !important; }`}</style>
        </noscript>
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <RouteFocus />
      <Outlet />
    </QueryClientProvider>
  );
}
