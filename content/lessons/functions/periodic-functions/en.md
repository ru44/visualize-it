---
title: Periodic functions
summary: Describe a repeating pattern using its period, amplitude and middle value.
parameters:
  x: input x
  A: amplitude A
  T: period T
  D: middle value D
variables:
  - distance from the middle value to a peak
  - input interval for one complete repeat
  - middle value between the highest and lowest outputs
  - input position, such as elapsed time
  - output at the selected position
---

## Try it

1. Set A to 3, T to 4 and D to 6. At x = 0 and x = 4, the output is 9. At x = 2 it is 3.
2. Change T to 2. The same rise-and-fall pattern now fits into an input interval of 2 instead of 4.
3. Keep T fixed and change A or D. A changes the distance from the middle to the peaks; D moves the whole wave vertically.

## Real-life examples

1. **A seasonal illustration.** A = 4, D = 12 and T = 12 give values between 8 and 16, repeating every 12 input units. This could illustrate daylight hours, with month zero chosen at a maximum; it is not a city's measured daylight record.
2. **A tide-like illustration.** A = 1.2, D = 1.5 and T = 12.4 give heights from 0.3 to 2.7. This is a single repeating component, not a complete tide prediction.
3. **A repeating signal.** A = 1, D = 0 and T = 0.8 give one cycle every 0.8 seconds, or 75 cycles per minute. The cosine is not the shape of an actual heartbeat trace.

## Test yourself

1. Set T to about 12 and A to about 4, each within 0.3 of its target.
2. Make T less than 1 and D less than 2.
3. Make the highest output, A + D, within 0.3 of 16.

## Intuition

A pattern is periodic if the same input step reproduces all its outputs. In the default wave, moving four units to the right brings you to the same height, wherever you start. Those four units make one period. Matching just one pair of points is not enough; the whole pattern must repeat.

The middle value is 6. Peaks are at 9 and troughs at 3, so each lies 3 units from the middle. That distance is the amplitude. The full peak-to-trough distance is 6, twice the amplitude.

Changing the period changes how closely the repeats are spaced. Changing the amplitude changes their height. Changing the middle value raises or lowers them together. These controls let you separate three features that can otherwise look like one complicated change.

## Formal

A positive T is a period when $f(x+T)=f(x)$ for every input in the domain. If there is a smallest positive period, it is called the fundamental period.

For $f(x)=A\cos(2\pi x/T)+D$ with A positive and T positive, the fundamental period is T, the amplitude is A, and the outputs range from D minus A to D plus A. The cosine begins at a maximum when x is zero.

## Advanced

A constant function repeats after every positive shift and has no smallest positive period. More complicated repeating signals can be expressed or approximated by combinations of sine and cosine components under suitable conditions. A single cosine is a model component, not an exact description of every natural cycle.

## Derivation

1. Replace x by x + T. The angle inside the cosine increases by one full turn, or two pi radians.
2. Cosine has the same value after adding a full turn.
3. The output therefore returns to f(x), proving that T is a period.

## Real world

### Rotating motion

The height of a point on a wheel rotating at constant speed follows a sinusoidal pattern relative to the wheel's centre.

### Sound

A repeating pressure signal has a frequency equal to the number of cycles per second. Shorter periods mean higher frequency.

### Seasonal models

A periodic model can represent a recurring seasonal component, while the actual observations can differ from it.
