"use client";

import { AnimatePresence, m } from "framer-motion";
import { ArrowUpRight, CalendarDays, GraduationCap, Landmark, type LucideIcon } from "lucide-react";
import { useState } from "react";

import { FadeIn } from "@/components/motion/FadeIn";
import { SplitText } from "@/components/motion/SplitText";
import { TiltCard } from "@/components/ui/TiltCard";
import {
  agendaFilters,
  agendaItems,
  agendaSection,
  type AgendaCategory,
  type AgendaFilter,
  type AgendaItem,
  isExternalHref,
} from "@/lib/content";
import { cn } from "@/lib/utils";

interface CategoryMeta {
  icon: LucideIcon;
  /** Selo da categoria. */
  badge: string;
  /** Faixa gráfica no topo do card (no lugar de foto). */
  art: string;
}

const CATEGORY_META: Record<AgendaCategory, CategoryMeta> = {
  eventos: {
    icon: CalendarDays,
    badge: "bg-brand text-paper",
    art: "bg-[radial-gradient(120%_140%_at_85%_0%,#1450ef_0%,#081a52_70%)]",
  },
  editais: {
    icon: Landmark,
    badge: "bg-coqueiral text-brand-deep",
    art: "bg-[radial-gradient(120%_140%_at_85%_0%,#3d7a00_0%,#0e2a14_70%)]",
  },
  cursos: {
    icon: GraduationCap,
    badge: "bg-brand-deep text-paper",
    art: "bg-[radial-gradient(120%_140%_at_85%_0%,#3f00e5_0%,#0e004b_70%)]",
  },
};

function AgendaCard({ item }: { item: AgendaItem }) {
  const meta = CATEGORY_META[item.category];
  const Icon = meta.icon;

  return (
    <m.li
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4 }}
    >
      <TiltCard className="h-full" innerClassName="flex h-full flex-col text-paper" maxTilt={4}>
        <div className={cn("relative flex aspect-[2/1] items-center justify-center overflow-hidden", meta.art)}>
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(to_right,rgb(247_252_251/0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgb(247_252_251/0.06)_1px,transparent_1px)] bg-[size:40px_40px]"
          />
          <Icon className="relative h-12 w-12 text-paper/80" strokeWidth={1.25} aria-hidden />
        </div>

        <div className="flex flex-1 flex-col gap-4 p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={cn(
                "rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em]",
                meta.badge,
              )}
            >
              {item.tag}
            </span>
            <span className="rounded-full border border-paper/25 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-paper/80">
              {item.detail}
            </span>
          </div>

          <h3 className="font-display text-xl font-semibold leading-[1.1] tracking-[-0.01em] md:text-2xl">
            {item.title}
          </h3>
          <p className="text-sm text-paper/60 md:text-base">{item.description}</p>
          <p className="mt-auto pt-2 text-sm font-medium text-paper">{item.footer}</p>
        </div>
      </TiltCard>
    </m.li>
  );
}

function FilterPill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "shrink-0 rounded-full border px-5 py-2.5 text-sm font-medium transition-colors duration-300 md:text-base",
        active
          ? "border-ink bg-ink text-paper"
          : "border-ink/20 text-ink hover:border-ink",
      )}
    >
      {label}
    </button>
  );
}

export function Agenda() {
  const [filter, setFilter] = useState<AgendaFilter>("todos");
  const items = filter === "todos" ? agendaItems : agendaItems.filter((item) => item.category === filter);
  const { cta } = agendaSection;

  return (
    <section
      id="agora-no-ecossistema"
      aria-label="Agenda e oportunidades"
      className="relative scroll-mt-20 bg-paper py-24 text-ink md:py-40"
    >
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <header className="grid gap-8 md:grid-cols-12 md:items-end">
          <FadeIn className="md:col-span-3">
            <span className="text-xs uppercase tracking-[0.12em] text-ink/50">(07) — Agenda</span>
          </FadeIn>
          <div className="md:col-span-9">
            <SplitText
              as="h2"
              trigger="inView"
              text={agendaSection.title}
              highlight={["oportunidades"]}
              highlightClassName="text-brand"
              className="font-display text-[clamp(2.5rem,6vw,6.5rem)] font-semibold leading-[0.95] tracking-[-0.02em]"
            />
          </div>
        </header>

        <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-12">
          <FadeIn delay={0.1} className="md:col-span-6 md:col-start-4">
            <p className="text-lg text-ink/70 md:text-xl">{agendaSection.text}</p>
          </FadeIn>
        </div>

        <FadeIn className="mt-12 md:mt-16">
          <div role="group" aria-label={agendaSection.filterLabel} className="flex flex-wrap gap-3">
            {agendaFilters.map((option) => (
              <FilterPill
                key={option.id}
                label={option.label}
                active={filter === option.id}
                onClick={() => setFilter(option.id)}
              />
            ))}
          </div>
        </FadeIn>

        <ul
          aria-live="polite"
          className="mt-8 grid gap-4 md:grid-cols-2 md:gap-5 xl:grid-cols-3"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {items.map((item) => (
              <AgendaCard key={item.id} item={item} />
            ))}
          </AnimatePresence>
        </ul>

        {items.length === 0 && <p className="mt-8 text-lg text-ink/60">{agendaSection.empty}</p>}

        <FadeIn className="mt-12">
          <a
            href={cta.href}
            target={isExternalHref(cta.href) ? "_blank" : undefined}
            rel={isExternalHref(cta.href) ? "noopener noreferrer" : undefined}
            className="group inline-flex items-center gap-2 font-medium text-brand underline-offset-4 hover:underline"
          >
            {cta.label}
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:rotate-45"
              aria-hidden
            />
          </a>
        </FadeIn>
      </div>
    </section>
  );
}
