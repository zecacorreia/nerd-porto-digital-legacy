"use client";

import { m } from "framer-motion";
import { Fragment } from "react";

import { FadeIn } from "@/components/motion/FadeIn";
import { SplitText } from "@/components/motion/SplitText";
import { Accordion, type AccordionItemData } from "@/components/ui/Accordion";
import { Marquee } from "@/components/ui/Marquee";
import { fadeUp, staggerContainer } from "@/lib/animations";
import {
  advisoryBoard,
  advisoryBoardDescription,
  committeeGroups,
  type BoardMember,
  type CommitteeGroup,
} from "@/lib/content";

const allCommittees = committeeGroups.flatMap((group) => group.committees);

function initials(name: string): string {
  const parts = name.split(" ").filter(Boolean);
  return `${parts[0]?.[0] ?? ""}${parts.at(-1)?.[0] ?? ""}`.toUpperCase();
}

/* ------------------------------------------------------------------ */
/* Conteúdo dos painéis do accordion                                   */
/* ------------------------------------------------------------------ */

function BoardPanel({ members }: { members: readonly BoardMember[] }) {
  return (
    <div>
      <p className="max-w-lg text-ink/60">{advisoryBoardDescription}</p>
      <m.ul
        className="mt-8 grid gap-3 sm:grid-cols-2"
        variants={staggerContainer({ stagger: 0.06 })}
        initial="hidden"
        animate="visible"
      >
        {members.map((member) => (
          <m.li
            key={member.id}
            variants={fadeUp}
            custom={16}
            className="flex items-center gap-4 rounded-2xl border border-ink/10 bg-paper-dim/50 p-4"
          >
            <span
              aria-hidden
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ink font-display text-sm font-semibold text-brand-light"
            >
              {initials(member.name)}
            </span>
            <span>
              <span className="block font-display text-lg font-semibold leading-tight">{member.name}</span>
              {member.role && <span className="block text-sm text-ink/60">{member.role}</span>}
            </span>
          </m.li>
        ))}
      </m.ul>
    </div>
  );
}

function CommitteePanel({ group }: { group: CommitteeGroup }) {
  return (
    <div>
      <p className="max-w-lg text-ink/60">{group.description}</p>
      <m.ul
        className="mt-8 flex flex-wrap gap-2 md:gap-3"
        variants={staggerContainer({ stagger: 0.04 })}
        initial="hidden"
        animate="visible"
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
  );
}

const accordionItems: readonly AccordionItemData[] = [
  {
    id: "board",
    title: "Advisory Board",
    meta: `${advisoryBoard.length} membros`,
    content: <BoardPanel members={advisoryBoard} />,
  },
  ...committeeGroups.map((group) => ({
    id: group.id,
    title: group.title,
    meta: `${group.committees.length} comitês`,
    content: <CommitteePanel group={group} />,
  })),
];

/* ------------------------------------------------------------------ */
/* Seção                                                               */
/* ------------------------------------------------------------------ */

export function Governance() {
  return (
    <section
      id="governanca"
      aria-label="Especialistas e governança"
      className="relative overflow-hidden bg-paper py-24 text-ink md:py-40"
    >
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <header className="grid gap-8 md:grid-cols-12 md:items-end">
          <FadeIn className="md:col-span-3">
            <span className="text-xs uppercase tracking-[0.25em] text-ink/50">(05) — Especialistas e governança</span>
          </FadeIn>
          <div className="md:col-span-9">
            <SplitText
              as="h2"
              trigger="inView"
              text="Quem pensa o futuro do NERD."
              highlight={["NERD."]}
              highlightClassName="text-brand"
              className="font-display text-mega font-semibold leading-[0.92] tracking-[-0.04em]"
            />
          </div>
        </header>
      </div>

      {/* Faixas infinitas (decorativas; os nomes estão acessíveis no accordion) */}
      <div className="mt-16 flex flex-col gap-2 md:mt-24">
        <Marquee baseVelocity={6} className="py-2">
          {advisoryBoard.map((member) => (
            <Fragment key={member.id}>
              <span className="px-6 font-display text-[clamp(3.5rem,9vw,9rem)] font-semibold leading-none tracking-[-0.045em] transition-colors duration-300 hover:text-brand md:px-10">
                {member.name}
              </span>
              <span className="h-4 w-4 shrink-0 rotate-45 bg-brand md:h-6 md:w-6" />
            </Fragment>
          ))}
        </Marquee>

        <Marquee baseVelocity={-5} className="py-2">
          {allCommittees.map((committee) => (
            <Fragment key={committee}>
              <span className="hollow px-5 font-display text-[clamp(2rem,4.5vw,4.5rem)] font-bold uppercase leading-none tracking-[-0.03em] text-ink/40 md:px-8">
                {committee}
              </span>
              <span className="h-2 w-2 shrink-0 rounded-full bg-brand" />
            </Fragment>
          ))}
        </Marquee>
      </div>

      <div className="mx-auto mt-20 grid max-w-[1600px] gap-12 px-5 md:mt-32 md:grid-cols-12 md:px-10">
        <FadeIn className="md:col-span-4">
          <div className="md:sticky md:top-24">
            <h3 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">Governança</h3>
            <p className="mt-4 max-w-sm text-ink/60">
              Um conselho consultivo e comitês de curadoria por competência e por setor garantem que o NERD conecte
              cada empresa às pessoas certas.
            </p>
          </div>
        </FadeIn>
        <FadeIn className="md:col-span-8" delay={0.1}>
          <Accordion items={accordionItems} defaultOpenId="board" />
        </FadeIn>
      </div>
    </section>
  );
}
