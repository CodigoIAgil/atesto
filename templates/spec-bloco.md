# SPEC DE BLOCO — [nome do bloco]

> Escrita pela camada de RACIOCÍNIO antes de qualquer código (F4a).
> O critério de sucesso definido AQUI é o que o Validador executará no portão (Ritual 4).

| Campo | Valor |
| --- | --- |
| Bloco | [bloco-nome] |
| Branch | [bloco/nome] |
| Arquivo de estado | [status/bloco-nome.yaml] |
| Depende dos blocos | [lista, ou "nenhum"] |
| Blocos que dependem dele | [lista, ou "nenhum"] |

## Objetivo único
[Uma frase. Se precisar de "e", provavelmente são dois blocos.]

## Contexto factual
[Somente fatos verificados — estado real do sistema, decisões já registradas no STATUS.md.
Nada de suposição: premissa verificável não verificada vira prompt exploratório antes desta spec.]

## 🏷️ Classificação · 🔁 Dois tempos · ⚠️ Premissa mais frágil
```
🏷️ Classificação: [Exploratória | Implementação Segura | Crítica | Documentação]
🔁 Dois tempos: [sim/não + por quê]
⚠️ Premissa mais frágil: [o que precisa ser verdade + como FOI verificada (ref da evidência)]
```

## Critério de sucesso verificável (vira teste ANTES do código)
[Lista objetiva. Cada item deve ser executável por máquina:]
- [ ] [ex.: POST /login com credencial válida retorna 200 + token]
- [ ] [ex.: POST /login com senha errada 5x retorna 429 (rate limit)]
- [ ] Testes de contrato com os blocos dependentes: [quais chamadas/formatos]

## Abuso considerado (OWASP A04 — design inseguro)
[Como este bloco pode ser abusado? Que limite impede isso? (rate limit, expiração, teto,
validação). Se genuinamente não há superfície de abuso, escrever "N/A + por quê" — silêncio não vale.]

## Limites explícitos (o que o Executor NÃO toca)
[Arquivos/áreas proibidos nesta tarefa. Ex.: "não alterar atores/, .github/, schema do banco".]

## Exigências de output do Executor
Duas seções obrigatórias: `## Executado` e `## Visão Complementar`
(ou a linha literal "Visão complementar: nada a reportar").
