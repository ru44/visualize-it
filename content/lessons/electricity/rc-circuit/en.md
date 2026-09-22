---
title: RC circuit charging
summary: >-
  Plug in a camera flash and wait: the capacitor does not fill instantly, it
  charges quickly at first and then more and more slowly, following a curve
  every charger, timer and flash circuit relies on.
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

## Try it

1. Drag the point along the curve. Watch the tangent line: steep at first, almost flat by the end.
2. Raise the slider "resistance R". The whole curve stretches out sideways — charging takes longer.
3. Set the time x to R×C (in seconds). Read the capacitor's voltage: it has reached about 63% of the supply.

## Real-life examples

1. **A 555 timer blinking an LED.** With R = 2 kΩ and C = 1000 µF (τ = 2 s, V0 = 9 V), the capacitor takes about 2 seconds to reach 63% charge, setting the blink rate.
2. **A camera flash charging up.** A low resistance and large capacitor (R = 0.5 kΩ, C = 2000 µF, V0 = 6 V, τ = 1 s) let the flash capacitor fill in about a second, ready for the next photo.
3. **A slow-charging indicator light.** A larger resistor (R = 8 kΩ, C = 1000 µF, V0 = 12 V, τ = 8 s) makes the light fade on gradually over several seconds instead of snapping on.

## Test yourself

1. Make the time constant τ = RC exactly 5 seconds.
2. At x = 5 s, get the capacitor charged to at least 90% of the supply voltage.
3. Find a moment x where the capacitor's voltage is exactly half the supply voltage.

## Intuition

Think of filling a bathtub through a narrow tap connected to the mains, but where the water pressure available drops the fuller the tub gets: at first, with the tub empty, water rushes in fast; as it nears full, hardly any more flows in. That is exactly how a capacitor charges through a resistor. On screen, drag the point along the blue curve, labelled $x$ for time in seconds, and watch the tangent line — steep near the start, nearly flat by the end.

Set the time slider to $x = RC$ — with the starting values that is 2 seconds — and read the capacitor's voltage: it has reached about 63% of the supply, no matter what $V_0$, $R$ or $C$ actually are. By $x = 5RC$ it is within 1% of full. Raise the slider "resistance R" or "capacitance C" and the whole curve stretches sideways without changing its shape — a bigger resistor or a bigger capacitor simply takes longer to fill.

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
