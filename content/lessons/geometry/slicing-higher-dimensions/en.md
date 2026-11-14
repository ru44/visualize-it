---
title: What would a 4D ball look like passing through our room?
summary: >-
  Flat creatures on a sheet of paper only see the slice of a ball that touches their sheet. We would see a 4D ball
  the same way.
parameters:
  n: n — the dimension of the ball (2 is a flat disc, 3 an ordinary ball, 4 a 4D ball)
  h: h — how far the ball's centre is from the slice, in cm
  R: R — the radius of the ball, in cm
variables:
  - the radius of the slice, the part of the ball that touches the sheet
  - the radius of the whole ball
  - how far the ball's centre is from the sheet
charts: []
---

## Try it

1. Keep n at 3 and drag the ball up and down in the left picture. In the right picture, the slice appears from nothing, grows to a full circle when the sheet cuts through the middle, shrinks and vanishes. The row of small snapshots shows the same story, with the current moment marked.
2. Set n to 4, then to 2. The slice always has one dimension less than the ball: a 4D ball leaves a 3D ball, a flat disc leaves only a line segment.
3. Pick the first preset (h = 4, R = 5). Find the triangle with sides R, h and r in the left picture. Then make R bigger and watch the slice grow while h stays the same.

## Real-life examples

- **The classic 3-4-5.** A ball of radius 5 cm, cut 4 cm from its centre, leaves a slice of radius exactly 3 cm. The numbers 3, 4 and 5 are the sides of a right triangle, so the slice radius is exact, with no rounding.
- **A 4D ball at its widest.** When the middle of the ball is exactly in our room (h = 0), the slice is as big as it will ever get: a ball of radius 5 cm. Before that it was only a speck, and afterwards it shrinks to a speck again.
- **A disc barely touching a line.** A flat disc of radius 5 cm, with its centre 4.9 cm from a line, only just reaches it. The creatures on that line see a segment less than 2 cm long, and it is about to vanish.

## Test yourself

1. Make the slice radius exactly 3 cm from a ball of radius 5 cm.
2. Make the 4D ball vanish from our room.
3. Find the widest possible slice of a ball with a radius of 8 cm. How far from the centre must the sheet be?
4. Make the slice exactly half as wide as the ball.

## Intuition

Imagine a flat creature that lives on a sheet of paper. It can walk left, right, forward and back, but it has never heard of "up". In 1884 Edwin Abbott wrote a book about such creatures and called it "Flatland". Now push a ball down through the paper. What do the creatures see? Nothing at first. Then a dot appears from nowhere, grows into a small circle, then a big one, then shrinks and vanishes. They never see the whole ball. They only see the slice where the ball meets their sheet.

In the left picture the horizontal line is the sheet and the circle is the ball seen from the side. Drag the ball up and down. On the right you see what the creatures see. The row of small snapshots underneath is the whole trip, one picture after another. A ball above the sheet is "not here yet". A ball below it is "already gone".

A doctor's CT scan does the same on purpose. The machine takes pictures of thin flat slices of your body, one after another, like slices of bread. The doctor looks through the stack and builds the whole body in their head. A slice is always one dimension flatter than the thing it cuts.

Try the numbers. Take a ball of radius 5 cm and put the sheet 4 cm from its centre. The slice is a circle of radius 3 cm, because 3, 4 and 5 make a right triangle: the radius of the ball is the long side, the distance to the sheet is one short side, and the slice radius is the other. Move the sheet to the middle and the slice is as big as the ball.

Now one step up. Our room is the "sheet", and a 4D ball passes through it. We would see a small ball appear from nowhere in mid-air. It would swell to full size, then shrink and vanish. We could never see the 4D ball whole, only one 3D slice at a time. Set n to 4 to watch exactly that. We cannot draw a 4D ball, so the picture shows what we would see.

## Formal

Take a ball of radius $R$ and cut it with a flat sheet at distance $h$ from its centre. The centre of the ball, the point of the sheet closest to it and any point on the edge of the slice form a right triangle. Its longest side is $R$ and its other two sides are $h$ and the slice radius $r$, so $R^2 = r^2 + h^2$ and $r = \sqrt{R^2 - h^2}$.

This works in any dimension. A ball of $n$ dimensions cut by a flat sheet leaves a ball of $n-1$ dimensions with this radius: a disc leaves a segment of length $2r$, a 3D ball leaves a disc, and a 4D ball leaves a 3D ball. If $|h| \ge R$ the sheet misses the ball (or only touches it at one point) and there is nothing to see.

## Advanced

Stacking slices rebuilds the whole shape, and this is how volumes are computed. Adding up the volumes of all the slices of a 4D ball, each a 3D ball of radius $\sqrt{R^2 - h^2}$ with volume $\frac{4}{3}\pi r^3$, gives the 4D volume $\frac{\pi^2}{2}R^4$. The same recipe gives each dimension's ball from the one below it.

Slicing is also the honest way to look at a 4D object we cannot picture: it is a movie of 3D slices, and the fourth direction plays the role of time. A ball is the simplest case, since every slice is another ball. For a 4D cube or other shapes, the slices change shape as the sheet moves, which is a good way to study them.

## Derivation

1. The ball's centre, the nearest point of the sheet and a point on the edge of the slice make a right triangle with long side $R$ and short sides $r$ and $h$: $R^2 = r^2 + h^2$.
2. Move $h^2$ to the other side: $r^2 = R^2 - h^2$.
3. Take the square root. The radius is never negative, so only the positive root is used: $r = \sqrt{R^2 - h^2}$.

## Real world

### CT and MRI scans

The machine photographs thin flat slices of a body, and a computer stacks them into a 3D picture. This is how doctors look inside you without cutting you open.

### Tree rings

A cut log shows rings, a flat slice through the trunk. Counting the rings tells you how old the tree was when it was cut.

### Contour lines on a hiking map

Each line joins all the points of a mountain at one height. The lines are slices of the mountain at fixed heights, seen from above.

### 3D printers

A 3D printer builds an object one thin slice at a time, laying down one flat layer and then the next on top of it.
