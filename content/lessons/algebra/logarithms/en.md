---
title: Logarithms as the inverse of powers
summary: >-
  Find out how many times you would need to multiply by a fixed factor to
  reach a number — the scale behind pH, earthquake magnitude, and digital
  bits.
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

## Try it

1. Drag x and watch the curve's height — that height is the log of x.
2. Raise the "base b" slider and watch the curve flatten, needing a much bigger x to reach the same height.
3. Compare with the dashed curve below, $b^x$ — notice the two curves mirror each other.

## Real-life examples

1. **Bacteria doubling.** A colony doubles every hour (base b=2). After growing 8-fold (x=8), the curve reads exactly 3 — three doubling hours have passed.
2. **A rumor tripling.** A rumor's audience triples every day (base b=3). Once it reaches 9 times its start size (x=9), the curve reads 2 — two days have passed.
3. **Compound savings.** Savings grow by a factor of 1.5 each year (base b=1.5). Reaching 10 times the original amount (x=10) takes just under 6 years.

## Test yourself

1. Find a base other than 2 where the curve still reads exactly 3 somewhere — more than one answer works.
2. Make the curve read exactly -1.
3. Set the base to 3, then find the x where the curve reads exactly 2 — the point where two triplings land.

## Intuition

A bacteria colony doubles in size every hour. After 3 hours it has grown 8-fold — 2 doubled three times is 8. The curve on this screen answers the reverse question: given that the colony is now 8 times bigger, drag x to 8 and read the height of the curve — it lands on 3, the number of doubling hours that must have passed. Compare it with the dashed curve below, $b^x$: the two curves are mirror images of each other, because one undoes exactly what the other does.

Raise the base b and the curve flattens: reaching the same height now needs a far bigger x, because a bigger base reaches any given multiple faster — tripling gets you further per step than doubling does. Whatever the base, the curve always crosses zero at x = 1, since raising any base to the power 0 always gives 1.

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
