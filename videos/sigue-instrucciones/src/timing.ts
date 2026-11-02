export const FPS = 30;
export const TOTAL_FRAMES = 2229; // 74.29 s de audio

const s = (sec: number) => Math.round(sec * FPS);

// Límites de escena, alineados a las pausas reales de la voz.
export const SCENES = {
  ask: [0, s(7.85)],
  argue: [s(7.85), s(14.0)],
  explain: [s(14.0), s(22.1)],
  loop: [s(22.1), s(32.35)],
  stop: [s(32.35), s(37.75)],
  offer: [s(37.75), s(48.75)],
  options: [s(48.75), s(61.55)],
  result: [s(61.55), TOTAL_FRAMES],
} as const;

export const sec = s;
