---
title: How far is the Sun?
summary: When the Moon looks exactly half lit, one angle in the sky tells you how much farther the Sun is than the Moon. Aristarchus tried it around 270 BC.
parameters:
  phi: φ — the angle between the Moon and the Sun, seen from Earth
  err: error — how far off your measurement of φ might be
variables:
  - the distance from Earth to the Sun
  - the distance from Earth to the Moon, 384,400 km, from the previous lesson
  - the angle at Earth between the Moon and the Sun, measured when the Moon is exactly half lit
---

## Try it

1. Set φ to 87° and error to 0. Read the box "times farther than the Moon": about 19. This is what Aristarchus found.
2. Move φ slowly up to 89.85°. The answer jumps from 19 to about 380. A change of 3° in the angle changed the answer twenty times over.
3. Set φ to 70° and error to 1°. The shaded range in the plot is narrow, so the answer hardly changes. Now set φ to 89.85° and error to 0.1°: the answer could be anything from about 230 to more than 1,000.

## Real-life examples

- **Aristarchus, about 270 BC.** He measured 87° between the Moon and the Sun and worked out that the Sun is 19 times farther than the Moon, about 7.3 million km. His method was right, but 87° was too small.
- **A modern measurement.** The true angle is 89.853°, and with 89.85° you get about 382 times farther. That is 147 million km, within 2 percent of the real distance, 149.6 million km.
- **What a 3° error does.** Aim at 87° but be 3° out, which is easy by eye. The Sun could be anywhere from 9.6 to 5,700 times farther than the Moon, so the measurement tells you almost nothing.

## Test yourself

1. Reproduce Aristarchus's answer: the Sun is 19 times farther than the Moon.
2. With no error, find an angle that says the Sun is more than 350 times farther than the Moon.
3. Find the angle that gives the real distance to the Sun, 149.6 million km.

## Intuition

Around 270 BC, in the Greek world, Aristarchus of Samos had a clever idea. Wait for the evening when the Moon is exactly half lit. The lit half faces the Sun. That means the line from the Moon to the Sun and the line from the Moon to the Earth make a right angle, 90°, at the Moon. In the picture, the little square at the Moon marks it.

Now measure one angle. When the half Moon is in the sky, find the angle between the Moon and the Sun. That angle is φ, marked at the Earth. Aristarchus measured 87°. With a right angle at the Moon and 87° at the Earth, the triangle has a fixed shape. From it, the Sun is 1 ÷ cos 87° times farther than the Moon. That is about 19 times. If the Moon is 384,400 km away, then 19 × 384,400 km is about 7.3 million km.

He was far off. The true angle is 89.853°, and 1 ÷ cos 89.853° is about 389, so the Sun is about 389 times farther than the Moon, 149.6 million km. Aristarchus got 20 times too small an answer, and the reason is in the plot on the right. When φ is near 90°, the curve goes straight up. A tiny change in the angle makes a huge change in the answer. And nobody can tell by eye the exact moment when the Moon is exactly half lit.

Drag the orange dot to change φ. Then set error: the red band in the plot, and the thick red bar on the Moon's line, show all the answers you could get if your measurement could be wrong by that much. At 70° the band is narrow, and near 89.85° it is gigantic. So the method was right and the protractor was not good enough. Even so, Aristarchus learned something big: the Sun is much farther away than the Moon, and so it must be much bigger, since both look the same size in the sky.

## Formal

At half Moon the angle at the Moon between the directions to the Earth and to the Sun is $90^\circ$. In the right triangle Earth, Moon, Sun, the side from Earth to Moon is adjacent to the angle $\varphi$ at the Earth, and the side from Earth to Sun is the hypotenuse. So $\cos\varphi = D_M/D_S$, which gives $\frac{D_S}{D_M} = \frac{1}{\cos\varphi}$. With $D_M = 384{,}400$ km, the Sun's distance is $D_S = D_M/\cos\varphi$.

The answer becomes infinite as $\varphi$ approaches $90^\circ$, and it is very sensitive there. A small error $\delta$ in the angle changes the answer by about $\frac{\sin\varphi}{\cos^2\varphi}\,\delta$ in the ratio, and $\cos\varphi$ is tiny near $90^\circ$. This is why the plot on the right is drawn with a logarithmic scale.

## Advanced

The relative error of the answer is about $\delta\tan\varphi$ for an angle error $\delta$ in radians. At $\varphi = 89.853^\circ$, $\tan\varphi \approx 390$, so an error of $0.1^\circ$ (0.0017 radians) changes the answer by about 70 percent. To get the Sun's distance within 10 percent you would have to measure the angle to better than $0.015^\circ$, and also pick the moment of half Moon to within about two minutes. No ancient instrument came close. The Moon's rough edge, with mountains and valleys, makes the exact half moment even more uncertain. None of this hurts the idea. It is a clear case of an indirect measurement whose result depends strongly on one small number.

## Derivation

1. The angle at the Moon is a right angle, so in the triangle Earth, Moon, Sun the cosine of the angle $\varphi$ at the Earth is the side next to it divided by the longest side: $\cos\varphi = \frac{D_M}{D_S}$.
2. Turn the fraction upside down. The number of times the Sun is farther than the Moon is $\frac{D_S}{D_M} = \frac{1}{\cos\varphi}$.
3. Multiply by the Moon's distance: $D_S = \frac{D_M}{\cos\varphi}$. For $\varphi = 89.853^\circ$ and $D_M = 384{,}400$ km this gives about 149.6 million km.

## Real world

### Why the half Moon is so hard to judge
The Moon moves about half a degree through the sky relative to the Sun every hour. So one hour of error in choosing the half Moon moment is already half a degree of error in φ. And the dividing line between light and dark is rough, because of mountains and craters, so it is hard to say when it is straight.

### The astronomical unit
The average distance from Earth to the Sun, about 149.6 million km, is called one astronomical unit (AU) and is used to measure distances inside the solar system. Radar and spacecraft measurements fixed it so well that since 2012 one AU is defined as exactly 149,597,870,700 m.

### Ancient astronomy
Greek astronomers did not have the word "cosine". Aristarchus compared the sides of the triangle with whole-number ratios and wrote that the Sun is more than 18 and less than 20 times farther than the Moon.

### Why a small error can matter so much
Many measurements are like this. A 1 degree error in aiming a telescope, a rocket or a ruler matters more when the answer comes from dividing by a very small number. Scientists always ask how sensitive the answer is to the measurement, as you did here with the error slider.
