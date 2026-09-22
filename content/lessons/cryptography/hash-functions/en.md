---
title: 'Hash functions: a fingerprint for any file'
summary: One tiny change anywhere in a file scrambles its whole fingerprint — that's how computers catch a changed password, a tampered file, or a broken download.
parameters:
  pos: letter changed
variables:
  - the original message or file, of any length
  - the hash function, here SHA-256
  - the fixed-size fingerprint it produces, 256 bits long
---

## Try it

1. Look at the two grids of small squares, 256 of them each: one is the fingerprint of "hello world", the other belongs to a copy with a single letter changed.
2. Drag «pos» to choose which letter of "hello world" gets changed, from the first letter to the last.
3. Watch the squares outlined in red. Roughly half of all 256 squares flip color, no matter which single letter you changed.

## Real-life examples

1. **Checking a downloaded file.** Changing the very first letter, «pos» = 0, mimics a single corrupted byte at the start of a download — the whole fingerprint still comes out unrecognizable.
2. **Verifying a text message.** «pos» = 5 changes a letter in the middle of the text, the way a word altered mid-message would.
3. **A software update package.** «pos» = 10 changes only the very last letter, showing that even a change at the far end scrambles the fingerprint just as completely.

## Test yourself

1. Set «pos» to 0, the very first letter of "hello world".
2. Set «pos» to 10, the very last letter.
3. Choose a «pos» between 3 and 7, one of the letters in the middle.

## Intuition

Imagine downloading a large game update and needing your computer to check, in a fraction of a second, whether even a single byte arrived wrong. On screen, the left grid of 256 small squares is the SHA-256 fingerprint of the text "hello world", one square per bit, filled in whenever that bit is 1. Drag «pos» to pick one letter of that text to change, and the right grid recomputes a brand-new fingerprint for the changed version live, right in your browser.

Compare the two grids and count the squares outlined in red — those are the bits that flipped between the two fingerprints, and on average about half of all 256 of them do, however small the change to the text was. A hash function is written $H(M) = h$: feed in any message $M$, of any length, and it always returns a fixed-size fingerprint $h$, here 256 bits long.

## Formal

SHA-256 maps any input $M$ to a 256-bit output $H(M) = h$; the same input always produces the same output, and no known method finds two different inputs that hash to the same $h$ faster than trying about $2^{128}$ candidates.

The avalanche effect means every output bit depends on every input bit in a tangled, unpredictable way, so flipping a single bit of $M$ flips roughly 128 of the 256 output bits — half of $h$ changes, with no visible pattern linking which input bit moved to which output bits reacted.

## Advanced

SHA-256 belongs to the SHA-2 family, standardized by the U.S. National Institute of Standards and Technology in 2001, and it underpins systems that need three guarantees at once: preimage resistance, no known way to recover $M$ from $h$; second-preimage resistance, no easy way to find a different message with the same hash as a given $M$; and collision resistance, no easy way to find any two inputs that collide at all. Git identifies every commit by the hash of its contents, and Bitcoin's proof-of-work asks miners to search for an input whose SHA-256 hash starts with enough zero bits — brute force through the avalanche effect, with no known shortcut.

## Derivation

1. Feed the message into SHA-256, a fixed public procedure that anyone can run and get the identical result from.
2. The output is always exactly 256 bits long, whether the input was one letter or an entire movie file.
3. Changing a single letter of the input flips roughly half of those 256 output bits, with no visible pattern connecting the two.

## Real world

### File integrity checks
Software downloads publish a SHA-256 fingerprint alongside the file so anyone can confirm nothing was corrupted or tampered with in transit.

### Git commit identifiers
Every commit in a Git repository is named by the hash of its contents, so changing even one character of code produces an entirely different commit id.

### Bitcoin mining
Bitcoin miners race to find an input whose SHA-256 hash happens to start with many zero bits, a search with no shortcut faster than trying huge numbers of candidates.

### Digital forensics
Investigators hash evidence files the moment they collect them, so any later change to the file — even one bit — is instantly detectable.
