import type { Project } from "../../data/projects";
import { PlaceholderBadge, TagList } from "../ui/Tag";
import { ProjectLinks } from "./ProjectLinks";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex w-full flex-col rounded-lg border border-line bg-surface p-5 transition duration-200 hover:-translate-y-0.5 hover:border-accent/50 motion-reduce:hover:translate-y-0">
      <div className="flex items-start justify-between gap-3">
        <h4 className="text-lg font-semibold">{project.name}</h4>
        {project.placeholder && <PlaceholderBadge />}
      </div>
      <p className="mt-2 text-text/80">{project.summary}</p>
      <div className="mt-5">
        <TagList items={project.stack} label={`${project.name} tech stack`} />
      </div>
      <div className="mt-auto pt-6">
        <ProjectLinks name={project.name} github={project.github} demo={project.demo} />
      </div>
    </article>
  );
}