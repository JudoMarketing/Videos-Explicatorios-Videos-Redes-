import React from 'react';
import {interpolate} from 'remotion';
import {blink, lipSync, pop, ramp, voice} from '../anim';
import {LivingRoom} from '../backgrounds';
import {Kid} from '../characters/Kid';
import {Mom} from '../characters/Mom';
import {Bubble, CheckBadge, Headline, SoundWaves, XBadge} from '../props';
import {HEAD} from '../fonts';
import {Stage, Svg} from '../Stage';
import {C} from '../theme';
import {SCENES, sec} from '../timing';

const [A, B] = SCENES.shout;
const CALM = sec(31.3);

// 27.6–32.9 s · "En vez de decirle al niño «no grites», mejor dile «usa tu voz bajita»."
export const S5Shout: React.FC = () => (
  <Stage from={A} to={B} bg={null}>
    {(g) => {
      const yelling = g < CALM;
      const shake = yelling ? Math.sin(g * 1.7) * 7 : 0;
      const calmT = ramp(g, CALM - 4, CALM + 8);
      const noBubble = pop(g, sec(29.6));
      const noOut = ramp(g, CALM - 10, CALM - 2);
      const yesBubble = pop(g, CALM);
      const aaa = yelling ? 1 + 0.15 * Math.sin(g * 0.9) : 0;
      return (
        <>
          <div style={{position: 'absolute', inset: 0, transform: `translate(${shake * 0.6}px, ${-Math.abs(shake) * 0.4}px)`}}>
            <LivingRoom shake={yelling ? g : 0} />
          </div>
          <Svg>
            <Mom
              x={860}
              y={1330}
              scale={0.86}
              pose={{
                talk: lipSync(g, [[sec(29.6), sec(30.45)], [sec(31.3), sec(32.75)]]),
                mouth: yelling ? 'frown' : 'grin',
                eyes: yelling ? 'squint' : 'happy',
                brows: yelling ? 'worried' : 'happy',
                open: blink(g, 3),
                armL: yelling ? [150, 118] : [interpolate(calmT, [0, 1], [150, 10]), interpolate(calmT, [0, 1], [118, 6])],
                armR: yelling ? [150, 118] : [interpolate(calmT, [0, 1], [150, 10]), interpolate(calmT, [0, 1], [118, 6])],
                tilt: yelling ? Math.sin(g * 0.5) * 3 : 0,
              }}
            />
            <Kid
              x={380 + shake * 0.5}
              y={1330}
              scale={1.0}
              pose={{
                mouth: yelling ? 'yell' : 'whisper',
                talk: yelling ? Math.sin(g * 0.8) * 0.5 + 0.5 : 0,
                eyes: yelling ? 'closed' : 'normal',
                brows: yelling ? 'angry' : 'raised',
                look: [0.5, 0],
                open: blink(g, 19),
                armL: yelling ? [70, 50] : [interpolate(calmT, [0, 1], [70, 26]), interpolate(calmT, [0, 1], [50, 150])],
                armR: yelling ? [70, 50] : [10, 6],
                bob: yelling ? -Math.abs(Math.sin(g * 0.8)) * 10 : 0,
                tilt: yelling ? -6 : 4,
                blush: yelling ? 0.9 : 0.55,
              }}
            />
            {yelling ? (
              <g>
                <SoundWaves x={500} y={980} dir={1} amp={aaa} n={3} phase={(g * 0.12) % 3} />
                <SoundWaves x={260} y={980} dir={-1} amp={aaa} n={3} phase={(g * 0.12) % 3} />
                <text
                  opacity={1 - noBubble}
                  x={380}
                  y={600}
                  textAnchor="middle"
                  fontFamily={HEAD}
                  fontWeight={800}
                  fontSize={150 * aaa}
                  fill={C.red}
                  stroke={C.ink}
                  strokeWidth={10}
                  paintOrder="stroke"
                  transform={`rotate(${-6 + Math.sin(g * 1.3) * 3},380,600)`}
                >
                  ¡AAAH!
                </text>
              </g>
            ) : (
              <g opacity={calmT}>
                <SoundWaves x={420} y={966} dir={1} amp={0.45 + 0.08 * voice(g)} n={2} color={C.green} phase={(g * 0.05) % 2} />
              </g>
            )}
          </Svg>
          <Bubble x={560} y={540} w={480} p={noBubble * (1 - noOut)} tone="neg" tail={{at: 0.86, dir: 1}} size={72}>
            ¡No grites!
          </Bubble>
          <Bubble x={530} y={560} w={600} p={yesBubble} tone="pos" tail={{at: 0.86, dir: 1}} size={66}>
            Usa tu voz bajita
          </Bubble>
          <Headline p={pop(g, A + 4)} out={ramp(g, CALM - 8, CALM)}>
            <span style={{display: 'inline-flex', alignItems: 'center', gap: 20}}>
              <svg width={86} height={86} viewBox="-50 -50 100 100">
                <XBadge x={0} y={0} r={40} p={1} />
              </svg>
              <span style={{color: C.red}}>«No grites»</span>
            </span>
          </Headline>
          <Headline p={pop(g, CALM)} rotate={2} size={78}>
            <span style={{display: 'inline-flex', alignItems: 'center', gap: 20}}>
              <svg width={86} height={86} viewBox="-50 -50 100 100">
                <CheckBadge x={0} y={0} r={40} p={1} />
              </svg>
              <span style={{color: C.green}}>«Usa tu voz bajita»</span>
            </span>
          </Headline>
        </>
      );
    }}
  </Stage>
);
