---
title: 'Enigma: the cipher that was a machine'
summary: >-
  Press a key and a current threads through three spinning rotors, bounces off
  a mirror, and comes back to light a different letter — a cipher that changes
  itself after every single keystroke.
parameters:
  r1: left rotor — its window letter, part of the daily key
  r2: middle rotor — its window letter
  r3: right rotor — its window letter, the one that turned with every press
  letter: key pressed — which letter is being typed
variables:
  - the scramble of the three rotors at their current positions
  - the reflector, which sends the current back through the rotors
---

## Try it

1. With all three rotors at A, click the letter A on the keyboard column and follow the wire: through three rotors, off the reflector, and back out to the lamp that lights.
2. Click the lamp's letter instead — the signal threads the exact same path backwards and lights your original letter: the machine undoes itself.
3. Now change any rotor by one step and press the same letter as before: the whole path reroutes and a different lamp lights.

## Real-life examples

- **The start of a message.** All rotors at A, pressing A — the simplest setting, and the kind of predictable choice lazy operators made that codebreakers learned to exploit.
- **A daily key.** Rotors at L, E, V and pressing E — each German network set fresh rotor positions every day, and recovering them was Bletchley Park's daily race.
- **One press before the carry.** Right rotor at Z: the next keystroke will kick the middle rotor forward too, like a car odometer rolling over.

## Test yourself

1. Return all three rotor windows to A, the machine's starting position.
2. Press the letter E, the most common letter in both English and German.
3. Turn the right rotor to Z, one press away from rolling the middle rotor forward.

## Intuition

A Caesar wheel scrambles the alphabet one fixed way; Vigenère cycles through a handful of scrambles. Enigma took that idea to its mechanical extreme: each of the three rotors is a fixed scramble wired in copper, but they sit at changeable positions, and the right rotor physically turns after every keystroke. Pressing the same letter three times lights three different lamps — a polyalphabetic cipher whose alphabet changes every letter, with a period of about 17,000 keystrokes instead of Vigenère's five or six.

The reflector at the far end is what made the machine practical and what killed it. Because the current bounces back through the rotors, the same setting both encrypts and decrypts — set the rotors, type cipher text, read plain text. But a reflected signal can never come back out on the wire it entered, so no letter ever encrypts to itself: a tiny certainty, and codebreakers slid a guessed word along the cipher text, discarding every position where any letter matched itself — the crack that let Bletchley Park's bombes search the remaining settings by machine.

## Formal

Write the three rotors at their current positions as one permutation $\sigma$ of the alphabet, and the reflector as a fixed pairing $U$. A keystroke encrypts as $c = \sigma^{-1}(U(\sigma(p)))$: in through the rotors, off the reflector, back out through the rotors reversed — and after each keystroke the rotors step, so $\sigma$ itself changes before the next letter.

Because $U$ swaps letters in pairs, the whole map is its own inverse: applying it to $c$ returns $p$, which is why sender and receiver just needed matching rotor settings. And because $U$ pairs two different letters, $c = p$ is impossible — the no-self-encryption flaw. The keyspace (rotor choices, positions and plugboard) was around $10^{20}$, yet the structure leaked more than the size protected.

## Advanced

The plugboard (not drawn here) swapped up to ten letter pairs before and after the rotors, multiplying the keyspace enormously — but it is also a paired swap, so it preserved the fatal no-self-encryption property. Marian Rejewski's Polish team broke early Enigma with pure group theory in 1932; Turing's bombes industrialised the search using cribs like WETTERBERICHT (weather report) sent at the same hour daily. The deeper lesson survived the war: a cipher must withstand an attacker who knows the whole machine and guesses part of the message — security can live only in the key.

## Derivation

1. Each rotor is a fixed wiring, but turning it offsets the wiring against the alphabet, giving 26 scrambles per rotor.
2. The reflector pairs letters, so the return trip undoes the journey with the same settings — encryption and decryption are one operation.
3. A paired reflector can never return the entering letter, so cipher and plain never match — the certainty the codebreakers used.

## Real world

### Bletchley Park
Up to 9,000 people worked the Enigma break; historians credit the intelligence, codenamed Ultra, with shortening the war in Europe by years.

### The bombe
Turing and Welchman's electromechanical bombes tested rotor settings against a guessed phrase, discarding contradictions in minutes — machine-breaking answered by machine-searching.

### Operator error
The strongest machine fell to habits: repeated message keys, reused daily settings and predictable salutations gave the cribs that made every break start.

### Rotor machines after Enigma
America's SIGABA randomised its rotor stepping and was never broken in service — proof that the rotor idea was sound and the stepping and reflector were Enigma's real flaws.
