/**
 * Regulamento do Membership NERD (Anexo I ao Termo de Adesão), transcrito de
 * https://nerd.portodigital.org/regulamento — Versão 2, julho/2026.
 * Texto normativo: altere apenas a partir da versão oficial.
 */

export type RegBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: readonly string[] }
  /** Itens com rótulo em destaque (ex.: "Recebimento da Demanda: ..."); `ordered: false` = parágrafos. */
  | { type: "termList"; ordered?: boolean; items: ReadonlyArray<{ term: string; text: string }> }
  | { type: "table"; head: readonly string[]; rows: ReadonlyArray<readonly string[]> }
  | { type: "note"; text: string }
  | { type: "subheading"; text: string };

export interface RegArticle {
  id: string;
  label: string;
  title: string;
  blocks: readonly RegBlock[];
}

export interface RegChapter {
  id: string;
  numeral: string;
  title: string;
  articles: readonly RegArticle[];
}

export const regulamentoMeta = {
  issuer: "Núcleo de Gestão do Porto Digital",
  title: "Regulamento do Membership NERD",
  subtitle: "Anexo I ao Termo de Adesão NERD Membership",
  version: "Versão 2 — julho/2026",
  place: "Recife/PE",
  preamble:
    "Este Regulamento integra o Termo de Adesão NERD Membership e pode ser atualizado pela CONTRATADA mediante comunicação formal ao membro, sem necessidade de aditivo contratual, nas condições previstas no Capítulo V.",
} as const;

