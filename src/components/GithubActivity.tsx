"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/data";
import { GithubIcon } from "@/components/icons";

type Day = { date: string; count: number; level: number };

// One-hue ramp for GitHub's 0-4 levels: paper, then punch-pink light to full
const LEVELS = ["bg-paper", "bg-punch-pink/25", "bg-punch-pink/50", "bg-punch-pink/75", "bg-punch-pink"];
const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

const day = (d: Day) => new Date(d.date).toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
const describe = (d: Day) => `${d.count} contribution${d.count === 1 ? "" : "s"} · ${day(d)}`;

export default function GithubActivity() {
  const [days, setDays] = useState<Day[] | null>(null);
  const [hovered, setHovered] = useState<Day | null>(null);

  useEffect(() => {
    fetch("/api/github")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d?.days && setDays(d.days))
      .catch(() => {});
  }, []);

  // Not loaded yet (or GitHub is down): render nothing, like the hero's live counters
  if (!days) return null;

  const total = days.reduce((sum, d) => sum + d.count, 0);
  const peak = days.reduce((a, b) => (b.count > a.count ? b : a));

  return (
    <div className="brutalist-card p-6 md:p-8">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <p className="eyebrow text-ink/50 mb-2">Past month on GitHub</p>
          <h3 className="text-3xl font-black tracking-tight tabular-nums">{total.toLocaleString("en-US")} contributions</h3>
        </div>
        <a
          href={siteConfig.github}
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub profile"
          className="mechanical-button bg-cyber-yellow w-11 h-11 shrink-0"
        >
          <GithubIcon size={20} />
        </a>
      </div>

      <div className="grid grid-cols-7 gap-1.5" onMouseLeave={() => setHovered(null)}>
        {WEEKDAYS.map((d, i) => (
          <span key={i} className="eyebrow text-[10px] tracking-normal text-ink/50 text-center pb-1" aria-hidden>
            {d}
          </span>
        ))}
        {days.map((d) => (
          <span
            key={d.date}
            role="img"
            aria-label={describe(d)}
            onMouseEnter={() => setHovered(d)}
            className={`aspect-square border-2 border-ink ${LEVELS[d.level]} transition-[translate,box-shadow] duration-100 ease-out-quint hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal-sm`}
          />
        ))}
        {/* Rest of the current week, still to come */}
        {Array.from({ length: 35 - days.length }, (_, i) => (
          <span key={i} className="aspect-square border-2 border-dashed border-ink/20" aria-hidden />
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 mt-5 font-mono text-xs font-bold uppercase">
        <span>{hovered ? describe(hovered) : `Peak · ${peak.count} on ${day(peak)}`}</span>
        <span className="flex items-center gap-1 text-ink/50" aria-hidden>
          Less
          {LEVELS.map((c) => (
            <span key={c} className={`w-3 h-3 border-2 border-ink ${c}`} />
          ))}
          More
        </span>
      </div>
    </div>
  );
}
