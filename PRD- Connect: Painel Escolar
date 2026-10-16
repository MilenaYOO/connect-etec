# PRD — Painel Digital Escolar

**Projeto:** `tec_projeto_cronograma_escolar`  
**Disciplina:** Desenvolvimento de Sistemas  
**Equipe:** Milena Bispo, Talita Gonçalves e Ebert Torquato  
**Tecnologias previstas:** HTML, CSS, JavaScript, Git e GitHub

## 1. Visão geral e objetivo

O Painel Digital Escolar é uma plataforma digital que centraliza horários de aulas, tarefas, trabalhos, eventos e avisos, facilitando a organização e a comunicação entre alunos, professores e escola.

**Objetivo geral:** desenvolver um sistema acessível, organizado e colaborativo que permita consultar e atualizar informações escolares em um único ambiente.

**Objetivos específicos:**
- Facilitar a consulta aos horários das aulas.
- Organizar tarefas, avaliações e eventos.
- Melhorar a comunicação entre professores e alunos.
- Reduzir a dispersão de informações em diferentes canais.

## 2. Público-alvo

- **Alunos:** consultar horários, tarefas, avaliações e comunicados.
- **Professores:** atualizar cronogramas, registrar atividades e publicar avisos.
- **Coordenação escolar:** acompanhar comunicados e eventos escolares.

## 3. Escopo do projeto

### 3.1. Funcionalidades dentro do escopo

- Exibição dos horários de aulas por turma.
- Identificação das matérias e dos professores.
- Cadastro e consulta de tarefas, trabalhos e avaliações.
- Publicação de avisos, eventos e alterações de horários.
- Edição das informações por professores e usuários autorizados.
- Interface responsiva para computadores e celulares.

### 3.2. Funcionalidades fora do escopo inicial

- Aplicativo nativo para Android ou iOS.
- Integração automática com sistemas oficiais da escola.
- Envio automático de notificações por SMS ou WhatsApp.
- Realização de provas e atividades diretamente na plataforma.

Essas funcionalidades poderão ser consideradas em versões futuras.

## 4. Requisitos funcionais

Os requisitos funcionais descrevem o que o sistema deverá fazer.

| Código | Requisito funcional |
|---|---|
| RF01 | O sistema deve permitir visualizar os horários de aulas por turma. |
| RF02 | O sistema deve exibir a matéria, o professor e o horário de cada aula. |
| RF03 | O sistema deve permitir cadastrar, consultar e atualizar tarefas e trabalhos. |
| RF04 | O sistema deve permitir registrar datas de avaliações e prazos de entrega. |
| RF05 | O sistema deve permitir publicar e consultar avisos escolares. |
| RF06 | O sistema deve permitir divulgar eventos, palestras, passeios e alterações de horário. |
| RF07 | O sistema deve permitir informar a ausência de professores e, quando disponível, apresentar alterações nas aulas. |
| RF08 | O sistema deve permitir que professores autorizados editem as informações escolares. |
| RF09 | O sistema deve permitir filtrar informações por turma, data ou categoria. |
| RF10 | O sistema deve permitir consultar as informações em computadores e dispositivos móveis. |

**Observação:** o cadastro de usuários, o login e as permissões implementadas tecnicamente deverão ser desenvolvidos antes de disponibilizar dados restritos em um ambiente real. Essas funções estão previstas como evolução do projeto.

## 5. Requisitos não funcionais

Os requisitos não funcionais definem como o sistema deverá funcionar.

