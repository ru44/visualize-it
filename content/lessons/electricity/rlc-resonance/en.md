---
title: RLC resonance
summary: >-
  A resistor, inductor and capacitor in series pass current best at one special
  frequency, where the inductor and capacitor's opposite reactances exactly
  cancel.
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

## Intuition

Drag the frequency point along the curve. Current is small at low and high frequency and peaks sharply near one frequency in the middle — the inductor resists fast changes (its reactance $2\pi fL$ grows with $f$) while the capacitor resists slow ones (its reactance $1/2\pi fC$ shrinks with $f$); only near $f_0$ do those two opposing effects cancel and the circuit looks purely resistive.

Shrink $R$ with the default $L$ and $C$ and watch the peak grow taller and narrower — less resistance means less to limit the current right at resonance, and a sharper filter that only lets a narrow band of frequencies through.

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
