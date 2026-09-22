---
title: Linear regression by gradient descent
summary: >-
  This is how a computer finds the best straight line through messy
  real-world data, like predicting house prices from their size, without
  ever being told the answer directly.
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

## Try it

1. Set steps to 0 and look at the solid line — flat and nowhere near the scattered dots. Press play and watch it swing toward them as steps climbs.
2. Raise the learning rate slider past halfway, toward 0.05, and watch the solid line overshoot the dots and wobble back and forth instead of settling.
3. Drop the learning rate back down low and drag steps up to 200 — watch the solid line settle almost exactly onto the dashed line.

## Real-life examples

- **A patient trainer.** With the learning rate at a modest 0.02 and 100 steps already run, the line has had plenty of small, careful updates and sits close to the dots.
- **A trainer in a hurry.** A learning rate near 0.049, close to the top of the range, takes huge steps, so after only 20 of them the line has already jumped around wildly.
- **A lucky first guess.** Slope 1 and intercept 2 with 0 steps taken means someone guessed those numbers before any training happened at all.

## Test yourself

1. Run gradient updates for at least 150 steps with the learning rate held close to 0.02, until the solid line settles onto the dashed one.
2. Push the learning rate close to its top value, about 0.05, then stop after 5 steps or fewer — see how far a handful of big steps can go.
3. Drop the learning rate to close to its smallest value, about 0.001, then run almost the full 200 steps — see how slow-and-steady still gets there.

## Intuition

Imagine plotting 10 kids' heights against their ages on a sheet of graph paper, then trying to draw one straight line that passes as close as possible to every dot. This screen does exactly that with the scattered dots you see: press play and the solid line starts out flat and wrong, then slowly turns and slides as steps climbs from 0 toward 200. Each step nudges the slider $m$, the line's slope, a little further toward the dots. The next step nudges the slider $c$, the point where the line crosses the vertical axis, in the same direction. The dashed line is the one true best-fit line, worked out directly with algebra, and the solid line never gets to see that shortcut — it only crawls toward it, one small correction at a time.

Now push the learning-rate slider up past halfway and press play again. A rate close to its top value of 0.05 makes each step huge, so the solid line overshoots the dots and swings back and forth instead of settling down. That is the same idea as taking giant strides down a hill: step too far and you fly past the bottom and have to climb back up. Drop the learning rate down near its smallest value, 0.001, instead, and the solid line creeps down far more slowly, landing a little closer to the dashed line with every step you add.

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
