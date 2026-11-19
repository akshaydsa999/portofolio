import { useEffect, useRef, useState } from "react";
import { bubbleSort, insertionSort, selectionSort, shuffled, type SortStep } from "../../lib/sort";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { ActionButton } from "../ui/ActionButton";

const N = 24;
const TICK_MS = 30;
const ORDINAL = ["", "1st", "2nd", "3rd"];

const ALGOS = [
  { name: "Bubble", run: (a: number[]) => bubbleSort(a) },
  { name: "Selection", run: (a: number[]) => selectionSort(a) },
  { name: "Insertion", run: (a: number[]) => insertionSort(a, true) },
];

type Racer = { values: number[]; active: number; steps: number; place: number };

const initial = (): Racer[] => {
  const base = shuffled(N);
  return ALGOS.map(() => ({ values: base, active: -1, steps: 0, place: 0 }));
};

function advance(prev: Racer[], gens: Generator<SortStep>[], places: { current: number }): Racer[] {
  return prev.map((r, i) => {
    if (r.place) return r;
    const res = gens[i].next();
    if (res.done) return { ...r, active: -1, place: ++places.current };
    return { ...r, values: res.value.values, active: res.value.active, steps: r.steps + 1 };
  });
}

function MiniBars({ values, active, done }: { values: number[]; active: number; done: boolean }) {
  return (
    <div aria-hidden="true" className="flex h-24 items-end gap-[2px]">
      {values.map((v, i) => (
        <div
          key={i}
          style={{ height: `${(v / N) * 100}%` }}
          className={`flex-1 rounded-t-[1px] ${done ? "bg-accent/50" : i === active ? "bg-accent" : "bg-muted/30"}`}
        />
      ))}
    </div>
  );
}

export default function SortRace() {
  const reduced = useReducedMotion();
  const [racers, setRacers] = useState(initial);
  const [running, setRunning] = useState(false);
  const live = useRef(racers);
  const gens = useRef<Generator<SortStep>[]>([]);
  const places = useRef(0);

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      const next = advance(live.current, gens.current, places);
      live.current = next;
      setRacers(next);
      if (next.every((r) => r.place)) setRunning(false);
    }, TICK_MS);
    return () => window.clearInterval(id);
  }, [running]);

  const start = () => {
    const base = shuffled(N);
    places.current = 0;
    gens.current = ALGOS.map((a) => a.run(base));
    let next: Racer[] = ALGOS.map(() => ({ values: base, active: -1, steps: 0, place: 0 }));
    if (reduced) {
      while (!next.every((r) => r.place)) next = advance(next, gens.current, places);
      live.current = next;
      setRacers(next);
      return;
    }
    live.current = next;
    setRacers(next);
    setRunning(true);
  };

  const finished = racers.every((r) => r.place);
  const winner = racers.findIndex((r) => r.place === 1);

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-3">
        {racers.map((r, i) => (
          <div key={ALGOS[i].name}>
            <MiniBars values={r.values} active={r.active} done={r.place > 0} />
            <div className="mt-3 flex items-baseline justify-between font-mono text-xs">
              <span className="text-text">{ALGOS[i].name}</span>
              <span className="text-muted">
                {r.steps} steps{r.place ? ` · ${ORDINAL[r.place]}` : ""}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-4">
        <ActionButton onClick={start} disabled={running}>
          {running ? "Racing…" : racers.some((r) => r.place) ? "Race again" : "Start race"}
        </ActionButton>
        <p aria-live="polite" className="font-mono text-sm text-text/80">
          {finished
            ? `${ALGOS[winner].name} finished first, in ${racers[winner].steps} steps.`
            : "Same shuffled array, three algorithms. Who finishes first?"}
        </p>
      </div>
    </div>
  );
}