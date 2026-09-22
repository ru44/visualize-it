---
title: Faraday's law of induction
summary: >-
  This is why spinning a coil in a magnet makes electricity: it predicts the
  voltage a generator, transformer, or induction cooktop produces.
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

## Try it

1. Picture a bike dynamo: a small coil, 50 turns, spinning twice a second in a modest magnetic field, lighting a bulb.
2. Drag the point along the curve. The tangent line — the slope — is the voltage the coil produces at that instant.
3. Raise «rotation frequency f». The curve grows taller and the voltage the coil makes goes up too.

## Real-life examples

1. **A bike dynamo.** A 50-turn coil spinning twice a second in a 0.2 T field, with a small 0.2 m² loop, produces a peak voltage of about 6 V — enough to light a bulb.
2. **A power-station generator.** A huge 200-turn coil spinning fast in a strong 2 T field, with a 2 m² loop, produces a peak of about 10,000 V before transformers step it down for homes.
3. **An induction cooktop coil.** A 100-turn coil switching once a second in a 1 T field over a 0.3 m² area makes about 190 V, enough to drive the currents that heat the pan.

## Test yourself

1. Build a hand-crank generator that produces a peak voltage of about 6 V, like a bike dynamo.
2. Without touching the field strength, area, or turns much, push the peak voltage above 500 V using speed alone.
3. Keep the coil small (area at most 0.5 m²) and the field weak (at most 1 T), but still reach a peak voltage above 20 V.

## Intuition

Picture a bike dynamo: a small coil spinning in a magnet as the wheel turns, lighting a bulb. The curve above is the flux through that coil — how much magnetic field passes through the loop — and it rises and falls like a wave as the coil spins. Drag the point along the curve: the tangent line, the slope at that spot, is the voltage the coil produces right then. It is steepest, and the voltage biggest, exactly where the flux crosses zero, and flat, with zero voltage, at the flux's highest and lowest points.

The chart below plots that voltage directly, a quarter-turn ahead of the flux curve. Raise «rotation frequency f» and the flux wave speeds up while the voltage curve grows taller: spin the coil twice as fast, and it produces twice the voltage, even though the field and coil size never changed.

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
