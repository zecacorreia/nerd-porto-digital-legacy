"use client";

import { m, useScroll, useTransform } from "framer-motion";
import { Briefcase, Building2, Lightbulb, type LucideIcon } from "lucide-react";
import { Fragment, useRef } from "react";

import { FadeIn } from "@/components/motion/FadeIn";
import { SplitText } from "@/components/motion/SplitText";
import { Marquee } from "@/components/ui/Marquee";
import { TiltCard } from "@/components/ui/TiltCard";
import { fadeUp, staggerContainer, viewportEarly } from "@/lib/animations";
import { capitalActions, capitalIntro, mercadoActions, mercadoIntro } from "@/lib/startup";

const MERCADO_ICONS: Record<string, LucideIcon> = {
  clientes: Briefcase,
  integracao: Building2,
  produtos: Lightbulb,
};

/** Quem a startup encontra no Desenvolvimento de Mercado (conforme a página oficial). */
const MARKET_PARTNERS = ["Clientes", "Empresas", "Governo", "Parceiros institucionais"] as const;

export function MarketDevelopment() {
  return (
    <section
      id="desenvolvimento-de-mercado"
      aria-label="Desenvolvimento de Mercado"
      className="relative overflow-hidden bg-ink py-24 text-paper md:py-40"
    >
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <header className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <FadeIn>
              <span className="text-xs uppercase tracking-[0.12em] text-paper/50">(02) — Mercado</span>
            </FadeIn>
            <SplitText
              as="h2"
              trigger="inView"
              text="Desenvolvimento de Mercado"
              highlight={["Mercado"]}
              className="mt-6 max-w-[12ch] font-display text-mega font-semibold leading-[0.92] tracking-[-0.02em]"
            />
          </div>
          <FadeIn className="md:col-span-4" delay={0.2}>
            <p className="text-paper/60 md:text-right md:text-lg">{mercadoIntro}</p>
          </FadeIn>
        </header>

        <m.ul
          className="mt-16 grid gap-4 md:mt-24 md:grid-cols-3 md:gap-5"
          variants={staggerContainer({ stagger: 0.1 })}
          initial="hidden"
          whileInView="visible"
          viewport={viewportEarly}
        >
          {mercadoActions.map((action, index) => {
            const Icon = MERCADO_ICONS[action.id] ?? Briefcase;
            return (
              <m.li key={action.id} variants={fadeUp}>
                <TiltCard className="h-full" innerClassName="flex min-h-[18rem] flex-col justify-between gap-10 p-7 md:p-9">
                  <div className="flex items-start justify-between">
                    <span className="flex h-14 w-14 items-center justify-center rounded-large bg-brand text-paper">
                      <Icon className="h-6 w-6" aria-hidden />
                    </span>
                    <span className="font-display text-sm tabular-nums text-paper/40">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="font-display text-[clamp(1.75rem,2.6vw,2.5rem)] font-semibold leading-[1.02] tracking-[-0.02em]">
                    {action.title}
                  </h3>
                </TiltCard>
              </m.li>
            );
          })}
        </m.ul>
      </div>

      <Marquee baseVelocity={5} className="mt-20 py-2 md:mt-28">
        {MARKET_PARTNERS.map((partner) => (
          <Fragment key={partner}>
            <span className="hollow px-6 font-display text-[clamp(2.5rem,6vw,6rem)] font-bold uppercase leading-none tracking-[-0.02em] text-paper/30 md:px-10">
              {partner}
            </span>
            <span className="h-3 w-3 shrink-0 rotate-45 bg-brand md:h-4 md:w-4" />
          </Fragment>
        ))}
      </Marquee>
    </section>
  );
}

export function CapitalInvestment() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const outlineX = useTransform(scrollYProgress, [0, 1], ["10%", "-25%"]);

  return (
    <section
      ref={ref}
      id="capital-e-investimento"
      aria-label="Capital e Investimento"
      className="relative overflow-hidden bg-brand py-24 text-paper md:py-40"
    >
      <div className="mx-auto grid max-w-[1600px] gap-12 px-5 md:px-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <FadeIn>
              <span className="text-xs uppercase tracking-[0.12em] text-paper/70">(03) — Capital</span>
            </FadeIn>
            <SplitText
              as="h2"
              trigger="inView"
              text="Capital e Investimento"
              highlight={["Investimento"]}
              highlightClassName="text-ink"
              className="mt-6 font-display text-[clamp(2.5rem,5.2vw,5.75rem)] font-semibold leading-[0.92] tracking-[-0.02em]"
            />
            <FadeIn delay={0.2}>
              <p className="mt-8 max-w-md text-paper/80 md:text-lg">{capitalIntro}</p>
            </FadeIn>
          </div>
        </div>

        <m.ol
          className="lg:col-span-6 lg:col-start-7"
          variants={staggerContainer({ stagger: 0.1 })}
          initial="hidden"
          whileInView="visible"
          viewport={viewportEarly}
        >
          {capitalActions.map((action, index) => (
            <m.li
              key={action.id}
              variants={fadeUp}
              className="group flex gap-6 border-t border-paper/25 py-7 last:border-b md:gap-10 md:py-10"
            >
              <span className="pt-2 font-display text-sm tabular-nums text-paper/60">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-[clamp(1.75rem,3.2vw,3rem)] font-semibold leading-[1.02] tracking-[-0.02em] transition-transform duration-500 ease-out-expo group-hover:translate-x-3">
                {action.title}
              </h3>
            </m.li>
          ))}
        </m.ol>
      </div>

      <m.p
        aria-hidden
        className="hollow pointer-events-none mt-20 select-none whitespace-nowrap font-display text-[clamp(5rem,16vw,16rem)] font-bold uppercase leading-[0.8] tracking-[-0.02em] text-paper/25"
        style={{ x: outlineX }}
      >
        Capital · Investimento
      </m.p>
    </section>
  );
}
