import React from 'react';
import {C, STROKE} from '../theme';
import {Arm, Blob, BrowPair, Brows, EyePair, Eyes, Mouth, MouthShape} from './parts';

export type DadPose = {
  armL?: [number, number];
  armR?: [number, number];
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

const HEAD_Y = -730;
const SKIN = '#D9A47C';
const SKIN_SHADE = '#BF8761';
const HAIR = '#2E2420';
const SHIRT = '#F28C6B';
const SHIRT_SHADE = '#D9704F';
const PANTS = '#8C7A5E';
const PANTS_SHADE = '#6F6049';

/** Papá de frente: pies en (0,0), mide ~900 px a escala 1. */
export const Dad: React.FC<{x: number; y: number; scale?: number; flip?: boolean; pose?: DadPose}> = ({
  x,
  y,
  scale = 1,
  flip = false,
  pose = {},
}) => {
  const {
    armL = [6, 4],
    armR = [6, 4],
    bob = 0,
    tilt = 0,
    mouth = 'smile',
    talk = 0,
    eyes = 'normal',
    open = 1,
    look = [0, 0],
    brows = 'neutral',
    blush = 0.25,
  } = pose;

  const leg = (side: -1 | 1) => (
    <g transform={`translate(${side * 40},-400)`}>
      <rect x={-36} y={0} width={72} height={340} rx={20} fill={PANTS} stroke={C.ink} strokeWidth={STROKE} />
      <rect x={10} y={20} width={16} height={290} rx={8} fill={PANTS_SHADE} opacity={0.5} />
      <path d={`M ${-side * 14} 30 L ${-side * 12} 320`} stroke="#A99677" strokeWidth={3} opacity={0.8} />
      <path
        d={`M ${-44 + side * 6} 380 Q ${-46 + side * 6} 336 ${side * 6} 334 Q ${48 + side * 6} 336 ${46 + side * 6} 380 Z`}
        fill="#6B4A33"
        stroke={C.ink}
        strokeWidth={STROKE}
        strokeLinejoin="round"
      />
      <ellipse cx={side * 6 - 12} cy={348} rx={10} ry={5} fill="#fff" opacity={0.3} />
    </g>
  );

  return (
    <g transform={`translate(${x},${y}) scale(${flip ? -scale : scale},${scale})`}>
      <ellipse cx={0} cy={2} rx={140} ry={20} fill={C.ink} opacity={0.12} />
      {leg(-1)}
      {leg(1)}
      <g transform={`translate(0,${bob})`}>
        <path d="M -94 -446 L 94 -446 L 98 -370 L -98 -370 Z" fill={PANTS} stroke={C.ink} strokeWidth={STROKE} strokeLinejoin="round" />
        <path d="M 56 -446 L 94 -446 L 98 -370 L 60 -370 Z" fill={PANTS_SHADE} opacity={0.45} />
        <rect x={-96} y={-452} width={192} height={16} rx={6} fill="#4A3426" stroke={C.ink} strokeWidth={STROKE * 0.8} />
        <rect x={-13} y={-454} width={26} height={20} rx={4} fill="#C9CED6" stroke={C.ink} strokeWidth={3} />
        <Arm side={-1} x={-96} y={-628} upper={124} fore={118} width={32} a1={armL[0]} a2={armL[1]} skin={SKIN} sleeve={SHIRT} sleeveLen={58} />
        <Arm side={1} x={96} y={-628} upper={124} fore={118} width={32} a1={armR[0]} a2={armR[1]} skin={SKIN} sleeve={SHIRT} sleeveLen={58} />
        {/* playera tipo polo */}
        <defs>
          <clipPath id="dadShirt">
            <path d="M -100 -648 Q -106 -540 -96 -436 Q 0 -424 96 -436 Q 106 -540 100 -648 Q 0 -664 -100 -648 Z" />
          </clipPath>
        </defs>
        <path
          d="M -100 -648 Q -106 -540 -96 -436 Q 0 -424 96 -436 Q 106 -540 100 -648 Q 0 -664 -100 -648 Z"
          fill={SHIRT}
          stroke={C.ink}
          strokeWidth={STROKE}
          strokeLinejoin="round"
        />
        <g clipPath="url(#dadShirt)">
          <rect x={56} y={-680} width={60} height={260} fill={SHIRT_SHADE} opacity={0.55} />
          <ellipse cx={0} cy={-646} rx={84} ry={22} fill={SHIRT_SHADE} opacity={0.5} />
          <path d="M -74 -626 Q -82 -540 -74 -460" fill="none" stroke="#fff" strokeWidth={10} strokeLinecap="round" opacity={0.25} />
        </g>
        <rect x={-10} y={-652} width={20} height={70} rx={4} fill={SHIRT_SHADE} stroke={C.ink} strokeWidth={3} />
        <circle cx={0} cy={-620} r={4} fill="#fff" />
        <circle cx={0} cy={-598} r={4} fill="#fff" />
        <rect x={-22} y={-680} width={44} height={36} fill={SKIN} stroke={C.ink} strokeWidth={STROKE} />
        <rect x={-19} y={-678} width={38} height={14} fill={SKIN_SHADE} opacity={0.6} />
        <path d="M -48 -656 L -22 -650 L -6 -628 L -30 -620 Z" fill="#fff" stroke={C.ink} strokeWidth={STROKE * 0.8} strokeLinejoin="round" />
        <path d="M 48 -656 L 22 -650 L 6 -628 L 30 -620 Z" fill="#fff" stroke={C.ink} strokeWidth={STROKE * 0.8} strokeLinejoin="round" />

        {/* cabeza */}
        <g transform={`rotate(${tilt},0,-650)`}>
          <circle cx={-88} cy={HEAD_Y + 8} r={19} fill={SKIN} stroke={C.ink} strokeWidth={STROKE} />
          <circle cx={88} cy={HEAD_Y + 8} r={19} fill={SKIN} stroke={C.ink} strokeWidth={STROKE} />
          <ellipse cx={0} cy={HEAD_Y} rx={86} ry={94} fill={SKIN} stroke={C.ink} strokeWidth={STROKE} />
          <defs>
            <clipPath id="dadFace">
              <ellipse cx={0} cy={HEAD_Y} rx={83} ry={91} />
            </clipPath>
          </defs>
          <g clipPath="url(#dadFace)">
            <ellipse cx={0} cy={HEAD_Y} rx={86} ry={94} fill={SKIN_SHADE} opacity={0.55} />
            <ellipse cx={-14} cy={HEAD_Y - 12} rx={84} ry={92} fill={SKIN} />
            {/* barba corta */}
            <path
              d={`M -84 ${HEAD_Y + 30} Q -78 ${HEAD_Y + 98} 0 ${HEAD_Y + 100} Q 78 ${HEAD_Y + 98} 84 ${HEAD_Y + 30} L 72 ${HEAD_Y + 34} Q 64 ${HEAD_Y + 70} 34 ${HEAD_Y + 62} Q 0 ${HEAD_Y + 52} -34 ${HEAD_Y + 62} Q -64 ${HEAD_Y + 70} -72 ${HEAD_Y + 34} Z`}
              fill="#4A3A33"
              opacity={0.75}
            />
            <ellipse cx={-40} cy={HEAD_Y - 10} rx={16} ry={9} fill="#fff" opacity={0.15} />
          </g>
          {/* pelo corto con raya */}
          <Blob
            fill={HAIR}
            circles={[
              [-30, HEAD_Y - 74, 44],
              [30, HEAD_Y - 78, 46],
              [-68, HEAD_Y - 46, 26],
              [70, HEAD_Y - 48, 26],
              [0, HEAD_Y - 88, 40],
            ]}
          />
          <path d={`M -36 ${HEAD_Y - 112} Q -20 ${HEAD_Y - 90} -18 ${HEAD_Y - 60}`} fill="none" stroke="#4A3A33" strokeWidth={5} strokeLinecap="round" />
          <path d={`M 10 ${HEAD_Y - 118} Q 40 ${HEAD_Y - 124} 62 ${HEAD_Y - 102}`} fill="none" stroke="#4A3A33" strokeWidth={6} strokeLinecap="round" />
          <EyePair y={HEAD_Y + 4} dx={32} rx={14} ry={17} look={look} open={open} kind={eyes} />
          {/* lentes */}
          <g fill="none" stroke={C.ink} strokeWidth={5}>
            <circle cx={-32} cy={HEAD_Y + 4} r={26} />
            <circle cx={32} cy={HEAD_Y + 4} r={26} />
            <path d={`M -6 ${HEAD_Y} Q 0 ${HEAD_Y - 6} 6 ${HEAD_Y}`} />
            <path d={`M -58 ${HEAD_Y - 2} L -82 ${HEAD_Y - 6} M 58 ${HEAD_Y - 2} L 82 ${HEAD_Y - 6}`} />
          </g>
          <BrowPair y={HEAD_Y - 32} dx={34} w={32} kind={brows} color={HAIR} />
          <path d={`M -6 ${HEAD_Y + 30} Q 4 ${HEAD_Y + 38} 12 ${HEAD_Y + 30}`} fill="none" stroke={SKIN_SHADE} strokeWidth={5} strokeLinecap="round" />
          <path d={`M -26 ${HEAD_Y + 46} Q 0 ${HEAD_Y + 38} 26 ${HEAD_Y + 46}`} fill="none" stroke={HAIR} strokeWidth={9} strokeLinecap="round" />
          <ellipse cx={-56} cy={HEAD_Y + 34} rx={13} ry={8} fill={C.pink} opacity={blush} />
          <ellipse cx={56} cy={HEAD_Y + 34} rx={13} ry={8} fill={C.pink} opacity={blush} />
          <g>
            <ellipse cx={0} cy={HEAD_Y + 62} rx={26} ry={16} fill={SKIN} />
            <MouthShape y={HEAD_Y + 62} s={0.85} kind={mouth} talk={talk} />
          </g>
        </g>
      </g>
    </g>
  );
};
