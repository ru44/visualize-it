---
title: Power functions and fractional exponents
summary: 'Compare squaring, square roots and reciprocals by changing the exponent of a positive input.'
parameters:
  n: 'exponent n'
  x: 'positive input x'
variables:
  - 'exponent; may be positive, zero, negative or fractional'
  - 'positive base being raised to the exponent'
---

## Try it

1. Set x to 2 and compare n = 1, 2 and 3. The outputs are 2, 4 and 8. The exponent determines how many factors of 2 are multiplied.
2. Keep x at 2 and set n to 0, then -1. The outputs are 1 and 0.5. A negative exponent takes a reciprocal rather than making the result negative.
3. Set x to 4 and n to 0.5. The output is 2 because this exponent means square root.

## Real-life examples

1. **Scaling an area.** With n = 2 and x = 2, the factor is 4. Doubling both side lengths of a square multiplies its area by four.
2. **Scaling a volume.** With n = 3 and x = 2, the factor is 8. Doubling all three dimensions of a cube multiplies its volume by eight.
3. **Sharing a fixed amount.** With n = -1 and x = 2, the factor is 0.5. Twice as many equal shares make each share half as large.

## Test yourself

1. Set x to 2 and choose n to make the output about 8.
2. Set n to -1 and choose x to make the output within 0.02 of 0.25.
3. Find the exponent that gives 1 for every positive input.

## Intuition

For a positive whole-number exponent, a power means repeated multiplication. Two cubed is 2 times 2 times 2, giving 8. Keep the input at 2 and change the exponent to see how the number of factors changes the result.

Other exponents extend the same pattern. The zero power of a positive number is 1. Exponent -1 gives its reciprocal, so 2 to the power -1 is one half. Exponent one half gives the square root, so 4 to that power is 2.

Here x is always positive. This lets the exponent change continuously without leaving the real numbers. Notice that the graph always passes through (1, 1), because every power of 1 is 1. Changing the exponent changes the shape around that shared point.

## Formal

For positive x and any real n, define $x^n=e^{n\ln x}$. In particular, $x^0=1$ and $x^{-n}=1/x^n$. Negative exponents do not imply negative outputs.

For a positive integer q, $x^{1/q}$ is the positive q-th root of x. More generally, $x^{p/q}=(x^{1/q})^p$ for integer p and positive integer q, with x positive as throughout this lesson.

## Advanced

Some negative inputs admit particular fractional powers as real numbers, such as the cube root of -8. Others do not, such as its square root. Keeping x positive avoids these domain differences. A power function varies the base x with a fixed exponent, whereas an exponential function varies the exponent with a fixed base.

## Derivation

1. Multiplying powers with the same positive base adds their exponents. For whole exponents, this follows by counting factors.
2. Define the reciprocal of a root's degree as its exponent so that raising it back to that degree recovers x.
3. The exponential-and-logarithm definition extends the rule to every real exponent and agrees with the earlier cases.

## Real world

### Similar shapes

When all lengths are multiplied by a factor, area changes by its square and volume by its cube.

### Equal sharing

The size of an equal share of a fixed total is proportional to the reciprocal of the number of shares.

### Recovering a length

Taking the square root of a square's area recovers its side length. The exponent one half reverses squaring on positive values.
