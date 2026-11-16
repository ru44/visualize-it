---
title: Slope
summary: Calculate how much a line rises or falls for each step to the right.
parameters:
  m: slope m
  b: height at x = 0 (b)
  x: first point x₁
  h: horizontal gap Δx (h)
variables:
  - horizontal change from the first point to the second
  - vertical change; positive upwards and negative downwards
  - slope; vertical change divided by horizontal change
---

## Try it

1. Set m to 1, b to 0, x to 0 and h to 2. Between the marked points, the line moves 2 units right and 2 units up. Its slope is 1.
2. Increase h to 4. Both changes are now 4, so their ratio is still 1. Moving the points further apart has not changed the slope.
3. Keep h at 4 and change m to -1. The line now falls 4 units as you move right. A downward change gives a negative slope.

## Real-life examples

1. **A car moving steadily.** Let x measure minutes relative to a chosen moment, and y measure position in kilometres. From x = -2 to x = 2, a car travelling at 1.5 km per minute moves 6 km. Negative time here means before the chosen moment.
2. **Measuring a ramp.** A ramp rises 0.3 metres over a horizontal distance of 6 metres. Dividing 0.3 by 6 gives a slope of 0.05, also written as 5%.
3. **Buying notebooks.** Each notebook costs 2.50, with a fixed delivery fee of 1. Buying 4 instead of 1 costs an extra 7.50. Divide that increase by the 3 extra notebooks to get 2.50 per notebook.

## Test yourself

1. Adjust m and h so the vertical change between the two points is 5.
2. Set x to 3, then choose m and b so the first point has height 7.
3. Choose a negative m and a large enough h so the line falls by more than 10 units between the points.

## Intuition

Suppose a ramp rises 1 metre over a horizontal distance of 5 metres. Divide the rise by the horizontal distance: 1 divided by 5 is 0.2. This is the ramp's slope. It tells us the rise for each metre travelled horizontally, not along the ramp's surface.

In the graph, the dashed horizontal and vertical segments show these two changes between the marked points. Divide the vertical change by the horizontal change to find the slope m. For a straight line, choosing different points gives the same slope.

Read the line from left to right. A rising line has positive slope; a falling line has negative slope. A horizontal line has slope zero. The b control moves the line up or down without changing its slope.

## Formal

In the equation $y = mx + b$, m is the slope and b is the height where x is zero. Choose two points with $x_1 \ne x_2$, so their horizontal change is not zero.

Their slope is $\dfrac{y_2 - y_1}{x_2 - x_1} = \dfrac{m(x_2 - x_1)}{x_2 - x_1} = m$. The numerator is the vertical change; the denominator is the horizontal change. A vertical line has zero horizontal change, so this division cannot give it a slope.

## Advanced

A function with a constant difference quotient is affine, meaning it has the form of a straight line with a possible vertical offset. For a curved graph, the slope between two points can change when you choose different points. The derivative describes the limiting slope as the second point approaches the first, when that limit exists.

## Derivation

1. Use the line's equation to write the height at each of the two points.
2. Subtract the first height from the second. The same offset $b$ appears in both, so it cancels.
3. Divide by the nonzero horizontal change. The result is m, regardless of which two points you chose.

## Real world

### Speed

On a graph of distance travelled against time, a slope of 2 metres per second means the distance increases by 2 metres each second.

### Roads

A road grade of 6% means a rise of 6 metres for every 100 metres of horizontal distance.

### Shopping

When each extra item costs the same amount, the slope of total cost against item count is the price per item. A fixed delivery fee changes the starting cost, not the slope.
