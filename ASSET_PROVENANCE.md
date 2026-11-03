# Asset provenance

- `assets/images/source-test-card.png`: original 1200 × 630 procedural RGB test image generated for this project using trigonometric color fields, with no external image or portrait. Source generation code: `tools/generate-example.mjs`.
- `assets/images/kaleidoscope.png`: actual output of ChromaMeld RGBA's CPU worker applied to that source using the built-in **Kaleidoscope Mirror** preset, default controls `[51, 0, 63.75, 255, 127.5, 127.5, 128, 128, 128, 128]`, native float mode. RGBA source checkout: `anthonychimming/filter-fabjs`, local revision `58d7b26dd7e089170f632cd40b115078a917f1f5`, paths `src/presets/builtins.js`, `src/core/`, and `src/renderers/cpu-worker-source.js`. It was generated via the same parser, IR and CPU worker used by the editor; it is a rendered output, not an application screenshot.
- Reproduce with the editor checkout as a sibling named `chromameld-rgba`: from this repository root, run `node tools/generate-example.mjs`, then `node tools/encode-png.mjs`. These scripts write intermediate raw files; the editor source is GPL-2.0-or-later. No third-party portrait is included.
- `assets/favicon.svg`: simple original geometric mark created for this site.

The earlier portrait-based social card is excluded because its underlying image rights could not be verified. The site source and artwork licensing should be explicitly selected by the owner before release; no license is assumed merely from the editor license.
