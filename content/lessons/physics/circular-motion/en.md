---
title: Centripetal acceleration
summary: 'Explain how an object can accelerate at constant speed because its direction changes along a circle.'
parameters:
  rad: 'r — circle radius'
  x: 'v — speed along the circle'
variables:
  - 'constant speed along the circular path'
  - 'positive radius of the circle'
  - 'acceleration component directed toward the centre'
charts:
  - title: 'Centripetal acceleration vs radius (illustrative, v = 10 m/s)'
    xLabel: radius r (m)
    yLabel: a_c (m/s²)
    series:
      - a_c = 100/r
---

## Try it

1. In the 2D view, set r = 5 m and v = 5 m/s. The selected point gives inward acceleration 5 m/s². The horizontal axis is speed, not time.
2. Keep r fixed and double v to 10 m/s. Acceleration quadruples to 20 m/s². Now double r to 10 m; acceleration halves to 10 m/s².
3. In 3D, compare the arrow tangent to the circle with the arrow pointing inward. They represent velocity and centripetal acceleration. Their displayed lengths are scaled and capped, so use the formula for exact magnitudes.

## Real-life examples

1. **A wide circular path.** At 8 m/s around a circle of radius 20 m, inward acceleration is 3.2 m/s².
2. **A smaller circle.** At 5 m/s and radius 10 m, inward acceleration is 2.5 m/s². An object of mass 2 kg would need a net inward force of 5 N.
3. **A tight circle.** At 6 m/s and radius 1 m, inward acceleration is 36 m/s². This is an acceleration, not a force in newtons; multiply by mass to find the required net inward force.

## Test yourself

1. Make centripetal acceleration approximately 5 m/s².
2. Keep radius near 10 m and make centripetal acceleration within 0.2 m/s² of 2 m/s².
3. Make centripetal acceleration approximately 50 m/s². This is above the 2D plot's displayed height range, so use the numerical readout.

## Intuition

An object moving around a circle changes direction at every instant. Even if its speed stays the same, its velocity changes because velocity includes direction. Acceleration describes this change. For uniform circular motion it points toward the centre, while velocity points along the tangent.

A faster object must change its velocity direction more quickly to follow the same circle. At fixed radius, doubling speed requires four times the inward acceleration. A larger circle turns the direction more gradually; at fixed speed, doubling radius halves the acceleration. The lower chart illustrates the radius relationship with speed fixed at 10 m/s, independently of the main speed control.

## Formal

For uniform circular motion of radius $r>0$ and speed v, the centripetal acceleration has magnitude $a_c=v^2/r$ and points toward the centre. The net inward force required for mass m is $F_c=mv^2/r$. “Centripetal” describes its direction and role, not a new type of force.

Angular speed satisfies $\omega=v/r$, so $a_c=\omega^2r$. When v is fixed, acceleration is inversely proportional to r; when ω is fixed, it is proportional to r. These are different comparisons because changing r at fixed ω also changes v.

## Advanced

If speed changes while the path remains circular, there is also tangential acceleration dv/dt. The radial component is still v²/r, but total acceleration is no longer purely inward. The tangent slope on the 2D acceleration-versus-speed graph is 2v/r: it measures how the required centripetal acceleration changes with speed, not how acceleration changes over time.

## Derivation

1. Describe a circle centred at the origin using sine and cosine with constant angular speed.
2. Differentiate position. Velocity is tangent to the circle and has magnitude rω.
3. Differentiate again. Acceleration is opposite the radius vector; replacing ω by v/r gives magnitude v²/r.

## Real world

### A guided circular path

A track, tension or a combination of contact forces can provide the net inward force. Identifying the actual forces is a separate step from calculating the required acceleration.

### Circular orbits

Gravity can supply the centripetal acceleration for a circular orbit. The orbiting speed must match the gravitational acceleration at that radius; arbitrary speed and radius choices do not produce a circular gravitational orbit.
