import React from 'react';
import {blink, pop, ramp, wobble} from '../anim';
import {LivingRoom} from '../backgrounds';
import {Dad} from '../characters/Dad';
import {Kid} from '../characters/Kid';
import {Mom} from '../characters/Mom';
import {Bubble, Headline, QuestionMark, Toy} from '../props';
import {Stage, Svg} from '../Stage';
import {C} from '../theme';
import {SCENES, sec} from '../timing';

const [A, B] = SCENES.ask;

// 0.0–7.9 s · "Muchos de los padres con los que trabajo me preguntan qué deben hacer para que sus hijos sigan instrucciones."
export const S1Ask: React.FC = () => (
  <Stage from={A} to={B} bg={<LivingRoom />}>
    {(g) => {
      const momQ = pop(g, sec(1.85));
      const momOut = ramp(g, sec(4.3), sec(4.6));
      const dadQ = pop(g, sec(4.6));
      const qm = pop(g, sec(6.3));
      const bounce = Math.abs(Math.sin(g * 0.16));
      const ballY = 1445 - bounce * 150;
      const ballX = 655;
      return (
        <>
          <Svg>
            <Mom
              x={290}
              y={1330}
              scale={0.88}
              pose={{
                mouth: 'flat',
                brows: 'worried',
                look: [0.5, 0.7],
                open: blink(g, 20),
                armL: [34, -110],
                armR: [interpolate2(momQ, 6, 60), interpolate2(momQ, 4, 140)],
                tilt: 4,
              }}
            />
            <Dad
              x={800}
              y={1330}
              scale={0.86}
              pose={{
                mouth: 'flat',
                brows: 'worried',
                look: [-0.5, 0.7],
                open: blink(g, 61),
                armL: [interpolate2(dadQ, 6, 70), interpolate2(dadQ, 4, 150)],
                armR: [34, -110],
                tilt: -4,
              }}
            />
            <Kid
              x={540}
              y={1470}
              scale={0.72}
              pose={{
                mouth: 'grin',
                eyes: 'happy',
                brows: 'happy',
                armR: [40 + bounce * 40, 30 + bounce * 30],
                bob: -bounce * 6,
                look: [0.8, 0],
                open: blink(g, 9),
              }}
            />
            <Toy x={ballX} y={ballY} kind="ball" color={C.red} />
            <ellipse cx={ballX} cy={1480} rx={30 - bounce * 12} ry={7} fill={C.ink} opacity={0.15} />
            <g opacity={qm}>
              <QuestionMark x={220} y={560 - 16 * qm} s={0.8 * qm} rot={-12 + wobble(g, 0.2, 6)} />
              <QuestionMark x={880} y={560 - 16 * qm} s={0.8 * qm} rot={12 + wobble(g + 7, 0.2, 6)} color={C.yellow} />
            </g>
          </Svg>
          <Bubble x={430} y={470} w={540} p={momQ * (1 - momOut)} tail={{at: 0.18, dir: -1}} size={60}>
            ¿Por qué no me hace caso?
          </Bubble>
          <Bubble x={640} y={470} w={480} p={dadQ} tail={{at: 0.86, dir: 1}} size={60}>
            ¿Qué debemos hacer?
          </Bubble>
          <Headline p={pop(g, A + 4)} size={74}>
            ¿Cómo lograr que tu hijo
            <br />
            <span style={{color: C.green}}>siga instrucciones</span>?
          </Headline>
        </>
      );
    }}
  </Stage>
);

const interpolate2 = (t: number, a: number, b: number) => a + (b - a) * Math.min(1, Math.max(0, t));
