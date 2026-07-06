import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');
const localEnvPath = resolve(rootDir, '.env.local');
const outputPath = resolve(rootDir, 'src/app/core/config/base-url.generated.ts');

function loadLocalEnv() {
  if (!existsSync(localEnvPath)) { return; }

  const lines = readFileSync(localEnvPath, 'utf8').split('\n');

  for (const line of lines) {
    const trimmedLine = line.trim();

    if (!trimmedLine || trimmedLine.startsWith('#')) { continue; }

    const separatorIndex = trimmedLine.indexOf('=');
    if (separatorIndex === -1) { continue; }

    const key = trimmedLine.slice(0, separatorIndex).trim();
    const value = trimmedLine.slice(separatorIndex + 1).trim().replace(/^["']|["']$/g, '');

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

loadLocalEnv();

const baseUrl = process.env.BASE_URL;

if (!baseUrl) {
  throw new Error('BASE_URL is required. Add it to .env.local or configure it in your deploy environment.');
}

writeFileSync(
  outputPath,
  `export const BASE_URL_VALUE = ${JSON.stringify(baseUrl)};\n`,
);

console.log(`Generated ${outputPath}`);
