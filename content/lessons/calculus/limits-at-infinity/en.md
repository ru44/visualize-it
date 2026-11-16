---
title: Limits at infinity and horizontal asymptotes
summary: 'Find the value a rational function approaches as its input grows, and distinguish an asymptote from a ceiling.'
parameters:
  a: 'a — limiting value'
  b: 'b — positive denominator constant'
  x: 'x — selected input'
variables:
  - 'a: coefficient of x² in the numerator'
  - 'b: constant added to x² in the denominator'
  - 'x: input increased to examine the limit'
---

## Try it

1. Set a = 2 and b = 3. Compare x = 5 with x = 50: the values are about 1.82143 and 1.99800, increasingly close to 2.
2. Keep a = 2 and increase b. Finite-x values change, but the limiting value remains 2.
3. Set a = 0.5 and b = 1. At x = 0 the value is 1; as x grows it approaches 0.5 from above. An asymptote need not be an upper bound.

## Real-life examples

1. **A visible difference.** At a = 2, b = 3 and x = 5, the value is 51/28 ≈ 1.82143, about 0.17857 below the limit.
2. **A small difference.** At a = 1.5, b = 6 and x = 50, the value is about 1.49681, about 0.00319 below the limit.
3. **Closer still.** At a = 3.5, b = 1 and x = 45, the value is about 3.49877, about 0.00123 below the limit.

## Test yourself

1. Make the difference between f(x) and a less than 0.01 in magnitude.
2. Choose a greater than 3 and make that difference less than 0.05.
3. Keep x less than 0.5 and make a − f(x) greater than 3.

## Intuition

In the fraction (ax² + 1)/(x² + b), both numerator and denominator grow mainly like x² when x is large. The numerator contains a copies of that dominant term and the denominator one copy. Their ratio therefore approaches a. The constant terms still affect each finite reading, but their relative influence shrinks.

The limiting line y = a is a horizontal asymptote. It describes behaviour far along the input axis, not a barrier the function can never cross. For this particular family, the difference from a has numerator 1 − ab, so its sign stays fixed, or the whole curve equals a when ab = 1. Other functions can cross their horizontal asymptotes.

## Formal

For the positive b used here, $f(x)=(ax^2+1)/(x^2+b)$ is defined for all real x. Dividing numerator and denominator by x² for nonzero x gives $f(x)=(a+1/x^2)/(1+b/x^2)$, hence $\lim_{x\to\infty}f(x)=a$. The same limit holds as x tends to negative infinity.

The exact error is $f(x)-a=(1-ab)/(x^2+b)$. Thus large x makes the error small; it need not make it zero. If $ab=1$, the error is already zero for every input. The control reaches only 60, so the algebra establishes the limit beyond the visible window.

## Advanced

For a ratio of nonzero polynomials, compare their degrees. Equal degrees give a finite limit equal to the ratio of leading coefficients; a smaller numerator degree gives zero. A larger numerator degree gives no finite horizontal limit. Polynomial division can then describe the remaining large-input behaviour.

## Derivation

1. Divide each term in numerator and denominator by x². This rearrangement is used away from zero, which is sufficient for a limit at infinity.
2. With a and b fixed, 1/x² and b/x² both approach zero as x grows.
3. The denominator approaches 1 rather than zero, so the quotient approaches a/1.

## Real world

### Average with fixed overhead

In a model with total resource use F + cq for q items, average use is c + F/q. As q grows it approaches c. This is another rational-function limit, with its own formula and assumptions.

### Estimating large-input behaviour

A limiting value helps approximate a formula at large inputs. An explicit error expression, when available, lets you check whether a particular input is large enough for the accuracy needed.
