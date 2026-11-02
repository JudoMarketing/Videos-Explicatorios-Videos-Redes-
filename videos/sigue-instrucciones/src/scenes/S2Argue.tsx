import React from 'react';
import {interpolate} from 'remotion';
import {blink, pop} from '../anim';
import {Kitchen} from '../backgrounds';
import {Kid} from '../characters/Kid';
import {Mom} from '../characters/Mom';
import {Bubble, GlossRow, Headline, Toy} from '../props';
import {Stage, Svg} from '../Stage';
import {C} from '../theme';
import {SCENES, sec} from '../timing';

const [A, B] = SCENES.argue;
const GLOSS_1 = sec(10.6);
const GLOSS_2 = sec(12.75);

// Globos que van y vienen entre la mamá (m) y el niño (k): el "back and forth".
const PING = ['¡Hazlo ya!', '¡No quiero!', '¡Que sí!', '¡Que no!', '¡Es que…!', '¡Pero…!', '¡Porque sí!', '¡Nooo!'];
const STEP = 18;
const START = sec(8.2);

// 7.9–14.0 s · "Los padres se acostumbran a entrar en un argument con sus hijos, o sea, en un back and forth."
export const S2Argue: React.FC = () => (
  <Stage from={A} to={B} bg={<Kitchen />}>
    {(g) => {
      const idx = Math.floor((g - START) / STEP);
      const active = g >= START && idx < PING.length ? idx : -1;
      const momTalks = active >= 0 && active % 2 === 0;
      const kidTalks = active >= 0 && active % 2 === 1;
      const local = (g - START) % STEP;
      const talk = Math.abs(Math.sin(local * 0.5));
      // pelota de ping-pong entre las dos cabezas
      const t = ((g - START) % (STEP * 2)) / (STEP * 2);
      const side = t < 0.5 ? t * 2 : 2 - t * 2;
      const bx = interpolate(side, [0, 1], [360, 730]);
      const by = 880 - Math.sin(side * Math.PI) * 170;
      const glossOn = g >= GLOSS_1;
      return (
        <>
          <Svg>
            <Mom
              x={280}
              y={1330}
              scale={0.9}
              pose={{
                mouth: momTalks ? 'smile' : 'frown',
                talk: momTalks ? talk : 0,
                brows: 'angry',
                look: [0.8, 0.2],
                open: blink(g, 15),
                armR: momTalks ? [60, 70] : [34, -110],
                armL: [34, -110],
              }}
            />
            <Kid
              x={800}
              y={1330}
              scale={0.95}
              pose={{
                mouth: kidTalks ? 'smile' : 'frown',
                talk: kidTalks ? talk : 0,
                brows: 'angry',
                look: [-0.8, -0.3],
                open: blink(g, 4),
                crossed: !kidTalks,
                armL: [70, 60],
              }}
            />
            {g >= START ? (
              <g>
                <path d="M 360 980 Q 545 820 730 980" fill="none" stroke={C.inkSoft} strokeWidth={6} strokeDasharray="16 14" strokeDashoffset={-g * 2} opacity={0.6} />
                <Toy x={bx} y={by} kind="ball" color="#fff" s={0.6} />
              </g>
            ) : null}
          </Svg>
          {PING.map((txt, i) => {
            const at = START + i * STEP;
            const p = pop(g, at, 13) * (g < at + STEP + 4 ? 1 : Math.max(0, 1 - (g - at - STEP - 4) / 5));
            if (p <= 0 || glossOn) return null;
            const mom = i % 2 === 0;
            return (
              <Bubble
                key={i}
                x={mom ? 360 : 730}
                y={mom ? 520 : 600}
                w={340}
                p={p}
                tone={mom ? 'neg' : 'plain'}
                tail={mom ? {at: 0.3, dir: -1} : {at: 0.7, dir: 1}}
                size={52}
              >
                {txt}
              </Bubble>
            );
          })}
          <Headline p={pop(g, A + 4)} out={glossOn ? 1 : 0} size={72}>
            Los padres se acostumbran
            <br />a <span style={{color: C.red}}>discutir</span> con sus hijos
          </Headline>
          <Headline p={pop(g, GLOSS_1)} size={68} top={176}>
            <span style={{display: 'flex', flexDirection: 'column', gap: 14}}>
              <GlossRow en="argument" es="discusión" p={pop(g, GLOSS_1)} />
              {g >= GLOSS_2 ? <GlossRow en="back and forth" es="un ir y venir" p={pop(g, GLOSS_2)} /> : null}
            </span>
          </Headline>
          {glossOn ? (
            <Bubble x={545} y={640} w={520} p={pop(g, GLOSS_1 + 4)} tone="neg" tail={{at: 0.5, dir: 1}} size={50}>
              ¡Que sí! · ¡Que no!
            </Bubble>
          ) : null}
        </>
      );
    }}
  </Stage>
);
