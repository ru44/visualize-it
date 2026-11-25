---
title: Phase changes and latent heat
summary: 'Track energy added to ice: some warms a single phase, while some changes the proportions of ice, water and vapour.'
parameters:
  Q: 'Q — cumulative heat added from −20°C ice'
  m: 'm — initial mass'
variables:
  - 'cumulative energy added'
  - 'mass of the sample'
  - 'specific heat capacity within a phase'
  - 'temperature change within a phase'
  - 'specific latent heat for a phase change'
---

## Try it

1. Set m = 0.1 kg and Q = 0. The sample starts as ice at −20°C. At Q = 4200 J it reaches 0°C; between 4200 and 37,600 J it melts at that temperature.
2. Set Q = 20,000 J. The sample is partly melted, not fully liquid. Raise Q beyond 37,600 J to begin warming the liquid.
3. Keep Q fixed and increase m. The energy per kilogram decreases, so the sample reaches an earlier stage. After all water has vaporised, further vapour heating is outside this model and no temperature is reported.

## Real-life examples

1. **Partly melted ice.** For 0.1 kg at Q = 20 kJ, 4.2 kJ warms the ice to 0°C and 15.8 kJ melts about 47.3% of its mass.
2. **Liquid close to boiling.** At Q = 79 kJ for 0.1 kg, the temperature is about 98.9°C. Boiling starts at a cumulative 79.46 kJ.
3. **Almost fully vaporised.** At Q = 305 kJ for 0.1 kg, about 99.97% has vaporised. Completion requires 305.06 kJ in this model.

## Test yourself

1. Melt all the ice and leave the liquid below its boiling point.
2. Add more than the energy needed to vaporise the entire mass.
3. Place the sample inside the boiling interval, while liquid and vapour coexist at 100°C.

## Intuition

Adding energy does not always raise temperature. First it warms the ice. At the melting point, further energy changes the amount of solid and liquid while their equilibrium temperature stays the same. After the last ice melts, additional energy warms the liquid. Boiling produces another interval in which phase proportions change at constant temperature.

The model starts with pure ice at −20°C and assumes approximately atmospheric pressure, uniform temperature and no heat loss to the container or surroundings. Its ice and liquid heights represent mass fractions schematically, not actual volumes. The side comparison shows energy released by one gram cooling from 100°C to 80°C: vapour must also condense, so it releases much more energy than liquid water over that route.

## Formal

Within one phase at constant specific heat capacity c, the stage's added energy is $Q_{stage}=mc\Delta T$. During a fixed-pressure phase change of a pure substance, $Q_{stage}=mL$ for complete conversion. For converted mass fraction z, $Q_{stage}=zmL$.

The model uses $c_{ice}=2100\ \mathrm{J/(kg\cdot K)}$, $c_{water}=4186\ \mathrm{J/(kg\cdot K)}$, $L_f=334000\ \mathrm{J/kg}$ and $L_v=2256000\ \mathrm{J/kg}$. The Q control is cumulative energy, so subtract completed stages before calculating the current stage. The transition temperatures of $0^\circ\mathrm C$ and $100^\circ\mathrm C$ are assumptions for water near atmospheric pressure.

## Advanced

At constant pressure, latent heat corresponds to an enthalpy change. It involves intermolecular arrangement and interactions, with expansion work especially relevant during vaporisation; it is not energy that disappears or breaks water molecules into hydrogen and oxygen. Once all the liquid has vaporised, further heating need not remain at 100°C. This four-stage model ends there rather than predicting superheated vapour.

## Derivation

1. While the sample stays in one phase, multiply mass, specific heat capacity and temperature change to find the stage energy.
2. For a complete phase change, multiply mass by the corresponding specific latent heat.
3. Add the energies for warming ice, melting, warming liquid and vaporising to obtain the cumulative energy at each transition.

## Real world

### Melting and freezing

At the same pressure, reversing a phase change reverses the direction of its latent heat transfer. Freezing releases energy that melting absorbs.

### Boiling point

Changing pressure changes water's boiling temperature. The 100°C plateau is a stated model condition, not a universal boiling temperature.
