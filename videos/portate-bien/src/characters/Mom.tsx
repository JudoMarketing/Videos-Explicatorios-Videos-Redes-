import React from 'react';
import {C, STROKE} from '../theme';
import {Arm, Blob, BrowPair, Brows, EyePair, Eyes, Mouth, MouthShape} from './parts';

export type MomPose = {
  armL?: [number, number];
  armR?: [number, number];
  legL?: [number, number];
  legR?: [number, number];
  bob?: number;
  tilt?: number;
  mouth?: Mouth;
  talk?: number;
  eyes?: Eyes;
  open?: number;
  look?: [number, number];
  brows?: Brows;
  blush?: number;
};

const HEAD_Y = -700;

/** Mamá de frente: pies en (0,0), mide ~870 px a escala 1. */
export const Mom: React.FC<{x: number; y: number; scale?: number; flip?: boolean; pose?: MomPose}> = ({
  x,
  y,
  scale = 1,
  flip = false,
  pose = {},
}) => {
  const {
    armL = [6, 4],
    armR = [6, 4],
    legL = [0, 0],
    legR = [0, 0],
    bob = 0,
    tilt = 0,
    mouth = 'smile',
    talk = 0,
    eyes = 'normal',
    open = 1,
    look = [0, 0],
    brows = 'neutral',
    blush = 0.4,
  } = pose;

  const leg = (side: -1 | 1, [lift, rot]: [number, number]) => (
    <g transform={`translate(${side * 36},-380) rotate(${-side * rot}) translate(0,${-lift})`}>
      <rect x={-33} y={0} width={66} height={318} rx={22} fill={C.jeans} stroke={C.ink} strokeWidth={STROKE} />
      <rect x={-34} y={292} width={68} height={26} rx={8} fill={C.jeansDark} stroke={C.ink} strokeWidth={STROKE} />
      <rect x={-16} y={316} width={32} height={30} fill={C.momSkin} stroke={C.ink} strokeWidth={STROKE} />
      <path
        d={`M ${-38 + side * 4} 372 Q ${-40 + side * 4} 336 ${side * 4} 334 Q ${40 + side * 4} 336 ${38 + side * 4} 372 Z`}
        fill="#E8785F"
        stroke={C.ink}
        strokeWidth={STROKE}
        strokeLinejoin="round"
      />
    </g>
  );

  return (
    <g transform={`translate(${x},${y}) scale(${flip ? -scale : scale},${scale})`}>
      <ellipse cx={0} cy={2} rx={130} ry={20} fill={C.ink} opacity={0.12} />
      {leg(-1, legL)}
      {leg(1, legR)}
      <g transform={`translate(0,${bob})`}>
        {/* cadera del pantalón */}
        <path
          d="M -86 -420 L 86 -420 L 90 -350 L -90 -350 Z"
          fill={C.jeans}
          stroke={C.ink}
          strokeWidth={STROKE}
          strokeLinejoin="round"
        />
        <rect x={-88} y={-426} width={176} height={16} rx={6} fill="#8A5A3B" stroke={C.ink} strokeWidth={STROKE * 0.8} />
        <path d="M 0 -410 L 0 -362" stroke={C.jeansDark} strokeWidth={5} strokeLinecap="round" />
        {/* pelo de atrás (melena) */}
        <g transform={`rotate(${tilt},0,-600)`}>
          <Blob
            fill={C.momHair}
            circles={[
              [-74, HEAD_Y + 10, 52],
              [74, HEAD_Y + 10, 52],
              [-80, HEAD_Y + 60, 40],
              [80, HEAD_Y + 60, 40],
              [0, HEAD_Y - 30, 96],
            ]}
          />
        </g>
        <Arm side={-1} x={-84} y={-592} upper={118} fore={112} width={28} a1={armL[0]} a2={armL[1]} skin={C.momSkin} sleeve={C.momShirt} sleeveLen={54} />
        <Arm side={1} x={84} y={-592} upper={118} fore={112} width={28} a1={armR[0]} a2={armR[1]} skin={C.momSkin} sleeve={C.momShirt} sleeveLen={54} />
        {/* blusa */}
        <path
          d="M -86 -610 Q -96 -500 -84 -410 Q 0 -398 84 -410 Q 96 -500 86 -610 Q 0 -628 -86 -610 Z"
          fill={C.momShirt}
          stroke={C.ink}
          strokeWidth={STROKE}
          strokeLinejoin="round"
        />
        <path d="M -34 -616 L 0 -566 L 34 -616" fill={C.momSkin} stroke={C.ink} strokeWidth={STROKE} strokeLinejoin="round" />
        <path d="M -60 -470 Q 0 -460 60 -470" fill="none" stroke={C.momShirtShade} strokeWidth={5} strokeLinecap="round" />
        {/* cuello */}
        <rect x={-20} y={-640} width={40} height={40} fill={C.momSkin} stroke={C.ink} strokeWidth={STROKE} />
        <path d="M -34 -616 L 0 -566 L 34 -616" fill={C.momSkin} />
        <path d="M -34 -616 L 0 -566 L 34 -616" fill="none" stroke={C.ink} strokeWidth={STROKE} strokeLinejoin="round" />

        {/* cabeza */}
        <g transform={`rotate(${tilt},0,-600)`}>
          <circle cx={-86} cy={HEAD_Y + 10} r={18} fill={C.momSkin} stroke={C.ink} strokeWidth={STROKE} />
          <circle cx={86} cy={HEAD_Y + 10} r={18} fill={C.momSkin} stroke={C.ink} strokeWidth={STROKE} />
          <circle cx={-88} cy={HEAD_Y + 34} r={7} fill={C.yellow} stroke={C.ink} strokeWidth={3} />
          <circle cx={88} cy={HEAD_Y + 34} r={7} fill={C.yellow} stroke={C.ink} strokeWidth={3} />
          <ellipse cx={0} cy={HEAD_Y} rx={86} ry={92} fill={C.momSkin} stroke={C.ink} strokeWidth={STROKE} />
          {/* moño + flequillo */}
          <Blob
            fill={C.momHair}
            circles={[
              [0, HEAD_Y - 150, 44],
              [0, HEAD_Y - 82, 54],
              [-44, HEAD_Y - 74, 46],
              [46, HEAD_Y - 72, 44],
              [-74, HEAD_Y - 30, 26],
              [76, HEAD_Y - 34, 24],
            ]}
          />
          <path d={`M -26 ${HEAD_Y - 172} Q 0 ${HEAD_Y - 150} 22 ${HEAD_Y - 176}`} fill="none" stroke={C.momHairDark} strokeWidth={5} strokeLinecap="round" />
          <path d={`M -10 ${HEAD_Y - 104} Q 20 ${HEAD_Y - 80} 30 ${HEAD_Y - 46}`} fill="none" stroke={C.momHairDark} strokeWidth={5} strokeLinecap="round" />
          <rect x={-30} y={HEAD_Y - 128} width={60} height={14} rx={7} fill={C.pink} stroke={C.ink} strokeWidth={4} />
          <EyePair y={HEAD_Y + 6} dx={32} rx={15} ry={19} look={look} open={open} kind={eyes} lashes />
          <BrowPair y={HEAD_Y - 18} dx={33} w={30} kind={brows} color={C.momHairDark} />
          <path d={`M -4 ${HEAD_Y + 26} Q 4 ${HEAD_Y + 34} 10 ${HEAD_Y + 26}`} fill="none" stroke={C.momSkinShade} strokeWidth={5} strokeLinecap="round" />
          <ellipse cx={-56} cy={HEAD_Y + 34} rx={14} ry={9} fill={C.pink} opacity={blush} />
          <ellipse cx={56} cy={HEAD_Y + 34} rx={14} ry={9} fill={C.pink} opacity={blush} />
          <MouthShape y={HEAD_Y + 52} s={0.85} kind={mouth} talk={talk} />
        </g>
      </g>
    </g>
  );
};
