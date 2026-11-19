import { useState } from "react";
import { ActionButton } from "../ui/ActionButton";

const VALUES = Array.from({ length: 32 }, (_, i) => i * 3 + 2);

type State = { lo: number; hi: number; mid: number; steps: number; found: boolean };

const fresh = (): State => ({ lo: 0, hi: VALUES.length - 1, mid: -1, steps: 0, found: false });
const randomTarget = () => VALUES[Math.floor(Math.random() * VALUES.length)];

export default function BinarySearch() {
  const [target, setTarget] = useState(randomTarget);
  const [s, setS] = useState(fresh);

  const step = () => {
    if (s.found) return;
    const mid = Math.floor((s.lo + s.hi) / 2);
    const v = VALUES[mid];
    setS({
      lo: v < target ? mid + 1 : s.lo,
      hi: v > target ? mid - 1 : s.hi,
      mid,
      steps: s.steps + 1,
      found: v === target,
    });
  };

  const pick = (t: number) => {
    setTarget(t);
    setS(fresh());
  };

  let status = `Looking for ${target}. Start by checking the middle element.`;
  if (s.mid !== -1) {
    const v = VALUES[s.mid];
    status = s.found
      ? `Found ${target} at index ${s.mid} in ${s.steps} steps. A linear scan would take ${VALUES.indexOf(target) + 1}.`
      : `${v} is too ${v < target ? "small" : "big"}, so discard the ${v < target ? "left" : "right"} half.`;
  }

  return (
    <div>
      <ul className="grid grid-cols-8 gap-1.5 sm:grid-cols-16">
        {VALUES.map((v, i) => {
          const out = i < s.lo || i > s.hi;
          const isMid = i === s.mid;
          const tone = isMid
            ? "border-accent bg-accent text-ink"
            : v === target
              ? "border-accent text-accent"
              : "border-line text-muted";
          return (
            <li key={v}>
              <button
                type="button"
                onClick={() => pick(v)}
                aria-label={`Set target to ${v}`}
                className={`w-full rounded border py-2 font-mono text-xs transition-opacity ${tone} ${out && !isMid ? "opacity-25" : ""}`}
              >
                {v}
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-5 flex flex-wrap gap-2">
        <ActionButton onClick={step} disabled={s.found}>
          Step
        </ActionButton>
        <ActionButton onClick={() => pick(target)}>Reset</ActionButton>
        <ActionButton onClick={() => pick(randomTarget())}>Random target</ActionButton>
        <span className="ml-auto self-center font-mono text-xs text-muted">steps: {s.steps}</span>
      </div>

      <p aria-live="polite" className="mt-4 font-mono text-sm text-text/80">
        {status}
      </p>
    </div>
  );
}