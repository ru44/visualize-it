---
title: The chain rule and product rule together
summary: 'Differentiate a changing product whose sine factor also contains a changing input.'
parameters:
  k: 'k — constant multiplier inside sine'
  x: 'x — selected input'
variables:
  - 'k: angle increase per unit x inside sine'
  - 'x: point where the value and derivative are evaluated'
---

## Try it

1. Set k = 1 and x = 2. The function value is about 1.8186 and its slope about 0.0770. The dashed curve's height gives the slope of the solid curve, not its height.
2. Move x while keeping k fixed. Where the dashed curve crosses zero, the solid curve has a horizontal tangent.
3. Set k = 3 and move x away from zero. Some derivative values leave the vertical plotting window; the slope readout still reports them.

## Real-life examples

1. **Nearly horizontal tangent.** At k = 0.4 and x = 5, f ≈ 4.54649 but f′ ≈ 0.07700. A large function value can have a small slope.
2. **Positive slope near the centre.** At k = 2.8 and x = 0.5, f ≈ 0.49272 and f′ ≈ 1.22340.
3. **Negative value, positive slope.** At k = 1.2 and x = −4, f ≈ −3.98466 and f′ ≈ 0.57617. A curve can lie below zero while increasing.

## Test yourself

1. Choose |x| greater than 1 with |f′(x)| less than 0.15.
2. Make f′(x) greater than 10.
3. Make f′(x) less than −10.

## Intuition

The function x sin(kx) multiplies two changing factors. If x changes a little, the factor x changes and the sine factor changes too. The product rule accounts for both contributions: change the first factor while holding the second at its current value, then add the contribution from changing the second.

The sine factor contains a second layer. Its input is kx, which changes k times as fast as x. The chain rule therefore multiplies cosine by k. Combining the two rules gives two terms in the slope. Differentiating only the sine or only the factor x would miss part of the change.

## Formal

For differentiable u and v, $(uv)'=u'v+uv'$. Here $u=\sin(kx)$ and $v=x$, with k held constant when differentiating with respect to x. The sine input is in radians.

The chain rule gives $u'=k\cos(kx)$, while $v'=1$. Hence $f'(x)=kx\cos(kx)+\sin(kx)$. The dashed graph plots this derivative; the tangent to the original curve at the selected point has this slope.

## Advanced

For an envelope A(x), differentiating A(x) sin(kx) gives A′(x) sin(kx) + kA(x) cos(kx). The terms describe change in the envelope and change in the oscillation. This is a derivative with respect to x; differentiating with respect to the parameter k while fixing x would give a different result.

## Derivation

1. Apply the product rule to sin(kx) and x. Keep both terms.
2. Differentiate the outer sine at its inner input kx, then multiply by the inner derivative k.
3. Substitute that result and the derivative 1 of x into the product-rule expression.

## Real world

### A changing oscillation

A signal model can multiply an oscillation by a varying amplitude. Its rate of change depends on both factors, even if one changes more slowly than the other.

### Quantities with two changing factors

If a rectangle's length and width vary with time, its area changes because both dimensions change. The product rule adds their first-order contributions.
