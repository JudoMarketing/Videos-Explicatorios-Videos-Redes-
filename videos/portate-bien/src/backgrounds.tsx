import React from 'react';
import {C} from './theme';

const W = 1080;
const H = 1920;

// Los fondos usan un trazo más suave y delgado que los personajes:
// así los personajes resaltan y la escena gana profundidad.
const L = '#8F7362';
const SW = 4.5;

const Frame: React.FC<{children: React.ReactNode}> = ({children}) => (
  <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute', inset: 0}}>
    {children}
  </svg>
);

/** Oscurece suavemente las orillas para dirigir la mirada al centro. */
const Vignette: React.FC<{id: string; strength?: number}> = ({id, strength = 0.22}) => (
  <g>
    <defs>
      <radialGradient id={id} cx="50%" cy="48%" r="75%">
        <stop offset="60%" stopColor="#3B2416" stopOpacity={0} />
        <stop offset="100%" stopColor="#3B2416" stopOpacity={strength} />
      </radialGradient>
    </defs>
    <rect width={W} height={H} fill={`url(#${id})`} />
  </g>
);

/** Haz de luz de una ventana que cae sobre el piso. */
const LightBeam: React.FC<{id: string; pts: string; opacity?: number}> = ({id, pts, opacity = 0.32}) => (
  <g>
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFFBEA" stopOpacity={opacity} />
        <stop offset="100%" stopColor="#FFFBEA" stopOpacity={0} />
      </linearGradient>
    </defs>
    <polygon points={pts} fill={`url(#${id})`} />
  </g>
);

/** Piso de baldosas en perspectiva desde `top` hasta el borde inferior. */
const TileFloor: React.FC<{top: number; fill: string; line: string; id: string}> = ({top, fill, line, id}) => {
  const vx = 540;
  const vy = top - 700;
  const rows = [0, 70, 160, 280, 430, 620];
  return (
    <g>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7A4E32" stopOpacity={0.14} />
          <stop offset="18%" stopColor="#7A4E32" stopOpacity={0} />
        </linearGradient>
      </defs>
      <rect x={0} y={top} width={W} height={H - top} fill={fill} />
      {rows.map((r) => (
        <line key={r} x1={0} y1={top + r} x2={W} y2={top + r} stroke={line} strokeWidth={4} />
      ))}
      {Array.from({length: 15}, (_, i) => {
        const bx = -1400 + i * 280;
        const t = (top - vy) / (H - vy);
        const x0 = vx + (bx - vx) * t;
        return <line key={i} x1={x0} y1={top} x2={bx} y2={H} stroke={line} strokeWidth={4} />;
      })}
      <rect x={0} y={top} width={W} height={H - top} fill={`url(#${id})`} />
    </g>
  );
};

const WoodFloor: React.FC<{top: number; id: string; base?: string; seam?: string}> = ({
  top,
  id,
  base = '#EBC197',
  seam = '#D9A779',
}) => {
  const rows = [0, 40, 100, 180, 290, 430, 600, 800];
  return (
    <g>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6B3F22" stopOpacity={0.18} />
          <stop offset="22%" stopColor="#6B3F22" stopOpacity={0} />
        </linearGradient>
      </defs>
      <rect x={0} y={top} width={W} height={H - top} fill={base} />
      {rows.slice(1).map((r, i) => (
        <g key={r}>
          <line x1={0} y1={top + r} x2={W} y2={top + r} stroke={seam} strokeWidth={4} />
          {[0, 1, 2, 3].map((k) => {
            const x = ((k * 310 + i * 150) % 1240) - 80;
            return <line key={k} x1={x} y1={top + rows[i]} x2={x} y2={top + r} stroke={seam} strokeWidth={4} />;
          })}
          {/* vetas */}
          <path
            d={`M ${(i * 230) % 900 + 40} ${top + (rows[i] + r) / 2} q 40 -6 80 0 t 80 0`}
            fill="none"
            stroke={seam}
            strokeWidth={3}
            opacity={0.6}
          />
        </g>
      ))}
      <rect x={0} y={top} width={W} height={H - top} fill={`url(#${id})`} />
    </g>
  );
};

