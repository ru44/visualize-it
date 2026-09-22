---
title: 'Modular arithmetic: clock math'
summary: >-
  Numbers that wrap around instead of growing forever — like the hours on a
  clock. Tap a number to set the start, drag the walk forward, and watch it
  loop back to 0 every full turn.
parameters:
  n: n — the size of the clock, how many numbers before it wraps
  a: a — the starting number
  b: b — how many steps to walk forward
variables:
  - the remainder after dividing by n, the standard shorthand for "wraps around every n"
  - means "leaves the same remainder as", the sign for two numbers that land on the same clock position
---

## Intuition

Tap a number on the clock face to set the start, $a$. Each step of the walk moves one position clockwise, and every time it passes the top it has completed a full turn — the readout counts exactly how many full turns happened. Land past the last number and you don't fall off the clock, you keep going from 0: with a 12-hour clock, 7 plus 8 is not 15, it is 3, because one full lap got used up along the way.

The two highlighted numbers, the start and the final resting spot, are what the arithmetic actually cares about; the number of full laps in between is thrown away. That thrown-away count is exactly what "mod" removes — $(a+b) \bmod n$ keeps only where you land, never how many times you went around.

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
