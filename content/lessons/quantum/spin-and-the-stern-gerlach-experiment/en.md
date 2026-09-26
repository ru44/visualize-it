---
title: Spin and the Stern–Gerlach experiment
summary: >-
  Silver atoms fired through a magnet do not smear into a spread of
  landing spots — they land in exactly two, because a property called
  spin only ever points one of two ways along any axis you check.
parameters:
  G: magnet field gradient G
  v: atom speed leaving the oven v
variables:
  - the separation between the two spots on the screen, in millimetres
  - the magnet's field gradient, in tesla per centimetre
  - the speed of the silver atoms leaving the oven, in metres per second
charts: []
---

## Try it

1. Set «magnet field gradient G» low and «atom speed v» high. The two spots on the screen sit close together.
2. Raise «magnet field gradient G» toward its maximum. The two spots pull further apart — but there are still only two of them, never a smear in between.
3. Lower «atom speed v» toward 400 m/s. Slower atoms spend longer crossing the magnet, so the split grows even wider.

## Real-life examples

1. **A weak magnet, a fast beam.** At G = 4 T/cm and v = 800 m/s the two spots sit only a fraction of a millimetre apart.
2. **A strong magnet, a slow beam — close to the original 1922 apparatus.** At G = 10 T/cm and v = 500 m/s the split widens to close to a millimetre, near what Stern and Gerlach actually measured.
3. **A very weak magnet.** At G = 2 T/cm and v = 900 m/s the two spots nearly touch, yet a careful look still shows two, never a single smudge.

## Test yourself

1. Make the two spots about half a millimetre apart.
2. Use a strong magnet (at least 10 T/cm) with slow atoms (at most 500 m/s) to get the widest split.
3. Bring the two spots as close together as this apparatus allows, to about 0.05 mm apart.

## Intuition

In 1922, Otto Stern and Walther Gerlach heated silver metal in an oven until atoms boiled off, sent them down a vacuum tube, and pushed the thin beam between the pointed and grooved poles of a magnet before it hit a glass screen. Classical physics expected the outer electron of each atom to act like a tiny bar magnet pointing in some random direction, so a magnet with a stronger field on one side should push different atoms up or down by different amounts and paint one smeared blob on the screen, wide where the field is weak and wider still where you raise «magnet field gradient G».

That is not what showed up. The screen always shows exactly two sharp spots, one above the centre line and one below, never a single blob and never a third spot in between. Every silver atom's spin, the tiny built-in magnet every electron carries, turns out to point either fully toward the strong side of the field or fully away from it along whatever direction the magnet checks — nothing in between. Dragging «magnet field gradient G» and «atom speed v» moves the two spots apart or together, but it never turns them into a spread.

## Formal

A silver atom's outer electron carries spin angular momentum $\hbar/2$, so a measurement along the magnet's axis returns only $+\hbar/2$ or $-\hbar/2$, pushing the atom up or down by the same fixed amount each time rather than by a range of amounts. That fixed push, combined with how long each atom spends inside the field, gives a spot separation $s = \dfrac{21300\,G}{v^2}$ on the screen, in millimetres, once the magnet's length and the atom's mass are folded into that one constant.

Since $s$ only depends on $G$ and $v$ this way, the separation $s \propto G$ grows with a stronger magnet, and $s \propto 1/v^2$ shrinks fast for faster atoms, but the number of spots stays fixed at two for any setting of either slider.

## Advanced

Send the "up" beam alone through a second Stern-Gerlach magnet tilted at an angle $\theta$ to the first, and it splits again, into a beam along the new "up" direction with probability $\cos^2(\theta/2)$ and the new "down" direction with the rest — the very same law that describes a qubit's measurement, because a spin-1/2 atom and a qubit are, mathematically, the same two-outcome system.

## Derivation

1. Everything else fixed, a stronger field gradient pushes the atoms apart in direct proportion.
2. Everything else fixed, faster atoms spend less time being pushed, so the separation shrinks with the square of their speed.
3. Combining both, and folding the magnet's length and the silver atom's mass into one constant, gives the working formula for the separation on the screen.

## Real world

### Medical scanners
MRI machines detect the tiny magnetic signal of hydrogen nuclei spinning in the body, a direct descendant of the spin Stern and Gerlach first isolated in 1922.

### Spintronics and hard drives
Modern hard drives read data by sensing the spin direction of electrons in a magnetic film, packing more storage into the same space than a purely electronic memory could.

### Quantum computers
Many quantum computers store a qubit in the spin of a single trapped ion or electron, using exactly the two-outcome property this experiment first revealed.

### A founding measurement
Before 1922, physicists assumed atomic magnets could point any way at all; this one experiment showed that nature only allows a handful of fixed directions, a discovery that shaped the rest of quantum mechanics.