const Plant: React.FC<{x: number; y: number; s?: number; pot?: string}> = ({x, y, s = 1, pot = '#E8785F'}) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    {[
      [-40, -150, -30],
      [0, -175, 0],
      [42, -150, 28],
      [-62, -100, -55],
      [60, -95, 55],
    ].map(([lx, ly, r], i) => (
      <ellipse key={i} cx={lx} cy={ly} rx={24} ry={62} fill={i % 2 ? '#7CC27A' : '#5FAE62'} stroke={L} strokeWidth={SW} transform={`rotate(${r},${lx},${ly + 50})`} />
    ))}
    <path d="M -55 -40 L 55 -40 L 42 40 L -42 40 Z" fill={pot} stroke={L} strokeWidth={SW} strokeLinejoin="round" />
    <rect x={-62} y={-52} width={124} height={22} rx={8} fill={pot} stroke={L} strokeWidth={SW} />
    <path d="M 20 -28 L 14 30" stroke="#fff" strokeWidth={6} strokeLinecap="round" opacity={0.35} />
  </g>
);

const Clock: React.FC<{x: number; y: number}> = ({x, y}) => (
  <g transform={`translate(${x},${y})`}>
    <circle r={52} fill="#FFFDF7" stroke={L} strokeWidth={SW + 2} />
    <circle r={52} fill="none" stroke="#F4A7A0" strokeWidth={8} opacity={0.7} />
    {Array.from({length: 12}, (_, i) => (
      <line key={i} x1={0} y1={-38} x2={0} y2={-32} stroke={L} strokeWidth={4} transform={`rotate(${i * 30})`} />
    ))}
    <line x1={0} y1={0} x2={0} y2={-26} stroke={C.ink} strokeWidth={5} strokeLinecap="round" />
    <line x1={0} y1={0} x2={18} y2={8} stroke={C.ink} strokeWidth={5} strokeLinecap="round" />
    <circle r={5} fill={C.red} />
  </g>
);

const Cloud: React.FC<{x: number; y: number; s: number}> = ({x, y, s}) => (
  <g transform={`translate(${x},${y}) scale(${s})`} opacity={0.95}>
    <ellipse cx={0} cy={0} rx={90} ry={38} fill="#fff" />
    <circle cx={-30} cy={-22} r={36} fill="#fff" />
    <circle cx={26} cy={-30} r={44} fill="#fff" />
  </g>
);

/* ------------------------------------------------------------------ */

