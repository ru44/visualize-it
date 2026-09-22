---
title: What is machine learning?
summary: >-
  A spam filter, a movie recommender and a chatbot all improve the same way:
  by quietly adjusting a few numbers until their guesses stop being so wrong.
parameters:
  m: m — slope of the fitted line
  c: c — intercept of the fitted line
  lr: learning rate — how big each update step is
  steps: steps — how many updates have run
variables:
  - the two numbers the model is allowed to adjust
  - 'the loss: how wrong the current line is, on average'
  - repeatedly nudging m and c to make the loss smaller
---

## Try it

1. Look at the orange line when steps is 0 — it is flat and ignores the blue dots completely.
2. Press play and watch steps climb. The orange line rotates and slides until it threads through the dots, chasing the teal dashed line.
3. Push lr up high, reset steps to 0, and press play again. Notice the line overshoot and wobble instead of settling smoothly.

## Real-life examples

1. **Before any training.** The line is flat and ignores every dot — this is what a brand-new model looks like before it has ever seen an example.
2. **After a full training run.** After 150 steps of nudging, the line's slope and starting point have settled into a shape that threads through the scattered points.
3. **Trained too fast.** With the learning rate pushed almost to its highest setting, the line races toward the points and overshoots, wobbling instead of settling.

## Test yourself

1. Train for the full 200 steps.
2. Slow training down until the learning rate drops below 0.003.
3. Push the learning rate above 0.045 and let it run past step 10 — watch it overshoot.

## Intuition

Picture ten friends' heights sketched as blue dots on a page, with one straight orange line trying to pass close to all of them. At step 0 the line is flat, ignoring every dot; drag the slider labelled "steps" up and the orange line starts swinging and sliding on its own, chasing the teal dashed line — the best possible fit — a little closer with every step. Its steepness has a name: it is $m$, and you can watch it change as the line rotates. Where it starts has a name too: it is $c$, and you can watch it shift as the line slides up or down.

The single number that measures how wrong the line still is also has a name: $L$, the loss. Training simply means shrinking $L$, one small nudge at a time, and a giant model behind a chat assistant does the exact same shrinking — just on a formula holding billions of numbers instead of two, checked against far more data than ten dots.

## Formal

The model here is $\hat y = mx + c$, a function with two parameters. The loss $L = \frac1n\sum_i (y_i - \hat y_i)^2$ averages the squared error between each prediction $\hat y_i$ and the true value $y_i$; training searches for the $m, c$ that make $L$ as small as possible.

This recipe — a parametrized function, a loss that scores its mistakes, and an optimizer that adjusts the parameters to reduce the loss — is the same recipe behind every model in this course, from a single line to a network with layers of weights. Only the function and the number of parameters change.

## Advanced

Fitting a line to a handful of points is a toy problem chosen because it can be drawn on a page; a modern language model performs the identical update rule shown in the derivation below, but on a function with billions of parameters and a loss averaged over trillions of words, using stochastic gradient descent over small random batches of data rather than the whole dataset at once, because computing the exact gradient over everything at every step would be far too slow.

## Derivation

1. Total squared error between the line's predictions and the true points, averaged.
2. The gradient shows which direction makes the loss bigger.
3. Step the opposite way, scaled by the learning rate — one update.

## Real world

### Recommendations
Streaming services fit a model that predicts how much you will like each title, then adjust it as you watch and rate more.

### Spam filters
Email systems learn to separate spam from real mail by fitting a model to millions of examples that were already labelled by users.

### Machine translation
Translation systems fit a huge model that turns a sentence in one language into a sentence in another, trained on paired examples.

### Medical imaging
Diagnostic tools fit a model to scans that doctors have already labelled, then flag new scans that look similar to the labelled disease cases.
