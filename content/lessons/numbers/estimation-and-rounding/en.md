---
title: Estimation and rounding
summary: Estimate a total from a small sample, then round it to a precision the inputs can support.
parameters:
  A: estimated scalp area A (cm²)
  rho: estimated density ρ (hairs per cm²)
  s: significant figures s
variables:
  - estimated area covered by hair, in square centimetres
  - estimated average number of hairs per square centimetre
  - estimated total number of hairs
---

## Try it

1. Set A to 500 and rho to 200. Multiplying gives an estimate of 100,000 hairs. The dotted patch illustrates area and density; its dots are not a full hair count.
2. Set A to 350 and rho to 300. The product is 105,000. Compare s = 1 with s = 3: the reported values are 100,000 and 105,000.
3. Keep rho fixed and increase A. The estimate rises because the same average density now covers more area.

## Real-life examples

1. **A first estimate.** An assumed area of 500 cm² and density of 200 hairs per cm² give 100,000 hairs. With s = 1, report about one hundred thousand.
2. **Different assumptions.** An area of 600 cm² and density of 150 give 90,000. The setting s = 2 keeps two significant figures; it does not prove that the inputs are that precise.
3. **A rounded product.** An area of 350 cm² and density of 300 give 105,000. To one significant figure, this rounds to 100,000.

## Test yourself

1. Choose A and rho so their product is within 8000 of 100,000.
2. Set s to 1.
3. Make the unrounded estimate greater than 150,000.

## Intuition

Instead of counting every hair, estimate how many grow in one square centimetre and how much area is covered. If there are about 200 hairs per square centimetre over about 500 square centimetres, multiply 200 by 500. The estimated total is 100,000.

The multiplication is exact for the numbers entered, but those numbers came from estimates. Showing more digits in the answer does not improve the original measurements. The s control chooses how many significant figures to report, starting from the first nonzero digit.

For example, 105,000 rounded to one significant figure becomes 100,000. To three significant figures it remains 105,000. Choose the precision using what you know about the inputs, not how many digits the screen can display.

## Formal

The estimated total is $N\approx A\times\rho$, where A is area and rho is average density. The area units cancel the per-area units of the density, leaving a count.

To round to s significant figures, start counting at the first nonzero digit. Keep s digits and inspect the next digit: if it is 5 or greater, round up; otherwise keep the retained digits unchanged. For the whole-number counts here, replace the remaining places with zeros.

## Advanced

Uncertainty in both inputs affects the product. If each input could be half to twice its estimate, the product could be one quarter to four times its estimate. This is a range of possible values, not a claim about how likely each value is. More careful uncertainty estimates require information about the measurements and their dependence.

## Derivation

1. Multiply the estimated area, 500 cm², by the estimated density, 200 hairs per cm².
2. The product is 100,000 hairs; it remains an estimate because the inputs are estimates.
3. Scientific notation makes the one-significant-figure report explicit: $1\times10^5$.

## Real world

### Counting a crowd

Estimate the occupied area and the average people per square metre. Different densities across the area can make one average misleading.

### Materials

Area times material needed per square metre gives an initial quantity estimate. Allow separately for waste and measurement uncertainty.

### Reporting measurements

A rounded result should reflect the quality of the measurements. The number of displayed digits alone does not establish accuracy.
