"use client";

import { animate, m, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { useEffect } from "react";

import { Logo, LogoMark } from "@/components/ui/Logo";
import { EASE_IN_OUT_QUART, letterReveal, staggerContainer, transitions } from "@/lib/animations";

interface PreloaderProps {
  onComplete: () => void;
  /** Duração da contagem em segundos. */
  duration?: number;
}

const LOGO = "NERD";

export function Preloader({ onComplete, duration = 1.8 }: PreloaderProps) {
  const reduceMotion = useReducedMotion();
  const progress = useMotionValue(0);
  const counter = useTransform(progress, (v) => Math.round(v).toString().padStart(3, "0"));
  const barScale = useTransform(progress, [0, 100], [0, 1]);

  useEffect(() => {
    const controls = animate(progress, 100, {
      duration: reduceMotion ? 0.2 : duration,
      ease: EASE_IN_OUT_QUART,
      onComplete: () => {
        window.setTimeout(onComplete, reduceMotion ? 0 : 250);
      },
    });
    return () => controls.stop();
  }, [duration, onComplete, progress, reduceMotion]);

  return (
    <m.div
      role="status"
      aria-live="polite"
      aria-label="Carregando"
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-ink px-5 py-6 text-paper md:px-10 md:py-8"
      initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
      exit={{ clipPath: "inset(0% 0% 100% 0%)", transition: transitions.curtain }}
    >
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.12em] text-paper/60">
        <Logo priority className="h-5 md:h-6" />
        <span>Recife — PE</span>
      </div>

      <m.div
        className="flex items-end gap-[3vw]"
        exit={{ y: -60, opacity: 0, transition: transitions.fast }}
      >
        <m.span
          className="mb-[0.6vw] block"
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 180, damping: 16, delay: 0.05 }}
        >
          <LogoMark className="h-[clamp(3.25rem,13vw,11.5rem)] w-[clamp(3.25rem,13vw,11.5rem)]" />
        </m.span>
        <m.span
          aria-hidden
          className="flex overflow-hidden font-display text-[clamp(4.5rem,18vw,16rem)] font-bold leading-[0.85] tracking-[-0.02em]"
          variants={staggerContainer({ stagger: 0.08, delay: 0.1 })}
          initial="hidden"
          animate="visible"
        >
          {Array.from(LOGO).map((letter, i) => (
            <m.span key={`${letter}-${i}`} variants={letterReveal} className="inline-block">
              {letter}
            </m.span>
          ))}
        </m.span>
      </m.div>

      <div className="flex flex-col gap-4">
        <div className="flex items-end justify-between">
          <span className="max-w-[22ch] text-sm text-paper/60">
            Núcleo de Empreendedorismo e Residência Digital
          </span>
          <m.span className="font-display text-5xl tabular-nums md:text-7xl">{counter}</m.span>
        </div>
        <div className="h-px w-full bg-paper/15">
          <m.div className="h-full origin-left bg-brand" style={{ scaleX: barScale }} />
        </div>
      </div>
    </m.div>
  );
}
