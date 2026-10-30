import React from 'react';
import {Easing, interpolate} from 'remotion';
import {blink, lipSync, pop, ramp, wobble} from '../anim';
import {Plain} from '../backgrounds';
import {Mom} from '../characters/Mom';
import {Kid} from '../characters/Kid';
import {Headline, Heart, PaperPlane, Phone, Sparkle} from '../props';
import {BODY, HEAD} from '../fonts';
import {Stage, Svg} from '../Stage';
import {C, STROKE} from '../theme';
import {SCENES, sec} from '../timing';

const [A, B] = SCENES.share;
const SEND = sec(47.6);
const COUNT_A = sec(44.4);
const COUNT_B = sec(45.35);

// Globitos "¡Pórtate bien!" que se acumulan alrededor de la mamá cansada.
const SPOTS: [number, number, number][] = [
  [620, 600, -6],
  [860, 700, 5],
  [600, 790, 4],
  [860, 880, -5],
  [610, 970, -3],
  [850, 520, 6],
];

// 41.5–51.4 s · "Si tú conoces a alguien que repite 20 veces al día «pórtate bien», mándale este video…"
export const S7Share: React.FC = () => (
  <Stage from={A} to={B} bg={<Plain color="#E5F1FC" dot="#D0E4F7" seed={7} floor="#D6E7F7" />}>
    {(g) => {
      const sent = g >= SEND;
      const count = Math.round(interpolate(g, [COUNT_A, COUNT_B], [1, 20], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.quad)}));
      const counterIn = pop(g, COUNT_A - 4);
      const bubblesOut = ramp(g, SEND - 6, SEND + 8);
      const phone = pop(g, SEND, 13);
      const thumbs = ramp(g, SEND + 4, SEND + 14);
      const fly = ((g - SEND - 10) % 40) / 40;
      return (
        <>
          <Svg>
            <Mom
              x={290}
              y={1330}
              scale={0.86}
              pose={{
                talk: lipSync(g, [[sec(46.75), sec(47.45)]]) * 0.7,
                mouth: sent ? 'grin' : 'flat',
                eyes: sent ? 'happy' : 'squint',
                brows: sent ? 'happy' : 'worried',
                open: blink(g, 44),
                look: [0.6, 0.1],
                tilt: sent ? 0 : 6 + wobble(g, 0.07, 2),
                armR: [interpolate(thumbs, [0, 1], [6, 70]), interpolate(thumbs, [0, 1], [4, 110])],
                armL: sent ? [8, 6] : [24, 140],
              }}
            />
            {/* contador de veces */}
            <g opacity={counterIn * (1 - bubblesOut)} transform={`translate(830,1140) scale(${counterIn * (1 + (count === 20 ? 0.06 * Math.sin(g * 0.6) : 0))})`}>
              <circle r={124} fill={C.red} stroke={C.ink} strokeWidth={STROKE + 2} />
              <text y={18} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={118} fill="#fff">
                {count}×
              </text>
              <text y={78} textAnchor="middle" fontFamily={BODY} fontWeight={600} fontSize={34} fill="#fff">
                al día
              </text>
            </g>
            {/* globitos que se acumulan */}
            {SPOTS.map(([x, y, r], i) => {
              const at = interpolate(i, [0, SPOTS.length - 1], [COUNT_A - 6, COUNT_B]);
              const p = pop(g, Math.round(at));
              if (p <= 0) return null;
              const dx = bubblesOut * (x > 700 ? 600 : -500);
              return (
                <g key={i} transform={`translate(${x + dx},${y - bubblesOut * 200}) rotate(${r}) scale(${p * (1 - bubblesOut * 0.5)})`} opacity={1 - bubblesOut}>
                  <rect x={-170} y={-46} width={340} height={92} rx={46} fill="#fff" stroke={C.red} strokeWidth={STROKE + 1} />
                  <path d="M -40 44 L -64 80 L -10 44" fill="#fff" stroke={C.red} strokeWidth={STROKE + 1} strokeLinejoin="round" />
                  <rect x={-38} y={36} width={24} height={10} fill="#fff" />
                  <text y={16} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={46} fill="#C2272D">
                    ¡Pórtate bien!
                  </text>
                </g>
              );
            })}
            {/* teléfono para compartir */}
            <g opacity={phone} transform={`translate(0,${(1 - phone) * 900})`}>
              <Phone x={740} y={870} s={0.95} rot={6 + wobble(g, 0.08, 1.5)}>
                <rect x={-128} y={-246} width={256} height={300} fill="#FCE6CF" />
                <g transform="translate(0,-40) scale(0.42)">
                  <Kid x={0} y={220} pose={{mouth: 'grin', eyes: 'happy', brows: 'happy'}} />
                </g>
                <circle cx={0} cy={-100} r={46} fill="#ffffffcc" stroke={C.ink} strokeWidth={5} />
                <path d="M -14 -124 L 24 -100 L -14 -76 Z" fill={C.ink} />
                <rect x={-108} y={84} width={216} height={18} rx={9} fill="#E2D6CA" />
                <rect x={-108} y={114} width={150} height={18} rx={9} fill="#E2D6CA" />
                <g transform={`translate(0,192) scale(${1 + 0.05 * Math.sin(g * 0.4)})`}>
                  <rect x={-112} y={-38} width={224} height={76} rx={38} fill={C.green} stroke={C.ink} strokeWidth={5} />
                  <text x={18} y={16} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={46} fill="#fff">
                    Enviar
                  </text>
                  <PaperPlane x={-66} y={0} s={0.3} rot={-10} />
                </g>
              </Phone>
              {g > SEND + 10 ? (
                <g opacity={interpolate(fly, [0, 0.15, 0.8, 1], [0, 1, 1, 0])}>
                  <PaperPlane x={800 + fly * 190} y={640 - fly * 240} s={0.9} rot={-20} />
                  <path
                    d={`M ${780} ${700} Q ${820 + fly * 120} ${680 - fly * 120} ${790 + fly * 190} ${650 - fly * 240}`}
                    fill="none"
                    stroke={C.blue}
                    strokeWidth={6}
                    strokeDasharray="14 14"
                    opacity={0.6}
                  />
                </g>
              ) : null}
            </g>
            <g opacity={thumbs}>
              <Heart x={170} y={560 - ((g - SEND) % 60) * 2} s={0.8} rot={-12} />
              <Heart x={440} y={520 - ((g - SEND + 30) % 60) * 2} s={0.6} rot={14} color={C.red} />
              <Sparkle x={980} y={1120} s={1.1} color={C.yellow} />
              <Sparkle x={560} y={1150} s={0.8} color="#fff" />
            </g>
          </Svg>
          <Headline p={pop(g, A + 4)} out={ramp(g, SEND - 8, SEND)} size={72}>
            ¿Conoces a alguien que
            <br />
            repite <span style={{color: C.red}}>«pórtate bien»</span>?
          </Headline>
          <Headline p={pop(g, SEND)} rotate={2} size={88} bg="#FFFBEF">
            ¡<span style={{color: C.blue}}>Mándale</span> este video!
          </Headline>
        </>
      );
    }}
  </Stage>
);
