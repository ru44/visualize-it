---
title: 'Frequency analysis: breaking a cipher by counting letters'
summary: Every language favors certain letters — count them in a secret message and the hidden shift falls out, no key needed.
parameters:
  guess: shift guess
variables:
  - the decoded message letter's number
  - the ciphertext letter's number
  - your current guess at the shift
  - the remainder after dividing by 26, which wraps Z back around to A
---

## Try it

1. Look at the tall blue bars: each one counts how often a letter appears in the secret message below, once shifted by your current guess.
2. Drag «guess» from 0 to 25. The short orange marks, showing true English letter frequencies, line up differently against the blue bars each time.
3. Watch the decoded text at the bottom. It turns green and starts reading like real English exactly when the blue bars best match the orange marks.

## Real-life examples

1. **Al-Kindi's first try: assume no shift at all.** A 9th-century codebreaker's simplest guess, «guess» = 0, gives blue bars that barely resemble the orange English pattern.
2. **A common modern guess: ROT13.** People online often scramble spoilers with a 13-letter shift; try «guess» = 13 here and the decoded text is still nonsense.
3. **The correct key, found by counting.** At «guess» = 7 the blue bars finally match the orange marks, and the text below reads as real English.

## Test yourself

1. Slide «guess» to 7 and watch the decoded text below turn green and readable.
2. Try «guess» = 13, the popular ROT13 shift, and see that it still looks like nonsense.
3. Pick any guess other than 0 and 7, and notice how flat and mismatched the blue bars look against the orange marks.

## Intuition

Suppose a spy intercepts a message and knows only that every letter was shifted by the same fixed amount, somewhere between 0 and 25. On screen, the tall blue bars count how many times each of the 26 letters shows up in that intercepted message once you shift your guess with the «guess» slider; the short orange marks above them show how often each letter really appears in ordinary English, where E and T tower over rare letters like Q and Z. Slide «guess» through all 26 positions and watch the blue skyline slide sideways underneath the fixed orange marks, hunting for the one position where the two line up.

The moment the blue bars and the orange marks match best, the text at the bottom flips to green and reads as real English instead of nonsense — that best-matching «guess» is the hidden key, and reversing it recovers the message, $M = (C - g) \bmod 26$, where $g$ is your current guess.

## Formal

A ciphertext letter's number is $C = (M + k) \bmod 26$ for some fixed, unknown shift $k$. Frequency analysis does not search for $k$ directly; it scores each candidate guess $g$ by how closely the shifted letter counts resemble known English letter frequencies.

That score is highest exactly when $g = k$, because only the correct shift undoes the scrambling and restores the true, highly uneven distribution of English letters — a flat, mismatched score for every other guess is itself strong evidence that the guess is wrong.

## Advanced

The earliest known description of frequency analysis comes from Al-Kindi, a 9th-century Arab polymath working in Baghdad, in a manuscript titled "On Deciphering Cryptographic Messages." Modern implementations often replace the simple visual match shown here with a chi-squared statistic, which totals the squared differences between observed and expected letter counts and picks whichever guess minimizes that number — the same comparison this chart draws, just scored automatically instead of by eye.

## Derivation

1. Count how often each letter appears in the intercepted ciphertext, ignoring spaces and punctuation.
2. Shift that count by a candidate guess and compare the result to how often each letter appears in ordinary English.
3. The guess whose shifted counts match English best reveals the true shift, and subtracting it from every ciphertext letter recovers the original message.

## Real world

### Al-Kindi's 9th-century manuscript
The technique's first written record already used tables of Arabic letter frequency to unravel simple substitution ciphers.

### Newspaper cryptogram puzzles
The same letter-counting trick lets casual puzzle solvers crack the "cryptoquote" columns printed in newspapers every day.

### Early 20th-century codebreaking
Military cryptanalysts extended frequency counting from single letters to pairs and triples of letters to break far more complex ciphers.

### Language tools today
Spam filters, autocorrect and language-detection tools all lean on the same idea: real language has a distinctive, countable statistical fingerprint.
