import type { ErrorComponentProps } from "@tanstack/react-router";

import { reportLovableError } from "../../lib/lovable-error-reporting";

const PUBLIC_ERROR_MESSAGE = "Errore applicativo non disponibile";

export function handleRouteError(error: Error) {
  // Preserve the existing client-side reporting before removing public details.
  reportLovableError(error, { boundary: "tanstack_route_error_component" });

  if (import.meta.env.DEV) {
    console.error(error);
    return;
  }

  try {
    error.name = "Error";
    error.message = PUBLIC_ERROR_MESSAGE;
    error.stack = undefined;
  } catch {
    // Some error-like objects may be immutable. The fallback UI still remains generic.
  }
}

export function RouteErrorFallback(_: ErrorComponentProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-16">
      <div className="max-w-lg text-center">
        <p className="eyebrow justify-center">Forno Lume</p>
        <h1 className="mt-5 text-4xl font-medium sm:text-5xl">
          Qualcosa non ha funzionato.
        </h1>
        <p className="mt-4 text-base text-muted-foreground">
          Non siamo riusciti a mostrare questa pagina. Puoi riprovare oppure
          tornare alla homepage.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="motion-cta inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Riprova
          </button>
          <a
            href="/"
            className="motion-cta inline-flex items-center justify-center rounded-full border border-border bg-card px-6 py-3 text-sm font-medium hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Torna alla homepage
          </a>
        </div>
      </div>
    </main>
  );
}
