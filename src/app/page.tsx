"use client";

import { ThemeProvider, useTheme } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { SkillCards } from "@/components/SkillCards";
import { Contact } from "@/components/Contact";
import { SmoothScroll, Reveal, MaskLines, ParallaxY } from "@/components/ScrollReveal";
import { AutumnCanvas } from "@/components/AutumnCanvas";
import { HeroCharacter } from "@/components/HeroCharacter";
import { LeafTransition } from "@/components/LeafTransition";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function GradientMesh() {
  const { theme } = useTheme();
  const dark = theme === "dark";

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden transition-colors duration-700">

      <div
        className="absolute inset-0 transition-colors duration-700"
        style={{ background: dark ? "#1C1E20" : "#F8F9FA" }}
      />


      <div
        className="absolute rounded-full blur-[120px] transition-colors duration-700"
        style={{
          width: 600, height: 600,
          background: dark ? "rgba(74,124,57,0.18)" : "rgba(100,145,75,0.14)",
          top: "-10%", left: "-10%",
          animation: "blob1 12s ease-in-out infinite alternate",
        }}
      />

      <div
        className="absolute rounded-full blur-[140px] transition-colors duration-700"
        style={{
          width: 700, height: 700,
          background: dark ? "rgba(61,104,43,0.2)" : "rgba(74,124,57,0.12)",
          top: "20%", right: "-15%",
          animation: "blob2 16s ease-in-out infinite alternate",
        }}
      />

      <div
        className="absolute rounded-full blur-[100px] transition-colors duration-700"
        style={{
          width: 500, height: 500,
          background: dark ? "rgba(40,74,28,0.22)" : "rgba(61,104,43,0.1)",
          bottom: "-5%", left: "30%",
          animation: "blob3 10s ease-in-out infinite alternate",
        }}
      />

      <div
        className="absolute rounded-full blur-[160px] transition-colors duration-700"
        style={{
          width: 400, height: 400,
          background: dark ? "rgba(94,142,71,0.12)" : "rgba(74,124,57,0.1)",
          top: "50%", left: "10%",
          animation: "blob4 14s ease-in-out infinite alternate",
        }}
      />

      <style>{`
        @keyframes blob1 {
          0%   { transform: translate(0,0) scale(1); }
          100% { transform: translate(8vw,6vh) scale(1.15); }
        }
        @keyframes blob2 {
          0%   { transform: translate(0,0) scale(1.1); }
          100% { transform: translate(-6vw,8vh) scale(0.9); }
        }
        @keyframes blob3 {
          0%   { transform: translate(0,0) scale(0.95); }
          100% { transform: translate(5vw,-7vh) scale(1.2); }
        }
        @keyframes blob4 {
          0%   { transform: translate(0,0) scale(1); }
          100% { transform: translate(-4vw,-5vh) scale(1.1); }
        }
        @keyframes floatY {
          0%,100% { transform: translateY(0); }
          50%     { transform: translateY(-14px); }
        }
      `}</style>
    </div>
  );
}

function TypewriterName({
  text,
  className,
  startDelay = 600,
}: {
  text: string;
  className?: string;
  startDelay?: number;
}) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      let i = 0;
      const iv = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i === text.length) { clearInterval(iv); setDone(true); }
      }, 80);
      return () => clearInterval(iv);
    }, startDelay);
    return () => clearTimeout(t);
  }, [text, startDelay]);

  return (
    <span className={className}>
      {displayed}
      {!done && <span className="animate-pulse text-[#A8D535] ml-1">|</span>}
    </span>
  );
}

function RoleTypewriter() {
  const roles = ["Data Analyst", "Data Engineer", "Data Scientist"];
  const [display, setDisplay] = useState("");
  const [roleIdx, setRoleIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentFullText = roles[roleIdx];

    if (!isDeleting) {
      if (display.length < currentFullText.length) {
        timer = setTimeout(() => {
          setDisplay(currentFullText.slice(0, display.length + 1));
        }, 75);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      }
    } else {
      if (display.length > 0) {
        timer = setTimeout(() => {
          setDisplay(currentFullText.slice(0, display.length - 1));
        }, 40);
      } else {
        setIsDeleting(false);
        setRoleIdx((prev) => (prev + 1) % roles.length);
      }
    }

    return () => clearTimeout(timer);
  }, [display, isDeleting, roleIdx]);

  return (
    <div className="flex items-center gap-2.5 font-[family-name:var(--font-display)] text-xl sm:text-2xl font-semibold">
      <span className="text-muted-foreground not-italic text-xs sm:text-sm font-sans font-semibold uppercase tracking-wider">
        Aspiring
      </span>
      <span
        className="italic tracking-wide"
        style={{ color: theme === "dark" ? "#DCE9D5" : "#244015" }}
      >
        {display}
        <span className="animate-pulse text-[#4A7C39] dark:text-[#78B05F] font-normal ml-0.5">|</span>
      </span>
    </div>
  );
}

