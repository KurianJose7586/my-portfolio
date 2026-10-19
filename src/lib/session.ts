/**
 * Returns the session ID for this browser tab, creating one if it doesn't exist yet.
 * All shared-space components must use this instead of raw sessionStorage.getItem()
 * to avoid race conditions where a component mounts before LiveStatus creates the ID.
 */
// Brand palette for presence (cursors, clicks, lasers). Fills always get a black stroke.
const SESSION_COLORS = ["#EB5E93", "#5AC8D8", "#F7D046", "#FFFFFF", "#7BD389"];

export function sessionColor(id: string): string {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  return SESSION_COLORS[hash % SESSION_COLORS.length];
}

export function getOrCreateSessionId(): string {
  if (typeof window === "undefined") return "";
  let id = sessionStorage.getItem("kurian_tab_id");
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem("kurian_tab_id", id);
  }
  return id;
}

// Shared by every presence call: after 3 straight failures (Redis down / env missing)
// all presence fetching stops for this tab. Returns parsed JSON, or null on failure.
// ponytail: no retry until reload; add a timed re-probe if prod Redis blips matter.
let presenceFailures = 0;

export async function presenceFetch(url: string, init?: RequestInit) {
  if (presenceFailures >= 3) return null;
  try {
    const res = await fetch(url, init);
    if (res.ok) {
      presenceFailures = 0;
      return await res.json();
    }
  } catch { /* counted below */ }
  presenceFailures++;
  return null;
}
