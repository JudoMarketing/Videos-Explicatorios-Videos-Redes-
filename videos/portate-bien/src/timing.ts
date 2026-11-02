export const FPS = 30;
export const TOTAL_FRAMES = 1541; // 51.36 s de audio

const s = (sec: number) => Math.round(sec * FPS);

// Límites de escena, alineados a las pausas reales de la voz.
export const SCENES = {
  hook: [0, s(5.6)],
  brain: [s(5.6), s(12.6)],
  specific: [s(12.6), s(19.5)],
  run: [s(19.5), s(27.6)],
  shout: [s(27.6), s(32.9)],
  action: [s(32.9), s(41.5)],
  share: [s(41.5), TOTAL_FRAMES],
} as const;

export const sec = s;