export const Kitchen: React.FC<{cookieGlow?: number}> = ({cookieGlow = 0.6}) => (
  <Frame>
    <defs>
      <pattern id="kWall" width={70} height={70} patternUnits="userSpaceOnUse">
        <rect width={70} height={70} fill="#FCE6CF" />
        <path d="M 35 22 L 41 35 L 35 48 L 29 35 Z" fill="#F7D9BD" />
        <circle cx={0} cy={0} r={4} fill="#F7D9BD" />
        <circle cx={70} cy={70} r={4} fill="#F7D9BD" />
      </pattern>
      <pattern id="kTile" width={46} height={46} patternUnits="userSpaceOnUse">
        <rect width={46} height={46} fill="#EAF5EF" />
        <rect x={2} y={2} width={42} height={42} rx={4} fill="#F4FBF7" />
      </pattern>
    </defs>
    <rect width={W} height={H} fill="url(#kWall)" />
    {/* reloj */}
    <Clock x={110} y={470} />
    {/* ventana con luz */}
    <g transform="translate(790,640)">
      <rect x={-150} y={-130} width={300} height={260} rx={14} fill="#CFE9F7" stroke={L} strokeWidth={SW} />
      <circle cx={70} cy={-60} r={34} fill="#FFE7A0" />
      <Cloud x={-60} y={-70} s={0.6} />
      <path d="M -150 60 Q -80 20 -10 60 Q 60 100 150 50 L 150 130 L -150 130 Z" fill="#BFE3B5" />
      <path d="M -150 95 Q -40 70 60 100 Q 110 115 150 95 L 150 130 L -150 130 Z" fill="#A6D49B" />
      <line x1={0} y1={-130} x2={0} y2={130} stroke={L} strokeWidth={SW + 2} />
      <line x1={-150} y1={0} x2={150} y2={0} stroke={L} strokeWidth={SW + 2} />
      <path d="M -175 -150 Q -120 0 -170 150 L -190 150 L -190 -150 Z" fill="#F4A7A0" stroke={L} strokeWidth={SW} strokeLinejoin="round" />
      <path d="M 175 -150 Q 120 0 170 150 L 190 150 L 190 -150 Z" fill="#F4A7A0" stroke={L} strokeWidth={SW} strokeLinejoin="round" />
      <path d="M -182 -120 Q -150 0 -178 130 M 182 -120 Q 150 0 178 130" fill="none" stroke="#E58C84" strokeWidth={4} />
      <rect x={-200} y={-168} width={400} height={22} rx={11} fill="#C98B55" stroke={L} strokeWidth={SW} />
      <rect x={-170} y={128} width={340} height={20} rx={6} fill="#FFF0DC" stroke={L} strokeWidth={SW} />
    </g>
    <Plant x={700} y={738} s={0.42} />
    <LightBeam id="kBeam" pts="640,790 940,790 1080,1500 520,1500" />
    {/* alacena alta */}
    <g>
      <rect x={-20} y={540} width={330} height={270} rx={10} fill={C.mint} stroke={L} strokeWidth={SW} />
      <rect x={-20} y={540} width={330} height={22} fill="#A3CF9B" />
      <line x1={145} y1={540} x2={145} y2={810} stroke={L} strokeWidth={SW} />
      <rect x={10} y={578} width={110} height={206} rx={10} fill="#C4E4BD" stroke="#8FBF88" strokeWidth={4} />
      <rect x={170} y={578} width={110} height={206} rx={10} fill="#C4E4BD" stroke="#8FBF88" strokeWidth={4} />
      <circle cx={128} cy={760} r={8} fill={L} />
      <circle cx={162} cy={760} r={8} fill={L} />
      <rect x={-20} y={810} width={330} height={16} fill="#5C3A22" opacity={0.12} />
    </g>
    {/* azulejos + utensilios */}
    <rect x={-20} y={826} width={345} height={136} fill="url(#kTile)" />
    <line x1={10} y1={846} x2={300} y2={846} stroke="#9AA6B2" strokeWidth={6} strokeLinecap="round" />
    <g stroke={L} strokeWidth={SW - 1} strokeLinejoin="round">
      <path d="M 40 846 L 40 900 M 26 900 Q 40 930 54 900 Z" fill="#E8B04B" />
      <path d="M 250 846 L 250 892" fill="none" />
      <circle cx={250} cy={908} r={18} fill="#9AA6B2" />
    </g>
    {/* refrigerador */}
    <g>
      <rect x={392} y={1240} width={290} height={20} rx={8} fill="#5C3A22" opacity={0.12} />
      <rect x={380} y={760} width={300} height={500} rx={34} fill="#DCEBFA" stroke={L} strokeWidth={SW + 1} />
      <path d="M 640 790 Q 664 830 664 1000 L 664 1220" fill="none" stroke="#fff" strokeWidth={10} strokeLinecap="round" opacity={0.6} />
      <rect x={380} y={1150} width={300} height={110} rx={0} fill="#C4D9EF" opacity={0.6} />
      <line x1={380} y1={920} x2={680} y2={920} stroke={L} strokeWidth={SW} />
      <rect x={408} y={800} width={18} height={80} rx={9} fill="#B6CBE0" stroke={L} strokeWidth={4} />
      <rect x={408} y={950} width={18} height={110} rx={9} fill="#B6CBE0" stroke={L} strokeWidth={4} />
      {/* dibujo del niño pegado con imán */}
      <g transform="translate(560,1010) rotate(-5)">
        <rect x={-70} y={-55} width={140} height={110} fill="#fff" stroke={L} strokeWidth={4} />
        <circle cx={40} cy={-28} r={14} fill="#FFD25A" />
        <circle cx={-30} cy={-8} r={11} fill="none" stroke="#4A7FC1" strokeWidth={4} />
        <path d="M -30 3 L -30 30 M -45 14 L -15 14 M -30 30 L -40 46 M -30 30 L -20 46" stroke="#4A7FC1" strokeWidth={4} strokeLinecap="round" />
        <path d="M 0 48 Q 30 20 60 48" fill="none" stroke="#5FAE62" strokeWidth={5} />
        <circle cx={0} cy={-56} r={9} fill={C.red} stroke={L} strokeWidth={3} />
      </g>
      <circle cx={600} cy={850} r={13} fill={C.yellow} stroke={L} strokeWidth={3} />
      <rect x={470} y={835} width={40} height={30} rx={6} fill="#7CC27A" stroke={L} strokeWidth={3} transform="rotate(8,490,850)" />
      {/* caja de galletas */}
      <g transform="translate(530,690)">
        <circle r={110 * cookieGlow} fill="#FFE7A0" opacity={0.5 * cookieGlow} />
        <rect x={-70} y={-70} width={140} height={140} rx={10} fill={C.orange} stroke={L} strokeWidth={SW} />
        <rect x={-70} y={-70} width={140} height={26} fill="#FFB86B" />
        <circle cx={-14} cy={-4} r={36} fill="#D9A066" stroke={L} strokeWidth={4} />
        <circle cx={26} cy={18} r={32} fill="#D9A066" stroke={L} strokeWidth={4} />
        {[[-24, -14], [-4, 10], [-22, 14], [18, 6], [36, 26], [22, 32]].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r={5} fill="#6B3E1E" />
        ))}
      </g>
    </g>
    {/* mueble bajo + tarja */}
    <g>
      <rect x={-20} y={990} width={330} height={270} rx={8} fill={C.mint} stroke={L} strokeWidth={SW} />
      <rect x={-20} y={1230} width={330} height={30} fill="#9CC894" />
      <line x1={145} y1={1020} x2={145} y2={1230} stroke={L} strokeWidth={SW} />
      <rect x={10} y={1024} width={110} height={190} rx={10} fill="#C4E4BD" stroke="#8FBF88" strokeWidth={4} />
      <rect x={170} y={1024} width={110} height={190} rx={10} fill="#C4E4BD" stroke="#8FBF88" strokeWidth={4} />
      <circle cx={128} cy={1060} r={8} fill={L} />
      <circle cx={162} cy={1060} r={8} fill={L} />
      <rect x={-20} y={960} width={345} height={36} rx={8} fill="#FFF0C9" stroke={L} strokeWidth={SW} />
      <path d="M 120 960 L 120 900 Q 120 880 140 880 L 190 880 Q 205 880 205 895 L 205 910" fill="none" stroke="#9AA6B2" strokeWidth={14} strokeLinecap="round" />
      {/* frutero */}
      <circle cx={256} cy={928} r={16} fill={C.red} stroke={L} strokeWidth={3} />
      <circle cx={282} cy={924} r={15} fill="#FF9F43" stroke={L} strokeWidth={3} />
      <circle cx={270} cy={910} r={14} fill="#B5D85A" stroke={L} strokeWidth={3} />
      <path d="M 232 930 Q 270 972 306 930 Z" fill="#F7F1E8" stroke={L} strokeWidth={SW} strokeLinejoin="round" />
    </g>
    <rect x={0} y={1252} width={W} height={18} fill="#E9C3A0" />
    <TileFloor id="kFloor" top={1268} fill="#FBEBDD" line="#EED3BC" />
    {/* tapete y juguete */}
    <ellipse cx={260} cy={1430} rx={210} ry={52} fill="#F6D27A" stroke={L} strokeWidth={SW} opacity={0.95} />
    <ellipse cx={260} cy={1430} rx={170} ry={36} fill="none" stroke="#fff" strokeWidth={5} strokeDasharray="16 12" opacity={0.7} />
    <g transform="translate(900,1560)">
      <ellipse cx={0} cy={44} rx={90} ry={12} fill="#5C3A22" opacity={0.12} />
      <rect x={-80} y={-30} width={120} height={60} rx={10} fill={C.blue} stroke={L} strokeWidth={SW} />
      <path d="M 40 -10 L 80 -10 L 90 30 L 40 30 Z" fill="#FFD25A" stroke={L} strokeWidth={SW} strokeLinejoin="round" />
      <circle cx={-50} cy={34} r={18} fill="#3A3F4B" stroke={L} strokeWidth={SW} />
      <circle cx={50} cy={34} r={18} fill="#3A3F4B" stroke={L} strokeWidth={SW} />
    </g>
    <Vignette id="kVig" />
  </Frame>
);

