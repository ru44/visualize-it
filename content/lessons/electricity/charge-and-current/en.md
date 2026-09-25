---
title: Charge and current
summary: >-
  A current of 1 A means exactly 1 coulomb of charge sliding past any point
  in the wire every second — and yet the electrons carrying that charge
  drift along slower than a snail, because a copper wire packs an
  enormous number of them into every millimetre.
parameters:
  I: current I
  A: wire cross-section A
  t: time t
variables:
  - current — the charge passing a point in the wire each second
  - charge — the total amount of electric charge that has flowed, in coulombs
  - time — how long the current has been flowing
  - number density — how many free electrons sit in each cubic metre of the copper
  - cross-section — the area of the wire's circular cross-section
  - elementary charge — the charge carried by a single electron
  - length — the stretch of wire the charge is imagined to sweep through
  - drift velocity — the average speed the electrons creep along the wire
charts: []
---

## Try it

1. Raise «current I». The dots in the wire move faster: more current means more charge sliding past every second.
2. Raise «time t». The «Q = It» readout climbs — charge just keeps piling up the longer the current flows.
3. Shrink «wire cross-section A» right down. The drift speed readout barely changes the dots on screen, but the real number underneath it jumps, because the same current now has to squeeze through far fewer electrons.

## Real-life examples

1. **Phone charging cable.** A thin USB cable carries about 0.5 A; left plugged in for a minute, 30 C of charge has flowed into the battery.
2. **Kettle's mains lead.** A kettle draws roughly 8 A through a much thicker cable; in just 5 seconds, 40 C already flows — the same charge the phone cable took a full minute to deliver.
3. **LED strip.** A metre of LED strip sips about 0.2 A through a thin wire; over half a minute that is only 6 C, which is why its wire can stay so thin.

## Test yourself

1. Get exactly 40 C of charge to flow.
2. Push the drift speed under 0.05 mm/s while keeping the current at 3 A or more.
3. Squeeze more than 5 A through a wire thinner than 1 mm².

## Intuition

Picture the wire as a hose already completely full of water: when you turn the tap, water comes out the far end almost instantly, not because any single drop raced down the hose, but because every drop in the whole line nudges the next one forward at once. A copper wire is like that hose already packed with free electrons — about $8.5 \times 10^{28}$ of them in every cubic metre. Raise «current I» on screen and the dots move faster, standing in for a bigger charge flow, but the electrons themselves are never sprinting.

Work out the actual speed and it is startling: for an everyday current through an ordinary wire, the drift velocity is a small fraction of a millimetre per second — slower than a snail, and thousands of times slower than the electrical "push" that reaches a lightbulb the instant you flick a switch. Shrinking «wire cross-section A» packs the same current through fewer electrons, so each one has to drift faster to keep up — try it and watch the drift-speed readout jump while the visible dots barely change.

## Formal

Current is the rate charge passes a point: $I = \dfrac{Q}{t}$, so 1 ampere is exactly 1 coulomb per second ($1\text{ A} = 1\text{ C/s}$).

Microscopically, the charge that crosses a cross-section $A$ in time $t$ is carried by every free electron within a length $L$ of wire, giving $I = nAev_d$, where $v_d$ is the drift velocity — the tiny average speed of the electrons themselves.

## Advanced

The signal that turns on a distant bulb travels near the speed of light, because it is the electric field inside the wire that propagates fast, nudging electrons everywhere almost at once; the electrons that actually reach the bulb are different ones from those that started at the switch, and they arrive far later, still crawling at drift speed.

## Derivation

1. Current is defined as charge per time: $I = Q/t$.
2. That charge is carried by the free electrons in a wire segment of length $L$: $Q = nAeL$, so $I = nAe(L/t)$.
3. Since $L/t$ is just the electrons' average speed, $v_d$, this gives $I = nAev_d$, and rearranging finds the drift velocity itself: $v_d = I/(nAe)$.

## Real world

### Wire gauges
Cables are rated by cross-sectional area precisely because a thinner wire forces the same current through fewer electrons, raising resistive heating — which is why a phone charger's cable is thin but a cooker's supply cable is thick.

### Circuit breakers
A breaker trips when current, not charge, gets too high, because current is what determines how fast heat builds up in the wires behind the wall.

### Electroplating
Electroplating shops track total charge, $Q = It$, to control exactly how much metal gets deposited, since the mass plated is proportional to the charge that has flowed.

### Battery capacity
A battery rated "3000 mAh" is really rating total charge it can deliver — 3 amps for one hour, or 1 amp for three, before it runs flat.
