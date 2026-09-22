---
title: 'Propositional logic'
summary: >-
  Combining two true-or-false statements with AND, OR and NOT is the same
  rule that drives both a truth table and a computer chip's circuits.
parameters:
  a: a — first input (0 or 1)
  b: b — second input (0 or 1)
variables:
  - 'p, q: propositions, each either true (1) or false (0)'
  - 'AND: true only when both sides are true'
  - 'OR: true when at least one side is true'
  - 'NOT: flips true to false and false to true'
---

## Try it

1. Set switch a to 1 (has a badge) and switch b to 1 (knows the code) and watch the lamp turn on.
2. Slide switch b back to 0 and watch the lamp go dark immediately, even though a is still 1.
3. Compare the AND lamp with the truth table on the right, and find the only row where the output is 1.

## Real-life examples

1. **Full access: badge and code.** A worker has a badge (a = 1) and knows the door code (b = 1): the AND gate outputs 1, and the door unlocks.
2. **Badge but no code.** A visitor has a badge (a = 1) but does not know the code (b = 0): AND outputs 0, and the door stays locked.
3. **Code but no badge.** Someone knows the code (b = 1) but was never issued a badge (a = 0): AND still outputs 0, so the door still stays locked.

## Test yourself

1. Find the one combination of a and b that makes AND output 1 and light the lamp.
2. Find a combination where a and b disagree, so AND stays 0 even though one input is 1.
3. Find the value of a for which flipping b alone would change whether the lamp lights.

## Intuition

A door unlocks only when a worker both has a badge and knows the code. Set switch a to 1 for "has a badge" and switch b to 1 for "knows the code", and watch the lamp: it lights only when both switches read 1, matching the row (1, 1) in the truth table on the right. Slide either switch back to 0 and the lamp goes dark immediately, because AND demands every input hold at once.

A different rule, admitting a guest if they show a badge or a staff member vouches for them, needs only one condition to hold instead of both: OR lights up whenever at least one switch is up, and only stays dark when both are 0. NOT is simpler still: it just flips whichever single input you give it, so the switch that turns a light on for AND turns the same light off for NOT.

## Formal

A proposition takes only the values true (1) or false (0). $p \land q$ (AND) is true exactly when both p and q are true; $p \lor q$ (OR) is true when at least one is true; $\neg p$ (NOT) is true exactly when p is false.

A truth table lists every combination of inputs and the output for each: with two propositions there are $2^2 = 4$ rows, and with n propositions there are $2^n$ rows to check.

## Advanced

A tautology is a statement that comes out true in every row of its truth table, such as $p \lor \neg p$ ("p or not p"), while a contradiction is false in every row. De Morgan's laws connect the three connectives: $\neg(p \land q)$ has the same truth table as $\neg p \lor \neg q$, and swapping $\land$ for $\lor$ gives the matching second law — a fact used constantly when simplifying digital circuits and search queries.

## Derivation

1. List every possible combination of p and q: with two propositions that gives four rows to check.
2. Read off AND and OR directly from those rows: AND needs both to be true, OR needs at least one.
3. A statement true across all four rows, like "p or not p", is a tautology — it can never come out false.

## Real world

### Search engine queries
Typing "cats AND dogs" versus "cats OR dogs" changes whether a result needs both words or just one, exactly like the AND and OR gates here.

### Digital circuits
Every logic gate on a computer chip computes AND, OR or NOT (or a combination of them) on its input wires, building up from these three rules to full processors.

### Access control
A system might grant access only if "has a badge AND knows the code", or block it if "not on the approved list" — plain propositional logic behind a locked door.

### Spreadsheet and database filters
Filtering rows where "price < 50 AND in stock" combines two true/false conditions the same way the truth table combines p and q.
