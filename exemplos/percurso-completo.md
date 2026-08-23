# Percurso completo — um projeto real atravessando F0→F7

Exemplo condensado e concreto: **"Agenda Pet"** — dona de um pet shop (Operadora, zero
conhecimento técnico) quer que clientes agendem banho e tosca online. Cada fase mostra
o artefato real que ela veria. Use como gabarito do que "seguir o método" significa.

---

## F0 — Triagem

**Raciocínio entrevista** (trechos): "Quantos agendamentos por semana hoje, por telefone?"
(~40) · "O que acontece quando dois clientes querem o mesmo horário?" (confusão no caderno)
· "Você precisa receber pagamento online já na v1?" (não — pagar na loja).
**Pesquisa de mercado:** agendadores prontos existem (Calendly etc.), mas nenhum com
regras de porte do animal por horário — o diferencial dela. **Operadora decide: vale construir.** → F1

## F1 — Planejamento

Stack proposta com alternativas comparadas (a ponte, não só a balsa): Next.js + SQLite
vs. WordPress+plugin vs. no-code. Justificativa registrada; premissas frágeis declaradas:
```
⚠️ Premissa mais frágil: SQLite aguenta a concorrência de escrita de ~40 agendamentos/semana
   — será verificada por POC no Portão de Arquitetura, não assumida.
```
Operadora exerce veto de negócio sobre custo de hospedagem. → F2

## F2 — Portão de Arquitetura (Validador)

Execução real, não opinião: POC de 30 linhas grava 200 agendamentos concorrentes em
SQLite (roda em CI, exit code 0) · versões de Next.js e dependências centrais verificadas
vivas · CVEs da stack consultados: nenhum bloqueante. **Veredito: APROVADO**, evidência
no artifact do job. → F3

## F3 — Setup Assistido

A Operadora, guiada passo a passo ([guia do zero absoluto](../guias/f3-do-zero-absoluto.md)):
cria conta GitHub, instala Git/Node/Claude Code, cria o repositório `agenda-pet`, ativa a
branch protection. O Executor instala `atores/`, `status/`, workflows. **As chaves são dela;
a mecânica é dele.** Checkpoint de compreensão: cada output real conferido contra o esperado. → F4

## F4 — Desenvolvimento por blocos

Blocos definidos pelo Raciocínio: `bloco/agenda` → `bloco/cadastro-cliente` → `bloco/painel-admin`.

**F4a — spec do bloco/agenda** (template [spec-bloco.md](../templates/spec-bloco.md), trechos):
```
Objetivo único: cliente escolhe serviço + horário livre e confirma agendamento.
Critério de sucesso (vira teste ANTES do código):
- [ ] POST /agendamentos em horário livre retorna 201
- [ ] POST /agendamentos em horário ocupado retorna 409 (nunca duplo agendamento)
- [ ] horário fora do expediente retorna 422
Abuso considerado (A04): máx. 3 agendamentos futuros por telefone (evita bloqueio
de agenda por troll); confirmação expira em 24h sem comparecimento marcado.
Limites: não tocar em .github/, atores/, nem criar tela de admin (é outro bloco).
```

**F4b — Executor implementa** no branch `bloco/agenda`. Output real (formato obrigatório):
```
## Executado
Rotas e modelo criados; 11 testes escritos a partir do critério; suíte verde local (pré-veredito).

## Visão Complementar
O horário de verão pode deslocar slots: new Date() no servidor usa UTC e a loja usa
America/Sao_Paulo. Recomendo fixar o fuso na configuração — muda a decisão de design.
```
A Visão Complementar volta ao Raciocínio, que ajusta a spec (fuso fixado). **O Executor
reportou; não decidiu** — é assim que a fronteira funciona.

**F4c — Portão de Integração.** PR aberto pelo Executor; o job roda: testes, gitleaks,
Semgrep, auditoria. **1ª execução: REPROVADO** — Semgrep aponta SQL por concatenação
em `busca de horários` (A03). Circuito de Correção: Validador entrega o FATO (arquivo,
linha, regra) → Raciocínio gera prompt de correção pequeno (query parametrizada) →
Executor corrige no branch → portão re-executa: **APROVADO**. Evidência publicada;
Operadora clica **Merge**. Próximo bloco.

## Ritual 3 — Encerramento em Duas Mãos (fim de cada sessão)

Mão 1 (Executor, fatos): arquivos alterados, commit, suíte verde, pendências técnicas.
Mão 2 (Raciocínio, contexto): decisão do fuso registrada, risco do bloco admin, próximo
passo único recomendado. STATUS.md commitado — a próxima sessão retoma sem perguntas.

## F5 — Portão de Publicação

Operadora aciona o workflow `atesto-portao-publicacao` (Actions → Run workflow).
Job executa: suíte completa, gitleaks no histórico, Semgrep ampliado, auditoria.
Raciocínio percorre o resíduo manual do [checklist OWASP](../docs/checklist-owasp.md)
(A04/A05/A09) via prompts exploratórios. Resultado: 1 achado BAIXO (header CSP ausente
em página estática). Operadora decide: aceitar por 30 dias com o
[aceite formal](../templates/aceite-de-risco.md) preenchido no STATUS.md. Nada atravessa
em silêncio. **APROVADO.** → F6

## F6 — Publicação

[Rollback documentado E testado](../templates/rollback.md) antes do deploy (pré-condição
de F7): reverter para a tag anterior foi executado de verdade uma vez, output conferido.
Decisão final de negócio: Operadora autoriza. Tag `v1.0.0` criada; Executor faz o deploy. → F7

## F7 — Operação (regime permanente)

- `atesto-reauditoria` roda toda segunda. Três semanas depois: **run vermelho** — CVE
  novo (severidade média) numa dependência do Next.js. Entra pelo Circuito de Correção:
  bump de versão via prompt, portão, merge. Sem pânico e sem silêncio.
- Incidente hipotético crítico (agenda fora do ar): [runbook de Fast-Track](../templates/runbook-fast-track.md)
  pré-autorizado manda **rollback primeiro** para `v1.0.0`; hotfix depois, com portão
  compactado e re-auditoria F5 integral em 5 dias úteis.

---

## O que este percurso demonstra

1. Nenhuma afirmação atravessou fronteira sem execução (a premissa do SQLite virou POC;
   o "passou" virou artifact).
2. O erro plausível travou no portão (SQL injection reprovada ANTES da main), e a correção
   seguiu o circuito — o Validador nunca tocou no código.
3. A Operadora nunca digitou um comando técnico de decisão própria — e tomou TODAS as
   decisões que importam: construir, vetar custo, aceitar risco por escrito, publicar, e
   cada clique de Merge.
