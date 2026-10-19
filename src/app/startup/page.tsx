import type { Metadata } from "next";

import { SiteHeader, type HeaderLink } from "@/components/layout/SiteHeader";
import { Footer } from "@/components/sections/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { BalcaoCta } from "@/components/startup/BalcaoCta";
import { Journey } from "@/components/startup/Journey";
import { CapitalInvestment, MarketDevelopment } from "@/components/startup/MarketAndCapital";
import { StartupHero } from "@/components/startup/StartupHero";
import { siteConfig } from "@/lib/site";
import { startupHero, startupRoutes } from "@/lib/startup";

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
  { label: "Início", href: "/" },
  ...startupRoutes.map((route) => ({ label: route.axis, href: `#${route.id}` as const })),
  { label: "Seja membro", href: "/membro" },
];

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
      itemOffered: { "@type": "Service", name: route.title, description: route.summary },
    })),
  },
};

export default function StartupPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <SiteHeader links={headerLinks} />
      <main>
        <StartupHero />
        <Journey />
        <MarketDevelopment />
        <CapitalInvestment />
        <BalcaoCta />
      </main>
      <Footer />
    </>
  );
}
