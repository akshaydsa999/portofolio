import { about } from "../../data/about";
import { featured, projects } from "../../data/projects";
import { site } from "../../data/site";
import { skills } from "../../data/skills";
import { experiments } from "../lab/experiments";

export type Result = { lines: string[]; section?: string; clear?: boolean };

type Command = {
  name: string;
  description: string;
  section?: string; // id of the page section to scroll to
  output: () => string[];
};

const commands: Command[] = [
  {
    name: "about",
    description: "who I am",
    section: "about",
    output: () => [about.paragraphs[0]],
  },
  {
    name: "projects",
    description: "things I've built",
    section: "projects",
    output: () => [`featured: ${featured.name}`, ...projects.map((p) => `· ${p.name}`)],
  },
  {
    name: "skills",
    description: "languages and tools",
    section: "toolbox",
    output: () => skills.map((g) => `${g.title.toLowerCase()}: ${g.items.join(", ")}`),
  },
  {
    name: "lab",
    description: "experiments to play with",
    section: "lab",
    output: () => experiments.map((e) => `· ${e.title}`),
  },
  { name: "log", description: "what I've been doing", section: "log", output: () => ["Opening the build log."] },
  {
    name: "github",
    description: "my repositories",
    section: "github",
    output: () => [`github.com/${site.githubUsername}`],
  },
  { name: "resume", description: "resume and download", section: "resume", output: () => ["Opening the resume section."] },
  { name: "contact", description: "get in touch", section: "contact", output: () => [site.links.email] },
];

export const chips = ["help", ...commands.map((c) => c.name), "clear"];

export function runCommand(raw: string): Result {
  const name = raw.trim().toLowerCase();
  if (name === "clear") return { lines: [], clear: true };

  if (name === "help") {
    return {
      lines: [
        "available commands:",
        ...commands.map((c) => `  ${c.name.padEnd(9)} ${c.description}`),
        `  ${"clear".padEnd(9)} clear the screen`,
      ],
    };
  }

  const command = commands.find((c) => c.name === name);
  if (!command) return { lines: [`command not found: ${name}. Type "help".`] };
  return { lines: command.output(), section: command.section };
}