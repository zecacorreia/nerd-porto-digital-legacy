"use client";

import { m, useMotionTemplate, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

import { FaixaOndas } from "@/components/decor/Decor";
import { FadeIn } from "@/components/motion/FadeIn";
import { SplitText } from "@/components/motion/SplitText";
import { Logo } from "@/components/ui/Logo";
import { MagneticButton } from "@/components/ui/MagneticButton";
import {
  contactSection,
  copyright,
  footerLinks,
  footerTagline,
  fullAddress,
  isExternalHref,
  mapsUrl,
  postalCode,
} from "@/lib/content";

const GIANT_TEXT = "NERD";

/** Marca gigante: o preenchimento azul "pinta" o texto vazado conforme o scroll chega ao fim. */
function GiantMark() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });

  const remaining = useTransform(scrollYProgress, [0.15, 0.95], [100, 0]);
  const clipPath = useMotionTemplate`inset(0 ${remaining}% 0 0)`;
  const y = useTransform(scrollYProgress, [0, 1], ["35%", "0%"]);
  const letterSpacing = useTransform(scrollYProgress, [0, 1], ["0.04em", "-0.06em"]);

  const textClass =
    "block whitespace-nowrap text-center font-display text-[clamp(3.75rem,26vw,28rem)] font-bold uppercase leading-[0.8]";

  return (
    <div ref={ref} aria-hidden className="relative block select-none overflow-hidden pb-[2vw] pt-[6vw]">
      <m.span className="relative block" style={{ y }}>
        <m.span className={`hollow text-paper/25 ${textClass}`} style={{ letterSpacing }}>
          {GIANT_TEXT}
        </m.span>
        <m.span className={`absolute inset-0 text-brand ${textClass}`} style={{ letterSpacing, clipPath }}>
          {GIANT_TEXT}
        </m.span>
      </m.span>
    </div>
  );
}

interface InfoRowProps {
  label: string;
  children: React.ReactNode;
}

function InfoRow({ label, children }: InfoRowProps) {
  return (
    <div className="grid gap-3 border-t border-paper/15 py-6 sm:grid-cols-[8rem_1fr] md:py-8">
      <dt className="text-xs uppercase tracking-[0.12em] text-paper/50">{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}

export function Footer() {
  const { cta } = contactSection;

  return (
    <footer id="contato" className="relative scroll-mt-20 overflow-hidden bg-ink text-paper">
      <div className="mx-auto grid max-w-[1600px] gap-16 px-5 pt-24 md:grid-cols-12 md:px-10 md:pt-40">
        {/* Chamada + CTA */}
        <div className="flex flex-col md:col-span-6">
          <FadeIn>
            <span className="text-xs uppercase tracking-[0.12em] text-paper/50">(08) — Contato</span>
          </FadeIn>
          <SplitText
            as="h2"
            trigger="inView"
            text={contactSection.title}
            highlight={contactSection.highlight}
            className="mt-6 font-display text-[clamp(2.5rem,5vw,5rem)] font-semibold leading-[0.95] tracking-[-0.02em]"
          />
          <FadeIn delay={0.2}>
            <p className="mt-8 max-w-md text-paper/60 md:text-lg">{contactSection.text}</p>
          </FadeIn>
          <FadeIn delay={0.3} className="mt-10">
            <MagneticButton
              href={cta.href}
              external={isExternalHref(cta.href)}
              variant="primary"
              className="w-full sm:w-auto"
              icon={<ArrowUpRight className="h-4 w-4" aria-hidden />}
            >
              {cta.label}
            </MagneticButton>
          </FadeIn>
        </div>

        {/* E-mail e endereço */}
        <FadeIn delay={0.1} className="md:col-span-5 md:col-start-8">
          <dl className="border-b border-paper/15">
            <InfoRow label={contactSection.emailLabel}>
              <a
                href={`mailto:${contactSection.email}`}
                className="group inline-flex items-center gap-3 font-display text-xl font-semibold tracking-tight transition-colors hover:text-brand-light md:text-2xl"
              >
                <Mail className="h-5 w-5 shrink-0 text-brand-light" aria-hidden />
                {contactSection.email}
              </a>
            </InfoRow>
            <InfoRow label={contactSection.addressLabel}>
              <address className="not-italic text-paper/80 md:text-lg">
                {fullAddress} · CEP {postalCode}
              </address>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-4 inline-flex items-center gap-2 font-medium text-brand-light underline-offset-4 hover:underline"
              >
                <MapPin className="h-4 w-4 shrink-0" aria-hidden />
                {contactSection.mapLabel}
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:rotate-45"
                  aria-hidden
                />
              </a>
            </InfoRow>
          </dl>
        </FadeIn>
      </div>

      {/* Links institucionais + marca */}
      <div className="mx-auto mt-24 grid max-w-[1600px] gap-10 border-t border-paper/15 px-5 pt-10 md:mt-32 md:grid-cols-12 md:px-10">
        <div className="md:col-span-5">
          <Link href="/" aria-label="Porto Digital NERD — início" className="inline-block">
            <Logo className="h-8 md:h-10" />
          </Link>
          <p className="mt-4 max-w-sm text-sm text-paper/50">{footerTagline}</p>
        </div>
        <nav aria-label="Links institucionais" className="md:col-span-6 md:col-start-7">
          <ul className="grid gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
            {footerLinks.map((link) => {
              const external = isExternalHref(link.href) && !link.href.startsWith("mailto:");
              const className = "inline-flex items-center gap-1 text-paper/70 transition-colors hover:text-brand-light";
              return (
                <li key={link.label}>
                  {link.href.startsWith("/") ? (
                    <Link href={link.href} className={className}>
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className={className}
                    >
                      {link.label}
                      {external && <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Ondas e caranguejo antes da marca gigante */}
      <FaixaOndas className="mt-20 px-5 md:mt-28 md:px-10" />

      <GiantMark />

      {/* Barra final */}
      <div className="mx-auto max-w-[1600px] border-t border-paper/15 px-5 py-6 text-xs uppercase tracking-[0.12em] text-paper/40 md:px-10">
        © {new Date().getFullYear()} {copyright}
      </div>
    </footer>
  );
}
