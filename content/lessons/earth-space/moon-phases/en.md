---
title: Phases of the Moon
summary: >-
  The Moon makes its own light no more than a mirror does. Its phases are
  just a shifting view of the half that the Sun happens to be lighting.
parameters:
  day: days since new moon
variables:
  - the number of days since the last new moon
  - the synodic period, 29.53 days from one new moon to the next
  - the phase angle between the Sun, Moon and Earth
  - the fraction of the Moon's disc that appears lit from Earth
---

## Try it

1. Drag the day slider from 0. Watch a thin crescent grow into a half-lit disc.
2. Keep dragging to about day 15. Watch the disc become a full, glowing circle.
3. Keep dragging toward day 29.5. Watch the disc shrink back down to dark.

## Real-life examples

- **New moon.** At day 0, the lit half faces entirely away from Earth — the sky shows no moon at all.
- **First quarter.** At day 7.4, roughly a week in, exactly half the visible disc glows.
- **Full moon.** At day 14.8, about two weeks in, the whole disc faces us lit — the brightest night of the month.

## Test yourself

1. Find the day when the Moon is exactly half-lit (first or last quarter).
2. Push the illuminated fraction above 90%, near full moon.
3. Drag all the way to the next new moon and find where the disc goes dark again.

## Intuition

Drag the day slider from 0 and watch a thin crescent grow into a half, then a full, glowing disc, then shrink back down. The Sun always lights exactly half of the Moon, the same as it lights exactly half of any ball floating in sunlight. What changes is how much of that lit half faces Earth as the Moon travels around us.

At day 0 the lit half faces away from us entirely — new moon, and the Moon sits roughly between Earth and the Sun. Keep dragging to about day 15 and the lit half faces us fully — full moon, with Earth roughly between the Moon and the Sun. Everything in between is the lit half turning gradually into view.

## Formal

The phase angle grows steadily with time, $\theta = \frac{2\pi d}{P}$, completing one full cycle every synodic period $P$. The fraction of the disc that looks lit follows from the geometry of viewing a sphere half-lit from one side: $\cos\theta = 1 - 2f$, so $f = \frac{1-\cos\theta}{2}$.

At $\theta = 0$ (new moon) $f = 0$; at $\theta = \pi$ (full moon) $f = 1$; at the quarters $\theta = \pi/2$ or $3\pi/2$, $f = 1/2$ — a half-lit disc, which is why they are called quarter moons even though the disc looks half full.

## Advanced

The synodic period (29.53 days, new moon to new moon) is longer than the Moon's sidereal orbital period (27.32 days, one full trip around Earth against the stars) because Earth itself has moved about a twelfth of the way around the Sun in that time, so the Moon needs extra days to catch up to the same Sun-Earth-Moon alignment. The Moon keeps the same face toward Earth because it is tidally locked: its rotation period exactly equals its orbital period, a state that tidal friction has settled almost every large moon in the solar system into over billions of years.

## Derivation

1. The Moon sweeps through one full 360° phase angle every synodic period, so the angle grows in proportion to elapsed days.
2. Viewed from Earth, the boundary between the lit and dark halves projects as an ellipse whose flattening is set by the cosine of that angle.
3. Solving that relation for the lit fraction gives the illuminated percentage you see at any day.

## Real world

### Tide tables
Spring tides cluster around new and full moon, when this same geometry lines up the Sun and Moon.

### Islamic and lunar calendars
Many calendars start each month at the first visible crescent after new moon, tying the calendar directly to this cycle.

### Night photography and astronomy
Astronomers schedule deep-sky observations around new moon, when no moonlight washes out faint objects.

### Eclipses
A solar eclipse can only happen near new moon and a lunar eclipse only near full moon, and only when the Moon's slightly tilted orbit also crosses Earth's orbital plane at that moment.
