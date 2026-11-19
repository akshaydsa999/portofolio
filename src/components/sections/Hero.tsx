import { ArrowUpRight, FileText } from "lucide-react";
import { site } from "../../data/site";
import { Button } from "../ui/Button";
import { SortBars } from "../hero/SortBars";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="mx-auto max-w-5xl px-5 pb-16 pt-20 sm:px-8 sm:pt-32"
    >
      <p className="font-mono text-sm text-accent">{site.education}</p>
      <h1
        id="hero-heading"
        className="mt-4 text-6xl font-bold uppercase tracking-tight sm:text-8xl md:text-9xl"
      >
        {site.name}
      </h1>
      <p className="mt-4 text-xl text-muted sm:text-2xl">{site.tagline}</p>

      <ul aria-label="Focus areas" className="mt-6 flex flex-wrap gap-2">
        {site.focus.map((f) => (
          <li
            key={f}
            className="rounded border border-line px-2.5 py-1 font-mono text-xs text-muted"
          >
            {f}
          </li>
        ))}
      </ul>

      <div className="mt-10 flex flex-wrap gap-3">
        <Button variant="primary" href="#projects">
          View projects
        </Button>
        <Button href={site.links.github} target="_blank" rel="noreferrer">
          GitHub <ArrowUpRight size={16} />
        </Button>
        <Button href={site.links.resume} target="_blank" rel="noreferrer">
          <FileText size={16} /> Resume
        </Button>
      </div>

      <div className="mt-16">
        <SortBars />
        <p className="mt-3 font-mono text-xs text-muted">insertion_sort() — move your cursor over it</p>
      </div>
    </section>
  );
}