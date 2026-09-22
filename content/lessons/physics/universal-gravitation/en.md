---
title: Gravitational field strength with distance
summary: >-
  Gravity weakens with the square of distance from a planet's center — move
  twice as far away and feel only a quarter of the pull.
parameters:
  x: distance from Earth's center r
variables:
  - 'distance from the center of the Earth, in thousands of km'
  - gravitational field strength (acceleration) at that distance
  - 'Earth''s gravitational parameter, $3.986\times10^{14}\ \text{m}^3/\text{s}^2$'
---

## Intuition

Start the point at $r = 6.4$ (Earth's surface, roughly): the field is about $9.8\ \text{m/s}^2$, familiar as ordinary gravity. Drag outward and the curve drops steeply at first — it does not fall off gently, it plunges, because doubling distance divides the field by four, not two.

Keep dragging out toward geostationary orbit distance (about 42,000 km, i.e. $r\approx42$): the curve has flattened dramatically, hovering near a small fraction of its surface value. Gravity never reaches zero on this plot, but it becomes vanishingly weak — which is exactly why objects that far out can coast in a stable, slow orbit.

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
