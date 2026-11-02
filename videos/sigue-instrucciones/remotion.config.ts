import {Config} from '@remotion/cli/config';

// En entornos sin el navegador de Remotion (Linux en la nube, ARM), apunta a un Chromium del sistema:
//   export REMOTION_BROWSER_EXECUTABLE=/ruta/a/chromium
const browser = process.env.REMOTION_BROWSER_EXECUTABLE;
if (browser) {
  Config.setBrowserExecutable(browser);
}
Config.setVideoImageFormat('jpeg');
Config.setJpegQuality(92);
