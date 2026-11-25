---
title: 'Amplitude, frequency, phase and shift'
summary: 'Change the height, spacing and position of a sine curve, and distinguish amplitude from its midline.'
parameters:
  A: 'A — amplitude'
  w: 'ω — angular frequency'
  phi: 'φ — phase in radians'
  D: 'D — midline height'
  x: 'x — selected input'
variables:
  - 'A: distance from midline to peak'
  - 'ω: increase in the sine angle per x-unit'
  - 'φ: angle added to the sine input'
  - 'D: height of the midline'
---

## Try it

1. Set A = 2, ω = 1, φ = 0 and D = 0. The curve ranges from −2 to 2. Change A to 3: the midline stays at zero.
2. Keep A = 3 and set D = 1. The range becomes −2 to 4 because every output increases by 1.
3. Increase ω from 1 to 2 to halve the distance between peaks. Then change φ: the pattern moves horizontally. Drag x to inspect the value and tangent slope at a point.

## Real-life examples

1. **A shorter cycle.** A = 3, ω = 3, φ = 0 and D = 0 give a range of −3 to 3 and a period of about 2.09 x-units.
2. **A shifted midline.** A = 1.5, ω = 0.2, φ = 1 and D = 2 give a range of 0.5 to 3.5. The period is about 31.42, longer than the displayed window.
3. **A larger slow cycle.** A = 4, ω = 0.2, φ = 3 and D = 1 give a full-cycle range of −3 to 5 and the same period of about 31.42. The visible segment need not contain both extremes.

## Test yourself

1. Make the full-cycle maximum D + A equal 5.
2. Make the period greater than 20 x-units and A greater than 3.
3. Make the full-cycle minimum D − A less than −2 and the period less than 5 x-units.

## Intuition

A sine curve repeats an up-and-down pattern. With $A=2$ and $D=1$, its middle level is 1 and it reaches two units above and below that level: from −1 to 3. Amplitude measures the distance from the midline to a peak, so the distance from trough to peak is twice the amplitude.

The expression inside sine controls progress around the cycle. Increasing $\omega$ covers a full cycle in less horizontal distance. Increasing $\varphi$ shifts the curve left when ω is positive; it does not change the height or period. The x control selects the point being inspected, without changing the curve itself.

## Formal

For $f(x)=A\sin(\omega x+\varphi)+D$ with the positive A and ω used here, the midline is $y=D$, the full-cycle range is $[D-A,D+A]$, and the period is $T=2\pi/\omega$. The angle inside sine is in radians. If x represents time, ordinary frequency is $1/T=\omega/(2\pi)$ cycles per time unit.

The horizontal shift is $-\varphi/\omega$. The tangent slope is $f'(x)=A\omega\cos(\omega x+\varphi)$: zero at peaks and troughs, with greatest magnitude at midline crossings. This is a rate of change, not the wave's height.

## Advanced

If negative amplitudes are allowed, the amplitude is |A|; a negative coefficient reverses the curve about its midline. For nonzero negative ω the period is 2π/|ω|. The sliders here keep both parameters positive. The fixed plotting window can hide part of a high or slowly varying curve.

## Derivation

1. Begin with sine, stretch it vertically by A, change its angular input, and add D to each output.
2. Differentiate: the inner angle changes at rate ω, so the chain rule multiplies the cosine by Aω.
3. Sine ranges from −1 to 1, giving the extremes. One full cycle requires the inner angle to increase by 2π, giving the period.

## Real world

### A repeating motion model

A point rotating uniformly has a sinusoidal vertical coordinate. Its radius sets the amplitude, its rotation rate sets the period, and its centre sets the midline.

### Fitting repeated measurements

A sine curve can approximate a smooth repeated pattern. Check the measurements before assuming that the period and amplitude stay constant.
