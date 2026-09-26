---
title: Magnets and field lines
summary: >-
  Why a fridge magnet grips steel but two bar magnets can shove each other
  away: the same two-pole picture explains attraction, repulsion, and the
  loops you'd see if you sprinkled iron filings around a magnet.
parameters:
  m1: magnet 1's strength m₁
  m2: magnet 2's strength m₂
  r: distance between the magnets r
variables:
  - the permeability of free space, a fixed constant of nature
  - the magnetic field strength at distance r from magnet 1, in tesla
  - the force between the two magnets — positive pushes them apart
---

## Try it

1. The picture shows two bar magnets facing each other with their N poles (red) pointed inward. Watch how the field lines bow outward, squeezed away from the narrow gap between the two N poles.
2. Drag «distance r» smaller. The push between the magnets grows fast — shrink the gap to a third of its size and the force jumps to 81 times as strong, because it depends on 1/r⁴.
3. Raise «magnet 2's strength m₂». The force grows too, but only in step with it: double m₂ and the force merely doubles.

## Real-life examples

1. **Two classroom bar magnets, held apart.** m₁ = m₂ = 0.3 A·m², 15 cm apart: the push is only about 0.1 millinewton — you can barely feel it through your fingers.
2. **Two small neodymium disc magnets, almost touching.** m₁ = m₂ = 2 A·m², 1.5 cm apart: the push jumps to about 47 N, roughly the weight of a 5 kg bag — hard to pull apart by hand.
3. **Two magnetic toy blocks, a few centimetres apart.** m₁ = m₂ = 0.5 A·m², 4 cm apart: about 0.06 N, a gentle but clear shove, like flicking a coin.

## Test yourself

1. Push the two magnets apart with a force of about 1 N — roughly the weight of an apple.
2. Reach a magnetic field of about 0.01 T (10 millitesla) at distance r from magnet 1 alone.
3. Keep both magnets weak (m₁ and m₂ at most 0.1 A·m²), but still push them apart with more than 0.2 N.

## Intuition

Every magnet has two ends, a north pole and a south pole, and they never come apart: cut a bar magnet in half and you get two smaller magnets, each with its own N and S. Field lines are just a way of drawing the space around a magnet: they leave the N pole, loop around through the air, and dive into the S pole — denser lines mean a stronger field. That's exactly the shape you get if you scatter iron filings on paper over a magnet: they line up along those loops.

When two magnets meet N-to-N, as in the picture, their field lines fight for the same space in the gap between them and get pushed outward and away — that outward push is the repulsion you feel. Turn one magnet around so an N faces an S instead, and the lines link up smoothly from one magnet straight into the other: that smooth connection is what attraction feels like. Same two poles, same field-line picture, opposite result, just depending on which ends face each other.

## Formal

A small magnet behaves like a magnetic dipole of moment $m$ (in A·m²): on its own axis, at distance $r$, it makes a field $B(r) = \frac{\mu_0}{2\pi}\frac{m}{r^3}$, where $\mu_0$ is the permeability of free space, a fixed constant. The field falls off fast — as the cube of the distance — so a magnet that feels strong right against your skin is almost undetectable a few centimetres away.

Two such dipoles, lined up along the same axis with like poles facing, push on each other with $F = \frac{3\mu_0}{2\pi}\frac{m_1 m_2}{r^4}$. Turning one magnet around flips the sign: the same-size force now pulls them together instead. Either way, the force falls off even faster than the field — as $1/r^4$ — which is why you have to get magnets quite close before you feel much of anything.

## Advanced

Real bar magnets aren't perfect point dipoles — a long thin magnet's field close to its ends looks like this dipole formula, but near its flat sides it looks more like two separate monopole-like ends, and the field lines depend on the magnet's exact shape and how it was magnetised. The dipole formula used here is the standard first approximation, good once you're a few magnet-lengths away, and it's exactly how a magnetic compass needle also behaves at a distance from Earth's own (very much larger) dipole field.

## Derivation

1. A magnetic dipole of moment $m$ produces a field along its own axis that falls off as the cube of the distance.
2. Two such dipoles, facing with like poles, repel with a force from a similar formula — the same constants, one more power of $r$ in the denominator.
3. Substituting the known value of $\mu_0$ turns the formula into plain numbers: about $6\times10^{-7}$ newtons for every A²·m⁴ of $m_1 m_2 / r^4$.

## Real world

### Compasses
A compass needle is a tiny bar magnet that swings to line up with Earth's own huge, weak dipole field, pointing roughly toward magnetic north.

### Motors and loudspeakers
Fixed magnets, arranged with their poles facing a coil, push and pull on that coil's own field to spin an electric motor or move a speaker cone (see the next lesson).

### MRI scanners
Hospital MRI machines use enormous superconducting magnets — millions of times stronger than a fridge magnet — to align hydrogen atoms in your body so radio waves can image them.

### Fridge magnets and toy blocks
The everyday tug of a fridge magnet, or the snap of magnetic building blocks, is this same pole-to-pole attraction and repulsion, just at a scale you can feel with your hands.
