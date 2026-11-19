import { featured as p } from "../../data/projects";
import { PlaceholderBadge, TagList } from "../ui/Tag";
import { ProjectLinks } from "./ProjectLinks";

const label = "font-mono text-xs uppercase tracking-widest text-accent";

export function FeaturedProject() {
  return (
    <article
      aria-labelledby="featured-name"
      className="overflow-hidden rounded-xl border border-line bg-surface"
    >
      <div className="border-b border-line">
        <div aria-hidden="true" className="flex items-center gap-1.5 border-b border-line px-4 py-3">
          <span className="size-2.5 rounded-full bg-line" />
          <span className="size-2.5 rounded-full bg-line" />
          <span className="size-2.5 rounded-full bg-line" />
        </div>
        {p.image ? (
          <img
            src={p.image}
            alt={p.imageAlt ?? `${p.name} screenshot`}
            loading="lazy"
            className="aspect-video w-full object-cover object-top"
          />
        ) : (
          <div className="grid aspect-video place-items-center bg-ink/60 px-6 text-center font-mono text-xs text-muted">
            // screenshot goes here — set `image` in src/data/projects.ts
          </div>
        )}
      </div>

      <div className="grid gap-10 p-6 sm:p-10 lg:grid-cols-[3fr_2fr]">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h3 id="featured-name" className="text-2xl font-semibold sm:text-3xl">
              {p.name}
            </h3>
            {p.placeholder && <PlaceholderBadge />}
          </div>
          <p className="mt-3 text-lg text-text/80">{p.summary}</p>
          <dl className="mt-8 space-y-6">
            <div>
              <dt className={label}>Problem</dt>
              <dd className="mt-2 text-text/80">{p.problem}</dd>
            </div>
            <div>
              <dt className={label}>Solution</dt>
              <dd className="mt-2 text-text/80">{p.solution}</dd>
            </div>
            {p.built && (
              <div>
                <dt className={label}>How I built it</dt>
                <dd className="mt-2 text-text/80">{p.built}</dd>
              </div>
            )}
          </dl>
        </div>

        <div className="space-y-8">
          <div>
            <h4 className={label}>Stack</h4>
            <div className="mt-3">
              <TagList items={p.stack} label="Tech stack" />
            </div>
          </div>
          {p.learned && p.learned.length > 0 && (
            <div>
              <h4 className={label}>What I learned</h4>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-text/80">
                {p.learned.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          )}
          {p.next && p.next.length > 0 && (
            <div>
              <h4 className={label}>What's next</h4>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-text/80">
                {p.next.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          )}
          <ProjectLinks name={p.name} github={p.github} demo={p.demo} />
        </div>
      </div>
    </article>
  );
}