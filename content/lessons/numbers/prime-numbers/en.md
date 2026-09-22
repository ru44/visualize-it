---
title: Prime numbers
summary: >-
  Learn the trick that finds every prime number up to 100 just by crossing
  out multiples, no dividing required.
parameters:
  N: the sieve size N
  p: primes used p
variables:
  - the number being tested for primality
  - the smaller of two factors
  - the larger of two factors
---

## Try it

1. Set p to 0 and look at the plain grid of numbers up to N, nothing crossed out yet.
2. Click the chip labelled 2. Watch every second number on the grid turn grey with a line through it — 4, 6, 8, and on.
3. Click 3, then 5, then 7. Once all four chips glow orange, every number still shown in solid orange below N is a prime.

## Real-life examples

1. **A small sieve.** Up to 50, crossing out multiples of 2 and 3 already removes most of the non-primes.
2. **The classic sieve.** Up to 100, crossing out multiples of 2, 3, 5 and 7 is enough to leave only the 25 primes below 100.
3. **A bigger, lighter sieve.** Up to 120, crossing out only multiples of 2 still removes half of all the numbers.

## Test yourself

1. Use all four primes (2, 3, 5, 7) on a sieve of 100 or more.
2. Shrink the sieve down to just 20 numbers.
3. Turn every prime filter off (p = 0) and look at the untouched grid.

## Intuition

Take the number 91 and ask whether it has a factor — that takes real work, one division at a time. On screen, click the chip labelled 2 instead, and every second number on the grid — 4, 6, 8, 10 — turns grey with a line through it in one go, no dividing needed.

Click the 3 chip, then 5, then 7, and each one crosses out its own multiples the same way. Whatever is left glowing orange below the sieve size, $N$, has never been crossed out by anything — and a number with no smaller factor is exactly what "prime" means.

## Formal

A whole number $N$ greater than 1 is prime if it cannot be written as $N=a\times b$ with $1<a\le b<N$. If such $a$ and $b$ exist, $N$ is composite.

The sieve of Eratosthenes finds every prime up to a limit by crossing out multiples of 2, then 3, then 5, and so on: each crossed-out number has just been shown to equal some $a\times b$.

## Advanced

It is enough to sieve with primes up to $\sqrt{N}$, since any composite $N$ has a factor no larger than $\sqrt{N}$ — this is why checking up to 7 clears everything below $100$, as $7<\sqrt{100}=10<11$.

## Derivation

1. First cross out every multiple of 2 from 4 upward: $2\times2$, $2\times3$, $2\times4$, and so on.
2. Then cross out every multiple of 3 from 9 upward: $3\times3$, $3\times4$, and so on — smaller multiples of 3 were already crossed out as multiples of 2.
3. Repeating this for each surviving number, whatever is never crossed out up to $N$ is prime.

## Real world

### Cryptography
Modern encryption relies on primes that are hundreds of digits long, far too large to sieve — factoring them back apart is what keeps the codes safe.

### Cicada broods
Some cicadas emerge only every 13 or 17 years — both prime numbers — which makes it harder for predators to time their own cycles to match.

### Gears and cogs
Engineers sometimes pick gear teeth counts that are coprime so that the same two teeth do not keep meeting, spreading out wear evenly.
