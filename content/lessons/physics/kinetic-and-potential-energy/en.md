---
title: Kinetic energy and why speed matters so much
summary: 'Calculate kinetic energy and the height an ideal vertical launch reaches when that energy becomes gravitational potential energy.'
parameters:
  m: 'm — mass'
  x: 'v — vertical launch speed'
variables:
  - 'constant mass of the object'
  - 'initial speed of a vertical launch'
  - 'translational kinetic energy at launch'
charts:
  - title: Gravitational potential energy vs height
    xLabel: height h (m)
    yLabel: PE (J)
    series:
      - PE = m·g·h
---

## Try it

1. Set m = 1 kg and v = 6 m/s. The initial kinetic energy is 18 J, and the ideal vertical rise is about 1.83 m.
2. Keep mass fixed and double speed to 12 m/s. Energy rises to 72 J and height to about 7.34 m: both quadruple.
3. Keep speed fixed and double the mass to 2 kg. Both energy bars double, but the height stays the same. The two bars compare energy at launch and at the top; they are not two energies to add at one instant.

## Real-life examples

1. **A light object.** A 0.6 kg object launched vertically at 8 m/s has 19.2 J of kinetic energy and rises about 3.26 m if air resistance is neglected.
2. **A heavier, slower object.** A 5 kg object at 3 m/s has 22.5 J and an ideal rise of about 0.46 m. More energy does not imply more height when the mass also changes.
3. **An intermediate launch.** A 2 kg object at 6 m/s has 36 J and rises about 1.83 m. Mass doubles the energy relative to the first Try it setting, but not the height at that speed.

## Test yourself

1. Make the kinetic energy approximately 20 J.
2. Keep mass at 1 kg and find a speed giving about 50 J.
3. Keep speed below 8 m/s and make kinetic energy greater than 100 J.

## Intuition

Kinetic energy is energy associated with motion. In a vertical launch with no air resistance, gravity slows the object as it rises. At the highest point its speed is zero, and the initial kinetic energy has become an increase in gravitational potential energy. The diagram places the starting and highest positions side by side for comparison; the curved connector is not a literal sideways flight path.

Doubling speed multiplies kinetic energy by four because speed is squared. At a fixed mass this also quadruples the ideal height. Doubling mass at a fixed speed doubles the kinetic energy, but raising that mass through any given height also needs twice the potential-energy increase. Those factors cancel, so the height is independent of mass in this model.

## Formal

For a constant-mass object in classical mechanics, translational kinetic energy is $K=\tfrac12mv^2$, where v is speed and m is mass. Near Earth's surface with approximately constant g, the increase in gravitational potential energy for a rise h is $\Delta U=mgh$.

For a vertical launch with no air resistance or other energy transfers, $\tfrac12mv^2=mgh$, giving $h=v^2/(2g)$ for positive mass. Here $g=9.81\ \mathrm{m/s^2}$ and height is measured above the starting point. At an intermediate height, kinetic plus gravitational potential energy remains constant; neither alone need be constant.

## Advanced

The work-energy theorem relates net work to the change in kinetic energy: Wnet = ΔK. The displayed formula counts translational motion; a rolling or spinning object can also have rotational kinetic energy. The lower chart varies height independently and plots mgh. Its horizontal axis is height, whereas the main control selects launch speed; the two inputs share a numerical range but represent different quantities.

## Derivation

1. Apply F = m dv/dt to a constant-mass object moving along a line.
2. In the work integral, use dx = v dt to obtain the integral of mv with respect to velocity.
3. Integrate from rest to speed v. The resulting net work is the kinetic energy ½mv².

## Real world

### Comparing moving loads

At the same speed, twice the mass has twice the translational kinetic energy. At the same mass, twice the speed has four times the energy.

### Raising an object

An ideal mechanism can convert motion into height. Real mechanisms may transfer some energy to heating, sound or rotation, so the model's rise is not automatically achieved.