export const LivingRoom: React.FC<{shake?: number}> = ({shake = 0}) => {
  const frame = (x: number, y: number, w: number, h: number, fill: string, rot: number, k: number, art: React.ReactNode) => (
    <g transform={`translate(${x},${y}) rotate(${rot + (shake ? Math.sin(shake * 2.3 + k) * 6 : 0)})`}>
      <line x1={0} y1={-h / 2 - 40} x2={-w / 4} y2={-h / 2} stroke={L} strokeWidth={4} />
      <line x1={0} y1={-h / 2 - 40} x2={w / 4} y2={-h / 2} stroke={L} strokeWidth={4} />
      <rect x={-w / 2 + 6} y={-h / 2 + 8} width={w} height={h} rx={10} fill="#5C3A22" opacity={0.12} />
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={10} fill="#C98B55" stroke={L} strokeWidth={SW} />
      <rect x={-w / 2 + 16} y={-h / 2 + 16} width={w - 32} height={h - 32} rx={6} fill={fill} stroke={L} strokeWidth={3} />
      {art}
    </g>
  );
  return (
    <Frame>
      <defs>
        <pattern id="lWall" width={80} height={80} patternUnits="userSpaceOnUse">
          <rect width={80} height={80} fill="#FDEFD9" />
          <rect x={0} width={26} height={80} fill="#FAE6CB" />
          <circle cx={53} cy={40} r={4} fill="#F5DCBC" />
        </pattern>
        <radialGradient id="lLamp" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFE9A8" stopOpacity={0.75} />
          <stop offset="100%" stopColor="#FFE9A8" stopOpacity={0} />
        </radialGradient>
      </defs>
      <rect width={W} height={H} fill="url(#lWall)" />
      {/* librero */}
      <g>
        <rect x={-10} y={760} width={130} height={500} fill="#C98B55" stroke={L} strokeWidth={SW} />
        {[860, 980, 1100].map((y) => (
          <rect key={y} x={-10} y={y} width={130} height={14} fill="#B07443" stroke={L} strokeWidth={3} />
        ))}
        {[
          [8, 790, 22, 70, C.red],
          [32, 800, 20, 60, C.blue],
          [54, 786, 24, 74, C.yellow],
          [10, 912, 24, 68, '#7CC27A'],
          [36, 924, 18, 56, '#C9B6F2'],
          [58, 906, 26, 74, C.orange],
          [12, 1030, 30, 70, C.sky],
        ].map(([x, y, w, h, c], i) => (
          <rect key={i} x={x as number} y={y as number} width={w as number} height={h as number} rx={3} fill={c as string} stroke={L} strokeWidth={3} />
        ))}
        <circle cx={80} cy={1072} r={26} fill="#F7A8B8" stroke={L} strokeWidth={3} />
      </g>
      {/* zócalo de madera */}
      <rect x={0} y={1040} width={W} height={220} fill="#F7D9B9" />
      <line x1={0} y1={1040} x2={W} y2={1040} stroke={L} strokeWidth={SW + 1} />
      {[270, 450, 630, 810, 990].map((x) => (
        <rect key={x} x={x - 70} y={1070} width={140} height={160} rx={8} fill="none" stroke="#E8BF96" strokeWidth={5} />
      ))}
      {/* cuadros (tiemblan con el grito) */}
      {frame(260, 690, 190, 150, '#BFE3B5', -3, 0, (
        <g>
          <path d="M -79 40 L -30 -10 L 10 30 L 40 0 L 79 40 Z" fill="#7CC27A" />
          <circle cx={45} cy={-30} r={14} fill="#FFD25A" />
        </g>
      ))}
      {frame(560, 640, 150, 190, '#CFE3F7', 2, 1.7, (
        <g>
          <circle cx={0} cy={-15} r={30} fill="#F0C3A0" stroke={L} strokeWidth={3} />
          <path d="M -40 79 Q 0 10 40 79 Z" fill={C.momShirt} stroke={L} strokeWidth={3} />
          <circle cx={0} cy={-50} r={16} fill={C.momHair} />
        </g>
      ))}
      {frame(840, 700, 200, 140, '#FFD9C2', -2, 3.1, (
        <g>
          <path d="M -60 20 Q -30 -30 0 20 Q 30 -30 60 20" fill="none" stroke={C.red} strokeWidth={6} />
          <circle cx={-30} cy={30} r={8} fill={C.blue} />
          <circle cx={30} cy={30} r={8} fill={C.yellow} />
        </g>
      ))}
      {/* planta grande */}
      <Plant x={700} y={1210} s={0.85} pot="#6CC4A8" />
      {/* lámpara */}
      <circle cx={990} cy={880} r={230} fill="url(#lLamp)" />
      <g transform="translate(990,1250)">
        <line x1={0} y1={0} x2={0} y2={-330} stroke={L} strokeWidth={10} />
        <path d="M -70 -330 L 70 -330 L 45 -430 L -45 -430 Z" fill={C.yellow} stroke={L} strokeWidth={SW} strokeLinejoin="round" />
        <path d="M -30 -420 L -50 -340" stroke="#fff" strokeWidth={6} opacity={0.5} strokeLinecap="round" />
        <ellipse cx={0} cy={0} rx={50} ry={14} fill="#9AA6B2" stroke={L} strokeWidth={SW} />
      </g>
      <rect x={0} y={1252} width={W} height={16} fill="#C9915F" />
      <WoodFloor id="lFloor" top={1266} />
      <ellipse cx={540} cy={1520} rx={430} ry={120} fill="#F6B8A8" stroke={L} strokeWidth={SW} />
      <ellipse cx={540} cy={1520} rx={360} ry={90} fill="none" stroke="#fff" strokeWidth={6} strokeDasharray="20 16" opacity={0.8} />
      {/* juguetes en el piso */}
      <g transform="translate(150,1700)">
        <ellipse cx={0} cy={50} rx={60} ry={10} fill="#5C3A22" opacity={0.15} />
        <circle r={50} fill={C.red} stroke={L} strokeWidth={SW} />
        <path d="M -50 0 Q 0 -30 50 0 M -50 0 Q 0 30 50 0" fill="none" stroke="#fff" strokeWidth={7} />
      </g>
      <g transform="translate(930,1680)">
        <rect x={-50} y={-20} width={60} height={60} rx={6} fill={C.yellow} stroke={L} strokeWidth={SW} />
        <rect x={14} y={-4} width={50} height={44} rx={6} fill={C.blue} stroke={L} strokeWidth={SW} />
        <rect x={-30} y={-72} width={56} height={52} rx={6} fill="#7CC27A" stroke={L} strokeWidth={SW} />
      </g>
      <Vignette id="lVig" />
    </Frame>
  );
};

