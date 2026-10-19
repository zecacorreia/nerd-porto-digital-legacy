import Image from "next/image";

import wordmark from "@/assets/brand/porto-digital-nerd-white.png";
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

/** Geometria vetorizada do símbolo (viewBox 100×100) — fonte: src/assets/brand/nerd-mark.svg. */
const MARK_PATH =
  "M60.75 17.9H82.2V38.75H60.75ZM39.3 38.75H60.75V59.55H39.3ZM17.85 59.55H82.2V80.5H60.52V70.05A10.5 10.5 0 0 0 39.52 70.05V80.5H17.85ZM60.75 38.75L50.25 38.75A10.5 10.5 0 0 0 60.75 28.25ZM60.75 38.75L71.25 38.75A10.5 10.5 0 0 0 60.75 49.25ZM39.3 59.55L28.8 59.55A10.5 10.5 0 0 0 39.3 49.05ZM60.75 59.55L71.25 59.55A10.5 10.5 0 0 1 60.75 49.05Z";

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
