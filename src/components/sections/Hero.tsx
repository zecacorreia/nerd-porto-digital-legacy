"use client";

import { m, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useRef } from "react";

import { SplitText } from "@/components/motion/SplitText";
import { useIntro } from "@/components/providers/IntroProvider";
import { Logo } from "@/components/ui/Logo";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { MeshGradient } from "@/components/ui/MeshGradient";
import { EASE_OUT_EXPO, transitions } from "@/lib/animations";
import { heroContent } from "@/lib/content";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { isReady } = useIntro();

  // 0 → hero no topo; 1 → hero saiu completamente da tela.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const giantX = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const giantY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  const enter = (delay: number) => ({
    initial: { opacity: 0, y: 30 },
    animate: isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
    transition: { ...transitions.reveal, delay },
  });

  return (
    <section
      ref={ref}
      id="topo"
      className="relative isolate h-[100svh] min-h-[640px] overflow-hidden bg-ink text-paper"
    >
      <m.div className="absolute inset-0 -z-10" style={{ scale: backgroundScale }}>
        <MeshGradient />
      </m.div>

      {/* Tipografia gigante decorativa que desliza com o scroll */}
      <m.div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[14%] -z-10 select-none whitespace-nowrap md:top-[8%]"
        style={{ x: giantX, y: giantY }}
      >
        <m.span
          className="hollow block pl-[3vw] font-display text-giant font-bold leading-none tracking-[-0.06em] text-paper/20"
          initial={{ opacity: 0, y: "20%" }}
          animate={isReady ? { opacity: 1, y: "0%" } : undefined}
          transition={{ duration: 1.6, ease: EASE_OUT_EXPO }}
        >
          NERD NERD
        </m.span>
      </m.div>

      {/* Barra superior */}
      <m.div
        className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-5 py-5 md:px-10 md:py-8"
        {...enter(0.1)}
      >
        <a href="#topo" aria-label="Porto Digital NERD — início">
          <Logo priority className="h-6 md:h-8" />
        </a>
        <span className="text-[11px] uppercase tracking-[0.25em] text-paper/60">{heroContent.eyebrow}</span>
      </m.div>

      <m.div
        className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-end px-5 pb-10 md:px-10 md:pb-16"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <SplitText
          as="h1"
          text={heroContent.title}
          highlight={["NERD,"]}
          play={isReady}
          delay={0.25}
          stagger={0.018}
          className="max-w-[17ch] font-display text-[clamp(2.5rem,6.2vw,7rem)] font-semibold leading-[0.95] tracking-[-0.035em]"
        />

        <div className="mt-8 flex flex-col gap-8 md:mt-12 md:flex-row md:items-end md:justify-between">
          <m.p className="max-w-md text-base text-paper/70 md:text-lg" {...enter(0.9)}>
            {heroContent.subtitle}
          </m.p>

          <m.div className="flex flex-wrap gap-3" {...enter(1.05)}>
            {heroContent.ctas.map((cta) => (
              <MagneticButton
                key={cta.label}
                href={cta.href}
                variant={cta.variant}
                icon={<ArrowUpRight className="h-4 w-4" aria-hidden />}
              >
                {cta.label}
              </MagneticButton>
            ))}
          </m.div>
        </div>
      </m.div>

      {/* Indicador de scroll (desktop) */}
      <m.a
        href="#numeros"
        aria-label="Rolar para o conteúdo"
        className="absolute right-10 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-3 text-paper/60 transition-colors hover:text-brand-light md:flex"
        initial={{ opacity: 0 }}
        animate={isReady ? { opacity: 1 } : undefined}
        transition={{ delay: 1.4, duration: 1 }}
      >
        <span className="text-[10px] uppercase tracking-[0.3em] [writing-mode:vertical-rl]">Role</span>
        <m.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-4 w-4" aria-hidden />
        </m.span>
      </m.a>
    </section>
  );
}
