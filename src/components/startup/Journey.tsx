"use client";

import { m, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useCallback, useRef, useState } from "react";

import { FadeIn } from "@/components/motion/FadeIn";
import { SplitText } from "@/components/motion/SplitText";
import { transitions } from "@/lib/animations";
import { useMediaQuery } from "@/lib/hooks";
import { formacaoIntro, journeyStages, type JourneyStage } from "@/lib/startup";
import { useHorizontalTrack, type HorizontalTrackMeasure } from "@/lib/useHorizontalTrack";
import { cn } from "@/lib/utils";

const SECTION_ID = "formacao-empreendedora";

/**
 * Ponto de leitura do trilho: desliza de 30% a 90% da largura da tela conforme o progresso,
 * para que as últimas etapas também sejam alcançadas quando o trilho termina.
 */
const SCAN_START = 0.3;
const SCAN_RANGE = 0.6;
const scanPosition = (progress: number, total: number, viewportWidth: number) =>
  progress * total + viewportWidth * (SCAN_START + SCAN_RANGE * progress);

function SectionIntro({ compact = false }: { compact?: boolean }) {
  return (
    <div>
      <span className="text-xs uppercase tracking-[0.12em] text-ink/50">(01) — Talentos</span>
      <SplitText
        as="h2"
        trigger="inView"
        text="Formação Empreendedora"
        highlight={["Empreendedora"]}
        className={cn(
          "mt-6 font-display font-semibold leading-[0.92] tracking-[-0.02em]",
          compact ? "text-mega" : "text-[clamp(3rem,5vw,5.75rem)]",
        )}
      />
      <p className="mt-8 max-w-md text-base text-ink/60 md:text-lg">{formacaoIntro}</p>
      <p className="mt-10 flex items-center gap-3 text-sm uppercase tracking-[0.12em] text-ink/50">
        A jornada, etapa por etapa
        {!compact && <ArrowRight className="h-4 w-4" aria-hidden />}
      </p>
    </div>
  );
}

interface StageCardProps {
  stage: JourneyStage;
  index: number;
  reached: boolean;
  className?: string;
}

