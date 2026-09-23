---
title: The Lorenz attractor
summary: >-
  Three simple equations for a heated fluid draw a butterfly-shaped path
  that never repeats, and starting a hair to the side sends it somewhere
  completely different — this is where "chaos theory" got its name.
parameters:
  sigma: mixing rate σ
  rho: drive ρ
  beta: shape constant β
  sep: starting gap
  t: time
variables:
  - how fast x chases y
  - how hard the fluid is being driven — past about 24.7 the two calm spots become unstable
  - a constant set by the shape of the heated layer
  - the system's position right now
charts: []
---

## Try it

1. Press play. The orange path loops around two "wings" of the butterfly, switching sides without warning.
2. Raise "starting gap" above 2. A second, blue path starts almost on top of the orange one.
3. Watch the two paths for a few seconds. They stay together at first, then peel apart completely.

## Real-life examples

1. **Weather that won't stay put.** Edward Lorenz built this model in 1963 from equations for a warmed layer of air. Below ρ ≈ 25 the air just settles into a slow, steady roll.
2. **The classic butterfly.** At ρ = 28 (a stronger heating) the roll never settles: it flips between two loops forever, tracing the shape that gave "the butterfly effect" its name.
3. **Two almost-identical forecasts.** Start a second path just 3.5 units away and let it run a third of the way. By then it is already on a different loop from the first.

## Test yourself

1. Bring ρ below 20, so both paths settle into one steady loop instead of switching sides.
2. Push ρ above 24 and set the starting gap above 2, so the two paths clearly split apart.
3. Keep σ near 10 and β near 2.7 — the values Lorenz used — with ρ above 28.

## Intuition

Picture a shallow pan of water, heated from below and cooled from above. Warm water wants to rise and cool water wants to sink, so the water rolls over in a loop, like a lazy waiting line at a door. The three numbers x, y and z on screen are not positions in the pan — they describe the roll itself: how fast it is turning, and how the warm and cool sides are tilted.

Raise ρ, which stands for how hard you are heating the pan, and the single loop stops being enough: the roll flips to the other side, rolls a while, flips back, and never finds a rhythm. That switching is what draws the two "wings" of the butterfly. Nothing random is added anywhere — the same three equations run every time — the flips come purely from the shape of the equations themselves.

## Formal

The system is $\dot x = \sigma(y-x)$, $\dot y = x(\rho-z)-y$, $\dot z = xy-\beta z$, three coupled, nonlinear ordinary differential equations with no explicit time dependence.

For $\rho$ above about $24.74$ (with $\sigma=10$, $\beta=8/3$) the two steady points of the system become unstable, and nearby paths separate at an exponential rate — the defining sign of chaos, and the reason the second path on screen breaks away.

## Advanced

The exponential separation rate is measured by the largest Lyapunov exponent, positive on the attractor; its inverse sets the "prediction horizon" beyond which two forecasts that started almost identically carry no shared information. The attractor itself has a fractal (non-integer) dimension, so it is a curve with infinite length packed into a bounded region of space.

## Derivation

1. $x$ tracks the roll's speed, $y$ the temperature difference between the rising and falling sides, and $z$ how much that difference bends the roll out of a simple loop.
2. $\sigma$ pulls $x$ toward $y$: how quickly the roll's speed follows the temperature difference driving it.
3. $\rho$ measures how hard the layer is heated, and $\beta$ is a fixed number set by the shape of the container; together with $\sigma$ they fix the whole system.

## Real world

### Weather forecasting
Real forecasts are chaotic in exactly this sense, which is why weather models are run many times from slightly different starting conditions and averaged, instead of trusted as one single run.

### Why "long-range forecast" has limits
Because nearby starting points separate exponentially fast, no amount of extra computing power can push detailed forecasts much past about two weeks — the chaos itself is the limit, not the computer.

### Lasers and other rolling systems
The exact same three equations describe some single-mode lasers, so an optics lab can watch "the butterfly effect" happening in a beam of light.

### Naming a whole field
This system is the reason "chaos theory" and "the butterfly effect" became household phrases after Lorenz's 1963 paper, well before chaos was found in dripping taps, heartbeats and many other everyday systems.
