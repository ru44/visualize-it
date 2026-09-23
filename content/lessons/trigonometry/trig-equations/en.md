---
title: Trig equations — many angles, one sine
summary: >-
  Sine repeats itself, so almost every height on the wave belongs to more
  than one angle at once — this lesson is about finding the others.
parameters:
  x: x — first angle
  h: h — gap to the second angle
variables:
  - the first angle, in radians
  - how far past x the second angle sits
  - how many full turns around the circle
---

## Try it

1. Watch the two dots on the curve. The dashed rectangle shows the gap between them, both sideways (h) and up-down (the two heights).
2. Drag «h — gap to the second angle» until the dashed rectangle goes flat: both dots now sit at the same height, so both angles have the same sine.
3. Drag «x — first angle» instead, keeping the rectangle flat. The gap h that keeps it flat changes with x — there is a different partner angle for almost every starting angle.

## Real-life examples

1. **A Ferris wheel seat.** Rising through x = 0.5 rad past the bottom, a seat reaches the same height again at x + h = 2.64 rad on its way toward the top.
2. **The tide at a harbour.** The water reaches a given depth once while rising, at x = 1.0 rad into the cycle, and again while falling, at x + h = 2.14 rad.
3. **A swing below its rest point.** Past x = 4.0 rad in its cycle the swing is below where it started; it returns to that exact same low height at x + h = 5.42 rad.

## Test yourself

1. Find a gap h, not zero, that keeps both angles at the same height.
2. Push h to a full turn around the circle and check the heights still match.
3. Find two angles with the same height while that height is negative.

## Intuition

The curve you see is sine unrolled onto a line, but it never stops repeating, and it is also symmetric within each hump. Both facts mean a single height on the wave almost always belongs to two dots at once — sometimes because you have gone one full turn further around the circle, sometimes because you have landed on the mirror-image angle within the same turn. Dragging h until the dashed rectangle goes flat is you finding that second dot by hand.

Watch what happens to h as you slide x along: it is not constant. The full-turn partner always sits a fixed 2π away, but the mirror-image partner's distance shrinks as x approaches the top of the hump and grows again on the way down, because mirror symmetry is measured from the peak, not from a fixed gap.

## Formal

The equation $\sin(x+h) = \sin x$ has two families of solutions: $x + h = x + 2\pi k$, a full turn away, and $x + h = \pi - x + 2\pi k$, the mirror image of x reflected around $\pi/2$.

Both families exist for every real x, so a sine equation set equal to a target height always has infinitely many solutions, spaced 2π apart within each family.

## Advanced

The same two-family structure carries over to $\cos$ (mirrored around $0$ instead of $\pi/2$) and, after dividing sine's equation by cosine's, collapses to a single family of period $\pi$ for $\tan$, since tangent's mirror solution and its own graph coincide.

## Derivation

1. Two angles give the same sine exactly when the difference between their heights is zero.
2. One way to close that gap is a full turn: $h = 2\pi k$ for any whole number k.
3. The other way is landing on sine's mirror angle: $h = \pi - 2x + 2\pi k$.

## Real world

### Tides and daylight
Any quantity that rises and falls smoothly, from tide height to hours of daylight, revisits the same value twice each cycle — once rising, once falling — which is exactly this equation.

### AC electricity
A household current reaches any given voltage twice every cycle; circuit timing depends on knowing both instants, not just one.

### Sound and music
Two different phases of the same musical tone can sound identical in amplitude at the moment you sample them, which is why phase alone, not amplitude, distinguishes many sound effects.

### Orbits and seasons
A planet's distance from its star, or a location's day length across the year, returns to the same value at two symmetric points in its yearly cycle.
