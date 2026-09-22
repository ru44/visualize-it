---
title: 'The Vigenère cipher: a different shift for every letter'
summary: For three centuries this cipher resisted every attack by changing its shift letter by letter — see how, and how it finally fell.
parameters:
  kw: keyword
  pos: letter position
variables:
  - the plaintext letter's number, A = 0 up to Z = 25
  - 'the shift for this letter: the keyword letter''s number at this position'
  - the ciphertext letter's number that results
  - the remainder after dividing by 26, which wraps Z back around to A
---

## Try it

1. Look at the keyword panel on the right: the chosen keyword sits above the row of plaintext letters ATTACK AT DAWN.
2. Drag the «kw» slider through KEY, LEMON, SUN and CAT. Every ciphertext letter in the bottom row changes, even though the message above it never does.
3. Drag «pos» along the message. The bold, highlighted plaintext letter and the shift number above it change together, one keyword letter at a time.

## Real-life examples

1. **A short 3-letter password, KEY.** A 19th-century clerk picks the shortest workable keyword, just three letters, to hide ATTACK AT DAWN — with «kw» at 0, the wheel repeats K, E, Y every three letters of the message.
2. **The textbook keyword LEMON.** This is the very example Vigenère's own book used: the keyword LEMON turns ATTACK AT DAWN into LXFOPV EF RNHR. Set «kw» to 1 and check the ciphertext row against those letters.
3. **A one-word passphrase, SUN.** A telegraph operator prefers an easy word to remember. With «kw» at 2 and «pos» at 5, the keyword's third letter, N, is the one shifting that letter of the message.

## Test yourself

1. Set «kw» to 1 so the wheel uses the keyword LEMON.
2. Push «pos» to 13, the final letter N of DAWN.
3. Switch «kw» to 3 for the keyword CAT, and pull «pos» back to 0, the very first letter A.

## Intuition

In 1586 Blaise de Vigenère proposed hiding a message behind not one shift but several, repeated in a pattern that only the two ends of a conversation know. On screen, two rings of letters sit one inside the other: the outer ring never moves, and the inner ring turns by the current shift amount, shown in the middle as «+11» or «+4». Drag the «kw» slider through KEY, LEMON, SUN and CAT — the keyword appears above the message, and dragging «pos» moves a marker along it, one keyword letter feeding a new shift for every plaintext letter in turn.

Take the very first letter of ATTACK AT DAWN with keyword LEMON selected: the letter A sits 0 places after A, and the keyword's first letter L sits 11 places after A, so the shift is 11 for this letter only. Adding them gives $C = (M + K) \bmod 26 = (0 + 11) \bmod 26 = 11$, and the letter 11 places after A is L — exactly the first letter the ciphertext row shows.

## Formal

Number the alphabet $A = 0, \dots, Z = 25$. For a keyword of length $L$, the Vigenère cipher shifts the $i$-th letter of the message by the value of the keyword letter sitting at position $i \bmod L$, cycling back to the keyword's start every $L$ letters.

Encrypting one letter always follows the same rule shown throughout the wheel, $C = (M + K) \bmod 26$, just with $K$ read off a different position of the keyword each time, instead of staying fixed the way a single Caesar shift does.

## Advanced

For nearly three centuries the Vigenère cipher was thought unbreakable, until Friedrich Kasiski published a practical attack in 1863: search the ciphertext for repeated three- or four-letter chunks, since these often come from the same stretch of plaintext lining up with the same stretch of keyword again, and the distances between repeats share a common factor equal to the keyword's length $L$. Once $L$ is known, the ciphertext splits into $L$ separate columns, each shifted by one fixed keyword letter, and every column falls to the same frequency analysis that breaks a plain Caesar cipher.

## Derivation

1. Find the keyword letter's own position in the alphabet: L is the 12th letter, so counting from A = 0 its shift value is 11.
2. Add that shift to the plaintext letter's number and wrap around past Z back to A by taking the remainder after dividing by 26.
3. The result, 11, is the letter L, so the message's first letter A becomes L; the keyword then advances to its next letter for the message's next letter.

## Real world

### "Le chiffre indéchiffrable"
For 300 years French cryptographers called it "the indecipherable cipher," and it protected diplomatic and military messages across Europe.

### The American Civil War
Confederate officers carried brass cipher disks built on the same idea, though Union cryptanalysts eventually read many of their dispatches.

### Teaching cryptanalysis
Because it can be broken by hand with patience, the Vigenère cipher is still one of the first ciphers students use to learn frequency analysis and Kasiski's method.

### Modern key-stream ciphers
The idea of combining a message with a repeating or generated stream of shift values lives on in modern stream ciphers, which replace the short repeated keyword with a much longer pseudorandom one.
