---
title: One-sided and infinite limits
summary: >-
  Splitting a fixed cost over fewer and fewer people makes each person's
  share blow up without limit — a one-sided infinite limit is exactly that
  runaway behaviour, matched from the other side.
parameters:
  d: distance from x = 0
variables:
  - distance of the two approaching points from $x=0$
  - limit approaching from the left
  - limit approaching from the right
---

## Try it

1. Shrink «distance from x = 0» toward 0. Watch the two dots close in on the gap from opposite sides.
2. Read the table of values: from the right, the numbers grow huge; from the left, they plunge.
3. Notice they never head to the same number — the two-sided limit does not exist.

## Real-life examples

1. **Still far from the asymptote.** At d = 1, the readouts are only modest numbers — nowhere near infinite yet.
2. **Very close: values already in the hundreds.** At d = 0.1, both readouts have grown to ±10.
3. **As close as the slider allows.** At d = 0.02, the readouts reach roughly ±50 — the closest this slider can get.

## Test yourself

1. Push the right-hand value above 40.
2. Make the right-hand value equal about 10.
3. Bring the right-hand value down below 1.

## Intuition

Imagine splitting a fixed 100-dollar venue rental among however many guests show up. With 100 guests, each pays 1 dollar; with 10 guests, each pays 10; and as the guest count drops toward 1, then toward a fraction of a person, each share explodes toward an unlimited amount. On screen, shrink «distance from x = 0» toward 0 and watch both dots close in on that same collapsing point from opposite sides: from the right, the readout grows without bound toward a huge positive number, while from the left, it plunges toward a huge negative one.

They are not converging on the same number — they are racing off in opposite directions. Whenever the two sides disagree like this, mathematicians say the limit simply does not exist, even though each side individually has a clear runaway trend of its own.

## Formal

$\lim_{x\to 0^+} \frac1x = +\infty$ and $\lim_{x\to 0^-}\frac1x = -\infty$; since these one-sided limits disagree, $\lim_{x\to0}\frac1x$ does not exist (not even as an infinite limit).

A vertical asymptote at $x=c$ means at least one of the one-sided limits there is $+\infty$ or $-\infty$.

## Advanced

"Infinite limit" is a convenient abuse of the word limit: $\infty$ is not a real number, so these statements are really shorthand for "for every $M$ there is a $\delta$ such that $0 < x < \delta$ implies $1/x > M$" — the function is eventually larger than any bound, not that it converges to some value called infinity.

## Derivation

1. As $x$ shrinks toward $0$ from the right, $1/x$ grows without bound.
2. This is precisely the $\varepsilon$–$\delta$-style definition of an infinite limit.
3. From the left, the same argument gives $1/x \to -\infty$ — the opposite sign.

## Real world

### Electric field near a point charge
Field strength scales like $1/r^2$ and diverges as you approach the charge — a physical vertical asymptote.

### Lens focal blur
Magnification formulas in optics blow up as an object approaches the focal distance.

### Resource allocation
Cost-per-unit of a fixed cost spread over $x$ units, $C/x$, diverges as $x\to 0$ — spreading a fixed cost over almost nothing is unboundedly expensive.

### Control systems
A transfer function's poles are exactly the points where its output has this kind of infinite, sign-flipping limit, marking instability.
