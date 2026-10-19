"use client";

import { m, useMotionTemplate, useScroll, useTransform } from "framer-motion";
import { ArrowUp, ArrowUpRight, MapPin } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

import { FadeIn } from "@/components/motion/FadeIn";
import { SplitText } from "@/components/motion/SplitText";
import { ContactForm } from "@/components/ui/ContactForm";
import { Logo } from "@/components/ui/Logo";
import { navLinks, spaceAddress } from "@/lib/content";

const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  "Rua Dona Maria César, 70, Bairro do Recife, Recife - PE",
)}`;

const CTA_TEXT = "Faça parte";

/** CTA gigante: o preenchimento azul "pinta" o texto vazado conforme o scroll chega ao fim. */
function GiantCta() {
  const ref = useRef<HTMLAnchorElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });

  const remaining = useTransform(scrollYProgress, [0.15, 0.95], [100, 0]);
  const clipPath = useMotionTemplate`inset(0 ${remaining}% 0 0)`;
  const y = useTransform(scrollYProgress, [0, 1], ["35%", "0%"]);
  const letterSpacing = useTransform(scrollYProgress, [0, 1], ["0.04em", "-0.06em"]);

  const textClass =
    "block whitespace-nowrap text-center font-display text-[clamp(3.75rem,16.5vw,18rem)] font-bold uppercase leading-[0.8]";

  return (
    <a
      ref={ref}
      href="#contato-form"
      data-cursor-label="Bora"
      aria-label="Faça parte: ir para o formulário de contato"
      className="relative block select-none overflow-hidden pb-[2vw] pt-[6vw]"
    >
      <m.span className="relative block" style={{ y }}>
        <m.span aria-hidden className={`hollow text-paper/25 ${textClass}`} style={{ letterSpacing }}>
          {CTA_TEXT}
        </m.span>
        <m.span
          aria-hidden
          className={`absolute inset-0 text-brand ${textClass}`}
          style={{ letterSpacing, clipPath }}
        >
          {CTA_TEXT}
        </m.span>
      </m.span>
    </a>
  );
}

export function Footer() {
  return (
    <footer id="contato" className="relative overflow-hidden bg-ink text-paper">
      <div className="mx-auto grid max-w-[1600px] gap-16 px-5 pt-24 md:grid-cols-12 md:px-10 md:pt-40">
        {/* Chamada + informações */}
        <div className="flex flex-col md:col-span-5">
          <FadeIn>
            <span className="text-xs uppercase tracking-[0.25em] text-paper/50">(06) — Contato</span>
          </FadeIn>
          <SplitText
            as="h2"
            trigger="inView"
            text="Vamos construir o próximo capítulo juntos?"
            highlight={["juntos?"]}
            className="mt-6 font-display text-[clamp(2.5rem,5vw,5rem)] font-semibold leading-[0.95] tracking-[-0.04em]"
          />
          <FadeIn delay={0.2}>
            <p className="mt-8 max-w-sm text-paper/60">
              Empresa, startup ou parceiro: conte o que você procura e a equipe do NERD te conecta ao ecossistema.
            </p>
          </FadeIn>

          <FadeIn delay={0.3} className="mt-12 md:mt-auto">
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-start gap-3 text-paper/80 transition-colors hover:text-brand-light"
            >
              <MapPin className="mt-1 h-5 w-5 shrink-0" aria-hidden />
              <span>
                {spaceAddress}
                <span className="block text-paper/50 group-hover:text-brand-light/70">Recife — PE, Brasil</span>
              </span>
              <ArrowUpRight
                className="mt-1 h-4 w-4 shrink-0 transition-transform duration-500 ease-out-expo group-hover:rotate-45"
                aria-hidden
              />
            </a>
          </FadeIn>
        </div>

        {/* Formulário */}
        <FadeIn delay={0.1} className="md:col-span-6 md:col-start-7">
          <div id="contato-form" className="scroll-mt-24">
            <ContactForm />
          </div>
        </FadeIn>
      </div>

      {/* Navegação */}
      <div className="mx-auto mt-24 grid max-w-[1600px] gap-10 border-t border-paper/15 px-5 pt-10 md:mt-32 md:grid-cols-12 md:px-10">
        <div className="md:col-span-5">
          <Link href="/" aria-label="Porto Digital NERD — início" className="inline-block">
            <Logo className="h-8 md:h-10" />
          </Link>
          <p className="mt-3 max-w-xs text-sm text-paper/50">Núcleo de Empreendedorismo e Residência Digital</p>
        </div>
        <nav aria-label="Rodapé" className="md:col-span-4 md:col-start-7">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-paper/60 transition-colors hover:text-brand-light">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="md:col-span-2 md:text-right">
          <a
            href="https://www.portodigital.org"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-paper/60 transition-colors hover:text-brand-light"
          >
            portodigital.org
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          </a>
        </div>
      </div>

      <GiantCta />

      {/* Barra final */}
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 border-t border-paper/15 px-5 py-6 text-xs uppercase tracking-[0.2em] text-paper/40 md:px-10">
        <span>© {new Date().getFullYear()} NERD · Porto Digital</span>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="group inline-flex items-center gap-2 transition-colors hover:text-brand-light"
        >
          Voltar ao topo
          <ArrowUp
            className="h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:-translate-y-1"
            aria-hidden
          />
        </button>
      </div>
    </footer>
  );
}
