# CAMPUS — Painel Digital Escolar
### *Atualização: Autenticação & Interfaces Exclusivas de Aluno e Professor*

**Projeto Acadêmico:** `tec_projeto_cronograma_escolar`  
**Disciplina:** Desenvolvimento de Sistemas  
**Equipe:** Milena Bispo, Talita Gonçalves e Ebert Torquato  
**Tecnologias:** HTML5 Semântico, CSS3 Moderno, JavaScript ES6+, Git e GitHub  
**Identidade Visual:** Dark Purple Editorial (`#0B0A0D` / `#341539`)

---

## 📌 1. Visão Geral da Atualização

Esta atualização implementa um **sistema completo de autenticação e segregação de perfis**, criando duas experiências completamente distintas:

1. **Página de Login Institucional:** Autenticação baseada em credenciais, sem seleção manual de perfil (o tipo de usuário é identificado automaticamente pelos dados da conta). Inclui recurso de mostrar/ocultar senha, indicador de processamento, recuperação de senha e atalhos rápidos de teste para a banca avaliadora.
2. **Interface Exclusiva do Aluno:** Focada em consulta, organização e acompanhamento da rotina escolar da própria turma, sem botões administrativos ou ferramentas de edição.
3. **Interface Exclusiva do Professor:** Painel de controle docente com recursos para cadastrar, editar e excluir tarefas, avaliações, comunicados e eventos, além de gerenciar turmas vinculadas e horários.

---

## 🔑 2. Credenciais de Demonstração (Para Testes)

O sistema possui contas pré-configuradas para demonstração acadêmica imediata:

| Perfil | Nome do Usuário | E-mail Institucional / Login | Senha de Teste | Turma / Função |
|---|---|---|---|---|
| **🎓 Aluno** | Gabriel Silva | `aluno@etec.sp.gov.br` | `aluno123` | 2º DS (M-Tec) |
| **🎓 Aluna** | Mariana Souza | `mariana@etec.sp.gov.br` | `aluno123` | 1º DS (M-Tec) |
| **👨‍🏫 Professor** | Prof. Fernando Santos | `professor@etec.sp.gov.br` | `prof123` | Docente (DS / Web / Mobile) |
| **👩‍🏫 Professora** | Profª. Juliana Martins | `juliana@etec.sp.gov.br` | `prof123` | Docente (Banco de Dados) |

> **Dica para Apresentação:** Na tela de login, você pode clicar nos botões de atalho **"Gabriel Silva (Aluno)"** ou **"Prof. Fernando Santos (Professor)"** para preencher automaticamente as credenciais e testar o fluxo com 1 clique.

---

## 🎓 3. Interface do Aluno

Após o login do estudante, o sistema redireciona automaticamente para a área do aluno:

### Menu e Funcionalidades (8 Seções):
1. **Início:** Saudação com horário, resumo do dia, indicadores em tempo real (*Próxima aula*, *Tarefas pendentes*, *Próxima avaliação*, *Avisos recentes*), timeline de hoje com intervalos e trabalhos com prazos próximos.
2. **Meu cronograma:** Grade de horários da turma do aluno organizada por dia da semana (Segunda a Sexta), exibindo matéria, professor, sala e status de eventuais alterações.
3. **Tarefas e trabalhos:** Listagem de atividades da turma com busca, filtros de status (*Pendentes*, *Concluídas*, *Atrasadas* calculadas dinamicamente) e checkbox para o estudante marcar entregas feitas.
4. **Avaliações:** Calendário de provas práticas, teóricas e bancas avaliadoras.
5. **Avisos:** Comunicados publicados pelos professores e escola, com carimbo de confirmação da coordenação (RN06).
6. **Eventos:** Agenda escolar com palestras, feiras tecnológicas (FETEPS) e visitas técnicas.
7. **Meu perfil:** Dados do estudante (nome, RM, turma, e-mail institucional, período).
8. **Sair:** Encerra a sessão com segurança e retorna à tela de login.

> **Regra de Segurança do Aluno:** A interface do estudante **não exibe** ferramentas de cadastro, edição ou botões de exclusão. Toda a área é estritamente voltada para consulta e acompanhamento.

---

