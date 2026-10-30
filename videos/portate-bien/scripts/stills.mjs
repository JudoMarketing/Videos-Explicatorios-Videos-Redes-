// Renderiza fotogramas sueltos para revisión: node scripts/stills.mjs 100,300,500 [carpeta]
import {bundle} from '@remotion/bundler';
import {renderStill, selectComposition} from '@remotion/renderer';
import path from 'node:path';
import fs from 'node:fs';

const frames = (process.argv[2] ?? '0').split(',').map(Number);
const outDir = process.argv[3] ?? 'stills';
fs.mkdirSync(outDir, {recursive: true});
const serveUrl = await bundle({entryPoint: path.resolve('src/index.ts')});
const browserExecutable = process.env.REMOTION_BROWSER_EXECUTABLE ?? null;
const composition = await selectComposition({serveUrl, id: 'PortateBien', browserExecutable});
for (const frame of frames) {
  const output = path.join(outDir, `f${String(frame).padStart(4, '0')}.png`);
  await renderStill({composition, serveUrl, frame, output, browserExecutable, scale: 0.5});
  console.log(output);
}
