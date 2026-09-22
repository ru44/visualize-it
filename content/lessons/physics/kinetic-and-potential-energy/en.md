---
title: Kinetic energy and why speed matters so much
summary: >-
  This is why doubling a car's speed doesn't double its crash energy — it
  quadruples it, which is why speed limits matter so much.
parameters:
  m: mass m
  x: speed v
variables:
  - mass of the object
  - 'speed (the horizontal axis, labelled $x$)'
  - 'kinetic energy, $\tfrac12 mv^2$'
charts:
  - title: Gravitational potential energy vs height
    xLabel: height h (m)
    yLabel: PE (J)
    series:
      - PE = m·g·h
---

## Try it

1. Watch the point at low speed on the curve.
2. Drag the point from low to high speed. Watch the tangent line get steeper as you go.
3. Compare speed v with speed 2v — the curve's height doesn't just double, it quadruples.

## Real-life examples

1. **A basketball pass.** A 0.6 kg basketball thrown at 8 m/s carries about 19 J of kinetic energy — enough to sting bare hands if caught wrong.
2. **A bowling ball rolling down the lane.** At 5 kg and just 3 m/s, a bowling ball still carries over 22 J, more than the much lighter basketball, thanks to its mass.
3. **Swinging a hammer.** A 2 kg hammer swung at 6 m/s carries 36 J of kinetic energy — enough to drive a nail deep with one blow.

## Test yourself

1. Make the kinetic energy exactly 20 J.
2. Keep the mass at 1 kg and find the speed that gives 50 J of kinetic energy.
3. Get the kinetic energy above 100 J while keeping the speed under 8 m/s.

## Intuition

Picture a 0.6 kg basketball thrown at 8 m/s: it carries about 19 joules of kinetic energy, the energy of motion. Drag the point from low to high speed along the curve: it doesn't rise steadily, it bends upward, and the tangent line gets visibly steeper as you go, meaning each extra unit of speed adds more energy than the last one did.

Go from speed v to speed 2v instead: the curve's height doesn't merely double, it quadruples, because doubling a number and squaring it multiplies the result by four. That's the physical reason braking distance from double the speed is roughly four times longer — all that extra kinetic energy has to be removed by the same friction force over a longer stopping distance.

## Formal

$KE(v) = \tfrac12 mv^2$; differentiating, $\dfrac{d(KE)}{dv} = mv$, the momentum — energy increases fastest exactly where momentum is largest.

The chart shows gravitational potential energy $PE = mgh$, linear in height $h$ — a useful contrast: PE grows proportionally, KE grows quadratically.

## Advanced

Kinetic energy is quadratic in $v$ because it comes from integrating momentum: $KE = \int_0^v mv'\,dv' = \tfrac12 mv^2$, the same triangular-area argument as spring work but with momentum $mv$ playing the role of the linear "force". This is also why energy, not momentum, sets stopping distances: momentum absorbed at constant braking force gives a time proportional to $v$, but energy absorbed over a fixed braking force gives a distance proportional to $v^2$.

## Derivation

1. Newton's second law.
2. Change variables using $dx/dt = v$.
3. Integrate from rest to speed $v$ — the work-energy theorem.

## Real world

### Crash safety
Car crash energy scales with speed squared, which is why small speed limit increases produce disproportionately worse collisions.

### Wind turbines
Power available from wind scales with the cube of wind speed, since kinetic energy flux already scales as speed squared times speed.

### Ballistics
A bullet's destructive energy depends on the square of its muzzle velocity, not just its mass.

### Sports impacts
A slightly faster pitch or serve carries much more kinetic energy on impact than the speed increase alone would suggest.
