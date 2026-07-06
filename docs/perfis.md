# Perfis de Conformidade — requisitos mínimos executáveis

O perfil é declarado em `status/maquina.yaml`. O orquestrador impõe o mínimo do perfil declarado; abaixo do mínimo, nenhum portão abre — comportamento definido, nunca interpretação.

## Baseline (vibe coder, projeto pessoal, MVP) — caminho de 30 minutos
Obrigatório: 4 atores instalados (`atores/`) · F0–F7 · branch protection na main com status check · CI executando o portão (ambiente efêmero elegível) · evidência publicada pelo job · rollback documentado · STATUS.md + `status/`.

## Profissional (equipes, SaaS, produto comercial)
Baseline + assinatura do veredito (keyless OIDC OU fallback por chave custodiada no pipeline) · log de transparência ou trilha append-only · acessibilidade obrigatória no portão para blocos UI · Fast-Track formalizado com SLA e runbook · Relatório de Conformidade dos Portões · dupla aprovação no retorno de Fast-Track.

## Regulado (financeiro, saúde, governo)
Profissional + cofre WORM externo para a trilha · SoD por identidade em infraestrutura (credencial de escrita na trilha pertence só ao pipeline de validação) · runners administrados por equipe segregada (critério 4 de ambiente elegível) · monitoramento de comportamento em produção com kill switch e rollback automático · mapeamento documental BACEN/SOX/ISO 27001/LGPD/LBI-WCAG.

## Regra de rebaixamento
Trocar o perfil declarado para baixo é decisão de negócio do Operador, registrada por escrito no STATUS.md com racional — nunca um efeito colateral silencioso.
