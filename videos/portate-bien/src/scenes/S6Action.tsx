import React from 'react';
import {interpolate} from 'remotion';
import {blink, pop, ramp, wobble} from '../anim';
import {Garden} from '../backgrounds';
import {Kid} from '../characters/Kid';
import {Mom} from '../characters/Mom';
import {CheckBadge, Clipboard, EyeIcon, Headline, Heart, Sparkle, Star} from '../props';
import {HEAD} from '../fonts';
import {Stage, Svg} from '../Stage';
import {C} from '../theme';
import {SCENES, sec} from '../timing';

const [A, B] = SCENES.action;
const PARTY = sec(40.05);

const ITEMS = [
  {t: 'Camina despacio', at: sec(34.5)},
  {t: 'Usa tu voz bajita', at: sec(35.6)},
];

// 32.9–41.5 s · "Aquí sí tenemos una acción que define eso que tú como padres quieres ver y lo que para ti es portarse bien."
export const S6Action: React.FC = () => (
  <Stage from={A} to={B} bg={<Garden />}>
    {(g) => {
      const board = pop(g, A + 3);
      const eye = pop(g, sec(37.9));
      const party = pop(g, PARTY);
      const five = ramp(g, PARTY - 4, PARTY + 6);
      const jump = g > PARTY ? -Math.abs(Math.sin((g - PARTY) * 0.22)) * 26 : 0;
      return (
        <>
          <Svg>
            <g transform={`translate(0,${(1 - board) * 700})`}>
              <Clipboard x={540} y={700} w={820} h={430} rot={-2 + wobble(g, 0.05, 0.6)}>
                <text x={0} y={-100} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={52} fill={C.inkSoft}>
                  Lo que SÍ quiero ver:
                </text>
                {ITEMS.map((it, i) => {
                  const p = pop(g, it.at);
                  const y = 10 + i * 112;
                  return (
                    <g key={it.t} opacity={Math.min(1, p * 2)} transform={`translate(${(1 - p) * 60},0)`}>
                      <CheckBadge x={-290} y={y - 18} r={40} p={p} />
                      <text x={-230} y={y} fontFamily={HEAD} fontWeight={800} fontSize={66} fill={C.ink}>
                        {it.t}
                      </text>
                    </g>
                  );
                })}
              </Clipboard>
              <g transform={`rotate(${wobble(g, 0.1, 4)},880,560)`}>
                <EyeIcon x={880} y={520} s={0.9 * eye} open={blink(g, 5) > 0.5 ? 1 : 0.15} />
              </g>
            </g>
            <Kid
              x={390}
              y={1390 + jump}
              scale={0.74}
              pose={{
                mouth: g > PARTY ? 'grin' : 'smile',
                eyes: g > PARTY ? 'happy' : 'normal',
                brows: 'happy',
                look: [0.6, -0.6],
                open: blink(g, 33),
                armR: [interpolate(five, [0, 1], [8, 150]), interpolate(five, [0, 1], [6, 10])],
              }}
            />
            <Mom
              x={710}
              y={1390}
              scale={0.58}
              pose={{
                mouth: g > PARTY ? 'grin' : 'smile',
                eyes: g > PARTY ? 'happy' : 'normal',
                brows: 'happy',
                look: [-0.6, 0.2],
                open: blink(g, 71),
                armL: [interpolate(five, [0, 1], [6, 150]), interpolate(five, [0, 1], [4, 10])],
              }}
            />
            <g opacity={party}>
              {[
                [520, 1030, 0.9, -15],
                [600, 980, 0.7, 10],
                [300, 1080, 0.6, -20],
                [820, 1060, 0.65, 18],
              ].map(([x, y, s, r], i) => (
                <Heart key={i} x={x} y={y - (g - PARTY) * (1.2 + i * 0.3)} s={s * party} rot={r} color={i % 2 ? C.red : C.pink} />
              ))}
              <Star x={200} y={950} s={0.9 * party} rot={g * 2} />
              <Star x={930} y={980} s={0.8 * party} rot={-g * 2} color={C.orange} />
              <Sparkle x={560} y={1120} s={1.2 * party} color={C.yellow} />
            </g>
          </Svg>
          <Headline p={pop(g, A + 4)} out={ramp(g, PARTY - 8, PARTY)} size={80}>
            Una <span style={{color: C.green}}>acción concreta</span>
            <br />
            que tu hijo entiende
          </Headline>
          <Headline p={party} rotate={2} size={86} bg="#FFFBEF">
            ¡Eso es <span style={{color: C.green}}>portarse bien</span>!
          </Headline>
        </>
      );
    }}
  </Stage>
);
