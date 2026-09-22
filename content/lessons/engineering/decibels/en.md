---
title: Decibels
summary: >-
  Power ratios in the real world span factors of millions, so engineers
  compress them onto a scale where doubling always adds the same 3 dB,
  no matter how big the numbers underneath.
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

## Try it

1. Watch the curve. It plots the decibel level $L$ for a power ratio $x$, squeezing a huge range onto a small vertical scale.
2. Drag $x$ from 1 toward a million. The curve rises fast at first, then flattens almost completely.
3. Notice that every time you double $x$, $L$ climbs by the same 3 dB, no matter where you started.

## Real-life examples

1. **Turning up a speaker just slightly.** Doubling the electrical power sent to a speaker (x = 2) raises the sound level by exactly 3 dB — a small but just-noticeable jump in loudness.
2. **An audio amplifier stage.** A preamp that boosts a weak microphone signal's power a thousandfold (x = 1,000) delivers 30 dB of gain, typical of a single amplification stage.
3. **A long fiber-optic repeater chain.** By the time optical amplifiers restore a signal that has lost a millionfold in power (x = 1,000,000) over a long cable run, they have added back 60 dB of gain.

## Test yourself

1. Find the power ratio that gives a level of exactly 45 dB.
2. Find the power ratio that gives a level close to 50 dB.
3. Find a ratio where the level exceeds 55 dB while staying under half the maximum ratio on the slider.

## Intuition

A whisper measures about 20 dB and a jet engine about 140 dB — a difference so large that describing it in raw power would mean writing a 1 followed by twelve zeros. The curve on screen plots $L$, the level in decibels, against $x$, the ratio of the power you're measuring to a fixed reference power. Drag $x$ from 1 up toward a million and the curve rises fast at first, then flattens almost completely, because each extra factor of ten in power only adds another fixed 10 dB, no matter how huge the ratio has already become.

That squashing is exactly what your ears do naturally: a sound needs roughly ten times the power to seem twice as loud, so a scale that compresses huge power ranges into small, evenly spaced steps matches how loudness is actually perceived. A jump from 1 to 10 on the slider looks the same size on the curve as a jump from 100,000 to 1,000,000 — both add exactly 10 dB.

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
