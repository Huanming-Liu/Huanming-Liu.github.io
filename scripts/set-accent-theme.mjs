import fs from 'node:fs';
import path from 'node:path';

const accent = process.argv[2];
const supportedAccents = new Set(['blue', 'yellow']);

if (!supportedAccents.has(accent)) {
  console.error('Usage: node scripts/set-accent-theme.mjs <blue|yellow>');
  process.exit(1);
}

const configPath = path.join(process.cwd(), 'content', 'config.toml');
const config = fs.readFileSync(configPath, 'utf8');
const themeSection = /(^\[theme\][\s\S]*?^accent\s*=\s*)"(?:blue|yellow)"/m;

if (!themeSection.test(config)) {
  console.error('Could not find [theme] accent in content/config.toml');
  process.exit(1);
}

const updated = config.replace(themeSection, `$1"${accent}"`);
fs.writeFileSync(configPath, updated);
console.log(`Accent theme set to ${accent}.`);
