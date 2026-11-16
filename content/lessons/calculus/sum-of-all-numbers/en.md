---
title: 'Does 1 + 2 + 3 + … equal −1/12?'
summary: 'Distinguish the divergent sum of positive integers from the value of the analytically continued zeta function.'
parameters:
  s: 's — exponent parameter in n⁻ˢ'
  N: 'N — number of terms in the partial sum'
variables:
  - 'ζ(s): zeta value, continued outside the convergence range'
  - 's: term parameter; each term is n raised to −s'
  - 'N: positive integer number of terms added'
---

## Try it

1. Set s = 2 and N = 50. The partial-sum bars end near 1.62513, while the zeta value is about 1.64493. The finite sum has not reached the infinite sum.
2. Set s = −1. The first 50 positive integers sum to 1275, while the zeta curve reads −1/12. Increasing N changes the partial sum, not the zeta value.
3. Set s = −2. The continued function is zero, but the positive-square partial sums keep increasing. The two panels describe different quantities outside the series' convergence range.

## Real-life examples

1. **Reciprocal squares.** At s = 2 and N = 50, the partial sum is about 1.62513 and the convergent infinite sum is π²/6 ≈ 1.64493.
2. **Reciprocals.** At s = 1 and N = 50, the harmonic partial sum is about 4.49921. The series diverges, and zeta has a pole at 1 rather than a finite value.
3. **Positive integers.** At s = −1 and N = 50, the partial sum is 1275. The continued value −1/12 is not the limit of these sums.
4. **Positive cubes.** At s = −3 and N = 20, the partial sum is 44100, whereas the continued value is 1/120. Again, continuation is a different operation from ordinary summation.

## Test yourself

1. Set s to −1, making the terms the positive integers.
2. Set s to 2 and N to at least 40.
3. Find the continued function's zero at s = −2.

## Intuition

Adding 1, then 2, then 3 gives running totals 1, 3 and 6. After ten terms the total is 55; after fifty it is 1275. Every added term is positive and the totals grow without bound. In the ordinary meaning of an infinite sum, 1 + 2 + 3 + … diverges to positive infinity. It cannot equal a negative fraction.

Now replace each term n by n raised to −s. For real s > 1, the partial sums converge, defining the zeta function in that range. For s = 2, they add reciprocal squares. The bars show the finite partial sums, while the curve shows the limiting value where the series converges.

Analytic continuation extends the function beyond that range under a much stronger requirement than drawing a smooth curve. Complex differentiability makes the extension unique on the connected domain excluding the pole at 1. Its value at −1 is −1/12. The extension does not make the original positive-integer partial sums converge.

## Formal

For real $s>1$, define $\zeta(s)=\sum_{n=1}^{\infty}n^{-s}$. For real s ≤ 1 this series diverges. At s = −1, its partial sums are $S_N=N(N+1)/2$, which tend to positive infinity.

The function has an analytic continuation to the complex plane except for a pole at s = 1. Its continued value is $\zeta(-1)=-1/12$. This is a zeta-regularised value of the divergent expression, not its ordinary sum. See the [NIST definition and continuation](https://dlmf.nist.gov/25.2).

## Advanced

Smoothness alone does not specify a unique continuation. The relevant condition is complex analyticity away from the pole. The 3D view plots the magnitude |ζ(s)| for complex inputs, with tall values capped for display. It therefore loses the sign visible in the real 2D curve: at s = −1 the magnitude is 1/12, although the labelled value is negative. The singularity at s = 1 is not a finite peak.

## Derivation

1. Sum the first N positive integers to obtain N(N + 1)/2. This establishes divergence of the ordinary positive-integer series.
2. Define zeta by the convergent reciprocal-power series for real s > 1.
3. At s = 2, the infinite sum equals π²/6; finite partial sums remain below it.
4. A separate analytic-continuation result gives ζ(−1) = −1/12. It does not follow by treating a divergent series as an ordinary finite sum. NIST lists the relevant integer values and formulas.

## Real world

### Reading a regularised result

When a calculation assigns a value to a divergent expression, identify the regularisation rule. Different operations must not be substituted for an ordinary sum without explaining the change of meaning.

### Checking numerical convergence

Compare partial sums as N increases and use a convergence argument. A function evaluator returning a finite zeta value outside s > 1 does not show that the corresponding series converges. Reference values appear in [NIST's integer-argument formulas](https://dlmf.nist.gov/25.6).
