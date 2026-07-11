// Static testimonials — replace with real client quotes per project.
// No fake ratings, review counts, or platform logos.

export type Testimonial = {
  quote: string;
  name: string;
  context: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Ci torniamo ogni volta che vogliamo una serata semplice fatta bene. Il forno si sente, la cucina anche.",
    name: "Chiara M.",
    context: "Cena tra amiche",
  },
  {
    quote:
      "Posto piccolo, accoglienza vera. Ho apprezzato che ci abbiano suggerito un calice adatto al piatto.",
    name: "Marco D.",
    context: "Cena a due",
  },
  {
    quote:
      "L'impasto della pizza è tra i più curati che abbia provato in città. E il servizio non è mai invasivo.",
    name: "Alessia R.",
    context: "Cena di lavoro",
  },
];