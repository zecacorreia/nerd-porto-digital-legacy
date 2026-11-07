"use client";

import { AnimatePresence, m, useInView } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { FadeIn } from "@/components/motion/FadeIn";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { EASE_OUT_EXPO, transitions } from "@/lib/animations";
import { specialistWhatsappHref } from "@/lib/content";
import { membershipSteps, pointsNote, stepsCtas, type MembershipStep } from "@/lib/membership";
import { MEMBERSHIP_RULES_PATH } from "@/lib/site";

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
    <li ref={ref} className="relative border-t border-ink/15 py-10 lg:flex lg:min-h-[45vh] lg:items-center lg:py-0">
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
        <span className="font-display text-sm tabular-nums text-brand">{index + 1}</span>
        <div>
          <h3 className="font-display text-[clamp(1.75rem,3.4vw,3rem)] font-semibold leading-none tracking-[-0.02em]">
            {step.title}
          </h3>
          <p className="mt-5 max-w-lg text-base text-ink/60 md:text-lg">{step.description}</p>
        </div>
      </m.div>
    </li>
  );
}

/** Os 4 passos do membership, a nota sobre os pontos e os CTAs ("Ver planos" / "Falar com especialista"). */
export function HowItWorks() {
  const [activeIndex, setActiveIndex] = useState(0);
  const progress = (activeIndex + 1) / membershipSteps.length;

  return (
    <section aria-label="Passos do membership" className="relative bg-paper text-ink">
      <div className="mx-auto grid max-w-[1600px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12">
        {/* Coluna fixa: número do passo ativo */}
        <div className="hidden lg:col-span-5 lg:block">
          <div className="lg:sticky lg:top-40">
            <div aria-hidden className="relative h-[clamp(8rem,14vw,13rem)] overflow-hidden">
              <AnimatePresence mode="popLayout" initial={false}>
                <m.span
                  key={activeIndex}
                  className="absolute left-0 top-0 font-display text-[clamp(8rem,14vw,13rem)] font-bold leading-none tracking-[-0.02em] text-brand"
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  exit={{ y: "-100%" }}
                  transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
                >
                  {activeIndex + 1}
                </m.span>
              </AnimatePresence>
            </div>
            <div aria-hidden className="mt-6 h-px w-full max-w-sm bg-ink/15">
              <m.div
                className="h-full origin-left bg-brand"
                animate={{ scaleX: progress }}
                transition={transitions.reveal}
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <ol>
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

          <FadeIn className="mt-10 border-t border-ink/15 pt-10">
            <p className="max-w-2xl text-ink/70 md:text-lg">
              {pointsNote.before}{" "}
              <Link
                href={MEMBERSHIP_RULES_PATH}
                className="font-medium text-brand underline underline-offset-4 transition-colors hover:text-ink"
              >
                {pointsNote.link}
              </Link>
              {pointsNote.after}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <MagneticButton
                href="#planos"
                variant="dark"
                className="w-full sm:w-auto"
                icon={<ArrowDown className="h-4 w-4" aria-hidden />}
              >
                {stepsCtas.plans}
              </MagneticButton>
              <MagneticButton
                href={specialistWhatsappHref}
                external
                variant="outline"
                className="w-full sm:w-auto"
                icon={<ArrowUpRight className="h-4 w-4" aria-hidden />}
              >
                {stepsCtas.specialist}
              </MagneticButton>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
