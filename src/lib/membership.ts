/**
 * Conteúdo da página de Membership, conforme a versão aprovada (nerd-porto-digital-dev),
 * palavra por palavra. Custos em pontos por item e limite de usuários por plano não são
 * públicos, por isso não aparecem aqui.
 */

export type PlanId = "conecta" | "inova" | "plataforma";

export interface MembershipPlan {
  id: PlanId;
  name: string;
  /** Nível exibido no selo do card. */
  tier: string;
  annualPrice: number;
  /** Teto do equivalente mensal, como divulgado ("menos de R$ X/mês"). */
  monthlyCeiling: number;
  points: number;
  description: string;
  benefits: readonly string[];
  cta: string;
}

export interface MembershipStep {
  id: string;
  title: string;
  description: string;
}

export type UsageIcon = "espacos" | "formacao" | "negocios";

export interface PointsUsage {
  id: UsageIcon;
  title: string;
  description: string;
}

export const membershipHero = {
  eyebrow: "Membership NERD",
  title: "Um plano anual para usar o ecossistema do seu jeito.",
  intro:
    "O membership é a forma da sua empresa fazer parte da rede do NERD. Ao aderir, você recebe uma carteira anual de pontos — os Pixels NERD — para usar em espaços, formação e negócios, com prioridade de agendamento e condições diferenciadas em relação ao uso avulso.",
} as const;

export const pixelWallet = {
  title: "Carteira anual",
  unit: "Pixels",
  perYear: "Pixels por ano",
  legend: "Cada quadrado = 10 Pixels NERD",
} as const;

export const membershipSteps: readonly MembershipStep[] = [
  {
    id: "plano",
    title: "Escolha seu plano",
    description:
      "NERD Conecta, Inova ou Plataforma: 120, 260 ou 850 pontos por ano, de acordo com o estágio da sua empresa em inovação.",
  },
  {
    id: "equipe",
    title: "Cadastre sua equipe",
    description:
      "Vincule colaboradores, sócios e representantes à conta da empresa. Cada plano tem um limite de usuários, com a opção de contratar acessos adicionais.",
  },
  {
    id: "pontos",
    title: "Use seus pontos",
    description:
      "Reserve espaços com antecedência, inscreva sua equipe em cursos e acione a curadoria para conversar com techs do Porto Digital.",
  },
  {
    id: "rede",
    title: "Participe da rede",
    description:
      "Eventos abertos do Porto Digital e do NERD e eventos exclusivos para membros estão incluídos em todos os planos, sem consumir pontos.",
  },
];

/** Nota abaixo dos passos; "regulamento do membership" é um link para o regulamento. */
export const pointsNote = {
  before:
    "Os pontos valem durante a vigência do plano, não acumulam para o período seguinte e não são transferíveis. Se precisar de mais, é possível adquirir pontos adicionais a qualquer momento. Detalhes no",
  link: "regulamento do membership",
  after: ".",
} as const;

export const stepsCtas = { plans: "Ver planos", specialist: "Falar com especialista" } as const;

export const howItWorks = {
  title: "Como funciona",
  text: "Cada plano funciona como uma carteira anual de pontos.",
} as const;

export const pointsUsage: readonly PointsUsage[] = [
  {
    id: "espacos",
    title: "Espaços",
    description:
      "Use pontos para coworking, salas de reunião, salas de formação, auditório e arena, de acordo com a demanda da sua empresa e da sua equipe.",
  },
  {
    id: "formacao",
    title: "Formação",
    description:
      "Converta pontos em vagas para cursos abertos ou personalizados, encontros de aprendizagem e trilhas conectadas aos desafios de inovação.",
  },
  {
    id: "negocios",
    title: "Negócios",
    description:
      "Acione curadoria e mediação para conversas com techs do Porto Digital e aproxime sua empresa de oportunidades qualificadas.",
  },
];

export const sponsorSection = {
  before:
    "Para empresas que querem apoiar o ecossistema em escala maior, oferecemos modalidades Sponsor — Ecossistema, Corporação e Master.",
  cta: "Falar com especialista.",
  highlight: ["Sponsor"],
} as const;

export const plansSection = {
  title: "Planos*",
  text: "Três formatos, conforme o estágio da sua empresa em inovação.",
  perYear: "/ano",
  perMonthPrefix: "menos de",
  perMonthSuffix: "/mês*",
  pointsLabel: "Pixels por ano",
  footnote: "*Valor total da anuidade caso o pagamento fosse mensal.",
  rules: "Conheça o regulamento",
} as const;

export const membershipPlans: readonly MembershipPlan[] = [
  {
    id: "conecta",
    name: "NERD Conecta",
    tier: "Entrada",
    annualPrice: 10000,
    monthlyCeiling: 900,
    points: 120,
    description: "Para empresas começando a se conectar ao ecossistema.",
    benefits: [
      "120 pontos para uso anual no NERD",
      "Uso flexível em coworking, salas, auditório e arena",
      "Acesso a vagas em cursos abertos",
      "Curadoria e mediação de reunião com techs do Porto Digital",
    ],
    cta: "Quero o NERD Conecta",
  },
  {
    id: "inova",
    name: "NERD Inova",
    tier: "Intermediário",
    annualPrice: 20000,
    monthlyCeiling: 1700,
    points: 260,
    description: "Para empresas que querem experimentar e escalar.",
    benefits: [
      "260 pontos para uso anual no NERD",
      "Mais capacidade para uso de coworking, salas, auditório e arena",
      "Acesso ampliado a cursos abertos",
      "Curadoria e mediação de reunião com techs do Porto Digital",
    ],
    cta: "Quero o NERD Inova",
  },
  {
    id: "plataforma",
    name: "NERD Plataforma",
    tier: "Completo",
    annualPrice: 70000,
    monthlyCeiling: 6000,
    points: 850,
    description: "Para empresas que querem presença e protagonismo.",
    benefits: [
      "850 pontos para uso anual no NERD",
      "Uso intensivo de coworking, salas, auditório e arena",
      "Acesso máximo a cursos abertos",
      "Curadoria e mediação de reunião com techs do Porto Digital",
    ],
    cta: "Quero o NERD Plataforma",
  },
];

export const formatBRL = (value: number): string =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
