"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { motion } from "framer-motion";
import GameWrapper from "./GameWrapper";

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const CANVAS_SIZE = GRID_SIZE * CELL_SIZE;
const INITIAL_SPEED = 150;
const SPEED_INCREMENT = 5;
const MIN_SPEED = 60;

type Point = { x: number; y: number };
type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

interface SnakeGameProps {
  onBack: () => void;
}

export default function SnakeGame({ onBack }: SnakeGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [highScore, setHighScore] = useState(0);

  const snakeRef = useRef<Point[]>([{ x: 10, y: 10 }]);
  const foodRef = useRef<Point>({ x: 15, y: 15 });
  const dirRef = useRef<Direction>("RIGHT");
  const nextDirRef = useRef<Direction>("RIGHT");
  const speedRef = useRef(INITIAL_SPEED);
  const gameLoopRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const scoreRef = useRef(0);

  const spawnFood = useCallback(() => {
    const snake = snakeRef.current;
    let newFood: Point;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (snake.some((s) => s.x === newFood.x && s.y === newFood.y));
    foodRef.current = newFood;
  }, []);

  const resetGame = useCallback(() => {
    snakeRef.current = [{ x: 10, y: 10 }];
    dirRef.current = "RIGHT";
    nextDirRef.current = "RIGHT";
    speedRef.current = INITIAL_SPEED;
    scoreRef.current = 0;
    setScore(0);
    setGameOver(false);
    setIsPaused(false);
    spawnFood();
  }, [spawnFood]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear
    ctx.fillStyle = "#F8F8F8";
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // Grid lines (subtle)
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * CELL_SIZE, 0);
      ctx.lineTo(i * CELL_SIZE, CANVAS_SIZE);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * CELL_SIZE);
      ctx.lineTo(CANVAS_SIZE, i * CELL_SIZE);
      ctx.stroke();
    }

    // Food
    const food = foodRef.current;
    ctx.fillStyle = "#EB5E93";
    ctx.shadowColor = "#EB5E93";
    ctx.shadowBlur = 10;
    ctx.fillRect(
      food.x * CELL_SIZE + 2,
      food.y * CELL_SIZE + 2,
      CELL_SIZE - 4,
      CELL_SIZE - 4
    );
    ctx.shadowBlur = 0;

    // Food icon
    ctx.fillStyle = "#000";
    ctx.font = "12px monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("●", food.x * CELL_SIZE + CELL_SIZE / 2, food.y * CELL_SIZE + CELL_SIZE / 2);

    // Snake
    const snake = snakeRef.current;
    snake.forEach((segment, i) => {
      const isHead = i === 0;
      ctx.fillStyle = isHead ? "#5AC8D8" : "#4AB8C8";
      ctx.shadowColor = isHead ? "#5AC8D8" : "transparent";
      ctx.shadowBlur = isHead ? 8 : 0;

      const padding = isHead ? 1 : 2;
      ctx.fillRect(
        segment.x * CELL_SIZE + padding,
        segment.y * CELL_SIZE + padding,
        CELL_SIZE - padding * 2,
        CELL_SIZE - padding * 2
      );

      // Eyes on head
      if (isHead) {
        ctx.shadowBlur = 0;
        ctx.fillStyle = "#000";
        const eyeSize = 3;
        const dir = dirRef.current;
        let ex1 = 0, ey1 = 0, ex2 = 0, ey2 = 0;
        const cx = segment.x * CELL_SIZE + CELL_SIZE / 2;
        const cy = segment.y * CELL_SIZE + CELL_SIZE / 2;
        if (dir === "RIGHT") { ex1 = cx + 3; ey1 = cy - 4; ex2 = cx + 3; ey2 = cy + 4; }
        else if (dir === "LEFT") { ex1 = cx - 3; ey1 = cy - 4; ex2 = cx - 3; ey2 = cy + 4; }
        else if (dir === "UP") { ex1 = cx - 4; ey1 = cy - 3; ex2 = cx + 4; ey2 = cy - 3; }
        else { ex1 = cx - 4; ey1 = cy + 3; ex2 = cx + 4; ey2 = cy + 3; }
        ctx.beginPath();
        ctx.arc(ex1, ey1, eyeSize, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(ex2, ey2, eyeSize, 0, Math.PI * 2);
        ctx.fill();
      }
    });
    ctx.shadowBlur = 0;
  }, []);

  const tick = useCallback(() => {
    if (gameOver || isPaused) return;

    dirRef.current = nextDirRef.current;
    const snake = snakeRef.current;
    const head = { ...snake[0] };

    switch (dirRef.current) {
      case "UP": head.y -= 1; break;
      case "DOWN": head.y += 1; break;
      case "LEFT": head.x -= 1; break;
      case "RIGHT": head.x += 1; break;
    }

    // Wall collision
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
      setGameOver(true);
      setHighScore((prev) => Math.max(prev, scoreRef.current));
      return;
    }

    // Self collision
    if (snake.some((s) => s.x === head.x && s.y === head.y)) {
      setGameOver(true);
      setHighScore((prev) => Math.max(prev, scoreRef.current));
      return;
    }

    snake.unshift(head);

    // Food collision
    if (head.x === foodRef.current.x && head.y === foodRef.current.y) {
      scoreRef.current += 1;
      setScore(scoreRef.current);
      speedRef.current = Math.max(MIN_SPEED, speedRef.current - SPEED_INCREMENT);
      spawnFood();
    } else {
      snake.pop();
    }

    draw();
  }, [gameOver, isPaused, draw, spawnFood]);

  // Game loop
  useEffect(() => {
    if (gameOver || isPaused) {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
      return;
    }

    gameLoopRef.current = setInterval(tick, speedRef.current);
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [tick, gameOver, isPaused]);

  // Speed update on score change
  useEffect(() => {
    if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
      gameLoopRef.current = setInterval(tick, speedRef.current);
    }
  }, [score, tick]);

  // Input
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (gameOver) return;
      const dir = dirRef.current;
      switch (e.key) {
        case "ArrowUp": case "w": case "W":
          if (dir !== "DOWN") nextDirRef.current = "UP";
          break;
        case "ArrowDown": case "s": case "S":
          if (dir !== "UP") nextDirRef.current = "DOWN";
          break;
        case "ArrowLeft": case "a": case "A":
          if (dir !== "RIGHT") nextDirRef.current = "LEFT";
          break;
        case "ArrowRight": case "d": case "D":
          if (dir !== "LEFT") nextDirRef.current = "RIGHT";
          break;
        case " ":
          e.preventDefault();
          setIsPaused((p) => !p);
          break;
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [gameOver]);

  // Initial draw
  useEffect(() => {
    spawnFood();
    draw();
  }, [spawnFood, draw]);

  return (
    <GameWrapper title="🐍 SNAKE" score={score} onBack={onBack} accentColor="bg-electric-cyan">
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <canvas
            ref={canvasRef}
            width={CANVAS_SIZE}
            height={CANVAS_SIZE}
            className="border-4 border-ink shadow-[8px_8px_0px_0px_black] max-w-full"
            style={{ imageRendering: "pixelated" }}
          />

          {/* Game Over Overlay */}
          {gameOver && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 bg-ink/80 flex flex-col items-center justify-center gap-4"
            >
              <p className="font-mono text-3xl font-bold text-punch-pink">GAME OVER</p>
              <p className="font-mono text-xl text-white">SCORE: {score}</p>
              {highScore > 0 && (
                <p className="font-mono text-sm text-cyber-yellow">HIGH SCORE: {highScore}</p>
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

        {/* Controls Info */}
        <div className="flex flex-wrap gap-4 justify-center text-center">
          <div className="bg-white border-2 border-ink px-4 py-2 font-mono text-xs font-bold">
            ↑ ↓ ← → / WASD — MOVE
          </div>
          <div className="bg-white border-2 border-ink px-4 py-2 font-mono text-xs font-bold">
            SPACE — PAUSE
          </div>
          {highScore > 0 && (
            <div className="bg-cyber-yellow border-2 border-ink px-4 py-2 font-mono text-xs font-bold">
              HIGH SCORE: {highScore}
            </div>
          )}
        </div>
      </div>
    </GameWrapper>
  );
}
