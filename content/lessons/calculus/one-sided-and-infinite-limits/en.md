---
title: One-sided and infinite limits
summary: >-
  Approach $x=0$ from the left and right on $y=1/x$ and you head to two
  different infinities — the two-sided limit does not exist.
parameters:
  d: distance from x = 0
variables:
  - distance of the two approaching points from $x=0$
  - limit approaching from the left
  - limit approaching from the right
---

## Intuition

Shrink $d$ and watch both dots close in on $x = 0$ from opposite sides. The table of values makes it concrete: from the right, $1/x$ grows without bound toward $+\infty$; from the left, it plunges toward $-\infty$. They are not converging on the same number — they are diverging in opposite directions.

This is exactly what the vertical line at $x=0$ on the graph is telling you: the curve never settles near any finite height there. Whenever the two one-sided behaviors disagree like this, mathematicians say the limit simply does not exist, even though each side individually has a clear (infinite) trend.

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
