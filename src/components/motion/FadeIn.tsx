"use client";

import { m } from "framer-motion";
import type { ReactNode } from "react";

import { transitions } from "@/lib/animations";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Distância vertical inicial em px. */
  distance?: number;
  /** Fração do elemento visível para disparar (0..1). */
  amount?: number;
  once?: boolean;
}

export function FadeIn({
  children,
  className,
  delay = 0,
  distance = 40,
  amount = 0.3,
  once = true,
}: FadeInProps) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ ...transitions.reveal, delay }}
    >
      {children}
    </m.div>
  );
}
