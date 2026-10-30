import React from 'react';
import {C, STROKE} from '../theme';

export type Mouth = 'smile' | 'grin' | 'o' | 'frown' | 'yell' | 'flat' | 'wavy' | 'whisper';
export type Eyes = 'normal' | 'happy' | 'wide' | 'closed' | 'squint';
export type Brows = 'neutral' | 'worried' | 'angry' | 'raised' | 'happy';

/**
 * Silueta hecha con varios círculos: primero todos los contornos, luego todos los rellenos,
 * así el borde queda continuo alrededor de la unión (pelo, nubes, cerebro).
 */
export const Blob: React.FC<{circles: [number, number, number][]; fill: string; stroke?: number}> = ({
  circles,
  fill,
  stroke = STROKE,
}) => (
  <g>
    {circles.map(([x, y, r], i) => (
      <circle key={`o${i}`} cx={x} cy={y} r={r + stroke} fill={C.ink} />
    ))}
    {circles.map(([x, y, r], i) => (
      <circle key={`f${i}`} cx={x} cy={y} r={r} fill={fill} />
    ))}
  </g>
);

/**
 * Brazo de dos segmentos (hombro + codo). Ángulos en grados: 0 = colgando,
 * positivo = hacia afuera del cuerpo. Contorno y relleno en pasadas separadas
 * para que el codo no muestre costura.
 */
export const Arm: React.FC<{
  side: -1 | 1;
  x: number;
  y: number;
  upper: number;
  fore: number;
  width: number;
  a1: number;
  a2: number;
  skin: string;
  sleeve: string;
  sleeveLen: number;
  hand?: number;
}> = ({side, x, y, upper, fore, width, a1, a2, skin, sleeve, sleeveLen, hand = width * 0.62}) => {
  const r1 = -side * a1;
  const r2 = -side * a2;
  const geo = (mode: 'o' | 'f') => {
    const w = mode === 'o' ? width + STROKE * 2 : width;
    const col = mode === 'o' ? C.ink : skin;
    return (
      <g transform={`translate(${x},${y}) rotate(${r1})`}>
        <line x1={0} y1={0} x2={0} y2={upper} stroke={col} strokeWidth={w} strokeLinecap="round" />
        <g transform={`translate(0,${upper}) rotate(${r2})`}>
          <line x1={0} y1={0} x2={0} y2={fore} stroke={col} strokeWidth={w} strokeLinecap="round" />
          <circle cx={0} cy={fore + 4} r={mode === 'o' ? hand + STROKE : hand} fill={col} />
        </g>
      </g>
    );
  };
  return (
    <g>
      {geo('o')}
      {geo('f')}
      <g transform={`translate(${x},${y}) rotate(${r1})`}>
        <rect
          x={-width / 2 - 7}
          y={-width / 2}
          width={width + 14}
          height={sleeveLen + width / 2}
          rx={width / 2}
          fill={sleeve}
          stroke={C.ink}
          strokeWidth={STROKE}
        />
      </g>
    </g>
  );
};

export const EyePair: React.FC<{
  y: number;
  dx: number;
  rx: number;
  ry: number;
  look: [number, number];
  open: number;
  kind: Eyes;
  lashes?: boolean;
}> = ({y, dx, rx, ry, look, open, kind, lashes}) => {
  const eye = (cx: number, key: string) => {
    if (kind === 'happy' || kind === 'closed' || open < 0.12) {
      const d =
        kind === 'happy'
          ? `M ${cx - rx} ${y + 4} Q ${cx} ${y - ry} ${cx + rx} ${y + 4}`
          : `M ${cx - rx} ${y} Q ${cx} ${y + ry * 0.5} ${cx + rx} ${y}`;
      return <path key={key} d={d} fill="none" stroke={C.ink} strokeWidth={STROKE} strokeLinecap="round" />;
    }
    const sy = kind === 'squint' ? 0.55 : kind === 'wide' ? 1.15 : 1;
    const pr = kind === 'wide' ? rx * 0.42 : rx * 0.58;
    return (
      <g key={key} transform={`translate(${cx},${y}) scale(1,${open * sy})`}>
        <ellipse cx={0} cy={0} rx={rx} ry={ry} fill="#fff" stroke={C.ink} strokeWidth={STROKE * 0.75} />
        <circle cx={look[0] * rx * 0.35} cy={look[1] * ry * 0.3 + 2} r={pr} fill={C.ink} />
        <circle cx={look[0] * rx * 0.35 - pr * 0.35} cy={look[1] * ry * 0.3 - pr * 0.35} r={pr * 0.36} fill="#fff" />
        {lashes ? (
          <path
            d={`M ${-rx * 0.9} ${-ry * 0.55} L ${-rx * 1.35} ${-ry * 0.95}`}
            stroke={C.ink}
            strokeWidth={STROKE * 0.7}
            strokeLinecap="round"
            transform={cx > 0 ? 'scale(-1,1)' : undefined}
          />
        ) : null}
      </g>
    );
  };
  return (
    <g>
      {eye(-dx, 'l')}
      {eye(dx, 'r')}
    </g>
  );
};

