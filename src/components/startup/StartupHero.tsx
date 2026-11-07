"use client";

import { m } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import { SplitText } from "@/components/motion/SplitText";
import { useIntro } from "@/components/providers/IntroProvider";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { MeshGradient } from "@/components/ui/MeshGradient";
import { EASE_OUT_EXPO, transitions } from "@/lib/animations";
import { BALCAO_URL, balcaoSection, startupHero, startupRoutes } from "@/lib/startup";

/** Mapa das 3 rotas: uma linha vertical se desenha e conecta os nós (cada nó leva à sua seção). */
function RouteMap({ play }: { play: boolean }) {
  return (
    <nav aria-label="Rotas para startups" className="relative">
      <m.span
        aria-hidden
        className="absolute bottom-10 left-[1.4rem] top-10 w-px origin-top bg-gradient-to-b from-brand via-brand-light to-brand"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: play ? 1 : 0 }}
        transition={{ duration: 1.4, ease: EASE_OUT_EXPO, delay: 0.5 }}
      />
      <ol className="flex flex-col gap-3">
        {startupRoutes.map((route, index) => (
          <m.li
            key={route.id}
            initial={{ opacity: 0, x: 24 }}
            animate={play ? { opacity: 1, x: 0 } : undefined}
            transition={{ ...transitions.reveal, delay: 0.7 + index * 0.15 }}
          >
            <a
              href={`#${route.id}`}
              className="group relative flex items-center gap-5 rounded-large border border-paper/10 bg-ink-soft/80 p-4 pr-6 transition-colors duration-500 hover:border-brand hover:bg-brand/10 md:p-5"
            >
              <span className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand font-display text-sm font-semibold tabular-nums text-paper">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="flex-1">
                <span className="block font-display text-xl font-semibold leading-tight tracking-tight md:text-2xl">
                  {route.title}
                </span>
              </span>
              <ArrowDownRight
                className="h-5 w-5 shrink-0 text-paper/40 transition-all duration-500 ease-out-expo group-hover:-rotate-45 group-hover:text-paper"
                aria-hidden
              />
            </a>
          </m.li>
        ))}
      </ol>
    </nav>
  );
}

export function StartupHero() {
  const { isReady } = useIntro();

  const enter = (delay: number) => ({
    initial: { opacity: 0, y: 30 },
    animate: isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
    transition: { ...transitions.reveal, delay },
  });

  return (
    <section className="relative isolate overflow-hidden bg-ink text-paper">
      <div className="absolute inset-0 -z-10 opacity-70">
        <MeshGradient />
      </div>

      <div className="mx-auto grid min-h-[100svh] max-w-[1600px] items-center gap-12 px-5 pb-16 pt-32 md:px-10 lg:grid-cols-12 lg:pt-36">
        <div className="lg:col-span-7">
          <m.span className="block text-xs uppercase tracking-[0.12em] text-brand-light" {...enter(0.1)}>
            {startupHero.eyebrow}
          </m.span>
          <SplitText
            as="h1"
            text={startupHero.title}
            highlight={["startups"]}
            play={isReady}
            delay={0.2}
            stagger={0.03}
            className="mt-6 font-display text-[clamp(3.5rem,10vw,10rem)] font-semibold leading-[0.88] tracking-[-0.02em]"
          />
          <m.p className="mt-8 max-w-2xl text-sm text-paper/70 md:text-base lg:text-lg" {...enter(0.7)}>
            {startupHero.intro}
          </m.p>
          <m.div className="mt-10 flex flex-wrap gap-3" {...enter(0.85)}>
            <MagneticButton href={BALCAO_URL} external icon={<ArrowUpRight className="h-4 w-4" aria-hidden />}>
              {balcaoSection.primaryCta}
            </MagneticButton>
          </m.div>
        </div>

        <div className="lg:col-span-5">
          <RouteMap play={isReady} />
        </div>
      </div>
    </section>
  );
}
