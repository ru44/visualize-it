---
title: 'RSA: a padlock anyone can snap shut'
summary: >-
  Bob hands out thousands of open padlocks; anyone can click one shut around a
  message, but only Bob's private key opens it — and the gap between locking
  and unlocking is the difficulty of factoring one giant number.
parameters:
  p: p — Bob's first secret prime (the slider snaps to the nearest prime)
  q: q — Bob's second secret prime
  m: m — the message Alice wants to lock, written as a number
variables:
  - the remainder after dividing by n, applied after raising to a power
---

## Try it

1. Keep p = 5, q = 11 and m = 7 and follow the journey left to right: the open padlock (n = 55, e = 3) travels to Alice, her message leaves as the locked box c = 13, and Bob's private key d = 27 opens it back to exactly 7.
2. Slide m up and down and watch only the locked box change — the padlock and the key never move, because one lock serves every message.
3. Now drag q down until it sits on the same prime as p: the picture stops with a warning, because a lock built from one prime squared gives its factors away instantly.

## Real-life examples

- **The textbook numbers.** p = 5 and q = 11 give n = 55; locking m = 7 produces the box c = 13, and Bob's d = 27 brings back exactly 7.
- **A different lock.** p = 3 and q = 11 build a smaller padlock, n = 33 — the same kind of message locks into a completely different box, with a different key.
- **The biggest lock here.** p = 13 and q = 11 give n = 143, still laughably small: any computer factors it in a blink, which is why real locks use an n of 617 digits.

## Test yourself

1. Set the textbook run — p = 5, q = 11 and the message m = 7 — and read c = 13 off the locked box.
2. Break the lock on purpose: drag p and q onto the same prime and read what the warning says.
3. Build the biggest padlock these sliders allow: p = 13 with q = 11.

## Intuition

Bob makes two secret primes, multiplies them into one public number $n$, and hangs an open padlock stamped $(n, e)$ where anyone can grab it. Alice clicks it shut around her message — on screen, $m$ turns into the locked box $c$ — and from that moment not even she can reopen it: snapping a padlock shut needs no key, opening it does.

The eavesdropper watches everything cross the wire: the padlock $(n, e)$ and the locked box $c$. Her only way in is to split $n$ back into the two primes it came from, and that is the whole secret of RSA — multiplying $5 \times 11$ is instant, but un-multiplying a 617-digit $n$ is beyond every computer on Earth running together for longer than the universe has existed.

## Formal

RSA gives every user a public key, $(n,e)$, used to encrypt, and a private key, $d$, used to decrypt: encryption is $c = m^{e} \bmod n$ and decryption is $m = c^{d} \bmod n$. The number $n$ is the product of two large primes, and $e$, $d$ are chosen so that raising to the $e$-th power and then the $d$-th power gets back exactly where you started.

Worked through with tiny numbers: choose $p=5$, $q=11$, so $n=pq=55$ and $\varphi(n)=(p-1)(q-1)=40$. Pick $e=3$ and solve for $d$ with $ed \equiv 1 \bmod \varphi(n)$: $d=27$ works because $3\times27=81=2\times40+1$.

## Advanced

Encrypt the message $m=7$: $c = m^{e} \bmod n = 7^{3} \bmod 55 = 13$. Decrypt it back: $c^{d} \bmod n = 13^{27} \bmod 55 = 7$, recovering the original message exactly. Anyone who knows $n$ could recover $d$ from $e$ by factoring $n$ back into $p$ and $q$ — but for the real system's 2048-bit $n$, factoring is the hard, one-way step that keeps the private key safe even though the public key is, well, public. In practice RSA is too slow to encrypt whole messages directly, so it usually just locks a short random key for a much faster cipher that does the rest of the work.

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
