---
title: Temperature is molecules in motion
summary: >-
  A thermometer in a warm room and one in a freezer are not reading two
  different "kinds" of hot and cold — they are counting how fast the
  air molecules around them are jiggling, and that single idea explains
  Celsius, Kelvin, and why nothing can get colder than −273.15°C.
parameters:
  T: absolute temperature T
  M: molar mass of the gas M
variables:
  - average kinetic energy of one molecule
  - Boltzmann constant, 1.38×10⁻²³ J/K
  - root-mean-square molecular speed
  - universal gas constant, 8.314 J/(mol·K)
  - mass of one mole of the gas
---

## Try it

1. Drag the slider "temperature T" up from near zero. Watch the molecules in the box speed up and the thermometer fill.
2. Pull "temperature T" down toward 1 K. Watch the molecules almost stop moving.
3. Lower the slider "molar mass M" to helium's value with T fixed. Watch the typical speed jump even though the temperature has not changed.

## Real-life examples

1. **Room-temperature air.** Nitrogen and oxygen (M ≈ 0.029 kg/mol) at 293 K, a mild room, have molecules zipping around at roughly 500 m/s — faster than a rifle bullet, yet you feel nothing because they are so light and so small.
2. **A helium balloon.** Helium (M = 0.004 kg/mol) at the same 293 K room temperature has molecules moving over three times faster than the nitrogen around it, which is part of why helium leaks out of a balloon so much quicker than air would.
3. **Liquid nitrogen boiling off.** Nitrogen gas cooled to 77 K, the temperature at which liquid nitrogen boils, has molecules moving barely a third as fast as they do at room temperature.

## Test yourself

1. Get the typical molecular speed to 1500 m/s.
2. Set up a cold, heavy gas: keep the temperature under 100 K with a molar mass above 0.02 kg/mol.
3. Set up a hot, light gas: get the speed above 2000 m/s using a molar mass under 0.01 kg/mol.

## Intuition

Nothing in a gas sits still — every molecule is flying around, bouncing off its neighbours and off the walls of whatever holds it, and "temperature" is simply a number for how fast that flying around is, on average. On screen, drag the slider "temperature T", measured in kelvin, and watch the particles in the box: at low T they barely drift, and as T climbs toward 1000 K they streak across the box far faster.

Kelvin and Celsius describe the same jiggling, just counted from different starting lines: 0°C (ice melting) sits at 273 K, and 0 K — "absolute zero" — sits at −273.15°C, the point where a substance has given up essentially all the kinetic energy it can give up. That is also why nothing can get colder than absolute zero: there is no such thing as slower than not moving. Now lower the slider "molar mass M" toward helium's value while T stays fixed, and the typical speed jumps up even though nothing about the temperature changed — light molecules simply have to move faster than heavy ones to carry the same amount of kinetic energy.

## Formal

The average translational kinetic energy of a molecule in an ideal gas depends on temperature alone: $\overline{KE} = \tfrac{3}{2}k_BT$, with $k_B$ the Boltzmann constant.

The root-mean-square speed that follows from that energy is $v_{rms} = \sqrt{3RT/M}$, where $R = N_Ak_B$ is the gas constant and $M = N_Am$ is the molar mass.

## Advanced

Kinetic theory treats a gas as a swarm of point-like particles in constant, random, elastic motion; pressure itself is nothing more than the rate at which these molecules bombard a surface, which is why a hotter, faster-moving gas pushes harder on the walls of its container for the same volume and amount.

## Derivation

1. Kinetic theory equates a molecule's average kinetic energy, $\tfrac12 m\overline{v^2}$, with $\tfrac32 k_BT$ — the definition of temperature in this model.
2. Solve for the mean-square speed and rewrite the per-molecule mass $m$ and Boltzmann constant $k_B$ in terms of molar mass $M$ and the gas constant $R$.
3. Take the square root to get the root-mean-square speed, the typical molecular speed used to describe a gas.

## Real world

### Weather balloons
Instruments track air temperature by kelvin internally because kelvin never goes negative — it is a direct count of molecular energy, not an arbitrary human scale.

### Cryogenics
Liquid helium, used to cool MRI magnets to about 4 K, works because at that temperature helium atoms carry almost no kinetic energy left to conduct away as heat.

### Gas leaks
Lighter gases such as hydrogen and helium escape through small leaks and thin balloon walls faster than heavier gases at the very same temperature, exactly because their molecules move faster.

### Absolute zero research
Laboratories have cooled atoms to within a billionth of a kelvin of absolute zero, but true 0 K has never been reached — it would require removing every last trace of kinetic energy.
