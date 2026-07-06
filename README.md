# ATESTO-FRAMEWORK

> **An attestation framework for AI-assisted development.**
> Desenvolvimento Verificado por Camadas.

## Em 30 segundos

Ferramentas de IA escrevem código que compila, roda e parece profissional — e quase metade carrega vulnerabilidades clássicas. O problema não é a IA errar de forma grosseira: é errar de forma **plausível**. O ATESTO é uma disciplina de fronteira epistêmica: **quem raciocina nunca afirma o que pode verificar; quem executa nunca decide direção sozinho; quem valida só aprova o que executou de verdade — em ambiente que o auditado não administra — e nunca toca no que aprova.**

Quatro atores. Uma máquina de estados (F0–F7). Três portões. Uma cadeia de evidências assinada que torna a "aprovação alucinada" estruturalmente impossível.

## O que o ATESTO NÃO é

- Não é mais um framework de "spec antes de código" — isso o mercado já resolveu.
- Não é um scanner — ele **orquestra** os scanners que já existem.
- Não promete que a IA não erra. Prova que, quando errar, o erro **trava num portão** antes de atingir o mundo real.

## Os quatro atores

| Ator | Regra brutal |
| --- | --- |
| **Operador** (negócio, soberano) | Nunca decide comandos técnicos. |
| **Raciocínio** (direção) | Nunca afirma o que pode verificar. |
| **Executor** (mãos + sensor) | Nunca decide direção sozinho. |
| **Validador** (veto técnico) | Só aprova o que executou; nunca toca no que aprova. |

## Comece aqui

1. Leia o [DOCUMENTO-MESTRE.md](DOCUMENTO-MESTRE.md) — a constituição (15 min).
2. Siga o guia da sua ferramenta: [Claude Code](guias/claude-code.md) ou [VS Code](guias/vs-code.md) — primeiro portão em ~30 minutos (perfil Baseline).
3. Perfis de conformidade (Baseline → Profissional → Regulado): [docs/perfis.md](docs/perfis.md).

## Estrutura

```
DOCUMENTO-MESTRE.md   constituição do ecossistema
atores/               definições versionadas dos 4 atores (hash entra na evidência)
docs/                 especificações normativas (portões, evidências, perfis)
templates/            STATUS.md, status/, veredito, evidências
guias/                adoção prática (Claude Code, VS Code)
.github/workflows/    portão de integração de exemplo (Baseline)
```

## Status e contribuição

Versão 0.3 — primeira publicação, após duas rodadas de auditoria adversarial externa (10 achados triados; changelog no documento-mestre). Críticas são bem-vindas **no formato do próprio método**: abra uma Issue citando a seção exata, o cenário concreto de falha e como reproduzi-lo. Achados sem cenário reproduzível serão fechados com referência ao antipadrão *Crítica não verificada*.

## Licença

MIT — use, adapte, critique.
