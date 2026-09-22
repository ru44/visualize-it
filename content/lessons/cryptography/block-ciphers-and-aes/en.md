---
title: 'Block ciphers and AES: mixing a message round by round'
summary: A single scrambling step isn't enough to hide a pattern — see why real ciphers repeat the same steps again and again until every bit depends on every other.
parameters:
  rounds: rounds of mixing
  flip: which input bit differs
  key: round key
variables:
  - the ciphertext block
  - the fixed, reversible scrambling procedure
  - the secret key controlling it
  - the original message block
---

## Try it

1. Look at the two towers of small squares, A on the left and B on the right: they start as the same 16-bit block, except for one flipped bit.
2. Drag «rounds» from 0 up to 4 and watch how many squares differ between A and B by the bottom row.
3. Drag «flip» to change which single input bit differs, and watch the same spreading pattern happen no matter which bit you pick.

## Real-life examples

1. **Sending a block with zero rounds.** «rounds» = 0 skips all mixing, so A and B — identical except for one input bit — still differ by exactly that one square at the bottom, just like plain, unshuffled data.
2. **A partly-mixed message.** «rounds» = 2 lets that one-bit difference spread only part-way through the block, the way a weak, watered-down cipher would leave it.
3. **A fully-mixed message, from a different bit.** «rounds» = 4 with «flip» = 8 shows a different starting bit still ending up scrambling roughly half the block, just as real AES's 10 rounds do to a full 128-bit block.

## Test yourself

1. Push «rounds» to 4, the most this toy cipher offers.
2. Push «flip» to 15, the very last input bit.
3. Set «rounds» to 4 and «flip» back to 0, and count how many of the 16 bottom squares differ between A and B.

## Intuition

Take a tiny 16-bit block of data, small enough to draw completely on screen, and flip just one of its bits before encrypting both the original and the flipped copy side by side. The left tower of small squares is block A, the right tower is block B, identical to A except for one bit chosen with the «flip» slider. Drag «rounds» from 0 to 4 and watch a fresh row appear for each round: at «rounds» = 0 the two towers still differ by exactly one square, but every round mixes in the key, swaps each group of 4 bits through a fixed lookup table, and shuffles all 16 bits into new positions.

By the last row at «rounds» = 4, roughly half of the 16 squares between A and B differ in color, even though A and B started only one bit apart — this spreading is exactly what real AES does at a larger scale, encrypting a full block as $C = E_K(M)$, a message $M$ scrambled by repeated rounds under key $K$.

## Formal

A block cipher encrypts a fixed-size block at once, $C = E_K(M)$, where $E_K$ is a fixed, reversible scrambling procedure controlled entirely by the key $K$; decryption applies the matching inverse procedure.

Each round mixes confusion, hiding the relationship between key and ciphertext through a substitution step, with diffusion, spreading each input bit's influence over many output bits through a shuffling step; repeating both several times is what turns a single input-bit change into a roughly fifty-fifty scramble of the output.

## Advanced

The Advanced Encryption Standard operates on 128-bit blocks with 10, 12 or 14 rounds depending on whether the key is 128, 192 or 256 bits long, and each real round runs four steps — SubBytes (substitution through a fixed lookup table), ShiftRows and MixColumns (diffusion), and AddRoundKey (mixing in a fresh piece of the key derived for that round) — the same three ingredients, substitution, shuffling and key mixing, that this toy cipher's rounds already show at a scale small enough to see completely.

## Derivation

1. Every round starts by mixing in the round key, then substitutes each 4-bit group of the block through a fixed lookup table, then shuffles all 16 bits into new positions.
2. Running several such rounds back to back lets a change that started in one bit keep spreading further with each pass.
3. After enough rounds, flipping just one input bit has changed roughly half of the 16 output bits, with no visible trace of where the original change came from.

## Real world

### Wi-Fi encryption
The WPA2 and WPA3 standards that protect home Wi-Fi traffic both encrypt every packet with AES.

### HTTPS connections
Once a browser and a website agree on a shared key, most of the actual encrypted traffic behind the padlock icon is protected with AES.

### Encrypted phones and disks
Phone storage and full-disk encryption tools scramble every file with AES so the data is unreadable without the device's key.

### Government and banking standards
AES is approved by the U.S. government for protecting even top-secret information, and banks rely on it throughout card payment and transfer systems.
