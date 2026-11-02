import {AbsoluteFill} from 'remotion';
import {Kid} from './characters/Kid';
import {Mom} from './characters/Mom';

// Lámina de personajes para revisar poses (no forma parte del video).
export const Sheet: React.FC = () => (
  <AbsoluteFill style={{background: '#FCE6CF'}}>
    <svg width={1080} height={1920} viewBox="0 0 1080 1920">
      <Kid x={200} y={700} pose={{}} />
      <Kid x={540} y={700} pose={{mouth: 'yell', armL: [60, 40], armR: [60, 40], brows: 'angry', eyes: 'squint'}} />
      <Kid x={880} y={700} pose={{mouth: 'wavy', brows: 'worried', look: [0.6, -0.8], armR: [150, 60]}} />
      <Kid x={200} y={1400} scale={0.8} pose={{mouth: 'grin', eyes: 'happy', armL: [150, 10], armR: [150, 10], legL: [30, 10]}} />
      <Mom x={540} y={1850} pose={{talk: 0.7, armR: [70, 60], brows: 'raised'}} />
      <Mom x={880} y={1850} scale={0.8} pose={{mouth: 'grin', eyes: 'happy', armL: [20, 130]}} />
    </svg>
  </AbsoluteFill>
);
