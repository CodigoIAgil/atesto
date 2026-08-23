# Checklist operacional — OWASP Top 10 (2021) no ATESTO

Este é o checklist que o Portão de Publicação (F5) exige "percorrido e evidenciado".
Cada item traz: o que significa (em linguagem de Operador), como verificar, e o que
conta como evidência. **Automatizável ≠ automatizado:** o que a ferramenta cobre, o
job de CI executa; o resíduo manual é percorrido pela camada de Raciocínio via prompts
exploratórios ao Executor, e o resultado entra no STATUS.md.

| Regra de ouro | A ferramenta prova a ausência do detectável; o item só fecha com evidência. |
| --- | --- |

## A01 — Quebra de Controle de Acesso
**Em uma frase:** usuário comum consegue ver ou fazer coisas de administrador (ou de outro usuário).
**Verificar:** para CADA rota/tela protegida, um teste automatizado tenta acessá-la (1) sem login e (2) logado como usuário sem permissão. Testar também troca de IDs na URL (acessar `/pedidos/123` de outro cliente).
**Ferramenta:** testes de integração da própria suíte (o critério de sucesso da spec de todo bloco com permissões DEVE incluir esses testes) + Semgrep (rotas sem middleware de auth).
**Evidência:** output dos testes de acesso no artifact do job.

## A02 — Falhas Criptográficas
**Em uma frase:** dado sensível guardado ou transmitido às claras.
**Verificar:** senhas com hash forte (bcrypt/argon2 — nunca MD5/SHA1 puro, nunca texto puro); HTTPS obrigatório em produção; nenhum dado sensível em log.
**Ferramenta:** Semgrep (regras de crypto fraca) + inspeção do schema do banco via prompt exploratório.
**Evidência:** semgrep.json + resposta do Executor sobre o schema, citada no STATUS.md.

## A03 — Injeção (SQL, comando, XSS)
**Em uma frase:** texto digitado pelo usuário vira comando executado pelo sistema.
**Verificar:** toda query parametrizada (nunca concatenação de string com input); todo output de usuário escapado no HTML; nenhum `eval`/execução de shell com input.
**Ferramenta:** Semgrep (é o ponto forte dele — cobre SQLi, XSS, command injection por linguagem).
**Evidência:** semgrep.json sem achados dessas famílias.

## A04 — Design Inseguro
**Em uma frase:** o problema não é um bug — é a regra de negócio que nasceu sem limite (ex.: recuperação de senha sem expiração, cupom sem teto).
**Verificar:** MANUAL — na spec de cada bloco (F4a), a camada de Raciocínio responde: "como este bloco pode ser abusado?" e o critério de sucesso inclui os limites (rate limit, expiração, teto).
**Evidência:** seção "abuso considerado" na spec do bloco (templates/spec-bloco.md).

## A05 — Configuração Insegura
**Em uma frase:** o sistema roda com padrão de fábrica: debug ligado, senha default, porta aberta.
**Verificar:** modo debug desligado em produção; mensagens de erro sem stack trace para o usuário; credenciais default trocadas; headers de segurança (CSP, X-Frame-Options) presentes em apps web.
**Ferramenta:** Semgrep (debug flags) + prompt exploratório de configuração de deploy.
**Evidência:** semgrep.json + checklist de config no STATUS.md.

## A06 — Componentes Vulneráveis e Desatualizados
**Em uma frase:** a vulnerabilidade não está no seu código — está na biblioteca que você importou.
**Verificar:** auditoria de dependências sem severidade média+; F7 re-verifica continuamente.
**Ferramenta:** npm audit / pip-audit (já no portão) + re-auditoria agendada (workflow F7).
**Evidência:** deps-*.txt no artifact do job; runs semanais verdes.

## A07 — Falhas de Identificação e Autenticação
**Em uma frase:** login fraco: sem limite de tentativas, sessão que não expira, "esqueci a senha" abusável.
**Verificar:** rate limit no login; sessão expira; token de recuperação de senha é único, expira e é de uso único; senha tem requisito mínimo.
**Ferramenta:** testes da suíte para cada regra acima (entram no critério de sucesso do bloco de auth).
**Evidência:** output dos testes no artifact.

## A08 — Falhas de Integridade de Software e Dados
**Em uma frase:** você executa código ou aceita dado cuja origem não verificou.
**Verificar:** actions/imagens de CI pinadas por digest (a suíte deste repositório já reprova action despinada); lockfile commitado; nenhuma dependência instalada de URL avulsa; deserialização de dados não confiáveis evitada.
**Ferramenta:** invariantes da suíte + Semgrep (deserialização).
**Evidência:** run verde da suíte + semgrep.json.

## A09 — Falhas de Log e Monitoramento
**Em uma frase:** o ataque aconteceu e ninguém ficou sabendo.
**Verificar:** eventos de segurança (login falho, acesso negado, erro 500) são logados com timestamp e identificador; log NÃO contém senha/token; existe um lugar definido onde o Operador olha os logs.
**Ferramenta:** MANUAL via prompt exploratório + Semgrep (segredos em log).
**Evidência:** resposta do Executor citada no STATUS.md.

## A10 — SSRF (Server-Side Request Forgery)
**Em uma frase:** o usuário faz o SEU servidor acessar uma URL que ele escolheu (ex.: rede interna).
**Verificar:** toda funcionalidade que busca URL fornecida pelo usuário (webhook, importar por link, preview) valida contra lista de destinos permitidos e bloqueia IPs internos.
**Ferramenta:** Semgrep (requests com input) + teste da suíte quando a funcionalidade existir.
**Evidência:** semgrep.json + testes; se a aplicação não busca URLs de usuário, registrar "N/A — sem funcionalidade de fetch de URL" no STATUS.md (N/A declarado é evidência; silêncio não é).

---

## Como o item "checklist OWASP percorrido e evidenciado" fecha em F5

1. O job do Portão de Publicação executa a parte automatizável (Semgrep, auditoria, testes) e publica os outputs.
2. A camada de Raciocínio percorre os itens manuais (A04, A05 parcial, A09) via prompts exploratórios e registra cada resposta.
3. O STATUS.md recebe a tabela final: item → como verificado → evidência (ref do artifact ou resposta citada) → status (OK / Pendência / N/A declarado).
4. Pendências seguem a matriz de severidade (§8): média+ bloqueia; baixa vira Pendência de Segurança com prazo ou aceite formal do Operador.
