import React from 'react';
import {Easing, interpolate} from 'remotion';
import {blink, pop, ramp, wobble} from '../anim';
import {LivingRoom} from '../backgrounds';
import {Dad} from '../characters/Dad';
import {Mom} from '../characters/Mom';
import {Bubble, Headline, RevealLines, Sparkle, Star, StopSign} from '../props';
import {Stage, Svg} from '../Stage';
import {C} from '../theme';
import {SCENES, sec} from '../timing';

const [A, B] = SCENES.stop;
const SLAM = sec(34.7);
const ADULT = sec(35.65);

// 32.35–37.75 s · "¿Qué recomiendo yo? Que el argument se pare. O sea, el adulto es usted, papá o mamá."
export const S5Stop: React.FC = () => (
  <Stage from={A} to={B} bg={<LivingRoom />}>
    {(g) => {
      const sign = pop(g, SLAM, 9);
      const shake = g >= SLAM && g < SLAM + 10 ? Math.sin((g - SLAM) * 2.5) * (10 - (g - SLAM)) : 0;
      const enter = ramp(g, ADULT - 6, ADULT + 10, Easing.out(Easing.cubic));
      const proud = g >= ADULT;
      const flip = Math.floor((g - A) / 12) % 2 === 0;
      return (
        <>
          <Svg>
            <g transform={`translate(${shake},0)`}>
              <StopSign x={540} y={790} s={0.95 * sign} rot={-6 * (1 - sign)} />
            </g>
            <Mom
              x={interpolate(enter, [0, 1], [-200, 250])}
              y={1340}
              scale={0.84}
              pose={{
                mouth: 'grin',
                eyes: proud ? 'normal' : 'normal',
                brows: 'happy',
                armL: [34, -110],
                armR: [34, -110],
                look: [0.4, 0],
                open: blink(g, 8),
              }}
            />
            <Dad
              x={interpolate(enter, [0, 1], [1280, 830])}
              y={1340}
              scale={0.82}
              pose={{
                mouth: 'grin',
                brows: 'happy',
                armL: [34, -110],
                armR: [34, -110],
                look: [-0.4, 0],
                open: blink(g, 37),
              }}
            />
            <g opacity={enter}>
              <Star x={250} y={560 - 10 * wobble(g, 0.2)} s={0.9} rot={g * 2} />
              <Star x={830} y={560 - 10 * wobble(g + 5, 0.2)} s={0.9} rot={-g * 2} color={C.orange} />
              <Sparkle x={130} y={760} s={0.9} color={C.yellow} />
              <Sparkle x={960} y={760} s={0.9} color="#fff" />
            </g>
          </Svg>
          {g < SLAM + 2 ? (
            <Bubble x={540} y={640} w={400} p={pop(g, A + 2) * (1 - ramp(g, SLAM - 4, SLAM))} tone="neg" tail={{at: flip ? 0.2 : 0.8, dir: flip ? -1 : 1}} size={56}>
              {flip ? '¡Que sí!' : '¡Que no!'}
            </Bubble>
          ) : null}
          <Headline p={pop(g, A + 2)} out={ramp(g, SLAM - 6, SLAM)} size={76}>
            ¿Qué te recomiendo?
          </Headline>
          <Headline p={pop(g, SLAM)} size={72} top={170}>
            <RevealLines
              frame={g}
              lines={[
                {t: <>¡<span style={{color: C.red}}>Para</span> la discusión!</>, at: SLAM},
                {
                  t: (
                    <span style={{fontSize: 34, color: C.inkSoft}}>
                      <span style={{fontStyle: 'italic', color: C.blue}}>«argument»</span> significa discusión
                    </span>
                  ),
                  at: SLAM + 4,
                },
                {t: <>El adulto eres <span style={{color: C.green}}>tú</span></>, at: ADULT},
              ]}
            />
          </Headline>
        </>
      );
    }}
  </Stage>
);
