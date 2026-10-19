"use client";

import { m, useAnimationFrame, useInView, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, useVelocity } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";

import { cn, wrap } from "@/lib/utils";

interface MarqueeProps {
  children: ReactNode;
  /** Velocidade base em % da largura de uma cópia por segundo. Negativo = para a direita. */
  baseVelocity?: number;
  /** Quantas cópias do conteúdo compõem o trilho (≥ 2 para cobrir telas largas). */
  copies?: number;
  /** Pausa quando o mouse está sobre o trilho. */
  pauseOnHover?: boolean;
  className?: string;
}

/**
 * Faixa infinita cuja velocidade reage ao scroll: rolar rápido acelera,
 * rolar para cima inverte o sentido. Totalmente decorativa (`aria-hidden`);
 * o conteúdo deve existir de forma acessível em outro lugar da página.
 */
export function Marquee({
  children,
  baseVelocity = 8,
  copies = 4,
  pauseOnHover = true,
  className,
}: MarqueeProps) {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  // Fora da tela o loop não calcula nada (economiza CPU durante o resto do scroll).
  const isInView = useInView(containerRef, { margin: "100px 0px" });
  const visible = useRef(false);
  useEffect(() => {
    visible.current = isInView;
  }, [isInView]);
  const baseX = useMotionValue(0);
  const direction = useRef(1);
  const paused = useRef(false);

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], { clamp: false });

  // O trilho tem `copies` cópias; deslocar exatamente uma cópia (100/copies %) fecha o loop.
  const span = 100 / copies;
  const x = useTransform(baseX, (v) => `${wrap(-span, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (reduceMotion || paused.current || !visible.current) return;
    const factor = velocityFactor.get();
    if (factor < 0) direction.current = -1;
    else if (factor > 0) direction.current = 1;

    const step = direction.current * (baseVelocity / 100) * span * (delta / 1000);
    baseX.set(baseX.get() - (step + step * Math.abs(factor)));
  });

  return (
    <div
      ref={containerRef}
      aria-hidden
      className={cn("overflow-hidden whitespace-nowrap", className)}
      onPointerEnter={(e) => {
        if (pauseOnHover && e.pointerType === "mouse") paused.current = true;
      }}
      onPointerLeave={() => {
        paused.current = false;
      }}
    >
      <m.div className="flex w-max flex-nowrap will-change-transform" style={{ x }}>
        {Array.from({ length: copies }, (_, i) => (
          <div key={i} className="flex shrink-0 flex-nowrap items-center">
            {children}
          </div>
        ))}
      </m.div>
    </div>
  );
}
