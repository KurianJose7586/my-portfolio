"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GameWrapper from "./GameWrapper";

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const CARD_PAIRS = [
  "⚡", "🔥", "💎", "🚀", "🎯", "🧠", "🔮", "⚙️",
];

interface MemoryGameProps {
  onBack: () => void;
}

export default function MemoryGame({ onBack }: MemoryGameProps) {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIds, setFlippedIds] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [bestScore, setBestScore] = useState<number | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const totalPairs = CARD_PAIRS.length;

  const initGame = useCallback(() => {
    const shuffled = [...CARD_PAIRS, ...CARD_PAIRS]
      .sort(() => Math.random() - 0.5)
      .map((emoji, i) => ({
        id: i,
        emoji,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffled);
    setFlippedIds([]);
    setMoves(0);
    setMatches(0);
    setIsComplete(false);
    setIsChecking(false);
  }, []);

  useEffect(() => {
    initGame();
  }, [initGame]);

  // Check win
  useEffect(() => {
    if (matches === totalPairs && matches > 0) {
      setIsComplete(true);
      if (bestScore === null || moves < bestScore) {
        setBestScore(moves);
      }
    }
  }, [matches, totalPairs, moves, bestScore]);

  const handleCardClick = useCallback(
    (id: number) => {
      if (isChecking) return;
      if (flippedIds.length >= 2) return;

      const card = cards[id];
      if (card.isFlipped || card.isMatched) return;

      const newCards = [...cards];
      newCards[id] = { ...newCards[id], isFlipped: true };
      setCards(newCards);

      const newFlipped = [...flippedIds, id];
      setFlippedIds(newFlipped);

      if (newFlipped.length === 2) {
        setMoves((m) => m + 1);
        setIsChecking(true);

        const [first, second] = newFlipped;
        if (newCards[first].emoji === newCards[second].emoji) {
          // Match!
          setTimeout(() => {
            const matched = [...newCards];
            matched[first] = { ...matched[first], isMatched: true };
            matched[second] = { ...matched[second], isMatched: true };
            setCards(matched);
            setMatches((m) => m + 1);
            setFlippedIds([]);
            setIsChecking(false);
          }, 400);
        } else {
          // No match — flip back
          setTimeout(() => {
            const reset = [...newCards];
            reset[first] = { ...reset[first], isFlipped: false };
            reset[second] = { ...reset[second], isFlipped: false };
            setCards(reset);
            setFlippedIds([]);
            setIsChecking(false);
          }, 800);
        }
      }
    },
    [cards, flippedIds, isChecking]
  );

  return (
    <GameWrapper
      title="🧩 MEMORY"
      score={`Moves: ${moves}`}
      onBack={onBack}
      accentColor="bg-cyber-yellow"
    >
      <div className="flex flex-col items-center gap-6">
        {/* Progress bar */}
        <div className="w-full max-w-md">
          <div className="flex justify-between font-mono text-xs font-bold mb-2">
            <span>MATCHES: {matches}/{totalPairs}</span>
            {bestScore !== null && <span>BEST: {bestScore} moves</span>}
          </div>
          <div className="h-4 bg-white border-2 border-ink overflow-hidden">
            <motion.div
              className="h-full bg-punch-pink"
              initial={{ width: 0 }}
              animate={{ width: `${(matches / totalPairs) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-4 gap-2 md:gap-3 w-full max-w-lg">
          <AnimatePresence>
            {cards.map((card) => (
              <motion.button
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                className="aspect-square relative cursor-pointer"
                style={{ perspective: 600 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="w-full h-full relative"
                  style={{ transformStyle: "preserve-3d" }}
                  animate={{ rotateY: card.isFlipped || card.isMatched ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Back of card */}
                  <div
                    className="absolute inset-0 border-4 border-ink bg-electric-cyan flex items-center justify-center shadow-[4px_4px_0px_0px_black]"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <span className="font-mono text-2xl font-bold text-ink/30">?</span>
                  </div>

                  {/* Front of card */}
                  <div
                    className={`absolute inset-0 border-4 flex items-center justify-center shadow-[4px_4px_0px_0px_black] ${
                      card.isMatched
                        ? "bg-cyber-yellow border-cyber-yellow"
                        : "bg-white border-ink"
                    }`}
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                  >
                    <span className="text-3xl md:text-4xl">{card.emoji}</span>
                  </div>
                </motion.div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>

        {/* Win Overlay */}
        <AnimatePresence>
          {isComplete && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-ink border-4 border-electric-cyan p-8 text-center shadow-[8px_8px_0px_0px_#5AC8D8] max-w-sm w-full"
            >
              <p className="font-mono text-3xl font-bold text-cyber-yellow mb-2">🎉 YOU WIN!</p>
              <p className="font-mono text-lg text-white mb-1">Completed in {moves} moves</p>
              {bestScore !== null && (
                <p className="font-mono text-sm text-electric-cyan mb-4">Best: {bestScore} moves</p>
              )}
              <button
                onClick={initGame}
                className="mechanical-button bg-punch-pink text-white px-6 py-3 text-lg cursor-pointer"
              >
                PLAY AGAIN
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </GameWrapper>
  );
}
