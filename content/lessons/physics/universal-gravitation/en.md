---
title: Gravitational field strength with distance
summary: >-
  This is why astronauts orbiting close to Earth still feel almost full
  gravity, but a satellite far out in geostationary orbit feels barely any
  pull at all.
parameters:
  x: distance from Earth's center r
variables:
  - 'distance from the center of the Earth, in thousands of km'
  - gravitational field strength (acceleration) at that distance
  - 'Earth''s gravitational parameter, $3.986\times10^{14}\ \text{m}^3/\text{s}^2$'
---

## Try it

1. Watch the point start at r = 6.4 (Earth's surface). The field reads about 9.8 m/s².
2. Drag "distance from Earth's center r" outward. Watch the curve plunge steeply at first.
3. Keep dragging out toward 42 (geostationary orbit distance). The curve has flattened to a tiny fraction of its surface value.

## Real-life examples

1. **The International Space Station.** Orbiting only a few hundred km up (r≈6800 km from Earth's center), astronauts still feel nearly the same gravity as on the ground.
2. **GPS satellites.** At around r≈26,600 km, GPS satellites feel gravity that's dropped to a small fraction of its surface value.
3. **Geostationary satellites.** At r≈42,200 km, a satellite orbits once per day exactly matching Earth's rotation, with gravity down to about 1/40th its surface strength.

## Test yourself

1. Find the distance from Earth's center where gravity has dropped to exactly 1 m/s².
2. Find the distance where gravity is a quarter of its surface value (about 2.43 m/s²).
3. Find a distance far enough out that gravity has weakened below 0.2 m/s².

## Intuition

Picture standing on Earth's surface, distance 6,400 km from the center, roughly where the point starts at r = 6.4: gravity there is about 9.8 metres per second squared, the pull you feel every day. Drag the slider "distance from Earth's center r" outward and watch the curve drop steeply, not gently — doubling the distance divides gravity by four, not two.

Keep dragging out toward geostationary orbit distance, about 42,000 km, so r ≈ 42: the curve has flattened dramatically, hovering near a tiny fraction of its surface value. Gravity never reaches zero on this plot, but it becomes vanishingly weak, which is exactly why objects that far out can coast in a stable, slow orbit.

## Formal

$g(r) = GM/r^2$: an inverse-square law, so $g$ scales as $1/r^2$.

For a circular orbit, gravity supplies the centripetal acceleration: $GM/r^2 = v^2/r$, giving orbital speed $v = \sqrt{GM/r}$ — orbits farther out move slower.

## Advanced

The inverse-square form is a geometric consequence of gravity spreading its influence over the surface of an expanding sphere of area $4\pi r^2$: the same total "flux" of gravitational field lines is divided over an area that grows as $r^2$, which is why every inverse-square law (gravity, electrostatics, light intensity) shares this identical mathematical shape despite describing entirely different physics.

## Derivation

1. Newton's law of universal gravitation.
2. Field strength is force per unit mass — divide by the test mass $m$.
3. Evaluated at Earth's surface radius, this matches familiar everyday gravity.

## Real world

### Satellite altitude planning
Low Earth orbit versus geostationary orbit trade off gravitational pull, orbital speed and coverage using this exact relationship.

### Weightlessness in orbit
Astronauts orbiting close to Earth still feel most of Earth's gravity — apparent weightlessness comes from free-fall, not distance, but this curve shows gravity is still strong there.

### Tides
The Moon's gravitational pull, and its gradient across the Earth, drives ocean tides.

### Interplanetary trajectories
Spacecraft trajectory planning depends critically on how gravitational pull weakens with distance from each body.
