import {Composition} from 'remotion';
import {Sheet} from './Sheet';
import {Video} from './Video';
import {FPS, TOTAL_FRAMES} from './timing';

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="PortateBien" component={Video} durationInFrames={TOTAL_FRAMES} fps={FPS} width={1080} height={1920} />
    <Composition id="Sheet" component={Sheet} durationInFrames={1} fps={FPS} width={1080} height={1920} />
  </>
);
