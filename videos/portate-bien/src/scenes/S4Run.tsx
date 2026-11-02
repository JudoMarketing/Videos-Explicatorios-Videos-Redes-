import React from 'react';
import {Easing, interpolate} from 'remotion';
import {blink, lipSync, pop, ramp} from '../anim';
import {LivingRoom} from '../backgrounds';
import {Kid} from '../characters/Kid';
import {Mom} from '../characters/Mom';
import {Bubble, CheckBadge, Headline, XBadge} from '../props';
import {Stage, Svg} from '../Stage';
import {C} from '../theme';
import {SCENES, sec} from '../timing';

const [A, B] = SCENES.run;
const STOP_RUN = sec(25.9);
const CALM = sec(26.05);

const runX = (g: number) => 360 + 210 * Math.sin(((g - A) / 70) * Math.PI * 2);
const runV = (g: number) => Math.cos(((g - A) / 70) * Math.PI * 2);

// 19.5–27.6 s · "En vez de decirle «Fulanito, no corras», mejor sustituye el no y esa frase y dile «camina despacio»."
export const S4Run: React.FC = () => (
  <Stage from={A} to={B} bg={<LivingRoom />}>
    {(g) => {
      const running = g < STOP_RUN;
      const xStop = runX(STOP_RUN);
      const walkT = ramp(g, CALM, B - 6, Easing.inOut(Easing.quad));
      const x = running ? runX(g) : interpolate(walkT, [0, 1], [xStop, 470]);
      const v = running ? runV(g) : Math.sign(470 - xStop) || 1;
      const flip = v < 0;
      const step = running ? (g - A) * 0.55 : (g - CALM) * 0.22;
      const walking = !running && walkT < 0.98;
      const lift = running ? 46 : walking ? 14 : 0;
      const rot = running ? 18 : walking ? 6 : 0;
      const legA = Math.max(0, Math.sin(step));
      const legB = Math.max(0, -Math.sin(step));
      const swing = running ? 55 : walking ? 18 : 6;
      const bob = running ? -Math.abs(Math.sin(step)) * 22 : walking ? -Math.abs(Math.sin(step)) * 6 : 0;

      const noBubble = pop(g, sec(20.45));
      const strikeNo = ramp(g, sec(23.65), sec(24.0));
      const noOut = ramp(g, sec(24.6), sec(25.1));
      const yesBubble = pop(g, sec(25.95));

      return (
        <>
          <Svg>
            {/* líneas de velocidad */}
            {running
              ? [0, 1, 2].map((i) => (
                  <line
                    key={i}
                    x1={x - v * (110 + i * 10)}
                    x2={x - v * (210 + i * 30)}
                    y1={1080 + i * 60}
                    y2={1080 + i * 60}
                    stroke={C.ink}
                    strokeWidth={8}
                    strokeLinecap="round"
                    opacity={0.35}
                  />
                ))
              : null}
            <Mom
              x={870}
              y={1330}
              scale={0.86}
              pose={{
                talk: lipSync(g, [[sec(20.5), sec(22.1)], [sec(25.95), sec(27.35)]]),
                mouth: g > CALM ? 'grin' : 'flat',
                brows: g > CALM ? 'happy' : 'worried',
                eyes: g > CALM ? 'happy' : 'normal',
                look: [-0.7 + 0.3 * Math.sin(g * 0.09), 0.2],
                open: blink(g, 61),
                armL: g > CALM ? [30, 60] : [interpolate(noBubble, [0, 1], [6, 70]), interpolate(noBubble, [0, 1], [4, 60])],
                armR: g > CALM ? [10, 6] : [20, 150],
              }}
            />
            <Kid
              x={x}
              y={1330}
              scale={0.95}
              flip={flip}
              pose={{
                legL: [lift * legA, rot * legA],
                legR: [lift * legB, rot * legB],
                armL: [10 + swing * legB, 30 + swing * 0.6 * legB],
                armR: [10 + swing * legA, 30 + swing * 0.6 * legA],
                bob,
                lean: running ? 8 : 0,
                mouth: running ? 'grin' : 'smile',
                eyes: running ? 'happy' : 'normal',
                brows: 'happy',
                look: [0.6, 0],
                open: blink(g, 13),
              }}
            />
          </Svg>
          <Bubble x={500} y={540} w={640} p={noBubble * (1 - noOut)} tone="neg" tail={{at: 0.88, dir: 1}} size={64}>
            ¡Fulanito,{' '}
            <span style={{position: 'relative', display: 'inline-block'}}>
              NO
              <span
                style={{
                  position: 'absolute',
                  left: -8,
                  top: '42%',
                  height: 14,
                  width: `calc(${strikeNo} * (100% + 16px))`,
                  opacity: strikeNo > 0 ? 1 : 0,
                  background: C.ink,
                  borderRadius: 7,
                  transform: 'rotate(-8deg)',
                }}
              />
            </span>{' '}
            corras!
          </Bubble>
          <Bubble x={520} y={560} w={560} p={yesBubble} tone="pos" tail={{at: 0.86, dir: 1}} size={72}>
            ¡Camina despacio!
          </Bubble>
          <Headline p={pop(g, A + 4)} out={ramp(g, CALM - 8, CALM)}>
            <span style={{display: 'inline-flex', alignItems: 'center', gap: 20}}>
              <svg width={86} height={86} viewBox="-50 -50 100 100">
                <XBadge x={0} y={0} r={40} p={1} />
              </svg>
              <span style={{color: C.red}}>«No corras»</span>
            </span>
          </Headline>
          <Headline p={pop(g, CALM)} rotate={2}>
            <span style={{display: 'inline-flex', alignItems: 'center', gap: 20}}>
              <svg width={86} height={86} viewBox="-50 -50 100 100">
                <CheckBadge x={0} y={0} r={40} p={1} />
              </svg>
              <span style={{color: C.green}}>«Camina despacio»</span>
            </span>
          </Headline>
        </>
      );
    }}
  </Stage>
);
