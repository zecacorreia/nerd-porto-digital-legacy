/**
 * Conteúdo estático do site. Centralizado aqui para facilitar a troca
 * futura por um CMS.
 *
 * Os textos seguem a versão aprovada (nerd-porto-digital-dev) palavra por palavra.
 */

import { whatsappLink } from "@/lib/site";

/** Âncora na página atual (`#x`) ou rota interna (`/membro`, `/#numeros`). */
export type SiteHref = `#${string}` | `/${string}`;

/** Destino de um CTA: rota/âncora interna ou link externo (WhatsApp, e-mail, sites). */
export type CtaHref = SiteHref | `https://${string}` | `mailto:${string}`;

export interface NavLink {
  label: string;
  href: SiteHref;
}

export interface Cta {
  label: string;
  href: CtaHref;
}

/** Mensagem pré-preenchida do WhatsApp usada em todos os CTAs "Fale com…". */
export const specialistWhatsappHref = whatsappLink(
  "Olá, gostaria de falar com um especialista do NERD.",
) as `https://${string}`;

/** Todo link que não começa com `/` ou `#` abre em nova aba. */
export function isExternalHref(href: string): boolean {
  return !href.startsWith("/") && !href.startsWith("#");
}

/* ------------------------------------------------------------------ */
/* Navegação                                                           */
/* ------------------------------------------------------------------ */

export const navLinks: readonly NavLink[] = [
  { label: "O NERD", href: "/#conheca-o-nerd" },
  { label: "Para empresas", href: "/#para-empresas" },
  { label: "Para startups", href: "/#para-startups" },
  { label: "Agenda", href: "/#agora-no-ecossistema" },
  { label: "Porto Digital", href: "/#porto-digital" },
];

export const headerCta: Cta = { label: "Fale com um especialista", href: specialistWhatsappHref };

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

export interface HeroContent {
  eyebrow: string;
  title: string;
  subtitle: string;
  ctas: ReadonlyArray<{ label: string; href: SiteHref; variant: "primary" | "ghost" }>;
}

export const heroContent: HeroContent = {
  eyebrow: "NERD · A plataforma de negócios do Porto Digital",
  title: "Seu desafio, conectado a quem pode resolver.",
  subtitle:
    "O NERD — Núcleo de Empreendedorismo e Residência Digital é a plataforma de negócios do Porto Digital. Conectamos empresas, startups e talentos para desenvolver soluções, conquistar clientes e criar oportunidades de crescimento.",
  ctas: [
    { label: "Busco soluções para minha empresa", href: "#para-empresas", variant: "primary" },
    { label: "Quero desenvolver minha startup", href: "#para-startups", variant: "ghost" },
  ],
};

/* ------------------------------------------------------------------ */
/* Porto Digital                                                       */
/* ------------------------------------------------------------------ */

export interface EcosystemStat {
  id: string;
  value: number;
  suffix?: string;
  /** Legenda abaixo do número. */
  label: string;
  /** Legenda em partes, quando precisa de separador visual (ex.: hubs). */
  labelParts?: readonly string[];
}

export const portoDigital = {
  title: "A força do Porto Digital, conectada ao seu negócio.",
  highlight: ["negócio."],
  paragraphs: [
    "O Porto Digital é o maior distrito de inovação do Brasil, reunindo empresas, universidades, governo e sociedade civil para gerar desenvolvimento econômico, social e urbano.",
    "Por meio do NERD, você passa a integrar a rede de empresas de tecnologia, empreendedores e especialistas do Porto Digital.",
  ],
  cta: { label: "Conhecer o Porto Digital", href: "https://www.portodigital.org" } satisfies Cta,
};

export const ecosystemStats: readonly EcosystemStat[] = [
  { id: "anos", value: 25, suffix: " anos", label: "de atuação" },
  { id: "empresas", value: 541, label: "empresas no distrito do Recife" },
  { id: "profissionais", value: 24, suffix: " mil", label: "profissionais no distrito" },
  {
    id: "hubs",
    value: 5,
    suffix: " hubs",
    label: "4 no Brasil 1 em Portugal",
    labelParts: ["4 no Brasil", "1 em Portugal"],
  },
];

