# INICIE AQUI — o ATESTO em um comando

O ATESTO é um pacote único: você baixa, extrai e inicia seu projeto com **um comando**.
Ele instala os 4 atores, os 3 portões de CI, o estado versionado e o papel do Executor —
tudo que o método exige para o seu desenvolvimento nascer verificado.

## 1. Obter o pacote (escolha UMA forma)

**A — Use this template (recomendado, sem download):** na página do repositório no GitHub,
botão verde **Use this template → Create a new repository**. Seu repositório nasce pronto;
pule para o passo 3 deste arquivo apenas para conhecer o `iniciar.sh` (útil para os próximos projetos).

**B — Download ZIP:** página do repositório → botão **Code → Download ZIP** → extraia numa
pasta de trabalho (ex.: `~/projetos` ou `C:\Users\voce\projetos`).

**C — Git clone** (se você já usa Git):
```bash
git clone https://github.com/CodigoIAgil/atesto.git
# Esperado: "Cloning into 'atesto'... done."
```

## 2. Abrir o terminal na pasta extraída

- **Windows:** abra a pasta `atesto` no Explorer → clique direito → **"Git Bash Here"**
  (o Git Bash vem junto com o Git; não tem Git? Siga [o guia do zero absoluto](guias/f3-do-zero-absoluto.md)).
- **Linux/macOS:** `cd ~/projetos/atesto`

## 3. O comando único — escolha a linha do SEU sistema

**Windows (PowerShell):**
```powershell
.\iniciar.ps1 nome-do-seu-projeto
# Ex.: .\iniciar.ps1 agenda-pet
# Bloqueou com "execution of scripts is disabled"? Rode uma vez, só nesta janela:
#   Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

**Linux, macOS ou Git Bash (no Windows):**
```bash
bash iniciar.sh nome-do-seu-projeto
# Ex.: bash iniciar.sh agenda-pet
```

> Na dúvida sobre qual é o seu shell: se o comando `$PSVersionTable.PSVersion` mostrar uma
> tabela, você está no PowerShell (use o `.ps1`); se der erro "não reconhecido", você está
> num shell estilo Unix (use o `.sh`). **Não misture:** `bash ...` num PowerShell falha.

**O que acontece (e o output esperado):**
```
==> Criando o projeto em: .../agenda-pet
==> Inicializando o Git
==> Commit de fundação criado.
PRONTO. Projeto criado em: .../agenda-pet
```
O projeto nasce AO LADO da pasta do atesto, já com: `atores/` (a régua), `STATUS.md` +
`status/` (o estado), `.github/workflows/` (os 3 portões), `CLAUDE.md` (o papel do
Executor), `docs/checklist-owasp.md` e os templates do método — e o primeiro commit feito.

## 4. O que falta depois do comando (10 min, uma vez só — atos SEUS)

O script prepara tudo que é mecânica. Ficam com você os atos de fundação da propriedade
(o porquê está no §10 do [DOCUMENTO-MESTRE.md](DOCUMENTO-MESTRE.md)):

1. Criar o repositório no github.com e publicar (`git push`) — comandos exatos são
   impressos pelo próprio script e detalhados na Etapa 3 do [guia](guias/claude-code.md).
2. Ativar a **branch protection** da main — o mecanismo físico do portão.
3. Rodar `claude` dentro da pasta do projeto: o Claude Code lê o `CLAUDE.md` e assume o
   papel de Executor sozinho.

A partir daí, o fluxo é o do método: a camada de Raciocínio (claude.ai) gera specs e
prompts, o Executor implementa em branches e abre PRs, o portão valida em ambiente
efêmero, e **você clica Merge quando estiver verde**.

## Se algo divergir

Regra do método: nunca avance sobre output que você não entendeu. Copie o output inteiro
e pergunte à camada de Raciocínio. Problemas comuns estão no fim do
[guia principal](guias/claude-code.md) e do [guia do zero absoluto](guias/f3-do-zero-absoluto.md).
