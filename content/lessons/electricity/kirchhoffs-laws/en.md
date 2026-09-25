---
title: Kirchhoff's laws
summary: >-
  Every current flowing into a junction must flow back out, and every
  voltage rise around a loop must be matched by an equal drop — two simple
  bookkeeping rules that pin down every current in even a two-loop circuit
  with three resistors, exactly, every time.
parameters:
  V: battery voltage V
  R1: series resistor R1
  R2: branch resistor R2
  R3: branch resistor R3
variables:
  - the battery's total voltage
  - the resistor in series with the battery, before the junction
  - the first parallel branch's resistor
  - the second parallel branch's resistor
  - the total current leaving the battery, through R1
  - the current through the R2 branch
  - the current through the R3 branch
charts: []
---

## Try it

1. Watch «I1», «I2» and «I3» in the readouts: I2 + I3 always equals I1, exactly — that is Kirchhoff's junction rule.
2. Raise «branch resistor R2». I2 falls, but I3 and the junction rule still hold: I2 + I3 still equals I1.
3. Make «branch resistor R3» much bigger than «branch resistor R2». Almost all the current now takes the easier R2 path.

## Real-life examples

1. **Household 12 V circuit.** With R1 = 10 Ω, R2 = 30 Ω and R3 = 60 Ω, a total of 0.4 A leaves the battery and splits into 0.267 A and 0.133 A.
2. **Two identical branches.** With R2 = R3 = 20 Ω, the 0.6 A total current splits perfectly evenly, 0.3 A down each branch.
3. **One branch much easier than the other.** With R2 = 10 Ω and R3 = 90 Ω, nearly all of the 0.545 A total — 0.491 A — takes the easier R2 path.

## Test yourself

1. Get the total current I1 to exactly 0.5 A.
2. Make I2 more than twice I3, by making the R3 branch harder than the R2 branch.
3. Keep the total current below 0.3 A while the battery voltage is 15 V or more.

## Intuition

Picture the junction as a fork in a river: however much water arrives from upstream must leave downstream, split between the two channels however their widths allow — none can vanish, none can appear from nowhere. That is Kirchhoff's current law: whatever current arrives at a junction, exactly that much current must leave it, so «I1» always equals «I2» plus «I3», no matter how the sliders are set.

Kirchhoff's voltage law is the same bookkeeping applied to energy instead of charge: follow any complete loop around the circuit and the pushes (from the battery) must exactly balance the drops (across every resistor on the way), because you end up back where you started, at the same energy. Raise «branch resistor R2» and current shifts away from that branch and into R3 instead — but recompute both loops and the two laws still balance perfectly, every time.

## Formal

Kirchhoff's current law: the sum of currents into any junction equals the sum of currents out, giving $I_1 = I_2 + I_3$ at the node where the battery branch splits in two.

Kirchhoff's voltage law: the sum of voltage rises and drops around any closed loop is zero, giving $V = I_1R_1 + I_2R_2$ around the outer loop and $I_2R_2 = I_3R_3$ around the inner loop, since R2 and R3 share the same two nodes and therefore the same voltage across them.

## Advanced

These two laws are really statements of conservation: the current law is conservation of charge (charge cannot pile up at a junction in a steady state), and the voltage law is conservation of energy (the electric field is conservative, so the work done going round any closed loop is zero).

## Derivation

1. At the junction where the battery's branch splits, charge conservation demands that everything flowing in also flows out: $I_1 = I_2 + I_3$.
2. Following the outer loop from the battery, through R1, then through the R2 branch and back: the voltage law gives $V = I_1R_1 + I_2R_2$.
3. Following the inner loop through R2 and back through R3 instead, since both branches sit between the same two nodes: $I_2R_2 = I_3R_3$ — together with the junction equation, this pins down all three currents exactly.

## Real world

### House wiring
A home's ring main and lighting circuits form exactly this kind of network, with the fuse box's main feed splitting into many branch circuits that all obey the same two laws, however complicated the wiring gets.

### Circuit simulation software
Software that designs electronics solves Kirchhoff's equations for every junction and loop in a circuit — sometimes thousands of them — to predict exactly what a chip will do before anyone builds it.

### Battery balancing
Battery packs with cells wired in parallel rely on the current law: if one cell's resistance changes, current automatically redistributes across the others so the currents in still sum to the current out.

### Sensor networks
Resistive sensor grids, like touchscreens, are read out using exactly these laws, working backwards from measured currents at the edges to figure out where a touch is applying an extra resistance.
