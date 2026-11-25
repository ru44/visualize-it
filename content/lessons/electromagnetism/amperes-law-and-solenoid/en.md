---
title: Ampère's law and the solenoid
summary: >-
  This rule predicts how strong a wire's or a coil's magnetic field is, which
  is how motors, electromagnets, and MRI scanners get designed.
parameters:
  I: current I
  R: wire radius R
  x: distance from the wire's axis x
  n: turns per metre n
variables:
  - permeability of free space
  - magnetic field
  - current in the wire and current enclosed by the Amperian loop
  - wire radius
  - closed-loop integral sign
charts:
  - title: Solenoid field versus current
    xLabel: current I (A)
    yLabel: B_solenoid (mT)
    series:
      - B_solenoid
---

## Try it

1. Picture a kettle's power wire carrying 10 A. Keep «current I» at 10 A, «wire radius R» at 0.005 m and «distance from the wire's axis x» at 0.01 m. The readout shows f(x) = 0.2: the field at that distance is 0.2 mT.
2. Drag «current I» up to 12 A. The curve rises at every distance and the readout shows f(x) = 0.24.
3. Drag «distance from the wire's axis x» down to 0.005 m, the wire's edge set by «wire radius R». The readout peaks at 0.48. Go on to 0.0025 m, inside the wire, and it falls back to 0.24.

## Real-life examples

1. **A household extension cord.** It carries about 10 A to run a heater, through a wire of radius 3 mm. At 2 cm from the wire the field is 0.1 mT, about twice the Earth's field, so a compass needle would notice it.
2. **An electric-car charging cable.** It pushes 32 A through a thick wire of radius 6 mm, so the field is stronger: about 0.13 mT even 5 cm away.
3. **A lab electromagnet.** Wind 4000 turns of wire into every metre of a coil, drive 20 A through it, and you get a strong, steady field of about 100 mT, used to pick up metal parts.

## Test yourself

1. Build a solenoid — a tightly wound coil — whose field reaches about 50 mT.
2. Find a current and a distance where the readout f(x), the wire's field in mT, is about 0.4.
3. Using a thick wire (radius at least 15 mm), find a current and a distance outside the wire that still give a field of at least 0.5 mT.

## Intuition

A kettle's power wire carrying 10 A makes a magnetic field around it, even though you cannot see or feel it without a compass. Drag «distance from the wire's axis x» outward: while you are still inside the wire, the field climbs in a straight line, because moving out sweeps up more and more of the current. Once $x$ passes the wire's radius $R$, all of the current is already inside your loop, so the field starts falling instead.

Now look at the second chart, which swaps the single wire for a solenoid: a coil wound tightly around a rod. It plots the coil's field against the current $I$, and the marked point tracks where that current sits right now. Drag «turns per metre n» up: winding the coil tighter packs more current into the same loop, so the field grows even without raising $I$.

## Formal

Ampère's law: circulating $\mathbf{B}$ around any closed loop gives $\mu_0$ times the current enclosed by that loop, $\oint \mathbf{B}\cdot d\boldsymbol{\ell} = \mu_0 I_{enc}$.

A circular loop centred on the wire exploits its symmetry, turning the circulation integral into a simple product, $B(x)\cdot 2\pi x$, just as a spherical surface does for Gauss's law.

## Advanced

Deep inside a long solenoid the field is remarkably uniform and given by the simple formula $B_{solenoid} = \mu_0 n I$ used in the second chart, a result that itself follows from Ampère's law applied to a rectangular loop straddling the coil's windings — the same theorem, just with a different loop shape chosen to match a different symmetry.

## Derivation

1. Ampère's law fixes the circulation of $\mathbf{B}$ around any loop threaded by the current, regardless of the loop's exact shape.
2. Inside the wire, a uniform current density means the enclosed current scales with the loop's area, $x^2/R^2$, giving a field that rises linearly with $x$.
3. Outside the wire, the whole current $I$ is already enclosed no matter how large the loop is, giving the familiar $1/x$ falloff.

## Real world

### Electromagnets

A coil of wire wound like the solenoid here, carrying enough current, lifts scrap metal in junkyards and switches off the instant the current is cut.

### MRI scanners

A large superconducting solenoid produces the strong, extremely uniform magnetic field an MRI machine needs to align and probe the body's hydrogen nuclei.

### Solenoid valves and relays

A small solenoid's field pulls a metal plunger to open a valve or close a switch the instant current flows through the coil.

### Electric motors

Motors combine a current-carrying coil's magnetic field with the Lorentz force on nearby currents to produce continuous rotation, linking this lesson to 'lorentz-force' and 'faradays-law'.
