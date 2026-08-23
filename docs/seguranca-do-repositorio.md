# Segurança do repositório — checklist do Operador

Configurações que só o dono do repositório pode ativar (são cliques em Settings, não
arquivos — por isso este documento é um checklist, não um script). Vale para o repositório
do MÉTODO e para cada PROJETO criado com ele. Caminhos conferidos na interface do GitHub;
se um menu mudar de lugar, o nome da opção é o guia.

## 1. Proteção da main (mecanismo físico do portão)
Settings → Branches → Add branch ruleset:
- [ ] Ruleset `portao-main` · Enforcement: **Active** · Target: `main`
- [ ] ✅ Require a pull request before merging
- [ ] ✅ Require status checks to pass → selecione `portao` (aparece após o 1º PR rodar o workflow)
  - [ ] ✅ Require branches to be up to date before merging
- [ ] ✅ Block force pushes
- [ ] **Bypass list vazia** — inclusive você. Precisou de exceção? É decisão de negócio: registre no STATUS.md antes.

## 2. Proteção de tags (a release não pode ser reescrita)
Settings → Rules → Rulesets → New tag ruleset:
- [ ] Target: `v*` · ✅ Restrict creations/updates/deletions (só admin, pela interface)
- Racional: a tag assinala "isto atravessou F5". Tag reescrevível = atestação reescrevível.
- [ ] Criar release: página do repo → Releases → **Draft a new release** → tag `v0.3.2` no
  commit do merge → título "ATESTO v0.3.2" → Publish. (Release pela interface é o ato do
  Operador em F6 — por desenho, o Executor não cria tags.)

## 3. Varredura de segredos nativa (defesa em profundidade com o gitleaks)
Settings → Advanced Security (ou Code security):
- [ ] ✅ Secret scanning — acha segredo que já entrou no histórico
- [ ] ✅ **Push protection** — bloqueia o segredo ANTES de entrar (o gitleaks do portão pega depois; isto pega antes)
- Gratuito em repositório público.

## 4. Dependências vigiadas pela plataforma (reforço do F7)
Settings → Advanced Security:
- [ ] ✅ Dependabot alerts
- [ ] ✅ Dependabot security updates (PRs automáticos de correção — que passam pelo portão como qualquer PR)

## 5. Endurecimento do Actions (o território do veredito)
Settings → Actions → General:
- [ ] Actions permissions: **Allow <sua-conta> actions and select non-<sua-conta> actions** →
  liste apenas: `actions/checkout@*`, `actions/upload-artifact@*`, `gitleaks/gitleaks-action@*`
  (o repositório já pina por SHA; isto impede que QUALQUER outra action rode)
- [ ] Workflow permissions: **Read repository contents** (read-only)
- [ ] ✅ Desmarcado: "Allow GitHub Actions to create and approve pull requests"

## 6. Conta e recebimento de vulnerabilidades
- [ ] 2FA ativo na sua conta (Settings da conta → Password and authentication)
- [ ] Settings do repo → ✅ Private vulnerability reporting (quem achar falha no método
  reporta em privado, não em issue pública)

## 7. Distribuição
- [x] Template repository ativado (Settings → General) — adoção com 1 clique. *Feito.*

---

## Proteção contra cópia não autorizada — o que é possível e o que não é

**A verdade técnica primeiro:** um repositório público é legível por qualquer pessoa —
não existe configuração que impeça cópia do conteúdo. O que define o que é "autorizado"
é a **licença**; o que protege o **nome** é a marca. As camadas reais de proteção:

1. **Titularidade explícita (feito neste repositório).** O `LICENSE` nomeia o titular:
   *Fabiano Dos Santos — CEO, CódigoIAgil*. A licença MIT atual **permite** copiar e
   adaptar, mas **obriga** a manter este aviso de copyright — cópia que remove a autoria
   viola a licença e é juridicamente contestável.
2. **A marca "ATESTO" é protegível separadamente da licença.** MIT libera o texto e o
   código; NÃO cede o direito de usar o nome/marca para produtos derivados. Para tornar
   isso executável no Brasil: registro da marca no **INPI** (classe de software/serviços
   de tecnologia) — ato jurídico, fora do repositório, recomendado antes da divulgação ampla.
3. **Trilha pública de autoria.** O histórico Git público com datas + releases marcadas
   é evidência de anterioridade — a mesma lógica da cadeia de evidências do método
   aplicada à autoria dele.
4. **A decisão de negócio em aberto (sua, como Operador):** manter MIT maximiza adoção —
   e "referência de mercado" foi o objetivo declarado na publicação — ao custo de permitir
   cópias legais com atribuição. A alternativa (licença restritiva, ex.: CC BY-NC-ND para
   os textos, ou proprietária) impede derivados comerciais, ao custo de matar contribuição
   e adoção. **Recomendação registrada: manter MIT + registrar a marca no INPI** — protege
   o que tem valor de negócio (o nome, a referência) sem fechar o que dá tração (o método).
   Trocar a licença é possível a qualquer momento para versões FUTURAS (não retroage sobre
   o que já foi distribuído) e deve ser registrada como decisão no STATUS.md.
