---
title: 'One-way functions: easy forward, hard backward'
summary: >-
  Locks that snap shut in an instant but take forever to pick without the key
  are exactly what keeps a secret safe online, and raising a number to a
  power on a clock face is one of the simplest calculations that behaves that
  way.
parameters:
  n: n — the size of the clock
  a: a — the base being raised to a power
  k: k — the exponent, how many powers to show
variables:
  - the remainder after dividing by n, applied after every multiplication
---

## Try it

1. Set a to 5 and n to 23, then drag k from 1 up to 3 and read the growing list $a^1, a^2, a^3$ mod 23.
2. Keep dragging k up to 8. Notice the list is no harder to build — each new entry costs one more multiply-and-wrap.
3. Try to guess, just by looking at the last number on the list, which value of k produced it. Notice there's no shortcut — you'd have to retrace the whole climb.

## Real-life examples

- **A small padlock, k = 3.** With base 5 on a 23-hour clock, climbing just 3 steps already lands somewhere that looks unrelated to 5 or 23 at a glance.
- **A slightly bigger lock, k = 8.** Same base and clock, but 8 steps up — computing it costs only a few more multiplications, yet guessing 8 from the landing spot alone is already hard.
- **A different clock and base, n = 29, a = 2, k = 11.** Changing the clock size and base still keeps the forward climb cheap and the backward guess just as blind.

## Test yourself

1. With a fixed at 5 and n fixed at 23, find the value of k that makes the widget land on 10.
2. Push k all the way up to 12, the highest exponent the slider allows.
3. Set the base a to 0 and the clock size n close to 30, and see why every single power lands on the same spot — a bad choice for a real lock.

## Intuition

Imagine a padlock that takes one second to click shut no matter how thick its shackle is, but could take years to pick without the key: that mismatch between locking and unlocking is what a one-way function captures in numbers. Set the base a to 5 and the clock size n to 23, then drag k, the exponent, up from 1. The widget lists $a^1, a^2, \dots, a^k$, each one wrapped around the clock by another mod, and computing the next entry only takes one more multiply-and-wrap — so even k = 12 is cheap to build one step at a time.

Now imagine being handed only the last number on that trail — the final position the widget lands on — with a and n known but k hidden, and being asked which step produced it. Nothing about the list of landing spots gives it away; positions jump around the clock in no visible order as k grows, so short of retracing the whole walk step by step, there is no known way to jump straight to the answer.

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
