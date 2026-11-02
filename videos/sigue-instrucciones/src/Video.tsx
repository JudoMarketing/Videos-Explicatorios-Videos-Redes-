import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile} from 'remotion';
import {ensureFonts} from './fonts';
import {S1Ask} from './scenes/S1Ask';
import {S2Argue} from './scenes/S2Argue';
import {S3Explain} from './scenes/S3Explain';
import {S4Loop} from './scenes/S4Loop';
import {S5Stop} from './scenes/S5Stop';
import {S6Offer} from './scenes/S6Offer';
import {S7Options} from './scenes/S7Options';
import {S8Result} from './scenes/S8Result';
import {C} from './theme';
import {SCENES} from './timing';
import {Wipe} from './Wipe';

ensureFonts();

const ORDER: [keyof typeof SCENES, React.FC, string][] = [
  ['ask', S1Ask, C.mint],
  ['argue', S2Argue, '#F6B8A8'],
  ['explain', S3Explain, '#C9B6F2'],
  ['loop', S4Loop, C.yellow],
  ['stop', S5Stop, C.red],
  ['offer', S6Offer, '#9FD8B0'],
  ['options', S7Options, '#9CC6EE'],
  ['result', S8Result, C.orange],
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
    {ORDER.slice(1).map(([key, , color]) => (
      <Wipe key={key} at={SCENES[key][0]} color={color} />
    ))}
    <Audio src={staticFile('audio.mp3')} />
  </AbsoluteFill>
);
