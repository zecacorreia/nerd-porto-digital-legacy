/**
 * Conteúdo da página de Membership, conforme https://nerd.portodigital.org/membro.
 * Custos em pontos por item e limite de usuários por plano não são públicos,
 * por isso não aparecem aqui.
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
  items: readonly string[];
}

export interface PointsRule {
  id: "vigencia" | "acumulo" | "transferencia" | "adicionais";
  text: string;
}

export const membershipHero = {
  eyebrow: "Membership NERD",
  title: "Um plano anual para usar o ecossistema do seu jeito.",
  intro:
    "O membership é a forma da sua empresa integrar a rede do NERD. Ao aderir, ela recebe uma carteira anual de pontos, os Pixels NERD, para usar em espaços, formação e negócios, com prioridade de agendamento e condições diferenciadas.",
} as const;

export const membershipSteps: readonly MembershipStep[] = [
  {
    id: "plano",
    title: "Escolha seu plano",
    description:
      "NERD Conecta, Inova ou Plataforma: escolha conforme o estágio da sua empresa em inovação.",
  },
  {
    id: "equipe",
    title: "Cadastre sua equipe",
    description:
      "Vincule colaboradores, sócios e representantes. Cada plano tem um limite de usuários, com opção de acessos adicionais.",
  },
  {
    id: "pontos",
    title: "Use seus pontos",
    description:
      "Reserve espaços, inscreva sua equipe em cursos e acione a curadoria para conversar com techs do Porto Digital.",
  },
  {
    id: "rede",
    title: "Participe da rede",
    description: "Eventos abertos e exclusivos para membros estão incluídos, sem consumir pontos.",
  },
];

export const pointsUsage: readonly PointsUsage[] = [
  {
    id: "espacos",
    title: "Espaços",
    description: "Infraestrutura no coração do Bairro do Recife para trabalhar, reunir e receber.",
    items: ["Coworking", "Salas de reunião", "Salas de formação", "Auditório", "Arena"],
  },
  {
    id: "formacao",
    title: "Formação",
    description: "Desenvolvimento contínuo para o seu time.",
    items: ["Cursos abertos", "Cursos personalizados", "Encontros de aprendizagem", "Trilhas"],
  },
  {
    id: "negocios",
    title: "Negócios",
    description: "Conexões qualificadas com quem está construindo tecnologia no Porto Digital.",
    items: ["Curadoria", "Mediação de conversas com techs do Porto Digital"],
  },
];

export const pointsRules: readonly PointsRule[] = [
  { id: "vigencia", text: "Os pontos valem durante a vigência anual do plano." },
  { id: "acumulo", text: "Não acumulam para o período seguinte." },
  { id: "transferencia", text: "Não são transferíveis." },
  { id: "adicionais", text: "Pontos adicionais podem ser comprados a qualquer momento." },
];

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

export const plansIncluded: readonly string[] = [
  "Eventos abertos do Porto Digital e do NERD",
  "Eventos exclusivos para membros",
  "Sem consumo de pontos nos eventos",
  "Acessos adicionais de usuários sob demanda",
];

export const plansFootnote = "*Valor total da anuidade, caso o pagamento fosse mensal.";

export const sponsorTiers: readonly string[] = ["Ecossistema", "Corporação", "Master"];

export const formatBRL = (value: number): string =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
