---
title: How big is the Earth?
summary: >-
  Two sticks, one shadow and one angle were enough to measure the whole Earth more than 2,000 years ago. Do the same
  and see how close you get.
parameters:
  theta: theta — how far the Sun is from straight overhead in Alexandria (the angle of the stick's shadow)
  d: d — the distance between Alexandria and Syene
variables:
  - the distance all the way round the Earth
  - the shadow angle at the stick in Alexandria
  - the distance between the two towns, measured along the ground
  - the Earth's radius, the distance from its centre to the ground
---

## Try it

1. Drag the top of the right-hand stick along the Earth. The blue angle at the top of the stick and the blue angle at the Earth's centre change together. They are always the same size.
2. Set theta to 7.2 and d to 800, as Eratosthenes did. Read "your Earth, all the way round" below the picture and compare it with the real one.
3. Keep d at 800 and raise theta to 14.4. Your Earth shrinks to 20,000 km, half the size. A bigger shadow angle means you only had to walk a short way round the Earth, so the whole circle is smaller.

## Real-life examples

- **Eratosthenes, about 240 BC.** He measured 7.2° in Alexandria and took 800 km to Syene. A full circle holds 50 of those angles, so 50 × 800 km = 40,000 km, almost exactly the real 40,008 km.
- **The same measurement with today's distance.** Using 843 km between Aswan and Alexandria with the same 7.2° gives 42,150 km, about 5 % too big. The idea is not wrong. The two towns are not exactly north and south of each other, and 7.2° was a rounded number.
- **Try it with a friend 1,000 km north.** If your friend stands 1,000 km north of you, their Sun is 9° from overhead when yours is straight above. 9° is a fortieth of a circle, so 40 × 1,000 km = 40,000 km.

## Test yourself

1. Find a shadow angle and a distance that give the real Earth, 40,008 km round, to within 2 %.
2. Make the Earth's radius come out as 6,371 km.
3. Get about 40,000 km with a shadow angle bigger than 20°. How far apart must the two towns be?

## Intuition

About 240 BC, Eratosthenes ran the great library in Alexandria, in Egypt. He heard about a deep well in the town of Syene (today called Aswan), far to the south. Once a year, at noon on midsummer day, the Sun shone straight down that well and lit the water at the bottom. A stick standing in Syene at that moment would have no shadow at all.

On the same day, at the same hour, Eratosthenes put up a stick in Alexandria, and it did cast a shadow. He measured how far the Sun was from straight overhead: 7.2°. In the picture, the left stick is the one at Syene, with no shadow. The right stick is the one at Alexandria, and the blue angle at its top is the 7.2°. You can drag its top to change the angle.

Why would two sticks in the same sunshine make different shadows? Because the ground between the towns is curved. The Sun is so far away that its rays arrive side by side, all in the same direction. Each stick stands straight up from the ground, so the farther round the Earth you walk, the more the stick leans away from the rays. The lean is exactly the angle between the two towns as seen from the Earth's centre. That is why the two blue angles in the picture are equal.

Now the counting. 7.2° is one fiftieth of a full circle of 360°. The towns are about 5,000 stadia apart (a stadion was an old length; this is about 800 km, though nobody knows exactly how long his stadion was). If 800 km is one fiftieth of the way round, the whole way round is 50 × 800 = 40,000 km. The real distance round the Earth through the poles is 40,008 km, so he came within a tiny fraction of it. Part of that may be lucky, but the method is sound.

You can do the same. Drag the stick, or use the sliders. Read the blue numbers below the picture: "your Earth, all the way round" is your answer, and "you are off by" tells you how close you got. A shadow of 7.2° and 800 km is the real thing. Try 9° and 1,000 km too, for a friend who lives farther north.

## Formal

A full circle is 360°, and the length of an arc is in proportion to its angle. The arc between the two towns has length $d$ and angle $\theta$ at the Earth's centre, so $\frac{\theta}{360^\circ} = \frac{d}{C}$, where $C$ is the whole circumference. Solving for $C$ gives $C = \frac{360^\circ}{\theta}\,d$.

The angle at the Earth's centre equals the shadow angle $\theta$ at the stick because the Sun's rays are parallel: the vertical stick and the radius that points to it are the same line, and a line crossing two parallel lines makes equal angles. Once you have $C$, the radius is $R = \frac{C}{2\pi}$.

## Advanced

The answer depends on three things being right: the angle, the distance and the assumption that both towns lie on one north-south line. In fact Syene lies about 3° of longitude east of Alexandria, and the Sun was not exactly overhead there either. The errors partly cancelled. Since $C$ is proportional to $d$ and inversely proportional to $\theta$, a 5 % error in either gives a 5 % error in $C$.

The angle is the hard part. With a 1 m stick, a 7.2° shadow is only about 12.6 cm long, so a slip of 1 cm in measuring it is an error of about 8 %. This is why the experiment works better with a taller pole, or with two schools far apart that measure at the same moment. The Earth is also not a perfect sphere: it is slightly squashed, and measured round the equator it is 40,075 km, not 40,008 km.

## Derivation

1. The arc between the two towns is the same share of the whole circle as its angle is of 360°: $\frac{\theta}{360^\circ} = \frac{d}{C}$.
2. Multiply both sides by $C$ and divide by $\theta$ to get the whole circle: $C = \frac{360^\circ}{\theta}\,d$.
3. A circle's length is $2\pi$ times its radius, so the radius of the Earth is $R = \frac{C}{2\pi}$.

## Real world

### Schools measure the Earth

Every year, classes around the world do the Eratosthenes experiment. Two schools far apart, on the same north-south line, measure the shadow of a stick at the same moment and share the numbers.

### The first rung of a ladder

Everything we know about distances to the Moon, the Sun and the planets starts with the size of the Earth. It becomes the ruler for the next measurement, how far away the Moon is.

### Mapmakers still use angles

Surveyors measure long distances by measuring angles and one known distance, which is the same trick as here. Satellites now find the Earth's size to a few metres.

### Round, but not perfectly

The Earth is 40,008 km round through the poles and 40,075 km round the equator. It bulges a little at the middle because it spins.
