import React from 'react';
import {C, STROKE} from '../theme';
import {Arm, Blob, BrowPair, Brows, EyePair, Eyes, Mouth, MouthShape} from './parts';

export type KidPose = {
  /** brazo izquierdo/derecho (del espectador): [hombro, codo] en grados, positivo hacia afuera */
  armL?: [number, number];
  armR?: [number, number];
  /** elevación de cada pierna (px) y giro (grados) para caminar/correr */
  legL?: [number, number];
  legR?: [number, number];
  bob?: number;
  tilt?: number;
  lean?: number;
  mouth?: Mouth;
  talk?: number;
  eyes?: Eyes;
  open?: number;
  look?: [number, number];
  brows?: Brows;
  blush?: number;
};

const HEAD_Y = -445;

/** Niño de frente: pies en (0,0), mide ~600 px a escala 1. */
export const Kid: React.FC<{x: number; y: number; scale?: number; flip?: boolean; pose?: KidPose}> = ({
  x,
  y,
  scale = 1,
  flip = false,
  pose = {},
}) => {
  const {
    armL = [8, 6],
    armR = [8, 6],
    legL = [0, 0],
    legR = [0, 0],
    bob = 0,
    tilt = 0,
    lean = 0,
    mouth = 'smile',
    talk = 0,
    eyes = 'normal',
    open = 1,
    look = [0, 0],
    brows = 'neutral',
    blush = 0.55,
  } = pose;

  const leg = (side: -1 | 1, [lift, rot]: [number, number]) => (
    <g transform={`translate(${side * 30},-175) rotate(${-side * rot}) translate(0,${-lift})`}>
      <rect x={-18} y={0} width={36} height={140} rx={18} fill={C.kidSkin} stroke={C.ink} strokeWidth={STROKE} />
      <rect x={3} y={40} width={10} height={92} rx={5} fill={C.kidSkinShade} opacity={0.55} />
      <rect x={-15} y={33} width={30} height={14} rx={6} fill={C.kidSkinShade} opacity={0.7} />
      <path d="M -8 80 Q -2 86 4 80" fill="none" stroke={C.kidSkinShade} strokeWidth={3} strokeLinecap="round" />
      {/* zapatilla */}
      <g transform={`translate(${side * 6},150)`}>
        <path
          d="M -34 8 Q -36 -22 0 -26 Q 36 -22 34 8 Z"
          fill={C.shoe}
          stroke={C.ink}
          strokeWidth={STROKE}
          strokeLinejoin="round"
        />
        <rect x={-38} y={2} width={76} height={18} rx={9} fill="#fff" stroke={C.ink} strokeWidth={STROKE} />
        <path d="M -12 -14 L 12 -14 M -10 -4 L 10 -4" stroke="#fff" strokeWidth={4} strokeLinecap="round" />
        <path d="M 10 -20 Q 26 -14 28 2" fill="none" stroke="#B5303A" strokeWidth={5} strokeLinecap="round" opacity={0.6} />
        <ellipse cx={-18} cy={-12} rx={7} ry={4} fill="#fff" opacity={0.45} />
      </g>
    </g>
  );

  return (
    <g transform={`translate(${x},${y}) scale(${flip ? -scale : scale},${scale})`}>
      {/* sombra en el piso */}
      <ellipse cx={0} cy={18} rx={110} ry={18} fill={C.ink} opacity={0.12} />
      {leg(-1, legL)}
      {leg(1, legR)}
      <g transform={`translate(0,${bob}) rotate(${lean},0,-200)`}>
        {/* short */}
        <path
          d="M -76 -220 L 76 -220 L 82 -142 Q 44 -134 6 -142 L 0 -168 L -6 -142 Q -44 -134 -82 -142 Z"
          fill={C.kidShorts}
          stroke={C.ink}
          strokeWidth={STROKE}
          strokeLinejoin="round"
        />
        <defs>
          <clipPath id="kidShorts">
            <path d="M -76 -220 L 76 -220 L 82 -142 Q 44 -134 6 -142 L 0 -168 L -6 -142 Q -44 -134 -82 -142 Z" />
          </clipPath>
        </defs>
        <g clipPath="url(#kidShorts)">
          <rect x={42} y={-230} width={60} height={100} fill="#2F5C93" opacity={0.45} />
          <rect x={-90} y={-222} width={180} height={18} fill="#2F5C93" opacity={0.5} />
          <rect x={-90} y={-156} width={180} height={20} fill="#2F5C93" opacity={0.3} />
          <path d="M -60 -200 Q -40 -186 -26 -200" fill="none" stroke="#2F5C93" strokeWidth={4} strokeLinecap="round" />
          <path d="M 26 -200 Q 40 -186 60 -200" fill="none" stroke="#2F5C93" strokeWidth={4} strokeLinecap="round" />
          <rect x={-60} y={-212} width={26} height={6} rx={3} fill="#7FA7DA" opacity={0.7} />
        </g>
        <Arm side={-1} x={-68} y={-318} upper={60} fore={62} width={30} a1={armL[0]} a2={armL[1]} skin={C.kidSkin} sleeve={C.kidShirt} sleeveLen={34} />
        <Arm side={1} x={68} y={-318} upper={60} fore={62} width={30} a1={armR[0]} a2={armR[1]} skin={C.kidSkin} sleeve={C.kidShirt} sleeveLen={34} />
        {/* camiseta a rayas */}
        <defs>
          <clipPath id="kidShirt">
            <path d="M -72 -334 Q -84 -270 -80 -200 L 80 -200 Q 84 -270 72 -334 Q 0 -350 -72 -334 Z" />
          </clipPath>
        </defs>
        <path d="M -72 -334 Q -84 -270 -80 -200 L 80 -200 Q 84 -270 72 -334 Q 0 -350 -72 -334 Z" fill={C.kidShirt} />
        <g clipPath="url(#kidShirt)">
          {[-318, -288, -258, -228].map((sy) => (
            <rect key={sy} x={-100} y={sy} width={200} height={13} fill={C.kidStripe} />
          ))}
          <rect x={46} y={-350} width={60} height={160} fill="#D99A22" opacity={0.32} />
          <ellipse cx={0} cy={-336} rx={64} ry={20} fill="#C98F1E" opacity={0.38} />
          <rect x={-100} y={-214} width={200} height={16} fill="#C98F1E" opacity={0.25} />
          <path d="M -58 -330 Q -64 -280 -60 -226" fill="none" stroke="#fff" strokeWidth={8} strokeLinecap="round" opacity={0.3} />
        </g>
        <path
          d="M -72 -334 Q -84 -270 -80 -200 L 80 -200 Q 84 -270 72 -334 Q 0 -350 -72 -334 Z"
          fill="none"
          stroke={C.ink}
          strokeWidth={STROKE}
          strokeLinejoin="round"
        />
        <path d="M -24 -340 Q 0 -318 24 -340" fill="none" stroke={C.ink} strokeWidth={STROKE * 0.8} strokeLinecap="round" />

        {/* cabeza */}
        <g transform={`rotate(${tilt},0,-340)`}>
          <circle cx={-112} cy={HEAD_Y + 8} r={24} fill={C.kidSkin} stroke={C.ink} strokeWidth={STROKE} />
          <circle cx={112} cy={HEAD_Y + 8} r={24} fill={C.kidSkin} stroke={C.ink} strokeWidth={STROKE} />
          <path d={`M -118 ${HEAD_Y - 2} Q -108 ${HEAD_Y + 8} -114 ${HEAD_Y + 22}`} fill="none" stroke={C.kidSkinShade} strokeWidth={5} strokeLinecap="round" />
          <path d={`M 118 ${HEAD_Y - 2} Q 108 ${HEAD_Y + 8} 114 ${HEAD_Y + 22}`} fill="none" stroke={C.kidSkinShade} strokeWidth={5} strokeLinecap="round" />
          <circle cx={0} cy={HEAD_Y} r={112} fill={C.kidSkin} stroke={C.ink} strokeWidth={STROKE} />
          <defs>
            <clipPath id="kidFace">
              <circle cx={0} cy={HEAD_Y} r={109} />
            </clipPath>
          </defs>
          <g clipPath="url(#kidFace)">
            <circle cx={0} cy={HEAD_Y} r={112} fill={C.kidSkinShade} opacity={0.6} />
            <circle cx={-18} cy={HEAD_Y - 16} r={110} fill={C.kidSkin} />
            <ellipse cx={0} cy={HEAD_Y - 44} rx={110} ry={26} fill={C.kidSkinShade} opacity={0.45} />
            <ellipse cx={-56} cy={HEAD_Y + 8} rx={26} ry={14} fill="#fff" opacity={0.16} />
          </g>
          <Blob
            fill={C.kidHair}
            circles={[
              [0, HEAD_Y - 88, 72],
              [-66, HEAD_Y - 70, 56],
              [66, HEAD_Y - 72, 56],
              [-104, HEAD_Y - 26, 34],
              [104, HEAD_Y - 30, 32],
              [-38, HEAD_Y - 112, 48],
              [44, HEAD_Y - 110, 48],
              [-122, HEAD_Y - 64, 26],
              [124, HEAD_Y - 66, 24],
              [-14, HEAD_Y - 150, 28],
              [34, HEAD_Y - 146, 22],
              [-74, HEAD_Y - 120, 24],
              [-60, HEAD_Y - 66, 34],
              [-16, HEAD_Y - 70, 36],
              [32, HEAD_Y - 68, 34],
              [76, HEAD_Y - 56, 28],
            ]}
          />
          <path d={`M -62 ${HEAD_Y - 118} Q -40 ${HEAD_Y - 140} -14 ${HEAD_Y - 132}`} fill="none" stroke="#4A4242" strokeWidth={7} strokeLinecap="round" />
          <path d={`M 20 ${HEAD_Y - 138} Q 40 ${HEAD_Y - 146} 58 ${HEAD_Y - 132}`} fill="none" stroke="#4A4242" strokeWidth={6} strokeLinecap="round" />
          <path d={`M -96 ${HEAD_Y - 80} Q -88 ${HEAD_Y - 96} -72 ${HEAD_Y - 100}`} fill="none" stroke="#3A3434" strokeWidth={5} strokeLinecap="round" />
          <path d={`M 84 ${HEAD_Y - 92} Q 98 ${HEAD_Y - 84} 104 ${HEAD_Y - 66}`} fill="none" stroke="#3A3434" strokeWidth={5} strokeLinecap="round" />
          <EyePair y={HEAD_Y + 22} dx={40} rx={21} ry={27} look={look} open={open} kind={eyes} />
          <BrowPair y={HEAD_Y - 16} dx={42} w={34} kind={brows} />
          <path d={`M -6 ${HEAD_Y + 52} Q 4 ${HEAD_Y + 60} 10 ${HEAD_Y + 50}`} fill="none" stroke={C.kidSkinShade} strokeWidth={5} strokeLinecap="round" />
          <ellipse cx={-70} cy={HEAD_Y + 58} rx={18} ry={11} fill={C.pink} opacity={blush} />
          <ellipse cx={70} cy={HEAD_Y + 58} rx={18} ry={11} fill={C.pink} opacity={blush} />
          <MouthShape y={HEAD_Y + 78} s={1} kind={mouth} talk={talk} />
        </g>
      </g>
    </g>
  );
};
