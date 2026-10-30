import React from 'react';
import {C, STROKE} from './theme';

const W = 1080;
const H = 1920;

/** Piso de baldosas en perspectiva desde `top` hasta el borde inferior. */
const TileFloor: React.FC<{top: number; fill: string; line: string}> = ({top, fill, line}) => {
  const vx = 540;
  const vy = top - 700;
  const rows = [0, 70, 160, 280, 430, 620];
  return (
    <g>
      <rect x={0} y={top} width={W} height={H - top} fill={fill} />
      {rows.map((r) => (
        <line key={r} x1={0} y1={top + r} x2={W} y2={top + r} stroke={line} strokeWidth={4} />
      ))}
      {Array.from({length: 15}, (_, i) => {
        const bx = -1400 + i * 280;
        // recta desde el punto de fuga pasando por (bx, H)
        const t = (top - vy) / (H - vy);
        const x0 = vx + (bx - vx) * t;
        return <line key={i} x1={x0} y1={top} x2={bx} y2={H} stroke={line} strokeWidth={4} />;
      })}
    </g>
  );
};

const WoodFloor: React.FC<{top: number}> = ({top}) => (
  <g>
    <rect x={0} y={top} width={W} height={H - top} fill="#EBC197" />
    {[40, 100, 180, 290, 430, 600].map((r, i) => (
      <g key={r}>
        <line x1={0} y1={top + r} x2={W} y2={top + r} stroke="#D9A779" strokeWidth={4} />
        {[0, 1, 2, 3].map((k) => (
          <line
            key={k}
            x1={((k * 310 + i * 150) % 1240) - 80}
            y1={top + (i === 0 ? 0 : [40, 100, 180, 290, 430][i - 1])}
            x2={((k * 310 + i * 150) % 1240) - 80}
            y2={top + r}
            stroke="#D9A779"
            strokeWidth={4}
          />
        ))}
      </g>
    ))}
  </g>
);

export const Kitchen: React.FC<{cookieGlow?: number}> = ({cookieGlow = 0}) => (
  <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute', inset: 0}}>
    <rect width={W} height={H} fill="#FCE6CF" />
    {/* ventana */}
    <g transform="translate(790,640)">
      <rect x={-150} y={-130} width={300} height={260} rx={14} fill="#CFE9F7" stroke={C.ink} strokeWidth={STROKE} />
      <circle cx={70} cy={-60} r={34} fill="#FFE7A0" />
      <path d="M -150 60 Q -80 20 -10 60 Q 60 100 150 50 L 150 130 L -150 130 Z" fill="#BFE3B5" />
      <line x1={0} y1={-130} x2={0} y2={130} stroke={C.ink} strokeWidth={STROKE} />
      <line x1={-150} y1={0} x2={150} y2={0} stroke={C.ink} strokeWidth={STROKE} />
      <path d="M -175 -150 Q -120 0 -170 150 L -190 150 L -190 -150 Z" fill="#F4A7A0" stroke={C.ink} strokeWidth={STROKE} strokeLinejoin="round" />
      <path d="M 175 -150 Q 120 0 170 150 L 190 150 L 190 -150 Z" fill="#F4A7A0" stroke={C.ink} strokeWidth={STROKE} strokeLinejoin="round" />
      <rect x={-200} y={-168} width={400} height={22} rx={11} fill="#C98B55" stroke={C.ink} strokeWidth={STROKE} />
    </g>
    {/* alacena alta */}
    <g>
      <rect x={-20} y={540} width={330} height={270} rx={10} fill={C.mint} stroke={C.ink} strokeWidth={STROKE} />
      <line x1={145} y1={540} x2={145} y2={810} stroke={C.ink} strokeWidth={STROKE} />
      <rect x={10} y={570} width={110} height={210} rx={10} fill="none" stroke="#8FBF88" strokeWidth={5} />
      <rect x={170} y={570} width={110} height={210} rx={10} fill="none" stroke="#8FBF88" strokeWidth={5} />
      <circle cx={128} cy={760} r={8} fill={C.ink} />
      <circle cx={162} cy={760} r={8} fill={C.ink} />
    </g>
    {/* refrigerador */}
    <g>
      <rect x={380} y={760} width={300} height={500} rx={34} fill="#DCEBFA" stroke={C.ink} strokeWidth={STROKE} />
      <line x1={380} y1={920} x2={680} y2={920} stroke={C.ink} strokeWidth={STROKE} />
      <rect x={408} y={800} width={18} height={80} rx={9} fill="#B6CBE0" stroke={C.ink} strokeWidth={4} />
      <rect x={408} y={950} width={18} height={110} rx={9} fill="#B6CBE0" stroke={C.ink} strokeWidth={4} />
      <circle cx={600} cy={980} r={18} fill={C.red} stroke={C.ink} strokeWidth={4} />
      <rect x={560} y={1010} width={60} height={46} rx={6} fill={C.yellow} stroke={C.ink} strokeWidth={4} transform="rotate(6,590,1033)" />
      {/* caja de galletas */}
      <g transform="translate(530,690)">
        <circle r={110 * cookieGlow} fill="#FFE7A0" opacity={0.6 * cookieGlow} />
        <rect x={-70} y={-70} width={140} height={140} rx={10} fill={C.orange} stroke={C.ink} strokeWidth={STROKE} />
        <circle cx={-14} cy={-4} r={36} fill="#D9A066" stroke={C.ink} strokeWidth={5} />
        <circle cx={26} cy={18} r={32} fill="#D9A066" stroke={C.ink} strokeWidth={5} />
        {[[-24, -14], [-4, 10], [-22, 14], [18, 6], [36, 26], [22, 32]].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r={5} fill="#6B3E1E" />
        ))}
      </g>
    </g>
    {/* mueble bajo + tarja */}
    <g>
      <rect x={-20} y={990} width={330} height={270} rx={8} fill={C.mint} stroke={C.ink} strokeWidth={STROKE} />
      <line x1={145} y1={1020} x2={145} y2={1260} stroke={C.ink} strokeWidth={STROKE} />
      <circle cx={128} cy={1060} r={8} fill={C.ink} />
      <circle cx={162} cy={1060} r={8} fill={C.ink} />
      <rect x={-20} y={960} width={345} height={36} rx={8} fill="#FFF0C9" stroke={C.ink} strokeWidth={STROKE} />
      <path d="M 120 960 L 120 900 Q 120 880 140 880 L 190 880 Q 205 880 205 895 L 205 910" fill="none" stroke="#9AA6B2" strokeWidth={14} strokeLinecap="round" />
      <path d="M 120 960 L 120 900 Q 120 880 140 880 L 190 880 Q 205 880 205 895 L 205 910" fill="none" stroke={C.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />
    </g>
    <rect x={0} y={1252} width={W} height={18} fill="#F2CFAE" />
    <TileFloor top={1268} fill="#FBEBDD" line="#EED3BC" />
  </svg>
);

