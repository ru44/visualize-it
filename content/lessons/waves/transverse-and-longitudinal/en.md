---
title: Transverse and longitudinal waves
summary: >-
  A rope wiggles side to side while a slinky's coils bunch and stretch along
  its own length — two different ways a wave can shake a medium, and sound
  travels the second way.
parameters:
  f: frequency f
  lambda: wavelength λ
  A: amplitude A
variables:
  - the distance between one repeat of the pattern and the next
  - how many times per second each point repeats its motion
  - how far each point swings from its resting position
  - the wave number, how many radians of the pattern fit in one metre
  - the angular frequency, how many radians of oscillation happen each second
---

## Try it

1. Look at the top rope: each point moves up and down (transverse), while the pattern itself runs sideways.
2. Look at the bottom row of dots: each point only moves left and right, bunching close together in some places and spreading out in others (longitudinal) — that squeeze is exactly how sound moves through air.
3. Raise the wavelength slider λ. Both pictures stretch out: the rope's humps spread apart, and the dots' bunched clumps spread apart too, by the same amount.

## Real-life examples

1. **A long, slow rope wave.** A gentle, wide shake (λ = 3.5 m, f = 0.4 Hz) shows the up-and-down rope motion clearly, with wide, easy-to-count humps.
2. **A short, fast rope wave.** A quick, tight shake (λ = 1 m, f = 1.2 Hz) packs the humps close together and sends them past quickly.
3. **A medium wave, side by side.** A middling shake (λ = 2 m, f = 0.8 Hz) lets you compare the rope's sideways humps directly against the dots' bunching below it.

## Test yourself

1. Squeeze the wavelength down to 1 m, so the dots bunch tightly and often.
2. Stretch the wavelength past 3 m while keeping the frequency under 0.5 Hz — a long, slow wave in both pictures.
3. Push the frequency to its fastest, 1.5 Hz.

## Intuition

Hold one end of a rope and shake it up and down: a hump runs away from your hand, and if you watch any single point on the rope, it only ever moves up and down, never sideways. That sideways-traveling, up-and-down-shaking motion is a transverse wave — light and every wave on a string behave this way.

Now hold a slinky stretched out and push-and-pull one end along its own length instead of shaking it sideways. A pulse of bunched-up coils runs down the slinky, and if you watch one coil, it only ever slides back and forth along the slinky's length, never sideways. That is a longitudinal wave, and it is exactly how sound travels: air molecules bump the next ones forward, then spring back, passing a pulse of squeezed air (compression) and thinned-out air (rarefaction) down the room without any single molecule crossing the space.

## Formal

Both pictures share the same maths: a displacement $s(x,t) = A\sin(kx - \omega t)$, where $k = 2\pi/\lambda$ counts how many radians of pattern fit in each metre and $\omega = 2\pi f$ counts how many radians pass each second. The only difference is direction — in a transverse wave $s$ points perpendicular to the direction of travel; in a longitudinal wave $s$ points along it.

Where a longitudinal wave's displacement $s(x,t)$ is largest and pointing forward, particles crowd together into a compression; where it is largest and pointing backward, they spread apart into a rarefaction. The bottom row of dots on screen is drawn from that same $s(x,t)$, applied sideways instead of up and down.

## Advanced

Because a longitudinal wave needs particles that can be pushed together and pulled apart along the line of travel, it can move through anything that resists compression — gases, liquids and solids alike — which is why sound travels through air, water and steel. A transverse wave on a string needs tension holding the string taut to pull a displaced point back toward its neighbours; without that restoring sideways pull, a transverse mechanical wave has nothing to travel through, which is why sound in air is longitudinal, not transverse.

## Derivation

1. The wave number turns wavelength into a spatial rate: $k = 2\pi/\lambda$ radians per metre.
2. The angular frequency turns frequency into a rate in time: $\omega = 2\pi f$ radians per second.
3. Together they give the one formula both pictures are drawn from: $s(x,t) = A\sin(kx-\omega t)$.

## Real world

### Sound in air
Speech, music and every sound you hear is a longitudinal pressure wave of compressions and rarefactions moving through the air to your ear.

### Seismic P-waves and S-waves
Earthquakes send both kinds at once — fast longitudinal P-waves that squeeze rock along their path, and slower transverse S-waves that shake it side to side.

### Slinky demonstrations
Physics classrooms use a stretched slinky to show both wave types on the same toy: shake it sideways for transverse, push-pull it for longitudinal.

### Ultrasound imaging
Medical ultrasound sends longitudinal pressure pulses into the body and times their echoes to build an image, the same compression-and-rarefaction idea as sound in air.
