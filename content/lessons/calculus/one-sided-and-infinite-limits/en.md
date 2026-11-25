---
title: One-sided and infinite limits
summary: 'Compare the two sides of 1/x near zero, where values grow without bound with opposite signs.'
parameters:
  d: 'd — positive distance from zero'
variables:
  - 'd: marked inputs are −d and d'
  - 'left-hand limit: behaviour as negative x approaches zero'
  - 'right-hand limit: behaviour as positive x approaches zero'
---

## Try it

1. Set d = 1. The marked inputs are −1 and 1, giving outputs −1 and 1.
2. Reduce d to 0.1. At the marked inputs, the outputs are −10 and 10. Smaller positive d makes their magnitudes larger.
3. Set d = 0.02. The marked outputs are −50 and 50, outside the plot's vertical window. The numerical table samples the positive inputs d, d/10 and d/100; it does not list both sides.

## Real-life examples

1. **Unit distance from zero.** At d = 1, the marked values are ±1. The positive-side table also evaluates 0.1 and 0.01, giving 10 and 100.
2. **Ten times closer.** At d = 0.1, the marked values are ±10. The additional positive samples give 100 and 1000.
3. **At the slider minimum.** At d = 0.02, the marked values are ±50. The additional samples at 0.002 and 0.0002 give 500 and 5000. Every one of these is finite.

## Test yourself

1. Make the right-hand marked value 1/d greater than 40.
2. Make 1/d within 0.3 of 10.
3. Make 1/d less than 1.

## Intuition

The reciprocal of 1 is 1, the reciprocal of 0.1 is 10, and the reciprocal of 0.01 is 100. Each tenfold reduction of a positive input multiplies its reciprocal by ten. There is no largest value: choosing a sufficiently small positive input can exceed any proposed positive bound.

Negative inputs behave differently in sign. At −0.1 the value is −10, and at −0.01 it is −100. Thus the right side grows positively without bound and the left side decreases negatively without bound. They do not approach one common value. Infinity here describes unbounded behaviour, not a number reached by the slider.

## Formal

The one-sided statements are $\lim_{x\to0^+}1/x=+\infty$ and $\lim_{x\to0^-}1/x=-\infty$. Because they disagree, $\lim_{x\to0}1/x$ exists neither as a finite limit nor as a single signed infinite limit. The function is undefined at zero.

To express positive divergence precisely, for every $M>0$ choose $\delta=1/M$. Then $0<x<\delta$ implies $1/x>M$. Similarly, $-\delta<x<0$ implies $1/x<-M$. A line $x=c$ is a vertical asymptote when at least one of the one-sided limits there is signed infinity.

## Advanced

Compare 1/x²: both sides tend to positive infinity, so it does have a two-sided positive infinite limit, though no finite real limit. A vertical asymptote therefore does not require a sign change. A finite graph cannot prove unboundedness; the inequality argument handles arbitrarily large bounds.

## Derivation

1. For positive x smaller than δ, taking reciprocals reverses the inequality, giving 1/x greater than 1/δ.
2. Set δ = 1/M to exceed any requested positive output bound M whenever the positive input is sufficiently close to zero.
3. Replace the input by a negative value of the same magnitude. The reciprocal changes sign, establishing the negative infinite limit from the left.

## Real world

### Fixed area, variable width

For a rectangle of fixed area 1, length equals 1/width. As a positive width approaches zero, the model's required length grows without bound. Negative widths have no physical meaning, so this application uses only the right-hand limit.

### Sensitivity near a zero denominator

A formula containing a small denominator can turn a small input change into a large output change. Check its domain and model assumptions before interpreting a very large numerical result.
