import dynamic from "next/dynamic";
import ArcadeLobby from "@/components/arcade/ArcadeLobby";
import CustomCursor from "@/components/CustomCursor";

const InteractionEffects = dynamic(() => import("@/components/InteractionEffects"), { ssr: false });

export const metadata = {
  title: "Arcade — Kurian Jose",
  description: "Retro arcade games embedded in the portfolio. Play Snake, Pong, and Memory Match.",
};

export default function ArcadePage() {
  return (
    <>
      <CustomCursor />
      <InteractionEffects />
      <ArcadeLobby />
    </>
  );
}
