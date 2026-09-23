---
title: Periodic functions
summary: >-
  Some functions never settle down and never run off to infinity either —
  they just repeat, forever, like daylight hours through the year or the
  beat of a heart.
parameters:
  x: point x
  A: A — amplitude
  T: T — period
  D: D — midline
variables:
  - the amplitude — how far the curve swings above and below its midline
  - the period — the length of x after which the whole pattern repeats
  - the midline — the height the curve swings evenly around
  - the input being dragged along the curve
  - the output, the curve's height at that input
---

## Try it

1. Drag the point x slowly across the whole graph. Watch the curve rise and fall, rise and fall — the same shape over and over.
2. Shrink the slider «T — period» down. The repeats squeeze closer together; the same wave now happens more often.
3. Raise «D — midline» or «A — amplitude» and watch the whole wave shift up or stretch taller, while it keeps repeating at exactly the same rate.

## Real-life examples

1. **Daylight hours through the year.** In a mid-latitude city, daylight length follows A=4, D=12, T=12 (months): hovering around 12 hours, swinging up to 16 in summer and down to 8 in winter, repeating every 12 months.
2. **Ocean tides.** Tide height follows A=1.2, D=1.5, T=12.4 (hours): rising and falling around a 1.5 m average every 12.4 hours, the real rhythm the moon drives.
3. **A heartbeat trace.** A heart monitor's pulse follows A=1, D=0, T=0.8 (seconds): one full up-and-down sweep every 0.8 seconds, about 75 beats a minute.

## Test yourself

1. Match the daylight example: set the period to 12 and the amplitude to 4.
2. Make the curve repeat faster than once per unit — a period under 1 — while keeping the midline below 2.
3. Make the curve's highest point reach exactly 16.

## Intuition

In a mid-latitude city, daylight lasts about 12 hours on average, climbing to 16 hours at the height of summer and dropping to 8 in the depth of winter, then doing it all again the next year. That whole yearly rhythm is one curve here: drag the point x from month 0 across to month 12 and back, and its height traces exactly that rise and fall, landing on the same height at month 12 that it started at month 0 — one full repeat.

Any two points on the curve exactly «T — period» apart always sit at the same height, no matter where you start counting — that is what it means for a curve to repeat. Shrink T and the whole wave compresses, packing its rise-and-fall into a shorter stretch, the way a resting heart's steady beat repeats roughly every 0.8 seconds compared to a slow, 12.4-hour tide; raise or lower «A — amplitude» and «D — midline» instead and the wave grows taller or shifts up and down without changing how often it repeats at all.

## Formal

A function is periodic when repeating the same step in its input, $T$, always gives back the same output: $f(x+T) = f(x)$ for every $x$. The smallest such $T$ greater than zero is called the period.

For $f(x) = A\cos\left(\frac{2\pi x}{T}\right) + D$, the period is exactly $T$, the amplitude $A$ sets how far the curve swings above and below its midline, and $D$ is that midline itself — all three readable straight off the graph.

## Advanced

Real repeating signals are rarely this clean — tides really follow two overlapping periods, one lunar and one solar, and a heartbeat's timing drifts slightly from beat to beat — but a single sine or cosine like this one is the basic building block. Stacking several of them at different periods and amplitudes, a technique called a Fourier series, can approximate almost any repeating shape, however jagged.

## Derivation

1. Step the input forward by one whole period: $f(x+T) = A\cos\left(\frac{2\pi(x+T)}{T}\right)+D$, and the fraction inside splits apart into $\frac{2\pi x}{T} + 2\pi$.
2. Cosine repeats every full turn of the circle, so adding $2\pi$ inside it changes nothing: $\cos(\theta+2\pi) = \cos\theta$.
3. That extra $2\pi$ simply vanishes, leaving $f(x+T) = f(x)$ — stepping forward by $T$ always lands back on the same output.

## Real world

### Daylight through the seasons
Day length rises and falls once a year in a smooth curve, driven by Earth's tilt as it orbits the sun.

### Ocean tides
Tide height rises and falls roughly every 12.4 hours, driven by the pull of the moon as Earth spins beneath it.

### Heart rate monitors
A healthy heartbeat traces the same up-and-down shape again and again, and a sudden change in that period is often the first sign a monitor flags.

### Musical notes and sound waves
A musical note is air pressure oscillating in a periodic pattern; the period sets the pitch you hear.
