---
title: Earthquake magnitude
summary: >-
  Each whole number on the magnitude scale is not a small step — it is a
  ×32 jump in the energy released. The scale is logarithmic so the numbers
  stay small; the earthquakes do not.
parameters:
  x: earthquake magnitude
variables:
  - the earthquake magnitude, on the moment magnitude scale
  - the energy released, in joules
  - the energy ratio relative to a magnitude-5 earthquake
charts:
  - title: Energy ratio
    xLabel: magnitude
    yLabel: ratio to M5 energy
    series:
      - energy ratio to M5
---

## Try it

1. Watch the plotted line — the energy's logarithm — climb in a straight line as you drag magnitude up.
2. Watch the second chart, the energy ratio to a magnitude-5 quake, barely move until about magnitude 7.
3. Push the magnitude slider to 9 and watch that ratio rocket to roughly a million.

## Real-life examples

- **A quake most people don't notice.** Magnitude 3 releases so little energy that only sensitive instruments detect it.
- **A historic mega-quake.** Magnitude 9, the scale of Sumatra (2004) and Tōhoku (2011), releases about a million times the energy of a magnitude-5 quake.
- **A moderate, damaging earthquake.** Magnitude 6.5 is strong enough to damage poorly built structures, releasing roughly 5,600 times the energy of a magnitude-5 quake.

## Test yourself

1. Find the magnitude that releases exactly 1000 times the energy of a magnitude-5 quake.
2. Push the magnitude high enough that the energy ratio passes 100,000.
3. Find the magnitude where the energy ratio equals exactly 32 — one whole magnitude step above M5.

## Intuition

Drag the magnitude slider from 3 to 9 and watch the plotted value — the base-10 logarithm of the energy released — climb in a straight line. That straightness is the point of a logarithmic scale: it turns numbers that would otherwise range from thousands of joules to numbers with 18 digits into a tidy line from about 9 to 18.

Look at the second chart instead, the energy ratio to a magnitude-5 quake: it barely rises until around magnitude 7, then rockets upward. A magnitude-9 earthquake, like the ones that struck Sumatra in 2004 or Tōhoku in 2011, releases roughly a million times the energy of a magnitude-5 quake that a city might not even notice.

## Formal

The Gutenberg-Richter energy relation ties magnitude to log-energy in joules: $\log_{10}E = 1.5x + 4.8$. Because the relation is linear in $\log_{10}E$ rather than in $E$ itself, each step of 1 in magnitude corresponds to a fixed multiplicative jump in energy, not a fixed additive one.

Raising a whole magnitude step multiplies the base-10 logarithm by 1.5, so the energy itself multiplies by $10^{1.5} \approx 31.6$: a magnitude 6 quake releases about 32 times the energy of a magnitude 5, and a magnitude 7 releases about 32 times that again, roughly 1,000 times a magnitude 5.

## Advanced

The moment magnitude scale used today (replacing the older Richter scale, which saturated and became inaccurate above about magnitude 7) is defined from the seismic moment, itself computed from the rupture area, average fault slip and rock rigidity — a direct physical measurement rather than a reading off a particular instrument's needle deflection, which is what made the original Richter scale instrument- and distance-dependent.

## Derivation

1. The empirical Gutenberg-Richter relation fixes the base-10 logarithm of radiated energy as a linear function of magnitude.
2. Because the exponent is linear, each unit increase in magnitude multiplies energy by the same fixed factor, $10^{1.5} \approx 31.6$.
3. Comparing any magnitude to a magnitude-5 reference gives the energy ratio directly as a power of 10.

## Real world

### Comparing historical earthquakes
News reports of "the strongest earthquake in decades" are comparing points on this same exponential energy curve, not a linear one.

### Building codes
Seismic design codes size structures for the expected magnitude range of their region, since a building built for magnitude 6 shaking can fail catastrophically in a magnitude 7 event many times stronger.

### Tsunami warnings
Large undersea earthquakes near a magnitude 8 or 9 threshold trigger automatic tsunami warnings precisely because the energy jump past that point is so large.

### Why "one point higher" sounds unimpressive but is not
A magnitude 7 quake sounds only "one point" worse than a magnitude 6 on the news, but it releases about 32 times more energy — the scale's logarithm hides the real difference.
