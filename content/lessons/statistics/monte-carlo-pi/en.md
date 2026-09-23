---
title: Estimating π by throwing darts
summary: >-
  Throw darts at random points inside a square with a circle inscribed in
  it; four times the share that lands inside the circle estimates π, and
  the error shrinks the more darts you throw.
parameters:
  N: darts thrown
  speed: throw speed
variables:
  - the dart's left-right position inside the square, from −1 to 1
  - the dart's up-down position, from −1 to 1
  - how many darts have landed inside the circle so far
  - how many darts you've thrown in total
charts:
  - title: Typical error in the estimate
    xLabel: N (darts)
    yLabel: error
    series:
      - ≈ 1.64/√N
---

## Try it

1. Watch the darts land. Each one is a random point inside the square, and the circle is inscribed exactly inside it.
2. Raise "N". More darts land, and the running estimate of π on the right keeps changing less and less.
3. Raise "speed" to throw faster, then compare the final estimate to the true value of π.

## Real-life examples

1. **Fifty darts.** A quick, rough estimate of π — often off by a few tenths.
2. **Five hundred darts.** The estimate settles down to about one correct decimal digit.
3. **Two thousand darts.** The estimate is close enough that the error is usually under one percent.

## Test yourself

1. Throw at least 1000 darts.
2. Set the dart count to about 200.
3. Set the throw speed to at least 200 darts per second.

## Intuition

Draw a square 2 units wide and inscribe a circle inside it, touching all four sides. The square's area is 4; the circle's area is π. So if you throw darts at completely random points inside the square, the fraction that land inside the circle should be about π/4 — and multiplying that fraction by 4 gives an estimate of π itself.

With only a few darts the estimate jumps around wildly: 50 darts might give 2.96 or 3.36. Throw many more and the wild jumps calm down, because each new dart only nudges the running fraction a little. The picture on screen is exactly this process happening live — watch the number on the right stop swinging as more darts land.

## Formal

Draw $(x, y)$ uniformly at random with $x, y \in [-1, 1]$, and count it as a hit when $x^2 + y^2 \le 1$. After $N$ darts with $k$ hits, $4k/N$ is an unbiased estimator of $\pi$, since $P(\text{hit}) = \pi/4$, the ratio of the circle's area to the square's.

The estimator's standard error is $\sqrt{\dfrac{p(1-p)}{N}}$ with $p = \pi/4$, so the error in the π estimate, $4$ times that, shrinks in proportion to $1/\sqrt{N}$: multiplying the darts by 4 only halves the typical error.

## Advanced

This is the simplest case of the Monte Carlo method: replacing an integral — here, the circle's area — with the average of random samples. The same idea scales to problems with far too many dimensions for a grid of sample points to be practical, such as pricing complex financial derivatives or simulating how neutrons scatter through a reactor shield, both historically important reasons the method was developed.

## Derivation

1. Each dart lands at a point $(x, y)$ chosen uniformly at random inside the square.
2. It's a hit whenever $x^2 + y^2 \le 1$, meaning it fell inside the circle.
3. Four times the hit fraction estimates π: $\pi \approx 4k/N$.

## Real world

### Physics simulations
Monte Carlo methods estimate how particles scatter and absorb in nuclear reactors and medical radiation treatment, problems too complex to solve with a direct formula.

### Financial risk
Banks estimate the value and risk of complicated financial contracts by simulating thousands of random possible futures and averaging the outcomes.

### Computer graphics
Modern realistic rendering traces thousands of random light rays per pixel and averages the results, a Monte Carlo estimate of how much light actually reaches the camera.

### Testing random number generators
Because the expected estimate of π is known exactly, throwing darts like this is a simple sanity check that a random number generator isn't secretly biased.
