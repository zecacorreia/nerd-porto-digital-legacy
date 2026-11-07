"use client";

import { m, useInView } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { FadeIn } from "@/components/motion/FadeIn";
import { SplitText } from "@/components/motion/SplitText";
import { SpaceVisual } from "@/components/ui/SpaceVisual";
import { transitions } from "@/lib/animations";
import { mapsUrl, spaceAddress, spaces, spacesSection } from "@/lib/content";
import { cn } from "@/lib/utils";

/** Intervalo do autoplay (ms) — roda só até a primeira interação do usuário. */
const AUTOPLAY_MS = 5500;

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
      id="o-espaco"
      aria-label="O espaço"
      className="relative isolate scroll-mt-20 overflow-hidden bg-ink text-paper"
    >
      {/* Legibilidade do texto sobre o visual (desktop) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-[5] hidden bg-gradient-to-r from-ink/90 via-ink/50 to-ink/70 lg:block"
      />

      <div className="mx-auto grid max-w-[1600px] gap-12 px-5 py-24 md:px-10 lg:min-h-[820px] lg:grid-cols-12 lg:py-24">
        {/* Coluna esquerda: título + endereço */}
        <div className="flex flex-col justify-between gap-12 lg:col-span-6">
          <div>
            <FadeIn>
              <span className="text-xs uppercase tracking-[0.12em] text-paper/50">(06) — O espaço</span>
            </FadeIn>
            <SplitText
              as="h2"
              trigger="inView"
              text={spacesSection.title}
              highlight={spacesSection.highlight}
              className="mt-6 max-w-[16ch] font-display text-[clamp(2.25rem,4.6vw,4.75rem)] font-semibold leading-[0.98] tracking-[-0.02em]"
            />
          </div>

          <FadeIn delay={0.2} className="hidden lg:block">
            <AddressLink />
          </FadeIn>
        </div>

        {/* Visual: caixa no mobile, fundo de tela inteira no desktop */}
        <SpaceVisual
          space={active}
          className="aspect-[4/5] rounded-large md:aspect-[16/10] lg:absolute lg:inset-0 lg:-z-10 lg:aspect-auto lg:rounded-none"
        />

        {/* Coluna direita: ambientes */}
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
                    className="relative flex w-full items-start gap-5 border-t border-paper/15 py-5 text-left md:py-6"
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
                    <span className="w-6 shrink-0 pt-2 font-display text-sm tabular-nums text-paper/40">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1">
                      <m.span
                        className="block font-display text-[clamp(1.5rem,2.6vw,2.5rem)] font-semibold leading-[1.05] tracking-[-0.02em]"
                        animate={{ x: isActive ? 10 : 0, opacity: isActive ? 1 : 0.5 }}
                        transition={transitions.fast}
                      >
                        {space.name}
                      </m.span>
                      <span
                        className={cn(
                          "mt-2 block max-w-md text-sm transition-colors duration-300 md:text-base",
                          isActive ? "text-paper/75" : "text-paper/45",
                        )}
                      >
                        {space.description}
                      </span>
                    </span>
                    <m.span
                      aria-hidden
                      className="mt-2 shrink-0 text-brand-light"
                      animate={{ opacity: isActive ? 1 : 0, rotate: isActive ? 0 : -45 }}
                      transition={transitions.fast}
                    >
                      <ArrowUpRight className="h-6 w-6" />
                    </m.span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="mt-8 border-t border-paper/15 pt-8 lg:hidden">
            <AddressLink />
          </div>
        </div>
      </div>
    </section>
  );
}

function AddressLink() {
  return (
    <a
      href={mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-3 text-paper/80 transition-colors hover:text-brand-light"
    >
      <MapPin className="h-5 w-5 shrink-0" aria-hidden />
      <span className="text-sm uppercase tracking-[0.12em]">{spaceAddress}</span>
      <ArrowUpRight
        className="h-4 w-4 shrink-0 transition-transform duration-500 ease-out-expo group-hover:rotate-45"
        aria-hidden
      />
    </a>
  );
}
