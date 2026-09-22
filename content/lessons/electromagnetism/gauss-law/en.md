---
title: Gauss's law and a charged sphere
summary: >-
  This shortcut predicts the electric field around a charged object — like a
  charged sphere or a Van de Graaff dome — without adding up every tiny piece
  of charge by hand.
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

## Try it

1. Picture a small charged demonstration ball, 20 nC of charge spread over a 0.5 m sphere.
2. Drag «distance from the centre x» outward from the middle. The field climbs while you're still inside the sphere, then starts falling once you pass its surface.
3. Now raise «sphere radius R» while the charge stays fixed. The peak field at the surface drops — the same charge is now spread over more space.

## Real-life examples

1. **A small charged demonstration ball.** With 20 nC spread over a 0.5 m sphere, the field 2 m from the centre is a modest 45 V/m.
2. **A Van de Graaff dome.** Charged to 80 nC on a compact 0.2 m sphere, the field just 1 m from the centre reaches over 700 V/m.
3. **A large charged weather balloon.** With 50 nC spread over a bigger 1.5 m sphere, the field halfway to the surface (0.5 m out) is about 67 V/m — gentler, because the charge is more spread out.

## Test yourself

1. Move outside the sphere and find a charge and distance where the field is about 100 V/m.
2. Using a large sphere (radius at least 1 m), find a point inside it where the field is about 50 V/m.
3. Move far enough away, or use a small enough charge, that the field drops to about 2 V/m.

## Intuition

Picture a small charged ball used in physics demonstrations, carrying 20 nC of charge spread over a sphere half a metre across. Drag «distance from the centre x» outward from the middle: while you are still inside the sphere, the field climbs in a straight line, because moving out sweeps past more and more of the charge. The moment $x$ passes the sphere's radius $R$, every bit of charge is already enclosed, and the field starts falling off instead, the same shape as in Coulomb's law.

Now raise «sphere radius R» while the charge stays fixed: the same total charge is now smeared over a bigger sphere, so the peak field right at the surface drops, even though the amount of charge never changed — only how spread out it is.

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