/* ------------------------------------------------------------------ */
/* O NERD (o que fazemos / quem atendemos)                             */
/* ------------------------------------------------------------------ */

export interface Audience {
  id: string;
  title: string;
  description: string;
}

export const whatWeDo = {
  title: "O que fazemos",
  text: "O NERD reúne iniciativas para aproximar empresas a soluções tecnológicas, apoiar empresas de tecnologia em seu crescimento e aproximar profissionais das necessidades e transformações do mercado.",
  audiencesTitle: "Quem atendemos?",
  audiences: [
    {
      id: "empresas",
      title: "Empresas",
      description:
        "Conexões com fornecedores de tecnologia, formação para equipes e oportunidades de relacionamento e negócios.",
    },
    {
      id: "startups",
      title: "Startups/empresas de tecnologia",
      description:
        "Formação empreendedora, aproximação com potenciais clientes e preparação para buscar investimentos.",
    },
    {
      id: "profissionais",
      title: "Profissionais do mercado",
      description: "Desenvolva habilidades conectadas às necessidades do mundo corporativo.",
    },
  ] satisfies readonly Audience[],
};

/* ------------------------------------------------------------------ */
/* Para empresas / Para startups                                       */
/* ------------------------------------------------------------------ */

export type PathId = "empresas" | "startups";

export type PillarIcon = "curadoria" | "formacao" | "rede" | "espaco" | "mercado" | "capital";

export interface PathPillar {
  id: string;
  icon: PillarIcon;
  title: string;
  description: string;
}

export interface Path {
  id: PathId;
  /** Id da âncora na página (usado pelo menu e pelos CTAs do hero). */
  anchor: string;
  /** Nome curto da seção (igual ao do menu). */
  name: string;
  title: string;
  highlight: readonly string[];
  ctas: ReadonlyArray<Cta & { variant: "primary" | "outline" | "dark" }>;
  pillars: readonly PathPillar[];
}

