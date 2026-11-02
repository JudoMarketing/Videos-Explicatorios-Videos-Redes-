import {AbsoluteFill} from 'remotion';
import {Dad} from './characters/Dad';
import {Kid} from './characters/Kid';
import {Mom} from './characters/Mom';

// Lámina de personajes para revisar poses (no forma parte del video).
export const Sheet: React.FC = () => (
  <AbsoluteFill style={{background: '#FCE6CF'}}>
    <svg width={1080} height={1920} viewBox="0 0 1080 1920">
      <Kid x={200} y={700} pose={{crossed: true, brows: 'angry', mouth: 'frown', eyes: 'squint'}} />
      <Kid x={540} y={700} pose={{armL: [40, 150], armR: [150, 10], mouth: 'grin', eyes: 'happy'}} />
      <Kid x={880} y={700} pose={{armR: [60, 100], mouth: 'smile', brows: 'raised', look: [0.6, 0]}} />
      <Mom x={260} y={1880} scale={0.95} pose={{armL: [34, -110], armR: [34, -110], mouth: 'smile', brows: 'neutral'}} />
      <Dad x={760} y={1880} scale={0.95} pose={{armL: [34, -110], armR: [70, 60], talk: 0.6}} />
    </svg>
  </AbsoluteFill>
);
