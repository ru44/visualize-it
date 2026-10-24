---
title: 'Confusion and diffusion: why old ciphers died'
summary: >-
  Flip one bit of the message and watch three ciphers react: the Caesar-style
  one flips one bit back, the substitution box smudges a few, and only the
  full substitute-and-shuffle cipher sets half the output on fire.
parameters:
  flip: flipped bit — which single input bit differs between the two messages
  rounds: rounds — how many substitute-and-shuffle passes the third cipher runs
  key: key — the shared secret all three ciphers mix in
variables:
  - the block size in bits (16 in this toy, 128 in AES)
---

## Try it

1. With rounds at 1, flip bit 0 and compare the three rows: the key-only cipher changes exactly 1 bit, the S-box row changes a few neighbouring bits, and the substitute-and-shuffle row already spreads further.
2. Raise rounds to 4 and watch the bottom meter: the changed-bit count climbs to around 8 of 16 — half the block, the point where the two outputs look unrelated.
3. Slide the key around: the top rows shift predictably, but the bottom cipher's output churns completely — the key's fingerprints are everywhere and nowhere.

## Real-life examples

- **One lazy round.** With a single round, a flipped input bit touches only part of the block — a codebreaker comparing two near-identical messages still sees where they differ.
- **Four proper rounds.** By round 4 the damage saturates at about half the bits, and the two outputs are statistically strangers.
- **A different corner, a different key.** Flipping the last bit under a new key spreads just as far — the avalanche must work for every bit and every key, not just a lucky one.

## Test yourself

1. Push rounds up to 4 and check the bottom row crosses the halfway marker.
2. Move the flipped bit to position 15, the far end of the block, and confirm the avalanche still reaches everywhere.
3. Drop back to a single round and find the row that fails the halfway test.

## Intuition

Every broken cipher in this museum died of the same two diseases, and in 1949 Claude Shannon named the cures. Caesar's problem: the key acts too simply — one known letter pair reveals the entire key. The cure is confusion: each output bit should depend on the key in so tangled a way that no equation short of trying keys unwinds it. The screen's top row is the disease in pure form — XOR the key in, and a flipped message bit flips exactly one cipher bit, telling the attacker precisely where the two messages differ.

Transposition's problem was the opposite: letters moved but never changed, so patterns survived the shuffle. The cure is diffusion: one flipped input bit must infect about half the output bits, so near-identical messages encrypt to unrelated-looking blocks. The middle row shows substitution alone smudging a change only within its own 4-bit box; the bottom row alternates substitute and shuffle, and by round 4 the flip has cascaded block-wide — the avalanche effect, the single picture that explains why AES repeats its rounds ten times.

## Formal

For a block of $n$ bits, the avalanche criterion asks that flipping any single input bit changes each output bit with probability one half — about $\frac{n}{2}$ bits in total, on average over messages and keys. Both extremes are failures: far fewer than half means the change was traceable, and systematically far more would be its own pattern.

Neither ingredient works alone. A substitution box is nonlinear (confusion) but local: it can only scramble the few bits inside it. A shuffle is global (diffusion) but linear: it moves bits without changing them, and linear maps fall to simple algebra. Alternating them — substitute, shuffle, mix the key, repeat — compounds locality into full spread, which is exactly the substitution–permutation network this page runs and AES industrialises.

## Advanced

In AES the two roles have names: SubBytes is the confusion (a nonlinear S-box on every byte), while ShiftRows and MixColumns are the diffusion (bytes travel across columns and mix within them). Two rounds give full diffusion on paper; AES runs 10 to 14 because attackers can peel partial rounds using differential and linear cryptanalysis — techniques that measure exactly the statistics this toy displays. Hash functions chase the same target from the other side: SHA-256's avalanche is why changing one letter of a file rewrites the whole fingerprint.

## Derivation

1. Confusion defeats the Caesar disease: knowing matching plain and cipher text must not hand over the key.
2. Diffusion defeats the transposition disease: local changes must not stay local, or comparisons leak structure.
3. Rounds compound the two: each pass doubles the reach of every bit until the whole block depends on the whole block.

## Real world

### AES round structure
SubBytes, ShiftRows, MixColumns, AddRoundKey — confusion, diffusion, diffusion, key mixing — repeated 10 to 14 times on every 128-bit block your phone encrypts.

### Avalanche testing
Cipher designers run exactly this experiment at scale: flip each input bit across millions of random keys and verify every output bit flips half the time.

### Differential cryptanalysis
The attack that bends this picture backwards — feeding chosen pairs of inputs and tracking how differences propagate — forced modern ciphers to prove their avalanche margins round by round.

### Why one round is never enough
DES ran 16 rounds, AES runs at least 10: reduced-round versions of both fall quickly, because diffusion a round short leaves measurable islands of calm.
