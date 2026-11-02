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

/* ---------- Utilería del video «Sigue instrucciones» ---------- */

export const StopSign: React.FC<{x: number; y: number; s: number; rot?: number}> = ({x, y, s, rot = 0}) => {
  const pts = Array.from({length: 8}, (_, i) => {
    const a = (Math.PI / 4) * i + Math.PI / 8;
    return `${Math.cos(a) * 150},${Math.sin(a) * 150}`;
  }).join(' ');
  const inner = Array.from({length: 8}, (_, i) => {
    const a = (Math.PI / 4) * i + Math.PI / 8;
    return `${Math.cos(a) * 128},${Math.sin(a) * 128}`;
  }).join(' ');
  return (
    <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`}>
      <rect x={-14} y={140} width={28} height={260} fill="#9AA6B2" stroke={C.ink} strokeWidth={STROKE} />
      <polygon points={pts} fill={C.red} stroke={C.ink} strokeWidth={STROKE + 2} strokeLinejoin="round" />
      <polygon points={inner} fill="none" stroke="#fff" strokeWidth={8} strokeLinejoin="round" />
      <text y={26} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={86} fill="#fff">
        ALTO
      </text>
    </g>
  );
};

export const GiftBox: React.FC<{x: number; y: number; s: number; open?: number}> = ({x, y, s, open = 0}) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <rect x={-80} y={-40} width={160} height={120} rx={12} fill={C.pink} stroke={C.ink} strokeWidth={STROKE} />
    <rect x={-16} y={-40} width={32} height={120} fill={C.yellow} stroke={C.ink} strokeWidth={4} />
    <g transform={`translate(0,${-open * 40}) rotate(${-open * 12})`}>
      <rect x={-92} y={-74} width={184} height={40} rx={10} fill="#FF6F8A" stroke={C.ink} strokeWidth={STROKE} />
      <rect x={-16} y={-74} width={32} height={40} fill={C.yellow} stroke={C.ink} strokeWidth={4} />
      <path d="M 0 -74 C -60 -130 -80 -70 0 -74 C 80 -70 60 -130 0 -74 Z" fill={C.yellow} stroke={C.ink} strokeWidth={STROKE} strokeLinejoin="round" />
    </g>
  </g>
);

/** Tarjeta con icono y rótulo (premios y privilegios). */
export const IconCard: React.FC<{
  x: number;
  y: number;
  p: number;
  label: string;
  tone?: 'pos' | 'neg';
  crossed?: number;
  children: React.ReactNode;
}> = ({x, y, p, label, tone = 'pos', crossed = 0, children}) => {
  if (p <= 0) return null;
  const border = tone === 'pos' ? C.green : C.red;
  return (
    <g transform={`translate(${x},${y}) scale(${Math.min(1.08, p)})`} opacity={Math.min(1, p * 2)}>
      <rect x={-116} y={-112} width={232} height={232} rx={34} fill="#5C3A22" opacity={0.12} transform="translate(6,10)" />
      <rect x={-116} y={-112} width={232} height={232} rx={34} fill="#fff" stroke={border} strokeWidth={STROKE + 2} />
      <g transform="translate(0,-22)">{children}</g>
      <text y={92} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={34} fill={C.ink}>
        {label}
      </text>
      {crossed > 0 ? <CrossMark x={0} y={0} size={170} p={crossed} width={20} /> : null}
    </g>
  );
};

export const TreeIcon: React.FC = () => (
  <g>
    <rect x={-10} y={10} width={20} height={56} rx={6} fill="#B07443" stroke={C.ink} strokeWidth={4} />
    <circle cx={-26} cy={0} r={34} fill="#6BB86A" stroke={C.ink} strokeWidth={4} />
    <circle cx={26} cy={-4} r={36} fill="#7CC27A" stroke={C.ink} strokeWidth={4} />
    <circle cx={0} cy={-34} r={38} fill="#7CC27A" stroke={C.ink} strokeWidth={4} />
    <path d="M -70 66 L 70 66" stroke="#6BB86A" strokeWidth={8} strokeLinecap="round" />
  </g>
);

export const CalendarIcon: React.FC = () => (
  <g>
    <rect x={-66} y={-54} width={132} height={120} rx={14} fill="#fff" stroke={C.ink} strokeWidth={4} />
    <rect x={-66} y={-54} width={132} height={34} rx={14} fill={C.red} stroke={C.ink} strokeWidth={4} />
    <rect x={-40} y={-70} width={12} height={30} rx={6} fill={C.ink} />
    <rect x={28} y={-70} width={12} height={30} rx={6} fill={C.ink} />
    {[0, 1, 2, 3].map((c) =>
      [0, 1, 2].map((r) => (
        <rect key={`${c}${r}`} x={-50 + c * 28} y={-8 + r * 22} width={18} height={14} rx={3} fill={c >= 2 && r === 1 ? C.yellow : '#E8DDD2'} />
      )),
    )}
  </g>
);

export const IceCreamIcon: React.FC = () => (
  <g>
    <path d="M -36 6 L 0 80 L 36 6 Z" fill="#E8B04B" stroke={C.ink} strokeWidth={4} strokeLinejoin="round" />
    <path d="M -24 20 L 16 58 M 24 20 L -10 56" stroke="#C98B2E" strokeWidth={4} />
    <circle cx={-18} cy={-14} r={30} fill={C.pink} stroke={C.ink} strokeWidth={4} />
    <circle cx={20} cy={-16} r={30} fill="#FFF0C9" stroke={C.ink} strokeWidth={4} />
    <circle cx={0} cy={-46} r={28} fill="#B9785A" stroke={C.ink} strokeWidth={4} />
    <circle cx={4} cy={-78} r={9} fill={C.red} stroke={C.ink} strokeWidth={3} />
  </g>
);

export const TabletIcon: React.FC = () => (
  <g>
    <rect x={-70} y={-56} width={140} height={110} rx={14} fill="#3A3F4B" stroke={C.ink} strokeWidth={4} />
    <rect x={-58} y={-44} width={116} height={86} rx={6} fill={C.sky} />
    <path d="M -10 -18 L 18 0 L -10 18 Z" fill="#fff" />
    <circle cx={-34} cy={22} r={8} fill={C.yellow} />
    <circle cx={34} cy={-24} r={6} fill={C.pink} />
  </g>
);

export const Stopwatch: React.FC<{x: number; y: number; s: number; t: number}> = ({x, y, s, t}) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <rect x={-16} y={-100} width={32} height={22} rx={6} fill="#9AA6B2" stroke={C.ink} strokeWidth={4} />
    <circle r={80} fill="#fff" stroke={C.ink} strokeWidth={STROKE + 1} />
    <path d={`M 0 0 L 0 -66 A 66 66 0 ${t > 0.5 ? 1 : 0} 1 ${Math.sin(t * Math.PI * 2) * 66} ${-Math.cos(t * Math.PI * 2) * 66} Z`} fill={C.green} opacity={0.35} />
    <line x1={0} y1={0} x2={Math.sin(t * Math.PI * 2) * 60} y2={-Math.cos(t * Math.PI * 2) * 60} stroke={C.red} strokeWidth={8} strokeLinecap="round" />
    <circle r={9} fill={C.ink} />
  </g>
);

export const Trophy: React.FC<{x: number; y: number; s: number}> = ({x, y, s}) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <path d="M -50 -60 Q -96 -60 -86 -20 Q -78 10 -40 10 M 50 -60 Q 96 -60 86 -20 Q 78 10 40 10" fill="none" stroke={C.ink} strokeWidth={12} />
    <path d="M -50 -60 Q -96 -60 -86 -20 Q -78 10 -40 10 M 50 -60 Q 96 -60 86 -20 Q 78 10 40 10" fill="none" stroke={C.yellow} strokeWidth={6} />
    <path d="M -56 -70 L 56 -70 Q 56 30 0 40 Q -56 30 -56 -70 Z" fill={C.yellow} stroke={C.ink} strokeWidth={STROKE} strokeLinejoin="round" />
    <rect x={-12} y={38} width={24} height={30} fill="#E8B04B" stroke={C.ink} strokeWidth={4} />
    <rect x={-46} y={64} width={92} height={26} rx={6} fill="#B07443" stroke={C.ink} strokeWidth={STROKE} />
    <path d="M -30 -50 Q -32 -10 -14 14" fill="none" stroke="#fff" strokeWidth={8} strokeLinecap="round" opacity={0.6} />
  </g>
);

/** Juguete suelto en el piso (cubo, pelota u osito). */
export const Toy: React.FC<{x: number; y: number; kind: 'block' | 'ball' | 'bear' | 'car'; color?: string; rot?: number; s?: number}> = ({
  x,
  y,
  kind,
  color = C.blue,
  rot = 0,
  s = 1,
}) => (
  <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`}>
    {kind === 'block' ? (
      <g>
        <rect x={-34} y={-34} width={68} height={68} rx={8} fill={color} stroke={C.ink} strokeWidth={5} />
        <text y={16} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={44} fill="#fff">
          A
        </text>
      </g>
    ) : kind === 'ball' ? (
      <g>
        <circle r={36} fill={color} stroke={C.ink} strokeWidth={5} />
        <path d="M -36 0 Q 0 -22 36 0 M -36 0 Q 0 22 36 0" fill="none" stroke="#fff" strokeWidth={6} />
      </g>
    ) : kind === 'bear' ? (
      <g>
        <circle cx={-22} cy={-38} r={13} fill="#C98B55" stroke={C.ink} strokeWidth={4} />
        <circle cx={22} cy={-38} r={13} fill="#C98B55" stroke={C.ink} strokeWidth={4} />
        <ellipse cx={0} cy={16} rx={32} ry={26} fill="#C98B55" stroke={C.ink} strokeWidth={4} />
        <circle cx={0} cy={-20} r={26} fill="#D9A066" stroke={C.ink} strokeWidth={4} />
        <circle cx={-9} cy={-24} r={3.5} fill={C.ink} />
        <circle cx={9} cy={-24} r={3.5} fill={C.ink} />
        <ellipse cx={0} cy={-12} rx={9} ry={7} fill="#F3D2AE" />
      </g>
    ) : (
      <g>
        <rect x={-50} y={-24} width={100} height={40} rx={10} fill={color} stroke={C.ink} strokeWidth={5} />
        <path d="M -24 -24 L -14 -46 L 22 -46 L 32 -24 Z" fill="#CFE9F7" stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />
        <circle cx={-28} cy={18} r={14} fill="#3A3F4B" stroke={C.ink} strokeWidth={4} />
        <circle cx={28} cy={18} r={14} fill="#3A3F4B" stroke={C.ink} strokeWidth={4} />
      </g>
    )}
  </g>
);

