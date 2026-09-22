---
title: Logarithms as the inverse of powers
summary: >-
  A logarithm answers "what power of $b$ gives $x$?" — it undoes exponentiation
  the way subtraction undoes addition.
parameters:
  b: base b
  x: x
variables:
  - the base of the logarithm (and of the paired exponential)
  - 'the input to the logarithm, must be positive'
charts:
  - title: 'The other half of the pair: b^x'
    xLabel: x
    yLabel: b^x
    series:
      - y = b^x
---

## Intuition

Drag $x$ and read $y = \log_b x$: it is the exponent you would need on $b$ to get back to $x$. Compare with the chart below, $b^x$ — the log curve is that same relationship read backwards, which is why the two curves are mirror images across $y = x$.

Increase the base $b$ and the log curve flattens: it takes a much larger $x$ to reach the same output, because a bigger base reaches any given power faster. At $x = 1$ every log curve passes through zero, whatever the base — $b^0 = 1$ always.

## Formal

$y = \log_b x$ is defined for $x > 0$ as the unique $y$ with $b^y = x$ ($b > 0$, $b \ne 1$); it is the inverse function of $b^x$.

$\log_b(xy) = \log_b x + \log_b y$ and $\log_b(x^p) = p\log_b x$.

## Advanced

Because $\log_b x = \ln x / \ln b$, every logarithm is a rescaling of the natural log; this is why calculators need only implement one logarithm and derive the rest, and why $d(\log_b x)/dx = 1/(x\ln b)$ carries an extra factor compared to the natural log.

## Derivation

1. Definition: $y$ is the exponent that turns $b$ into $x$.
2. Exponent addition corresponds to multiplying the outputs.
3. Taking logs turns multiplication into addition.

## Real world

### pH and the Richter scale
Both are base-10 logarithms of a quantity that spans many orders of magnitude, compressed into a manageable range.

### Decibels
Sound intensity is perceived roughly logarithmically, so loudness is measured in a log scale.

### Information theory
The number of bits needed to encode $N$ equally likely messages is $\log_2 N$.

### Solving for time in growth models
Doubling time or half-life comes from taking a logarithm of an exponential equation.
