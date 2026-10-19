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
