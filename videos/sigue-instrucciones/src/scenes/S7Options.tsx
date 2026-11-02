import React from 'react';
import {Easing} from 'remotion';
import {blink, pop, ramp, wobble} from '../anim';
import {Garden} from '../backgrounds';
import {Kid} from '../characters/Kid';
import {CalendarIcon, Headline, IceCreamIcon, IconCard, RevealLines, TabletIcon, TreeIcon} from '../props';
import {Stage, Svg} from '../Stage';
import {C} from '../theme';
import {SCENES, sec} from '../timing';

const [A, B] = SCENES.options;
const OR_NOT = sec(53.7);
const TABLET = sec(54.6);
const NO_HAVE = sec(55.8);
const TAKE = sec(57.15);

// 48.75–61.55 s · "Más tarde vamos a salir, o el fin de semana, o vamos a hacer tal cosa. O si no haces tal cosa, entonces no tendrás… y quitar algo de preferencia que le guste a ese niño."
export const S7Options: React.FC = () => (
  <Stage from={A} to={B} bg={<Garden />}>
    {(g) => {
      const crossed = ramp(g, NO_HAVE, NO_HAVE + 14);
      const taken = ramp(g, TAKE, TAKE + 22, Easing.in(Easing.cubic));
      const sad = g >= NO_HAVE && g < TAKE + 40;
      const lookRight = g >= TABLET;
      return (
        <>
          <Svg>
            <IconCard x={210} y={600} p={pop(g, sec(49.05))} label="Salir">
              <TreeIcon />
            </IconCard>
            <IconCard x={210} y={870} p={pop(g, sec(50.85))} label="Fin de semana">
              <g transform="scale(0.95)">
                <CalendarIcon />
              </g>
            </IconCard>
            <IconCard x={210} y={1140} p={pop(g, sec(52.25))} label="Algo especial">
              <g transform="scale(0.85)">
                <IceCreamIcon />
              </g>
            </IconCard>
            <g transform={`translate(${taken * 420},${-taken * 260}) rotate(${taken * 30},870,760)`} opacity={1 - taken}>
              <IconCard x={870} y={760} p={pop(g, TABLET)} label="Su tablet" tone="neg" crossed={crossed}>
                <TabletIcon />
              </IconCard>
            </g>
            <Kid
              x={560}
              y={1380}
              scale={0.88}
              pose={{
                mouth: sad ? 'frown' : 'grin',
                eyes: sad ? 'normal' : g > sec(49.2) ? 'happy' : 'normal',
                brows: sad ? 'worried' : 'happy',
                look: lookRight ? [0.9, -0.5] : [-0.9, -0.5],
                open: blink(g, 17),
                armL: sad ? [8, 6] : [40 + wobble(g, 0.3, 10), 60],
                armR: sad ? [8, 6] : [20, 30],
                tilt: sad ? 6 : wobble(g, 0.15, 3),
              }}
            />
          </Svg>
          <Headline p={pop(g, A + 4)} size={66}>
            <RevealLines
              frame={g}
              lines={[
                {t: <>Ofrece un <span style={{color: C.green}}>premio</span>…</>, at: A + 4},
                {t: <>…o quita algo <span style={{color: C.red}}>que le guste</span></>, at: OR_NOT},
              ]}
            />
          </Headline>
        </>
      );
    }}
  </Stage>
);