export const ToyBox: React.FC<{x: number; y: number; s: number}> = ({x, y, s}) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <ellipse cx={0} cy={70} rx={130} ry={16} fill="#5C3A22" opacity={0.15} />
    <path d="M -120 -40 L 120 -40 L 106 70 L -106 70 Z" fill="#7CC27A" stroke={C.ink} strokeWidth={STROKE} strokeLinejoin="round" />
    <path d="M -120 -40 L 120 -40 L 116 -8 L -116 -8 Z" fill="#5FAE62" />
    <text y={44} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={40} fill="#fff">
      JUGUETES
    </text>
  </g>
);

export const SweatDrop: React.FC<{x: number; y: number; s: number}> = ({x, y, s}) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <path d="M 0 -30 Q 22 0 18 14 Q 12 30 0 30 Q -12 30 -18 14 Q -22 0 0 -30 Z" fill="#9FD3F5" stroke={C.ink} strokeWidth={4} />
    <ellipse cx={-6} cy={10} rx={4} ry={7} fill="#fff" opacity={0.8} />
  </g>
);

/** Líneas de titular que aparecen una a una (cada una en su fotograma `at`). */
export const RevealLines: React.FC<{
  frame: number;
  lines: {t: React.ReactNode; at: number; color?: string; size?: number}[];
}> = ({frame, lines}) => (
  <span style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
    {lines.map((l, i) => {
      const p = Math.min(1, Math.max(0, (frame - l.at) / 8));
      if (p <= 0) return null;
      return (
        <span
          key={i}
          style={{
            opacity: p,
            transform: `translateY(${(1 - p) * 14}px)`,
            color: l.color,
            fontSize: l.size,
          }}
        >
          {l.t}
        </span>
      );
    })}
  </span>
);

/** Fila de glosario compacta: «inglés» = español. */
export const GlossRow: React.FC<{en: string; es: string; p: number}> = ({en, es, p}) => (
  <span
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      opacity: Math.min(1, p * 1.5),
      transform: `scale(${0.85 + 0.15 * Math.min(1, p)})`,
    }}
  >
    <span style={{display: 'inline-flex', alignItems: 'center', gap: 12}}>
      <span
        style={{
          fontFamily: BODY,
          fontWeight: 600,
          fontSize: 24,
          background: C.ink,
          color: '#fff',
          borderRadius: 8,
          padding: '3px 9px 1px',
          letterSpacing: 1,
        }}
      >
        INGLÉS
      </span>
      <span style={{fontStyle: 'italic', color: C.blue}}>«{en}»</span>
    </span>
    <span style={{color: C.green}}>
      <span style={{color: C.inkSoft, fontFamily: BODY, fontWeight: 600, fontSize: '0.62em'}}>significa </span>
      {es}
    </span>
  </span>
);
