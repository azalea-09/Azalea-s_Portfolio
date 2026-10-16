"use client";

import { Reveal, MaskLines, WordReveal, StaggerReveal, staggerChild } from "./ScrollReveal";
import { motion } from "framer-motion";
import { useState } from "react";

export function About() {
  const chips = [
    "📍 Tangerang, Indonesia",
    "🎓 Undergraduate CS Student @ BINUS",
  ];

  const [imageError, setImageError] = useState(false);

  return (
    <section id="about" className="pt-56 md:pt-72 pb-24 md:pb-32 px-6 md:px-16 max-w-7xl mx-auto">
      <div data-about-content="true" className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

        <div className="lg:col-span-7 flex flex-col justify-center">
          <Reveal delay={0} y={16}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#4A7C39] dark:text-[#78B05F] mb-4 flex items-center gap-2">
              <span className="block w-5 h-px bg-[#4A7C39] dark:bg-[#78B05F]" /> About
            </p>
          </Reveal>


          <MaskLines
            lines={["Hello, I'm", "Azalea 🌸"]}
            className="font-[family-name:var(--font-display)] text-5xl md:text-6xl font-semibold mb-6 leading-tight"
            delay={0.05}
          />

          <WordReveal
            text="I'm a Computer Science student at BINUS University who enjoys combining technology and creativity. I'm interested in data, AI, software development, and UI/UX, and I love turning ideas into practical and meaningful digital experiences."
            className="text-muted-foreground leading-relaxed text-base sm:text-lg mb-4"
            delay={0.1}
          />

          <WordReveal
            text="I'm always excited to learn, create, and explore new things — and I'm actively looking for internship opportunities in Data Analytics, Data Engineering, or Data Science."
            className="text-muted-foreground leading-relaxed text-base sm:text-lg mb-8"
            delay={0.05}
          />

          <StaggerReveal className="flex flex-wrap gap-2.5" stagger={0.07} delay={0.1}>
            {chips.map((chip) => (
              <motion.span
                key={chip}
                variants={staggerChild}
                className="text-xs sm:text-sm font-medium px-4 py-1.5 rounded-full border border-[#4A7C39]/30 text-foreground bg-[#4A7C39]/5"
              >
                {chip}
              </motion.span>
            ))}
          </StaggerReveal>
        </div>


        <div className="lg:col-span-5 flex justify-center w-full">
          <Reveal delay={0.15} y={30} className="w-full max-w-md">
            <div className="relative rounded-2xl border-2 border-[#4A7C39]/40 bg-card p-5 sm:p-7 shadow-[6px_6px_0_#244015]">
              <div className="absolute inset-3 border border-dashed border-[#4A7C39]/20 rounded-xl pointer-events-none" />
              <span className="absolute -top-3.5 right-6 bg-[#4A7C39] text-white text-xs font-bold uppercase tracking-widest px-3.5 py-1 rounded-md shadow-sm z-10">
                Hello
              </span>


              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-[#4A7C39]/25 bg-[#4A7C39]/5 mb-5 group flex items-center justify-center">
                {!imageError ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src="/profile.jpg"
                    alt="Valentina Azalea"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center p-6 text-center text-muted-foreground">
                    <div className="w-14 h-14 rounded-full bg-[#4A7C39]/15 flex items-center justify-center text-2xl mb-2 text-[#4A7C39] dark:text-[#78B05F]">
                      📷
                    </div>
                    <p className="text-sm font-semibold text-foreground mb-1">Your Photo Here</p>
                    <p className="text-xs text-muted-foreground">Place your image as <code className="text-[#4A7C39] dark:text-[#78B05F] font-mono font-medium">public/profile.jpg</code></p>
                  </div>
                )}
              </div>


              <blockquote className="font-[family-name:var(--font-display)] italic text-2xl sm:text-3xl text-[#4A7C39] dark:text-[#78B05F] leading-snug mb-3">
                &ldquo;Turning data into meaningful stories.&rdquo;
              </blockquote>
              <div className="h-px bg-[#4A7C39]/20 mb-3" />
              <p className="text-xs sm:text-sm text-muted-foreground">
                Computer Science · BINUS University
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
