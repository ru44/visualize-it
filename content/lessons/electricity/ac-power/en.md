---
title: Instantaneous and average AC power
summary: >-
  An AC motor can draw plenty of current yet still do little useful work, and
  the reason — a mistimed lag between voltage and current — is exactly what
  determines your electricity bill.
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

## Try it

1. Watch the shaded area between markers a and b. It is the energy delivered in that window.
2. Raise the slider "phase lag φ" toward its maximum. Watch the shaded area dip below zero more and more.
3. Set a = 0 and b = 0.02 s (one full cycle) and read the average-power value. It shrinks as φ grows.

## Real-life examples

1. **An electric heater (purely resistive).** Voltage and current stay perfectly in step (V0 = 10 V, I0 = 5 A, φ = 0), so every watt delivered turns into heat — no wasted power.
2. **An induction motor under load.** Current lags noticeably behind voltage (V0 = 15 V, I0 = 6 A, φ = 0.9 rad), so the motor draws more current than its useful work alone would suggest.
3. **A capacitor bank correcting a factory's power factor.** Adding capacitors brings the lag back down close to zero (V0 = 12 V, I0 = 4 A, φ = 0.2 rad), so nearly all the delivered power becomes useful work again.

## Test yourself

1. Get the power factor (cos φ) to exactly 0.5.
2. Push the phase lag toward π/2 until the power factor drops to about 0 — almost no real power delivered.
3. Reach an average power of exactly 30 W.

## Intuition

Picture your home's 230-volt supply driving an electric heater: voltage and current rise and fall together, in step, and every watt delivered goes straight into heat. Now picture the same supply driving a large fan motor instead — the current lags a little behind the voltage, out of step, and part of the power sloshes back and forth without doing any useful work. The picture on screen shows this lag directly: the shaded area between the two markers $a$ and $b$ is the energy delivered in that time window, and it is signed, so parts where the blue curve dips below zero are moments when energy briefly flows backward into the wall socket.

With the phase lag $\varphi$ at zero (voltage and current in step, like the heater) the curve barely dips negative. Drag $\varphi$ up toward its largest value and the negative lobes grow until they nearly cancel the positive ones, like the lagging fan motor. Set the window to one full cycle, $a=0$ and $b=0.02$ seconds, and watch the net shaded area shrink as $\varphi$ rises: that net area, divided by the cycle length, is exactly the average power you actually pay for — the same voltage and current amplitudes, but less real work whenever they fall out of step.

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
