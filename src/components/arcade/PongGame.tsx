"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { motion } from "framer-motion";
import GameWrapper from "./GameWrapper";

const CANVAS_W = 640;
const CANVAS_H = 400;
const PADDLE_W = 12;
const PADDLE_H = 80;
const BALL_SIZE = 12;
const PADDLE_SPEED = 6;
const INITIAL_BALL_SPEED = 5;
const WIN_SCORE = 10;

interface PongGameProps {
  onBack: () => void;
}

export default function PongGame({ onBack }: PongGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [playerScore, setPlayerScore] = useState(0);
  const [aiScore, setAiScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const playerYRef = useRef(CANVAS_H / 2 - PADDLE_H / 2);
  const aiYRef = useRef(CANVAS_H / 2 - PADDLE_H / 2);
  const ballXRef = useRef(CANVAS_W / 2);
  const ballYRef = useRef(CANVAS_H / 2);
  const ballVXRef = useRef(INITIAL_BALL_SPEED);
  const ballVYRef = useRef(INITIAL_BALL_SPEED * 0.6);
  const keysRef = useRef<Set<string>>(new Set());
  const animFrameRef = useRef<number>(0);
  const playerScoreRef = useRef(0);
  const aiScoreRef = useRef(0);

  const resetBall = useCallback((direction: number) => {
    ballXRef.current = CANVAS_W / 2;
    ballYRef.current = CANVAS_H / 2;
    ballVXRef.current = INITIAL_BALL_SPEED * direction;
    ballVYRef.current = INITIAL_BALL_SPEED * 0.6 * (Math.random() > 0.5 ? 1 : -1);
  }, []);

  const resetGame = useCallback(() => {
    playerYRef.current = CANVAS_H / 2 - PADDLE_H / 2;
    aiYRef.current = CANVAS_H / 2 - PADDLE_H / 2;
    playerScoreRef.current = 0;
    aiScoreRef.current = 0;
    setPlayerScore(0);
    setAiScore(0);
    setGameOver(false);
    setWinner(null);
    setIsPaused(false);
    resetBall(1);
  }, [resetBall]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Background
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

    // Center line
    ctx.setLineDash([8, 8]);
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(CANVAS_W / 2, 0);
    ctx.lineTo(CANVAS_W / 2, CANVAS_H);
    ctx.stroke();
    ctx.setLineDash([]);

    // Player paddle (left, cyber-yellow)
    ctx.fillStyle = "#F7D046";
    ctx.shadowColor = "#F7D046";
    ctx.shadowBlur = 12;
    ctx.fillRect(20, playerYRef.current, PADDLE_W, PADDLE_H);
    ctx.shadowBlur = 0;

    // AI paddle (right, punch-pink)
    ctx.fillStyle = "#EB5E93";
    ctx.shadowColor = "#EB5E93";
    ctx.shadowBlur = 12;
    ctx.fillRect(CANVAS_W - 20 - PADDLE_W, aiYRef.current, PADDLE_W, PADDLE_H);
    ctx.shadowBlur = 0;

    // Ball
    ctx.fillStyle = "#fff";
    ctx.shadowColor = "#5AC8D8";
    ctx.shadowBlur = 15;
    ctx.beginPath();
    ctx.arc(ballXRef.current, ballYRef.current, BALL_SIZE / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Scores
    ctx.fillStyle = "#F7D046";
    ctx.font = "bold 48px monospace";
    ctx.textAlign = "center";
    ctx.fillText(String(playerScoreRef.current), CANVAS_W / 4, 60);

    ctx.fillStyle = "#EB5E93";
    ctx.fillText(String(aiScoreRef.current), (CANVAS_W * 3) / 4, 60);
  }, []);

  const gameLoop = useCallback(() => {
    if (gameOver || isPaused) return;

    // Player movement
    if (keysRef.current.has("ArrowUp") || keysRef.current.has("w") || keysRef.current.has("W")) {
      playerYRef.current = Math.max(0, playerYRef.current - PADDLE_SPEED);
    }
    if (keysRef.current.has("ArrowDown") || keysRef.current.has("s") || keysRef.current.has("S")) {
      playerYRef.current = Math.min(CANVAS_H - PADDLE_H, playerYRef.current + PADDLE_SPEED);
    }

    // AI movement (tracks ball with delay/inaccuracy)
    const aiCenter = aiYRef.current + PADDLE_H / 2;
    const targetY = ballYRef.current;
    const diff = targetY - aiCenter;
    const aiSpeed = 3.5 + Math.random() * 1.5; // Variable speed for imperfection
    if (Math.abs(diff) > 10) {
      aiYRef.current += Math.sign(diff) * Math.min(aiSpeed, Math.abs(diff));
      aiYRef.current = Math.max(0, Math.min(CANVAS_H - PADDLE_H, aiYRef.current));
    }

    // Ball movement
    ballXRef.current += ballVXRef.current;
    ballYRef.current += ballVYRef.current;

    // Top/bottom bounce
    if (ballYRef.current <= BALL_SIZE / 2 || ballYRef.current >= CANVAS_H - BALL_SIZE / 2) {
      ballVYRef.current *= -1;
      ballYRef.current = Math.max(BALL_SIZE / 2, Math.min(CANVAS_H - BALL_SIZE / 2, ballYRef.current));
    }

    // Player paddle collision
    if (
      ballXRef.current - BALL_SIZE / 2 <= 20 + PADDLE_W &&
      ballXRef.current - BALL_SIZE / 2 >= 20 &&
      ballYRef.current >= playerYRef.current &&
      ballYRef.current <= playerYRef.current + PADDLE_H
    ) {
      ballVXRef.current = Math.abs(ballVXRef.current) * 1.05; // Speed up slightly
      const hitPos = (ballYRef.current - playerYRef.current) / PADDLE_H - 0.5;
      ballVYRef.current = hitPos * 8;
    }

    // AI paddle collision
    if (
      ballXRef.current + BALL_SIZE / 2 >= CANVAS_W - 20 - PADDLE_W &&
      ballXRef.current + BALL_SIZE / 2 <= CANVAS_W - 20 &&
      ballYRef.current >= aiYRef.current &&
      ballYRef.current <= aiYRef.current + PADDLE_H
    ) {
      ballVXRef.current = -Math.abs(ballVXRef.current) * 1.05;
      const hitPos = (ballYRef.current - aiYRef.current) / PADDLE_H - 0.5;
      ballVYRef.current = hitPos * 8;
    }

    // Scoring
    if (ballXRef.current < 0) {
      aiScoreRef.current += 1;
      setAiScore(aiScoreRef.current);
      if (aiScoreRef.current >= WIN_SCORE) {
        setGameOver(true);
        setWinner("AI");
        draw();
        return;
      }
      resetBall(-1);
    }
    if (ballXRef.current > CANVAS_W) {
      playerScoreRef.current += 1;
      setPlayerScore(playerScoreRef.current);
      if (playerScoreRef.current >= WIN_SCORE) {
        setGameOver(true);
        setWinner("PLAYER");
        draw();
        return;
      }
      resetBall(1);
    }

    draw();
    animFrameRef.current = requestAnimationFrame(gameLoop);
  }, [gameOver, isPaused, draw, resetBall]);

  // Start/stop game loop
  useEffect(() => {
    if (!gameOver && !isPaused) {
      animFrameRef.current = requestAnimationFrame(gameLoop);
    }
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [gameLoop, gameOver, isPaused]);

  // Input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysRef.current.add(e.key);
      if (e.key === " ") {
        e.preventDefault();
        setIsPaused((p) => !p);
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current.delete(e.key);
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Initial draw
  useEffect(() => {
    draw();
  }, [draw]);

  return (
    <GameWrapper
      title="🏓 PONG"
      score={`${playerScore} — ${aiScore}`}
      onBack={onBack}
      accentColor="bg-punch-pink"
    >
      <div className="flex flex-col items-center gap-6">
        {/* Score Display */}
        <div className="flex items-center gap-8">
          <div className="text-center">
            <p className="font-mono text-xs font-bold text-ink/50 uppercase tracking-widest mb-1">You</p>
            <p className="font-mono text-4xl font-bold text-cyber-yellow bg-ink px-4 py-2 border-2 border-ink">
              {playerScore}
            </p>
          </div>
          <p className="font-mono text-2xl font-bold text-ink/30">VS</p>
          <div className="text-center">
            <p className="font-mono text-xs font-bold text-ink/50 uppercase tracking-widest mb-1">AI</p>
            <p className="font-mono text-4xl font-bold text-punch-pink bg-ink px-4 py-2 border-2 border-ink">
              {aiScore}
            </p>
          </div>
        </div>

        <div className="relative">
          <canvas
            ref={canvasRef}
            width={CANVAS_W}
            height={CANVAS_H}
            className="border-4 border-ink shadow-[8px_8px_0px_0px_black] max-w-full"
          />

          {/* Game Over Overlay */}
          {gameOver && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 bg-ink/80 flex flex-col items-center justify-center gap-4"
            >
              {winner === "PLAYER" ? (
                <>
                  <p className="font-mono text-3xl font-bold text-cyber-yellow">🏆 YOU WIN!</p>
                  <p className="font-mono text-lg text-white">{playerScore} — {aiScore}</p>
                </>
              ) : (
                <>
                  <p className="font-mono text-3xl font-bold text-punch-pink">AI WINS 🤖</p>
                  <p className="font-mono text-lg text-white">{playerScore} — {aiScore}</p>
                </>
              )}
              <button
                onClick={resetGame}
                className="mechanical-button bg-electric-cyan px-6 py-3 text-lg cursor-pointer"
              >
                PLAY AGAIN
              </button>
            </motion.div>
          )}

          {/* Paused Overlay */}
          {isPaused && !gameOver && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-ink/60 flex flex-col items-center justify-center gap-4"
            >
              <p className="font-mono text-3xl font-bold text-cyber-yellow">PAUSED</p>
              <button
                onClick={() => setIsPaused(false)}
                className="mechanical-button bg-white px-6 py-3 text-lg cursor-pointer"
              >
                RESUME
              </button>
            </motion.div>
          )}
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-4 justify-center text-center">
          <div className="bg-white border-2 border-ink px-4 py-2 font-mono text-xs font-bold">
            ↑ ↓ / W S — MOVE PADDLE
          </div>
          <div className="bg-white border-2 border-ink px-4 py-2 font-mono text-xs font-bold">
            SPACE — PAUSE
          </div>
          <div className="bg-cyber-yellow border-2 border-ink px-4 py-2 font-mono text-xs font-bold">
            FIRST TO {WIN_SCORE} WINS
          </div>
        </div>
      </div>
    </GameWrapper>
  );
}
