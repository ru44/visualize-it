---
title: 'Binary numbers: place value in base 2'
summary: >-
  Every photo, letter and number a computer stores is ultimately packed into
  bytes like this one, and learning to read them shows you what the machine
  actually keeps.
parameters:
  value: value — the 8-bit number (tap a bit to flip it)
variables:
  - 'the k-th bit, 0 or 1'
  - 'the place value of bit k — 1, 2, 4, 8, 16, 32, 64, 128'
  - the decimal value the 8 bits represent
---

## Try it

1. Tap the rightmost bit square: the decimal number jumps by exactly 1, its place value in that spot.
2. Tap the leftmost bit square instead: the decimal number jumps by 128, the biggest single bit there is.
3. Watch the hex and ASCII readouts change together as you flip bits — every 4 bits becomes one hex digit, and a byte between 32 and 126 shows up as a printable character.

## Real-life examples

- **Typing the letter A.** Pressing "A" on a keyboard stores the byte 65 (binary 01000001) — that exact number is how a computer remembers which letter you typed.
- **A medium-grey pixel.** In an 8-bit black-and-white photo, brightness runs from 0 (black) to 255 (white); a pixel at 128 sits almost exactly in the middle, a medium grey.
- **Full-strength red.** A photo's red channel maxed out at 255 means as much red as one byte can possibly hold — the reddest that pixel can be.

## Test yourself

1. Flip bits until the decimal readout reads exactly 65, the code for letter A.
2. Light up every one of the 8 bits so the value reaches 255, the largest a byte can hold.
3. Find the bit pattern that gives exactly 85 — notice how the lit and unlit bits alternate.

## Intuition

Imagine 8 light switches in a row, each one worth twice as much as the one to its right. The rightmost switch is worth 1, the next 2, then 4, 8, 16, 32, 64, and the leftmost switch is worth 128 — powers of two, doubling every step. Flip the switches worth 32, 8 and 2, and their values add up to 42. On screen, those switches are the row of 8 tappable bit squares: tap one and the decimal readout jumps by exactly that square's place value, $2^k$, where k counts the position starting from 0 at the rightmost square.

Every 4 switches pack into one hex digit, so a whole byte becomes exactly two hex digits: 42 in hex is 2A, and as ASCII that byte is the character *. Push the value up to 255 and every one of the 8 switches is flipped on — that's the largest number a single byte can hold. Eight switches, each on or off, give $2^8$ possible patterns in total, and 255 is the biggest one.

## Formal

$n = \sum_{k=0}^{7} b_k \cdot 2^k$ with each $b_k \in \{0,1\}$: base-2 positional notation, exactly like base-10 but with place values $10^k$ replaced by $2^k$.

A byte is 8 bits and represents $2^8 = 256$ distinct values, conventionally 0 to 255; two bytes (16 bits) already reach $2^{16}=65536$.

## Advanced

Hexadecimal groups bits four at a time because $16=2^4$, so each hex digit encodes exactly one nibble with no rounding — why memory addresses and colour codes are written in hex rather than decimal. Signed integers reinterpret the same bit pattern with two's complement, where the leading bit carries weight $-2^7$ instead of $+2^7$.

## Derivation

1. Write the byte as a sum of its 8 place values, most significant bit first.
2. The same sum written compactly — identical to how $\sum 10^k$ gives decimal place value.
3. All bits off gives 0; all bits on gives 255 — the full range of one byte.

## Real world

### Memory and storage
Every file, image and program is ultimately a sequence of bytes — binary is the only language the hardware speaks.

### Colour codes
A web colour like #2A5FFF packs three bytes of red, green and blue, each written as two hex digits.

### Networking
IP addresses, subnet masks and MAC addresses are all groups of bits, usually displayed in decimal or hex for humans.

### Text encoding
ASCII maps each byte value 0–127 to a character; the byte 42 is the character *, and 65 is A.
