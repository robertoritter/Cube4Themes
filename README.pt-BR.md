# Cube4Themes

**53 temas de cores de terminal transformados em cores de interface e de leitura, com contraste garantido.**

Temas de terminal são ótimas paletas, mas só definem 16 cores ANSI. O Cube4Themes leva cada paleta para os papéis que um aplicativo precisa: fundo, lateral, texto, linhas, destaque, avisos, diferenças, e as cores de um documento (títulos, marcadores, negrito, itálico, código, links, citações). Cada cor de leitura é ajustada até atingir um contraste mínimo (WCAG) sobre o fundo, então qualquer tema continua legível.

Abra [`dist/preview.html`](dist/preview.html) para ver todos. English version: [README.md](README.md).

## Três formas de usar

| Arquivo | Para | Como |
| --- | --- | --- |
| `dist/themes.json` | qualquer linguagem (Qt/QML, Python, C#, Power BI...) | paletas e todos os papéis já calculados |
| `dist/themes.css` | qualquer página web, sem JavaScript | `<html data-c4-theme="dracula">` e `var(--c4-h1)`, `var(--c4-bg)`... |
| `src/index.js` | apps web que trocam de tema na hora | `applyTheme(findTheme('nord'))` |

### CSS

```html
<link rel="stylesheet" href="themes.css">
<html data-c4-theme="tokyo-night">
<style>
  body { background: var(--c4-bg); color: var(--c4-text); }
  h1 { color: var(--c4-h1); }  b { color: var(--c4-bold); }  a { color: var(--c4-link); }
</style>
```

### JavaScript / TypeScript

```js
import { themes, findTheme, roles, applyTheme } from 'cube4themes';

applyTheme(findTheme('dracula'));             // define as variáveis --c4-* no <html>
const { ui, text } = roles(findTheme('nord')); // ou leia as cores diretamente
```

Instalar pelo Git: `npm install github:robertoritter/Cube4Themes#v1.0.1`.

## Papéis

| Grupo | Papéis |
| --- | --- |
| `ui` | `bg`, `surface`, `text`, `text2`, `muted`, `line`, `line2`, `hover`, `selection`, `accent`, `accent2`, `onAccent`, `accentSoft`, `warn`, `warnSoft`, `danger`, `addBg`, `addText`, `delBg`, `delText` |
| `text` | `h1`, `h2`, `h3`, `h4`, `bullet`, `bold`, `italic`, `code`, `codeBg`, `link`, `quote` |

A partir da paleta ANSI: `h1` magenta, `h2` azul, `h3` ciano, `h4` verde, marcadores amarelo, negrito vermelho, itálico ciano claro, código verde, links azul claro, destaque azul. Contraste mínimo: 3 para títulos e marcadores, 3,5 para negrito, itálico e links, 4 para código, 4,5 para o texto das diferenças. As variáveis CSS são os papéis em kebab-case com o prefixo `--c4-` (`onAccent` vira `--c4-on-accent`).

## Atualizar as paletas

```bash
# clone as fontes em /tmp/themes (veja scripts/gerar-paletas.py) e depois:
python scripts/gerar-paletas.py /tmp/themes   # palettes.json e src/palettes.js
npm run build                                  # dist/themes.json, dist/themes.css, dist/preview.html e conferência de contraste
```

## Créditos

Cada esquema de cores pertence ao seu autor original. As paletas vieram destas coleções, que creditam cada autor: [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes), [Gogh](https://github.com/Gogh-Co/Gogh), [lucario](https://github.com/raphamorim/lucario) e [vim-deus](https://github.com/ajmwagar/vim-deus). Confira a licença de um esquema no projeto original antes de redistribuí-lo.

## Licença

O código do Cube4Themes é distribuído sob a [licença MIT](LICENSE). Os esquemas de cores mantêm as licenças dos autores originais.

---

Desenvolvido por **Roberto Ritter** na [Cube4Code](https://cube4code.com).
