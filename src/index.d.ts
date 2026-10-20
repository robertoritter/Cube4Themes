/*
 * Author: Roberto Ritter
 * Studio: Cube4Code
 * Website: https://cube4code.com
 * Copyright (c) 2026 Roberto Ritter
 *
 * Tipos do Cube4Themes para projetos em TypeScript.
 */
export interface Theme { id: string; name: string; kind: 'dark' | 'light'; bg: string; fg: string; sel: string | null; p: string[] }
export interface UiRoles {
  bg: string; surface: string; text: string; text2: string; muted: string; line: string; line2: string; hover: string; selection: string;
  accent: string; accent2: string; onAccent: string; accentSoft: string; warn: string; warnSoft: string; danger: string;
  addBg: string; addText: string; delBg: string; delText: string;
}
export interface TextRoles { h1: string; h2: string; h3: string; h4: string; bullet: string; bold: string; italic: string; code: string; codeBg: string; link: string; quote: string }
export interface Roles { ui: UiRoles; text: TextRoles }
export const themes: Theme[];
export function findTheme(id: string): Theme | undefined;
export function roles(t: Theme): Roles;
export function cssVars(t: Theme, prefix?: string): Record<string, string>;
export function applyTheme(t: Theme | undefined, el?: HTMLElement, prefix?: string): void;
export function swatches(t: Theme): string[];
export function mix(a: string, b: string, t: number): string;
export function contrast(a: string, b: string): number;
export function legible(c: string, bg: string, fg: string, min?: number): string;
