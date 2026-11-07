"use client";

import { m } from "framer-motion";
import { Building2, GraduationCap, Handshake, type LucideIcon } from "lucide-react";

import { FadeIn } from "@/components/motion/FadeIn";
import { SplitText } from "@/components/motion/SplitText";
import { TiltCard } from "@/components/ui/TiltCard";
import { fadeUp, staggerContainer, viewportEarly } from "@/lib/animations";
import { howItWorks, pointsUsage, type UsageIcon } from "@/lib/membership";
import { cn } from "@/lib/utils";

const USAGE_ICONS: Record<UsageIcon, LucideIcon> = {
  espacos: Building2,
  formacao: GraduationCap,
  negocios: Handshake,
};

/** Bento: Espaços ocupa a coluna alta; Formação e Negócios empilham ao lado. */
const USAGE_SPANS: Record<UsageIcon, string> = {
  espacos: "md:col-span-3 md:row-span-2",
  formacao: "md:col-span-3",
  negocios: "md:col-span-3",
};

/** "Como funciona": cada plano é uma carteira anual de pontos, usada em espaços, formação e negócios. */
export function PointsUsage() {
  return (
    <section id="como-funciona" aria-label="Como funciona" className="relative scroll-mt-20 bg-ink py-24 text-paper md:py-40">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <header className="grid gap-8 md:grid-cols-12 md:items-end">
          <FadeIn className="md:col-span-3">
            <span className="text-xs uppercase tracking-[0.12em] text-paper/50">(01) — {howItWorks.title}</span>
          </FadeIn>
          <div className="md:col-span-6">
            <SplitText
              as="h2"
              trigger="inView"
              text={howItWorks.title}
              highlight={["funciona"]}
              className="font-display text-mega font-semibold leading-[0.92] tracking-[-0.02em]"
            />
          </div>
          <FadeIn className="md:col-span-3" delay={0.2}>
            <p className="text-paper/60 md:text-right">{howItWorks.text}</p>
          </FadeIn>
        </header>

        <m.ul
          className="mt-16 grid auto-rows-[minmax(14rem,auto)] gap-4 md:mt-24 md:grid-cols-6 md:gap-5"
          variants={staggerContainer({ stagger: 0.1 })}
          initial="hidden"
          whileInView="visible"
          viewport={viewportEarly}
        >
          {pointsUsage.map((usage, index) => {
            const Icon = USAGE_ICONS[usage.id];
            const tall = usage.id === "espacos";
            return (
              <m.li key={usage.id} variants={fadeUp} className={USAGE_SPANS[usage.id]}>
                <TiltCard
                  className="h-full"
                  beam={tall}
                  maxTilt={tall ? 5 : 8}
                  innerClassName="flex h-full flex-col justify-between gap-10 p-6 md:p-8"
                >
                  <div className="flex items-start justify-between">
                    <span className="flex h-14 w-14 items-center justify-center rounded-large bg-brand text-paper">
                      <Icon className="h-6 w-6" aria-hidden />
                    </span>
                    <span className="font-display text-sm tabular-nums text-paper/40">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div>
                    <h3
                      className={cn(
                        "font-display font-semibold leading-none tracking-[-0.02em]",
                        tall ? "text-[clamp(3rem,6vw,5.5rem)]" : "text-3xl md:text-4xl",
                      )}
                    >
                      {usage.title}
                    </h3>
                    <p className="mt-4 max-w-md text-sm text-paper/60 md:text-base">{usage.description}</p>
                  </div>
                </TiltCard>
              </m.li>
            );
          })}
        </m.ul>
      </div>
    </section>
  );
}
