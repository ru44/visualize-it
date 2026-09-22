---
title: 'Balancing a reaction: making water'
summary: >-
  Balancing a reaction tells you exactly how many molecules of each
  ingredient combine, so nothing is wasted and nothing appears from nowhere —
  the same idea behind following a recipe.
parameters:
  h2: H₂ molecules
  o2: O₂ molecules
  progress: reaction progress
variables:
  - number of hydrogen molecules you start with
  - number of oxygen molecules you start with
  - 'molar mass: 1.008 g/mol for H, 15.999 g/mol for O'
---

## Try it

1. Drag «h2» and «o2» to set how many molecules of each are on the table.
2. Drag «reaction progress» from 0 to 1. Watch molecules pair off two at a time and water molecules appear.
3. Push one gas far higher than the other. The excess molecules stop reacting and pick up a dashed "excess" ring once the other runs out.

## Real-life examples

1. **Mixing hydrogen and oxygen in the exact ratio the equation calls for.** 4 H₂ molecules and 2 O₂ molecules react completely with nothing left over — the 2:1 ratio from the balanced equation.
2. **Too much oxygen in the tank.** 2 H₂ molecules and 6 O₂ molecules: hydrogen runs out first and most of the oxygen just sits there unreacted.
3. **A rocket engine halfway through its burn.** 10 H₂ molecules and 2 O₂ molecules, reaction halfway done: oxygen will run out first, capping how much water can ever form.

## Test yourself

1. Mix hydrogen and oxygen in the exact 2:1 ratio, with nothing wasted.
2. Set up a mixture with oxygen so far in excess that at least 3 O₂ molecules are left over unreacted.
3. Run the reaction to completion and produce exactly 8 water molecules.

## Intuition

Think of a recipe that needs exactly 2 eggs for every 1 cup of flour: bring 4 eggs and 6 cups of flour, and you can only make two batches before the eggs run out, no matter how much flour is left. On screen, drag «h2» and «o2» to set how many hydrogen and oxygen molecules sit on the table, then drag «reaction progress» from 0 to 1 and watch pairs of balls vanish together while new, bent water molecules appear.

Push «h2» much higher than «o2» and, once the reaction runs, the leftover hydrogen molecules pick up a dashed ring and just sit there unreacted — the oxygen ran out first and capped how much water could form. Whichever ingredient runs out first is called the limiting reactant, and it decides how much product you get, no matter how much of the other ingredient is sitting around.

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
