"use client";

import { useRef, MouseEvent } from "react";
import { Reveal, MaskLines, StaggerReveal, staggerChild } from "./ScrollReveal";
import { motion } from "framer-motion";
import {
  BrainCircuit,
  Braces,
  CalendarCheck,
  ChartColumn,
  ChartPie,
  Clapperboard,
  Code2,
  CodeXml,
  Coffee,
  Database,
  FileCode2,
  GitBranch,
  NotebookTabs,
  Palette,
  PanelsTopLeft,
  PenTool,
  Presentation,
  Sparkles,
  UsersRound,
} from "lucide-react";

type Skill = { name: string; Icon: typeof Code2 };
interface SkillCardProps { Icon: typeof Code2; title: string; skills: Skill[]; }

function SkillCard({ Icon: CategoryIcon, title, skills }: SkillCardProps) {
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
      <div className="w-11 h-11 mb-3 rounded-xl bg-[#4A7C39]/10 dark:bg-[#78B05F]/10 flex items-center justify-center">
        <CategoryIcon aria-hidden="true" size={22} strokeWidth={1.8} className="text-[#4A7C39] dark:text-[#78B05F]" />
      </div>
      <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-foreground mb-3">{title}</h3>
      <ul className="space-y-1.5">
        {skills.map(({ name, Icon }) => (
          <li key={name} className="text-sm text-muted-foreground flex items-center gap-2.5">
            <span className="w-7 h-7 shrink-0 rounded-lg bg-[#4A7C39]/10 dark:bg-[#78B05F]/10 flex items-center justify-center">
              <Icon aria-hidden="true" size={15} strokeWidth={1.8} className="text-[#4A7C39] dark:text-[#78B05F]" />
            </span>
            <span>{name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const SKILL_DATA: SkillCardProps[] = [
  { Icon: Code2, title: "Programming & Dev", skills: [
    { name: "Java", Icon: Coffee },
    { name: "Python", Icon: Braces },
    { name: "HTML / CSS", Icon: PanelsTopLeft },
    { name: "JavaScript", Icon: FileCode2 },
    { name: "PHP", Icon: Code2 },
    { name: "SQL", Icon: Database },
  ] },
  { Icon: ChartColumn, title: "Data & AI", skills: [
    { name: "Data Analysis", Icon: ChartColumn },
    { name: "Machine Learning", Icon: BrainCircuit },
    { name: "Data Visualization", Icon: ChartPie },
  ] },
  { Icon: Palette, title: "Design & Tools", skills: [
    { name: "Figma", Icon: PenTool },
    { name: "Canva", Icon: Palette },
    { name: "Tableau", Icon: ChartColumn },
    { name: "Git / GitHub", Icon: GitBranch },
    { name: "VS Code", Icon: CodeXml },
    { name: "Google Colab", Icon: NotebookTabs },
  ] },
  { Icon: Sparkles, title: "Other", skills: [
    { name: "UI / UX", Icon: PanelsTopLeft },
    { name: "Content Creation", Icon: Clapperboard },
    { name: "Presentation", Icon: Presentation },
    { name: "Event Organization", Icon: CalendarCheck },
    { name: "Teamwork", Icon: UsersRound },
  ] },
];

export function SkillCards() {
  return (
    <section id="skills" className="py-28 px-6 md:px-16 max-w-7xl mx-auto">
      <div data-skills-content="true">
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
      </div>
    </section>
  );
}
