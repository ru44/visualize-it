---
title: The gas laws, one at a time
summary: >-
  A bike pump gets stiff to push as the air inside squeezes into a
  smaller space, and a helium balloon left in a car overnight in winter
  comes out noticeably saggy by morning — Boyle, Charles and Gay-Lussac
  each found one slice of the same rule connecting a gas's pressure,
  volume and temperature.
parameters:
  V: volume V
  T: absolute temperature T
  n: amount of gas n
variables:
  - pressure
  - volume
  - amount of gas, in moles
  - universal gas constant, 8.314 J/(mol·K)
  - absolute temperature
---

## Try it

1. Hold the slider "temperature T" fixed and drag "volume V" down. Watch the pressure readout climb as the gas is squeezed — Boyle's law.
2. Hold "volume V" fixed and drag "temperature T" up. Watch pressure climb too, without anything moving — Gay-Lussac's law.
3. Drag "temperature T" and "volume V" up together, adjusting until the pressure readout stops changing. That constant-pressure path is Charles's law.

## Real-life examples

1. **A bike pump.** Squeezing 1 mol of room-temperature air from 10 L down to 3 L makes the pump noticeably harder to push, because at constant temperature, pressure rises as volume shrinks — Boyle's law.
2. **A helium balloon left in a cold car.** Half a mole of gas cooling from 293 K to 250 K in a fixed-ish balloon shrinks toward 8 L, since colder gas takes up less room at roughly the same pressure — Charles's law.
3. **A sealed can near a fire.** A rigid, sealed 10 L container of gas heating from room temperature to 380 K sees its internal pressure rise sharply even though the volume cannot change at all — Gay-Lussac's law, and exactly why aerosol cans warn against heat.

## Test yourself

1. Get the pressure to about 300 kPa.
2. Demonstrate Boyle's law: keep the temperature near 293 K and compress the volume below 5 L.
3. Demonstrate Charles's law: cool the gas below 230 K and shrink the volume below 10 L.

## Intuition

Squeeze the same amount of gas into a smaller space at the same temperature and its molecules hit the walls more often, so the pressure rises — that is Boyle's law, and it is why a bike pump gets stiffer to push the further down its stroke you go. On screen, hold "temperature T" fixed and drag "volume V" down, and watch the pressure readout climb the same way.

Now hold "volume V" fixed instead and raise "temperature T": the pressure still climbs, because hotter molecules slam into the fixed walls harder and more often — Gay-Lussac's law, the reason a sealed can must never be thrown in a fire. Finally, raise both "temperature T" and "volume V" together while watching the pressure readout hold steady: that is Charles's law, a gas expanding to make room for its own extra heat while pressure stays fixed at, say, ordinary atmospheric pressure. All three are really one law, PV = nRT, sliced along a different fixed variable each time.

## Formal

The ideal gas law $PV = nRT$ links pressure, volume, amount of gas and absolute temperature through a single constant $R$.

Boyle's law ($P \propto 1/V$ at constant $n, T$), Charles's law ($V \propto T$ at constant $n, P$), and Gay-Lussac's law ($P \propto T$ at constant $n, V$) are each just $PV = nRT$ with one variable held fixed.

## Advanced

Because all three laws come from the same equation, they must be mutually consistent: combining Boyle's and Gay-Lussac's laws for a fixed amount of gas moving between any two states gives $P_1V_1/T_1 = P_2V_2/T_2$, the combined gas law used to solve real problems where pressure, volume and temperature all change together.

## Derivation

1. The ideal gas law PV = nRT applies to a fixed amount of gas.
2. Holding temperature fixed and rearranging gives P ∝ 1/V, Boyle's law.
3. Holding volume fixed instead gives P ∝ T, Gay-Lussac's law; holding pressure fixed gives V ∝ T, Charles's law.

## Real world

### Aerosol cans
Warning labels tell you never to heat or puncture an aerosol can because Gay-Lussac's law means a fixed, sealed volume of gas can build dangerous pressure as it warms.

### Scuba diving
A diver's lungs follow Boyle's law in reverse on the way up: gas that was compressed by water pressure at depth expands as pressure drops near the surface, which is why divers are trained to exhale continuously while ascending.

### Weather balloons
A balloon released at ground level expands enormously as it rises into thinner, lower-pressure air, following Boyle's law until it eventually bursts at high altitude.

### Car tyres
Tyre pressure recommendations assume a "cold" tyre because driving heats the trapped air, and Gay-Lussac's law means that heated air raises the pressure reading even though no air was added.
