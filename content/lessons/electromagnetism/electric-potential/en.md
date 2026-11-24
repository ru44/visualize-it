---
title: Electric potential and equipotentials
summary: >-
  This is the "voltage" printed on every battery: a number that tells you how
  much energy each unit of charge would have if placed at a given point.
parameters:
  q1: charge q1
  q2: charge q2
  d: separation d
  px: test point x
  py: test point y
variables:
  - electric potential — potential energy per unit charge
  - Coulomb's constant
  - 'the gradient of the potential, an uphill-pointing vector'
---

## Try it

1. Picture two charged metal spheres in a workshop, each carrying about 3 µC, 4 m apart. Set «charge q1» and «charge q2» to 3 µC, «separation d» to 4 m, «test point x» to 0 and «test point y» to 1.5. The readout "potential V at point" shows 21576 V.
2. Drag «test point x» from 0 to 2, right above the second sphere. The potential rises to about 24293 V. Keep going to 4, and it falls to about 15149 V as you leave both spheres behind.
3. Now drag «charge q2» down to −3 µC. The readout turns negative, about −6427 V. Drag «test point x» back to 0, halfway between the spheres, and it reads exactly 0 V.

## Real-life examples

1. **Two charged metal spheres in a workshop.** Both at +3 µC and 4 m apart, they raise the potential at a point above them to over 20,000 V, similar in scale to a small static-electricity demonstration.
2. **A charged sensor plate near a grounded panel.** One plate at +4 µC, the other at −4 µC and 2 m away, the potential is positive near the first and negative near the second: about −36,750 V at a point close to the negative plate.
3. **A Van de Graaff generator dome.** Charged to +5 µC next to a small stray −1 µC patch 6 m away, the dome alone can push the potential above 30,000 V nearby — the same machine used to make hair stand on end.

## Test yourself

1. Move the test point until the potential there reads about 50,000 V (positive or negative).
2. Using two equal and opposite charges, place the test point where the potential is essentially zero.
3. Make the potential drop below −20,000 V.

## Intuition

Picture two charged metal spheres in a workshop, each carrying +3 µC, sitting 4 m apart. Drag «test point x» from 0 out to 4: the potential readout climbs while you get closer to a sphere, then falls smoothly as you leave both behind. It never reaches zero here, not even at the point exactly halfway between the spheres, where their two fields cancel.

Potential has no direction — it is just a number at every point, like altitude on a map. The field is the compass built from that map: it always points the way the potential drops fastest, the same idea as a downhill arrow, just here it points toward lower potential instead of lower ground.

## Formal

For a point charge, $V(r) = k q/r$, taking $V=0$ at infinity; potentials from several charges add as plain numbers (no direction to worry about), unlike fields.

The field is minus the gradient of potential: $\mathbf{E} = -\nabla V$, so $E_x = -\partial V/\partial x$ and likewise for $y$. Surfaces of constant $V$ (equipotentials) are always perpendicular to $\mathbf{E}$.

## Advanced

Because $\nabla\times\mathbf{E} = 0$ for static charges, $\mathbf{E}$ is a conservative field and $V$ exists globally as $V(\mathbf{r}) = -\int_\infty^{\mathbf r} \mathbf{E}\cdot d\boldsymbol{\ell}$, path-independent. This fails once fields change in time — Faraday's law reintroduces a curl, and a single-valued potential is no longer enough.

## Derivation

1. Work done bringing a test charge in from infinity against the field.
2. Potential is that work per unit test charge — independent of the prober.
3. The field is the negative gradient: it points where $V$ decreases fastest.

## Real world

### Circuits

Voltage on a battery or outlet is exactly this potential, measured relative to a chosen reference (ground).

### Cathode-ray and electron-beam devices

Electrons accelerate through a potential difference, gaining kinetic energy $qV$.

### Neurons

The membrane potential across a neuron is a few tens of millivolts, and its change drives the action potential.

### Van de Graaff generators

Charge is carried up a belt until the dome reaches a huge potential relative to ground.
