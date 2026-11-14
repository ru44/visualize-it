---
title: How big is the Moon?
summary: >-
  During a lunar eclipse the Moon crosses the Earth's shadow. Compare the shadow with the Moon, and you can measure the
  Moon without leaving Earth.
parameters:
  k: k — how many Moons wide the Earth's shadow is
  pos: pos — how far the Moon has moved through the shadow
variables:
  - the Moon's width
  - the Earth's width, 12,742 km
  - how many Moons wide the shadow is
---

## Try it

1. Leave k at 2 and drag the Moon through the dark shadow. The row of ghost Moons below shows what k means: that many Moons fit across the shadow.
2. Raise k to 2.67. Watch the solid orange Moon at the bottom shrink until it matches the dashed outline of the real Moon.
3. Now set k to 1. The Earth is only two Moons wide, so the Moon you compute is half as wide as the Earth. Compare the solid Moon with the dashed one.

## Real-life examples

- **Aristarchus, about 270 BC.** He found the shadow about 2 Moons wide. The Earth is then 3 Moons wide, so the Moon is 12,742 ÷ 3 = 4,247 km, about 22 % too big.
- **Hipparchus, later.** With better timing he found about 2.5 Moons. The Earth is then 3.5 Moons wide, so the Moon is 3,641 km, about 5 % too big.
- **Today.** Measure the shadow on a photo of a lunar eclipse and you find about 2.67 Moons. The Moon is then 3,472 km, within 0.1 % of the real 3,474 km.

## Test yourself

1. Find the k that gives the real Moon, 3,474 km, to within 2 %.
2. Make the Moon exactly one quarter as wide as the Earth.
3. Find a k that makes the Moon wider than 5,000 km. How wide must the shadow be, in Moons, for that to happen?

## Intuition

During a lunar eclipse, the full Moon slowly darkens as a round, dark patch creeps across it. That patch is the Earth's shadow. About 270 BC, Aristarchus of Samos watched this and saw that the edge of the shadow on the Moon is curved, a piece of a round shadow. He timed how long the Moon takes to slide into the shadow, and how long it then stays inside. Comparing the two times, he found that the shadow was about 2 Moons wide. In the picture the dark disc is the shadow, and the ghost Moons below it count how many Moons fit across.

But the shadow is not as wide as the Earth. The Sun is much bigger than the Earth, so the Earth's shadow is a cone that gets thinner the farther it goes, like a carrot. By the time the shadow reaches the Moon, it has become narrower than the Earth. How much narrower?

Here is the key. In a total solar eclipse, the Moon just covers the Sun, so the Sun and the Moon look the same size in the sky. That means that, at the Moon's distance, the shadow has narrowed by exactly one Moon's width. So the Earth is as wide as the shadow plus one more Moon: the Earth is k + 1 Moons wide.

Now the counting. The Earth is 12,742 km wide (you found its radius in the last lesson). If it is 3 Moons wide, one Moon is 12,742 ÷ 3 = 4,247 km. Aristarchus got this with k = 2. Hipparchus timed the eclipse better and found k = 2.5, so 3,641 km. Today we find k = 2.67, so 3,472 km, and the real Moon is 3,474 km wide.

At the bottom of the picture, the Earth and the Moon are drawn side by side in the sizes your k gives, and the dashed circle is the real Moon. Move k until the two circles match. The Moon is a bit more than a quarter of the Earth's width.

## Formal

Let $d_M$ be the Moon's diameter and $d_E$ the Earth's. If the Earth's shadow, where the Moon crosses it, is $k$ Moons wide, its width is $k\,d_M$. The Sun and the Moon have the same apparent size, about half a degree, so at the Moon's distance the shadow is narrower than the Earth by exactly one Moon width: $d_E = k\,d_M + d_M$. Solving for the Moon gives $d_M = \frac{d_E}{k + 1}$.

## Advanced

The method needs only timing and one known size, but it is sensitive. The answer depends on $k + 1$, so a small error in $k$ matters: going from $k = 2$ to $k = 2.67$ changes the Moon's size by more than 20 %. The edge of the shadow is also fuzzy, because the Sun is not a point, and the Moon does not cross the shadow through its middle, so timing it is hard. Aristarchus used the simplest version of the geometry, and the next generations improved the numbers.

The result does not need the distance to the Moon. Because it only compares sizes, it gives the Moon's width in kilometres once the Earth's width is known. The distance to the Moon is the next step in the ladder.

## Derivation

1. At the Moon's distance, the shadow is $k$ Moons wide: $\text{shadow width} = k\,d_M$.
2. The shadow has narrowed by one Moon width since the Earth, so the Earth is that wide plus one Moon: $d_E = k\,d_M + d_M$.
3. Collect the Moons and divide: $d_M = \frac{d_E}{k+1}$.

## Real world

### Blood moons
In a total lunar eclipse the Moon does not go black but dull red. Sunlight bends through the Earth's air at the edge of the planet, and the red part of it reaches the Moon.

### A happy coincidence
The Sun is about 400 times wider than the Moon and about 400 times farther away, so they look the same size. This is why the shadow narrows by exactly one Moon width, and why total solar eclipses look the way they do.

### The next rung
Once you know the Moon is 3,474 km wide, you can find how far away it is from how big it looks. That is the next lesson.
