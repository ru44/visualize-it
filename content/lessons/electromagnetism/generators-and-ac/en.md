---
title: Generators and AC
summary: >-
  Spin a coil inside a magnet and it produces a voltage that swings up and
  down as a sine wave — and how fast you spin it sets both the wave's
  height and the frequency the whole power grid runs on.
parameters:
  N: number of turns in the coil N
  B: magnet field strength B
  A: area of the coil A
  rpm: rotation speed, in turns per minute
  t: time t
variables:
  - electrical frequency, in cycles per second
  - the voltage at a given instant
  - the peak (maximum) voltage
---

## Try it

1. The picture shows a coil spinning between two magnet poles, its ends connected to two slip rings and brushes that carry the current out to a lamp — and, to the right, the voltage wave that spinning produces over time.
2. Drag «rotation speed rpm» up. The wave gets both taller (a bigger peak voltage) and tighter (a higher frequency) at the same time — spin the coil twice as fast and both double.
3. Drag «time t» along the wave. The marker on the curve shows the instantaneous voltage, and the little coil schematic turns to match: the voltage is zero exactly when the coil is edge-on to the field, and peaks when it's face-on.

## Real-life examples

1. **A hand-crank flashlight generator.** 200 turns, a 0.3 T magnet, a small 2 cm² coil, cranked at 300 rpm (5 turns a second): about 3.8 V peak — enough to light an LED or trickle-charge a battery.
2. **A small home wind turbine.** 150 turns, a 0.4 T magnet, a 10 cm² coil, spinning at 600 rpm: about 37.7 V peak, fed through an inverter before it reaches household wiring.
3. **A power-station turbogenerator.** 250 turns, a 0.6 T field, a large 800 cm² coil, spinning at exactly 3000 rpm: about 3770 V at 50 Hz — this is a simplified single-loop model; a real generator's raw terminal voltage is produced by many such loops and is stepped up further by transformers before transmission.

## Test yourself

1. Build a hand-crank generator that produces a peak voltage of about 4 V.
2. Set the rotation speed so the electrical frequency lands on 50 Hz, the frequency most of the world's power grids use.
3. Keep the coil small (area at most 0.01 m²) and the field modest (at most 0.4 T), but still reach a peak voltage above 50 V using speed alone.

## Intuition

A generator is a motor running backwards: instead of feeding in current to make the coil spin, you spin the coil by hand, water, wind, or steam, and current comes out. As the coil turns, the amount of magnetic field passing through it keeps changing — most when it's edge-on to the field and changing fastest, zero when it's face-on and not changing at all for an instant — and by Faraday's law, a changing flux is exactly what pushes electrons around a loop. That's why the voltage is a sine wave: it tracks how fast the flux is changing at each point in the spin, not the flux itself.

The coil's two ends are wired to slip rings — plain, unbroken rings, unlike a motor's split-ring commutator — so the current a generator delivers keeps reversing direction every half turn, smoothly, as alternating current (AC). Spin the coil faster and two things happen together: the field changes faster at every point in the turn, so the peak voltage rises, and a full swing up-and-down happens more often, so the frequency rises too. A power station's turbine is built to spin at exactly the right rpm so the frequency comes out at 50 Hz (or 60 Hz in a few countries) — the number every clock, motor, and transformer on that grid is built to expect.

## Formal

For a coil of $N$ turns, area $A$, spinning at a steady angular rate $\omega = 2\pi f$ in a uniform field $B$, the flux through it is $\Phi(t)=BA\cos(2\pi ft)$, and Faraday's law gives an induced voltage $v(t) = V_{peak}\sin(2\pi f t)$ with amplitude $V_{peak}=NBA\,2\pi f$.

The frequency itself comes straight from the rotation speed: one full mechanical turn produces one full electrical cycle, so $f = \dfrac{\text{rpm}}{60}$ — a turbine spinning at 3000 rpm produces exactly 50 Hz, which is why power-station generators are built to spin at that speed (or a whole-number fraction of it, with extra magnet pole-pairs).

## Advanced

The root-mean-square (rms) voltage — the steady-DC-equivalent value your multimeter actually reads for an AC signal — is $V_{peak}/\sqrt2$, about 70.7% of the peak; a "230 V" household mains supply has a peak of roughly 325 V, which is why insulation and switches have to be rated well above the number printed on the socket.

## Derivation

1. The rotation speed in revolutions per minute converts directly to the electrical frequency, one turn giving one cycle.
2. Faraday's law, applied to the coil's changing flux as it turns, gives an induced voltage that is a sine wave in time.
3. The coefficient in front of that sine wave is the peak voltage, and it grows with every one of turns, field, area, and frequency.

## Real world

### Power stations
Coal, gas, nuclear, and hydroelectric plants nearly all work the same way at the very last step: something spins a turbine, the turbine spins a generator coil, and out comes 50 or 60 Hz AC.

### Wind and hydro turbines
Wind turbines and small hydro generators use the same spinning-coil principle at far lower, more variable speeds, so their output usually needs electronics to match the grid's fixed frequency.

### Bicycle dynamos and hand-crank chargers
A dynamo or a hand-crank flashlight is the same idea at a tiny scale — spin something by hand and a small coil produces just enough AC to light an LED.

### Car alternators
A car's alternator is a spinning-coil AC generator too; the car then rectifies that AC into DC to charge the battery and run the electronics.
