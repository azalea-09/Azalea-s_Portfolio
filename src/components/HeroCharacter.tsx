"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "./ThemeProvider";

type CharacterState = "idle" | "walk_left" | "walk_right";

const DIALOGUES = [
  "Meow~ 🐈",
  "Exploring Azalea's portfolio? ✨",
  "Need data insights? 📊",
  "Pawtrolling through Azalea's portfolio... 👀",
  "Nice to meet you! 💚",
  "Taking a stroll~ 🐾",
];

export function HeroCharacter({ className = "" }: { className?: string }) {
  const { theme } = useTheme();
  const dark = theme === "dark";

  // Position is represented as a percentage [10%..90%] within its roaming zone
  const [posX, setPosX] = useState(50);
  const [state, setState] = useState<CharacterState>("idle");
  const [transitionDuration, setTransitionDuration] = useState(0);
  const [dialogue, setDialogue] = useState<string | null>(null);
  const [showHearts, setShowHearts] = useState(false);

  const posXRef = useRef(50);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const dialogueTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Preload GIFs to prevent flashing
  useEffect(() => {
    const assets = ["/Assets/idle.gif", "/Assets/walk_left.gif", "/Assets/walk_right.gif"];
    assets.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Main wandering loop
  useEffect(() => {
    let isMounted = true;

    const planNextMovement = () => {
      if (!isMounted) return;

      // Random idle duration: between 2.0s and 4.5s
      const idleTime = Math.floor(Math.random() * 2500) + 2000;

      timerRef.current = setTimeout(() => {
        if (!isMounted) return;

        const currentX = posXRef.current;
        // Choose a target position between 10% and 90%
        let targetX = Math.floor(Math.random() * 80) + 10;
        let attempts = 0;
        while (Math.abs(targetX - currentX) < 18 && attempts < 10) {
          targetX = Math.floor(Math.random() * 80) + 10;
          attempts++;
        }

        const distance = Math.abs(targetX - currentX);
        const walkDuration = Math.max(1.5, Math.round((distance / 12) * 10) / 10);
        const nextAction: CharacterState = targetX < currentX ? "walk_left" : "walk_right";

        setState(nextAction);
        setTransitionDuration(walkDuration);
        posXRef.current = targetX;
        setPosX(targetX);

        timerRef.current = setTimeout(() => {
          if (!isMounted) return;
          setState("idle");
          setTransitionDuration(0);
          planNextMovement();
        }, walkDuration * 1000);
      }, idleTime);
    };

    timerRef.current = setTimeout(() => {
      planNextMovement();
    }, 1500);

    return () => {
      isMounted = false;
      if (timerRef.current) clearTimeout(timerRef.current);
      if (dialogueTimerRef.current) clearTimeout(dialogueTimerRef.current);
    };
  }, []);

  const handleClick = () => {
    const randomQuote = DIALOGUES[Math.floor(Math.random() * DIALOGUES.length)];
    setDialogue(randomQuote);
    setShowHearts(true);

    if (dialogueTimerRef.current) clearTimeout(dialogueTimerRef.current);
    dialogueTimerRef.current = setTimeout(() => {
      setDialogue(null);
      setShowHearts(false);
    }, 3200);
  };

  const getSpriteSrc = () => {
    switch (state) {
      case "walk_left":
        return "/Assets/walk_left.gif";
      case "walk_right":
        return "/Assets/walk_right.gif";
      case "idle":
      default:
        return "/Assets/idle.gif";
    }
  };

  return (
    <div
      className={`relative w-full h-48 md:h-56 select-none ${className}`}
      aria-label="Interactive companion character"
    >
      {/* Roaming track container */}
      <div className="relative w-full h-full">
        {/* Character container positioned by posX */}
        <div
          className="absolute bottom-4 -translate-x-1/2 flex flex-col items-center cursor-pointer group pointer-events-auto"
          style={{
            left: `${posX}%`,
            transition: transitionDuration > 0 ? `left ${transitionDuration}s linear` : "none",
          }}
          onClick={handleClick}
          title="Click me to interact! 🐾"
        >
          {/* Floating Dialogue Bubble */}
          {dialogue && (
            <div
              className="absolute -top-14 bg-white/95 dark:bg-[#25282B]/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#4A7C39]/40 shadow-xl text-xs font-semibold whitespace-nowrap animate-in fade-in zoom-in-95 duration-200 z-30"
              style={{
                color: dark ? "#DCE9D5" : "#244015",
              }}
            >
              <span>{dialogue}</span>
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white/95 dark:bg-[#25282B]/95 border-b border-r border-[#4A7C39]/40 rotate-45" />
            </div>
          )}

          {/* Floating Hearts particle effect when clicked */}
          {showHearts && (
            <div className="absolute -top-8 pointer-events-none flex gap-2 animate-bounce z-30">
              <span className="text-sm">🐾</span>
              <span className="text-sm">✨</span>
            </div>
          )}

          {/* Character GIF */}
          <div className="relative w-32 h-32 md:w-36 md:h-36 flex items-end justify-center transition-transform group-hover:scale-110 active:scale-95 duration-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={getSpriteSrc()}
              alt={`Character (${state})`}
              className="w-full h-full object-contain"
              style={{
                imageRendering: "pixelated",
              }}
              draggable={false}
            />
          </div>

          {/* Status tooltip on hover */}
          {!dialogue && (
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute -top-7 text-[11px] font-medium tracking-wide px-2.5 py-0.5 rounded-full bg-black/75 text-white/95 backdrop-blur-sm pointer-events-none whitespace-nowrap border border-white/10">
              {state === "idle" ? "Idle · Click me! 🐾" : "Walking 🐾"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
