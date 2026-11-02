import React from 'react';
import {Easing, interpolate} from 'remotion';
import {blink, pop, ramp} from '../anim';
import {Bedroom} from '../backgrounds';
import {Kid} from '../characters/Kid';
import {Mom} from '../characters/Mom';
import {Bubble, Headline, Heart, RevealLines, Sparkle, Star, Stopwatch, Toy, ToyBox} from '../props';
import {Stage, Svg} from '../Stage';
import {C} from '../theme';
import {SCENES, sec} from '../timing';

const [A, B] = SCENES.result;
const ASK = sec(66.3);
const GO = sec(67.6);
const RECAP = sec(72.2);
const BOX: [number, number] = [880, 1250];

const TOYS: {kind: 'block' | 'ball' | 'bear' | 'car'; color: string; x: number; y: number; rot: number}[] = [
  {kind: 'block', color: C.blue, x: 420, y: 1440, rot: -12},
  {kind: 'car', color: C.red, x: 600, y: 1490, rot: 4},
  {kind: 'ball', color: '#7CC27A', x: 330, y: 1500, rot: 0},
  {kind: 'bear', color: '', x: 700, y: 1420, rot: -6},
  {kind: 'block', color: C.yellow, x: 520, y: 1530, rot: 14},
];

// 61.55–74.3 s · "De esa manera vamos a fomentar que el niño, cuando se le diga que haga algo, tenga más participación y más rápida acción. Esa es mi recomendación."
export const S8Result: React.FC = () => (
  <Stage from={A} to={B} bg={<Bedroom />}>
    {(g) => {
      const done = g >= GO + TOYS.length * 12 + 14;
      const party = pop(g, GO + TOYS.length * 12 + 14);
      const kidX = interpolate(ramp(g, GO - 6, GO + 10), [0, 1], [560, 680]);
      const hop = g >= GO && !done ? -Math.abs(Math.sin((g - GO) * 0.5)) * 18 : 0;
      const watch = ramp(g, GO, GO + TOYS.length * 12 + 10, Easing.linear);
      return (
        <>
          <Svg>
            <ToyBox x={BOX[0]} y={BOX[1]} s={0.95} />
            {TOYS.map((t, i) => {
              const k = ramp(g, GO + i * 12, GO + i * 12 + 16, Easing.inOut(Easing.quad));
              if (k >= 1) return null;
              const x = interpolate(k, [0, 1], [t.x, BOX[0] + (i - 2) * 26]);
              const y = interpolate(k, [0, 1], [t.y, BOX[1] - 30]) - Math.sin(k * Math.PI) * 260;
              return <Toy key={i} x={x} y={y} kind={t.kind} color={t.color} rot={t.rot + k * 360} s={1 - k * 0.3} />;
            })}
            <Mom
              x={250}
              y={1330}
              scale={0.86}
              pose={{
                mouth: done ? 'grin' : 'smile',
                eyes: done ? 'happy' : 'normal',
                brows: 'happy',
                look: [0.8, 0.4],
                open: blink(g, 22),
                armL: [34, -110],
                armR: done ? [150, 10] : g >= ASK ? [64, 40] : [6, 4],
              }}
            />
            <Kid
              x={kidX}
              y={1330 + hop}
              scale={0.9}
              pose={{
                mouth: 'grin',
                eyes: done ? 'happy' : 'normal',
                brows: 'happy',
                look: g >= GO ? [0.9, 0.3] : [-0.8, -0.4],
                open: blink(g, 5),
                armL: g >= GO && !done ? [70, 40] : done ? [150, 10] : [8, 6],
                armR: g >= GO && !done ? [70, 40] : done ? [150, 10] : [8, 6],
              }}
            />
            {g >= GO - 4 ? (
              <g opacity={pop(g, GO - 4)}>
                <Stopwatch x={930} y={760} s={0.8} t={watch * 0.25} />
              </g>
            ) : null}
            <g opacity={party}>
              <Heart x={520} y={760 - ((g - GO) % 60)} s={0.7} rot={-12} />
              <Heart x={760} y={720 - ((g - GO + 30) % 60)} s={0.55} rot={14} color={C.red} />
              <Star x={140} y={760} s={0.8} rot={g * 2} />
              <Sparkle x={980} y={1000} s={1} color={C.yellow} />
            </g>
          </Svg>
          <Bubble x={500} y={480} w={460} p={pop(g, ASK) * (1 - ramp(g, RECAP - 10, RECAP - 2))} tone="pos" tail={{at: 0.12, dir: -1}} size={56}>
            Recoge tus juguetes, por favor.
          </Bubble>
          <Headline p={pop(g, A + 4)} out={ramp(g, RECAP - 6, RECAP)} size={64}>
            <RevealLines
              frame={g}
              lines={[
                {t: 'Así logras que tu hijo…', at: A + 4},
                {t: <><span style={{color: C.green}}>participe más</span>…</>, at: sec(68.4)},
                {t: <>…y <span style={{color: C.green}}>actúe más rápido</span></>, at: sec(69.75)},
              ]}
            />
          </Headline>
          <Headline p={pop(g, RECAP)} size={60} rotate={1} bg="#FFFBEF">
            <span style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4}}>
              <span><span style={{color: C.red}}>1.</span> Para la discusión</span>
              <span><span style={{color: C.green}}>2.</span> Di lo que quieres</span>
              <span><span style={{color: C.blue}}>3.</span> Ofrece algo a cambio</span>
            </span>
          </Headline>
        </>
      );
    }}
  </Stage>
);
