# RUNBOOK DE FAST-TRACK — [nome do projeto]

> Pré-autorização escrita do Operador (§7.1): resolve o incidente fora do horário
> sem esperar aprovação no ato. Sem este runbook preenchido e assinado, Fast-Track
> exige o Operador presente.

| Campo | Valor |
| --- | --- |
| Projeto | [nome] |
| Operador (autoriza) | [nome + contato] |
| Vigência | [data início] → [data revisão obrigatória] |

## 0. Regra imutável — Rollback primeiro
Reverter para a release atestada anterior é SEMPRE a ação padrão e não exige autorização:
retorna a um estado que já possui atestação válida. Com o Operador indisponível,
**rollback é a única ação permitida; hotfix novo espera** — exceto se autorizado abaixo.

## 1. O que aciona (condições pré-autorizadas)
Somente incidente em PRODUÇÃO com severidade classificada pelo Validador como:
- [ ] Crítica: [definir para o domínio — ex.: vazamento de dados, indisponibilidade total, cobrança errada]
- [ ] Alta: [definir — ex.: funcionalidade principal indisponível para >X% dos usuários]
[Qualquer coisa abaixo disso NÃO aciona Fast-Track — segue o Circuito de Correção normal.]

## 2. O que o hotfix PODE fazer sem o Operador presente
- Escopo máximo de diff: somente os componentes implicados no incidente ([listar áreas permitidas]).
- Proibido em qualquer hipótese: [ex.: alterar schema do banco, mexer em cobrança, tocar atores/ ou workflows].
- Diff fora do escopo ⇒ reprova automaticamente. A rota de emergência não transporta carga.

## 3. Portão compactado (nunca dispensado)
- [ ] Suíte crítica de regressão: [comando exato — ex.: `npm test -- --grep critico`]
- [ ] Scanner de segredos (gitleaks)
- [ ] Auditoria de dependências
- [ ] Diff integralmente escaneado (SAST no diff)
- [ ] Evidência publicada pelo job, como sempre

## 4. Dívida e retorno obrigatório
- Registrar Pendência no STATUS.md no ato, com o que foi compactado.
- Re-auditoria F5 INTEGRAL em no máximo: [prazo — ex.: 5 dias úteis].
- Fast-Track sem retorno agendado é violação do framework.

## 5. Telemetria anti-abuso
Todo acionamento incrementa `fast_tracks_no_periodo` em status/maquina.yaml.
[N] acionamentos em [período] ⇒ investigação obrigatória (incidente pode ser fabricado
para forçar a rota de portão menor).

## Assinatura
Autorizo os termos acima: ______________________ (Operador) · Data: ____-__-__