/** Cuarto del niño (escena del cerebro). */
export const Bedroom: React.FC = () => (
  <Frame>
    <defs>
      <pattern id="bWall" width={110} height={110} patternUnits="userSpaceOnUse">
        <rect width={110} height={110} fill="#E9E5F8" />
        <path d="M 30 18 l 5 11 l 12 1 l -9 8 l 3 12 l -11 -6 l -11 6 l 3 -12 l -9 -8 l 12 -1 Z" fill="#DCD5F3" />
        <circle cx={85} cy={78} r={6} fill="#DCD5F3" />
      </pattern>
    </defs>
    <rect width={W} height={H} fill="url(#bWall)" />
    {/* repisa con juguetes */}
    <g>
      <rect x={40} y={560} width={270} height={18} rx={6} fill="#C98B55" stroke={L} strokeWidth={SW} />
      <rect x={60} y={480} width={34} height={80} rx={4} fill={C.red} stroke={L} strokeWidth={3} />
      <rect x={96} y={492} width={30} height={68} rx={4} fill={C.blue} stroke={L} strokeWidth={3} />
      <rect x={128} y={500} width={26} height={60} rx={4} fill={C.yellow} stroke={L} strokeWidth={3} transform="rotate(8,141,530)" />
      {/* osito */}
      <g transform="translate(240,520)">
        <circle cx={-26} cy={-36} r={14} fill="#C98B55" stroke={L} strokeWidth={3} />
        <circle cx={26} cy={-36} r={14} fill="#C98B55" stroke={L} strokeWidth={3} />
        <ellipse cx={0} cy={18} rx={34} ry={24} fill="#C98B55" stroke={L} strokeWidth={3} />
        <circle cx={0} cy={-18} r={28} fill="#D9A066" stroke={L} strokeWidth={3} />
        <ellipse cx={0} cy={-8} rx={12} ry={9} fill="#F3D2AE" />
        <circle cx={-10} cy={-24} r={3.5} fill={C.ink} />
        <circle cx={10} cy={-24} r={3.5} fill={C.ink} />
        <circle cx={0} cy={-11} r={3.5} fill={C.ink} />
      </g>
    </g>
    {/* banderines */}
    <path d="M 0 450 Q 540 520 1080 450" fill="none" stroke={L} strokeWidth={3} />
    {Array.from({length: 9}, (_, i) => {
      const x = 60 + i * 120;
      const y = 450 + Math.sin((x / 1080) * Math.PI) * 50;
      return <path key={i} d={`M ${x - 26} ${y} L ${x + 26} ${y} L ${x} ${y + 44} Z`} fill={[C.red, C.yellow, C.blue, '#7CC27A'][i % 4]} stroke={L} strokeWidth={3} strokeLinejoin="round" />;
    })}
    {/* cama */}
    <g>
      <rect x={600} y={1020} width={480} height={50} rx={18} fill="#C98B55" stroke={L} strokeWidth={SW} />
      <rect x={610} y={1066} width={470} height={190} fill="#DCEBFA" stroke={L} strokeWidth={SW} />
      <path d="M 610 1110 Q 840 1090 1080 1110 L 1080 1256 L 610 1256 Z" fill="#9CC6EE" stroke={L} strokeWidth={SW} />
      {[660, 760, 860, 960, 1060].map((x) => (
        <circle key={x} cx={x} cy={1180} r={10} fill="#fff" opacity={0.7} />
      ))}
      <rect x={640} y={1040} width={170} height={70} rx={30} fill="#fff" stroke={L} strokeWidth={SW} />
      <rect x={1050} y={980} width={40} height={280} fill="#C98B55" stroke={L} strokeWidth={SW} />
    </g>
    <rect x={0} y={1252} width={W} height={16} fill="#B9B0E0" />
    <rect x={0} y={1266} width={W} height={H - 1266} fill="#CFC7EC" />
    <rect x={0} y={1266} width={W} height={120} fill="#5C3A80" opacity={0.08} />
    <ellipse cx={420} cy={1480} rx={360} ry={90} fill="#F7A8B8" stroke={L} strokeWidth={SW} />
    <ellipse cx={420} cy={1480} rx={290} ry={64} fill="#FBC4CF" />
    <ellipse cx={420} cy={1480} rx={220} ry={44} fill="none" stroke="#fff" strokeWidth={5} strokeDasharray="14 12" opacity={0.8} />
    <Vignette id="bVig" strength={0.26} />
  </Frame>
);

