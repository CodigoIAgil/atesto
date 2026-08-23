// Suíte do repositório do método: valida os invariantes estruturais do ATESTO.
// O repositório pratica o próprio método — "finalizado sem teste" não existe (§6).
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

const raiz = resolve(dirname(new URL(import.meta.url).pathname), "..");
const falhas = [];

// 1. Arquivos normativos obrigatórios existem
const obrigatorios = [
  "README.md",
  "LICENSE",
  "DOCUMENTO-MESTRE.md",
  "atores/raciocinio.md",
  "atores/executor.md",
  "atores/validador.md",
  "docs/portoes.md",
  "docs/perfis.md",
  "docs/cadeia-de-evidencias.md",
  "templates/STATUS.md",
  "templates/veredito-portao.md",
  "templates/CODEOWNERS",
  "templates/status/maquina.yaml",
  "templates/status/bloco-exemplo.yaml",
  "templates/evidencias/README.md",
  "guias/claude-code.md",
  "guias/vs-code.md",
  ".github/workflows/portao-integracao.yml",
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

// 3. Toda action do portão está pinada por SHA de commit (§17 — tag é mutável)
const workflow = readFileSync(join(raiz, ".github/workflows/portao-integracao.yml"), "utf8");
for (const m of workflow.matchAll(/uses:\s*(\S+)/g)) {
  if (!/@[0-9a-f]{40}\b/.test(m[1])) {
    falhas.push(`action não pinada por SHA no portão: ${m[1]}`);
  }
}

// 4. A regra "nenhuma suíte = reprovado" continua presente no portão
if (!workflow.includes("nenhuma stack reconhecida")) {
  falhas.push("o portão perdeu a regra 'nenhuma suíte detectada = REPROVADO' (§6)");
}

if (falhas.length > 0) {
  console.error(`REPROVADO — ${falhas.length} invariante(s) violado(s):`);
  for (const f of falhas) console.error(`  - ${f}`);
  process.exit(1);
}
console.log(`APROVADO — ${obrigatorios.length} arquivos normativos presentes, links íntegros, actions pinadas.`);
