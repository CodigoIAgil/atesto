# TRIAGEM F0 — [nome do projeto]

> Preenchida pela camada de RACIOCÍNIO entrevistando o Operador, ANTES de abrir F1.
> Regra de completude: **F1 não abre com nenhum campo obrigatório vazio.** Campo sem
> resposta = pergunta ao Operador, nunca suposição (Regra da Verificação).

## 1. Problema e negócio (obrigatório)
- Qual problema real isto resolve? [frase do Operador, não do Raciocínio]
- Para quem? Qual o ganho de negócio esperado?
- Precisa existir na v1, ou é desejável? [corta escopo]

## 2. Ambiente do Operador (OBRIGATÓRIO — alimenta status/maquina.yaml `operador:`)
Este bloco é a origem do "Ambiente-alvo" de todo prompt de setup. Verifique, não presuma.
- **Sistema operacional:** [ Windows / Linux / macOS — e versão, se souber ]
- **Terminal/shell real:** [ PowerShell / Prompt (cmd) / Git Bash / bash / zsh / WSL ]
  - Como confirmar (peça ao Operador para colar o resultado):
    - `$PSVersionTable.PSVersion` → tabela = PowerShell (o Major decide se `&&` existe)
    - o mesmo comando dando erro "não reconhecido" = shell estilo Unix (bash/zsh)
- **Já tem instalado?** git [ ] · node [ ] · conta GitHub [ ] · editor [qual]
- **Nível técnico** (calibra o Modo Mentor): [ leigo / intermediário / avançado ]

## 3. Viabilidade e diferencial (obrigatório)
- Já existe solução pronta no mercado? Por que construir em vez de usar?
- Qual o diferencial que justifica o esforço?

## 4. Restrições (obrigatório — pode ser "nenhuma", declarado)
- Prazo, orçamento, stack imposta, exigência regulatória? [ou "nenhuma"]

## 5. Decisão do Operador (obrigatório para sair de F0)
- [ ] Vale construir? SIM → F1 · NÃO → reformula ou encerra
- Registrado por: [Operador] · Data: ____-__-__

---
Ao concluir: copiar SO, shell, nível e data para `status/maquina.yaml` seção `operador:`.
