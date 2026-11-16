---
title: The tangent function and its asymptotes
summary: 'Understand tangent as a slope, and see why it is undefined at some angles.'
parameters:
  x: 'x — angle in radians'
variables:
  - 'x: angle in radians'
  - 'tan x: sine divided by cosine'
---

## Try it

1. Set x = 0, then x = 0.79 radians. The tangent changes from 0 to approximately 1: the second angle is close to 45°.
2. Compare x = 1.50, 1.56 and 1.58. Near π/2 the values become very large in magnitude and change sign across the excluded angle. Use the numerical readout when the point is outside the plot.
3. Compare x = 0.50 with x = 3.64. Their tangents are nearly equal because the angles differ by approximately π radians.

## Real-life examples

1. **A shallow slope.** At 0.1 radians, the tangent is about 0.1003. A horizontal run of 10 units corresponds to a rise of about 1.003 units.
2. **A steeper line.** At 1 radian, the tangent is about 1.557. Each horizontal unit corresponds to about 1.557 vertical units.
3. **Almost vertical.** At 1.5 radians, the tangent is about 14.10. A short horizontal run can correspond to a large rise; at exactly π/2, a vertical line has no defined rise-over-run slope.

## Test yourself

1. Find an angle whose tangent is approximately 1.
2. Choose x strictly between 1.4 and 1.57 radians with tangent greater than 20.
3. Choose x strictly between −1.57 and −1 radians with tangent less than −10.

## Intuition

For a sloping line, divide the vertical change by the horizontal change to find its slope. On the unit circle these changes are sine and cosine, so $\tan x=\sin x/\cos x$. At 45° they are equal and the ratio is 1. A negative ratio describes a line that falls as you move to the right.

As the angle approaches $\pi/2$ from below, the horizontal coordinate approaches zero while the vertical coordinate stays near 1. Dividing by a smaller positive number makes the result larger. Just beyond that angle the horizontal coordinate is negative, so the ratio is large and negative. There is no tangent value at the intervening angle; the branches do not connect through infinity.

## Formal

Angles x are in radians. The domain excludes $x=\pi/2+n\pi$ for every integer n, because $\cos x=0$ there. These excluded angles are vertical asymptotes: nearby values grow without bound in magnitude.

The period is $\pi$: $\tan(x+\pi)=\tan x$ wherever the function is defined. A half-turn reverses both sine and cosine, leaving their ratio unchanged.

## Advanced

At π/2, the left-hand limit is positive infinity and the right-hand limit is negative infinity. There is no two-sided limit, and assigning a value at the missing angle would not make the function continuous. The graph shows only a finite vertical window, so steep branches leave the visible area before reaching an asymptote.

## Derivation

1. Divide the vertical coordinate on the unit circle by the horizontal coordinate to obtain tangent.
2. Exclude angles where the denominator is zero. Sine is nonzero at those angles, so nearby ratios grow without bound.
3. Adding a half-turn changes the sign of numerator and denominator together; their ratio stays the same.

## Real world

### Finding a height difference

With horizontal distance d and elevation angle θ, the height difference is d tan θ. The distance must be horizontal, not measured along the sloping line of sight.

### Field of view

For a symmetric view of a plane perpendicular to the viewing direction at distance d, the width is $2d\tan(\theta/2)$, where θ is the full field-of-view angle between 0° and 180°.
