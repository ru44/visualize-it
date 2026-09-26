---
title: Lasers and stimulated emission
summary: >-
  A laser first pumps more atoms into an excited state than sit in the
  ground state, then lets one passing photon trigger a flood of identical
  copies of itself — which is why laser light is one exact colour
  travelling in one exact direction, unlike a light bulb's spray of light.
parameters:
  eta: pump fraction η
  p: number of cavity passes p
variables:
  - the amplification — how many times brighter the beam gets after crossing the gain medium p times
  - the gain medium's fixed strength constant for this laser
  - the population inversion — the share of atoms excited minus the share still in the ground state
  - the pump fraction — the share of atoms pushed up into the excited state
  - the number of times the light bounces between the two mirrors
charts: []
---

## Try it

1. Set «pump fraction η» to 0.5. Whatever you set «number of cavity passes p» to, the beam neither grows nor fades: this is exactly the threshold.
2. Raise «pump fraction η» above 0.5 and push «number of cavity passes p» up. The beam grows a little more with every pass — population inversion switching on.
3. Lower «pump fraction η» below 0.5. Now the beam loses a little brightness on every pass instead, even with many passes.

## Real-life examples

1. **Right at threshold.** At η = 0.5 with p = 1 pass, the beam comes out exactly as bright as it went in.
2. **A working laser, strongly pumped.** At η = 0.9 with p = 8 passes, the beam leaves the cavity almost ten times brighter, a real lasing laser.
3. **Not enough pumping.** At η = 0.2 with p = 8 passes, the beam fades to a fifth of its starting brightness — more atoms absorb light than emit it, so nothing lases.

## Test yourself

1. Reach roughly five times amplification.
2. Make the beam fade instead of grow, using a weak pump with several passes.
3. Sit exactly at threshold, with the beam neither growing nor fading.

## Intuition

An ordinary light bulb glows because its atoms fall to a lower energy at random moments, in random directions, giving off light of many colours sprayed every which way — "spontaneous emission". A laser starts the same way, with atoms mostly sitting in their low-energy, "ground" state, but first pumps in outside energy, an electric current or a flash of light, until more atoms sit in a high-energy, "excited" state than in the ground state. That reversal never happens on its own; it takes deliberate pumping, and physicists call it a population inversion.

Once inverted, a single stray photon of just the right energy passing an excited atom can trigger it to drop down and emit a second photon that is an exact copy of the first: same colour, same direction, in step with it — "stimulated emission". Bouncing the light between two mirrors, one fully silvered and one letting a sliver out, means only photons travelling exactly along the axis between the mirrors keep getting copied on every «number of cavity passes p»; any photon heading sideways simply escapes the sides and is lost. That is why the light that finally leaks out through the half-silvered mirror is one narrow beam of one exact colour, not the spray a light bulb gives off.

## Formal

The population inversion is $\Delta N = 2\eta - 1$: a pump fraction $\eta$ below one half gives $\Delta N < 0$, more atoms still in the ground state, and above one half gives $\Delta N > 0$, more atoms excited than not.

After $p$ passes through the gain medium the beam's intensity has grown, or shrunk, by the factor $G = e^{g_0\,\Delta N\,p}$; only $\Delta N > 0$ makes it grow at all.

## Advanced

Real gain media range from a helium-neon gas tube to a semiconductor diode barely a millimetre long, where a flowing electric current itself supplies the population inversion; the mirrors' exact spacing also forces the light into one of a small set of allowed wavelengths, tightening the colour even further beyond what stimulated emission alone provides.

## Derivation

1. The pump fraction sets the population inversion, positive once more atoms are excited than not.
2. A positive population inversion is exactly the condition under which each pass amplifies the beam instead of absorbing it.
3. Multiplying that per-pass growth over every pass gives the total amplification after crossing the medium many times.

## Real world

### Barcode scanners and laser pointers
A cheap helium-neon or diode laser produces a tight, single-coloured red beam precisely because of the mirror-and-inversion trick in this lesson.

### Fibre-optic internet
Laser diodes switch on and off billions of times a second to send pulses of light down optical fibres, carrying most of the world's long-distance internet traffic.

### Laser eye surgery
LASIK surgery uses an excimer laser tuned to one exact ultraviolet wavelength to reshape the cornea with a precision no ordinary lamp could match.

### Optical discs
CD, DVD and Blu-ray players read data with laser diodes of ever-shorter wavelength, since a tighter single-colour beam can resolve smaller and smaller pits on the disc.
