"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Reveal, MaskLines } from "./ScrollReveal";
import {
  ArrowUpRight,
  Trophy,
  BarChart3,
  BrainCircuit,
  Database,
  FileText,
  Workflow,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  type LucideIcon,
} from "lucide-react";

export interface ProjectItem {
  id: number;
  title: string;
  category: string;
  filterCategories: string[];
  award?: string;
  description: string;
  tools: string[];
  githubUrl?: string;
  demoUrl?: string;
  icon: LucideIcon;
  image: string;
}

export const PROJECTS: ProjectItem[] = [
  {
    id: 1,
    title: "SIAGA: Multi-Hazard Early Warning & Resource Allocation",
    category: "AI, Data Projects",
    filterCategories: ["AI & Machine Learning", "Data Analytics"],
    award: "🏆 4th Place · RISTEK UI Datathon 2026 (200+ Teams)",
    description:
      "SIAGA earned 4th place among 200+ teams at RISTEK UI Datathon 2026, one of Indonesia's largest data competitions. The system supports early warning and resource allocation for flood and drought risks across Northern Java by integrating climate, hydrology, population, geographic, infrastructure, and satellite data. It combines calibrated XGBoost risk models with CVaR-based optimization for limited-resource planning under high-risk scenarios.",
    tools: [
      "Python",
      "XGBoost",
      "Scikit-learn",
      "GloFAS",
      "ERA5",
      "WorldPop",
      "OpenStreetMap",
      "Sentinel-1",
      "CVaR",
    ],
    icon: BrainCircuit,
    image: "/Assets/COVER%20SIAGA.png",
    githubUrl: "https://github.com/azalea-09",
  },
  {
    id: 2,
    title: "Brazilian E-Commerce Data Analysis & Business Insights",
    category: "Data, AI Project",
    filterCategories: ["Data Engineering", "AI & Machine Learning", "Data Analytics"],
    description:
      "Analyzed Olist Brazilian e-commerce data to understand customer satisfaction, delivery performance, and customer segments. Built a batch ELT architecture with HDFS, Hive, and Apache Spark, then applied classification and K-Means clustering to produce business insights.",
    tools: ["Apache Spark", "Hadoop", "HDFS", "Hive", "K-Means", "Python"],
    icon: Database,
    image: "/Assets/Brazilian%20E-Commerce%20Data%20Analysis%20%26%20Business%20Insights.png",
    githubUrl: "https://github.com/azalea-09",
  },
  {
    id: 3,
    title: "Fault-Tolerant Streaming ETL for Real-Time Retail Anomaly Detection",
    category: "Data Engineering",
    filterCategories: ["Data Engineering", "AI & Machine Learning"],
    description:
      "A streaming data pipeline that detects and quarantines bad retail-transaction records in-stream, before they reach the analytics database. Three unsupervised anomaly detectors (Isolation Forest, One-Class SVM, Z-Score) are compared head-to-head inside one Apache Kafka pipeline, and evaluated on both detection quality and system reliability.",
    tools: [
      "Python",
      "Jupyter Notebook",
      "Apache Kafka",
      "Isolation Forest",
      "One-Class SVM",
      "Z-Score",
    ],
    icon: Workflow,
    image: "/Assets/Fault-Tolerant%20Streaming%20ETL.png",
    githubUrl: "https://github.com/azalea-09",
  },
  {
    id: 4,
    title: "E-Commerce Customer Churn Dashboard",
    category: "Data Visualization",
    filterCategories: ["Data Visualization", "Data Analytics"],
    description:
      "An interactive dashboard analyzing customer churn behaviour and identifying patterns related to engagement and purchasing activity to support proactive retention decisions.",
    tools: ["Tableau", "Python"],
    icon: BarChart3,
    image: "/Assets/E-Commerce%20Customer%20Churn%20Dashboard.png",
    githubUrl: "https://github.com/azalea-09",
  },
  {
    id: 5,
    title: "E-Commerce Customer Churn Report",
    category: "Data Science",
    filterCategories: ["Data Analytics"],
    description:
      "A comprehensive data analytics report exploring customer churn patterns, engagement behaviour, and purchasing activity with empirical validation and strategic recommendations.",
    tools: ["Python", "LaTeX"],
    icon: FileText,
    image: "/Assets/Customer%20Churn%20Prediction%20in%20E-Commerce.png",
    githubUrl: "https://github.com/azalea-09",
  },
];