| Categoria | Código | Requisito |
|---|---|---|
| Desempenho | RNF01 | As páginas principais deverão carregar em até 3 segundos em condições normais de conexão e uso. |
| Segurança | RNF02 | As funções de edição deverão ser protegidas por autenticação e controle de permissões. |
| Segurança | RNF03 | O sistema deverá validar os dados recebidos para evitar informações inválidas e alterações não autorizadas. |
| Usabilidade | RNF04 | A interface deverá ser simples, organizada e compreensível para os usuários. |
| Usabilidade | RNF05 | O painel deverá se adaptar a computadores, tablets e celulares. |
| Acessibilidade | RNF06 | A interface deverá utilizar contraste adequado, textos legíveis, navegação por teclado e identificação clara dos campos. |
| Confiabilidade | RNF07 | As alterações realizadas deverão ser apresentadas de forma consistente, evitando perda de informações. |
| Manutenção | RNF08 | O código deverá ser organizado para facilitar correções e futuras melhorias. |
| LGPD | RNF09 | A coleta de dados pessoais deverá ser limitada ao necessário para o funcionamento do sistema. |
| LGPD | RNF10 | O acesso a dados pessoais deverá ser restrito a pessoas autorizadas. |
| LGPD | RNF11 | O sistema deverá prever medidas de proteção, retenção adequada e tratamento seguro dos dados pessoais. |

As metas de desempenho deverão ser verificadas durante os testes. A aplicação real também precisará de armazenamento persistente, cópias de segurança e controles de acesso adequados.

## 6. Regras de negócio

As regras de negócio determinam como as funcionalidades deverão operar.

- **RN01 — Organização por turma:** cada turma deverá possuir seu próprio cronograma, suas atividades e seus comunicados.
- **RN02 — Horários:** cada aula deverá apresentar matéria, professor, dia e horário.
- **RN03 — Atualização de informações:** somente usuários autorizados poderão modificar os dados escolares.
- **RN05 — Responsabilidade dos professores:** os professores serão responsáveis pelas informações acadêmicas que publicarem.
- **RN06 — Avisos de ausência:** a informação sobre a falta de um professor deverá ser identificada como confirmada apenas quando validada por uma fonte autorizada.
- **RN07 — Privacidade:** dados pessoais não poderão ser exibidos publicamente sem autorização e fundamento adequado.
- **RN08 — Histórico:** alterações relevantes deverão permitir identificar o que foi modificado e quando, conforme as permissões e a política de retenção da escola.
- **RN09 — Exclusão e correção:** informações incorretas deverão poder ser corrigidas ou removidas por usuários autorizados, respeitando as obrigações de conservação aplicáveis.

## 7. Fluxos principais

### 7.1. Fluxo 1 — Consultar o cronograma

1. Acessar o painel.
2. Selecionar a turma e o dia.
3. Visualizar matérias, professores e horários.

### 7.2. Fluxo 2 — Publicar uma tarefa

1. O professor acessa sua área.
2. Preenche título, descrição, turma e prazo.
3. O sistema valida os dados.
4. A tarefa é publicada para a turma selecionada.

### 7.3. Fluxo 3 — Publicar um comunicado

1. O professor ou usuário autorizado acessa a área de comunicados.
2. Informa o título, o conteúdo, a turma e a data, quando aplicável.
3. O sistema verifica se os campos obrigatórios estão preenchidos.
4. O comunicado é publicado para o público selecionado.
5. Os usuários consultam o aviso no painel.

## 8. Critérios de aceitação

O projeto será considerado funcional quando atender aos seguintes critérios:

| ID | Critério de aceitação | Resultado esperado |
|---|---|---|
| CA01 | Consultar horários de uma turma | Os horários e as matérias são exibidos corretamente. |
| CA02 | Consultar professores | Cada aula apresenta o professor correspondente, quando cadastrado. |
| CA03 | Cadastrar uma tarefa | A tarefa aparece para a turma selecionada, com seu prazo. |
| CA04 | Publicar um aviso | O comunicado fica visível ao público definido. |
| CA05 | Informar campos obrigatórios vazios | O sistema informa o erro e impede o cadastro incompleto. |
| CA06 | Tentar editar sem permissão | O sistema bloqueia a alteração. |
| CA07 | Acessar por celular | O conteúdo continua legível e os controles utilizáveis. |
| CA08 | Navegar por teclado | As principais funções podem ser acessadas sem depender exclusivamente do mouse. |
| CA09 | Proteger dados pessoais | Informações restritas não ficam disponíveis a usuários sem autorização. |
| CA10 | Atualizar informações | As alterações são refletidas corretamente no painel. |

