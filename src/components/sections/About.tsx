import { about } from "../../data/about";
import { Section } from "../ui/Section";

export function About() {
  return (
    <Section id="about" title="About">
      <div className="grid gap-10 md:grid-cols-[3fr_2fr]">
        <div className="space-y-5 text-lg leading-relaxed text-text/80">
          {about.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <dl className="h-fit divide-y divide-line rounded-lg border border-line bg-surface font-mono text-sm">
          {about.facts.map((fact) => (
            <div key={fact.label} className="flex flex-col gap-1 px-5 py-4">
              <dt className="text-xs uppercase tracking-widest text-muted">{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}