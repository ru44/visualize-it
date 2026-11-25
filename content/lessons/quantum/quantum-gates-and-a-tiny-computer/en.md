---
title: Quantum gates and a tiny computer
summary: >-
  A quantum computer is built from a handful of simple gates wired
  together — this lesson lets you build three of them yourself and watch
  exactly what each one does to a measurement.
parameters:
  gate: circuit stage
  shots: number of measurements
variables:
  - the flip gate — like a classical NOT, it swaps 0 and 1 with no randomness
  - the Hadamard gate — turns a definite bit into a genuine 50/50 mix
charts: []
---

## Try it

1. Set «circuit stage» to 0, the X gate, and press «run 100 measurements». «results so far» shows 0: 0 and 1: 100 — every measurement comes back 1, a plain, certain flip.
2. Set «circuit stage» to 1, the H gate, and run 100 measurements again. Now the counts split roughly half and half, close to 50 each: a genuine 50/50 mix.
3. Set «circuit stage» to 2, H then CNOT on two qubits, raise «number of measurements» to 1000 and run them. Both qubits always agree: about 500 each of 00 and 11, and 01 and 10 stay at 0.

## Real-life examples

1. **The X gate, like a light switch.** At circuit stage 0, the outcome is completely predictable, no different from an ordinary classical NOT gate.
2. **The H gate, a built-in coin flip.** At circuit stage 1, one gate turns a certain 0 into a fair 50/50 coin, no external randomness added.
3. **H then CNOT, a tiny entangling machine.** At circuit stage 2, two named gates wire two qubits together so their measurements always agree, built here from parts you can name.

## Test yourself

1. Build the plain flip circuit (the X gate).
2. Build the coin-flip circuit (the H gate) and set «number of measurements» to at least 500 to see the 50/50 split settle down.
3. Build the two-qubit entangling circuit (H then CNOT).

## Intuition

Every quantum computer, like every classical one, is wired from a small set of simple building blocks called gates. The X gate is the easiest: it swaps 0 and 1, exactly like flipping a light switch or the NOT gate inside a classical computer chip, and it gives no surprises — start at 0, apply X, measure 1, every single time.

The Hadamard gate, H, does something a classical switch never could: applied to a definite 0, it does not secretly decide 0 or 1 and hide the choice from you — it produces a genuine blend of both, so that measuring afterward gives 0 or 1 with equal probability, the same idea as the qubit in the Schrödinger's cat lesson. Apply H to one qubit and then a CNOT gate, which flips a second qubit only when the first one measures 1, and the two qubits become linked: measuring them always agrees, exactly the entangled pair from the Entanglement lesson, except now you can point to the two named gates that built it.

## Formal

The X gate swaps the two basic states with no randomness at all: $X|0\rangle = |1\rangle$ and $X|1\rangle = |0\rangle$.

The Hadamard gate spreads a definite state into an equal superposition, $H|0\rangle = \frac{1}{\sqrt{2}}\big(|0\rangle+|1\rangle\big)$, so measuring it afterward gives 0 or 1 with equal probability.

## Advanced

X, H and CNOT belong to a small set of gates that, wired together in long enough sequences, can build any quantum computation at all; real processors from IBM and Google chain hundreds of such gates together and add error-correcting circuitry, since each physical gate is imperfect and small mistakes would otherwise pile up over a long computation.

## Derivation

1. The X gate is a certain swap, with no randomness anywhere in it.
2. The H gate turns a certain input into a genuine 50/50 blend, not a secretly-decided but hidden answer.
3. A CNOT gate applied after H on a second qubit links the two together, so that measuring both always gives matching results.

## Real world

### Real quantum processors

IBM's and Google's quantum chips are physically wired from gates like these, applied to real superconducting qubits held near absolute zero.

### Quantum algorithms

Famous quantum algorithms, like Shor's for factoring large numbers, are written on paper as a specific sequence of gates just like X, H and CNOT.

### Quantum error correction

Because a single physical qubit is fragile, real quantum computers spread one "logical" qubit across many physical ones, wired together with gates like CNOT to catch and fix errors.

### Learning to program a quantum computer

Free tools such as IBM's Qiskit let anyone build exactly this kind of circuit, gate by gate, and run it on a real quantum chip over the internet.
