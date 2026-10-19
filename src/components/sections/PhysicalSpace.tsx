"use client";

import { AnimatePresence, m, useInView } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { FadeIn } from "@/components/motion/FadeIn";
import { SplitText } from "@/components/motion/SplitText";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { SpaceVisual } from "@/components/ui/SpaceVisual";
import { transitions } from "@/lib/animations";
import { spaceAddress, spaceFacts, spaces } from "@/lib/content";

/** Intervalo do autoplay (ms) — roda só até a primeira interação do usuário. */
const AUTOPLAY_MS = 4500;

export function PhysicalSpace() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.4 });
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const autoplay = isInView && !hasInteracted;

  useEffect(() => {
    if (!autoplay) return;
    const id = window.setInterval(() => setActiveIndex((i) => (i + 1) % spaces.length), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [autoplay]);

  function select(index: number) {
    setHasInteracted(true);
    setActiveIndex(index);
  }

  const active = spaces[activeIndex] ?? spaces[0]!;

  return (
    <section
      ref={sectionRef}
      id="espaco"
      aria-label="O espaço físico"
      className="relative isolate overflow-hidden bg-ink text-paper lg:h-screen lg:min-h-[760px]"
    >
      {/* Legibilidade do texto sobre o visual (desktop) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-[5] hidden bg-gradient-to-r from-ink/90 via-ink/35 to-ink/60 lg:block"
      />

      <div className="mx-auto grid h-full max-w-[1600px] gap-12 px-5 py-24 md:px-10 lg:grid-cols-12 lg:py-16">
        {/* Coluna esquerda: título + números */}
        <div className="flex flex-col justify-between gap-12 lg:col-span-6">
          <div>
            <FadeIn>
              <span className="text-xs uppercase tracking-[0.25em] text-paper/50">(04) — O espaço</span>
            </FadeIn>
            <SplitText
              as="h2"
              trigger="inView"
              text="Um prédio inteiro no coração do Recife."
              highlight={["Recife."]}
              className="mt-6 max-w-[13ch] font-display text-mega font-semibold leading-[0.92] tracking-[-0.04em]"
            />
          </div>

          <dl className="grid grid-cols-2 gap-8 md:grid-cols-3">
            {spaceFacts.map((fact, index) => (
              <FadeIn key={fact.id} delay={index * 0.1} distance={20} className="border-t border-paper/20 pt-4">
                <dt className="sr-only">{fact.label}</dt>
                <dd>
                  {fact.value !== undefined ? (
                    <span className="flex items-baseline font-display text-5xl font-semibold tracking-[-0.04em] md:text-6xl">
                      <AnimatedCounter value={fact.value} delay={index * 0.15} />
                      {fact.suffix && <span className="ml-1 text-[0.45em] text-brand-light">{fact.suffix}</span>}
                    </span>
                  ) : (
                    <MapPin className="h-10 w-10 text-brand-light md:h-12 md:w-12" aria-hidden />
                  )}
                  <span className="mt-2 block text-sm text-paper/60">{fact.label}</span>
                </dd>
              </FadeIn>
            ))}
          </dl>
        </div>

        {/* Visual: caixa no mobile, fundo de tela inteira no desktop */}
        <SpaceVisual
          space={active}
          className="aspect-[4/5] rounded-3xl md:aspect-[16/10] lg:absolute lg:inset-0 lg:-z-10 lg:aspect-auto lg:rounded-none"
        />

        {/* Coluna direita: lista de ambientes */}
        <div className="flex flex-col justify-center lg:col-span-5 lg:col-start-8">
          <ul>
            {spaces.map((space, index) => {
              const isActive = index === activeIndex;
              return (
                <li key={space.id}>
                  <button
                    type="button"
                    aria-pressed={isActive}
                    onMouseEnter={() => select(index)}
                    onFocus={() => select(index)}
                    onClick={() => select(index)}
                    className="relative flex w-full items-center gap-5 border-t border-paper/15 py-5 text-left md:py-6"
                  >
                    {/* Linha ativa: enche no ritmo do autoplay, ou de uma vez ao interagir */}
                    {isActive && (
                      <m.span
                        key={`${space.id}-${autoplay ? "auto" : "manual"}`}
                        aria-hidden
                        className="absolute -top-px left-0 h-px w-full origin-left bg-brand-light"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={
                          autoplay ? { duration: AUTOPLAY_MS / 1000, ease: "linear" } : transitions.reveal
                        }
                      />
                    )}
                    <span className="w-6 font-display text-sm tabular-nums text-paper/40">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <m.span
                      className="font-display text-[clamp(1.75rem,3.6vw,3.25rem)] font-semibold leading-none tracking-[-0.03em]"
                      animate={{ x: isActive ? 12 : 0, opacity: isActive ? 1 : 0.4 }}
                      transition={transitions.fast}
                    >
                      {space.name}
                    </m.span>
                    <m.span
                      className="ml-auto text-brand-light"
                      animate={{ opacity: isActive ? 1 : 0, rotate: isActive ? 0 : -45 }}
                      transition={transitions.fast}
                    >
                      <ArrowUpRight className="h-6 w-6" aria-hidden />
                    </m.span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Legenda do ambiente ativo — área fixa para a lista não pular */}
          <div className="relative mt-6 min-h-[4.5rem] border-t border-paper/15 pt-6" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <m.p
                key={active.id}
                className="max-w-md text-paper/70"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
              >
                {active.description}
              </m.p>
            </AnimatePresence>
          </div>

          <p className="mt-10 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-paper/50">
            <MapPin className="h-4 w-4" aria-hidden />
            {spaceAddress}
          </p>
        </div>
      </div>
    </section>
  );
}
