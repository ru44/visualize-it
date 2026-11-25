---
title: Temperature and molecular motion
summary: 'Relate an ideal gas’s temperature to average translational kinetic energy, and see why lighter particles move faster at the same temperature.'
parameters:
  T: 'T — absolute temperature'
  M: 'M — molar mass'
variables:
  - 'average translational kinetic energy per particle'
  - 'Boltzmann constant'
  - 'square root of mean squared particle speed'
  - 'molar gas constant'
  - 'mass of one mole, in kg/mol'
---

## Try it

1. Set T = 293 K and M = 0.029 kg/mol. The Celsius readout is about 19.9°C and the root-mean-square speed is about 502 m/s.
2. Keep M fixed and raise T to 586 K. Average translational kinetic energy doubles, but the speed rises only by a factor of √2, to about 710 m/s.
3. Return to 293 K and set M = 0.004 kg/mol. Speed rises to about 1352 m/s while average translational kinetic energy stays unchanged. The 2D streaks are static indicators with capped lengths; the 3D particles show slowed, schematic motion.

## Real-life examples

1. **A gas representing room-temperature air.** At T = 293 K and M = 0.029 kg/mol, the model gives about 502 m/s. Air is a mixture, so this effective molar mass simplifies its different molecular species.
2. **Helium at the same temperature.** At T = 293 K and M = 0.004 kg/mol, the speed is about 1352 m/s, roughly 2.69 times the first value—not three times.
3. **Cold nitrogen in the ideal-gas model.** At T = 77 K and M = 0.028 kg/mol, the speed is about 262 m/s. Compared with the same gas at 293 K, it is about 51% as large. Whether actual nitrogen remains a gas also depends on pressure.

## Test yourself

1. Find T and M that give a root-mean-square speed near 1500 m/s.
2. Set T below 100 K and M above 0.02 kg/mol.
3. Make the speed greater than 2000 m/s while keeping M below 0.01 kg/mol.

## Intuition

Gas particles move in many directions and at many speeds. Temperature is related to their average random translational kinetic energy in this model; it is not the speed of every particle. Two gases at the same temperature have the same average translational energy per particle. A lighter particle needs a larger speed to have the same kinetic energy as a heavier one.

Kelvin and Celsius use equal-sized temperature intervals but different zero points. Absolute zero is 0 K, or −273.15°C; the lowest slider setting, 1 K, is above it. A thermometer measures a temperature-dependent property after exchanging energy with its surroundings, rather than literally counting molecular speeds. The ideal-gas picture is useful here, but it is not a complete description of all matter near absolute zero.

## Formal

For a classical ideal gas in thermal equilibrium in three dimensions, $\overline{KE}_{trans}=\tfrac32k_BT$, with T in kelvin and $k_B=1.380649\times10^{-23}\ \mathrm{J/K}$. This is translational kinetic energy per particle, not necessarily all its internal energy.

Root-mean-square speed is $v_{rms}=\sqrt{\overline{v^2}}=\sqrt{3RT/M}$, where $R\approx8.314\ \mathrm{J/(mol\cdot K)}$ and M is molar mass in kilograms per mole. It differs from the mean speed. Convert temperatures using $T_K=T_C+273.15$ before applying this formula.

## Advanced

For a gas at rest overall, the mean velocity vector can be zero while the root-mean-square speed is large: opposite directions cancel in a vector average, but squared speeds do not. A real equilibrium gas has a distribution of speeds, whereas the 3D illustration assigns one speed scale to all displayed particles. Quantum effects and intermolecular interactions can invalidate the classical ideal-gas approximation, especially at low temperatures or high densities.

## Derivation

1. Equate mean translational kinetic energy to three halves of Boltzmann's constant times absolute temperature.
2. Solve for mean squared speed and replace particle mass with molar mass divided by Avogadro's constant.
3. Take the square root to obtain the root-mean-square speed.

## Real world

### Comparing gas species

At equal temperature, lighter ideal-gas particles have a greater root-mean-square speed. This does not mean the lighter gas is hotter.

### Pressure in a container

Particles exchange momentum with the walls. At fixed volume and particle number, increasing temperature increases ideal-gas pressure.
