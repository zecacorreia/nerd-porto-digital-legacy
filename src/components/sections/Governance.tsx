"use client";

import { m } from "framer-motion";
import { X } from "lucide-react";
import { Fragment, useEffect, useRef, useState } from "react";

import { FadeIn } from "@/components/motion/FadeIn";
import { SplitText } from "@/components/motion/SplitText";
import { Marquee } from "@/components/ui/Marquee";
import { fadeUp, staggerContainer, viewportEarly } from "@/lib/animations";
import {
  advisoryBoard,
  committeeGroups,
  curators,
  knowledge,
  type BoardMember,
  type Curator,
} from "@/lib/content";

const allCommittees = committeeGroups.flatMap((group) => group.committees);
const totalCommittees = allCommittees.length;

function initials(name: string): string {
  const parts = name.split(" ").filter(Boolean);
  return `${parts[0]?.[0] ?? ""}${parts.at(-1)?.[0] ?? ""}`.toUpperCase();
}

/* ------------------------------------------------------------------ */
/* Advisory Board: todos os líderes visíveis                           */
/* ------------------------------------------------------------------ */

function BoardCard({ member }: { member: BoardMember }) {
  return (
    <m.li
      variants={fadeUp}
      custom={20}
      className="group flex flex-col gap-4 rounded-large border border-ink/10 bg-paper-dim/50 p-3 transition-colors duration-500 ease-out-expo hover:border-ink hover:bg-ink hover:text-paper"
    >
      {/* Espaço do retrato: iniciais enquanto não há foto */}
      <div
        aria-hidden
        className="flex aspect-square items-center justify-center rounded-medium bg-ink font-display text-4xl font-semibold tracking-[-0.02em] text-brand-light transition-colors duration-500 group-hover:bg-brand group-hover:text-paper"
      >
        {initials(member.name)}
      </div>
      <div className="px-1 pb-1">
        <p className="font-display text-lg font-semibold leading-tight">{member.name}</p>
        <p className="mt-1 text-sm text-ink/60 transition-colors duration-500 group-hover:text-paper/70">
          {member.role}
        </p>
      </div>
    </m.li>
  );
}

function AdvisoryBoard({ members }: { members: readonly BoardMember[] }) {
  return (
    <div className="mt-20 md:mt-32">
      <FadeIn className="flex max-w-3xl flex-col gap-4">
        <h3 className="font-display text-2xl font-semibold tracking-tight md:text-4xl">
          {members.length} lideranças no conselho consultivo
        </h3>
        <p className="text-ink/60 md:text-lg">{knowledge.boardText}</p>
      </FadeIn>

      <m.ul
        aria-label="Conselho consultivo"
        className="mt-10 grid grid-cols-2 gap-3 md:mt-14 md:grid-cols-4 md:gap-4 xl:grid-cols-7"
        variants={staggerContainer({ stagger: 0.05 })}
        initial="hidden"
        whileInView="visible"
        viewport={viewportEarly}
      >
        {members.map((member) => (
          <BoardCard key={member.id} member={member} />
        ))}
      </m.ul>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Comitês de curadoria                                                */
/* ------------------------------------------------------------------ */

function CuratorsDialog({ items, onClose }: { items: readonly Curator[]; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
    // Trava o scroll da página enquanto o modal está aberto.
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = previous;
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="curators-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) dialogRef.current?.close();
      }}
      className="m-0 mt-auto w-full max-w-none rounded-t-[28px] bg-paper p-0 text-ink backdrop:bg-ink/70 sm:m-auto sm:max-w-[520px] sm:rounded-large"
    >
      <div className="flex max-h-[88svh] flex-col sm:max-h-[80svh]">
        <header className="flex items-start justify-between gap-4 border-b border-ink/10 px-6 pb-4 pt-6">
          <div>
            <h2 id="curators-title" className="font-display text-2xl font-semibold tracking-tight">
              {items.length} integrantes
            </h2>
            <p className="mt-1 text-sm text-ink/60">{knowledge.curatorsSubtitle}</p>
          </div>
          <button
            type="button"
            aria-label="Fechar"
            onClick={() => dialogRef.current?.close()}
            className="-mr-2 -mt-1 grid h-11 w-11 shrink-0 place-items-center rounded-full transition-colors hover:bg-paper-dim"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </header>
        <ul className="overflow-y-auto px-6 pb-6">
          {items.map((curator) => (
            <li key={curator.id} className="border-b border-ink/10 py-3 last:border-b-0">
              <p className="font-medium">{curator.name}</p>
              {curator.organization && <p className="text-sm text-ink/60">{curator.organization}</p>}
            </li>
          ))}
        </ul>
      </div>
    </dialog>
  );
}

