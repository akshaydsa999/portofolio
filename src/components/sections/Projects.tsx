import { projects } from "../../data/projects";
import { FeaturedProject } from "../projects/FeaturedProject";
import { ProjectCard } from "../projects/ProjectCard";
import { Section } from "../ui/Section";

export function Projects() {
  return (
    <Section id="projects" title="Projects">
      <FeaturedProject />
      {projects.length > 0 && (
        <>
          <h3 className="mt-16 font-mono text-xs uppercase tracking-widest text-muted">
            More projects
          </h3>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <li key={project.name} className="flex">
                <ProjectCard project={project} />
              </li>
            ))}
          </ul>
        </>
      )}
    </Section>
  );
}