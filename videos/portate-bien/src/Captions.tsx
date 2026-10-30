import React from 'react';
import {useCurrentFrame} from 'remotion';
import {pop} from './anim';
import {CAPTIONS} from './captions';
import {HEAD} from './fonts';
import {C} from './theme';
import {FPS} from './timing';

const TONE = {neg: '#FF6B6B', pos: '#5BE39A', none: '#FFFFFF'};

/** Subtítulos estilo Reels: una línea a la vez, palabra activa en amarillo y algo más grande. */
export const Captions: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const line = CAPTIONS.find((l) => t >= l.start && t < l.end);
  if (!line) return null;
  const p = pop(frame, Math.round(line.start * FPS), 13);
  const active = [...line.words].reverse().find((w) => t >= w.start);
  return (
    <div
      style={{
        position: 'absolute',
        left: 60,
        right: 60,
        top: 1360,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '0 26px',
        transform: `scale(${0.85 + 0.15 * p})`,
        opacity: Math.min(1, p * 2),
        fontFamily: HEAD,
        fontWeight: 800,
        fontSize: 76,
        lineHeight: 1.08,
        textAlign: 'center',
      }}
    >
      {line.words.map((w, i) => {
        const on = w === active;
        const color = w.tone !== 'none' ? TONE[w.tone] : on ? C.yellow : TONE.none;
        return (
          <span
            key={i}
            style={{
              color,
              WebkitTextStroke: `13px ${C.ink}`,
              paintOrder: 'stroke fill',
              display: 'inline-block',
              transform: `scale(${on ? 1.1 : 1}) translateY(${on ? -4 : 0}px)`,
              textShadow: `0 8px 0 ${C.ink}`,
            }}
          >
            {w.text}
          </span>
        );
      })}
    </div>
  );
};
