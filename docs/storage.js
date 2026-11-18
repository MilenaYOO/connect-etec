/**
 * CAMPUS — Painel Digital Escolar
 * Camada de Armazenamento Local, Sessão e Autenticação
 * Projeto: tec_projeto_cronograma_escolar
 * Equipe: Milena Bispo, Talita Gonçalves e Ebert Torquato
 */

const CAMPUS_STORAGE_KEYS = {
  SESSION: "campus_auth_session_v3",
  USUARIOS: "campus_store_usuarios_v3",
  TURMAS: "campus_store_turmas_v3",
  HORARIOS: "campus_store_horarios_v3",
  TAREFAS: "campus_store_tarefas_v3",
  AVALIACOES: "campus_store_avaliacoes_v3",
  COMUNICADOS: "campus_store_comunicados_v3",
  EVENTOS: "campus_store_eventos_v3"
};

const CampusStorage = {
  /**
   * Inicializa o armazenamento com os dados padrão se não existirem
   */
  init() {
    try {
      if (!localStorage.getItem(CAMPUS_STORAGE_KEYS.USUARIOS)) {
        this.set(CAMPUS_STORAGE_KEYS.USUARIOS, CAMPUS_INITIAL_DATA.usuarios);
      }
      if (!localStorage.getItem(CAMPUS_STORAGE_KEYS.HORARIOS)) {
        this.set(CAMPUS_STORAGE_KEYS.HORARIOS, CAMPUS_INITIAL_DATA.horarios);
      }
      if (!localStorage.getItem(CAMPUS_STORAGE_KEYS.TURMAS)) {
        this.set(CAMPUS_STORAGE_KEYS.TURMAS, CAMPUS_INITIAL_DATA.turmas);
      }
      if (!localStorage.getItem(CAMPUS_STORAGE_KEYS.TAREFAS)) {
        this.set(CAMPUS_STORAGE_KEYS.TAREFAS, CAMPUS_INITIAL_DATA.tarefas);
      }
      if (!localStorage.getItem(CAMPUS_STORAGE_KEYS.AVALIACOES)) {
        this.set(CAMPUS_STORAGE_KEYS.AVALIACOES, CAMPUS_INITIAL_DATA.avaliacoes);
      }
      if (!localStorage.getItem(CAMPUS_STORAGE_KEYS.COMUNICADOS)) {
        this.set(CAMPUS_STORAGE_KEYS.COMUNICADOS, CAMPUS_INITIAL_DATA.comunicados);
      }
      if (!localStorage.getItem(CAMPUS_STORAGE_KEYS.EVENTOS)) {
        this.set(CAMPUS_STORAGE_KEYS.EVENTOS, CAMPUS_INITIAL_DATA.eventos);
      }
      return true;
    } catch (error) {
      console.warn("CampusStorage: LocalStorage inacessível. Operando em modo restrito.", error);
      return false;
    }
  },

  get(key, fallback = null) {
    try {
      const item = localStorage.getItem(key);
      if (item === null || item === undefined) return fallback;
      return JSON.parse(item);
    } catch (e) {
      console.error(`CampusStorage: Erro ao ler chave ${key}:`, e);
      return fallback;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error(`CampusStorage: Falha ao salvar chave ${key}:`, e);
      return false;
    }
  },

  // ========================================================================
  // GERENCIAMENTO DE SESSÃO & AUTENTICAÇÃO
  // ========================================================================

  getSession() {
    return this.get(CAMPUS_STORAGE_KEYS.SESSION, null);
  },

  setSession(user) {
    // Sanitiza objeto de sessão removendo a senha por segurança
    const sessionData = { ...user };
    delete sessionData.senha;
    sessionData.authenticatedAt = new Date().toISOString();
    return this.set(CAMPUS_STORAGE_KEYS.SESSION, sessionData);
  },

  clearSession() {
    try {
      localStorage.removeItem(CAMPUS_STORAGE_KEYS.SESSION);
      return true;
    } catch (e) {
      console.error("CampusStorage: Erro ao limpar sessão:", e);
      return false;
    }
  },

  /**
   * Valida credenciais contra os registros de usuários.
   * Não permite que o usuário escolha o perfil na tela: o perfil é derivado da conta.
   */
  authenticate(emailOrUser, password) {
    const usuarios = this.get(CAMPUS_STORAGE_KEYS.USUARIOS, CAMPUS_INITIAL_DATA.usuarios);
    const cleanLogin = emailOrUser.trim().toLowerCase();

    const user = usuarios.find(u => 
      u.email.toLowerCase() === cleanLogin || 
      (u.rm && u.rm.toLowerCase() === cleanLogin) ||
      (u.matricula && u.matricula.toLowerCase() === cleanLogin)
    );

    if (!user) {
      return { success: false, message: "E-mail ou usuário não encontrado no sistema institucional." };
    }

    if (user.senha !== password) {
      return { success: false, message: "Senha incorreta. Verifique os caracteres e tente novamente." };
    }

    // Sucesso: cria sessão
    this.setSession(user);
    return { success: true, user };
  },

  /**
   * Simulação de recuperação de senha com verificação de conta
   */
  recoverPassword(email) {
    const usuarios = this.get(CAMPUS_STORAGE_KEYS.USUARIOS, CAMPUS_INITIAL_DATA.usuarios);
    const cleanEmail = email.trim().toLowerCase();
    const user = usuarios.find(u => u.email.toLowerCase() === cleanEmail);

    if (!user) {
      return { success: false, message: "Não encontramos uma conta cadastrada com este e-mail escolar." };
    }

    return { 
      success: true, 
      message: `Instruções de recuperação foram enviadas para ${user.email}. Por se tratar de ambiente de demonstração acadêmica, sua senha atual é "${user.senha}".`
    };
  },

  /**
   * Restaura todos os dados originais de fábrica para demonstração acadêmica
   */
  resetAll() {
    try {
      this.set(CAMPUS_STORAGE_KEYS.USUARIOS, CAMPUS_INITIAL_DATA.usuarios);
      this.set(CAMPUS_STORAGE_KEYS.HORARIOS, CAMPUS_INITIAL_DATA.horarios);
      this.set(CAMPUS_STORAGE_KEYS.TURMAS, CAMPUS_INITIAL_DATA.turmas);
      this.set(CAMPUS_STORAGE_KEYS.TAREFAS, CAMPUS_INITIAL_DATA.tarefas);
      this.set(CAMPUS_STORAGE_KEYS.AVALIACOES, CAMPUS_INITIAL_DATA.avaliacoes);
      this.set(CAMPUS_STORAGE_KEYS.COMUNICADOS, CAMPUS_INITIAL_DATA.comunicados);
      this.set(CAMPUS_STORAGE_KEYS.EVENTOS, CAMPUS_INITIAL_DATA.eventos);
      return true;
    } catch (e) {
      console.error("CampusStorage: Erro ao restaurar padrões:", e);
      return false;
    }
  }
};
