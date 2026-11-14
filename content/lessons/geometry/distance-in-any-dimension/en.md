---
title: How far apart? Distance in any number of dimensions
summary: Walk 3 m east and 4 m north and you are 5 m from the start. The same rule gives the distance in 4, 9 or 11 directions.
parameters:
  n: n — how many directions you step in
  a: a — the length of the step in each direction
variables:
  - the straight distance from the start to the end
  - the step in the first direction
  - the step in the second direction
  - the step in the third direction
  - the step in the last direction, whichever number that is
  - how many directions there are
  - the length of every step, when all steps are equal
---

## Try it

1. Set a to 1 and slide n from 1 up to 11. Watch the spiral grow one triangle at a time, and read the straight distance below the picture.
2. Set n to 4. The straight distance is exactly 2, and walking along the edges is 4. Now set n to 9 and find another exact whole number.
3. Drag the tip of the spiral outwards. Every length gets bigger together, but the number of times the edges are longer than the straight line stays the same.

## Real-life examples

- **Across a square.** Two steps of 1 m, one east and one north, are 2 m along the edges. The straight line is $\sqrt{2}$, about 1.414 m, so a shortcut across a square saves nearly a third.
- **Across a tesseract.** A tesseract is the cube with four directions. With 4 steps of 1 each, the straight line is $\sqrt{4}$, exactly 2, while walking along the edges is 4.
- **Across an 11-direction cube.** Each side is 1, and the straight distance is $\sqrt{11}$, about 3.317. Walking along the edges is 11, more than three times longer.

## Test yourself

1. With a = 1, find the number of directions that make the straight distance exactly 3.
2. With a = 1, find the number of directions that make the straight distance exactly 2.
3. Get a straight distance of 10 using more than three directions. What are n and a?
4. Make the walk along the edges exactly twice as long as the straight line.

## Intuition

You walk 3 m east and then 4 m north. How far are you from the start, in a straight line? Draw it: two sides of a right triangle, 3 and 4. Pythagoras says the straight side is 5, because 9 + 16 = 25 and the square root of 25 is 5. You are 5 m from the start, even though you walked 7.

Now climb a 12 m ladder straight up. You added a third direction. The 5 m line is the floor of a new right triangle, and the ladder is the other side, at a right angle to it. Again: 25 + 144 = 169, and the square root of 169 is 13. You are 13 m from where you started. The rule never changed: square each step, add them up, take the root.

That rule works in 4 directions, in 5, in 11, even though nobody can point to a fourth direction. Just keep adding one more square. In the picture, the spiral is built exactly that way. Each new direction adds a new right triangle: the old straight line is one side, the new step is the other side, at a right angle, and the new straight line is the long side. Set n and watch it grow.

To play with it, take the same step a in every direction. Then the straight distance is $a\sqrt{n}$, while walking along the edges is $n \cdot a$. For a cube with side 1: across a square it is 1.41, across a cube 1.73, across a tesseract exactly 2, in 9 dimensions exactly 3, and in 11 dimensions 3.32. The more directions, the bigger the shortcut. Drag the tip of the spiral to change a, and slide n to change the directions.

Why does this matter? A computer compares two songs, two faces or two words as two lists of numbers, hundreds of them. "Similar" means "close", and close is measured with exactly this formula, in hundreds of directions at once.

## Formal

In $n$ directions, a point is a list of $n$ numbers, and its distance from the start is $d = \sqrt{x_1^2 + x_2^2 + \dots + x_n^2}$. Here $x_1$ is the step in the first direction, and so on up to the last, $x_n$.

It comes from Pythagoras again and again. With two steps, $d^2 = x_1^2 + x_2^2$. Adding a third step at a right angle to both gives $d^2 = (x_1^2 + x_2^2) + x_3^2$, and each new direction adds one more square. If every step has the same length $a$, then each square is $a^2$, there are $n$ of them, and $d = a\sqrt{n}$.

## Advanced

This is the Euclidean distance, the length of a vector with $n$ numbers. It is the square root of the dot product of the vector with itself. Other distances exist: the "taxi" distance, the sum of the sizes of all the steps, is exactly the walk along the edges, and for equal steps it is $na$, which is $\sqrt{n}$ times longer than $a\sqrt{n}$. In very high dimensions the straight distance between two random points becomes almost the same for every pair, which is why finding "nearest" neighbours gets hard.

## Derivation

1. Two steps at a right angle make a right triangle, and Pythagoras gives the straight side: $n = 2\text{: } d^2 = x_1^2 + x_2^2$.
2. A third step at a right angle to the plane of the first two uses that straight side as one leg: $n = 3\text{: } d^2 = (x_1^2 + x_2^2) + x_3^2$.
3. Repeat for each new direction, adding one square each time, then take the square root: $d = \sqrt{x_1^2 + x_2^2 + \dots + x_n^2}$.
4. If every step has length $a$, the sum is $n$ copies of $a^2$, so $\text{equal steps } a\text{: } d = a\sqrt{n}$.

## Real world

### GPS and maps

The distance between two places on a map uses two numbers, and with height it uses three. Your phone applies this rule over and over.

### Colour difference

Every colour on a screen is three numbers: red, green and blue. How different two colours look is measured with this distance in three directions.

### Similar songs and photos

A music app turns each song into hundreds of numbers. Two songs with a small distance between them sound alike, so the app suggests them together.

### The nearest pharmacy

A search for the closest pharmacy compares distances from you to every pharmacy and keeps the smallest. Each comparison is this formula.
