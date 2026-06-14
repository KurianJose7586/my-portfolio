"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import SnakeGame from "./SnakeGame";
import PongGame from "./PongGame";
import MemoryGame from "./MemoryGame";

type GameType = null | "snake" | "pong" | "memory";

const games = [
  {
    id: "snake" as const,
    title: "SNAKE",
    emoji: "🐍",
    description: "Classic snake. Eat food, grow longer, don't hit the walls or yourself. Speed increases as you score.",
    color: "bg-electric-cyan",
    hoverColor: "hover:bg-electric-cyan",
    accentBorder: "border-electric-cyan",
    tech: ["Canvas", "Keyboard"],
  },
  {
    id: "pong" as const,
    title: "PONG",
    emoji: "🏓",
    description: "Classic Pong vs AI. First to 10 wins. The AI isn't perfect — use that to your advantage.",
    color: "bg-punch-pink",
    hoverColor: "hover:bg-punch-pink",
    accentBorder: "border-punch-pink",
    tech: ["Canvas", "AI Opponent"],
  },
  {
    id: "memory" as const,
    title: "MEMORY",
    emoji: "🧩",
    description: "Flip cards and find matching pairs. Complete all 8 pairs in the fewest moves possible.",
    color: "bg-cyber-yellow",
    hoverColor: "hover:bg-cyber-yellow",
    accentBorder: "border-cyber-yellow",
    tech: ["DOM", "Animations"],
  },
];

export default function ArcadeLobby() {
  const [activeGame, setActiveGame] = useState<GameType>(null);

  const handleBack = () => setActiveGame(null);

  const renderGame = () => {
    switch (activeGame) {
      case "snake": return <SnakeGame onBack={handleBack} />;
      case "pong": return <PongGame onBack={handleBack} />;
      case "memory": return <MemoryGame onBack={handleBack} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-paper">
      {/* Arcade Header */}
      <div className="bg-ink border-b-4 border-ink py-6 md:py-8">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="font-mono text-sm font-bold text-white/60 hover:text-white transition-colors flex items-center gap-2"
            >
              <span>←</span>
              <span>BACK TO PORTFOLIO</span>
            </Link>
          </div>
          <motion.h1
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="font-sans text-4xl md:text-6xl font-black text-white tracking-tighter"
          >
            <span className="text-cyber-yellow">AR</span>
            <span className="text-punch-pink">CA</span>
            <span className="text-electric-cyan">DE</span>
          </motion.h1>
          <div className="font-mono text-xs text-white/40 font-bold tracking-widest">
            v1.0 // 3 GAMES
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        <AnimatePresence mode="wait">
          {activeGame ? (
            <motion.div key="game" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {renderGame()}
            </motion.div>
          ) : (
            <motion.div
              key="lobby"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Lobby Title */}
              <div className="text-center mb-10 md:mb-14">
                <h2 className="font-mono text-sm font-bold text-ink/50 uppercase tracking-[0.3em] mb-3">
                  Select a game to play
                </h2>
                <div className="w-24 h-1 bg-ink mx-auto" />
              </div>

              {/* Game Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {games.map((game, i) => (
                  <motion.div
                    key={game.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="group"
                  >
                    <div className={`brutalist-card bg-white h-full flex flex-col ${game.accentBorder} border-4`}>
                      {/* Card Header */}
                      <div className={`${game.color} border-b-4 border-ink p-4 flex items-center justify-between`}>
                        <span className="text-4xl">{game.emoji}</span>
                        <span className="font-mono text-xs font-bold text-ink/60 tracking-widest">
                          GAME_{String(i + 1).padStart(2, "0")}
                        </span>
                      </div>

                      {/* Card Body */}
                      <div className="p-6 flex-1 flex flex-col">
                        <h3 className="font-sans text-2xl font-black tracking-tight mb-3">
                          {game.title}
                        </h3>
                        <p className="font-mono text-sm text-ink/70 leading-relaxed mb-4 flex-1">
                          {game.description}
                        </p>

                        {/* Tech tags */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {game.tech.map((t) => (
                            <span
                              key={t}
                              className="bg-paper border border-ink/20 px-2 py-1 font-mono text-[10px] font-bold text-ink/50"
                            >
                              {t}
                            </span>
                          ))}
                        </div>

                        {/* Play Button */}
                        <button
                          onClick={() => setActiveGame(game.id)}
                          className={`mechanical-button ${game.color} w-full py-3 text-lg font-bold cursor-pointer group-hover:translate-x-[-2px] group-hover:translate-y-[-2px]`}
                        >
                          ▶ PLAY
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Footer note */}
              <div className="text-center mt-12">
                <p className="font-mono text-xs text-ink/30 font-bold">
                  MORE GAMES COMING SOON // SUGGESTIONS? HIT ME UP
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
