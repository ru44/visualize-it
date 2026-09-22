---
title: Logic gates and Boolean algebra
summary: >-
  Every digital circuit reduces to a handful of gates combining 0s and 1s. Flip
  the inputs and read the truth table your choices trace out.
parameters:
  a: a — first input
  b: b — second input
variables:
  - 'the two binary inputs, each 0 (false) or 1 (true)'
  - AND — 1 only when both inputs are 1
  - OR — 1 when at least one input is 1
  - NOT — flips a single input
---

## Intuition

Toggle $a$ and $b$ above the AND gate and watch the output light up only when both switches are on — the truth table below fills in as you go, one row confirmed at a time. Picture the gate list set to OR instead: the output would light whenever either switch is on; for XOR it would light only when the two disagree.

NAND and NOR are AND and OR with the output flipped — a small bubble on the output symbol. That flip matters more than it looks: NAND alone is enough to build every other gate, which is why real chips are built almost entirely out of NAND gates.

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
