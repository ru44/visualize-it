---
title: Acid–base titration curve
summary: >-
  As you add base drop by drop to an acid, pH creeps up slowly at first,
  then leaps almost straight up right at the point where the two have
  exactly cancelled — and that leap is what makes titration work.
parameters:
  Ca: acid concentration Cₐ
  Va: acid volume Vₐ
  Cb: base concentration C_b (titrant)
  x: volume of base added
variables:
  - acid concentration — moles of acid per litre, before any base is added
  - acid volume — how much acid solution you started with
  - base concentration — moles of base per litre in the solution being added
  - equivalence volume — the volume of base that exactly cancels the acid
---

## Try it

1. Drag the «volume of base added» slider from zero. Watch pH barely move at first.
2. Keep dragging toward the equivalence point. Watch pH leap almost vertically.
3. Raise «acid volume Va» or «acid concentration Ca». Watch the equivalence point shift further along the slider.

## Real-life examples

1. **Standardising vinegar against a base.** 25 mL of 0.1 mol/L acetic acid titrated with 0.1 mol/L NaOH needs 25 mL of base to reach equivalence.
2. **A more concentrated acid sample.** Just 10 mL of a stronger, 0.3 mol/L acid still needs 30 mL of the same 0.1 mol/L base — three times the concentration means three times the volume needed.
3. **A dilute acid titrated with a strong, concentrated base.** 50 mL of a weak 0.05 mol/L acid needs only 2.5 mL of a concentrated 1 mol/L base to reach equivalence — a tiny, precise addition.

## Test yourself

1. Find settings where the equivalence point falls at exactly 20 mL of base added.
2. Push the equivalence point out past 50 mL of base added.
3. Set the volume added to exactly the equivalence point — the spot where pH crosses 7.

## Intuition

Picture titrating 25 mL of vinegar, a weak-ish acid, against a base, adding it drop by drop: for a long time nothing dramatic seems to happen. On screen, drag the «volume of base added» slider from zero and watch the pH curve: at first it barely moves, because there is still far more acid than base and a little more base changes the ratio only slightly.

Keep dragging, though, and near the equivalence point the curve suddenly shoots upward almost vertically — a tiny extra volume of base swings the solution from strongly acidic to strongly basic in a single step. That steep jump happens in every strong acid–strong base titration, and watching where it sits on the slider tells you exactly how much base was needed to neutralise the acid.

## Formal

At the equivalence point, moles of acid and moles of base are exactly equal: $C_a V_a = C_b V_{eq}$. Before that point, leftover acid sets the pH; after it, leftover base does. Because the acid concentration $C_a$, in mol/L, multiplies a volume in millilitres, and the answer is again read as a concentration, the units of millimoles per millilitre and moles per litre cancel to the same number — you never need to convert units mid-calculation.

The equivalence point itself is found purely from the two starting amounts, with no need to measure pH at all: $V_{eq} = \dfrac{C_a V_a}{C_b}$. In practice, chemists find it experimentally instead, by watching for the sudden colour change of an indicator dye or the steep jump on a pH meter, both of which locate the same point this formula predicts.

## Advanced

The curve is symmetric and centred on pH 7 only for a strong acid and a strong base; a weak acid titrated with a strong base has a shallower, less symmetric curve with a buffering plateau before the jump, governed by the acid's own equilibrium rather than simple cancellation. The steep-jump idea still applies, but its height and midpoint shift with the acid's strength.

## Derivation

1. Moles of acid present is the acid's concentration times the volume you started with.
2. Moles of base added is the base's concentration times however much base has been added so far.
3. At the point where those two amounts are equal, the volume added is the equivalence volume, found by solving for it directly.

## Real world

### Standardising a solution of unknown concentration
Titrating an unknown acid against a base of known, precisely prepared concentration is the standard way chemists measure a concentration they don't already know.

### Choosing an indicator
An indicator dye is picked to change colour right at the pH where the curve is steepest, so a single drop of base makes the colour change happen at almost exactly the true equivalence point.

### Water and wastewater testing
Titration is used to measure acidity, hardness, and contaminant levels in water samples, from municipal treatment plants to home aquarium testing kits.

### Quality control in food and pharmaceuticals
Titration checks the acid content of products like vinegar and citrus juice, and the exact concentration of active ingredients in liquid medicines.
