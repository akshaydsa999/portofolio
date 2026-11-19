import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  title: string;
  children?: ReactNode;
};

export function Section({ id, title, children }: SectionProps) {
  const headingId = `${id}-heading`;
  return (
    <section id={id} aria-labelledby={headingId} className="mx-auto max-w-5xl px-5 py-24 sm:px-8">
      <h2 id={headingId} className="text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h2>
      <div className="mt-8">{children}</div>
    </section>
  );
}