---
title: Electromagnetic waves and the spectrum
summary: >-
  Radio, light, and gamma rays are the exact same thing — a wave of
  electric and magnetic fields — differing only in wavelength, and that
  one number decides what each kind is used for.
parameters:
  e: how many powers of ten the wavelength is, e (wavelength = 10^e metres)
variables:
  - wavelength, the distance from one wave crest to the next
  - frequency, how many crests pass a point each second
  - the speed of light, a fixed constant
---

## Try it

1. The picture shows a long labelled bar from radio waves on the left to gamma rays on the right, with a marker you slide along it, and a small squiggly wave next to it that stretches or squeezes to match.
2. Drag «e» from the far left to the far right. The marker sweeps through radio, microwave, infrared, a thin sliver of visible light, ultraviolet, X-ray, and gamma — the wavelength shrinks by a factor of ten every single step of 1 on the slider.
3. Watch the squiggly wave as you cross into the visible band: it's a vanishingly small part of the whole spectrum, yet it's the only part your eyes can see directly.

## Real-life examples

1. **An FM radio station.** Wavelength around 3.2 m: a frequency of about 95 MHz, right in the middle of the FM dial.
2. **Green light.** Wavelength around 500 nanometres (5×10⁻⁷ m): a frequency of about 6×10¹⁴ Hz —600 trillion wave crests reaching your eye every second.
3. **A medical X-ray.** Wavelength around 0.1 nanometres (10⁻¹⁰ m): a frequency of about 3×10¹⁸ Hz, energetic enough to pass through soft tissue and shadow-image your bones.

## Test yourself

1. Tune the wavelength so the frequency lands on about 100 MHz, an FM radio station.
2. Slide into the visible-light band, where the frequency is somewhere between about 4×10¹⁴ and 7.5×10¹⁴ Hz.
3. Push the frequency above 10¹⁹ Hz, into gamma-ray territory.

## Intuition

Every one of these — the radio signal reaching your car, the light reaching your eyes right now, the X-ray that imaged a broken bone — is the same physical thing: a self-propagating ripple of electric and magnetic fields, generated whenever a charge accelerates, and travelling through empty space at the same fixed speed, $c$. The only thing that changes from one kind to the next is the wavelength: how far apart the ripples are.

A short wavelength packs more wave crests into every second, so it means a high frequency — and, as you'll see in more advanced lessons, a higher-energy wave too. That's the whole spectrum in one idea: radio waves have wavelengths from centimetres to kilometres and carry broadcast signals cheaply over huge distances; visible light sits in a razor-thin band around half a micrometre, tuned almost exactly to what your eyes evolved to detect; and X-rays and gamma rays have wavelengths smaller than an atom, energetic enough to punch through material that would block ordinary light completely.

## Formal

The wave equation linking wavelength and frequency is $c = \lambda f$, where $c \approx 3\times10^8$ m/s is the speed of light in vacuum, the same for every part of the spectrum. Writing the wavelength as $\lambda = 10^{e}$ metres lets one slider sweep the entire spectrum, from kilometre-scale radio waves ($e \approx 3$) to gamma rays smaller than a nucleus ($e \approx -15$).

Rearranging, $f = c/\lambda$: doubling the wavelength halves the frequency, and every step of 1 in $e$ changes the frequency by a factor of exactly 10.

## Advanced

Each photon of light carries energy $E = hf$, where $h$ is Planck's constant — so higher frequency (shorter wavelength) light doesn't just mean more wave crests per second, it means each individual photon hits harder. That's why ultraviolet light can damage skin cells and X-rays require shielding, while radio waves, at the same intensity, do neither: the photons themselves are simply too weak, no matter how many of them there are.

## Derivation

1. Write the wavelength as ten raised to a single sweeping exponent, so one slider covers every scale from kilometres down to picometres.
2. The wave equation relates frequency to the speed of light divided by wavelength.
3. Substituting the wavelength expression gives the frequency directly as a power of ten, shifting by exactly one order of magnitude for every step of the wavelength exponent.

## Real world

### Radio and television broadcasting
AM, FM, and TV broadcasts use wavelengths from metres to kilometres, long enough to bend around hills and buildings and carry a signal a long way.

### Microwave ovens and Wi-Fi
Both use roughly the same slice of spectrum, around 12 cm (2.45 GHz) — a frequency that happens to be efficiently absorbed by water molecules, which is exactly why it cooks food.

### Visible light and cameras
The narrow visible band, roughly 400–700 nanometres, is what eyes and ordinary cameras detect directly; infrared cameras extend a little further to sense heat.

### Medical and security imaging
X-rays image bones and airport baggage precisely because their short wavelength lets them pass through soft materials that block visible light entirely.
