/**
 * Conteúdo estático do site. Centralizado aqui para facilitar a troca
 * futura por um CMS.
 */

/** Âncora na página atual (`#x`) ou rota interna (`/membro`, `/#numeros`). */
export type SiteHref = `#${string}` | `/${string}`;

export interface NavLink {
  label: string;
  href: SiteHref;
}

export interface HeroContent {
  eyebrow: string;
  title: string;
  subtitle: string;
  ctas: ReadonlyArray<{ label: string; href: SiteHref; variant: "primary" | "ghost" }>;
}

export interface EcosystemStat {
  id: string;
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  description: string;
}

export const navLinks: readonly NavLink[] = [
  { label: "Ecossistema", href: "/#numeros" },
  { label: "Agora", href: "/#agora" },
  { label: "Caminhos", href: "/#caminhos" },
  { label: "Espaço", href: "/#espaco" },
  { label: "Governança", href: "/#governanca" },
  { label: "Para startups", href: "/startup" },
  { label: "Seja membro", href: "/membro" },
  { label: "Contato", href: "#contato" },
];

export const heroContent: HeroContent = {
  eyebrow: "Porto Digital · Recife",
  title: "NERD, a plataforma de negócios do Porto Digital.",
  subtitle: "A forma mais rápida de conectar sua empresa ao ecossistema de inovação.",
  ctas: [
    { label: "Para startups", href: "/startup", variant: "primary" },
    { label: "Seja membro", href: "/membro", variant: "ghost" },
  ],
};

export const ecosystemStats: readonly EcosystemStat[] = [
  {
    id: "anos",
    value: 25,
    label: "anos",
    description: "Construindo um dos maiores parques tecnológicos do país.",
  },
  {
    id: "empresas",
    value: 541,
    label: "empresas",
    description: "Startups, scale-ups e multinacionais embarcadas no ecossistema.",
  },
  {
    id: "profissionais",
    value: 24,
    suffix: " mil",
    label: "profissionais",
    description: "Talentos movendo tecnologia, economia criativa e negócios.",
  },
  {
    id: "hubs-brasil",
    value: 4,
    label: "hubs no Brasil",
    description: "Presença em diferentes polos de inovação brasileiros.",
  },
  {
    id: "hubs-portugal",
    value: 1,
    label: "hub em Portugal",
    description: "Uma ponte direta com o mercado europeu.",
  },
];

/* ------------------------------------------------------------------ */
/* Agora no ecossistema                                                */
/* ------------------------------------------------------------------ */

export type EcosystemItemKind = "evento" | "programa" | "edital";

export interface EcosystemItem {
  id: string;
  kind: EcosystemItemKind;
  title: string;
  description: string;
  /** Rótulo curto de status/chamada (ex.: "Inscrições abertas"). */
  status: string;
  href: string;
  featured?: boolean;
}

// TODO: validar textos, status e links com a equipe do NERD antes de publicar.
export const ecosystemItems: readonly EcosystemItem[] = [
  {
    id: "csx-week",
    kind: "evento",
    title: "CSX Week",
    description: "Uma semana de conteúdo, conexões e negócios reunindo empresas, startups e especialistas do ecossistema.",
    status: "Em destaque",
    href: "#contato",
    featured: true,
  },
  {
    id: "formacao-govtech",
    kind: "programa",
    title: "Programa Formação GovTech",
    description: "Capacitação para startups que querem desenvolver soluções e vender para o setor público.",
    status: "Programa",
    href: "#contato",
  },
  {
    id: "finep-mais-inovacao",
    kind: "edital",
    title: "Finep Mais Inovação",
    description: "Oportunidade de fomento para projetos de pesquisa, desenvolvimento e inovação.",
    status: "Edital",
    href: "#contato",
  },
];

/* ------------------------------------------------------------------ */
/* Dois caminhos                                                       */
/* ------------------------------------------------------------------ */

export type PathId = "empresas" | "startups";

export type PillarIcon =
  | "curadoria"
  | "rede"
  | "talentos"
  | "formacao"
  | "mercado"
  | "capital";

export interface PathPillar {
  id: string;
  icon: PillarIcon;
  title: string;
  description: string;
}

export interface Path {
  id: PathId;
  eyebrow: string;
  title: string;
  intro: string;
  cta: { label: string; href: SiteHref };
  pillars: readonly PathPillar[];
}