export const paths: readonly Path[] = [
  {
    id: "empresas",
    anchor: "para-empresas",
    name: "Para empresas",
    title: "Soluções e conexões para sua empresa",
    highlight: ["sua", "empresa"],
    ctas: [
      { label: "Conheça os planos para empresas", href: "/membro", variant: "dark" },
      { label: "Fale com o NERD", href: specialistWhatsappHref, variant: "outline" },
    ],
    pillars: [
      {
        id: "desafio",
        icon: "curadoria",
        title: "Encontre soluções para o seu desafio",
        description:
          "Apresente o desafio do seu negócio e receba a indicação de empresas do ecossistema do Porto Digital com potencial para atendê-lo.",
      },
      {
        id: "equipe",
        icon: "formacao",
        title: "Desenvolva sua equipe",
        description:
          "Oferecemos cursos e experiências práticas para atualizar competências, ampliar a produtividade e aplicar novas ideias ao dia a dia da sua empresa.",
      },
      {
        id: "especialistas",
        icon: "rede",
        title: "Conecte-se a especialistas e lideranças",
        description:
          "Troque experiências com lideranças empresariais, empreendedores e especialistas que conhecem os desafios do seu mercado.",
      },
      {
        id: "espacos",
        icon: "espaco",
        title: "Conte com espaços para trabalhar e se conectar",
        description:
          "Utilize espaços para reuniões, encontros e eventos e amplie as oportunidades de relacionamento com organizações e profissionais do ecossistema.",
      },
    ],
  },
  {
    id: "startups",
    anchor: "para-startups",
    name: "Para startups",
    title: "Sua startup cresce em rede",
    highlight: ["rede"],
    ctas: [{ label: "Conheça a jornada de startups", href: "/startup", variant: "primary" }],
    pillars: [
      {
        id: "negocio",
        icon: "formacao",
        title: "Desenvolva seu negócio",
        description:
          "Avance da ideia à validação do modelo de negócio, com formação empreendedora e apoio adequado à etapa da sua startup.",
      },
      {
        id: "clientes",
        icon: "mercado",
        title: "Aproxime-se de potenciais clientes",
        description:
          "Conecte sua startup a empresas, governo e parceiros para explorar oportunidades comerciais.",
      },
      {
        id: "capital",
        icon: "capital",
        title: "Capital e investimento",
        description:
          "Facilitamos o acesso a recursos financeiros adequados a cada estágio de maturidade da startup, promovendo a cultura de investimento como ferramenta para crescimento e escala.",
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Advisory Board e comitês de curadoria                               */
/* ------------------------------------------------------------------ */

export interface BoardMember {
  id: string;
  name: string;
  role: string;
}

export interface Curator {
  id: string;
  name: string;
  organization?: string;
}

export interface CommitteeGroup {
  id: string;
  title: string;
  committees: readonly string[];
}

export const knowledge = {
  title: "Conhecimento compartilhado para enfrentar desafios.",
  highlight: ["desafios."],
  text: "O NERD reúne especialistas de reconhecimento nacional para discutir desafios do mercado, identificar oportunidades e estimular projetos conjuntos.",
  boardText:
    "O Advisory Board do NERD reúne lideranças de destaque nacional que contribuem com a definição das diretrizes estratégicas da plataforma.",
  committeesText:
    "Os comitês contribuem com conhecimento, tendências e propostas de iniciativas em cinco competências e cinco setores.",
  curatorsButton: "Ver os 53 integrantes",
  curatorsSubtitle: "Comitês de Curadoria do NERD",
};

export const advisoryBoard: readonly BoardMember[] = [
  { id: "ana-carla-abrao", name: "Ana Carla Abrão", role: "CEO, Open Finance Brasil" },
  { id: "anaterra-oliveira", name: "Anaterra Oliveira", role: "CIO, DASA" },
  { id: "andre-petenussi", name: "André Petenussi", role: "CTO, Localiza" },
  { id: "ascanio-franca", name: "Ascânio França", role: "Founder, FBR Digital / Tapioca Valley" },
  { id: "bruno-stefani", name: "Bruno Stefani", role: "Founder, Ambev Tech" },
  { id: "cristiano-lincoln", name: "Cristiano Lincoln", role: "Conselheiro, Tempest" },
  { id: "domingos-monteiro", name: "Domingos Monteiro", role: "Conselheiro, Trillia" },
  { id: "edilson-reis", name: "Edilson Reis", role: "CIO, Bradesco Seguros" },
  { id: "marcos-lisboa", name: "Marcos Lisboa", role: "Economista e ex-presidente, Insper" },
  { id: "mauro-alarcon", name: "Mauro Alarcon", role: "CIO, Alpargatas" },
  { id: "robledo-castro", name: "Robledo Castro", role: "Founder, B4Tech Business" },
  { id: "silvio-meira", name: "Silvio Meira", role: "Presidente do conselho, Porto Digital" },
  { id: "simone-pittner", name: "Simone Pittner", role: "CTO, Aramis" },
  { id: "tiago-tasso", name: "Tiago Tasso", role: "CFO, Grupo Moura" },
];

export const committeeGroups: readonly CommitteeGroup[] = [
  {
    id: "competencias",
    title: "Competências",
    committees: ["Capital", "Cibersegurança", "IA", "Futuro do Trabalho", "ESG"],
  },
  {
    id: "verticais",
    title: "Verticais",
    committees: ["Indústria", "Saúde", "Turismo", "Varejo", "Finanças"],
  },
];

export const curators: readonly Curator[] = [
  { id: "alcides-pires", name: "Alcides Pires", organization: "Midiavox" },
  { id: "alfredo-junior", name: "Alfredo Júnior", organization: "Hub Plural" },
  { id: "alvaro-leal", name: "Álvaro Leal", organization: "Pague Bem Brasil" },
  { id: "ana-karina-bezerra", name: "Ana Karina Bezerra", organization: "IBGC" },
  { id: "ana-luiza-ferreira", name: "Ana Luiza Ferreira", organization: "GF Capital" },
  { id: "ana-uriarte", name: "Ana Uriarte", organization: "Quark" },
  { id: "anderson-belo", name: "Anderson Belo", organization: "Heineken" },
  { id: "andre-magalhaes", name: "André Magalhães", organization: "UFPE" },
  { id: "anne-d-antona", name: "Anne D'Antona", organization: "TECSAÚDE" },
  { id: "antonio-pedrosa", name: "Antônio Pedrosa", organization: "Souv" },
  { id: "ascanio-franca", name: "Ascânio França", organization: "FBR Digital" },
  { id: "augusto-galvao", name: "Augusto Galvão", organization: "TrueFlow" },
  { id: "berg-melo", name: "Berg Melo", organization: "Incognia" },
  { id: "carla-pasa", name: "Carla Pasa", organization: "UFPE" },
  { id: "carlos-misiara", name: "Carlos Misiara", organization: "Gestra Consultoria" },
  { id: "carlos-periquito", name: "Carlos Periquito", organization: "ABIH" },
  { id: "carlos-rebelato", name: "Carlos Rebelato", organization: "BR Angels" },
  { id: "carmelo-bastos", name: "Carmelo Bastos", organization: "UPE" },
  { id: "cesar-andrade", name: "Cesar Andrade", organization: "SECTI - PE" },
  { id: "claudia-alencar", name: "Cláudia Alencar", organization: "Avanade" },
  { id: "cleber-zanchettin", name: "Cleber Zanchettin", organization: "CIn/UFPE" },
  { id: "cleviton-monteiro", name: "Cleviton Monteiro", organization: "FlowUp" },
  { id: "daniel-almeida", name: "Daniel Almeida", organization: "Stepps" },
  { id: "fabio-maia", name: "Fabio Maia", organization: "CESAR (CISSA)" },
  { id: "federico-salvi", name: "Federico Salvi" },
  { id: "fernando-paiva", name: "Fernando Paiva", organization: "UFPE" },
  { id: "fernando-sales", name: "Fernando Sales", organization: "SBEB" },
  { id: "filipe-calegario", name: "Filipe Calegario", organization: "CIn/UFPE" },
  { id: "flavia-brito", name: "Flávia Brito", organization: "Bidweb" },
  { id: "flavio-rabelo", name: "Flávio Rabelo", organization: "TI Saúde" },
  { id: "haim-mesel", name: "Haim Mesel", organization: "Triaxis Capital" },
  { id: "iran-costa", name: "Iran Costa", organization: "Oncologia D'Or" },
  { id: "jaana-goeggel", name: "Jaana Goeggel", organization: "Sororite" },
  { id: "jacques-pincovsky", name: "Jacques Pincovsky", organization: "Secretaria de Saúde de Pernambuco" },
  { id: "leonardo-gusmao", name: "Leonardo Gusmão", organization: "Solar Coca Cola" },
  { id: "lucas-santana", name: "Lucas Santana", organization: "Bradesco" },
  { id: "luciano-meira", name: "Luciano Meira", organization: "Proz" },
  { id: "lucio-ribeiro", name: "Lúcio Ribeiro", organization: "Continuum" },
  { id: "luis-fernando-silva", name: "Luis Fernando Silva", organization: "Accenture" },
  { id: "marco-carnut", name: "Marco Carnut", organization: "Zro Bank" },
  { id: "marcos-primo", name: "Marcos Primo", organization: "UFPE" },
  { id: "marina-arruda", name: "Marina Arruda", organization: "Embratur" },
  { id: "pedro-souza", name: "Pedro Souza", organization: "PK2 Soluções Inteligentes" },
  { id: "pollyanna-cavalcanti", name: "Pollyanna Cavalcanti", organization: "Avantia / ESMG" },
  { id: "priscilla-moraes", name: "Priscilla Moraes", organization: "IBGC" },
  { id: "rafael-soares", name: "Rafael Soares", organization: "Comeia" },
  { id: "rodrigo-cunha", name: "Rodrigo Cunha", organization: "Trillia" },
  { id: "rodrigo-paiva", name: "Rodrigo Paiva", organization: "Trillia" },
  { id: "rui-belfort", name: "Rui Belfort", organization: "TDS Company" },
  { id: "socorro-macedo", name: "Socorro Macêdo", organization: "LeFil" },
  { id: "tarso-penaforte", name: "Tarso Penaforte", organization: "Propig" },
  { id: "thiago-donato", name: "Thiago Donato", organization: "Anjos do Brasil" },
  { id: "zeev-katz", name: "Zeev Katz", organization: "Labvie" },
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

export const spacesSection = {
  title: "Espaços para trabalhar, aprender e fazer negócios no Bairro do Recife",
  highlight: ["Bairro", "do", "Recife"],
};

export const spaceAddress = "Rua Dona Maria César, 70";

/** Endereço completo (contato e rodapé). */
export const fullAddress = "Rua Dona Maria César, 70, Bairro do Recife, Recife/PE";
export const postalCode = "50030-140";

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  "Rua Dona Maria César, 70 - Bairro do Recife, Recife/PE",
)}`;

// TODO: substituir as cenas por fotos reais em /public/espaco (a versão aprovada ainda não tem fotos).
export const spaces: readonly SpaceItem[] = [
  {
    id: "coworking",
    name: "Coworking rotativo",
    description: "Estações compartilhadas para trabalhar lado a lado com quem está construindo o ecossistema.",
    scene: { from: "#081a52", to: "#1450ef", accent: "#f7fcfb" },
  },
  {
    id: "convivio",
    name: "Áreas de convívio multifuncional",
    description: "Ambientes abertos para encontros, conversas e trabalho em grupo.",
    scene: { from: "#0d1530", to: "#01a3f8", accent: "#f7fcfb" },
  },
  {
    id: "cafe",
    name: "Café bistrô (Café 70)",
    description: "O ponto de encontro do prédio: café, conversa e as melhores conexões acontecem aqui.",
    scene: { from: "#3a1408", to: "#ff4b2b", accent: "#f7fcfb" },
  },
  {
    id: "reunioes",
    name: "Salas de reunião",
    description: "Salas e cabines de call reserváveis para reuniões, entrevistas e mentorias.",
    scene: { from: "#062a26", to: "#22e1c9", accent: "#191919" },
  },
];

/* ------------------------------------------------------------------ */
/* Agenda e oportunidades                                              */
/* ------------------------------------------------------------------ */

export type AgendaCategory = "eventos" | "editais" | "cursos";
export type AgendaFilter = "todos" | AgendaCategory;

export interface AgendaItem {
  id: string;
  category: AgendaCategory;
  tag: string;
  detail: string;
  title: string;
  description: string;
  footer: string;
}

export const agendaSection = {
  title: "Agenda e oportunidades",
  text: "Eventos e cursos do ecossistema do Porto Digital selecionados para empresas e startups.",
  filterLabel: "Filtrar agenda",
  empty: "Nenhum item nesta categoria no momento.",
  cta: { label: "Ver toda a agenda", href: "https://www.portodigital.org" } satisfies Cta,
};

export const agendaFilters: ReadonlyArray<{ id: AgendaFilter; label: string }> = [
  { id: "todos", label: "Todos" },
  { id: "eventos", label: "Eventos do NERD" },
  { id: "editais", label: "Editais" },
  { id: "cursos", label: "Cursos" },
];

// TODO: as páginas de detalhe (/eventos/[slug]) existem só na versão Dev; ligar os cards quando forem migradas.
export const agendaItems: readonly AgendaItem[] = [
  {
    id: "edital-facepe-pro-startups-mulheres-2026",
    category: "editais",
    tag: "EDITAL",
    detail: "R$ 105 MIL",
    title: "Edital nº 07/2026-FACEPE – Pró-Startups: Mulheres que Inovam",
    description:
      "Apoia jornadas de desenvolvimento de soluções inovadoras em três fases: Protótipo, MVP e Produto. O edital prevê apoio de até R$ 15 mil, R$ 30 mil e R$ 60 mil por projeto em cada fase, respectivamente; a fase MVP exige aprovação da prestação de contas da fase anterior e a startup deve estar formalizada. Após prorrogação, o prazo para submissão à fase MVP termina em 9 de novembro de 2026.",
    footer: "Fundação de Amparo à Ciência e Tecnologi · Até 09 nov 2026",
  },
  {
    id: "vi-vitrine-da-inovacao-2026",
    category: "eventos",
    tag: "EVENTO",
    detail: "GRATUITO",
    title: "VI Vitrine da Inovação 2026",
    description:
      "Encontro presencial que reúne deep techs, startups, pesquisadores, investidores, empresas e instituições em torno de ciência, tecnologia, inovação e empreendedorismo. O evento acontece em 10 de novembro de 2026, no Recife, com Arena de Startups, batalha de pitch, sala de negócios e outras atividades.",
    footer: "10 nov 2026",
  },
  {
    id: "festival-recnplay-2026",
    category: "eventos",
    tag: "EVENTO",
    detail: "GRATUITO",
    title: "Festival REC´n´Play 2026",
    description:
      "O REC’n’Play é um festival gratuito de inovação, cultura e tecnologia que transforma o Bairro do Recife em um grande laboratório de experiências. A programação inclui palestras, oficinas, debates, hackathons e atrações culturais, conectando pessoas, ideias e negócios. Realizado pelo Porto Digital, Ampla Comunicação e Sebrae, o evento é uma das principais vitrines da economia criativa no estado.",
    footer: "Porto Digital · 11 nov 2026",
  },
  {
    id: "festival-no-ar-coquetel-molotov-2026",
    category: "eventos",
    tag: "EVENTO",
    detail: "PAGO",
    title: "Festival No Ar Coquetel Molotov 2026",
    description:
      "Festival de música e cultura club que ocupa o campus da UFPE com shows, encontros e novas cenas. A programação reúne artistas de diferentes gerações e territórios, com destaque para a cena brasileira contemporânea e para conexões entre música, diversidade e cultura independente.",
    footer: "28 nov 2026",
  },
  {
    id: "recife-data-saturday-6",
    category: "eventos",
    tag: "EVENTO",
    detail: "GRATUITO",
    title: "Recife Data Saturday - 6ª Edição",
    description:
      "O Recife Data Saturday está de volta para sua 6ª edição, um evento gratuito para quem deseja mergulhar no universo dos dados. Os participantes terão a oportunidade de conhecer novas tecnologias, trocar experiências e se conectar com profissionais da área.",
    footer: "19 dez 2026",
  },
];

/* ------------------------------------------------------------------ */
/* Contato e rodapé                                                    */
/* ------------------------------------------------------------------ */

export const contactSection = {
  title: "Qual é o próximo passo para o seu negócio?",
  highlight: ["negócio?"],
  text: "Conte à equipe do NERD o que sua empresa ou startup precisa e conheça as opções de apoio oferecidas pela plataforma de negócios do Porto Digital.",
  cta: { label: "Fale com um especialista", href: specialistWhatsappHref } satisfies Cta,
  emailLabel: "E-mail",
  email: "nerd@portodigital.org",
  addressLabel: "Endereço",
  mapLabel: "Ver no mapa",
};

export const footerLinks: readonly Cta[] = [
  { label: "Regulamento do programa de membros", href: "/regulamento" },
  { label: "Assessoria de imprensa", href: "mailto:portodigital@bcw-global.com" },
  { label: "Conhecer o Porto Digital", href: "https://www.portodigital.org" },
  { label: "Observatório do Porto Digital", href: "https://portodigital.org/observatorio/" },
];

export const footerTagline =
  "NERD — Núcleo de Empreendedorismo e Residência Digital —, a plataforma de negócios do Porto Digital. Onde as conexões acontecem.";

export const copyright = "Porto Digital · Recife, Pernambuco";
