---
title: Electric potential and equipotentials
summary: >-
  Potential is the energy per unit charge stored at a point — a scalar landscape
  whose downhill direction is the electric field.
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

## Intuition

With both charges positive, drag the test point outward from between them: the potential readout falls the whole way, smoothly, even though the field arrows (which are $-\nabla V$) point outward from both charges and can momentarily cancel exactly on the midline.

Potential has no direction — it is just a number at every point, like altitude on a map. The field is the compass built from that map: it always points the way potential drops fastest, exactly like the gradient arrow in the surfaces lesson, just pointing downhill instead of up.

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
