"use client";

import { m, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";

import { MarcoZero } from "@/components/decor/Decor";
import { FadeIn } from "@/components/motion/FadeIn";
import { Parallax } from "@/components/motion/Parallax";
import { SplitText } from "@/components/motion/SplitText";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { lineGrow, viewportOnce } from "@/lib/animations";
import { ecosystemStats, portoDigital, type EcosystemStat } from "@/lib/content";
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
  {
    id: "s1",
    kind: "ring",
    position: "left-[6%] top-[12%]",
    className: "h-24 w-24 border-brand md:h-40 md:w-40",
    offset: 140,
    float: 7,
  },
  {
    id: "s2",
    kind: "dot",
    position: "right-[12%] top-[8%]",
    className: "h-5 w-5 bg-signal",
    offset: -90,
    float: 5,
  },
  {
    id: "s3",
    kind: "plus",
    position: "right-[6%] top-[42%]",
    className: "text-brand",
    offset: 200,
    float: 6,
  },
  {
    id: "s4",
    kind: "square",
    position: "left-[42%] top-[30%] hidden md:block",
    className: "h-10 w-10 border-ink/30",
    offset: -160,
    float: 8,
  },
  {
    id: "s5",
    kind: "dot",
    position: "bottom-[18%] left-[18%]",
    className: "h-3 w-3 bg-brand",
    offset: 120,
    float: 4.5,
  },
  {
    id: "s6",
    kind: "ring",
    position: "bottom-[10%] right-[24%] hidden md:block",
    className: "h-16 w-16 border-signal/70",
    offset: -120,
    float: 6.5,
  },
];

function ShapeGlyph({
  kind,
  className,
}: Pick<FloatingShape, "kind" | "className">) {
  switch (kind) {
    case "ring":
      return <span className={cn("block rounded-full border-2", className)} />;
    case "dot":
      return <span className={cn("block rounded-full", className)} />;
    case "square":
      return <span className={cn("block rotate-12 border-2", className)} />;
    case "plus":
      return (
        <span
          className={cn(
            "block font-display text-6xl font-light leading-none",
            className,
          )}
        >
          +
        </span>
      );
  }
}

function FloatingShapes() {
  const ref = useRef<HTMLDivElement>(null);
  // Flutuação contínua só enquanto a seção está na tela.
  const playing = useInView(ref);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10"
    >
      {SHAPES.map((shape) => (
        <div key={shape.id} className={cn("absolute", shape.position)}>
          <Parallax offset={shape.offset}>
            <m.div
              animate={
                playing ? { y: [0, -16, 0], rotate: [0, 8, 0] } : undefined
              }
              transition={{
                duration: shape.float,
                repeat: Infinity,
                ease: "easeInOut",
              }}
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
}

function StatItem({ stat, index }: StatItemProps) {
  return (
    <m.li
      className="relative pt-6"
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
      <span className="text-xs uppercase tracking-[0.12em] text-ink/50">
        {String(index + 1).padStart(2, "0")}
      </span>

      <p className="mt-6 flex flex-wrap items-baseline font-display text-[clamp(3.5rem,7vw,7rem)] font-semibold leading-[0.9] tracking-[-0.02em]">
        <AnimatedCounter value={stat.value} delay={index * 0.1} />
        {stat.suffix && (
          <span className="ml-2 text-[0.35em] tracking-tight text-brand">
            {stat.suffix}
          </span>
        )}
      </p>

      <FadeIn delay={0.2 + index * 0.08} distance={20}>
        <p className="mt-5 flex max-w-xs flex-wrap gap-x-2 text-sm text-ink/60 md:text-base">
          {stat.labelParts
            ? stat.labelParts.map((part, partIndex) => (
                <span key={part} className="inline-flex items-center gap-2">
                  {partIndex > 0 && (
                    <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-brand" />
                  )}
                  {part}
                </span>
              ))
            : stat.label}
        </p>
      </FadeIn>
    </m.li>
  );
}

/* ------------------------------------------------------------------ */
/* Seção                                                               */
/* ------------------------------------------------------------------ */

export function EcosystemNumbers() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Faixa tipográfica que desliza em sentidos opostos conforme o scroll.
  const marqueeA = useTransform(scrollYProgress, [0, 1], ["5%", "-35%"]);
  const marqueeB = useTransform(scrollYProgress, [0, 1], ["-35%", "5%"]);

  return (
    <section
      ref={ref}
      id="porto-digital"
      aria-label="Porto Digital"
      className="relative isolate scroll-mt-20 overflow-hidden bg-paper py-24 text-ink md:py-40"
    >
      <FloatingShapes />

      {/* Marco Zero girando, sangrando pela direita: textura de marca atrás dos números */}
      <MarcoZero
        duration={45}
        className="absolute -right-[18vw] top-[14%] -z-10 size-[clamp(16rem,42vw,40rem)] opacity-30 mix-blend-multiply md:-right-[10vw] md:opacity-40"
      />

      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <header className="grid gap-8 md:grid-cols-12">
          <FadeIn className="md:col-span-3">
            <span className="text-xs uppercase tracking-[0.12em] text-ink/50">
              (01) — Porto Digital
            </span>
          </FadeIn>
          <div className="md:col-span-9">
            <SplitText
              as="h2"
              trigger="inView"
              text={portoDigital.title}
              highlight={portoDigital.highlight}
              highlightClassName="text-brand"
              className="font-display text-[clamp(2.5rem,6vw,6.5rem)] font-semibold leading-[0.95] tracking-[-0.02em]"
            />
          </div>
        </header>

        {/* Texto de apoio + CTA, alinhados à coluna do título */}
        <div className="mt-12 grid gap-8 md:mt-16 md:grid-cols-12">
          <div className="flex flex-col gap-6 md:col-span-6 md:col-start-4 md:text-lg">
            {portoDigital.paragraphs.map((paragraph, index) => (
              <FadeIn key={paragraph} delay={0.1 + index * 0.1} distance={20}>
                <p className="text-ink/70">{paragraph}</p>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.3} className="md:col-span-3 md:flex md:items-end md:justify-end">
            <MagneticButton
              href={portoDigital.cta.href}
              external
              variant="dark"
              icon={<ArrowUpRight className="h-4 w-4" aria-hidden />}
            >
              {portoDigital.cta.label}
            </MagneticButton>
          </FadeIn>
        </div>

        <ul className="mt-20 grid gap-x-8 gap-y-14 sm:grid-cols-2 md:mt-28 lg:grid-cols-4">
          {ecosystemStats.map((stat, index) => (
            <StatItem key={stat.id} stat={stat} index={index} />
          ))}
        </ul>
      </div>

      <div aria-hidden className="mt-24 select-none overflow-hidden md:mt-40">
        <m.p
          className="whitespace-nowrap font-display text-[clamp(3rem,10vw,10rem)] font-bold uppercase leading-none tracking-[-0.02em]"
          style={{ x: marqueeA }}
        >
          Recife · Brasil · Portugal · Recife · Brasil · Portugal
        </m.p>
        <m.p
          className="hollow whitespace-nowrap font-display text-[clamp(3rem,10vw,10rem)] font-bold uppercase leading-none tracking-[-0.02em] text-ink/40"
          style={{ x: marqueeB }}
        >
          Empresas · Startups · Talentos · Empresas · Startups · Talentos
        </m.p>
      </div>
    </section>
  );
}
