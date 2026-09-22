---
title: Seasons and day length
summary: >-
  It is not distance from the Sun that makes summer warm — it is the tilt of
  Earth's axis, and you can watch that tilt change how long each day lasts.
parameters:
  lat: latitude
  x: day of year
  tilt: axial tilt (used by the 3D view)
variables:
  - the latitude where you are standing
  - the Sun's declination — how far north or south of the equator it sits overhead
  - Earth's axial tilt, currently about 23.4°
  - the day of the year
  - the sunset hour angle, in radians
  - the length of daylight, in hours
---

## Try it

1. Drag the day-of-year slider through the year at latitude 45°. Watch day length rise toward June and fall toward December.
2. Drag latitude toward the poles. Watch the swing between summer and winter grow much bigger.
3. Drag latitude toward the equator instead. Watch the curve flatten out — almost no seasonal change at all.

## Real-life examples

- **A mid-latitude city in June.** At latitude 45° on day 172 (near the June solstice), daylight stretches out to its longest of the year.
- **A city near the equator.** At latitude 2°, day length barely changes across the whole year — sunrise and sunset stay close to 6 hours apart from noon, whatever the day.
- **Near the Arctic Circle in winter.** At latitude 65° on day 355 (near the December solstice), the Sun barely rises at all — the polar night.

## Test yourself

1. Find a day and latitude combination where day and night are exactly equal, 12 hours each.
2. Near the Arctic Circle (above 60°), push summer day length above 20 hours of light.
3. Near the equator (within 5° of it), find a day length that stays within half an hour of 12, no matter the day of year.

## Intuition

Drag the day-of-year slider through the year at a mid-latitude and watch the curve rise and fall: long days in June, short days in December, and two crossing points in spring and autumn where day and night are equal. Earth's distance from the Sun barely changes over the year — it is the 23.4° tilt of its axis that swings each hemisphere toward or away from the Sun as Earth orbits.

Now drag latitude toward the poles. The swing gets bigger: near the Arctic Circle the curve nearly touches 0 and 24, the midnight sun and the polar night. Near the equator the curve goes almost flat — the tropics barely notice the seasons at all, because the equator is always roughly perpendicular to the Sun's rays.

## Formal

The Sun's declination $\delta$ — its angle above or below the celestial equator — traces a sine wave over the year: $\delta = \epsilon\sin\left(\frac{2\pi(x-80)}{365}\right)$, peaking at the tilt $\epsilon$ near day 172 (the June solstice) and bottoming out near day 355 (the December solstice).

At latitude $\phi$, the Sun rises and sets when its hour angle satisfies $\cos H = -\tan(\phi)\tan(\delta)$, and the daylight fraction of a full rotation is $D = \frac{24}{\pi}H$ hours.

## Advanced

Where $|\tan(\phi)\tan(\delta)| > 1$ the cosine has no valid solution: the Sun never sets (polar day) or never rises (polar night), which is exactly the clamp built into this lesson's plot. The equinoxes are the two days each year where $\delta = 0$ everywhere, so $H = \pi/2$ and every latitude gets a 12-hour day regardless of $\phi$.

## Derivation

1. Earth's axis stays pointed the same direction in space as it orbits, so the tilt $\epsilon$ turns into a sine-wave declination $\delta$ over one year.
2. At sunset the Sun sits on the horizon; the geometry of a tilted sphere fixes the hour angle $H$ from that day's declination and your latitude.
3. Daylight runs from sunrise to sunset, twice the hour angle, converted from radians to hours.

## Real world

### Farming calendars
Planting and harvest dates track day length, not temperature, because day length is the same every year at a given latitude and date.

### Solar panel tilt
Fixed panels are often angled partway between the summer and winter Sun paths, a compromise driven by exactly this declination swing.

### Migration
Birds and other animals use day length, not temperature, as the reliable cue to begin migrating each year.

### Why seasons are opposite in each hemisphere
When the tilt leans the Northern Hemisphere toward the Sun it leans the Southern Hemisphere away by the same angle, so one has summer while the other has winter.
