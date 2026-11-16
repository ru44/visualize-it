---
title: Logarithms as the inverse of powers
summary: 'Find the exponent needed to turn a chosen base into a given positive number.'
parameters:
  b: 'base b (greater than 1 here)'
  x: 'positive input x'
variables:
  - 'base used for both the logarithm and the paired exponential'
  - 'positive number whose exponent we want to find'
charts:
  - title: 'The other half of the pair: b^x'
    xLabel: x
    yLabel: b^x
    series:
      - y = b^x
---

## Try it

1. Set b to 2 and x to 8. The graph's height is 3 because 2 cubed equals 8.
2. Keep b at 2 and set x to 0.5. The output is -1 because 2 to the power -1 is one half.
3. Set x to 1 and change b. The output remains zero. The additional chart shows the paired exponential; the two plots use different windows, so compare their values rather than their apparent shapes.

## Real-life examples

1. **Three doublings.** At b = 2 and x = 8, the result is 3. An eightfold increase takes three doubling steps.
2. **Two triplings.** At b = 3 and x = 9, the result is 2. Multiplying by three twice gives nine.
3. **Repeated multiplication by 1.5.** At b = 1.5 and x = 10, the result is about 5.68. A continuous growth model reaches a tenfold factor at that time; with whole discrete steps, it first exceeds ten after six steps.

## Test yourself

1. Choose a base more than 0.1 away from 2 and set x within 0.1 of its cube.
2. Choose settings that give a logarithm within 0.02 of -1.
3. Set b to 3 and find an input giving an output approximately 2.

## Intuition

Two cubed equals eight. The power calculation starts with the base and exponent and finds the result. A logarithm reverses the question: knowing the base is 2 and the result is 8, what was the exponent? It was 3.

A negative answer is possible even though the input must be positive. A result of one half requires exponent -1 for base 2. An input of 1 always requires exponent zero. Values between these examples can require fractional exponents.

The base slider here stays above 1. For a fixed input greater than 1, increasing the base reduces the required exponent: larger multiplication steps reach the same target in fewer steps. For inputs between zero and one, consider the negative exponent explicitly rather than assuming every output decreases.

## Formal

The statement $y=\log_b x$ means $b^y=x$, where x is positive, b is positive and b differs from 1. The logarithm returns the unique exponent y.

For positive x and z, $\log_b(xz)=\log_b x+\log_b z$. For real p and positive x, $\log_b(x^p)=p\log_b x$. These laws come from multiplying powers and raising powers to another power.

## Advanced

The change-of-base identity is $\log_b x=\ln x/\ln b$. It lets a calculator evaluate another base using natural logarithms. Base 1 is excluded because its natural logarithm is zero, and because every power of 1 has the same value.

## Derivation

1. Name the exponent y that makes b raised to y equal x.
2. Add two such exponents. The power rule shows that the corresponding outputs multiply.
3. Applying the logarithm converts that product back into the sum of the two exponents.

## Real world

### Growth steps

A logarithm can solve for the number of repeated multiplication steps needed to reach a target ratio.

### Information

For N equally likely alternatives, log base 2 of N measures the information in bits. A fixed-length binary code needs a whole number of bits, rounded up if necessary.

### Comparing scales

Logarithmic axes represent equal ratios by equal distances. Always check the base and the meaning of the plotted quantity.
