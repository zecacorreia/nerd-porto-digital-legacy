"use client";

import { m, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

import caranguejo from "@/assets/figma/hero/caranguejo.svg";
import marcoZero from "@/assets/figma/o-que-fazemos/marco-zero.png";
import ondas from "@/assets/figma/startups/ondas.svg";
import tubarao from "@/assets/figma/startups/tubarao.svg";
import { Waves } from "@/components/decor/Waves";
import { cn } from "@/lib/utils";

/*
 * Elementos visuais da marca (Figma "NERD_Diretrizes de Marca"): Marco Zero, tubarão, caranguejo
 * e ondas. Todos decorativos (aria-hidden), com animação contínua que só roda na tela.
 */

/** Marco Zero: gira devagar. Use `className` para tamanho e posição. */
export function MarcoZero({
  className,
  duration = 40,
}: {
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref);
  const reduce = useReducedMotion();
  return (
    <div
      ref={ref}
      aria-hidden
      className={cn("pointer-events-none select-none", className)}
    >
      <m.div
        className="size-full will-change-transform"
        animate={visible && !reduce ? { rotate: 360 } : undefined}
        transition={{ duration, ease: "linear", repeat: Infinity }}
      >
        <Image
          src={marcoZero}
          alt=""
          sizes="(min-width: 768px) 34vw, 70vw"
          className="size-full object-contain"
        />
      </m.div>
    </div>
  );
}

/** Caranguejo: balança de leve, como andando de lado. */
export function Caranguejo({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <m.div
      aria-hidden
      className={cn("pointer-events-none select-none", className)}
      animate={
        reduce ? undefined : { x: [0, 14, 0, -14, 0], rotate: [0, 2, 0, -2, 0] }
      }
      transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
    >
      <Image src={caranguejo} alt="" className="h-auto w-full" />
    </m.div>
  );
}

/**
 * Tubarão emergindo de uma faixa de ondas: ele sobe e desce e as ondas deslizam.
 * Proporção do Figma: ondas 221×31 e tubarão 64×56.
 */
export function TubaraoOndas({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none relative aspect-[221/72] select-none overflow-hidden",
        className,
      )}
    >
      <m.div
        className="absolute bottom-0 left-0 w-full"
        animate={reduce ? undefined : { x: ["0%", "-8%", "0%"] }}
        transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
      >
        <Image src={ondas} alt="" className="h-auto w-full" />
      </m.div>
      <m.div
        className="absolute -bottom-[8%] left-[33%] w-[29%]"
        animate={reduce ? undefined : { y: ["0%", "-9%", "0%"] }}
        transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
      >
        <Image src={tubarao} alt="" className="h-auto w-full" />
      </m.div>
    </div>
  );
}

/** Faixa de ondas que se desenha ao entrar na tela, com o caranguejo passeando por cima. */
export function FaixaOndas({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { once: true, amount: 0.4 });
  return (
    <div
      ref={ref}
      aria-hidden
      className={cn("pointer-events-none relative select-none", className)}
    >
      <Caranguejo className="absolute -top-9 left-[8%] z-10 w-16 md:-top-12 md:left-[14%] md:w-24" />
      <div className="mx-auto w-full max-w-[1100px] text-aqua">
        <Waves play={visible} />
      </div>
    </div>
  );
}