export const LivingRoom: React.FC<{shake?: number}> = ({shake = 0}) => {
  const frame = (x: number, y: number, w: number, h: number, fill: string, rot: number, k: number) => (
    <g transform={`translate(${x},${y}) rotate(${rot + Math.sin(shake * 2.3 + k) * 6 * Math.min(1, Math.abs(shake) > 0 ? 1 : 0)})`}>
      <line x1={0} y1={-h / 2 - 40} x2={-w / 4} y2={-h / 2} stroke={C.ink} strokeWidth={4} />
      <line x1={0} y1={-h / 2 - 40} x2={w / 4} y2={-h / 2} stroke={C.ink} strokeWidth={4} />
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={10} fill="#C98B55" stroke={C.ink} strokeWidth={STROKE} />
      <rect x={-w / 2 + 16} y={-h / 2 + 16} width={w - 32} height={h - 32} rx={6} fill={fill} stroke={C.ink} strokeWidth={4} />
    </g>
  );
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute', inset: 0}}>
      <rect width={W} height={H} fill="#FDEFD9" />
      {/* zócalo de madera */}
      <rect x={0} y={1040} width={W} height={220} fill="#F7D9B9" />
      <line x1={0} y1={1040} x2={W} y2={1040} stroke={C.ink} strokeWidth={STROKE} />
      {[90, 270, 450, 630, 810, 990].map((x) => (
        <rect key={x} x={x - 70} y={1070} width={140} height={160} rx={8} fill="none" stroke="#E8BF96" strokeWidth={5} />
      ))}
      {/* cuadros (tiemblan con el grito) */}
      {frame(250, 690, 190, 150, '#BFE3B5', -3, 0)}
      {frame(560, 640, 150, 190, '#CFE3F7', 2, 1.7)}
      {frame(840, 700, 200, 140, '#FFD9C2', -2, 3.1)}
      {/* lámpara */}
      <g transform="translate(990,1250)">
        <line x1={0} y1={0} x2={0} y2={-330} stroke={C.ink} strokeWidth={10} />
        <path d="M -70 -330 L 70 -330 L 45 -430 L -45 -430 Z" fill={C.yellow} stroke={C.ink} strokeWidth={STROKE} strokeLinejoin="round" />
        <ellipse cx={0} cy={0} rx={50} ry={14} fill="#9AA6B2" stroke={C.ink} strokeWidth={STROKE} />
      </g>
      <rect x={0} y={1252} width={W} height={16} fill="#D9A779" />
      <WoodFloor top={1266} />
      <ellipse cx={540} cy={1520} rx={430} ry={120} fill="#F6B8A8" stroke={C.ink} strokeWidth={STROKE} />
      <ellipse cx={540} cy={1520} rx={360} ry={90} fill="none" stroke="#fff" strokeWidth={6} strokeDasharray="20 16" opacity={0.8} />
    </svg>
  );
};

/** Fondo liso con confeti suave, para escenas "conceptuales". */
export const Plain: React.FC<{color: string; dot: string; seed?: number; floor?: string}> = ({color, dot, seed = 1, floor}) => {
  const rnd = (i: number) => {
    const x = Math.sin(i * 12.9898 + seed * 78.233) * 43758.5453;
    return x - Math.floor(x);
  };
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute', inset: 0}}>
      <rect width={W} height={H} fill={color} />
      {Array.from({length: 46}, (_, i) => {
        const x = rnd(i) * W;
        const y = rnd(i + 100) * H;
        const r = 6 + rnd(i + 200) * 10;
        return i % 3 === 0 ? (
          <rect key={i} x={x} y={y} width={r * 1.6} height={r * 1.6} rx={3} fill={dot} transform={`rotate(${rnd(i + 300) * 90},${x},${y})`} />
        ) : (
          <circle key={i} cx={x} cy={y} r={r} fill={dot} />
        );
      })}
      {floor ? (
        <g>
          <ellipse cx={540} cy={1400} rx={760} ry={130} fill={floor} />
          <rect x={0} y={1400} width={W} height={H - 1400} fill={floor} />
        </g>
      ) : null}
    </svg>
  );
};
