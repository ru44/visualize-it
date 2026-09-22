---
title: 'Amplitude, frequency, phase and shift'
summary: >-
  Four numbers fully describe any sinusoid: how tall it is, how fast it
  oscillates, where it starts, and where it sits vertically.
parameters:
  A: amplitude A
  w: angular frequency ω
  phi: phase φ
  D: vertical shift D
  x: x (drag along the curve)
variables:
  - amplitude — how far above and below the midline it swings
  - angular frequency — how quickly the argument advances
  - phase — shifts the whole pattern left or right
  - vertical shift — the midline the curve oscillates around
---

## Try it

1. Watch the curve: it's a wave rising and falling between a highest and lowest point.
2. Drag «amplitude A» up. The wave stretches taller without moving its midline.
3. Drag «vertical shift D» up instead. The whole wave, midline and all, slides straight up.

## Real-life examples

1. **AC electricity.** Mains voltage swings with a large amplitude and completes many cycles per second — set «amplitude A» to 3 and «angular frequency ω» to 3 to see a fast, tall wave like it.
2. **Ocean tide.** Sea level rises and falls slowly around an average height: amplitude 1.5, a slow angular frequency of 0.2, and a baseline shift of 2.
3. **Seasonal temperature swing.** Average daily temperature swings by 4 units over the year around a baseline of 1, completing just one slow cycle — angular frequency 0.2.

## Test yourself

1. Make the wave's peak, vertical shift plus amplitude, reach 5.
2. Make the period longer than 20 units while keeping the amplitude above 3.
3. Push the wave's trough, vertical shift minus amplitude, below −2, while making it oscillate fast with a period under 5.

## Intuition

Mains electricity swings between a highest and lowest voltage many times each second — that's a sinusoid in action. Increase «amplitude A» and the whole curve on screen stretches vertically without changing where it crosses its midline; increase «vertical shift D» and it slides straight up, midline and all — the two sliders affect height and position independently.

Increase «angular frequency ω» and the peaks bunch closer together — the curve repeats faster because the same full turn of angle is covered over a shorter stretch of x. Change «phase φ» and nothing about the shape changes at all, only where it starts: the whole curve just slides left or right.

## Formal

Period $T = 2\pi/\omega$; the curve oscillates between $D - A$ and $D + A$.

The tangent slope at any $x$ is $A\omega\cos(\omega x + \varphi)$ — steepest at the midline crossings, zero at the peaks and troughs.

## Advanced

Any sinusoid $A\sin(\omega x + \varphi)$ can be rewritten as $a\sin(\omega x) + b\cos(\omega x)$ with $a = A\cos\varphi$, $b = A\sin\varphi$ — the amplitude/phase form and the sum-of-sine-and-cosine form are the same two degrees of freedom, just in polar versus Cartesian coordinates.

## Derivation

1. Start from the general form.
2. Differentiate using the chain rule: derivative of the inner linear argument is $\omega$.
3. Extremes occur where $f'=0$; the period follows from when the argument advances by $2\pi$.

## Real world

### AC electricity
Mains voltage is $A\sin(\omega t + \varphi)$; $\omega$ sets 50/60 Hz and $\varphi$ captures phase differences between circuits.

### Tides
Sea level oscillates with an amplitude, a roughly 12-hour period, and a phase that depends on the coastline.

### Audio synthesis
A musical tone is built from sinusoids whose amplitude sets loudness and frequency sets pitch.

### Seasonal data
Average daily temperature over a year is well fit by a sine with a 12-month period and a vertical shift equal to the yearly mean.
