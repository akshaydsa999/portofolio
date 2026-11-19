import { useEffect, useState } from "react";

export type Repo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  pushed_at: string;
};

type State = { status: "idle" | "loading" | "ready" | "error"; repos: Repo[] };

const TTL_MS = 10 * 60 * 1000;

export function useGithubRepos(username: string, enabled: boolean): State {
  const [state, setState] = useState<State>({ status: "idle", repos: [] });

  useEffect(() => {
    if (!enabled) return;
    const key = `gh-repos:${username}`;

    try {
      const cached = sessionStorage.getItem(key);
      if (cached) {
        const { at, repos } = JSON.parse(cached) as { at: number; repos: Repo[] };
        if (Date.now() - at < TTL_MS) {
          setState({ status: "ready", repos });
          return;
        }
      }
    } catch {
      // Storage can be unavailable; just fetch.
    }

    const controller = new AbortController();
    setState({ status: "loading", repos: [] });

    fetch(`https://api.github.com/users/${username}/repos?sort=pushed&per_page=30`, {
      signal: controller.signal,
      headers: { Accept: "application/vnd.github+json" },
    })
      .then((res) => {
        if (!res.ok) throw new Error(String(res.status));
        return res.json() as Promise<(Repo & { fork: boolean })[]>;
      })
      .then((data) => {
        const repos: Repo[] = data
          .filter((r) => !r.fork)
          .slice(0, 6)
          .map(({ id, name, description, html_url, language, pushed_at }) => ({
            id,
            name,
            description,
            html_url,
            language,
            pushed_at,
          }));
        try {
          sessionStorage.setItem(key, JSON.stringify({ at: Date.now(), repos }));
        } catch {
          // Ignore storage errors.
        }
        setState({ status: "ready", repos });
      })
      .catch((err: Error) => {
        if (err.name !== "AbortError") setState({ status: "error", repos: [] });
      });

    return () => controller.abort();
  }, [username, enabled]);

  return state;
}