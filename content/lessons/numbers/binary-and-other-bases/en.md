---
title: Binary and other bases
summary: >-
  Count the same amount in twos, in sixteens, and in sixties — the base a
  clock has always used — and see why every base works the same way.
parameters:
  N: the number N, written in base 10
  b: the base b to count in
variables:
  - 'a digit, at place k, always less than the base'
  - 'the place value at position k — b raised to the power k'
  - the number being written, in base 10
---

## Try it

1. Set b to 2: the digit boxes fill with 0s and 1s, and 130 turns into a row of eight binary digits.
2. Set b to 16 instead: the same 130 now needs only two digit boxes, reading 8 and 2, the hexadecimal 82.
3. Set b to 60: the same 130 splits into two boxes reading 2 and 10 — exactly the "2 minutes, 10 seconds" a clock or stopwatch would show.

## Real-life examples

1. **Binary, base 2.** N = 130, b = 2: only digits 0 and 1 are allowed, so 130 needs eight digit boxes — 10000010.
2. **Hexadecimal, base 16.** N = 130, b = 16: digits run 0 to 15 (shown as 0–9 then A–F), so 130 fits in two boxes — 82.
3. **Base 60, the base a clock uses.** N = 130, b = 60: digits run 0 to 59, so 130 seconds becomes two boxes — 2 and 10, read as 2 minutes 10 seconds.

## Test yourself

1. Push N to its largest value, 3599 — one second short of a full hour in base 60.
2. Switch the base to 60 and watch the digit boxes turn into a clock reading.
3. Switch the base to 16 and find the number that reads 130 in base 10.

## Intuition

Counting in base 10 means each place is worth ten times the place to its right — ones, tens, hundreds. Counting in another base b works exactly the same way, just with a different multiplier: each place is worth b times the place to its right, and no single digit is ever allowed to reach b itself, so it rolls over to the next place instead. Drag b down to 2 and every digit box can only ever show 0 or 1, because base 2 has only two digits — the same 130 that fit in three digits at base 10 now spreads across eight boxes.

Drag b up to 60 and each digit box can show any value from 0 to 59, because base 60 has sixty digits — and this is not an invented example: it is exactly how a clock has counted for thousands of years. 130 seconds becomes two "digits": 2 and 10, read off as 2 minutes and 10 seconds, because a minute is one place-value step in base 60, precisely as a ten is one step in base 10.

## Formal

In base $b$, a number is written as digits $d_k$, each satisfying $0\le d_k<b$, with place value $b^{k}$ at position $k$ counted from the right, starting at $k=0$.

Converting a base-10 number to base $b$ means repeatedly dividing by $b$ and reading the remainders from last to first — the same long-division process regardless of which base is the target.

## Advanced

Bases that are powers of one another convert especially easily: base 16 groups binary digits four at a time ($16=2^{4}$) with no rounding, which is why hexadecimal is a compact shorthand for binary; base 60, by contrast, shares no such simple power relationship with base 10, which is exactly why converting seconds to minutes and hours needs its own repeated-division step rather than a shortcut.

## Derivation

1. 130 splits into one chunk of 16 taken eight times, plus a remainder of 2 taken once.
2. Written with explicit powers of 16, that is 8 times 16 to the power 1, plus 2 times 16 to the power 0.
3. So 130 in base 10 is written 82 in base 16.

## Real world

### Computers
Every value a computer stores is ultimately base 2, with base 16 used as a compact, human-readable shorthand for long strings of binary digits.

### Clocks and calendars
Hours, minutes and seconds are base 60 — a place-value system invented in ancient Mesopotamia that still runs every clock and stopwatch today.

### Angles and navigation
Degrees are split into 60 minutes and each minute into 60 seconds of arc, the same base-60 system used for time, applied to direction instead.

### Sports timing
A stopwatch reading like 2:10.45 mixes base 60 (minutes and seconds) with base 10 (the hundredths) in the very same number.
