import { Mail, MessageCircle } from "lucide-react";

import { site, waLink } from "@/config/site";
import { ContactChoiceDialog } from "./ContactChoiceDialog";
import { Reveal } from "./Reveal";

type Props = {
  eyebrow?: string;
  title: string;
  accent?: string;
  body?: string;
  variant?: "dark" | "soft";
  spacing?: "default" | "home";
};

export function CTASection({
  eyebrow = "Prenota ora",
  title,
  accent,
  body,
  variant = "dark",
  spacing = "default",
}: Props) {
  const isDark = variant === "dark";
  const isHomeSpacing = spacing === "home";
  const sectionSpacing = isHomeSpacing
    ? "pt-12 pb-14 md:pt-16 md:pb-20 min-[1100px]:pt-20"
    : "py-20 md:py-28";
  const cardPadding = isHomeSpacing ? "p-7 sm:p-10 md:p-14" : "p-10 md:p-16";
  const titleDelay = isHomeSpacing ? 70 : 80;
  const bodyDelay = isHomeSpacing ? 140 : 160;
  const actionsDelay = isHomeSpacing ? 210 : 240;

  return (
    <section className={`container-page ${sectionSpacing}`}>
      <div
        className={`relative overflow-hidden rounded-[2rem] border ${cardPadding} ${
          isDark ? "border-border" : "border-border bg-secondary/40"
        }`}
        style={
          isDark
            ? {
                background:
                  "linear-gradient(135deg, oklch(0.30 0.05 40) 0%, oklch(0.42 0.10 40) 55%, oklch(0.55 0.13 45) 100%)",
              }
            : undefined
        }
      >
        <div
          aria-hidden
          className={`absolute right-0 top-0 h-48 w-48 rounded-full blur-3xl md:h-72 md:w-72 ${
            isDark ? "bg-accent/30" : "bg-terracotta/10"
          }`}
        />
        <div
          className={`relative max-w-2xl ${
            isDark ? "text-primary-foreground" : "text-foreground"
          }`}
        >
          <Reveal>
            <p
              className="eyebrow"
              style={isDark ? { color: "oklch(0.86 0.08 82)" } : undefined}
            >
              <span className="opacity-80">{eyebrow}</span>
            </p>
          </Reveal>
          <Reveal delay={titleDelay} className="mt-4">
            <h2 className="text-4xl font-medium leading-[1.05] md:text-5xl">
              {title}
              {accent && (
                <>
                  <br />
                  <span
                    className="italic"
                    style={
                      isDark
                        ? { color: "oklch(0.86 0.08 82)" }
                        : { color: "var(--terracotta)" }
                    }
                  >
                    {accent}
                  </span>
                </>
              )}
            </h2>
          </Reveal>
          {body && (
            <Reveal delay={bodyDelay} className="mt-5">
              <p
                className={`max-w-lg text-base md:text-lg ${
                  isDark ? "opacity-85" : "text-muted-foreground"
                }`}
              >
                {body}
              </p>
            </Reveal>
          )}
          <Reveal delay={actionsDelay} className="mt-8">
            <div className="flex flex-wrap gap-3">
              <ContactChoiceDialog kind="booking">
                <button
                  type="button"
                  className={`motion-cta inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium hover:opacity-90 ${
                    isDark
                      ? "bg-background text-foreground"
                      : "bg-primary text-primary-foreground shadow-[var(--shadow-warm)]"
                  }`}
                >
                  <MessageCircle aria-hidden className="h-4 w-4" />
                  Prenota un tavolo
                </button>
              </ContactChoiceDialog>

              <ContactChoiceDialog kind="contact">
                <button
                  type="button"
                  className={`motion-cta inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium ${
                    isDark
                      ? "border border-white/25 text-primary-foreground hover:bg-white/10"
                      : "border border-border bg-card hover:bg-secondary"
                  }`}
                >
                  <Mail aria-hidden className="h-4 w-4" />
                  Contattaci
                </button>
              </ContactChoiceDialog>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// Compatibility helper used by existing route-level integrations.
export const waHref = () => waLink(site.contact.whatsappReserveMessage);
