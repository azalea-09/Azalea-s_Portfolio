"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import {
  Mail,
  Copy,
  Check,
  ArrowUpRight,
  ArrowUp,
  Sparkles,
} from "lucide-react";

function GithubIcon({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [catSpeech, setCatSpeech] = useState("Let's build something together! 🌿");

  const catGreetings = [
    "Meow! Thanks for stopping by! 🐾",
    "Open for opportunities & chats! ☕",
    "Let's build something awesome! 🌿",
    "Purrr... Looking forward to connecting! ✨",
  ];

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText("valentinakriswandaru@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const onCatClick = () => {
    const nextGreeting =
      catGreetings[(catGreetings.indexOf(catSpeech) + 1) % catGreetings.length];
    setCatSpeech(nextGreeting);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      id="contact"
      className="relative pt-16 md:pt-24 pb-20 md:pb-28 px-6 md:px-12 text-center max-w-5xl mx-auto"
    >
      <motion.div
        data-contact-content="true"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="flex flex-col items-center"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="mb-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#4A7C39]/30 bg-[#4A7C39]/10 dark:bg-[#78B05F]/10 text-[#4A7C39] dark:text-[#78B05F] text-xs font-semibold uppercase tracking-[0.2em] shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4A7C39] dark:bg-[#78B05F] animate-pulse" />
            <span>Contact</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#4A7C39] dark:bg-[#78B05F] animate-pulse" />
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h2
          variants={itemVariants}
          className="font-[family-name:var(--font-display)] text-5xl md:text-7xl font-bold tracking-tight mb-4 text-foreground"
        >
          Let&apos;s Connect{" "}
          <span className="inline-block hover:rotate-12 transition-transform duration-300 cursor-default">
            🌿
          </span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-muted-foreground text-base sm:text-lg mb-12 max-w-xl mx-auto leading-relaxed"
        >
          Open to internship opportunities, collaborations, or just a friendly hello!
        </motion.p>

        {/* Contact Action Cards */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl mb-16"
        >
          {/* GitHub Card */}
          <motion.a
            variants={cardVariants}
            href="https://github.com/azalea-09"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-between p-4 sm:p-5 rounded-2xl border border-border bg-card/80 dark:bg-card/60 backdrop-blur-sm
              hover:border-[#4A7C39] dark:hover:border-[#78B05F]
              hover:shadow-[0_10px_28px_rgba(74,124,57,0.18)]
              hover:-translate-y-1 transition-all duration-300 text-left"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-11 h-11 rounded-xl bg-[#4A7C39]/10 dark:bg-[#78B05F]/10 text-[#4A7C39] dark:text-[#78B05F] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                <GithubIcon size={22} />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                  GitHub
                </p>
                <p className="text-sm font-semibold text-foreground truncate group-hover:text-[#4A7C39] dark:group-hover:text-[#78B05F] transition-colors">
                  azalea-09
                </p>
              </div>
            </div>
            <ArrowUpRight
              size={18}
              className="text-muted-foreground/60 group-hover:text-[#4A7C39] dark:group-hover:text-[#78B05F] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-2"
            />
          </motion.a>

          {/* Email Card (with direct link and copy quick button) */}
          <motion.div
            variants={cardVariants}
            className="group relative flex items-center justify-between p-4 sm:p-5 rounded-2xl border border-border bg-card/80 dark:bg-card/60 backdrop-blur-sm
              hover:border-[#4A7C39] dark:hover:border-[#78B05F]
              hover:shadow-[0_10px_28px_rgba(74,124,57,0.18)]
              hover:-translate-y-1 transition-all duration-300 text-left"
          >
            <a
              href="mailto:valentinakriswandaru@gmail.com"
              className="flex items-center gap-3.5 min-w-0 flex-1"
            >
              <div className="w-11 h-11 rounded-xl bg-[#4A7C39]/10 dark:bg-[#78B05F]/10 text-[#4A7C39] dark:text-[#78B05F] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                <Mail size={22} strokeWidth={2} />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                  Email
                </p>
                <p className="text-sm font-semibold text-foreground truncate group-hover:text-[#4A7C39] dark:group-hover:text-[#78B05F] transition-colors">
                  Send Email
                </p>
              </div>
            </a>
            <button
              onClick={handleCopyEmail}
              title={copied ? "Copied!" : "Copy email address"}
              aria-label="Copy email address"
              className="p-2 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-[#4A7C39] hover:text-white dark:hover:bg-[#78B05F] dark:hover:text-[#1C1E20] text-muted-foreground transition-all duration-200 shrink-0 ml-2 cursor-pointer"
            >
              {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
            </button>
          </motion.div>

          {/* LinkedIn Card */}
          <motion.a
            variants={cardVariants}
            href="https://www.linkedin.com/in/valentina-azalea-4b899730b/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-between p-4 sm:p-5 rounded-2xl border border-border bg-card/80 dark:bg-card/60 backdrop-blur-sm
              hover:border-[#4A7C39] dark:hover:border-[#78B05F]
              hover:shadow-[0_10px_28px_rgba(74,124,57,0.18)]
              hover:-translate-y-1 transition-all duration-300 text-left"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-11 h-11 rounded-xl bg-[#4A7C39]/10 dark:bg-[#78B05F]/10 text-[#4A7C39] dark:text-[#78B05F] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                <LinkedinIcon size={22} />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                  LinkedIn
                </p>
                <p className="text-sm font-semibold text-foreground truncate group-hover:text-[#4A7C39] dark:group-hover:text-[#78B05F] transition-colors">
                  valentina-azalea
                </p>
              </div>
            </div>
            <ArrowUpRight
              size={18}
              className="text-muted-foreground/60 group-hover:text-[#4A7C39] dark:group-hover:text-[#78B05F] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-2"
            />
          </motion.a>
        </motion.div>

        {/* Interactive Companion Cat & Speech Bubble */}
        <motion.div variants={itemVariants} className="flex flex-col items-center">
          <button
            onClick={onCatClick}
            className="group relative flex flex-col items-center focus:outline-none cursor-pointer"
            aria-label="Companion cat interaction"
          >
            <div className="mb-3 px-4 py-1.5 rounded-full bg-card/90 dark:bg-[#25282B]/90 border border-border shadow-sm text-xs text-muted-foreground flex items-center gap-1.5 transition-all group-hover:scale-105 group-hover:border-[#4A7C39]/40">
              <Sparkles size={13} className="text-[#4A7C39] dark:text-[#78B05F]" />
              <span>{catSpeech}</span>
            </div>
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
              className="text-5xl group-hover:scale-125 transition-transform duration-200 select-none"
            >
              🐱
            </motion.div>
          </button>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="mt-8 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors cursor-pointer"
          >
            <ArrowUp size={14} />
            <span>Back to top</span>
          </button>

          {/* Footer note */}
          <footer className="mt-8 text-xs sm:text-sm text-muted-foreground/80 max-w-md mx-auto leading-relaxed">
            ✦ Valentina Azalea Kanaya Kriswandaru · CS @ BINUS University ·
          </footer>
        </motion.div>
      </motion.div>
    </section>
  );
}
