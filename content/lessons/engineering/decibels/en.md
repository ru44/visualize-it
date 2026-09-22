---
title: Decibels
summary: >-
  Power ratios in the real world span factors of millions, so engineers
  compress them onto a logarithmic scale where doubling always adds the same
  3 dB, no matter how big the numbers underneath.
parameters:
  x: x — power ratio P/P₀
variables:
  - L — the level in decibels, the quantity actually plotted
  - P — the power being measured
  - P_0 — the reference power that L is measured against
charts:
  - title: Doubling power
    xLabel: number of doublings
    yLabel: gain (dB)
    series:
      - dB gained
---

## Intuition

Drag x from 1 up toward a million and the curve rises fast at first, then flattens almost completely — because each extra factor of ten in power only adds another fixed 10 dB, however huge the ratio has already become. A jump from 1 to 10 looks the same size on the curve as a jump from 100,000 to 1,000,000.

That squashing is exactly what your ears do naturally: a sound needs roughly ten times the power to seem "twice as loud," so a scale that compresses huge power ranges into small, evenly spaced steps matches how loudness is actually perceived.

## Formal

The decibel level is $L = 10\log_{10}\frac{P}{P_0}$, a ratio compared against a reference power $P_0$, not an absolute amount of power by itself.

Because the logarithm turns multiplication into addition, doubling P always adds the same amount regardless of the starting point: $L(2P) - L(P) = 10\log_{10}2 \approx 3$ dB, and a tenfold increase always adds $10\log_{10}10 = 10$ dB.

## Advanced

Human sensory response to sound, brightness and even the Richter scale for earthquakes are all roughly logarithmic, which is why decibel-like scales show up across engineering wherever a quantity must represent a huge dynamic range in numbers people can actually compare at a glance.

## Derivation

1. Doubling the power changes the level by exactly $L(2P) - L(P) = 10\log_{10}2 \approx 3$ dB, regardless of the starting power.
2. A tenfold increase in power changes the level by exactly $L(10P) - L(P) = 10\log_{10}10 = 10$ dB, again regardless of the starting point.
3. The level is zero exactly when the power equals the reference, $L = 0 \iff P = P_0$.

## Real world

### Loudness and hearing
Everyday sounds range from a whisper near 20 dB to a jet engine near 140 dB — a factor of $10^{12}$ in power that the decibel scale turns into a manageable range of numbers.

### Phone signal bars
Phone signal strength is measured in dBm, decibels relative to one milliwatt; a change from −70 dBm to −80 dBm is a tenfold drop in actual signal power, not a small one.

### Amplifier and cable specs
Audio and radio-frequency equipment is rated in dB of gain or loss, so an engineer can add or subtract stages along a signal chain instead of multiplying raw power ratios.

### Hearing-safety limits
Workplace noise limits are set in dB because a jump of just 3 dB doubles the sound power reaching an ear, which is why permitted exposure time is cut in half for every 3 dB increase.
