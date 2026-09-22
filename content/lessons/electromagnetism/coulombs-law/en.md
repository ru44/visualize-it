---
title: Coulomb's law and the electric field
summary: >-
  This is the rule behind static shocks, photocopiers, and how atoms hold
  together: it predicts the push or pull between two charges from how far
  apart they are.
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

## Try it

1. Picture two balloons, each rubbed on hair until they hold about 3 µC of charge, held 1.5 m apart.
2. Drag «charge q2» from negative to positive. The black test charge, and the field arrows around it, flip from being pulled in to being pushed away.
3. Drag «separation d» apart. The force shrinks fast — twice the distance means a quarter of the force.

## Real-life examples

1. **Two balloons rubbed on hair.** Charged oppositely to about ±3 µC and held 1.5 m apart, they pull toward each other — the same static cling that makes a balloon stick to a wall.
2. **Two charged metal spheres.** Charged alike to +5 µC each and set 4 m apart, they push each other away with a small but real force.
3. **Charge patches inside a storm cloud.** Oppositely charged regions, roughly −4 µC and +2 µC, sit 6 m apart before a lightning bolt jumps between them.

## Test yourself

1. Pull the two charges to a separation where the force between them is about 0.05 N.
2. Keep the charges alike in sign and at least 3 m apart, but still push them apart with a force of at least 0.02 N.
3. Bring the charges close enough that the force between them passes 0.2 N.

## Intuition

Picture two balloons, each charged to about 3 µC after a good rub on your hair, held 1.5 m apart. Drag the black test charge around the scene: the short arrows are the field, pointing the way a small positive charge would be pushed, and they fade out where the field is weak. Near either balloon the arrows crowd in or out; farther away they blend into one gentle flow from the pair.

Now watch the thin force lines on the test charge, one pulling toward «charge q1» and one toward «charge q2», with a thick arrow showing their sum. Drag «charge q2» from negative to positive: the two thin lines swap from pulling together to pushing apart, and the field arrows near the midpoint flip too.

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
