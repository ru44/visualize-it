---
title: Limit
summary: >-
  A GPS working out your speed at this exact instant, not your average over
  the last minute, needs to know what your speed is heading toward as the
  time window shrinks to nothing — that is what a limit gives you.
parameters:
  d: distance from 0
variables:
  - 'the input, sliding toward 0 from both sides'
  - undefined at x = 0 (that would be 0/0) — shown as a hollow point
---

## Try it

1. Drag the slider «distance from 0» toward 0. The two dots slide toward the gap in the middle.
2. Read the numbers under the picture: 0.84…, 0.99…, 0.9999… They get closer and closer to 1.
3. The function has a hole exactly at 0, yet everything points at 1. That number 1 is the limit.

## Real-life examples

1. **Far from the hole.** At d = 3, the readout is still a loose approximation of the limit — plenty of room left to close in.
2. **Getting close.** At d = 0.5, the readout already sits within about 6% of the true limit of 1.
3. **Extremely close.** At d = 0.01, the readout is indistinguishable from the limit 1 to the naked eye.

## Test yourself

1. Get the readout within 0.01 of the true limit.
2. Push the readout below 0.9.
3. Find a distance where the readout is negative.

## Intuition

Try dividing 0 by 0 on a calculator and it refuses — that calculation has no answer, and exactly that happens to this function at the input 0, shown as a hollow point with no dot filled in. But a limit never asks what happens exactly at that missing point; it asks what the function is heading toward as you sneak up on it from both sides.

Drag the slider «distance from 0» toward 0 and watch the two dots slide toward the gap, reading off the numbers beneath the picture: 0.84, then 0.99, then 0.9999 — closer and closer to 1 every time, from both directions. That destination, 1, is the limit, even though the function itself is never actually defined there.

## Formal

$\lim_{x \to a} f(x) = L$ means: for every $\varepsilon > 0$ there is a $\delta > 0$ such that $0 < |x - a| < \delta$ implies $|f(x) - L| < \varepsilon$.

Here $a = 0$, $L = 1$. The condition $0 < |x - a|$ is why the value at $a$ itself is irrelevant.

## Advanced

Negating the definition is how limits are shown not to exist: there is an $\varepsilon > 0$ such that every $\delta$-neighbourhood contains an $x$ with $|f(x) - L| \ge \varepsilon$. Equivalently (Heine), $f(x_n) \to L$ for every sequence $x_n \to a$ with $x_n \ne a$ — which is exactly what the shrinking readouts sample.

## Derivation

1. Compare areas of a triangle, a circular sector and a larger triangle on the unit circle.
2. The lower bound rises to 1; the upper bound is already 1.
3. Squeeze theorem: trapped between two things that approach 1, it must approach 1 too.

## Real world

### Instantaneous speed
Speed “at an instant” is a limit of average speeds over shrinking time intervals.

### Small-angle approximation
This exact limit is why $\sin\theta \approx \theta$ works for pendulums and optics.

### Numerical methods
Every simulation that refines its step size is relying on a limit existing.
