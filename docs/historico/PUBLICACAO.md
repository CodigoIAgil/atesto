# COORDENADAS DE PUBLICAÇÃO — ATESTO no GitHub

Você é o Operador executando o transporte final. Nenhum passo sem comando + output esperado.
Tempo estimado: 15 minutos.

## Passo 1 — Baixar e descompactar o pacote
Baixe `atesto.zip` (entregue junto deste arquivo) e extraia numa pasta de trabalho.

```bash
cd ~/projetos            # ou a pasta da sua preferência
unzip ~/Downloads/atesto.zip -d .
cd atesto && ls
# Esperado: DOCUMENTO-MESTRE.md  README.md  atores/  docs/  guias/  templates/
```

## Passo 2 — Inicializar o Git com o commit de fundação
```bash
git init
# Esperado: Initialized empty Git repository ...

git add -A
git commit -m "feat: ATESTO v0.3 — commit de fundação

An attestation framework for AI-assisted development.
4 atores, máquina F0-F7, 3 portões, cadeia de evidências.
Publicado após 2 rodadas de auditoria adversarial (10 achados triados)."
# Esperado: [main (root-commit) xxxxxxx] ... ~15 files changed
```

## Passo 3 — Criar o repositório no GitHub (interface web)
1. github.com → botão **New** (ou github.com/new)
2. Repository name: **atesto**
   - Se o nome estiver ocupado na sua conta/em conflito global que te incomode: `atesto-framework`
3. Description: `An attestation framework for AI-assisted development — Desenvolvimento Verificado por Camadas`
4. **Public** (o objetivo é referência de mercado; histórico público desde o dia zero)
5. NÃO marque "Add a README" (já temos) → **Create repository**

## Passo 4 — Conectar e publicar
```bash
git remote add origin https://github.com/SEU-USUARIO/atesto.git
git branch -M main
git push -u origin main
# Esperado: "branch 'main' set up to track 'origin/main'"
# Se pedir autenticação: use um Personal Access Token (Settings → Developer settings
# → Fine-grained tokens → repo: atesto → Contents: Read and write).
```

## Passo 5 — Ativar o mecanismo físico (o repositório pratica o próprio método)
GitHub → repo **atesto** → **Settings → Branches → Add branch ruleset**:
- Ruleset name: `portao-main` · Enforcement: Active · Target branches: `main`
- ✅ Require a pull request before merging
- ✅ Block force pushes
- (O status check `portao` ficará selecionável após o primeiro PR rodar o workflow — volte aqui e adicione.)

## Passo 6 — Tag da versão
```bash
git tag -a v0.3 -m "ATESTO v0.3 - primeira publicacao"
git push origin v0.3
# Esperado: * [new tag] v0.3 -> v0.3
```

## Passo 7 — Verificação final (Fotografia pós-publicação)
- [ ] README renderizando na página inicial do repo
- [ ] 4 pastas visíveis: atores/ docs/ guias/ templates/
- [ ] Aba Actions presente (workflow aparece no primeiro PR)
- [ ] Tag v0.3 em Releases/Tags
- [ ] Tente editar a main direto pela web SEM PR → a ruleset deve impedir

## Depois da publicação
1. Abra as críticas remanescentes como **Issues** (uma por achado futuro, no formato: seção citada + cenário + reprodução).
2. A validação prática segue os guias: `guias/claude-code.md` e `guias/vs-code.md` — cada um termina num checklist de 6 provas objetivas.
3. Correções futuras: branch → PR → portão → merge. O repositório do método obedece ao método.
