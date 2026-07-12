"use client";

import dynamic from "next/dynamic";
import ArcadeLobby from "@/components/arcade/ArcadeLobby";
import CustomCursor from "@/components/CustomCursor";

const InteractionEffects = dynamic(() => import("@/components/InteractionEffects"), { ssr: false });

export default function ArcadePage() {
  return (
    <>
      <CustomCursor />
      <InteractionEffects />
      <ArcadeLobby />
    </>
  );
}
