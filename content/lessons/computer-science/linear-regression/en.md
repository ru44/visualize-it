---
title: Linear regression by gradient descent
summary: >-
  Fit a straight line to scattered points by nudging its slope and intercept
  downhill on the error surface, one step at a time.
parameters:
  m: m — slope of the fitted line
  c: c — intercept of the fitted line
  lr: learning rate — step size each update
  steps: steps — number of gradient descent updates taken
variables:
  - the slope and intercept of the current fitted line
  - >-
    the loss: mean squared vertical distance between the line and the data
    points
  - how far each step moves against the gradient
---

## Intuition

Set steps to 0 and the line starts flat and wrong; press play and watch it rotate and shift toward the scattered points as steps advance, each update nudging $m$ and $c$ a little further downhill on the loss. The dashed line is the closed-form best fit — gradient descent is chasing it, one step at a time, without ever computing it directly.

Push the learning rate up and the line overshoots the target and swings back and forth instead of settling — too large a step jumps past the bottom of the bowl-shaped loss surface and can even diverge to nonsense values of $m$ and $c$. Keep it small and the descent is slow but steady, always landing closer to the dashed line as steps accumulate.

## Formal

The loss $L(m,c) = \frac1n \sum_i (y_i - mx_i - c)^2$ is minimised in closed form by the least-squares normal equations, but gradient descent instead repeatedly updates $m \gets m - \text{lr}\cdot \partial L/\partial m$ and $c \gets c - \text{lr}\cdot \partial L/\partial c$.

Because L is a convex (bowl-shaped) function of (m,c), gradient descent with a small enough learning rate is guaranteed to converge to the global minimum — the same line the closed-form solution gives.

## Advanced

If the learning rate exceeds a threshold set by the curvature of $L$ (related to the largest eigenvalue of the data's covariance matrix), each update overshoots further than the last and $|m|, |c| \to \infty$ — visible divergence rather than slow convergence. Real training uses adaptive step sizes (Adam, RMSProp) or momentum precisely to avoid hand-tuning a single fixed learning rate like this one.

## Derivation

1. Total squared vertical error between the line and every data point, averaged.
2. The gradient points in the direction of steepest increase of the loss.
3. Step against the gradient — downhill — scaled by the learning rate.

## Real world

### Forecasting and pricing
Predicting sales, house prices or demand from one or two features often starts with a fitted line exactly like this one.

### Training neural networks
Every layer of a deep network is tuned by the same gradient-descent update rule, just with millions of parameters instead of two.

### A/B test analysis
Regression lines are used to control for confounding variables when comparing two versions of a product.

### Scientific calibration
Instruments are calibrated by fitting a line between a known input and a measured output, then reading the slope and intercept off the fit.
