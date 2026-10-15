"use client";

import { useRef, MouseEvent } from "react";
import { Reveal, MaskLines, StaggerReveal, staggerChild } from "./ScrollReveal";
import { motion } from "framer-motion";

interface SkillCardProps { icon: string; title: string; skills: string[]; }

function SkillCard({ icon, title, skills }: SkillCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    const cx = (x / width - 0.5) * 18;
    const cy = (y / height - 0.5) * 18;
    card.style.transform = `perspective(600px) rotateX(${-cy}deg) rotateY(${cx}deg) scale(1.03)`;
    card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(74,124,57,0.12) 0%, transparent 65%)`;
  };
  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "";
    card.style.background = "";
  };

  return (
    <div ref={cardRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
      className="relative rounded-2xl border border-border bg-card p-6 cursor-default
        transition-[border-color,box-shadow] duration-200
        hover:border-[#4A7C39]/50 hover:shadow-[0_0_32px_rgba(74,124,57,0.12)]"
      style={{ willChange: "transform" }}
    >
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-foreground mb-3">{title}</h3>
      <ul className="space-y-1.5">
        {skills.map((s) => (
          <li key={s} className="text-sm text-muted-foreground flex items-center gap-2">
            <span className="text-[#4A7C39] dark:text-[#78B05F] text-xs">·</span>{s}
          </li>
        ))}
      </ul>
    </div>
  );
}

const SKILL_DATA: SkillCardProps[] = [
  { icon: "💻", title: "Programming & Dev", skills: ["Java", "Python", "HTML / CSS", "JavaScript", "PHP", "SQL"] },
  { icon: "📊", title: "Data & AI", skills: ["Data Analysis", "Machine Learning", "Data Visualization"] },
  { icon: "🎨", title: "Design & Tools", skills: ["Figma", "Canva", "Tableau", "Git / GitHub", "VS Code", "Google Colab"] },
  { icon: "🌟", title: "Other", skills: ["UI / UX", "Content Creation", "Presentation", "Event Organization", "Teamwork"] },
];

export function SkillCards() {
  return (
    <section id="skills" className="py-28 px-6 md:px-16 max-w-7xl mx-auto">
      <Reveal y={16}>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#4A7C39] dark:text-[#78B05F] mb-4 flex items-center gap-2">
          <span className="block w-5 h-px bg-[#4A7C39] dark:bg-[#78B05F]" /> Skills
        </p>
      </Reveal>
      <MaskLines
        lines={["What I Work With"]}
        className="font-[family-name:var(--font-display)] text-5xl md:text-6xl font-semibold mb-12"
        delay={0.05}
      />
      <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" stagger={0.09}>
        {SKILL_DATA.map((card) => (
          <motion.div key={card.title} variants={staggerChild}>
            <SkillCard {...card} />
          </motion.div>
        ))}
      </StaggerReveal>
    </section>
  );
}
