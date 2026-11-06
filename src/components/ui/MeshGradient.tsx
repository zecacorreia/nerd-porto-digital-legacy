"use client";

import { m, useInView, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useEffect, useRef } from "react";

import { SPRING_SOFT } from "@/lib/animations";
import { useFinePointer } from "@/lib/hooks";
import { cn } from "@/lib/utils";

interface GradientBlob {
  id: string;
  /** Posição/tamanho do blob. */
  className: string;
  /** Cor no centro do gradiente radial (o difuso vem do próprio gradiente, sem `filter: blur`). */
  color: string;
  /** Multiplicador de reação ao mouse (px por unidade normalizada). */
  depth: number;
  /** Keyframes de deriva contínua. */
  drift: { x: number[]; y: number[]; scale: number[] };
  duration: number;
}

const BLOBS: readonly GradientBlob[] = [
  {
    id: "brand",
    className: "left-[-20%] top-[-30%] h-[90vmax] w-[90vmax]",
    color: "rgb(20 80 239 / 0.85)",
    depth: 60,
    drift: { x: [0, 80, -40, 0], y: [0, 60, 30, 0], scale: [1, 1.1, 0.95, 1] },
    duration: 22,
  },
  {
    id: "brand-deep",
    className: "right-[-30%] top-[0%] h-[75vmax] w-[75vmax]",
    color: "rgb(14 0 75 / 0.8)",
    depth: -40,
    drift: { x: [0, -60, 40, 0], y: [0, 80, -30, 0], scale: [1, 0.9, 1.15, 1] },
    duration: 26,
  },
  {
    id: "brand-light",
    className: "bottom-[-45%] left-[15%] h-[70vmax] w-[70vmax]",
    color: "rgb(1 163 248 / 0.4)",
    depth: 90,
    drift: { x: [0, 50, -70, 0], y: [0, -50, 20, 0], scale: [1, 1.2, 1, 1] },
    duration: 30,
  },
  {
    id: "brand-accent",
    className: "bottom-[-20%] right-[-5%] h-[45vmax] w-[45vmax]",
    color: "rgb(20 80 239 / 0.5)",
    depth: -70,
    drift: { x: [0, -40, 30, 0], y: [0, -30, 40, 0], scale: [1, 1.15, 0.9, 1] },
    duration: 18,
  },
];

interface BlobLayerProps {
  blob: GradientBlob;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  playing: boolean;
}

function BlobLayer({ blob, pointerX, pointerY, playing }: BlobLayerProps) {
  const x = useTransform(pointerX, (v) => v * blob.depth);
  const y = useTransform(pointerY, (v) => v * blob.depth);

  return (
    <m.div className={cn("absolute", blob.className)} style={{ x, y }}>
      <m.div
        className="h-full w-full will-change-transform"
        style={{ background: `radial-gradient(closest-side, ${blob.color}, transparent)` }}
        // Só transform (compositado na GPU) e só enquanto o hero está visível.
        animate={playing ? blob.drift : undefined}
        transition={{ duration: blob.duration, repeat: Infinity, ease: "easeInOut" }}
      />
    </m.div>
  );
}

interface MeshGradientProps {
  className?: string;
}

/**
 * Gradiente "mesh" feito de gradientes radiais que derivam sozinhos e reagem
 * levemente ao mouse (apenas em ponteiro fino). Sem `filter: blur` nem blend modes:
 * cada blob é uma camada que só muda `transform`, o que mantém o scroll fluido.
 */
export function MeshGradient({ className }: MeshGradientProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useInView(ref);
  const finePointer = useFinePointer();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const pointerX = useSpring(rawX, SPRING_SOFT);
  const pointerY = useSpring(rawY, SPRING_SOFT);

  useEffect(() => {
    if (!finePointer || !isVisible) return;
    function handleMove(event: globalThis.PointerEvent) {
      // Normaliza para -0.5..0.5 em relação ao centro da janela.
      rawX.set(event.clientX / window.innerWidth - 0.5);
      rawY.set(event.clientY / window.innerHeight - 0.5);
    }
    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => window.removeEventListener("pointermove", handleMove);
  }, [finePointer, isVisible, rawX, rawY]);

  return (
    <div ref={ref} aria-hidden className={cn("absolute inset-0 overflow-hidden bg-ink", className)}>
      {BLOBS.map((blob) => (
        <BlobLayer key={blob.id} blob={blob} pointerX={pointerX} pointerY={pointerY} playing={isVisible} />
      ))}
      {/* Grid técnico com fade radial (estático) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(247_252_251/0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgb(247_252_251/0.06)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />
      {/* Granulado estático, sem blend mode (evita recomposição a cada frame) */}
      <div className="noise absolute inset-0" />
      {/* Vinheta para legibilidade do texto */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
    </div>
  );
}
