---
title: Voltage and energy
summary: >-
  Voltage is energy per unit of charge — a battery is a pump that gives
  every coulomb passing through it a fixed amount of energy, which is why
  a 9 V battery can push a torch bulb far harder than the 3.7 V cell
  inside a phone.
parameters:
  V: voltage V
  Q: charge moved Q
variables:
  - voltage — the energy given to each coulomb of charge that passes through the battery
  - energy — the total energy transferred to the charge, in joules
  - charge — the amount of charge the battery has pushed round the circuit
  - current — the rate charge moves, in coulombs per second
  - time — how long the current has been flowing
charts: []
---

## Try it

1. Raise «voltage V». The «E = QV» readout climbs — the same charge now carries more energy.
2. Raise «charge moved Q». The energy readout climbs too, in a straight line: double the charge, double the energy, for the same voltage.
3. Set «voltage V» to 3.7 and compare the energy reading with the 9 V preset for the same charge — the 9 V battery delivers well over twice as much.

## Real-life examples

1. **9 V battery.** A small 9 V battery pushing 10 C of charge round a circuit delivers 90 J of energy.
2. **Phone battery (Li-ion, 3.7 V).** The same 20 C of charge only carries 74 J at 3.7 V — phones use several such cells together to reach a useful voltage.
3. **AA battery (1.5 V).** A single AA cell pushing 5 C delivers just 7.5 J, which is why torches and remotes need several AA cells in series.

## Test yourself

1. Deliver exactly 90 J of energy.
2. Set the voltage to exactly 3.7 V, matching a phone's battery cell.
3. Deliver more than 200 J of energy while moving less than 15 C of charge.

## Intuition

Think of a battery as a water pump at the bottom of a hill: it does not create water, it lifts each litre that passes through it up to a certain height, giving it a fixed amount of extra energy. A battery does the same to charge — every coulomb that passes through gets exactly the same energy boost, set by «voltage V». On screen, dragging «voltage V» up is like raising the pump's height: the same charge now carries noticeably more energy, shown in the «E = QV» readout.

Two batteries can push the very same amount of charge and still deliver very different amounts of energy, purely because their voltage differs. A 9 V battery gives every coulomb passing through it more than twice the energy that a 3.7 V phone cell gives — which is exactly why a 9 V battery can drive a small motor or a bright bulb, while a lone 3.7 V cell would leave both barely turning.

## Formal

Voltage is defined as energy per unit charge: $V = \dfrac{E}{Q}$, measured in volts, where $1\text{ V} = 1\text{ J/C}$.

Rearranged, the energy delivered to a charge $Q$ pushed through a potential difference $V$ is $E = QV$; since charge is current times time, $Q = It$, this is the same energy formula used for electrical power, $E = VIt$.

## Advanced

Voltage is really a difference in electric potential between two points, and only differences (not an absolute "zero") are ever measurable; a car battery's 12 V and a wall socket's 230 V both describe the energy per coulomb between their own two terminals, not against some universal reference.

## Derivation

1. Voltage is defined as the energy given to each unit of charge: $V = E/Q$.
2. Rearranging gives the total energy transferred to a charge $Q$ pushed through voltage $V$: $E = QV$.
3. Since charge is current times time, $Q = It$, substituting gives the energy in terms of current and time directly: $E = VIt$.

## Real world

### Battery packs
Laptop and power-tool batteries wire several cells in series specifically to add up their voltages, since one cell alone rarely gives each coulomb enough energy to do useful work.

### Electric vehicle charging
EV battery packs run at 300–800 V rather than a car's usual 12 V precisely so that each coulomb carries far more energy, letting a charger deliver the same energy with much less current — and thinner cables.

### Static shocks
A static shock can be thousands of volts yet barely felt, because so little charge is actually involved; $E = QV$ can still be tiny even when $V$ is huge, if $Q$ is tiny enough.

### Power lines
Long-distance power lines run at hundreds of thousands of volts so that each coulomb carries huge energy, letting the same power reach cities with a much smaller, less wasteful current.
