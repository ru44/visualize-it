---
title: Ampère's law and the solenoid
summary: >-
  Circulate around any current-carrying wire and the total 'push' you measure
  depends only on the current threading through the loop.
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

## Intuition

Drag $x$ outward from the wire's centre and watch the field rise in a straight line while you're still inside the wire, then switch to falling as $1/x$ once you pass $R$ — inside, only a growing slice of the current is enclosed by your loop; outside, all of it already is, and only the loop's radius keeps changing.

Now look at the second chart: it swaps the straight wire for a tightly wound solenoid and sweeps the current instead. The marked point tracks where the coil's own current sits, and dragging $n$ — how tightly it's wound — visibly steepens the line, since more turns per metre means more current threading through each loop of the same imaginary Amperian path.

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
