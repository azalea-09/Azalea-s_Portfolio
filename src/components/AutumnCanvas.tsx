"use client";

import { useEffect, useRef } from "react";

// Particle shapes
type Shape = "leaf1" | "leaf2" | "flower" | "petal";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotSpeed: number;
  shape: Shape;
  color: string;
  opacity: number;
  settled: boolean;
  settleY: number;
  sway: number;
  swaySpeed: number;
  swayOffset: number;
}

// Autumn-green palette
const COLORS = [
  "#4A7C39", // forest green
  "#3D682B", // deep olive
  "#284A1C", // pine green
  "#5E8E47", // moss green
  "#C8A850", // amber gold (autumn touch)
  "#A36B3B", // warm terracotta
  "#466E33", // deep botanical
  "#D4B35A", // soft gold
];

const SHAPES: Shape[] = ["leaf1", "leaf2", "flower", "petal", "petal", "leaf1"];

function drawLeaf1(ctx: CanvasRenderingContext2D, size: number) {
  ctx.beginPath();
  ctx.moveTo(0, -size);
  ctx.bezierCurveTo(size * 0.8, -size * 0.5, size * 0.8, size * 0.5, 0, size);
  ctx.bezierCurveTo(-size * 0.8, size * 0.5, -size * 0.8, -size * 0.5, 0, -size);
  ctx.fill();
  // vein
  ctx.beginPath();
  ctx.moveTo(0, -size * 0.8);
  ctx.lineTo(0, size * 0.8);
  ctx.strokeStyle = "rgba(255,255,255,0.2)";
  ctx.lineWidth = 0.8;
  ctx.stroke();
}

function drawLeaf2(ctx: CanvasRenderingContext2D, size: number) {
  ctx.beginPath();
  ctx.moveTo(0, -size);
  ctx.bezierCurveTo(size, -size * 0.2, size * 0.6, size, -size * 0.3, size * 0.8);
  ctx.bezierCurveTo(-size * 0.3, size * 0.4, -size * 0.4, -size * 0.3, 0, -size);
  ctx.fill();
}

function drawFlower(ctx: CanvasRenderingContext2D, size: number, color: string) {
  const petals = 5;
  for (let i = 0; i < petals; i++) {
    const angle = (i / petals) * Math.PI * 2;
    ctx.save();
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.ellipse(0, -size * 0.55, size * 0.28, size * 0.5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
  // center
  ctx.beginPath();
  ctx.arc(0, 0, size * 0.28, 0, Math.PI * 2);
  ctx.fillStyle = "#E8C55A";
  ctx.fill();
}

function drawPetal(ctx: CanvasRenderingContext2D, size: number) {
  ctx.beginPath();
  ctx.ellipse(0, 0, size * 0.35, size * 0.7, 0, 0, Math.PI * 2);
  ctx.fill();
}

export function AutumnCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const frameRef = useRef<number>(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const FLOOR = canvas.height; // accumulate at bottom
    const MAX = 120;

    const spawn = (): Particle => {
      const size = 6 + Math.random() * 14;
      return {
        x: Math.random() * canvas.width,
        y: -size * 2,
        size,
        speedY: 0.6 + Math.random() * 1.2,
        speedX: (Math.random() - 0.5) * 0.6,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.06,
        shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        opacity: 0.7 + Math.random() * 0.3,
        settled: false,
        settleY: 0,
        sway: 0,
        swaySpeed: 0.02 + Math.random() * 0.02,
        swayOffset: Math.random() * Math.PI * 2,
      };
    };

    // Settled pile tracking — use a height map per x column
    const COLS = 80;
    const pileHeight = new Float32Array(COLS).fill(0);

    const getPileY = (x: number) => {
      const col = Math.floor((x / canvas.width) * COLS);
      const c = Math.max(0, Math.min(COLS - 1, col));
      return canvas.height - pileHeight[c];
    };

    const addToPile = (x: number, size: number) => {
      const col = Math.floor((x / canvas.width) * COLS);
      const spread = 2;
      for (let i = -spread; i <= spread; i++) {
        const c = Math.max(0, Math.min(COLS - 1, col + i));
        const weight = 1 - Math.abs(i) / (spread + 1);
        pileHeight[c] = Math.min(canvas.height * 0.45, pileHeight[c] + size * 0.18 * weight);
      }
    };

    let spawnTimer = 0;

    const draw = (time: number) => {
      timeRef.current = time;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Spawn new particles
      spawnTimer += 16;
      if (spawnTimer > 200 && particlesRef.current.length < MAX) {
        particlesRef.current.push(spawn());
        spawnTimer = 0;
      }

      // Draw pile gradient at bottom
      const maxPile = Math.max(...Array.from(pileHeight));
      if (maxPile > 2) {
        const grad = ctx.createLinearGradient(0, canvas.height - maxPile - 20, 0, canvas.height);
        grad.addColorStop(0, "rgba(45,80,22,0)");
        grad.addColorStop(0.4, "rgba(45,80,22,0.18)");
        grad.addColorStop(1, "rgba(45,80,22,0.45)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      particlesRef.current.forEach((p) => {
        if (p.settled) {
          // draw settled particle (slight opacity fade)
          ctx.save();
          ctx.globalAlpha = p.opacity * 0.75;
          ctx.translate(p.x, p.settleY);
          ctx.rotate(p.rotation);
          ctx.fillStyle = p.color;
          if (p.shape === "flower") drawFlower(ctx, p.size * 0.7, p.color);
          else if (p.shape === "leaf1") drawLeaf1(ctx, p.size * 0.7);
          else if (p.shape === "leaf2") drawLeaf2(ctx, p.size * 0.7);
          else drawPetal(ctx, p.size * 0.7);
          ctx.restore();
          return;
        }

        // Update position
        p.sway = Math.sin(time * p.swaySpeed * 0.001 + p.swayOffset) * 1.8;
        p.x += p.speedX + p.sway * 0.05;
        p.y += p.speedY;
        p.rotation += p.rotSpeed;

        // Check pile collision
        const pileY = getPileY(p.x);
        if (p.y + p.size >= pileY) {
          p.settled = true;
          p.settleY = pileY - p.size * 0.3;
          addToPile(p.x, p.size);
        }

        // Wrap horizontally
        if (p.x < -p.size * 2) p.x = canvas.width + p.size;
        if (p.x > canvas.width + p.size * 2) p.x = -p.size;

        // Draw falling
        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;

        if (p.shape === "flower") drawFlower(ctx, p.size, p.color);
        else if (p.shape === "leaf1") drawLeaf1(ctx, p.size);
        else if (p.shape === "leaf2") drawLeaf2(ctx, p.size);
        else drawPetal(ctx, p.size);

        ctx.restore();
      });

      frameRef.current = requestAnimationFrame(draw);
    };

    frameRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}
