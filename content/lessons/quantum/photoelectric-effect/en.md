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

1. Start with «light frequency f» at 5 and «work function φ» at 2.3 eV. «energy of one photon» reads 2.07 eV, less than the 2.3 eV needed, so no electrons leave the metal, even if you raise «brightness I» to 10.
2. Raise «light frequency f» slowly. At 5.6 the photon energy reaches 2.32 eV and electrons suddenly start flying off: this is the threshold frequency.
3. Push «light frequency f» up to 10. The photon energy is now 4.14 eV, «energy left for the electron» reads 1.84 eV, and the ejected electrons leave faster, carrying away the extra energy.

## Real-life examples

1. **Sodium under visible light.** Sodium's work function (2.3 eV) is low enough that ordinary visible light near 6.0×10¹⁴ Hz, 2.48 eV per photon, already knocks electrons free with 0.18 eV to spare.
2. **Zinc under ultraviolet light.** Zinc holds onto its electrons much harder (4.3 eV); only ultraviolet light near 1.2×10¹⁵ Hz, 4.96 eV per photon, has enough energy.
3. **Cesium under dim orange light.** Cesium's work function is so low (1.9 eV) that even dim orange light near 5×10¹⁴ Hz, 2.07 eV per photon, ejects electrons: fewer of them, because the light is dim, but they do leave.

## Test yourself

1. Bring the light right up to the threshold: the photon energy within 0.1 eV of the work function.
2. Prove brightness alone cannot help: raise brightness to 8 or more while keeping the frequency below threshold.
3. Give the ejected electrons about 2 eV of kinetic energy.

## Intuition

Sodium's work function is about 2.3 eV, a fixed toll every electron must pay to escape the metal. Photons below that energy can never pay it, no matter how many arrive together — push the «brightness I» slider to its maximum and the metal plate still releases nothing.

Raise the «light frequency f» slider until each photon finally carries enough energy, and electrons start leaving the instant you cross that line. Anything a photon carries beyond the toll turns straight into the electron's speed, so pushing «light frequency f» further makes the ejected electrons visibly faster.

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
