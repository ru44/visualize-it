---
title: 'Modular arithmetic: clock math'
summary: >-
  Clocks, calendars and computer memory all reuse the same small set of
  numbers by wrapping back to the start once they reach a limit, and modular
  arithmetic is the math that describes exactly how that wrapping works.
parameters:
  n: n — the size of the clock, how many numbers before it wraps
  a: a — the starting number
  b: b — how many steps to walk forward
variables:
  - the remainder after dividing by n, the standard shorthand for "wraps around every n"
  - means "leaves the same remainder as", the sign for two numbers that land on the same clock position
---

## Try it

1. Set the clock size "n" to 12, then tap the number 9 on the clock face to set the start, a.
2. Drag "b", how many steps to walk forward, up past 5 steps and watch the marker sail past the top of the clock and loop back around to the bottom.
3. Keep dragging b higher and check the "full turns" readout — it counts exactly how many times you lapped the clock.

## Real-life examples

- **A 12-hour clock.** Starting at 9 o'clock and counting 5 hours forward lands on 2 o'clock, not 14 — n = 12, a = 9, b = 5.
- **Days of the week.** If today is day 3 of a 7-day week, counting 10 days forward lands on day 6, not day 13 — n = 7, a = 3, b = 10.
- **A 24-hour clock.** Starting at hour 20 (8 pm) and adding 8 hours lands on hour 4 the next morning, not hour 28 — n = 24, a = 20, b = 8.

## Test yourself

1. Set the clock size to 12, then pick a start and a walk that land exactly back on 0.
2. Set the clock size to 7 and choose a walk, b, that lands exactly on 0 all by itself.
3. Pick a clock size bigger than the start plus the walk combined, so the marker never even reaches the top once.

## Intuition

Think of a 12-hour wall clock: point at 9, count 5 hours forward, and you land on 2, not 14, because the clock wraps back to 1 once it passes 12. Tap a number on the on-screen clock face to set that start, called $a$, then drag "b", how many steps to walk forward. Each step moves the marker one position clockwise, and every time it passes the top the readout adds one more full turn.

Land past the last number and you don't fall off the clock, you keep going from 0: with a 12-hour clock, 7 plus 8 is not 15, it is 3, because one full lap got used up along the way. The two highlighted numbers, the start and the final resting spot, are what the arithmetic actually cares about — the number of full laps in between is thrown away, which is exactly what $(a+b) \bmod n$ keeps and discards.

## Formal

For a clock of size $n$, $a \bmod n$ is the remainder left after removing every complete group of $n$ from $a$ — always a number from 0 to $n-1$. Addition on the clock is ordinary addition followed by this same wrap: $(a+b) \bmod n$.

Two numbers are congruent modulo $n$, written $a \equiv b \;(\bmod n)$, when they land on the same clock position — equivalently, when their difference is an exact multiple of $n$. 7 and 19 are congruent mod 12 because both point to the same hour and $19-7=12$ is a whole number of turns.

## Advanced

This single idea of wrapping is what every cipher in this course is built on. A Caesar cipher wraps letters after 26; a real cipher wraps huge numbers after some enormous $n$, but the operation is identical — add, then throw away complete laps. Modular arithmetic also behaves well under multiplication and exponentiation, not just addition, which is the property that lets whole numbers stand in for cryptographic keys without ever growing unmanageably large.

## Derivation

1. Two numbers give the same remainder when divided by $n$ exactly when they occupy the same clock position.
2. That is the same as saying their difference is some whole number of complete laps around the clock.
3. The compact notation for "same remainder mod n" is the congruence sign.

## Real world

### Telling time
A 12-hour clock is modular arithmetic in daily use: 9 o'clock plus 5 hours is 2 o'clock, not 14 o'clock.

### Day of the week
Adding days wraps every 7: if today is day 3 of the week, 10 days from now is day $(3+10) \bmod 7$, not day 13.

### Hash tables
A program spreads data across a fixed number of storage slots by computing key $\bmod$ (number of slots), reusing the same small set of buckets no matter how large the key is.

### Every cipher in this course
Caesar shifts wrap mod 26; the number games behind Diffie–Hellman and RSA wrap mod a chosen $n$ — the same clock idea at a much larger scale.
