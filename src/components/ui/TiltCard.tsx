"use client";

import { m, useInView, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useRef, type PointerEvent, type ReactNode } from "react";

import { TILT_SPRING } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** Classes da superfície interna (fundo, padding). */
  innerClassName?: string;
  /** Inclinação máxima em graus. */
  maxTilt?: number;
  /** Cor do brilho da borda que segue o cursor. */
  glowColor?: string;
  /** Borda com gradiente girando continuamente (visível também no toque). */
  beam?: boolean;
}

/**
 * Card com tilt 3D guiado pelo mouse e borda que acende no ponto do cursor.
 * A borda é um wrapper com 1px de padding: o gradiente do wrapper aparece
 * apenas na fresta entre ele e a superfície interna.
 * Em toque não há tilt; o `beam` mantém a borda viva.
 */
export function TiltCard({
  children,
  className,
  innerClassName,
  maxTilt = 8,
  glowColor = "rgb(1 163 248 / 0.9)",
  beam = false,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  // Só o card com `beam` precisa saber se está visível (para pausar a rotação fora da tela).
  const isVisible = useInView(ref);

  // Posição normalizada (0..1) para o tilt e em px para os gradientes.
  const ratioX = useMotionValue(0.5);
  const ratioY = useMotionValue(0.5);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const rotateX = useSpring(useTransform(ratioY, [0, 1], [maxTilt, -maxTilt]), TILT_SPRING);
  const rotateY = useSpring(useTransform(ratioX, [0, 1], [-maxTilt, maxTilt]), TILT_SPRING);
  const glowOpacity = useSpring(0, { stiffness: 200, damping: 30 });

  const borderGlow = useMotionTemplate`radial-gradient(280px circle at ${pointerX}px ${pointerY}px, ${glowColor}, transparent 70%)`;
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${pointerX}px ${pointerY}px, rgb(247 252 251 / 0.07), transparent 60%)`;

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    pointerX.set(x);
    pointerY.set(y);
    ratioX.set(x / rect.width);
    ratioY.set(y / rect.height);
    glowOpacity.set(1);
  }

  function handlePointerLeave() {
    ratioX.set(0.5);
    ratioY.set(0.5);
    glowOpacity.set(0);
  }

  return (
    <m.div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={
        reduceMotion
          ? undefined
          : { rotateX, rotateY, transformPerspective: 1100, transformStyle: "preserve-3d" }
      }
      className={cn("group/tilt relative isolate rounded-large bg-ink-line p-px", className)}
    >
      {beam && (
        <span
          aria-hidden
          data-offscreen={!isVisible}
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[inherit]"
        >
          {/* Quadrado maior que a diagonal do card, girando no centro */}
          <span className="border-beam absolute left-1/2 top-1/2 aspect-square w-[150%] -translate-x-1/2 -translate-y-1/2 opacity-70" />
        </span>
      )}
      <m.span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit]"
        style={{ background: borderGlow, opacity: glowOpacity }}
      />

      <div className={cn("relative h-full overflow-hidden rounded-[calc(1.5rem-1px)] bg-ink-soft", innerClassName)}>
        <m.span
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: spotlight, opacity: glowOpacity }}
        />
        {children}
      </div>
    </m.div>
  );
}
