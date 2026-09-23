---
title: Orbits with two bodies, then three
summary: >-
  Two bodies pulling on each other trace a perfect, repeating ellipse; add a
  third body and, once it is heavy enough, the same rule stops producing
  anything so tidy.
parameters:
  n: number of bodies
  m2: second planet's mass
  t: time
variables:
  - the pull between any two bodies i and j
  - the mass of body i
  - the mass of body j
  - the distance between bodies i and j
  - body i's acceleration, the sum of every pull on it
  - body i's velocity, updated a tiny step at a time
  - body i's position, updated from its velocity
charts: []
---

## Try it

1. Press play and watch the orange planet trace its ellipse around the star, forever repeating the same path.
2. Raise "second planet's mass". A green planet appears and starts tugging on the orange one; at a low mass its orbit barely changes.
3. Push "second planet's mass" high and watch the two orbits stop repeating — the "closest approach" reading below keeps shrinking, and the picture never quite returns to where it started.

## Real-life examples

1. **Earth alone around the Sun.** With no second planet, the orange orbit is the textbook ellipse Kepler described four centuries ago.
2. **A smaller world sharing the system.** A second planet with a modest mass gently tugs on the first one, bending its path a little on every pass.
3. **Two heavy worlds sharing one star.** A very heavy second planet pulls hard enough that neither orbit ever settles into a repeating shape — the mark of a chaotic three-body system.

## Test yourself

1. Remove the second planet entirely and watch a clean, repeating ellipse.
2. Bring back a second planet and make it heavy enough that the orbits visibly stop repeating.
3. Keep both planets, but make the second one light enough that the first orbit still looks almost like a clean ellipse.

## Intuition

With just a star and one planet, gravity only has one pull to keep track of, and that single pull always produces the same closed loop — an ellipse — over and over. That is Kepler's picture of the solar system, and it is why two-body orbits never look messy, no matter how far the animation runs.

Add a second planet and every body now feels two pulls at once: the star's steady tug, plus the ever-changing pull from its neighbour. Drag "second planet's mass" up and you can watch that second pull grow from a barely noticeable wobble into something strong enough to bend the first planet's path a little more on every pass — and once it is strong enough, the orbit never finds its way back to a repeating shape.

## Formal

Each pair of bodies attracts with $F_{ij} = \dfrac{G\,m_i m_j}{r_{ij}^{2}}$, directed along the line joining them; body $i$'s acceleration $a_i$ is the sum of every one of those pulls, divided by its own mass $m_i$.

With only two bodies that sum has one term, and Newton showed the resulting path is always a closed ellipse for a bound orbit. With three or more bodies the sum has two or more terms that keep changing as the bodies move, so no formula gives the positions directly — the picture instead steps the motion forward a tiny $\Delta t$ at a time.

## Advanced

For three or more mutually gravitating bodies there is, in general, no closed-form solution — this is the classical n-body problem, solved only in special configurations such as the figure-eight orbit or Lagrange's equilateral triangle. Small changes to the starting conditions grow rapidly over time, the signature of deterministic chaos: the system obeys exact equations and is still, in practice, unpredictable far enough ahead.

## Derivation

1. Every pair of bodies attracts with a force set by their masses and the distance between them, exactly like the Sun and a single planet.
2. A body with several neighbours feels every one of those forces at once, so its acceleration is their sum, divided by its own mass.
3. Knowing the acceleration, the simulation nudges each body's velocity, then its position, forward by one small time step, and repeats.

## Real world

### The Solar System
Long-term simulations show the planets' orbits are stable over millions of years but chaotic over billions — nobody can say exactly where Mercury will be a billion years from now.

### Spacecraft trajectories
Mission planners exploit multi-body gravity, routing probes past several moons and planets in sequence to pick up speed no rocket could give them alone.

### Star clusters
In a dense cluster, three stars passing close together can fling the lightest one out entirely, a process astronomers see happen over and over in simulations.

### Exoplanet systems
Some newly discovered planetary systems sit on the edge of stability, where a little more mass in one world would send the whole system into slow chaos.
