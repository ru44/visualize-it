---
title: Entropy and the limit on heat engines
summary: 'Find the largest fraction of heat that an engine can turn into work between a hot and a cold temperature, and see why that fraction stays below 1.'
parameters:
  Tc: 'Tc — cold reservoir temperature'
  x: 'x — hot reservoir temperature Th'
variables:
  - 'absolute temperatures of the hot and cold reservoirs, in kelvin'
  - 'efficiency: work output divided by heat taken from the hot reservoir'
  - 'entropy: a quantity that rises by Q/T when heat Q enters a body at absolute temperature T'
charts:
  - title: Efficiency limit for several cold-reservoir temperatures
    xLabel: Th (K)
    yLabel: η
    series:
      - Tc = 250 K
      - Tc = 300 K
      - Tc = 350 K
---

## Try it

1. Set Tc = 300 K and x = 500 K. The curve reads η = 0.40: at most 40% of the heat taken in can become work, and at least 60% passes to the cold reservoir.
2. Keep Tc = 300 K and move x to 900 K. The limit rises to about 0.67. It is higher, but still below 1.
3. Keep x = 900 K and raise Tc to 350 K. The limit falls to about 0.61, because the cold temperature is now a larger fraction of the hot one.

## Real-life examples

1. **A steam power plant.** With Tc = 300 K and x = 800 K, the limit is 0.625. A real plant between these temperatures converts less, because friction and heat flow across temperature differences are not reversible.
2. **A solar-thermal plant.** With Tc = 320 K and x = 650 K, the limit is about 0.51. Air cooling on a hot day raises Tc and lowers the limit.
3. **A low-temperature geothermal plant.** With Tc = 290 K and x = 450 K, the limit is about 0.36. A cooler heat source gives a lower limit even with a cool surrounding.

## Test yourself

1. Make the efficiency limit equal to 0.50.
2. Raise the limit above 0.60 while keeping Tc at 280 K or higher.
3. Set Tc = 250 K and reach a limit of at least 0.55.

## Intuition

A heat engine takes heat from something hot, turns part of it into work, and passes the rest to something cooler. Suppose an engine takes 1000 J from steam at 600 K, and its surroundings are at 300 K. Can all 1000 J become work? No. The heat passed to the cold side must be at least the fraction 300/600 of the heat taken in, so at least 500 J leaves as heat and at most 500 J becomes work. The fraction of the heat input that becomes work is called the efficiency. Its largest possible value between two temperatures is the Carnot efficiency, here 0.50.

On the graph, the horizontal position is the hot temperature x in kelvin and the height is the efficiency limit. The curve rises as x grows, quickly at first and then slowly: going from 400 K to 500 K lifts the limit from 0.25 to 0.40, while going from 800 K to 900 K lifts it only from about 0.63 to 0.67. It never reaches 1, because the cold temperature is never zero. Raising Tc lowers the whole curve. Only the ratio of the two absolute temperatures matters: 300 K and 600 K give the same limit as 250 K and 500 K. The chart compares three values of Tc. The 3D view is a schematic of heat leaving the hot reservoir and dividing into work and rejected heat.

## Formal

An engine working in a cycle takes heat $Q_h$ from a reservoir at absolute temperature $T_h$, does net work $W$, and rejects heat $Q_c$ to a reservoir at $T_c$. Energy conservation over one cycle gives $W=Q_h-Q_c$, and the efficiency is $\eta=W/Q_h$. Both temperatures are in kelvin, with $T_h>T_c>0$.

The limit comes from entropy, written S. When heat Q enters a reservoir at absolute temperature T, the reservoir's entropy rises by Q/T; when heat leaves, it falls by the same rule. The engine returns to its starting state after each cycle, so the total change is $\Delta S_{\text{total}}=Q_c/T_c-Q_h/T_h$. The second law requires $\Delta S_{\text{total}}\ge 0$, which gives $Q_c/Q_h\ge T_c/T_h$ and therefore $\eta\le\eta_{\text{Carnot}}=1-T_c/T_h$. Equality holds only for a reversible cycle, one that creates no entropy.

## Advanced

The curve's slope with respect to the hot temperature is $T_c/T_h^2$, which shrinks as $T_h$ grows; this is the flattening seen on the graph. Lowering $T_c$ by 1 K changes the limit by $1/T_h$, more than raising $T_h$ by 1 K does. The model assumes two reservoirs whose temperatures stay fixed. Burning gas cools as it gives up heat, so a real engine is not described by one hot temperature. Statistically, entropy is $S=k_B\ln\Omega$, where $\Omega$ counts the microscopic arrangements that match the observed state; the lesson on the second law develops that view.

## Derivation

1. Efficiency compares the net work with the heat taken from the hot reservoir. Over a complete cycle, the work equals the heat taken in minus the heat rejected.
2. A reversible cycle leaves total entropy unchanged, so the two heats are in the same ratio as the two absolute temperatures.
3. Substitute that ratio. Any irreversible step rejects more heat than this, so a real engine has a lower efficiency.

## Real world

### Power plants

Steam plants use the hottest steam their materials tolerate and the coolest available water or air, because both changes raise the limit.

### Car engines

Petrol and diesel engines convert well under half of the fuel's energy into work. Friction, heat lost through the cylinder walls and hot exhaust all keep them below the reversible limit.

### Refrigerators and heat pumps

Run in reverse, the cycle uses work to move heat from cold to hot. The same two temperatures set the best possible performance.

### Why perpetual motion fails

A machine that turned heat from a single reservoir completely into work, cycle after cycle, would lower total entropy. The second law rules it out.