## 👨‍🏫 4. Interface do Professor

Após o login docente, o sistema redireciona automaticamente para o painel de gerenciamento:

### Menu e Funcionalidades (9 Seções):
1. **Início:** Dashboard docente com resumo estatístico (quantidade de tarefas criadas, avaliações agendadas, próxima aula do professor, comunicados recentes) e atalhos rápidos de criação.
2. **Meus horários:** Grade semanal de aulas ministradas pelo professor em suas turmas.
3. **Gerenciar tarefas:** Cadastro completo com título, descrição, matéria, turma destinatária e prazo de entrega; botão de exclusão com modal de confirmação.
4. **Gerenciar avaliações:** Agendamento de provas com formato, data, horário e descrição detalhada.
5. **Gerenciar avisos:** Publicação de comunicados para turmas específicas ou para toda a escola.
6. **Eventos:** Cadastro e acompanhamento de atividades no calendário escolar.
7. **Turmas:** Visualização analítica das turmas vinculadas (1º DS, 2º DS e 3º DS) com total de estudantes e tarefas ativas.
8. **Meu perfil:** Informações funcionais (matrícula funcional, disciplinas e turmas atendidas).
9. **Sair:** Encerra a sessão e retorna ao login.

---

## 🔄 5. Sincronização em Tempo Real entre Perfis

Qualquer tarefa, avaliação ou comunicado cadastrado pelo professor é imediatamente salvo na camada de persistência (`CampusStorage`) e passa a ficar visível instantaneamente na tela dos alunos da turma selecionada!

---

## 🔒 6. Regras de Acesso e Segurança (RNF02, CA06, LGPD)

- **Identificação Automática:** O perfil não é escolhido por menu suspenso ou campo editável; ele é determinado exclusivamente pelo registro autenticado.
- **Proteção de Rotas:** O sistema verifica se existe uma sessão válida ativa no início de cada execução. Usuários não autenticados são impedidos de visualizar o painel escolar.
- **Logout Completo:** O botão de saída remove a sessão e impede que páginas restritas continuem abertas no histórico.
- **Validação de Formulários:** Todos os formulários possuem checagem de campos obrigatórios (`required`) e exibem avisos claros caso estejam incompletos.
- **Limitações de Produção:** Conforme documentado para a banca, em um ambiente real de produção escolar, a autenticação deve ser complementada por:
  - Backend seguro (Node.js, Python ou Java).
  - Tokens criptográficos JWT / OAuth2 com expiração e rotação de chaves.
  - Hashing seguro de senhas no servidor (bcrypt / argon2).
  - Autorização baseada em papéis (RBAC) validada diretamente no servidor e banco de dados relacional.

---

## 📂 7. Estrutura de Arquivos

```text
connect-etec-main/
│
├── index.html               # Aplicação completa com tela de login, interface de aluno e de professor
├── README.md                # Documentação técnica atualizada e credenciais de teste
│
├── database/
│   ├── modelagem_banco_de_dados.md   # Dicionário de dados, DER, 3FN e consultas SQL
│   └── modelagem_banco_de_dados.sql  # Script DDL executável com tabelas, chaves e seed data
│
├── css/
│   ├── variables.css        # Variáveis globais (#0B0A0D, #341539, etc.)
│   └── style.css            # Estilos de login, painel do aluno, painel do docente e responsividade
│
└── js/
    ├── data.js              # Mock de usuários (alunos e professores), turmas, horários e tarefas
    ├── storage.js           # Gerenciador de sessão, autenticação e LocalStorage
    └── app.js               # Controlador de login, roteamento, permissões e renderização
```

---

## 🚀 8. Como Executar

1. Abra o arquivo [`index.html`](file:///c:/Users/Aluno/Downloads/connect-etec-main/index.html) diretamente em qualquer navegador moderno (Google Chrome, Microsoft Edge, Firefox, Safari).
2. Na tela de login, clique em um dos botões de preenchimento rápido (ou digite as credenciais da tabela) e clique em **"Entrar no Painel"**.
3. Navegue pelos menus do aluno ou do professor para testar a experiência de cada perfil.
4. Para alternar de usuário, clique no botão **"Sair"** no topo ou na barra lateral.
