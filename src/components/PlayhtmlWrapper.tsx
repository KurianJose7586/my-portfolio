"use client";

// PlayhtmlWrapper is now a passthrough — playhtml / Yjs has been replaced
// by our own custom presence system (/api/active-users, /api/cursors, /api/interactions).
export default function PlayhtmlWrapper({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
