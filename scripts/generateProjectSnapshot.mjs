import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const pkgPath = path.join(root, 'package.json');
if (!fs.existsSync(pkgPath)) {
  console.error('Run this script from the ZeroIndex project root (package.json is missing).');
  process.exit(1);
}
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
const sourceDir = path.join(root, 'src');
const relevantExts = new Set(['.js', '.jsx', '.ts', '.tsx', '.css', '.json']);
function walk(folder) {
  if (!fs.existsSync(folder)) return [];
  const out = [];
  for (const ent of fs.readdirSync(folder, { withFileTypes: true })) {
    if (ent.name.startsWith('.') || ent.name === 'node_modules') continue;
    const abs = path.join(folder, ent.name);
    if (ent.isDirectory()) out.push(...walk(abs));
    else if (relevantExts.has(path.extname(ent.name))) out.push(path.relative(root, abs).split(path.sep).join('/'));
  }
  return out.sort();
}
const src = walk(sourceDir);
const testFiles = fs.existsSync('scripts') ? fs.readdirSync('scripts').filter(x => x.startsWith('verify') && x.endsWith('.mjs')).sort() : [];
const deps = {...(pkg.dependencies || {}), ...(pkg.devDependencies || {})};
const visibleDeps = ['react','react-dom','vite','tailwindcss','antd','lucide-react'].filter(name => deps[name]).map(name => `| ${name} | ${deps[name]} |`).join('\n');
const lines = [
  '# Generated Technical Snapshot',
  '',
  '> Machine-derived facts only. This file DOES NOT indicate syllabus completion, author approval, working functionality, test success, or publication.',
  '',
  `- Package: \`${pkg.name ?? 'unknown'}\``,
  `- Declared package version: \`${pkg.version ?? 'unknown'}\``,
  `- Source files (.js/.jsx/.ts/.tsx/.css/.json): **${src.length}**`,
  `- Verification script names discovered: **${testFiles.length}**`,
  '',
  '## Selected declared dependencies',
  '',
  '| Package | Version specifier |',
  '|---|---|',
  visibleDeps,
  '',
  '## Defined npm scripts',
  '',
  ...Object.entries(pkg.scripts || {}).map(([n, c]) => `- \`npm run ${n}\`: \`${c}\``),
  '',
  '## Existing verification scripts (not executed here)',
  '',
  ...testFiles.map(f => `- \`scripts/${f}\``),
  '',
  '## Source file inventory',
  '',
  ...src.map(f => `- \`${f}\``),
  ''
];
const target = path.join(root, 'project-memory', 'TECHNICAL_SNAPSHOT.md');
fs.mkdirSync(path.dirname(target), {recursive: true});
fs.writeFileSync(target, lines.join('\n'), 'utf8');
console.log(`Wrote ${path.relative(root, target)} (${src.length} source files listed).`);
