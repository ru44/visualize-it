---
title: The loss landscape
summary: >-
  Every training run, from a two-number line fit to a billion-weight chatbot,
  is the same walk downhill on a landscape of error — feel that walk in 3D.
parameters:
  x0: x — first weight being tuned
  y0: y — second weight being tuned
variables:
  - the two weights being adjusted
  - the loss, the height of the landscape at (x, y)
  - the gradient, the uphill direction at the current point
  - the learning rate, how far each step moves
---

## Try it

1. Drag x0 and y0 around. Watch the tangent plane tilt and the arrow point in the steepest uphill direction from wherever you stand.
2. Walk opposite the arrow a few times by hand — each move should bring you closer to the bottom of the bowl.
3. Land exactly on (1, -0.5), the lowest point. Notice the arrow shrinks to almost nothing: a flat gradient means you have reached a minimum.

## Real-life examples

1. **Starting far from the bottom.** With both weights pushed out to 2.5 and 2, the surface sits high and steep, like a model whose numbers are still far from anything useful.
2. **Sitting exactly at the minimum.** At weights (1, -0.5) the ground is level in every direction — there is nothing left here for training to fix.
3. **On the far slope.** With weights at -2 and -2, the surface is high again, but on the opposite side of the bowl from where training started.

## Test yourself

1. Land exactly on the minimum, at weights (1, -0.5).
2. Find a point where the surface is high, with a loss above 15.
3. Match the minimum's y-weight exactly, but stay far from it in x — notice the ground can be level in one direction without being the true bottom.

## Intuition

Picture two dials on a machine, each one a weight it can turn, and imagine every possible setting of those two dials mapped to a height on a hillside: high where the machine is very wrong, low where it works well. Turn the dials and you choose a point on that hillside, written $(x, y)$ for short. The height there has a name: $L$, the loss. Training is a hiker standing somewhere on this hillside trying to reach the lowest valley, but blindfolded — the only thing they can feel is which way is downhill right where they stand, which is exactly what the arrow on screen shows.

That local downhill direction is what the gradient $\nabla L$ gives, and it always points uphill, so a training step subtracts it. The learning rate $\eta$ decides the size of each stride: too small and the hike takes forever, too large and the hiker can stride straight over the valley and end up higher on the far slope.

## Formal

For this bowl, $L(x,y) = (x-1)^2 + 2(y+0.5)^2$ and its gradient is $\nabla L = \left(\frac{\partial L}{\partial x}, \frac{\partial L}{\partial y}\right) = (2(x-1),\ 4(y+0.5))$, a vector that vanishes exactly at the minimum $(1, -0.5)$.

Gradient descent repeats the update $(x,y) \gets (x,y) - \eta\,\nabla L$; because this particular bowl is convex, the same shape in every direction, this update is guaranteed to reach the bottom for any small enough $\eta$.

## Advanced

Real loss landscapes for large models are nothing like this tidy bowl: they live in millions or billions of dimensions and are riddled with flat plateaus, narrow ravines and saddle points, places where the gradient is zero but it is not a true minimum in every direction. Local minima turn out to be less of a problem in very high dimensions than intuition suggests, but plateaus and ravines are why practical training uses tricks like momentum and adaptive step sizes rather than the fixed-rate update shown here.

## Derivation

1. Write the height of the landscape as a function of the two weights.
2. Differentiate with respect to each weight to get the gradient, the uphill direction.
3. Subtract the gradient, scaled by the learning rate, to take one step downhill.

## Real world

### Training neural networks
Every layer of a deep network is a set of weights being walked downhill on exactly this kind of landscape, just with vastly more dimensions.

### Engineering design
Shape optimizers walk downhill on a landscape of drag or material cost to refine a car body or aircraft wing.

### Portfolio optimization
Financial models walk downhill on a landscape of risk to find a mix of investments that fits a target return.

### Robotics control
Robot controllers tune their parameters by walking downhill on a landscape of tracking error between the intended and actual motion.
