---
title: Logistic regression
summary: >-
  Emails, loan applications and medical tests all end in the same yes-or-no
  call; this S-shaped curve is the standard trick for reaching that call.
parameters:
  w: w — how sharply the curve responds to x
  b: b — shifts the curve left or right
  x: x — the point sliding along the curve
variables:
  - the raw score before squashing
  - how sharply the curve responds to x
  - shifts the curve sideways, changing where it crosses 0.5
  - the squashed output, read as a probability
---

## Try it

1. Drag x from -6 to 6 and watch the point ride along the S-shaped curve. The f(x) readout climbs from 0.0001 to 0.9999 and never leaves the range between 0 and 1.
2. Put x at 0, then raise w to 5 — the S steepens into almost a sharp step and the slope readout shows 1.25. Lower w to 0.2 — the curve flattens into a gentle slope of 0.05.
3. Set w = 1.5 and b = 3. The whole curve shifts left and now crosses 0.5 at x = -2. Set b = -3 and it crosses 0.5 at x = 2 instead.

## Real-life examples

1. **A steep, confident filter.** With w near its maximum, the curve jumps almost straight from 0 to 1 — at x = 1 the output is already 0.9933, so the model rarely sits on the fence.
2. **A gentle, cautious filter.** With w near its minimum, the same swing in x barely moves the output — at x = 1 it is only 0.5744, so the model stays unsure over a wide range.
3. **A filter biased to flag more mail.** With b pushed up to 3, the curve reaches 0.5 already at x = -2 instead of x = 0, so mail with any higher x gets read as spam.

## Test yourself

1. Land exactly on the curve's midpoint, where f(x) reads 0.5 and the model is genuinely unsure.
2. Push w up near 5 and watch the curve steepen into an almost sharp step.
3. Push the raw score past 3 (f(x) above 0.953), deep into confidently-spam territory.

## Intuition

Suppose an email is scored on one feature, x, worth 2 points, say for containing a suspicious link. A straight line would turn that 2 straight into some raw number with no natural ceiling — useless for a yes-or-no call like "is this spam?". The S-shaped curve here fixes that: it takes any raw score and squashes it onto the range between 0 and 1, so the result can be read as a probability, with 1 meaning "certainly spam" and 0 meaning "certainly not".

Drag the point along the curve and watch that squashing happen directly: far to the left it hugs 0, far to the right it hugs 1, and in between it swings smoothly from one to the other. The raw score feeding that squash is called $z$, built from the same weight-times-input-plus-bias formula as a straight line; the sigmoid is simply bolted on afterward to reshape the result into something that behaves like a probability.

## Formal

The sigmoid function $\sigma(z) = \frac{1}{1+e^{-z}}$ maps any real $z$ into $(0, 1)$. With $z = wx + b$, the parameters $w$ and $b$ play the same roles as slope and intercept did for a line, except now they control how steep and where-centred the S-shaped transition is.

A decision is made by choosing a threshold, usually $\sigma(z) \ge 0.5$, which is exactly the same as asking whether $z \ge 0$: the sigmoid's midpoint at $z=0$ is where the model is genuinely unsure, and it is also the boundary the decision rule cuts along.

## Advanced

With more than one input feature, $z = w_1x_1 + w_2x_2 + \dots + b$ becomes a hyperplane, and logistic regression fits the weights by minimizing a loss called cross-entropy rather than squared error, because squared error penalizes confident wrong answers too gently; cross-entropy grows sharply as a confidently wrong probability approaches 0 or 1, which is exactly the behaviour a good classifier needs to be trained against.

## Derivation

1. Compute the raw score, a weighted combination of the input and a bias, exactly as in linear regression.
2. Pass the score through the sigmoid to squash it into a probability between 0 and 1.
3. Predict the positive class exactly when that probability reaches the 0.5 threshold.

## Real world

### Spam filters

An email is scored by a formula like this one; scores above the threshold get routed to the spam folder.

### Credit risk scoring

Lenders estimate the probability a loan applicant will default and set an approval threshold on that probability.

### Medical screening tests

A test result is turned into a probability of disease, and a doctor acts once that probability crosses an agreed threshold.

### Ad click prediction

Ad systems estimate the probability a person will click a given ad before deciding whether to show it.
