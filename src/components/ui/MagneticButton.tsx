"use client";

import { m, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRouter } from "next/navigation";
import type { MouseEvent, PointerEvent, ReactNode } from "react";

import { transitions } from "@/lib/animations";
import { cn } from "@/lib/utils";

export type MagneticVariant = "primary" | "ghost" | "dark" | "outline";

interface MagneticButtonProps {
  children: ReactNode;
  /** Com `href` renderiza um link; sem, um `<button>`. */
  href?: string;
  type?: "button" | "submit";
  /** Abre o link em nova aba (destinos externos, como o WhatsApp). */
  external?: boolean;
  disabled?: boolean;
  variant?: MagneticVariant;
  /** Fração do deslocamento do cursor aplicada ao botão (0..1). */
  strength?: number;
  icon?: ReactNode;
  className?: string;
  ariaLabel?: string;
}

/*
 * Botões do RIZOMA DS ("Button – Semente Híbrida"): borda de 2px, raio medium, sombra tátil
 * "Depth" e rótulo em Montserrat Medium (sem caixa-alta). Mantém o preenchimento que sobe no hover.
 *  - primary: Highlight (support/coqueiral) — CTA principal sobre fundos escuros.
 *  - ghost: Negative — contorno e texto brancos.
 *  - dark: Primary (brand/porto-azul) com preenchimento marinho.
 *  - outline: contorno e texto marinho — secundário sobre fundos claros.
 */
const variantStyles: Record<MagneticVariant, { base: string; fill: string }> = {
  primary: {
    base: "border-marinho bg-coqueiral text-marinho hover:text-marinho",
    fill: "bg-branco",
  },
  ghost: {
    base: "border-branco bg-transparent text-branco hover:text-marinho",
    fill: "bg-branco",
  },
  dark: {
    base: "border-marinho bg-porto-azul text-branco hover:text-branco",
    fill: "bg-marinho",
  },
  outline: {
    base: "border-marinho bg-transparent text-marinho hover:text-branco",
    fill: "bg-marinho",
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
  external = false,
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
  const router = useRouter();
  // Rotas internas ("/membro", "/#numeros") navegam no client: sem reload nem preloader de novo.
  const isInternalRoute = href?.startsWith("/") ?? false;

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (!href || !isInternalRoute) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    router.push(href);
  }

  const sharedProps = {
    "aria-label": ariaLabel,
    onPointerMove: handlePointerMove,
    onPointerLeave: reset,
    style: { x: springX, y: springY },
    className: cn(
      "group relative inline-flex items-center justify-center overflow-hidden rounded-medium border-2 px-[22px] py-[14px] type-label-md shadow-depth transition-colors duration-500 ease-out-expo disabled:pointer-events-none disabled:opacity-60 md:px-7 md:py-4",
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
    <m.a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onClick={handleClick}
      onMouseEnter={isInternalRoute ? () => router.prefetch(href) : undefined}
      {...sharedProps}
    >
      {content}
    </m.a>
  ) : (
    <m.button type={type} disabled={disabled} {...sharedProps}>
      {content}
    </m.button>
  );
}
