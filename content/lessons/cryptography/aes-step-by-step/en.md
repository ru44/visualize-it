---
title: 'AES step by step: the real cipher, byte by byte'
summary: Type a message and a key and follow real AES through all 10 rounds — the lookup table, the row shifts, the column mixing and the key.
parameters:
  round: round (0 = before the rounds)
  step: step in the round (1–4)
  cell: byte to follow (0–15)
variables:
  - the 16-byte state after round r
  - the state before round r
  - the round key for round r, grown from your key
  - 'SubBytes: every byte through the S-box table'
  - 'ShiftRows: row r slides r places left'
  - 'MixColumns: each column times the fixed matrix'
---

## Try it

1. Set «round» to 0. The message's first byte is 68, the letter h, and the key's first byte is 6d, the letter m. The calculation box works out $\mathtt{68 \oplus 6d = 05}$ bit by bit.
2. Set «round» to 1 and «step» to 1. Byte 05 sits in row 0, column 5 of the S-box table, and the entry there is 6b, so the byte becomes 6b.
3. Set «step» to 3. Byte 0 is now $\mathtt{2\cdot 6b \oplus 3\cdot 1a \oplus 76 \oplus 63 = d6 \oplus 2e \oplus 76 \oplus 63 = ed}$: all four bytes of the first column went into it.

## Real-life examples

1. **The first move of every block.** «round» = 0 shows the only thing that happens before the rounds: the message is XORed with the key. Your phone's storage, your home Wi-Fi (WPA2) and the padlock in your browser (HTTPS) all start every 16-byte block this way.
2. **How one byte reaches the whole column.** «round» = 1 with «step» = 3 shows MixColumns turning the column 6b 1a 76 63 into a new column where every byte depends on all four. After two rounds, a change in one byte has spread to all 16.
3. **The last move before sending.** «round» = 10 with «step» = 4 adds the last round key. The result, starting 3e 80 8b 71, is the ciphertext that would travel over the network.

## Test yourself

1. Find the round that skips MixColumns, and open MixColumns in that round.
2. In round 1, open the step that uses the key.
3. In ShiftRows, select a byte from the row that slides 3 places.

## Intuition

Real AES works on 16 bytes at a time, laid out as a 4×4 grid. Type any message and key in the boxes above the picture. Each English letter is one byte, written as two hex digits, so h is 68 and m is 6d. Before the rounds start, AES XORs the message with the key. Then it runs 10 rounds of 4 steps. SubBytes swaps every byte for another one from a fixed table of 256 entries, the S-box. ShiftRows slides row 1 one place left, row 2 two places and row 3 three. MixColumns multiplies each column by a fixed 4×4 matrix, so every byte of a column changes all four. AddRoundKey XORs everything with a new round key made from your key.

Use «round» and «step» to walk through the rounds, and click any byte to see exactly how it was made: which table entry, which shift, which multiplication, which XOR. Then change one letter of the message, for example 2026 to 2027. The first rounds change only a few bytes, but the ciphertext under the picture changes completely: 62 of its 128 bits flip. It is the same spreading you saw with 16 bits in the previous lesson, now in the real cipher.

## Formal

AES-128 encrypts a block $M$ of 128 bits with a key $K$ of 128 bits. The state starts as $s_0 = M \oplus K_0$, and each round computes $s_r = \mathrm{MC}(\mathrm{SR}(\mathrm{SB}(s_{r-1}))) \oplus K_r$ for $r = 1$ to $10$, except that round 10 leaves out $\mathrm{MC}$. The ciphertext is $s_{10}$. The 11 round keys $K_0, \dots, K_{10}$ are grown from $K$ by the key schedule, which uses the same S-box.

Each byte is an element of a field with 256 elements, written $\mathrm{GF}(2^8)$. Adding two bytes is XOR. Multiplying by 2 shifts the bits one place left and, if a 1 falls off, XORs with 1b, because the field is built on the polynomial $x^8 + x^4 + x^3 + x + 1$. The S-box takes each byte's inverse in this field, then mixes its bits in a fixed way and adds 63, which makes SubBytes the only step that is not linear. Every step can be undone, so decryption runs the inverse steps in reverse order.

## Advanced

The U.S. National Institute of Standards and Technology chose this cipher from 15 candidates and made it a standard in 2001. Its original name is Rijndael, after its Belgian designers Joan Daemen and Vincent Rijmen. Keys of 192 and 256 bits use 12 and 14 rounds. AES is built so that any difference passing through 4 rounds goes through at least 25 S-box lookups, which is why the best known attack on full AES is only slightly faster than trying every key. Most processors have special AES instructions, so a laptop encrypts several gigabytes per second. AES encrypts one block; longer data is encrypted with a mode such as GCM, which also detects any tampering.

## Derivation

1. Start: XOR the 16 message bytes with the 16 key bytes.
2. Each round: SubBytes, then ShiftRows, then MixColumns, then XOR with that round's key.
3. After 10 rounds, the last one without MixColumns, the state is the ciphertext.

## Real world

### Wi-Fi

WPA2 and WPA3 encrypt every packet between your phone and the router with AES.

### HTTPS

Most secure websites protect their traffic with AES-GCM; that is what the padlock in your browser stands for.

### Phone storage

iPhones and Android phones encrypt everything stored on them with AES, using a key tied to your passcode.

### Messaging apps

WhatsApp and Signal encrypt the content of each message with AES, with keys agreed by the Signal protocol.
