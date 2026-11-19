import { skills } from "../../data/skills";
import { Section } from "../ui/Section";
import { TagList } from "../ui/Tag";

export function Toolbox() {
  return (
    <Section id="toolbox" title="Toolbox">
      <div className="grid gap-4 md:grid-cols-3">
        {skills.map((group) => (
          <article key={group.title} className="rounded-lg border border-line bg-surface p-5">
            <h3 className="font-mono text-xs uppercase tracking-widest text-accent">
              {group.title}
            </h3>
            <div className="mt-4">
              <TagList items={group.items} label={group.title} />
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}