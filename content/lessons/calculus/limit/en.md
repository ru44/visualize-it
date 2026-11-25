---
title: Limit
summary: 'Find the value a function approaches near an input, even when the function is undefined at that input.'
parameters:
  d: 'd — positive distance from zero'
variables:
  - 'x: input in radians, approaching zero'
  - 'sin(x)/x: ratio defined for nonzero x'
---

## Try it

1. Set d = 1. The marked inputs are −1 and 1; both give sin(x)/x ≈ 0.84147.
2. Reduce d to 0.1, then 0.01. The corresponding values are about 0.99833 and 0.999983. The readout also samples inputs d/10 and d/100, even closer to zero.
3. Look at the hollow point at (0, 1). It marks the limiting value, not a defined value of sin(x)/x at zero. The slider approaches zero without reaching it.

## Real-life examples

1. **Farther away.** At d = 3, sin(3)/3 ≈ 0.04704. A value far from zero need not resemble the limit.
2. **Closer.** At d = 0.5, sin(0.5)/0.5 ≈ 0.95885, about 0.04115 below 1.
3. **Very close.** At d = 0.01, the value is about 0.999983. Rounding may show 1, but the value at this nonzero input is still less than 1.

## Test yourself

1. Make |sin(d)/d − 1| less than 0.01.
2. Find d for which sin(d)/d is less than 0.9.
3. Find d for which sin(d)/d is negative.

## Intuition

At x = 0, the expression sin(x)/x would require division by zero, so it is undefined. Nearby nonzero inputs still have valid outputs. A limit asks whether those outputs become arbitrarily close to one number as the input approaches zero. It does not require a value at zero itself.

Here both sides approach 1. The ratio has the same value at x and −x because numerator and denominator both change sign. The graph and samples suggest the result; the squeeze argument below explains why the approach continues beyond the finite values a slider can show. Throughout this example, the sine input is in radians.

## Formal

The statement $\lim_{x\to a}f(x)=L$ means that we can make the outputs as close to L as desired by taking all domain inputs sufficiently close to a, while excluding a itself. A two-sided limit requires agreement from both sides when both are available.

Precisely, for every $\varepsilon>0$ there is a $\delta>0$ such that $0<|x-a|<\delta$ implies $|f(x)-L|<\varepsilon$. Epsilon is the allowed output error, and delta is a sufficient input distance. In this example $a=0$ and $L=1$.

## Advanced

Defining a new function to equal sin(x)/x away from zero and to equal 1 at zero fills the hole continuously. Giving it a different value at zero would not change the limit, but would leave a discontinuity. A few matching samples cannot establish a limit for an arbitrary function; the definition concerns all sufficiently nearby domain inputs.

## Derivation

1. Comparing areas on the unit circle gives cos x < sin(x)/x < 1 for 0 < x < π/2. The ratio and cosine are even, so the same bounds hold for the corresponding negative inputs.
2. As x approaches zero, the lower bound cos x approaches 1, while the upper bound is already 1.
3. The squeeze theorem forces the middle expression to approach 1 as well.

## Real world

### Small-angle calculations

For a small radian angle, sine is close to the angle itself. This limit explains the approximation; how small is acceptable depends on the required error.

### Instantaneous change

A derivative uses a limit of average rates over shrinking intervals. The relevant quotient may be undefined at a zero interval even though its limit exists.
