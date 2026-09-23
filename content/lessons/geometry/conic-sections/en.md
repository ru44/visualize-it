---
title: Conic sections
summary: >-
  Slice a cone at different angles and the edge of the cut is always a
  circle, an ellipse, a parabola, or a hyperbola — which one depends on a
  single number, the eccentricity.
parameters:
  e: eccentricity e
variables:
  - distance from the focus to a point on the curve
  - the curve's width straight out from the focus, at θ = 90°
  - eccentricity, how stretched the curve is
  - angle around the focus
---

## Try it

1. Start at e = 0. The orange slicing line sits flat and the blue curve is a perfect circle.
2. Raise e toward 1. The line tilts to match the cone's own slant, and the circle stretches into a longer and longer ellipse.
3. Push e past 1. The line now tilts steeper than the cone's side, it cuts through the lower cone too, and the curve opens up into a hyperbola branch.

## Real-life examples

1. **A satellite in a circular orbit.** e = 0: the satellite stays exactly the same distance from Earth the whole way round.
2. **A planet's yearly path.** e = 0.7 traces a stretched, egg-shaped ellipse, close to how a comet loops far out and swings back in.
3. **A comet that never returns.** e = 1 is the borderline parabola: just barely enough speed to escape the Sun's pull for good.

## Test yourself

1. Bring e below 0.05 so the curve becomes a circle.
2. Set e to exactly 1, the parabola.
3. Push e above 1.3 to get a clearly open hyperbola branch.

## Intuition

Take an ice-cream cone and slice straight across it with a knife, level with the table. The cut edge is a circle. Now tilt the knife a little: the circle stretches into an oval, an ellipse. Keep tilting until the knife is exactly as steep as the cone's own side, and the cut never closes up again — it runs off the edge of the cone forever, a parabola. Tilt the knife even steeper than that, past parallel to the cone's side, and it slices into the cone's mirror image below the point, giving one branch of a hyperbola. The slider e is just how steep that knife is, rescaled so e = 0 is flat and e = 1 is exactly parallel to the side.

The right-hand curve isn't drawn by simulating a knife at all — it comes straight from one formula, treating the point marked "focus" as an anchor and letting the angle θ sweep all the way around it. The same formula, with only e changing, produces every shape on the left: proof that circle, ellipse, parabola and hyperbola are really one family, not four unrelated curves.

## Formal

In polar coordinates centred at a focus, every conic is $r = \dfrac{l}{1 + e\cos\theta}$, where $l$ fixes the curve's size and $e$ fixes its shape.

$e = 0$ gives a circle, $0 < e < 1$ an ellipse, $e = 1$ a parabola, and $e > 1$ a hyperbola branch — the same equation throughout.

## Advanced

Cutting a right circular cone of half-angle $\alpha$ with a plane tilted at angle $\beta$ from the base gives exactly $e = \cos\beta / \cos\alpha$: a purely geometric origin for the number that also measures how far a planet's orbit departs from circular, or how sharply a hyperbolic comet bends around the Sun.

## Derivation

1. A plane cutting a cone at a steeper or shallower angle changes how "open" the resulting curve is — that steepness is exactly what e measures.
2. Every point on any of these curves keeps a fixed ratio, e, between its distance to a fixed point (the focus) and its distance to a fixed line (the directrix).
3. Writing that fixed ratio in polar coordinates centred on the focus gives the single formula for r directly, with no separate case for each shape.

## Real world

### Orbits
Every orbit under gravity alone — planet, moon, comet or satellite — is one of these four curves, with the eccentricity telling you at a glance how stretched it is.

### Satellite dishes
A dish's bowl is a paraboloid because a parabola reflects every ray parallel to its axis to one single focus point, where the receiver sits.

### Architecture
Elliptical "whispering gallery" ceilings carry a whisper spoken at one focus clearly to a listener standing at the other.

### Nuclear physics
Rutherford's scattering experiment showed atomic nuclei by watching particles follow hyperbolic paths as they swerved around a concentrated positive charge.
