import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {C} from './theme';

/** Barrido diagonal de color que tapa el corte entre escenas (centrado en `at`). */
export const Wipe: React.FC<{at: number; color: string; dur?: number}> = ({at, color, dur = 16}) => {
  const f = useCurrentFrame();
  const a = at - dur / 2;
  if (f < a || f > a + dur) return null;
  const x = interpolate(f, [a, a + dur], [-2.8, 1.4]) * 1080;
  const band = (dx: number, w: number, fill: string) => (
    <div
      style={{
        position: 'absolute',
        top: -200,
        height: 2320,
        left: x + dx,
        width: w,
        background: fill,
        transform: 'skewX(-14deg)',
        borderLeft: `10px solid ${C.ink}`,
        borderRight: `10px solid ${C.ink}`,
      }}
    />
  );
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {band(0, 2200, color)}
      {band(2200, 90, C.yellow)}
      {band(-90, 90, C.pink)}
    </AbsoluteFill>
  );
};
