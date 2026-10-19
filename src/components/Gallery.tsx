import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { LayoutGrid, Search, Shuffle, X } from "lucide-react";
import SectionHeader from "./SectionHeader";

interface Photo {
  src: string;
  caption: string;
}

const photosData: Photo[] = [
  { src: "/gallery-photos/Community Team Group Photo - NVIDIA LAB.jpeg", caption: "GDG Team Meet @ NVIDIA Lab 🚀" },
  { src: "/gallery-photos/DevFest Noida 2025 Team.jpeg", caption: "DevFest Noida 2025 Organizers" },
  { src: "/gallery-photos/Devfest_2025_noida team.jpeg", caption: "The Squad at DevFest 2025! ⚡" },
  { src: "/gallery-photos/GDG Hackathon day participats coding .jpeg", caption: "Hacking in progress... 💻" },
  { src: "/gallery-photos/GDG Team Meetup.jpeg", caption: "GDG Galgotias Core Meetup" },
  { src: "/gallery-photos/GDG hackathon wrap team pic.jpeg", caption: "GDG Hackathon Wrap-up!" },
  { src: "/gallery-photos/me Hosting a Technical Workshop.jpeg", caption: "Hosting a Tech Workshop 🎤" },
  { src: "/gallery-photos/me at devfest noida 2025.jpeg", caption: "DevFest Noida 2025 stage!" },
];

interface Position {
  left: string;
  top: string;
  rotate: number;
}

// Percentages of the desk (cards are 22% wide), so nothing piles into a corner.
// Row 1 starts at ~11% to leave the hint chip visible.
const SCATTER: Position[] = [
  { left: "4%", top: "13%", rotate: -5 },
  { left: "29%", top: "10%", rotate: 4 },
  { left: "54%", top: "14%", rotate: -4 },
  { left: "76%", top: "11%", rotate: 5 },
  { left: "8%", top: "53%", rotate: 3 },
  { left: "33%", top: "56%", rotate: -3 },
  { left: "57%", top: "51%", rotate: 4 },
  { left: "75%", top: "55%", rotate: -5 },
];

const GRID: Position[] = photosData.map((_, i) => ({
  left: `${2 + (i % 4) * 24.5}%`,
  top: `${11 + Math.floor(i / 4) * 45}%`,
  rotate: 0,
}));

