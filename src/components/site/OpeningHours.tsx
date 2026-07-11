import { site } from "@/config/site";

export function OpeningHours({ compact = false }: { compact?: boolean }) {
  return (
    <table className="w-full text-sm">
      <caption className="sr-only">Orari settimanali di Forno Lume</caption>
      <tbody className="divide-y divide-border/70">
        {site.hoursWeekly.map((h) => (
          <tr key={h.day} className={compact ? "" : "h-11"}>
            <th
              scope="row"
              className="w-1/3 py-2 text-left font-normal text-muted-foreground"
            >
              {compact ? h.short : h.day}
            </th>
            <td
              className={`py-2 text-foreground ${
                h.closed ? "text-muted-foreground" : ""
              }`}
            >
              {h.label}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}