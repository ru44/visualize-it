---
title: Centripetal acceleration
summary: >-
  This is why cars need much more grip to take a tight, fast turn than a
  wide, slow one, and why centrifuges spin samples so violently to separate
  them.
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

## Try it

1. Watch the ball moving around the circular path.
2. Drag the slider "speed v" up. Watch the required pull toward the center grow.
3. Now drag "radius r" smaller instead, keeping speed the same. The same speed around a tighter circle needs a much bigger pull.

## Real-life examples

1. **A car rounding a highway curve.** At 8 m/s around a 20 m-radius bend, the car needs 3.2 m/s² of centripetal acceleration — provided by the grip of its tires.
2. **A runner on a track bend.** Sprinting at 5 m/s around a 10 m radius curve requires 2.5 m/s² toward the center, which is why runners lean inward on bends.
3. **A ball on a string swung fast.** A 1 m string with the ball moving at 6 m/s needs a huge 36 m/s² pull, which is why the string tension shoots up when you swing faster.

## Test yourself

1. Make the centripetal acceleration exactly 5 m/s².
2. Keep the radius at 10 m and find the speed that gives a centripetal acceleration of 2 m/s².
3. Find a radius and speed that produce a centripetal acceleration of 50 m/s² — the kind felt on a fast fairground ride.

## Intuition

Picture a car taking a highway curve of radius 20 m at 8 m/s: it needs 3.2 metres per second squared of sideways pull toward the center just to stay on the road, provided by the grip between its tires and the asphalt. Drag the slider "speed v" upward on the main curve: it bends up steeply, because doubling the speed doesn't just double the needed pull, it quadruples it.

Now look at the chart instead, which holds speed fixed and varies the radius: it falls fast at first, then flattens out. A tight turn — a small radius — at a given speed demands far more pull toward the center than a wide, sweeping one, which is why racing cars slow down so much more for hairpin bends than for gentle curves.

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
