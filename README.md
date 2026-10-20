# Cube4Themes

**53 terminal color themes turned into interface and reading colors, with guaranteed contrast.**

Terminal themes are great palettes, but they only define 16 ANSI colors. Cube4Themes maps each palette to roles an app actually needs: background, surface, text, lines, accent, warnings, diffs, and the colors of a document (headings, bullets, bold, italic, code, links, quotes). Every reading color is adjusted until it reaches a minimum WCAG contrast over the background, so any theme stays readable.

Open [`dist/preview.html`](dist/preview.html) to see all of them. Versão em português: [README.pt-BR.md](README.pt-BR.md).

## Three ways to use it

| File | For | How |
| --- | --- | --- |
| `dist/themes.json` | any language (Qt/QML, Python, C#, Power BI...) | palettes plus every computed role |
| `dist/themes.css` | any web page, no JavaScript | `<html data-c4-theme="dracula">` and `var(--c4-h1)`, `var(--c4-bg)`... |
| `src/index.js` | web apps that switch themes live | `applyTheme(findTheme('nord'))` |

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

applyTheme(findTheme('dracula'));           // sets --c4-* variables on <html>
const { ui, text } = roles(findTheme('nord')); // or read the colors yourself
```

Install from Git: `npm install github:robertoritter/cube4themes#v1.0.0`.

## Roles

| Group | Roles |
| --- | --- |
| `ui` | `bg`, `surface`, `text`, `text2`, `muted`, `line`, `line2`, `hover`, `selection`, `accent`, `accent2`, `onAccent`, `accentSoft`, `warn`, `warnSoft`, `danger`, `addBg`, `addText`, `delBg`, `delText` |
| `text` | `h1`, `h2`, `h3`, `h4`, `bullet`, `bold`, `italic`, `code`, `codeBg`, `link`, `quote` |

Mapping from the ANSI palette: `h1` magenta, `h2` blue, `h3` cyan, `h4` green, bullets yellow, bold red, italic bright cyan, code green, links bright blue, accent blue. Minimum contrast: 3 for headings and bullets, 3.5 for bold, italic and links, 4 for code, 4.5 for diff text. CSS variable names are the roles in kebab case with the `--c4-` prefix (`onAccent` becomes `--c4-on-accent`).

## Themes

Dark: Apprentice, Ayu, Catppuccin Mocha, Cobalt2, Deus, Dracula, Everforest, GitHub, Gotham, Gruvbox, Iceberg, Jellybeans, Kanagawa, Lucario, Miasma, Moonfly, Night Owl, Nightfly, Nightfox, Noctis, Nord, Nordic, One, One Half, Panda, Rosé Pine, Seoul256, Shades of Purple, Solarized, Sonokai, Srcery, Tender, Tokyo Night, Tomorrow Night, Zenwritten.

Light: Ayu, Catppuccin Latte, Everforest, GitHub, Gruvbox, Iceberg, Kanagawa Lotus, Night Owl, Nightfox Dayfox, Noctis Lux, One, One Half, Rosé Pine Dawn, Seoul256, Solarized, Tokyo Night Day, Tomorrow, Zenwritten.

The list follows the dark and light tags of [terminalcolors.com](https://terminalcolors.com/).

## Updating the palettes

```bash
# clone the sources into /tmp/themes (see scripts/gerar-paletas.py), then:
python scripts/gerar-paletas.py /tmp/themes   # palettes.json and src/palettes.js
npm run build                                  # dist/themes.json, dist/themes.css, dist/preview.html, contrast check
```

## Credits

Each color scheme belongs to its original author. Palettes were taken from these collections, which credit every author:

- [mbadolato/iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes) (ghostty folder)
- [Gogh-Co/Gogh](https://github.com/Gogh-Co/Gogh)
- [raphamorim/lucario](https://github.com/raphamorim/lucario)
- [ajmwagar/vim-deus](https://github.com/ajmwagar/vim-deus)

Check the license of a scheme in its original project before redistributing it.

## License

No license has been chosen yet for the Cube4Themes code: all rights reserved until one is published. The color schemes keep their original authors' licenses.

---

Developed by **Roberto Ritter** at [Cube4Code](https://cube4code.com).
