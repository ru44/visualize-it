---
title: Day Length and Latitude
summary: >-
  On the same calendar day, daylight length is completely different from
  place to place — the equator stays near 12 hours all year, while the far
  north swings between 24-hour "midnight sun" and total winter darkness.
parameters:
  day: day of the year
  lat: your latitude
variables:
  - the latitude of the place you're asking about
  - the Sun's declination — how far north or south of the equator the Sun sits overhead that day
  - Earth's axial tilt, 23.4°, which sets how far the Sun's overhead point wanders each year
  - the day of the year, with day 80 near the March equinox
  - half the number of daylight hours the Sun spends above the horizon, in radians
  - the total length of daylight that day, in hours
---

## Try it

1. Leave day at 172 (near the June solstice) and drag lat from 0° up toward 90°. Watch daylight climb from 12 hours at the equator toward 24 hours once you cross about 66.5°N.
2. Set lat to 71°N and slide day across the whole year. Watch daylight swing from 24-hour midnight sun in June to zero-hour polar night in December.
3. Set lat to 0° and slide day anywhere at all. Notice daylight barely moves from 12 hours — the equator does not really have seasons of daylight.

## Real-life examples

- **The equator, any day.** At lat = 0°, day length sits at almost exactly 12 hours no matter what day of the year it is — Quito and Nairobi see almost no seasonal change in daylight at all.
- **Oslo on the June solstice.** At lat = 60°N, day 172, daylight stretches to roughly 18.5 hours — a bright evening sky that barely gets dark before sunrise again.
- **Utqiagvik, Alaska, on the June solstice.** At lat = 71°N, day 172, the Sun never sets at all — 24 hours of "midnight sun," a real feature of Arctic summer.

## Test yourself

1. Find a latitude and day that give almost exactly 12 hours of daylight, without being at the equator.
2. Push a high-latitude location into full midnight sun: more than 23.5 hours of daylight.
3. Push that same high latitude into full polar night: less than half an hour of daylight.

## Intuition

Pick any single day on the calendar and compare places at different latitudes: the day length you get depends enormously on how far from the equator you stand. Near the equator, the Sun rises and sets close to straight up and down all year, so day and night stay close to an even 12 and 12 no matter the season. Move toward the poles and the Sun's daily path across the sky tilts more and more, so on the same calendar day one place can have a short winter day while another, much farther from the equator, has almost none at all.

Push the latitude slider past about 66.5°N or S near a solstice and the Sun stops setting, or stops rising, altogether — that is the polar day and polar night you hear about in the Arctic and Antarctic. It happens because Earth's axis stays tilted the same direction in space all year, so near the summer solstice the tilt points the pole itself fully into continuous sunlight, and near the winter solstice fully into continuous darkness.

## Formal

Day length is $D = \frac{24}{\pi}\arccos\left(-\tan\phi\tan\delta\right)$, where $\phi$ is latitude and $\delta$ is the Sun's declination that day, itself given by $\delta = \epsilon\sin\left(\frac{2\pi(x-80)}{365}\right)$ with axial tilt $\epsilon = 23.4°$ and day-of-year $x$. Comparing across latitude at one fixed $x$, rather than across the year at one fixed $\phi$, is exactly what makes this lesson different from tracking a single place through its seasons.

For a low $|\phi|$, $\tan\phi$ stays small, so $D$ stays close to 12 hours regardless of $\delta$. As $|\phi|$ grows, $\tan\phi\tan\delta$ can exceed 1 in size whenever $\delta \ne 0$; the moment it does, the arccos argument is clamped outside $[-1, 1]$, which is the formula's way of saying the Sun does not set (or does not rise) at all that day.

## Advanced

The 66.5° threshold for polar day and night is simply $90° - \epsilon$: it is the latitude at which, on a solstice, the Sun's noon altitude or its midnight altitude just touches the horizon. Because $\epsilon$ slowly changes over roughly 41,000 years (Earth's axial tilt drifts between about 22.1° and 24.5°), the exact latitude of the Arctic and Antarctic Circles drifts very slowly too, by tens of meters a year today.

## Derivation

1. The Sun's declination that day follows Earth's 23.4° tilt through a full year-long sine wave, peaking near the June solstice and bottoming out near December.
2. Solving for the hour angle at which the Sun crosses the horizon at a given latitude gives the fraction of a full rotation that stays lit.
3. Converting that hour angle from radians into a 24-hour day gives the total daylight length directly.

## Real world

### Farming and crop planning
Farmers at high latitudes plan planting around the long summer daylight, which lets crops grow unusually fast, while farmers near the equator plan around rainfall instead, since daylight barely changes there.

### Airline schedules across latitudes
Airlines flying polar routes account for near-constant daylight or darkness at high latitude in summer and winter, which changes how crews are scheduled for rest.

### Solar power output by location
Solar farms built at high latitude generate far more power in local summer than winter, simply because there are so many more daylight hours to work with, while equatorial solar farms produce steadily all year.

### Human body clocks near the poles
Residents of far-northern cities like Tromsø and Utqiagvik report disrupted sleep during weeks of continuous daylight or darkness, since the body's clock depends partly on the day–night cycle these latitudes nearly lose.
