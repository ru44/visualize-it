---
title: Scientific notation
summary: >-
  Write huge numbers like the world's population without running out of
  space for all the zeros.
parameters:
  e: the exponent e
variables:
  - the leading digit, always between 1 and 10
  - 'the exponent: how many places the decimal point shifts'
---

## Try it

1. Drag the orange dot along the ruler labelled «exponent e». Watch the icon in the middle jump from a school to a stadium to a crowd of people.
2. Set e to 9 and read the full written-out number on screen — then say "ten to the ninth" instead and notice how much faster that is.
3. Push e to 100. The icon becomes a plain number symbol — past a googol there is no landmark left to compare it to.

## Real-life examples

1. **Sweets sold at a school fair.** About $3\times10^{3}$, three thousand, matches the school icon on the ruler — small enough to write in full.
2. **Seats filling a stadium.** About $1\times10^{6}$, a million, matches the stadium icon — starting to be easier to say than to write.
3. **Everyone in a big country.** About $8\times10^{9}$, eight billion, matches the crowd icon — writing every digit would be absurd.

## Test yourself

1. Set e to 23, the exponent in Avogadro's number.
2. Push e above 50.
3. Reach the top of the scale: e = 100.

## Intuition

A school fair might sell three thousand sweets, and a packed stadium might seat a million people. Write both numbers out in full, and the stadium number already needs three more zeros. On the ruler, drag the orange dot from the school icon to the stadium icon: the picture jumps by a thousand, while the dot itself has barely moved.

Scientific notation captures that jump with two pieces. The first piece is a small leading digit: $a$ always sits between 1 and 10. The second piece is the exponent that counts the zeros: $e$ tracks how many places the decimal point shifts. Two numbers can share the same leading digit and still be far apart if their exponents differ — every extra step of $e$ makes the gap ten times bigger.

## Formal

Scientific notation writes a number as $a\times10^{e}$, where $1\le a<10$ and $e$ is a whole number. The digit $a$ carries the precise value; the exponent $e$ carries the scale.

Multiplying two numbers in this form is easy: multiply the leading digits and add the exponents, then re-normalise if the product of the digits reaches 10.

## Advanced

Floating-point numbers in a computer use exactly this idea: a sign, a "mantissa" playing the role of $a$, and an exponent playing the role of $e$, both stored in a fixed number of bits — which is why computers, too, run out of precision far from zero.

## Derivation

1. The world's population, written in full, is $\text{8,000,000,000}$ people — the same number as $8\times10^{9}$.
2. The leading digit $a$ is always kept between 1 and 10, so the number is never written as, say, $80\times10^{8}$.
3. The exponent $10^{e}$ does the heavy lifting: it counts the zeros, or equivalently, says how many places the decimal point shifts.

## Real world

### Chemistry
Avogadro's number, about $6.02\times10^{23}$, counts particles in a mole — writing it in full would take 24 digits.

### Astronomy
Distances to stars are given in scientific notation because writing them in metres would need dozens of digits.

### Computing
Very small and very large numbers in programming languages are often printed in scientific notation, like 6.02e23, once they grow past a certain size.
