import { currently } from "../../data/currently";
import { Section } from "../ui/Section";

export function Currently() {
  return (
    <Section id="currently" title="Currently">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {currently.items.map((item) => (
          <article
            key={item.label}
            className="rounded-lg border border-line bg-surface p-5 transition-colors hover:border-accent/50"
          >
            <h3 className="font-mono text-xs uppercase tracking-widest text-accent">
              {item.label}
            </h3>
            <ul className="mt-4 space-y-1.5">
              {item.entries.map((entry) => (
                <li key={entry}>{entry}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <p className="mt-6 flex items-center gap-2 font-mono text-xs text-muted">
        <span
          aria-hidden="true"
          className="size-1.5 rounded-full bg-accent motion-safe:animate-pulse"
        />
        last updated {currently.updated}
      </p>
    </Section>
  );
}