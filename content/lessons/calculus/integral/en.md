---
title: Integral
summary: 'Approximate accumulation with rectangles, then take the limit as their widths shrink.'
parameters:
  n: 'n — number of rectangles'
  a: 'a — starting bound'
  b: 'b — ending bound'
variables:
  - 'a, b: starting and ending inputs; their order matters'
  - 'dx: limiting width; each finite strip has width Δx'
  - 'f(x) dx: infinitesimal signed contribution'
---

## Try it

1. In the 2D view, set a = 0, b = 4 and n = 4. The left-endpoint heights are 0, 1, 4 and 9, each with width 1. Their sum is 14; the integral is about 21.3333.
2. Keep the bounds and increase n to 50, then 500. The sums are about 20.6976 and 21.2694. The remaining error shrinks but is not zero.
3. Keep n = 500 and set a = 3, b = 1. The integral becomes −26/3. Reversing the bounds reverses the sign; use the 2D view for reversed bounds.

## Real-life examples

1. **Four rectangles.** From 0 to 4 with n = 4, the sum 14 underestimates 64/3 by about 7.3333.
2. **A shorter interval.** From 1 to 3 with n = 50, the left sum is 8.5072, compared with the integral 26/3 ≈ 8.6667.
3. **Many rectangles.** From 0 to 5 with n = 500, the sum is about 41.54175, compared with 125/3 ≈ 41.66667. More rectangles give an approximation, not an exact finite sum.

## Test yourself

1. Choose bounds whose integral is within 0.3 of 9.
2. Use more than 100 rectangles and make the integral greater than 20.
3. Make the integral negative by choosing a greater than b in the 2D view.

## Intuition

To estimate the area under x² from 0 to 4, divide the interval into four strips of width 1. Use the curve's value at the start of each strip as its rectangle height. The heights are 0, 1, 4 and 9, so the total is 14. Because the curve rises across each strip, these rectangles miss part of the area.

Narrower strips follow the curve more closely. Their sums approach a value even though every finite estimate can still have error. That limiting accumulation is the definite integral. Changing n changes the approximation; changing the bounds a and b changes the quantity being accumulated.

## Formal

For a continuous function on an interval with $a<b$, divide the interval into n equal parts of width $\Delta x=(b-a)/n$. The left-endpoint sum is $S_n=\sum_{i=0}^{n-1}f(a+i\Delta x)\Delta x$, and $\int_a^b f(x)\,dx=\lim_{n\to\infty}S_n$. Each product is a signed rectangular contribution.

For the displayed function, $\int_a^b x^2\,dx=(b^3-a^3)/3$. Reversing the bounds changes the sign, and equal bounds give zero. Since x² is nonnegative, its integral agrees with geometric area when a is less than b.

## Advanced

The 3D view rotates the region around the horizontal axis. Its volume uses disc areas π[f(x)]², so its V readout differs from the 2D area sum. For a < b, it calculates with all n slices but displays at most 32 representative discs. Reversed bounds are not supported by that view. For the smooth curve x², left sums converge with error of order 1/n; midpoint sums would converge faster, with error of order 1/n².

## Derivation

1. On [0, 4], the displayed left-endpoint rectangles have width 4/n and sample points 4i/n for i from 0 to n − 1.
2. Substitute the sum-of-squares formula for 0² + 1² + … + (n − 1)².
3. Divide out the powers of n and let n grow without bound. The result is 64/3, also obtained from the antiderivative x³/3.

## Real world

### Accumulating distance

Integrating nonnegative speed over elapsed time gives distance. Each small contribution is approximately speed multiplied by duration.

### Accumulating energy

Integrating power over time gives energy. Kilowatts multiplied by hours give kilowatt-hours; consistent units matter as much as the summation.
