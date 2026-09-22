---
title: Lift-to-drag ratio and glide
summary: >-
  How far a glider travels for every metre it sinks is set entirely by the
  lift-to-drag ratio — and long, slender wings maximise it by cutting induced
  drag.
parameters:
  AR: aspect ratio AR
  x: angle of attack α
variables:
  - >-
    lift-to-drag ratio — also the glide ratio: metres travelled per metre
    descended
  - 'aspect ratio, $b^2/S$ (span squared over wing area)'
  - >-
    Oswald efficiency factor (here fixed at 0.85), how close the wing is to an
    ideal elliptical loading
  - parasitic (zero-lift) drag coefficient
charts:
  - title: Induced drag falls sharply as aspect ratio rises
    xLabel: AR
    yLabel: C_D at α = 5°
    series:
      - C_D(AR)
---

## Intuition

Drag the angle-of-attack point along the L/D curve: it climbs, peaks, then falls again. Too little angle and there is barely any lift to divide by; too much and induced drag (the price of making lift) grows faster than lift itself, dragging the ratio back down. The peak is the single best angle to fly for maximum distance per metre of height given up — that is literally what "best glide speed" means.

Now raise the aspect-ratio slider and watch the whole curve lift and its peak grow: a higher AR means a longer, narrower wing for the same area, and that alone reduces induced drag for a given amount of lift. It is exactly why gliders and albatrosses have such long, slender wings — they are not built for speed, they are built to trade the least possible drag for the lift they need.

## Formal

Total drag coefficient splits into a nearly-constant parasitic term and an induced term that grows with the square of $C_L$: $C_D = C_{D,0} + C_L^2/(\pi\, AR\, e)$.

Best glide occurs where $L/D = C_L/C_D$ is maximised; differentiating shows this happens exactly where induced drag equals parasitic drag, $C_L^2/(\pi AR e) = C_{D,0}$.

## Advanced

Induced drag is the unavoidable energy cost of shedding trailing vortices that carry away the downward momentum given to the air (see the lift lesson). Its coefficient $\propto C_L^2/AR$ is why, for fixed lift, doubling the span (and hence AR, at fixed area) quarters the induced drag — the deep reason sailplane and albatross wings are so long and thin, at the structural cost of more bending moment at the wing root.

## Derivation

1. Write the ratio as a function of $C_L$ alone, with everything else held fixed.
2. Differentiate and set to zero: the maximum occurs where parasitic drag exactly equals induced drag.
3. Solve for $C_L$ at that point and substitute back — best glide ratio grows with the square root of aspect ratio.

## Real world

### Sailplanes
Competition gliders reach $L/D$ above 60 with aspect ratios near 30, letting them travel 60 km for every kilometre of altitude lost.

### Albatrosses
One of the highest aspect ratios in nature lets albatrosses glide enormous distances over the ocean between wingbeats.

### Engine-out procedures
Airliner pilots are trained to fly the best-glide speed — the AoA that maximises $L/D$ — to reach the furthest possible landing site after total engine failure.

### Winglets
Winglets raise the effective aspect ratio without adding physical span, cutting induced drag and saving fuel on long cruises.
