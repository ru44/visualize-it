---
title: Exoplanet transits
summary: When a planet crosses in front of its star, the star's light dims by a tiny, measurable amount — and how much it dims reveals the planet's size.
parameters:
  Rp: planet radius
  Rs: star radius
variables:
  - "the transit depth: the fraction of the star's light blocked"
  - the planet's radius, in Earth radii (R⊕)
  - the star's radius, in solar radii (R☉)
---

## Try it

1. Start at «planet radius» = 1 and «star radius» = 1 — an Earth-sized planet crossing a Sun-sized star. The light curve is zoomed in on the dip, so read its true size in the readout: only 84 ppm (0.0084 %).
2. Raise «planet radius» to 11.2, Jupiter's size. The planet's disc grows and the transit depth climbs to 1.05 %.
3. Now shrink «star radius» to 0.5, a small red star. The same planet now blocks a much bigger share of the light: 4.20 %.

## Real-life examples

1. **Earth crossing the Sun.** A planet the size of Earth in front of the Sun dims its light by only about 84 parts per million — so shallow that only space telescopes like Kepler can catch it.
2. **Jupiter crossing the Sun.** A gas giant about 11.2 Earth radii wide blocks roughly 1% of the Sun's light — a dip large enough that even careful ground-based telescopes can detect it.
3. **An Earth-sized planet around a red dwarf.** The TRAPPIST-1 system has planets close to Earth's size, but its star is only about 0.12 solar radii wide. That tiny star makes the dip about 0.5% deep — about half of what giant Jupiter makes in front of the Sun, and almost 60 times deeper than Earth's own dip.

## Test yourself

1. Make a dip deeper than 5% of the star's light.
2. Make a dip shallower than 50 parts per million — even harder to spot than Earth's own transit.
3. Build a giant planet (more than 5 Earth radii) crossing a small star (under 0.15 solar radii).

## Intuition

A star's light doesn't just wink out when a planet passes — the planet is tiny compared to the star, so it blocks only a small slice of the light, like a fly crossing in front of a spotlight far away. The bigger the fly relative to the spotlight, the more the light dims. A planet crossing a star works exactly the same way: the size of the planet compared to the size of the star is what decides how deep the dip is.

Drag «planet radius» up and the transit depth in the readout climbs, because a bigger planet covers more of the star's disc. Drag «star radius» down instead and the dip deepens too — the planet hasn't changed, but it now covers a bigger fraction of a smaller star. That's why small, cool stars are some of the best places to hunt for small planets: the dip they cause is easier to see.

## Formal

A planet of radius $R_p$ crossing in front of a star of radius $R_s$ blocks light in proportion to how much of the star's disc it covers: the ratio of their radii, $\frac{R_p}{R_s}$.

Since brightness depends on area, not just width, the fraction of light blocked — the transit depth — is that ratio squared: $d = \frac{R_p^2}{R_s^2}$. Double the planet's radius and the dip becomes four times deeper; double the star's radius instead and the same planet's dip becomes four times shallower.

## Advanced

How long the dip lasts also carries information: for a planet on a close, fast orbit crossing the star's disc at roughly 130 km/s, the transit lasts about $2R_s / v$ — a few hours for a Sun-sized star, but only tens of minutes for a small red dwarf. Combined with the orbital period, astronomers use the depth and duration together to pin down not just a planet's size but its orbit and, from the star's own mass and radius, an estimate of its density.

## Derivation

1. A planet crossing a star blocks a share of its disc set by the ratio of their radii, planet over star.
2. Because the light lost is proportional to area, not width, that ratio has to be squared to get the actual fraction of light blocked.
3. Squaring the ratio of radii gives the transit depth directly: the dip size the light curve shows.

## Real world

### The Kepler space telescope

Kepler stared at over 150,000 stars for four years, watching for the tiny periodic dips of transiting planets, and found thousands of confirmed exoplanets this way.

### TRAPPIST-1

This one small red dwarf hosts seven roughly Earth-sized planets, all found and measured through the depth and timing of their transits.

### Measuring an atmosphere

When a planet transits, some starlight filters through its atmosphere's edge; splitting that light into colors reveals gases like water vapor or methane in the planet's air.

### Why size alone isn't habitability

A deep, easy-to-measure transit only tells you a planet's size — not its temperature or atmosphere — which is why astronomers still need more data before calling a world Earth-like.
