"use client";

import { AnimatePresence, m, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { FadeIn } from "@/components/motion/FadeIn";
import { SplitText } from "@/components/motion/SplitText";
import { EASE_OUT_EXPO, transitions } from "@/lib/animations";
import { membershipSteps, type MembershipStep } from "@/lib/membership";
import { cn } from "@/lib/utils";

interface StepCardProps {
  step: MembershipStep;
  index: number;
  active: boolean;
  onActivate: (index: number) => void;
}

function StepCard({ step, index, active, onActivate }: StepCardProps) {
  const ref = useRef<HTMLLIElement>(null);
  // Passo "ativo" = o que ocupa o meio da tela.
  const inCenter = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (inCenter) onActivate(index);
  }, [inCenter, index, onActivate]);

  return (
    <li ref={ref} className="relative border-t border-ink/15 py-10 lg:flex lg:min-h-[55vh] lg:items-center lg:py-0">
      <m.span
        aria-hidden
        className="absolute -top-px left-0 h-px w-full origin-left bg-brand"
        initial={false}
        animate={{ scaleX: active ? 1 : 0 }}
        transition={transitions.reveal}
      />
      <m.div
        className="flex gap-6 md:gap-10"
        animate={{ opacity: active ? 1 : 0.35 }}
        transition={transitions.fast}
      >
        <span className="font-display text-sm tabular-nums text-brand">{String(index + 1).padStart(2, "0")}</span>
        <div>
          <h3 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-none tracking-[-0.02em]">
            {step.title}
          </h3>
          <p className="mt-5 max-w-md text-base text-ink/60 md:text-lg">{step.description}</p>
        </div>
      </m.div>
    </li>
  );
}

export function HowItWorks() {
  const [activeIndex, setActiveIndex] = useState(0);
  const progress = (activeIndex + 1) / membershipSteps.length;

  return (
    <section id="como-funciona" aria-label="Como funciona" className="relative bg-paper text-ink">
      <div className="mx-auto grid max-w-[1600px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12">
        {/* Coluna fixa */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <FadeIn>
              <span className="text-xs uppercase tracking-[0.12em] text-ink/50">(01) — Como funciona</span>
            </FadeIn>
            <SplitText
              as="h2"
              trigger="inView"
              text="Quatro passos para entrar na rede."
              highlight={["rede."]}
              className="mt-6 max-w-[12ch] font-display text-mega font-semibold leading-[0.92] tracking-[-0.02em]"
            />

            {/* Número gigante do passo ativo (desktop) */}
            <div aria-hidden className="relative mt-12 hidden h-[clamp(8rem,14vw,13rem)] overflow-hidden lg:block">
              <AnimatePresence mode="popLayout" initial={false}>
                <m.span
                  key={activeIndex}
                  className="absolute left-0 top-0 font-display text-[clamp(8rem,14vw,13rem)] font-bold leading-none tracking-[-0.02em] text-brand"
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  exit={{ y: "-100%" }}
                  transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
                >
                  {String(activeIndex + 1).padStart(2, "0")}
                </m.span>
              </AnimatePresence>
            </div>
            <div aria-hidden className="mt-6 hidden h-px w-full max-w-sm bg-ink/15 lg:block">
              <m.div
                className="h-full origin-left bg-brand"
                animate={{ scaleX: progress }}
                transition={transitions.reveal}
              />
            </div>
          </div>
        </div>

        {/* Passos */}
        <ol className={cn("lg:col-span-6 lg:col-start-7")}>
          {membershipSteps.map((step, index) => (
            <StepCard
              key={step.id}
              step={step}
              index={index}
              active={index === activeIndex}
              onActivate={setActiveIndex}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}
