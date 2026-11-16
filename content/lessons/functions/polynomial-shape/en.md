---
title: Polynomial shape
summary: Use a polynomial's degree and leading coefficient to predict its ends and limit its number of turns.
parameters:
  x: input x
  n: selected degree n
  a: leading coefficient a
variables:
  - highest power with nonzero coefficient; the selected degree when a is nonzero
  - coefficient of the highest power
  - input position
  - output height
---

## Try it

1. Keep a at 1 and change n from 2 through 5. These selected examples show one, two, three and four turning points. Other polynomials of the same degrees may show fewer.
2. Set n to 4 and compare a = 1 with a = -1. The graph reflects vertically, changing the direction of both ends.
3. Set n to 5 and x near 1. The output is near zero. At a = 0 the whole graph becomes zero, so the selected n no longer describes its degree.

## Real-life examples

1. **A quadratic valley.** With n = 2 and a = 1, the rule is x squared minus 4. It has a minimum of -4 at x = 0 and roots at -2 and 2.
2. **A cubic with two turns.** With n = 3 and a = -1, the rule is negative x cubed plus 3x. Its left end rises and its right end falls.
3. **A fifth-degree example.** With n = 5 and a = 1, the roots are -2, -1, 0, 1 and 2. The graph turns four times between those five roots.

## Test yourself

1. Set n to 4 and a above 0.3.
2. Set n to 3 and a below -0.3.
3. Set n to 5 and put x within 0.05 of 1. Keep a nonzero to inspect the intended fifth-degree example.

## Intuition

The graph can change from rising to falling at a peak, or from falling to rising at a valley. Each such change is a turning point. The degree places an upper limit on how many turns a polynomial can have; it does not fix their exact number.

In a quadratic, the highest power is x squared, so the degree is 2 and there is one turning point. A cubic has degree 3 and can have at most two turns. Some cubics keep increasing throughout and have no turning points at all.

The leading term determines what happens far to the left and right. With even degree, both ends go the same way. With odd degree, they go opposite ways. Changing the sign of the leading coefficient reverses those directions. A root is any input with output zero, whether the graph crosses the axis or only touches it.

## Formal

A nonzero polynomial has the form $f(x)=a_nx^n+\dots+a_1x+a_0$, with a nonzero leading coefficient. Its degree is n, and it has at most n distinct real roots and at most n minus 1 turning points for n at least 1.

The leading term controls end behaviour. For positive leading coefficient, the right end rises; the left end rises for even degree and falls for odd degree. A negative leading coefficient reverses both. Setting all coefficients to zero gives the zero polynomial, whose degree is not the selected positive n.

## Advanced

A turning point requires a zero derivative, but a zero derivative need not be a turn. The derivative of a degree-n polynomial has degree n minus 1 and therefore at most n minus 1 real zeros. This gives the bound. Counting gaps between roots alone does not prove an upper bound on all turns.

## Derivation

1. Differentiating a degree-n polynomial with n at least 1 gives a polynomial of degree n minus 1.
2. That nonzero derivative has at most n minus 1 real zeros.
3. Every turning point requires one of those zeros, so there can be at most n minus 1 turning points. Some derivative zeros may not produce turns.

## Real world

### Fitting a curve

A chosen degree limits how much a polynomial fit can bend. A higher degree does not by itself make predictions more reliable.

### Designing a profile

Polynomial segments can describe smooth rises and dips. Their coefficients determine the locations and heights of those features.

### Finding an optimum

A polynomial model of area or volume can have turning points that are candidates for an optimum. The usable domain and its endpoints must also be considered.