/** Patio con jardín (escena de la celebración). */
export const Garden: React.FC = () => (
  <Frame>
    <defs>
      <linearGradient id="gSky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#A9D8F5" />
        <stop offset="100%" stopColor="#E8F6FD" />
      </linearGradient>
    </defs>
    <rect width={W} height={H} fill="url(#gSky)" />
    <circle cx={930} cy={520} r={70} fill="#FFE27A" />
    <circle cx={930} cy={520} r={110} fill="#FFE27A" opacity={0.25} />
    <Cloud x={160} y={520} s={1.1} />
    <Cloud x={700} y={470} s={0.8} />
    <path d="M 0 1010 Q 260 900 560 990 Q 820 1060 1080 960 L 1080 1200 L 0 1200 Z" fill="#BFE3B5" />
    <path d="M 0 1070 Q 330 1010 640 1070 Q 880 1110 1080 1050 L 1080 1200 L 0 1200 Z" fill="#A6D49B" />
    {/* árbol */}
    <g>
      <path d="M 100 1240 L 110 960 L 150 960 L 160 1240 Z" fill="#B07443" stroke={L} strokeWidth={SW} strokeLinejoin="round" />
      {[
        [60, 860, 110],
        [200, 830, 120],
        [130, 740, 120],
        [250, 950, 80],
        [10, 960, 80],
      ].map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r + SW} fill={L} />
      ))}
      {[
        [60, 860, 110],
        [200, 830, 120],
        [130, 740, 120],
        [250, 950, 80],
        [10, 960, 80],
      ].map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill={i % 2 ? '#7CC27A' : '#6BB86A'} />
      ))}
      {[[90, 800], [190, 760], [230, 900], [40, 920]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={11} fill={C.red} stroke={L} strokeWidth={3} />
      ))}
    </g>
    {/* cerca */}
    <g>
      <rect x={0} y={1110} width={W} height={18} fill="#FFFDF7" stroke={L} strokeWidth={3} />
      <rect x={0} y={1180} width={W} height={18} fill="#FFFDF7" stroke={L} strokeWidth={3} />
      {Array.from({length: 14}, (_, i) => (
        <path key={i} d={`M ${300 + i * 60} 1250 L ${300 + i * 60} 1080 L ${322 + i * 60} 1056 L ${344 + i * 60} 1080 L ${344 + i * 60} 1250 Z`} fill="#FFFDF7" stroke={L} strokeWidth={3} strokeLinejoin="round" />
      ))}
    </g>
    <rect x={0} y={1240} width={W} height={H - 1240} fill="#8CC97F" />
    <rect x={0} y={1240} width={W} height={60} fill="#5C8A3A" opacity={0.15} />
    {Array.from({length: 40}, (_, i) => {
      const x = (i * 137) % 1080;
      const y = 1300 + ((i * 89) % 560);
      return <path key={i} d={`M ${x} ${y} l 6 -18 l 6 18`} fill="none" stroke="#6DB060" strokeWidth={4} strokeLinecap="round" />;
    })}
    {[[120, 1460, C.yellow], [300, 1620, C.pink], [820, 1500, '#fff'], [960, 1700, C.yellow], [600, 1760, C.pink]].map(([x, y, c], i) => (
      <g key={i} transform={`translate(${x},${y})`}>
        {[0, 72, 144, 216, 288].map((a) => (
          <ellipse key={a} cx={0} cy={-12} rx={8} ry={12} fill={c as string} stroke={L} strokeWidth={2.5} transform={`rotate(${a})`} />
        ))}
        <circle r={7} fill="#FF9F43" />
      </g>
    ))}
    <Vignette id="gVig" strength={0.18} />
  </Frame>
);

