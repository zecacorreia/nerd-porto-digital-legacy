import { EcosystemNumbers } from "@/components/sections/EcosystemNumbers";
import { Footer } from "@/components/sections/Footer";
import { Governance } from "@/components/sections/Governance";
import { Hero } from "@/components/sections/Hero";
import { NowInEcosystem } from "@/components/sections/NowInEcosystem";
import { PhysicalSpace } from "@/components/sections/PhysicalSpace";
import { TwoPaths } from "@/components/sections/TwoPaths";
import { siteConfig } from "@/lib/site";

/** Dados estruturados (schema.org) para buscadores. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  alternateName: "Núcleo de Empreendedorismo e Residência Digital",
  description: siteConfig.description,
  url: siteConfig.url,
  logo: `${siteConfig.url}/apple-icon.png`,
  image: `${siteConfig.url}/opengraph-image`,
  parentOrganization: {
    "@type": "Organization",
    name: siteConfig.organization.name,
    url: siteConfig.organization.url,
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.address.street,
    addressLocality: siteConfig.address.city,
    addressRegion: siteConfig.address.region,
    addressCountry: siteConfig.address.country,
  },
};

/**
 * Página única (Server Component) que apenas orquestra as seções.
 * Cada seção é um Client Component isolado com suas próprias animações,
 * mantendo o JS por seção e o HTML inicial renderizado no servidor.
 */
export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        // Conteúdo 100% estático do próprio site; `<` escapado por segurança.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <main>
        <Hero />
        <EcosystemNumbers />
        <NowInEcosystem />
        <TwoPaths />
        <PhysicalSpace />
        <Governance />
      </main>
      <Footer />
    </>
  );
}
