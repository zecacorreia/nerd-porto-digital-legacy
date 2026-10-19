"use client";

import { m } from "framer-motion";
import {
  ArrowUpRight,
  Ban,
  Building2,
  CalendarCheck2,
  CalendarClock,
  GraduationCap,
  Handshake,
  Lock,
  PlusCircle,
  type LucideIcon,
} from "lucide-react";

import { FadeIn } from "@/components/motion/FadeIn";
import { SplitText } from "@/components/motion/SplitText";
import { TiltCard } from "@/components/ui/TiltCard";
import { fadeUp, staggerContainer, viewportEarly } from "@/lib/animations";
import { pointsRules, pointsUsage, type PointsRule, type UsageIcon } from "@/lib/membership";
import { MEMBERSHIP_RULES_URL } from "@/lib/site";
import { cn } from "@/lib/utils";

const USAGE_ICONS: Record<UsageIcon, LucideIcon> = {
  espacos: Building2,
  formacao: GraduationCap,
  negocios: Handshake,
};

const RULE_ICONS: Record<PointsRule["id"], LucideIcon> = {
  vigencia: CalendarClock,
  acumulo: Ban,
  transferencia: Lock,
  adicionais: PlusCircle,
};

/** Bento: Espaços ocupa a coluna alta; Formação e Negócios empilham ao lado. */
const USAGE_SPANS: Record<UsageIcon, string> = {
  espacos: "md:col-span-3 md:row-span-2",
  formacao: "md:col-span-3",
  negocios: "md:col-span-3",
};

export function PointsUsage() {
  return (
    <section id="pixels" aria-label="Onde usar seus Pixels" className="relative bg-ink py-24 text-paper md:py-40">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <header className="grid gap-8 md:grid-cols-12 md:items-end">
          <FadeIn className="md:col-span-3">
            <span className="text-xs uppercase tracking-[0.25em] text-paper/50">(02) — Pixels NERD</span>
          </FadeIn>
          <div className="md:col-span-6">
            <SplitText
              as="h2"
              trigger="inView"
              text="Uma carteira, três formas de usar."
              highlight={["três"]}
              className="font-display text-mega font-semibold leading-[0.92] tracking-[-0.04em]"
            />
          </div>
          <FadeIn className="md:col-span-3" delay={0.2}>
            <p className="text-paper/60 md:text-right">
              Seus Pixels viram espaço, formação e negócios, com prioridade de agendamento para membros.
            </p>
          </FadeIn>
        </header>

        <m.ul
          className="mt-16 grid auto-rows-[minmax(14rem,auto)] gap-4 md:mt-24 md:grid-cols-6 md:gap-5"
          variants={staggerContainer({ stagger: 0.1 })}
          initial="hidden"
          whileInView="visible"
          viewport={viewportEarly}
        >
          {pointsUsage.map((usage) => {
            const Icon = USAGE_ICONS[usage.id];
            const tall = usage.id === "espacos";
            return (
              <m.li key={usage.id} variants={fadeUp} className={USAGE_SPANS[usage.id]}>
                <TiltCard
                  className="h-full"
                  beam={tall}
                  maxTilt={tall ? 5 : 8}
                  innerClassName="flex flex-col justify-between gap-10 p-6 md:p-8"
                >
                  <div className="flex items-start justify-between">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand text-paper">
                      <Icon className="h-6 w-6" aria-hidden />
                    </span>
                    <span className="text-xs uppercase tracking-[0.2em] text-paper/40">{usage.items.length} opções</span>
                  </div>
                  <div>
                    <h3
                      className={cn(
                        "font-display font-semibold leading-none tracking-[-0.03em]",
                        tall ? "text-[clamp(3rem,6vw,5.5rem)]" : "text-3xl md:text-4xl",
                      )}
                    >
                      {usage.title}
                    </h3>
                    <p className="mt-4 max-w-sm text-sm text-paper/60 md:text-base">{usage.description}</p>
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {usage.items.map((item) => (
                        <li key={item} className="rounded-full border border-paper/15 px-3.5 py-1.5 text-xs md:text-sm">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </TiltCard>
              </m.li>
            );
          })}

          {/* Eventos: incluídos sem consumir pontos */}
          <m.li variants={fadeUp} className="md:col-span-6">
            <div className="flex h-full flex-col gap-6 rounded-3xl bg-brand p-6 text-paper md:flex-row md:items-center md:justify-between md:p-10">
              <div className="flex items-center gap-5">
                <CalendarCheck2 className="h-10 w-10 shrink-0" aria-hidden />
                <p className="font-display text-[clamp(1.75rem,3.5vw,3rem)] font-semibold leading-[1] tracking-[-0.03em]">
                  Eventos abertos e exclusivos para membros, sem consumir pontos.
                </p>
              </div>
              <span className="shrink-0 rounded-full bg-paper px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand">
                Incluído em todos os planos
              </span>
            </div>
          </m.li>
        </m.ul>

        {/* Regras */}
        <div className="mt-20 grid gap-10 border-t border-paper/15 pt-12 md:mt-28 md:grid-cols-12">
          <FadeIn className="md:col-span-3">
            <h3 className="font-display text-2xl font-semibold tracking-tight">Regras dos pontos</h3>
            <a
              href={MEMBERSHIP_RULES_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-4 inline-flex items-center gap-1.5 text-sm text-brand-light transition-colors hover:text-paper"
            >
              Regulamento do membership
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:rotate-45"
                aria-hidden
              />
            </a>
          </FadeIn>
          <m.ul
            className="grid gap-6 sm:grid-cols-2 md:col-span-9 lg:grid-cols-4"
            variants={staggerContainer({ stagger: 0.08 })}
            initial="hidden"
            whileInView="visible"
            viewport={viewportEarly}
          >
            {pointsRules.map((rule) => {
              const Icon = RULE_ICONS[rule.id];
              return (
                <m.li key={rule.id} variants={fadeUp} custom={20} className="flex flex-col gap-4">
                  <Icon className="h-6 w-6 text-brand-light" aria-hidden />
                  <p className="text-paper/80">{rule.text}</p>
                </m.li>
              );
            })}
          </m.ul>
        </div>
      </div>
    </section>
  );
}
