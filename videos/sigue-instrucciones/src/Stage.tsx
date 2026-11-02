import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';

/**
 * Contenedor de escena: entrega el fotograma GLOBAL (para sincronizar con el audio)
 * y aplica un acercamiento lento de cámara.
 */
export const Stage: React.FC<{
  from: number;
  to: number;
  push?: number;
  origin?: string;
  bg: React.ReactNode;
  children: (g: number) => React.ReactNode;
}> = ({from, to, push = 0.035, origin = '50% 45%', bg, children}) => {
  const g = useCurrentFrame() + from;
  const z = interpolate(g, [from, to], [1, 1 + push]);
  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <AbsoluteFill style={{transform: `scale(${z})`, transformOrigin: origin}}>
        {bg}
        {children(g)}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const Svg: React.FC<{children: React.ReactNode}> = ({children}) => (
  <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{position: 'absolute', inset: 0}}>
    {children}
  </svg>
);
