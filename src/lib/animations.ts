import type { Transition, Variants } from "framer-motion";

/* ------------------------------------------------------------------ */
/* Easings                                                             */
/* ------------------------------------------------------------------ */

export type CubicBezier = [number, number, number, number];

export const EASE_OUT_EXPO: CubicBezier = [0.16, 1, 0.3, 1];
export const EASE_IN_OUT_QUART: CubicBezier = [0.76, 0, 0.24, 1];
export const EASE_OUT_QUART: CubicBezier = [0.25, 1, 0.5, 1];

/* ------------------------------------------------------------------ */
/* Transitions                                                         */
/* ------------------------------------------------------------------ */

export const transitions = {
  reveal: { duration: 1.1, ease: EASE_OUT_EXPO },
  fast: { duration: 0.5, ease: EASE_OUT_EXPO },
  curtain: { duration: 1, ease: EASE_IN_OUT_QUART },
  magnetic: { type: "spring", stiffness: 150, damping: 15, mass: 0.1 },
  tilt: { type: "spring", stiffness: 260, damping: 22 },
} as const satisfies Record<string, Transition>;

/** Spring compartilhada para valores contínuos (cursor, magnetismo, parallax). */
export const SPRING_SOFT = { stiffness: 120, damping: 20, mass: 0.4 } as const;

/* ------------------------------------------------------------------ */
/* Variants                                                            */
/* ------------------------------------------------------------------ */

/** Sobe e aparece. Use `custom` para distância (px). */
export const fadeUp: Variants = {
  hidden: (distance: number = 40) => ({ opacity: 0, y: distance }),
  visible: { opacity: 1, y: 0, transition: transitions.reveal },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transitions.reveal },
};

/**
 * Mask reveal: o filho desliza de baixo para cima dentro de um pai com
 * `overflow: hidden`. Ideal para linhas de título.
 */
export const maskReveal: Variants = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: transitions.reveal },
};

/** Revelação via clip-path (imagens, blocos de cor). */
export const clipReveal: Variants = {
  hidden: { clipPath: "inset(100% 0% 0% 0%)" },
  visible: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 1.2, ease: EASE_IN_OUT_QUART } },
};

/**
 * Linha que cresce da esquerda para a direita. Use `custom` para o atraso (s).
 * Dispare pelo PAI (initial/whileInView): com scaleX 0 a própria linha não tem área visível.
 */
export const lineGrow: Variants = {
  hidden: { scaleX: 0 },
  visible: (delay: number = 0) => ({
    scaleX: 1,
    transition: { duration: 1.2, ease: EASE_OUT_EXPO, delay },
  }),
};

/** Letra individual do texto escalonado. */
export const letterReveal: Variants = {
  hidden: { y: "105%", rotate: 8, opacity: 0 },
  visible: {
    y: "0%",
    rotate: 0,
    opacity: 1,
    transition: { duration: 0.9, ease: EASE_OUT_EXPO },
  },
};

export interface StaggerOptions {
  stagger?: number;
  delay?: number;
}

/** Container que dispara os filhos em cascata. */
export function staggerContainer({ stagger = 0.06, delay = 0 }: StaggerOptions = {}): Variants {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };
}

/* ------------------------------------------------------------------ */
/* Viewport presets                                                    */
/* ------------------------------------------------------------------ */

export const viewportOnce = { once: true, amount: 0.3 } as const;
export const viewportEarly = { once: true, margin: "0px 0px -15% 0px" } as const;

/** Springs para valores contínuos guiados pelo ponteiro. */
export const TILT_SPRING = { stiffness: 260, damping: 22, mass: 0.6 } as const;
export const CURSOR_SPRING = { stiffness: 380, damping: 32, mass: 0.5 } as const;
