"use client";

import { ArrowUpRight } from "lucide-react";

import { FadeIn } from "@/components/motion/FadeIn";
import { SplitText } from "@/components/motion/SplitText";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { PillarCard } from "@/components/ui/PillarCard";
import { isExternalHref, paths, type Path, type PathId } from "@/lib/content";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Tema por caminho                                                    */
/* ------------------------------------------------------------------ */

interface PathTheme {
  panel: string;
  muted: string;
  highlight: string;
  outline: string;
}

const PATH_THEMES: Record<PathId, PathTheme> = {
  empresas: {
    panel: "bg-paper text-ink",
    muted: "text-ink/60",
    highlight: "text-brand",
    outline: "text-ink/[0.06]",
  },
  startups: {
    panel: "bg-brand text-paper",
    muted: "text-paper/75",
    highlight: "text-ink",
    outline: "text-paper/15",
  },
};

/**
 * Seção de um caminho (empresas ou startups).
 *
 * Layout sem nenhum scroll horizontal: no desktop, título e CTAs ficam numa coluna
 * "sticky" à esquerda enquanto os cards rolam na vertical, à direita (grid de 2 colunas);
 * no mobile/tablet tudo empilha em uma coluna.
 */
function PathSection({ path, number }: { path: Path; number: string }) {
  const theme = PATH_THEMES[path.id];
  const isOdd = path.pillars.length % 2 === 1;

  return (
    <section
      id={path.anchor}
      aria-label={path.name}
      className={cn("relative isolate scroll-mt-20 overflow-hidden py-24 md:py-40", theme.panel)}
    >
      {/* Palavra gigante vazada ao fundo (decorativa) */}
      <span
        aria-hidden
        className={cn(
          "hollow pointer-events-none absolute -bottom-[0.1em] left-0 -z-10 select-none whitespace-nowrap font-display text-[24vw] font-bold uppercase leading-none tracking-[-0.02em]",
          theme.outline,
        )}
      >
        {path.id}
      </span>

      <div className="mx-auto grid max-w-[1600px] gap-12 px-5 md:px-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <div className="flex flex-col gap-8 lg:sticky lg:top-28">
            <FadeIn>
              <span className={cn("text-xs uppercase tracking-[0.12em]", theme.muted)}>
                ({number}) — {path.name}
              </span>
            </FadeIn>

            <SplitText
              as="h2"
              trigger="inView"
              text={path.title}
              highlight={path.highlight}
              highlightClassName={theme.highlight}
              className="font-display text-[clamp(2.5rem,5vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.02em]"
            />

            <FadeIn delay={0.2} className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {path.ctas.map((cta) => (
                <MagneticButton
                  key={cta.label}
                  href={cta.href}
                  external={isExternalHref(cta.href)}
                  variant={cta.variant}
                  className="w-full sm:w-auto"
                  icon={<ArrowUpRight className="h-4 w-4" aria-hidden />}
                >
                  {cta.label}
                </MagneticButton>
              ))}
            </FadeIn>
          </div>
        </div>

        <ol className="grid gap-4 md:grid-cols-2 md:gap-5 lg:col-span-7">
          {path.pillars.map((pillar, index) => (
            <li
              key={pillar.id}
              // Com número ímpar de cards, o último ocupa a linha inteira (grid sem "buraco").
              className={cn(isOdd && index === path.pillars.length - 1 && "md:col-span-2")}
            >
              <FadeIn delay={(index % 2) * 0.1} distance={40} className="h-full">
                <PillarCard pillar={pillar} pathId={path.id} index={index} className="h-full min-h-[16rem]" />
              </FadeIn>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Os dois caminhos em sequência: "Para empresas" e "Para startups". */
export function TwoPaths() {
  return (
    <>
      {paths.map((path, index) => (
        <PathSection key={path.id} path={path} number={String(index + 3).padStart(2, "0")} />
      ))}
    </>
  );
}
