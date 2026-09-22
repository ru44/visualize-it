---
title: Lift-to-drag ratio and glide
summary: >-
  This predicts how far a glider can travel for every metre of height it
  gives up — and why gliders and albatrosses have such long, thin wings.
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

## Try it

1. Picture a fighter jet's short, stubby wing (aspect ratio 4) flying at a 5° angle of attack.
2. Drag the point «angle of attack α» along the curve. It climbs, peaks, then falls again.
3. Now raise «aspect ratio AR» toward 25, like a glider's long, slender wing. The whole curve lifts, and its peak grows.

## Real-life examples

1. **A fighter jet's short, stubby wing.** With an aspect ratio of 4 at a 5° angle of attack, it manages a glide ratio of about 10 — built for speed and agility, not efficiency.
2. **An airliner's wing.** With an aspect ratio of 9 at the same 5° angle, it reaches a glide ratio near 17, close to real airliner performance.
3. **A sailplane's long, slender wing.** With an aspect ratio of 25 at 5°, it can glide almost 27 m for every metre it sinks — the payoff of a long, thin wing.

## Test yourself

1. Tune the aspect ratio and angle of attack for a glide ratio of about 20, close to an airliner's.
2. Push the glide ratio above 30, into elite-sailplane territory.
3. Using a stubby wing (aspect ratio at most 6, like a fighter jet), still reach a glide ratio above 10.

## Intuition

Picture a fighter jet's short, stubby wing, aspect ratio 4, flying at a 5° angle of attack. Drag the point «angle of attack α» along the L/D curve: it climbs, peaks, then falls again. Too little angle and there is barely any lift to divide by; too much and the drag from making lift grows faster than the lift itself, dragging the ratio back down. The peak is the single best angle to fly for the greatest distance per metre of height given up — that is literally what "best glide speed" means.

Now raise «aspect ratio AR» toward 25, like a glider's long, slender wing, and watch the whole curve lift and its peak grow. A higher aspect ratio means a longer, narrower wing for the same area, and that alone cuts the drag needed to make a given amount of lift. It is exactly why gliders and albatrosses have such long, slender wings: not built for speed, but built to trade away the least possible drag for the lift they need.

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