function StageCard({ stage, index, reached, className }: StageCardProps) {
  return (
    <article
      className={cn(
        "flex flex-col justify-between gap-10 rounded-large p-7 transition-colors duration-700 md:p-9",
        reached ? "bg-ink text-paper" : "bg-paper-dim text-ink",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <span className={cn("font-display text-sm tabular-nums", reached ? "text-brand-light" : "text-ink/50")}>
          Etapa {String(index + 1).padStart(2, "0")}
        </span>
        {stage.phase && (
          <span
            className={cn(
              "rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors duration-700",
              reached ? "bg-brand text-paper" : "bg-ink/10 text-ink",
            )}
          >
            {stage.phase}
          </span>
        )}
      </div>
      <div>
        <h3
          lang="pt-BR"
          // Palavras longas ("Internacionalização") cabem pela escala; hífen automático é a rede de segurança.
          className="hyphens-auto break-words font-display text-[clamp(1.6rem,1.9vw,2.25rem)] font-semibold leading-[1.05] tracking-[-0.02em]"
        >
          {stage.title}
        </h3>
        <p className={cn("mt-4 text-sm md:text-base", reached ? "text-paper/65" : "text-ink/60")}>
          {stage.description}
        </p>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/* Desktop: trilho horizontal com linha de progresso                   */
/* ------------------------------------------------------------------ */

function HorizontalJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRefs = useRef<Array<HTMLLIElement | null>>([]);
  const lineRef = useRef<HTMLSpanElement>(null);
  // Geometria medida: onde a linha começa no trilho, sua largura e o percurso total.
  const geometry = useRef({ total: 1, viewportWidth: 0, lineStart: 0, lineWidth: 1 });
  // Progresso (0..1) em que o ponto de leitura alcança o nó de cada etapa.
  const [thresholds, setThresholds] = useState<number[]>([]);
  const [reachedCount, setReachedCount] = useState(0);

  const measureStages = useCallback(({ total, viewportWidth }: HorizontalTrackMeasure) => {
    const line = lineRef.current;
    const lineStart = line ? (line.offsetParent as HTMLElement | null)?.offsetLeft ?? 0 : 0;
    geometry.current = { total, viewportWidth, lineStart, lineWidth: Math.max(line?.offsetWidth ?? 1, 1) };
    setThresholds(
      stageRefs.current.map((el) =>
        // Resolve scanPosition(p) = posição do nó (offsetLeft relativo à <ol> + recuo left-8 + raio).
        el
          ? Math.min(
              Math.max(
                (lineStart + el.offsetLeft + 39 - viewportWidth * SCAN_START) / (total + viewportWidth * SCAN_RANGE),
                0,
              ),
              1,
            )
          : 1,
      ),
    );
  }, []);

  const { x, scrollYProgress, sectionHeight } = useHorizontalTrack(sectionRef, trackRef, {
    onMeasure: measureStages,
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setReachedCount(thresholds.filter((t) => value >= t).length);
  });

  // Preenchimento = ponto de leitura ao longo da linha (chega a cada nó junto com ele).
  const lineFill = useTransform(scrollYProgress, (progress) => {
    const { total, viewportWidth, lineStart, lineWidth } = geometry.current;
    const scan = scanPosition(progress, total, viewportWidth);
    return Math.min(Math.max((scan - lineStart) / lineWidth, 0), 1);
  });

  return (
    <section
      ref={sectionRef}
      id={SECTION_ID}
      aria-label="Formação Empreendedora"
      className="relative bg-paper text-ink"
      style={{ height: sectionHeight }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <m.div ref={trackRef} className="flex h-full w-max items-center will-change-transform" style={{ x }}>
          <div className="flex h-full w-[min(44rem,48vw)] shrink-0 items-center pl-10 pr-[5vw]">
            <SectionIntro />
          </div>

          <ol className="relative flex h-full items-center gap-6 pr-[12vw]">
            {/* Linha base + preenchimento ligado ao scroll */}
            <span
              ref={lineRef}
              aria-hidden
              className="absolute left-0 right-[12vw] top-[calc(50%-16rem)] h-px bg-ink/15"
            />
            <m.span
              aria-hidden
              className="absolute left-0 right-[12vw] top-[calc(50%-16rem)] h-px origin-left bg-brand"
              style={{ scaleX: lineFill }}
            />
            {journeyStages.map((stage, index) => {
              const reached = index < reachedCount;
              return (
                <li
                  key={stage.id}
                  ref={(el) => {
                    stageRefs.current[index] = el;
                  }}
                  className="relative flex h-[32rem] w-[min(24rem,28vw)] shrink-0 flex-col pt-12"
                >
                  {/* Nó da linha do tempo */}
                  <m.span
                    aria-hidden
                    className="absolute -top-[7px] left-8 h-3.5 w-3.5 rounded-full border-2 border-brand"
                    animate={{ backgroundColor: reached ? "#1450ef" : "#f7fcfb", scale: reached ? 1.25 : 1 }}
                    transition={transitions.fast}
                  />
                  <StageCard stage={stage} index={index} reached={reached} className="h-full" />
                </li>
              );
            })}
          </ol>
        </m.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Mobile/tablet: linha do tempo vertical desenhada pelo scroll        */
/* ------------------------------------------------------------------ */

function VerticalJourney() {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 70%", "end 70%"] });
  const [reachedCount, setReachedCount] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setReachedCount(Math.min(journeyStages.length, Math.floor(value * journeyStages.length + 0.15)));
  });

  return (
    <section id={SECTION_ID} aria-label="Formação Empreendedora" className="bg-paper px-5 py-24 text-ink md:px-10">
      <FadeIn>
        <SectionIntro compact />
      </FadeIn>
      <ol ref={listRef} className="relative mt-14 flex flex-col gap-5 pl-8">
        <span aria-hidden className="absolute bottom-0 left-[0.4rem] top-0 w-px bg-ink/15" />
        <m.span
          aria-hidden
          className="absolute bottom-0 left-[0.4rem] top-0 w-px origin-top bg-brand"
          style={{ scaleY: scrollYProgress }}
        />
        {journeyStages.map((stage, index) => {
          const reached = index < reachedCount;
          return (
            <li key={stage.id} className="relative">
              <span
                aria-hidden
                className={cn(
                  "absolute -left-8 top-8 h-3.5 w-3.5 rounded-full border-2 border-brand transition-colors duration-500",
                  reached ? "bg-brand" : "bg-paper",
                )}
              />
              <StageCard stage={stage} index={index} reached={reached} />
            </li>
          );
        })}
      </ol>
    </section>
  );
}

export function Journey() {
  const isWide = useMediaQuery("(min-width: 1024px)");
  return isWide ? <HorizontalJourney /> : <VerticalJourney />;
}
