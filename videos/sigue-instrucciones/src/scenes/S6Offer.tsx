import React from 'react';
import {blink, lipSync, pop, ramp, wobble} from '../anim';
import {Bedroom} from '../backgrounds';
import {Kid} from '../characters/Kid';
import {Mom} from '../characters/Mom';
import {Bubble, GiftBox, Headline, RevealLines, Sparkle, Toy, TreeIcon} from '../props';
import {Stage, Svg} from '../Stage';
import {C} from '../theme';
import {SCENES, sec} from '../timing';

const [A, B] = SCENES.offer;
const SAY = sec(38.4);
const OFFER = sec(41.05);
const IF = sec(42.7);
const DEFINE = sec(46.5);

// 37.75–48.75 s · "Diga lo que usted quiere que su hijo haga y ofrezca algo. Si haces esto, más tarde iremos a tal lado. ¿Qué reforzador se va a ofrecer?"
export const S6Offer: React.FC = () => (
  <Stage from={A} to={B} bg={<Bedroom />}>
    {(g) => {
      const gift = pop(g, OFFER + 4);
      const opened = ramp(g, IF + 20, IF + 34);
      const tree = pop(g, IF + 28);
      const interested = g >= IF + 10;
      const glow = 0.75 + 0.25 * Math.sin(g * 0.3);
      return (
        <>
          <Svg>
            <Toy x={640} y={1430} kind="block" color={C.blue} rot={-12} />
            <Toy x={980} y={1420} kind="car" color={C.red} />
            <Toy x={720} y={1490} kind="ball" color="#7CC27A" />
            <Mom
              x={280}
              y={1330}
              scale={0.88}
              pose={{
                talk: lipSync(g, [[IF, sec(45.05)]]),
                mouth: 'smile',
                brows: 'neutral',
                look: [0.8, 0.3],
                open: blink(g, 26),
                armL: [34, -110],
                armR: g >= SAY ? [64, 40] : [6, 4],
              }}
            />
            <Kid
              x={820}
              y={1330}
              scale={0.95}
              pose={{
                crossed: !interested,
                mouth: interested ? 'grin' : 'flat',
                eyes: interested ? 'wide' : 'normal',
                brows: interested ? 'raised' : 'neutral',
                look: interested ? [0, -0.9] : [-0.8, 0],
                open: blink(g, 44),
                bob: g >= IF + 40 ? -Math.abs(Math.sin((g - IF - 40) * 0.25)) * 14 : 0,
                armL: [20, 30],
                armR: g >= IF + 40 ? [150, 10] : [20, 30],
              }}
            />
            <g opacity={gift}>
              <circle cx={860} cy={660} r={120 * glow} fill="#FFE7A0" opacity={0.45 * gift} />
              <GiftBox x={860} y={680 + wobble(g, 0.15, 4)} s={0.85 * gift} open={opened} />
              <g opacity={tree} transform={`translate(860,${620 - 70 * tree}) scale(${0.85 * tree})`}>
                <TreeIcon />
              </g>
              <Sparkle x={740} y={700} s={0.7 * gift * glow} color={C.yellow} />
              <Sparkle x={990} y={640} s={0.6 * gift * glow} color="#fff" />
            </g>
          </Svg>
          <Bubble x={540} y={420} w={480} p={pop(g, SAY + 4) * (1 - ramp(g, IF - 8, IF))} tone="pos" tail={{at: 0.08, dir: -1}} size={56}>
            Recoge tus juguetes, por favor.
          </Bubble>
          <Bubble x={540} y={420} w={480} p={pop(g, IF) * (1 - ramp(g, DEFINE - 6, DEFINE))} tone="pos" tail={{at: 0.08, dir: -1}} size={52}>
            Si los recoges, más tarde vamos al parque.
          </Bubble>
          <Headline p={pop(g, A + 4)} out={ramp(g, DEFINE - 6, DEFINE)} size={56}>
            <RevealLines
              frame={g}
              lines={[
                {t: <><span style={{color: C.green}}>1.</span> Di lo que quieres que haga</>, at: A + 4},
                {t: <><span style={{color: C.green}}>2.</span> Ofrece algo a cambio</>, at: OFFER},
              ]}
            />
          </Headline>
          <Headline p={pop(g, DEFINE)} size={66} rotate={2}>
            <span style={{color: C.blue}}>Reforzador:</span>
            <br />
            algo que le gusta
            <br />y lo motiva
          </Headline>
        </>
      );
    }}
  </Stage>
);
