"use client";

import { m } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { FadeIn } from "@/components/motion/FadeIn";
import { SplitText } from "@/components/motion/SplitText";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { fadeUp, staggerContainer, viewportEarly } from "@/lib/animations";
import { sponsorTiers } from "@/lib/membership";
import { whatsappLink } from "@/lib/site";

/** Faixa azul das modalidades Sponsor (detalhes tratados com especialista). */
export function Sponsors() {
  return (
    <section aria-label="Modalidades Sponsor" className="relative overflow-hidden bg-brand py-24 text-paper md:py-32">
      <div className="mx-auto grid max-w-[1600px] gap-12 px-5 md:px-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-6">
          <FadeIn>
            <span className="text-xs uppercase tracking-[0.12em] text-paper/70">(04) — Sponsor</span>
          </FadeIn>
          <SplitText
            as="h2"
            trigger="inView"
            text="Quer apoiar o ecossistema em maior escala?"
            highlight={["maior", "escala?"]}
            highlightClassName="text-ink"
            className="mt-6 max-w-[14ch] font-display text-[clamp(2.5rem,5.5vw,5.5rem)] font-semibold leading-[0.92] tracking-[-0.02em]"
          />
          <FadeIn delay={0.2}>
            <p className="mt-8 max-w-md text-paper/80">
              Além dos planos, o NERD tem modalidades Sponsor para empresas que querem ir além. Fale com um
              especialista para montar o formato ideal.
            </p>
            <div className="mt-10">
              <MagneticButton
                href={whatsappLink("Olá! Quero saber mais sobre as modalidades Sponsor do NERD.")}
                external
                variant="dark"
                icon={<ArrowUpRight className="h-4 w-4" aria-hidden />}
              >
                Falar com especialista
              </MagneticButton>
            </div>
          </FadeIn>
        </div>

        <m.ol
          className="lg:col-span-6"
          variants={staggerContainer({ stagger: 0.12 })}
          initial="hidden"
          whileInView="visible"
          viewport={viewportEarly}
        >
          {sponsorTiers.map((tier, index) => (
            <m.li
              key={tier}
              variants={fadeUp}
              className="group flex items-baseline justify-between gap-6 border-t border-paper/25 py-5 last:border-b md:py-7"
            >
              <span className="font-display text-sm tabular-nums text-paper/60">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="mr-auto font-display text-[clamp(2.5rem,6vw,5.5rem)] font-semibold leading-none tracking-[-0.02em] transition-transform duration-500 ease-out-expo group-hover:translate-x-3">
                {tier}
              </span>
            </m.li>
          ))}
        </m.ol>
      </div>
    </section>
  );
}
