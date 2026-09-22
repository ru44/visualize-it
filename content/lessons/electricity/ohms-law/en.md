---
title: Ohm's law
summary: >-
  A flashlight glows brighter with a fresh battery and dimmer through a thin
  wire, because how much current flows depends on both the push (voltage)
  and the resistance in its way — a relationship every charger, bulb and
  appliance obeys.
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

## Try it

1. Raise «voltage V». The dots speed up: more push, more current.
2. Raise «resistance R». The dots slow down: harder path, less current.
3. Read «I = V/R» under the picture. It is always the voltage divided by the resistance.

## Real-life examples

1. **A small torch bulb.** A modest push of 3 V through a 15 Ω bulb filament (I = 0.2 A) gives just enough current to make the filament glow.
2. **A car headlight.** A 12 V battery through a 4 Ω headlight (I = 3 A) pushes far more current, which is why headlights burn out faster than torch bulbs.
3. **A phone charger's current-limiting resistor.** A 5 V charger through a 25 Ω resistor (I = 0.2 A) keeps the current low enough to protect the battery.

## Test yourself

1. Get the current to exactly 2 A.
2. Make the power dissipated exactly 18 W.
3. Keep the current under 0.5 A while the resistance is at least 40 Ω.

## Intuition

A fresh 9-volt battery connected to a light bulb pushes more current through it than a weak, nearly dead 3-volt battery would — the harder push means a bigger flow of charge. On screen, drag up and down on the circuit to set the voltage, labelled $V$, and watch the dots travelling around the loop: they speed up as $V$ rises, because a bigger push drives a bigger current.

Now imagine squeezing a garden hose instead: the same pump pressure pushes less water through a narrower hose. Turning the resistor's dial does the same thing electrically — a larger resistance, labelled $R$, chokes the same push down to a smaller current. The resistor also glows a little brighter as the power climbs, which is the heat it dissipates; watching it change as you drag both sliders is the quickest way to feel how voltage, resistance and current relate.

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
