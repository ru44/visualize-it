---
title: Fourier series
summary: >-
  Any repeating wave — a square wave, a guitar note, a digital clock pulse —
  is really a stack of pure sine waves added together.
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

## Try it

1. Watch the curve start as one smooth sine wave.
2. Drag $N$ up. More sine terms get added, and the curve sprouts flatter tops and sharper shoulders, chasing a square wave.
3. Now drag $x$ to move along the curve. Notice the small overshoot that lingers near the jumps even at the highest $N$ — the Gibbs ripple.

## Real-life examples

1. **A pure sine tone.** With only the fundamental (N = 1), the wave is a smooth, single-frequency tone — like a tuning fork or a softly played flute.
2. **A clarinet's rich tone.** A clarinet's sound is built almost entirely from odd harmonics, much like this partial sum at N = 7: the extra terms give it a fuller, reedier timbre than a pure sine tone.
3. **A digital clock signal.** A "square" clock pulse in a circuit is approximated here by many odd harmonics (N = 11); real wires filter out the highest ones, which is one reason fast digital edges round off instead of staying perfectly sharp.

## Test yourself

1. Using just the fundamental (N = 1), find $x$ where the wave reaches its peak value of about 1.27.
2. Push $N$ to the maximum (11) and find an $x$ close to a jump where the curve overshoots above 1.1, even though the flat top it's chasing is only 1.
3. Find an $x$ near a quarter of the way through the cycle where the partial sum lands close to the flat-top value of 1.

## Intuition

A digital clock pulse that looks like a clean square wave on an oscilloscope is really built from many pure sine waves added together, one at the base frequency and others at odd multiples of it. The curve on screen starts as a single sine wave; drag $N$, the highest harmonic included, up and it sprouts sharper shoulders and flatter tops with each added term, chasing the square-wave shape.

Only odd harmonics show up in this sum, and each one is weaker than the last: the third harmonic stands a third as tall as the first, the fifth a fifth as tall, and so on. Even at $N = 11$ the corners still overshoot and ring a little before settling — drag $x$ near a jump to see it — the famous Gibbs ripple, which never shrinks below about 9% of the jump's height, no matter how many harmonics you add.

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
