---
title: 'Digital signatures: proving a message wasn''t changed'
summary: Anyone can check a digital signature, yet only one person could ever have created it — the same trick behind every verified download and "verified" badge.
parameters:
  pos: character changed
variables:
  - the signature
  - the message's short fingerprint (its hash)
  - the signer's private exponent
  - the shared modulus, public knowledge
  - the remainder after dividing by n, applied after raising to a power
---

## Try it

1. Look at the two labels: both start as "pay 100", the amount an order requests to be paid.
2. Drag «pos» to choose which character of "pay 100" gets changed, and watch the right-hand 256-square fingerprint scramble completely.
3. Watch the count at the bottom: about half of the 256 squares flip, however small the change to the order was — exactly the trace an attacker's edit would leave behind.

## Real-life examples

1. **The original signed order.** «pos» = 0 changes only the "p" of "pay", showing that even the least important-looking letter still scrambles the fingerprint completely.
2. **An attacker edits the amount's leading digit.** «pos» = 4 changes the "1" in "100" to something else, turning a 100-unit payment into a forged, different amount.
3. **An attacker edits a trailing zero.** «pos» = 5 changes one of the zeros in "100", again producing an unrecognizable fingerprint the old signature can no longer match.

## Test yourself

1. Set «pos» to 4, the digit that decides the payment's amount.
2. Set «pos» back to 0, the very first letter of the order.
3. Choose any «pos» from 4 to 6, anywhere inside the number "100".

## Intuition

Imagine a bank approves a payment order that reads "pay 100", and needs a way to prove later that this exact order, and no other, was approved. On screen, both labels start out as "pay 100"; drag «pos» to change one character of it, and the right-hand grid of 256 small squares recomputes a brand-new fingerprint for the edited order, live. Compare it with the left grid, the fingerprint of the untouched order: the squares outlined in red are the ones that flipped, and roughly half of all 256 always do, however small the edit.

A signature does not sign the whole order directly; it signs the order's short fingerprint instead. With a tiny toy version of RSA where $n = 55$ and a private key $d = 27$, signing the fingerprint $h = 13$ gives $s = h^{d} \bmod n = 13^{27} \bmod 55 = 7$.

## Formal

To sign a message, first hash it to a short fingerprint $h = H(M)$, then raise that fingerprint to the private exponent, $s = h^{d} \bmod n$; only the signer, who alone knows $d$, can produce a valid $s$ for a given $h$.

Anyone can check the signature using the public exponent $e$, by testing whether $s^{e} \bmod n = h$; with the toy numbers above, $7^{3} \bmod 55 = 13$, which does equal the original fingerprint, so the signature checks out.

## Advanced

Signing the fingerprint instead of the full message keeps signing fast even for huge files, and it works only because hashing has the avalanche property: change a single character anywhere in the order and its fingerprint $h$ becomes an unrelated number, so the old signature $s$ no longer satisfies $s^{e} \bmod n = h$ for the new hash, and the forgery is caught instantly. Real systems never sign a raw hash exactly like this toy example; standard schemes such as RSA-PSS add carefully designed padding first, because textbook RSA signing on its own is vulnerable to certain forgery tricks that padding blocks.

## Derivation

1. Compute the order's fingerprint with a public hash function; here, as a stand-in, treat that fingerprint as the number 13.
2. Raise the fingerprint to the private exponent and reduce modulo $n$, producing the signature: $13^{27} \bmod 55 = 7$.
3. Anyone can raise that signature to the public exponent and reduce modulo $n$ again, and it lands back on the original fingerprint, $7^{3} \bmod 55 = 13$, proving the signature is genuine.

## Real world

### Software update verification
Operating systems refuse to install an update unless its digital signature checks out, blocking tampered or fake updates before they run.

### Legally binding electronic signatures
Many countries recognize digital signatures on contracts as legally equivalent to a handwritten signature, backed by exactly this math.

### Cryptocurrency transactions
Every cryptocurrency transaction is signed by the sender's private key, letting anyone on the network verify it came from the right account without ever seeing that key.

### Website and code-signing certificates
Certificate authorities digitally sign the certificates that let browsers confirm a website, or a piece of downloaded software, is who it claims to be.
