"use client";

import { m } from "framer-motion";

import { cn } from "@/lib/utils";

/*
 * "Ondas Azuis" (Figma, support/conexoes #00F0FF, traço 3.75px).
 * Cada linha é desenhada em duas metades a partir do centro (x≈357.76);
 * o viewBox corresponde à faixa visível no Hero (716 × 62).
 */
const ROWS = [7.49, 22.806, 38.1223, 53.4386, 68.7554];
const CREST = 7.4864; // amplitude (pico → vale) de cada onda

function halfPath(y: number, direction: 1 | -1): string {
  const start = 357.759;
  const up = (y - CREST).toFixed(3);
  const down = (y + CREST).toFixed(3);
  // 7 ondas de 51px para cada lado (mesma geometria do SVG exportado).
  let d = `M${start} ${y}`;
  for (let i = 0; i < 7; i++) {
    const x0 = start + direction * 51 * i;
    const c1 = x0 + direction * 16.902;
    const c2 = x0 + direction * 34.098;
    const x1 = x0 + direction * 51;
    const peak = i % 2 === (direction === 1 ? 0 : 1) ? up : down;
    d += ` C${c1.toFixed(3)} ${peak} ${c2.toFixed(3)} ${peak} ${x1.toFixed(3)} ${y}`;
  }
  return d;
}

interface WavesProps {
  className?: string;
  /** Inicia o desenho (ex.: quando um estado externo liberar a animação). */
  play?: boolean;
  delay?: number;
}

export function Waves({ className, play = true, delay = 0 }: WavesProps) {
  return (
    <svg
      viewBox="0 0 716 62"
      fill="none"
      aria-hidden
      className={cn("overflow-visible", className)}
    >
      {ROWS.flatMap((y, row) =>
        ([1, -1] as const).map((direction) => (
          <m.path
            key={`${row}-${direction}`}
            d={halfPath(y, direction)}
            stroke="currentColor"
            strokeWidth={3.75}
            strokeMiterlimit={10}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: play ? 1 : 0 }}
            transition={{
              duration: 1.2,
              ease: [0, 0, 0.58, 1],
              delay: delay + row * 0.08,
            }}
          />
        )),
      )}
    </svg>
  );
}
