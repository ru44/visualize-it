---
title: How altitude speeds up a clock
summary: >-
  Climb high enough above Earth and gravity's pull weakens enough that your
  clock runs faster than one on the ground — GPS satellites must correct for
  this every single day.
parameters:
  x: altitude x (thousand km)
---

## Try it

1. Watch the blue curve. It dips below zero near the ground, then rises — the orange dot shows how many microseconds a clock gains (or loses) each day at altitude x.
2. Drag x down toward 0. The dot drops below zero: down here a clock actually loses time compared with one far from Earth.
3. Raise x to 20.2, the real GPS altitude. The dot settles near +38 microseconds a day — tiny, but enough to shift a position fix by kilometres if it went uncorrected.

## Real-life examples

1. **A GPS satellite (20,200 km up).** Its clock gains roughly 38 microseconds every day compared with one on the ground.
2. **The International Space Station (400 km up).** So close to Earth that its orbital speed wins out — the station's clock actually loses time, so astronauts return slightly younger.
3. **A geostationary TV satellite (35,800 km up).** Even higher than GPS, so its clock runs fast by an even larger margin every day.

## Test yourself

1. Find the altitude where a clock gains about 38 microseconds a day, the real GPS effect.
2. Push the satellite to the highest altitude on the slider, 40,000 km.
3. Find the altitude where the gravitational and velocity effects cancel out exactly.

## Intuition

Look at the blue curve on the graph: near x = 0, right at Earth's surface, it dips below the horizontal axis, then climbs into positive territory as you slide x higher. The orange dot marks exactly how many microseconds a clock at your chosen altitude gains or loses every day, compared with a clock resting far from any planet.

Two things are competing here. Being high up, farther from Earth's mass, means weaker gravity, and weaker gravity lets a clock run faster, which pulls the curve upward as x grows. But a satellite up there also moves fast to stay in orbit, and speed itself slows a clock down, pulling the curve back toward zero. High enough, gravity wins — which is why the curve ends up positive at GPS altitude.

## Formal

Two effects add together. Gravitational time dilation from Earth's mass $M$ gives a fractional rate change $\dfrac{\Delta t_1}{t} = \dfrac{GM}{c^2}\left(\dfrac{1}{r_1}-\dfrac{1}{r_2}\right)$, comparing the radius $r_1$ of a clock on the ground with the radius $r_2$ of a clock in orbit; since $r_2 > r_1$, this term is positive, so the orbiting clock runs faster.

Special-relativistic time dilation from the satellite's orbital speed $v$ gives a second, negative term, $\dfrac{\Delta t_2}{t} = -\dfrac{v^2}{2c^2}$, and adding both gives the total drift, $\dfrac{\Delta t}{t} = \dfrac{GM}{c^2}\left(\dfrac{1}{r_1}-\dfrac{1}{r_2}\right) - \dfrac{v^2}{2c^2}$, the value plotted on the graph.

## Advanced

The crossover altitude, where the two effects exactly cancel, sits at about 3,200 km: below it, satellites like the ISS lose time overall, and above it, satellites like GPS gain time overall — which is why engineers cannot simply ignore relativity when designing any orbit.

## Derivation

1. A clock farther from Earth's mass sits in a shallower gravitational well and ticks faster than one on the ground, by a fraction $\dfrac{\Delta t_1}{t} = \dfrac{GM}{c^2}\left(\dfrac{1}{r_1}-\dfrac{1}{r_2}\right)$.
2. A clock moving at orbital speed $v$ ticks slower than a stationary one, by a fraction $\dfrac{\Delta t_2}{t} = -\dfrac{v^2}{2c^2}$.
3. Adding the two effects gives the net drift plotted here, $\dfrac{\Delta t}{t} = \dfrac{GM}{c^2}\left(\dfrac{1}{r_1}-\dfrac{1}{r_2}\right) - \dfrac{v^2}{2c^2}$, positive above the crossover altitude and negative below it.

## Real world

### GPS positioning
If engineers ignored relativity, GPS clocks would drift by about 38 microseconds a day — tiny, until you multiply by the speed of light and find it would shift computed positions by roughly 10 km every single day.

### The correction built into every satellite
GPS satellites carry clocks deliberately tuned to tick slightly slow before launch, so that once relativity speeds them up in orbit, they match ground clocks exactly.

### The International Space Station
Astronauts on the ISS orbit low and fast enough that velocity time dilation wins over the gravitational effect, so after six months in space they come home a few milliseconds younger than if they had stayed on Earth.

### Testing general relativity on the ground
Atomic clocks are now precise enough to detect a difference of just a few centimetres in height, letting physicists confirm Einstein's prediction directly in the lab, not only in orbit.
