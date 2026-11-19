---
title: 'The second law: why a gas spreads out and does not gather again'
summary: 'Count the ways molecules can be divided between the two halves of a box, and use that count to explain why an uneven gas spreads out.'
parameters:
  nLeft: 'n_L — molecules in the left half'
  nRight: 'n_R — molecules in the right half'
  perm: 'partition opening, in percent'
variables:
  - 'entropy'
  - 'Boltzmann constant, 1.38×10⁻²³ J/K'
  - 'multiplicity: the number of microscopic arrangements that match this split'
  - 'number of molecules in the left half'
  - 'number of molecules in the right half'
  - 'total number of molecules, n_L + n_R'
---

## Try it

1. Set n_L = 90 and n_R = 10. The readout shows S ≈ 32.51 k_B, while the maximum for 100 molecules is 69.31 k_B. The bar is less than half full.
2. Set n_L = 50 and n_R = 50. The total is still 100, and now S equals the maximum, 69.31 k_B. The bar is full.
3. Return to n_L = 90 and n_R = 10 and change the partition opening. The entropy readout stays the same: the opening controls how readily molecules cross, not how many arrangements a split has. In the 3D view, a wider opening lets the two sides balance sooner.

## Real-life examples

1. **Gas released at one side.** With n_L = 95, n_R = 5 and the partition 40% open, S ≈ 19.85 k_B, far below the maximum of 69.31 k_B. Molecules can cross, so the split moves toward equal numbers.
2. **A fully mixed gas.** With 50 molecules on each side and the partition 80% open, S is at its maximum of 69.31 k_B. Molecules still cross, but the numbers stay close to equal.
3. **A nearly closed partition.** With n_L = 80, n_R = 20 and the partition 2% open, S ≈ 50.04 k_B. The uneven split lasts a long time because few molecules can cross. Closing the partition does not lower the entropy; it slows the change.

## Test yourself

1. Give the two halves the same number of molecules.
2. Raise S above 60 k_B while the two counts differ by more than 10.
3. Keep more than 90 molecules on the left with the partition less than 5% open.

## Intuition

Put 4 numbered molecules in a box with two halves. Each molecule can be on the left or on the right, so there are 2 × 2 × 2 × 2 = 16 arrangements. If the molecules move freely, each arrangement is equally likely. Only 1 arrangement has all four on the left. Six arrangements have two on each side. An even split is therefore six times as likely as “all on the left”. No single arrangement is favoured; the even split wins because more arrangements produce it. The number of arrangements that match a split is called its multiplicity.

With 100 molecules the difference is far larger. A 95/5 split can happen in about 75 million ways, and a 50/50 split in about 10²⁹ ways. Molecules that can cross the partition pass from one arrangement to another, so the gas is almost always found near the even split. A return to 95/5 is not forbidden, only very rare. For the roughly 10²³ molecules in a real sample of gas, it is so rare that it is never observed. Entropy measures the multiplicity on a logarithmic scale. In the picture, the two groups of dots show the proportions on each side, not one dot per molecule. The sliders set the two counts directly, so the picture shows a chosen state and not motion over time. The bar compares the entropy of that state with the largest value possible for the same total.

## Formal

Entropy is defined by $S=k_B\ln\Omega$. Here $\Omega$ is the multiplicity, and $k_B$ is the Boltzmann constant, 1.38×10⁻²³ J/K. For N molecules with $n_L$ on the left and $n_R$ on the right, $\Omega=N!/(n_L!\,n_R!)$. The logarithm makes the entropies of two independent systems add, while their multiplicities multiply.

For large numbers, Stirling's approximation gives $S/k_B\approx N\ln N-n_L\ln n_L-n_R\ln n_R$, with $N=n_L+n_R$. For a fixed total this is largest at $n_L=n_R$, where it equals $N\ln 2$. The readout uses the approximation: at 90 and 10 it gives 32.51, while the exact count gives 30.48. The second law states that the entropy of an isolated system with very many particles does not decrease.

## Advanced

The second law is statistical. Chance differences between the two sides are typically of the order of the square root of N, so they are noticeable for 100 molecules and far too small to detect for 10²³. This model counts only which half each molecule occupies, with equal halves and the same temperature throughout. The entropy of a real gas also depends on how energy is shared among the molecules, which is what links this count to heat flow from hot to cold.

## Derivation

1. Count the arrangements. There are N! orderings of the molecules, and reordering the molecules within the left half or within the right half does not change which half each one occupies.
2. Take the logarithm and multiply by the Boltzmann constant to obtain entropy in joules per kelvin.
3. For large numbers, replace the logarithm of each factorial by Stirling's approximation. The remaining expression is largest when the two counts are equal.

## Real world

### Smells and mixing

A scent released in one corner spreads through a room, and milk stirred into tea does not separate again. Spread-out arrangements vastly outnumber gathered ones.

### Refrigerators

A refrigerator lowers the entropy of its contents by doing work and passing more heat to the room. The total entropy of contents and room still rises.

### Engines

Heat released by burning fuel cannot all be converted to work, because the exhaust and surroundings must gain at least as much entropy as the hot gas loses.

### Separating mixtures

Separating air into oxygen and nitrogen or removing salt from seawater lowers the entropy of the mixture, so it always requires work.
