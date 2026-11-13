import { siteConfig } from "@/lib/data";

export const revalidate = 3600;

const user = siteConfig.github.split("/").pop();

// GET /api/github: the last 5 calendar weeks of contributions, oldest first.
// ponytail: scrapes the public contributions page (no token). If GitHub changes its markup
// this returns 502 and the widget hides; switch to the GraphQL contributionsCollection API then.
export async function GET() {
  const res = await fetch(`https://github.com/users/${user}/contributions`);
  if (!res.ok) return Response.json({ error: "GitHub unavailable" }, { status: 502 });
  const html = await res.text();

  // Exact counts live in tooltips keyed by cell id: "18 contributions on …" / "No contributions on …"
  const counts = new Map<string, number>();
  for (const [, id, n] of html.matchAll(/for="contribution-day-component-([\d-]+)"[^>]*>(No|\d+) contribution/g)) {
    counts.set(id, n === "No" ? 0 : Number(n));
  }

  // Cell ids are "<weekday>-<week>"
  const cells = [...html.matchAll(/data-date="([\d-]+)" id="contribution-day-component-((\d)-(\d+))"/g)];
  const lastWeek = Math.max(...cells.map((m) => Number(m[4])));
  const days = cells
    .filter((m) => Number(m[4]) > lastWeek - 5)
    .map(([, date, id]) => ({ date, count: counts.get(id) ?? 0 }))
    .sort((a, b) => a.date.localeCompare(b.date));

  if (!days.length) return Response.json({ error: "Unexpected markup" }, { status: 502 });

  // Levels 1-4 by quartile of this month's active days. GitHub's data-level buckets
  // against the whole year, which flattens a single month into one shade.
  const active = days.map((d) => d.count).filter(Boolean).sort((a, b) => a - b);
  const quartiles = [0.25, 0.5, 0.75].map((q) => active[Math.floor(q * active.length)]);
  return Response.json({
    days: days.map((d) => ({ ...d, level: d.count && 1 + quartiles.filter((t) => d.count > t).length })),
  });
}
