---
title: How far is the Moon?
summary: A coin held at arm's length can hide the whole Moon. That one fact, with the Moon's width, tells you how far away it is.
parameters:
  c: c — width of the coin
  L: L — distance from your eye to the coin
variables:
  - the distance to the Moon, which is what we want
  - the Moon's real width, 3,474 km, found in the previous lesson
  - the distance from your eye to the coin (same unit as c when you divide)
  - the width of the coin
---

## Try it

1. Leave c at 7 mm, a pea, and move L until the coin disc exactly covers the dashed Moon on the right. The label turns green. Read "your distance" below the picture.
2. Now make c bigger, 20 mm, and find the new L. A larger coin has to be held farther away, so L grows, but "L ÷ c" stays about the same, near 110.
3. Set c to 24 mm and L to 60 cm. The coin is far too big and is more than four times wider than the Moon. The distance you read is far too small, because the coin does not match the Moon.

## Real-life examples

- **A pea at arm's length.** A pea is 7 mm wide. Held 77.5 cm from your eye, it hides the Moon exactly. 775 mm divided by 7 mm is about 110.7, and 110.7 × 3,474 km is about 384,000 km.
- **A bigger coin.** A coin 20 mm wide hides the Moon at 221 cm, more than a stick is long. The ratio is the same, about 110, so the answer is the same. The bigger the coin, the farther you must hold it.
- **A coin held too close.** A 24 mm coin at 60 cm is 25 times farther than it is wide. It hides the Moon four times over, so it does not match the Moon and your answer is only 87,000 km. Only a coin that just covers the Moon gives the real distance.

## Test yourself

1. Find the distance to the Moon, about 384,400 km, within 2 percent.
2. Do it again with a coin wider than 15 mm.
3. Give the distance in Earth radii and land on 60.3.
4. Make the coin look more than four times wider than the Moon.

## Intuition

Hold a pea out at arm's length and close one eye. A 7 mm pea, held about 77 cm from your eye, hides the whole full Moon. Not part of it: the whole disc, exactly. Try it on the next clear night. The Moon fills far less of your view than you think. In the picture, the orange coin disc on the right is covering the dashed Moon.

Look at the side view on the left. One line runs from your eye to the top of the coin, and goes on to the top edge of the Moon. Another runs to the bottom. So there are two triangles with the same shape, one small (your eye and the pea) and one huge (your eye and the Moon). They have the same shape, so the Moon is as many Moon-widths away as the pea is pea-widths away. The pea is about 110 pea-widths from your eye (775 mm divided by 7 mm), so the Moon is about 110 Moon-widths from you.

The previous lesson found that the Moon is 3,474 km wide. Then the distance is 110 × 3,474 km, about 382,000 km. With a more careful ratio, 110.6, you get 384,000 km. The real average distance is 384,400 km. So a pea and a ruler were enough to find the distance to another world.

Drag the coin along the stick, or move c and L. The right panel shows what your eye sees. When the coin is too big it hides the Moon, when it is too small the Moon sticks out around it, and only when the coin just covers it does your distance match the truth. This also tells you that the Moon is only about half a degree wide in your sky (0.52°). Hipparchus, about 150 BC, used a related method and found that the Moon is about 60 Earth radii away. The real value is 60.3. The last box shows your own answer in Earth radii.

## Formal

The angle that a coin of width $c$ takes up, seen from a distance $L$, is about $c/L$ when it is small. The Moon, of real width $d_M$ at distance $D_M$, takes up about $d_M/D_M$. When the coin just covers the Moon the two angles are equal, so $\frac{c}{L} = \frac{d_M}{D_M}$. Solving for the distance gives $D_M = d_M\,\frac{L}{c}$. Use the same unit for $L$ and $c$ when you divide: the sliders show $c$ in mm and $L$ in cm, so the ratio is $10L/c$.

The Moon takes up the angle $0.52^\circ$, so the right ratio is $1/0.0091 \approx 110.6$. Any coin with $L/c$ near 110.6 covers it. The ratio is the same for a pea, a coin and a dinner plate.

## Advanced

The shortcut $\tan\theta \approx \theta$ is very accurate here, because $0.52^\circ$ is only $0.0091$ radians. The error of the formula is about 0.003 percent, far smaller than the error of holding a coin by eye. The real limit is different: the Moon's distance changes by about 40,000 km either side of the average, between its closest point (perigee, about 363,000 km) and its farthest (apogee, about 405,000 km), and its width in your sky changes with it. So the coin trick gives a slightly different answer from month to month, because the Moon really is nearer or farther.

## Derivation

1. A coin of width $c$ held at distance $L$ from your eye, and the Moon of width $d_M$ at distance $D_M$, make two triangles with the same apex at your eye and the same angle. When the coin just covers the Moon, the triangles are similar, so their width to distance ratios are equal: $\frac{c}{L} = \frac{d_M}{D_M}$.
2. Multiply both sides by $D_M$ and by $\frac{L}{c}$: $D_M = d_M\,\frac{L}{c}$. With $d_M = 3{,}474$ km and $L/c \approx 110.6$ this is about 384,000 km.

## Real world

### The pea trick
Anyone can do this. Hold something at arm's length, find the size that hides the Moon, and divide your arm length by that size. Everyone who tries gets a number near 110, whatever object they use.

### Laser ranging
Since 1969 astronauts left mirrors on the Moon. Scientists in many countries fire a laser at them and time the light, which takes about 2.5 seconds for the round trip. They measure the Moon's distance to within a few millimetres, and have found it moves away from us by about 3.8 cm each year.

### Why the Moon seems bigger near the horizon
It looks huge when it rises, but the same pea still hides it. The Moon is the same angle wide all night, and the effect is a trick of your brain, not of the sky.

### Eclipses
The Sun is about 400 times wider than the Moon and about 400 times farther away, so both look the same size in the sky. That is why the Moon can just cover the Sun in a total eclipse, like your coin covers the Moon here.
