"use client";

import { m } from "framer-motion";

import { FadeIn } from "@/components/motion/FadeIn";
import { SplitText } from "@/components/motion/SplitText";
import { TiltCard } from "@/components/ui/TiltCard";
import { fadeUp, staggerContainer, viewportEarly } from "@/lib/animations";
import { whatWeDo } from "@/lib/content";

/**
 * "O NERD": o que a plataforma faz e para quem. Fundo escuro, título à esquerda
 * e texto à direita; os três públicos viram cards numerados em grid.
 */
export function WhatWeDo() {
  return (
    <section
      id="conheca-o-nerd"
      aria-label="O NERD"
      className="relative isolate scroll-mt-20 overflow-hidden bg-ink py-24 text-paper md:py-40"
    >
      {/* Brilho de marca ao fundo (gradiente estático: sem filter/blur) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[20vw] top-0 -z-10 h-[60vw] w-[60vw] bg-[radial-gradient(closest-side,rgb(20_80_239/0.35),transparent)]"
      />

      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <header className="grid gap-8 md:grid-cols-12 md:items-end">
          <FadeIn className="md:col-span-3">
            <span className="text-xs uppercase tracking-[0.12em] text-paper/50">(02) — O NERD</span>
          </FadeIn>
          <div className="md:col-span-9">
            <SplitText
              as="h2"
              trigger="inView"
              text={whatWeDo.title}
              highlight={["fazemos"]}
              className="font-display text-mega font-semibold leading-[0.92] tracking-[-0.02em]"
            />
          </div>
        </header>

        <div className="mt-10 grid gap-8 md:mt-16 md:grid-cols-12">
          <FadeIn delay={0.1} className="md:col-span-6 md:col-start-4">
            <p className="text-lg text-paper/70 md:text-xl">{whatWeDo.text}</p>
          </FadeIn>
        </div>

        <div className="mt-20 md:mt-32">
          <FadeIn>
            <h3 className="font-display text-2xl font-semibold tracking-tight md:text-4xl">
              {whatWeDo.audiencesTitle}
            </h3>
          </FadeIn>

          <m.ul
            className="mt-8 grid gap-4 md:mt-12 md:grid-cols-3 md:gap-5"
            variants={staggerContainer({ stagger: 0.1 })}
            initial="hidden"
            whileInView="visible"
            viewport={viewportEarly}
          >
            {whatWeDo.audiences.map((audience, index) => (
              <m.li key={audience.id} variants={fadeUp}>
                <TiltCard
                  className="h-full"
                  innerClassName="flex h-full min-h-[18rem] flex-col justify-between gap-12 p-7 md:p-9"
                >
                  <span className="font-display text-sm tabular-nums text-brand-light">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h4 className="font-display text-3xl font-semibold leading-[1] tracking-[-0.02em] md:text-4xl">
                      {audience.title}
                    </h4>
                    <p className="mt-4 text-paper/60">{audience.description}</p>
                  </div>
                </TiltCard>
              </m.li>
            ))}
          </m.ul>
        </div>
      </div>
    </section>
  );
}
