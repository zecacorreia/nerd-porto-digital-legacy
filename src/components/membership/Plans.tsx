"use client";

import { AnimatePresence, m } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { FadeIn } from "@/components/motion/FadeIn";
import { SplitText } from "@/components/motion/SplitText";
import { MagneticButton, type MagneticVariant } from "@/components/ui/MagneticButton";
import { TiltCard } from "@/components/ui/TiltCard";
import { EASE_OUT_EXPO, fadeUp, staggerContainer, transitions, viewportEarly } from "@/lib/animations";
import {
  formatBRL,
  membershipPlans,
  plansFootnote,
  plansIncluded,
  type MembershipPlan,
  type PlanId,
} from "@/lib/membership";
import { MEMBERSHIP_RULES_PATH, whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

type Billing = "annual" | "monthly";

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

function BillingToggle({ value, onChange }: { value: Billing; onChange: (value: Billing) => void }) {
  const options: ReadonlyArray<{ id: Billing; label: string }> = [
    { id: "annual", label: "Anuidade" },
    { id: "monthly", label: "Equivalente mensal*" },
  ];
  return (
    <div role="radiogroup" aria-label="Exibição do valor" className="relative grid grid-cols-2 rounded-full bg-ink/5 p-1">
      <m.span
        aria-hidden
        className="absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-ink"
        initial={false}
        animate={{ x: value === "annual" ? "0%" : "100%" }}
        transition={transitions.fast}
      />
      {options.map((option) => (
        <button
          key={option.id}
          type="button"
          role="radio"
          aria-checked={value === option.id}
          onClick={() => onChange(option.id)}
          className={cn(
            "relative z-10 rounded-full px-4 py-2.5 text-xs font-medium uppercase tracking-[0.12em] transition-colors duration-300 md:px-6",
            value === option.id ? "text-paper" : "text-ink/60 hover:text-ink",
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

function PlanCard({ plan, billing }: { plan: MembershipPlan; billing: Billing }) {
  const theme = PLAN_THEMES[plan.id];
  const price =
    billing === "annual"
      ? { prefix: "", value: formatBRL(plan.annualPrice), suffix: "/ano" }
      : { prefix: "menos de", value: formatBRL(plan.monthlyCeiling), suffix: "/mês*" };

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

      {/* Preço */}
      <div className="relative h-[4.5rem] overflow-hidden" aria-live="polite">
        <AnimatePresence mode="popLayout" initial={false}>
          <m.p
            key={billing}
            className="absolute inset-x-0 bottom-0 flex flex-wrap items-baseline gap-x-2"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
          >
            {price.prefix && <span className={cn("text-sm", theme.muted)}>{price.prefix}</span>}
            <span className="font-display text-5xl font-semibold tracking-[-0.02em] tabular-nums">{price.value}</span>
            <span className={cn("text-sm", theme.muted)}>{price.suffix}</span>
          </m.p>
        </AnimatePresence>
      </div>

      {/* Pixels por ano, em escala relativa ao maior plano */}
      <div>
        <div className="flex items-baseline justify-between text-sm">
          <span className={theme.muted}>Pixels por ano</span>
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
  const [billing, setBilling] = useState<Billing>("annual");

  return (
    <section id="planos" aria-label="Planos" className="relative scroll-mt-20 bg-paper py-24 text-ink md:py-40">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <header className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <FadeIn>
              <span className="text-xs uppercase tracking-[0.12em] text-ink/50">(03) — Planos</span>
            </FadeIn>
            <SplitText
              as="h2"
              trigger="inView"
              text="Três formatos, conforme o estágio da sua empresa em inovação."
              highlight={["inovação."]}
              className="mt-6 max-w-[18ch] font-display text-mega font-semibold leading-[0.92] tracking-[-0.02em]"
            />
          </div>
          <FadeIn className="md:col-span-4 md:flex md:justify-end" delay={0.2}>
            <BillingToggle value={billing} onChange={setBilling} />
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
              <PlanCard plan={plan} billing={billing} />
            </m.li>
          ))}
        </m.ul>

        <div className="mt-12 grid gap-8 border-t border-ink/15 pt-10 md:grid-cols-12">
          <FadeIn className="md:col-span-4">
            <h3 className="font-display text-2xl font-semibold tracking-tight">Em todos os planos</h3>
            <p className="mt-3 text-sm text-ink/50">{plansFootnote}</p>
          </FadeIn>
          <ul className="grid gap-3 sm:grid-cols-2 md:col-span-8">
            {plansIncluded.map((item) => (
              <li key={item} className="flex items-center gap-3 rounded-large bg-paper-dim/60 px-4 py-3 text-sm">
                <Check className="h-4 w-4 shrink-0 text-brand" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <FadeIn className="mt-8">
          <Link
            href={MEMBERSHIP_RULES_PATH}
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-brand transition-colors hover:text-ink"
          >
            Conheça o regulamento
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:rotate-45"
              aria-hidden
            />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
