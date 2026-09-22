---
title: 'RSA: locking with one key, unlocking with another'
summary: >-
  Anyone can use your public key to lock a message for you, but only your
  private key can open it. Drag the key-length slider and watch how fast the
  number of possible keys — and the time to search them all — runs away.
parameters:
  x: x — key length in bits
variables:
  - the remainder after dividing by n, applied after raising to a power
charts:
  - title: 'Years to try every key by brute force, at a trillion guesses a second (log scale)'
    xLabel: key length x (bits)
    yLabel: log10(years)
    series:
      - log10(years) to search all keys
---

## Intuition

Drag the slider and the curve plots $\log_{10}$ of how many different keys exist for a key that many bits long — the raw count itself, $2^x$, would need more digits than fit on screen well before $x$ reaches 100. At $x=256$ the curve already sits near 77, meaning about $10^{77}$ possible keys: more than the number of atoms in the visible universe, from a key barely long enough to write down.

The second chart converts that same count into years to search it exhaustively at a trillion guesses a second, again as a power of ten. It plunges off any readable scale almost immediately — which is the entire point: RSA doesn't need to hide the public key or the method, only make guessing the private one this hopeless.

## Formal

RSA gives every user a public key, $(n,e)$, used to encrypt, and a private key, $d$, used to decrypt: encryption is $c = m^{e} \bmod n$ and decryption is $m = c^{d} \bmod n$. The number $n$ is the product of two large primes, and $e$, $d$ are chosen so that raising to the $e$-th power and then the $d$-th power gets back exactly where you started.

Worked through with tiny numbers: choose $p=5$, $q=11$, so $n=pq=55$ and $\varphi(n)=(p-1)(q-1)=40$. Pick $e=3$ and solve for $d$ with $ed \equiv 1 \bmod \varphi(n)$: $d=27$ works because $3\times27=81=2\times40+1$.

## Advanced

Encrypt the message $m=7$: $c = m^{e} \bmod n = 7^{3} \bmod 55 = 13$. Decrypt it back: $c^{d} \bmod n = 13^{27} \bmod 55 = 7$, recovering the original message exactly. Anyone who knows $n$ could recover $d$ from $e$ by factoring $n$ back into $p$ and $q$ — but for the real system's 2048-bit $n$, factoring is the hard, one-way step that keeps the private key safe even though the public key is, well, public. In practice RSA is too slow to encrypt whole messages directly, so it usually just encrypts a short random key for a much faster cipher that does the rest of the work.

## Derivation

1. Pick two primes, multiply them to get the modulus, and compute Euler's totient from them.
2. Choose a public exponent and solve for the private exponent that undoes it modulo the totient.
3. Raise the message to the public exponent to encrypt, and to the private exponent to decrypt, recovering the original number.

## Real world

### HTTPS padlock
Browsers often use RSA (or a discrete-log cousin) to agree on keys when a secure site's padlock appears, protecting the setup of the encrypted connection.

### Messaging apps
End-to-end encrypted apps use public-key systems like RSA to let two phones that have never met agree on how to protect a conversation.

### Bank cards and chips
Payment chips sign transactions with a private key that never leaves the card, while terminals verify with the matching public key.

### Password storage
Even where RSA itself isn't used, the same public/private split underlies how servers prove identity without ever exposing the secret that makes it work.
