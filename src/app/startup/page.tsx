import type { Metadata } from "next";

import { SiteHeader, type HeaderLink } from "@/components/layout/SiteHeader";
import { Footer } from "@/components/sections/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { BalcaoCta } from "@/components/startup/BalcaoCta";
import { Journey } from "@/components/startup/Journey";
import { CapitalInvestment, MarketDevelopment } from "@/components/startup/MarketAndCapital";
import { StartupHero } from "@/components/startup/StartupHero";
import { headerCta } from "@/lib/content";
import { siteConfig } from "@/lib/site";
import {
  balcaoSection,
  capitalIntro,
  formacaoIntro,
  mercadoIntro,
  startupHero,
  startupRoutes,
} from "@/lib/startup";

const title = "Para startups";
const description = startupHero.intro;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/startup" },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: "/startup",
    siteName: siteConfig.name,
    title: `${title} · ${siteConfig.name}`,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} · ${siteConfig.name}`,
    description,
  },
};

const headerLinks: readonly HeaderLink[] = [
  ...startupRoutes.map((route) => ({ label: route.navLabel, href: `#${route.id}` as const })),
  { label: "Por onde começar", href: `#${balcaoSection.id}` },
];

const ROUTE_SUMMARIES: Record<(typeof startupRoutes)[number]["id"], string> = {
  "formacao-empreendedora": formacaoIntro,
  "desenvolvimento-de-mercado": mercadoIntro,
  "capital-e-investimento": capitalIntro,
};

/** As 3 rotas como serviços (schema.org). */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "NERD para startups",
  description,
  provider: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
  areaServed: { "@type": "City", name: "Recife" },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Rotas para negócios",
    itemListElement: startupRoutes.map((route) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: route.title, description: ROUTE_SUMMARIES[route.id] },
    })),
  },
};

export default function StartupPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <SiteHeader links={headerLinks} cta={headerCta} />
      <main>
        <StartupHero />
        <Journey />
        <MarketDevelopment />
        <CapitalInvestment />
        <BalcaoCta />
      </main>
      <Footer showCta={false} />
    </>
  );
}
