---
title: Sound intensity and decibels
summary: 'Connect intensity ratios to decibel differences, then calculate how an ideal point source’s level falls with distance.'
parameters:
  dB0: 'β₀ — intensity level at 1 m'
  r: 'r — distance from the source'
variables:
  - 'intensity level and its reference-distance value'
  - 'intensity and the fixed reference intensity'
  - 'total acoustic power of the ideal source'
  - 'distance and reference distance of 1 m'
---

## Try it

1. Set the level at 1 m to 100 dB and r = 1 m. The received level is 100 dB and the distance-related drop is zero.
2. Move to r = 2 m, then 4 m. Each doubling lowers the model's level by about 6.02 dB.
3. Set r = 10 m. The level is 80 dB, a 20 dB drop. Raise the source's reference level by 10 dB; the received level also rises by 10 dB.

## Real-life examples

1. **At the reference distance.** A model source rated 30 dB at 1 m gives 30 dB at r = 1 m.
2. **Five metres away.** A source rated 90 dB at 1 m gives about 76.0 dB at 5 m, a drop of about 14.0 dB.
3. **A hundred metres away.** A source rated 140 dB at 1 m gives 100 dB at 100 m in this ideal model. The setting is not a measurement of a particular engine or venue.

## Test yourself

1. Find settings that give a calculated level of 85 dB.
2. Find settings that give a calculated level of 120 dB.
3. Make the calculated level less than 30 dB.

## Intuition

Imagine the same sound power spreading evenly over larger and larger spheres. Doubling the distance makes the sphere's area four times as large. Each square metre then receives one quarter of the power. This power per area is intensity. The model assumes an isolated point source in open space, without reflections or absorption.

Decibels express a ratio on a logarithmic scale. Ten times the intensity adds 10 dB; one hundred times adds 20 dB. These are intensity ratios, not equal ratios of perceived loudness. The distance axis is logarithmic too: the spacing from 1 to 10 m matches the spacing from 10 to 100 m. That makes this inverse-square law appear as a straight line in the plot.

## Formal

For an isotropic point source of acoustic power P, $I=P/(4\pi r^2)$. Intensity level is $\beta=10\log_{10}(I/I_0)$ with reference $I_0=10^{-12}\ \mathrm{W/m^2}$. This is a reference value, not a universal hearing threshold for every person and frequency.

Using the same source at reference distance $r_0=1\ \mathrm{m}$, the level is $\beta(r)=\beta_0-20\log_{10}(r/r_0)$. Doubling r changes it by $-20\log_{10}2\approx-6.02\ \mathrm{dB}$. A negative decibel value means intensity below the reference, not negative physical intensity.

## Advanced

Intensity level, sound pressure level and frequency-weighted measurements are distinct quantities. In a progressive plane wave with fixed acoustic impedance, intensity is proportional to squared pressure amplitude; this produces a 20-log formula for pressure ratios. The current illustration predicts ideal geometric spreading only. It does not measure exposure or determine hearing safety.

## Derivation

1. Divide constant acoustic power by the area of a sphere centred on the source.
2. Express intensity relative to the fixed reference using a base-ten logarithm.
3. Take the level difference between two distances; the inverse-square intensity ratio becomes a minus-20-log distance term.

## Real world

### Comparing measurements

A decibel value needs a stated reference and measurement type. A difference of 10 dB in intensity level corresponds to a factor of ten in intensity.

### Sound in rooms

Walls, absorption and source directionality alter the simple distance rule. The open-space point-source calculation is a starting model, not a complete room prediction.
