import React from 'react';
import {interpolate} from 'remotion';
import {blink, lipSync, pop, ramp, wobble} from '../anim';
import {Kitchen} from '../backgrounds';
import {Kid} from '../characters/Kid';
import {Mom} from '../characters/Mom';
import {Bubble, Headline, QuestionMark} from '../props';
import {Stage, Svg} from '../Stage';
import {C} from '../theme';
import {SCENES, sec} from '../timing';

const [A, B] = SCENES.hook;

// 0.0–5.6 s · "Deja de decirle a tu hijo «pórtate bien» y te explico por qué."
export const S1Hook: React.FC = () => (
  <Stage from={A} to={B} bg={<Kitchen cookieGlow={0.6} />}>
    {(g) => {
      const say = sec(2.5);
      const talk = lipSync(g, [[sec(2.45), sec(3.75)]]);
      const confused = g > sec(3.2);
      const strike = ramp(g, sec(3.5), sec(4.1));
      const qm = pop(g, sec(3.3));
      const scratch = ramp(g, sec(3.6), sec(4.1));
      return (
        <>
          <Svg>
            <Mom
              x={800}
              y={1330}
              scale={0.92}
              pose={{
                talk,
                mouth: g < say ? 'smile' : 'flat',
                brows: g >= say && g < sec(4) ? 'raised' : 'neutral',
                armL: [interpolate(ramp(g, sec(2.3), sec(2.7)), [0, 1], [6, 62]), interpolate(ramp(g, sec(2.3), sec(2.7)), [0, 1], [4, 50])],
                armR: [6, 4],
                open: blink(g, 30),
                look: [-0.7, 0.4],
                tilt: g >= say ? -4 : 0,
              }}
            />
            <Kid
              x={280}
              y={1330}
              scale={0.95}
              pose={{
                mouth: confused ? 'wavy' : 'smile',
                brows: confused ? 'worried' : 'neutral',
                look: confused ? [0, -0.2] : [0.8, -0.6],
                open: blink(g, 11),
                tilt: confused ? interpolate(scratch, [0, 1], [0, 8]) : wobble(g, 0.15, 2),
                armR: [interpolate(scratch, [0, 1], [8, 150]), interpolate(scratch, [0, 1], [6, 62])],
                bob: wobble(g, 0.3, 3),
              }}
            />
            <g opacity={qm}>
              <QuestionMark x={190} y={700 - 20 * qm} s={0.9 * qm} rot={-14 + wobble(g, 0.2, 6)} />
              <QuestionMark x={330} y={660 - 30 * qm} s={1.15 * qm} rot={10 + wobble(g + 9, 0.2, 6)} color={C.yellow} />
            </g>
          </Svg>
          <Bubble x={500} y={560} w={470} p={pop(g, say)} tail={{at: 0.82, dir: 1}} size={70}>
            ¡Pórtate bien!
          </Bubble>
          <Headline p={pop(g, A + 4)}>
            Deja de decirle
            <br />
            <span style={{color: C.red, position: 'relative', display: 'inline-block'}}>
              «Pórtate bien»
              <span
                style={{
                  position: 'absolute',
                  left: -10,
                  top: '46%',
                  height: 16,
                  width: `calc(${strike} * (100% + 20px))`,
                  opacity: strike > 0 ? 1 : 0,
                  background: C.ink,
                  borderRadius: 8,
                  transform: 'rotate(-4deg)',
                }}
              />
            </span>
          </Headline>
        </>
      );
    }}
  </Stage>
);
