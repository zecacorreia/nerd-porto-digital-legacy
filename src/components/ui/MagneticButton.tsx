"use client";

import { m, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { PointerEvent, ReactNode } from "react";

import { transitions } from "@/lib/animations";
import { cn } from "@/lib/utils";

export type MagneticVariant = "primary" | "ghost" | "dark";

interface MagneticButtonProps {
  children: ReactNode;
  /** Com `href` renderiza um link; sem, um `<button>`. */
  href?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  variant?: MagneticVariant;
  /** Fração do deslocamento do cursor aplicada ao botão (0..1). */
  strength?: number;
  icon?: ReactNode;
  className?: string;
  ariaLabel?: string;
}

const variantStyles: Record<MagneticVariant, { base: string; fill: string }> = {
  primary: {
    base: "bg-brand text-paper hover:text-ink",
    fill: "bg-paper",
  },
  ghost: {
    base: "border border-paper/30 text-paper hover:text-ink",
    fill: "bg-paper",
  },
  dark: {
    base: "bg-ink text-paper hover:text-paper",
    fill: "bg-brand",
  },
};

/**
 * Botão que é "atraído" pelo cursor. Em toque o magnetismo é ignorado
 * (só reage a `pointerType === "mouse"`), mantendo o tap previsível.
 */
export function MagneticButton({
  children,
  href,
  type = "button",
  disabled = false,
  variant = "primary",
  strength = 0.35,
  icon,
  className,
  ariaLabel,
}: MagneticButtonProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, transitions.magnetic);
  const springY = useSpring(y, transitions.magnetic);
  // O conteúdo interno se move um pouco mais que a "casca" → sensação de profundidade.
  const innerX = useTransform(springX, (v) => v * 0.45);
  const innerY = useTransform(springY, (v) => v * 0.45);

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    if (event.pointerType !== "mouse" || disabled) return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  const styles = variantStyles[variant];

  const sharedProps = {
    "aria-label": ariaLabel,
    onPointerMove: handlePointerMove,
    onPointerLeave: reset,
    style: { x: springX, y: springY },
    className: cn(
      "group relative inline-flex items-center justify-center overflow-hidden rounded-full px-7 py-4 text-sm font-medium uppercase tracking-[0.14em] transition-colors duration-500 ease-out-expo disabled:pointer-events-none disabled:opacity-60 md:px-9 md:py-5",
      styles.base,
      className,
    ),
  };

  const content = (
    <>
      {/* Preenchimento que sobe no hover */}
      <span
        aria-hidden
        className={cn(
          "absolute left-1/2 top-full aspect-square w-[160%] -translate-x-1/2 rounded-full transition-transform duration-700 ease-out-expo group-hover:-translate-y-[70%]",
          styles.fill,
        )}
      />
      <m.span style={{ x: innerX, y: innerY }} className="relative z-10 flex items-center gap-3">
        {children}
        {icon && (
          <span className="transition-transform duration-500 ease-out-expo group-hover:rotate-45">{icon}</span>
        )}
      </m.span>
    </>
  );

  return href ? (
    <m.a href={href} {...sharedProps}>
      {content}
    </m.a>
  ) : (
    <m.button type={type} disabled={disabled} {...sharedProps}>
      {content}
    </m.button>
  );
}
