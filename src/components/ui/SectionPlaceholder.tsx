import type { ReactNode } from "react";

import { FadeIn } from "@/components/motion/FadeIn";
import { cn } from "@/lib/utils";

interface SectionPlaceholderProps {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  tone?: "dark" | "light";
  children?: ReactNode;
}

/** Casca temporária das seções ainda não implementadas (mantém âncoras e ritmo claro/escuro). */
export function SectionPlaceholder({ id, index, eyebrow, title, tone = "dark", children }: SectionPlaceholderProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative flex min-h-[80svh] items-center py-24 md:py-40",
        tone === "dark" ? "bg-ink text-paper" : "bg-paper text-ink",
      )}
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 md:px-10">
        <FadeIn>
          <span className="text-xs uppercase tracking-[0.12em] opacity-50">
            ({index}) — {eyebrow}
          </span>
          <h2 className="mt-6 max-w-[18ch] font-display text-mega font-semibold leading-[0.92] tracking-[-0.02em]">
            {title}
          </h2>
        </FadeIn>
        {children}
      </div>
    </section>
  );
}