function PageInner() {
  const { theme } = useTheme();
  const dark = theme === "dark";

  return (
    <>
      <SmoothScroll />

      <Navbar />


      <section
        id="hero"
        className="min-h-screen flex flex-col justify-center px-4 sm:px-6 md:px-12 pt-20 sm:pt-24 pb-16 sm:pb-20 lg:pb-24 relative overflow-hidden"
      >

        <AutumnCanvas />

        <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-center my-auto">

          <div className="lg:col-span-7 flex flex-col items-start">

            <h1
              className="font-[family-name:var(--font-display)] text-[clamp(2.4rem,5.5vw,5.2rem)] font-black leading-[0.98] tracking-tight mb-3 sm:mb-4"
              style={{ color: dark ? "white" : "#1c1c1c" }}
            >
              Valentina
              <br />
              <em className="italic text-[#4A7C39] dark:text-[#78B05F]">Azalea</em>
            </h1>


            <div className="mb-3 sm:mb-4 min-h-[1.8rem] flex items-center">
              <RoleTypewriter />
            </div>


            <p
              className="text-sm sm:text-base lg:text-lg max-w-xl leading-relaxed mb-6 sm:mb-7"
              style={{ color: dark ? "rgba(240,242,245,0.75)" : "rgba(28,28,28,0.75)" }}
            >
              CS Student at BINUS University — combining technology &amp; creativity to turn
              data into meaningful digital experiences.
            </p>


            <div className="flex gap-3 sm:gap-4 flex-wrap items-center">
              <a
                href="#about"
                className="px-6 sm:px-8 py-2.5 sm:py-3.5 rounded-full bg-[#4A7C39] hover:bg-[#3D682B] text-white font-semibold text-xs sm:text-sm hover:-translate-y-1 transition-all shadow-[0_0_24px_rgba(74,124,57,0.35)] hover:shadow-[0_0_40px_rgba(74,124,57,0.55)] flex items-center gap-2"
              >
                <span>About me</span>
                <span>↓</span>
              </a>
              <a
                href="/cv.pdf"
                download="Valentina_Azalea_CV.pdf"
                className="px-6 sm:px-8 py-2.5 sm:py-3.5 rounded-full font-semibold text-xs sm:text-sm hover:-translate-y-1 transition-all flex items-center gap-2.5 group shadow-sm border border-[#4A7C39]/40 dark:border-white/15 bg-[#4A7C39]/10 dark:bg-white/5 text-foreground hover:bg-[#4A7C39] hover:text-white"
              >
                <svg className="w-4 h-4 transition-transform group-hover:translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Download CV</span>
              </a>
            </div>
          </div>


          <div className="lg:col-span-5 flex justify-center lg:justify-end items-center relative w-full pt-2 lg:pt-0">
            <div className="w-full max-w-[320px] sm:max-w-sm lg:max-w-md p-3.5 sm:p-5 lg:p-6 rounded-3xl border border-white/20 dark:border-white/10 bg-white/40 dark:bg-[#25282B]/80 backdrop-blur-md relative shadow-lg">
              <div className="flex items-center justify-between text-[10px] sm:text-[11px] uppercase tracking-widest text-muted-foreground mb-1.5 sm:mb-2 font-medium px-1 sm:px-2">
                <span>✦ Companion</span>
                <span className="text-[10px] text-[#4A7C39] dark:text-[#78B05F]">Click to interact</span>
              </div>
              <HeroCharacter />
            </div>
          </div>
        </div>

        <motion.div
          animate={{ y: [0, 4, 0], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-16 sm:bottom-20 md:bottom-24 left-1/2 -translate-x-1/2 z-30 text-xs uppercase tracking-widest flex flex-col items-center gap-1 text-muted-foreground/60 pointer-events-none"
        >
          <span>scroll</span>
        </motion.div>

        <LeafTransition className="absolute bottom-0 left-0 right-0 z-20 h-20 sm:h-24 md:h-32 pointer-events-none select-none overflow-hidden" />
      </section>

      <div className="relative z-10">
        <div
          className="absolute inset-0 pointer-events-none transition-colors duration-700"
          style={{
            background: dark ? "rgba(28,30,32,0.85)" : "rgba(245,240,232,0.7)",
          }}
        />
        <div className="relative">
          <About />
          <Projects />
          <SkillCards />
          <Contact />
        </div>
      </div>
    </>
  );
}

export default function Home() {
  return (
    <ThemeProvider>
      <PageInner />
    </ThemeProvider>
  );
}
