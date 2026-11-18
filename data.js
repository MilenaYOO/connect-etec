/**
 * CAMPUS — Painel Digital Escolar
 * Banco de Dados Demonstrativo Inicial (Mock Data Realista)
 * Projeto: tec_projeto_cronograma_escolar
 * Equipe: Milena Bispo, Talita Gonçalves e Ebert Torquato
 */

const CAMPUS_INITIAL_DATA = {
  // Contas de Usuários Institucionais para Demonstração Acadêmica
  usuarios: [
    {
      id: "usr-aluno-01",
      email: "aluno@etec.sp.gov.br",
      // Em produção real, senhas nunca ficam em texto puro (usam hash bcrypt/argon2 no servidor)
      senha: "aluno123",
      nome: "Gabriel Silva",
      role: "aluno",
      turmaId: "2DS",
      turmaNome: "2º M-Tec Desenvolvimento de Sistemas",
      rm: "2026-0214",
      periodo: "Manhã",
      avatar: "GS",
      bio: "Estudante apaixonado por frontend, acessibilidade e design de interfaces."
    },
    {
      id: "usr-aluno-02",
      email: "mariana@etec.sp.gov.br",
      senha: "aluno123",
      nome: "Mariana Souza",
      role: "aluno",
      turmaId: "1DS",
      turmaNome: "1º M-Tec Desenvolvimento de Sistemas",
      rm: "2026-0108",
      periodo: "Manhã",
      avatar: "MS",
      bio: "Estudante do primeiro ano explorando lógica de programação e arquitetura de computadores."
    },
    {
      id: "usr-prof-01",
      email: "professor@etec.sp.gov.br",
      senha: "prof123",
      nome: "Prof. Fernando Santos",
      role: "professor",
      matricula: "DOC-2026-904",
      disciplinas: [
        "Desenvolvimento de Sistemas",
        "Programação Web I",
        "Programação Mobile I"
      ],
      turmas: ["1DS", "2DS", "3DS"],
      avatar: "FS",
      bio: "Docente da área de computação com foco em engenharia de software e desenvolvimento web moderno."
    },
    {
      id: "usr-prof-02",
      email: "juliana@etec.sp.gov.br",
      senha: "prof123",
      nome: "Profª. Juliana Martins",
      role: "professor",
      matricula: "DOC-2026-812",
      disciplinas: [
        "Banco de Dados I",
        "Banco de Dados II",
        "Qualidade e Testes de Software"
      ],
      turmas: ["1DS", "2DS", "3DS"],
      avatar: "JM",
      bio: "Especialista em bancos de dados relacionais, SQL e auditoria de sistemas de informação."
    }
  ],

  turmas: [
    { id: "1DS", nome: "1º M-Tec Desenvolvimento de Sistemas", sigla: "1º DS", periodo: "Manhã", totalAlunos: 38 },
    { id: "2DS", nome: "2º M-Tec Desenvolvimento de Sistemas", sigla: "2º DS", periodo: "Manhã", totalAlunos: 36 },
    { id: "3DS", nome: "3º M-Tec Desenvolvimento de Sistemas", sigla: "3º DS", periodo: "Manhã", totalAlunos: 34 }
  ],

  diasSemana: [
    { id: "segunda", nome: "Segunda-feira", curto: "Seg", index: 1 },
    { id: "terca", nome: "Terça-feira", curto: "Ter", index: 2 },
    { id: "quarta", nome: "Quarta-feira", curto: "Qua", index: 3 },
    { id: "quinta", nome: "Quinta-feira", curto: "Qui", index: 4 },
    { id: "sexta", nome: "Sexta-feira", curto: "Sex", index: 5 }
  ],

  // Grade Horária com Intervalos e Status (RN01, RN02)
  horarios: [
    // --- 1º DS ---
    { id: "h101", classId: "1DS", dia: "segunda", inicio: "07:30", fim: "08:20", subject: "Lógica de Programação", teacher: "Prof. Carlos Eduardo", room: "Lab Info 01", status: "regular" },
    { id: "h102", classId: "1DS", dia: "segunda", inicio: "08:20", fim: "09:10", subject: "Lógica de Programação", teacher: "Prof. Carlos Eduardo", room: "Lab Info 01", status: "regular" },
    { id: "h103", classId: "1DS", dia: "segunda", inicio: "09:10", fim: "09:30", subject: "Intervalo Escolar", teacher: "Coordenação", room: "Pátio / Convivência", isBreak: true },
    { id: "h104", classId: "1DS", dia: "segunda", inicio: "09:30", fim: "10:20", subject: "Matemática Aplicada", teacher: "Profª. Regina Souza", room: "Sala 04", status: "regular" },
    { id: "h105", classId: "1DS", dia: "segunda", inicio: "10:20", fim: "11:10", subject: "Fundamentos de Informática", teacher: "Prof. Marcos Lima", room: "Lab Info 02", status: "regular" },
    { id: "h106", classId: "1DS", dia: "segunda", inicio: "11:10", fim: "12:00", subject: "Fundamentos de Informática", teacher: "Prof. Marcos Lima", room: "Lab Info 02", status: "regular" },

    { id: "h107", classId: "1DS", dia: "terca", inicio: "07:30", fim: "09:10", subject: "Design Digital e Interfaces", teacher: "Profª. Fernanda Prado", room: "Lab Multimídia", status: "regular" },
    { id: "h108", classId: "1DS", dia: "terca", inicio: "09:10", fim: "09:30", subject: "Intervalo Escolar", teacher: "Coordenação", room: "Pátio", isBreak: true },
    { id: "h109", classId: "1DS", dia: "terca", inicio: "09:30", fim: "11:10", subject: "Língua Portuguesa & Comunicação", teacher: "Profª. Patrícia Bueno", room: "Sala 04", status: "regular" },
    { id: "h110", classId: "1DS", dia: "terca", inicio: "11:10", fim: "12:00", subject: "Inglês Instrumental", teacher: "Prof. Roberto Mendes", room: "Sala 04", status: "regular" },

    { id: "h111", classId: "1DS", dia: "quarta", inicio: "07:30", fim: "09:10", subject: "Técnicas de Algoritmos", teacher: "Prof. Carlos Eduardo", room: "Lab Info 01", status: "regular" },
    { id: "h112", classId: "1DS", dia: "quarta", inicio: "09:10", fim: "09:30", subject: "Intervalo Escolar", teacher: "Coordenação", room: "Pátio", isBreak: true },
    { id: "h113", classId: "1DS", dia: "quarta", inicio: "09:30", fim: "11:10", subject: "Ética e Cidadania Organizacional", teacher: "Profª. Laura Meirelles", room: "Sala 04", status: "regular" },
    { id: "h114", classId: "1DS", dia: "quarta", inicio: "11:10", fim: "12:00", subject: "Educação Física", teacher: "Prof. Sandro Alves", room: "Quadra Poliesportiva", status: "regular" },

    { id: "h115", classId: "1DS", dia: "quinta", inicio: "07:30", fim: "09:10", subject: "Banco de Dados I (Modelagem Conceitual)", teacher: "Profª. Juliana Martins", room: "Lab Info 03", status: "regular" },
    { id: "h116", classId: "1DS", dia: "quinta", inicio: "09:10", fim: "09:30", subject: "Intervalo Escolar", teacher: "Coordenação", room: "Pátio", isBreak: true },
    { id: "h117", classId: "1DS", dia: "quinta", inicio: "09:30", fim: "11:10", subject: "Física Aplicada à Computação", teacher: "Prof. Wilson Ramos", room: "Sala 04", status: "alterada", note: "Substituição confirmada pela coordenação" },
    { id: "h118", classId: "1DS", dia: "quinta", inicio: "11:10", fim: "12:00", subject: "História das Tecnologias", teacher: "Profª. Renata Castro", room: "Sala 04", status: "regular" },

    { id: "h119", classId: "1DS", dia: "sexta", inicio: "07:30", fim: "09:10", subject: "Lógica de Programação (Laboratório)", teacher: "Prof. Carlos Eduardo", room: "Lab Info 01", status: "regular" },
    { id: "h120", classId: "1DS", dia: "sexta", inicio: "09:10", fim: "09:30", subject: "Intervalo Escolar", teacher: "Coordenação", room: "Pátio", isBreak: true },
    { id: "h121", classId: "1DS", dia: "sexta", inicio: "09:30", fim: "11:10", subject: "Química e Meio Ambiente", teacher: "Profª. Andréa Silva", room: "Laboratório de Ciências", status: "regular" },
    { id: "h122", classId: "1DS", dia: "sexta", inicio: "11:10", fim: "12:00", subject: "Análise de Processos de Negócio", teacher: "Prof. Marcos Lima", room: "Sala 04", status: "regular" },

    // --- 2º DS ---
    { id: "h201", classId: "2DS", dia: "segunda", inicio: "07:30", fim: "09:10", subject: "Desenvolvimento de Sistemas (DS)", teacher: "Prof. Fernando Santos", room: "Lab Info 02", status: "regular" },
    { id: "h202", classId: "2DS", dia: "segunda", inicio: "09:10", fim: "09:30", subject: "Intervalo Escolar", teacher: "Coordenação", room: "Pátio Central", isBreak: true },
    { id: "h203", classId: "2DS", dia: "segunda", inicio: "09:30", fim: "11:10", subject: "Banco de Dados II (Consultas SQL)", teacher: "Profª. Juliana Martins", room: "Lab Info 03", status: "regular" },
    { id: "h204", classId: "2DS", dia: "segunda", inicio: "11:10", fim: "12:00", subject: "Sociologia e Cultura Digital", teacher: "Prof. Marcos Ramos", room: "Sala 06", status: "regular" },

    { id: "h205", classId: "2DS", dia: "terca", inicio: "07:30", fim: "09:10", subject: "Programação Web I (Frontend Moderno)", teacher: "Prof. Fernando Santos", room: "Lab Info 01", status: "regular" },
    { id: "h206", classId: "2DS", dia: "terca", inicio: "09:10", fim: "09:30", subject: "Intervalo Escolar", teacher: "Coordenação", room: "Pátio Central", isBreak: true },
    { id: "h207", classId: "2DS", dia: "terca", inicio: "09:30", fim: "11:10", subject: "Redes de Computadores e Protocolos", teacher: "Prof. Sérgio Nogueira", room: "Lab Redes", status: "regular" },
    { id: "h208", classId: "2DS", dia: "terca", inicio: "11:10", fim: "12:00", subject: "Geografia e Espaço Urbano", teacher: "Profª. Cecília Morais", room: "Sala 06", status: "regular" },

    { id: "h209", classId: "2DS", dia: "quarta", inicio: "07:30", fim: "09:10", subject: "Engenharia de Software & Metodologias Ágeis", teacher: "Profª. Talita Gonçalves", room: "Sala 06", status: "regular" },
    { id: "h210", classId: "2DS", dia: "quarta", inicio: "09:10", fim: "09:30", subject: "Intervalo Escolar", teacher: "Coordenação", room: "Pátio Central", isBreak: true },
    { id: "h211", classId: "2DS", dia: "quarta", inicio: "09:30", fim: "11:10", subject: "Programação Mobile I (UI & UX)", teacher: "Prof. Fernando Santos", room: "Lab Info 02", status: "regular" },
    { id: "h212", classId: "2DS", dia: "quarta", inicio: "11:10", fim: "12:00", subject: "Biologia Aplicada", teacher: "Profª. Luciana Mendes", room: "Sala 06", status: "regular" },

    { id: "h213", classId: "2DS", dia: "quinta", inicio: "07:30", fim: "09:10", subject: "Programação Web I (Oficina Prática)", teacher: "Prof. Fernando Santos", room: "Lab Info 01", status: "regular" },
    { id: "h214", classId: "2DS", dia: "quinta", inicio: "09:10", fim: "09:30", subject: "Intervalo Escolar", teacher: "Coordenação", room: "Pátio Central", isBreak: true },
    { id: "h215", classId: "2DS", dia: "quinta", inicio: "09:30", fim: "11:10", subject: "Matemática Aplicada II", teacher: "Profª. Regina Souza", room: "Sala 06", status: "regular" },
    { id: "h216", classId: "2DS", dia: "quinta", inicio: "11:10", fim: "12:00", subject: "Filosofia da Ciência e Tecnologia", teacher: "Prof. Arthur Paes", room: "Sala 06", status: "regular" },

    { id: "h217", classId: "2DS", dia: "sexta", inicio: "07:30", fim: "09:10", subject: "Sistemas Embarcados e Internet das Coisas", teacher: "Prof. Henrique Dias", room: "Lab Maker", status: "regular" },
    { id: "h218", classId: "2DS", dia: "sexta", inicio: "09:10", fim: "09:30", subject: "Intervalo Escolar", teacher: "Coordenação", room: "Pátio Central", isBreak: true },
    { id: "h219", classId: "2DS", dia: "sexta", inicio: "09:30", fim: "11:10", subject: "Língua Portuguesa II", teacher: "Profª. Patrícia Bueno", room: "Sala 06", status: "alterada", note: "Estudo dirigido no laboratório de apoio" },
    { id: "h220", classId: "2DS", dia: "sexta", inicio: "11:10", fim: "12:00", subject: "Educação Física", teacher: "Prof. Sandro Alves", room: "Quadra Poliesportiva", status: "regular" },

    // --- 3º DS ---
    { id: "h301", classId: "3DS", dia: "segunda", inicio: "07:30", fim: "09:10", subject: "Trabalho de Conclusão de Curso (TCC)", teacher: "Profª. Milena Bispo", room: "Lab Info 04", status: "regular" },
    { id: "h302", classId: "3DS", dia: "segunda", inicio: "09:10", fim: "09:30", subject: "Intervalo Escolar", teacher: "Coordenação", room: "Pátio", isBreak: true },
    { id: "h303", classId: "3DS", dia: "segunda", inicio: "09:30", fim: "11:10", subject: "Segurança da Informação e LGPD", teacher: "Prof. Sérgio Nogueira", room: "Lab Redes", status: "regular" },
    { id: "h304", classId: "3DS", dia: "segunda", inicio: "11:10", fim: "12:00", subject: "Empreendedorismo Tecnológico", teacher: "Prof. Guilherme Prado", room: "Sala 08", status: "regular" },

    { id: "h305", classId: "3DS", dia: "terca", inicio: "07:30", fim: "09:10", subject: "Programação Web III (Fullstack & APIs)", teacher: "Prof. Fernando Santos", room: "Lab Info 01", status: "regular" },
    { id: "h306", classId: "3DS", dia: "terca", inicio: "09:10", fim: "09:30", subject: "Intervalo Escolar", teacher: "Coordenação", room: "Pátio", isBreak: true },
    { id: "h307", classId: "3DS", dia: "terca", inicio: "09:30", fim: "11:10", subject: "Qualidade e Testes de Software", teacher: "Profª. Juliana Martins", room: "Lab Info 03", status: "regular" },
    { id: "h308", classId: "3DS", dia: "terca", inicio: "11:10", fim: "12:00", subject: "Inglês para Negócios de TI", teacher: "Prof. Roberto Mendes", room: "Sala 08", status: "regular" },

    { id: "h309", classId: "3DS", dia: "quarta", inicio: "07:30", fim: "09:10", subject: "Desenvolvimento Mobile II", teacher: "Prof. Fernando Santos", room: "Lab Info 02", status: "regular" },
    { id: "h310", classId: "3DS", dia: "quarta", inicio: "09:10", fim: "09:30", subject: "Intervalo Escolar", teacher: "Coordenação", room: "Pátio", isBreak: true },
    { id: "h311", classId: "3DS", dia: "quarta", inicio: "09:30", fim: "11:10", subject: "Gestão Ágil e Práticas DevOps", teacher: "Prof. Marcos Lima", room: "Lab Info 04", status: "regular" },
    { id: "h312", classId: "3DS", dia: "quarta", inicio: "11:10", fim: "12:00", subject: "Legislação e Ética Digital", teacher: "Profª. Laura Meirelles", room: "Sala 08", status: "regular" },

    { id: "h313", classId: "3DS", dia: "quinta", inicio: "07:30", fim: "10:20", subject: "Oficina e Mentoria de TCC", teacher: "Profª. Milena Bispo", room: "Lab Info 04", status: "regular" },
    { id: "h314", classId: "3DS", dia: "quinta", inicio: "10:20", fim: "12:00", subject: "Computação em Nuvem e Arquitetura", teacher: "Prof. Henrique Dias", room: "Lab Info 03", status: "regular" },

    { id: "h315", classId: "3DS", dia: "sexta", inicio: "07:30", fim: "09:10", subject: "Inteligência Artificial Aplicada", teacher: "Prof. Carlos Eduardo", room: "Lab Info 01", status: "regular" },
    { id: "h316", classId: "3DS", dia: "sexta", inicio: "09:10", fim: "09:30", subject: "Intervalo Escolar", teacher: "Coordenação", room: "Pátio", isBreak: true },
    { id: "h317", classId: "3DS", dia: "sexta", inicio: "09:30", fim: "11:10", subject: "Banca Preparatória de Apresentação", teacher: "Equipe Docente DS", room: "Auditório", status: "regular" },
    { id: "h318", classId: "3DS", dia: "sexta", inicio: "11:10", fim: "12:00", subject: "Carreiras e Mercado de Tecnologia", teacher: "Prof. Guilherme Prado", room: "Auditório", status: "regular" }
  ],

  // Tarefas e Trabalhos Acadêmicos (Seção 6)
  tarefas: [
    {
      id: "task-001",
      title: "Desenvolvimento do Wireframe e PRD do Painel",
      description: "Construir documentação completa de requisitos e protótipo de alta fidelidade com paleta dark purple.",
      subject: "Desenvolvimento de Sistemas",
      teacher: "Prof. Fernando Santos",
      classId: "2DS",
      publishedAt: "2026-10-22",
      dueDate: "2026-11-04",
      priority: "high", // high, medium, low
      status: "pending" // pending, completed
    },
    {
      id: "task-002",
      title: "Consultas Complexas com Agrupamento e JOINs em SQL",
      description: "Elaborar scripts em PostgreSQL simulando relatórios gerenciais e índices de otimização.",
      subject: "Banco de Dados II",
      teacher: "Profª. Juliana Martins",
      classId: "2DS",
      publishedAt: "2026-10-24",
      dueDate: "2026-11-09",
      priority: "medium",
      status: "pending"
    },
    {
      id: "task-003",
      title: "Lista de Algoritmos: Estruturas Condicionais e Laços",
      description: "Implementação de 10 exercícios em JavaScript com testes de mesa documentados no GitHub.",
      subject: "Lógica de Programação",
      teacher: "Prof. Carlos Eduardo",
      classId: "1DS",
      publishedAt: "2026-10-18",
      dueDate: "2026-10-31",
      priority: "medium",
      status: "completed"
    },
    {
      id: "task-004",
      title: "Guia de Acessibilidade WCAG 2.2 e Heurísticas de Nielsen",
      description: "Produção de relatório comparativo avaliando conformidade AA em interfaces governamentais.",
      subject: "Design Digital e Interfaces",
      teacher: "Profª. Fernanda Prado",
      classId: "1DS",
      publishedAt: "2026-10-25",
      dueDate: "2026-11-06",
      priority: "low",
      status: "pending"
    },
    {
      id: "task-005",
      title: "Capítulo de Metodologia e Modelagem UML do TCC",
      description: "Entrega do diagrama de classes, casos de uso e especificação técnica em conformidade com a ABNT.",
      subject: "Trabalho de Conclusão de Curso (TCC)",
      teacher: "Profª. Milena Bispo",
      classId: "3DS",
      publishedAt: "2026-10-20",
      dueDate: "2026-11-12",
      priority: "high",
      status: "pending"
    },
    {
      id: "task-006",
      title: "Estudo de Caso: Análise de Risco e Adequação à LGPD",
      description: "Identificar vulnerabilidades em formulários de coleta de dados pessoais e propor mitigações técnicas.",
      subject: "Segurança da Informação e LGPD",
      teacher: "Prof. Sérgio Nogueira",
      classId: "3DS",
      publishedAt: "2026-10-15",
      dueDate: "2026-10-28", // Data passada para demonstrar cálculo automático de 'atrasada'
      priority: "high",
      status: "pending"
    }
  ],

  // Avaliações, Provas e Bancas (Seção 7)
  avaliacoes: [
    {
      id: "eval-001",
      title: "Avaliação Prática no Laboratório: DDL e DML",
      subject: "Banco de Dados II",
      teacher: "Profª. Juliana Martins",
      classId: "2DS",
      date: "2026-11-10",
      time: "07:30 - 09:10",
      description: "Criação de esquema de banco de dados, chaves estrangeiras, restrições e consultas avançadas.",
      format: "Prática em Laboratório",
      status: "agendada"
    },
    {
      id: "eval-002",
      title: "Apresentação Intermediária dos Projetos de DS",
      subject: "Desenvolvimento de Sistemas",
      teacher: "Prof. Fernando Santos",
      classId: "2DS",
      date: "2026-11-17",
      time: "09:30 - 11:10",
      description: "Demonstração ao vivo dos módulos de frontend e documentação arquitetural perante a turma.",
      format: "Apresentação Técnica",
      status: "agendada"
    },
    {
      id: "eval-003",
      title: "Prova Teórica e Prática de Algoritmos",
      subject: "Lógica de Programação",
      teacher: "Prof. Carlos Eduardo",
      classId: "1DS",
      date: "2026-11-06",
      time: "07:30 - 09:10",
      description: "Resolução de problemas envolvendo vetores, matrizes e modularização de código.",
      format: "Prova Individual",
      status: "agendada"
    },
    {
      id: "eval-004",
      title: "Banca Qualificatória de TCC — Fase 2",
      subject: "Trabalho de Conclusão de Curso (TCC)",
      teacher: "Profª. Milena Bispo",
      classId: "3DS",
      date: "2026-11-20",
      time: "08:00 - 11:30",
      description: "Arguição dos professores convidados sobre o protótipo funcional e relevância acadêmica.",
      format: "Banca Avaliadora",
      status: "agendada"
    }
  ],

  // Mural de Comunicados Oficiais e Avisos (Seção 8)
  comunicados: [
    {
      id: "comm-001",
      title: "Inscrições Oficiais para a FETEPS 2026",
      content: "Estão abertas as inscrições de projetos para a Feira Tecnológica do Centro Paula Souza. Alunos de DS interessados em submeter protótipos devem procurar o orientador até o dia 10 de novembro.",
      category: "Evento",
      publishedAt: "2026-10-28",
      target: "Todas",
      author: "Coordenação Pedagógica",
      priority: "Alta",
      confirmedByCoordination: true
    },
    {
      id: "comm-002",
      title: "Manutenção Preventiva dos Servidores de Laboratório",
      content: "Nesta sexta-feira a partir das 18h, haverá manutenção nos servidores do Lab 01 e Lab 02. Solicitamos que todos os projetos sejam sincronizados em seus respectivos repositórios remotos no GitHub.",
      category: "Urgente",
      publishedAt: "2026-10-29",
      target: "Todas",
      author: "Núcleo de Infraestrutura de TI",
      priority: "Alta",
      confirmedByCoordination: true
    },
    {
      id: "comm-003",
      title: "Ausência Docente Confirmada — Língua Portuguesa II",
      content: "A coordenação comunica que a Profª. Patrícia Bueno estará em participação de bancas externas nesta sexta-feira. A turma cumprirá atividade de estudo dirigido supervisionado no laboratório.",
      category: "Ausência de professor",
      publishedAt: "2026-10-29",
      target: "2DS",
      author: "Coordenação de Curso",
      priority: "Média",
      confirmedByCoordination: true
    },
    {
      id: "comm-004",
      title: "Abertura de Vagas para Monitoria em Programação Web",
      content: "Estudantes do 2º e 3º termo interessados em atuar como monitores acadêmicos de frontend podem se inscrever na secretaria do curso. Requisito: bom desempenho e disponibilidade de 4 horas semanais.",
      category: "Acadêmico",
      publishedAt: "2026-10-26",
      target: "Todas",
      author: "Prof. Fernando Santos",
      priority: "Normal",
      confirmedByCoordination: true
    }
  ],

  // Agenda de Eventos Escolares (Seção 9)
  eventos: [
    {
      id: "evt-001",
      title: "Workshop: Arquitetura de Microsserviços e Cloud Native",
      date: "2026-11-05",
      time: "10:20 - 12:00",
      location: "Auditório Principal",
      description: "Palestra com engenheiro de software convidado sobre microsserviços em produção, Docker e orquestração.",
      category: "Palestra Técnica",
      classes: "2DS, 3DS",
      status: "Confirmado"
    },
    {
      id: "evt-002",
      title: "Hackathon Interno de Soluções Educacionais",
      date: "2026-11-14",
      time: "08:00 - 16:30",
      location: "Labs de Informática 01 e 02",
      description: "Maratona de programação para desenvolver ferramentas que facilitem a rotina dos estudantes e docentes.",
      category: "Competição Acadêmica",
      classes: "Todas",
      status: "Inscrições Abertas"
    },
    {
      id: "evt-003",
      title: "Visita Técnica ao Centro de Operações Tecnológicas",
      date: "2026-11-25",
      time: "07:30 - 14:00",
      location: "Parque Tecnológico Regional",
      description: "Visita guiada ao data center e ambientes de desenvolvimento de software de alta escala.",
      category: "Visita Técnica",
      classes: "3DS",
      status: "Confirmado"
    }
  ]
};
