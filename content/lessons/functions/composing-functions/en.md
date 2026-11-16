---
title: Composing functions
summary: Apply one rule, then use its result as the input to a second rule.
parameters:
  x: starting amount x
  r: conversion multiplier r
  t: added fraction t (0.15 means 15%)
variables:
  - starting amount in the original units
  - number of new units for each original unit
  - fraction added to the converted amount
---

## Try it

1. Set x to 100, r to 3.75 and t to 0.15. First multiply to get 375; then add 15% of 375 to get 431.25. The graph shows the final output.
2. Keep x and r fixed and set t to 0. The output becomes 375, because the second rule now leaves its input unchanged.
3. Keep x at 100 and t at 0, and set r to 2. The output becomes 200. The conversion rule alone now doubles the input.

## Real-life examples

1. **Conversion followed by a charge.** Using an illustrative multiplier of 3.75, an amount of 100 becomes 375. Adding 15% gives 431.25. These are practice settings, not a current exchange-rate quote.
2. **A second set of practice values.** An amount of 50 multiplied by 0.85 gives 42.50. Adding 8% gives 45.90.
3. **No added charge.** An amount of 150 multiplied by 1.35 gives 202.50. With t = 0, the second rule leaves that result unchanged.

## Test yourself

1. Choose x, r and t to make the final output about 300.
2. Choose settings so the added portion alone, r times x times t, is about 15.
3. Choose r and t so the combined multiplier is within 0.05 of 2.

## Intuition

Suppose a quantity is converted by multiplying it by 3.75. Starting with 100 gives 375. A second rule adds 15% to whatever it receives, so it takes 375 to 431.25. The second calculation uses the first calculation's answer.

This is composition of functions. Call the first rule g and the second rule f. The notation f(g(x)) means calculate g(x) first, then apply f to that result. Read it from the inside out.

The graph shows the combined rule, with the starting amount on the horizontal axis and the final amount on the vertical axis. It does not plot a separate point for the intermediate amount. Calculate that intermediate value to understand how the final result was obtained.

## Formal

The composition is $(f\circ g)(x)=f(g(x))$. It is defined only when x is an allowed input for g and g(x) is an allowed input for f.

Here $g(x)=rx$ and $f(u)=u(1+t)$, where u names the second rule's input. Substitution gives $(f\circ g)(x)=rx(1+t)$. The decimal t = 0.15 means 15%, not 0.15%.

## Advanced

These two particular rules are multiplications, so reversing their order gives the same numerical result when their units and interpretation permit it. Composition does not generally commute: adding 3 and then doubling sends 4 to 14, while doubling and then adding 3 sends 4 to 11. Composition is associative wherever the relevant inputs are allowed.

## Derivation

1. Apply the conversion multiplier r to the initial input x.
2. Define the second rule for any received amount u: keep that amount and add the fraction t of it.
3. Replace u with the first rule's output rx to obtain the combined rule.

## Real world

### Unit conversions

Convert a length into a new unit, then scale it for a model. The output of the conversion becomes the input to scaling.

### Image editing

Cropping an image and then resizing it combines two operations. Reversing their order can produce a different image.

### Software

A program can pass the result of one function directly into another. Each function must accept the type of value it receives.
