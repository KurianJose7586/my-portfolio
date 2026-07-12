/**
 * Returns the session ID for this browser tab, creating one if it doesn't exist yet.
 * All shared-space components must use this instead of raw sessionStorage.getItem()
 * to avoid race conditions where a component mounts before LiveStatus creates the ID.
 */
export function getOrCreateSessionId(): string {
  if (typeof window === "undefined") return "";
  let id = sessionStorage.getItem("kurian_tab_id");
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem("kurian_tab_id", id);
  }
  return id;
}
