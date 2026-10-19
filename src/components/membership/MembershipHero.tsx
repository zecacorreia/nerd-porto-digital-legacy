"use client";

import { m } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";

import { PixelWallet } from "@/components/membership/PixelWallet";
import { SplitText } from "@/components/motion/SplitText";
import { useIntro } from "@/components/providers/IntroProvider";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { MeshGradient } from "@/components/ui/MeshGradient";
import { transitions } from "@/lib/animations";
import { membershipHero } from "@/lib/membership";
import { whatsappLink } from "@/lib/site";

export function MembershipHero() {
  const { isReady } = useIntro();

  const enter = (delay: number) => ({
    initial: { opacity: 0, y: 30 },
    animate: isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
    transition: { ...transitions.reveal, delay },
  });

  return (
    <section className="relative isolate overflow-hidden bg-ink text-paper">
      <div className="absolute inset-0 -z-10 opacity-70">
        <MeshGradient />
      </div>

      <div className="mx-auto grid min-h-[100svh] max-w-[1600px] items-center gap-12 px-5 pb-16 pt-32 md:px-10 lg:grid-cols-12 lg:pt-36">
        <div className="lg:col-span-7">
          <m.span className="block text-xs uppercase tracking-[0.25em] text-brand-light" {...enter(0.1)}>
            {membershipHero.eyebrow}
          </m.span>
          <SplitText
            as="h1"
            text={membershipHero.title}
            highlight={["seu", "jeito."]}
            play={isReady}
            delay={0.2}
            stagger={0.016}
            className="mt-6 max-w-[15ch] font-display text-[clamp(2.75rem,6vw,6.5rem)] font-semibold leading-[0.95] tracking-[-0.04em]"
          />
          <m.p className="mt-8 max-w-xl text-base text-paper/70 md:text-lg" {...enter(0.8)}>
            {membershipHero.intro}
          </m.p>
          <m.div className="mt-10 flex flex-wrap gap-3" {...enter(0.95)}>
            <MagneticButton href="#planos" icon={<ArrowDown className="h-4 w-4" aria-hidden />}>
              Ver planos
            </MagneticButton>
            <MagneticButton
              href={whatsappLink()}
              external
              variant="ghost"
              icon={<ArrowUpRight className="h-4 w-4" aria-hidden />}
            >
              Falar com especialista
            </MagneticButton>
          </m.div>
        </div>

        <m.div className="lg:col-span-5" {...enter(0.6)}>
          <PixelWallet />
        </m.div>
      </div>
    </section>
  );
}
