/**
 * Conteúdo da página "Para startups", conforme a versão aprovada (nerd-porto-digital-dev),
 * palavra por palavra. Detalhes de cada programa ficam no Balcão de Empreendedorismo (externo).
 */

export const BALCAO_URL = "https://data.app.portodigital.org/balcao";

export const STARTUP_WHATSAPP_MESSAGE = "Olá, tenho uma startup e gostaria de conhecer o apoio do NERD.";

export type RouteId = "formacao-empreendedora" | "desenvolvimento-de-mercado" | "capital-e-investimento";

export interface StartupRoute {
  id: RouteId;
  /** Rótulo curto da navegação do cabeçalho. */
  navLabel: string;
  /** Eixo da plataforma, usado como rótulo da seção (talentos, mercado, capital). */
  axis: string;
  title: string;
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
  title: "Para startups",
  intro:
    "O Porto Digital apoia startups em todas as etapas da sua jornada de crescimento, desde a transformação de uma ideia em negócio até a expansão para mercados nacionais e internacionais. Por meio de uma plataforma integrada de desenvolvimento empreendedor, conectamos talentos, mercado e capital para acelerar a criação e a evolução de negócios inovadores.",
} as const;

export const startupRoutes: readonly StartupRoute[] = [
  { id: "formacao-empreendedora", navLabel: "Formação", axis: "Talentos", title: "Formação Empreendedora" },
  { id: "desenvolvimento-de-mercado", navLabel: "Mercado", axis: "Mercado", title: "Desenvolvimento de Mercado" },
  { id: "capital-e-investimento", navLabel: "Capital", axis: "Capital", title: "Capital e Investimento" },
];

export const formacaoIntro =
  "Desenvolvemos talentos e apoiamos empreendedores em diferentes estágios de maturidade, oferecendo iniciativas que fortalecem capacidades técnicas, estratégicas e de gestão.";

export const journeyLabel = "A jornada, etapa por etapa";

export const journeyStages: readonly JourneyStage[] = [
  {
    id: "maratonas",
    title: "Maratonas de Experimentação",
    description:
      "Programas voltados à geração de soluções inovadoras, com foco na identificação de problemas, validação de oportunidades e construção de propostas de valor.",
  },
  {
    id: "pre-incubacao",
    title: "Pré-Incubação",
    description:
      "Apoio à validação de ideias e modelos de negócio, auxiliando empreendedores na construção dos primeiros passos do empreendimento.",
  },
  {
    id: "incubacao",
    title: "Incubação",
    description: "Suporte técnico, estratégico e de mercado para startups em fase de tração e consolidação.",
  },
  {
    id: "early-stage",
    title: "Early Stage",
    phase: "Validação e Estruturação",
    description:
      "Desenvolvimento das capacidades essenciais para o crescimento do negócio, incluindo validação de hipóteses, construção de MVPs, testes de mercado e estruturação dos processos iniciais de gestão, marketing e vendas.",
  },
  {
    id: "growth",
    title: "Growth",
    phase: "Tração e Escala",
    description:
      "Aceleração do crescimento sustentável por meio do fortalecimento do product-market fit, ampliação da tração comercial, geração de receita recorrente e preparação para captação de investimentos.",
  },
  {
    id: "internacionalizacao",
    title: "Internacionalização",
    description:
      "Preparação para atuação em mercados globais, incluindo adaptação do modelo de negócio, programas de softlanding, acesso a redes internacionais e validação em novos mercados.",
  },
];

export const mercadoIntro =
  "Conectamos startups a oportunidades de negócios e parcerias estratégicas para acelerar sua inserção no mercado e ampliar sua geração de valor.";

export const mercadoLabel = "As iniciativas incluem";

export const mercadoActions: readonly RouteAction[] = [
  { id: "clientes", title: "Acesso a clientes e oportunidades comerciais" },
  { id: "integracao", title: "Integração com empresas, governo e parceiros institucionais" },
  { id: "produtos", title: "Estímulo ao desenvolvimento de novos produtos e serviços" },
];

export const capitalIntro =
  "Facilitamos o acesso a recursos financeiros adequados a cada estágio de maturidade da startup, promovendo a cultura de investimento como ferramenta para crescimento e escala.";

export const capitalLabel = "As ações incluem";

export const capitalActions: readonly RouteAction[] = [
  { id: "investidores", title: "Conexão com investidores e fundos" },
  { id: "readiness", title: "Preparação para captação de investimentos (investment readiness)" },
  { id: "rodadas", title: "Apoio na estruturação de rodadas de investimento" },
  { id: "ambiente", title: "Fortalecimento do ambiente de investimento no ecossistema" },
];

export const balcaoSection = {
  id: "por-onde-comecar",
  eyebrow: "Por onde começar?",
  title: "Balcão de Empreendedorismo.",
  highlight: ["Empreendedorismo."],
  text: "Encontre o programa certo para o estágio da sua startup e dê o próximo passo com o Porto Digital.",
  primaryCta: "Acessar o Balcão de Empreendedorismo",
  secondaryCta: "Falar com o NERD",
} as const;
