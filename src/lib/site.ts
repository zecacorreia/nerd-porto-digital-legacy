/** Configuração central do site: usada em metadados, Open Graph, sitemap, manifest e JSON-LD. */

function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  // Deploy na Vercel expõe o domínio de produção automaticamente.
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

export const siteConfig = {
  name: "NERD · Porto Digital",
  shortName: "NERD",
  title: "NERD · A plataforma de negócios do Porto Digital",
  description:
    "NERD, a plataforma de negócios do Porto Digital. A forma mais rápida de conectar sua empresa ao ecossistema de inovação.",
  url: resolveSiteUrl(),
  locale: "pt_BR",
  themeColor: "#07080a",
  brandColor: "#1450ef",
  keywords: [
    "NERD",
    "Porto Digital",
    "Núcleo de Empreendedorismo e Residência Digital",
    "inovação",
    "startups",
    "ecossistema de inovação",
    "parque tecnológico",
    "Recife",
    "coworking Recife",
    "open innovation",
  ],
  organization: {
    name: "Porto Digital",
    url: "https://www.portodigital.org",
  },
  address: {
    street: "Rua Dona Maria César, 70",
    neighborhood: "Bairro do Recife",
    city: "Recife",
    region: "PE",
    country: "BR",
  },
} as const;

/** WhatsApp oficial do NERD ("Falar com especialista"), conforme nerd.portodigital.org. */
const WHATSAPP_NUMBER = "5581994883786";

export function whatsappLink(message = "Olá, gostaria de conhecer mais sobre o NERD."): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** Regulamento do membership (página interna). */
export const MEMBERSHIP_RULES_PATH = "/regulamento";

/** Geometria vetorizada do símbolo Porto Digital (viewBox 100×100), fonte: src/assets/brand/nerd-mark.svg. */
export const MARK_PATH =
  "M60.75 17.9H82.2V38.75H60.75ZM39.3 38.75H60.75V59.55H39.3ZM17.85 59.55H82.2V80.5H60.52V70.05A10.5 10.5 0 0 0 39.52 70.05V80.5H17.85ZM60.75 38.75L50.25 38.75A10.5 10.5 0 0 0 60.75 28.25ZM60.75 38.75L71.25 38.75A10.5 10.5 0 0 0 60.75 49.25ZM39.3 59.55L28.8 59.55A10.5 10.5 0 0 0 39.3 49.05ZM60.75 59.55L71.25 59.55A10.5 10.5 0 0 1 60.75 49.05Z";
