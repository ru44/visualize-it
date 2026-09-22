---
title: 'The half adder: addition from logic gates'
summary: >-
  This is the tiny circuit computers use to add two binary digits together,
  and chaining many of them is how every calculator and CPU adds numbers of
  any size.
parameters:
  a: a — first bit
  b: b — second bit
variables:
  - the two bits being added in this column
  - 'XOR — the sum bit, 1 when exactly one input is 1'
  - 'AND — the carry bit, 1 only when both inputs are 1'
---

## Try it

1. Set slider "a" to 1 and "b" to 0, then check the readouts: the sum lights up (1 + 0 = 1) but the carry stays off.
2. Now set both "a" and "b" to 1 and watch the sum readout flip to 0 while the carry readout lights up instead — that's the binary carry, just like carrying a digit in 7 + 5.
3. Set both "a" and "b" to 0 and confirm both readouts stay off — nothing to add, nothing to carry.

## Real-life examples

- **Adding 1 and 0 in a single binary column.** With "a" = 1 and "b" = 0, the sum lights up as 1 and the carry stays off, just like 1 + 0 = 1 with nothing to carry.
- **Adding 1 and 1, the case that overflows.** With "a" = 1 and "b" = 1, the sum reads 0 and the carry lights up, exactly like carrying a 1 when a decimal column reaches 10.
- **Adding two zero bits.** With "a" = 0 and "b" = 0, both the sum and carry stay off — there is nothing to add and nothing to carry, same as 0 + 0 = 0.

## Test yourself

1. Make the carry output light up — there is only one combination of "a" and "b" that does it.
2. Make the sum output light up while the carry stays dark.
3. Make both the sum and the carry stay off at the same time.

## Intuition

When you add 7 and 5 by hand, the ones column gives 12: you write down 2 and carry a 1 into the tens column. A half adder does exactly the same carrying trick, but with a single binary digit, a bit, instead of a whole decimal column. Set both sliders "a" and "b" to 1 above and watch: the sum output drops to 0 while the carry output lights up, because $1+1=10$ in binary — a sum digit of 0 with a 1 carried onward, just like the 1 you carried from the ones column above.

The other three input pairs — (0,0), (0,1), (1,0) — all give carry 0 and a sum that matches ordinary addition, with no overflow into a new column. XOR is doing the sum's job because it outputs 1 exactly when the two bits disagree, which is the only situation where adding them overflows a single digit: at (1,1).

## Formal

A half adder computes $\text{sum} = a \oplus b$ and $\text{carry} = a \wedge b$ for one-bit inputs $a, b$; together (carry, sum) is the 2-bit binary representation of $a+b$.

It is called "half" because it has no input for an incoming carry; a full adder adds a third input $c_{in}$ so columns can be chained: $\text{sum} = a \oplus b \oplus c_{in}$, $\text{carry} = (a\wedge b) \vee (c_{in}\wedge(a\oplus b))$.

## Advanced

Chaining n full adders so each carry feeds the next — a ripple-carry adder — adds two n-bit numbers, but the carry must propagate through all n stages, giving worst-case delay O(n). Real CPUs use carry-lookahead adders that compute carries in parallel from the inputs, trading extra gates for O(log n) delay.

## Derivation

1. Adding two 1-bits in binary overflows the single digit, exactly like 9+1 overflows a decimal digit.
2. The low digit of that result is 1 only when a and b differ — XOR.
3. The overflow into the next column happens only when both bits are 1 — AND.

## Real world

### Arithmetic logic units
Every ALU inside a CPU builds multi-bit addition and subtraction from chains of full adders derived from this half adder.

### Calculators
Pressing 7+5 on any calculator ultimately ripples through binary adders one bit column at a time.

### Checksums
Network packet checksums use binary addition with carries to catch transmission errors.

### Digital signal processors
Audio and image filters multiply and accumulate binary numbers using adder circuits built on exactly this logic.