export const regulamentoChapters: readonly RegChapter[] = [
  {
    id: "capitulo-1",
    numeral: "I",
    title: "Planos, preços e sistema de pontos",
    articles: [
      {
        id: "art-1",
        label: "Art. 1º",
        title: "Planos disponíveis e valores anuais",
        blocks: [
          {
            type: "paragraph",
            text: "A tabela abaixo reflete os valores vigentes. Os preços podem ser revisados trimestralmente pela CONTRATADA, com comunicação prévia aos membros na forma prevista neste Regulamento. O valor contratado pelo membro no Termo de Adesão é fixo pelo período de vigência do respectivo instrumento.",
          },
          {
            type: "table",
            head: ["Categoria / Plano", "Pontos Anuais (Pixels)", "Valor Anual (R$)"],
            rows: [
              ["NERD Conecta", "120 pontos", "R$ 10.000,00"],
              ["NERD Inova", "260 pontos", "R$ 20.000,00"],
              ["NERD Plataforma", "850 pontos", "R$ 70.000,00"],
              ["Embarcada Porto Digital*", "60 pontos", "Gratuito"],
              ["Parceiro NERD**", "60 pontos", "Gratuito"],
              ["Incubado***", "120 pontos", "Gratuito"],
            ],
          },
          { type: "note", text: "* Embarcadas: empresas fisicamente instaladas no ecossistema Porto Digital." },
          {
            type: "note",
            text: "** Parceiros: organizações reconhecidas formalmente pela CONTRATADA como parceiros estratégicos do NERD. O enquadramento em ambas as categorias depende de validação pela CONTRATADA.",
          },
          { type: "note", text: "*** Incubado: startups participando dos programas do NERD." },
        ],
      },
      {
        id: "art-2",
        label: "Art. 2º",
        title: "Sistema de pontos (Pixels NERD)",
        blocks: [
          {
            type: "paragraph",
            text: "2.1. Os pontos funcionam como créditos anuais que permitem ao membro acessar os espaços, serviços de formação e serviços de negócios do NERD ao longo da vigência do Termo de Adesão.",
          },
          {
            type: "paragraph",
            text: "2.2. Os pontos têm validade anual, não são cumuláveis entre períodos, não são transferíveis para terceiros e não são convertíveis em dinheiro.",
          },
          {
            type: "paragraph",
            text: "2.3. Membros têm prioridade de agendamento e condições diferenciadas em relação ao uso avulso por não-membros.",
          },
        ],
      },
      {
        id: "art-3",
        label: "Art. 3º",
        title: "Tabela de consumo de pontos",
        blocks: [
          {
            type: "paragraph",
            text: "A tabela abaixo define o custo em pontos por tipo de uso. Esta tabela é revisada trimestralmente pela CONTRATADA.",
          },
          { type: "subheading", text: "3.1. Espaços" },
          {
            type: "table",
            head: ["Espaço / Uso", "Custo em Pontos"],
            rows: [
              ["Assento no cowork - turno", "2 pontos"],
              ["Sala de reunião - 1h", "1 ponto"],
              ["Sala de reunião - 2h", "2 pontos"],
              ["Sala de reunião - turno (4h)", "4 pontos"],
              ["Sala de formação - 1h", "3 pontos"],
              ["Sala de formação - turno (4h)", "10 pontos"],
              ["Auditório - turno (4h)*", "25 pontos"],
              ["Auditório - dia inteiro (8h)*", "40 pontos"],
              ["Arena - turno (4h)", "15 pontos"],
              ["Arena - dia inteiro (8h)", "30 pontos"],
            ],
          },
          { type: "note", text: "* Os eventos no auditório devem passar por aprovação de curadoria da CONTRATADA." },
          { type: "subheading", text: "3.2. Formação" },
          {
            type: "table",
            head: ["Serviço de Formação", "Custo em Pontos"],
            rows: [
              ["Curso aberto - 1 vaga (4h)", "3 pontos"],
              ["Curso aberto - 1 vaga (8h)", "5 pontos"],
            ],
          },
          { type: "subheading", text: "3.3. Serviços de Negócios" },
          {
            type: "table",
            head: ["Serviço de Negócios", "Custo em Pontos"],
            rows: [["1 curadoria + mediação de reunião com 3 techs do Porto Digital (conforme Capítulo IV)", "45 pontos"]],
          },
          { type: "subheading", text: "3.4. Eventos - sem custo de pontos" },
          {
            type: "paragraph",
            text: "A participação nos eventos abaixo não consome pontos e está incluída em todos os planos:",
          },
          {
            type: "list",
            items: [
              "eventos abertos promovidos pelo Porto Digital e pelo NERD;",
              "eventos exclusivos para membros do Membership NERD.",
            ],
          },
        ],
      },
      {
        id: "art-4",
        label: "Art. 4º",
        title: "Pontos adicionais",
        blocks: [
          {
            type: "paragraph",
            text: "O membro poderá adquirir pontos adicionais durante a vigência do Termo de Adesão. Os pontos extras seguem a mesma data de expiração dos pontos originais do plano contratado.",
          },
          {
            type: "table",
            head: ["Pacote", "Pontos", "Valor (R$)"],
            rows: [
              ["Pacote Pequeno", "20 pontos", "R$ 2.500,00"],
              ["Pacote Médio", "50 pontos", "R$ 5.500,00"],
              ["Pacote Grande", "100 pontos", "R$ 10.000,00"],
            ],
          },
        ],
      },
      {
        id: "art-5",
        label: "Art. 5º",
        title: "Uso avulso (não-membros)",
        blocks: [
          {
            type: "paragraph",
            text: "Os espaços do NERD podem ser contratados de forma avulsa por empresas não-membros, sujeito à disponibilidade e à prioridade de membros. Os valores do uso avulso são definidos em tabela própria, disponível nos canais de atendimento do NERD, e podem ser revisados a qualquer momento.",
          },
        ],
      },
    ],
  },
  {
    id: "capitulo-2",
    numeral: "II",
    title: "Usuários vinculados",
    articles: [
      {
        id: "art-6",
        label: "Art. 6º",
        title: "Limite de usuários por plano",
        blocks: [
          {
            type: "paragraph",
            text: "Cada empresa membro pode cadastrar usuários vinculados até o limite abaixo. Usuários adicionais podem ser contratados mediante pagamento extra, a ser formalizado em aditivo ao Termo de Adesão.",
          },
          {
            type: "table",
            head: ["Plano", "Usuários Incluídos", "Usuários Adicionais"],
            rows: [
              ["NERD Conecta", "Até 19 usuários", "Mediante pagamento extra"],
              ["NERD Inova", "De 20 a 29 usuários", "Mediante pagamento extra"],
              ["NERD Plataforma", "De 30 a 49 usuários", "Mediante pagamento extra"],
            ],
          },
        ],
      },
      {
        id: "art-7",
        label: "Art. 7º",
        title: "Regras de vínculo",
        blocks: [
          {
            type: "list",
            items: [
              "cada usuário deve estar formalmente vinculado à empresa membro como colaborador, sócio ou representante autorizado;",
              "o acesso é individual e intransferível - é vedado o compartilhamento de credenciais;",
              "a empresa membro é responsável por manter atualizada sua lista de usuários autorizados junto à CONTRATADA;",
              "alterações na lista de usuários devem ser comunicadas com até 5 (cinco) dias úteis de antecedência;",
              "a empresa membro responde integralmente pelos atos e omissões de seus usuários no ambiente do Porto Digital/NERD.",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "capitulo-3",
    numeral: "III",
    title: "Regras operacionais",
    articles: [
      {
        id: "art-8",
        label: "Art. 8º",
        title: "Agendamento e reserva",
        blocks: [
          {
            type: "list",
            items: [
              "o agendamento é obrigatório e deve ser realizado com antecedência mínima de 48 (quarenta e oito) horas, salvo disponibilidade imediata confirmada pelo NERD;",
              "a utilização dos espaços está sujeita à disponibilidade e à prioridade de membros sobre usuários avulsos;",
              "os espaços devem ser devolvidos no mesmo estado em que foram recebidos;",
              "serviços de cenografia, equipamentos específicos além dos já instalados e demais necessidades adicionais não estão incluídos nos planos e serão cobrados à parte.",
            ],
          },
        ],
      },
      {
        id: "art-9",
        label: "Art. 9º",
        title: "Espaços alternativos",
        blocks: [
          {
            type: "paragraph",
            text: "Em caso de indisponibilidade de um espaço reservado - seja por lotação, manutenção, problema operacional de última hora ou qualquer outro motivo - a CONTRATADA poderá, a seu critério, disponibilizar espaço equivalente em outros prédios do Porto Digital ou em instalações de parceiros do ecossistema, sem ônus adicional ao membro. A CONTRATADA não é obrigada a oferecer espaço alternativo, mas se o fizer, a reserva original é considerada cumprida e os pontos correspondentes são debitados normalmente.",
          },
        ],
      },
      {
        id: "art-10",
        label: "Art. 10",
        title: "Cancelamentos e no-show",
        blocks: [
          {
            type: "list",
            items: [
              "cancelamentos comunicados com menos de 24 (vinte e quatro) horas de antecedência para salas de reunião e formação acarretam o débito integral dos pontos reservados;",
              "cancelamentos de auditório comunicados com menos de 48 (quarenta e oito) horas de antecedência acarretam o débito integral dos pontos reservados;",
              "no-shows (ausência sem cancelamento) geram débito integral independentemente do tipo de espaço;",
              "a CONTRATADA poderá, em caso de dano apurado aos espaços, debitar pontos correspondentes ao valor do dano ou cobrá-lo diretamente, esgotados os pontos.",
            ],
          },
        ],
      },
      {
        id: "art-11",
        label: "Art. 11",
        title: "Conduta nos espaços",
        blocks: [
          {
            type: "list",
            items: [
              "uso respeitoso dos espaços e convivência harmoniosa com os demais membros e frequentadores do ecossistema;",
              "proibição de práticas discriminatórias, assédio de qualquer natureza ou conduta antiética;",
              "respeito às regras internas do Porto Digital e do NERD;",
              "vedação ao uso dos espaços, infraestrutura ou marca para fins ilícitos ou não autorizados;",
              "observância das regras de confidencialidade nas interações com startups, empresas e outros membros.",
            ],
          },
          {
            type: "paragraph",
            text: "Em caso de descumprimento, a CONTRATADA poderá advertir o usuário, suspender temporariamente seu acesso, excluí-lo da lista de vinculados ou, em caso de infrações graves ou reiteradas, rescindir o Termo de Adesão.",
          },
        ],
      },
    ],
  },
  {
    id: "capitulo-4",
    numeral: "IV",
    title: "Serviço de curadoria e intermediação de negócios",
    articles: [
      {
        id: "art-12",
        label: "Art. 12",
        title: "Objetivo do Serviço",
        blocks: [
          {
            type: "paragraph",
            text: "O serviço de Curadoria (45 pontos, conforme Art. 3.3) tem como propósito conectar os desafios estratégicos da empresa membro com soluções do ecossistema do NERD. A CONTRATADA atua na identificação e na aproximação da empresa membro com os parceiros ideais para resolver demandas específicas, atuando como facilitadora na geração de novos negócios.",
          },
        ],
      },
      {
        id: "art-13",
        label: "Art. 13",
        title: "Escopo e Dinâmica de Atendimento",
        blocks: [
          { type: "paragraph", text: "O processo de intermediação é conduzido da seguinte forma:" },
          {
            type: "termList",
            items: [
              {
                term: "Recebimento da Demanda",
                text: "o processo tem início com o preenchimento, pela Demandante, de um formulário com as informações sobre o desafio para o qual se busca parceiros.",
              },
              {
                term: "Alinhamento e Curadoria",
                text: "a equipe da CONTRATADA analisa o escopo recebido e, caso necessário, realiza contato pontual para esclarecer dúvidas sobre a demanda.",
              },
              {
                term: "Intermediação e Matchmaking",
                text: "agendamento e facilitação de uma rodada de reuniões presenciais, realizadas no espaço NERD, com até 3 (três) empresas da base do ecossistema previamente selecionadas por sua aderência ao desafio proposto.",
              },
              {
                term: "Avaliação de Resultados",
                text: "após a rodada de apresentações, a CONTRATADA realiza uma avaliação conjunta das reuniões para mapear a sinergia e as reais possibilidades de fechamento de negócios.",
              },
            ],
          },
        ],
      },
      {
        id: "art-14",
        label: "Art. 14",
        title: "Limitações do Escopo (o que não está incluso)",
        blocks: [
          {
            type: "termList",
            items: [
              {
                term: "Mapeamento do Desafio",
                text: "o serviço não abrange o processo de diagnóstico, identificação ou descrição da situação-problema. É responsabilidade da empresa Demandante estruturar e enviar uma descrição clara do desafio pelo formulário inicial disponibilizado pela CONTRATADA.",
              },
              {
                term: "Gestão de Projetos",
                text: "o serviço tem natureza estrita de conexão e facilitação. Não estão incluídos o acompanhamento da execução da solução, testes de prova de conceito (PoC) ou o gerenciamento do projeto junto aos parceiros selecionados após a fase de intermediação.",
              },
            ],
          },
        ],
      },
      {
        id: "art-15",
        label: "Art. 15",
        title: "Prazos e Condições",
        blocks: [
          {
            type: "termList",
            ordered: false,
            items: [
              {
                term: "SLA de Agendamento",
                text: "o prazo previsto para a realização da reunião de intermediação é de 7 (sete) dias úteis após a submissão e validação do formulário de desafio. Esse prazo pode ser estendido de acordo com a disponibilidade de agenda do espaço físico.",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "capitulo-5",
    numeral: "V",
    title: "Revisão e atualização deste Regulamento",
    articles: [
      {
        id: "art-16",
        label: "Art. 16",
        title: "Periodicidade e forma de revisão",
        blocks: [
          {
            type: "list",
            items: [
              "A tabela de consumo de pontos (Art. 3º) e os valores dos planos para novos contratos (Art. 1º) são revisados trimestralmente pela CONTRATADA, com comunicação formal aos membros ativos com antecedência mínima de 10 (dez) dias úteis.",
              "Os demais artigos deste Regulamento podem ser alterados a qualquer tempo, mediante comunicação com a mesma antecedência mínima.",
              "O valor anual contratado no Termo de Adesão é fixo durante a vigência do instrumento assinado, sendo os novos valores aplicáveis apenas a renovações ou novos contratos firmados após a atualização.",
              "Reservas confirmadas antes da comunicação de qualquer alteração serão honradas conforme as condições vigentes no momento da reserva.",
            ],
          },
        ],
      },
    ],
  },
];
