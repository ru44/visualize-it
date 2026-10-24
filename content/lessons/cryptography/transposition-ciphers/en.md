---
title: 'Transposition ciphers: scrambling places, not letters'
summary: >-
  Write a message in a zigzag across a few rails and read the rows straight
  across — every letter is still there, just standing in the wrong place.
parameters:
  rails: rails — how many rows the zigzag bounces between (the key)
  pos: letter — which letter of the message to follow along its ride
variables:
  - the number of rails the message zigzags across
  - how many letters before the zigzag pattern repeats itself
---

## Try it

1. Set rails to 3 and read the bottom rows: the message WE ARE DISCOVERED RUN comes out as WECRU ERDSOEEDN AIVD — the same 18 letters, picked up row by row.
2. Tap the picture to follow one letter at a time and watch where each one lands: down the rails, bounce, back up, bounce again.
3. Raise rails to 6 and see the zigzag stretch: the pattern now repeats only every 10 letters, and the rows scramble the message even further apart.

## Real-life examples

- **The classic three rails.** With 3 rails the zigzag repeats every 4 letters — this exact setting carried the famous drill message "we are discovered, flee at once" in cipher histories.
- **Two rails, the playground cipher.** With 2 rails the message just splits into every-other-letter — kids pass notes this way, and it takes seconds to undo.
- **Six rails on a short message.** At 6 rails the zigzag barely completes two bounces before the message ends, so some rows hold just a couple of letters — a long key on a short note hides less than it seems.

## Test yourself

1. Set the wheel of rails to 3, the classic rail-fence setting.
2. Now stretch the fence to exactly 5 rails and watch the rows re-form.
3. Move the letter marker forward until it lands on the top rail again — the first letter after a full zigzag.

## Intuition

Every cipher before this one swapped letters for other letters; a transposition cipher does the opposite — it never touches the letters, it moves them. On screen the message rides a fence: down one rail per letter, bounce off the bottom, climb back up, bounce off the top. The cipher text is simply the rows read straight across, so the E that followed W ends up several places away, next to letters it never stood near.

Here is the weakness, and it is a big one: the cipher text contains exactly the original letters. Count them and the E is still the most common letter, so a codebreaker instantly knows this is a transposition and not a substitution — and then the attack is an anagram puzzle, sliding rows against each other until words appear. That is why transposition alone died out, but — and this is the idea to keep — moving letters apart is half of what a modern cipher does, under the name diffusion.

## Formal

A rail-fence cipher with $r$ rails sends letter number $i$ to the rail it reaches after $i$ steps of a zigzag that bounces between rail 0 and rail $r-1$. The zigzag repeats with period $T = 2(r - 1)$: for 3 rails that is every 4 letters, for 6 rails every 10.

Encryption is a fixed permutation of positions — the key is just $r$ — and decryption applies the inverse permutation: rebuild the zigzag, pour the cipher text back into the rows, and read along the zigzag instead of across. Since $r$ can only range from 2 to about the message length, the keyspace is tiny and every value can be tried by hand.

## Advanced

The serious version is columnar transposition: write the message into a grid under a keyword, then read the columns out in the keyword's alphabetical order — the key is now a permutation of columns, and the keyspace grows as the factorial of the keyword length. German ADFGVX in the First World War stacked a substitution step and a columnar transposition, and breaking it was a famous feat of French cryptanalysis. The lesson survives inside AES today: its ShiftRows step is a transposition, moving bytes apart so the next round's substitution mixes neighbours that started far away.

## Derivation

1. With one trip down and one trip up, the zigzag walks $r - 1$ steps each way before it repeats.
2. Follow any letter: its rail is where the bouncing walk stands after that many steps.
3. Reading the rows left to right writes the same letters in a new order — a pure rearrangement.

## Real world

### Scytale of Sparta
Greek commanders wrapped a leather strip around a rod and wrote along it; unwound, the letters sat in zigzag order — a transposition cipher from 2,500 years ago.

### ADFGVX in World War I
The German field cipher combined substitution with columnar transposition; Georges Painvin broke it in 1918, reportedly losing 15 kilograms in the effort.

### AES ShiftRows
Every round of AES slides rows of the state sideways — a transposition whose whole job is diffusion, spreading each byte's influence across the block.

### Why it never worked alone
Cipher text that keeps the original letters hands the codebreaker a letter-frequency receipt; anagram attacks finish the job, which is why every strong cipher pairs moving letters with changing them.
