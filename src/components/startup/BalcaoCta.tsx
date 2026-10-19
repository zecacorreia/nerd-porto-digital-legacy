"use client";

import { ArrowUpRight } from "lucide-react";

import { FadeIn } from "@/components/motion/FadeIn";
import { SplitText } from "@/components/motion/SplitText";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { MeshGradient } from "@/components/ui/MeshGradient";
import { whatsappLink } from "@/lib/site";
import { BALCAO_URL, STARTUP_WHATSAPP_MESSAGE } from "@/lib/startup";

/** Chamada final: o Balcão de Empreendedorismo indica o programa certo para o estágio da startup. */
export function BalcaoCta() {
  return (
    <section aria-label="Por onde começar" className="relative isolate overflow-hidden bg-ink text-paper">
      <div className="absolute inset-0 -z-10 opacity-60">
        <MeshGradient />
      </div>
      <div className="mx-auto flex min-h-[80svh] max-w-[1600px] flex-col justify-center px-5 py-24 md:px-10 md:py-32">
        <FadeIn>
          <span className="text-xs uppercase tracking-[0.25em] text-brand-light">Por onde começar?</span>
        </FadeIn>
        <SplitText
          as="h2"
          trigger="inView"
          text="Balcão de Empreendedorismo."
          highlight={["Empreendedorismo."]}
          className="mt-6 max-w-[14ch] font-display text-[clamp(2rem,8vw,8.5rem)] font-semibold leading-[0.9] tracking-[-0.045em]"
        />
        <FadeIn delay={0.2}>
          <p className="mt-8 max-w-lg text-base text-paper/70 md:text-lg">
            Encontre o programa certo para o estágio da sua startup: da primeira ideia à expansão internacional.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <MagneticButton href={BALCAO_URL} external icon={<ArrowUpRight className="h-4 w-4" aria-hidden />}>
              Acessar o Balcão de Empreendedorismo
            </MagneticButton>
            <MagneticButton
              href={whatsappLink(STARTUP_WHATSAPP_MESSAGE)}
              external
              variant="ghost"
              icon={<ArrowUpRight className="h-4 w-4" aria-hidden />}
            >
              Falar com o NERD
            </MagneticButton>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
