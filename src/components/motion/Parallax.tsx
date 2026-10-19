"use client";

import { m, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

import { SPRING_SOFT } from "@/lib/animations";

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  /**
   * Deslocamento máximo em px enquanto o elemento atravessa a viewport.
   * Positivo = mais lento que o scroll (fica "atrás"); negativo = mais rápido.
   */
  offset?: number;
  axis?: "x" | "y";
  /** Suaviza o movimento com spring. */
  smooth?: boolean;
}

export function Parallax({ children, className, offset = 80, axis = "y", smooth = true }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const raw = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  const spring = useSpring(raw, SPRING_SOFT);
  const value = smooth ? spring : raw;

  const style = reduceMotion ? undefined : axis === "y" ? { y: value } : { x: value };

  return (
    <m.div ref={ref} className={className} style={style}>
      {children}
    </m.div>
  );
}
