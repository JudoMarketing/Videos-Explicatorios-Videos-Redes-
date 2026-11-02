import React from 'react';
import {blink, lipSync, pop, ramp, wobble} from '../anim';
import {Bedroom} from '../backgrounds';
import {Kid} from '../characters/Kid';
import {Mom} from '../characters/Mom';
import {Bubble, Headline, RevealLines, SweatDrop, Toy} from '../props';
import {Stage, Svg} from '../Stage';
import {C} from '../theme';
import {SCENES, sec} from '../timing';

const [A, B] = SCENES.explain;
const ASK = sec(14.0);
const NO = sec(16.2);
const EXPLAIN = sec(17.8);

const REASONS: {t: string; at: number; x: number; y: number}[] = [
  {t: 'Bueno, es que…', at: sec(17.8), x: 600, y: 440},
  {t: 'Creo que deberías hacerlo…', at: sec(18.7), x: 590, y: 560},
  {t: '¡Porque sí!', at: sec(20.75), x: 610, y: 680},
  {t: 'Porque… no sé qué', at: sec(21.25), x: 590, y: 800},
];

// 14.0–22.1 s · "Quiero que haga tal cosa, y el hijo le dice que no. Y ahí el padre empieza: bueno, es que creo que tú deberías hacer esto porque sí, porque no sé qué."
export const S3Explain: React.FC = () => (
  <Stage from={A} to={B} bg={<Bedroom />}>
    {(g) => {
      const said = g >= NO;
      const frazzled = g >= sec(19.5);
      return (
        <>
          <Svg>
            {/* juguetes tirados */}
            <Toy x={120} y={1400} kind="block" color={C.blue} rot={-12} />
            <Toy x={200} y={1460} kind="block" color={C.yellow} rot={8} />
            <Toy x={440} y={1440} kind="car" color={C.red} rot={-4} />
            <Toy x={160} y={1310} kind="bear" s={0.9} />
            <Toy x={520} y={1370} kind="ball" color="#7CC27A" />
            <Kid
              x={240}
              y={1330}
              scale={0.92}
              pose={{
                crossed: said,
                mouth: said ? (g < NO + 30 ? 'o' : 'frown') : 'smile',
                talk: lipSync(g, [[NO - 2, NO + 10]]),
                brows: said ? 'angry' : 'neutral',
                eyes: g > EXPLAIN + 40 ? 'squint' : 'normal',
                look: g > EXPLAIN ? [-0.8, -0.2] : [0.8, -0.4],
                open: blink(g, 31),
                tilt: g > EXPLAIN ? -6 : 0,
              }}
            />
            <Mom
              x={900}
              y={1330}
              scale={0.85}
              pose={{
                talk: lipSync(g, [[ASK, sec(15.1)], [EXPLAIN, sec(21.95)]]),
                mouth: g > EXPLAIN ? 'flat' : 'smile',
                brows: frazzled ? 'worried' : g > NO ? 'raised' : 'neutral',
                look: [-0.8, 0.4],
                open: blink(g, 12),
                armL: g > EXPLAIN ? [50 + wobble(g, 0.4, 25), 50 + wobble(g, 0.5, 30)] : [interpolate2(ramp(g, ASK, ASK + 8), 6, 60), interpolate2(ramp(g, ASK, ASK + 8), 4, 40)],
                armR: frazzled ? [150, 120] : [34, -110],
                tilt: frazzled ? wobble(g, 0.3, 3) : 0,
              }}
            />
            {frazzled ? <SweatDrop x={990} y={560 + ((g - sec(19.5)) % 24) * 1.5} s={0.9} /> : null}
          </Svg>
          <Bubble x={560} y={470} w={540} p={pop(g, ASK) * (1 - ramp(g, NO - 8, NO))} tone="pos" tail={{at: 0.86, dir: 1}} size={62}>
            Recoge tus juguetes, por favor.
          </Bubble>
          <Bubble x={250} y={560} w={260} p={pop(g, NO) * (1 - ramp(g, EXPLAIN - 6, EXPLAIN))} tone="neg" tail={{at: 0.4, dir: -1}} size={90}>
            ¡NO!
          </Bubble>
          {REASONS.map((r, i) => (
            <Bubble key={i} x={r.x} y={r.y} w={460} p={pop(g, r.at)} tail={{at: 0.9, dir: 1}} size={r.t.length > 18 ? 38 : 46} rotate={i % 2 ? 1.5 : -1.5}>
              {r.t}
            </Bubble>
          ))}
          <Headline p={pop(g, A + 2)} size={68}>
            <RevealLines
              frame={g}
              lines={[
                {t: 'Le pides algo…', at: A + 2},
                {t: <>…te dice <span style={{color: C.red}}>«no»</span>…</>, at: NO},
                {t: '…y empiezas a explicar', at: EXPLAIN, color: C.red},
              ]}
            />
          </Headline>
        </>
      );
    }}
  </Stage>
);

const interpolate2 = (t: number, a: number, b: number) => a + (b - a) * Math.min(1, Math.max(0, t));
