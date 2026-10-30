import React from 'react';
import {interpolate} from 'remotion';
import {blink, pop, wobble} from '../anim';
import {Plain} from '../backgrounds';
import {Kid} from '../characters/Kid';
import {Blob} from '../characters/parts';
import {HEAD} from '../fonts';
import {Brain, Clipboard, Headline, QuestionMark, XBadge} from '../props';
import {Stage, Svg} from '../Stage';
import {C} from '../theme';
import {SCENES, sec} from '../timing';

const [A, B] = SCENES.brain;

// 5.6–12.6 s · "El cerebro del niño no recepciona qué es portarse bien si no define ninguna acción."
export const S2Brain: React.FC = () => (
  <Stage from={A} to={B} bg={<Plain color="#F1E8FB" dot="#E4D5F6" seed={2} floor="#E6D9F5" />}>
    {(g) => {
      const kidIn = pop(g, A + 2);
      const cloud = pop(g, sec(6.3));
      const brain = pop(g, sec(6.7));
      const fuzzy = pop(g, sec(8.7));
      const board = pop(g, sec(10.3));
      const none = pop(g, sec(11.2));
      const look: [number, number] = g < sec(10.4) ? [0.7 * Math.sin(g * 0.15), -0.3] : [0.6, 0.8];
      const orbit = (i: number, r: number) => {
        const a = g * 0.06 + (i * Math.PI * 2) / 3;
        return [660 + Math.cos(a) * r, 800 + Math.sin(a) * r * 0.55];
      };
      return (
        <>
          <Svg>
            <Kid
              x={210}
              y={1330 + (1 - kidIn) * 300}
              scale={0.9}
              pose={{
                mouth: 'wavy',
                brows: 'worried',
                look: [0.8, -0.8],
                open: blink(g, 40),
                armR: [118, 128],
                tilt: 6 + wobble(g, 0.1, 2),
              }}
            />
            {/* burbujas de pensamiento */}
            <g opacity={cloud}>
              <circle cx={300} cy={760} r={18 * cloud} fill="#fff" stroke={C.ink} strokeWidth={6} />
              <circle cx={350} cy={705} r={28 * cloud} fill="#fff" stroke={C.ink} strokeWidth={6} />
              <g transform={`translate(660,800) scale(${cloud})`}>
                <Blob
                  fill="#fff"
                  circles={[
                    [-200, 20, 110],
                    [-110, -110, 120],
                    [40, -140, 125],
                    [190, -70, 115],
                    [220, 60, 100],
                    [100, 150, 105],
                    [-60, 150, 110],
                    [0, 0, 170],
                  ]}
                />
              </g>
            </g>
            <Brain x={660} y={800} s={1.25 * brain} look={look} mood="confused" open={blink(g, 7)} />
            <g opacity={fuzzy}>
              {[0, 1, 2].map((i) => {
                const [x, y] = orbit(i, 250);
                return <QuestionMark key={i} x={x} y={y} s={0.75 * fuzzy} rot={wobble(g + i * 20, 0.2, 14)} color={i === 1 ? C.yellow : C.orange} />;
              })}
            </g>
            <g transform={`translate(0,${(1 - board) * 500})`} opacity={board}>
              <Clipboard x={810} y={1150} w={330} h={300} rot={7 + wobble(g, 0.08, 1)}>
                <text x={0} y={-62} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={46} fill={C.ink}>
                  Acción:
                </text>
                <text x={0} y={30} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={70} fill={C.inkSoft} opacity={interpolate(g % 30, [0, 15, 30], [0.35, 0.9, 0.35])}>
                  ¿ ? ?
                </text>
              </Clipboard>
              <XBadge x={940} y={1010} r={52} p={none} />
            </g>
          </Svg>
          <Headline p={pop(g, A + 4)} size={78} bg="#FFFDF7">
            Su cerebro no capta
            <br />
            qué es <span style={{color: C.red}}>«portarse bien»</span>
          </Headline>
        </>
      );
    }}
  </Stage>
);
