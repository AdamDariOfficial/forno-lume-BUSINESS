import type { Testimonial } from "@/config/testimonials";

export function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <figure className="flex h-full flex-col justify-between rounded-3xl border border-border bg-card p-7 md:p-8">
      <blockquote className="font-display text-lg leading-snug md:text-xl">
        <span aria-hidden className="mr-1 text-terracotta">“</span>
        {item.quote}
        <span aria-hidden className="ml-1 text-terracotta">”</span>
      </blockquote>
      <figcaption className="mt-6 border-t border-border pt-4 text-sm">
        <span className="block text-foreground">{item.name}</span>
        <span className="mt-0.5 block text-xs uppercase tracking-widest text-muted-foreground">
          {item.context}
        </span>
      </figcaption>
    </figure>
  );
}