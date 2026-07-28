import type { ReactNode } from "react";

// Internal page hero with the same restrained entrance language as START:
// one composed fade, rather than a mechanical stagger for every text element.
export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  const lines = title.split("\n");

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(1100px 500px at 85% -10%, oklch(0.86 0.06 60 / 0.45), transparent 60%), radial-gradient(800px 420px at -10% 20%, oklch(0.9 0.04 90 / 0.45), transparent 60%)",
        }}
      />
      <div className="container-page pb-14 pt-16 md:pb-20 md:pt-24">
        <div className="fade-up">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-5 max-w-3xl text-[2.4rem] font-medium leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            {lines.map((line, index) => (
              <span key={index} className="block">
                {line}
                {index < lines.length - 1 ? " " : ""}
              </span>
            ))}
          </h1>
          {subtitle && (
            <p className="mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">
              {subtitle}
            </p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>
    </section>
  );
}
