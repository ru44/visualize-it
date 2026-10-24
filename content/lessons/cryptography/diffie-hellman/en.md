---
title: 'Diffie–Hellman: agreeing on a secret in public'
summary: >-
  Two people who have never met mix their way to the same secret colour while
  everyone watches — the trick that lets two computers set up a private
  channel over the open internet.
parameters:
  g: g — the public base everyone agrees on, drawn as a shared pot of paint
  a: a — Alice's secret exponent, her private pigment
  b: b — Bob's secret exponent, his private pigment
variables:
  - the remainder after dividing by p, applied after every multiplication
---

## Try it

1. Set g to 5 and a to 6: Alice mixes the public paint with her private pigment and lands on the public colour A = 8, which crosses the channel for everyone to see.
2. Slide b back and forth and watch Bob's side: whatever he picks, the two boxes at the bottom always settle on the exact same colour — a secret that was never sent.
3. Now wiggle a with everything else fixed: the bottom colour changes on both sides at once, yet nothing new ever crosses the middle except the two public mixes.

## Real-life examples

- **The worked exchange.** With g = 5, Alice's secret 6 and Bob's secret 9: Alice sends 8, Bob sends 11, and both privately mix their way to the same shared secret, 9.
- **Different secrets, same trick.** Change the secrets to a = 3 and b = 7: the public numbers change completely, but the two bottom boxes still match perfectly.
- **A weak base.** Set g to 2 with a = 11 and the public colour collapses to 1 — real systems choose g and p carefully precisely so that nothing this predictable can happen.

## Test yourself

1. With g = 5, find the secret exponent a that makes Alice's public number land on 8.
2. Keeping g = 5, find the secret exponent b that makes Bob's public number land on 11.
3. Still at g = 5, set the two secrets so both bottom boxes land on the shared secret 9.

## Intuition

Picture Alice and Bob at opposite ends of a crowded room, each holding the same pot of public paint — everyone can see it, that is the base $g$. Each of them stirs in a private pigment, their secret number, and holds up the result: those mixed colours, $A = g^{a} \bmod p$ and $B = g^{b} \bmod p$, are shouted across the room in the open.

Here is the magic: Alice stirs her own pigment into Bob's public mix, Bob stirs his into Alice's, and both land on the identical final colour — the shared secret $s$ — without it ever crossing the room. The eavesdropper in the middle holds the public paint and both public mixes, but unmixing a colour back into its pigments is exactly the discrete logarithm problem from the one-way functions lesson: easy to do forwards, hopeless to undo.

## Formal

Alice picks a secret $a$ and publishes $A = g^{a} \bmod p$; Bob picks a secret $b$ and publishes $B = g^{b} \bmod p$. Alice then computes $B^{a} \bmod p$ and Bob computes $A^{b} \bmod p$; both equal $g^{ab} \bmod p$, the shared secret $s = g^{ab} \bmod p$.

With $g=5$, $p=23$, Alice's secret $a=6$ and Bob's secret $b=9$: $A = 5^{6} \bmod 23 = 8$ and $B = 5^{9} \bmod 23 = 11$. Alice computes $11^{6} \bmod 23$, Bob computes $8^{9} \bmod 23$, and both reach 9 — the shared secret, even though it was never sent.

## Advanced

An eavesdropper who records $g=5$, $p=23$, $A=8$ and $B=11$ still cannot get the shared secret without recovering $a$ or $b$ from $A$ or $B$ — exactly the discrete logarithm problem. With $p=23$ that search takes seconds; real Diffie–Hellman uses primes hundreds of digits long, where the same search would outlast the age of the universe with all of today's computers combined. Modern connections usually run this exchange on elliptic curves (ECDH), where the same idea needs far shorter keys.

## Derivation

1. Alice raises the shared base to her secret power and publishes only where it lands.
2. Bob does the same with his own secret power and publishes his landing spot.
3. Each raises the other's public number to their own secret power, and both arrive at the same shared value.

## Real world

### HTTPS and TLS
Every time a browser shows a secure padlock icon, it likely just ran a version of this exchange to agree on a session key with the server.

### VPNs
Virtual private networks establish an encrypted tunnel by first agreeing on a shared secret this same way, without ever transmitting it directly.

### Signal and encrypted messaging
Apps that promise end-to-end encryption use a descendant of this protocol to agree on keys for every conversation, and often for every message.

### Perfect forward secrecy
Because fresh secret exponents can be thrown away after use, recording today's traffic does not let anyone decrypt it even if a device is later compromised.
