---
title: Inverse functions
summary: >-
  Undo a rule and get your original input back — the same trick that turns
  Celsius into Fahrenheit and, run backward, turns Fahrenheit right back
  into Celsius.
parameters:
  m: m — slope
  b: b — intercept
  x: input x
variables:
  - the rate at which the rule scales its input
  - the fixed amount the rule adds
  - the input point, shown on the blue line f and mirrored onto the orange line f⁻¹
---

## Try it

1. Drag the blue point along «f». Its mirror image appears on the orange line «f⁻¹», the same distance from the dashed diagonal but on the other side.
2. Read the bottom number: f⁻¹(f(x)) always comes back to x, no matter where you drag — that is what "undo" means.
3. Raise «m» or «b». Both lines move, and both points slide to stay mirrored across the dashed y = x diagonal.

## Real-life examples

1. **Celsius to Fahrenheit and back.** At m=1.8, b=32, a temperature of x=20°C converts to 68°F; running the inverse on 68 gives back exactly 20.
2. **Miles to kilometres and back.** At m=1.609, b=0, a distance of x=10 miles converts to 16.09 km; the inverse turns 16.09 back into exactly 10.
3. **Halving a recipe and doubling it back.** At m=0.5, b=0, a recipe of x=10 cups scales down to 5 cups; the inverse doubles 5 back into exactly 10.

## Test yourself

1. Find m, b and x so f(x) comes out to exactly 300.
2. Make f its own inverse: find m and b so f(x) = x for every input.
3. Find m, b and x so the inverse function sends x to exactly −10.

## Intuition

A thermometer converts Celsius to Fahrenheit with one fixed rule: multiply by 1.8, then add 32. Drag the blue point along the blue line «f» here and watch its mirror, the orange point, appear on the orange line «f⁻¹» — always on the opposite side of the dashed diagonal, the same distance away. That mirroring is not a coincidence: the inverse function is built by swapping every input with its output, and swapping a point's coordinates is exactly what reflecting it across y = x does.

Read the bottom number under the picture: f⁻¹(f(x)) is always x again, wherever you drag the point. Apply the rule, then undo it, and you land back where you started — that is the entire meaning of an inverse function, and this lesson's whole picture is built to make that round trip visible.

## Formal

A function $f$ has an inverse $f^{-1}$ exactly when it is one-to-one: $f^{-1}(f(x)) = x$ for every $x$ in the domain. For $f(x) = mx + b$ with $m \neq 0$, solving $y = mx + b$ for $x$ gives $f^{-1}(x) = \dfrac{x-b}{m}$.

The graph of $f^{-1}$ is always the reflection of the graph of $f$ across the line $y = x$, because every point $(x, y)$ on $f$ becomes the point $(y, x)$ on $f^{-1}$.

## Advanced

Not every function has an inverse over its whole domain: a function must be one-to-one (injective) for $f^{-1}$ to exist as a function, which is why $f(x) = x^2$ needs its domain restricted, say to $x \ge 0$, before $f^{-1}(x) = \sqrt{x}$ makes sense.

## Derivation

1. Start from $y = f(x) = mx + b$, the rule that turns an input into an output.
2. Subtract $b$ from both sides so only the $mx$ term remains: $y - b = mx$.
3. Divide by $m$: $x$ is now written in terms of $y$ — swap the letters and this is the inverse function.

## Real world

### Unit conversions
Celsius↔Fahrenheit, miles↔kilometres and pounds↔kilograms are all pairs of inverse linear functions.

### Encoding and decoding
A cipher or a file compressor applies a function; decoding it applies the inverse, recovering the original exactly.

### Solving equations
Finding x from an equation like mx + b = k is nothing more than applying the inverse function to both sides.
