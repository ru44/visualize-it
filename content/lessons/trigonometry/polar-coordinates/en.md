---
title: Polar coordinates
summary: >-
  Instead of saying how far right and how far up, polar coordinates say how
  far from the centre and in which direction — the way a radar screen or a
  compass bearing already describes a point.
parameters:
  a: a — sideways position
  b: b — upward position
  n: n — spiral turns
variables:
  - the point's sideways position from the centre
  - the point's upward position from the centre
  - the point's straight-line distance from the centre
  - the point's bearing, measured from the horizontal axis
---

## Try it

1. Drag the blue point. The readout "|z|, arg z" is exactly your point's distance and bearing from the centre — its polar coordinates.
2. Slide the point straight outward without turning it. The distance grows while the bearing stays put: the two numbers really are independent.
3. Raise «n — spiral turns» from 1 to 5. A trail of dots appears, each one further round and further out — a spiral.

## Real-life examples

1. **A radar blip.** A plane shows up 1.7 units out at a bearing of about 28° from the reference line — distance and bearing, read straight off the screen.
2. **A lighthouse behind and to the left.** A ship logs it at a bearing of about 130° and a distance of 1.56 units, using the same two numbers a sailor calls range and bearing.
3. **A nautilus shell or a spiral galaxy arm.** Setting «n» to 5 draws five loops that each turn about 20° further and stretch about 1.17× further out — the same steady turn-and-grow rule these natural spirals follow.

## Test yourself

1. Place the point exactly 1.5 units from the centre.
2. Point the vector almost straight up, past 80° from the horizontal, while keeping it more than 1 unit out.
3. With «n» at 5 or more, make the outermost spiral point land more than 5 units from the centre.

## Intuition

You normally locate a point by two rulers laid out at right angles: how far right, how far up. Polar coordinates ask two different questions about the very same point: how far away is it, and in what direction? On screen these are not two separate pictures — the single arrow from the centre to your point already answers both at once. Its length is the distance, and the angle it leans at is the direction.

Polar coordinates earn their keep whenever direction matters as much as distance: a radar operator does not care that a plane is "3 km east and 4 km north," only that it is "5 km out, bearing 37°." Raising «n» shows the other reason polar coordinates matter — spirals. Each extra turn multiplies the distance by the same factor and adds the same angle, which is precisely how a nautilus shell or a spiral galaxy grows, turn after turn, from the centre outward.

## Formal

A point with sideways position a and upward position b has polar distance $r = \sqrt{a^2+b^2}$ and bearing $\theta = \arctan(b/a)$, adjusted by 180° when a is negative so the angle lands in the correct half of the plane.

Going the other way, the same point is recovered from its polar coordinates by $a = r\cos\theta$ and $b = r\sin\theta$ — the two descriptions are exact inverses of each other.

## Advanced

Writing the point as $a+bi$ makes this the polar form of a complex number, $r(\cos\theta+i\sin\theta)$; raising it to the power n multiplies the angle by n and raises the distance to the power n, which is exactly the spiral of dots «n» draws on screen.

## Derivation

1. By definition, $a = r\cos\theta$ and $b = r\sin\theta$ — the point's position from its distance and bearing.
2. Squaring and adding uses the Pythagorean identity to cancel the angle: $a^2+b^2 = r^2\cos^2\theta + r^2\sin^2\theta = r^2$, so $r=\sqrt{a^2+b^2}$.
3. Dividing instead cancels r: $b/a = \tan\theta$, so $\theta = \arctan(b/a)$.

## Real world

### Radar and air traffic control
Every blip on a radar screen is stored and displayed as a distance and a bearing from the radar station, not as an east-west and north-south offset.

### Navigation at sea and in the air
Sailors and pilots give and receive positions as "range and bearing" from a landmark or beacon, the same two numbers as r and θ here.

### Spiral growth in nature
Nautilus shells, pinecones and spiral galaxies all grow by a near-constant turn-and-scale rule each step, which is naturally described in polar form and awkward to describe with sideways-and-up coordinates alone.

### Turntables and radar sweeps
A rotating radar dish or a lathe's turntable naturally reports what it senses in terms of the angle it is currently facing and the distance it currently measures.
