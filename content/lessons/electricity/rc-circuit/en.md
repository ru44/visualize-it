---
title: RC circuit charging
summary: >-
  A capacitor charging through a resistor approaches the supply voltage
  exponentially, with time constant $\tau = RC$.
parameters:
  V0: supply voltage V₀
  R: resistance R
  C: capacitance C
  x: time t
variables:
  - voltage across the capacitor
  - supply voltage it is charging toward
  - time constant — here kΩ × µF ÷ 1000 gives seconds
charts:
  - title: 'Charging current: largest at the start, then dying away'
    xLabel: t (s)
    yLabel: I (mA)
    series:
      - I = (V₀/R)·e^(−t/RC)
---

## Intuition

Think of filling a tank through a narrow pipe from a reservoir: the fuller the tank, the smaller the pressure difference, the slower it fills. The tangent line is the charging rate — steep at first, nearly flat at the end.

Set the time slider to $t = RC$ (2 s with the starting values): the capacitor has reached about 63% of the supply. After $5RC$ it is within 1%. Bigger $R$ or bigger $C$ stretches the whole curve sideways without changing its shape.

## Formal

Kirchhoff’s voltage law: $V_0 = IR + V_C$ with $I = C\,dV_C/dt$, so $RC\,\dot V_C + V_C = V_0$.

Solution with $V_C(0) = 0$: $V_C = V_0(1 - e^{-t/\tau})$, $I = \frac{V_0}{R}e^{-t/\tau}$.

## Advanced

In the frequency domain the same circuit is a first-order low-pass filter, $H(j\omega) = 1/(1 + j\omega RC)$, with its −3 dB corner at $\omega = 1/RC$ — the time constant and the cut-off are the same fact in two languages.

## Derivation

1. Voltage around the loop sums to zero; the current is the rate of charge arriving on the capacitor.
2. The remaining gap obeys the decay equation $y' = ky$ with $k = -1/RC$.
3. The gap decays exponentially from $V_0$ to zero.

## Real world

### Timers and blinkers
The 555 timer and countless delay circuits measure time by waiting for an RC curve to cross a threshold.

### Filters
RC networks smooth power supplies and remove hiss or rumble in audio.

### Touch screens
Your finger adds capacitance; the controller notices the charging time change.

### Camera flashes and defibrillators
Charge slowly through a resistor, release quickly into the load.
