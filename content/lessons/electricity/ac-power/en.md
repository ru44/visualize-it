---
title: Instantaneous and average AC power
summary: >-
  Instantaneous power in an AC circuit oscillates and can even go briefly
  negative; only its time average — set by the phase lag between voltage and
  current — is the power you actually pay for.
parameters:
  V0: voltage amplitude V0
  I0: current amplitude I0
  phi: phase lag φ (current behind voltage)
  a: window start a
  b: window end b
variables:
  - 'instantaneous voltage and current, both at 50 Hz'
  - phase lag of current behind voltage
  - 'instantaneous power, their product'
  - 'power factor — the fraction of $V_0I_0$ that is real, usable power'
---

## Intuition

The shaded area between $a$ and $b$ is energy delivered in that window — signed, so parts where the curve dips below zero are energy briefly flowing backward into the source. With $\varphi=0$ (voltage and current in step) the curve barely dips negative; drag $\varphi$ up toward $\pi/2$ and the negative lobes grow until they nearly cancel the positive ones.

Set the window to one full cycle ($a=0$, $b=0.02$\,s) and watch the net shaded area shrink as $\varphi$ increases — that net area over a cycle, divided by the cycle length, is exactly the average power $\tfrac12V_0I_0\cos\varphi$: same voltage and current amplitudes, but less delivered work whenever they fall out of step.

## Formal

Instantaneous power is simply the product $p(t)=v(t)i(t)$ for $v=V_0\sin\omega t$ and $i=I_0\sin(\omega t-\varphi)$; expanding with a product-to-sum identity splits it into a constant term plus a term oscillating at $2\omega$.

Only the constant term survives averaging over a full cycle: $P_{\text{avg}} = \tfrac12 V_0I_0\cos\varphi = V_{\text{rms}}I_{\text{rms}}\cos\varphi$, where $\cos\varphi$ is called the power factor.

## Advanced

For a pure resistor $\varphi=0$ and all delivered energy is dissipated; for a pure inductor or capacitor $\varphi=\pm\pi/2$ and $\cos\varphi=0$ — energy sloshes in and out with zero net transfer, which is why reactive loads still draw current (and heat wiring) without registering as billed energy, and utilities penalise a low power factor.

## Derivation

1. Instantaneous power is just voltage times current.
2. A product-to-sum identity splits power into a constant part and a part oscillating at twice the line frequency.
3. The oscillating term integrates to zero over a full cycle, leaving only the constant term.

## Real world

### Electricity bills
Meters bill real (average) power, not the larger apparent power $V_{\text{rms}}I_{\text{rms}}$ drawn when the power factor is below 1.

### Industrial motors
Large inductive motor loads lag current behind voltage; factories add capacitor banks to correct the power factor and cut wasted current.

### Inverters and solar systems
Grid-tied inverters actively control phase to keep the power factor near 1 and maximise real power delivered.

### RMS ratings
Appliance voltage and current ratings (like "230 V") are RMS values chosen precisely so $P=V_{\text{rms}}I_{\text{rms}}\cos\varphi$ matches the familiar DC power formula.
