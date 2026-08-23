# Especificação normativa — Os três portões

Portão = checkpoint operado pelo Validador. O fluxo só continua com atestação (veredito + artefato de evidência com origem autenticada). F7 é o regime em que o Portão de Publicação se repete no tempo.

## Portão de Arquitetura (F2)
- [ ] Toda dependência central: versão viva, manutenção ativa (verificado por execução, não por memória)
- [ ] CVEs conhecidos da stack consultados; nenhum bloqueante sem plano
- [ ] Viabilidade demonstrada por execução (POC mínima roda)
- [ ] Premissas frágeis do planejamento verificadas ou convertidas em exploração

## Portão de Integração (F4, por bloco — Ritual 4)
- [ ] Testes unitários do bloco: 100% da suíte passando em ambiente efêmero elegível
- [ ] Testes de contrato com TODOS os blocos já validados dos quais depende ou que dependem dele
- [ ] Scanner de segredos: zero achados
- [ ] SAST no diff do bloco (ex.: Semgrep, config `p/ci`): zero achados não triados
- [ ] Auditoria de dependências: sem severidade média+
- [ ] Blocos com UI (perfil Profissional+): varredura axe-core/Pa11y sem violações detectáveis
- [ ] Evidência publicada pelo job; hashes (commit + atores/) registrados

Aprovado ⇒ merge na main (branch protection + status check). Reprovado ⇒ Circuito de Correção.

## Portão de Publicação (F5)
Tudo do Portão de Integração sobre o produto completo, mais:
- [ ] SAST completo (ex.: Semgrep) sem média+
- [ ] Checklist OWASP Top 10 percorrido e evidenciado
- [ ] Pendências de Segurança (baixas): corrigidas OU aceite formal do Operador por escrito no STATUS.md
- [ ] Rollback documentado e testado (pré-condição de F7)
- [ ] Tag de release criada (assinada, conforme perfil)

## Fast-Track (§7.1 do mestre)
Rollback-first · aciona só crítico/alto em produção · autorização do Operador (no ato ou runbook) · portão compactado nunca dispensado · escopo mínimo de diff integralmente escaneado · telemetria de recorrência · re-auditoria F5 integral no prazo.
