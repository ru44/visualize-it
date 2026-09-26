---
title: Estimation and rounding
summary: >-
  Estimate how many hairs are on a head by multiplying two rough numbers
  together, then round the answer honestly to show how sure you really are.
parameters:
  A: scalp area A (cm²)
  rho: hair density ρ (hairs per cm²)
  s: significant figures kept s
variables:
  - the area covered by hair, in square centimetres
  - the density of hair, in hairs per square centimetre
  - the estimated number of hairs
---

## Try it

1. Set A to 500 and rho to 200: the grid fills to show the multiplication, and the big number reads 100,000 — a full, round estimate.
2. Raise s from 1 to 4: watch the same number get printed with more and more digits kept sharp, and the rest fading — those later digits were never really known.
3. Push A to 700 and rho to 300: the estimate jumps past 200,000, showing how sensitive a Fermi estimate is to the rough numbers you started with.

## Real-life examples

1. **An average adult head.** A = 500, rho = 200, s = 1: about 500 cm² of scalp times 200 hairs per cm² gives roughly 100,000 hairs — a number worth trusting to one significant figure only.
2. **A larger head, coarser hair.** A = 600, rho = 150, s = 2: about 600 cm² times 150 hairs per cm² gives roughly 90,000 hairs, reported to two significant figures.
3. **A smaller head, very fine hair.** A = 350, rho = 300, s = 1: about 350 cm² times 300 hairs per cm² gives roughly 100,000 hairs again — a different head, a similar answer.

## Test yourself

1. Set the area and density so the estimate lands close to 100,000 hairs.
2. Set the rounding to keep only 1 significant figure.
3. Find an area and density whose estimate passes 150,000.

## Intuition

You cannot count every hair on a head, but you can estimate: guess the area of scalp it covers, guess how many hairs grow per square centimetre, and multiply. On screen, dragging A stretches the grid representing scalp area, and dragging rho packs more or fewer dots into each square centimetre of it — the big readout is simply those two rough numbers multiplied together.

Because both A and rho were guesses, the product is a guess too — a good one, but not exact to the last digit. Reporting "100,000" tells the truth about that: 1 significant figure, one meaningful digit. Reporting "103,742" would be dishonest, pretending to a precision the estimate never had. Drag s up and watch extra digits appear and then fade to grey — those greyed digits are exactly the ones a Fermi estimate cannot actually promise you.

## Formal

A Fermi estimate multiplies rough quantities to get an order-of-magnitude answer: here $N \approx A\times\rho$, area times density.

Rounding to $s$ significant figures keeps only the first $s$ meaningful digits and replaces the rest with zeros (adjusting the power of ten as needed), so the reported precision matches how well the inputs were actually known.

## Advanced

When two independent estimates each carry roughly a factor of 2 uncertainty, their product can carry closer to a factor of 4, since the errors compound multiplicatively rather than adding — which is exactly why a serious Fermi estimate is stated as an order of magnitude, not a precise count, however clean the arithmetic looks.

## Derivation

1. Multiply the rough area by the rough density: 500 times 200.
2. That multiplication gives 100,000.
3. Written to one significant figure, that is $1\times10^{5}$.

## Real world

### Job interviews
"How many piano tuners are in Chicago?" is a classic Fermi-estimate question — nobody expects an exact count, only a sound chain of rough multiplications.

### Engineering budgets
Early cost estimates for a bridge or a building multiply rough quantities (length, material per metre, cost per tonne) the same way, refined later as real numbers arrive.

### Science reporting
A measurement reported as "about 7 million" instead of a fake-precise "7,032,481" is respecting significant figures — not claiming to know digits that were never measured.

### Grains of sand, leaves on a tree
Both are classic Fermi estimates: multiply a rough count per small patch by the number of patches, and round the answer to as many digits as you can actually justify.
