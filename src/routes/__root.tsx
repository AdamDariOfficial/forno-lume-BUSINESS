import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Navbar } from "../components/site/Navbar";
import { Footer } from "../components/site/Footer";
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
                className="motion-cta inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium tracking-wide text-primary-foreground hover:opacity-90"
              >
                Torna alla home
              </Link>
              <Link
                to="/menu"
                className="motion-cta inline-flex items-center justify-center rounded-full border border-border bg-card px-6 py-3 text-sm font-medium hover:bg-secondary"
              >
                Vedi il menu
              </Link>
              <Link
                to="/contatti"
                className="motion-cta inline-flex items-center justify-center rounded-full border border-border bg-card px-6 py-3 text-sm font-medium hover:bg-secondary"
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

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-medium">Qualcosa non ha caricato</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Puoi riprovare o tornare alla home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            Riprova
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium transition hover:bg-secondary"
          >
            Home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    // Sitewide defaults only. Title, description, canonical, og:image
    // are set per route (og:image ONLY at leaf routes to avoid override).
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#f5efe1" },
      { property: "og:site_name", content: site.brand.name },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "it_IT" },
      { title: SITE_TITLE },
      { property: "og:title", content: SITE_TITLE },
      { name: "twitter:title", content: SITE_TITLE },
      { name: "description", content: SITE_DESC },
      { property: "og:description", content: SITE_DESC },
      { name: "twitter:description", content: SITE_DESC },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
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
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="it">
      <head>
        <HeadContent />
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
      <Outlet />
    </QueryClientProvider>
  );
}
