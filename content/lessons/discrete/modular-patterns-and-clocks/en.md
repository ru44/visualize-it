---
title: 'Modular patterns: tables, clocks and divisibility tricks'
summary: 'Read division as complete groups plus a remainder, and see why equal remainders line up in the same column.'
parameters:
  cols: 'm — row width, or divisor'
  highlight: 'n — selected number from 0 to 47; tap a cell'
variables:
  - 'n: number being divided'
  - 'q: quotient, or complete groups of m'
  - 'm: positive divisor and row width'
  - 'r: remainder, from 0 to m − 1'
---

## Try it

1. Set cols = 7 and highlight = 23. The readouts give quotient 3 and remainder 2: 23 = 3 × 7 + 2.
2. Keep 23 selected and set cols = 10. Now 23 = 2 × 10 + 3, so the remainder becomes 3.
3. Set cols = 7 and select 0, 7, 14 and 21 in turn. Each has remainder 0 and lies in the first column.

## Real-life examples

1. **Weekly cycles.** With width 7 and number 23, there are three complete weeks and two extra days. A date 23 days after a starting date falls two weekdays later than that starting weekday.
2. **Tens and units.** With width 10, number 36 has quotient 3 and remainder 6: three tens and six units. Its digit sum is 9, so it is divisible by 9.
3. **Groups of eleven.** With width 11, number 33 is 3 × 11 with no remainder. It sits at the start of a row, in column 0.

## Test yourself

1. Set cols = 7 and select a number in the remainder-0 column.
2. Select a number in the displayed range 0–47 whose digit sum is divisible by 9.
3. Select a multiple of 11 that is at least 11.

## Intuition

Arrange 0 through 47 in rows of seven. The first row is 0 through 6; the next begins at 7. Number 23 comes after three full rows, with two positions left over. We number rows and columns from zero, so it is in row 3, column 2.

Numbers in the same column differ by whole rows. For example, 2, 9, 16 and 23 all leave remainder 2 after division by 7. Changing the row width changes the remainders. A zero remainder means the number is exactly divisible by the width.

## Formal

For a nonnegative integer $n$ and a positive integer $m$, there are unique integers $q$ and $r$ satisfying $n=qm+r$ and $0\le r<m$. Here q is the quotient and r is the remainder. The diagram uses m as its row width.

Two integers are congruent modulo m when their difference is divisible by m. For the displayed nonnegative integers, this means they have the same remainder and occupy the same column. We write $a\equiv b\pmod m$.

## Advanced

In decimal notation, 10 and every power of 10 are congruent to 1 modulo 9 and modulo 3. Thus a number and its digit sum have the same remainder for either divisor. Modulo 11, 10 is congruent to −1, so alternating addition and subtraction of digits gives the divisibility test. The standard nonnegative remainder of 10 divided by 11 is still 10; −1 is a congruent value, not that standard remainder.

## Derivation

1. Each row contains m positions. Moving down one full row adds m to the number.
2. A number in row q and column r is therefore qm + r, with both indices starting at zero.
3. Columns run from 0 to m − 1. Numbers in a fixed column share r, so they have the same remainder.

## Real world

### Weekdays

To find a weekday after a number of days, start from a known weekday and use the remainder modulo 7. A calendar date's remainder alone does not identify its weekday without that starting reference.

### Repeating turns

If five players take turns, turn numbers separated by 5 belong to the same player. The remainder tracks a position in the cycle; first choose whether turn numbering starts at 0 or 1.
