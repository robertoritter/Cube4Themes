/*
 * Author: Roberto Ritter
 * Studio: Cube4Code
 * Website: https://cube4code.com
 * Copyright (c) 2026 Roberto Ritter
 *
 * Gera dist/themes.json (paletas + papéis de cor calculados, para qualquer linguagem) e dist/themes.css
 * (um bloco de variáveis por tema, para usar sem JavaScript). Também confere o contraste de cada tema.
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { themes, roles, cssVars, contrast } from '../src/index.js';

const header = '/*\n * Cube4Themes\n * Author: Roberto Ritter\n * Studio: Cube4Code\n * Website: https://cube4code.com\n * Copyright (c) 2026 Roberto Ritter\n *\n * Paletas: cada tema pertence ao seu autor (veja README.md). Gerado por scripts/build.mjs; não edite à mão.\n */\n';
mkdirSync(new URL('../dist/', import.meta.url), { recursive: true });

const json = themes.map(t => ({ ...t, roles: roles(t) }));
writeFileSync(new URL('../dist/themes.json', import.meta.url), JSON.stringify({ generator: 'Cube4Themes', themes: json }, null, 1) + '\n');

let css = header + '\n/* Uso: <html data-c4-theme="dracula"> e cores com var(--c4-h1), var(--c4-bg)... */\n';
for (const t of themes) {
  css += `\n/* ${t.name} (${t.kind}) */\n[data-c4-theme="${t.id}"] {\n  color-scheme: ${t.kind};\n`;
  for (const [k, v] of Object.entries(cssVars(t))) css += `  ${k}: ${v};\n`;
  css += '}\n';
}
writeFileSync(new URL('../dist/themes.css', import.meta.url), css);

// contraste mínimo de leitura sobre o fundo
let bad = 0;
for (const t of themes) {
  const r = roles(t);
  for (const [k, min] of Object.entries({ h1: 3, h2: 3, h3: 3, h4: 3, bullet: 3, bold: 3.5, italic: 3.5, code: 4, link: 3.5 })) {
    const c = contrast(r.text[k], t.bg);
    if (c < min - 0.01 && r.text[k] !== t.fg) { bad++; console.log(`  contraste baixo: ${t.id} ${k} ${c.toFixed(2)}`); }
  }
}
console.log(`${themes.length} temas -> dist/themes.json, dist/themes.css${bad ? `, ${bad} cores abaixo do mínimo` : ', contraste conferido'}`);
if (bad) process.exitCode = 1;

// amostra de todos os temas (abre direto no navegador)
const card = t => {
  const r = roles(t).text;
  return `<article data-c4-theme="${t.id}"><h2>${t.name} <small>${t.kind}</small></h2><h3>Subtitle</h3>
<p>Plain text with <b>bold</b>, <i>italic</i>, <code>code</code> and <a href="#">a link</a>.</p>
<ul><li>First item</li><li>Second item</li></ul><blockquote>A quote.</blockquote>
<div class="sw">${[t.bg, t.fg, ...t.p.slice(1, 7)].map(c => `<i style="background:${c}"></i>`).join('')}</div></article>`;
};
const html = `<!doctype html>
<!-- Cube4Themes: amostra gerada por scripts/build.mjs. Author: Roberto Ritter, Cube4Code (https://cube4code.com) -->
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Cube4Themes</title>
<link rel="stylesheet" href="themes.css"><style>
body { margin: 0; padding: 24px 16px; font: 15px/1.5 system-ui, sans-serif; background: #f4f2f9; color: #1e1b29; }
header { max-width: 1200px; margin: 0 auto 20px; } header b { color: #5c3fb3; }
main { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fill, minmax(270px, 1fr)); gap: 14px; }
article { background: var(--c4-bg); color: var(--c4-text); border: 1px solid var(--c4-line); border-radius: 12px; padding: 14px 16px; }
h2 { color: var(--c4-h1); margin: 0; font-size: 19px; } h2 small { color: var(--c4-muted); font-size: 12px; font-weight: 500; }
h3 { color: var(--c4-h2); margin: 6px 0; font-size: 15px; } p { margin: 6px 0; }
b { color: var(--c4-bold); } i { color: var(--c4-italic); } a { color: var(--c4-link); }
code { color: var(--c4-code); background: var(--c4-code-bg); padding: 1px 5px; border-radius: 4px; }
ul { margin: 6px 0; padding-left: 20px; } li::marker { color: var(--c4-bullet); }
blockquote { margin: 6px 0; padding-left: 10px; border-left: 3px solid var(--c4-quote); color: var(--c4-text2); }
.sw { display: flex; gap: 4px; margin-top: 10px; } .sw i { flex: 1; height: 14px; border-radius: 3px; border: 1px solid var(--c4-line); }
</style></head><body><header><h1>Cube<b>4</b>Themes</h1><p>${themes.length} terminal themes as reading colors. Each palette belongs to its author.</p></header>
<main>${themes.map(card).join('\n')}</main></body></html>
`;
writeFileSync(new URL('../dist/preview.html', import.meta.url), html);
