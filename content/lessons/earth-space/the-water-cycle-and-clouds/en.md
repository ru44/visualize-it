---
title: The Water Cycle and Clouds
summary: >-
  Rising air cools as it climbs, and the water vapor in it gets closer to
  fully saturating that cooler air. A cloud is simply the height where the
  air finally cools enough to reach its own dew point.
parameters:
  T: ground temperature
  Td: ground dew point
variables:
  - the height of the cloud base above the ground, in meters
  - the air temperature at the ground, in °C
  - the dew point at the ground — the temperature air must cool to before it is fully saturated with water vapor, in °C
---

## Try it

1. Set T = 30°C and Td = 22°C, a muggy summer afternoon. See the cloud base sit low, around 1,000 m.
2. Keep T = 35°C but drag Td down to 5°C, a dry desert afternoon. Watch the cloud base climb to nearly 4,000 m.
3. Drag Td up until it is within 1°C of T. Watch the cloud base drop almost to the ground — that is fog.

## Real-life examples

- **A humid summer day.** T = 30°C, Td = 22°C gives a cloud base around 1,000 m — the flat-bottomed cumulus clouds common on muggy afternoons.
- **A dry desert afternoon.** T = 35°C, Td = 5°C gives a cloud base around 3,750 m — dry air pushes the cloud base very high, if a cloud forms at all.
- **A foggy morning.** T = 10°C, Td = 9°C gives a cloud base around 125 m — so close to saturation already that the "cloud" forms right at the ground as fog.

## Test yourself

1. Set the cloud base to exactly 1,000 m.
2. Push the cloud base above 3,000 m using a dry air mass.
3. Create ground fog: bring the dew point within 1°C of the temperature.

## Intuition

Air holds more water vapor when it is warm and less when it is cool, the same way a warm sponge can hold more water than a cold, stiff one. As a bubble of air near the ground gets warmed by sunlight and rises, it expands into the thinner air above and cools as it expands — even though nothing outside is actively cooling it. Meanwhile the amount of water vapor riding along inside that rising bubble barely changes, so as the air cools, that same amount of vapor represents a larger and larger share of what the air could possibly hold.

Eventually the rising, cooling air reaches its dew point — the temperature at which it is completely saturated, holding all the vapor it possibly can. Add one more meter of climb and the excess water vapor has nowhere left to go but to condense onto tiny specks of dust into visible droplets. That exact height is the flat, sharp base you see on a fair-weather cumulus cloud, marking precisely where rising air crossed from clear to saturated.

## Formal

Dry rising air cools at about 9.8°C for every kilometer it climbs, while its dew point falls more slowly, at about 1.8°C per kilometer, because the dew point depends mainly on how the water vapor gets diluted as the air expands. The gap between temperature and dew point therefore closes at about $9.8 - 1.8 = 8$°C per kilometer, so the cloud base height is $h = \frac{T - T_d}{8}$ kilometers, or $h = 125\,(T - T_d)$ in meters once $T$ and $T_d$ are measured at the ground in °C.

A bigger gap between $T$ and $T_d$ at the ground means the air must climb much higher before it closes that 8°C-per-kilometer gap, giving a high cloud base; a small gap closes almost immediately, giving a low cloud base or outright fog at ground level when $T_d$ is already within a degree or so of $T$.

## Advanced

This "125 rule" is the same rough estimate pilots, skydivers, and glider pilots use in the field to guess cloud-base height from a surface weather report, because it needs no calculator, only the temperature–dew point spread times 125. It works well for ordinary shallow convective clouds but breaks down for deep storm clouds, where rising air keeps releasing extra heat as its own water vapor condenses, which changes the cooling rate partway up and pushes the true condensation level away from this simple straight-line estimate.

## Derivation

1. Dry air cools about 9.8°C per kilometer of rise, while the dew point falls only about 1.8°C per kilometer, so the two values close in on each other at 8°C for every kilometer climbed.
2. Dividing the ground-level temperature–dew-point gap by that 8°C-per-kilometer closing rate gives the cloud-base height directly, in kilometers.
3. Multiplying by 1,000 to convert kilometers to meters turns that into the handy rule of 125 meters of height for every degree of gap.

## Real world

### Cumulus clouds on a summer afternoon
The flat bottoms lined up across the sky on a fair-weather day all sit at nearly the same height, because every rising bubble of air over that region shares almost the same ground temperature and dew point.

### Pilots and glider pilots reading the sky
Glider pilots use the visible cloud base to estimate how high they can expect rising thermals to carry them before condensation begins, planning cross-country flights around it.

### Fog at dawn
Ground temperatures often drop overnight until they nearly meet the dew point, which is why fog is common at dawn and usually burns off within an hour or two once morning sunlight warms the ground again.

### Mountain clouds and orographic lift
When moist air is forced to rise over a mountain range, the same cooling-to-dew-point process produces a persistent cap of cloud sitting right at the same height on the windward slope almost every day.
