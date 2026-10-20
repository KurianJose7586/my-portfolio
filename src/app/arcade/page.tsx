"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import ArcadeLobby from "@/components/arcade/ArcadeLobby";
import CustomCursor from "@/components/CustomCursor";
import { presenceHeartbeat } from "@/lib/session";

const InteractionEffects = dynamic(() => import("@/components/InteractionEffects"), { ssr: false });

export default function ArcadePage() {
  // No LiveStatus here, so keep the "anyone else online?" gate fresh for InteractionEffects.
  useEffect(() => {
    presenceHeartbeat();
    const interval = setInterval(presenceHeartbeat, 8_000);
    document.addEventListener("visibilitychange", presenceHeartbeat);
    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", presenceHeartbeat);
    };
  }, []);

  return (
    <>
      <CustomCursor />
      <InteractionEffects />
      <ArcadeLobby />
    </>
  );
}
