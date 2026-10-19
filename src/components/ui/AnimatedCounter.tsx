"use client";

import { animate, m, useInView, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

import { EASE_OUT_EXPO } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface AnimatedCounterProps {
  value: number;
  /** Duração em segundos. */
  duration?: number;
  delay?: number;
  className?: string;
  locale?: string;
}

/** Conta de 0 até `value` quando entra na viewport (uma única vez). */
export function AnimatedCounter({
  value,
  duration = 2.2,
  delay = 0,
  className,
  locale = "pt-BR",
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });
  const reduceMotion = useReducedMotion();
  const count = useMotionValue(0);
  const display = useTransform(count, (v) => Math.round(v).toLocaleString(locale));

  useEffect(() => {
    if (!isInView) return;
    if (reduceMotion) {
      count.set(value);
      return;
    }
    const controls = animate(count, value, { duration, delay, ease: EASE_OUT_EXPO });
    return () => controls.stop();
  }, [count, delay, duration, isInView, reduceMotion, value]);

  return (
    <span className={cn("tabular-nums", className)}>
      {/* Valor final para SEO/leitores de tela; o número animado é decorativo. */}
      <span className="sr-only">{value.toLocaleString(locale)}</span>
      <m.span ref={ref} aria-hidden>
        {display}
      </m.span>
    </span>
  );
}
