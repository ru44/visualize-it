---
title: Kepler orbits
summary: >-
  Every circular orbit is a balance, gravity pulling in exactly as hard as
  the curve needs to keep bending, trading speed for distance as the radius
  changes.
parameters:
  x: orbital radius from Earth's centre
variables:
  - the gravitational constant
  - the mass of the body being orbited
  - the orbiting satellite's own mass
  - the orbital radius, from the centre of the planet
  - the orbital speed needed for a circular orbit at that radius
  - the orbital period, the time for one full revolution
charts:
  - title: Orbital period
    xLabel: radius (thousand km)
    yLabel: period (hours)
    series:
      - period
---

## Try it

1. Drag the radius slider to about 6.8, near Earth's surface. Read orbital speed: about 7.8 km/s, ISS territory.
2. Keep dragging out to 42.2. Watch orbital speed drop to about 3.1 km/s.
3. Watch orbital period climb from about 90 minutes to a full 24 hours — geostationary orbit.

## Real-life examples

- **The International Space Station.** At x = 6.8, low Earth orbit, the ISS circles at about 7.8 km/s, completing a lap in roughly 93 minutes.
- **GPS satellites.** At x = 26.6, GPS satellites orbit slower, completing a lap roughly every 12 hours.
- **Geostationary satellites.** At x = 42.2, orbital speed has dropped enough that one lap takes exactly 24 hours, matching Earth's rotation.

## Test yourself

1. Find the radius where one orbit takes exactly 24 hours (geostationary).
2. Find the radius giving an orbital speed of exactly 5 km/s.
3. Push the orbital period below 2 hours by orbiting close to Earth.

## Intuition

Drag the radius slider outward from just above Earth's surface and watch the tangent line's slope — the orbital speed — fall. Close in, near 6,600 km, you need about 7.8 km/s to keep curving fast enough to match gravity's pull; that is low Earth orbit, home to the ISS, circling the planet in about 90 minutes.

Keep dragging out to 42,200 km and the speed has dropped to about 3.1 km/s, slow enough that one lap now takes 24 hours — exactly matching Earth's rotation. A satellite there appears to hang motionless over one spot on the equator: geostationary orbit, used by communication and weather satellites.

## Formal

For a circular orbit, gravity supplies exactly the centripetal force needed to keep curving: $\frac{GMm}{r^2} = \frac{mv^2}{r}$. The satellite's own mass $m$ cancels from both sides, so orbital speed does not depend on what you are orbiting with: $v = \sqrt{\frac{GM}{r}}$.

The period follows from circumference over speed, $T = \frac{2\pi r}{v} = 2\pi\sqrt{\frac{r^3}{GM}}$ — this is Kepler's third law, period squared proportional to radius cubed, extended here to any radius rather than just the planets' orbits around the Sun.

## Advanced

Kepler's first law says real orbits are ellipses with the central body at one focus, not circles; this lesson's circular case is the special case where eccentricity is zero. Kepler's second law, equal areas in equal times, follows from conservation of angular momentum and explains why a planet (or a satellite on an elliptical orbit) moves fastest at closest approach and slowest at its farthest point — a fact this simple circular-orbit formula does not capture, since $v$ stays constant only when $r$ does.

## Derivation

1. On a circular orbit, Newton's law of gravity provides exactly the centripetal force the orbit's curvature demands.
2. The orbiting mass cancels out of that balance, leaving orbital speed as a function of the central mass and radius alone.
3. Dividing the orbit's circumference by that speed gives the period, and squaring reveals Kepler's third law.

## Real world

### GPS satellites
GPS satellites orbit at about 20,200 km, chosen so their 12-hour period repeats the same ground track twice a day.

### Geostationary communication satellites
TV and weather satellites sit at 42,200 km precisely so their 24-hour period matches Earth's rotation and they stay fixed over one spot.

### The International Space Station
The ISS orbits at roughly 6,800 km from Earth's centre (about 400 km altitude), completing a lap in about 93 minutes — over 15 sunrises a day for the crew.

### Planning interplanetary transfers
Mission planners use this same speed-versus-radius trade-off, layered with Kepler's other laws, to compute the fuel needed to move a spacecraft from one orbit to another.
