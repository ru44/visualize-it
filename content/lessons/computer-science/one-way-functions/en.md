---
title: 'One-way functions: easy forward, hard backward'
summary: >-
  Raising a number to a power and wrapping it around a clock is quick in
  either direction to compute — but reversing it, finding the power from the
  result, has no known shortcut. Step k up and watch how fast the trail runs
  away from you.
parameters:
  n: n — the size of the clock
  a: a — the base being raised to a power
  k: k — the exponent, how many powers to show
variables:
  - the remainder after dividing by n, applied after every multiplication
---

## Intuition

Drag $k$ up and the widget lists $a^1, a^2, \dots, a^k$, each one wrapped around the clock of size $n$ by another mod. Computing the next entry only takes one more multiply-and-wrap, so even a huge $k$ is cheap: the trail you see is built one fast step at a time.

Now imagine being handed only the last number on that trail — the final position the widget lands on — with $a$ and $n$ but not $k$, and being asked which step produced it. Nothing about the list of landing spots tells you how far along you are; positions jump around the clock in no visible order as $k$ grows, so short of retracing the whole walk step by step, there is no known way to jump straight to the answer.

## Formal

A function is one-way when computing $c = a^{k} \bmod n$ from $a$, $k$ and $n$ is fast, but recovering $k$ from $a$, $c$ and $n$ — the discrete logarithm problem — has no known method faster than checking possibilities one by one for large $n$.

This is different from an ordinary power without the mod: given $c=a^{k}$ with no wrap-around, $k=\log_a c$ recovers the exponent instantly. The mod is what breaks that shortcut, because many different exponents can land on numbers that look unrelated once they wrap.

## Advanced

Think of it as a padlock: anyone can click it shut in an instant, but opening it without the key takes serious effort — a "trapdoor" that is easy to fall through one way and hard to climb back up. Cryptography builds on exactly this asymmetry: a one-way function lets everyone compute forward freely while only someone with extra information (the exponent, a prime factorization, or similar) can invert it, which is the seed idea behind both Diffie–Hellman key exchange and RSA.

## Derivation

1. Each new power only costs one more multiplication and one more wrap around the clock, however large k becomes.
2. Going backward from the result to the exponent — the discrete logarithm — has no known general shortcut for a well-chosen large n.
3. Without the mod, an ordinary logarithm would undo the power immediately; the wrap-around is exactly what removes that shortcut.

## Real world

### Diffie–Hellman key exchange
Two people publish numbers built this way and combine them into a shared secret that an eavesdropper, seeing only the public numbers, cannot reconstruct.

### Elliptic-curve cryptography
Modern HTTPS mostly uses a geometric cousin of this same one-way idea, chosen because it reaches the same security with much shorter keys.

### Password storage
Sites store a one-way transformation of a password rather than the password itself, so a stolen database does not hand out the originals directly.

### Digital signatures
Signing schemes rely on operations that are easy to check but hard to forge — the same easy-forward, hard-backward shape as a discrete logarithm.
