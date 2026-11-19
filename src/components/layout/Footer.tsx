import { site } from "../../data/site";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-2 px-5 py-6 font-mono text-xs text-muted sm:px-8">
        <span>
          © {new Date().getFullYear()} {site.fullName}
        </span>
        <a href="#top" className="transition-colors hover:text-accent">
          back to top ↑
        </a>
      </div>
    </footer>
  );
}