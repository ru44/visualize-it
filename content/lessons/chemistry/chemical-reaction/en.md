---
title: 'Balancing a reaction: making water'
summary: >-
  Atoms are never created or destroyed in a reaction — they are only rearranged.
  The coefficients in a balanced equation say exactly how many molecules
  combine.
parameters:
  h2: H₂ molecules
  o2: O₂ molecules
  progress: reaction progress
variables:
  - number of hydrogen molecules you start with
  - number of oxygen molecules you start with
  - 'molar mass: 1.008 g/mol for H, 15.999 g/mol for O'
---

## Intuition

Drag the h2 and o2 sliders to set how many of each molecule are on the table, then scrub progress. Watch every ball on the left pair off: two H₂ and one O₂ always vanish together and two bent H₂O molecules appear on the right — never a leftover atom, never one created from nothing.

Push h2 up and o2 down (or the reverse) and the excess reactant stops reacting once the other one runs out — those molecules pick up a dashed “excess” ring and just sit there. That is a limiting reactant: whichever ingredient runs out first caps how much product you can make, no matter how much of the other you have.

## Formal

The balanced equation $2\mathrm{H_2} + \mathrm{O_2} \rightarrow 2\mathrm{H_2O}$ fixes the mole ratio $2:1:2$. The number of reaction events is $n = \min\!\left(\lfloor n(\mathrm{H_2})/2 \rfloor,\; n(\mathrm{O_2})\right)$, giving $2n$ water molecules.

Conservation of mass follows from conservation of atoms: total H atoms and total O atoms are identical before and after, so total mass is identical before and after — $\sum m_{\text{reactants}} = \sum m_{\text{products}}$.

## Advanced

Balancing is really solving a linear system: assign unknown coefficients to each species and require the atom count of each element to match on both sides. For simple reactions this is done by inspection; for redox reactions with many species it is solved via the null space of the atomic composition matrix.

## Derivation

1. Start with unknown whole-number coefficients.
2. Count each element separately on both sides; the counts must match.
3. Smallest whole-number solution: the familiar $2\mathrm{H_2} + \mathrm{O_2} \rightarrow 2\mathrm{H_2O}$.

## Real world

### Rocket fuel
Liquid hydrogen and liquid oxygen burn in exactly this reaction to power upper-stage rocket engines.

### Fuel cells
Run the reaction in reverse-controlled steps and you extract electrical energy instead of heat — the basis of hydrogen fuel cells.

### Cooking and baking
Recipe ratios are stoichiometry: too little of one ingredient and the rest goes to waste, exactly like a limiting reactant.

### Industrial synthesis
Chemical plants deliberately feed an excess of the cheaper reactant so the expensive one is used as completely as possible.
