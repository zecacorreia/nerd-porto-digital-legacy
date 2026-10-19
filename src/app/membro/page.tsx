import type { Metadata } from "next";

import { SiteHeader, type HeaderLink } from "@/components/layout/SiteHeader";
import { HowItWorks } from "@/components/membership/HowItWorks";
import { MembershipHero } from "@/components/membership/MembershipHero";
import { Plans } from "@/components/membership/Plans";
import { PointsUsage } from "@/components/membership/PointsUsage";
import { Sponsors } from "@/components/membership/Sponsors";
import { Footer } from "@/components/sections/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { membershipHero, membershipPlans } from "@/lib/membership";
import { siteConfig } from "@/lib/site";

const title = "Membership";
const description = `${membershipHero.title} Planos NERD Conecta, Inova e Plataforma com Pixels para espaços, formação e negócios no Porto Digital.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/membro" },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: "/membro",
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
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Pixels", href: "#pixels" },
  { label: "Planos", href: "#planos" },
  { label: "Contato", href: "#contato" },
];

/** Planos como ofertas (schema.org) para buscadores. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Membership NERD",
  description: membershipHero.intro,
  provider: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
  areaServed: { "@type": "City", name: "Recife" },
  offers: membershipPlans.map((plan) => ({
    "@type": "Offer",
    name: plan.name,
    description: plan.description,
    price: plan.annualPrice,
    priceCurrency: "BRL",
    url: `${siteConfig.url}/membro#planos`,
  })),
};

export default function MembershipPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <SiteHeader links={headerLinks} />
      <main>
        <MembershipHero />
        <HowItWorks />
        <PointsUsage />
        <Plans />
        <Sponsors />
      </main>
      <Footer />
    </>
  );
}
