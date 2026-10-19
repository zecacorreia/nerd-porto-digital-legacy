"use client";

import { m, useMotionValueEvent, useTransform, type MotionValue } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useCallback, useRef, useState } from "react";

import { FadeIn } from "@/components/motion/FadeIn";
import { SplitText } from "@/components/motion/SplitText";
import { MagneticButton, type MagneticVariant } from "@/components/ui/MagneticButton";
import { PillarCard } from "@/components/ui/PillarCard";
import { paths, type Path, type PathId } from "@/lib/content";
import { useMediaQuery } from "@/lib/hooks";
import { useHorizontalTrack, type HorizontalTrackMeasure } from "@/lib/useHorizontalTrack";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Tema por caminho                                                    */
/* ------------------------------------------------------------------ */

interface PathTheme {
  panel: string;
  muted: string;
  accent: string;
  outline: string;
  button: MagneticVariant;
}

const PATH_THEMES: Record<PathId, PathTheme> = {
  empresas: {
    panel: "bg-paper text-ink",
    muted: "text-ink/60",
    accent: "text-brand",
    outline: "text-ink/10",
    button: "dark",
  },
  startups: {
    panel: "bg-brand text-paper",
    muted: "text-paper/75",
    accent: "text-ink",
    outline: "text-paper/15",
    button: "primary",
  },
};

const SECTION_TITLE = "Dois caminhos, um ecossistema.";

/* ------------------------------------------------------------------ */
/* Peças compartilhadas                                                */
/* ------------------------------------------------------------------ */

interface PathHeaderProps {
  path: Path;
  className?: string;
}

function PathHeader({ path, className }: PathHeaderProps) {
  const theme = PATH_THEMES[path.id];
  return (
    <div className={cn("flex flex-col", className)}>
      <span className={cn("text-xs uppercase tracking-[0.25em]", theme.muted)}>{path.eyebrow}</span>
      <h3 className="mt-6 font-display text-[clamp(3.25rem,8vw,9rem)] font-semibold leading-[0.88] tracking-[-0.045em]">
        {path.title.split(" ")[0]} <span className={theme.accent}>{path.title.split(" ").slice(1).join(" ")}</span>
      </h3>
      <p className={cn("mt-8 max-w-md text-base md:text-lg", theme.muted)}>{path.intro}</p>
      <div className="mt-10">
        <MagneticButton
          href={path.cta.href}
          variant={theme.button}
          icon={<ArrowUpRight className="h-4 w-4" aria-hidden />}
        >
          {path.cta.label}
        </MagneticButton>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Desktop: scroll vertical vira trilho horizontal                     */
/* ------------------------------------------------------------------ */

type ActivePanel = "intro" | PathId;

interface ProgressHudProps {
  progress: MotionValue<number>;
  active: ActivePanel;
}

function ProgressHud({ progress, active }: ProgressHudProps) {
  // Cor escolhida pelo painel ativo (em vez de mix-blend, que recompõe a tela a cada frame do trilho).
  const onLight = active === "empresas";
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-center gap-6 px-10 pb-8 transition-colors duration-500",
        onLight ? "text-ink" : "text-paper",
      )}
    >
      {paths.map((path) => (
        <span
          key={path.id}
          className={cn(
            "text-xs uppercase tracking-[0.25em] transition-opacity duration-500",
            active === path.id ? "opacity-100" : "opacity-40",
          )}
        >
          {path.title}
        </span>
      ))}
      <div className="h-px flex-1 bg-current/30">
        <m.div className="h-full origin-left bg-current" style={{ scaleX: progress }} />
      </div>
    </div>
  );
}

