---
title: The gas laws, one at a time
summary: 'Change one gas variable while holding the others fixed, and connect pressure, volume, amount and kelvin temperature.'
parameters:
  V: 'V — volume in litres'
  T: 'T — absolute temperature'
  n: 'n — amount of gas'
variables:
  - 'absolute pressure, displayed in kPa'
  - 'volume, controlled in litres'
  - 'amount of gas in moles'
  - 'gas constant, 8.314 kPa·L/(mol·K)'
  - 'absolute temperature in kelvin'
---

## Try it

1. Set n = 1 mol, T = 300 K and V = 10 L. Pressure is about 249 kPa. Halve V to 5 L while keeping n and T fixed: pressure doubles.
2. Restore V = 10 L and raise T from 300 to 400 K. Pressure rises from about 249 to 333 kPa, in the same ratio as absolute temperature.
3. To keep pressure constant, compare n = 1, T = 250 K, V = 10 L with n = 1, T = 300 K, V = 12 L. Both give about 208 kPa because T/V is unchanged.

## Real-life examples

1. **A compressed model gas.** At n = 1 mol, T = 293 K and V = 3 L, pressure is about 812 kPa. Keeping temperature fixed during compression requires energy exchange; a fast pump stroke need not do that.
2. **A colder state.** At n = 0.5 mol, T = 250 K and V = 8 L, pressure is about 130 kPa. This is one state, not by itself evidence of a constant-pressure cooling process.
3. **A hotter fixed-volume state.** At n = 1 mol, T = 380 K and V = 10 L, pressure is about 316 kPa. Compare it with 244 kPa at 293 K for the same n and V.

## Test yourself

1. Find a state with pressure near 300 kPa.
2. Keep T within 15 K of 293 K and set V below 5 L.
3. Set T below 230 K and V below 10 L. This check specifies a cold, small-volume state; it does not check constant pressure along a path.

## Intuition

Gas pressure comes from momentum transferred to the walls. With the same amount and temperature, reducing the space raises the pressure. With the same amount and volume, increasing temperature raises it too. Keeping track of what stays fixed is essential: otherwise a second change can offset the first.

The controls choose an equilibrium state, rather than calculating how quickly a piston reaches it. Volume can change independently of temperature, and n changes the amount of gas. The pressure bar saturates at its display limit; the numerical readout still gives the calculated value. The animated 3D box illustrates molecular motion and is not a detailed simulation of compression heating.

## Formal

The ideal-gas equation is $PV=nRT$. Here P is absolute pressure, n is amount in moles and T is temperature in kelvin. With V in litres, use $R=8.314\ \mathrm{kPa\cdot L/(mol\cdot K)}$ to obtain P in kilopascals. This is the same numerical R as in joules because $1\ \mathrm{kPa\cdot L}=1\ \mathrm J$.

For fixed n: constant T gives $P\propto1/V$; constant V gives $P\propto T$; constant P gives $V\propto T$. Between two states of the same amount of ideal gas, $P_1V_1/T_1=P_2V_2/T_2$. These temperature ratios require kelvin, not Celsius.

## Advanced

An ideal gas neglects finite molecular volume and intermolecular forces apart from collisions. Real gases depart from the model, particularly near condensation and at high density. The pressure here is absolute; a gauge relative to atmospheric pressure would show the difference between this pressure and the surrounding atmospheric pressure.

## Derivation

1. Start with the ideal-gas equation and specify which variables remain fixed.
2. At fixed amount and temperature, pressure is inversely proportional to volume.
3. At fixed amount and volume, pressure is proportional to temperature; at fixed amount and pressure, volume is proportional to temperature.

## Real world

### A gas in a rigid vessel

For a fixed amount that remains gaseous, temperature changes alter pressure. The ideal-gas law provides an approximation for its equilibrium states.

### A flexible gas container

If external conditions keep pressure nearly constant, volume changes approximately in proportion to kelvin temperature for a fixed amount of ideal gas.
