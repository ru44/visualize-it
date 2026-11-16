---
title: Trig equations — many angles, one sine
summary: 'Find different angles with the same sine using symmetry and full turns.'
parameters:
  x: 'x — first angle in radians'
  h: 'h — signed gap in radians'
variables:
  - 'x: first angle'
  - 'h: second angle minus first angle'
  - 'k: integer number of full turns in the solution formulas'
---

## Try it

1. Set x = 0.5 and h = 2.14. The points at x and x + h have nearly equal heights. The dashed vertical step and the rise readout are close to zero.
2. Change x to 1 and adjust h to 1.14. Equal heights now require a different gap because the points lie on opposite sides of the same peak.
3. Set h = 6.28 and change x. This gap is close to 2π, so the heights stay nearly equal throughout the cycle. Choose settings with both points inside the plotting window.

## Real-life examples

1. **Either side of a peak.** At x = 0.5 and x + h = 2.64, both sine values are about 0.48. The exact second angle would be π − 0.5.
2. **Closer to the peak.** At x = 1 and x + h = 2.14, both values are about 0.84. The gap is shorter than in the first example.
3. **Either side of a trough.** At x = 4 and x + h = 5.42, both values are about −0.76. The exact second angle is 3π − 4.

## Test yourself

1. Make the absolute difference between the sine values less than 0.02 with |h| greater than 0.5.
2. Choose h within 0.3 of 2π and make the absolute height difference less than 0.02. A setting of 6.28 approximates one full turn.
3. Make sin x less than −0.3, the absolute height difference less than 0.02, and |h| greater than 0.3.

## Intuition

A horizontal line through a sine wave often meets it twice in one cycle: once on the rising section and once on the falling section. The two marked points here have angles x and x + h. When they have equal heights, the vertical difference is zero and the secant line through distinct points is horizontal.

There are two ways to find a partner. Reflect an angle across a peak or trough, or add full turns. For x = 0.5, reflection gives π − 0.5, whereas adding one turn gives 0.5 + 2π. Changing x changes the reflection gap, but a full-turn gap stays 2π. A negative h places the second point before the first.

## Formal

For real angles in radians, $\sin(x+h)=\sin x$ exactly when $h=2\pi k$ or $h=\pi-2x+2\pi k$, where k is any integer. The two families can overlap at peaks and troughs.

More generally, $\sin u=s$ has real solutions only for $-1\leq s\leq1$. Values strictly between the extremes occur twice per cycle, while each extreme occurs once. Full turns produce infinitely many solutions on the unrestricted real line, but a specified interval contains only those solutions that lie inside it.

## Advanced

The value h = 0 always satisfies the equation, but the secant slope is then 0/0 and is undefined. The exercises exclude this coincidence. The corresponding rules are cos u = cos v when u = ±v + 2πk, and tan u = tan v when u = v + πk at defined inputs. These follow from their own symmetries and periods, not from dividing two unrelated equations.

## Derivation

1. Move one sine value to the other side: equal heights mean a zero difference.
2. Reflection gives x + h = π − x + 2πk. Subtract x to find the reflection family of gaps.
3. Periodicity gives x + h = x + 2πk. Subtract x to find the full-turn family.

## Real world

### Repeating motion

In a sinusoidal displacement model, the same interior position occurs once in each direction during a cycle. Equal positions do not imply equal velocities.

### Reading one sample

A single sine value generally does not identify an angle uniquely. Additional information, such as whether the signal is rising or falling and which cycle it is in, can distinguish possible angles.
