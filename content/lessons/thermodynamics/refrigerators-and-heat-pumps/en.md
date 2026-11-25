---
title: Refrigerators and heat pumps
summary: 'See how work moves heat from a cold place to a warmer one, and calculate the most heat that each joule of work can move between two temperatures.'
parameters:
  Tc: 'T_c — cold reservoir temperature'
  Th: 'T_h — hot reservoir temperature'
variables:
  - 'cooling coefficient of performance: heat removed from the cold side per unit of work'
  - 'heating coefficient of performance: heat delivered to the hot side per unit of work'
  - 'absolute temperature of the cold reservoir'
  - 'absolute temperature of the hot reservoir'
---

## Try it

1. Set T_c = 277 K and T_h = 295 K, a difference of 18 K. The readouts show COP (cooling) = 15.39 and COP (heating) = 16.39. The heating value is exactly 1 larger.
2. Keep T_c = 277 K and raise T_h to 320 K. The difference is now 43 K, and the two values fall to 6.44 and 7.44.
3. Keep T_h = 320 K and lower T_c to 250 K. The difference is 70 K, and the values fall to 3.57 and 4.57.

## Real-life examples

1. **A kitchen refrigerator.** With the inside at T_c = 277 K (4 °C) and the kitchen at T_h = 295 K (22 °C), the cooling limit is 15.39. A real refrigerator reaches only a fraction of this.
2. **A heat pump in winter.** With outdoor air at T_c = 268 K (−5 °C) and a room at T_h = 293 K (20 °C), the heating limit is 11.72. Real air-source heat pumps typically deliver 2 to 4 J of heat per joule of electrical work.
3. **An air conditioner on a hot day.** With a cooling coil at T_c = 283 K (10 °C) and outdoor air at T_h = 308 K (35 °C), the cooling limit is 11.32.

## Test yourself

1. Make the heating coefficient of performance equal to 10.
2. Make the cooling coefficient less than 4 with T_c below 260 K.
3. Make the difference T_h − T_c equal to 20 K.

## Intuition

Left alone, heat passes from a warmer place to a colder one. A refrigerator must move it the other way, from food at 4 °C to a kitchen at 22 °C, and this requires work from an electrically driven compressor. Follow the energy. Suppose the compressor uses 100 J of work and removes 300 J of heat from the inside. Both amounts end up in the kitchen, so 400 J is released there, which is why the back of a refrigerator is warm. The heat moved per joule of work is called the coefficient of performance, or COP. Here the cooling COP is 300/100 = 3, and the heating COP is 400/100 = 4.

A heat pump is the same machine used for the other purpose: the cold side is outdoor air and the warm side is the room. The heat delivered includes the work, so the heating COP is always the cooling COP plus 1, and it is greater than 1. An electric resistance heater turns 100 J of electrical work into 100 J of heat, a COP of 1. The two temperatures set an upper limit on the COP, and the limit falls as the temperature difference grows. In the picture, the left box is the cold reservoir, the right box is the hot reservoir and the circle is the compressor. The arrows mark heat Q_c entering from the cold side, work W entering from below, and heat Q_h leaving to the hot side; their drawn sizes do not change. The readouts give the limits for an ideal machine. The two bars compare the heat delivered per joule of work by this ideal heat pump and by a resistance heater.

## Formal

Over one complete cycle, energy conservation gives $Q_h=Q_c+W$, where $Q_c$ is the heat removed from the cold reservoir, $W$ the work supplied and $Q_h$ the heat delivered to the hot reservoir. The coefficients are $COP_{cool}=Q_c/W$ and $COP_{heat}=Q_h/W$, so $COP_{heat}=COP_{cool}+1$ for any machine.

The second law does not allow total entropy to fall, which requires $Q_h/T_h\ge Q_c/T_c$ with both temperatures in kelvin and $T_h>T_c$. It follows that $COP_{cool}\le T_c/(T_h-T_c)$ and $COP_{heat}\le T_h/(T_h-T_c)$. Equality holds only for a reversible machine. Both limits grow without bound as the temperature difference approaches zero, because then almost no work is needed.

## Advanced

Heat flows into the refrigerant only if it is colder than the cold reservoir, and out of it only if it is hotter than the hot reservoir. The cycle therefore works across a larger temperature difference than the one between the reservoirs. Friction in the compressor and the pressure drop through the expansion valve create further entropy. These effects keep real coefficients well below the reversible limit. The heating limit is the reciprocal of the Carnot efficiency of an engine working between the same two temperatures.

## Derivation

1. The cooling coefficient compares the heat removed from the cold side with the work supplied. Energy conservation writes the work as the heat delivered minus the heat removed.
2. A reversible machine leaves total entropy unchanged, so each heat is proportional to the absolute temperature of its reservoir. Substituting gives the cooling limit.
3. The heating coefficient uses the heat delivered instead. Because the heat delivered is the heat removed plus the work, it exceeds the cooling coefficient by 1.

## Real world

### Refrigerators and freezers

A refrigerator moves heat from its insulated interior to the room through coils at the back or underneath. A freezer has a colder interior, so each joule of work moves less heat.

### Heating a home

A heat pump takes heat from outdoor air or the ground and delivers it indoors. It supplies more heat than the electrical work it uses, which a resistance heater cannot do.

### Air conditioning

An air conditioner moves heat from a room to warmer outdoor air. The hotter the day, the more work each joule of cooling needs.

### Very cold weather

As the outdoor temperature falls, the temperature difference grows and the heating coefficient falls. Some systems add resistance heating for the coldest days.
