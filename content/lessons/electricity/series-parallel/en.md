---
title: Series and parallel resistors
summary: >-
  The same two resistors behave very differently wired end-to-end versus
  side-by-side: series divides the voltage, parallel divides the current.
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

## Intuition

Tap the diagram to flip between series and parallel and watch the current dots. In series there is only one path, so both resistors carry exactly the same dots at the same speed — the same current flows through everything in the loop, one after another.

In parallel, the current splits: the branch with the smaller resistance gets visibly denser, faster-moving dots, because it offers less opposition and so draws more current, while both resistors now sit directly across the full battery voltage rather than sharing it.

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