export const BrowPair: React.FC<{y: number; dx: number; w: number; kind: Brows; color?: string}> = ({
  y,
  dx,
  w,
  kind,
  color = C.ink,
}) => {
  // inclinación (rad) del extremo interior respecto al exterior, y curvatura
  const cfg: Record<Brows, [number, number, number]> = {
    neutral: [0, -4, 0],
    worried: [-12, -2, 0],
    angry: [14, 0, 0],
    raised: [0, -6, -12],
    happy: [0, -8, -4],
  };
  const [tilt, curve, lift] = cfg[kind];
  const one = (side: -1 | 1) => {
    const outer = side * (dx + w / 2);
    const inner = side * (dx - w / 2);
    const yo = y + lift;
    const yi = y + lift + tilt;
    const mx = (outer + inner) / 2;
    return (
      <path
        key={side}
        d={`M ${inner} ${yi} Q ${mx} ${Math.min(yi, yo) + curve * 1.6} ${outer} ${yo}`}
        fill="none"
        stroke={color}
        strokeWidth={STROKE * 1.15}
        strokeLinecap="round"
      />
    );
  };
  return (
    <g>
      {one(-1)}
      {one(1)}
    </g>
  );
};

/** Boca. `talk` (0..1) abre la boca al ritmo de la voz y tiene prioridad sobre la forma base. */
export const MouthShape: React.FC<{x?: number; y: number; s: number; kind: Mouth; talk: number}> = ({
  x = 0,
  y,
  s,
  kind,
  talk,
}) => {
  const sw = STROKE * 0.9;
  const dark = '#5A1F1F';
  const tongue = '#F07B7B';
  if (talk > 0.06 && kind !== 'yell') {
    const h = 4 + talk * 20;
    return (
      <g transform={`translate(${x},${y}) scale(${s})`}>
        <ellipse cx={0} cy={2} rx={14 + talk * 4} ry={h} fill={dark} stroke={C.ink} strokeWidth={sw} />
        <ellipse cx={0} cy={2 + h * 0.55} rx={8} ry={Math.max(1, h * 0.35)} fill={tongue} />
      </g>
    );
  }
  let el: React.ReactNode;
  switch (kind) {
    case 'smile':
      el = <path d="M -22 -4 Q 0 18 22 -4" fill="none" stroke={C.ink} strokeWidth={sw} strokeLinecap="round" />;
      break;
    case 'grin':
      el = (
        <g>
          <path d="M -28 -6 Q 0 34 28 -6 Z" fill={dark} stroke={C.ink} strokeWidth={sw} strokeLinejoin="round" />
          <path d="M -12 14 Q 0 6 12 14 Q 0 22 -12 14 Z" fill={tongue} />
        </g>
      );
      break;
    case 'o':
      el = <ellipse cx={0} cy={2} rx={10} ry={13} fill={dark} stroke={C.ink} strokeWidth={sw} />;
      break;
    case 'whisper':
      el = <ellipse cx={0} cy={2} rx={6} ry={7} fill={dark} stroke={C.ink} strokeWidth={sw * 0.8} />;
      break;
    case 'frown':
      el = <path d="M -20 10 Q 0 -8 20 10" fill="none" stroke={C.ink} strokeWidth={sw} strokeLinecap="round" />;
      break;
    case 'flat':
      el = <path d="M -16 2 L 16 2" fill="none" stroke={C.ink} strokeWidth={sw} strokeLinecap="round" />;
      break;
    case 'wavy':
      el = (
        <path d="M -22 2 q 7 -8 14 0 t 15 0 t 15 0" fill="none" stroke={C.ink} strokeWidth={sw} strokeLinecap="round" />
      );
      break;
    case 'yell': {
      const h = 26 + talk * 10;
      el = (
        <g>
          <ellipse cx={0} cy={10} rx={34} ry={h} fill={dark} stroke={C.ink} strokeWidth={sw} />
          <path d={`M -24 ${10 - h * 0.62} Q 0 ${10 - h * 0.85} 24 ${10 - h * 0.62} L 22 ${2 - h * 0.45} Q 0 ${
            -h * 0.55
          } -22 ${2 - h * 0.45} Z`} fill="#fff" />
          <ellipse cx={0} cy={10 + h * 0.55} rx={18} ry={h * 0.3} fill={tongue} />
        </g>
      );
      break;
    }
  }
  return <g transform={`translate(${x},${y}) scale(${s})`}>{el}</g>;
};
