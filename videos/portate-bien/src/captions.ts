// Subtítulos: palabras con su segundo de inicio (transcripción + revisión manual contra las pausas del audio).
// Cada bloque es una línea en pantalla; la palabra que se está diciendo se resalta.
type W = [string, number];

const OFFSET = -0.12; // la transcripción llega ~0.1 s tarde respecto a la onda

const raw: W[][] = [
  [['Deja', 0.77], ['de', 1.22], ['decirle', 1.56], ['a', 1.78], ['tu', 1.82], ['hijo', 2.02]],
  [['«Pórtate', 2.62], ['bien»', 3.24]],
  [['y', 3.88], ['te', 3.92], ['explico', 4.28], ['por', 4.6], ['qué', 5.04]],
  [['Básicamente,', 5.75]],
  [['el', 6.6], ['cerebro', 6.6], ['del', 7.0], ['niño', 7.24]],
  [['no', 7.5], ['recepciona', 7.98]],
  [['qué', 8.9], ['es', 9.24], ['portarse', 9.52], ['bien', 9.98]],
  [['si', 10.38], ['no', 10.72], ['define', 10.96]],
  [['ninguna', 11.28], ['acción', 11.76]],
  [['Entonces,', 12.7], ['en', 13.4], ['vez', 13.52], ['de', 13.64]],
  [['usar', 13.9], ['una', 14.16], ['simple', 14.54], ['frase,', 14.86]],
  [['tienes', 15.62], ['que', 15.86], ['decirle', 16.1], ['exactamente', 16.72]],
  [['a', 17.34], ['tu', 17.5], ['hijo', 17.64]],
  [['lo', 17.84], ['que', 18.14], ['SÍ', 18.34], ['quieres', 18.56], ['ver', 18.88]],
  [['En', 19.62], ['vez', 19.84], ['de', 19.98], ['decirle,', 20.2]],
  [['«Fulanito,', 20.58], ['no', 21.26], ['corras»', 21.48]],
  [['mejor', 22.3], ['sustituye', 22.76], ['el', 23.46], ['«no»', 23.76]],
  [['y', 24.0], ['esa', 24.28], ['frase', 24.46], ['y', 24.82], ['dile:', 25.16]],
  [['«Camina', 26.05], ['despacio»', 26.42]],
  [['En', 27.71], ['vez', 28.02], ['de', 28.14], ['decirle', 28.34], ['al', 28.94], ['niño', 28.98]],
  [['«No', 29.7], ['grites»', 29.84]],
  [['mejor', 30.62], ['dile:', 30.84]],
  [['«Usa', 31.35], ['tu', 31.64], ['voz', 31.86], ['bajita»', 32.18]],
  [['Entonces', 33.0], ['aquí', 33.16], ['SÍ', 33.68], ['tenemos', 34.2]],
  [['una', 34.54], ['acción', 34.96]],
  [['que', 35.7], ['define', 36.08], ['eso', 36.4]],
  [['que', 36.88], ['tú', 37.02], ['como', 37.28], ['padres', 37.58], ['quieres', 38.0], ['ver', 38.68]],
  [['y', 39.0], ['lo', 39.22], ['que', 39.36], ['para', 39.54], ['ti', 39.74]],
  [['es', 40.1], ['portarse', 40.46], ['bien', 40.92]],
  [['Entonces,', 41.7], ['si', 42.52], ['tú', 42.72], ['conoces', 43.0], ['a', 43.46], ['alguien', 43.8]],
  [['que', 43.96], ['repite', 44.42], ['20', 44.98], ['veces', 45.4], ['al', 45.84], ['día', 46.14]],
  [['«Pórtate', 46.8], ['bien»', 47.14]],
  [['mándale', 47.7], ['este', 48.02], ['video', 48.18]],
  [['que', 48.44], ['yo', 48.62], ['estoy', 48.74], ['segura', 48.9]],
  [['que', 49.4], ['le', 49.56], ['va', 49.64], ['a', 49.76], ['ayudar', 49.98]],
];

// Palabras que se pintan con color (negativo / positivo) dentro del subtítulo.
const NEG = new Set(['«pórtate', 'bien»', '«fulanito,', 'no', 'corras»', '«no»', '«no', 'grites»']);
const POS = new Set(['sí', '«camina', 'despacio»', '«usa', 'tu', 'voz', 'bajita»', 'acción', 'exactamente']);

export type CapWord = {text: string; start: number; tone: 'neg' | 'pos' | 'none'};
export type CapLine = {words: CapWord[]; start: number; end: number};

const toneOf = (line: W[], w: string): CapWord['tone'] => {
  const k = w.toLowerCase();
  const quoted = line.some(([t]) => t.includes('«') || t.includes('»'));
  if (POS.has(k) && (quoted || k === 'sí' || k === 'acción' || k === 'exactamente')) return 'pos';
  if (NEG.has(k) && quoted) return 'neg';
  return 'none';
};

export const CAPTIONS: CapLine[] = raw.map((line, i) => {
  const start = line[0][1] + OFFSET;
  const next = raw[i + 1];
  const end = next ? next[0][1] + OFFSET : 51.3;
  return {
    start,
    end,
    words: line.map(([t, s]) => ({text: t, start: s + OFFSET, tone: toneOf(line, t)})),
  };
});
