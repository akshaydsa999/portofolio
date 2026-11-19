import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { chips, runCommand } from "./commands";

type Line = { id: number; kind: "in" | "out"; text: string };

const WELCOME = ["Welcome. Type a command, or tap one below.", 'Try "help".'];

export function Terminal() {
  const reduced = useReducedMotion();
  const [lines, setLines] = useState<Line[]>(() =>
    WELCOME.map((text, id) => ({ id, kind: "out" as const, text })),
  );
  const [value, setValue] = useState("");
  const nextId = useRef(WELCOME.length);
  const past = useRef<string[]>([]);
  const cursor = useRef(0);
  const logRef = useRef<HTMLDivElement>(null);

  // Keep the newest output in view.
  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const run = (raw: string) => {
    const command = raw.trim();
    if (!command) return;
    past.current.push(command);
    cursor.current = past.current.length;

    const result = runCommand(command);
    if (result.clear) {
      setLines([]);
      return;
    }

    const added: Line[] = [
      { id: nextId.current++, kind: "in", text: command },
      ...result.lines.map((text) => ({ id: nextId.current++, kind: "out" as const, text })),
    ];
    setLines((prev) => [...prev, ...added]);

    if (result.section) {
      document
        .getElementById(result.section)
        ?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
      window.history.replaceState(null, "", `#${result.section}`);
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    run(value);
    setValue("");
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const h = past.current;
    if (e.key === "ArrowUp" && h.length) {
      e.preventDefault();
      cursor.current = Math.max(0, cursor.current - 1);
      setValue(h[cursor.current]);
    } else if (e.key === "ArrowDown" && h.length) {
      e.preventDefault();
      cursor.current = Math.min(h.length, cursor.current + 1);
      setValue(h[cursor.current] ?? "");
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-ink">
      <div
        aria-hidden="true"
        className="flex items-center gap-1.5 border-b border-line bg-surface px-4 py-3"
      >
        <span className="size-2.5 rounded-full bg-line" />
        <span className="size-2.5 rounded-full bg-line" />
        <span className="size-2.5 rounded-full bg-line" />
        <span className="ml-3 font-mono text-xs text-muted">akshay@portfolio ~</span>
      </div>

      <div
        ref={logRef}
        role="log"
        aria-label="Terminal output"
        tabIndex={0}
        className="h-64 overflow-y-auto px-4 py-3 font-mono text-sm leading-relaxed"
      >
        {lines.map((line) =>
          line.kind === "in" ? (
            <p key={line.id} className="break-words text-text">
              <span aria-hidden="true" className="text-accent">
                ${" "}
              </span>
              {line.text}
            </p>
          ) : (
            <p key={line.id} className="whitespace-pre-wrap break-words text-muted">
              {line.text}
            </p>
          ),
        )}
      </div>

      <form
        onSubmit={onSubmit}
        className="flex items-center gap-2 border-t border-line px-4 py-3 focus-within:border-accent"
      >
        <span aria-hidden="true" className="font-mono text-accent">
          $
        </span>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          aria-label="Terminal command"
          placeholder="type a command"
          autoCapitalize="off"
          autoCorrect="off"
          autoComplete="off"
          spellCheck={false}
          enterKeyHint="go"
          className="min-w-0 flex-1 bg-transparent font-mono text-base text-text outline-none placeholder:text-muted/50 sm:text-sm"
        />
      </form>

      <div className="flex flex-wrap gap-2 border-t border-line bg-surface p-3">
        {chips.map((name) => (
          <button
            key={name}
            type="button"
            onClick={() => run(name)}
            className="rounded border border-line px-2.5 py-1 font-mono text-xs text-muted transition-colors hover:border-accent hover:text-accent"
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
}