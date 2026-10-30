import React from 'react';
import {interpolate} from 'remotion';
import {Blob} from './characters/parts';
import {BODY, HEAD} from './fonts';
import {C, STROKE} from './theme';

/* ---------- Texto ---------- */

export type Seg = string | {t: string; c?: string; u?: 'neg' | 'pos'};

/** Pieza de texto con palabras resaltadas: {t:'NO', c:C.red}. */
export const Rich: React.FC<{segs: Seg[]}> = ({segs}) => (
  <>
    {segs.map((s, i) =>
      typeof s === 'string' ? (
        <span key={i}>{s}</span>
      ) : (
        <span
          key={i}
          style={{
            color: s.c ?? (s.u === 'neg' ? C.red : s.u === 'pos' ? C.green : undefined),
          }}
        >
          {s.t}
        </span>
      ),
    )}
  </>
);

/** Titular tipo "sticker" en la parte alta (zona segura bajo la interfaz de Reels/TikTok). */
export const Headline: React.FC<{
  p: number;
  out?: number;
  top?: number;
  rotate?: number;
  size?: number;
  bg?: string;
  children: React.ReactNode;
}> = ({p, out = 0, top = 190, rotate = -2, size = 84, bg = C.paper, children}) => {
  const s = interpolate(p, [0, 1], [0.6, 1]) * interpolate(out, [0, 1], [1, 0.7]);
  const o = Math.min(1, p * 1.6) * (1 - out);
  return (
    <div
      style={{
        position: 'absolute',
        top,
        left: 70,
        right: 70,
        display: 'flex',
        justifyContent: 'center',
        transform: `scale(${s}) rotate(${rotate}deg)`,
        opacity: o,
      }}
    >
      <div
        style={{
          background: bg,
          border: `${STROKE + 1}px solid ${C.ink}`,
          borderRadius: 42,
          boxShadow: `0 12px 0 ${C.ink}`,
          padding: '26px 44px 18px',
          fontFamily: HEAD,
          fontWeight: 800,
          fontSize: size,
          lineHeight: 1.02,
          color: C.ink,
          textAlign: 'center',
          letterSpacing: -0.5,
        }}
      >
        {children}
      </div>
    </div>
  );
};

/** Globo de diálogo. `tail` = posición x (0..1) de la colita y hacia qué lado apunta. */
export const Bubble: React.FC<{
  x: number;
  y: number;
  w: number;
  p: number;
  tone?: 'plain' | 'neg' | 'pos' | 'think';
  tail?: {at: number; dir: -1 | 1};
  size?: number;
  rotate?: number;
  children: React.ReactNode;
}> = ({x, y, w, p, tone = 'plain', tail = {at: 0.5, dir: 1}, size = 66, rotate = 0, children}) => {
  const border = tone === 'neg' ? C.red : tone === 'pos' ? C.green : C.ink;
  const bg = tone === 'neg' ? '#FFF1EF' : tone === 'pos' ? '#EFFBF3' : C.paper;
  const col = tone === 'neg' ? '#C2272D' : tone === 'pos' ? '#1E7E4E' : C.ink;
  const sc = interpolate(p, [0, 1], [0.3, 1]);
  return (
    <div
      style={{
        position: 'absolute',
        left: x - w / 2,
        top: y,
        width: w,
        transform: `rotate(${rotate}deg) scale(${sc})`,
        transformOrigin: `${tail.at * 100}% 120%`,
        opacity: Math.min(1, p * 2),
      }}
    >
      <div
        style={{
          position: 'relative',
          background: bg,
          border: `${STROKE + 2}px solid ${border}`,
          borderRadius: 48,
          padding: '22px 30px 16px',
          fontFamily: HEAD,
          fontWeight: 800,
          fontSize: size,
          lineHeight: 1.0,
          textAlign: 'center',
          color: col,
          boxShadow: `0 10px 0 ${C.ink}22`,
        }}
      >
        {children}
        <svg
          width={70}
          height={60}
          viewBox="0 0 70 60"
          style={{
            position: 'absolute',
            left: `calc(${tail.at * 100}% - 35px)`,
            bottom: -54,
            transform: tail.dir < 0 ? 'scaleX(-1)' : undefined,
          }}
        >
          {tone === 'think' ? (
            <g>
              <circle cx={30} cy={18} r={12} fill={bg} stroke={border} strokeWidth={STROKE} />
              <circle cx={48} cy={44} r={7} fill={bg} stroke={border} strokeWidth={STROKE} />
            </g>
          ) : (
            <g>
              <path d="M 12 -4 L 50 52 L 46 -4 Z" fill={bg} />
              <path d="M 12 0 L 50 52 L 44 0" fill="none" stroke={border} strokeWidth={STROKE + 2} strokeLinejoin="round" />
            </g>
          )}
        </svg>
      </div>
    </div>
  );
};

