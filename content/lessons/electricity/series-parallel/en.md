---
title: Series and parallel resistors
summary: >-
  Household outlets all work independently so one broken appliance does not
  kill the power to the rest of the house, but old-style string lights share
  one loop so a single burnt bulb darkens the whole strand — the difference
  is whether the parts are wired in series or in parallel.
parameters:
  V: supply voltage V
  R1: resistance R1
  R2: resistance R2
  mode: series (0) / parallel (1)
variables:
  - the two resistors
  - equivalent resistance in series and in parallel
  - current through each resistor
  - voltage drop across each resistor
---

## Try it

1. Tap the diagram to select series mode. Watch the same dots flow through both resistors, one after another.
2. Tap again for parallel mode. Watch the dots split at the junction into two separate streams.
3. Raise "resistance R1". In parallel mode its branch gets sparser; in series mode the whole loop slows down.

## Real-life examples

1. **Old-style string lights (series).** Wired one bulb after another (mode = series, R1 = 20 Ω, R2 = 60 Ω, V = 12 V), a single broken bulb once broke the whole string of lights.
2. **Household wall outlets (parallel).** The same two resistors wired side-by-side instead (mode = parallel, R1 = 20 Ω, R2 = 60 Ω, V = 12 V) let each appliance work independently, seeing the full 12 V regardless of the others.
3. **A voltage-divider light sensor (series).** A fixed 30 Ω resistor in series with a 10 Ω sensor (V = 9 V) creates a voltage across the sensor that a circuit can read to detect changes in light or temperature.

## Test yourself

1. Wire the resistors in parallel and get the combined resistance to exactly 12 Ω.
2. Wire the resistors in series and get the combined resistance to exactly 50 Ω.
3. Build a series voltage divider that drops exactly 3 V across R2.

## Intuition

Old-style Christmas lights were wired one bulb after another in a single loop: unscrew any one bulb and the whole string goes dark, because there is only one path for the current and it just got broken. Tap the diagram on screen to select series mode and watch the moving dots: in series there is only one path, so both resistors, $R_1$ and $R_2$, carry exactly the same dots at the same speed — the same current flows through everything in the loop, one after another.

Now tap the diagram again to flip to parallel mode, like the wall outlets in a room: each one connects straight across the same two wires, so unplugging one lamp does nothing to the others. Watch the dots split at the junction: the branch with the smaller resistance gets denser, faster-moving dots, because it offers less opposition and draws more current, while both resistors now sit directly across the full battery voltage $V$ instead of sharing it.

## Formal

Kirchhoff's voltage law (around a loop, drops sum to the source) and current law (current in equals current out at a node) fully determine both circuits. In series, $I$ is common and $V_1+V_2=V$; in parallel, $V$ is common and $I_1+I_2=I$.

Series resistances add directly, $R_s=R_1+R_2$; parallel resistances add as reciprocals, $1/R_p=1/R_1+1/R_2$, so $R_p$ is always smaller than either resistor alone.

## Advanced

The voltage divider $V_2 = V\dfrac{R_2}{R_1+R_2}$ and current divider $I_1 = I\dfrac{R_2}{R_1+R_2}$ are the two-resistor special cases of a much more general fact: any linear resistive network reduces, from the point of view of two terminals, to a single Thévenin resistance.

## Derivation

1. Series: same current I through both, voltages add around the loop.
2. Parallel: same voltage V across both, currents add at the node.
3. Define R_p from I=V/R_p; the series voltage divider follows from V_2=IR_2.

## Real world

### Household wiring
Outlets are wired in parallel so each appliance sees the full mains voltage and works independently of the others.

### Old-style string lights
Wired in series, one broken bulb once broke the whole string — a classic demonstration of why series is fragile.

### Voltage-divider sensors
A fixed resistor in series with a variable one (thermistor, photoresistor) creates a voltage that tracks temperature or light.

### Battery packs
Cells in series add voltage; cells in parallel add capacity — pack designers combine both.