export default function Gallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const [activePhoto, setActivePhoto] = useState<Photo | null>(null);
  const [layoutMode, setLayoutMode] = useState<"scatter" | "grid">("scatter");
  const [positions, setPositions] = useState<Position[]>(SCATTER);
  const [zIndexList, setZIndexList] = useState<number[]>(photosData.map((_, i) => i + 1));

  useEffect(() => {
    if (!activePhoto) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActivePhoto(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activePhoto]);

  const handleTidyGrid = () => {
    setLayoutMode("grid");
    setPositions(GRID);
  };

  const handleShuffle = () => {
    setLayoutMode("scatter");
    setPositions(SCATTER.map((pos) => ({ ...pos, rotate: Math.floor(Math.random() * 12) - 6 })));
  };

  const bringToFront = (index: number) => {
    setZIndexList((prev) => {
      const next = [...prev];
      next[index] = Math.max(...prev) + 1;
      return next;
    });
  };

  const toggleClass = (on: boolean) =>
    `mechanical-button px-4 py-2.5 text-xs ${on ? "bg-ink text-white" : "bg-white"}`;

  return (
    <section id="irl" className="scroll-mt-32">
      <SectionHeader
        index="04"
        label="IRL"
        title="Off-screen"
        subtitle="Community, hackathons & events"
        action={
          <div className="hidden md:flex gap-3">
            <button onClick={handleTidyGrid} className={toggleClass(layoutMode === "grid")}>
              <LayoutGrid size={16} strokeWidth={2.5} /> Tidy
            </button>
            <button onClick={handleShuffle} className={toggleClass(layoutMode === "scatter")}>
              <Shuffle size={16} strokeWidth={2.5} /> Shuffle
            </button>
          </div>
        }
      />

      {/* Phones: a plain grid; dragging cards around a small screen isn't fun */}
      <div className="md:hidden grid grid-cols-2 gap-4">
        {photosData.map((photo) => (
          <button key={photo.src} onClick={() => setActivePhoto(photo)} className="bg-white border-3 border-ink shadow-brutal-sm p-2 text-left">
            <div className="relative aspect-4/3 border-2 border-ink overflow-hidden bg-ink">
              <Image src={photo.src} alt={photo.caption} fill sizes="45vw" className="object-cover" />
            </div>
            <p className="font-caveat text-lg font-bold leading-tight mt-2">{photo.caption}</p>
          </button>
        ))}
      </div>

      {/* Desktop: the drag-around desk */}
      <div
        ref={containerRef}
        className="hidden md:block relative w-full h-[640px] lg:h-[720px] bg-white border-3 border-ink shadow-brutal overflow-hidden select-none"
        style={{ backgroundImage: "radial-gradient(#d6d3cb 1px, transparent 1px)", backgroundSize: "20px 20px" }}
      >
        <div className="absolute top-4 left-4 z-0 eyebrow bg-ink text-white px-3 py-1.5 pointer-events-none">
          Drag to arrange · click <Search size={11} strokeWidth={3} className="inline -mt-0.5" /> to expand
        </div>

        {photosData.map((photo, index) => (
          <motion.div
            key={photo.src}
            drag
            dragConstraints={containerRef}
            dragElastic={0.05}
            dragMomentum={false}
            onDragStart={() => bringToFront(index)}
            onTapStart={() => bringToFront(index)}
            whileHover={{ scale: 1.03, rotate: 0, transition: { duration: 0.15 } }}
            whileDrag={{ scale: 1.06, rotate: 2 }}
            initial={{ ...positions[index], y: 160, rotate: index % 2 === 0 ? -20 : 20, opacity: 0 }}
            animate={
              isInView
                ? {
                    ...positions[index],
                    x: 0,
                    y: 0,
                    opacity: 1,
                    transition: { type: "spring", stiffness: 80, damping: 16, delay: layoutMode === "scatter" ? index * 0.08 : 0 },
                  }
                : undefined
            }
            style={{ zIndex: zIndexList[index] }}
            className="absolute w-[22%] bg-white border-3 border-ink p-3 pb-4 shadow-brutal hover:shadow-brutal-lg transition-shadow duration-150 cursor-grab active:cursor-grabbing"
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-cyber-yellow/70 border border-ink/10 -rotate-3 z-20 pointer-events-none" />

            <div className="relative w-full aspect-4/3 bg-ink border-2 border-ink overflow-hidden pointer-events-none">
              <Image src={photo.src} alt={photo.caption} fill sizes="260px" className="object-cover" />
            </div>

            <p className="font-caveat text-xl lg:text-2xl font-bold leading-tight text-center mt-3">{photo.caption}</p>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setActivePhoto(photo);
              }}
              aria-label={`Expand photo: ${photo.caption}`}
              className="absolute top-1.5 right-1.5 w-8 h-8 bg-white border-2 border-ink flex items-center justify-center hover:bg-ink hover:text-white transition-colors cursor-pointer"
            >
              <Search size={14} strokeWidth={3} />
            </button>
          </motion.div>
        ))}
      </div>

      {activePhoto && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-ink/70 backdrop-blur-sm"
          onClick={() => setActivePhoto(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="relative max-w-4xl w-full bg-white border-3 border-ink p-4 md:p-6 shadow-brutal-lg" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setActivePhoto(null)}
              aria-label="Close photo"
              className="absolute -top-4 -right-4 w-11 h-11 bg-white border-3 border-ink flex items-center justify-center hover:bg-cyber-yellow transition-colors cursor-pointer shadow-brutal-sm z-10"
            >
              <X size={22} strokeWidth={3} />
            </button>

            <div className="relative border-2 border-ink bg-ink aspect-video md:aspect-auto md:h-[60vh] overflow-hidden">
              <Image src={activePhoto.src} alt={activePhoto.caption} fill sizes="100vw" className="object-contain" />
            </div>

            <p className="mt-4 text-center font-caveat text-3xl md:text-4xl font-bold">{activePhoto.caption}</p>
          </div>
        </div>
      )}
    </section>
  );
}
