---
title: Inverse functions
summary: Undo a rule by reversing its steps and recover the original input.
parameters:
  m: multiplier m
  b: added constant b
  x: input x
variables:
  - nonzero multiplier in the forward rule
  - constant added after multiplication
  - input to the forward rule; its output becomes an input to the inverse
---

## Try it

1. Set m to 2, b to 3 and x to 4. The forward rule gives 11. The inverse subtracts 3 and divides by 2, returning 4.
2. Compare the marked points (4, 11) and (11, 4). Their coordinates are swapped, so they lie on opposite sides of the diagonal y = x.
3. Set m to 1 and b to 0. The rule and its inverse both leave every input unchanged, and their lines coincide with the diagonal.

## Real-life examples

1. **Temperature conversion.** Multiplying 20 by 1.8 and adding 32 converts 20°C to 68°F. Subtracting 32 from 68 and dividing by 1.8 recovers 20°C.
2. **A length conversion approximation.** With m = 1.609, b = 0 and x = 10, the result is 16.09. The inverse returns 10 using the same approximate conversion factor.
3. **Halving and restoring a quantity.** With m = 0.5, b = 0 and x = 10, the result is 5. The inverse divides by 0.5, which doubles 5 back to 10.

## Test yourself

1. Choose settings that make the forward output about 300. Use the numerical readout if the point is outside the visible window.
2. Set m to 1 and b to 0 so every input is unchanged.
3. Choose settings so (x minus b) divided by m is about -10. This challenge evaluates the inverse at x, whereas the displayed round-trip readout evaluates the inverse at f(x).

## Intuition

A rule says “multiply by 2, then add 3.” Starting with 4 gives 11. To recover the original input, undo the last step first: subtract 3 to get 8, then divide by 2 to get 4. This reversing rule is the inverse function.

The forward rule pairs input 4 with output 11. Its inverse pairs input 11 with output 4. Swapping these coordinates reflects the point across the diagonal y = x. The two graphs show the same pairs with their roles reversed.

An inverse function must give one answer for each input it receives. If two original inputs share an output, the inverse cannot choose between them without another restriction. A nonzero linear multiplier avoids this problem, which is why this lesson keeps m away from zero.

## Formal

For $f(x)=mx+b$ with $m\ne0$, the inverse is $f^{-1}(y)=(y-b)/m$. The notation with superscript -1 means the inverse function, not the reciprocal of f.

The inverse accepts outputs of f as its inputs and satisfies $f^{-1}(f(x))=x$. A function has an inverse on its range when it is one-to-one. If an inverse is required on a specified codomain, f must also reach every value in that codomain.

## Advanced

Squaring sends both 2 and -2 to 4, so it has no inverse function on all real inputs. Restricting the original domain to nonnegative numbers gives the square-root inverse. The choice of domain is part of specifying an invertible function.

## Derivation

1. Write the forward rule: multiply the input by m and add b to obtain y.
2. Subtract b from both sides to undo the addition.
3. Divide by the nonzero m to recover the original input. This gives the inverse rule.

## Real world

### Unit conversions

A reversible conversion can be undone by reversing its arithmetic steps. Use the same constants in both directions.

### Solving a linear equation

To solve mx + b = k with m nonzero, subtract b from k and divide by m.

### Recovering data

Lossless encoding can be reversed to recover the original data. Lossy compression discards information and generally has no exact inverse.