function Committees() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-20 grid gap-12 md:mt-32 lg:grid-cols-12 lg:gap-8">
      <FadeIn className="flex flex-col items-start gap-4 lg:col-span-5">
        <h3 className="font-display text-2xl font-semibold tracking-tight md:text-4xl">
          {curators.length} especialistas em {totalCommittees} comitês
        </h3>
        <p className="max-w-md text-ink/60 md:text-lg">{knowledge.committeesText}</p>
        <button
          type="button"
          aria-haspopup="dialog"
          onClick={() => setOpen(true)}
          className="mt-2 font-medium text-brand underline-offset-4 transition-colors hover:underline"
        >
          {knowledge.curatorsButton}
        </button>
      </FadeIn>

      <FadeIn delay={0.1} className="flex flex-col gap-10 lg:col-span-7">
        {committeeGroups.map((group) => (
          <div key={group.id}>
            <h4 className="font-display text-xl font-semibold tracking-tight md:text-2xl">{group.title}</h4>
            <m.ul
              className="mt-5 flex flex-wrap gap-2 md:gap-3"
              variants={staggerContainer({ stagger: 0.04 })}
              initial="hidden"
              whileInView="visible"
              viewport={viewportEarly}
            >
              {group.committees.map((committee) => (
                <m.li
                  key={committee}
                  variants={fadeUp}
                  custom={12}
                  className="rounded-full border border-ink/20 px-5 py-2.5 text-sm font-medium transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-paper md:text-base"
                >
                  {committee}
                </m.li>
              ))}
            </m.ul>
          </div>
        ))}
      </FadeIn>

      {open && <CuratorsDialog items={curators} onClose={() => setOpen(false)} />}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Seção                                                               */
/* ------------------------------------------------------------------ */

export function Governance() {
  return (
    <section
      id="advisory-board"
      aria-label="Advisory Board e comitês de curadoria"
      className="relative scroll-mt-20 overflow-hidden bg-paper py-24 text-ink md:py-40"
    >
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <header className="grid gap-8 md:grid-cols-12 md:items-end">
          <FadeIn className="md:col-span-3">
            <span className="text-xs uppercase tracking-[0.12em] text-ink/50">(05) — Advisory Board</span>
          </FadeIn>
          <div className="md:col-span-9">
            <SplitText
              as="h2"
              trigger="inView"
              text={knowledge.title}
              highlight={knowledge.highlight}
              highlightClassName="text-brand"
              className="font-display text-[clamp(2.5rem,6vw,6.5rem)] font-semibold leading-[0.95] tracking-[-0.02em]"
            />
          </div>
        </header>

        <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-12">
          <FadeIn delay={0.1} className="md:col-span-6 md:col-start-4">
            <p className="text-lg text-ink/70 md:text-xl">{knowledge.text}</p>
          </FadeIn>
        </div>

        <AdvisoryBoard members={advisoryBoard} />

        <div id="comites-de-curadoria" className="scroll-mt-24">
          <Committees />
        </div>
      </div>

      {/* Faixa infinita decorativa com os comitês (os nomes estão acessíveis acima) */}
      <div className="mt-20 md:mt-32">
        <Marquee baseVelocity={-5} className="py-2">
          {allCommittees.map((committee) => (
            <Fragment key={committee}>
              <span className="hollow px-5 font-display text-[clamp(2rem,4.5vw,4.5rem)] font-bold uppercase leading-none tracking-[-0.02em] text-ink/40 md:px-8">
                {committee}
              </span>
              <span className="h-2 w-2 shrink-0 rounded-full bg-brand" />
            </Fragment>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
