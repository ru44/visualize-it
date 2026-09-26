---
title: Electric motors
summary: >-
  A current-carrying loop between two magnets feels a twist, not a push —
  and a simple splitring switch called a commutator turns that twist into
  the steady spin of every small DC motor.
parameters:
  N: number of turns in the coil N
  I: current through the coil I
  A: area of the coil A
  B: magnet field strength B
  theta: the coil's angle from the field θ
variables:
  - torque — the twisting force on the coil, about its spin axis
  - the force on each of the coil's two long straight wires
  - the length of those two straight wires
  - the width of the coil (the lever arm the force acts on)
---

## Try it

1. The picture shows a rectangular coil sitting between two fixed magnet poles, with a split-ring commutator and brushes feeding it current. Drag «coil's angle θ» around a full turn and watch the torque arrow grow and shrink.
2. Torque peaks at θ = 90° (a quarter turn), where the coil's face is edge-on to the field, and drops to zero at θ = 0° and θ = 180°, where the coil's face points straight along the field.
3. Watch the commutator: every time the coil crosses θ = 0° or θ = 180°, its two contacts swap which brush they touch, flipping the current direction so the torque never reverses — that's what keeps the coil spinning the same way, all the way round.

## Real-life examples

1. **A small hobby motor.** 100 turns, 0.5 A, a 10 cm² loop, in a 0.4 T field, at peak angle: about 0.02 N·m of torque — roughly what it takes to slowly lift a small toy car's wheel.
2. **A robotics gearmotor.** 300 turns, 1.5 A, a 20 cm² loop, in a 0.6 T field: about 0.54 N·m — enough stall torque to drive a small robot before any gearbox multiplies it further.
3. **A phone's tiny vibration motor.** Just 20 turns, 0.1 A, a 5 mm² loop, in a weak 0.2 T field: about 0.0002 N·m (0.2 mN·m) — tiny, but enough to spin an off-centre weight and buzz the phone.

## Test yourself

1. Build a small hobby motor that produces about 0.02 N·m of torque at its peak angle.
2. Without changing the angle much, push the torque above 0.5 N·m using turns, current, and field strength alone.
3. Find the commutator's "dead spot" — an angle where the torque drops to (almost) zero.

## Intuition

Picture the coil as two long straight wires, one along the top of the loop and one along the bottom, both carrying the same current but in opposite directions because the current runs around the loop. Sitting in a magnetic field, each wire feels a sideways push (the same push you saw in the Lorentz force lesson) — and because the two wires are on opposite sides of the loop, their pushes point opposite ways too. One side gets shoved up, the other down: instead of moving the loop, that shove twists it.

That twist is strongest when the coil's flat face is edge-on to the field (θ = 90°) and it vanishes when the face points straight along the field (θ = 0° or 180°) — right where the wires' sideways pushes point straight through the axle instead of around it. Left alone, a simple loop would just rock back and forth and stop there. The commutator is the trick that keeps it spinning: a split ring that swaps the coil's electrical connections every half-turn, so just as the torque would flip sign and start pulling the coil back, the current direction flips too, and the twist keeps pushing the same way round.

## Formal

For a coil of $N$ turns, each carrying current $I$, with area $A$, in a uniform field $B$, the torque about the coil's spin axis is $\tau = NIAB\sin\theta$, where $\theta$ is the angle between the coil's face and the field. This is maximised at $\theta = 90°$ and zero at $\theta = 0°$ and $180°$.

A DC motor's commutator is built to reverse the current exactly at those zero-torque angles, so that in the coil's own rotating frame the torque always has the same sign — the coil never "sees" the dead spot long enough to stop turning, and the average torque over a full turn stays positive.

## Advanced

Real motors use several coils at different angles around the same axle (not just one), precisely so that whichever coil happens to be near its own dead spot, another coil is near its peak — this smooths out the pulsing torque of a single loop into something closer to constant, and is why most real motors are drawn with three or more coil segments rather than one.

## Derivation

1. Each of the coil's two long straight sides, length $\ell$, carries current $I$ through $N$ turns in field $B$, feeling a force $F = NIB\ell$.
2. Both forces act at a perpendicular distance of half the coil's width from the spin axis, and only their component perpendicular to the coil's face contributes torque, giving $\tau = NIB\ell w \sin\theta$.
3. Since the coil's area is $A = \ell w$, this is exactly $\tau = NIAB\sin\theta$.

## Real world

### Toy and hobby motors
Small DC motors in toy cars, fans, and robotics kits are almost exactly this: one or a few coils, a permanent-magnet field, and a commutator.

### Car starter motors
A car's starter motor is a much larger version of the same idea, built to deliver a huge, brief torque to turn over a cold engine.

### Electric vehicle motors
Modern EVs mostly use brushless motors, which replace the mechanical commutator with electronics that switch the current — same torque formula, no sliding contacts to wear out.

### Loudspeakers
A speaker's voice coil sits in a fixed magnet's field exactly like a motor's coil, except it moves back and forth along a straight track instead of spinning, pushed by the same $F$ that turns a motor's coil.
