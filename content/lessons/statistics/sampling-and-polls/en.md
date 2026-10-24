---
title: 'Polls: asking a thousand to know millions'
summary: >-
  A fair poll of a thousand people genuinely pins down a country of millions
  to within about three points — and a leaning poll of a million people stays
  wrong forever, which is why how you ask beats how many you ask.
parameters:
  p: p — the country's true support
  n: n — people actually polled
  bias: bias — how far the polling method leans
variables:
  - the margin of error, the honest half-width of the poll's interval
  - the true share being estimated
---

## Try it

1. Keep the defaults and look at the field: 540 of the country's millions, with the n ringed people as the actual sample — the published interval sits around the truth.
2. Shrink n to 200: the interval balloons to about ±7 points, too wide to call any close race.
3. Now set bias to 5 with n at 5000: the interval is beautifully tight and confidently wrong — the truth sits outside it, and more people would not help.

## Real-life examples

- **A standard national poll.** A thousand respondents at 52% support: margin about ±3.1 — enough to say "ahead", not enough to call a 51–49 race.
- **The cheap quick poll.** Two hundred respondents: ±6.9 points of honest fog, which is why small polls disagree so loudly.
- **The 1936 catastrophe.** A huge sample with a leaning method: the Literary Digest polled over two million people by car and telephone registries — wealthy households, in 1936 — and still called the wrong president.

## Test yourself

1. Get an honest margin of 1.5 points or better — it takes nearly the whole 5,000.
2. Set n to exactly 200 and see the margin reach about 7 points.
3. Recreate the Literary Digest: a leaning method (bias at least 4.5) with a huge sample (n at least 4500) — tight, confident, wrong.

## Intuition

A spoonful tells you how the whole pot of soup tastes — if the pot is stirred. That is the entire miracle of polling: a thousand people, chosen genuinely at random, pin down a country of millions, because the spoon's randomness guarantees it resembles the pot. The field on screen is the pot, the ringed dots are the spoonful, and the published interval below is what the poll can honestly claim.

Two different enemies attack that claim. Honest noise — the luck of who happened to be spooned — shrinks with $\sqrt{n}$, so quadrupling the sample only halves the fog, and past a thousand or so, extra respondents buy almost nothing. Bias is the unstirred pot: if the method itself leans — calling only landlines, polling only one neighbourhood — the whole interval shifts sideways by that lean, and no sample size on Earth shrinks it. A tight interval around the wrong place is the most dangerous object in statistics.

## Formal

For a true share $p$ estimated from $n$ random respondents, the sample share scatters with standard error $\sqrt{\dfrac{p(1-p)}{n}}$, and the conventional 95% margin of error is $E = 1.96\sqrt{\dfrac{p(1-p)}{n}}$ — about $\pm 3$ points at $n = 1000$, and widest when $p = 0.5$.

Bias enters additively and does not average out: a method leaning by $b$ reports around $p + b$ however large $n$ grows, so the published interval of a biased poll converges confidently on the wrong number. Randomness of selection, not size, is what the formula silently assumes.

## Advanced

Real pollsters fight bias more than noise: they weight respondents to match the population's age, region and education, chase the people who do not answer (non-response bias is today's Literary Digest), and publish "house effects" so aggregators can correct each firm's habitual lean. Aggregating many polls shrinks honest noise beautifully but does nothing for a lean shared by the whole industry — which is how entire election forecasts can miss in the same direction at once.

## Derivation

1. Each random respondent is a draw that supports with probability $p$, so the sample share scatters with standard error $\sqrt{\dfrac{p(1-p)}{n}}$.
2. Reaching $1.96$ standard errors each side gives the 95% margin $E = 1.96\sqrt{\dfrac{p(1-p)}{n}}$.
3. The $\sqrt{n}$ in the denominator is the law of diminishing returns: four times the respondents, half the margin — while a lean of $b$ points shifts the centre and never shrinks.

## Real world

### Election forecasting
National polls of roughly a thousand people carry ±3-point margins — races inside that band are genuinely undecidable by polling.

### Audience ratings
TV and streaming ratings come from panels of a few thousand homes, speaking for hundreds of millions of viewers through this same spoonful logic.

### Medical surveys
Health agencies estimate national rates of smoking or vaccination from samples, weighting hard to repair the bias of who picks up the phone.

### Quality sampling
Factories test a random handful from each batch; the formula says how large the handful must be before a claimed defect rate means anything.
