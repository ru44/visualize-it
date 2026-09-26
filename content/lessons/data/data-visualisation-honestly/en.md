---
title: Drawing data honestly
summary: The same two numbers can be drawn as two bars that look almost equal or as two bars where one towers over the other, and the only thing that changed is where the axis starts.
parameters:
  truncStart: where the truncated axis starts, truncStart
  gap: the real difference between the two bars, gap
variables:
  - p, the true percentage difference between the two numbers
  - v_1, the first number (last year)
  - v_2, the second number (this year)
---

## Try it

1. With truncStart at 0 and gap at 2, compare the two charts: they look almost the same, because both axes start at 0 here.
2. Drag truncStart up toward 78. The left chart barely changes, but the right chart's second bar now looks two or three times taller than the first, even though gap has not moved.
3. Set truncStart back to 0 and push gap up to 20. Now the honest chart itself shows a clearly taller second bar, no trick needed, because this time the real difference actually is large.

## Real-life examples

1. **A tiny real change, drawn honestly.** truncStart at 0, gap at 2: last year's 80 and this year's 82 look almost identical, which is the truth, since the real change is only 2.5%.
2. **The same tiny change, drawn to shock.** truncStart at 70, gap at 2: the exact same 80 and 82, but with the axis starting at 70, the second bar now looks dramatically taller than the first.
3. **A genuinely large change, drawn honestly.** truncStart at 0, gap at 20: 80 growing to 100 is a real 25% jump, and an honest, zero-based axis already shows that clearly.

## Test yourself

1. Push truncStart to 78, its maximum, the most exaggerated the axis can get.
2. Set truncStart to 2 or below and gap to 18 or above, a genuinely large difference drawn honestly.
3. Set truncStart to 60 or above and gap to 4 or below, a tiny difference drawn to look large.

## Intuition

Picture a company's earnings report: sales went from 80,000 dollars last year to 82,000 dollars this year, a real but modest 2.5% increase. A chart with an honest, zero-based axis shows two bars of almost the same height, which is the honest truth. But the same company's marketing team could draw the exact same two numbers with a y-axis that starts at 79,000 dollars instead of zero, and suddenly the second bar looks two or three times taller than the first, even though nothing about the sales changed at all.

The readouts under the chart make this precise: the honest chart's bar ratio and the truncated chart's bar ratio measure how many times taller the second bar looks, drawn on screen, in each version. When truncStart is 0 those two ratios match, because both charts are the same chart. As truncStart climbs, the truncated ratio grows far past the honest one, even though the underlying percentage difference, $p$, has not changed by a single decimal.

## Formal

Given two values $v_1$ and $v_2$, the true percentage difference is $p = \dfrac{v_2 - v_1}{v_1} \times 100$, a single number that depends only on $v_1$ and $v_2$ themselves, never on how a chart happens to draw them.

A bar chart's y-axis is a choice, not a fact about the data: starting the axis at 0 makes each bar's height directly proportional to its value, so the visual ratio of two bar heights equals the true ratio $v_2 / v_1$. Starting the axis anywhere above 0 breaks that proportionality, so the visual ratio can be made arbitrarily large by moving the axis start closer to the smaller value, without $p$ itself changing at all.

## Advanced

Statisticians sometimes call the size of this distortion the "lie factor," the ratio between how big an effect looks on the page and how big it actually is in the data; a lie factor near 1 is honest, and values far from 1, in either direction, mean the picture is exaggerating or hiding a real change. When an axis genuinely must be truncated to show detail in a narrow range, the honest convention is to mark the break clearly, for example with a jagged cut in the axis line, rather than truncating silently the way the right-hand chart in this lesson does.

## Derivation

1. $v_2 - v_1$ is the real size of the difference between the two numbers.
2. $\dfrac{v_2 - v_1}{v_1}$ compares that difference to the value it started from, turning it into a ratio.
3. $p = \dfrac{v_2 - v_1}{v_1} \times 100$ is the true percentage change, and it stays exactly the same no matter how the axis is drawn.

## Real world

### News and advertising charts
A political ad or a news segment can make a 2-point poll shift look enormous by starting its bar chart's axis at 45 instead of 0; reading the axis labels first is the fastest way to catch it.

### Stock and finance apps
A stock app zoomed into a single day's trading often uses a tightly truncated axis, which is useful for spotting small moves but can make a 1% wiggle look like a crash if the axis is not read carefully.

### Company earnings slides
Corporate earnings presentations sometimes truncate the y-axis on a "growth" chart to make a modest single-digit percentage increase look like a steep climb.

### Government and health dashboards
A public dashboard tracking something like case counts or unemployment can look far more alarming or far more reassuring than the real numbers justify, depending only on where its axis is set to start.
