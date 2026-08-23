# Especificação normativa — Cadeia de evidências

## Regra de origem
**Evidência entregue por commit não é evidência.** O artefato oficial é publicado pelo próprio job de validação (artifact/attestation do pipeline), com origem autenticada pela plataforma de CI. Arquivos em `evidencias/` commitados por atores são registro consultivo.

## Conteúdo mínimo do artefato (Anel 1)
```json
{
  "portao": "integracao",
  "bloco": "bloco-auth",
  "commit": "<sha do commit avaliado>",
  "atores_hash": "<sha256 do conteúdo de atores/>",
  "ambiente": {"tipo": "ci-efemero", "workflow": "<arquivo>", "imagem_digest": "<sha256>"},
  "execucoes": [
    {"comando": "pytest -q", "exit_code": 0, "timestamp": "<ISO-8601>", "output_ref": "<artifact>"}
  ],
  "severidades": {"critica": 0, "alta": 0, "media": 0, "baixa": 1},
  "veredito": "APROVADO"
}
```

## Implementação de referência (Baseline)
O workflow `.github/workflows/portao-integracao.yml` publica, **pelo próprio job**:
`evidencia.json` (subconjunto mínimo do schema acima, com veredito derivado dos exit
codes reais + campo `regua_alterada` quando o PR toca `atores/` ou workflows),
`atores.hash` e os outputs brutos de testes, SAST e auditoria de dependências.
Contagem de severidades agregada e assinatura entram nos perfis Profissional+.

## Verificações do orquestrador (Anel 2)
Bloqueia a transição se: artefato ausente · exit code divergente · hash de commit não corresponde ao HEAD do PR · hash de atores/ não corresponde · origem não é o job de validação · ambiente não elegível (4 critérios do §17 do mestre).

## Testemunha externa e assinatura (Anel 3)
- **Baseline:** branch protection + status check obrigatório; o log do workflow é a testemunha.
- **Profissional:** + assinatura keyless (Sigstore/Cosign via OIDC do runner, ou GitHub artifact attestations — formato in-toto) + log de transparência (Rekor).
- **Fallback sem OIDC:** chave custodiada no cofre do pipeline (acesso exclusivo da identidade do job) + trilha append-only interna. Propriedade exigida: identidade de assinatura inacessível ao Executor + registro que sobrevive à reescrita do repositório.
- **Regulado:** + cofre WORM externo (object lock) para a trilha.

## Relatório de Conformidade dos Portões (§9.1)
Derivação determinística da trilha: toda release do período com seus três vereditos, hashes, assinaturas, pendências e aceites de risco. Nenhuma linha escrita por LLM.
