"use client";

import { ArrowUpRight } from "lucide-react";

import { TubaraoOndas } from "@/components/decor/Decor";
import { FadeIn } from "@/components/motion/FadeIn";
import { SplitText } from "@/components/motion/SplitText";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { MeshGradient } from "@/components/ui/MeshGradient";
import { whatsappLink } from "@/lib/site";
import { BALCAO_URL, STARTUP_WHATSAPP_MESSAGE, balcaoSection } from "@/lib/startup";

/** Chamada final: o Balcão de Empreendedorismo indica o programa certo para o estágio da startup. */
export function BalcaoCta() {
  return (
    <section
      id={balcaoSection.id}
      aria-label="Por onde começar"
      className="relative isolate scroll-mt-20 overflow-hidden bg-ink text-paper"
    >
      <div className="absolute inset-0 -z-10 opacity-60">
        <MeshGradient />
      </div>
      {/* Tubarão emergindo das ondas, no canto inferior direito */}
      <TubaraoOndas className="absolute -bottom-px right-0 -z-[5] w-[min(34rem,78vw)] md:right-[6vw]" />
      <div className="mx-auto flex min-h-[80svh] max-w-[1600px] flex-col justify-center px-5 py-24 md:px-10 md:py-32">
        <FadeIn>
          <span className="text-xs uppercase tracking-[0.12em] text-brand-light">
            {balcaoSection.eyebrow}
          </span>
        </FadeIn>
        <SplitText
          as="h2"
          trigger="inView"
          text={balcaoSection.title}
          highlight={balcaoSection.highlight}
          className="mt-6 max-w-[14ch] font-display text-[clamp(2rem,8vw,8.5rem)] font-semibold leading-[0.9] tracking-[-0.02em]"
        />
        <FadeIn delay={0.2}>
          <p className="mt-8 max-w-lg text-base text-paper/70 md:text-lg">
            {balcaoSection.text}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <MagneticButton
              href={BALCAO_URL}
              external
              icon={<ArrowUpRight className="h-4 w-4" aria-hidden />}
            >
              {balcaoSection.primaryCta}
            </MagneticButton>
            <MagneticButton
              href={whatsappLink(STARTUP_WHATSAPP_MESSAGE)}
              external
              variant="ghost"
              icon={<ArrowUpRight className="h-4 w-4" aria-hidden />}
            >
              {balcaoSection.secondaryCta}
            </MagneticButton>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
