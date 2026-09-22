---
title: 'Propositional logic'
summary: >-
  A proposition is a statement that is simply true or false. Combine two of
  them with AND, OR and NOT, and the same rule drives both a truth table and
  a circuit.
parameters:
  a: a — first input (0 or 1)
  b: b — second input (0 or 1)
variables:
  - 'p, q: propositions, each either true (1) or false (0)'
  - 'AND: true only when both sides are true'
  - 'OR: true when at least one side is true'
  - 'NOT: flips true to false and false to true'
---

## Intuition

Flip the two switches a and b and watch the gate's output follow the truth table beside it. With AND the lamp only lights when both a and b are 1; slide either one to 0 and the light goes out immediately, because AND demands every input to hold.

Change the gate to OR and the lamp is far easier to please: it lights as soon as one input is 1, and only goes dark when both are 0. NOT is simpler still — it just flips whatever single input you give it, so the same switch that turns a light on for AND turns it off for NOT.

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
