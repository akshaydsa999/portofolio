import { useEffect, useRef, useState } from "react";
import { insertionSort, shuffled } from "../../lib/sort";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const COUNT = 36;
const STEP_MS = 45;
const HOLD_MS = 2200;
const SORTED = Array.from({ length: COUNT }, (_, i) => i + 1);

export function SortBars() {
  const reduced = useReducedMotion();
  const [initial] = useState(() => shuffled(COUNT));
  const [values, setValues] = useState(initial);
  const [active, setActive] = useState(-1);
  const [hover, setHover] = useState(-1);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) return;

    // Pause when scrolled out of view or the tab is hidden.
    let visible = true;
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    if (rootRef.current) observer.observe(rootRef.current);

    let steps = insertionSort(initial);
    let timer = 0;

    const tick = () => {
      if (!visible || document.hidden) {
        timer = window.setTimeout(tick, 300);
        return;
      }
      const next = steps.next();
      if (next.done) {
        const fresh = shuffled(COUNT);
        steps = insertionSort(fresh);
        setValues(fresh);
        setActive(-1);
        timer = window.setTimeout(tick, 600);
        return;
      }
      setValues(next.value.values);
      setActive(next.value.active);
      timer = window.setTimeout(tick, next.value.active === -1 ? HOLD_MS : STEP_MS);
    };

    timer = window.setTimeout(tick, 800);
    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, [reduced, initial]);

  const shown = reduced ? SORTED : values;
  const shownActive = reduced ? -1 : active;

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setHover(Math.floor(((e.clientX - rect.left) / rect.width) * COUNT));
  };

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      onPointerMove={onPointerMove}
      onPointerLeave={() => setHover(-1)}
      className="flex h-40 items-end gap-[3px] sm:h-56"
    >
      {shown.map((v, i) => {
        const color =
          i === shownActive || i === shownActive + 1
            ? "bg-accent"
            : Math.abs(i - hover) <= 1
              ? "bg-accent/60"
              : "bg-muted/25";
        return (
          <div
            key={i}
            style={{ height: `${(v / COUNT) * 100}%` }}
            className={`flex-1 rounded-t-[2px] transition-colors duration-150 ${color}`}
          />
        );
      })}
    </div>
  );
}