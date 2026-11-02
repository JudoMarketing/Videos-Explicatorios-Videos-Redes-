# «Que tu hijo siga instrucciones» · video explicativo vertical

Video para Reels / TikTok / Shorts (1080×1920, 30 fps, 74 s) que ilustra el audio
`public/audio.mp3`: dejar de discutir con los hijos, decir lo que quieres que hagan y
ofrecer un premio (o quitar un privilegio) para que respondan más rápido.

Mismo estilo que `videos/portate-bien` (v2): personajes con volumen, escenarios
detallados, titulares arriba y sin subtítulos. Las palabras en inglés del audio
llevan traducción en pantalla: «argument» (discusión) y «back and forth» (un ir y venir).

## Escenas

| # | Tiempo | Qué pasa | Archivo |
|---|---|---|---|
| 1 | 0,0–7,9 s | Sala: mamá y papá preguntan cómo lograr que su hijo siga instrucciones | `src/scenes/S1Ask.tsx` |
| 2 | 7,9–14,0 s | Cocina: discusión en ping-pong; glosario «argument» y «back and forth» | `src/scenes/S2Argue.tsx` |
| 3 | 14,0–22,1 s | Cuarto: «Recoge tus juguetes» → «¡No!» → la mamá explica y explica | `src/scenes/S3Explain.tsx` |
| 4 | 22,1–32,4 s | Ciclo que premia la discusión; el niño se sale con la suya | `src/scenes/S4Loop.tsx` |
| 5 | 32,4–37,8 s | ¡ALTO! a la discusión: el adulto eres tú | `src/scenes/S5Stop.tsx` |
| 6 | 37,8–48,8 s | Di lo que quieres y ofrece algo; qué es un reforzador | `src/scenes/S6Offer.tsx` |
| 7 | 48,8–61,6 s | Jardín: premios (salir, fin de semana, algo especial) o quitar la tablet | `src/scenes/S7Options.tsx` |
| 8 | 61,6–74,3 s | El niño recoge rápido; resumen de los 3 pasos | `src/scenes/S8Result.tsx` |

Otros archivos:

- `src/characters/` niño, mamá, papá y piezas comunes.
- `src/backgrounds.tsx` escenarios: cocina, sala, cuarto, jardín y sala al atardecer.
- `src/props.tsx` utilería (globos, titulares, glosario, señal de alto, regalo, iconos).
- `src/timing.ts` límites de cada escena.
- `src/amp.json` volumen de la voz por fotograma (mueve la boca de la mamá).

## Cómo renderizar

```bash
npm install
npx remotion studio src/index.ts        # vista previa interactiva
npx remotion render src/index.ts SigueInstrucciones out/sigue-instrucciones.mp4 --codec=h264 --crf=20
```

En Linux sin el navegador de Remotion, exporta antes
`REMOTION_BROWSER_EXECUTABLE=/ruta/a/chrome-headless-shell`.

## Licencias

- Fuentes Baloo 2 y Fredoka: SIL Open Font License (`public/fonts/LICENSE-OFL.txt`).
- Remotion es gratis para personas y empresas de hasta 3 empleados; empresas más grandes
  necesitan licencia comercial (remotion.dev/license).
