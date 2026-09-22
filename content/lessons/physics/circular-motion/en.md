---
title: Centripetal acceleration
summary: >-
  Moving in a circle at constant speed still means accelerating — always toward
  the center, growing fast with speed and shrinking slowly with radius.
parameters:
  rad: radius r
  x: speed v
variables:
  - speed along the circular path
  - radius of the circular path
  - 'centripetal acceleration, directed toward the center'
charts:
  - title: 'Centripetal acceleration vs radius (illustrative, v = 10 m/s)'
    xLabel: radius r (m)
    yLabel: a_c (m/s²)
    series:
      - a_c = 100/r
---

## Intuition

Drag $v$ upward on the main curve: it bends upward, and the tangent gets steeper and steeper — doubling speed doesn't just double the required acceleration, it quadruples it, since $a_c \propto v^2$.

Now look at the chart, which instead holds speed fixed and varies radius: it falls, gently at first and then flattening — a tight turn (small $r$) at a given speed demands far more centripetal acceleration than a wide, sweeping one, but the penalty for shrinking the radius further eases off once $r$ is already large.

## Formal

$a_c = v^2/r$, directed toward the center of the circular path even though speed is constant, because velocity's direction is continuously changing.

$\dfrac{\partial a_c}{\partial v} = 2v/r$ (quadratic growth with speed) versus $\dfrac{\partial a_c}{\partial r} = -v^2/r^2$ (inverse-square decay with radius).

## Advanced

This follows from differentiating a rotating unit vector: for $\mathbf r(t) = r(\cos\omega t, \sin\omega t)$, $\ddot{\mathbf r} = -\omega^2 \mathbf r$, magnitude $\omega^2 r = v^2/r$ using $v=\omega r$ — acceleration is anti-parallel to position, i.e. pointing at the center, purely from the geometry of uniform rotation, with no need to invoke any force by name.

## Derivation

1. Position on a circle of radius $r$ with angular speed $\omega$.
2. Velocity is tangent to the circle with constant magnitude $v = r\omega$.
3. Acceleration points inward (toward the center) with this magnitude.

## Real world

### Roller coaster loops
Loop radius and speed are engineered together so riders experience a safe, tolerable centripetal acceleration.

### Road curve banking
Highway curves are banked based on expected speed and radius to keep required centripetal force within tire friction limits.

### Satellite orbits
Gravity supplies exactly the centripetal acceleration needed to keep a satellite in a circular orbit at a given radius and speed.

### Centrifuges
Laboratory centrifuges spin samples at small radius but very high speed to reach enormous centripetal accelerations.
