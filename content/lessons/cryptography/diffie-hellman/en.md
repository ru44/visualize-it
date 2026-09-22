---
title: 'Diffie–Hellman: agreeing on a secret in public'
summary: >-
  Two people who have never met privately can still agree on a secret number
  in full view of an eavesdropper, which is the trick that lets two computers
  set up a private channel over the open internet.
parameters:
  n: n — the shared clock size, called p in the worked example
  a: a — the shared starting point, called g (the generator)
  k: k — how many powers to show, Alice's secret exponent in the example
variables:
  - the remainder after dividing by n, applied after every multiplication
---

## Try it

1. Set k to 6, Alice's secret exponent, with a = 5 and n = 23, and read the public number she lands on and sends across the room.
2. Now set k to 15, Bob's secret exponent, and read the different public number he sends back.
3. Set k to 1, the smallest possible secret, and notice how little climbing that leaves for anyone trying to guess it.

## Real-life examples

- **Alice's secret, k = 6.** With the shared numbers g = 5 and p = 23, Alice's secret exponent 6 produces the public number 8 that she sends across the room.
- **Bob's secret, k = 15.** Using the same shared numbers, Bob's secret exponent 15 produces the public number 19 that he sends back.
- **A barely-secret exponent, k = 1.** With k = 1 the "secret" is just the public base itself, showing why real Diffie–Hellman always picks a much larger, unpredictable exponent.

## Test yourself

1. With a = 5 and n = 23, find the secret exponent k that makes the widget land on 8, Alice's public number.
2. Keeping a = 5 and n = 23, find the secret exponent that lands on 19, Bob's public number.
3. Set k down to 1, the smallest secret exponent the slider allows.

## Intuition

Picture Alice and Bob shouting numbers across a room full of eavesdroppers, agreeing out loud that everyone can hear g = 5 and p = 23 — a shared base and clock size, both public. Alice picks a secret exponent — set k to 6 to see it — and the widget climbs $g^{k} \bmod p$ just like the one-way function lesson, landing on 8: that is the number she actually shouts across the room.

Bob does the same climb with his own secret exponent, 15, landing on 19, which he shouts back. Neither of them has revealed their secret number, only where it lands on the public clock — and yet each can now combine the other's public landing spot with their own secret exponent and arrive at the exact same number, 2, without ever sending it.

## Formal

Alice picks a secret $a$ and publishes $A = g^{a} \bmod p$; Bob picks a secret $b$ and publishes $B = g^{b} \bmod p$. Alice then computes $B^{a} \bmod p$ and Bob computes $A^{b} \bmod p$; both equal $g^{ab} \bmod p$, the shared secret $s = g^{ab} \bmod p$.

With $g=5$, $p=23$, Alice's secret $a=6$ and Bob's secret $b=15$: $A = 5^{6} \bmod 23 = 8$ and $B = 5^{15} \bmod 23 = 19$. Alice computes $19^{6} \bmod 23$, Bob computes $8^{15} \bmod 23$, and both reach 2 — the shared secret, even though it was never sent.

## Advanced

An eavesdropper who records $g=5$, $p=23$, $A=8$ and $B=19$ still cannot get the shared secret without recovering $a$ or $b$ from $A$ or $B$ — exactly the discrete logarithm problem from the previous lesson. With $p=23$ that search takes seconds; real Diffie–Hellman uses primes hundreds of digits long, where the same search would outlast the age of the universe with all of today's computers combined.

## Derivation

1. Alice raises the shared base to her secret power and publishes only where it lands.
2. Bob does the same with his own secret power and publishes his landing spot.
3. Each raises the other's public number to their own secret power, and both arrive at the same shared value.

## Real world

### HTTPS and TLS
Every time a browser opens a secure padlock icon, it likely just ran a version of this exchange to agree on a session key with the server.

### VPNs
Virtual private networks establish an encrypted tunnel by first agreeing on a shared secret this same way, without ever transmitting it directly.

### Signal and encrypted messaging
Apps that promise end-to-end encryption use a descendant of this protocol to agree on keys for every conversation, and often for every message.

### Perfect forward secrecy
Because fresh secret exponents can be thrown away after use, recording today's traffic does not let anyone decrypt it even if a device is later compromised.
