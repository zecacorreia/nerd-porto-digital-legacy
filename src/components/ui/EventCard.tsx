"use client";

import { m, useInView } from "framer-motion";
import { ArrowUpRight, CalendarDays, GraduationCap, Landmark, type LucideIcon } from "lucide-react";
import { useRef } from "react";

import { TiltCard } from "@/components/ui/TiltCard";
import type { EcosystemItem, EcosystemItemKind } from "@/lib/content";
import { cn } from "@/lib/utils";

interface KindMeta {
  label: string;
  icon: LucideIcon;
  /** Classe de cor do selo. */
  accent: string;
}

const KIND_META: Record<EcosystemItemKind, KindMeta> = {
  evento: { label: "Evento", icon: CalendarDays, accent: "bg-brand text-paper" },
  programa: { label: "Programa", icon: GraduationCap, accent: "bg-aqua text-ink" },
  edital: { label: "Edital", icon: Landmark, accent: "bg-paper text-ink" },
};

export interface EventCardProps {
  item: EcosystemItem;
  className?: string;
}

/** Visual animado de fundo do card em destaque. Sem `filter: blur` e pausado fora da tela. */
function FeaturedArt() {
  const ref = useRef<HTMLDivElement>(null);
  const playing = useInView(ref);

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <m.div
        className="absolute -right-40 -top-40 h-[36rem] w-[36rem] bg-[radial-gradient(closest-side,rgb(20_80_239/0.6),transparent)]"
        animate={playing ? { scale: [1, 1.15, 1], x: [0, -30, 0] } : undefined}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <m.div
        className="absolute -bottom-44 right-1/4 h-[28rem] w-[28rem] bg-[radial-gradient(closest-side,rgb(107_149_255/0.22),transparent)]"
        animate={playing ? { scale: [1, 1.2, 1], y: [0, -20, 0] } : undefined}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      {[0, 1, 2].map((ring) => (
        <m.span
          key={ring}
          className="absolute right-[-10%] top-[-20%] rounded-full border border-paper/10"
          style={{ width: `${(ring + 2) * 12}rem`, height: `${(ring + 2) * 12}rem` }}
          animate={playing ? { rotate: ring % 2 === 0 ? 360 : -360 } : undefined}
          transition={{ duration: 40 + ring * 10, repeat: Infinity, ease: "linear" }}
        />
      ))}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(242_241_236/0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgb(242_241_236/0.05)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:linear-gradient(to_bottom_left,black,transparent_70%)]" />
    </div>
  );
}

export function EventCard({ item, className }: EventCardProps) {
  const meta = KIND_META[item.kind];
  const Icon = meta.icon;
  const featured = item.featured ?? false;

  return (
    <TiltCard className={cn("h-full", className)} beam={featured} maxTilt={featured ? 5 : 9}>
      {featured && <FeaturedArt />}

      <a
        href={item.href}
        data-cursor-label="Ver"
        className={cn(
          "relative z-10 flex h-full flex-col justify-between gap-10 p-6 md:p-8",
          featured && "min-h-[26rem] md:p-10",
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <span
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em]",
              meta.accent,
            )}
          >
            <Icon className="h-3.5 w-3.5" aria-hidden />
            {meta.label}
          </span>

          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-paper/20 transition-all duration-500 ease-out-expo group-hover/tilt:rotate-45 group-hover/tilt:border-brand group-hover/tilt:bg-brand group-hover/tilt:text-paper">
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </span>
        </div>

        <div>
          {featured && (
            <span className="mb-4 flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-brand-light">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-light opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-light" />
              </span>
              {item.status}
            </span>
          )}
          <h3
            className={cn(
              "font-display font-semibold leading-[0.95] tracking-[-0.03em]",
              featured ? "text-[clamp(3rem,7vw,7.5rem)]" : "text-2xl md:text-3xl",
            )}
          >
            {item.title}
          </h3>
          <p className={cn("mt-4 max-w-md text-paper/60", featured ? "text-base md:text-lg" : "text-sm")}>
            {item.description}
          </p>
        </div>
      </a>
    </TiltCard>
  );
}
