---
title: 'Stream ciphers: a one-time pad made of maths'
summary: >-
  The one-time pad is perfect but needs a key as long as the message — a
  stream cipher fakes that endless key from a short one, and lives or dies by
  never serving the same stretch of it twice.
parameters:
  key: key — the short secret both sides share
  nonce: nonce — the number-used-once for message 1
  nonce2: nonce — the number used for message 2
variables:
  - the message letter at position i
  - the cipher byte at position i
  - the keystream byte at position i, generated from the key, the nonce and i
---

## Try it

1. Look at message 1: each letter meets one keystream byte, they XOR together, and the cipher byte drops out below — the keystream colours change completely if you nudge the key.
2. Slide the second nonce around while the first stays at 7: as long as the two differ, the bottom row stays quiet and the two ciphertexts share nothing.
3. Now set the second nonce to exactly 7, the same as the first — the keystreams match, and the bottom row lights up with the two messages XORed into each other, no key needed.

## Real-life examples

- **Two healthy messages.** The same key with nonces 7 and 8 gives two unrelated keystreams — exactly how your phone encrypts every packet with the same key but a fresh counter.
- **The reuse disaster.** The same key with nonce 7 twice: the eavesdropper XORs the two ciphertexts, the keystream cancels, and ATTACK ⊕ RETIRE is left naked on the wire.
- **A fresh key entirely.** Key 200 with far-apart nonces — even knowing the old traffic, yesterday's keystream says nothing about today's.

## Test yourself

1. Cause the leak: give message 2 the same nonce as message 1 and read the attack row.
2. Repair the damage: move to key 200 and give the two messages different nonces again.
3. Push the key to its highest value, 255, and notice every keystream byte changes at once.

## Intuition

The one-time pad lesson ended with bad news: perfect secrecy needs a truly random key as long as every message you will ever send. A stream cipher is the practical answer — a little machine $G$ that eats a short key plus a nonce (a number used once) and breathes out an endless stream of key-like bytes. On screen, each letter of the message meets its own keystream byte and they XOR into a cipher byte, exactly the one-time pad move, just with manufactured pad.

The whole contract sits in that word "once". XOR the two ciphertexts of two messages that shared a keystream and the keystream cancels itself out — what remains is one message XORed with the other, and no key in the world is involved anymore. The screen shows that collapse the moment the two nonces agree: the attacker's row at the bottom suddenly equals plain 1 ⊕ plain 2, which crossword-style guessing unravels in minutes.

## Formal

A stream cipher builds the keystream $k_i = G(\text{key}, \text{nonce}, i)$ with a deterministic generator $G$, then encrypts by $c_i = p_i \oplus k_i$ and decrypts by the same operation, since XORing the same byte twice cancels. The receiver only needs the short key and the nonce — which travels in the clear — to rebuild the identical keystream.

Reuse is the one fatal sin: if two messages share a keystream, then $c_i \oplus c'_i = p_i \oplus p'_i$, and the attacker holds the XOR of two plaintexts without touching the key. Security therefore rests on two legs — $G$ must be unpredictable without the key, and the (key, nonce) pair must never repeat.

## Advanced

The real thing is ChaCha20, designed by Daniel Bernstein: a 256-bit key, a 96-bit nonce and a 32-bit block counter feed a scramble of additions, XORs and bit-rotations that outputs the keystream 64 bytes at a time. It encrypts a good share of today's web traffic — TLS on most phones, WireGuard VPNs — because it runs fast in pure software. Its menace is the same as the toy's: repeat a nonce under the same key and the pad collapses, which is why standards bind the nonce to a counter and why the 2008 Windows XP-era RC4 attacks and the PlayStation 3 signing disaster are taught as warnings.

## Derivation

1. The generator stretches a short key and a fresh nonce into as many keystream bytes as the message needs.
2. XOR locks the message against the keystream, and the identical XOR unlocks it at the other end.
3. Two ciphertexts built on one keystream cancel it between them, leaking the two messages XORed together.

## Real world

### ChaCha20 in TLS
When a phone opens most secure websites, ChaCha20-Poly1305 encrypts the traffic — a stream cipher at full speed, with a counter making every block's nonce unique.

### WireGuard VPNs
The modern VPN protocol encrypts every packet with ChaCha20, trusting a strict counter discipline to keep any keystream from ever repeating.

### The Venona break
Soviet one-time pads were reused under wartime pressure in the 1940s; American analysts XORed matching ciphertexts and read thousands of messages — the exact attack this lesson shows.

### Wi-Fi's broken WEP
The old Wi-Fi encryption used RC4 with a 24-bit nonce, so busy networks repeated nonces within hours; tools automated the keystream-reuse attack and WEP had to be abandoned.
