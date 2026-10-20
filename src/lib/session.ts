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

// Live cursors and interactions only sync while someone else is online and this tab is visible.
// Polling Redis for an audience of one burned the free Upstash quota (~60K commands/hour per tab).
let othersOnline = false;

// Registers this tab as online and returns the live count (null if hidden or presence is down).
// Pages call it every 8s; hidden tabs stay quiet and drop off after the server's 20s timeout.
export async function presenceHeartbeat(): Promise<number | null> {
  if (document.visibilityState !== "visible") return null;
  const data = await presenceFetch("/api/active-users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sessionId: getOrCreateSessionId() }),
  });
  if (typeof data?.count !== "number") return null;
  othersOnline = data.count > 1;
  return data.count;
}

export function presenceActive() {
  return othersOnline && document.visibilityState === "visible";
}
