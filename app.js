/**
 * CAMPUS — Painel Digital Escolar
 * Controlador Master: Autenticação, Painel do Aluno e Painel do Professor
 * Projeto: tec_projeto_cronograma_escolar
 * Equipe: Milena Bispo, Talita Gonçalves e Ebert Torquato
 */

document.addEventListener("DOMContentLoaded", () => {
  // Inicialização de armazenamento
  CampusStorage.init();

  // Estado da Aplicação
  const app = {
    user: CampusStorage.getSession(),
    // Sub-rotas ativas
    studentView: "overview",
    teacherView: "overview",
    // Dia da semana ativo nos cronogramas
    studentScheduleDay: getTodayWeekdayId(),
    teacherScheduleDay: getTodayWeekdayId(),
    // Filtros do Aluno
    studentTaskSearch: "",
    studentTaskStatus: "all",
    // Filtros do Professor
    teacherSelectedClass: "all",
    teacherTaskSearch: "",
    // Item pendente de exclusão
    pendingDelete: null
  };

  // Referências aos Containers Principais
  const dom = {
    viewAuth: document.getElementById("view-auth"),
    viewStudentApp: document.getElementById("view-student-app"),
    viewTeacherApp: document.getElementById("view-teacher-app"),
    toastShelf: document.getElementById("toastShelf"),

    // Auth
    loginForm: document.getElementById("loginForm"),
    loginEmail: document.getElementById("loginEmail"),
    loginPassword: document.getElementById("loginPassword"),
    btnTogglePassword: document.getElementById("btnTogglePassword"),
    eyeIconOpen: document.getElementById("eyeIconOpen"),
    eyeIconClosed: document.getElementById("eyeIconClosed"),
    authErrorAlert: document.getElementById("authErrorAlert"),
    authErrorMsg: document.getElementById("authErrorMsg"),
    btnSubmitLogin: document.getElementById("btnSubmitLogin"),
    loginSpinner: document.getElementById("loginSpinner"),
    btnSubmitText: document.getElementById("btnSubmitText"),
    btnForgotPwd: document.getElementById("btnForgotPwd"),
    btnFillStudent: document.getElementById("btnFillStudent"),
    btnFillTeacher: document.getElementById("btnFillTeacher"),

    // Modais
    modalForgotPwd: document.getElementById("modalForgotPwd"),
    formForgotPwd: document.getElementById("formForgotPwd"),
    forgotEmail: document.getElementById("forgotEmail"),
    forgotEmailError: document.getElementById("forgotEmailError"),
    forgotResultMsg: document.getElementById("forgotResultMsg"),

    modalConfirmDelete: document.getElementById("modalConfirmDelete"),
    deleteModalTitle: document.getElementById("deleteModalTitle"),
    deleteModalMessage: document.getElementById("deleteModalMessage"),
    btnConfirmDeleteAction: document.getElementById("btnConfirmDeleteAction"),

    modalCreateTask: document.getElementById("modalCreateTask"),
    formTeacherTask: document.getElementById("formTeacherTask"),
    modalCreateEval: document.getElementById("modalCreateEval"),
    formTeacherEval: document.getElementById("formTeacherEval"),
    modalCreateNotice: document.getElementById("modalCreateNotice"),
    formTeacherNotice: document.getElementById("formTeacherNotice"),
    modalCreateEvent: document.getElementById("modalCreateEvent"),
    formTeacherEvent: document.getElementById("formTeacherEvent"),

    // Elementos do Aluno
    studentAvatar: document.getElementById("studentAvatar"),
    studentName: document.getElementById("studentName"),
    studentClassBadge: document.getElementById("studentClassBadge"),
    studentTopbarTitle: document.getElementById("studentTopbarTitle"),
    studentTopbarAvatar: document.getElementById("studentTopbarAvatar"),
    studentTopbarName: document.getElementById("studentTopbarName"),
    studentHeroDate: document.getElementById("studentHeroDate"),
    studentHeroClass: document.getElementById("studentHeroClass"),
    studentHeroGreeting: document.getElementById("studentHeroGreeting"),
    sIndNextClassVal: document.getElementById("sIndNextClassVal"),
    sIndNextClassDesc: document.getElementById("sIndNextClassDesc"),
    sIndPendingTasks: document.getElementById("sIndPendingTasks"),
    sIndNextEval: document.getElementById("sIndNextEval"),
    sIndNextEvalDesc: document.getElementById("sIndNextEvalDesc"),
    sIndNotices: document.getElementById("sIndNotices"),
    studentTodaySchedule: document.getElementById("studentTodaySchedule"),
    studentUpcomingTasks: document.getElementById("studentUpcomingTasks"),
    studentDaysNav: document.getElementById("studentDaysNav"),
    studentScheduleCards: document.getElementById("studentScheduleCards"),
    studentTasksGrid: document.getElementById("studentTasksGrid"),
    sTaskSearch: document.getElementById("sTaskSearch"),
    sTaskStatusFilter: document.getElementById("sTaskStatusFilter"),
    studentAssessmentsGrid: document.getElementById("studentAssessmentsGrid"),
    studentNoticesGrid: document.getElementById("studentNoticesGrid"),
    studentEventsGrid: document.getElementById("studentEventsGrid"),
    studentBadgeTasks: document.getElementById("studentBadgeTasks"),
    studentBadgeEvals: document.getElementById("studentBadgeEvals"),
    studentBadgeNotices: document.getElementById("studentBadgeNotices"),

    // Elementos do Professor
    teacherAvatar: document.getElementById("teacherAvatar"),
    teacherName: document.getElementById("teacherName"),
    teacherTopbarTitle: document.getElementById("teacherTopbarTitle"),
    teacherTopbarAvatar: document.getElementById("teacherTopbarAvatar"),
    teacherTopbarName: document.getElementById("teacherTopbarName"),
    teacherClassFilter: document.getElementById("teacherClassFilter"),
    teacherHeroDate: document.getElementById("teacherHeroDate"),
    teacherHeroGreeting: document.getElementById("teacherHeroGreeting"),
    tIndTasksCount: document.getElementById("tIndTasksCount"),
    tIndEvalsCount: document.getElementById("tIndEvalsCount"),
    tIndNextClass: document.getElementById("tIndNextClass"),
    tIndNextClassDesc: document.getElementById("tIndNextClassDesc"),
    tIndNoticesCount: document.getElementById("tIndNoticesCount"),
    teacherTodaySchedule: document.getElementById("teacherTodaySchedule"),
    teacherRecentNotices: document.getElementById("teacherRecentNotices"),
    teacherDaysNav: document.getElementById("teacherDaysNav"),
    teacherScheduleCards: document.getElementById("teacherScheduleCards"),
    teacherTasksGrid: document.getElementById("teacherTasksGrid"),
    tTaskSearch: document.getElementById("tTaskSearch"),
    teacherAssessmentsGrid: document.getElementById("teacherAssessmentsGrid"),
    teacherNoticesGrid: document.getElementById("teacherNoticesGrid"),
    teacherEventsGrid: document.getElementById("teacherEventsGrid"),
    teacherClassesGrid: document.getElementById("teacherClassesGrid"),
    teacherBadgeTasks: document.getElementById("teacherBadgeTasks"),
    teacherBadgeEvals: document.getElementById("teacherBadgeEvals"),
    teacherBadgeNotices: document.getElementById("teacherBadgeNotices")
  };

  // ==========================================================================
  // FUNÇÕES DE APOIO E DATA
  // ==========================================================================

  function getTodayWeekdayId() {
    const day = new Date().getDay();
    switch (day) {
      case 1: return "segunda";
      case 2: return "terca";
      case 3: return "quarta";
      case 4: return "quinta";
      case 5: return "sexta";
      default: return "segunda";
    }
  }

  function getFormattedCurrentDate() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const str = now.toLocaleDateString('pt-BR', options);
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function getContextualGreeting(name = "") {
    const hour = new Date().getHours();
    let saudacao = "Bom dia";
    if (hour >= 12 && hour < 18) saudacao = "Boa tarde";
    else if (hour >= 18 || hour < 5) saudacao = "Boa noite";
    return name ? `${saudacao}, ${name}.` : `${saudacao}.`;
  }

  function formatDatePtBR(dateString) {
    if (!dateString) return "";
    const parts = dateString.split("-");
    if (parts.length === 3) return `${parts[2]}/${parts[1]}/${parts[0]}`;
    return dateString;
  }

  function isDatePast(dateString) {
    if (!dateString) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(dateString + "T00:00:00");
    return target < today;
  }

  function showToast(message, type = "success") {
    const toast = document.createElement("div");
    toast.className = `toast-item ${type}`;
    toast.setAttribute("role", "status");

    const iconSvg = type === "success" 
      ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>`
      : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;

    toast.innerHTML = `${iconSvg} <span>${message}</span>`;
    dom.toastShelf.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(40px)";
      toast.style.transition = "all 0.25s ease";
      setTimeout(() => toast.remove(), 250);
    }, 4000);
  }

  function openModal(modalEl) {
    if (!modalEl) return;
    modalEl.classList.add("active");
    modalEl.setAttribute("aria-hidden", "false");
    const focusable = modalEl.querySelector("input, select, textarea, button");
    if (focusable) focusable.focus();
  }

  function closeModal(modalEl) {
    if (!modalEl) return;
    modalEl.classList.remove("active");
    modalEl.setAttribute("aria-hidden", "true");
    const errors = modalEl.querySelectorAll(".field-error.active");
    errors.forEach(e => e.classList.remove("active"));
    const invalids = modalEl.querySelectorAll(".is-invalid");
    invalids.forEach(i => i.classList.remove("is-invalid"));
  }

  // Ouvintes para fechar qualquer modal
  document.querySelectorAll("[data-close-modal]").forEach(btn => {
    btn.addEventListener("click", () => {
      const modalId = btn.getAttribute("data-close-modal");
      closeModal(document.getElementById(modalId));
    });
  });

  document.querySelectorAll(".modal-overlay").forEach(overlay => {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeModal(overlay);
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.querySelectorAll(".modal-overlay.active").forEach(m => closeModal(m));
    }
  });

  // ==========================================================================
  // ROTEAMENTO PRINCIPAL E SESSÃO
  // ==========================================================================

  function checkRouteSession() {
    app.user = CampusStorage.getSession();

    if (!app.user) {
      // Sem sessão: exibe tela de login
      dom.viewAuth.style.display = "flex";
      dom.viewStudentApp.classList.remove("active");
      dom.viewTeacherApp.classList.remove("active");
      document.title = "Login — Painel Digital Escolar";
      return;
    }

    // Usuário autenticado
    dom.viewAuth.style.display = "none";

    if (app.user.role === "aluno") {
      dom.viewStudentApp.classList.add("active");
      dom.viewTeacherApp.classList.remove("active");
      document.title = `Área do Aluno — CAMPUS (${app.user.nome})`;
      initStudentInterface();
    } else if (app.user.role === "professor") {
      dom.viewStudentApp.classList.remove("active");
      dom.viewTeacherApp.classList.add("active");
      document.title = `Área do Professor — CAMPUS (${app.user.nome})`;
      initTeacherInterface();
    }
  }

  function performLogout() {
    CampusStorage.clearSession();
    app.user = null;
    showToast("Sessão encerrada com sucesso.", "success");
    checkRouteSession();
  }

  document.querySelectorAll(".btn-action-logout").forEach(btn => {
    btn.addEventListener("click", performLogout);
  });

  // ==========================================================================
  // 1. FLUXO DE LOGIN & RECUPERAÇÃO
  // ==========================================================================

  // Alternar visibilidade da senha
  dom.btnTogglePassword.addEventListener("click", () => {
    const isPassword = dom.loginPassword.type === "password";
    dom.loginPassword.type = isPassword ? "text" : "password";
    dom.eyeIconOpen.style.display = isPassword ? "none" : "block";
    dom.eyeIconClosed.style.display = isPassword ? "block" : "none";
  });

  // Preenchimento rápido para apresentação acadêmica
  dom.btnFillStudent.addEventListener("click", () => {
    dom.loginEmail.value = "aluno@etec.sp.gov.br";
    dom.loginPassword.value = "aluno123";
    dom.authErrorAlert.classList.remove("active");
    dom.loginEmail.focus();
  });

  dom.btnFillTeacher.addEventListener("click", () => {
    dom.loginEmail.value = "professor@etec.sp.gov.br";
    dom.loginPassword.value = "prof123";
    dom.authErrorAlert.classList.remove("active");
    dom.loginEmail.focus();
  });

  // Envio do formulário de login
  dom.loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    dom.authErrorAlert.classList.remove("active");

    const email = dom.loginEmail.value.trim();
    const pass = dom.loginPassword.value;

    let hasError = false;
    if (!email) {
      document.getElementById("loginEmailError").classList.add("active");
      dom.loginEmail.classList.add("is-invalid");
      hasError = true;
    } else {
      document.getElementById("loginEmailError").classList.remove("active");
      dom.loginEmail.classList.remove("is-invalid");
    }

    if (!pass) {
      document.getElementById("loginPasswordError").classList.add("active");
      dom.loginPassword.classList.add("is-invalid");
      hasError = true;
    } else {
      document.getElementById("loginPasswordError").classList.remove("active");
      dom.loginPassword.classList.remove("is-invalid");
    }

    if (hasError) return;

    // Indicador visual de carregamento
    dom.btnSubmitLogin.classList.add("loading");
    dom.btnSubmitText.textContent = "Autenticando...";

    setTimeout(() => {
      const result = CampusStorage.authenticate(email, pass);
      dom.btnSubmitLogin.classList.remove("loading");
      dom.btnSubmitText.textContent = "Entrar no Painel";

      if (!result.success) {
        dom.authErrorMsg.textContent = result.message;
        dom.authErrorAlert.classList.add("active");
        showToast(result.message, "danger");
      } else {
        showToast(`Bem-vindo(a), ${result.user.nome}!`, "success");
        checkRouteSession();
      }
    }, 450);
  });

  // Modal: Esqueci minha senha
  dom.btnForgotPwd.addEventListener("click", () => {
    dom.forgotEmail.value = dom.loginEmail.value || "";
    dom.forgotResultMsg.style.display = "none";
    openModal(dom.modalForgotPwd);
  });

  dom.formForgotPwd.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = dom.forgotEmail.value.trim();
    if (!email) {
      dom.forgotEmailError.classList.add("active");
      dom.forgotEmail.classList.add("is-invalid");
      return;
    }
    dom.forgotEmailError.classList.remove("active");
    dom.forgotEmail.classList.remove("is-invalid");

    const res = CampusStorage.recoverPassword(email);
    dom.forgotResultMsg.style.display = "block";
    dom.forgotResultMsg.style.background = res.success ? "var(--color-success-bg)" : "var(--color-danger-bg)";
    dom.forgotResultMsg.style.color = res.success ? "var(--color-success)" : "var(--color-danger)";
    dom.forgotResultMsg.textContent = res.message;
  });

  // ==========================================================================
  // 2. INTERFACE DO ALUNO (ESTUDANTE)
  // ==========================================================================

  function initStudentInterface() {
    const student = app.user;
    dom.studentAvatar.textContent = student.avatar || "AL";
    dom.studentTopbarAvatar.textContent = student.avatar || "AL";
    dom.studentName.textContent = student.nome;
    dom.studentTopbarName.textContent = student.nome;
    dom.studentClassBadge.textContent = `Aluno • ${student.turmaId}`;
    dom.studentHeroGreeting.textContent = getContextualGreeting(student.nome.split(" ")[0]);
    dom.studentHeroDate.textContent = getFormattedCurrentDate();
    dom.studentHeroClass.textContent = `Turma: ${student.turmaNome || student.turmaId}`;

    // Configura tela de perfil do aluno
    document.getElementById("pStudentAvatarBig").textContent = student.avatar || "AL";
    document.getElementById("pStudentFullName").textContent = student.nome;
    document.getElementById("pStudentEmail").textContent = student.email;
    document.getElementById("pStudentTurma").textContent = student.turmaNome || student.turmaId;
    document.getElementById("pStudentRM").textContent = student.rm || "2026-0000";
    document.getElementById("pStudentBio").textContent = student.bio || "Estudante do curso técnico em Desenvolvimento de Sistemas.";

    // Renderiza a view ativa do aluno
    switchStudentView(app.studentView);
  }

  function switchStudentView(viewId) {
    app.studentView = viewId;

    document.querySelectorAll("#studentSidebar .nav-item").forEach(item => {
      const target = item.getAttribute("data-student-view");
      if (target === viewId) item.classList.add("active");
      else item.classList.remove("active");
    });

    document.querySelectorAll("#studentContent .page-view").forEach(v => {
      if (v.id === `student-view-${viewId}`) v.classList.add("active");
      else v.classList.remove("active");
    });

    const titles = {
      overview: "Início",
      schedule: "Meu cronograma",
      tasks: "Tarefas e trabalhos",
      assessments: "Avaliações",
      notices: "Avisos",
      events: "Eventos",
      profile: "Meu perfil"
    };
    dom.studentTopbarTitle.textContent = titles[viewId] || "CAMPUS";
    document.getElementById("studentSidebar").classList.remove("mobile-open");

    renderStudentContent();
  }

  function renderStudentContent() {
    const turmaId = app.user.turmaId;
    const horarios = CampusStorage.get(CAMPUS_STORAGE_KEYS.HORARIOS, []);
    const tarefas = CampusStorage.get(CAMPUS_STORAGE_KEYS.TAREFAS, []);
    const avaliacoes = CampusStorage.get(CAMPUS_STORAGE_KEYS.AVALIACOES, []);
    const comunicados = CampusStorage.get(CAMPUS_STORAGE_KEYS.COMUNICADOS, []);
    const eventos = CampusStorage.get(CAMPUS_STORAGE_KEYS.EVENTOS, []);

    // Badges no menu
    const pendingTasks = tarefas.filter(t => t.classId === turmaId && t.status !== "completed");
    dom.studentBadgeTasks.textContent = pendingTasks.length;
    dom.studentBadgeEvals.textContent = avaliacoes.filter(e => e.classId === turmaId).length;
    dom.studentBadgeNotices.textContent = comunicados.filter(c => c.target === "Todas" || c.target === turmaId).length;

    // 1. Dashboard (Início)
    const todayWeekday = getTodayWeekdayId();
    const aulasHoje = horarios.filter(h => h.classId === turmaId && h.dia === todayWeekday && !h.isBreak);
    if (aulasHoje.length > 0) {
      dom.sIndNextClassVal.textContent = aulasHoje[0].subject;
      dom.sIndNextClassDesc.textContent = `Às ${aulasHoje[0].inicio} • ${aulasHoje[0].room}`;
    } else {
      dom.sIndNextClassVal.textContent = "Sem aulas";
      dom.sIndNextClassDesc.textContent = "Nenhuma aula programada hoje.";
    }

    dom.sIndPendingTasks.textContent = pendingTasks.length;

    const evalsTurma = avaliacoes.filter(e => e.classId === turmaId);
    evalsTurma.sort((a, b) => new Date(a.date) - new Date(b.date));
    if (evalsTurma.length > 0) {
      dom.sIndNextEval.textContent = evalsTurma[0].subject;
      dom.sIndNextEvalDesc.textContent = `Data: ${formatDatePtBR(evalsTurma[0].date)}`;
    } else {
      dom.sIndNextEval.textContent = "Nenhuma";
      dom.sIndNextEvalDesc.textContent = "Nenhuma avaliação próxima.";
    }

    const avisosTurma = comunicados.filter(c => c.target === "Todas" || c.target === turmaId);
    dom.sIndNotices.textContent = avisosTurma.length;

    // Timeline de Hoje na Home do Aluno
    const gradeHojeCompleta = horarios.filter(h => h.classId === turmaId && h.dia === todayWeekday);
    if (gradeHojeCompleta.length === 0) {
      dom.studentTodaySchedule.innerHTML = `<div class="empty-state"><p>Nenhuma aula para hoje.</p></div>`;
    } else {
      dom.studentTodaySchedule.innerHTML = gradeHojeCompleta.map((item, idx) => {
        if (item.isBreak) {
          return `
            <div class="timeline-item break-item">
              <span class="timeline-time">${item.inicio} - ${item.fim}</span>
              <div class="timeline-content"><h4>☕ ${item.subject}</h4><span class="timeline-prof">${item.room}</span></div>
            </div>`;
        }
        const isNext = idx === 0 ? "next-up" : "";
        return `
          <div class="timeline-item ${isNext}">
            <span class="timeline-time">${item.inicio} - ${item.fim}</span>
            <div class="timeline-content">
              <h4>${item.subject}</h4>
              <span class="timeline-prof">${item.teacher} • ${item.room}</span>
            </div>
            ${item.status === 'alterada' ? '<span class="timeline-badge" style="background:var(--color-warning-bg); color:var(--color-warning);">Alterada</span>' : ''}
          </div>`;
      }).join("");
    }

    // Trabalhos Próximos na Home do Aluno
    const sortedTasks = [...pendingTasks].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)).slice(0, 4);
    if (sortedTasks.length === 0) {
      dom.studentUpcomingTasks.innerHTML = `<div class="empty-state"><p>Todas as tarefas estão concluídas! 🎉</p></div>`;
    } else {
      dom.studentUpcomingTasks.innerHTML = sortedTasks.map(t => `
        <div class="mini-task-item">
          <div class="mini-task-info">
            <input type="checkbox" class="student-task-chk" data-id="${t.id}" aria-label="Concluir tarefa ${t.title}">
            <div class="mini-task-text">
              <h4>${t.title}</h4>
              <span class="mini-task-meta">${t.subject} • Prazo: ${formatDatePtBR(t.dueDate)}</span>
            </div>
          </div>
          <span class="priority-tag priority-${t.priority}">${t.priority}</span>
        </div>
      `).join("");

      dom.studentUpcomingTasks.querySelectorAll(".student-task-chk").forEach(chk => {
        chk.addEventListener("change", (e) => toggleStudentTask(e.target.getAttribute("data-id")));
      });
    }

    // 2. Cronograma Completo do Aluno
    dom.studentDaysNav.innerHTML = CAMPUS_INITIAL_DATA.diasSemana.map(d => `
      <button class="day-tab-btn ${d.id === app.studentScheduleDay ? 'active' : ''}" data-student-day="${d.id}">${d.nome}</button>
    `).join("");

    dom.studentDaysNav.querySelectorAll("[data-student-day]").forEach(btn => {
      btn.addEventListener("click", () => {
        app.studentScheduleDay = btn.getAttribute("data-student-day");
        renderStudentContent();
      });
    });

    const aulasDia = horarios.filter(h => h.classId === turmaId && h.dia === app.studentScheduleDay);
    if (aulasDia.length === 0) {
      dom.studentScheduleCards.innerHTML = `<div class="empty-state"><p>Nenhuma aula agendada para este dia.</p></div>`;
    } else {
      dom.studentScheduleCards.innerHTML = aulasDia.map(aula => {
        if (aula.isBreak) {
          return `
            <div class="schedule-card is-break">
              <div class="time-slot"><span class="time-slot-val">${aula.inicio} - ${aula.fim}</span></div>
              <div><h3>☕ ${aula.subject}</h3><p style="font-size:0.8rem; color:var(--color-text-muted);">${aula.room}</p></div>
              <span class="timeline-badge" style="background:var(--color-surface); color:var(--color-text-secondary);">Intervalo</span>
            </div>`;
        }
        return `
          <div class="schedule-card status-${aula.status}">
            <div class="time-slot">
              <span class="time-slot-val">${aula.inicio} - ${aula.fim}</span>
              <span class="room-badge">📍 ${aula.room}</span>
            </div>
            <div>
              <h3>${aula.subject}</h3>
              <p style="font-size:0.88rem; color:var(--color-text-secondary); margin-top:2px;">Professor: <strong>${aula.teacher}</strong></p>
              ${aula.note ? `<div style="font-size:0.8rem; color:var(--color-warning); margin-top:4px;">⚠️ ${aula.note}</div>` : ''}
            </div>
            <span class="timeline-badge" style="background:var(--color-success-bg); color:var(--color-success);">Regular</span>
          </div>`;
      }).join("");
    }

    // 3. Tarefas do Aluno
    let tarefasFiltradas = tarefas.filter(t => t.classId === turmaId);
    if (app.studentTaskStatus === "pending") {
      tarefasFiltradas = tarefasFiltradas.filter(t => t.status === "pending" && !isDatePast(t.dueDate));
    } else if (app.studentTaskStatus === "completed") {
      tarefasFiltradas = tarefasFiltradas.filter(t => t.status === "completed");
    } else if (app.studentTaskStatus === "overdue") {
      tarefasFiltradas = tarefasFiltradas.filter(t => t.status !== "completed" && isDatePast(t.dueDate));
    }

    if (app.studentTaskSearch.trim() !== "") {
      const q = app.studentTaskSearch.toLowerCase();
      tarefasFiltradas = tarefasFiltradas.filter(t => t.title.toLowerCase().includes(q) || t.subject.toLowerCase().includes(q) || t.description.toLowerCase().includes(q));
    }
    tarefasFiltradas.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

    if (tarefasFiltradas.length === 0) {
      dom.studentTasksGrid.innerHTML = `<div class="empty-state" style="grid-column:1/-1;"><p>Nenhuma tarefa encontrada.</p></div>`;
    } else {
      dom.studentTasksGrid.innerHTML = tarefasFiltradas.map(t => {
        const isDone = t.status === "completed";
        const isPast = !isDone && isDatePast(t.dueDate);
        return `
          <div class="task-card ${isDone ? 'is-completed' : ''}">
            <div>
              <div class="card-top-meta">
                <span class="priority-tag priority-${t.priority}">${t.priority}</span>
                <span style="font-size:0.75rem; color:var(--color-text-muted);">${t.subject}</span>
              </div>
              <h3>${t.title}</h3>
              <p>${t.description}</p>
            </div>
            <div class="card-footer">
              <div>
                <span>Prazo: <strong>${formatDatePtBR(t.dueDate)}</strong></span>
                <span style="margin-left:6px;">(${isDone ? 'Concluída' : (isPast ? '<span style="color:var(--color-danger);">Atrasada</span>' : 'Pendente')})</span>
              </div>
              <label style="display:flex; align-items:center; gap:6px; cursor:pointer; font-size:0.8rem;">
                <input type="checkbox" class="student-task-chk" data-id="${t.id}" ${isDone ? 'checked' : ''}>
                <span>${isDone ? 'Entregue' : 'Marcar'}</span>
              </label>
            </div>
          </div>`;
      }).join("");

      dom.studentTasksGrid.querySelectorAll(".student-task-chk").forEach(chk => {
        chk.addEventListener("change", (e) => toggleStudentTask(e.target.getAttribute("data-id")));
      });
    }

    // 4. Avaliações do Aluno
    if (evalsTurma.length === 0) {
      dom.studentAssessmentsGrid.innerHTML = `<div class="empty-state" style="grid-column:1/-1;"><p>Nenhuma avaliação cadastrada para sua turma.</p></div>`;
    } else {
      dom.studentAssessmentsGrid.innerHTML = evalsTurma.map(item => {
        const parts = item.date.split("-");
        const dia = parts[2] || "00";
        const mes = parts[1] ? ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"][parseInt(parts[1])-1] : "";
        return `
          <div class="agenda-card">
            <div class="agenda-date-block"><span class="agenda-day">${dia}</span><span class="agenda-month">${mes}</span></div>
            <div style="flex:1;">
              <div class="card-top-meta">
                <span class="priority-tag priority-high">${item.format}</span>
                <span style="font-size:0.75rem; color:var(--color-text-muted);">Horário: ${item.time}</span>
              </div>
              <h3>${item.title}</h3>
              <p>${item.description}</p>
              <div class="card-footer" style="padding-top:6px; margin-top:6px;">
                <span>Professor: <strong>${item.teacher}</strong> (${item.subject})</span>
              </div>
            </div>
          </div>`;
      }).join("");
    }

    // 5. Avisos do Aluno
    if (avisosTurma.length === 0) {
      dom.studentNoticesGrid.innerHTML = `<div class="empty-state" style="grid-column:1/-1;"><p>Nenhum comunicado ativo.</p></div>`;
    } else {
      dom.studentNoticesGrid.innerHTML = avisosTurma.map(n => `
        <div class="notice-card ${n.category === 'Urgente' ? 'urgent' : ''} ${n.category === 'Ausência de professor' ? 'teacher-absence' : ''}">
          <div class="card-top-meta">
            <span class="priority-tag priority-medium">${n.category}</span>
            <span style="font-size:0.75rem; color:var(--color-text-muted);">${formatDatePtBR(n.publishedAt)}</span>
          </div>
          <h3>${n.title}</h3>
          <p>${n.content}</p>
          <div class="card-footer" style="margin-top:auto;">
            <span>Publicado por: <strong>${n.author}</strong></span>
            ${n.confirmedByCoordination ? `<span style="font-size:0.7rem; color:var(--color-success);">✓ Validado pela Coordenação</span>` : ''}
          </div>
        </div>
      `).join("");
    }

    // 6. Eventos do Aluno
    dom.studentEventsGrid.innerHTML = eventos.map(evt => {
      const parts = evt.date.split("-");
      const dia = parts[2] || "00";
      const mes = parts[1] ? ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"][parseInt(parts[1])-1] : "";
      return `
        <div class="agenda-card">
          <div class="agenda-date-block"><span class="agenda-day">${dia}</span><span class="agenda-month">${mes}</span></div>
          <div style="flex:1;">
            <div class="card-top-meta">
              <span class="priority-tag priority-low">${evt.category}</span>
              <span style="font-size:0.75rem; color:var(--color-text-muted);">${evt.time}</span>
            </div>
            <h3>${evt.title}</h3>
            <p>${evt.description}</p>
            <div class="card-footer" style="padding-top:6px; margin-top:6px;">
              <span>Local: <strong>${evt.location}</strong> • Público: ${evt.classes}</span>
            </div>
          </div>
        </div>`;
    }).join("");
  }

  function toggleStudentTask(id) {
    const tasks = CampusStorage.get(CAMPUS_STORAGE_KEYS.TAREFAS, []);
    const item = tasks.find(t => t.id === id);
    if (item) {
      item.status = item.status === "completed" ? "pending" : "completed";
      CampusStorage.set(CAMPUS_STORAGE_KEYS.TAREFAS, tasks);
      showToast(item.status === "completed" ? `Tarefa "${item.title}" marcada como concluída!` : `Tarefa reaberta.`);
      renderStudentContent();
    }
  }

  // Ouvintes de navegação do aluno
  document.querySelectorAll("#studentSidebar [data-student-view]").forEach(btn => {
    btn.addEventListener("click", () => switchStudentView(btn.getAttribute("data-student-view")));
  });

  document.querySelectorAll("[data-student-jump]").forEach(btn => {
    btn.addEventListener("click", () => switchStudentView(btn.getAttribute("data-student-jump")));
  });

  if (dom.sTaskSearch) {
    dom.sTaskSearch.addEventListener("input", (e) => {
      app.studentTaskSearch = e.target.value;
      renderStudentContent();
    });
  }
  if (dom.sTaskStatusFilter) {
    dom.sTaskStatusFilter.addEventListener("change", (e) => {
      app.studentTaskStatus = e.target.value;
      renderStudentContent();
    });
  }

  // ==========================================================================
  // 3. INTERFACE DO PROFESSOR (DOCENTE)
  // ==========================================================================

  function initTeacherInterface() {
    const teacher = app.user;
    dom.teacherAvatar.textContent = teacher.avatar || "PR";
    dom.teacherTopbarAvatar.textContent = teacher.avatar || "PR";
    dom.teacherName.textContent = teacher.nome;
    dom.teacherTopbarName.textContent = teacher.nome;
    dom.teacherHeroGreeting.textContent = getContextualGreeting(teacher.nome.split(" ")[0]);
    dom.teacherHeroDate.textContent = getFormattedCurrentDate();

    // Configura perfil do docente
    document.getElementById("pTeacherAvatarBig").textContent = teacher.avatar || "PR";
    document.getElementById("pTeacherFullName").textContent = teacher.nome;
    document.getElementById("pTeacherEmail").textContent = teacher.email;
    document.getElementById("pTeacherMatricula").textContent = teacher.matricula || "DOC-2026-904";
    document.getElementById("pTeacherTurmas").textContent = (teacher.turmas || ["1DS", "2DS", "3DS"]).join(", ");
    document.getElementById("pTeacherDisciplinas").textContent = (teacher.disciplinas || ["Desenvolvimento de Sistemas"]).join(", ");
    document.getElementById("pTeacherBio").textContent = teacher.bio || "Docente da área de computação.";

    switchTeacherView(app.teacherView);
  }

  function switchTeacherView(viewId) {
    app.teacherView = viewId;

    document.querySelectorAll("#teacherSidebar .nav-item").forEach(item => {
      const target = item.getAttribute("data-teacher-view");
      if (target === viewId) item.classList.add("active");
      else item.classList.remove("active");
    });

    document.querySelectorAll("#teacherContent .page-view").forEach(v => {
      if (v.id === `teacher-view-${viewId}`) v.classList.add("active");
      else v.classList.remove("active");
    });

    const titles = {
      overview: "Início",
      schedule: "Meus horários",
      tasks: "Gerenciar tarefas",
      assessments: "Gerenciar avaliações",
      notices: "Gerenciar avisos",
      events: "Eventos",
      classes: "Turmas",
      profile: "Meu perfil"
    };
    dom.teacherTopbarTitle.textContent = titles[viewId] || "CAMPUS";
    document.getElementById("teacherSidebar").classList.remove("mobile-open");

    renderTeacherContent();
  }

  function renderTeacherContent() {
    const teacher = app.user;
    const filterClass = app.teacherSelectedClass;
    const horarios = CampusStorage.get(CAMPUS_STORAGE_KEYS.HORARIOS, []);
    const tarefas = CampusStorage.get(CAMPUS_STORAGE_KEYS.TAREFAS, []);
    const avaliacoes = CampusStorage.get(CAMPUS_STORAGE_KEYS.AVALIACOES, []);
    const comunicados = CampusStorage.get(CAMPUS_STORAGE_KEYS.COMUNICADOS, []);
    const eventos = CampusStorage.get(CAMPUS_STORAGE_KEYS.EVENTOS, []);
    const turmas = CampusStorage.get(CAMPUS_STORAGE_KEYS.TURMAS, []);

    // Badges na sidebar
    dom.teacherBadgeTasks.textContent = tarefas.length;
    dom.teacherBadgeEvals.textContent = avaliacoes.length;
    dom.teacherBadgeNotices.textContent = comunicados.length;

    // 1. Dashboard (Início do Professor)
    dom.tIndTasksCount.textContent = tarefas.length;
    dom.tIndEvalsCount.textContent = avaliacoes.length;
    dom.tIndNoticesCount.textContent = comunicados.length;

    const todayWeekday = getTodayWeekdayId();
    // Aulas ministradas por este professor hoje
    const aulasProfHoje = horarios.filter(h => 
      !h.isBreak && h.dia === todayWeekday && 
      (h.teacher.toLowerCase().includes(teacher.nome.toLowerCase()) || teacher.nome.toLowerCase().includes(h.teacher.toLowerCase()))
    );

    if (aulasProfHoje.length > 0) {
      dom.tIndNextClass.textContent = aulasProfHoje[0].subject;
      dom.tIndNextClassDesc.textContent = `Turma ${aulasProfHoje[0].classId} • ${aulasProfHoje[0].inicio} (${aulasProfHoje[0].room})`;
    } else {
      dom.tIndNextClass.textContent = "Sem aulas";
      dom.tIndNextClassDesc.textContent = "Nenhuma aula sua na grade de hoje.";
    }

    if (aulasProfHoje.length === 0) {
      dom.teacherTodaySchedule.innerHTML = `<div class="empty-state"><p>Você não tem aulas agendadas para hoje.</p></div>`;
    } else {
      dom.teacherTodaySchedule.innerHTML = aulasProfHoje.map(aula => `
        <div class="timeline-item next-up">
          <span class="timeline-time">${aula.inicio} - ${aula.fim}</span>
          <div class="timeline-content">
            <h4>${aula.subject} (Turma ${aula.classId})</h4>
            <span class="timeline-prof">Sala/Lab: ${aula.room}</span>
          </div>
          <span class="timeline-badge" style="background:var(--color-primary-soft); color:var(--color-white); border:1px solid var(--color-primary);">Docente</span>
        </div>
      `).join("");
    }

    // Comunicados Recentes na Home do Professor
    dom.teacherRecentNotices.innerHTML = comunicados.slice(0, 4).map(c => `
      <div class="mini-task-item">
        <div class="mini-task-info">
          <div class="mini-task-text">
            <h4>${c.title}</h4>
            <span class="mini-task-meta">Destino: ${c.target} • Data: ${formatDatePtBR(c.publishedAt)}</span>
          </div>
        </div>
        <span class="priority-tag priority-medium">${c.category}</span>
      </div>
    `).join("");

    // 2. Meus Horários (Professor)
    dom.teacherDaysNav.innerHTML = CAMPUS_INITIAL_DATA.diasSemana.map(d => `
      <button class="day-tab-btn ${d.id === app.teacherScheduleDay ? 'active' : ''}" data-teacher-day="${d.id}">${d.nome}</button>
    `).join("");

    dom.teacherDaysNav.querySelectorAll("[data-teacher-day]").forEach(btn => {
      btn.addEventListener("click", () => {
        app.teacherScheduleDay = btn.getAttribute("data-teacher-day");
        renderTeacherContent();
      });
    });

    let aulasDoDocente = horarios.filter(h => 
      !h.isBreak && h.dia === app.teacherScheduleDay &&
      (filterClass === "all" || h.classId === filterClass)
    );

    if (aulasDoDocente.length === 0) {
      dom.teacherScheduleCards.innerHTML = `<div class="empty-state"><p>Nenhuma aula encontrada para este dia/filtro.</p></div>`;
    } else {
      dom.teacherScheduleCards.innerHTML = aulasDoDocente.map(aula => `
        <div class="schedule-card status-${aula.status}">
          <div class="time-slot">
            <span class="time-slot-val">${aula.inicio} - ${aula.fim}</span>
            <span class="room-badge">${aula.room}</span>
          </div>
          <div>
            <h3>${aula.subject}</h3>
            <p style="font-size:0.85rem; color:var(--color-text-secondary); margin-top:2px;">
              Turma: <strong>${aula.classId}</strong> &bull; Docente: ${aula.teacher}
            </p>
          </div>
          <span class="timeline-badge" style="background:var(--color-success-bg); color:var(--color-success);">Confirmada</span>
        </div>
      `).join("");
    }

    // 3. Gerenciar Tarefas (Professor)
    let tarefasDocente = [...tarefas];
    if (filterClass !== "all") tarefasDocente = tarefasDocente.filter(t => t.classId === filterClass);
    if (app.teacherTaskSearch.trim() !== "") {
      const q = app.teacherTaskSearch.toLowerCase();
      tarefasDocente = tarefasDocente.filter(t => t.title.toLowerCase().includes(q) || t.subject.toLowerCase().includes(q));
    }

    if (tarefasDocente.length === 0) {
      dom.teacherTasksGrid.innerHTML = `<div class="empty-state" style="grid-column:1/-1;"><p>Nenhuma tarefa cadastrada com os filtros atuais.</p></div>`;
    } else {
      dom.teacherTasksGrid.innerHTML = tarefasDocente.map(t => `
        <div class="task-card">
          <div>
            <div class="card-top-meta">
              <span class="priority-tag priority-${t.priority}">${t.priority}</span>
              <span class="demo-pill-badge badge-student">Turma ${t.classId}</span>
            </div>
            <h3>${t.title}</h3>
            <p>${t.description}</p>
          </div>
          <div class="card-footer">
            <div>
              <span>Prazo: <strong>${formatDatePtBR(t.dueDate)}</strong></span>
              <span style="font-size:0.75rem; color:var(--color-text-muted); display:block;">Disciplina: ${t.subject}</span>
            </div>
            <button class="btn btn-secondary btn-sm btn-delete-item" data-type="tarefa" data-id="${t.id}" title="Excluir tarefa">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/></svg>
            </button>
          </div>
        </div>
      `).join("");
    }

    // 4. Gerenciar Avaliações (Professor)
    let evalsDocente = [...avaliacoes];
    if (filterClass !== "all") evalsDocente = evalsDocente.filter(e => e.classId === filterClass);
    if (evalsDocente.length === 0) {
      dom.teacherAssessmentsGrid.innerHTML = `<div class="empty-state" style="grid-column:1/-1;"><p>Nenhuma avaliação cadastrada.</p></div>`;
    } else {
      dom.teacherAssessmentsGrid.innerHTML = evalsDocente.map(e => {
        const parts = e.date.split("-");
        const dia = parts[2] || "00";
        const mes = parts[1] ? ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"][parseInt(parts[1])-1] : "";
        return `
          <div class="agenda-card">
            <div class="agenda-date-block"><span class="agenda-day">${dia}</span><span class="agenda-month">${mes}</span></div>
            <div style="flex:1;">
              <div class="card-top-meta">
                <span class="priority-tag priority-high">${e.format}</span>
                <span class="demo-pill-badge badge-student">Turma ${e.classId}</span>
              </div>
              <h3>${e.title}</h3>
              <p>${e.description}</p>
              <div class="card-footer" style="padding-top:6px; margin-top:6px;">
                <span>Horário: ${e.time} &bull; Matéria: <strong>${e.subject}</strong></span>
                <button class="btn btn-secondary btn-sm btn-delete-item" data-type="avaliação" data-id="${e.id}" title="Excluir avaliação">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/></svg>
                </button>
              </div>
            </div>
          </div>`;
      }).join("");
    }

    // 5. Gerenciar Avisos (Professor)
    let noticesDocente = [...comunicados];
    if (filterClass !== "all") noticesDocente = noticesDocente.filter(n => n.target === "Todas" || n.target === filterClass);
    if (noticesDocente.length === 0) {
      dom.teacherNoticesGrid.innerHTML = `<div class="empty-state" style="grid-column:1/-1;"><p>Nenhum comunicado cadastrado.</p></div>`;
    } else {
      dom.teacherNoticesGrid.innerHTML = noticesDocente.map(n => `
        <div class="notice-card ${n.category === 'Urgente' ? 'urgent' : ''}">
          <div class="card-top-meta">
            <span class="priority-tag priority-medium">${n.category}</span>
            <span class="demo-pill-badge badge-student">Destino: ${n.target}</span>
          </div>
          <h3>${n.title}</h3>
          <p>${n.content}</p>
          <div class="card-footer" style="margin-top:auto;">
            <div>
              <span>Autor: <strong>${n.author}</strong></span>
              <span style="font-size:0.75rem; color:var(--color-text-muted); display:block;">Publicado em ${formatDatePtBR(n.publishedAt)}</span>
            </div>
            <button class="btn btn-secondary btn-sm btn-delete-item" data-type="comunicado" data-id="${n.id}" title="Excluir comunicado">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/></svg>
            </button>
          </div>
        </div>
      `).join("");
    }

    // 6. Eventos (Professor)
    dom.teacherEventsGrid.innerHTML = eventos.map(evt => {
      const parts = evt.date.split("-");
      const dia = parts[2] || "00";
      const mes = parts[1] ? ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"][parseInt(parts[1])-1] : "";
      return `
        <div class="agenda-card">
          <div class="agenda-date-block"><span class="agenda-day">${dia}</span><span class="agenda-month">${mes}</span></div>
          <div style="flex:1;">
            <div class="card-top-meta">
              <span class="priority-tag priority-low">${evt.category}</span>
              <span style="font-size:0.75rem; color:var(--color-text-muted);">${evt.time}</span>
            </div>
            <h3>${evt.title}</h3>
            <p>${evt.description}</p>
            <div class="card-footer" style="padding-top:6px; margin-top:6px;">
              <span>Local: <strong>${evt.location}</strong> &bull; Turmas: ${evt.classes}</span>
              <button class="btn btn-secondary btn-sm btn-delete-item" data-type="evento" data-id="${evt.id}" title="Excluir evento">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/></svg>
              </button>
            </div>
          </div>
        </div>`;
    }).join("");

    // 7. Turmas Vinculadas (Professor)
    dom.teacherClassesGrid.innerHTML = turmas.map(t => {
      const tarefasDestaTurma = tarefas.filter(item => item.classId === t.id);
      const evalsDestaTurma = avaliacoes.filter(item => item.classId === t.id);
      return `
        <div class="class-overview-card">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span class="demo-pill-badge badge-teacher">${t.sigla}</span>
            <span style="font-size:0.8rem; color:var(--color-text-muted);">${t.totalAlunos} estudantes</span>
          </div>
          <h3 style="font-size:1.15rem;">${t.nome}</h3>
          <p style="font-size:0.85rem; color:var(--color-text-secondary);">Período: ${t.periodo}</p>
          <div class="profile-details-grid" style="margin-top:auto; padding-top:12px; border-top:1px solid var(--color-border-subtle);">
            <div style="font-size:0.8rem;">Tarefas Ativas: <strong>${tarefasDestaTurma.length}</strong></div>
            <div style="font-size:0.8rem;">Avaliações: <strong>${evalsDestaTurma.length}</strong></div>
          </div>
        </div>`;
    }).join("");

    // Vincula exclusões com diálogo de confirmação
    document.querySelectorAll(".btn-delete-item").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = e.currentTarget.getAttribute("data-id");
        const type = e.currentTarget.getAttribute("data-type");
        promptDeleteConfirmation(type, id);
      });
    });
  }

  // Ouvintes de navegação do professor
  document.querySelectorAll("#teacherSidebar [data-teacher-view]").forEach(btn => {
    btn.addEventListener("click", () => switchTeacherView(btn.getAttribute("data-teacher-view")));
  });

  document.querySelectorAll("[data-teacher-jump]").forEach(btn => {
    btn.addEventListener("click", () => switchTeacherView(btn.getAttribute("data-teacher-jump")));
  });

  if (dom.teacherClassFilter) {
    dom.teacherClassFilter.addEventListener("change", (e) => {
      app.teacherSelectedClass = e.target.value;
      renderTeacherContent();
    });
  }

  if (dom.tTaskSearch) {
    dom.tTaskSearch.addEventListener("input", (e) => {
      app.teacherTaskSearch = e.target.value;
      renderTeacherContent();
    });
  }

  // Atalhos rápidos do Professor para modais
  const setupModalOpen = (btnId, modalEl) => {
    const el = document.getElementById(btnId);
    if (el) el.addEventListener("click", () => openModal(modalEl));
  };

  setupModalOpen("btnQuickCreateTask", dom.modalCreateTask);
  setupModalOpen("btnOpenModalTask", dom.modalCreateTask);
  setupModalOpen("btnQuickCreateEval", dom.modalCreateEval);
  setupModalOpen("btnOpenModalEval", dom.modalCreateEval);
  setupModalOpen("btnQuickCreateNotice", dom.modalCreateNotice);
  setupModalOpen("btnOpenModalNotice", dom.modalCreateNotice);
  setupModalOpen("btnOpenModalEvent", dom.modalCreateEvent);

  // ==========================================================================
  // 4. CADASTROS E EXCLUSÕES DO PROFESSOR (FORMULÁRIOS)
  // ==========================================================================

  function validateGenericForm(form) {
    let isValid = true;
    form.querySelectorAll("[required]").forEach(input => {
      const err = input.parentElement.querySelector(".field-error");
      if (!input.value.trim()) {
        isValid = false;
        input.classList.add("is-invalid");
        if (err) err.classList.add("active");
      } else {
        input.classList.remove("is-invalid");
        if (err) err.classList.remove("active");
      }
    });
    return isValid;
  }

  // Cadastro de Tarefa
  dom.formTeacherTask.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validateGenericForm(dom.formTeacherTask)) return;

    const tasks = CampusStorage.get(CAMPUS_STORAGE_KEYS.TAREFAS, []);
    const newTask = {
      id: "task-" + Date.now(),
      title: document.getElementById("taskTitle").value.trim(),
      subject: document.getElementById("taskSubject").value.trim(),
      classId: document.getElementById("taskClass").value,
      teacher: app.user.nome,
      publishedAt: new Date().toISOString().split("T")[0],
      dueDate: document.getElementById("taskDueDate").value,
      priority: document.getElementById("taskPriority").value,
      description: document.getElementById("taskDescription").value.trim(),
      status: "pending"
    };

    tasks.unshift(newTask);
    CampusStorage.set(CAMPUS_STORAGE_KEYS.TAREFAS, tasks);
    dom.formTeacherTask.reset();
    closeModal(dom.modalCreateTask);
    showToast("Tarefa cadastrada e disponibilizada para os alunos!");
    renderTeacherContent();
  });

  // Cadastro de Avaliação
  dom.formTeacherEval.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validateGenericForm(dom.formTeacherEval)) return;

    const evals = CampusStorage.get(CAMPUS_STORAGE_KEYS.AVALIACOES, []);
    const newEval = {
      id: "eval-" + Date.now(),
      title: document.getElementById("evalTitle").value.trim(),
      subject: document.getElementById("evalSubject").value.trim(),
      classId: document.getElementById("evalClass").value,
      teacher: app.user.nome,
      date: document.getElementById("evalDate").value,
      time: document.getElementById("evalTime").value.trim() || "07:30 - 09:10",
      format: document.getElementById("evalFormat").value,
      description: document.getElementById("evalDesc").value.trim(),
      status: "agendada"
    };

    evals.unshift(newEval);
    CampusStorage.set(CAMPUS_STORAGE_KEYS.AVALIACOES, evals);
    dom.formTeacherEval.reset();
    closeModal(dom.modalCreateEval);
    showToast("Avaliação agendada com sucesso!");
    renderTeacherContent();
  });

  // Cadastro de Comunicado
  dom.formTeacherNotice.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validateGenericForm(dom.formTeacherNotice)) return;

    const notices = CampusStorage.get(CAMPUS_STORAGE_KEYS.COMUNICADOS, []);
    const newNotice = {
      id: "comm-" + Date.now(),
      title: document.getElementById("noticeTitle").value.trim(),
      category: document.getElementById("noticeCategory").value,
      target: document.getElementById("noticeTarget").value,
      publishedAt: new Date().toISOString().split("T")[0],
      author: app.user.nome,
      content: document.getElementById("noticeContent").value.trim(),
      confirmedByCoordination: document.getElementById("noticeConfirmed").checked
    };

    notices.unshift(newNotice);
    CampusStorage.set(CAMPUS_STORAGE_KEYS.COMUNICADOS, notices);
    dom.formTeacherNotice.reset();
    closeModal(dom.modalCreateNotice);
    showToast("Comunicado publicado para os estudantes!");
    renderTeacherContent();
  });

  // Cadastro de Evento
  dom.formTeacherEvent.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validateGenericForm(dom.formTeacherEvent)) return;

    const events = CampusStorage.get(CAMPUS_STORAGE_KEYS.EVENTOS, []);
    const newEvent = {
      id: "evt-" + Date.now(),
      title: document.getElementById("eventTitle").value.trim(),
      date: document.getElementById("eventDate").value,
      time: document.getElementById("eventTime").value.trim() || "08:00 - 12:00",
      location: document.getElementById("eventLocation").value.trim() || "Auditório",
      category: document.getElementById("eventCategory").value,
      classes: document.getElementById("eventClasses").value.trim() || "Todas",
      description: document.getElementById("eventDesc").value.trim(),
      status: "Confirmado"
    };

    events.unshift(newEvent);
    CampusStorage.set(CAMPUS_STORAGE_KEYS.EVENTOS, events);
    dom.formTeacherEvent.reset();
    closeModal(dom.modalCreateEvent);
    showToast("Evento escolar adicionado à agenda!");
    renderTeacherContent();
  });

  // Diálogo de confirmação de exclusão
  function promptDeleteConfirmation(type, id) {
    app.pendingDelete = { type, id };
    dom.deleteModalTitle.textContent = `Confirmar Exclusão de ${type.charAt(0).toUpperCase() + type.slice(1)}`;
    dom.deleteModalMessage.textContent = `Tem certeza de que deseja excluir este(a) ${type}? Esta ação removerá o registro para todos os alunos e docentes.`;
    openModal(dom.modalConfirmDelete);
  }

  dom.btnConfirmDeleteAction.addEventListener("click", () => {
    if (!app.pendingDelete) return;
    const { type, id } = app.pendingDelete;

    if (type === "tarefa") {
      let items = CampusStorage.get(CAMPUS_STORAGE_KEYS.TAREFAS, []);
      items = items.filter(i => i.id !== id);
      CampusStorage.set(CAMPUS_STORAGE_KEYS.TAREFAS, items);
    } else if (type === "avaliação") {
      let items = CampusStorage.get(CAMPUS_STORAGE_KEYS.AVALIACOES, []);
      items = items.filter(i => i.id !== id);
      CampusStorage.set(CAMPUS_STORAGE_KEYS.AVALIACOES, items);
    } else if (type === "comunicado") {
      let items = CampusStorage.get(CAMPUS_STORAGE_KEYS.COMUNICADOS, []);
      items = items.filter(i => i.id !== id);
      CampusStorage.set(CAMPUS_STORAGE_KEYS.COMUNICADOS, items);
    } else if (type === "evento") {
      let items = CampusStorage.get(CAMPUS_STORAGE_KEYS.EVENTOS, []);
      items = items.filter(i => i.id !== id);
      CampusStorage.set(CAMPUS_STORAGE_KEYS.EVENTOS, items);
    }

    closeModal(dom.modalConfirmDelete);
    app.pendingDelete = null;
    showToast(`${type.charAt(0).toUpperCase() + type.slice(1)} excluído(a) com sucesso!`, "success");
    renderTeacherContent();
  });

  // Mobile Drawer Toggles
  document.querySelectorAll("[data-toggle-sidebar]").forEach(btn => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-toggle-sidebar");
      const sidebarEl = document.getElementById(targetId);
      if (sidebarEl) sidebarEl.classList.toggle("mobile-open");
    });
  });

  // Inicializa o roteador de sessão
  checkRouteSession();
});
