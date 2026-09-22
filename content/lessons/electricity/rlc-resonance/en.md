---
title: RLC resonance
summary: >-
  Turning a radio dial does not change a station's actual frequency — it
  changes your receiver's own favourite frequency until the two match, and
  that is the moment a weak signal suddenly comes through loud and clear.
parameters:
  V: source voltage V
  R: resistance R
  L: inductance L
  C: capacitance C
  x: drive frequency f
variables:
  - inductance (drawn in mH; the physics uses henries)
  - capacitance (drawn in µF; the physics uses farads)
  - 'resonant frequency, where reactances cancel'
  - quality factor — sharpness of the resonance peak
---

## Try it

1. Drag the frequency point along the curve. Current is small at the edges and peaks in the middle.
2. Lower the slider "resistance R". Watch the peak grow taller and narrower.
3. Read the frequency where the peak sits — that is the resonant frequency f0.

## Real-life examples

1. **A radio tuner searching for a station.** With low resistance (L = 50 mH, C = 20 µF, R = 5 Ω), the response peaks sharply at one frequency, letting the receiver pick out a single station and reject its neighbours.
2. **A wireless phone-charging pad.** With moderate resistance (L = 100 mH, C = 50 µF, R = 20 Ω), transmitter and receiver coils are tuned to the same resonant frequency so energy transfers efficiently across the small gap.
3. **A metal detector's coil.** With L = 150 mH, C = 5 µF, R = 15 Ω, a nearby metal object shifts the coil's effective inductance, moving the resonant peak in a way the circuit can sense.

## Test yourself

1. Tune to resonance: bring the drive frequency within 2 Hz of f0 for the current L and C.
2. Make the resonance sharp: reach a quality factor Q of at least 15.
3. At resonance, reach a peak current of at least 1.5 A.

## Intuition

Turn the dial on an old analogue radio and, out of all the stations broadcasting at once, only one comes through clearly at a time — the rest stay silent. That happens because the radio's tuning circuit favours one particular frequency and rejects the others, and the picture on screen shows exactly that favouritism as a curve. Drag the frequency point along the blue curve, labelled $x$ in Hz, and watch the current climb and fall: it is small at low and high frequencies, and peaks sharply near one frequency in the middle, called the resonant frequency.

That peak happens because an inductor (coil) resists fast changes in current more and more as frequency rises, while a capacitor resists slow changes more and more as frequency falls — only right at the resonant frequency do these two opposing effects cancel out, leaving the circuit acting like a plain resistor and letting the most current through. Shrink the slider "resistance R", keeping the default "inductance L" and "capacitance C", and watch the peak grow taller and narrower — that is a radio tuner becoming more selective, rejecting neighbouring stations more sharply.

## Formal

Inductors and capacitors have frequency-dependent reactances $X_L=2\pi fL$ and $X_C=1/(2\pi fC)$; total series impedance magnitude is $|Z|=\sqrt{R^2+(X_L-X_C)^2}$, and current amplitude is $I=V/|Z|$.

Resonance occurs where $X_L=X_C$, giving $f_0=1/(2\pi\sqrt{LC})$ and the minimum possible impedance $|Z|=R$, so current there is simply $I=V/R$.

## Advanced

The sharpness of the peak is captured by the quality factor $Q=\dfrac{1}{R}\sqrt{L/C} = \dfrac{f_0}{\Delta f}$, the resonant frequency divided by the bandwidth where power falls to half its peak value — high-Q circuits ring longer and select frequencies more selectively, the same trade-off that governs radio tuners and musical resonators alike.

## Derivation

1. Series impedance: resistor is real, inductor and capacitor contribute opposite-signed imaginary reactances.
2. Ohm's law for AC circuits uses the impedance magnitude.
3. Reactances cancel exactly at resonance, minimising impedance and maximising current.

## Real world

### Radio tuning
Turning a dial changes C (or L) to move $f_0$ to the station you want to pick out of the air.

### Wireless power transfer
Transmitter and receiver coils are tuned to the same resonant frequency to transfer energy efficiently over a gap.

### Metal detectors
A metal object nearby shifts the coil's effective inductance, detuning the resonance in a way the circuit can sense.

### Audio filters and equalisers
RLC-like resonant stages boost or cut a narrow band of frequencies around $f_0$.
