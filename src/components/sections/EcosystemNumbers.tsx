"use client";

import { m, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { FadeIn } from "@/components/motion/FadeIn";
import { Parallax } from "@/components/motion/Parallax";
import { SplitText } from "@/components/motion/SplitText";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { lineGrow, viewportOnce } from "@/lib/animations";
import { ecosystemStats, type EcosystemStat } from "@/lib/content";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Elementos flutuantes de fundo                                       */
/* ------------------------------------------------------------------ */

type ShapeKind = "ring" | "dot" | "plus" | "square";

interface FloatingShape {
  id: string;
  kind: ShapeKind;
  /** Posição absoluta (e visibilidade responsiva) do wrapper. */
  position: string;
  /** Aparência do glifo. */
  className: string;
  /** Intensidade do parallax em px. */
  offset: number;
  /** Duração da flutuação contínua em s. */
  float: number;
}

const SHAPES: readonly FloatingShape[] = [
  { id: "s1", kind: "ring", position: "left-[6%] top-[12%]", className: "h-24 w-24 border-brand md:h-40 md:w-40", offset: 140, float: 7 },
  { id: "s2", kind: "dot", position: "right-[12%] top-[8%]", className: "h-5 w-5 bg-signal", offset: -90, float: 5 },
  { id: "s3", kind: "plus", position: "right-[6%] top-[42%]", className: "text-brand", offset: 200, float: 6 },
  { id: "s4", kind: "square", position: "left-[42%] top-[30%] hidden md:block", className: "h-10 w-10 border-ink/30", offset: -160, float: 8 },
  { id: "s5", kind: "dot", position: "bottom-[18%] left-[18%]", className: "h-3 w-3 bg-brand", offset: 120, float: 4.5 },
  { id: "s6", kind: "ring", position: "bottom-[10%] right-[24%] hidden md:block", className: "h-16 w-16 border-signal/70", offset: -120, float: 6.5 },
];

function ShapeGlyph({ kind, className }: Pick<FloatingShape, "kind" | "className">) {
  switch (kind) {
    case "ring":
      return <span className={cn("block rounded-full border-2", className)} />;
    case "dot":
      return <span className={cn("block rounded-full", className)} />;
    case "square":
      return <span className={cn("block rotate-12 border-2", className)} />;
    case "plus":
      return <span className={cn("block font-display text-6xl font-light leading-none", className)}>+</span>;
  }
}

function FloatingShapes() {
  const ref = useRef<HTMLDivElement>(null);
  // Flutuação contínua só enquanto a seção está na tela.
  const playing = useInView(ref);

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      {SHAPES.map((shape) => (
          <div key={shape.id} className={cn("absolute", shape.position)}>
            <Parallax offset={shape.offset}>
              <m.div
                animate={playing ? { y: [0, -16, 0], rotate: [0, 8, 0] } : undefined}
                transition={{ duration: shape.float, repeat: Infinity, ease: "easeInOut" }}
              >
                <ShapeGlyph kind={shape.kind} className={shape.className} />
              </m.div>
            </Parallax>
          </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Card de estatística                                                 */
/* ------------------------------------------------------------------ */

interface StatItemProps {
  stat: EcosystemStat;
  index: number;
  featured: boolean;
}

function StatItem({ stat, index, featured }: StatItemProps) {
  return (
    <m.li
      className={cn("relative pt-6", featured ? "md:col-span-3" : "md:col-span-2")}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <m.span
        aria-hidden
        className="absolute inset-x-0 top-0 h-px origin-left bg-ink/25"
        variants={lineGrow}
        custom={index * 0.08}
      />
      <div className="flex items-start justify-between text-xs uppercase tracking-[0.2em] text-ink/50">
        <span>{String(index + 1).padStart(2, "0")}</span>
        <span>{stat.label}</span>
      </div>

      <p
        className={cn(
          "mt-6 flex items-baseline font-display font-semibold leading-[0.85] tracking-[-0.05em]",
          featured ? "text-[clamp(5rem,14vw,13rem)]" : "text-[clamp(4rem,10vw,9rem)]",
        )}
      >
        {stat.prefix && <span className="text-[0.4em]">{stat.prefix}</span>}
        <AnimatedCounter value={stat.value} delay={index * 0.1} />
        {stat.suffix && <span className="ml-2 text-[0.35em] tracking-tight text-brand">{stat.suffix}</span>}
      </p>

      <FadeIn delay={0.2 + index * 0.08} distance={20}>
        <p className="mt-6 max-w-xs text-sm text-ink/60 md:text-base">{stat.description}</p>
      </FadeIn>
    </m.li>
  );
}

/* ------------------------------------------------------------------ */
/* Seção                                                               */
/* ------------------------------------------------------------------ */

export function EcosystemNumbers() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // Faixa tipográfica que desliza em sentidos opostos conforme o scroll.
  const marqueeA = useTransform(scrollYProgress, [0, 1], ["5%", "-35%"]);
  const marqueeB = useTransform(scrollYProgress, [0, 1], ["-35%", "5%"]);

  return (
    <section
      ref={ref}
      id="numeros"
      aria-label="Números do ecossistema"
      className="relative isolate overflow-hidden bg-paper py-24 text-ink md:py-40"
    >
      <FloatingShapes />

      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <header className="grid gap-8 md:grid-cols-12">
          <FadeIn className="md:col-span-3">
            <span className="text-xs uppercase tracking-[0.25em] text-ink/50">(01) — Ecossistema</span>
          </FadeIn>
          <div className="md:col-span-9">
            <SplitText
              as="h2"
              trigger="inView"
              text="Um ecossistema que não para de crescer."
              highlight={["crescer."]}
              highlightClassName="text-brand"
              className="font-display text-mega font-semibold leading-[0.92] tracking-[-0.04em]"
            />
          </div>
        </header>

        <ul className="mt-20 grid gap-x-8 gap-y-16 md:mt-32 md:grid-cols-6">
          {ecosystemStats.map((stat, index) => (
            <StatItem key={stat.id} stat={stat} index={index} featured={index < 2} />
          ))}
        </ul>
      </div>

      <div aria-hidden className="mt-24 select-none overflow-hidden md:mt-40">
        <m.p
          className="whitespace-nowrap font-display text-[clamp(3rem,10vw,10rem)] font-bold uppercase leading-none tracking-[-0.04em]"
          style={{ x: marqueeA }}
        >
          Recife · Brasil · Portugal · Recife · Brasil · Portugal
        </m.p>
        <m.p
          className="hollow whitespace-nowrap font-display text-[clamp(3rem,10vw,10rem)] font-bold uppercase leading-none tracking-[-0.04em] text-ink/40"
          style={{ x: marqueeB }}
        >
          Inovação · Negócios · Talentos · Inovação · Negócios · Talentos
        </m.p>
      </div>
    </section>
  );
}
