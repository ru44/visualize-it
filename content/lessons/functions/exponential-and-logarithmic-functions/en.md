---
title: Exponential and logarithmic functions
summary: >-
  One curve doubles or halves every equal step and shoots off the screen;
  its mirror image climbs so slowly it barely moves — the same pair of
  shapes behind decibels and earthquake magnitude.
parameters:
  x: point x
  sel: curve — 0 exponential, 1 logarithm
  b: b — base
variables:
  - the base — above 1 it grows (doubling-type), between 0 and 1 it decays (halving-type)
  - the input being dragged along the curve
  - the output — read directly off the exponential curve, or supplied to the logarithm curve
---

## Try it

1. Curve is set to exponential with base b=2. Drag x to the right. Watch the output double, then double again — every extra step of 1 on x doubles the height.
2. Drop the base below 1 instead, say to 0.5. The curve flips from climbing to sliding downward, homing in on zero but never quite touching it.
3. Switch the curve to logarithm. Drag x across the same stretch: the curve now climbs, but far more slowly, barely rising even as x itself keeps growing steadily.

## Real-life examples

1. **Doubling — a shared video.** Set to exponential with base 2 (sel=0, b=2): after x=3 rounds of sharing, the output has doubled three times over — 8-fold growth from wherever it started.
2. **Halving — a bouncing ball.** Set to exponential with base 0.5 (sel=0, b=0.5): after x=2 bounces, the ball's height has halved twice — a quarter of where it started, shrinking toward the ground with every bounce.
3. **The log's slow climb.** Set to logarithm with base 10 (sel=1, b=10): even after x=5, the curve has barely climbed past half a unit — the same slow-growing shape used for the decibel and earthquake-magnitude scales.

## Test yourself

1. Switch to the exponential curve, set the base above 1.9 — close to doubling — and push x past 3.5.
2. Switch to the exponential curve, set the base under 0.6 — a fast halving — and push x past 3.
3. Switch to the logarithm curve, set the base above 9 — close to the decibel scale's base 10 — and push x past 4.

## Intuition

Picture a video that gets reshared: each round, everyone who has it shares it with the same number of new people again. With base 2 that means every round doubles the total — after x=3 rounds the audience is 8 times its start, and dragging the point to x=3 on the exponential curve shows exactly that jump. Push x further and the curve doesn't just keep climbing, it climbs faster and faster, because each new round doubles a number that is already bigger than the last.

Drop the base below 1 and the same curve flips from a climb into a slide: a bouncing ball loses a fixed fraction of its height on every bounce, so its height after x bounces keeps shrinking toward the ground without ever quite touching it — the flat line the curve hugs but never crosses. Switch to the logarithm curve instead and the roles swap: now the curve climbs, but painfully slowly, because it is asking the reverse question, how many doublings did it take to reach this output, and doublings pile up value far faster than they pile up count.

## Formal

The exponential function $y = b^x$ takes any real $x$ and always returns a positive output. When $b > 1$ it grows, and when $0 < b < 1$ it decays instead, shrinking toward $0$ but never quite reaching it.

Its mirror, $x = \log_b y$, undoes exactly what the exponential does: feed it the output and it hands back the input. Because the input to $b^x$ must stay positive to be reversed, the logarithm itself only accepts $y > 0$, and its graph creeps upward extremely slowly, hugging a vertical line at $y=0$ that it can never cross.

## Advanced

Reflecting the graph of any invertible function across the line $y=x$ turns it into its inverse's graph, exactly the mirror-image relationship between $b^x$ and $\log_b x$ seen here. That compressing power is why decibel and earthquake-magnitude scales exist at all: sound intensity can span a factor of a trillion between a whisper and a jet engine, and a logarithmic scale turns that trillion-fold range into a manageable run of numbers from about 0 to 140.

## Derivation

1. Start from the exponential statement itself: $b^x = y$, the base raised to the input equals the output.
2. Apply $\log_b$ to both sides — a valid step because $\log_b$ is a genuine function, so equal inputs still give equal outputs: $\log_b(b^x) = \log_b y$.
3. The left side simplifies because $\log_b$ and raising $b$ to a power undo each other exactly, leaving $x = \log_b y$ — the same fact, now written as a logarithm.

## Real world

### Sound and decibels
Sound intensity ranges over a factor of roughly a trillion from a whisper to a jet engine; the decibel scale is a logarithm that squeezes that entire range into about 0 to 140.

### Earthquake magnitude
Each whole step up a Richter-style magnitude scale means roughly 32 times more energy released, a logarithmic scale hiding a huge exponential jump.

### Radioactive decay and half-life
A radioactive sample loses a fixed fraction of what remains in every equal stretch of time, the same halving shape as the decay curve here.

### Compound interest and viral growth
Money left to compound, or a trend that gets reshared at a steady rate, both grow by the same multiplying factor every equal step of time.
