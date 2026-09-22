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

## Intuition

Increase $A$ and the whole curve stretches vertically without changing where it crosses its midline; increase $D$ and it slides straight up, midline and all — the two knobs affect height and position independently.

Increase $\omega$ and the peaks bunch closer together — the curve repeats faster because the same $2\pi$ of angle is covered over a shorter stretch of $x$. Change $\varphi$ and nothing about the shape changes at all, only where it starts: the whole curve just slides left or right.

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
