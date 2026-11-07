"use client";

import { AnimatePresence, m, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Logo } from "@/components/ui/Logo";
import { transitions } from "@/lib/animations";
import { isExternalHref, type CtaHref, type SiteHref } from "@/lib/content";
import { whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

export interface HeaderLink {
  label: string;
  href: SiteHref;
}

interface HeaderCta {
  label: string;
  /** Rótulo curto para telas estreitas (padrão: o próprio `label`). */
  shortLabel?: string;
  href: CtaHref;
}

interface SiteHeaderProps {
  links: readonly HeaderLink[];
  /** CTA do canto direito. Padrão: WhatsApp do NERD ("Falar com especialista"). */
  cta?: HeaderCta;
}

const DEFAULT_CTA: HeaderCta = {
  label: "Falar com especialista",
  shortLabel: "Especialista",
  href: whatsappLink() as CtaHref,
};

/**
 * Cabeçalho fixo: some ao rolar para baixo, volta ao rolar para cima e ganha fundo sólido
 * depois do topo (sem backdrop-blur, que pesa no scroll). Abaixo de `lg` a navegação
 * vira um menu suspenso.
 */
export function SiteHeader({ links, cta = DEFAULT_CTA }: SiteHeaderProps) {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0;
    // Com o menu aberto o cabeçalho fica fixo na tela.
    setHidden(current > previous && current > 160 && !menuOpen);
    setSolid(current > 24);
  });

  const external = isExternalHref(cta.href);

  return (
    <m.header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500",
        solid || menuOpen ? "border-paper/10 bg-ink/95" : "border-transparent bg-transparent",
      )}
      initial={false}
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={transitions.fast}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-5 py-4 md:px-10 md:py-5">
        <Link href="/" aria-label="Porto Digital NERD — início" onClick={() => setMenuOpen(false)}>
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

        <div className="flex items-center gap-2">
          <a
            href={cta.href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className="group inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-brand px-3 py-2.5 text-[10px] font-medium uppercase tracking-[0.08em] text-paper transition-colors hover:bg-paper hover:text-ink sm:px-4 sm:text-xs sm:tracking-[0.12em] md:px-5"
          >
            <span className={cn(cta.shortLabel && "hidden sm:inline")}>{cta.label}</span>
            {cta.shortLabel && <span className="sm:hidden">{cta.shortLabel}</span>}
            <ArrowUpRight
              className="h-3.5 w-3.5 transition-transform duration-500 ease-out-expo group-hover:rotate-45"
              aria-hidden
            />
          </a>

          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="menu-mobile"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            onClick={() => setMenuOpen((open) => !open)}
            className="grid h-10 w-10 place-items-center rounded-full border border-paper/20 text-paper transition-colors hover:border-paper lg:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {menuOpen && (
          <m.nav
            id="menu-mobile"
            aria-label="Principal"
            className="overflow-hidden border-t border-paper/10 lg:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={transitions.fast}
          >
            <ul className="mx-auto flex max-w-[1600px] flex-col px-5 pb-6 pt-2 md:px-10">
              {links.map((link) => (
                <li key={link.href} className="border-b border-paper/10 last:border-b-0">
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block py-4 font-display text-2xl font-semibold tracking-[-0.02em] text-paper/90 transition-colors hover:text-brand-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </m.nav>
        )}
      </AnimatePresence>
    </m.header>
  );
}
