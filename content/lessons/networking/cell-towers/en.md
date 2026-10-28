---
title: 'Cell towers: how your phone hands you from one to the next'
summary: >-
  Your phone hears several cell towers at once, and as you move it hands your call
  from one to the next, waiting until the new one is clearly better so it never
  flips back and forth.
parameters:
  d: d — how far you are from tower A (tower B is 6 km away)
  n: n — how fast the signal fades (2 open country, 4 dense city)
  H: H — the handover margin
variables:
  - the signal your phone receives from a tower, in dBm (from tower A or from tower B)
  - the signal 1 km from a tower, here −75 dBm
  - 'how fast the signal fades with distance: 2 in open country, up to 4 in a dense city'
  - your distance from a tower, in km (to tower A or to tower B)
  - 'the handover margin: how much stronger tower B must be before the phone switches, in dB'
---

## Try it

1. Drag d from 0.2 towards 6: your phone walks down the road from tower A to tower B. The blue curve falls and the orange one rises.
2. Stop at 3 km, the middle. Both towers are equally strong, yet the phone stays on tower A. Keep walking until it crosses the dashed handover line.
3. Raise H and the handover line moves further past the middle. Raise n (a denser city) and both curves sink faster, so your bars drop lower before the switch.

## Real-life examples

- **Walking to school in the suburbs.** 1.5 km from tower A in a suburb, the signal is about −80 dBm, four full bars, and tower B, 4.5 km away, is nowhere close.
- **Driving through the countryside.** Open land fades the signal slowly (n = 2.4). Just past the middle, tower B is already 3.5 dB stronger, more than the 3 dB margin, so the call has moved to it without you noticing.
- **Downtown, stuck on the old tower.** A dense city (n = 3.8) and a wide 10 dB margin. At 3.8 km tower B is 9 dB stronger, but not 10, so the phone stays on tower A at about −97 dBm, just two bars.

## Test yourself

1. Walk far enough that your phone hands you over to tower B.
2. Stand at 3.5 km and stay on tower A, even though tower B is already stronger there.
3. In a dense city (n of 3.5 or more), make your signal sink below −95 dBm before the phone lets go of tower A.

## Intuition

A cell tower is a radio that calls out in every direction. The further you walk, the fainter it sounds, and buildings soak up even more of it. Your phone hears every tower nearby and keeps score of each one in dBm. In the picture, the blue curve is tower A and the orange curve is tower B. Drag d and watch your phone move along the road between them.

Halfway along, the two towers sound equally strong. You might expect the phone to jump to tower B right there, but it waits until B is clearly better, by H decibels: the handover margin. Without it, a phone standing near the middle would flip between the towers every second as the signal flickers. So the switch happens a little past the middle, at the dashed line. The thick line is the signal your phone actually uses: it sags as you leave A, then jumps up when the call moves to B.

## Formal

Signal fades with distance following the log-distance model, $P = P_1 - 10\,n\,\log_{10} d$ in dBm. Here $P_1$ is the signal 1 km from the tower (−75 dBm in this lesson) and $d$ is in kilometres. The exponent $n$ is 2 in open air and grows to 3 or 4 in cities, where buildings block and scatter the waves. Every tenfold step in distance costs $10n$ decibels.

Subtract one tower's signal from the other's and the $P_1$ terms cancel, leaving $P_B - P_A = 10\,n\,\log_{10} (d_A / d_B)$. The phone hands over when this difference passes the margin $H$. Walking from A to B along a road of length $D$ (6 km here), that happens at $d_A = D\,r/(1+r)$, where $r = 10^{H/(10n)}$. That point is just past the middle, and further past it when $H$ is bigger or $n$ is smaller.

## Advanced

In LTE and 5G your phone measures a reference signal from every nearby cell (RSRP, the dBm figure you are reading here) and reports it, and the network makes the decision. The rule above is the standard "A3 event": a neighbour better than the serving cell by an offset, for a set time-to-trigger, usually 40 to 640 ms. The time condition is a second guard against ping-pong, so a brief gap between two buildings is not enough to switch.

A tower usually carries three panels, each covering a 120° sector, so one mast is really three cells, and walking around it can hand you between its own sectors. An idle phone does a lighter version called cell reselection without asking the network; only during a call or a data session does the network steer the handover. And a cell is limited by more than signal: everyone in it shares its capacity, which is why cities add more, smaller cells rather than louder towers.

## Derivation

1. Write the same formula for each tower, using your distance to it: $d_A$ to tower A and $d_B$ to tower B.
2. Subtract one from the other. $P_1$ cancels, and a difference of two logarithms becomes the logarithm of a ratio, so only the ratio of the two distances matters.
3. The phone does not switch the moment B is stronger. It waits until the difference passes the margin $H$, so it does not bounce between the towers near the middle.

## Real world

### Calls that survive a motorway
At 100 km/h you cross each cell of a town in about a minute. Handover moves your call from tower to tower in a few tens of milliseconds, so you never hear the switch.

### Bars that vanish in a lift
A metal lift or a basement adds tens of decibels of loss on top of the distance. If the phone hears no tower stronger than about −115 dBm, it shows "No service".

### Small cells in cities
Downtown, signals fade fast and thousands of people share each cell, so carriers add small cells on lamp posts and rooftops a few hundred metres apart.

### Stadiums and festivals
When 50,000 people gather in one field, carriers bring cell towers on trucks and park them beside it for the day, so each tower serves fewer phones.
