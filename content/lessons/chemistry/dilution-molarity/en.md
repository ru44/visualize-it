---
title: Molarity and dilution
summary: >-
  Diluting a solution never changes how many moles of solute are present — only
  the volume they are spread through, so concentration and volume trade off
  exactly.
parameters:
  C1: starting concentration C₁
  V1: starting volume V₁
  x: final volume V₂
variables:
  - molarity — moles of solute per litre of solution
  - volume before and after dilution
  - 'moles of solute, $n = C_1 V_1$, unchanged by adding solvent'
---

## Intuition

Drag the final-volume point x along the curve: as you add more solvent (larger V₂), the concentration C₂ traces a falling curve, never a straight line — doubling the volume exactly halves the concentration, tripling it exactly thirds the concentration. That shape, $y = k/x$, is the signature of “fixed quantity spread over a variable size”.

Raise C₁ or V₁ instead and the whole curve scales upward — you started with more moles of solute, so for any final volume the diluted concentration is higher. The moles you began with, $C_1V_1$, is the one number that survives dilution unchanged; everything else is just geometry.

## Formal

Molarity is defined $C = n/V$, so the moles present are $n = CV$. Dilution adds solvent only, so $n$ is constant: $C_1V_1 = n = C_2V_2$.

Solving for the new concentration, $C_2 = \dfrac{C_1V_1}{V_2}$ — an inverse relationship between concentration and final volume, exactly the curve you are dragging along.

## Advanced

The same bookkeeping — a conserved quantity partitioned across a changing extensive variable — underlies far more than chemistry: pressure and volume in an isothermal gas ($PV = \text{const}$), or density and volume for a fixed mass, all trace the same rectangular hyperbola.

## Derivation

1. Moles of solute in the original, concentrated solution.
2. Diluting adds only solvent — no solute is added or removed.
3. Same moles, larger volume, proportionally smaller concentration.

## Real world

### Lab work
Chemists routinely make a dilute working solution from a concentrated stock using exactly $C_1V_1 = C_2V_2$.

### Medicine dosing
IV drug concentrations are diluted to safe, precise levels using the same relationship.

### Cooking
Diluting concentrated juice or stock with water is dilution — the same mass of flavour compounds, spread thinner.

### Environmental science
Pollutant concentration in a river drops as it mixes with more water downstream — the pollutant load is conserved even as its concentration falls.
