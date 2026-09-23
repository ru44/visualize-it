---
title: Rational functions and asymptotes
summary: >-
  Divide by a number that's racing toward zero and the answer rockets off
  the screen — the same runaway behind a machine's cost per unit near its
  breaking point, or a drug's level fading toward nothing.
parameters:
  x: point x
  a: a — far-away height
  b: b — numerator shift
  p: p — break point
variables:
  - how high the curve settles as x runs far in either direction — the horizontal asymptote
  - shifts the curve's exact path without moving either asymptote
  - where the curve breaks apart — the one input the curve can never use — the vertical asymptote
  - the input being dragged along the curve
---

## Try it

1. Drag the point x slowly toward the slider value of «p — break point». Watch its height shoot off the top or bottom of the graph as x gets close: you're dividing by a number racing toward zero.
2. Drag x far to the right instead, off toward the edge of the graph. The curve flattens and creeps toward one height, set by «a — far-away height», without ever quite touching it.
3. Move «b — numerator shift» up or down. The curve's exact path bends differently, but neither the break point p nor the flat height a change at all.

## Real-life examples

1. **A machine nearing its limit.** Cost per unit follows f(x) = (2x+1)/(x-2) (a=2, b=1, p=2): near a production rate of 2 units the machine grinds to a halt and cost per unit rockets upward; far from that limit, cost settles near 2 dollars per unit.
2. **A drug fading from the blood.** Concentration follows f(x) = 6/(x+2) (a=0, b=6, p=-2): as time x passes, the level drops toward zero, the flat line it keeps approaching but never quite reaches.
3. **Typing speed nearing a limit.** Words-per-minute follows f(x) = (x+2)/(x+3) (a=1, b=2, p=-3): with more practice days x, speed creeps toward a personal best, and the model's break point sits safely before day zero.

## Test yourself

1. Push the point close enough to the break point that the output's size passes 50.
2. Flatten the far-away height to exactly zero — the drug-fading case — while keeping a genuine curve (b greater than 1).
3. Move the break point to exactly x = -3.

## Intuition

A factory's cost per unit climbs as production nears a machine's limit: run it at a rate far below the limit and cost per unit sits near a steady 2 dollars. Push production closer and closer to that limit, though, and cost per unit rockets — the machine is straining harder and harder for each extra unit, and the curve on screen shoots off the top of the graph to show it. Drag the point x toward the slider «p — break point» and watch this happen directly: the closer x gets, the taller the spike, because you're dividing by a number sliding toward zero.

Now drag x the other way, far off toward the right edge of the graph. Instead of spiking, the curve settles down and flattens, creeping toward the height set by «a — far-away height» without ever quite touching it — the same shape a drug's blood level traces as it fades toward zero over time, always getting closer but never fully gone. Move «b — numerator shift» and the curve's exact path changes, but neither of those two limits, the break point or the flat height, moves at all.

## Formal

A rational function is one expression divided by another: here $f(x) = \dfrac{ax+b}{x-p}$. It is defined everywhere except $x = p$, since dividing by $0$ is not allowed — that missing point is the vertical asymptote, the one input the curve can never use.

As $x$ runs far to the left or far to the right, the fraction's extra part shrinks toward $0$ and $f(x)$ settles toward $a$ — the horizontal asymptote, a height the curve keeps approaching but never quite touches.

## Advanced

For a general ratio of polynomials $P(x)/Q(x)$, the horizontal asymptote compares their degrees: if $\deg P < \deg Q$ it is $y=0$; if the degrees are equal it is the ratio of the leading coefficients (exactly $a$ in the family above); if $\deg P > \deg Q$ there is no horizontal asymptote, sometimes a slanted one instead. Vertical asymptotes sit at the real roots of $Q$ that are not also roots of $P$ — a shared root instead leaves a single missing point, a hole, with no blow-up.

## Derivation

1. Split the fraction into a whole part and a leftover piece: $\dfrac{ax+b}{x-p} = a + \dfrac{b+ap}{x-p}$, which is just $a$ plus a smaller fraction.
2. As $x$ gets close to $p$, that leftover fraction's denominator shrinks toward $0$, so its size grows without bound: $\left|\dfrac{b+ap}{x-p}\right| \to \infty$.
3. As $x$ grows very large in either direction, that same leftover fraction shrinks toward $0$ instead, leaving $f(x) \to a$.

## Real world

### Pharmacokinetics
A drug's concentration in the blood fades toward a background level over time, the same settling shape as a horizontal asymptote.

### Traffic near capacity
Average delay per car rises sharply as traffic volume nears a road's capacity, blowing up much like cost near a machine's limit.

### Average cost per unit
Spreading a fixed setup cost over more units makes the average cost per unit fall toward the pure per-unit cost, a horizontal asymptote in disguise.

### Antenna signal strength
Signal strength swings wildly right at a receiver's dead zone but settles to a steady baseline far from it.
