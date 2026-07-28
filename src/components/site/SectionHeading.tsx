import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  accent,
  align = "left",
  children,
}: {
  eyebrow?: string;
  title: string;
  accent?: string;
  align?: "left" | "center";
  children?: ReactNode;
}) {
  const lines = title.split("\n");
  const alignClass = align === "center" ? "text-center" : "";

  return (
    <div className={alignClass}>
      <Reveal>
        {eyebrow && (
          <p className={`eyebrow ${align === "center" ? "justify-center" : ""}`}>
            {eyebrow}
          </p>
        )}
        <h2 className={`${eyebrow ? "mt-4" : ""} text-4xl font-medium leading-[1.1] md:text-5xl`}>
          {lines.map((line, index) => (
            <span key={index} className="block">
              {line}
              {index < lines.length - 1 ? " " : ""}
            </span>
          ))}
          {accent && (
            <span className="block italic text-terracotta">{accent}</span>
          )}
        </h2>
      </Reveal>
      {children && (
        <Reveal delay={80} className="mt-4 max-w-2xl text-muted-foreground md:text-lg">
          {children}
        </Reveal>
      )}
    </div>
  );
}
