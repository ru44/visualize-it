---
title: Flow around an obstacle
summary: >-
  Watch water carry dye past a post: at low speed the flow slides around it
  smoothly and closes up neatly behind it, but push the speed up and the
  wake starts to wave, then to shed one whirlpool after another.
parameters:
  U: inflow speed U
  R: obstacle radius R
  nu: viscosity ν
  t: time
variables:
  - Reynolds number Re
  - kinematic viscosity ν
charts: []
---

## Try it

1. Press play. The dots ride the flow past the round obstacle, bending outward as they pass it and coming back together behind it.
2. Raise "inflow speed U" while the fluid stays thick (a high "viscosity ν"). The dots still settle back into a smooth pattern behind the obstacle.
3. Lower "viscosity ν" instead, keeping the speed up. The readout Re climbs, and the wake behind the obstacle starts to wave into a repeating trail of whirlpools.

## Real-life examples

1. **A twig dragged slowly through honey.** With a thick fluid and a gentle speed, Re stays under about 20: the flow closes up behind the twig without a ripple.
2. **A breeze past a flagpole.** At a normal walking-pace breeze and a typical pole, Re climbs past 47 — the point where the smooth wake breaks into a regular, alternating trail of eddies, which is also why a flag hums and flutters in steady wind.
3. **Fast wind on a wide bridge pier.** At high speed past a wide obstacle, Re reaches into the thousands, and the wake becomes a strong, energetic trail of swirling vortices.

## Test yourself

1. Find values of U, R and ν that keep Re under 20, so the flow stays glassy-smooth behind the obstacle.
2. Find values that push Re above 47, so the wake just starts to wave.
3. Find values that push Re above 1000, so the wake sheds vortices strongly.

## Intuition

Picture leaves floating down a stream, past a rock sticking out of the water. Close to the rock, the leaves have to squeeze through a narrower gap, so — by the same idea as water speeding up through a pinched hose — they speed up right beside it. Slide gently past a rock in a slow stream and the leaves drift back together calmly on the far side, like nothing happened.

Speed the stream up, or shrink how "thick" the fluid resists flowing (its viscosity), and something changes behind the rock: the flow can no longer settle back together cleanly. It overshoots to one side, swings back and overshoots the other, peeling off a little whirlpool each time — a vortex street. Which of the two happens is decided by a single number, the Reynolds number, that weighs how much the flow's own momentum matters against how much the fluid's stickiness matters.

## Formal

The Reynolds number is $\mathrm{Re} = \dfrac{2UR}{\nu}$, where $U$ is the flow speed, $R$ is the obstacle's radius (so $2R$ is its width) and $\nu$ is the fluid's kinematic viscosity.

For flow past a circular obstacle, the wake stays steady and smooth for $\mathrm{Re}$ below about $47$; above it, the flow undergoes a Hopf bifurcation into a periodic, oscillating wake — a von Kármán vortex street — whose shedding frequency is set by the Strouhal number.

## Advanced

The shedding frequency follows approximately $f \approx \mathrm{St}\cdot U/(2R)$ with the Strouhal number $\mathrm{St}\approx 0.2\left(1-21/\mathrm{Re}\right)$ for $\mathrm{Re}$ from about 50 into the hundreds — a relation found experimentally and only later connected to the underlying Navier–Stokes instability. At much higher Reynolds numbers the wake itself becomes turbulent, though a dominant shedding frequency often persists even then.

## Derivation

1. $\mathrm{Re} = \dfrac{2UR}{\nu}$, the ratio of inertia to viscosity in the flow
2. below about $\mathrm{Re}\approx 47$ the wake behind the obstacle stays smooth
3. above it, eddies peel off one side then the other: a vortex street

## Real world

### Bridge piers in a river
River engineers check the Reynolds number around bridge piers, because a strong vortex street can shake a pier with a rhythmic side-to-side force strong enough to matter for the design.

### The Tacoma Narrows Bridge
Vortex shedding — reinforced by the bridge deck's own motion — is one of the classic explanations offered for the wind-driven oscillations that led to the famous 1940 collapse of the original Tacoma Narrows Bridge.

### Chimneys and tall poles
Tall chimneys and poles sometimes have a spiral fin (a "strake") wrapped around them purely to break up a clean vortex street and stop it shaking the structure at its own frequency.

### The hum of a taut wire or flag in the wind
The same shedding, at audible frequencies, is why a wire or cable can sing in steady wind, and why a flag flutters in a regular rhythm rather than just flapping randomly.