// TODO: validar descrições dos pilares com a equipe do NERD.
export const paths: readonly Path[] = [
  {
    id: "empresas",
    eyebrow: "Caminho 01",
    title: "Para empresas",
    intro: "Conecte sua empresa a startups, talentos e oportunidades do ecossistema com quem conhece o terreno.",
    cta: { label: "Seja membro", href: "/membro" },
    pillars: [
      {
        id: "curadoria",
        icon: "curadoria",
        title: "Curadoria",
        description: "Acesso qualificado às startups e soluções certas para os desafios do seu negócio.",
      },
      {
        id: "rede",
        icon: "rede",
        title: "Rede",
        description: "Relacionamento com empresas, academia, governo e investidores do Porto Digital.",
      },
      {
        id: "talentos",
        icon: "talentos",
        title: "Formação de talentos",
        description: "Programas para desenvolver e atrair as pessoas que vão tocar a inovação.",
      },
    ],
  },
  {
    id: "startups",
    eyebrow: "Caminho 02",
    title: "Para startups",
    intro: "Do primeiro protótipo à escala: apoio para construir, vender e captar dentro do ecossistema.",
    cta: { label: "Para startups", href: "/startup" },
    pillars: [
      {
        id: "formacao",
        icon: "formacao",
        title: "Formação Empreendedora",
        description: "Trilhas e mentorias para estruturar o negócio e fortalecer o time fundador.",
      },
      {
        id: "mercado",
        icon: "mercado",
        title: "Desenvolvimento de Mercado",
        description: "Conexões com grandes empresas e governo para gerar pilotos e primeiros contratos.",
      },
      {
        id: "capital",
        icon: "capital",
        title: "Capital e Investimento",
        description: "Ponte com investidores, fundos e editais de fomento para acelerar o crescimento.",
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Espaço físico                                                       */
/* ------------------------------------------------------------------ */

export interface SpaceScene {
  /** Cores do gradiente de fallback enquanto não há foto. */
  from: string;
  to: string;
  accent: string;
}

export interface SpaceItem {
  id: string;
  name: string;
  description: string;
  /** Caminho em /public (ex.: "/espaco/coworking.jpg"). Sem foto, usa a cena gerada. */
  image?: string;
  scene: SpaceScene;
}

export interface SpaceFact {
  id: string;
  value?: number;
  suffix?: string;
  label: string;
}

export const spaceFacts: readonly SpaceFact[] = [
  { id: "area", value: 2500, suffix: "m²", label: "de área" },
  { id: "andares", value: 4, label: "andares" },
  { id: "local", label: "No coração do Recife" },
];

export const spaceAddress = "Rua Dona Maria César, 70 — Bairro do Recife";

// TODO: substituir as cenas por fotos reais em /public/espaco e validar a lista de ambientes.
export const spaces: readonly SpaceItem[] = [
  {
    id: "coworking",
    name: "Coworking",
    description: "Estações abertas para trabalhar lado a lado com quem está construindo o ecossistema.",
    scene: { from: "#081a52", to: "#1450ef", accent: "#f2f1ec" },
  },
  {
    id: "cafe",
    name: "Café bistrô",
    description: "O ponto de encontro do prédio: café, conversa e as melhores conexões acontecem aqui.",
    scene: { from: "#3a1408", to: "#ff4b2b", accent: "#f2f1ec" },
  },
  {
    id: "reunioes",
    name: "Salas de reunião",
    description: "Ambientes reserváveis para reuniões, entrevistas e sessões de mentoria.",
    scene: { from: "#062a26", to: "#22e1c9", accent: "#07080a" },
  },
  {
    id: "eventos",
    name: "Espaço para eventos",
    description: "Palco para meetups, demo days e encontros da comunidade.",
    scene: { from: "#0d1530", to: "#6b95ff", accent: "#f2f1ec" },
  },
];

/* ------------------------------------------------------------------ */
/* Especialistas e governança                                          */
/* ------------------------------------------------------------------ */

export interface BoardMember {
  id: string;
  name: string;
  role?: string;
}

export interface CommitteeGroup {
  id: string;
  title: string;
  description: string;
  committees: readonly string[];
}

// TODO: completar com a lista oficial do Advisory Board (fontes públicas não listam os membros).
export const advisoryBoard: readonly BoardMember[] = [
  { id: "silvio-meira", name: "Silvio Meira" },
  { id: "ana-carla-abrao", name: "Ana Carla Abrão" },
];

export const advisoryBoardDescription =
  "Líderes nacionais que apoiam a construção das diretrizes estratégicas do NERD.";

export const committeeGroups: readonly CommitteeGroup[] = [
  {
    id: "competencias",
    title: "Competências transversais",
    description: "Comitês de curadoria em temas que atravessam todos os setores.",
    committees: ["Inteligência Artificial", "Cibersegurança", "Capital", "ESG", "Futuro do Trabalho"],
  },
  {
    id: "verticais",
    title: "Verticais de mercado",
    description: "Comitês de curadoria dedicados aos setores que mais demandam inovação.",
    committees: ["Saúde", "Indústria", "Jurídico", "Financeiro", "Varejo", "Turismo", "Governo", "Energia"],
  },
];