/** Sala por la tarde (escena final: compartir el video). */
export const EveningRoom: React.FC = () => (
  <Frame>
    <defs>
      <pattern id="eWall" width={90} height={90} patternUnits="userSpaceOnUse">
        <rect width={90} height={90} fill="#F6E1D3" />
        <path d="M 45 30 q 10 15 0 30 q -10 -15 0 -30 Z" fill="#EFCFBD" />
      </pattern>
      <linearGradient id="eDusk" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#8E7CC3" />
        <stop offset="60%" stopColor="#F2A07B" />
        <stop offset="100%" stopColor="#FFD08A" />
      </linearGradient>
      <radialGradient id="eLamp" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFE2A0" stopOpacity={0.8} />
        <stop offset="100%" stopColor="#FFE2A0" stopOpacity={0} />
      </radialGradient>
    </defs>
    <rect width={W} height={H} fill="url(#eWall)" />
    {/* ventana al atardecer */}
    <g transform="translate(250,620)">
      <rect x={-190} y={-150} width={380} height={300} rx={14} fill="url(#eDusk)" stroke={L} strokeWidth={SW} />
      <circle cx={100} cy={-70} r={30} fill="#FFF4D6" />
      <path d="M -190 90 L -140 40 L -100 70 L -40 10 L 20 60 L 80 20 L 140 70 L 190 40 L 190 150 L -190 150 Z" fill="#6F5D99" opacity={0.7} />
      <line x1={0} y1={-150} x2={0} y2={150} stroke={L} strokeWidth={SW + 2} />
      <line x1={-190} y1={0} x2={190} y2={0} stroke={L} strokeWidth={SW + 2} />
      <rect x={-210} y={150} width={420} height={22} rx={6} fill="#FFF0DC" stroke={L} strokeWidth={SW} />
    </g>
    {/* sofá */}
    <g>
      <rect x={-40} y={1000} width={640} height={150} rx={50} fill="#E58C84" stroke={L} strokeWidth={SW} />
      <rect x={-40} y={1110} width={640} height={150} rx={30} fill="#F4A7A0" stroke={L} strokeWidth={SW} />
      <rect x={560} y={1060} width={90} height={200} rx={36} fill="#E58C84" stroke={L} strokeWidth={SW} />
      <line x1={280} y1={1120} x2={280} y2={1250} stroke="#E58C84" strokeWidth={5} />
      <rect x={60} y={1030} width={140} height={110} rx={30} fill={C.yellow} stroke={L} strokeWidth={SW} transform="rotate(-8,130,1085)" />
      <rect x={420} y={1040} width={130} height={100} rx={30} fill="#9CC6EE" stroke={L} strokeWidth={SW} transform="rotate(6,485,1090)" />
    </g>
    {/* lámpara de piso */}
    <circle cx={980} cy={860} r={260} fill="url(#eLamp)" />
    <g transform="translate(980,1250)">
      <line x1={0} y1={0} x2={0} y2={-340} stroke={L} strokeWidth={10} />
      <path d="M -75 -340 L 75 -340 L 50 -450 L -50 -450 Z" fill="#FFE2A0" stroke={L} strokeWidth={SW} strokeLinejoin="round" />
      <ellipse cx={0} cy={0} rx={50} ry={14} fill="#9AA6B2" stroke={L} strokeWidth={SW} />
    </g>
    <Plant x={840} y={1215} s={0.7} pot="#C9B6F2" />
    <rect x={0} y={1252} width={W} height={16} fill="#B9805A" />
    <WoodFloor id="eFloor" top={1266} base="#D9A879" seam="#C28E60" />
    <ellipse cx={560} cy={1520} rx={460} ry={120} fill="#C9B6F2" stroke={L} strokeWidth={SW} />
    <ellipse cx={560} cy={1520} rx={380} ry={88} fill="none" stroke="#fff" strokeWidth={6} strokeDasharray="20 16" opacity={0.7} />
    <rect width={W} height={H} fill="#7A4AA0" opacity={0.06} />
    <Vignette id="eVig" strength={0.3} />
  </Frame>
);
