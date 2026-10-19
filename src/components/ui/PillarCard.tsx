import {
  GraduationCap,
  Handshake,
  Network,
  ScanSearch,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";

import { TiltCard } from "@/components/ui/TiltCard";
import type { PathId, PathPillar, PillarIcon } from "@/lib/content";
import { cn } from "@/lib/utils";

const PILLAR_ICONS: Record<PillarIcon, LucideIcon> = {
  curadoria: ScanSearch,
  rede: Network,
  talentos: Users,
  formacao: GraduationCap,
  mercado: Handshake,
  capital: TrendingUp,
};

interface PillarTheme {
  wrapper: string;
  surface: string;
  muted: string;
  badge: string;
  glow: string;
}

/** Cada caminho tem seu "universo" visual. Superfícies opacas para empilhar no mobile. */
export const PILLAR_THEMES: Record<PathId, PillarTheme> = {
  empresas: {
    wrapper: "bg-ink/10",
    surface: "bg-paper-dim text-ink",
    muted: "text-ink/60",
    badge: "bg-ink text-paper",
    glow: "rgb(20 80 239 / 0.9)",
  },
  startups: {
    wrapper: "bg-paper/20",
    surface: "bg-brand-deep text-paper",
    muted: "text-paper/70",
    badge: "bg-paper text-brand",
    glow: "rgb(255 255 255 / 0.9)",
  },
};

export interface PillarCardProps {
  pillar: PathPillar;
  pathId: PathId;
  index: number;
  className?: string;
}

export function PillarCard({ pillar, pathId, index, className }: PillarCardProps) {
  const theme = PILLAR_THEMES[pathId];
  const Icon = PILLAR_ICONS[pillar.icon];

  return (
    <TiltCard
      className={cn(theme.wrapper, className)}
      innerClassName={cn("flex flex-col justify-between gap-10 p-7 md:p-9", theme.surface)}
      glowColor={theme.glow}
      maxTilt={7}
    >
      <div className="flex items-start justify-between">
        <span className={cn("font-display text-sm tabular-nums", theme.muted)}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <span
          className={cn(
            "flex h-14 w-14 items-center justify-center rounded-full transition-transform duration-700 ease-out-expo group-hover/tilt:rotate-[360deg]",
            theme.badge,
          )}
        >
          <Icon className="h-6 w-6" aria-hidden />
        </span>
      </div>

      <div>
        <h4 className="font-display text-3xl font-semibold leading-[1] tracking-[-0.03em] md:text-4xl">
          {pillar.title}
        </h4>
        <p className={cn("mt-4 text-sm md:text-base", theme.muted)}>{pillar.description}</p>
      </div>
    </TiltCard>
  );
}
