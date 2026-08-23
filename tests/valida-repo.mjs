// Suíte do repositório do método: valida os invariantes estruturais do ATESTO.
// O repositório pratica o próprio método — "finalizado sem teste" não existe (§6).
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

const raiz = resolve(dirname(new URL(import.meta.url).pathname), "..");
const falhas = [];

// 1. Arquivos normativos obrigatórios existem
const obrigatorios = [
  "README.md",
  "INICIE-AQUI.md",
  "iniciar.sh",
  "LICENSE",
  "DOCUMENTO-MESTRE.md",
  "atores/raciocinio.md",
  "atores/executor.md",
  "atores/validador.md",
  "docs/portoes.md",
  "docs/perfis.md",
  "docs/cadeia-de-evidencias.md",
  "docs/checklist-owasp.md",
  "docs/seguranca-do-repositorio.md",
  "templates/STATUS.md",
  "templates/veredito-portao.md",
  "templates/spec-bloco.md",
  "templates/runbook-fast-track.md",
  "templates/aceite-de-risco.md",
  "templates/rollback.md",
  "templates/CODEOWNERS",
  "templates/status/maquina.yaml",
  "templates/status/bloco-exemplo.yaml",
  "templates/evidencias/README.md",
  "exemplos/percurso-completo.md",
  "guias/f3-do-zero-absoluto.md",
  "guias/claude-code.md",
  "guias/vs-code.md",
  ".github/workflows/portao-integracao.yml",
  ".github/workflows/portao-publicacao.yml",
  ".github/workflows/reauditoria-agendada.yml",
];
for (const rel of obrigatorios) {
  if (!existsSync(join(raiz, rel))) falhas.push(`arquivo obrigatório ausente: ${rel}`);
}

// 2. Links markdown locais resolvem (um link quebrado foi o primeiro achado da auditoria)
function arquivosMd(dir) {
  const saida = [];
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.name === ".git" || e.name === "node_modules") continue;
    const caminho = join(dir, e.name);
    if (e.isDirectory()) saida.push(...arquivosMd(caminho));
    else if (e.name.endsWith(".md")) saida.push(caminho);
  }
  return saida;
}
for (const arquivo of arquivosMd(raiz)) {
  const texto = readFileSync(arquivo, "utf8");
  for (const m of texto.matchAll(/\[[^\]]*\]\(([^)\s]+)\)/g)) {
    const alvo = m[1];
    if (/^(https?:|mailto:|#)/.test(alvo)) continue;
    const destino = join(dirname(arquivo), alvo.split("#")[0]);
    if (!existsSync(destino)) {
      falhas.push(`link quebrado em ${arquivo.slice(raiz.length + 1)}: ${alvo}`);
    }
  }
}

// 3–5. Invariantes de TODOS os workflows do portão
const dirWorkflows = join(raiz, ".github/workflows");
for (const nome of readdirSync(dirWorkflows).filter((n) => n.endsWith(".yml"))) {
  const workflow = readFileSync(join(dirWorkflows, nome), "utf8");

  // 3. Toda action pinada por SHA de commit (§17 — tag é mutável)
  for (const m of workflow.matchAll(/uses:\s*(\S+)/g)) {
    if (!/@[0-9a-f]{40}\b/.test(m[1])) {
      falhas.push(`action não pinada por SHA em ${nome}: ${m[1]}`);
    }
  }

  // 5. Anti-injeção: refs controláveis (head_ref/base_ref) só entram por
  // atribuição em env: ou concurrency — nunca interpoladas em script.
  // Achado real do SAST no primeiro run (PR #3).
  for (const [i, linha] of workflow.split("\n").entries()) {
    if (!/\$\{\{\s*github\.(head_ref|base_ref)/.test(linha)) continue;
    const contextoSeguro = /^\s+(?:[A-Z_]+:\s+\$\{\{|group:\s)/.test(linha);
    if (!contextoSeguro) {
      falhas.push(`interpolação insegura de ref em ${nome} (linha ${i + 1}): use env:`);
    }
  }
}

// 4. A regra "nenhuma suíte = reprovado" continua presente nos portões que testam
for (const nome of ["portao-integracao.yml", "portao-publicacao.yml"]) {
  const workflow = readFileSync(join(dirWorkflows, nome), "utf8");
  if (!workflow.includes("nenhuma stack reconhecida")) {
    falhas.push(`${nome} perdeu a regra 'nenhuma suíte detectada = REPROVADO' (§6)`);
  }
}

if (falhas.length > 0) {
  console.error(`REPROVADO — ${falhas.length} invariante(s) violado(s):`);
  for (const f of falhas) console.error(`  - ${f}`);
  process.exit(1);
}
console.log(`APROVADO — ${obrigatorios.length} arquivos normativos presentes, links íntegros, actions pinadas.`);
