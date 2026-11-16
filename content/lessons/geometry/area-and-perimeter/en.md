---
title: Area and perimeter
summary: 'Compare shapes with the same boundary length to see why equal perimeters need not enclose equal areas.'
parameters:
  P: 'P — common perimeter in metres'
  f: 'f — width as a fraction of half the perimeter; 0.5 gives a square'
variables:
  - 'A: enclosed area, measured in square metres'
  - 'P: common boundary length of the three shapes'
  - 'w: rectangle width, equal to fP/2'
  - 'h: rectangle height, equal to (1 − f)P/2'
---

## Try it

1. Set P = 24 and f = 0.5. The rectangle is a 6 m by 6 m square with area 36 m².
2. Keep P = 24 and set f = 0.15. The sides become 1.8 m and 10.2 m. The perimeter stays 24 m, but the area falls to 18.36 m².
3. Compare the fixed square and circle. At P = 24, the circle encloses about 45.84 m². Changing f changes only the rectangle's dimensions; changing P changes all three shapes.

## Real-life examples

1. **A narrow plot.** With P = 24 m and f = 0.15, the plot measures 1.8 m by 10.2 m and covers 18.36 m².
2. **A square plot.** The same 24 m boundary with f = 0.5 encloses a 6 m by 6 m square, covering 36 m².
3. **A larger boundary.** With P = 32 m and f = 0.7, the rectangle is 11.2 m by 4.8 m and covers 53.76 m². The square with that same perimeter covers 64 m².

## Test yourself

1. Set f close to 0.5 so that the rectangle is nearly square.
2. Make the rectangle's area less than half the square's area while keeping their common perimeter.
3. Increase P until the circle's radius exceeds 4 m. Use radius = P/(2π).

## Intuition

Perimeter measures the distance around a boundary, while area measures the surface inside it. A 6 m by 6 m square has perimeter 24 m and area 36 m². A 2 m by 10 m rectangle also has perimeter 24 m, but area only 20 m². Equal fence lengths do not imply equal enclosed areas.

With the perimeter fixed, increasing a rectangle's width forces its height to decrease by the same amount. The area is greatest when the two are equal. The circle with that perimeter encloses still more area. This is a separate mathematical result; comparing a few pictures alone does not prove it for every possible shape.

## Formal

A rectangle with width w, height h and perimeter P satisfies $P=2(w+h)$, so $h=P/2-w$ and $A=w(P/2-w)$. Completing the square gives $A=P^2/16-(w-P/4)^2$. The subtracted square is nonnegative, so the maximum occurs at $w=h=P/4$.

For a simple closed plane curve of length P enclosing area A, the isoperimetric inequality is $A\le P^2/(4\pi)$, with equality for a circle. Its radius is $r=P/(2\pi)$. The statement assumes an ordinary enclosed region and a boundary with finite length.

## Advanced

The formula proves the square is best among rectangles. Proving the circle is best among all eligible plane regions takes a separate argument. Smoothness or the absence of corners alone does not guarantee maximum area: a long thin ellipse is smooth too. In three dimensions, the related result compares enclosed volume with surface area.

## Derivation

1. Fixing P fixes w + h at P/2. Substitute h = P/2 − w into A = wh.
2. Rewrite the area as P²/16 minus the square of w − P/4. It is largest when that square is zero, making the rectangle a square.
3. For the circle, substitute r = P/(2π) into πr² to get P²/(4π). The isoperimetric theorem establishes that no other eligible shape exceeds it; the rectangle calculation alone does not prove that theorem.

## Real world

### Fencing a rectangular plot

If the entire boundary needs fencing and there are no other restrictions, a square gives the most area among rectangles of fixed perimeter. A required side length or a boundary already supplied by a wall changes the problem.

### Scaling a design

Doubling every length doubles perimeter and quadruples area. A design with twice as much boundary can therefore enclose four times the area when its shape is preserved.
