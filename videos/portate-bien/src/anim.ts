import {Easing, interpolate, spring} from 'remotion';
import amp from './amp.json';
import {FPS} from './timing';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

/** 0→1 con rebote suave a partir del fotograma `at`. */
export const pop = (frame: number, at: number, damping = 11) =>
  frame < at ? 0 : spring({frame: frame - at, fps: FPS, config: {damping, stiffness: 170, mass: 0.8}});

/** 0→1 lineal con easing entre `a` y `b`. */
export const ramp = (frame: number, a: number, b: number, ease = Easing.inOut(Easing.cubic)) =>
  interpolate(frame, [a, b], [0, 1], {...clamp, easing: ease});

/** Aparece en `a` y desaparece en `b` (fundidos de `d` fotogramas). */
export const window = (frame: number, a: number, b: number, d = 8) =>
  interpolate(frame, [a, a + d, b - d, b], [0, 1, 1, 0], clamp);

export const lerp = (t: number, a: number, b: number) => a + (b - a) * t;

/** Volumen normalizado de la voz en ese fotograma (0..1). */
export const voice = (frame: number) => (amp as number[])[Math.max(0, Math.min(amp.length - 1, frame))] ?? 0;

/** Boca abierta 0..1 a partir del volumen, solo dentro de los tramos indicados. */
export const lipSync = (frame: number, spans: [number, number][]) => {
  const on = spans.some(([a, b]) => frame >= a && frame <= b);
  if (!on) return 0;
  const v = (voice(frame) + voice(frame - 1)) / 2;
  return Math.min(1, Math.max(0, (v - 0.12) * 1.6));
};

/** Parpadeo: 1 = ojo abierto, 0 = cerrado. */
export const blink = (frame: number, offset = 0, every = 97) => {
  const t = (frame + offset) % every;
  if (t > 4) return 1;
  return [1, 0.4, 0.05, 0.4, 1][t];
};

export const wobble = (frame: number, speed = 0.12, amount = 1) => Math.sin(frame * speed) * amount;
