import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile} from 'remotion';
import {Captions} from './Captions';
import {ensureFonts} from './fonts';
import {S1Hook} from './scenes/S1Hook';
import {S2Brain} from './scenes/S2Brain';
import {S3Specific} from './scenes/S3Specific';
import {S4Run} from './scenes/S4Run';
import {S5Shout} from './scenes/S5Shout';
import {S6Action} from './scenes/S6Action';
import {S7Share} from './scenes/S7Share';
import {C} from './theme';
import {SCENES} from './timing';
import {Wipe} from './Wipe';

ensureFonts();

const ORDER: [keyof typeof SCENES, React.FC, string][] = [
  ['hook', S1Hook, C.mint],
  ['brain', S2Brain, '#C9B6F2'],
  ['specific', S3Specific, '#9FD8B0'],
  ['run', S4Run, C.orange],
  ['shout', S5Shout, '#F6B8A8'],
  ['action', S6Action, C.yellow],
  ['share', S7Share, '#9CC6EE'],
];

export const Video: React.FC = () => (
  <AbsoluteFill style={{background: C.cream}}>
    {ORDER.map(([key, Scene]) => {
      const [a, b] = SCENES[key];
      return (
        <Sequence key={key} from={a} durationInFrames={b - a} name={key}>
          <Scene />
        </Sequence>
      );
    })}
    {/* el corte hacia "no grites" es continuo (misma sala), sin barrido */}
    {ORDER.slice(1)
      .filter(([key]) => key !== 'shout')
      .map(([key, , color]) => (
        <Wipe key={key} at={SCENES[key][0]} color={color} />
      ))}
    <Captions />
    <Audio src={staticFile('audio.mp3')} />
  </AbsoluteFill>
);
