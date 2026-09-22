---
title: Schrödinger's cat and qubits
summary: >-
  A quantum bit can hold a genuine blend of two outcomes at once, and only
  the act of measuring it forces a single answer to appear.
parameters:
  theta: qubit angle θ
  shots: number of measurements
variables:
  - the qubit's angle, from 0° to 180°
  - the chance of measuring outcome 0
charts: []
---

## Try it

1. Set «qubit angle θ» to 0°. Every single measurement below comes back the same outcome, again and again.
2. Set «qubit angle θ» to 90°. Now the measurements split roughly half and half, however many «number of measurements» you run.
3. Raise «number of measurements» toward 1000 and watch the split settle down to a steady, predictable ratio.

## Real-life examples

1. **A fair coin-flip qubit.** At θ = 90° the outcomes land close to 50/50, like an honest coin toss.
2. **A heavily loaded qubit, almost always 0.** At θ = 30° outcome 0 dominates, though outcome 1 still shows up sometimes.
3. **Many repeated measurements to see the statistics settle.** Running 1000 measurements at once shows the ratio far more clearly than running just a few.

## Test yourself

1. Land the qubit exactly on a 50/50 split.
2. Push the chance of outcome 0 above 90%.
3. Run at least 500 measurements in one go.

## Intuition

Erwin Schrödinger once imagined a cat sealed in a box with a device that has an even chance of releasing poison, tied to a single radioactive atom that itself has not yet decayed or not decayed — it is simply undecided. He meant it as a joke pointing out how strange quantum rules sound when applied to something as ordinary as a cat, not as a real experiment anyone should try: while the box stays shut, quantum mechanics treats the cat as neither clearly alive nor clearly dead, but as a genuine blend of both, and only opening the box forces one outcome to become real. In this lesson's picture, a sleeping cat stands in for that second, undecided-seeming outcome.

A qubit is the tamer, everyday version of that same idea: it is not secretly 0 or secretly 1 before you look, it is a genuine blend of both. Drag «qubit angle θ» on screen and you are tuning exactly how that blend is weighted; running «number of measurements» many times and counting the outcomes is the only way to find out the weighting, since a single measurement always returns a single plain answer.

## Formal

A qubit prepared at angle $\theta$ returns outcome 0 with probability $p = \cos^2\!\left(\dfrac{\theta}{2}\right)$, so $\theta = 0$ always gives 0 and $\theta = 180°$ always gives 1.

Between those two extremes the qubit is in superposition, and no single measurement can reveal $p$ directly — only many repeated measurements, tallied up, reveal it.

## Advanced

Real quantum computers store information in physical qubits — trapped ions, superconducting circuits, or photons — and their power comes from letting many qubits stay in superposition together, so that a calculation explores many possibilities at once before a final measurement collapses the whole system down to one definite answer.

## Derivation

1. A qubit can be a genuine blend of both basic outcomes at once, not just one or the other.
2. Measuring it collapses that blend, and the chance of each outcome is set by how the blend was weighted.
3. The two outcome chances always add up to certainty, since a measurement always returns exactly one answer.

## Real world

### Quantum computing
Companies building quantum computers use superposition across many qubits to attack certain problems, like breaking down large numbers, far faster than any ordinary computer.

### Quantum cryptography
Quantum key distribution uses the fact that measuring a qubit disturbs it, so any eavesdropper trying to intercept a secret key leaves a detectable trace.

### Random number generation
Because a qubit's outcome is genuinely unpredictable until measured, quantum devices can generate truly random numbers, unlike ordinary computers, which only ever fake randomness.
