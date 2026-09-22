---
title: The photoelectric effect
summary: >-
  Light ejects electrons from a metal only if a single photon carries more
  energy than the metal's work function; brightness alone can never help.
parameters:
  f: light frequency f
  phi: work function φ
  I: brightness I
variables:
  - Planck's constant
  - the light's frequency
  - the work function, the energy needed to free an electron
  - the kinetic energy of the ejected electron
charts: []
---

## Try it

1. Start with «frequency f» low. No electrons leave the metal, no matter how far you raise «brightness I».
2. Raise «frequency f» slowly. At one exact point electrons suddenly start flying off — the threshold frequency.
3. Push «frequency f» well past that point and watch the ejected electrons leave faster, carrying away the extra energy.

## Real-life examples

1. **Sodium under visible light.** Sodium's work function is low enough that ordinary visible light near 6.0×10¹⁴ Hz already knocks electrons free.
2. **Zinc under ultraviolet light.** Zinc holds onto its electrons much harder; only ultraviolet light near 1.2×10¹⁵ Hz has enough energy per photon.
3. **Cesium under dim red light.** Cesium's work function is so low that even dim red light near 5×10¹⁴ Hz ejects electrons, just slower.

## Test yourself

1. Bring the light right up to the threshold, where electrons just barely start to leave.
2. Prove brightness alone cannot help: turn brightness to maximum while keeping the frequency below threshold.
3. Give the ejected electrons about 2 eV of kinetic energy.

## Intuition

Sodium's work function is about 2.3 eV, a fixed toll every electron must pay to escape the metal. Photons below that energy can never pay it, no matter how many arrive together — push the «brightness I» slider to its maximum and the metal plate still releases nothing.

Raise the «frequency f» slider until each photon finally carries enough energy, and electrons start leaving the instant you cross that line. Anything a photon carries beyond the toll turns straight into the electron's speed, so pushing «frequency f» further makes the ejected electrons visibly faster.

## Formal

Einstein's photoelectric equation states that a photon's energy $hf$ splits into the work function $\phi$ and the electron's leftover kinetic energy: $hf = \phi + E_k$, so $E_k = hf - \phi$.

Because each photon acts alone, no electron leaves unless $hf \geq \phi$; a beam of many low-energy photons never adds up to one high-energy one.

## Advanced

This single equation, verified precisely by Robert Millikan around 1916, was impossible to explain with light as a continuous wave, which predicted electrons should leave eventually at any frequency given enough time. Einstein's 1905 photon picture won him the 1921 Nobel Prize in Physics — not for relativity, which is often assumed, but for this explanation.

## Derivation

1. An electron can only leave the metal if a single photon supplies at least the work function φ.
2. Whatever energy is left over becomes kinetic energy of the ejected electron.
3. Brightness only changes how many photons arrive per second, never the energy each one carries.

## Real world

### Night-vision devices
A photocathode releases electrons only above a chosen threshold frequency, which lets the device select which wavelengths of light it amplifies.

### Solar cell design
Engineers choose semiconductor materials whose energy gap is low enough that ordinary sunlight, not just ultraviolet light, can free charge carriers.

### Smoke detectors
Some ionization-free smoke detectors use a photoelectric sensor: smoke scatters a light beam into a detector, and the resulting electron flow trips the alarm.
