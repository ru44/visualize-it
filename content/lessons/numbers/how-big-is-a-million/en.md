---
title: How big is a million?
summary: >-
  Find out how many days it would actually take to count to a million, one
  number a second.
parameters:
  e: the exponent e
variables:
  - 'the exponent: how many zeros follow the 1 in the number of dots shown'
---

## Try it

1. Drag «exponent e» up from 0. Watch the blue grid on the left fill in far faster than the slider moves.
2. Set e to 6. On the right, read how many days it says it would take to count every dot out loud, one per second.
3. Push e to 9. Watch the counting time jump from days to decades.

## Real-life examples

1. **A packed stadium section.** About $10^{4}$ seats, ten thousand — a number you could still count by walking the rows.
2. **A big sack of rice.** About $10^{6}$ grains, a million — no one counts these by hand.
3. **A stack of banknotes.** About $10^{9}$ single bills, a billion — piled up, they would tower over a building.

## Test yourself

1. Set e so the picture shows exactly a million dots.
2. Push e up to nine — a billion dots.
3. Get e to 10 or higher — ten billion dots.

## Intuition

Try counting to a hundred out loud — that takes under a minute, and you can picture every single number as you say it. Now look at the blue grid on screen: at e = 6 it is completely full, one blue square standing for each of a million dots, far more than any eye can count one by one.

The exponent e is just how many zeros follow the 1 in that count. Push e up by one notch, and the counting time shown on the right does not creep up gently — it jumps by a factor of ten, turning about 12 days of nonstop counting (one million) into about 4 months (ten million).

## Formal

The number of dots shown is $10^{e}$. Counting them one per second takes $10^{e}$ seconds, which is $\dfrac{10^{e}}{86400}$ days, since a day holds $86400$ seconds.

For $e=6$ that is about $11.6$ days; for $e=9$ it is about $31.7$ years. Each extra step of $e$ multiplies the counting time by ten, exactly as it multiplies the number of dots.

## Advanced

Human intuition for quantity is roughly logarithmic, not linear — we naturally compare things by ratio rather than by difference. That is precisely why a linear slider paired with an exponent $e$ feels right: equal slider steps should feel like equal jumps in "how big", and $10^{e}$ delivers that.

## Derivation

1. Counting one dot per second, showing $10^{e}$ dots takes $10^{e}$ seconds.
2. A day is $86400$ seconds, so that many seconds is $\dfrac{10^{e}}{86400}$ days.
3. Working it out: a million dots take about $11.6$ days, and a billion dots take about $31.7$ years.

## Real world

### National budgets
Government budgets are usually quoted in millions or billions — the words hide just how far apart those two numbers really are.

### Star counts
A galaxy holds on the order of $10^{11}$ stars — a hundred billion, a hundred times further than the top of this slider.

### Grains of sand
A handful of sand already has more grains than most people ever count in a lifetime, easily past a million.
