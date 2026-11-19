import { experiments } from "../lab/experiments";
import { LabCard } from "../lab/LabCard";
import { Section } from "../ui/Section";

export function Lab() {
  return (
    <Section id="lab" title="The Lab">
      <p className="max-w-2xl text-lg text-text/80">
        Small experiments and prototypes. This is where I try ideas, mostly around algorithms, and
        see how they behave.
      </p>
      <ul className="mt-10 grid gap-6">
        {experiments.map((experiment) => (
          <li key={experiment.id}>
            <LabCard experiment={experiment} />
          </li>
        ))}
      </ul>
    </Section>
  );
}