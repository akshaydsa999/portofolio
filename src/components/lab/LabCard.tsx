import { Suspense } from "react";
import { useInView } from "../../hooks/useInView";
import { TagList } from "../ui/Tag";
import type { Experiment } from "./experiments";

export function LabCard({ experiment }: { experiment: Experiment }) {
  const { ref, seen } = useInView<HTMLElement>();
  const { Component } = experiment;

  return (
    <article
      ref={ref}
      aria-labelledby={`${experiment.id}-title`}
      className="rounded-xl border border-line bg-surface p-6 sm:p-8"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h3 id={`${experiment.id}-title`} className="text-xl font-semibold">
          {experiment.title}
        </h3>
        <TagList items={experiment.tags} label={`${experiment.title} topics`} />
      </div>
      <p className="mt-2 max-w-2xl text-text/80">{experiment.description}</p>
      <div className="mt-6 min-h-40">
        {seen ? (
          <Suspense fallback={<p className="font-mono text-xs text-muted">loading…</p>}>
            <Component />
          </Suspense>
        ) : null}
      </div>
    </article>
  );
}