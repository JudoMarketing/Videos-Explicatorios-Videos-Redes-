import {continueRender, delayRender, staticFile} from 'remotion';

export const HEAD = '"Baloo 2", system-ui, sans-serif';
export const BODY = 'Fredoka, system-ui, sans-serif';

const faces: [string, string, string][] = [
  ['Baloo 2', 'fonts/baloo-2-latin-800-normal.woff2', '800'],
  ['Baloo 2', 'fonts/baloo-2-latin-700-normal.woff2', '700'],
  ['Fredoka', 'fonts/fredoka-latin-600-normal.woff2', '600'],
  ['Fredoka', 'fonts/fredoka-latin-500-normal.woff2', '500'],
];

let started = false;

// Carga las fuentes una sola vez y bloquea el render hasta que estén listas,
// así ningún fotograma sale con la tipografía de respaldo.
export const ensureFonts = () => {
  if (started) return;
  started = true;
  const handle = delayRender('fonts');
  Promise.all(
    faces.map(([family, file, weight]) => {
      const f = new FontFace(family, `url(${staticFile(file)}) format("woff2")`, {weight});
      return f.load().then((loaded) => (document.fonts as unknown as Set<FontFace>).add(loaded));
    }),
  )
    .then(() => continueRender(handle))
    .catch((e) => {
      console.error(e);
      continueRender(handle);
    });
};
