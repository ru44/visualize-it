---
title: Faraday's law of induction
summary: >-
  A changing magnetic flux through a loop induces an emf equal to (minus) the
  rate that flux is changing — the steeper the flux curve, the bigger the
  induced voltage.
parameters:
  B: field strength B
  A: loop area A
  f: rotation frequency f
  'N': number of turns N
  x: time t
variables:
  - 'magnetic flux through the loop, $B A\cos(2\pi f t)$'
  - induced electromotive force (voltage)
  - number of turns of wire in the coil
  - frequency at which the loop rotates (or the field varies)
---

## Intuition

The curve above is the flux $\Phi(t)$ through a coil — think of it as a loop of wire spinning in a fixed field, so the field "seen" through the loop rises and falls like a cosine. Drag the point along the curve: the tangent line is the induced emf. It is steepest — biggest emf — exactly where the flux itself crosses zero, and flat — zero emf — at the peaks and troughs of flux.

The chart below plots that slope directly as a sine wave, a quarter-cycle ahead of the flux. Raise the frequency $f$ and both the flux oscillates faster and the emf curve grows taller: doubling how fast the flux changes doubles the voltage it induces, even though the flux amplitude $BA$ never changed.

## Formal

Faraday's law: the emf induced around a loop equals minus the rate of change of flux through it, $\varepsilon = -d\Phi/dt$; with $N$ turns each carrying the same flux, $\varepsilon = -N\,d\Phi/dt$.

For $\Phi(t) = BA\cos(2\pi f t)$, differentiating gives $\varepsilon(t) = N B A\, 2\pi f\sin(2\pi f t)$ — the emf amplitude scales with $B$, $A$, $N$, and, critically, with $f$.

## Advanced

Faraday's law in differential form is $\nabla\times\mathbf{E} = -\partial\mathbf{B}/\partial t$: a time-varying $B$ field creates a curling (non-conservative) $E$ field even with no wire present at all — the loop just gives us a convenient way to measure the effect as a voltage.

## Derivation

1. Flux through a loop whose orientation relative to a fixed field varies sinusoidally.
2. Faraday's law: emf is minus the rate of change of total flux linkage.
3. Differentiate the cosine; the minus sign becomes a phase shift, giving a sine.

## Real world

### Generators
Turbines spin coils in a magnetic field (or vice versa) to generate essentially all grid electricity this way.

### Transformers
An alternating current in one coil creates a changing flux that induces a voltage in a neighbouring coil, stepping voltage up or down.

### Induction cooktops
A rapidly alternating field induces eddy currents directly in the pan, heating it without a hot element.

### Wireless charging and RFID
A changing flux from a transmitter coil induces current in a nearby receiver coil with no physical contact.
