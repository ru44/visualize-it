---
title: Binary and other bases
summary: Write the same quantity in different number systems by changing the value of each place.
parameters:
  N: number N in decimal
  b: base b
variables:
  - digit value in position k; from zero to one less than the base
  - value of position k, counting from zero on the right
  - total value, written in decimal
---

## Try it

1. Set N to 130 and b to 2. The display reads 10000010. The two nonzero places contribute 128 and 2.
2. Keep N at 130 and set b to 16. The display reads 82: eight sixteens and two ones.
3. Set b to 60. The places hold values 2 and 10. The digit symbol A represents ten here; the time display reads 02:10.

## Real-life examples

1. **Binary.** With N = 130 and b = 2, the value is written 10000010. Only 0 and 1 are needed as digits.
2. **Hexadecimal.** With N = 130 and b = 16, it is written 82. Letters A through F represent digit values ten through fifteen.
3. **Minutes and seconds.** With N = 130 and b = 60, there are two groups of sixty and ten left over. If the units are seconds, that is two minutes and ten seconds.

## Test yourself

1. Set N to 3599.
2. Set b to 60.
3. Set b to 16 and N to 130.

## Intuition

In decimal, 130 means one hundred, three tens and zero ones. Each place is worth ten times the place on its right. The base tells us that multiplier. Changing the base changes the way we write the quantity, not the quantity itself.

In base 2, the places are worth 1, 2, 4, 8 and so on, reading from right to left. Each digit is either 0 or 1. To write 130, use one 128 and one 2, with zeros in the other places. That gives 10000010.

In base 16, the places begin with ones and sixteens. Eight sixteens make 128; two more make 130, so the representation is 82. Always check the base before reading the digits: 82 in hexadecimal is not eighty-two in decimal.

## Formal

In base $b$, position k has value $b^k$, starting with k = 0 on the right. Each digit $d_k$ satisfies $0\le d_k<b$. Multiply each digit by its place value and add the results.

To convert a nonnegative whole number into a new base, divide repeatedly by the base and record the remainders. Read them from the last remainder to the first. For 130 in base 16, the first division gives quotient 8 and remainder 2; the next gives quotient 0 and remainder 8.

## Advanced

One hexadecimal digit corresponds to four binary digits because $16=2^4$. This allows conversion in groups of four bits. Minutes and seconds also illustrate grouping by a base, but ordinary time notation mixes conventions: seconds and minutes use groups of sixty, while hours in a day use groups of twenty-four.

## Derivation

1. Divide 130 into eight groups of 16 with 2 left over.
2. Write the place values as powers of 16. The rightmost place is worth one, and the next is worth sixteen.
3. Write the digits 8 and 2 in those places. The subscripts distinguish decimal from hexadecimal.

## Real world

### Computer data

Binary digits represent two states. Hexadecimal gives people a shorter way to write a long binary value.

### Time intervals

130 seconds is two minutes and ten seconds because each minute contains sixty seconds. A stopwatch may then use decimal fractions for parts of a second.

### Digital colors

A hexadecimal color value uses two digits for each of its red, green and blue channels. The letters are digit symbols, not separate quantities.
