---
title: Specific heat and latent heat
summary: 'Follow ice heated at constant power, and work out why its temperature rises in some stages and stays fixed while it melts.'
parameters:
  P: 'P — heating power'
  m: 'm — mass of ice, then water'
  x: 'x — time since heating began'
variables:
  - 'heat supplied, in joules'
  - 'specific heat capacity: energy needed to warm 1 kg by 1 °C'
  - 'specific latent heat: energy needed to change the state of 1 kg at a fixed temperature'
  - 'mass being heated'
---

## Try it

1. Set P = 1000 W and m = 0.5 kg. Move x from 0 to 21 s: the temperature rises from −20 °C to 0 °C.
2. Move x on to 188 s. The temperature stays at 0 °C for about 167 s while the ice melts. After that it rises again and reaches 100 °C near 397 s.
3. Keep m = 0.5 kg and raise P to 2000 W. Every stage takes half as long, and melting now lasts about 84 s. Doubling m instead would double every time.

## Real-life examples

1. **A strong heater and a small mass.** With P = 2000 W and m = 0.5 kg, the ice reaches 0 °C after about 10 s, melting takes about 84 s, and the water reaches 100 °C at about 199 s.
2. **A weak heater and a larger mass.** With P = 300 W and m = 1 kg, warming the ice takes 139 s and melting needs about 1113 s, nearly 19 minutes. The graph ends at 450 s, so it shows the warming stage and the start of the flat stage.
3. **A medium heater and 1.5 kg of ice.** With P = 800 W and m = 1.5 kg, the ice reaches 0 °C at about 78 s. Melting takes about 626 s, so the rest of the graph is flat at 0 °C.

## Test yourself

1. Take the ice from −20 °C to water at 100 °C in less than 200 s.
2. Make the melting stage last close to 60 s.
3. Set m = 1.5 kg and reach 100 °C in less than 700 s.

## Intuition

Take 0.5 kg of ice from a freezer at −20 °C and heat it with a 1000 W heater, which supplies 1000 J every second. Warming 1 kg of ice by 1 °C takes about 2090 J, so warming 0.5 kg by 20 °C takes 0.5 × 2090 × 20 = 20 900 J, about 21 s. Then the thermometer stops at 0 °C although the heater is still on. The energy now frees the molecules from their fixed places in the ice crystal, and it does not make them move faster. Melting 1 kg of ice takes 334 000 J, so 0.5 kg takes 167 000 J, or 167 s. That is eight times as long as the warming stage. The energy that warms 1 kg by 1 °C is called the specific heat capacity. The energy that changes the state of 1 kg without changing its temperature is called the specific latent heat.

On the graph, the horizontal position is time in seconds and the height is temperature in °C. The first sloping part is ice warming, the flat part at 0 °C is melting, and the second sloping part is liquid water warming. The water's line is about half as steep as the ice's, because 1 kg of water needs about 4186 J for each degree, twice what ice needs. At 100 °C the line becomes flat again as boiling begins; the model does not follow boiling to its end. A larger P shortens every stage in the same proportion, because the same energy arrives sooner. A larger m lengthens every stage. Neither one changes the temperatures of the flat parts. The 3D view is a schematic of particles that vibrate in place in the solid and move about freely afterwards.

## Formal

While the state does not change, heat Q changes the temperature according to $Q=mc\Delta T$. Here m is the mass in kg, c the specific heat capacity in J/(kg·°C), and $\Delta T$ the change in temperature. A heater of constant power P supplies $Q=Pt$ in time t, so the temperature rises at the steady rate $P/(mc)$.

During a change of state at fixed pressure, $Q=mL$ and the temperature stays fixed; L is the specific latent heat in J/kg. The stage lasts $t=mL/P$. The model uses c = 2090 J/(kg·°C) for ice, c = 4186 J/(kg·°C) for water and L = 334 000 J/kg for melting. It assumes that all the heater's energy enters the sample and that the sample has one temperature throughout.

## Advanced

Boiling needs far more energy than melting: about 2 260 000 J for each kilogram of water at 100 °C. Boiling away 0.5 kg with 1000 W would take about 1130 s, longer than all the earlier stages together. The boiling temperature is 100 °C only at a pressure of 1 atm, and it is lower at high altitude. At constant pressure, the heat absorbed equals the change in enthalpy. During a change of state the energy raises the potential energy of the molecules' attractions, and their average kinetic energy, which temperature measures, stays the same.

## Derivation

1. Warming the ice by 20 °C needs mass times specific heat of ice times temperature change. Dividing by the power gives the time when melting begins.
2. Melting needs mass times latent heat at a fixed 0 °C, so the flat stage ends that much later.
3. Warming the liquid by 100 °C uses water's larger specific heat. Its time is added to the two earlier stages.

## Real world

### Cooking

Water boiling in an open pot stays near 100 °C at sea level. A stronger flame boils it away faster and does not make it hotter.

### Ice in drinks

Ice at 0 °C absorbs 334 000 J per kilogram as it melts, before it warms at all. It cools a drink much more than the same mass of water at 0 °C.

### Coastal climates

Water has a high specific heat capacity, so the sea warms and cools slowly. Places near the coast have smaller temperature swings than places far inland.

### Steam burns

Steam at 100 °C releases its latent heat when it condenses on skin, so it transfers far more energy than the same mass of water at 100 °C.
