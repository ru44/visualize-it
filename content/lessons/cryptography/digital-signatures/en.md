---
title: 'Digital signatures: a seal only one ring can press'
summary: >-
  Alice presses a seal only her private key can make, and the seal holds the
  contract's fingerprint — change a single digit on the way and the check snaps
  red, the trick behind verified updates, contracts and card payments.
parameters:
  p: p — Alice's first secret prime (the slider snaps to the nearest prime)
  q: q — Alice's second secret prime
  m: m — the contract, written as a number
  tamper: tamper — how much a forger adds to the contract in transit
variables:
  - the signature, the pressed seal
  - the contract's short fingerprint (its hash)
  - the signer's private exponent
  - the public modulus, built from the signer's two primes
  - the remainder after dividing by n, applied after raising to a power
---

## Try it

1. Keep p = 5, q = 11, m = 7 and tamper = 0 and follow the journey: the contract squashes to the fingerprint 50, Alice's private key d = 27 presses the seal 30 onto it, and Bob's check opens the seal back to 50 — green, the contract is hers and untouched.
2. Now slide tamper to 1: the contract arrives as 8 with fingerprint 10, but the seal still opens to 50 — the mismatch flips the verdict red, and the forgery is caught.
3. Put tamper back to 0 and slide m instead: every contract gets a different seal from the same ring, and the check stays green — Alice can re-sign anything, the forger never can.

## Real-life examples

- **The sealed contract.** With p = 5 and q = 11, the contract m = 7 carries the seal 30; Bob opens it to 50, the exact fingerprint he computes himself — the order is genuine.
- **A forged amount.** Same contract, tamper = 1: what arrives reads 8 and fingerprints to 10, yet the seal still opens to 50 — a bank catches the edit instantly.
- **A different ring.** p = 13 and q = 11 build n = 143: the contract m = 12 now carries the seal 63, which opens to its fingerprint 2 — any key pair works, as long as it is Alice's.

## Test yourself

1. Set the textbook signing — p = 5, q = 11 and m = 7 with tamper at 0 — and read the seal s = 30.
2. Turn forger: push tamper above zero and watch Bob's verdict flip red.
3. Give Alice the biggest ring here — p = 13 with q = 11, tamper back at 0 — and keep the verdict green.

## Intuition

Kings used to press a ring into hot wax: anyone could recognize the imprint, and nobody else owned the ring. On screen, Alice does the digital version. Her contract is the coloured number on the left; it gets squashed into a short fingerprint, and her private key presses a seal onto that fingerprint. The sealed contract then travels to Bob — and the tamper slider lets a forger bump the number on the way, so you can watch what happens to the seal.

The seal is RSA run backwards. Encryption locks with the public key so that only the private one opens it; a signature does the opposite — Alice locks the fingerprint with her private key, $s = h^{d} \bmod n$, and anyone can open it with the public one. Out falls the fingerprint $h$ that Alice sealed; Bob recomputes the fingerprint of whatever contract actually arrived and compares the two. Changing the contract is easy — pressing a matching new seal is not, because that needs $d$.

## Formal

To sign a message, first hash it to a short fingerprint $h = H(m)$, then raise the fingerprint to the private exponent: $s = h^{d} \bmod n$. To verify, anyone computes $s^{e} \bmod n$ with the public key and checks that it equals the fingerprint of the message that actually arrived — only the signer could have produced an $s$ that passes, because pressing it needs $d$.

Worked through with the sim's numbers: Alice's primes $p=5$ and $q=11$ give $n=55$ and $\varphi(n)=40$, so her keys are $e=3$ and $d=27$. The contract $m=7$ squashes to the fingerprint $h = (7^{2} + 1) \bmod 55 = 50$, the seal is $s = 50^{27} \bmod 55 = 30$, and opening it gives $30^{3} \bmod 55 = 50$ — the fingerprint again, so the seal holds.

## Advanced

Signing the fingerprint instead of the full contract keeps signing fast even for huge files — but it only works if the fingerprint is impossible to collide. The sim's toy rule is tiny, and with small primes you can even find two contracts that share a fingerprint, letting a forgery slip through with a warning; real hashes are 256 bits long, and no one has ever found two colliding documents. Real systems also never sign a raw hash exactly like this toy does: standard schemes such as RSA-PSS add carefully designed padding first, because textbook RSA signing on its own is vulnerable to forgery tricks that the padding blocks.

## Derivation

1. Squash the contract into its short fingerprint with the public rule; the default contract $7$ becomes $50$.
2. Press the seal: raise the fingerprint to the private exponent and reduce modulo $n$, giving $50^{27} \bmod 55 = 30$.
3. Anyone can open the seal with the public exponent, $30^{3} \bmod 55 = 50$, and land back on the fingerprint — compare it with the fingerprint of what arrived, and the contract is proven untouched.

## Real world

### Software update verification
Operating systems refuse to install an update unless its digital signature checks out, blocking tampered or fake updates before they run.

### Legally binding electronic signatures
Many countries recognize digital signatures on contracts as legally equivalent to a handwritten signature, backed by exactly this math.

### Cryptocurrency transactions
Every cryptocurrency transaction is signed by the sender's private key, letting anyone on the network verify it came from the right account without ever seeing that key.

### Website and code-signing certificates
Certificate authorities digitally sign the certificates that let browsers confirm a website, or a piece of downloaded software, is who it claims to be.
