import { timeline } from "../../data/timeline";
import { Section } from "../ui/Section";

const formatDate = (date: string) =>
  new Date(`${date}-01T00:00:00Z`)
    .toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" })
    .toUpperCase();

export function BuildLog() {
  const entries = [...timeline].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <Section id="log" title="Build log">
      <p className="max-w-2xl text-lg text-text/80">
        A running record of what I build and learn, newest first.
      </p>
      <ol className="mt-10 border-l border-line">
        {entries.map((entry, i) => (
          <li key={`${entry.date}-${entry.title}`} className="relative pb-10 pl-8 last:pb-0">
            <span
              aria-hidden="true"
              className={`absolute -left-[5.5px] top-1.5 size-2.5 rounded-full border border-accent ${
                i === 0 ? "bg-accent" : "bg-ink"
              }`}
            />
            <time dateTime={entry.date} className="font-mono text-xs tracking-widest text-accent">
              {formatDate(entry.date)}
            </time>
            <h3 className="mt-1 text-lg font-semibold">{entry.title}</h3>
            {entry.note && <p className="mt-1 max-w-xl text-text/80">{entry.note}</p>}
          </li>
        ))}
      </ol>
    </Section>
  );
}