## 9. Priorização do MVP e riscos

### 9.1. Priorização das funcionalidades

O MVP (*Produto Mínimo Viável*) é a primeira versão funcional do sistema, com as funcionalidades essenciais para validar a proposta.

| Prioridade | Funcionalidade | Justificativa |
|---|---|---|
| P0 — Essencial | Visualização do cronograma de aulas | Principal objetivo do projeto. |
| P0 — Essencial | Consulta de matérias, professores e horários | Permite compreender a rotina escolar. |
| P0 — Essencial | Cadastro e consulta de tarefas e trabalhos | Facilita a organização dos estudos. |
| P0 — Essencial | Publicação e consulta de avisos | Centraliza informações importantes. |
| P0 — Essencial | Interface responsiva e acessível | Permite o uso em diferentes dispositivos. |
| P1 — Importante | Login e controle de permissões | Protege as funções de edição e os dados restritos. |
| P1 — Importante | Cadastro de eventos e alterações de horários | Amplia a comunicação escolar. |
| P2 — Futuro | Notificações automáticas | Facilita o acompanhamento de novidades. |
| P2 — Futuro | Envio de arquivos e integração com calendário | Amplia os recursos da plataforma. |
| P2 — Futuro | Aplicativo mobile e relatórios automáticos avançados | Expande o acesso e as possibilidades de análise. |

**Observação:** o controle de acesso é obrigatório antes de disponibilizar a edição e os dados restritos em produção, mesmo que sua implementação completa não faça parte do primeiro protótipo visual.

### 9.2. Principais riscos

| Risco | Impacto | Medida preventiva |
|---|---|---|
| Informações escolares incorretas | Alunos podem perder prazos ou receber avisos errados. | Definir responsáveis pela publicação e correção. |
| Acesso não autorizado | Exposição ou alteração indevida de informações. | Implementar autenticação, permissões e validação no servidor. |
| Exposição de dados pessoais | Violação de privacidade e da LGPD. | Limitar a coleta e restringir o acesso aos dados. |
| Falta de atualização | Horários e tarefas podem ficar desatualizados. | Definir responsáveis e incentivar revisões periódicas. |
| Problemas de compatibilidade | O sistema pode não funcionar adequadamente em alguns dispositivos. | Realizar testes em diferentes navegadores e tamanhos de tela. |
| Perda de informações | Cadastros e alterações podem desaparecer. | Utilizar armazenamento persistente e cópias de segurança. |
| Atrasos no desenvolvimento | A equipe pode não concluir todas as funcionalidades. | Priorizar o MVP e dividir as tarefas entre os integrantes. |

### 9.3. Resultado esperado

Ao final do desenvolvimento, espera-se que o Painel Digital Escolar ofereça um ambiente centralizado, intuitivo e acessível para a consulta de horários, tarefas, avaliações, eventos e comunicados escolares, com proteção dos dados pessoais e possibilidade de expansão futura.

### 9.4. Tecnologias e ferramentas

- **HTML:** estrutura das páginas.
- **CSS:** aparência, organização visual e adaptação a diferentes telas.
- **JavaScript:** interatividade, filtros e validações.
- **Git:** controle de versões do código.
- **GitHub:** armazenamento e colaboração no desenvolvimento.

A utilização de banco de dados e de uma estrutura de servidor poderá ser incorporada para permitir o armazenamento permanente das informações, o login e o controle seguro das permissões.

---

## Conclusão

Este documento define os requisitos, as regras de negócio, os fluxos, os critérios de aceitação e as prioridades do Painel Digital Escolar. Ele servirá como referência para orientar o desenvolvimento, organizar as tarefas da equipe e verificar se a solução atende às necessidades de alunos e professores.
