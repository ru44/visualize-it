---
title: 'RSA key length: outrunning brute force'
summary: >-
  RSA lets anyone lock a message for you with a key you publish openly, and
  the only thing standing between an eavesdropper and your private key is how
  long that key is.
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

## Try it

1. Drag the key-length slider, x, up from 0 and watch the curve climb — read the y-axis value, log10(years), at a few points along the way.
2. Set x to 512 and read where the curve sits on the y-axis; that height is how many zeros follow the 1 in the number of years to crack it.
3. Push x up to 2048, the top of the slider, and read how much higher the curve has climbed compared to x = 512.

## Real-life examples

- **512-bit keys, once common.** Early web encryption used 512-bit RSA keys, since retired because the curve at x = 512 is already climbable by determined attackers with enough hardware.
- **1024-bit keys, the old standard.** For years, 1024-bit keys were the default for secure websites, sitting much higher on the curve but still eventually judged too short.
- **2048-bit keys, today's standard.** Most secure sites now use 2048-bit RSA keys, where the curve's height puts brute-force cracking beyond any computer built with current technology.

## Test yourself

1. Push the slider all the way to x = 2048, today's standard key length.
2. Pull the slider back down to x = 512, an old key length no longer considered safe.
3. Drag the slider until the curve's height, log10(years) on the y-axis, reaches 50 or higher — that's already 10^50 years to search everything.

## Intuition

Imagine a machine trying a trillion different keys every second, non-stop, hunting for the one exact key that unlocks a message — even at that speed, a short enough key falls in seconds, but every extra bit added to the key length doubles how long the search takes. Drag the slider, x, key length in bits, and watch the marker climb the single curve on screen: its height is $\log_{10}$ of how many years that same trillion-guesses-a-second machine would need to try every possible key of that length.

At x = 256 the marker sits near 57, meaning about $10^{57}$ years to search every key. That is far longer than the roughly $10^{10}$ years the universe has existed. Push x up toward 2048, the length real websites use today, and the curve keeps rising in a straight, almost unremarkable line, even though the number it stands for grows utterly beyond anything a computer could ever finish searching.

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
