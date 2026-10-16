"use client";

import { useEffect, useState } from "react";
import { Reveal, MaskLines, StaggerReveal, staggerChild } from "./ScrollReveal";
import { motion } from "framer-motion";
import {
  Braces,
  Coffee,
  Code2,
  CodeXml,
  FileCode2,
  Globe,
  NotebookTabs,
  Palette,
  Zap,
  type LucideIcon,
} from "lucide-react";

interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string | null;
  language: string | null;
}

const LANG_ICONS: Record<string, LucideIcon> = {
  Python: Braces,
  JavaScript: Zap,
  TypeScript: CodeXml,
  Java: Coffee,
  PHP: Code2,
  HTML: Globe,
  CSS: Palette,
  Jupyter: NotebookTabs,
};

function LanguageBadge({ language }: { language: string | null }) {
  const Icon = LANG_ICONS[language ?? ""] ?? FileCode2;

  return (
    <p className="text-xs font-semibold uppercase tracking-wider text-[#4A7C39] dark:text-[#78B05F] mb-2 inline-flex items-center gap-1.5">
      <Icon aria-hidden="true" size={14} strokeWidth={2} />
      {language ?? "Code"}
    </p>
  );
}

const PLACEHOLDERS: Repo[] = [
  { id: 1, name: "Data Analysis Project", description: "An exploratory data analysis project — coming soon to GitHub.", html_url: "#", homepage: null, language: "Python" },
  { id: 2, name: "Data Visualization Dashboard", description: "Interactive storytelling with data. Built with Tableau — uploading soon.", html_url: "#", homepage: null, language: "CSS" },
  { id: 3, name: "Machine Learning Model", description: "Predictive model project — working on it, uploading soon.", html_url: "#", homepage: null, language: "Python" },
];

export function Projects() {
  const [repos, setRepos] = useState<Repo[]>(PLACEHOLDERS);

  useEffect(() => {
    fetch("https://api.github.com/users/azalea-09/repos?sort=updated&per_page=6", {
      headers: { Accept: "application/vnd.github.v3+json" },
    })
      .then((r) => r.json())
      .then((data: Repo[]) => {
        const filtered = data.filter((r: any) => !r.fork && r.description);
        if (filtered.length > 0) setRepos(filtered);
      })
      .catch(() => {});
  }, []);

  return (
    <section id="work" className="pt-28 pb-48 md:pb-56 px-6 md:px-16 max-w-7xl mx-auto">
      <div data-work-content="true">
      <Reveal y={16}>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#4A7C39] dark:text-[#78B05F] mb-4 flex items-center gap-2">
          <span className="block w-5 h-px bg-[#4A7C39] dark:bg-[#78B05F]" /> Projects
        </p>
      </Reveal>

      <MaskLines
        lines={["Selected Work"]}
        className="font-[family-name:var(--font-display)] text-5xl md:text-6xl font-semibold mb-3"
        delay={0.05}
      />

      <Reveal delay={0.15} y={16}>
        <p className="text-muted-foreground text-sm mb-12">
          Pulled live from GitHub — repos with descriptions appear here automatically.
        </p>
      </Reveal>

      <StaggerReveal
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px border border-border rounded-2xl overflow-hidden"
        stagger={0.1}
        delay={0.1}
      >
        {repos.map((repo, i) => (
          <motion.article
            key={repo.id}
            variants={staggerChild}
            className="bg-card h-full p-8 hover:bg-accent/20 transition-colors group cursor-pointer border-r border-b border-border"
          >
            <div className="font-[family-name:var(--font-display)] text-5xl font-bold text-border group-hover:text-[#4A7C39]/50 dark:group-hover:text-[#78B05F]/50 transition-colors mb-4 leading-none">
              0{i + 1}
            </div>
            <LanguageBadge language={repo.language} />
            <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold mb-3 capitalize">
              {repo.name.replace(/-/g, " ")}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">{repo.description}</p>
            {repo.html_url !== "#" ? (
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer"
                className="text-sm font-semibold text-[#4A7C39] dark:text-[#78B05F] flex items-center gap-1 hover:gap-2 transition-all w-fit">
                View on GitHub <span>↗</span>
              </a>
            ) : (
              <span className="text-sm text-muted-foreground/40">Coming soon</span>
            )}
          </motion.article>
        ))}
      </StaggerReveal>
      </div>
    </section>
  );
}
