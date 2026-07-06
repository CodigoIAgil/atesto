# Guia de adoção — ATESTO no VS Code

**Cenário:** você opera dentro do VS Code (Windows 11, macOS ou Linux) usando o terminal integrado — com a extensão do Claude Code, ou com qualquer assistente de IA de sua escolha atuando como Executor. O método é idêntico ao do guia de Claude Code; este guia cobre o que muda na interface.

Regra do Modo Mentor mantida: **nenhum passo sem comando completo e output esperado.**

## Etapa 0 — Pré-requisitos

- VS Code instalado + extensões: **GitHub Pull Requests** (para PR sem sair do editor) e a extensão do seu assistente (ex.: Claude Code).
- `git --version` no terminal integrado (Ctrl+`): esperado 2.30+.

## Etapa 1 — Instalar o método

Igual à Etapa 1 do guia Claude Code (copiar `atores/`, `templates/`, workflow). No VS Code, o Explorer deve exibir: `atores/`, `status/`, `STATUS.md`, `.github/workflows/portao-integracao.yml`.

## Etapa 2 — Fixar o papel do assistente

Se usa Claude Code na extensão: o `CLAUDE.md` da raiz (mesmo conteúdo do guia principal) é lido automaticamente.
Se usa outro assistente: cole o conteúdo de `atores/executor.md` como instrução de sistema/regras do workspace e exija o formato "Executado / Visão Complementar" em toda resposta. Critério objetivo: peça uma tarefa trivial e confira as duas seções no output.

## Etapa 3 — Pré-veredito com um clique (opcional, recomendado)

Crie `.vscode/tasks.json`:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "ATESTO: pré-veredito local",
      "type": "shell",
      "command": "npm test || pytest -q",
      "problemMatcher": [],
      "group": { "kind": "test", "isDefault": true }
    }
  ]
}
```

`Ctrl+Shift+P → Run Task → ATESTO: pré-veredito local`. Esperado: suíte verde. Lembre: isto é consultivo — atestação só no CI.

## Etapa 4 — Fluxo do bloco dentro do editor

1. Source Control (Ctrl+Shift+G) → branch `bloco/nome` (canto inferior esquerdo → Create new branch).
2. Prompt da camada de Raciocínio → assistente implementa → você revisa o diff no Source Control (o diff é o seu poder de veto visual).
3. Commits pequenos e frequentes no branch (commit é livre).
4. Extensão GitHub PR: **Create Pull Request** → acompanhe o check `atesto-portao-integracao` na aba do PR.
   - Verde: Merge habilitado.
   - Vermelho: abra o log do check, copie o FATO da falha, leve ao Raciocínio → prompt de correção → aplique → push → o portão re-executa.
5. Encerramento em Duas Mãos: Mão 1 pelo assistente no editor; Mão 2 no Claude.ai; commit do STATUS.md.

## Checklist de validação
O mesmo do guia Claude Code — os seis itens. O método não muda com o editor; muda apenas onde você clica.
