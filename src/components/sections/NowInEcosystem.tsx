"use client";

import { m } from "framer-motion";
import { ArrowUpRight, Radio } from "lucide-react";

import { FadeIn } from "@/components/motion/FadeIn";
import { SplitText } from "@/components/motion/SplitText";
import { EventCard } from "@/components/ui/EventCard";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { TiltCard } from "@/components/ui/TiltCard";
import { fadeUp, staggerContainer, viewportEarly } from "@/lib/animations";
import { ecosystemItems } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Bento grid (6 colunas no desktop):
 *  ┌───────────────┬───────┐
 *  │               │ item  │
 *  │   destaque    ├───────┤
 *  │               │ item  │
 *  ├───────┬───────┴───────┤
 *  │ agenda│      CTA      │
 *  └───────┴───────────────┘
 * No mobile tudo vira uma coluna, na mesma ordem.
 */
const ITEM_SPANS = ["md:col-span-4 md:row-span-2", "md:col-span-2", "md:col-span-2"] as const;

export function NowInEcosystem() {
  return (
    <section id="agora" aria-label="Agora no ecossistema" className="relative bg-ink py-24 text-paper md:py-40">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <header className="grid gap-8 md:grid-cols-12 md:items-end">
          <FadeIn className="md:col-span-3">
            <span className="text-xs uppercase tracking-[0.25em] text-paper/50">(02) — Agora no ecossistema</span>
          </FadeIn>
          <div className="md:col-span-6">
            <SplitText
              as="h2"
              trigger="inView"
              text="O que está acontecendo agora."
              highlight={["agora."]}
              className="font-display text-mega font-semibold leading-[0.92] tracking-[-0.04em]"
            />
          </div>
          <FadeIn className="md:col-span-3" delay={0.2}>
            <p className="text-paper/60 md:text-right">
              Eventos, programas e editais abertos para quem faz parte do ecossistema.
            </p>
          </FadeIn>
        </header>

        <m.ul
          className="mt-16 grid auto-rows-[minmax(15rem,auto)] gap-4 md:mt-24 md:grid-cols-6 md:gap-5"
          variants={staggerContainer({ stagger: 0.1 })}
          initial="hidden"
          whileInView="visible"
          viewport={viewportEarly}
        >
          {ecosystemItems.map((item, index) => (
            <m.li key={item.id} variants={fadeUp} className={cn(ITEM_SPANS[index] ?? "md:col-span-2")}>
              <EventCard item={item} />
            </m.li>
          ))}

          {/* Card informativo */}
          <m.li variants={fadeUp} className="md:col-span-2">
            <TiltCard className="h-full" innerClassName="flex flex-col justify-between gap-8 p-6 md:p-8">
              <Radio className="h-8 w-8 text-brand-light" aria-hidden />
              <div>
                <p className="font-display text-2xl font-semibold leading-tight tracking-tight md:text-3xl">
                  Agenda viva, atualizada toda semana.
                </p>
                <p className="mt-3 text-sm text-paper/60">
                  Membros recebem as oportunidades em primeira mão.
                </p>
              </div>
            </TiltCard>
          </m.li>

          {/* CTA */}
          <m.li variants={fadeUp} className="md:col-span-4">
            <TiltCard
              className="h-full"
              maxTilt={4}
              innerClassName="flex flex-col justify-between gap-8 bg-paper p-6 text-ink md:flex-row md:items-end md:p-10"
            >
              <p className="max-w-[16ch] font-display text-[clamp(2rem,4vw,3.75rem)] font-semibold leading-[0.95] tracking-[-0.03em]">
                Tem um evento ou edital para o ecossistema?
              </p>
              <MagneticButton
                href="#contato"
                variant="dark"
                className="self-start md:self-auto"
                icon={<ArrowUpRight className="h-4 w-4" aria-hidden />}
              >
                Fale com o NERD
              </MagneticButton>
            </TiltCard>
          </m.li>
        </m.ul>
      </div>
    </section>
  );
}
