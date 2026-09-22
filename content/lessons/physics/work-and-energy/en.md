---
title: Work as the area under a force curve
summary: >-
  This is why drawing a stiff bow takes far more effort than a soft one,
  and where that effort goes: stored energy ready to launch the arrow.
parameters:
  k: spring constant k
  a: a (start displacement)
  b: b (end displacement)
variables:
  - 'spring restoring force, proportional to stretch (Hooke''s law)'
  - spring stiffness
  - work done stretching from $a$ to $b$ — the shaded area
---

## Try it

1. Watch the shaded triangle under the rising force line, from a to b.
2. Drag "b (end displacement)" outward from a = 0. Watch the triangle grow both wider and taller.
3. Now raise "spring constant k". The same stretch needs a taller triangle, so more work.

## Real-life examples

1. **Stretching a rubber band.** A soft 0.3 N/m band stretched 6 m (imagine a giant demo band) takes about 5.4 J of work — gentle resistance throughout.
2. **A trampoline spring.** A moderately stiff 1.5 N/m spring stretched 5 m takes nearly 19 J, resisting more strongly the further it's pulled.
3. **Drawing an archery bow.** A stiff 3.5 N/m "bow spring" pulled back 4 m takes 28 J of work, stored ready to launch the arrow.

## Test yourself

1. Make the work done exactly 20 J (starting from a = 0).
2. Starting from a = 0, find a spring constant and stretch distance where the work done is exactly 24 J.
3. Get the work above 25 J while keeping the total stretch under 5 m.

## Intuition

Picture drawing a stiff bow-like spring, constant 3.5 N/m, back 4 metres: that takes 28 joules of work, stored ready to launch an arrow. Drag "b (end displacement)" outward from a = 0: the force line rises steadily and the shaded triangle grows, not just wider but taller too, so the area, and hence the work, grows faster than the displacement itself.

Now raise "spring constant k" to stiffen the spring: the same stretch needs a taller triangle of force, so the work to reach any given displacement increases in direct proportion to k — a stiffer spring stores more energy for the same stretch.

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
