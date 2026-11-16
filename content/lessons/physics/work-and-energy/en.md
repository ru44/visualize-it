---
title: Work as the area under a force curve
summary: 'Calculate the work needed to stretch an ideal spring by measuring the area under its applied-force curve.'
parameters:
  k: 'k — spring stiffness'
  a: 'a — starting extension'
  b: 'b — final extension'
variables:
  - 'applied force needed for slow stretching, opposite to the spring force'
  - 'spring stiffness in newtons per metre'
  - 'applied work from extension a to b'
---

## Try it

1. Set k = 1.5 N/m, a = 0 m and b = 5 m. The applied force rises from zero to 7.5 N, and the triangular area is 18.75 J.
2. Keep k and a fixed and reduce b to 2.5 m. Halving the extension halves both triangle dimensions, so the work becomes 4.6875 J, one-quarter as much.
3. Set a = 2 m and b = 5 m. The shaded region is now a trapezoid, giving 15.75 J of additional work. It excludes the energy already stored at extension 2 m.

## Real-life examples

1. **A soft model spring.** With k = 0.3 N/m, stretching from 0 to 6 m requires 5.4 J in the ideal linear model.
2. **An intermediate stiffness.** With k = 1.5 N/m, stretching from 0 to 5 m requires 18.75 J.
3. **A stiffer model spring.** With k = 3.5 N/m, stretching from 0 to 4 m requires 28 J. These large extensions illustrate the formula; they are not specifications for real bows, rubber bands or suspension springs.

## Test yourself

1. Make the work from a to b approximately 20 J; a need not be zero.
2. Choose a within 0.3 m of zero and work within 2 J of 24 J.
3. Keep the final extension b below 5 m and make the work greater than 25 J.

## Intuition

An ideal spring resists more strongly as it is stretched farther. To stretch it slowly, we apply a force matching that resistance. If the extension doubles, the final force doubles too. Work depends on the force over the whole motion, so we cannot multiply the final force by the full extension: that would overcount the smaller forces used earlier.

For a stretch from zero, the force graph is a straight line and the work is a triangular area. Its average force is half the final force. For a stretch starting at a nonzero extension, the work is the area between the two bounds. The 3D view illustrates stretching and the energy change; the displayed energy amount is not an additional force or an independent source of energy.

## Formal

For an ideal Hooke's-law spring with extension x, the spring's force is $F_{\mathrm{spring}}=-kx$. The graph instead shows the opposing applied force $F_{\mathrm{applied}}=kx$ for slow stretching with negligible change in kinetic energy. The positive constant k has units N/m.

Taking elastic potential energy as zero at the unstretched length, $U(x)=\tfrac12kx^2$. Applied work from extension a to b is $W_{\mathrm{applied}}=\int_a^b kx\,dx=\tfrac12k(b^2-a^2)=\Delta U$. The spring does the opposite work. One joule is one newton metre.

## Advanced

For a conservative spring force, Fspring = −dU/dx. A nonlinear spring can still have potential energy, but its force-area relationship need not be triangular or quadratic. Friction and internal losses mean not all applied work is recovered on release. With b < a, the signed applied work is negative in a controlled return; use a ≤ b to study stretching in the displayed animation.

## Derivation

1. For slow extension, the applied force kx balances the spring's restoring force in the opposite direction.
2. Add the small work contributions F dx from zero extension to the final extension.
3. Integrating kx gives half k times extension squared, the increase in elastic potential energy for this ideal spring.

## Real world

### Spring mechanisms

A measured force-extension curve can be integrated to estimate work. A linear approximation may apply only over a limited range of extensions.

### Springs and dampers

A spring stores recoverable elastic energy in an ideal model. A damper dissipates mechanical energy; the two components do not perform the same role.
