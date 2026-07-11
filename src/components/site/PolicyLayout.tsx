import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { site } from "@/config/site";

export function PolicyLayout({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container-page pb-24 pt-32 md:pt-40">
        <div className="mx-auto max-w-3xl">
          <p className="eyebrow">Documento legale</p>
          <h1 className="mt-4 text-4xl font-medium md:text-5xl">{title}</h1>
          {intro && (
            <p className="mt-4 text-base text-muted-foreground">{intro}</p>
          )}
          <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-foreground/85 [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:text-foreground [&_p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5">
            {children}
          </div>
          <p className="mt-16 text-xs text-muted-foreground">
            Ultimo aggiornamento: {site.legal.lastUpdate}
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
