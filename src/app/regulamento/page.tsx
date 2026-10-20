import type { Metadata } from "next";
import Link from "next/link";

import { SiteHeader, type HeaderLink } from "@/components/layout/SiteHeader";
import { PrintButton } from "@/components/regulamento/PrintButton";
import { RegBlocks } from "@/components/regulamento/RegBlocks";
import { Logo } from "@/components/ui/Logo";
import { regulamentoChapters, regulamentoMeta } from "@/lib/regulamento";
import { siteConfig } from "@/lib/site";

const description = `${regulamentoMeta.subtitle}. Planos, tabela de consumo de pontos, usuários vinculados, regras operacionais e curadoria. ${regulamentoMeta.version}.`;

export const metadata: Metadata = {
  title: "Regulamento do Membership",
  description,
  alternates: { canonical: "/regulamento" },
  openGraph: {
    type: "article",
    locale: siteConfig.locale,
    url: "/regulamento",
    siteName: siteConfig.name,
    title: `${regulamentoMeta.title} · ${siteConfig.name}`,
    description,
  },
};

const headerLinks: readonly HeaderLink[] = [
  { label: "Início", href: "/" },
  { label: "Seja membro", href: "/membro" },
  { label: "Para startups", href: "/startup" },
];

/**
 * Página documental, propositalmente simples: Server Component sem animações,
 * tipografia de leitura, sumário fixo e estilos de impressão (A4, ver `.print-doc` em globals.css).
 */
export default function RegulamentoPage() {
  return (
    <>
      <div className="print:hidden">
        <SiteHeader links={headerLinks} />
      </div>

      <main className="print-doc bg-paper text-ink print:bg-white">
        {/* Cabeçalho do documento */}
        <header className="bg-ink pb-16 pt-32 text-paper md:pb-20 md:pt-40 print:bg-white print:pb-4 print:pt-0 print:text-ink">
          <div className="mx-auto max-w-[1200px] px-5 md:px-10 print:max-w-none print:px-0">
            {/* Assinatura em versão escura, só no papel */}
            <Logo tone="dark" className="mb-8 hidden h-7 print:block" />
            <nav aria-label="Trilha" className="text-xs uppercase tracking-[0.2em] text-paper/50 print:hidden">
              <Link href="/membro" className="transition-colors hover:text-paper">
                Seja membro
              </Link>
              <span className="mx-2" aria-hidden>
                /
              </span>
              <span className="text-paper/80">Regulamento</span>
            </nav>
            <p className="mt-8 text-sm text-brand-light print:mt-0 print:text-ink/60">{regulamentoMeta.issuer}</p>
            <h1 className="mt-3 max-w-[18ch] font-display text-[clamp(2.25rem,5vw,4.25rem)] font-semibold leading-[1] tracking-[-0.035em] print:text-[26pt]">
              {regulamentoMeta.title}
            </h1>
            <p className="mt-4 text-lg text-paper/70 print:text-ink/70">{regulamentoMeta.subtitle}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3 print:mt-4">
              <span className="rounded-full bg-brand px-3.5 py-1.5 text-xs font-medium text-paper print:border print:border-ink print:bg-transparent print:text-ink">
                {regulamentoMeta.version}
              </span>
              <PrintButton />
            </div>
            <p className="mt-10 max-w-2xl border-l-2 border-brand pl-5 text-paper/75 print:mt-6 print:max-w-none print:text-ink/80">
              {regulamentoMeta.preamble}
            </p>
          </div>
        </header>

        <div className="mx-auto grid max-w-[1200px] gap-12 px-5 py-16 md:px-10 md:py-24 lg:grid-cols-12 print:block print:max-w-none print:px-0 print:py-6">
          {/* Sumário */}
          <nav aria-label="Sumário" className="lg:col-span-4 print:hidden">
            <div className="lg:sticky lg:top-28">
              <p className="text-xs uppercase tracking-[0.2em] text-ink/50">Sumário</p>
              <ol className="mt-5 flex flex-col gap-5 text-sm">
                {regulamentoChapters.map((chapter) => (
                  <li key={chapter.id}>
                    <a href={`#${chapter.id}`} className="font-medium text-ink transition-colors hover:text-brand">
                      Capítulo {chapter.numeral} — {chapter.title}
                    </a>
                    <ol className="mt-2 flex flex-col gap-1.5 border-l border-ink/10 pl-4">
                      {chapter.articles.map((article) => (
                        <li key={article.id}>
                          <a href={`#${article.id}`} className="text-ink/55 transition-colors hover:text-brand">
                            {article.label} · {article.title}
                          </a>
                        </li>
                      ))}
                    </ol>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          {/* Corpo */}
          <article className="flex flex-col gap-16 text-[15px] leading-relaxed text-ink/75 md:text-base lg:col-span-8 print:gap-8 print:text-[10.5pt] print:text-ink/85">
            {regulamentoChapters.map((chapter) => (
              <section key={chapter.id} id={chapter.id} aria-labelledby={`${chapter.id}-title`} className="scroll-mt-28">
                {/* Rótulo + título juntos: nenhum dos dois fica sozinho no pé da página */}
                <div className="keep-with-next">
                  <p className="text-xs uppercase tracking-[0.2em] text-brand">Capítulo {chapter.numeral}</p>
                  <h2
                    id={`${chapter.id}-title`}
                    className="mt-2 font-display text-[clamp(1.6rem,3vw,2.25rem)] font-semibold leading-tight tracking-[-0.02em] text-ink print:text-[16pt]"
                  >
                    {chapter.title}
                  </h2>
                </div>
                <div className="mt-8 flex flex-col gap-10 print:mt-4 print:gap-6">
                  {chapter.articles.map((article) => (
                    <section
                      key={article.id}
                      id={article.id}
                      aria-labelledby={`${article.id}-title`}
                      className="scroll-mt-28 border-t border-ink/10 pt-8 print:pt-5"
                    >
                      <h3 id={`${article.id}-title`} className="mb-4 font-display text-xl font-semibold text-ink print:mb-2 print:text-[12pt]">
                        <span className="text-brand">{article.label}</span> — {article.title}
                      </h3>
                      <RegBlocks blocks={article.blocks} />
                    </section>
                  ))}
                </div>
              </section>
            ))}

            <p className="border-t border-ink/10 pt-8 text-sm text-ink/55 print:break-inside-avoid">
              {regulamentoMeta.issuer}
              <br />
              {regulamentoMeta.closing}
            </p>
          </article>
        </div>
      </main>

      {/* Rodapé enxuto */}
      <footer className="bg-ink py-10 text-sm text-paper/60 print:hidden">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-4 px-5 md:flex-row md:items-center md:justify-between md:px-10">
          <p>
            © {new Date().getFullYear()} {siteConfig.organization.name} · {siteConfig.address.street},{" "}
            {siteConfig.address.neighborhood} — {siteConfig.address.city}/{siteConfig.address.region}
          </p>
          <div className="flex gap-6">
            <Link href="/membro" className="transition-colors hover:text-paper">
              Ver planos
            </Link>
            <Link href="/" className="transition-colors hover:text-paper">
              Voltar ao início
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
