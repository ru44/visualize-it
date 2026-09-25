---
title: Electrical safety
summary: >-
  Ohm's law applies to the human body too — a touch voltage divided by
  the body's own resistance gives the current through it, and it takes
  as little as 30 mA to be dangerous, which is exactly the trip threshold
  an RCD is built to catch before a fuse or breaker ever would.
parameters:
  V: touch voltage V
  Rb: body resistance Rb
variables:
  - body current — the current that actually flows through the body
  - touch voltage — the voltage across the body during contact with a live part
  - body resistance — the resistance of the current's path through the body
charts: []
---

## Try it

1. Drop «body resistance Rb» toward wet skin's roughly 1000 Ω. «Ib» rockets upward for the very same touch voltage.
2. Raise «body resistance Rb» toward dry skin's roughly 100,000 Ω instead. The same voltage now barely produces a current at all.
3. Watch «Ib» cross 30 mA: that is the exact current an RCD is designed to detect and cut off within milliseconds.

## Real-life examples

1. **Dry hands touching a faulty socket.** At 230 V with dry skin's high resistance of about 100,000 Ω, only 2.3 mA flows — barely a tingle.
2. **Wet hands in a bathroom fault.** The same 230 V through wet skin's much lower 1000 Ω pushes 230 mA through the body — well past the level that can stop a heart.
3. **A 12 V system with wet skin.** Even a low 12 V, through the same wet-skin 1000 Ω, still pushes 12 mA — above the "can't let go" threshold, though below an RCD's 30 mA trip point.

## Test yourself

1. Get the body current to land between the RCD's 25 mA and 35 mA trip range.
2. Push the body current past the fatal 100 mA threshold at mains voltage.
3. Keep the body current under the 1 mA perception threshold, even at full mains voltage.

## Intuition

Ohm's law does not care what the "resistor" is made of, and the human body is no exception: push «touch voltage V» across it and «Ib» flows according to exactly the same $I = V/R$ every other resistor in this course obeys, with «body resistance Rb» standing in for R. The one thing that changes wildly is the resistance itself — dry, callused skin can be a hundred thousand ohms, while wet skin can drop to a thousand ohms or less, a hundredfold difference that turns the very same touch voltage from a barely-felt tingle into a dangerous shock.

That is why water and electricity are such a dangerous mix: it is not that water conducts electricity particularly well by itself, it is that wet skin collapses the body's own resistance, letting far more current through for the same voltage. An RCD (residual current device) is built around exactly this danger: it constantly compares the current flowing in on the live wire to the current flowing back on the neutral, and if even 30 mA is missing — meaning it is flowing through a person instead — it cuts the power in well under a tenth of a second.

## Formal

Ohm's law applied to the body: $I_b = \dfrac{V}{R_b}$, where $R_b$ is the resistance of the current's actual path through the body, which varies enormously with skin condition.

Roughly: around 1 mA is the threshold of perception, 10 mA can lock muscles so a person cannot let go, 30 mA is where breathing can become difficult and is the standard RCD trip point, and 100–200 mA across the chest can trigger a fatal heart rhythm.

## Advanced

A standard fuse or circuit breaker is sized to protect the building's wiring from overheating, typically tripping at several amps — far too slow and far too high a current to protect a person, which is exactly the gap an RCD closes, since it reacts to milliamps rather than amps and disconnects in milliseconds rather than seconds.

## Derivation

1. For a fixed body resistance, the current through the body rises in proportion to the touch voltage: $I_b \propto V$.
2. Defining body resistance as that constant of proportionality and rearranging gives the working formula: $R_b \equiv V/I_b \Rightarrow I_b = V/R_b$.
3. Comparing the resulting current against the standard safety threshold shows exactly when protection should act: above 30 mA, an RCD trips.

## Real world

### RCDs (residual-current devices)
An RCD monitors the tiny difference between live and neutral current continuously and disconnects the circuit the instant that difference exceeds about 30 mA, protecting a person even when a fuse or breaker would never notice.

### Earthing (grounding)
Earthing gives a fault current a deliberate, very low-resistance path back to source, so that a fault draws enough current to blow a fuse or trip a breaker immediately, rather than waiting for a person's body to become that path instead.

### Bathroom wiring rules
Bathrooms require extra-low-voltage circuits, extra earthing and RCD protection precisely because wet skin's low resistance turns an otherwise survivable shock into a dangerous one.

### PPE and insulated tools
Insulated gloves and tool handles work by adding a deliberately huge resistance in series with the body, so that even a substantial touch voltage produces only a negligible, safe current.
