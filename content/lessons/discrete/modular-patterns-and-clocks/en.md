---
title: 'Modular patterns: tables, clocks and divisibility tricks'
summary: >-
  Lay the counting numbers out in rows of a fixed width and same-remainder
  numbers line up in tidy columns — the pattern behind calendars,
  hundred-squares, and quick tests for whether a number divides by 3, 9 or 11.
parameters:
  cols: width — how many numbers per row, the modulus
  highlight: number — which number to inspect (tap a cell)
variables:
  - the number being placed in the table
  - the quotient — how many complete rows come before it
  - the width of each row — the modulus
  - the remainder — how far into its row the number sits
---

## Try it

1. Tap the number 23 (or any cell) and read off its remainder and quotient in the readouts below.
2. Drag "width" from 7 up to 10 and watch every number slide into a new column — same numbers, completely different stripe pattern.
3. Set "width" back to 7 and tap a few numbers in the very first column: 0, 7, 14, 21 — all multiples of 7, all sharing remainder 0.

## Real-life examples

1. **A calendar page.** With width 7, like the seven columns of a printed calendar, the number 23 sits two places into its row: the 24th day of a month lands on the same weekday as the 3rd and the 17th.
2. **A hundred-square.** With width 10, the digits of a number read straight off its row and column: 36 sits in row 3, column 6, and its digits, 3 and 6, add up to 9 — a quick test for whether 9 divides it evenly.
3. **An eleven-wide table.** With width 11, the number 33 lands exactly on the end of its row, remainder 0: its two digits are equal, 3 and 3, which is always true for two-digit multiples of 11.

## Test yourself

1. Set the width to 7 and pick a highlighted number that lands in the very first column, remainder 0.
2. Pick any highlighted number under 60 whose digits add up to a multiple of 9.
3. Pick a highlighted number of 11 or more that is exactly divisible by 11 — its two digits will be equal.

## Intuition

Lay the whole numbers 0, 1, 2, 3, … out in rows, a fixed number wide, and something falls into place immediately: numbers directly below each other always differ by exactly that row width, so they all leave the same remainder when divided by it. Drag "width" and watch every number in the grid slide sideways into a new column, because the remainder each number leaves depends entirely on how wide the rows are.

Tap any number to see its own row and column highlighted: the row tells you the quotient, how many complete rows of that width came before it, and the column tells you the remainder, how far short of finishing one more row it fell. Multiples of the row width always land in the very first column, remainder 0, which is exactly why they stand out, shown here in bold.

## Formal

The division algorithm says that for any whole number $n$ and any positive width $m$, there exist unique whole numbers $q$ and $r$ with $n = q\cdot m + r$ and $0 \le r < m$. Arranging the numbers in rows of length $m$ is exactly this statement made visible: $q$ counts the completed rows and $r$ is the position within the current one.

Two numbers with the same remainder $r$ are called congruent modulo $m$, and they always occupy the same column of the table. That single fact underlies several classic shortcuts: a number is divisible by 3 exactly when its digit sum is, and the same holds for 9, because both 10 and its powers leave remainder 1 modulo 3 and modulo 9, so each digit contributes its own value to the remainder no matter its place.

## Advanced

Divisibility by 11 uses a related but different trick, because 10 leaves remainder $-1$, not $1$, modulo 11: alternately adding and subtracting a number's digits from right to left gives a total with the same remainder mod 11 as the original number. For a two-digit number that alternating sum is simply the difference of its two digits, which is why every two-digit multiple of 11, from 11 and 22 up to 99, has matching digits.

## Derivation

1. Line up the whole numbers 0, 1, 2, … in rows of length $m$: each full row uses up exactly $m$ consecutive numbers before starting the next one.
2. Writing $n = q\cdot m + r$ splits $n$ into $q$, the count of complete rows already used, and $r$, the leftover position within the row still in progress.
3. Since $0 \le r < m$ always holds, every number sharing the same $r$ falls in the very same column, so a table's columns are exactly the remainder classes modulo $m$.

## Real world

### Printed calendars
A month's calendar grid is seven columns wide because a week has seven days; the day of the week for any date is just that date's remainder when divided by 7.

### Hundred-squares in primary classrooms
The classic ten-wide "hundred square" used to teach place value is a modular table in disguise: its columns are the ones-digits, the remainder classes modulo 10.

### Checking long account and card numbers
Bank account and card numbers carry a built-in check digit computed with a divisibility rule, so a single mistyped digit almost always makes the remainder come out wrong and the error gets caught immediately.

### Barcodes and ISBNs
Barcodes and book ISBNs both include a check digit built from a weighted remainder calculation, letting a scanner instantly detect a misread digit before the wrong product or book is looked up.