/* ---------- Iconos SVG (coordenadas locales, centrados en 0,0) ---------- */

/** Tachón rojo que se dibuja: `p` 0..1. */
export const CrossMark: React.FC<{x: number; y: number; size: number; p: number; width?: number}> = ({
  x,
  y,
  size,
  p,
  width = 26,
}) => {
  const L = size * 1.42;
  const a = Math.min(1, p * 2);
  const b = Math.max(0, p * 2 - 1);
  const line = (d: string, t: number) => (
    <g>
      <path d={d} stroke={C.ink} strokeWidth={width + 12} strokeLinecap="round" strokeDasharray={L} strokeDashoffset={L * (1 - t)} fill="none" />
      <path d={d} stroke={C.red} strokeWidth={width} strokeLinecap="round" strokeDasharray={L} strokeDashoffset={L * (1 - t)} fill="none" />
    </g>
  );
  const h = size / 2;
  return (
    <g transform={`translate(${x},${y})`} opacity={p > 0 ? 1 : 0}>
      {line(`M ${-h} ${-h} L ${h} ${h}`, a)}
      {line(`M ${h} ${-h} L ${-h} ${h}`, b)}
    </g>
  );
};

export const CheckBadge: React.FC<{x: number; y: number; r: number; p: number; color?: string}> = ({
  x,
  y,
  r,
  p,
  color = C.green,
}) => {
  const L = r * 2.2;
  const draw = interpolate(p, [0.3, 1], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <g transform={`translate(${x},${y}) scale(${Math.min(1.1, p)})`} opacity={p > 0 ? 1 : 0}>
      <circle r={r} fill={color} stroke={C.ink} strokeWidth={STROKE} />
      <path
        d={`M ${-r * 0.45} ${r * 0.02} L ${-r * 0.1} ${r * 0.36} L ${r * 0.5} ${-r * 0.32}`}
        fill="none"
        stroke="#fff"
        strokeWidth={r * 0.22}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={L}
        strokeDashoffset={L * (1 - draw)}
      />
    </g>
  );
};

export const XBadge: React.FC<{x: number; y: number; r: number; p: number}> = ({x, y, r, p}) => (
  <g transform={`translate(${x},${y}) scale(${Math.min(1.1, p)})`} opacity={p > 0 ? 1 : 0}>
    <circle r={r} fill={C.red} stroke={C.ink} strokeWidth={STROKE} />
    <path
      d={`M ${-r * 0.35} ${-r * 0.35} L ${r * 0.35} ${r * 0.35} M ${r * 0.35} ${-r * 0.35} L ${-r * 0.35} ${r * 0.35}`}
      stroke="#fff"
      strokeWidth={r * 0.22}
      strokeLinecap="round"
    />
  </g>
);

