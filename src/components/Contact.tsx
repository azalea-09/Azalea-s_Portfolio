import { Reveal, MaskLines, WordReveal, StaggerReveal, staggerChild } from "./ScrollReveal";
import { motion } from "framer-motion";

export function Contact() {
  const links = [
    { icon: "🐙", label: "GitHub", handle: "azalea-09", href: "https://github.com/azalea-09" },
    { icon: "✉️", label: "Email", handle: "valentinakriswandaru@gmail.com", href: "mailto:valentinakriswandaru@gmail.com" },
    { icon: "💼", label: "LinkedIn", handle: "valentina-azalea", href: "https://www.linkedin.com/in/valentina-azalea-4b899730b/" },
  ];

  return (
    <section id="contact" className="mt-20 md:mt-28 pt-28 pb-40 md:pb-56 px-6 md:px-16 text-center">
      <div data-contact-content="true">
      <Reveal y={16}>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#4A7C39] dark:text-[#78B05F] mb-4 flex items-center justify-center gap-2">
          <span className="block w-5 h-px bg-[#4A7C39] dark:bg-[#78B05F]" /> Contact
        </p>
      </Reveal>

      <MaskLines
        lines={["Let's Connect 🌿"]}
        className="font-[family-name:var(--font-display)] text-5xl md:text-7xl font-semibold mb-4"
        delay={0.05}
      />

      <WordReveal
        text="Open to internship opportunities, collaborations, or just a friendly hello!"
        className="text-muted-foreground text-lg mb-12 max-w-xl mx-auto"
        delay={0.1}
      />

      <StaggerReveal className="flex flex-wrap gap-4 justify-center" stagger={0.09} delay={0.1}>
        {links.map(({ icon, label, handle, href }) => (
          <motion.a
            key={label}
            variants={staggerChild}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-6 py-4 rounded-full border border-border bg-card
              hover:bg-[#4A7C39] hover:text-white hover:border-[#4A7C39]
              transition-all duration-200 hover:-translate-y-1
              hover:shadow-[0_8px_24px_rgba(74,124,57,0.35)] group"
          >
            <span className="text-xl">{icon}</span>
            <div className="text-left">
              <p className="text-sm font-semibold">{label}</p>
              <p className="text-xs text-muted-foreground group-hover:text-white/80">{handle}</p>
            </div>
          </motion.a>
        ))}
      </StaggerReveal>
      </div>

      <Reveal delay={0.2} y={20}>
        <div className="text-5xl mt-20 animate-bounce">🐱</div>
        <footer className="mt-8 text-sm text-muted-foreground">
          ✦ Valentina Azalea Kanaya Kriswandaru · CS @ BINUS University · Built with 🌿 &amp; 🐾
        </footer>
      </Reveal>
    </section>
  );
}
