"use client";

import { useEffect, ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  Variants,
} from "framer-motion";

export function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let lenis: any;
    let raf: number;

    import("lenis").then(({ default: Lenis }) => {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      const loop = (time: number) => {
        lenis.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);

      const onClick = (e: MouseEvent) => {
        const a = (e.target as Element).closest('a[href^="#"]');
        if (!a) return;
        const id = a.getAttribute("href");
        if (!id || id.length < 2) return;
        const el = document.querySelector(id);
        if (!el) return;
        e.preventDefault();
        const scrollToCenter = (content: HTMLElement, screenPosition = 0.5) => {
          const contentTop = content.getBoundingClientRect().top + window.scrollY;
          const contentH   = content.offsetHeight;
          const viewH      = window.innerHeight;
          const target = contentTop + contentH / 2 - viewH * screenPosition;
          lenis.scrollTo(Math.max(0, target), { duration: 1.4 });
        };

        if (id === "#about") {
          const content = el.querySelector<HTMLElement>("[data-about-content]");
          content ? scrollToCenter(content) : lenis.scrollTo(el, { offset: -80, duration: 1.4 });
        } else if (id === "#work") {
          const content = el.querySelector<HTMLElement>("[data-work-content]");
          content ? scrollToCenter(content) : lenis.scrollTo(el, { offset: -80, duration: 1.4 });
        } else if (id === "#contact") {
          lenis.scrollTo(lenis.limit, { duration: 1.4 });
        } else {
          scrollToCenter(el as HTMLElement);
        }
      };
      document.addEventListener("click", onClick);

      return () => {
        cancelAnimationFrame(raf);
        document.removeEventListener("click", onClick);
        lenis.destroy();
      };
    });

    return () => {
      if (raf) cancelAnimationFrame(raf);
      if (lenis) lenis.destroy();
    };
  }, []);

  return null;
}

export function Reveal({
  children,
  delay = 0,
  y = 32,
  className = "",
  amount = 0.25,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  amount?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function MaskLines({
  lines,
  className = "",
  delay = 0,
  as: Tag = "h2",
}: {
  lines: string[];
  className?: string;
  delay?: number;
  as?: keyof React.JSX.IntrinsicElements;
}) {
  const MotionTag = motion[Tag as keyof typeof motion] as any;
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      variants={{
        visible: { transition: { staggerChildren: 0.1, delayChildren: delay } },
      }}
    >
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span
            className="block"
            variants={{
              hidden:  { y: "105%", opacity: 0 },
              visible: { y: "0%",   opacity: 1, transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] } },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

export function WordReveal({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const words = text.split(" ");
  return (
    <motion.p
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      variants={{
        visible: { transition: { staggerChildren: 0.04, delayChildren: delay } },
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.25em]"
          variants={{
            hidden:  { opacity: 0, y: 16 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
}

export function StaggerReveal({
  children,
  className = "",
  stagger = 0.09,
  delay = 0,
  amount = 0.15,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  amount?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount }}
      variants={{
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
        hidden:  { transition: { staggerChildren: stagger / 2, staggerDirection: -1 } },
      }}
    >
      {children}
    </motion.div>
  );
}

export const staggerChild: Variants = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export function ParallaxY({
  children,
  speed = 0.3,
  className = "",
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 800 * speed]);
  return (
    <motion.div className={className} style={{ y }}>
      {children}
    </motion.div>
  );
}