export const QuestionMark: React.FC<{x: number; y: number; s: number; rot?: number; color?: string}> = ({
  x,
  y,
  s,
  rot = 0,
  color = C.orange,
}) => (
  <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`}>
    <text
      x={0}
      y={0}
      textAnchor="middle"
      dominantBaseline="central"
      fontFamily={HEAD}
      fontWeight={800}
      fontSize={120}
      fill={color}
      stroke={C.ink}
      strokeWidth={8}
      paintOrder="stroke"
    >
      ?
    </text>
  </g>
);

export const Lightbulb: React.FC<{x: number; y: number; s: number; glow: number}> = ({x, y, s, glow}) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
      <line
        key={a}
        x1={0}
        y1={-78}
        x2={0}
        y2={-78 - 26 * glow}
        transform={`rotate(${a})`}
        stroke={C.orange}
        strokeWidth={10}
        strokeLinecap="round"
        opacity={glow}
      />
    ))}
    <circle r={58} fill={C.yellow} stroke={C.ink} strokeWidth={STROKE} />
    <path d="M -22 8 Q 0 -24 22 8" fill="none" stroke={C.orange} strokeWidth={7} strokeLinecap="round" />
    <rect x={-26} y={50} width={52} height={34} rx={8} fill="#B9C2CC" stroke={C.ink} strokeWidth={STROKE} />
    <path d="M -24 62 L 24 62 M -24 73 L 24 73" stroke={C.ink} strokeWidth={4} />
    <ellipse cx={-22} cy={-22} rx={10} ry={16} fill="#fff" opacity={0.75} transform="rotate(30,-22,-22)" />
  </g>
);

export const EyeIcon: React.FC<{x: number; y: number; s: number; open?: number}> = ({x, y, s, open = 1}) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <g transform={`scale(1,${open})`}>
      <path d="M -90 0 Q 0 -78 90 0 Q 0 78 -90 0 Z" fill="#fff" stroke={C.ink} strokeWidth={STROKE} strokeLinejoin="round" />
      <circle r={36} fill={C.blue} stroke={C.ink} strokeWidth={STROKE} />
      <circle r={17} fill={C.ink} />
      <circle cx={-10} cy={-12} r={8} fill="#fff" />
    </g>
  </g>
);

export const Heart: React.FC<{x: number; y: number; s: number; rot?: number; color?: string}> = ({
  x,
  y,
  s,
  rot = 0,
  color = C.pink,
}) => (
  <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`}>
    <path
      d="M 0 30 C -60 -10 -40 -60 0 -30 C 40 -60 60 -10 0 30 Z"
      fill={color}
      stroke={C.ink}
      strokeWidth={STROKE}
      strokeLinejoin="round"
    />
    <ellipse cx={-20} cy={-24} rx={7} ry={10} fill="#fff" opacity={0.7} transform="rotate(-30,-20,-24)" />
  </g>
);

