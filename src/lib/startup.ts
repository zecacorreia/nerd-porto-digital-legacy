/**
 * Conteúdo da página "Para startups", conforme https://nerd.portodigital.org/startup.
 * Detalhes de cada programa ficam no Balcão de Empreendedorismo (externo).
 */

export const BALCAO_URL = "https://data.app.portodigital.org/balcao";

export const STARTUP_WHATSAPP_MESSAGE = "Olá, tenho uma startup e gostaria de conhecer o apoio do NERD.";

export type RouteId = "formacao-empreendedora" | "desenvolvimento-de-mercado" | "capital-e-investimento";

export interface StartupRoute {
  id: RouteId;
  /** Eixo da plataforma (talentos, mercado, capital). */
  axis: string;
  title: string;
  summary: string;
}

export interface JourneyStage {
  id: string;
  title: string;
  /** Subtítulo de fase, quando existe (ex.: "Validação e Estruturação"). */
  phase?: string;
  description: string;
}

export interface RouteAction {
  id: string;
  title: string;
}

export const startupHero = {
  eyebrow: "Rotas para negócios",
  title: "Para startups.",
  intro:
    "O Porto Digital apoia startups em todos os estágios de crescimento: da ideia ao negócio, até a expansão nacional e internacional. Uma plataforma integrada que conecta talentos, mercado e capital.",
} as const;

export const startupRoutes: readonly StartupRoute[] = [
  {
    id: "formacao-empreendedora",
    axis: "Talentos",
    title: "Formação Empreendedora",
    summary: "Programas para empreendedores em cada estágio de maturidade.",
  },
  {
    id: "desenvolvimento-de-mercado",
    axis: "Mercado",
    title: "Desenvolvimento de Mercado",
    summary: "Oportunidades de negócio e parcerias estratégicas.",
  },
  {
    id: "capital-e-investimento",
    axis: "Capital",
    title: "Capital e Investimento",
    summary: "Recursos financeiros adequados a cada fase.",
  },
];

export const formacaoIntro =
  "Programas de desenvolvimento para empreendedores em diferentes estágios de maturidade, fortalecendo competências técnicas, estratégicas e de gestão.";

export const journeyStages: readonly JourneyStage[] = [
  {
    id: "maratonas",
    title: "Maratonas de Experimentação",
    description:
      "Programas para gerar soluções inovadoras, identificar problemas, validar oportunidades e construir propostas de valor.",
  },
  {
    id: "pre-incubacao",
    title: "Pré-Incubação",
    description: "Validação de ideias e modelos de negócio, e os primeiros passos do empreendimento.",
  },
  {
    id: "incubacao",
    title: "Incubação",
    description: "Apoio técnico, estratégico e de mercado para startups em desenvolvimento e consolidação.",
  },
  {
    id: "early-stage",
    title: "Early Stage",
    phase: "Validação e Estruturação",
    description:
      "Validação de hipóteses, construção de MVP, testes de mercado e estruturação de gestão, marketing e vendas.",
  },
  {
    id: "growth",
    title: "Growth",
    phase: "Tração e Escala",
    description:
      "Fortalecimento do product-market fit, tração comercial, receita recorrente e preparação para captação.",
  },
  {
    id: "internacionalizacao",
    title: "Internacionalização",
    description:
      "Adaptação do modelo para mercados globais, programas de softlanding, redes internacionais e testes em novos mercados.",
  },
];

export const mercadoIntro = "Conexão de startups a oportunidades de negócio e parcerias estratégicas.";

export const mercadoActions: readonly RouteAction[] = [
  { id: "clientes", title: "Acesso a clientes e oportunidades comerciais" },
  { id: "integracao", title: "Integração com empresas, governo e parceiros institucionais" },
  { id: "produtos", title: "Estímulo a novos produtos e serviços" },
];

export const capitalIntro =
  "Acesso a recursos financeiros adequados a cada estágio de maturidade e fortalecimento da cultura de investimento.";

export const capitalActions: readonly RouteAction[] = [
  { id: "investidores", title: "Conexão com investidores e fundos" },
  { id: "readiness", title: "Preparação para investimento (investment readiness)" },
  { id: "rodadas", title: "Apoio na estruturação de rodadas" },
  { id: "ambiente", title: "Fortalecimento do ambiente de investimento no ecossistema" },
];
