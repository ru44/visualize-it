---
title: Logic gates and Boolean algebra
summary: >-
  Every decision a computer chip makes, from unlocking your phone to letting
  a video game character jump, boils down to switches like these being
  combined by a handful of simple rules.
parameters:
  a: a — first input
  b: b — second input
variables:
  - 'the two binary inputs, each 0 (false) or 1 (true)'
  - AND — 1 only when both inputs are 1
  - OR — 1 when at least one input is 1
  - NOT — flips a single input
---

## Try it

1. Set slider «a» to 1 and slider «b» to 0, and watch the AND gate's output light stay off.
2. Raise «b» to 1 as well, so both switches are on, and watch the light turn on and the matching row in the truth table below get ticked.
3. Drop «a» back to 0 while «b» stays at 1, and see the light switch off again — AND only lights up when every input is on.

## Real-life examples

- **Starting a car.** a = 1 means the key is turned and b = 1 means the seatbelt is buckled; with both switches on, the AND gate shows the engine is allowed to start.
- **Unlocking a phone.** a = 1 means the password was typed correctly, but b = 0 means the fingerprint did not match; with only one input on, AND keeps the phone locked.
- **Arming a burglar alarm.** a = 0 and b = 0 mean the door is not shut and the motion sensor is not set; with both switches off, AND leaves the alarm disarmed.

## Test yourself

1. Flip both switches on so the AND gate's output light finally turns on.
2. Flip exactly one switch on and leave the other off, and notice the AND gate's light stays dark even though something changed.
3. Flip both switches off and confirm the output light stays dark, just as it did before.

## Intuition

Think of two light switches on a wall, one labelled a and one labelled b, each either off (0) or on (1) — four combinations in total, and you have flipped switches like these a hundred times before. This screen wires those two switches into an AND gate: drag slider «a» to 1 and slider «b» to 1 together, and the output light above the gate turns on, while the truth table below fills in the matching row. Try any other combination — one switch on, or both off — and the light stays dark, because AND only turns on when every input does.

Imagine the same two switches wired into an OR gate instead: now the light turns on if either switch is on, not only when both are. An XOR gate lights up only when the two switches disagree, one on and one off, and goes dark again the moment both agree. NAND and NOR are just AND and OR with the output flipped upside down, and that flip turns out to be enough on its own to build every other gate — which is why real computer chips are built almost entirely out of repeated NAND gates.

## Formal

Boolean algebra has two operations and one complement: $a \wedge b$ (AND), $a \vee b$ (OR), $\neg a$ (NOT), satisfying De Morgan's laws $\neg(a \wedge b) = \neg a \vee \neg b$ and $\neg(a \vee b) = \neg a \wedge \neg b$.

XOR is defined as $a \oplus b = (a \wedge \neg b) \vee (\neg a \wedge b)$: true exactly when $a$ and $b$ differ; NAND $=\neg(a\wedge b)$ and NOR $=\neg(a\vee b)$ are each functionally complete on their own.

## Advanced

Any Boolean function of n inputs can be written in disjunctive normal form — an OR of ANDs, one term per row where the output is 1 — which is exactly how the truth table you are filling in translates directly into a circuit. Functional completeness of a single gate (NAND or NOR) means an entire CPU can, in principle, be built from one repeated component.

## Derivation

1. Two binary inputs give four possible combinations.
2. Only one of the four rows, (1,1), makes AND true.
3. De Morgan's law: flip the output of AND and it becomes OR of the flipped inputs — connecting AND, OR and NOT.

## Real world

### CPUs
A modern processor packs billions of transistors wired into logic gates that add, compare and branch.

### Search and filtering
A database query like "price < 50 AND in-stock" is literally a Boolean AND of two conditions.

### Digital locks
A keypad lock is a circuit that outputs 1 (unlock) only for one specific combination of inputs.

### Programming
Every `if (a && b)` or `if (a || !b)` in code compiles down to exactly these gates.