export const Star: React.FC<{x: number; y: number; s: number; rot?: number; color?: string}> = ({
  x,
  y,
  s,
  rot = 0,
  color = C.yellow,
}) => {
  const pts = Array.from({length: 10}, (_, i) => {
    const r = i % 2 === 0 ? 40 : 18;
    const a = (Math.PI / 5) * i - Math.PI / 2;
    return `${Math.cos(a) * r},${Math.sin(a) * r}`;
  }).join(' ');
  return (
    <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`}>
      <polygon points={pts} fill={color} stroke={C.ink} strokeWidth={STROKE} strokeLinejoin="round" />
    </g>
  );
};

/** Destello de 4 puntas para "momentos clave". */
export const Sparkle: React.FC<{x: number; y: number; s: number; color?: string}> = ({x, y, s, color = '#fff'}) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <path d="M 0 -30 Q 4 -4 30 0 Q 4 4 0 30 Q -4 4 -30 0 Q -4 -4 0 -30 Z" fill={color} stroke={C.ink} strokeWidth={4} strokeLinejoin="round" />
  </g>
);

/** Ondas de sonido (gritos o voz bajita). `n` arcos, `amp` tamaño. */
export const SoundWaves: React.FC<{x: number; y: number; dir: -1 | 1; amp: number; n?: number; color?: string; phase?: number}> = ({
  x,
  y,
  dir,
  amp,
  n = 3,
  color = C.red,
  phase = 0,
}) => (
  <g transform={`translate(${x},${y}) scale(${dir},1)`}>
    {Array.from({length: n}, (_, i) => {
      const r = (30 + i * 34) * amp;
      const o = 1 - ((i + phase) % n) / (n + 0.5);
      return (
        <path
          key={i}
          d={`M ${r * 0.5} ${-r * 0.86} A ${r} ${r} 0 0 1 ${r * 0.5} ${r * 0.86}`}
          fill="none"
          stroke={color}
          strokeWidth={12 * Math.max(0.5, amp)}
          strokeLinecap="round"
          opacity={Math.max(0.15, o)}
        />
      );
    })}
  </g>
);

/** Nube "borrosa" (idea vaga). */
export const FogCloud: React.FC<{x: number; y: number; s: number; fill?: string}> = ({x, y, s, fill = '#E4E0EA'}) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <Blob
      fill={fill}
      circles={[
        [-120, 10, 70],
        [-50, -40, 90],
        [50, -45, 85],
        [125, 5, 70],
        [60, 45, 70],
        [-55, 45, 70],
        [0, 20, 80],
      ]}
    />
  </g>
);

/** Cerebro con carita. */
export const Brain: React.FC<{x: number; y: number; s: number; look?: [number, number]; mood?: 'confused' | 'happy'; open?: number}> = ({
  x,
  y,
  s,
  look = [0, 0],
  mood = 'confused',
  open = 1,
}) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <Blob
      fill="#F7A8B8"
      circles={[
        [-80, -30, 62],
        [-20, -70, 62],
        [50, -62, 60],
        [95, -5, 56],
        [60, 50, 58],
        [-10, 55, 62],
        [-90, 35, 50],
        [0, -5, 70],
      ]}
    />
    <path d="M -120 -10 Q -90 -30 -60 -10 M -40 -90 Q -30 -60 -50 -40 M 40 -100 Q 30 -70 60 -50 M 110 -30 Q 90 -10 110 20 M -70 70 Q -50 50 -30 80 M 30 85 Q 40 60 70 70"
      fill="none" stroke="#D9778C" strokeWidth={7} strokeLinecap="round" />
    <g transform={`scale(1,${open})`}>
      <ellipse cx={-34} cy={4} rx={20} ry={24} fill="#fff" stroke={C.ink} strokeWidth={5} />
      <ellipse cx={34} cy={4} rx={20} ry={24} fill="#fff" stroke={C.ink} strokeWidth={5} />
      <circle cx={-34 + look[0] * 8} cy={8 + look[1] * 8} r={11} fill={C.ink} />
      <circle cx={34 + look[0] * 8} cy={8 + look[1] * 8} r={11} fill={C.ink} />
    </g>
    {mood === 'confused' ? (
      <path d="M -20 52 q 7 -8 14 0 t 14 0 t 14 0" fill="none" stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
    ) : (
      <path d="M -22 44 Q 0 66 22 44" fill="none" stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
    )}
  </g>
);

export const Clipboard: React.FC<{x: number; y: number; w: number; h: number; rot?: number; children?: React.ReactNode}> = ({
  x,
  y,
  w,
  h,
  rot = 0,
  children,
}) => (
  <g transform={`translate(${x},${y}) rotate(${rot})`}>
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={34} fill="#C98B55" stroke={C.ink} strokeWidth={STROKE} />
    <rect x={-w / 2 + 26} y={-h / 2 + 46} width={w - 52} height={h - 72} rx={16} fill="#fff" stroke={C.ink} strokeWidth={STROKE} />
    <rect x={-80} y={-h / 2 - 22} width={160} height={58} rx={16} fill="#B9C2CC" stroke={C.ink} strokeWidth={STROKE} />
    <circle cx={0} cy={-h / 2 - 8} r={10} fill={C.ink} />
    {children}
  </g>
);

export const Phone: React.FC<{x: number; y: number; s: number; rot?: number; children?: React.ReactNode}> = ({
  x,
  y,
  s,
  rot = 0,
  children,
}) => (
  <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-150} y={-280} width={300} height={560} rx={48} fill="#3A3F4B" stroke={C.ink} strokeWidth={STROKE} />
    <rect x={-128} y={-246} width={256} height={480} rx={26} fill="#FFF6EC" />
    <rect x={-40} y={-268} width={80} height={14} rx={7} fill="#20242C" />
    {children}
  </g>
);

export const PaperPlane: React.FC<{x: number; y: number; s: number; rot?: number}> = ({x, y, s, rot = 0}) => (
  <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -70 0 L 80 -50 L 20 60 L 0 18 Z" fill="#fff" stroke={C.ink} strokeWidth={STROKE} strokeLinejoin="round" />
    <path d="M 0 18 L 80 -50 L 10 30" fill="#DCE6F2" stroke={C.ink} strokeWidth={STROKE} strokeLinejoin="round" />
  </g>
);

export const textStyle = (size: number, color = C.ink, weight = 800): React.CSSProperties => ({
  fontFamily: weight >= 700 ? HEAD : BODY,
  fontWeight: weight,
  fontSize: size,
  color,
  lineHeight: 1.05,
});
