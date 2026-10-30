import React from 'react';
import {interpolate} from 'remotion';
import {blink, lipSync, pop, ramp} from '../anim';
import {Plain} from '../backgrounds';
import {Kid} from '../characters/Kid';
import {Mom} from '../characters/Mom';
import {Bubble, CrossMark, FogCloud, Headline, Lightbulb, Sparkle} from '../props';
import {HEAD} from '../fonts';
import {Stage, Svg} from '../Stage';
import {C, STROKE} from '../theme';
import {SCENES, sec} from '../timing';

const [A, B] = SCENES.specific;

// 12.6–19.5 s · "En vez de usar una simple frase, tienes que decirle exactamente a tu hijo lo que sí quieres ver."
export const S3Specific: React.FC = () => (
  <Stage from={A} to={B} bg={<Plain color="#E6F6EA" dot="#D2EDD9" seed={3} floor="#D5EEDC" />}>
    {(g) => {
      const swap = sec(15.5);
      const vague = pop(g, A + 6);
      const cross = ramp(g, sec(14.6), sec(15.1));
      const vagueOut = ramp(g, swap - 4, swap + 6);
      const clear = pop(g, swap + 4);
      const idea = pop(g, sec(18.2));
      const glow = idea * (0.75 + 0.25 * Math.sin(g * 0.35));
      const headA = pop(g, A + 4);
      const headB = pop(g, swap);
      const point = ramp(g, swap - 6, swap + 6);
      return (
        <>
          <Svg>
            <Mom
              x={290}
              y={1330}
              scale={0.9}
              pose={{
                mouth: g > swap ? 'grin' : 'smile',
                brows: g > swap ? 'happy' : 'neutral',
                talk: lipSync(g, [[swap + 10, sec(19.2)]]) * 0.6,
                open: blink(g, 50),
                look: [0.7, 0],
                armR: [interpolate(point, [0, 1], [6, 70]), interpolate(point, [0, 1], [4, 40])],
              }}
            />
            <Kid
              x={800}
              y={1330}
              scale={0.95}
              pose={{
                mouth: g > sec(18.2) ? 'grin' : g > swap ? 'o' : 'flat',
                eyes: g > sec(18.2) ? 'happy' : 'normal',
                brows: g > sec(18.2) ? 'happy' : 'raised',
                look: [-0.7, -0.3],
                open: blink(g, 23),
                bob: g > sec(18.2) ? -Math.abs(Math.sin((g - sec(18.2)) * 0.25)) * 18 : 0,
                armL: g > sec(18.2) ? [150, 20] : [8, 6],
              }}
            />
            {/* frase vaga: nube gris que se tacha */}
            <g opacity={vague * (1 - vagueOut)} transform={`translate(620,640) scale(${vague * (1 - 0.3 * vagueOut)}) translate(-620,-640)`}>
              <FogCloud x={620} y={640} s={1.2} />
              <text
                x={620}
                y={652}
                textAnchor="middle"
                fontFamily={HEAD}
                fontWeight={800}
                fontSize={62}
                fill="#9A90A6"
                style={{filter: 'blur(2.5px)'}}
              >
                «Pórtate bien»
              </text>
              <CrossMark x={620} y={640} size={230} p={cross} />
            </g>
            <g opacity={idea}>
              <Lightbulb x={880} y={690 - 20 * idea} s={0.7 * idea} glow={glow} />
              <Sparkle x={990} y={600} s={0.8 * glow} color={C.yellow} />
              <Sparkle x={760} y={720} s={0.6 * glow} color="#fff" />
            </g>
          </Svg>
          <Bubble x={520} y={450} w={480} p={clear} tone="pos" tail={{at: 0.14, dir: -1}} size={56}>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 18}}>
              <svg width={130} height={86} viewBox="-100 -60 200 120">
                <path d="M -90 0 Q 0 -78 90 0 Q 0 78 -90 0 Z" fill="#fff" stroke={C.ink} strokeWidth={STROKE + 2} />
                <circle r={34} fill={C.blue} stroke={C.ink} strokeWidth={STROKE} />
                <circle r={16} fill={C.ink} />
                <circle cx={-10} cy={-12} r={7} fill="#fff" />
              </svg>
              <span>
                Lo que <span style={{textDecoration: 'underline', textDecorationThickness: 8}}>SÍ</span>
                <br />
                quiero ver
              </span>
            </div>
          </Bubble>
          <Headline p={headA} out={headB}>
            Una frase vaga
            <br />
            <span style={{color: C.red}}>no le dice qué hacer</span>
          </Headline>
          <Headline p={headB} size={80}>
            Dile <span style={{color: C.green}}>EXACTAMENTE</span>
            <br />
            lo que <span style={{color: C.green}}>SÍ</span> quieres ver
          </Headline>
        </>
      );
    }}
  </Stage>
);
