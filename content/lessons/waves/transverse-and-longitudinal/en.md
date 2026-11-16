---
title: Transverse and longitudinal waves
summary: 'Classify a wave by comparing the direction of local displacement with the direction the pattern travels.'
parameters:
  f: 'f — oscillations per second'
  lambda: 'λ — spacing between repeated features'
  A: 'A — displacement amplitude'
variables:
  - 'distance between repeated features at one instant'
  - 'complete local oscillations per second'
  - 'maximum displacement from a material point’s resting position'
  - 'spatial phase change in radians per metre'
  - 'temporal phase change in radians per second'
---

## Try it

1. Set λ = 2 m, f = 0.8 Hz and A = 0.1 m. In the upper view, displacement is vertical while the pattern travels horizontally: this is transverse motion.
2. Follow one dot in the lower view. It moves back and forth horizontally, parallel to pattern travel: this is longitudinal motion. Crowded regions are compressions; more spread-out regions are rarefactions.
3. Increase λ to 4 m with f fixed. The repeated features become farther apart in both views. The model speed also increases from 1.6 to 3.2 m/s because frequency and wavelength are independently controlled here.

## Real-life examples

1. **A long pattern.** At λ = 3.5 m, f = 0.4 Hz and A = 0.1 m, both patterns travel at 1.4 m/s. A local point repeats its motion every 2.5 s.
2. **A short pattern.** At λ = 1 m, f = 1.2 Hz and A = 0.1 m, both patterns travel at 1.2 m/s. Local motion repeats about every 0.833 s.
3. **Comparing directions.** At λ = 2 m, f = 0.8 Hz and A = 0.15 m, speed is 1.6 m/s in both views. The same scalar displacement formula is applied in different directions.

## Test yourself

1. Set wavelength to 1 m.
2. Make wavelength greater than 3 m and frequency less than 0.5 Hz.
3. Set frequency to 1.5 Hz.

## Intuition

A wave's direction of travel need not be the direction in which the medium moves. On the upper rope, each point moves across the travel direction, so the wave is transverse. In the lower row, points move along the travel direction, so the wave is longitudinal. In both cases a pattern travels while local points oscillate around their own resting positions.

Compression depends on how neighbouring displacements differ, not on which dot moves farthest forward. If neighbouring points move closer together, the material is compressed; if they separate, it is rarefied. In a small sinusoidal longitudinal wave, maximum compression occurs where displacement crosses zero with a negative spatial slope, not at the maximum positive displacement. The dots represent small material regions, not the detailed random motion of individual air molecules.

## Formal

Both illustrations use the scalar displacement $s(x,t)=A\sin(kx-\omega t)$, where x labels a resting position. The wavenumber is $k=2\pi/\lambda$ and angular frequency is $\omega=2\pi f$. In the transverse view s is perpendicular to propagation; in the longitudinal view it is parallel.

A longitudinal material point's actual coordinate is $x+s(x,t)$. The local spacing changes in proportion to $1+\partial s/\partial x$. Negative displacement slope means compression, and positive slope means rarefaction. For the sinusoid, $\partial s/\partial x=Ak\cos(kx-\omega t)$. The selected amplitude range keeps $Ak<1$, preventing neighbouring material positions from reversing order in this model.

## Advanced

For a small longitudinal disturbance, the density change is approximately proportional to minus the displacement gradient. Pressure and displacement therefore need not peak together. In an ordinary fluid, sound is a longitudinal pressure disturbance; solids can support both longitudinal and transverse elastic waves. Electromagnetic waves describe oscillating fields rather than material particles moving sideways.

## Derivation

1. One spatial cycle corresponds to 2π radians over a wavelength, giving k = 2π/λ.
2. Each temporal cycle takes 1/f seconds, giving ω = 2πf.
3. Combine spatial and temporal phase in the sine function. Applying its displacement in different directions gives the two illustrated wave types.

## Real world

### A stretched spring

Moving an end along the spring can produce compressions; moving it sideways can produce transverse motion. The boundary conditions and restoring forces determine which waves propagate.

### Sound in air

The organized disturbance consists of small pressure and density changes that propagate through air. The air has no need to travel from the source to the listener with the sound.
