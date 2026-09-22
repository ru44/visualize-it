---
title: Kinetic energy and why speed matters so much
summary: >-
  Kinetic energy grows with the square of speed, not speed itself — small
  increases in speed cost disproportionately more energy to produce or absorb.
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

## Intuition

Drag the point from low to high speed: the curve does not rise steadily — it bends upward, and the tangent line gets visibly steeper as you go. That steepening slope means each extra unit of speed adds more energy than the last unit did.

Go from speed $v$ to speed $2v$: the curve's height doesn't merely double, it quadruples, because $(2v)^2 = 4v^2$. That is the physical reason braking distance from double the speed is roughly four times longer — all that extra kinetic energy has to be removed by the same friction force over a longer stopping distance.

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
