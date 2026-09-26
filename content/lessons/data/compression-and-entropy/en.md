---
title: Compression and entropy
summary: Repeated data shrinks because you can write "how many" instead of writing the same thing over and over, and common symbols shrink further by earning shorter codes than rare ones.
parameters:
  view: repeat or frequency, view
  reps: how many times each symbol repeats, reps
  skew: how uneven the symbol frequencies are, skew
variables:
  - C, the compression ratio, original size divided by compressed size
  - S_0, the size of the original message, in bits
  - S_1, the size of the compressed message, in bits
  - n, how many times a symbol repeats in a row
  - b, bits used to store one symbol or one count
---

## Try it

1. With view at 0, drag reps from 2 up to 12. Watch the strip of colored blocks grow, while the compressed "symbol × count" boxes underneath stay exactly the same size.
2. Switch view to 1. Four letters, E, T, A and Q, appear as bars sized by how often each one shows up.
3. Drag skew from 1 to 9. As E's bar grows past the others, its bit strip on the right shrinks from 2 bits down toward 1, while Q's grows longer.

## Real-life examples

1. **A short, barely-repeated run.** view at 0, reps at 2: each symbol appears only twice, so writing "symbol × 2" barely saves anything over writing it out.
2. **A long, heavily-repeated run.** view at 0, reps at 12: each symbol appears twelve times in a row, and "symbol × 12" still costs the same few bits as "symbol × 2" did.
3. **Strongly uneven letter frequencies.** view at 1, skew at 8: one letter dominates the message, so giving it a short code saves far more than a fair, fixed-length code ever could.

## Test yourself

1. Push reps all the way to 12, its maximum.
2. Switch to view 1 and bring skew down to 2 or below, close to an even split between the four letters.
3. Switch to view 1 and push skew up to 8 or higher, strongly favoring one letter.

## Intuition

Say a scanner is reading a mostly-white fax page, left to right, pixel by pixel: white, white, white… for three thousand pixels before it finally hits a black letter. Writing down "white" three thousand times would be wasteful. Writing "3000 white pixels, then black" is not; that is run-length encoding, exactly what the colored strip on screen turns into the compact "symbol × count" boxes underneath it. The strip grows as reps grows, but the compressed boxes do not, because a count like 12 takes about the same handful of bits to store as a count like 2.

The second half of this lesson is a different trick for a different kind of repetition. Instead of the same symbol sitting next to itself, some symbols are simply more common overall, the way the letter E shows up far more often than Q in English text. Morse code already used this idea in the 1830s: E is a single dot, the shortest code of all, while Q is dash-dash-dot-dash, one of the longest, because E needed sending quickly and often while Q barely needed sending at all.

## Formal

Run-length encoding replaces $n$ repeated copies of a symbol, costing $S_0 = n \times b$ bits, with one symbol and one count, costing about $S_1 = 2b$ bits regardless of $n$. The compression ratio is $C = \dfrac{S_0}{S_1}$, which grows in direct proportion to how long the run is: doubling $n$ roughly doubles $C$.

Huffman coding instead looks at how often each distinct symbol appears across the whole message and builds a code by repeatedly merging the two least frequent symbols into a combined node, so a symbol's final code length is roughly $-\log_2 p$ bits, where $p$ is its probability. Because merging the least-frequent symbols first is provably optimal among all such prefix codes, a Huffman code's average bits per symbol can never be worse than a fixed-length code's, and is usually noticeably better once the frequencies are uneven.

## Advanced

The average number of bits per symbol that any lossless code can achieve is bounded below by the Shannon entropy of the source, $H = -\sum p_i \log_2 p_i$; Huffman coding gets within one bit of this limit for any distribution, and exactly reaches it when every probability happens to be a power of one half.

## Derivation

1. Writing a symbol $n$ times in a row costs $S_0 = n \times b$ bits, one $b$ for every repeat.
2. Writing it once plus its count instead costs about $S_1 = 2b$ bits: one $b$ for the symbol, one $b$ for the count, no matter how large $n$ is.
3. Dividing gives the compression ratio, $C = \dfrac{S_0}{S_1} = \dfrac{n}{2}$, so a run twice as long compresses twice as well.

## Real world

### Fax machines and BMP images
Fax machines and simple bitmap image formats use run-length encoding on scan lines that are mostly one color, since a blank page or a plain sky is exactly the kind of long, repeated run this technique shrinks best.

### ZIP, PNG and gzip
Everyday compressors such as ZIP, PNG and gzip combine a repeat-finder with a Huffman-style step at the end, squeezing out both kinds of redundancy this lesson covers, one after the other.

### JPEG and video codecs
JPEG images and video codecs like H.264 both finish their compression pipeline with Huffman or a close relative of it, after other steps have already made the data more repetitive.

### Morse code
Morse code assigned its shortest signals to the most common English letters back in the 1830s, decades before Huffman coding was invented, using exactly the same "frequent means short" idea by hand.
