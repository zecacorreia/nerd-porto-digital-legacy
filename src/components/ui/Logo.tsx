import Image from "next/image";

import wordmark from "@/assets/brand/porto-digital-nerd-white.png";
import { MARK_PATH } from "@/lib/site";
import { cn } from "@/lib/utils";

interface LogoProps {
  /** `light`: logo branco (fundos escuros). `dark`: invertido para fundos claros. */
  tone?: "light" | "dark";
  className?: string;
  priority?: boolean;
}

/** Assinatura "Porto Digital | NERD". Controle o tamanho pela altura (ex.: `h-7`). */
export function Logo({ tone = "light", className, priority = false }: LogoProps) {
  return (
    <Image
      src={wordmark}
      alt="Porto Digital NERD"
      priority={priority}
      className={cn("h-7 w-auto select-none", tone === "dark" && "invert", className)}
    />
  );
}

interface LogoMarkProps {
  className?: string;
}

/** Símbolo do Porto Digital (quadrado azul), em SVG inline: nítido em qualquer tamanho. */
export function LogoMark({ className }: LogoMarkProps) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden focusable="false" className={cn("h-10 w-10 select-none", className)}>
      <rect width="100" height="100" rx="12" className="fill-brand" />
      <path d={MARK_PATH} fill="#fff" />
    </svg>
  );
}
