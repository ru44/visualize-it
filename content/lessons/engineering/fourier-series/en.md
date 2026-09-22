---
title: Fourier series
summary: >-
  Any periodic wave — a square wave, a guitar note, a video clock signal — is
  just a sum of pure sine waves at multiples of one base frequency; add enough
  of them and the sum locks onto the shape.
parameters:
  N: N — highest harmonic kept in the sum
  x: x — position along one cycle
variables:
  - f — the periodic signal being rebuilt, here a square wave
  - N — the highest harmonic number included; drag it up to add more sine terms
  - k — the harmonic number — 1 is the fundamental, 3 the third harmonic, and so on
  - >-
    a_k — the share of harmonic k in the sum; for a square wave only odd k
    contribute, shrinking as 1/k
---

## Intuition

The curve on screen starts as a single sine wave and, as you drag N up, sprouts sharper shoulders and flatter tops — each extra term nudges it closer to a square wave. Only odd harmonics show up, and each one is weaker than the last: the third harmonic is a third as tall, the fifth a fifth, and so on.

Even at N = 11 the corners still overshoot and ring a little before settling — the famous Gibbs ripple. No matter how many harmonics you add, that small spike near a jump never shrinks below about 9% of the jump's height; it just squeezes closer to the corner.

## Formal

Any periodic function with period $2\pi$ can be written as a sum of sines and cosines of $x, 2x, 3x, \dots$; a square wave's expansion keeps only odd multiples, $f(x) = \frac{4}{\pi}\sum_{k=1,3,5,\dots}^{N}\frac{\sin(kx)}{k}$, and converges to the square wave as $N \to \infty$.

Each coefficient $a_k = \frac{4}{\pi k}$ for odd $k$ and $0$ for even $k$ sets how loud that harmonic is; doubling the harmonic number roughly halves its contribution.

## Advanced

The partial sums never converge uniformly at a jump: the overshoot approaches a fixed fraction of the jump (about 9%) as $N \to \infty$, a fact that limits how sharply a band-limited system can ever reproduce a true edge — a constraint that reappears in image compression and digital filter design.

## Derivation

1. Each harmonic's amplitude comes from matching the square wave against $\sin(kx)$; odd harmonics survive, even ones cancel exactly.
2. The full, infinite series reconstructs the square wave exactly everywhere except at the jumps themselves.
3. Keeping only the first $N$ terms gives the partial sum plotted here — the visible ripple is what got left out.

## Real world

### Sound and timbre
A violin and a flute playing the same note share a fundamental frequency but differ in their harmonic amplitudes; that mix of harmonics is what makes them sound different.

### JPEG and MP3 compression
Both formats break a signal into frequency components and keep only the ones a viewer or listener can actually perceive, discarding the rest — a direct descendant of this decomposition.

### Digital clock signals
A "square" clock pulse in a circuit is really a fundamental plus a ladder of odd harmonics; a real wire filters out the highest ones, which is one reason fast clock edges round off.

### Gibbs ripple in filters
Any filter built by truncating a frequency response inherits the same overshoot near sharp edges, which is why filter designers taper their coefficients instead of cutting them off sharply.
