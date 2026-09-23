---
title: The Pythagorean and tangent identities
summary: >-
  Square a point's up-distance and its across-distance on a circle of radius
  1, add them, and you always get exactly 1 — and dividing one by the other
  gives the tangent.
parameters:
  theta: angle θ
variables:
  - the angle you have swept around the circle, measured from the 3 o'clock direction
  - the point's height above the centre line
  - the point's distance sideways from the centre
  - sine divided by cosine, the same ratio for every point on the same line through the centre
---

## Try it

1. Drag the point around the circle and watch the readouts sin θ and cos θ change together.
2. Square each one and add them in your head: the total stays 1 no matter where the point sits.
3. Divide sin θ by cos θ. The tan θ readout matches exactly, because that division is what tangent means.

## Real-life examples

1. **A solar panel tilted 25°.** Its rise fraction is sin 25° ≈ 0.42 for every metre of panel. The identity gives the run fraction without a second measurement: cos 25° = √(1 − 0.42²) ≈ 0.91.
2. **A crane arm swung to 115°.** Past straight up, the height fraction is still large, sin 115° ≈ 0.91, but the reach fraction has turned negative, cos 115° ≈ −0.42: the load now hangs behind the crane's base.
3. **A dish rotated to bearing 205°.** Both readouts are negative, sin 205° ≈ −0.42 and cos 205° ≈ −0.91, since the dish points back and to the left of home — yet squared and added they still make exactly 1.

## Test yourself

1. Find an angle where tan θ equals 1 exactly.
2. Find an angle where sin θ is above 0.9 but cos θ has already turned negative.
3. Find an angle where sin θ is exactly ±0.5 while cos θ stays negative.

## Intuition

The point on screen never leaves the circle, so it is always exactly 1 step from the centre. Drag it and watch its two shadows: cos θ is how far sideways it has moved, sin θ is how far up. Those two shadows are the legs of a right triangle whose hypotenuse is the radius itself, fixed at 1 — which is the whole reason squaring and adding them always lands back on 1.

Tangent is a different question: not how far the point has moved, but how steep the line from the centre to the point is. That steepness is rise over run, sin θ over cos θ, and it stays the same for any point you'd find further out along the same line — which is why tan θ can grow far larger than 1 even though sin θ and cos θ never can.

## Formal

For any angle θ, the point $(\cos\theta, \sin\theta)$ lies on the circle of radius 1, so $\sin^2\theta + \cos^2\theta = 1$ for every θ — the Pythagorean identity.

Tangent is defined directly from the same point: $\tan\theta = \dfrac{\sin\theta}{\cos\theta}$, undefined only where $\cos\theta = 0$.

## Advanced

Because $(\cos\theta, \sin\theta)$ always has length 1, it is exactly the kind of vector a rotation matrix needs in its columns to preserve distances; the identity is what guarantees a rotation never stretches or shrinks anything it turns.

## Derivation

1. Any point on a circle of radius 1 satisfies $x^2 + y^2 = 1$, since that distance-from-centre is the circle's whole definition.
2. Writing that point's coordinates as $x = \cos\theta$ and $y = \sin\theta$ turns the circle equation directly into $\sin^2\theta + \cos^2\theta = 1$.
3. The same coordinates give the line's steepness $y/x$, which is exactly $\tan\theta = \sin\theta / \cos\theta$.

## Real world

### Normalising a direction
GPS and game engines store headings as $(\cos\theta,\sin\theta)$; the identity is how software checks that a direction vector hasn't drifted off length 1 after repeated rotations.

### Resolving a force
An engineer who knows a cable's angle and its horizontal pull can recover the vertical pull from the identity alone, without measuring it directly.

### AC power
Mains voltage and current both ride on $\sin(\omega t)$ and $\cos(\omega t)$ terms; the identity keeps their combined instantaneous power tied to a fixed envelope instead of drifting.

### Grade and slope
A road's tangent (its grade) and the sine and cosine of its incline angle are three views of the same hill, so surveyors move between them with these two identities.
