import React from 'react';
import {AbsoluteFill} from 'remotion';
import {blink, pop, ramp, wobble} from '../anim';
import {Bedroom} from '../backgrounds';
import {Kid} from '../characters/Kid';
import {HEAD} from '../fonts';
import {Headline, RevealLines, Toy, Trophy} from '../props';
import {Stage, Svg} from '../Stage';
import {C, STROKE} from '../theme';
import {SCENES, sec} from '../timing';

const [A, B] = SCENES.loop;
const CX = 540;
const CY = 790;
const R = 250;

const NODES: {t: string; deg: number; at: number; color: string}[] = [
  {t: 'Le pides algo', deg: -90, at: sec(22.4), color: '#FFFFFF'},
  {t: 'Dice «no»', deg: 30, at: sec(22.9), color: '#FFE4E1'},
  {t: 'Discuten', deg: 150, at: sec(23.4), color: '#FFE4E1'},
];

// 22.1–32.35 s · "¿Qué pasa? Estamos reforzando que ese hijo siempre quiera tener un tema de conversación con el padre para lograr salirse con las suyas."
export const S4Loop: React.FC = () => (
  <Stage
    from={A}
    to={B}
    bg={
      <AbsoluteFill>
        <Bedroom />
        <AbsoluteFill style={{background: 'rgba(255,248,238,0.62)'}} />
      </AbsoluteFill>
    }
  >
    {(g) => {
      const reinforce = sec(24.85);
      const talkMore = sec(28.5);
      const wins = sec(30.6);
      const speed = 0.6 + ramp(g, reinforce, wins) * 2.4;
      const spin = (g - A) * speed;
      const center = pop(g, talkMore);
      const kid = pop(g, wins - 10);
      const trophy = pop(g, wins + 8);
      return (
        <>
          <Svg>
            {/* círculo del ciclo con flechas que giran */}
            <g opacity={pop(g, A + 4)}>
              <circle cx={CX} cy={CY} r={R} fill="none" stroke={C.red} strokeWidth={14} strokeDasharray="38 26" strokeDashoffset={-spin * 3} opacity={0.75} />
              {[0, 120, 240].map((d) => {
                const a = ((d + spin) * Math.PI) / 180;
                return (
                  <g key={d} transform={`translate(${CX + Math.cos(a) * R},${CY + Math.sin(a) * R}) rotate(${(a * 180) / Math.PI + 90})`}>
                    <path d="M -22 -16 L 22 0 L -22 16 Z" fill={C.red} stroke={C.ink} strokeWidth={4} strokeLinejoin="round" />
                  </g>
                );
              })}
            </g>
            {/* centro: más charla = más atención */}
            <g transform={`translate(${CX},${CY}) scale(${0.6 + 0.4 * center})`} opacity={Math.max(0.35, center)}>
              <circle r={120} fill={C.yellow} stroke={C.ink} strokeWidth={STROKE + 1} />
              <path d="M -60 -36 h 80 a 16 16 0 0 1 16 16 v 34 a 16 16 0 0 1 -16 16 h -40 l -22 18 v -18 h -18 a 16 16 0 0 1 -16 -16 v -34 a 16 16 0 0 1 16 -16 Z" fill="#fff" stroke={C.ink} strokeWidth={4} />
              <path d="M 10 -6 h 54 a 14 14 0 0 1 14 14 v 28 a 14 14 0 0 1 -14 14 h -8 v 16 l -18 -16 h -28 a 14 14 0 0 1 -14 -14 v -28 a 14 14 0 0 1 14 -14 Z" fill={C.sky} stroke={C.ink} strokeWidth={4} />
              <text x={-24} y={-6} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={26} fill={C.ink}>bla bla</text>
              <text y={92} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={30} fill={C.ink} opacity={center}>+ atención</text>
            </g>
            {NODES.map((n) => {
              const p = pop(g, n.at);
              const a = (n.deg * Math.PI) / 180;
              const x = CX + Math.cos(a) * R;
              const y = CY + Math.sin(a) * R;
              const w = n.t.length * 25 + 64;
              return (
                <g key={n.t} transform={`translate(${x},${y}) scale(${p})`} opacity={Math.min(1, p * 2)}>
                  <rect x={-w / 2} y={-42} width={w} height={84} rx={42} fill={n.color} stroke={C.ink} strokeWidth={STROKE} />
                  <text y={16} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={46} fill={C.ink}>
                    {n.t}
                  </text>
                </g>
              );
            })}
            {/* el niño se sale con la suya: no recogió nada */}
            <g opacity={kid} transform={`translate(0,${(1 - kid) * 200})`}>
              <Toy x={160} y={1440} kind="block" color={C.blue} rot={-12} />
              <Toy x={300} y={1470} kind="car" color={C.red} />
              <Kid
                x={850}
                y={1490}
                scale={0.66}
                pose={{
                  mouth: 'grin',
                  eyes: 'happy',
                  brows: 'happy',
                  armL: [150, 10],
                  armR: [150, 10],
                  bob: -Math.abs(Math.sin((g - wins) * 0.25)) * 12,
                  open: blink(g, 3),
                }}
              />
              <Trophy x={850} y={1010 - 10 * trophy + wobble(g, 0.2, 4)} s={0.7 * trophy} />
            </g>
          </Svg>
          <div
            style={{
              position: 'absolute',
              top: 1110,
              left: 0,
              right: 0,
              display: 'flex',
              justifyContent: 'center',
              opacity: pop(g, sec(23.6)) * (1 - kid),
            }}
          >
            <span
              style={{
                fontFamily: HEAD,
                fontWeight: 800,
                fontSize: 40,
                background: '#fff',
                border: `4px solid ${C.ink}`,
                borderRadius: 999,
                padding: '8px 22px 2px',
                color: C.ink,
              }}
            >
              <span style={{fontStyle: 'italic', color: C.blue}}>«back and forth»</span> = un ir y venir
            </span>
          </div>
          <Headline p={pop(g, A + 4)} size={70}>
            <RevealLines
              frame={g}
              lines={[
                {t: '¿Qué pasa?', at: A + 4},
                {t: <>Sin querer, <span style={{color: C.red}}>premias</span></>, at: reinforce},
                {t: <>la discusión</>, at: reinforce + 4},
              ]}
            />
          </Headline>
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 1580,
              textAlign: 'center',
              fontFamily: HEAD,
              fontWeight: 800,
              fontSize: 56,
              color: C.ink,
              opacity: trophy,
              transform: `scale(${0.8 + 0.2 * trophy})`,
            }}
          >
            <span style={{background: '#fff', border: `5px solid ${C.ink}`, borderRadius: 30, padding: '10px 26px 4px', boxShadow: `0 8px 0 ${C.ink}`}}>
              ¡Se sale con la suya!
            </span>
          </div>
        </>
      );
    }}
  </Stage>
);
