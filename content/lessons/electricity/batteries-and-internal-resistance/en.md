---
title: Batteries and internal resistance
summary: >-
  A battery never quite delivers its full rated voltage once current is
  actually flowing, because some of its own push is lost driving current
  through its own internal resistance — which is why a car battery
  struggles hardest exactly when it is cold and the starter motor needs
  it most.
parameters:
  emf: EMF ε
  r: internal resistance r
  R: load resistance R
variables:
  - terminal voltage — what a voltmeter actually reads across the battery's terminals
  - EMF — the battery's full rated push when no current is flowing at all
  - current — how much current the battery is actually delivering
  - internal resistance — the small resistance inside the battery itself
  - load resistance — the resistance of whatever the battery is powering
charts: []
---

## Try it

1. Raise «internal resistance r». «V» (terminal voltage) drops below «EMF ε», even though the EMF itself never changed.
2. Raise «load resistance R» instead. «V» climbs back up closer to «EMF ε», because less current now flows through the same internal resistance.
3. Compare the warm-battery preset with the cold-battery one: the terminal voltage sags far more once «internal resistance r» rises.

## Real-life examples

1. **Warm car battery starting the engine.** With EMF 12.6 V and a tiny internal resistance of 0.02 Ω, the starter's heavy 24.2 A draw only sags the terminal voltage to 12.1 V.
2. **Cold car battery starting the engine.** Cold weather raises the same battery's internal resistance to 0.1 Ω; the same starter load now sags the terminal voltage all the way down to 10.5 V.
3. **AA battery powering a flashlight.** With a much smaller EMF of 1.5 V and a modest 5 Ω load, the terminal voltage barely sags, to 1.456 V.

## Test yourself

1. Get the terminal voltage to exactly 10 V, simulating a struggling cold battery under load.
2. Make the voltage sag (EMF minus terminal voltage) exceed 3 V.
3. Keep the voltage sag under 0.1 V while the current is 5 A or more — a genuinely healthy battery.

## Intuition

Every real battery is really a perfect EMF source with a small resistor built in right next to it, invisible from the outside, called its internal resistance. As soon as current actually flows, some of the battery's push gets "used up" just driving that current through its own internal resistance, before the rest ever reaches the terminals — so the voltage a meter reads outside, «V», is always a little less than the full «EMF ε» once current is flowing, even though the EMF itself never changes.

The effect is tiny for a fresh, warm car battery, whose internal resistance is only around 0.02 Ω. Cold weather thickens the battery's internal chemistry and raises that resistance several-fold, so exactly when a car most needs a big, brief current to crank the starter motor, the terminal voltage sags hardest — which is why a marginal battery that works fine all summer can suddenly struggle to start the car on the first freezing morning.

## Formal

Terminal voltage is the EMF minus the drop across the internal resistance: $V = \varepsilon - Ir$, where $\varepsilon$ is the EMF (the voltage with no current flowing at all) and $r$ is the internal resistance.

Since the same current flows through both the internal resistance and whatever external load resistance $R$ the battery is connected to, $I = \varepsilon/(R+r)$, and the terminal voltage is equally just the voltage across the load itself, $V = IR$.

## Advanced

A battery's internal resistance is not fixed: it rises as the battery discharges and its chemistry runs low, and it rises sharply in the cold, which is why battery capacity ratings are always given alongside a temperature, and why "cold cranking amps" is its own separate rating for car batteries.

## Derivation

1. The voltage available at the battery's terminals is whatever the EMF provides minus whatever gets lost driving current through the internal resistance: $V = \varepsilon - Ir$.
2. The same current has to flow through the internal resistance and the external load in series, so applying Ohm's law to the whole loop gives $I = \varepsilon/(R+r)$.
3. Equivalently, since all of that current then flows through the load itself, the terminal voltage is just $V = IR$ — the same answer either way.

## Real world

### Car starter motors
A starter motor briefly draws well over 100 A, which is exactly the situation where internal resistance matters most, since even a small $r$ causes a large $Ir$ voltage sag under such a heavy current.

### Battery testers
A battery tester deliberately applies a known load and measures how far the voltage sags, because that sag directly reveals the internal resistance — a fast, practical way to judge a battery's health without opening it up.

### Rechargeable battery packs
Laptop and phone battery packs are rated with an internal resistance low enough that they can supply a phone's peak current demand without the voltage sagging enough to reset the device.

### Solar cells
A single solar cell has a meaningful internal resistance too, which is why its usable output voltage sags as more current is drawn from it under bright sun, exactly like a battery under load.
