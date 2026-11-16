---
title: Area under a curve
summary: 'Use signed area under a velocity graph to distinguish change in position from total distance travelled.'
parameters:
  a: 'a — starting time'
  b: 'b — ending time'
variables:
  - 'v(t): signed velocity, modelled as 2 sin t'
  - 'a, b: integration bounds; use a ≤ b for elapsed time'
---

## Try it

1. Set a = 0 and b = 1.5. The velocity is positive throughout this interval, so displacement and distance both equal about 1.859.
2. Increase b to 3.15. This is just beyond π, where the velocity changes from positive to negative. Displacement is near its maximum of 4.
3. Increase b to 6.3. The signed areas nearly cancel, giving displacement about 0.000283, while total distance is about 8.00028. The motion is along one line, not around a loop.

## Real-life examples

1. **Before reversing direction.** From 0 to 1.5 time units, the model moves about 1.859 length units in the positive direction.
2. **Near the farthest point.** From 0 to 3.15, displacement is about 3.99993. The exact turning time is π, not 3.15.
3. **Near the starting position.** From 0 to 6.3, displacement is close to zero. At exactly 2π it is zero, after a total distance of 8.

## Test yourself

1. Choose bounds with |b − a| greater than 2 and absolute signed integral less than 0.1.
2. Make the signed integral within 0.15 of 4.
3. Make the signed integral within 0.1 of −3. For a forward-time interpretation, choose a less than b.

## Intuition

Imagine an object moving along a straight track. A positive velocity means motion in the chosen positive direction; a negative velocity means motion back the other way. The graph shows velocity, which can be negative, rather than speed, which cannot. A small velocity multiplied by a short duration gives a small signed change in position.

Adding the positive and negative contributions gives displacement. Adding their magnitudes gives total distance. In this model the object stops momentarily and reverses direction at π, then returns to its starting position at 2π. Its displacement over that cycle is zero, but it has travelled 4 units outward and 4 units back. The shaded regions show the contributions; the graph itself is not a drawing of the object's path.

## Formal

For chronological bounds $a\leq b$ and continuous velocity v, displacement is $\int_a^b v(t)\,dt=A_+-A_-$, where A₊ and A₋ are nonnegative areas above and below the axis. Total distance is $\int_a^b|v(t)|\,dt=A_++A_-$. Displacement carries direction through its sign.

Here $v(t)=2\sin t$, with the sine argument in radians, so $\int_a^b2\sin t\,dt=2\cos a-2\cos b$. If time is in seconds and velocity in metres per second, the integral is in metres. Reversing the bounds reverses an integral's sign; that reversed integral of speed is not a physical total distance.

## Advanced

For fixed a, the accumulated displacement F(b) has derivative F′(b) = v(b). A change of velocity from positive to negative produces a local maximum of displacement; a negative-to-positive change produces a local minimum. Merely having zero velocity does not guarantee either kind of extremum.

## Derivation

1. The displayed derivation fixes a = 0. An antiderivative of 2 sin t is −2 cos t; evaluate it at b and at zero.
2. Subtract the starting value −2 to obtain 2 − 2 cos b, the displacement up to b. This is the accumulated quantity, not the velocity curve drawn above.
3. At b = 2π, cosine is 1 and the displacement is zero. Equal positive and negative areas cancel.

## Real world

### Flow into and out of a tank

If a signed flow rate is positive inward and negative outward, its integral gives the change in stored volume. Integrating the magnitude counts all volume passing through in either direction.

### Motion measurements

A velocity record distinguishes an object's final position from how far it travelled. Returning to the start makes displacement zero, not distance.
