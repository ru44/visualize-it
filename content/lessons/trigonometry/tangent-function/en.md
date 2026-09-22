---
title: The tangent function and its asymptotes
summary: >-
  Tangent is a ratio that suddenly shoots off toward infinity wherever cosine
  hits zero, then the same pattern repeats over and over.
parameters:
  x: x
variables:
  - angle in radians
  - $\sin x / \cos x$
---

## Try it

1. Watch the curve: it climbs steeply as the point approaches a vertical dashed line.
2. Drag the point «x» slowly toward 1.57 — that's π/2. The curve rockets upward, then reappears far below.
3. Keep dragging. The whole zig-zag pattern repeats every 3.14 units — that's π.

## Real-life examples

1. **Wheelchair ramp.** A gentle ramp angled at 0.1 radians, about 6°, has a slope — its tangent — of just 0.1: a rise of 1 for every 10 you travel.
2. **Steep roof pitch.** A roof pitched at 1 radian, about 57°, has a tangent near 1.56 — steep enough that walking on it is dangerous.
3. **Near-vertical camera tilt.** A security camera tilted to 1.5 radians, close to the vertical limit at π/2, has a tangent above 14 — a tiny change in angle now swings its view wildly.

## Test yourself

1. Find an angle where the tangent equals 1 — a 45-degree slope.
2. Get close to the vertical dashed line, between 1.4 and 1.57, and push the tangent above 20.
3. On the negative side, between −1.57 and −1, push the tangent below −10.

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
