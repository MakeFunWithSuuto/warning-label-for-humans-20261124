// Runs main.ts, renders entry.txt as a printed label in screenshots/entry.png, and writes dossier.json for the mock judge.
import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join, resolve } from 'node:path';

const repo = resolve(import.meta.dirname, '..');
const out = join(repo, 'out');
execFileSync('node', [join(repo, 'main.ts')], { env: { ...process.env, MAKEFUN_OUTPUT_DIR: out } });
const entry = readFileSync(join(out, 'entry.txt'), 'utf8');

const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const html = `<!doctype html><meta charset="utf-8"><body style="margin:0;width:1200px;height:630px;display:flex;
align-items:center;justify-content:center;background:#e9e6df;font-family:Arial,Helvetica,sans-serif">
<div style="border:10px solid #111;background:#ffd400;padding:44px 60px;max-width:960px">
<p style="margin:0;color:#111;font-size:44px;font-weight:bold;line-height:1.3">${esc(entry)}</p></div></body>`;
writeFileSync(join(out, 'entry.html'), html);

mkdirSync(join(repo, 'screenshots'), { recursive: true });
const chrome = join(homedir(), '.cache/ms-playwright/chromium_headless_shell-1254/chrome-headless-shell-linux64/chrome-headless-shell');
execFileSync(chrome, ['--no-sandbox', '--hide-scrollbars', '--window-size=1200,630',
  `--screenshot=${join(repo, 'screenshots/entry.png')}`, `file://${join(out, 'entry.html')}`], { stdio: 'ignore' });

writeFileSync(join(repo, 'dossier.json'), JSON.stringify({ entry, characters: [...entry].length }, null, 1) + '\n');
console.log(`${[...entry].length} chars: ${entry}`);
