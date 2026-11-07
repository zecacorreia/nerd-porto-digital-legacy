"use client";

import { m } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import Link from "next/link";

import { FadeIn } from "@/components/motion/FadeIn";
import { SplitText } from "@/components/motion/SplitText";
import { MagneticButton, type MagneticVariant } from "@/components/ui/MagneticButton";
import { TiltCard } from "@/components/ui/TiltCard";
import { EASE_OUT_EXPO, fadeUp, staggerContainer, viewportEarly } from "@/lib/animations";
import { formatBRL, membershipPlans, plansSection, type MembershipPlan, type PlanId } from "@/lib/membership";
import { MEMBERSHIP_RULES_PATH, whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

interface PlanTheme {
  wrapper: string;
  surface: string;
  muted: string;
  track: string;
  bar: string;
  badge: string;
  glow: string;
  button: MagneticVariant;
  beam?: boolean;
}

/** Intensidade visual crescente: claro → escuro → azul da marca. */
const PLAN_THEMES: Record<PlanId, PlanTheme> = {
  conecta: {
    wrapper: "bg-ink/10",
    surface: "bg-paper-dim text-ink",
    muted: "text-ink/60",
    track: "bg-ink/10",
    bar: "bg-brand",
    badge: "bg-ink text-paper",
    glow: "rgb(20 80 239 / 0.9)",
    button: "dark",
  },
  inova: {
    wrapper: "bg-ink-line",
    surface: "bg-ink text-paper",
    muted: "text-paper/60",
    track: "bg-paper/10",
    bar: "bg-brand-light",
    badge: "bg-brand text-paper",
    glow: "rgb(1 163 248 / 0.9)",
    button: "primary",
  },
  plataforma: {
    wrapper: "bg-brand-deep",
    surface: "bg-brand text-paper",
    muted: "text-paper/75",
    track: "bg-paper/20",
    bar: "bg-paper",
    badge: "bg-paper text-brand",
    glow: "rgb(255 255 255 / 0.9)",
    button: "ghost",
    beam: true,
  },
};

const MAX_POINTS = Math.max(...membershipPlans.map((plan) => plan.points));

function PlanCard({ plan }: { plan: MembershipPlan }) {
  const theme = PLAN_THEMES[plan.id];
  return (
    <TiltCard
      className={cn("h-full", theme.wrapper)}
      innerClassName={cn("flex h-full flex-col gap-8 p-7 md:p-9", theme.surface)}
      glowColor={theme.glow}
      beam={theme.beam}
      maxTilt={5}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-3xl font-semibold tracking-[-0.02em] md:text-4xl">{plan.name}</h3>
          <p className={cn("mt-2 text-sm", theme.muted)}>{plan.description}</p>
        </div>
        <span
          className={cn(
            "shrink-0 rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em]",
            theme.badge,
          )}
        >
          {plan.tier}
        </span>
      </div>

      {/* Preço: anuidade em destaque e teto do equivalente mensal logo abaixo */}
      <div>
        <p className="flex flex-wrap items-baseline gap-x-2">
          <span className="font-display text-5xl font-semibold tracking-[-0.02em] tabular-nums">
            {formatBRL(plan.annualPrice)}
          </span>
          <span className={cn("text-sm", theme.muted)}>{plansSection.perYear}</span>
        </p>
        <p className={cn("mt-2 text-sm", theme.muted)}>
          {plansSection.perMonthPrefix} {formatBRL(plan.monthlyCeiling)}
          {plansSection.perMonthSuffix}
        </p>
      </div>

      {/* Pixels por ano, em escala relativa ao maior plano */}
      <div>
        <div className="flex items-baseline justify-between text-sm">
          <span className={theme.muted}>{plansSection.pointsLabel}</span>
          <span className="font-display text-xl font-semibold tabular-nums">{plan.points}</span>
        </div>
        {/* O gatilho fica no trilho: a barra começa com scaleX 0 (área zero) e nunca seria "vista". */}
        <m.div
          className={cn("mt-3 h-2 overflow-hidden rounded-full", theme.track)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.8 }}
        >
          <m.div
            className={cn("h-full origin-left rounded-full", theme.bar)}
            style={{ width: `${(plan.points / MAX_POINTS) * 100}%` }}
            variants={{
              hidden: { scaleX: 0 },
              visible: { scaleX: 1, transition: { duration: 1.2, ease: EASE_OUT_EXPO, delay: 0.2 } },
            }}
          />
        </m.div>
      </div>

      <ul className="flex flex-col gap-3 border-t border-current/15 pt-6">
        {plan.benefits.map((benefit) => (
          <li key={benefit} className="flex gap-3 text-sm md:text-base">
            <Check className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            <span>{benefit}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-2">
        <MagneticButton
          href={whatsappLink(`Olá! Tenho interesse no ${plan.name}.`)}
          external
          variant={theme.button}
          className="w-full"
          icon={<ArrowUpRight className="h-4 w-4" aria-hidden />}
        >
          {plan.cta}
        </MagneticButton>
      </div>
    </TiltCard>
  );
}

export function Plans() {
  return (
    <section id="planos" aria-label="Planos" className="relative scroll-mt-20 bg-paper py-24 text-ink md:py-40">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <header className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <FadeIn>
              <span className="text-xs uppercase tracking-[0.12em] text-ink/50">(02) — Planos</span>
            </FadeIn>
            <SplitText
              as="h2"
              trigger="inView"
              text={plansSection.title}
              highlight={["Planos*"]}
              className="mt-6 font-display text-mega font-semibold leading-[0.92] tracking-[-0.02em]"
            />
          </div>
          <FadeIn className="md:col-span-5" delay={0.2}>
            <p className="text-ink/70 md:text-lg">{plansSection.text}</p>
          </FadeIn>
        </header>

        <m.ul
          className="mt-16 grid gap-5 md:mt-24 lg:grid-cols-3"
          variants={staggerContainer({ stagger: 0.12 })}
          initial="hidden"
          whileInView="visible"
          viewport={viewportEarly}
        >
          {membershipPlans.map((plan) => (
            <m.li key={plan.id} variants={fadeUp}>
              <PlanCard plan={plan} />
            </m.li>
          ))}
        </m.ul>

        <div className="mt-12 flex flex-col gap-6 border-t border-ink/15 pt-10 md:flex-row md:items-center md:justify-between">
          <FadeIn>
            <Link
              href={MEMBERSHIP_RULES_PATH}
              className="group inline-flex items-center gap-1.5 font-medium text-brand transition-colors hover:text-ink"
            >
              {plansSection.rules}
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:rotate-45"
                aria-hidden
              />
            </Link>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-sm text-ink/55">{plansSection.footnote}</p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
