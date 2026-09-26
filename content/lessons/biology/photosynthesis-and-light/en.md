---
title: Photosynthesis, light and the plateau
summary: >-
  Give a leaf more light and it photosynthesises faster — but only up to a
  point, where the curve flattens into a plateau, and the only way to raise
  that plateau further is to hand the leaf more carbon dioxide, exactly what
  greenhouse growers do on purpose.
parameters:
  I: light intensity I
  C: CO₂ concentration C
variables:
  - net photosynthesis rate — CO₂ fixed per leaf area per second
  - light intensity reaching the leaf
  - CO₂ concentration in the air around the leaf
  - the light level at which the rate reaches half its plateau
  - respiration rate — CO₂ the leaf still uses even in the dark
  - the plateau rate at the current CO₂ level
  - the highest possible plateau, once CO₂ is no longer limiting
  - the CO₂ level at which CO₂ stops being the limiting factor in this model
---

## Try it

1. Start in low light with ordinary outdoor CO₂. The rate is barely positive.
2. Raise light toward full midday sun and watch the curve level off — flattening into a plateau well before it looks "finished."
3. Now raise CO₂ as well. The whole plateau lifts higher.

## Real-life examples

1. **A cloudy day, or a leaf deep in the shade.** Only about 100 μmol of light reaches it — the rate is barely above the point where photosynthesis just covers the leaf's own respiration.
2. **Full midday sun, ordinary outdoor air at about 420 ppm CO₂.** Light is no longer the problem, but the rate plateaus well under its true maximum — CO₂ has become the limiting factor instead.
3. **A CO₂-enriched greenhouse in full light.** Growers pump CO₂ up toward 1000 ppm exactly to lift this plateau — a real, common horticultural practice that measurably speeds up crop growth.

## Test yourself

1. Get the leaf light-saturated under today's ordinary outdoor CO₂.
2. Reproduce a CO₂-enriched greenhouse working near light saturation.
3. Find roughly the light compensation point, where the net rate is about zero.

## Intuition

At low light, every extra photon that lands on a leaf gets used almost immediately — barely any of the leaf's light-capturing machinery is busy, so the rate climbs steeply as light increases. That is the steep part of the curve.

Past a certain light level, the machinery that actually turns captured light into sugar can't keep up no matter how many more photons arrive — it is already running flat out, limited by something else entirely, usually how fast CO₂ can be grabbed from the air. More light stops helping, and the curve plateaus. The only way to raise that ceiling is to remove whatever is now the real bottleneck — hand the leaf more CO₂, and the plateau itself rises.

## Formal

The rate follows a saturating curve in light, $P = P_{max}\frac{I}{K+I} - R$: it rises steeply while $I$ is small compared with the half-saturation light level $K$, then flattens toward $P_{max}$ once $I \gg K$, minus a small constant respiration cost $R$ that runs even in darkness.

The plateau itself depends on CO₂ through $P_{max} = P_0\min\!\left(1, \frac{C}{C_{ref}}\right)$: below the reference concentration $C_{ref}$, more CO₂ raises the ceiling directly; above it, in this simple model, some other factor would need to give before the rate could climb any further.

## Advanced

The real machinery behind that ceiling is a single enzyme, Rubisco, which grabs CO₂ molecules out of the air one at a time to build sugar — the same saturating logic as any enzyme working near its maximum turnover rate. At high light and low CO₂, Rubisco is the leaf's genuine bottleneck, which is exactly why raising CO₂ concentration, not light, is what lifts the plateau.

## Derivation

1. The plateau at a given CO₂ level is $P_{max} = P_0\min\!\left(1, \frac{C}{C_{ref}}\right)$: it scales with $C$ until $C$ reaches $C_{ref}$, then stops rising in this simple model.
2. The light response itself follows $P = P_{max}\frac{I}{K+I} - R$, rising steeply at low $I$ and flattening toward $P_{max}$ once $I$ is large.
3. Setting $P=0$ and solving gives the compensation point $I = \frac{RK}{P_{max}-R}$: the light level at which photosynthesis exactly covers respiration, with no net gain either way.

## Real world

### CO₂-enriched greenhouses
Commercial greenhouses routinely pump CO₂ up to two or three times the outdoor level specifically to raise the photosynthesis plateau and speed up crop growth — one of the most direct real-world uses of this exact curve.

### Sun leaves and shade leaves
Plants growing in deep shade often evolve a lower half-saturation light level $K$, reaching their (lower) plateau at much dimmer light than a sun-loving plant, which trades a lower ceiling for working well in poor light.

### Competing for light in a forest canopy
Tall trees keep the brightest light for their own upper leaves; the plants and saplings below are often light-limited their whole lives, never reaching the flat part of their own curve.

### Rising atmospheric CO₂
Global atmospheric CO₂ has risen from about 280 ppm before industrialisation to over 420 ppm today, measurably raising the photosynthetic plateau for many plants — a real effect researchers call CO₂ fertilisation, though it comes bundled with the other effects of a changing climate.
