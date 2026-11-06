"use client";

import { animate, m, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

import { EASE_OUT_EXPO } from "@/lib/animations";
import { membershipPlans, type PlanId } from "@/lib/membership";
import { cn } from "@/lib/utils";

/** Cada quadradinho representa 10 Pixels; o maior plano (850) preenche a grade inteira. */
const PIXELS_PER_CELL = 10;
const TOTAL_CELLS = Math.max(...membershipPlans.map((plan) => plan.points)) / PIXELS_PER_CELL;

/**
 * "Carteira" interativa: escolher um plano acende a quantidade proporcional de Pixels.
 * As células usam transição CSS de cor com atraso escalonado (barato, sem JS por célula).
 */
export function PixelWallet() {
  const [planId, setPlanId] = useState<PlanId>("inova");
  const plan = membershipPlans.find((item) => item.id === planId) ?? membershipPlans[0]!;
  const filled = plan.points / PIXELS_PER_CELL;

  const reduceMotion = useReducedMotion();
  const points = useMotionValue(plan.points);
  const display = useTransform(points, (v) => Math.round(v).toLocaleString("pt-BR"));

  useEffect(() => {
    if (reduceMotion) {
      points.set(plan.points);
      return;
    }
    const controls = animate(points, plan.points, { duration: 0.9, ease: EASE_OUT_EXPO });
    return () => controls.stop();
  }, [plan.points, points, reduceMotion]);

  return (
    <div className="rounded-large border border-paper/10 bg-ink-soft p-6 md:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.12em] text-paper/50">Carteira anual</p>
          <p className="mt-3 flex items-baseline gap-2 font-display font-semibold tracking-[-0.02em]">
            <m.span className="text-6xl tabular-nums md:text-7xl" aria-live="polite">
              {display}
            </m.span>
            <span className="text-lg text-brand-light">Pixels</span>
          </p>
        </div>
        <span className="rounded-full bg-brand px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-paper">
          {plan.tier}
        </span>
      </div>

      {/* Grade de Pixels */}
      <div aria-hidden className="mt-8 grid grid-cols-[repeat(17,minmax(0,1fr))] gap-1 md:gap-1.5">
        {Array.from({ length: TOTAL_CELLS }, (_, index) => {
          const isOn = index < filled;
          return (
            <span
              key={index}
              className={cn(
                "aspect-square rounded-[3px] transition-colors duration-300",
                isOn ? "bg-brand" : "bg-paper/[0.07]",
              )}
              // Acende em onda a partir do início; apaga de trás para frente.
              style={{ transitionDelay: `${(isOn ? index : TOTAL_CELLS - index) * 6}ms` }}
            />
          );
        })}
      </div>
      <p className="mt-3 text-xs text-paper/40">Cada quadrado = {PIXELS_PER_CELL} Pixels NERD</p>

      {/* Seletor de plano */}
      <div role="radiogroup" aria-label="Simular plano" className="mt-8 grid grid-cols-3 gap-2">
        {membershipPlans.map((item) => {
          const active = item.id === planId;
          return (
            <button
              key={item.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => setPlanId(item.id)}
              className={cn(
                "rounded-large border px-3 py-3 text-left transition-colors duration-300",
                active ? "border-brand bg-brand/15" : "border-paper/10 hover:border-paper/30",
              )}
            >
              <span className="block text-sm font-medium">{item.name.replace("NERD ", "")}</span>
              <span className="block text-xs text-paper/50">{item.points} Pixels</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
