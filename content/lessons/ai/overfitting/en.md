---
title: Overfitting and underfitting
summary: >-
  A student who memorizes last year's exam answers aces that exact test, then
  fails a new one on the same topic — a model can make the identical mistake.
parameters:
  degree: degree — how many bends the fitted curve is allowed
  noise: noise — how scattered the data points are
variables:
  - the degree, how many bends the curve is allowed
  - the weight on each power of x
  - error measured on the points the model trained on
  - error measured on fresh points the model never saw
---

## Try it

1. Set degree to 1 with noise around 0.5. The curve is too simple to follow the bumps in the data: both readouts, training error and new-point error, stay high — underfitting.
2. Raise degree to 10 or 12. The curve now snakes through almost every training point, and training error nearly vanishes — but watch new-point error, it often gets worse, not better.
3. Try degree 3 instead and compare the two readouts. Training error is a little higher than at degree 12, but new-point error is usually the lowest of all three settings.

## Real-life examples

1. **Too simple to bend.** At degree 1, only a straight line is allowed — it cannot follow a single bump in the data, no matter how the one available weight is set.
2. **Bent enough to memorize.** At degree 12, the curve has enough bends to snake exactly through every one of the training points.
3. **A reasonable balance.** At degree 3, the curve bends enough to follow the trend without chasing every wiggle of noise.

## Test yourself

1. Set degree to 1 or lower and see the clear underfitting.
2. Push degree to 10 or above and see the clear overfitting.
3. Combine heavy noise, above 0.7, with a high degree, 10 or more, and watch new-point error blow up.

## Intuition

Twelve scattered dots sit on this screen, and a curve is drawn through them. At degree 1 the curve is a straight line: it can only tilt and shift, with no way to follow any bump between the dots. Raise degree toward 12 and the curve gains extra bends, one for every step, until it has enough of them to loop through all twelve dots exactly, however scattered noise made them.

That perfect-looking curve at degree 12 has not learned anything about the real pattern; it has only traced the particular scatter, including the noise, of these twelve dots. A model like this is tested the honest way: on points it has never seen. Two readouts below the picture track this — training error, measured on the dots used to draw the curve, and new-point error, measured on fresh ones. Push degree too high and new-point error climbs back up even as training error keeps falling; push degree too low and both stay high because the line was never flexible enough to begin with.

## Formal

The fitted curve $\hat y = \sum_{j=0}^{d} w_j x^j$ has $d+1$ adjustable weights $w_j$; more degree $d$ means more capacity to bend and fit anything, including noise. Training error $L_{tr}$ is computed on the same points used to choose the weights, so it can only fall, or stay flat, as capacity grows.

Error on new data $L_{new}$, points held back and never used for fitting, tells a different story: it falls as the model captures real structure, then rises again once the extra capacity starts fitting noise instead. This is why practical training always checks a separate validation set, points set aside purely to catch overfitting before it happens on data that matters.

## Advanced

The gap between $L_{tr}$ and $L_{new}$ is a rough measure of how much a model has memorized versus generalized, and controlling it is central to modern machine learning: techniques like regularization (penalizing large weights), dropout and early stopping all exist to hold capacity in check without hand-picking a degree, because real models have far too many parameters to tune by eye the way this lesson's slider does.

## Derivation

1. The fitted curve has one adjustable weight per power of x, up to degree d.
2. Training error uses the same squared-error formula, evaluated on the points used to fit the weights.
3. New-data error uses the identical formula, but evaluated only on points withheld from fitting.

## Real world

### Medical diagnosis
A model that memorizes quirks of its training patients instead of the real disease signal can fail badly on the next patient who walks in.

### Stock and financial prediction
Models fit too closely to historical price noise often perform worse than a simple trend once real, new market days arrive.

### Spam filtering
A filter overfit to the exact wording of old spam misses new spam that uses slightly different phrasing.

### Image recognition
A vision model that memorizes its exact training photos instead of general shapes fails on new photos taken in a different setting.
