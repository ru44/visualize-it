---
title: 'Quantum gates: X, H and CNOT'
summary: >-
  X flips a qubit, H spreads it into an equal mix of 0 and 1, and CNOT links
  two qubits together so that measuring one changes what the other can be.
parameters:
  g0: gate on qubit A
  g1: gate on qubit B
  cnot: CNOT gate
variables:
  - the amplitude of outcome ab
  - the probability of measuring outcome ab
charts: []
---

## Try it

1. With «gate on qubit A» set to H and «CNOT gate» on, the four bars on the right show only |00⟩ and |11⟩ — never |01⟩ or |10⟩.
2. Click "Measure" a few times. The outcome always agrees with itself across both qubits, even though which one it lands on is random.
3. Turn «CNOT gate» off and measure again: now the two qubits' outcomes have nothing to do with each other.

## Real-life examples

1. **Building an entangled pair.** H on qubit A, then CNOT: the two qubits become linked, with |00⟩ and |11⟩ each half the time and nothing else — the standard recipe for an entangled Bell pair.
2. **Flipping both qubits.** X on A and X on B, no CNOT: the state moves cleanly from |00⟩ to |11⟩, exactly like flipping two classical switches.
3. **An even four-way mix.** H on both qubits, no CNOT: each of |00⟩, |01⟩, |10⟩, |11⟩ comes up exactly a quarter of the time, and the two qubits stay independent of each other.

## Test yourself

1. Build the entangled pair: H on qubit A with CNOT switched on.
2. Flip both qubits from |0⟩ to |1⟩ using only X gates.
3. Spread the state evenly across all four outcomes, with the two qubits independent.

## Intuition

X is the simplest gate here: it just swaps 0 and 1, like flipping a classical switch. H is stranger — it takes a qubit that is definitely 0 and turns it into a genuine 50/50 mix of 0 and 1, not "secretly one or the other". Tap the "A" and "B" buttons above the wires and watch the four bars on the right redraw instantly to show the new mix.

CNOT is the gate that makes two qubits behave as one system instead of two separate ones: it flips qubit B, but only on the part of the state where qubit A is 1. Set qubit A to H and switch CNOT on, and the picture stops showing four independent possibilities — it collapses to just two, |00⟩ and |11⟩, because now the two qubits can only ever agree with each other.

## Formal

Every outcome $ab$ carries a real amplitude $c_{ab}$, and the probability of measuring that outcome is $P_{ab} = c_{ab}^{2}$, with all four probabilities always adding to 1.

X swaps the two amplitudes that differ in one qubit's value; H replaces a pair $(c_0, c_1)$ with $\left(\dfrac{c_0+c_1}{\sqrt2}, \dfrac{c_0-c_1}{\sqrt2}\right)$; CNOT swaps $c_{10}$ and $c_{11}$, leaving $c_{00}$ and $c_{01}$ untouched.

## Advanced

Real qubits carry complex amplitudes and an overall phase that this real-only picture cannot show, but the shape of the argument is identical: X, H and CNOT, together with a phase gate, form a set universal enough to build any quantum circuit, and CNOT specifically is what makes a quantum computer more than a collection of independent coin flips.

## Derivation

1. The two qubits start in the definite state |00⟩, so all of the probability sits on outcome 00 and none anywhere else.
2. X and H each act on one qubit's amplitudes only, while CNOT mixes the two qubits together by swapping amplitudes based on qubit A's value.
3. Squaring each amplitude after all the gates gives the probability of measuring that particular pair of outcomes.

## Real world

### Quantum computers
Real quantum processors build every circuit from a small set of gates like these; CNOT specifically is what lets algorithms exploit entanglement instead of just running many classical guesses in parallel.

### Quantum teleportation
The protocol that "teleports" a qubit's state to a distant qubit starts by building exactly the entangled pair this picture makes with H and CNOT.

### Quantum error correction
Because CNOT links qubits together, it is also the tool engineers use to copy information across several physical qubits so a single error can be detected and fixed.

### Quantum cryptography
Some quantum key distribution schemes rely on entangled pairs like the one built here: measuring one qubit instantly fixes what the other must give, in a way no eavesdropper can secretly copy.
