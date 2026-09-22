---
title: Coulomb's law and the electric field
summary: >-
  Two charges push or pull along the line joining them, falling off with the
  square of the distance. Every charge fills the space around it with a field —
  the force per unit charge a test charge would feel there.
parameters:
  q1: charge q1
  q2: charge q2
  d: separation d
  px: test point x
  py: test point y
variables:
  - 'Coulomb''s constant, $8.99\times10^9\ \mathrm{N\,m^2/C^2}$'
  - the two point charges
  - 'distance between them, or between a charge and the field point'
  - electric field — force per unit charge at a point
---

## Intuition

Drag the black test charge around. The short arrows are the field: they point the way a small positive charge would be pushed, and they fade where the field is weak. Near either charge they crowd inward or outward; far away they blend into a gentle outward (or inward) flow from the pair.

Watch the thin force lines on the test charge — one pull toward q1, one toward q2 — and the thick arrow that is their sum. Flip q2 from negative to positive and the two thin lines swap from pulling together to pushing apart; the field arrows near the midpoint flip too.

## Formal

The force between two point charges is $F = k\dfrac{q_1q_2}{r^2}$, directed along the line joining them: repulsive if $q_1q_2>0$, attractive if $q_1q_2<0$.

The field of a point charge is $\mathbf{E} = k\dfrac{q}{r^2}\hat{\mathbf{r}}$; fields from multiple charges simply add, vector by vector — this is superposition.

## Advanced

Superposition holds because Maxwell's equations are linear in the sources: $\nabla\cdot\mathbf{E} = \rho/\varepsilon_0$ has a Green's-function solution that is a sum over point charges. The same inverse-square form falls out of Gauss's law applied to a sphere, since the flux through it is fixed while its area grows as $r^2$.

## Derivation

1. Coulomb's experimental law for two point charges.
2. Divide by a small test charge to define the field, independent of what probes it.
3. Superposition: each source contributes its own field, added as vectors.

## Real world

### Photocopiers and laser printers
A charged drum attracts toner particles exactly where light has (or has not) neutralised it.

### Lightning
Charge separation in a storm cloud builds a field strong enough to ionise air and discharge in a bolt.

### Electrostatic precipitators and spray painting
Charged particles are steered by an applied field onto a grounded surface.

### Atoms and bonds
The same $1/r^2$ attraction between nucleus and electrons (screened by other electrons) shapes chemical bonding.
