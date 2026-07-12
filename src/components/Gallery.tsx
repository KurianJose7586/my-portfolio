import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

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
  x: number | string;
  y: number | string;
  rotate: number;
}

export default function Gallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  const [activePhoto, setActivePhoto] = useState<Photo | null>(null);
  const [layoutMode, setLayoutMode] = useState<"scatter" | "grid">("scatter");
  const [positions, setPositions] = useState<Position[]>([]);
  const [zIndexList, setZIndexList] = useState<number[]>(photosData.map((_, i) => i + 1));
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Generate random scatter layout
  const getScatterPositions = (): Position[] => {
    // Left offsets spread across 5% to 75%
    // Top offsets spread across 5% to 55%
    const scatterOffsets = [
      { x: "6%", y: "8%", rotate: -5 },
      { x: "38%", y: "4%", rotate: 4 },
      { x: "70%", y: "9%", rotate: -6 },
      { x: "12%", y: "52%", rotate: 3 },
      { x: "42%", y: "48%", rotate: -3 },
      { x: "72%", y: "50%", rotate: 5 },
      { x: "20%", y: "28%", rotate: -7 },
      { x: "55%", y: "26%", rotate: 6 },
    ];
    return scatterOffsets;
  };

  // Generate grid layout positions
  const getGridPositions = (): Position[] => {
    return [
      { x: "4%", y: "6%", rotate: 0 },
      { x: "28%", y: "6%", rotate: 0 },
      { x: "52%", y: "6%", rotate: 0 },
      { x: "76%", y: "6%", rotate: 0 },
      { x: "4%", y: "52%", rotate: 0 },
      { x: "28%", y: "52%", rotate: 0 },
      { x: "52%", y: "52%", rotate: 0 },
      { x: "76%", y: "52%", rotate: 0 },
    ];
  };

  // Initialize positions
  useEffect(() => {
    setPositions(getScatterPositions());
  }, []);

  const handleTidyGrid = () => {
    setLayoutMode("grid");
    setPositions(getGridPositions());
  };

  const handleShuffle = () => {
    setLayoutMode("scatter");
    // Generate fresh random angles for scatter
    const freshScatter = getScatterPositions().map(pos => ({
      ...pos,
      rotate: Math.floor(Math.random() * 16) - 8 // Random rotate between -8 and 7
    }));
    setPositions(freshScatter);
  };

  const bringToFront = (index: number) => {
    setZIndexList((prev) => {
      const maxVal = Math.max(...prev) + 1;
      const newList = [...prev];
      newList[index] = maxVal;
      return newList;
    });
  };

  // Keep track of card moves during manual drag so layout updates smoothly
  const handleDragEnd = (index: number, info: any) => {
    bringToFront(index);
  };

  return (
    <section id="gallery" className="pt-20">
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b-8 border-ink pb-6">
          <div>
            <h2 className="font-sans text-6xl md:text-8xl font-black leading-none tracking-tighter uppercase">
              IRL // Roll
            </h2>
            <p className="font-mono text-xl font-bold uppercase mt-2 opacity-80">
              Community, Hackathons, & Events
            </p>
          </div>

          {/* Controls */}
          <div className="flex gap-4 self-stretch md:self-auto">
            <button
              onClick={handleTidyGrid}
              className={`flex-1 md:flex-none font-mono text-sm font-black px-4 py-2.5 border-4 border-ink shadow-[4px_4px_0px_0px_black] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all cursor-pointer ${
                layoutMode === "grid" ? "bg-electric-cyan" : "bg-white"
              }`}
            >
              [ TIDY GRID ]
            </button>
            <button
              onClick={handleShuffle}
              className={`flex-1 md:flex-none font-mono text-sm font-black px-4 py-2.5 border-4 border-ink shadow-[4px_4px_0px_0px_black] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all cursor-pointer ${
                layoutMode === "scatter" ? "bg-cyber-yellow" : "bg-white"
              }`}
            >
              [ SHUFFLE DESK ]
            </button>
          </div>
        </div>

        {/* Desk Workspace */}
        <div 
          ref={containerRef}
          className="relative w-full h-[650px] bg-white border-4 border-ink shadow-[12px_12px_0px_0px_black] overflow-hidden select-none pattern-grid"
          style={{
            backgroundImage: "radial-gradient(#d1d1d1 1px, transparent 1px)",
            backgroundSize: "20px 20px"
          }}
        >
          {/* Instructions Hint */}
          <div className="absolute top-4 left-4 z-10 bg-ink text-white font-mono text-[11px] font-black uppercase tracking-wider px-3 py-1.5 border-2 border-ink shadow-[3px_3px_0px_0px_rgba(235,94,147,1)] select-none pointer-events-none">
            🖱️ drag cards to arrange · click 🔍 to expand
          </div>

          <div className="absolute bottom-6 right-6 font-mono text-xs font-black opacity-30 select-none pointer-events-none">
            GALLERY_EXPLORER_V1.1.exe
          </div>

          {positions.length > 0 && photosData.map((photo, index) => (
            <motion.div
              key={index}
              drag
              dragConstraints={containerRef}
              dragElastic={0.05}
              dragMomentum={false}
              onDragStart={() => bringToFront(index)}
              onDragEnd={(e, info) => handleDragEnd(index, info)}
              onTapStart={() => bringToFront(index)}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              
              // Lift card higher, make shadow bigger and straighten rotation on hover
              whileHover={{ 
                scale: 1.05, 
                rotate: 0,
                boxShadow: "16px 16px 0px 0px rgba(0,0,0,1)",
                transition: { duration: 0.15 } 
              }}
              whileDrag={{ 
                scale: 1.08, 
                rotate: 2,
                zIndex: 999 
              }}
              
              // Entrance animation: Deal card onto table from bottom
              initial={{ 
                x: `${photosData[index] ? (index * 10) + 10 : 0}%`,
                y: "650px", 
                rotate: index % 2 === 0 ? -30 : 30,
                opacity: 0 
              }}
              
              // Animate to positions state
              animate={isInView ? {
                x: positions[index]?.x,
                y: positions[index]?.y,
                rotate: positions[index]?.rotate,
                opacity: 1,
                transition: {
                  type: "spring",
                  stiffness: 70,
                  damping: 15,
                  delay: index * 0.12 // Deal cards one-by-one
                }
              } : {}}
              
              style={{
                zIndex: zIndexList[index]
              }}
              className="absolute w-[220px] md:w-[260px] bg-white border-4 border-ink p-4 pb-6 shadow-[8px_8px_0px_0px_black] transform origin-center cursor-grab active:cursor-grabbing hover:shadow-[16px_16px_0px_0px_black] transition-shadow duration-150"
            >
              {/* Polaroid Tape Accent */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 bg-cyber-yellow/70 border border-ink/10 -rotate-3 z-20 pointer-events-none"></div>

              {/* Grab Me Handwriting Sticker on Hover */}
              {hoveredIndex === index && (
                <div className="absolute -top-10 -right-6 bg-punch-pink text-white font-caveat text-xl px-3 py-1 border-2 border-ink shadow-[3px_3px_0px_0px_black] rotate-6 z-30 pointer-events-none animate-bounce">
                  Grab Me!
                </div>
              )}

              {/* Photo Frame */}
              <div className="relative w-full aspect-4/3 bg-ink border-2 border-ink overflow-hidden pointer-events-none">
                <Image 
                  src={photo.src} 
                  alt={photo.caption}
                  fill
                  sizes="(max-width: 768px) 260px, 220px"
                  className="object-cover select-none pointer-events-none"
                />
              </div>

              {/* Caption */}
              <div className="mt-4 text-center">
                <p className="font-caveat text-2xl md:text-3xl font-bold text-ink leading-tight">
                  {photo.caption}
                </p>
              </div>

              {/* Zoom Trigger Button */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setActivePhoto(photo);
                }}
                className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white border-2 border-ink flex items-center justify-center hover:bg-ink hover:text-white transition-colors cursor-pointer"
                title="Zoom In"
              >
                <span className="material-symbols-outlined text-sm font-bold">search</span>
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox / Expanded View Modal */}
      {activePhoto && (
        <div 
          className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-ink/80 backdrop-blur-sm"
          onClick={() => setActivePhoto(null)}
        >
          <div 
            className="relative max-w-4xl w-full bg-white border-[6px] border-ink p-6 shadow-[16px_16px_0px_0px_black] animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button 
              onClick={() => setActivePhoto(null)}
              className="absolute -top-6 -right-6 w-12 h-12 bg-white border-4 border-ink flex items-center justify-center hover:bg-punch-pink hover:text-white transition-colors cursor-pointer shadow-[4px_4px_0px_0px_black] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
            >
              <span className="material-symbols-outlined font-black">close</span>
            </button>

            {/* Expanded Image */}
            <div className="relative border-4 border-ink bg-ink aspect-video md:aspect-auto md:h-[60vh] overflow-hidden">
              <Image 
                src={activePhoto.src} 
                alt={activePhoto.caption}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>

            {/* Caption */}
            <div className="mt-6 text-center border-t-4 border-ink/10 pt-4">
              <h3 className="font-caveat text-4xl md:text-5xl font-black text-ink">
                {activePhoto.caption}
              </h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
