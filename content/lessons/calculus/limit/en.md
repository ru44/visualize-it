---
title: Limit
summary: >-
  A limit describes what a function approaches as the input approaches a value —
  even if it never arrives.
parameters:
  d: distance from 0
variables:
  - 'the input, sliding toward 0 from both sides'
  - undefined at x = 0 (that would be 0/0) — shown as a hollow point
---

## Intuition

At $x = 0$ this function has a hole: $0/0$ means nothing. But a limit never asks what happens at the point — it asks what happens on the way there.

Pull the two dots toward the hole and watch the readouts: 0.84…, 0.998…, 0.99998… The outputs close in on 1 from both sides. That destination is the limit.

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
