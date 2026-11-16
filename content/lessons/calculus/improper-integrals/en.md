---
title: Improper integrals and p-series convergence
summary: 'Ask whether the area under a positive curve stays finite when the interval extends without bound.'
parameters:
  p: 'p — decay exponent'
  a: 'a — positive starting bound'
  b: 'b — finite ending bound'
variables:
  - 'p: exponent in 1/xᵖ'
  - 'a, b: bounds of the finite integral shown'
---

## Try it

1. Set a = 1 and p = 0.5. Increase b from 10 to 50. The integral grows from about 4.325 to 12.142, even though the curve approaches zero.
2. Keep a = 1 and set p = 2. At b = 10 the integral is 0.9; at b = 50 it is 0.98. The limiting area is 1, and the remaining area at b = 50 is 0.02.
3. Set p = 1. At b = 10 the integral is about 2.303, and at b = 50 it is about 3.912. This slow growth continues without bound.

## Real-life examples

1. **Slow decay.** With p = 0.5, a = 1 and b = 50, the finite integral is 2(√50 − 1) ≈ 12.142. The improper integral diverges.
2. **Faster decay.** With p = 2, a = 1 and b = 50, the finite area is 0.98. It approaches 1 as b grows without bound.
3. **The boundary case.** With p = 1, a = 1 and b = 30, the finite area is ln 30 ≈ 3.401. It has no finite limiting total.

## Test yourself

1. Choose p less than 1 and b greater than a, with finite area greater than 5.
2. Choose p greater than 1 and b greater than a, with finite area less than 2.
3. Choose b greater than a and make the finite integral within 0.2 of 1. This target is the displayed finite integral, not necessarily the infinite-interval limit.

## Intuition

A curve can approach zero while the area beneath it grows forever. Each new strip may contribute less than earlier strips, but there are indefinitely many strips to include. The question is whether their combined contribution approaches a finite total, not whether the curve becomes hard to see.

For 1/x² starting at 1, extending the endpoint from 10 to 50 increases the area from 0.9 to 0.98. The total approaches 1. For 1/x, the area instead equals ln b and keeps increasing without bound. A slowly changing screen value cannot by itself decide convergence; the limiting calculation does.

## Formal

The improper integral is defined by $\int_1^\infty x^{-p}\,dx=\lim_{b\to\infty}\int_1^b x^{-p}\,dx$. It converges exactly when $p>1$, giving $1/(p-1)$. For p ≤ 1 it diverges to positive infinity.

For positive bounds a < b and $p\ne1$, the finite integral is $(b^{1-p}-a^{1-p})/(1-p)$. At p = 1, it is $\ln(b/a)$. For p > 1, the remaining tail beyond b is $b^{1-p}/(p-1)$, so the finite display still omits a calculable positive area.

## Advanced

The integral test connects this result to the series Σ1/nᵖ for positive p: because x⁻ᵖ is positive and decreasing, its integral and series converge or diverge together. Their finite limiting values are not generally equal. An integral can also be improper because of a singular endpoint; near zero, the condition for ∫₀¹x⁻ᵖ dx is p < 1, the opposite inequality.

## Derivation

1. For p different from 1 and a fixed at 1, integrate using the power rule and evaluate at the finite endpoint b.
2. If p is greater than 1, the exponent 1 − p is negative, so b raised to that exponent tends to zero.
3. Substitute that limit to obtain 1/(p − 1). The excluded case p = 1 uses the logarithm and diverges; p < 1 gives an increasing positive power and also diverges.

## Real world

### Normalising a density

A proposed density proportional to x⁻ᵖ on [1, ∞) can be scaled to total probability 1 only when p > 1. Its normalising multiplier is then p − 1.

### Bounding an omitted tail

When a calculation stops at a finite endpoint, a convergent improper integral can quantify the remaining contribution instead of assuming it is zero.
