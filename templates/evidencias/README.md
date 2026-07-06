# evidencias/

Registro consultivo local. **A evidência OFICIAL nasce do job de validação**
(artifact/attestation do pipeline) — ver docs/cadeia-de-evidencias.md.

Estrutura sugerida para o espelho consultivo:
```
evidencias/
└── F4-bloco-auth/
    ├── veredito.md          (cópia do veredito)
    ├── testes.txt           (output bruto da suíte)
    ├── gitleaks.json
    └── deps-audit.json
```
Nunca edite conteúdo de evidência. Evidência entregue por commit não é prova.
