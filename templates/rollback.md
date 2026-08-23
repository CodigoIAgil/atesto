# ROLLBACK DOCUMENTADO E TESTADO — [nome do projeto]

> Pré-condição de F7 (§5): a release anterior atestada é o botão de voltar.
> "Documentado" sem "testado" não conta: o teste de rollback é executado de verdade
> antes da primeira publicação e re-validado quando o procedimento mudar.

| Campo | Valor |
| --- | --- |
| Release atual | [tag — ex.: v1.2.0] |
| Release anterior atestada (destino do rollback) | [tag — ex.: v1.1.3] |
| Último teste real deste procedimento | [data + quem executou + ref da evidência] |

## Procedimento (comando completo + output esperado — regra do Modo Mentor)
```bash
# 1. [ex.: reverter o deploy para a tag anterior]
[comando exato da sua plataforma]
# Esperado: [output literal]

# 2. [ex.: verificar a versão em produção]
[comando de verificação — ex.: curl -s https://sua-app/health]
# Esperado: [ex.: {"version":"v1.1.3","status":"ok"}]
```

## Dados e migrations
[O ponto que mais quebra rollbacks: a release atual mudou o banco?]
- Migrations da release atual são reversíveis? [sim/não — se não, qual o plano]
- Comando de reversão de migration + output esperado: [ou "N/A — sem mudança de schema"]

## Critério de "rollback concluído"
- [ ] [verificação objetiva 1 — ex.: health check retorna a versão anterior]
- [ ] [verificação objetiva 2 — ex.: fluxo principal executado com sucesso]
- [ ] Incidente registrado no STATUS.md como primeiro item da pauta

## Teste de rollback (obrigatório antes de F6)
Executado em [ambiente], em [data], por [Executor, via prompt de quem].
Evidência: [ref do output/artifact].
