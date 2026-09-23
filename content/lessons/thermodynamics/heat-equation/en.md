---
title: 'Heat equation: a hot spot spreads and flattens'
summary: Heat a rod in the middle and hold both ends cold, and the warmth always flows from hot toward cold, never the other way, until the whole rod settles at one flat temperature.
parameters:
  alpha: diffusivity α
  width: hot patch width
  step: time
variables:
  - thermal diffusivity, how fast heat spreads through the material
charts: []
---

## Try it

1. Watch the glowing patch in the middle of the rod, and the orange curve tracing its temperature.
2. Drag "time" forward. The peak sinks and spreads outward along the rod, while both ends stay pinned at zero.
3. Raise "diffusivity α" and run the same patch again from the start. It flattens out far sooner this time.

## Real-life examples

1. **A soldering iron tip on a copper rod.** Copper conducts heat so well that a narrow hot spot spreads along the whole rod within seconds.
2. **A wide burn on a ceramic tile.** Ceramic conducts heat poorly, so even a wide hot patch stays mostly in place for a long time.
3. **A hand print left on a steel rail.** Steel sits between the two, so the warm patch spreads out at a moderate pace.

## Test yourself

1. Raise "diffusivity α" above 0.7 and run to time 60 or beyond. The peak should already look mostly flat.
2. Lower "diffusivity α" below 0.15 and run to time 150 or beyond. The peak should still stand tall and narrow.
3. Set "hot patch width" close to 40 with diffusivity above 0.5, then run to time 100 or beyond.

## Intuition

Picture a metal rod pulled straight out of a fire in the middle, while both ends sit in a bucket of ice water. The middle is scorching and the ends are freezing, and heat always drifts from a hotter spot toward a slightly colder one right next to it, never the other way. Every point on the rod only "feels" its immediate neighbours, yet drag "time" forward and the whole curve sinks and spreads exactly the way a real rod would cool.

How fast that happens depends on the material, captured in a single number: diffusivity. A thin copper wire evens out almost instantly, since copper carries heat easily between neighbouring points, while a ceramic rod can stay lumpy for a long time because heat barely leaks from one point to the next. The shape always ends the same way, a flat line at the temperature of the ends, but the diffusivity only decides how long that journey takes.

## Formal

The temperature $T(x,t)$ along the rod obeys $\frac{\partial T}{\partial t} = \alpha \frac{\partial^2 T}{\partial x^2}$: the rate a point heats up equals its diffusivity $\alpha$ times how sharply the curve bends at that point, so a sharp peak flattens fastest and a straight stretch never changes on its own.

The simulation marches this forward with a finite-difference step, $T_i(t+\Delta t) = T_i + \alpha \Delta t\, \frac{T_{i-1} - 2T_i + T_{i+1}}{\Delta x^2}$, nudging every point toward the average of its two neighbours a little at a time, with both ends of the rod held fixed at zero.

## Advanced

For an initial spike, the exact solution spreads as a Gaussian whose width grows like $\sqrt{\alpha t}$, so the time to smooth out a patch of width $L$ scales as $t \sim L^2/\alpha$: quadrupling the width takes four times as long to flatten, not twice. This same equation, with $T$ replaced by a concentration or a probability density, describes a dye diffusing through water and the spreading of a random walk, which is why it is often just called the diffusion equation.

## Derivation

1. Heat flows from hot to cold in proportion to how steep the temperature curve is at that point, never against the slope.
2. Writing that flow in and out of one tiny stretch of rod and taking the limit gives the finite-difference update used here, one point nudged toward the average of its two neighbours.
3. The diffusivity itself packages three material properties into one number: how well the material conducts heat, how dense it is, and how much energy it takes to warm it up.

## Real world

### Cooling electronics
Heat sinks are shaped to maximise how fast a hot processor's heat spreads out and reaches air that can carry it away.

### Weather and ocean mixing
The same equation, in two or three dimensions, describes how a patch of warm ocean water or air slowly blends into its surroundings.

### Baking and cooking times
A thick roast takes far longer to heat through than a thin cutlet of the same material, because the heat has to travel a distance whose effect grows with the square of the width, not the width itself.

### The age of the Earth, mis-estimated
Lord Kelvin used this same equation to estimate the Earth's age from how fast it should be cooling, and got it badly wrong only because he didn't know that radioactive rock keeps reheating the interior.
