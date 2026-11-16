---
title: Transformations of graphs
summary: Learn how changing a function's input or output shifts, stretches or reflects its graph.
parameters:
  x: input x
  k: output multiplier k
  h: horizontal shift h
  s: input multiplier s
  d: vertical shift d
variables:
  - input position
  - output multiplier; its absolute value sets amplitude, and its sign reflects vertically
  - horizontal shift of the transformed pattern
  - input multiplier; larger absolute values compress the pattern horizontally
  - value added to every output
---

## Try it

1. Set k = 1, h = 0, s = 1 and d = 0. Then increase d to 2. Every height increases by 2.
2. Keep those settings and increase h to 2. The wave moves two units right. Its amplitude and period stay the same.
3. Set k to -2 and d to 0. The wave reflects vertically and its amplitude becomes 2. Then set s to 2 to halve the period.

## Real-life examples

1. **The original wave.** With k = 1, h = 0, s = 1 and d = 0, the rule is sine x, ranging from -1 to 1.
2. **A larger, raised signal.** With k = 2 and d = 3, keeping h = 0 and s = 1, the output ranges from 1 to 5. Its period is unchanged.
3. **Several changes together.** With k = -1, h = 2, s = 0.5 and d = -1, the wave is reflected, shifted right by 2 and down by 1, and has twice the original period.

## Test yourself

1. Set d equal to the absolute value of k, keeping k and s nonzero, so the minimum is zero.
2. Set k to -2. This reflects and doubles the output relative to its middle value; d still controls the actual peak height.
3. Make the absolute value of s equal to 2, keeping k nonzero, to halve the original period.

## Intuition

Begin with a sine wave whose heights range from -1 to 1. Adding 2 to every output moves the range to 1 through 3. Nothing changes about when its peaks occur. A change made after the function is evaluated changes its output heights.

Changing the input works differently. To move the wave two units right, evaluate the original function at x minus 2. What used to happen at input zero now happens at input two. To make the pattern repeat twice as often, multiply that shifted input by 2.

The k control scales the output before adding the vertical shift d. A negative k reflects the wave about its middle line. The s control scales the input: larger absolute values squeeze the graph horizontally, and smaller nonzero absolute values stretch it. Zero values collapse this sine-wave example to a constant, rather than giving an ordinary stretch.

## Formal

For a base function f, the transformed rule is $g(x)=k f(s(x-h))+d$. With nonzero s, a point at input u of the original graph moves to horizontal position h plus u divided by s. Its new height is k times the old height plus d.

Here f is sine. With k and s nonzero, the amplitude is $|k|$, the middle value is d, and the period is $2\pi/|s|$. The range runs from d minus the absolute value of k to d plus it. If k or s is zero, the output is the constant d.

## Advanced

Order matters for operations on the same coordinate: doubling an output and then adding 3 differs from adding 3 and then doubling. A purely horizontal transformation and a purely vertical transformation can be applied in either order. These transformations do not include every possible plane transformation, such as an arbitrary rotation.

## Derivation

1. Replace the original input by s times x minus h. This controls horizontal position, scale and reflection.
2. Multiply the resulting output by k to scale it vertically and reflect it if k is negative.
3. Add d to shift every output vertically by the same amount.

## Real world

### Signals

Multiplying signal values changes their amplitude. Adding a constant changes their baseline.

### Timing

Replacing time by time minus a delay shifts a recorded pattern later without changing its shape.

### Comparing graphs

Aligning middle values and adjusting scales can help compare patterns measured in different units. Keep those transformations explicit when interpreting the result.
