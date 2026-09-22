---
title: Work as the area under a force curve
summary: >-
  Stretching a spring takes more force the further you pull; the work done is
  the area under that rising force line.
parameters:
  k: spring constant k
  a: a (start displacement)
  b: b (end displacement)
variables:
  - 'spring restoring force, proportional to stretch (Hooke''s law)'
  - spring stiffness
  - work done stretching from $a$ to $b$ — the shaded area
---

## Intuition

Drag $b$ outward from $a=0$: the force line rises steadily and the shaded triangle grows — not just wider but taller too, so the area (and hence the work) grows faster than the displacement itself.

Stiffen the spring by raising $k$: the same stretch now needs a taller triangle of force, so the work to reach any given displacement increases in direct proportion to $k$ — a stiffer spring stores more energy for the same stretch.

## Formal

$W = \int_0^x kx'\,dx' = \tfrac12 kx^2$ — the area of a triangle with base $x$ and height $kx$.

This work is stored as elastic potential energy: $U(x) = \tfrac12 kx^2$.

## Advanced

Because $F=kx$ is linear, the work-displacement relationship is quadratic; for a general nonlinear restoring force $F(x)$, the stored energy is still $U(x)=\int_0^x F(x')dx'$, but the shape of $U$ mirrors whatever nonlinearity $F$ has — a hardening spring ($F$ growing faster than linear) stores energy that rises faster than quadratically.

## Derivation

1. Hooke's law: restoring force proportional to stretch.
2. Work is the accumulated force over the displacement.
3. Evaluate the integral — the familiar spring potential energy.

## Real world

### Archery and catapults
Drawing a bow or catapult stores elastic energy exactly as $\tfrac12 kx^2$, released as kinetic energy on firing.

### Vehicle suspensions
Springs and shock absorbers store and dissipate energy according to this same work-area relationship.

### Mattresses and trampolines
Elastic materials compress under load, storing energy proportional to the square of the compression.

### Molecular bonds
Near equilibrium, chemical bond potential energy is often approximated as this same quadratic (harmonic) form.
