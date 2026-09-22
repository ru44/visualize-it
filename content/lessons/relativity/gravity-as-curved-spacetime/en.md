---
title: Gravity as a dip in spacetime
summary: >-
  A mass does not reach out and pull on things from a distance — it bends the
  space around it, and anything nearby simply rolls downhill toward it.
parameters:
  M: star mass M
  x: orbit radius x
---

## Try it

1. Watch the blue curve dip downward near the middle — it is the depth of the dent a star of mass M makes in the sheet, and the orange dot marks that depth at your chosen distance x.
2. Raise M. The dip deepens and the orange dot drops further down, the way a heavier bowling ball sinks deeper into a trampoline.
3. Switch to the 3D view and drag x outward. The planet's orbit widens and it circles more slowly, the same relationship the 2D curve is showing you.

## Real-life examples

1. **A light star, wide orbit.** With M = 1 and a planet parked far out at x = 8, the sheet barely dips — gravity here is gentle.
2. **A heavy star, close orbit.** With M = 10 and the planet pulled in to x = 2, the sheet plunges steeply, the kind of dip a real black hole would sit at the bottom of.
3. **A Sun-like star, an inner planet.** With M = 5 and x = 3, this is roughly how deep our Sun dents space where Mercury orbits.

## Test yourself

1. Make the star as light as possible, M = 1.
2. Push the planet out to the widest orbit, x = 8.
3. Find an M and x where the dip depth is about −3.

## Intuition

Look at the blue curve: it dips down near the middle and flattens out far away, like a bowling ball resting on a stretched rubber sheet. The orange dot sits on the curve at your chosen distance x from the centre, and it shows how deep the sheet has sunk there. Switch to the 3D view and you will see the same dip in three dimensions, with a small planet rolling around inside it instead of being pulled by some invisible string.

Raise the slider labelled M, the star's mass, and the whole sheet sinks deeper, because nearby space is bent more sharply by a heavier star. This is Einstein's idea: mass does not reach out through empty space to grab a planet, it bends the space itself, and the planet simply follows the curve it is sitting in, the way a marble rolls toward the middle of a dipped trampoline.

## Formal

Newton's gravity can be rewritten as a potential energy per unit mass, $\Phi(r) = -\dfrac{GM}{r}$, where $r$ is the distance from the centre and $G$ is the gravitational constant; a lower, more negative $\Phi$ means a deeper dip in the sheet.

The plotted curve, $y = -M/\sqrt{x^2+0.9}$, stands in for $\Phi(r)$: it uses a softened denominator so the dip stays finite at $x = 0$ instead of shooting off to infinity, which keeps the picture drawable without losing the shape of the real curve.

## Advanced

In full general relativity the sheet analogy breaks down: real spacetime is four-dimensional, curved in both space and time, and it is the curving of time — not the space dip drawn here — that dominates how strongly slow-moving objects actually feel gravity's pull.

## Derivation

1. The gravitational field (force per unit mass) at distance $r$ from a mass $M$ is $g(r) = -GM/r^2$, pointing inward.
2. Integrating the field gives the gravitational potential, $\Phi(r) = -\int g(r)\,dr = -GM/r$, the "depth" plotted as the dip in the sheet.
3. Far from the mass the potential flattens toward zero, $\Phi(r) \to 0$ as $r \to \infty$, which is why the sheet is flat at the edges of the picture.

## Real world

### Orbits as rolling, not pulling
Planets stay in orbit the same way a marble circles the inside of a bowl — gravity curves the space they move through rather than reaching out and tugging on them.

### Gravitational lensing
Light passing near a massive star follows the curved space around it, bending its path enough that astronomers can see galaxies hidden directly behind other galaxies.

### GPS satellites
Because the depth of the dip changes with height, satellite clocks tick at a very slightly different rate from clocks on the ground, an effect engineers must correct for every day.

### The limits of the rubber sheet
The rubber-sheet picture only shows space bending, drawn as if gravity pulled the sheet "downward" — but real spacetime has no such extra direction, and much of gravity's effect actually comes from the curving of time, which the sheet cannot show at all.
