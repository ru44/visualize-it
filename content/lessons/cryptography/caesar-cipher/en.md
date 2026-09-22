---
title: 'Caesar cipher: the first substitution code'
summary: >-
  Sliding every letter of a message forward by the same amount is the oldest
  trick for keeping a short note safe from anyone who just glances at it.
parameters:
  shift: shift — the key, how many letters to move forward
variables:
  - the remainder after dividing by 26, which wraps the alphabet back to A once it runs past Z
---

## Try it

1. Set the shift slider to 3 and compare the cipher text next to the sample message — every letter has moved three places forward.
2. Raise the shift past 20 and notice the cipher text changes completely, even though the message underneath never does.
3. Push the shift past 25, toward the top of its range, and notice the wheel simply wraps back around to 0 instead of stopping.

## Real-life examples

- **Julius Caesar's shift of 3.** Roman generals reportedly read orders shifted by 3, enough to stop a scout who glanced at a captured note but not a determined codebreaker.
- **ROT13 forum spoilers, shift 13.** Forums shift posts by 13 to hide a movie spoiler or a puzzle answer from anyone just scrolling past.
- **Shift 25, almost no shift at all.** Sliding nearly the whole alphabet forward is the same as moving every letter one place backward, showing how close "scrambled" can be to "barely touched."

## Test yourself

1. Turn the wheel until the shift reads 13, the ROT13 setting forums use to hide spoilers.
2. Push the shift all the way up to 25 and read what the cipher text becomes.
3. Bring the shift back down to 3, the shift Caesar himself is said to have used.

## Intuition

Picture a note passed between two Roman generals: MEET ME AT NOON, with every letter pushed three places forward so M becomes P and E becomes H. Turn the wheel on screen until the shift reads 3 and watch that same swap happen — the sample message on the right updates letter by letter, so MEET turns into PHHW while the shift number stays visible on the slider the whole time.

The readouts list the key, the plain text and the cipher text side by side, plus one more number: 26, the count of every possible key. That number is the whole weakness of this cipher — whoever intercepts PHHW ME AT NOON can try all 26 wheel positions in seconds and read off the one that turns into real words.

## Formal

A Caesar cipher replaces each letter by one a fixed number of places further in the alphabet. Numbering A–Z as 0–25, encryption is $c = (p + k) \bmod 26$: add the key $k$ to the plain letter's index $p$, then take the remainder after dividing by 26 so the result stays inside 0–25.

Decryption undoes exactly this shift: $p = (c - k) \bmod 26$. Because addition and subtraction by the same $k$ cancel, recovering the message only requires knowing the one number that produced it.

## Advanced

With only 26 possible keys, a computer can decrypt an intercepted message by brute force in a fraction of a second, trying every key and picking the one whose output reads as real words. Even without trying all 26, letter frequency alone gives it away: E is the most common letter in English text, so whichever cipher letter shows up most often is very likely the shift of E — one clue collapses the whole search.

## Derivation

1. Number each letter of the alphabet from 0 (A) to 25 (Z).
2. Add the key to that number and wrap around past 25 back to 0 — the definition of the cipher.
3. Subtract the key and wrap the same way to undo it and recover the original letter.

## Real world

### ROT13
A shift-13 Caesar cipher used on forums to hide spoilers or punchlines — not for secrecy, since anyone can decode it, just to stop the eye from reading it by accident.

### Ancient military use
Julius Caesar reportedly used a shift-3 cipher for messages to his generals; it was enough to stop a casual reader, though not a determined one.

### Why key size matters
A keyspace of 26 is small enough to search by hand; real ciphers use keys with more possibilities than atoms in the observable universe, which is what actually keeps a message safe.

### Frequency analysis
Any cipher that always maps the same plain letter to the same cipher letter — not just Caesar's — leaks the frequency pattern of the underlying language, which is why modern ciphers avoid that fixed mapping entirely.
