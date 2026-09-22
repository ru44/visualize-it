---
title: The tangent function and its asymptotes
summary: >-
  Tangent is a ratio that blows up wherever cosine is zero — the curve repeats
  every $\pi$ and shoots to infinity at each end of every branch.
parameters:
  x: x
variables:
  - angle in radians
  - $\sin x / \cos x$
---

## Intuition

Drag the point slowly toward $x = \pi/2 \approx 1.57$: the curve rockets upward, because $\cos x$ is heading to zero in the denominator while $\sin x$ stays near one. Just past that point the curve reappears from far below — same formula, opposite sign of $\cos x$.

Keep dragging and the whole pattern repeats every $\pi$ units, half the period of sine or cosine alone, because tangent only cares about the ratio, which returns to itself twice as often as sine and cosine individually do.

## Formal

$\tan x$ is undefined wherever $\cos x = 0$, i.e. at $x = \pi/2 + n\pi$ for integer $n$; these are vertical asymptotes.

Period $\pi$: $\tan(x + \pi) = \tan x$ for all $x$ in the domain.

## Advanced

Near each asymptote $\tan x$ has opposite one-sided limits — $+\infty$ approaching $\pi/2$ from the left, $-\infty$ from the right — so the function has an essential discontinuity there rather than a removable one; this is why "the limit at $\pi/2$" does not exist even though both one-sided limits are infinite.

## Derivation

1. Definition as a ratio of sine and cosine.
2. The denominator vanishes at these points, producing vertical asymptotes.
3. Both sine and cosine flip sign after $\pi$, so their ratio does not — period $\pi$.

## Real world

### Slopes and angles
The tangent of an incline angle is literally its slope — rise over run.

### Surveying and navigation
Heights and distances are recovered from measured angles via the tangent function.

### Optics
The tangent of the angle of incidence appears in lens and prism calculations.

### Camera field of view
A camera's horizontal coverage at distance $d$ is $2d\tan(\theta/2)$ for field-of-view angle $\theta$.
