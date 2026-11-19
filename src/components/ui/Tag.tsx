type TagListProps = { items: string[]; label: string };

export function TagList({ items, label }: TagListProps) {
  return (
    <ul aria-label={label} className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li
          key={item}
          className="rounded border border-line px-2 py-0.5 font-mono text-xs text-muted"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

export function PlaceholderBadge() {
  return (
    <span className="rounded border border-dashed border-accent/50 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-accent">
      placeholder
    </span>
  );
}