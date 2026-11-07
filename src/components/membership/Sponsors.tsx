"use client";

import { ArrowUpRight } from "lucide-react";

import { FadeIn } from "@/components/motion/FadeIn";
import { specialistWhatsappHref } from "@/lib/content";
import { sponsorSection } from "@/lib/membership";

/** Faixa azul das modalidades Sponsor (detalhes tratados com especialista). */
export function Sponsors() {
  return (
    <section aria-label="Modalidades Sponsor" className="relative overflow-hidden bg-brand py-20 text-paper md:py-28">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <FadeIn className="max-w-5xl">
          <p className="font-display text-[clamp(1.75rem,3.6vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.02em]">
            {sponsorSection.before}
          </p>
          <a
            href={specialistWhatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-8 inline-flex items-center gap-2 text-lg font-medium underline decoration-paper/40 underline-offset-8 transition-colors hover:decoration-paper"
          >
            {sponsorSection.cta}
            <ArrowUpRight
              className="h-5 w-5 transition-transform duration-500 ease-out-expo group-hover:rotate-45"
              aria-hidden
            />
          </a>
        </FadeIn>
      </div>
    </section>
  );
}
