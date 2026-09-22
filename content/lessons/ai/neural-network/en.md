---
title: A small neural network
summary: >-
  One straight line can only split a picture into two plain halves; stack a
  few bent lines instead and the combined shape can curve around anything.
parameters:
  w11: w11 — first hidden unit's weight on x
  w12: w12 — first hidden unit's weight on y
  w21: w21 — second hidden unit's weight on x
  w22: w22 — second hidden unit's weight on y
  w31: w31 — third hidden unit's weight on x
  w32: w32 — third hidden unit's weight on y
  v1: v1 — output weight on the first hidden unit
  v2: v2 — output weight on the second hidden unit
  v3: v3 — output weight on the third hidden unit
  b: b — output bias
  x: x — first input coordinate
  y: y — second input coordinate
variables:
  - each hidden unit's weights on the two inputs
  - each hidden unit's weight in the final combination
  - the output bias
  - the activation function bending each hidden unit's output
---

## Try it

1. Leave the weights at their defaults and drag x and y across the picture. Watch the decision map's boundary and notice where the output flips from one colour to the other.
2. Change w31 alone and watch one of the three hidden units' lines rotate in the decision map — each hidden unit contributes one bent edge to the overall boundary.
3. Push v1, v2 and v3 up or down and watch the three edges combine into a different final shape entirely. Training a real network is exactly this: automatically tuning all these numbers.

## Real-life examples

1. **Starting shape.** With every weight at its default, the three hidden units all lean the same general way, giving the boundary its starting curve.
2. **Reshaping one edge.** Pushing w31 and w32 down to -3 swings the third hidden unit's line hard, bending just that one edge of the boundary.
3. **Inverting the decision.** Flipping v1, v2 and v3 all negative flips which side of the boundary counts as the positive class.

## Test yourself

1. Flip all three output weights negative and invert which side counts as positive.
2. Push w31 to near an extreme, plus or minus 3, and watch one hidden edge swing hard.
3. Drag the point (x, y) into a far corner of the picture, well away from the boundary.

## Intuition

Imagine sorting blue dots from orange dots scattered across this picture using nothing but a ruler: one straight line can only ever split them into two plain halves, and if the true boundary curves, the ruler gets some dots wrong no matter how you turn it. This network has three hidden units instead of one ruler, and each one draws its own separate cut across the picture. Every hidden unit looks at the current point, written $(x,y)$, computes its own weighted sum of the two coordinates, and bends that sum with an activation function. That bending function has a name, $\phi$, and you can watch it reshape the boundary as the weights change.

The output layer then combines the three bent lines into one boundary. Each hidden unit's line is weighted by a number called $v_i$ before being added together, and a final number, the bias $b$, shifts the whole result up or down. What comes out can curve, notch or even enclose a region entirely — shapes a single ruler could never produce. More hidden units simply mean more bends available to combine, which is the entire reason networks add hidden layers at all.

## Formal

Each hidden unit computes $h_i = \phi(w_{i1}x + w_{i2}y)$ for $i=1,2,3$, its own linear combination of the two inputs passed through a non-linear activation. The output combines them as $\hat y = \sum_{i=1}^{3} v_i h_i + b$, a weighted sum of the hidden activations plus a bias.

This is a two-layer network: one hidden layer of three units, one output unit. Every weight, twelve numbers in total here, is a knob that reshapes the final decision boundary; a real training procedure adjusts every one of them by gradient descent on a loss, exactly as in the earlier lessons, just with more numbers to adjust at once.

## Advanced

With enough hidden units, a network like this one can approximate essentially any continuous decision boundary to arbitrary accuracy, a result known as the universal approximation theorem — but the theorem says nothing about how many units are needed or whether gradient descent will actually find good weights; real networks stack many hidden layers rather than widening a single one, because depth tends to reach useful, trainable solutions far more efficiently than width alone.

## Derivation

1. Each hidden unit computes its own weighted sum of the two inputs.
2. That sum is bent by the activation function into the hidden unit's output.
3. The output layer combines all three hidden outputs into a single weighted sum plus a bias.

## Real world

### Image recognition
Early layers in a vision network act like these hidden units, each detecting one simple pattern like an edge or a corner.

### Voice assistants
Speech recognition networks stack many such layers to turn a sound wave into recognized words.

### Chat assistants
The networks behind chat assistants are the same idea scaled up to billions of weights across many stacked layers.

### Fraud detection
Banks combine many weighted signals about a transaction through a network like this one to flag likely fraud.
