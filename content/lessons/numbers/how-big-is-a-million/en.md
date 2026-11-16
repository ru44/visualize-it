---
title: How big is a million?
summary: Compare a million and a billion by calculating how long each would take to count.
parameters:
  e: exponent e
variables:
  - exponent; the number is 1 followed by e zeros
---

## Try it

1. Set e to 4. The grid is full and represents 10,000 dots.
2. Set e to 6. The grid stays full. Read the number of full grids needed for a million and the counting time beside it.
3. Set e to 9. Compare the new counting time with the time for a million. The number has become a thousand times as large.

## Real-life examples

1. **Ten thousand tickets.** At e = 4, the number is 10,000. Counting one each second would take about 2.8 hours.
2. **A million items.** At e = 6, counting one each second would take about 11.6 days without breaks.
3. **A billion sheets.** At e = 9, counting takes about 31.7 years. The displayed stack height assumes each sheet is 0.1 millimetre thick.

## Test yourself

1. Set the number to one million.
2. Set the number to one billion.
3. Make the number at least ten billion.

## Intuition

Counting one item every second takes 100 seconds for 100 items. For a million items it takes a million seconds. To turn that into days, divide by the 86,400 seconds in a day. The result is about 11.6 days, with no time allowed for sleeping or eating.

A billion is a thousand million. At the same pace, counting it takes a thousand times as long: about 31.7 years. The number names sound similar, but the time comparison shows how different the amounts are.

The picture cannot display every dot in a million. One full grid represents 10,000 dots, so a million would need 100 full grids. Read the grid-count label when the number exceeds the picture's capacity.

## Formal

The selected count is $10^e$. At one item per second, the counting time in days is $10^e/86400$. This assumes a constant pace and no breaks.

Increasing e by 1 multiplies both the count and the time by ten. Increasing it by 3 multiplies them by a thousand.

## Advanced

A ratio compares large quantities without listing all their digits. The ratio of a billion to a million is $10^9/10^6=10^3$. On a logarithmic scale, that thousandfold increase occupies three exponent steps.

## Derivation

1. At one item per second, the number of seconds equals the number of items.
2. Divide by 86,400 to convert seconds to days.
3. A million seconds is about 11.6 days. A billion seconds is about 31.7 years, using 365.25 days per year.

## Real world

### Budgets

A budget of one billion currency units is a thousand times a budget of one million. Comparing the ratio avoids treating the names as nearly interchangeable.

### Processing records

At a fixed rate of one record per second, processing a billion records has the same time requirement as this counting example. A faster rate reduces the time proportionally.

### Stacking paper

Multiplying sheet count by sheet thickness gives a stack-height estimate. The result depends on the assumed thickness and ignores compression.
