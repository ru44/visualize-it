---
title: 'The half adder: addition from logic gates'
summary: >-
  Binary addition of a single column needs only two gates: XOR for the sum bit,
  AND for the carry. Chain many of them and you have built an adder.
parameters:
  a: a — first bit
  b: b — second bit
variables:
  - the two bits being added in this column
  - 'XOR — the sum bit, 1 when exactly one input is 1'
  - 'AND — the carry bit, 1 only when both inputs are 1'
---

## Intuition

Set both $a$ and $b$ to 1 above and watch: the sum output goes to 0 but the carry lights up. That is exactly $1+1=10$ in binary — a sum digit of 0 with a 1 carried to the next column, precisely like carrying a 1 when adding 7+5 by hand in decimal.

The other three input pairs — (0,0), (0,1), (1,0) — all give carry 0 and a sum that matches ordinary addition. XOR is doing the sum because it is 1 exactly when the two bits disagree, which is when adding them "overflows" a single digit only at (1,1).

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
