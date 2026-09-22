---
title: 'Binary numbers: place value in base 2'
summary: >-
  Every number a computer stores is built from bits — 0s and 1s — each worth a
  power of two. Flip bits and watch decimal, hex and ASCII update together.
parameters:
  value: value — the 8-bit number (tap a bit to flip it)
variables:
  - 'the k-th bit, 0 or 1'
  - 'the place value of bit k — 1, 2, 4, 8, 16, 32, 64, 128'
  - the decimal value the 8 bits represent
---

## Intuition

Tap a bit in the row of 8 squares and watch the decimal readout jump by exactly that bit's place value: the rightmost bit is worth $2^0=1$, the next $2^1=2$, and so on up to the leftmost bit worth $2^7=128$. Starting at 42 (binary 00101010), the lit bits are 32, 8 and 2 — and $32+8+2=42$.

Every 4 bits packs into one hex digit, so a byte becomes exactly two hex digits: 42 in hex is 2A, and as ASCII that byte is the character *. Push the value to 255 and all 8 bits light up: $\sum_{k=0}^{7}2^k = 2^8-1 = 255$, the biggest number a byte can hold.

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
