import { ArrowUpRight } from "lucide-react";

type ProjectLinksProps = { name: string; github?: string; demo?: string };

const linkClass =
  "inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-accent";

export function ProjectLinks({ name, github, demo }: ProjectLinksProps) {
  if (!github && !demo) return null;
  return (
    <div className="flex gap-5">
      {github && (
        <a
          href={github}
          target="_blank"
          rel="noreferrer"
          aria-label={`${name} on GitHub`}
          className={linkClass}
        >
          GitHub <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      )}
      {demo && (
        <a
          href={demo}
          target="_blank"
          rel="noreferrer"
          aria-label={`${name} live demo`}
          className={linkClass}
        >
          Live demo <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      )}
    </div>
  );
}