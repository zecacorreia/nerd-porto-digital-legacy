"use client";

import { m, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Logo } from "@/components/ui/Logo";
import { transitions } from "@/lib/animations";
import type { SiteHref } from "@/lib/content";
import { whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

export interface HeaderLink {
  label: string;
  href: SiteHref;
}

interface SiteHeaderProps {
  links: readonly HeaderLink[];
}

/**
 * Cabeçalho fixo das páginas internas: some ao rolar para baixo, volta ao rolar
 * para cima e ganha fundo sólido depois do topo (sem backdrop-blur, que pesa no scroll).
 */
export function SiteHeader({ links }: SiteHeaderProps) {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0;
    setHidden(current > previous && current > 160);
    setSolid(current > 24);
  });

  return (
    <m.header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500",
        solid ? "border-paper/10 bg-ink/95" : "border-transparent bg-transparent",
      )}
      initial={false}
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={transitions.fast}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-6 px-5 py-4 md:px-10 md:py-5">
        <Link href="/" aria-label="Porto Digital NERD — início">
          <Logo priority className="h-6 md:h-7" />
        </Link>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-8 text-sm text-paper/70">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-paper">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2.5 text-xs font-medium uppercase tracking-[0.14em] text-paper transition-colors hover:bg-paper hover:text-ink md:px-5"
        >
          <span className="hidden sm:inline">Falar com especialista</span>
          <span className="sm:hidden">Especialista</span>
          <ArrowUpRight
            className="h-3.5 w-3.5 transition-transform duration-500 ease-out-expo group-hover:rotate-45"
            aria-hidden
          />
        </a>
      </div>
    </m.header>
  );
}
