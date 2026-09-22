---
title: Activation functions
summary: >-
  Stack a thousand straight lines and you still only get a straight line;
  bend each one first with a curve like this and the stack can learn a face.
parameters:
  sel: curve — 0 sigmoid, 1 tanh, 2 ReLU
  x: x — the input value
variables:
  - the sigmoid curve, squashed between 0 and 1
  - the tanh curve, squashed between -1 and 1
  - the ReLU curve, zero for negative input, a straight line after
charts:
  - title: The three activation curves compared
    xLabel: x
    yLabel: output
    series:
      - sigmoid
      - tanh
      - ReLU
---

## Try it

1. Set curve to sigmoid and drag x across its range. Watch the output stay squashed between 0 and 1 no matter how far x goes.
2. Set curve to tanh and drag x again. The output now swings between -1 and 1 instead, keeping the same S shape as sigmoid.
3. Set curve to ReLU and drag x from negative to positive. The output sits flat at 0 for every negative x, then rises as a plain straight line past zero — no curve at all.

## Real-life examples

1. **Sigmoid pushed to its limit.** With curve set to sigmoid and x at 3, the output already sits almost pinned to 1, barely different from x at 4.
2. **Tanh pushed to its limit.** With curve set to tanh and x at -3, the output already sits almost pinned to -1.
3. **ReLU in its straight region.** With curve set to ReLU and x at 2, the output is exactly 2 — here the curve is nothing but the input itself.

## Test yourself

1. Select sigmoid and push x above 3 to see the curve flatten near 1.
2. Select tanh and push x below -3 to see the curve flatten near -1.
3. Select ReLU and land exactly on x = 2.5 — check that the output equals x exactly.

## Intuition

Feed the number 3 into a plain neuron with no bend at all and it comes back out as 3, a straight, unlimited answer. Set curve to sigmoid and drag x to that same 3 instead, and the output comes back squashed to almost 1; drag x down to -3 and it comes back squashed to almost 0. The straight, unlimited line has been bent into a curve with a floor and a ceiling.

If every neuron in a network bent its output like this, or not at all, stacking more layers would still buy nothing when there is no bend: a straight line feeding a straight line is still just a straight line, no matter how many layers deep. The three curves in the chart below all bend differently. Sigmoid and tanh squash everything into a fixed range and go nearly flat far from zero; ReLU instead stays perfectly straight for positive input and sits at exactly zero for negative input, a simpler bend that trains faster in practice and is what most modern networks use in their hidden layers.

## Formal

The sigmoid $\sigma(x) = \frac{1}{1+e^{-x}}$ and $\tanh(x)$ are both smooth S-shaped curves; $\tanh$ is just a rescaled sigmoid that outputs $(-1, 1)$ instead of $(0, 1)$, which often makes training a little easier because its output is centred on zero.

$\mathrm{ReLU}(x) = \max(0,x)$ replaces the smooth bend with a sharp corner at zero: for $x>0$ it is the identity, for $x\le 0$ it is exactly 0, and this piecewise-linear shape is cheap to compute and keeps the gradient from shrinking to nothing across many layers, a problem sigmoid and tanh both suffer from.

## Advanced

Sigmoid and tanh both saturate for large $|x|$, meaning their slope approaches zero there, which starves earlier layers of a useful gradient signal during training — the vanishing-gradient problem. ReLU's constant slope for $x>0$ largely sidesteps this, at the cost of a "dead neuron" failure mode where a unit stuck permanently in the $x\le 0$ region stops learning entirely; variants like leaky ReLU and GELU exist specifically to patch that weakness while keeping ReLU's cheap, gradient-friendly shape.

## Derivation

1. The sigmoid squashes any real input into the open interval between 0 and 1.
2. Tanh does the same squashing but centred on zero, between -1 and 1.
3. ReLU keeps positive input unchanged and zeroes out everything negative.

## Real world

### Image recognition
Vision networks stack many layers of ReLU activations to recognize edges, shapes and eventually whole objects.

### Spam filters
The final layer of a spam classifier often uses sigmoid to turn its last score into a probability of being spam.

### Speech recognition
Older speech and handwriting recognition networks relied heavily on tanh activations in their hidden layers.

### Chat assistants
The hidden layers inside a chat assistant's network stack activation functions like these by the billions to shape its responses.
