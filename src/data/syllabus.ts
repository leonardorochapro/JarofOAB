export interface Topic {
  id: string;
  title: string;
  read: string;
  trap: string;
  hack: string;
  action: string;
}

export interface Subject {
  id: string;
  number: string;
  name: string;
  shortName: string;
  questionsLabel: string;
  topics: Topic[];
}

export type EnergyLevel = 'low' | 'med' | 'high';

export const ENERGY_CONFIG: Record<
  EnergyLevel,
  { label: string; mins: number; desc: string }
> = {
  low: {
    label: 'Baixa · 15m',
    mins: 15,
    desc: 'Abra 1 tópico da matéria da fila, leia o truque de resolução e faça 3 questões da FGV.',
  },
  med: {
    label: 'Média · 25m',
    mins: 25,
    desc: 'Leia os artigos indicados, estude a pegadinha com o truque e resolva 5 questões.',
  },
  high: {
    label: 'Alta · 45m',
    mins: 45,
    desc: 'Complete o roteiro inteiro de 1 tópico: Lei Seca, Truque e 8 questões da banca.',
  },
};

export const SYLLABUS: Subject[] = [
  {
    id: 'etica',
    number: '01',
    name: 'Ética Profissional',
    shortName: 'Ética Profissional',
    questionsLabel: '8 questões na prova',
    topics: [
      {
        id: 'et1',
        title: 'Direitos e Prerrogativas do Advogado',
        read: 'Estatuto da OAB (Lei 8.906/94), Arts. 6º, 7º, 7º-A e 7º-B.',
        trap: 'A FGV afirma que o juiz pode decretar quebra da inviolabilidade do escritório de forma genérica ou que o advogado preso em flagrante por crime inafiançável vai direto para cela comum.',
        hack: 'Regra do "Escudo Absoluto": Em 95% das questões de Ética, a alternativa correta é a que PROTEGE mais o advogado. Nunca existe hierarquia entre juiz, promotor e advogado. Busca no escritório exige: indícios de autoria do PRÓPRIO advogado + mandado específico + representante da OAB presente.',
        action: 'Leia os Arts. 7º ao 7º-B grifando as exceções e resolva 5 questões recentes da FGV.',
      },
      {
        id: 'et2',
        title: 'Incompatibilidades e Impedimentos',
        read: 'Estatuto da OAB (Lei 8.906/94), Arts. 27, 28, 29 e 30.',
        trap: 'Misturar cargos que geram proibição total (incompatibilidade) com cargos que apenas proíbem advogar contra a Fazenda Pública que paga o salário (impedimento).',
        hack: 'Teste da "Caneta de Poder": Se o cargo tem poder de mando, polícia, julgamento ou chefia (Delegado, Juiz, Prefeito, Militar da ativa, Gerente de Banco) = INCOMPATÍVEL (zero advocacia). Se é servidor comum (professor de universidade pública, técnico) = IMPEDIDO (pode advogar, só não contra quem paga seu salário).',
        action: 'Aplique esse teste em 5 questões da FGV sobre incompatibilidades e impedimentos.',
      },
      {
        id: 'et3',
        title: 'Honorários Advocatícios',
        read: 'Estatuto da OAB, Arts. 22 a 26 + Código de Ética (CED), Arts. 48 a 54.',
        trap: 'Dizer que o advogado perde os honorários sucumbenciais se o cliente fizer acordo direto com a parte contrária, ou errar o prazo de prescrição para cobrar.',
        hack: 'Macete do "3 e 5": Pagamento sem contrato escrito segue a regra dos terços (1/3 no início, 1/3 na sentença de 1º grau, 1/3 no final). Todo prazo de prescrição envolvendo honorários (cobrança ou prestação de contas) é de 5 ANOS.',
        action: 'Leia os Arts. 22 a 25-A do Estatuto e resolva 4 questões da FGV.',
      },
      {
        id: 'et4',
        title: 'Infrações, Sanções e Processo Disciplinar',
        read: 'Estatuto da OAB, Arts. 34 a 43.',
        trap: 'Trocar Censura por Suspensão ou Exclusão na hora de aplicar a sanção para uma infração descrita no enunciado.',
        hack: 'Filtro do Dinheiro e Reincidência: Envolveu DINHEIRO do cliente ou reter processo para prejudicar alguém = SUSPENSÃO (30 dias a 12 meses, prorrogável até pagar/devolver). Tem "3 suspensões aplicadas", "crime infamante" ou "falsa prova para inscrição" = EXCLUSÃO. Todo o resto leve = CENSURA.',
        action: 'Leia os Arts. 34, 36, 37 e 38 e resolva 5 questões focadas na punição.',
      },
      {
        id: 'et5',
        title: 'Publicidade Profissional e Sociedade de Advogados',
        read: 'Estatuto da OAB, Arts. 15 a 17 + Código de Ética, Arts. 39 a 47-A.',
        trap: 'Achar que o advogado não pode usar redes sociais ou impulsionar postagens, ou que pode integrar duas sociedades no mesmo estado.',
        hack: 'Regra da Sobriedade: Redes sociais e impulsionamento são PERMITIDOS, desde que informativos e sem divulgar valores, consulta grátis ou promessa de causa ganha. Advogado NÃO pode integrar duas sociedades na mesma seccional (mas pode abrir sociedade unipessoal com 1 sócio).',
        action: 'Leia os Arts. 15 a 17 do Estatuto e faça 4 questões recentes da FGV.',
      },
    ],
  },
  {
    id: 'const',
    number: '02',
    name: 'Direito Constitucional',
    shortName: 'Constitucional',
    questionsLabel: '6 questões na prova',
    topics: [
      {
        id: 'co1',
        title: 'Direitos Fundamentais e Remédios Constitucionais',
        read: 'Constituição Federal, Art. 5º (incisos principais) + Art. 12 (Nacionalidade).',
        trap: 'Colocar Mandado de Segurança onde cabe Habeas Data, ou exigir advogado para Habeas Corpus e Ação Popular.',
        hack: 'Chave dos Remédios: Liberdade de ir e vir = HC (grátis, sem advogado). Dado PESSOAL seu em banco público = Habeas Data (exige negativa prévia na via administrativa!). Anular ato lesivo ao patrimônio público = Ação Popular (só CIDADÃO com título de eleitor). Direito líquido e certo com prova pronta = MS (120 dias).',
        action: 'Leia o Art. 5º (incisos LXVIII a LXXIII) e o Art. 12. Resolva 5 questões da FGV.',
      },
      {
        id: 'co2',
        title: 'Controle de Constitucionalidade (ADI, ADC, ADPF)',
        read: 'Constituição Federal, Arts. 102, I, "a" e 103 + Lei 9.868/99 (Arts. 1º a 12).',
        trap: 'Dizer que Lei Municipal pode ser objeto de ADI no STF, ou que Governador de Estado não precisa provar pertinência temática.',
        hack: 'Regra do "Lei Municipal = Só ADPF": ADI no STF nunca julga lei municipal nem lei anterior à Constituição de 1988 — nesses dois casos, a única saída é ADPF! Legitimados especiais (Governador, Mesa Estadual, Confederação/Entidade de Classe) têm que provar interesse direto (pertinência temática).',
        action: 'Leia o Art. 103 da CF e resolva 5 questões sobre legitimidade e objeto.',
      },
      {
        id: 'co3',
        title: 'Repartição de Competências (União, Estados, Municípios)',
        read: 'Constituição Federal, Arts. 21, 22, 23, 24 e 30.',
        trap: 'Inventar que Estado ou Município legislaram sobre Direito Civil, Penal, Trabalho, Trânsito ou Energia (privativos da União).',
        hack: 'Mnemônico "CAPACETE DE PM": Civil, Agrário, Penal, Aeronáutico, Comercial, Eleitoral, Trabalho, Espacial, Desapropriação, Energia, Processual, Marítimo = TUDO da União (Art. 22). Lei estadual sobre isso sem Lei Complementar delegando é INCONSTITUCIONAL.',
        action: 'Leia os Arts. 22, 24 e 30 da CF e resolva 4 questões da FGV.',
      },
      {
        id: 'co4',
        title: 'Processo Legislativo (Emendas e Medidas Provisórias)',
        read: 'Constituição Federal, Arts. 59 a 69.',
        trap: 'Dizer que o Presidente pode editar Medida Provisória sobre direito penal/processual ou que PEC precisa de sanção presidencial.',
        hack: 'Dois bloqueios imediatos: 1) PEC NÃO vai para sanção nem veto do Presidente (é promulgada pelas Mesas da Câmara e Senado). 2) Medida Provisória NUNCA pode tratar de Penal, Processo Penal, Processo Civil nem matéria de Lei Complementar (prazo: 60 + 60 dias).',
        action: 'Leia os Arts. 60 e 62 da CF e resolva 4 questões.',
      },
    ],
  },
  {
    id: 'civil',
    number: '03',
    name: 'Direito Civil',
    shortName: 'Direito Civil',
    questionsLabel: '6 questões na prova',
    topics: [
      {
        id: 'ci1',
        title: 'Parte Geral: Incapacidade, Prescrição e Defeitos do Negócio',
        read: 'Código Civil, Arts. 3º, 4º, 138 a 165 e 189 a 206.',
        trap: 'Confundir ato NULO com ANULÁVEL, ou achar que menor de 16 anos é relativamente incapaz.',
        hack: 'Régua da Idade e Validade: Abaixo de 16 anos = ÚNICO absolutamente incapaz (ato NULO, não prescreve). De 16 a 18 anos = relativamente incapaz (ato ANULÁVEL, prazo decadencial de 4 anos). Todos os defeitos do negócio (erro, dolo, coação, lesão, estado de perigo, fraude) geram ANULABILIDADE (4 anos).',
        action: 'Leia os Arts. 3º, 4º, 166 e 171 do CC e resolva 5 questões da FGV.',
      },
      {
        id: 'ci2',
        title: 'Responsabilidade Civil (Objetiva vs. Subjetiva)',
        read: 'Código Civil, Arts. 186, 187 e 927 a 943.',
        trap: 'Exigir prova de culpa de empresa por ato do funcionário, ou dizer que pais podem cobrar de volta do filho menor o que pagaram à vítima.',
        hack: 'Regra da Cadeia de Pagamento: Pais, tutores, curadores e empregadores respondem OBJETIVAMENTE (sem culpa). Pagou pela vítima? O empregador pode cobrar do empregado (ação regressiva), mas os PAIS NUNCA podem cobrar de volta do filho menor (Art. 934).',
        action: 'Leia os Arts. 927 a 934 do CC e resolva 4 questões da FGV.',
      },
      {
        id: 'ci3',
        title: 'Contratos em Espécie (Compra e Venda, Doação, Locação)',
        read: 'Código Civil, Arts. 481 a 504 e Arts. 538 a 554.',
        trap: 'Dizer que venda de pai para filho sem autorização dos irmãos é NULA, ou que doação de pai para filho precisa de autorização dos outros filhos.',
        hack: 'Contraste Venda vs. Doação em Família: VENDER para um filho sem consentimento dos outros = ANULÁVEL (Art. 496). DOAR para um filho sem consentimento dos outros = VÁLIDA (vale como adiantamento de herança - Art. 544).',
        action: 'Leia os Arts. 496 e 544 do CC e resolva 4 questões da FGV.',
      },
      {
        id: 'ci4',
        title: 'Direito das Coisas (Posse e Usucapião)',
        read: 'Código Civil, Arts. 1.196 a 1.224 e Arts. 1.238 a 1.242.',
        trap: 'Errar o tempo necessário para usucapião ou permitir usucapião de bem público.',
        hack: 'Escada dos Prazos (15 - 10 - 5 - 2): Extraordinária = 15 anos (10 com moradia/obras). Ordinária (justo título + boa-fé) = 10 anos (5 com moradia). Especial Urbana (até 250m²) ou Rural (até 50ha) = 5 anos. Abandono do lar (até 250m²) = 2 anos. Bem PÚBLICO nunca sofre usucapião.',
        action: 'Leia os Arts. 1.238 a 1.242 do CC e faça 4 questões sobre prazos.',
      },
      {
        id: 'ci5',
        title: 'Família e Sucessões (Regime de Bens e Herança)',
        read: 'Código Civil, Arts. 1.639 a 1.688 e Arts. 1.829 a 1.847.',
        trap: 'Dar ao cônjuge sobrevivente (na comunhão parcial) metade dos bens comprados no casamento + herança sobre esses mesmos bens.',
        hack: 'Regra do "Onde tem Meação, não tem Herança": Na Comunhão Parcial, o cônjuge já tem metade do que compraram juntos (meação). Na herança, ele só concorre nos BENS PARTICULARES do falecido. Se não houver bens particulares, os filhos ficam com 100% da herança.',
        action: 'Leia o Art. 1.829 do CC com atenção e resolva 5 questões da FGV.',
      },
    ],
  },
  {
    id: 'proc_civil',
    number: '04',
    name: 'Processo Civil',
    shortName: 'Processo Civil',
    questionsLabel: '6 questões na prova',
    topics: [
      {
        id: 'pc1',
        title: 'Tutelas Provisórias (Urgência e Evidência)',
        read: 'CPC, Arts. 294 a 311.',
        trap: 'Dizer que Tutela de Evidência exige urgência, ou que a estabilização da tutela antecipada faz coisa julgada.',
        hack: 'Diferença no Nome: Tutela de URGÊNCIA = exige probabilidade do direito + perigo de dano. Tutela de EVIDÊNCIA = NÃO precisa de urgência (basta prova documental/tese repetitiva). Tutela antecipada estabilizada pode ser revista em até 2 ANOS.',
        action: 'Leia os Arts. 300 a 311 do CPC e resolva 5 questões da FGV.',
      },
      {
        id: 'pc2',
        title: 'Procedimento Comum: Petição Inicial, Audiência e Contestação',
        read: 'CPC, Arts. 319 a 342.',
        trap: 'Achar que basta apenas uma das partes não querer audiência de conciliação para ela ser cancelada.',
        hack: 'Regra do "Veto Duplo": Para cancelar a audiência de conciliação/mediação, AMBOS têm que dizer que não querem (autor na inicial e réu até 10 dias antes da audiência). Se só um não quiser, a audiência acontece.',
        action: 'Leia os Arts. 334 e 335 do CPC e resolva 4 questões.',
      },
      {
        id: 'pc3',
        title: 'Recursos (Apelação, Agravo de Instrumento e Embargos)',
        read: 'CPC, Arts. 994 a 1.026.',
        trap: 'Mandar interpor Apelação contra decisão interlocutória ou errar o prazo de Embargos de Declaração.',
        hack: 'Bússola Recursal do CPC: Encerrou o processo (Sentença) = Apelação (15 dias úteis). Decisão no meio do processo (tutela, mérito, gratuidade) = Agravo de Instrumento (15 dias úteis). Decisão omissa/contraditória = Embargos de Declaração (ÚNICO com prazo de 5 dias úteis).',
        action: 'Leia o Art. 1.015 do CPC e resolva 5 questões.',
      },
      {
        id: 'pc4',
        title: 'Cumprimento de Sentença e Execução',
        read: 'CPC, Arts. 513 a 538.',
        trap: 'Dizer que o devedor precisa depositar o valor (garantir o juízo) para apresentar Impugnação ao Cumprimento de Sentença.',
        hack: 'Regra da Defesa Livre: No CPC atual, o executado NÃO precisa garantir o juízo para apresentar Impugnação ou Embargos à Execução. A garantia só é exigida se ele quiser pedir EFEITO SUSPENSIVO.',
        action: 'Leia os Arts. 523 a 525 do CPC e faça 4 questões.',
      },
    ],
  },
  {
    id: 'penal',
    number: '05',
    name: 'Direito Penal',
    shortName: 'Direito Penal',
    questionsLabel: '6 questões na prova',
    topics: [
      {
        id: 'pe1',
        title: 'Teoria do Crime (Erro de Tipo, Erro de Proibição e Excludentes)',
        read: 'Código Penal, Arts. 13 a 25.',
        trap: 'Trocar as consequências do Erro de Tipo com as do Erro de Proibição.',
        hack: 'Macete da "Realidade vs. Lei": Errou sobre a REALIDADE fática (pegou objeto alheio achando ser seu) = Erro de Tipo (exclui sempre o DOLO). Sabia o que fazia, mas achou que a LEI permitia = Erro de Proibição (exclui a CULPABILIDADE se inevitável).',
        action: 'Leia os Arts. 20 a 25 do CP e resolva 5 questões da FGV.',
      },
      {
        id: 'pe2',
        title: 'Aplicação da Pena, Concurso de Crimes e Prescrição',
        read: 'Código Penal, Arts. 59 a 76 e Arts. 107 a 119.',
        trap: 'Permitir que o juiz reduza a pena abaixo do mínimo legal na 2ª fase (por confissão ou menoridade).',
        hack: 'Trava das 3 Fases (Súmula 231 STJ): Na 1ª fase (judiciais) e na 2ª fase (agravantes/atenuantes), a pena NUNCA sai do mínimo e máximo legais. Só na 3ª fase (aumento/diminuição, como tentativa) a pena pode furar o piso ou teto.',
        action: 'Leia os Arts. 68 a 71 do CP e resolva 4 questões.',
      },
      {
        id: 'pe3',
        title: 'Crimes contra o Patrimônio (Furto, Roubo, Extorsão, Estelionato)',
        read: 'Código Penal, Arts. 155 a 171.',
        trap: 'Confundir Estelionato com Furto mediante fraude, ou Roubo com Extorsão.',
        hack: 'Teste da "Entrega Voluntária": Vítima entregou o bem enganada por mentira = ESTELIONATO. Criminoso usou fraude para distrair e ele mesmo pegou = FURTO MEDIANTE FRAUDE. Na violência: ladrão pegou sozinho = ROUBO; vítima teve que agir (digitar senha/Pix) = EXTORSÃO.',
        action: 'Leia os Arts. 155, 157, 158 e 171 do CP e resolva 5 questões.',
      },
      {
        id: 'pe4',
        title: 'Crimes contra a Administração Pública',
        read: 'Código Penal, Arts. 312 a 333.',
        trap: 'Confundir Concussão com Corrupção Passiva, ou achar que particular que cede à exigência comete crime.',
        hack: 'Verbo-Chave: Funcionário EXIGIU vantagem = CONCUSSÃO (Art. 316). Funcionário SOLICITOU ou RECEBEU = CORRUPÇÃO PASSIVA (Art. 317). Particular OFERECEU ou PROMETEU = CORRUPÇÃO ATIVA (Art. 333 — particular que só paga o que foi exigido não comete crime!).',
        action: 'Leia os Arts. 312, 316, 317 e 333 do CP e faça 4 questões.',
      },
    ],
  },
  {
    id: 'proc_penal',
    number: '06',
    name: 'Processo Penal',
    shortName: 'Processo Penal',
    questionsLabel: '6 questões na prova',
    topics: [
      {
        id: 'pp1',
        title: 'Inquérito Policial e Ação Penal',
        read: 'CPP, Arts. 4º a 23 e Arts. 24 a 62.',
        trap: 'Dizer que o Delegado pode arquivar o inquérito, ou que o MP pode desistir da ação penal pública.',
        hack: 'Regra da "Indisponibilidade": Nem o Delegado pode arquivar inquérito (Art. 17), nem o MP pode desistir da ação penal iniciada (Art. 42). Já na ação penal PRIVADA, o querelante pode perdoar ou desistir antes do trânsito em julgado.',
        action: 'Leia os Arts. 17, 38 e 42 do CPP e resolva 4 questões.',
      },
      {
        id: 'pp2',
        title: 'Prisões (Flagrante, Preventiva, Temporária) e Audiência de Custódia',
        read: 'CPP, Arts. 301 a 320 + Lei 7.960/89 (Prisão Temporária).',
        trap: 'Permitir que o juiz decrete prisão preventiva de ofício ou em crime culposo.',
        hack: 'Bloqueio do Juiz Passivo: No Processo Penal atual, o juiz NUNCA decreta prisão preventiva de ofício (precisa de pedido do MP, querelante, assistente ou delegado). Só cabe em crimes DOLOSOS com pena máxima superior a 4 anos (salvo reincidência ou violência doméstica).',
        action: 'Leia os Arts. 311 a 313 do CPP e resolva 5 questões.',
      },
      {
        id: 'pp3',
        title: 'Provas e Procedimento do Tribunal do Júri',
        read: 'CPP, Arts. 155 a 158-F e Arts. 406 a 421.',
        trap: 'Trocar o recurso cabível contra Pronúncia e Impronúncia no Tribunal do Júri.',
        hack: 'Macete do "Continua vs. Acaba": Na 1ª fase do Júri, se o juiz mandou a Júri (Pronúncia) ou mandou para outro juiz (Desclassificação), o processo CONTINUA = cabe RESE (5 dias). Se encerrou o processo ali (Impronúncia ou Absolvição Sumária), ACABOU = cabe APELAÇÃO (5 dias).',
        action: 'Leia os Arts. 413 a 416 do CPP e resolva 4 questões.',
      },
      {
        id: 'pp4',
        title: 'Recursos Criminais (RESE, Apelação e Embargos)',
        read: 'CPP, Arts. 581 a 600.',
        trap: 'Usar os prazos do Processo Civil (15 dias) no Processo Penal.',
        hack: 'Tabela de Prazos Criminais (5 - 2): No Processo Penal não existe prazo de 15 dias! Quase tudo se interpõe em 5 DIAS (Apelação: 5 + 8 razões; RESE: 5 + 2 razões). Exceção: Embargos de Declaração = 2 DIAS (e 5 dias no JECRIM).',
        action: 'Leia o Art. 581 do CPP e resolva 5 questões sobre prazos e recursos.',
      },
    ],
  },
];
