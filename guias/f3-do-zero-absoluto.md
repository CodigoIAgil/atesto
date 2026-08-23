# Guia F3 do zero absoluto — para quem nunca programou

**Para quem é este guia:** você tem uma ideia de aplicação, nunca desenvolveu software,
não tem conta no GitHub e talvez nunca tenha aberto um terminal. Ao final, sua máquina
(Windows ou Linux) estará pronta e o seu projeto terá dono: **você**.

**Por que VOCÊ faz estes passos, e não a IA:** neste método, a IA escreve o código,
faz commits e abre Pull Requests — mas a conta, o repositório e a proteção da main são
**as chaves do projeto, e chaves pertencem ao humano**. Quem configura a jaula não pode
ser quem mora nela. São ~30 minutos, uma única vez, e é o ato de fundação da sua propriedade.

Regra herdada do Modo Mentor: **nenhum passo sem o comando completo e o output esperado.**
Se o que aparece na sua tela divergir do esperado, PARE e pergunte à camada de Raciocínio —
não avance sobre estado não compreendido.

---

## 0. Cinco conceitos em cinco linhas

- **Repositório:** a pasta oficial do seu projeto, guardada no GitHub, com todo o histórico.
- **Commit:** uma fotografia do projeto num momento — dá para voltar a qualquer uma.
- **Branch:** uma cópia de trabalho para mexer sem tocar na versão oficial (`main`).
- **Pull Request (PR):** o pedido de "juntar meu branch na main" — é onde o portão roda.
- **Merge:** o clique que aceita o PR. No ATESTO, **este clique é sempre seu.**

## 1. Criar sua conta no GitHub (5 min)

1. Abra `github.com` no navegador → botão **Sign up**.
2. E-mail: use um que você acessa sempre (recuperação de conta passa por ele).
3. Senha: longa e única (um gerenciador de senhas ajuda; anotar num caderno é melhor que repetir senha).
4. Username: aparecerá em tudo — algo profissional e curto.
5. Confirme o código recebido por e-mail.
6. **Ative a verificação em duas etapas:** foto do seu perfil → Settings → Password and
   authentication → Two-factor authentication → Enable. *Esta conta vai guardar o seu
   produto; a senha sozinha não basta.*

## 2. Abrir o terminal

- **Windows 11:** menu Iniciar → digite `PowerShell` → Enter. (Tudo neste guia funciona no PowerShell.)
- **Linux (Ubuntu e similares):** `Ctrl+Alt+T`.

O terminal é só uma caixa de texto onde você cola comandos e lê respostas. Todos os
comandos deste método chegam prontos — você cola, compara o output com o esperado, e pronto.

## 3. Instalar as ferramentas (10 min)

### Git (o motor de versionamento)
```
# Windows 11 (PowerShell):
winget install --id Git.Git -e
# Esperado: "Successfully installed"

# Linux (Ubuntu):
sudo apt update && sudo apt install -y git
# Esperado: termina sem "E:" (erro); pode pedir sua senha do computador
```
Feche e reabra o terminal, depois confirme:
```
git --version
# Esperado: git version 2.4x (qualquer 2.30+)
```

### Node.js (necessário para o Claude Code e para muitos projetos)
```
# Windows 11:
winget install OpenJS.NodeJS.LTS
# Linux (Ubuntu):
sudo apt install -y nodejs npm
```
Confirme (reabra o terminal antes):
```
node --version
# Esperado: v18 ou maior. Se vier menor no Linux, pergunte à camada de
# Raciocínio como instalar a versão LTS via NodeSource — cole o output real.
```

### Claude Code (o Executor)
```
npm install -g @anthropic-ai/claude-code
claude --version
# Esperado: um número de versão. No primeiro `claude`, ele pedirá login na sua conta Anthropic.
```

### Identificar-se para o Git (uma vez só)
```
git config --global user.name "Seu Nome"
git config --global user.email "mesmo-email-do-github@exemplo.com"
# Esperado: nenhum output = deu certo (silêncio é sucesso neste comando)
```

## 4. Criar a pasta do projeto

```
# Windows e Linux (mude "meu-projeto" para o nome real):
mkdir meu-projeto
cd meu-projeto
# Esperado: o prompt do terminal passa a mostrar .../meu-projeto
```

## 5. Daqui em diante

Sua máquina está pronta e sua identidade existe. Continue no **[guia principal](claude-code.md)**
a partir da Etapa 1 (instalar o método no projeto): lá você criará o repositório no GitHub,
ativará a proteção da main — o mecanismo físico do portão — e verá o primeiro bloco
atravessar o portão.

**O que fica com você para sempre** (os atos soberanos): revisar o que o portão avisar,
aceitar riscos por escrito quando decidir aceitá-los, e clicar **Merge** quando o portão
estiver verde. Todo o resto — branches, commits, push, abrir PRs, corrigir quando o
portão reprovar — é trabalho do Executor, mediante prompts da camada de Raciocínio.

## Problemas comuns do zero absoluto

- **`winget` não existe (Windows):** instale pela loja "App Installer" da Microsoft Store, ou
  baixe o Git em `git-scm.com/download/win` (instalador comum, Next até o fim).
- **"command not found" logo após instalar:** feche e REABRA o terminal — ele só enxerga
  programas novos ao abrir.
- **O terminal pede senha e nada aparece ao digitar (Linux):** é normal — a senha está
  sendo digitada, só não é exibida. Digite e Enter.
- **Qualquer output diferente do esperado:** copie o output INTEIRO e cole para a camada
  de Raciocínio perguntando o que ele significa. Nunca prossiga "achando que deu certo".
