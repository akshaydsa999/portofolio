import { ArrowUpRight } from "lucide-react";
import { site } from "../../data/site";

const links = [
  { label: "GitHub", href: site.links.github, external: true },
  { label: "LinkedIn", href: site.links.linkedin, external: true },
  { label: "Email", href: `mailto:${site.links.email}`, external: false },
  { label: "Instagram", href: site.links.instagram, external: true },
];

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="mx-auto max-w-5xl px-5 pb-24 pt-32 sm:px-8"
    >
      <p className="font-mono text-sm text-accent">contact</p>
      <h2
        id="contact-heading"
        className="mt-4 text-5xl font-bold uppercase tracking-tight sm:text-7xl md:text-8xl"
      >
        Got an idea?
      </h2>
      <p className="mt-4 text-2xl text-muted sm:text-3xl">Let's build something.</p>
      <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-lg">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              {...(link.external ? { target: "_blank", rel: "noreferrer" } : {})}
              className="inline-flex items-center gap-1 border-b border-line pb-0.5 transition-colors hover:border-accent hover:text-accent"
            >
              {link.label} <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}