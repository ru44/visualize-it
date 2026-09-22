---
title: Gauss's law and a charged sphere
summary: >-
  Sum up the electric field poking through any closed surface and it depends
  on nothing outside that surface — only the charge trapped inside it.
parameters:
  Q: total charge Q
  R: sphere radius R
  x: distance from the centre x
variables:
  - electric flux
  - electric field vector
  - total charge and the charge enclosed by the Gaussian surface
  - permittivity of free space
  - closed-surface (or closed-loop) integral sign
---

## Intuition

Drag $x$ out from the centre and watch the field climb in a straight line while you're still inside the sphere — more and more charge is enclosed the farther out you go, growing with the volume you've swept past. The moment $x$ crosses $R$, every bit of charge is already enclosed, and the curve switches to falling off as $1/x^2$ instead, the familiar Coulomb's-law shape.

Now raise $R$ while keeping $Q$ fixed: the same total charge is smeared over a bigger sphere, so the peak field right at the surface drops, even though the charge itself never changed — only how spread out it is.

## Formal

Gauss's law: the flux of $\mathbf{E}$ through any closed surface equals the enclosed charge divided by $\epsilon_0$, $\Phi_E = \oint \mathbf{E}\cdot d\mathbf{A} = Q_{enc}/\epsilon_0$.

Choosing a sphere of radius $x$ as that surface exploits the charge distribution's spherical symmetry, turning the flux integral into a simple product, $E(x)\cdot 4\pi x^2$.

## Advanced

Gauss's law is one of Maxwell's equations and holds for any charge distribution and any closed surface, not just spheres — the trick of a spherical Gaussian surface only works this simply because the charge here is itself spherically symmetric, so $\mathbf{E}$ is forced to be radial and constant in magnitude on every such sphere. Without that symmetry the same law is still true, but the flux integral no longer collapses to elementary algebra.

## Derivation

1. By spherical symmetry the field is radial and uniform in magnitude over a sphere of radius $x$, so the flux integral collapses to $E(x)$ times the sphere's area.
2. Inside the sphere, a uniform charge density means the enclosed charge scales with the volume swept out, $x^3/R^3$, giving a field that rises linearly with $x$.
3. Outside the sphere, all of $Q$ is already enclosed regardless of $x$, giving back the ordinary inverse-square Coulomb field.

## Real world

### Faraday cages
A closed conducting shell keeps its interior field at zero regardless of the charge or field outside, which is exactly what Gauss's law demands for any charge-free enclosed region.

### Van de Graaff generators
Extra charge sprayed onto a hollow conducting sphere migrates entirely to the outer surface, leaving the field and potential inside constant — a direct consequence of the same law.

### Coaxial cables
Swapping the spherical Gaussian surface for a cylindrical one gives the field between a cable's inner conductor and its outer shield by the identical symmetry argument.

### Recovering Coulomb's law
Shrinking the charged sphere to a point recovers the $1/x^2$ field of a single point charge studied in the 'coulombs-law' lesson — Gauss's law contains it as a special case.
