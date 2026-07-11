import { MessageCircle, Mail } from "lucide-react";
import { site, waLink, mailLink, primaryCtaHref } from "@/config/site";

type Props = {
  eyebrow?: string;
  title: string;
  accent?: string;
  body?: string;
  variant?: "dark" | "soft";
};

export function CTASection({
  eyebrow = "Prenota ora",
  title,
  accent,
  body,
  variant = "dark",
}: Props) {
  const isDark = variant === "dark";
  return (
    <section className="container-page py-20 md:py-28">
      <div
        className={`relative overflow-hidden rounded-[2rem] border p-10 md:p-16 ${
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
          <p
            className="eyebrow"
            style={isDark ? { color: "oklch(0.86 0.08 82)" } : undefined}
          >
            <span className="opacity-80">{eyebrow}</span>
          </p>
          <h2 className="mt-4 text-4xl font-medium leading-[1.05] md:text-5xl">
            {title}
            {accent && (
              <>
                <br />
                <span
                  className="italic"
                  style={
                    isDark ? { color: "oklch(0.86 0.08 82)" } : { color: "var(--terracotta)" }
                  }
                >
                  {accent}
                </span>
              </>
            )}
          </h2>
          {body && (
            <p
              className={`mt-5 max-w-lg text-base md:text-lg ${
                isDark ? "opacity-85" : "text-muted-foreground"
              }`}
            >
              {body}
            </p>
          )}
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={primaryCtaHref()}
              target={site.primaryCta.kind === "whatsapp" ? "_blank" : undefined}
              rel={
                site.primaryCta.kind === "whatsapp"
                  ? "noopener noreferrer"
                  : undefined
              }
              className={`inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium transition hover:opacity-90 ${
                isDark
                  ? "bg-background text-foreground"
                  : "bg-primary text-primary-foreground shadow-[var(--shadow-warm)]"
              }`}
            >
              <MessageCircle className="h-4 w-4" />
              Scrivici su WhatsApp
            </a>
            <a
              href={mailLink("Contatto Forno Lume")}
              className={`inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium transition ${
                isDark
                  ? "border border-white/25 text-primary-foreground hover:bg-white/10"
                  : "border border-border bg-card hover:bg-secondary"
              }`}
            >
              <Mail className="h-4 w-4" />
              Contattaci via email
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// Convenience re-exports for named CTAs used across pages.
export const waHref = () => waLink(site.contact.whatsappReserveMessage);