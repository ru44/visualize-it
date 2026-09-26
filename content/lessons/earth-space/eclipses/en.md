---
title: Eclipses
summary: >-
  The Moon's shadow sweeps past Earth almost every month and misses. Only when
  the Moon is also near a crossing point of its tilted orbit does that shadow
  actually land, giving a solar eclipse — total, annular, or just partial.
parameters:
  omega: how far the Moon is from a node this month
  dist: distance from Earth to the Moon
variables:
  - how far sideways the Moon's shadow is aimed from the center of Earth, in kilometers
  - the distance from Earth to the Moon at that moment, in kilometers
  - 5.14°, the tilt of the Moon's orbit compared to Earth's path around the Sun
  - how far around its tilted orbit the Moon is from a node, the point where the two paths cross
  - the Moon's own height above or below Earth's orbital plane at that moment
---

## Try it

1. Start at ω = 90°, far from a node. Watch the shadow cones miss Earth completely — no eclipse this month.
2. Drag ω down toward 0°. Watch the umbra (dark cone) swing down until it lands on Earth.
3. With ω near 0°, drag the Earth–Moon distance from small to large. Watch a total eclipse turn into an annular one as the umbra's tip pulls back short of Earth.

## Real-life examples

- **Total eclipse, 21 August 2017.** The Moon was close to a node (ω ≈ 2°) and close enough to Earth (about 372,000 km) that its umbra reached the ground and swept across the United States.
- **Annular "ring of fire", 14 October 2023.** The Moon was again close to a node, but nearer apogee (about 400,000 km away), so its umbra's tip fell short of Earth and only the outer antumbra reached the ground — a bright ring around a dark disc.
- **An ordinary new moon.** Most months the new moon happens far from a node (ω near 90°), so the Moon's shadow sails past Earth in space and nobody sees an eclipse at all.

## Test yourself

1. Line up a central eclipse: get the shadow's sideways offset under 6,371 km (Earth's radius), so the umbra or antumbra axis actually crosses Earth.
2. Find a setting where only the penumbra reaches Earth — a partial eclipse with no total or annular phase anywhere.
3. Set the sliders back to an ordinary month where the shadow misses Earth by more than the penumbra's reach.

## Intuition

The Moon makes a new moon roughly every 29.5 days, lined up between Earth and the Sun. If the Moon's orbit sat exactly in the same plane as Earth's path around the Sun, every single new moon would throw a shadow onto Earth and we would have a solar eclipse every month. It does not, because the Moon's orbit is tilted about 5.14° from that plane. Most months, when the Moon reaches the new-moon position, it is above or below the Sun in the sky by a few degrees, and its shadow sails past Earth into empty space.

Only near the two points where the tilted orbit crosses Earth's plane — called nodes — does the new moon land close enough to that plane for its shadow to actually reach Earth. The slider ω measures how far the Moon is from a node at that new moon; drag it toward 0° and the shadow swings down onto Earth, drag it toward 90° and it misses by the full 5.14° tilt.

## Formal

The Moon's height above Earth's orbital plane at the moment of new moon is $\beta = i\sin\omega$, where $i = 5.14°$ is the orbit's tilt and $\omega$ is how far around the orbit the Moon is from a node. That angle turns into an actual sideways distance $h = d\sin\beta$, using the real Earth–Moon distance $d$, which itself varies from about 356,500 km at perigee to 406,700 km at apogee through the month.

Earth's radius is 6,371 km, so whenever $h$ is smaller than that, the shadow's axis passes right through Earth and a central eclipse — total or annular — is possible somewhere on the surface. Once $h$ grows past roughly 9,900 km (Earth's radius plus the penumbra's typical width), even the penumbra misses and there is no eclipse at all.

## Advanced

Whether a central eclipse is total or annular depends on a second, separate comparison: the umbra's own length. Because the Sun is so much larger than the Moon, the Moon's umbra tapers to a point after about 374,400 km — close to, but usually a little less than, the actual Earth–Moon distance. When the Moon is nearer than that (closer to perigee), the umbra's tip reaches past Earth's surface and observers directly underneath see a total eclipse. When the Moon is farther away (closer to apogee), the umbra's tip converges and crosses over before reaching Earth, so what lands on the ground is the narrow antumbra beyond it — the Sun's bright edge still peeks out all around the Moon, giving an annular "ring of fire" instead.

## Derivation

1. The Moon's own orbit is tilted by 5.14° from Earth's orbital plane, so at any point ω around that tilted orbit its height above the plane is $i\sin\omega$.
2. Multiplying that small angle by the real Earth–Moon distance $d$ converts it into an actual sideways distance in kilometers.
3. Comparing that distance with Earth's own radius says whether the shadow's central axis actually threads through the planet at all.

## Real world

### Eclipse chasers and travel
Astronomers and tourists plan trips years ahead to stand inside the narrow path of totality, often only 100–160 km wide, because the same eclipse looks merely partial just a few hundred kilometers to either side.

### Eclipse prediction and ancient astronomy
Babylonian and Chinese astronomers tracked the roughly 18-year Saros cycle, in which the Sun, Moon and nodes return to nearly the same arrangement, letting them predict eclipses centuries before anyone understood the three-dimensional geometry behind it.

### Spacecraft and satellite power
Engineers plan satellite orbits around Earth's own shadow the same way: a satellite that spends too long in Earth's umbra loses sunlight for its solar panels, so mission planners calculate shadow-crossing times using this same shadow geometry.

### Testing general relativity
The total solar eclipse of 29 May 1919 let astronomers see stars close to the Sun's darkened disc and measure how much the Sun's gravity bent their starlight, one of the first confirmations of Einstein's general relativity.
