---
title: Speed of sound
summary: 'Use a sound pulse’s travel time to calculate distance, and see how its speed depends on the medium.'
parameters:
  T: 'T — air temperature'
  medium: 'medium — 0: air, 1: water, 2: steel'
  t: 't — elapsed travel time'
variables:
  - 'sound speed in the selected medium'
  - 'approximate air speed at 0°C'
  - 'air temperature in degrees Celsius'
  - 'one-way distance travelled'
---

## Try it

1. Select air, T = 20°C and t = 3 s. Read 343 m/s and a distance of about 1.03 km.
2. Keep t fixed and select water, then steel. The model uses 1480 m/s and 5000 m/s, so the pulse travels farther in the same time.
3. Return to air and lower T to −10°C. Speed becomes 325 m/s. Changing temperature affects the air calculation; water and steel have fixed example values here.

## Real-life examples

1. **Three seconds through air.** At 20°C, distance is 343 × 3 = 1029 m. This is one-way travel.
2. **Five seconds through colder air.** At −10°C, distance is 325 × 5 = 1625 m. Despite the lower speed, the longer time gives a greater distance than in the first example.
3. **A pulse in steel.** This preset starts at t = 0, so distance is zero. Set t = 1 s to obtain 5000 m with the model's rounded speed.

## Test yourself

1. Select water and read its example speed.
2. Select steel and read its example speed.
3. Select air and find T and t that give a distance within 30 m of 1 km.

## Intuition

A sound pulse is a disturbance passed through a material. Its travel time depends on the distance and on how quickly the material transmits the disturbance. If the speed is 343 metres per second, the pulse covers 343 metres in the first second and another 343 in the next, provided the speed stays constant.

The bars compare three example media. Speed depends on the material's resistance to compression or deformation and its inertia, not just on how close its particles are. The temperature control changes the air speed. Water and steel use fixed representative values; actual speeds also depend on temperature, composition and the kind of wave. The circle is an illustration, not a map drawn to scale.

## Formal

For air over the temperature range shown, use $v=v_0+0.6T$, with $v_0=331\ \mathrm{m/s}$ and T measured in degrees Celsius. The coefficient is 0.6 metres per second per degree Celsius. At 20°C this gives $v=343\ \mathrm{m/s}$. This air formula is not used for the water or steel bars.

At constant speed, one-way distance is $d=vt$. Use seconds for t and metres per second for v to obtain metres. For an echo, the pulse travels out and back; the distance to the reflector is then $d=vt/2$, assuming the same speed on both legs.

## Advanced

In a fluid, the small-signal speed is $v=\sqrt{B/\rho}$, where B is bulk modulus and ρ is density. For an ideal gas it becomes $v=\sqrt{\gamma RT_K/M}$, with absolute temperature in kelvin. The air rule above approximates this temperature dependence. In solids, different wave modes can have different speeds. See [OpenStax’s treatment of sound speed](https://openstax.org/books/university-physics-volume-1/pages/17-2-speed-of-sound).

## Derivation

1. Start from the approximate air speed at 0°C and add 0.6 m/s for each degree Celsius.
2. Substituting 20°C gives 331 + 12 = 343 m/s.
3. Multiply a constant speed by elapsed travel time to obtain the distance covered.

## Real world

### Measuring distance with sound

A sensor can time a reflected pulse. It needs the speed in the actual medium and must account for the round trip.

### Wind instruments

The speed of sound in the air column affects its resonant frequencies. A temperature change can therefore change the pitch.
