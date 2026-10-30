# «Pórtate bien» · video explicativo vertical

Video para Reels / TikTok / Shorts (1080×1920, 30 fps, 51 s) que ilustra el audio
`public/audio.mp3`: por qué decir «pórtate bien» no funciona y cómo cambiarlo por
acciones concretas («camina despacio», «usa tu voz bajita»).

Todo está dibujado en código (React + SVG con [Remotion](https://remotion.dev)):
personajes, fondos, globos y subtítulos. No hay imágenes de terceros.

## Escenas

| # | Tiempo | Qué pasa | Archivo |
|---|---|---|---|
| 1 | 0,0–5,6 s | Cocina: la mamá dice «¡Pórtate bien!», el niño no entiende | `src/scenes/S1Hook.tsx` |
| 2 | 5,6–12,6 s | El cerebro del niño no capta qué acción es | `src/scenes/S2Brain.tsx` |
| 3 | 12,6–19,5 s | De la frase vaga a «lo que SÍ quieres ver» | `src/scenes/S3Specific.tsx` |
| 4 | 19,5–27,6 s | «No corras» se cambia por «Camina despacio» | `src/scenes/S4Run.tsx` |
| 5 | 27,6–32,9 s | «No grites» se cambia por «Usa tu voz bajita» | `src/scenes/S5Shout.tsx` |
| 6 | 32,9–41,5 s | Lista de acciones concretas = portarse bien | `src/scenes/S6Action.tsx` |
| 7 | 41,5–51,4 s | Llamado a compartir el video | `src/scenes/S7Share.tsx` |

Otros archivos:

- `src/characters/` niño, mamá y piezas comunes (ojos, cejas, bocas, brazos).
- `src/captions.ts` texto de los subtítulos con el segundo de cada palabra.
- `src/timing.ts` límites de cada escena.
- `src/amp.json` volumen de la voz por fotograma (mueve la boca de la mamá).
- `src/theme.ts` colores.

## Cómo renderizar

```bash
npm install
npx remotion studio src/index.ts        # vista previa interactiva
npx remotion render src/index.ts PortateBien out/portate-bien.mp4 --codec=h264 --crf=20
```

En Linux sin el navegador de Remotion, exporta antes
`REMOTION_BROWSER_EXECUTABLE=/ruta/a/chrome-headless-shell`.

Fotogramas sueltos para revisar: `node scripts/stills.mjs 100,300,500`.

## Licencias

- Fuentes Baloo 2 y Fredoka: SIL Open Font License (`public/fonts/LICENSE-OFL.txt`).
- Remotion es gratis para personas y empresas de hasta 3 empleados; empresas más grandes
  necesitan licencia comercial (remotion.dev/license).
