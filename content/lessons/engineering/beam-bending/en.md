---
title: Beam bending
summary: >-
  A shelf or a diving board bends more from being longer than from any
  other change you could make to it — this lesson shows why.
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

## Try it

1. Start with $F$ = 1000 N, $L$ = 2 m, $E$ = 200 GPa and $I$ = 20 cm⁴. Drag $x$ from 0 to 2. The readout f(x) is the sag in millimetres: it climbs from 0 at the wall to about 66.7 at the tip.
2. Keep $x$ = 2 and raise $F$ (the end load) to 1500 N. Half as much load again gives half as much sag again: f(x) reads 100.
3. Set $F$ back to 1000 N, raise $L$ (the beam's length) to 3 m and drag $x$ to 3. The beam is only half as long again, yet f(x) reads 225 — more than three times the sag. Length matters far more than load.

## Real-life examples

1. **A wooden bookshelf.** A 1 m shelf loaded with about 20 kg of books (≈200 N) and made of soft wood (E ≈ 10 GPa) sags about 13 mm at the free end, enough to see — which is why thin wooden shelves need a thicker cross-section or a support in the middle.
2. **A diving board.** A springboard about 4 m long dips about 244 mm at the tip under an 80 kg diver (≈800 N), stiffened by a fiberglass-like material (E ≈ 70 GPa) so it snaps back rather than staying bent.
3. **A steel support beam.** A 2 m steel I-beam (E ≈ 200 GPa) carrying a heavy 5,000 N load sags only about 33 mm at the tip. Lower $E$ to 10 GPa, soft wood, and the same beam would sag 20 times as far: steel's stiffness and the I-beam shape together resist bending far more.

## Test yourself

1. Drag $x$ to the tip ($x = L$) and find a combination of $F$, $L$, $E$ and $I$ that gives a tip deflection of about 50 mm.
2. Using a beam under 3 m long, find a load and material weak enough to make the tip sag more than 100 mm.
3. Drag $x$ to the tip and find values of $F$, $L$, $E$ and $I$ that keep the tip deflection under 1 mm.

## Intuition

Picture a wooden bookshelf, about 1 meter long, sagging under 20 kg of books — roughly 200 newtons pressing down at the far edge. The curve on screen is $y$, how far each point on the beam has bent, plotted along its length; drag $F$, the load at the end, up and the tip droops further. The curve is steepest at that free end, but the beam is bent hardest back at the wall, where the load has the longest lever arm.

Now drag $L$, the beam's length, up instead: the droop grows far faster than it did with $F$ — doubling the length makes the tip sag roughly eight times as far. Raise $E$ or $I$ instead, the material's stiffness or the cross-section's shape, and the same load bends the beam much less, which is exactly why fixing a sagging shelf means a thicker board, not a stronger clamp.

## Formal

The deflection along the beam is $y(x) = \frac{Fx^2(3L-x)}{6EI}$, and the tip deflection is $y_{\max} = \frac{FL^3}{3EI}$: stiffness against bending scales with the product $EI$, never with $E$ or $I$ alone.

Because $y_{\max}$ grows with $L^3$, a beam twice as long sags eight times as far under the same load — length dominates every other choice in the design.

## Advanced

Doubling a beam's height makes $I$ eight times larger for a rectangular section, while doubling its width only doubles it. Better still, shaping the same amount of material into a taller, thinner cross-section (an I-beam) pushes material away from the centre where it barely resists bending, raising $I$ far more per unit of material than a solid rectangle ever could.

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
