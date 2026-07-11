import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  accent,
  align = "left",
  children,
}: {
  eyebrow?: string;
  title: string; // may contain \n
  accent?: string; // italic terracotta phrase appended after title
  align?: "left" | "center";
  children?: ReactNode;
}) {
  const lines = title.split("\n");
  const alignClass = align === "center" ? "text-center" : "";
  return (
    <div className={alignClass}>
      {eyebrow && (
        <p className={`eyebrow ${align === "center" ? "justify-center" : ""}`}>
          {eyebrow}
        </p>
      )}
      <h2 className="mt-4 text-4xl font-medium leading-[1.1] md:text-5xl">
        {lines.map((l, i) => (
          <span key={i} className="block">
            {l}
          </span>
        ))}
        {accent && (
          <span className="block italic text-terracotta">{accent}</span>
        )}
      </h2>
      {children && <div className="mt-4 max-w-2xl text-muted-foreground md:text-lg">{children}</div>}
    </div>
  );
}