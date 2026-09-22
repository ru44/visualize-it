---
title: Ohm's law
summary: >-
  Voltage pushes, resistance resists, and the current that results is exactly
  their ratio.
parameters:
  V: voltage V
  R: resistance R
variables:
  - voltage — the electrical push supplied by the battery
  - current — the rate charge moves around the loop
  - resistance — how much the resistor opposes that flow
  - power — the rate energy is dissipated as heat in the resistor
charts:
  - title: 'I–V characteristic: slope is 1/R'
    xLabel: V (volts)
    yLabel: I (amps)
    series:
      - I = V / R
---

## Intuition

Drag up and down on the circuit to set the voltage $V$. Watch the dots travelling around the loop: they speed up as $V$ rises, because a bigger push drives a bigger current. Now imagine turning the resistor's dial instead — a larger $R$ chokes the same push down to a smaller current, exactly like squeezing a hose narrows the flow of water for the same pump pressure.

The resistor also glows a little brighter as the power $P = VI$ climbs, which is the heat it is dissipating. This is a deliberately conceptual picture: the dots move together, in one direction, at a speed you can actually see. Real electrons in a wire drift at only a millimetre or so per second, jostling randomly, and — because they carry negative charge — they physically drift opposite to the conventional current direction shown here.

## Formal

For an ohmic conductor at fixed temperature, current is proportional to voltage: $V = IR$, where $R$ is a constant of proportionality called resistance, measured in ohms ($\Omega$).

The power dissipated as heat is $P = VI$, which combines with Ohm's law to give the equivalent forms $P = I^2R = \dfrac{V^2}{R}$.

## Advanced

Ohm’s law is a material model, not a fundamental law: microscopically $\mathbf{J} = \sigma \mathbf{E}$ (Drude). Diodes, filaments and superconductors violate it; for AC it generalises to complex impedance, $V = IZ$.

## Derivation

1. Picture charge flow like water through a pipe: doubling the pressure (voltage) doubles the flow (current), for a fixed pipe.
2. Define resistance as that constant of proportionality — the "narrowness" of the pipe. Rearranging gives Ohm's law.
3. Power is voltage times current; substituting $V = IR$ (or $I = V/R$) gives the two equivalent heating formulas.

## Real world

### Phone chargers
A charger converts mains voltage down to a safe, steady voltage so a predictable, current-limited charge flows into the battery.

### Sensors
Many sensors are resistors whose value changes with light, heat or strain; measuring the resulting current reveals the physical quantity.

### Power supplies
Regulated supplies hold $V$ steady across changing loads, so $I = V/R$ still delivers the right current as $R$ varies.

### Fuses and heating elements
A fuse wire is sized so that at its rated current $P = I^2R$ heats it enough to melt and break the circuit; a kettle element uses the same heating to boil water.
