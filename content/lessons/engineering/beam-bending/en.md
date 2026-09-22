---
title: Beam bending
summary: >-
  A beam fixed at one end and loaded at the other bends into a curve set by
  the load, the beam's length, its material, and the shape of its
  cross-section — and length matters far more than any of the others.
parameters:
  F: F — end load
  L: L — beam length
  E: E — Young's modulus (stiffness of the material)
  I: I — second moment of area (shape of the cross-section)
  x: x — position along the beam
variables:
  - F — the load pushing down on the free end of the beam
  - L — the length of the beam, from the wall to the free end
  - E — Young's modulus, how stiff the material itself is
  - I — the second moment of area, how the cross-section's shape resists bending
  - y — the deflection, how far a point on the beam has moved from straight
  - M — the bending moment at a point, the internal twisting force trying to bend it there
---

## Intuition

Drag F up and the tip droops further, in a curve that is flattest near the wall and steepest at the free end — that end carries no more bending force beyond itself, so it tips over the most. Drag L up instead and the droop grows much faster than F does: doubling the length roughly makes the tip sag eight times as far.

Now drag E or I up: the same load bends the beam far less, because a stiffer material (higher E) or a cross-section shaped to resist bending (higher I) both fight the load harder. That is exactly why bookshelves sag under heavy books and why the fix is a thicker shelf, not a stronger clamp.

## Formal

The deflection along the beam is $y(x) = \frac{Fx^2(3L-x)}{6EI}$, and the tip deflection is $y_{\max} = \frac{FL^3}{3EI}$: stiffness against bending scales with the product $EI$, never with $E$ or $I$ alone.

Because $y_{\max}$ grows with $L^3$, a beam twice as long sags eight times as far under the same load — length dominates every other choice in the design.

## Advanced

Doubling a beam's height roughly doubles $I$ for a rectangular section, but shaping the same amount of material into a taller, thinner cross-section (an I-beam) pushes material away from the centre where it barely resists bending, raising $I$ far more per unit of material than a solid rectangle ever could.

## Derivation

1. The internal bending moment at a distance $x$ from the wall is $M(x) = F(L-x)$, largest at the wall and zero at the free end.
2. Beam theory relates moment to curvature by $EI\,y''(x) = M(x) = F(L-x)$.
3. Integrating twice, with the beam flat and unmoved at the wall ($y(0) = y'(0) = 0$), gives $y(x) = \frac{Fx^2(3L-x)}{6EI}$.

## Real world

### Bridges and I-beams
Structural I-beams put most of their material as far as possible from the centre line, maximizing $I$ for a given weight of steel — exactly the shape bending theory says pays off most.

### Diving boards
A diving board is a cantilever like this one: a longer board bends and springs back much more than a shorter one under the same diver, by the cube-of-length rule.

### Aircraft wings
Wing spars are sized by exactly this bending calculation, balancing $E$, $I$ and length against the lift loads a wing must survive without excessive flex.

### Bookshelves
A shelf sagging under the weight of books is this same formula at work; adding a support in the middle effectively halves $L$, cutting the sag by roughly a factor of eight.