function HorizontalPaths() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const groupRefs = useRef<Partial<Record<PathId, HTMLDivElement | null>>>({});

  // Fração do progresso em que cada caminho ocupa o centro da tela.
  const [boundaries, setBoundaries] = useState<Record<PathId, number>>({ empresas: 0.2, startups: 0.6 });
  const [active, setActive] = useState<ActivePanel>("intro");

  const measureBoundaries = useCallback(({ total, viewportWidth }: HorizontalTrackMeasure) => {
    const toFraction = (id: PathId) => {
      const el = groupRefs.current[id];
      return el ? Math.min(Math.max((el.offsetLeft - viewportWidth / 2) / total, 0), 1) : 0;
    };
    setBoundaries({ empresas: toFraction("empresas"), startups: toFraction("startups") });
  }, []);

  const { x, scrollYProgress, sectionHeight } = useHorizontalTrack(sectionRef, trackRef, {
    onMeasure: measureBoundaries,
  });

  // Texto gigante de fundo corre em sentido oposto (parallax dentro do trilho).
  const outlineX = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const next: ActivePanel =
      value >= boundaries.startups ? "startups" : value >= boundaries.empresas ? "empresas" : "intro";
    setActive(next);
  });

  return (
    <section
      ref={sectionRef}
      id="caminhos"
      aria-label="Dois caminhos: para empresas e para startups"
      className="relative bg-ink"
      style={{ height: sectionHeight }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <m.div ref={trackRef} className="flex h-full w-max will-change-transform" style={{ x }}>
          {/* Painel de abertura */}
          <div className="relative flex h-full w-screen shrink-0 flex-col justify-center bg-ink px-10 text-paper">
            <span className="text-xs uppercase tracking-[0.25em] text-paper/50">(03) — Dois caminhos</span>
            <SplitText
              as="h2"
              trigger="inView"
              text={SECTION_TITLE}
              highlight={["um", "ecossistema."]}
              className="mt-6 max-w-[12ch] font-display text-[clamp(3.5rem,9vw,10rem)] font-semibold leading-[0.9] tracking-[-0.045em]"
            />
            <FadeIn delay={0.4} className="mt-12 flex items-center gap-4 text-sm uppercase tracking-[0.2em] text-paper/60">
              Role para explorar
              <m.span
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowRight className="h-5 w-5" aria-hidden />
              </m.span>
            </FadeIn>
          </div>

          {paths.map((path) => {
            const theme = PATH_THEMES[path.id];
            return (
              <div
                key={path.id}
                ref={(el) => {
                  groupRefs.current[path.id] = el;
                }}
                className={cn("relative flex h-full shrink-0 items-center gap-6 py-24 pl-[8vw] pr-[10vw]", theme.panel)}
              >
                <m.span
                  aria-hidden
                  className={cn(
                    "hollow pointer-events-none absolute bottom-[-0.12em] left-0 select-none whitespace-nowrap font-display text-[22vw] font-bold uppercase leading-none tracking-[-0.06em]",
                    theme.outline,
                  )}
                  style={{ x: outlineX }}
                >
                  {path.id}
                </m.span>

                <PathHeader path={path} className="relative w-[min(40rem,42vw)] shrink-0 pr-[4vw]" />

                {path.pillars.map((pillar, index) => (
                  <PillarCard
                    key={pillar.id}
                    pillar={pillar}
                    pathId={path.id}
                    index={index}
                    className="h-[min(34rem,62vh)] w-[min(26rem,30vw)] shrink-0"
                  />
                ))}
              </div>
            );
          })}
        </m.div>

        <ProgressHud progress={scrollYProgress} active={active} />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Mobile/tablet: cards empilhados (sticky stack)                      */
/* ------------------------------------------------------------------ */

function StackedPaths() {
  return (
    <section id="caminhos" aria-label="Dois caminhos: para empresas e para startups" className="bg-ink">
      <div className="px-5 py-24 text-paper md:px-10">
        <span className="text-xs uppercase tracking-[0.25em] text-paper/50">(03) — Dois caminhos</span>
        <SplitText
          as="h2"
          trigger="inView"
          text={SECTION_TITLE}
          highlight={["um", "ecossistema."]}
          className="mt-6 font-display text-mega font-semibold leading-[0.92] tracking-[-0.04em]"
        />
      </div>

      {paths.map((path) => (
        <div key={path.id} className={cn("px-5 pb-[20vh] pt-20 md:px-10", PATH_THEMES[path.id].panel)}>
          <FadeIn>
            <PathHeader path={path} />
          </FadeIn>
          <ul className="mt-14 flex flex-col gap-6">
            {path.pillars.map((pillar, index) => (
              // Cada card gruda um pouco abaixo do anterior → efeito de pilha.
              <li key={pillar.id} className="sticky" style={{ top: `${5 + index * 1.5}rem` }}>
                <PillarCard pillar={pillar} pathId={path.id} index={index} className="h-[min(22rem,60svh)]" />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Seção                                                               */
/* ------------------------------------------------------------------ */

export function TwoPaths() {
  // O trilho horizontal só faz sentido em telas largas; abaixo disso, pilha vertical.
  const isWide = useMediaQuery("(min-width: 1024px)");
  return isWide ? <HorizontalPaths /> : <StackedPaths />;
}
