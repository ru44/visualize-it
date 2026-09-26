---
title: GDP growth and the rule of 70
summary: >-
  A country's total output compounds year after year just like any other
  percentage growth, and the rule of 70 gives a fast mental shortcut for
  how many years that takes to double — divide 70 by the growth rate — so
  a 2% economy and a 9% economy can be compared in seconds.
parameters:
  p: today's GDP p
  g: annual growth rate g
  t: years elapsed t
variables:
  - output — the country's total GDP after «years elapsed t», in the same units as today's GDP
  - GDP today — the country's total output right now, in billions of dollars
  - growth rate — how fast that output grows each year, as a percent
  - years — how many years have passed since today
  - doubling estimate — the rule-of-70 estimate of how many years GDP takes to double
charts: []
---

## Try it

1. Set «years elapsed t» to 0. Output equals «today's GDP p» exactly — no growth has had time to compound yet.
2. Raise «annual growth rate g» from a slow 1.5% toward a fast 9%. The rule-of-70 doubling estimate drops sharply — growing six times faster means doubling in a fraction of the time, not just six times less time saved.
3. Push «years elapsed t» out past the doubling estimate. Output crosses roughly double «today's GDP p», confirming the estimate was on track.

## Real-life examples

1. **Mature, slow-growing economy.** 2,000 billion dollars growing at 1.5% a year — after 20 years, output reaches about 2,694 billion, up only 35%, because slow growth compounds slowly.
2. **Typical emerging economy.** 500 billion dollars growing at 5% a year — after 15 years, output reaches about 1,039 billion, just past double, matching the rule-of-70 estimate of about 14 years to double.
3. **Rapid catch-up growth.** 200 billion dollars growing at 9% a year — after just 8 years, output reaches about 399 billion, almost exactly double, matching the rule-of-70 estimate of about 7.8 years.

## Test yourself

1. Get output to roughly double «today's GDP p» within the years shown.
2. Get the rule-of-70 doubling estimate under 8 years.
3. Using a GDP under 300 billion dollars, triple output within the years shown.

## Intuition

The rule of 70 is a shortcut for a question that otherwise needs logarithms: at a steady percentage growth rate, how many years until something doubles? The trick is that a growth rate of $g$ percent corresponds to a doubling time of roughly $70/g$ years — divide 70 by the percentage and the answer pops out, no calculator needed, because $\ln 2 \approx 0.693$ and $69.3 \approx 70$ is close enough for a quick estimate.

The three examples above show how sharply that estimate swings with «annual growth rate g»: the slow 1.5% economy needs about 47 years to double, the 5% emerging economy needs about 14, and the fast 9% economy needs under 8 — a growth rate only six times larger cuts the doubling time down by a factor of six, because doubling time scales as $1/g$, not as some gentler curve.

## Formal

Output after «years elapsed t» compounds the same way any percentage growth does: $Y(t) = p\,(1+g/100)^t$, starting from «today's GDP p» and multiplying by the growth factor once for every year that passes.

Doubling time solves $Y(d) = 2p$, which needs $(1+g/100)^d = 2$; taking that equation apart with logarithms gives an exact answer, but the rule of 70 skips the logarithm entirely with the approximation $d \approx \dfrac{70}{g}$.

## Advanced

The rule of 70 is not exact, but it stays close across realistic growth rates: at $g=3\%$ the true doubling time is about 23.45 years against a rule-of-70 estimate of 23.33 — off by about a month — and at $g=9\%$ the true value is about 8.04 years against an estimate of 7.78, off by roughly three months, accurate enough for almost any real comparison between economies.

## Derivation

1. Output after «years elapsed t» is «today's GDP p» compounded once per year at «annual growth rate g»: $Y(t) = p\,(1+g/100)^t$.
2. Doubling means output reaches twice its starting value, which requires the growth factor itself to reach 2: $Y(d) = 2p \quad \Rightarrow \quad (1+g/100)^d = 2$.
3. Approximating that equation without logarithms gives the rule-of-70 shortcut: $d \approx \dfrac{70}{g}$.

## Real world

### Growth miracles
Several fast-growing economies in the late 20th century sustained «annual growth rate g» near 9–10% for decades, doubling their output roughly every 7 to 8 years — a pace that turned modest economies into major ones within a single working lifetime.

### The rule of 72
Some use 72 instead of 70, since 72 divides evenly by more small numbers (2, 3, 4, 6, 8, 9, 12) — a minor convenience trade for a slightly less accurate estimate at very low «annual growth rate g».

### Population doubling
The exact same $d \approx 70/g$ shortcut applies to any steady percentage growth, including population — a country growing at 2% a year doubles its population in about the same 35 years that a 2% GDP growth rate would take to double output.

### Output per person
Total «output» doubling is not the same as living standards doubling: if population is also growing, GDP per person grows more slowly than total GDP, so the rule-of-70 estimate here answers "how long until the whole economy is twice as big," not "how long until each person is twice as well off."