const FILTER_TABS = [
  "All",
  "AI & Machine Learning",
  "Data Engineering",
  "Data Analytics",
  "Data Visualization",
];

export function Projects() {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Mouse drag state
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  const scrollRef = useRef<HTMLDivElement>(null);

  const filteredProjects =
    selectedFilter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.filterCategories.includes(selectedFilter));

  // Repeat items to ensure seamless infinite looping (at least 3 sets)
  const repeatCount = Math.max(3, Math.ceil(12 / (filteredProjects.length || 1)));
  const displayProjects = Array.from({ length: repeatCount }, (_, setIdx) =>
    filteredProjects.map((p, itemIdx) => ({
      ...p,
      uniqueKey: `set-${setIdx}-proj-${p.id}`,
      originalIndex: itemIdx,
    }))
  ).flat();

  // Scroll by one card step
  const scrollStep = useCallback((direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;
    const card = container.querySelector<HTMLElement>("[data-card-item]");
    const step = (card ? card.offsetWidth + 20 : 340) * (direction === "right" ? 1 : -1);
    container.scrollBy({ left: step, behavior: "smooth" });
  }, []);

  // Jump to specific project dot
  const scrollToProject = (index: number) => {
    const container = scrollRef.current;
    if (!container) return;
    const card = container.querySelector<HTMLElement>("[data-card-item]");
    if (!card) return;
    const step = card.offsetWidth + 20;
    const setWidth = filteredProjects.length * step;
    const middleSetStart = Math.floor(repeatCount / 2) * setWidth;
    container.scrollTo({
      left: middleSetStart + index * step,
      behavior: "smooth",
    });
    setActiveIndex(index);
  };

  // Center on middle set on mount or filter change
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const card = container.querySelector<HTMLElement>("[data-card-item]");
    const step = card ? card.offsetWidth + 20 : 340;
    const middleSetStart = Math.floor(repeatCount / 2) * (filteredProjects.length * step);
    container.scrollLeft = middleSetStart;
    setActiveIndex(0);
  }, [selectedFilter, filteredProjects.length, repeatCount]);

  // Infinite looping boundary check on scroll
  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container) return;
    const card = container.querySelector<HTMLElement>("[data-card-item]");
    if (!card) return;
    const step = card.offsetWidth + 20;
    const setWidth = filteredProjects.length * step;
    if (setWidth <= 0) return;

    // Seamless teleport if reaching boundary
    if (container.scrollLeft >= setWidth * (repeatCount - 1)) {
      container.scrollLeft -= setWidth;
    } else if (container.scrollLeft <= setWidth * 0.5) {
      container.scrollLeft += setWidth;
    }

    // Active index calculation
    const normalizedScroll = container.scrollLeft % setWidth;
    const currentIdx = Math.round(normalizedScroll / step) % filteredProjects.length;
    setActiveIndex(currentIdx);
  };

  // Autoplay loop timer — changes every 5 seconds
  useEffect(() => {
    if (isPaused || isHovered || isDragging) return;
    const timer = setInterval(() => {
      scrollStep("right");
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, isHovered, isDragging, scrollStep]);

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    const container = scrollRef.current;
    if (!container) return;
    setIsDragging(true);
    setStartX(e.pageX - container.offsetLeft);
    setScrollLeftState(container.scrollLeft);
  };

  const handleMouseLeaveOrUp = () => {
    setIsDragging(false);
    setIsHovered(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const container = scrollRef.current;
    if (!container) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 1.4;
    container.scrollLeft = scrollLeftState - walk;
  };

  return (
    <section id="work" className="pt-24 pb-44 md:pb-52 px-4 sm:px-6 md:px-16 max-w-7xl mx-auto overflow-hidden">
      <div data-work-content="true">
        {/* Header section */}
        <Reveal y={16}>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#4A7C39] dark:text-[#78B05F] mb-3 flex items-center gap-2">
            <span className="block w-5 h-px bg-[#4A7C39] dark:bg-[#78B05F]" /> Projects
          </p>
        </Reveal>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-3">
          <MaskLines
            lines={["Selected Work"]}
            className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl md:text-6xl font-semibold"
            delay={0.05}
          />

          {/* Controls status pill */}
          <div className="flex items-center gap-2 self-start md:self-end">
            <button
              onClick={() => setIsPaused((prev) => !prev)}
              aria-label={isPaused ? "Resume 5s auto-scroll" : "Pause 5s auto-scroll"}
              className="px-3 py-1.5 rounded-full border border-border bg-card/80 hover:bg-[#4A7C39]/10 hover:border-[#4A7C39]/40 text-foreground text-xs font-medium transition-all cursor-pointer shadow-sm flex items-center gap-1.5"
              title={isPaused ? "Resume auto-scroll" : "Pause auto-scroll"}
            >
              {isPaused ? (
                <>
                  <Play size={12} className="text-[#4A7C39] dark:text-[#78B05F]" />
                  <span>Paused</span>
                </>
              ) : (
                <>
                  <Pause size={12} className="text-muted-foreground" />
                  <span className="text-muted-foreground">5s Auto-loop</span>
                </>
              )}
            </button>
          </div>
        </div>

        <Reveal delay={0.15} y={16}>
          <p className="text-muted-foreground text-xs sm:text-sm mb-6 max-w-2xl">
            Featured Data Science, Analytics, and AI projects exploring real-world impact.
          </p>
        </Reveal>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-8">
          {FILTER_TABS.map((tab) => {
            const count =
              tab === "All"
                ? PROJECTS.length
                : PROJECTS.filter((p) => p.filterCategories.includes(tab)).length;
            const active = selectedFilter === tab;

            return (
              <button
                key={tab}
                onClick={() => setSelectedFilter(tab)}
                className={`px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer flex items-center gap-1.5 border ${active
                  ? "bg-[#4A7C39] text-white border-[#4A7C39] shadow-[0_0_14px_rgba(74,124,57,0.3)]"
                  : "bg-card/60 text-muted-foreground border-border hover:border-[#4A7C39]/40 hover:text-foreground"
                  }`}
              >
                <span>{tab}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${active
                    ? "bg-white/20 text-white"
                    : "bg-muted text-muted-foreground"
                    }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Carousel Container with Side Navigation Buttons */}
        <div
          className="relative group/carousel -mx-4 sm:-mx-6 md:-mx-16 px-4 sm:px-6 md:px-16"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeaveOrUp}
        >
          {/* Side Button LEFT */}
          <button
            onClick={() => scrollStep("left")}
            aria-label="Previous project"
            className="absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-border/80 bg-background/95 dark:bg-card/95 backdrop-blur-md shadow-xl flex items-center justify-center text-foreground hover:bg-[#4A7C39] hover:text-white hover:border-[#4A7C39] dark:hover:bg-[#78B05F] dark:hover:text-black transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95 group/btn"
          >
            <ChevronLeft size={22} className="transition-transform group-hover/btn:-translate-x-0.5" />
          </button>

          {/* Side Button RIGHT */}
          <button
            onClick={() => scrollStep("right")}
            aria-label="Next project"
            className="absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-border/80 bg-background/95 dark:bg-card/95 backdrop-blur-md shadow-xl flex items-center justify-center text-foreground hover:bg-[#4A7C39] hover:text-white hover:border-[#4A7C39] dark:hover:bg-[#78B05F] dark:hover:text-black transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95 group/btn"
          >
            <ChevronRight size={22} className="transition-transform group-hover/btn:translate-x-0.5" />
          </button>

          {/* Scroll Track */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseLeaveOrUp}
            onMouseMove={handleMouseMove}
            className={`flex gap-5 overflow-x-auto pb-4 pt-1 select-none scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] ${isDragging ? "cursor-grabbing" : "cursor-grab"
              }`}
            style={{
              scrollBehavior: isDragging ? "auto" : "smooth",
            }}
          >
            {displayProjects.map((project) => {
              const Icon = project.icon;

              return (
                <article
                  key={project.uniqueKey}
                  data-card-item="true"
                  className="w-[290px] sm:w-[325px] md:w-[340px] h-[480px] sm:h-[500px] shrink-0 relative flex flex-col justify-between rounded-2xl border border-border bg-card/95 dark:bg-card/70 backdrop-blur-sm p-4 sm:p-5 transition-all duration-300 hover:border-[#4A7C39]/50 dark:hover:border-[#78B05F]/50 hover:shadow-[0_8px_30px_rgba(74,124,57,0.1)] group"
                >
                  <div>
                    {/* Project Image Banner */}
                    <div className="relative w-full h-36 sm:h-40 rounded-xl overflow-hidden mb-3.5 border border-border/60 bg-muted/20">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      {/* Floating index badge */}
                      <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/65 backdrop-blur-md text-white font-[family-name:var(--font-display)] text-xs font-bold shadow-sm">
                        0{project.id}
                      </div>

                      {/* Floating category badge */}
                      <div className="absolute top-2.5 right-2.5 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-black/65 backdrop-blur-md text-[#A8E68A] border border-[#78B05F]/40 shadow-sm">
                        <Icon size={11} strokeWidth={2.2} />
                        <span>{project.category}</span>
                      </div>
                    </div>

                    {/* Award / Competition Highlight */}
                    {project.award && (
                      <div className="mb-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10.5px] font-semibold bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/25 line-clamp-1">
                        <Trophy size={12} className="shrink-0 text-amber-600 dark:text-amber-400" />
                        <span className="truncate">{project.award}</span>
                      </div>
                    )}

                    {/* Title */}
                    <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-foreground mb-1.5 tracking-tight leading-snug line-clamp-2 group-hover:text-[#4A7C39] dark:group-hover:text-[#78B05F] transition-colors">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 mb-2">
                      {project.description}
                    </p>
                  </div>

                  {/* Tools & Links */}
                  <div>
                    {/* Tools */}
                    <div className="mb-3">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60 mb-1.5">
                        Tools &amp; Tech
                      </p>
                      <div className="flex flex-wrap gap-1 max-h-[52px] overflow-hidden">
                        {project.tools.map((tool) => (
                          <span
                            key={tool}
                            className="text-[10px] px-2 py-0.5 rounded bg-muted/70 dark:bg-muted/40 text-foreground/80 border border-border/60 font-mono"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Card Footer Link */}
                    <div className="pt-2.5 border-t border-border/60 flex items-center justify-between">
                      {project.githubUrl ? (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-[#4A7C39] dark:text-[#78B05F] group-hover:gap-1.5 transition-all w-fit"
                        >
                          <span>View on GitHub</span>
                          <ArrowUpRight size={13} />
                        </a>
                      ) : (
                        <span className="text-xs text-muted-foreground/50">
                          In development
                        </span>
                      )}

                      <span className="text-[10px] font-mono text-muted-foreground/50">
                        {project.tools.length} tags
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Carousel Pagination Dots & Status */}
        <div className="flex items-center justify-between mt-6 px-1">
          <div className="flex items-center gap-1.5">
            {filteredProjects.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => scrollToProject(idx)}
                aria-label={`Jump to project ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${activeIndex === idx
                  ? "w-6 h-2 bg-[#4A7C39] dark:bg-[#78B05F]"
                  : "w-2 h-2 bg-border hover:bg-muted-foreground/40"
                  }`}
              />
            ))}
          </div>

          <span className="text-[11px] text-muted-foreground/60 flex items-center gap-1.5">
            <span>Click arrows or drag to navigate</span>
            <span>•</span>
            <span className="font-mono text-[#4A7C39] dark:text-[#78B05F]">
              0{activeIndex + 1} / 0{filteredProjects.length}
            </span>
          </span>
        </div>
      </div>
    </section>
  );
}
