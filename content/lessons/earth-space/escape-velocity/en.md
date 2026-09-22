---
title: Escape velocity
summary: >-
  Throw something fast enough and gravity never quite wins. Escape velocity
  is that speed — the point where kinetic energy matches the pull that
  would otherwise drag you back.
parameters:
  x: distance from Earth's centre
variables:
  - the gravitational constant
  - the mass of the planet or body
  - the mass of the escaping object
  - the distance from the centre of the body
  - the escape velocity — the minimum launch speed to reach infinity
  - the circular orbital speed at the same radius, for comparison
charts:
  - title: Escape vs. orbital speed
    xLabel: radius (thousand km)
    yLabel: speed (km/s)
    series:
      - orbital speed
---

## Intuition

Drag the radius slider to Earth's surface, about 6,400 km, and read off the escape curve: about 11.2 km/s, the speed a rocket needs (ignoring air drag) to leave Earth forever rather than fall back. The second curve, orbital speed at that same radius, sits lower — escape speed is always $\sqrt{2}$ times the circular orbital speed, since it takes more energy to leave entirely than to just keep circling.

Drag the radius outward and both curves fall together: farther from the planet's centre, gravity's pull is weaker, so less speed is needed to finish escaping it. This is also why a rocket burns most of its fuel in the first few hundred kilometres, where the pull is strongest.

## Formal

Escaping means having exactly enough kinetic energy to cancel the gravitational potential energy well, ending at infinity with zero speed left over: $\frac{1}{2}mv_{esc}^2 = \frac{GMm}{r}$. The escaping object's own mass $m$ cancels, leaving $v_{esc} = \sqrt{\frac{2GM}{r}}$ — independent of what is being launched, a bullet or a rocket need the same escape speed from the same point.

Because orbital speed is $v = \sqrt{GM/r}$, the ratio $v_{esc}/v = \sqrt{2}$ always holds at any given radius, a clean, radius-independent factor.

## Advanced

Escape velocity is really a statement about the sign of total mechanical energy: negative total energy (kinetic plus gravitational potential, with potential taken as zero at infinity) means a bound orbit, zero means a parabolic escape trajectory, and positive means a hyperbolic escape with speed to spare. A planet retains an atmosphere over geological time only if the escape velocity is well above the thermal speed of its gas molecules — roughly a factor of six or more — which is why the Moon, with an escape velocity of just 2.4 km/s, cannot hold onto light gases even though its formula gives a well-defined number.

## Derivation

1. Reaching infinity with exactly zero speed left means the launch kinetic energy must exactly cancel the gravitational potential energy at the starting radius.
2. The launched object's own mass cancels from both sides of that energy balance.
3. Solving for the launch speed gives escape velocity, and comparing it to the circular orbital speed shows it is always $\sqrt{2}$ times larger.

## Real world

### Rocket launches
Rockets do not aim for escape velocity when reaching low Earth orbit — that only takes orbital speed — but interplanetary probes need it to leave Earth's pull behind entirely.

### Why the Moon has no air
The Moon's escape velocity, 2.4 km/s, is too low to retain an atmosphere against the thermal speed of light gas molecules over billions of years.

### Black holes
A black hole is, loosely, a region where the escape velocity from within its event horizon would exceed the speed of light.

### Terraforming discussions
Mars, with an escape velocity of 5.0 km/s, is a serious candidate for atmosphere retention arguments precisely because that number sits closer to Earth's than the Moon's does.
