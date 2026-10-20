/*
 * Author: Roberto Ritter
 * Studio: Cube4Code
 * Website: https://cube4code.com
 * Copyright (c) 2026 Roberto Ritter
 *
 * Cube4Themes: transforma a paleta de um tema de terminal em cores de interface e de leitura
 * (títulos, subtítulos, marcadores, negrito, itálico, código, links), garantindo contraste mínimo
 * (WCAG) sobre o fundo. Sem dependências; funciona no navegador e no Node.
 */
import palettes from './palettes.js';

/** Todos os temas: { id, name, kind: 'dark' | 'light', bg, fg, sel, p: 16 cores ANSI }. */
export const themes = palettes;

const rgb = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
const hex = c => '#' + c.map(v => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, '0')).join('');
/** Mistura duas cores: t = 0 devolve a, t = 1 devolve b. */
export const mix = (a, b, t) => { const x = rgb(a), y = rgb(b); return hex([0, 1, 2].map(i => x[i] + (y[i] - x[i]) * t)); };
const lum = h => { const [r, g, b] = rgb(h).map(v => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
/** Razão de contraste WCAG entre duas cores (1 a 21). */
export const contrast = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
/** Aproxima a cor do texto principal até atingir o contraste mínimo sobre o fundo. */
export function legible(c, bg, fg, min = 3) {
  for (let t = 0; t <= 1.001; t += 0.1) { const m = mix(c, fg, t); if (contrast(m, bg) >= min) return m; }
  return fg;
}

export function findTheme(id) { return themes.find(t => t.id === id); }

/**
 * Papéis de cor de um tema.
 * ui: cores da interface (fundo, lateral, texto, linhas, destaque, avisos, diferenças).
 * text: cores de leitura de um documento (Markdown, por exemplo).
 */
export function roles(t) {
  const { bg, fg, p } = t;
  const L = (c, m = 3) => legible(c, bg, fg, m);
  const accent = L(p[4], 3.2);
  return {
    ui: {
      bg, surface: mix(bg, fg, 0.045), text: fg, text2: mix(fg, bg, 0.18), muted: L(mix(fg, bg, 0.45), 3.5),
      line: mix(bg, fg, 0.12), line2: mix(bg, fg, 0.2), hover: mix(bg, fg, 0.08), selection: t.sel ?? mix(bg, p[4], 0.35),
      accent, accent2: L(p[12], 3.2), onAccent: contrast(bg, accent) >= contrast(fg, accent) ? bg : fg, accentSoft: mix(bg, accent, 0.18),
      warn: L(p[3]), warnSoft: mix(bg, p[3], 0.14), danger: L(p[1], 3.5),
      addBg: mix(bg, p[2], 0.18), addText: L(p[2], 4.5), delBg: mix(bg, p[1], 0.18), delText: L(p[1], 4.5),
    },
    text: {
      h1: L(p[5]), h2: L(p[4]), h3: L(p[6]), h4: L(p[2]),
      bullet: L(p[3]), bold: L(p[1], 3.5), italic: L(p[14], 3.5),
      code: L(p[2], 4), codeBg: mix(bg, p[2], 0.1), link: L(p[12], 3.5), quote: L(p[5]),
    },
  };
}

const kebab = s => s.replace(/[A-Z]/g, c => '-' + c.toLowerCase());

/** Variáveis CSS do tema: { '--c4-bg': '#...', '--c4-h1': '#...', ... }. */
export function cssVars(t, prefix = '--c4-') {
  const r = roles(t), out = {};
  for (const group of [r.ui, r.text]) for (const [k, v] of Object.entries(group)) out[prefix + kebab(k)] = v;
  return out;
}

/** Aplica o tema num elemento (padrão: <html>); sem tema, remove. Marca data-c4-theme e color-scheme. */
export function applyTheme(t, el = globalThis.document?.documentElement, prefix = '--c4-') {
  if (!el) return;
  for (const name of [...el.style]) if (name.startsWith(prefix)) el.style.removeProperty(name);
  if (!t) { delete el.dataset.c4Theme; el.style.removeProperty('color-scheme'); return; }
  for (const [k, v] of Object.entries(cssVars(t, prefix))) el.style.setProperty(k, v);
  el.style.setProperty('color-scheme', t.kind);
  el.dataset.c4Theme = t.id;
}

/** Oito cores representativas para uma amostra visual do tema. */
export function swatches(t) { return [t.bg, t.fg, t.p[1], t.p[2], t.p[3], t.p[4], t.p[5], t.p[6]]; }
