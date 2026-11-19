import { ArrowUpRight } from "lucide-react";
import { site } from "../../data/site";
import { useGithubRepos } from "../../hooks/useGithubRepos";
import { useInView } from "../../hooks/useInView";
import { Button } from "../ui/Button";
import { Section } from "../ui/Section";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", year: "numeric" });

const note = "font-mono text-sm text-muted";

export function GithubActivity() {
  const { ref, seen } = useInView<HTMLDivElement>();
  const { status, repos } = useGithubRepos(site.githubUsername, seen);

  return (
    <Section id="github" title="GitHub">
      <div ref={ref}>
        <p className="max-w-2xl text-lg text-text/80">
          My most recently updated public repositories, fetched live from GitHub.
        </p>

        <div className="mt-8">
          {(status === "idle" || status === "loading") && <p className={note}>loading repositories…</p>}
          {status === "error" && (
            <p className={note}>Couldn't load repositories right now. You can still see them on GitHub.</p>
          )}
          {status === "ready" && repos.length === 0 && <p className={note}>No public repositories yet.</p>}
          {status === "ready" && repos.length > 0 && (
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {repos.map((repo) => (
                <li key={repo.id} className="flex">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex w-full flex-col rounded-lg border border-line bg-surface p-5 transition duration-200 hover:-translate-y-0.5 hover:border-accent/50 motion-reduce:hover:translate-y-0"
                  >
                    <span className="font-mono text-sm text-accent">{repo.name}</span>
                    <span className="mt-2 text-text/80">{repo.description ?? "No description yet."}</span>
                    <span className="mt-auto flex items-center justify-between pt-5 font-mono text-xs text-muted">
                      <span>{repo.language ?? "—"}</span>
                      <span>updated {formatDate(repo.pushed_at)}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-8">
          <Button href={site.links.github} target="_blank" rel="noreferrer">
            View profile <ArrowUpRight size={16} />
          </Button>
        </div>
      </div>
    </Section>
  );
}