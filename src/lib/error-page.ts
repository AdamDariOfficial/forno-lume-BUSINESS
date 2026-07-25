export function renderErrorPage(): string {
  return `<!doctype html>
<html lang="it">
  <head>
    <meta charset="utf-8" />
    <title>Qualcosa non ha funzionato | Forno Lume</title>
    <meta name="description" content="Non siamo riusciti a mostrare questa pagina. Riprova oppure torna alla homepage di Forno Lume." />
    <meta name="robots" content="noindex, follow" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      :root {
        color-scheme: light;
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
        background: #faf3e6;
        color: #221811;
      }
      * { box-sizing: border-box; }
      body {
        display: grid;
        min-height: 100vh;
        margin: 0;
        padding: 1.5rem;
        place-items: center;
        background:
          radial-gradient(70rem 32rem at 85% -10%, rgb(224 183 153 / 35%), transparent 60%),
          #faf3e6;
      }
      main { width: min(100%, 34rem); text-align: center; }
      .eyebrow {
        margin: 0;
        color: #5f4f42;
        font-size: 0.75rem;
        font-weight: 600;
        letter-spacing: 0.2em;
        text-transform: uppercase;
      }
      h1 {
        margin: 1.25rem 0 0;
        font-family: Fraunces, Georgia, serif;
        font-size: clamp(2.25rem, 8vw, 3.25rem);
        font-weight: 500;
        letter-spacing: -0.02em;
        line-height: 1.05;
      }
      .copy { margin: 1rem auto 0; max-width: 30rem; color: #5f4f42; }
      .actions {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
        justify-content: center;
        margin-top: 2rem;
      }
      a, button {
        display: inline-flex;
        min-height: 2.75rem;
        align-items: center;
        justify-content: center;
        border: 1px solid transparent;
        border-radius: 999px;
        padding: 0.7rem 1.4rem;
        font: inherit;
        font-size: 0.875rem;
        font-weight: 600;
        cursor: pointer;
        text-decoration: none;
      }
      .primary { background: #b25630; color: #fefaf1; }
      .secondary { border-color: #d9cfc3; background: #fefaf1; color: #221811; }
      a:hover, button:hover { filter: brightness(0.97); }
      a:focus-visible, button:focus-visible {
        outline: 2px solid #b85c37;
        outline-offset: 3px;
      }
    </style>
  </head>
  <body>
    <main>
      <p class="eyebrow">Forno Lume</p>
      <h1>Qualcosa non ha funzionato.</h1>
      <p class="copy">Non siamo riusciti a mostrare questa pagina. Puoi riprovare oppure tornare alla homepage.</p>
      <div class="actions">
        <button class="primary" type="button" onclick="location.reload()">Riprova</button>
        <a class="secondary" href="/">Torna alla homepage</a>
      </div>
    </main>
  </body>
</html>`;
}
