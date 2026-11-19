---
title: Thermal conductivity and insulation
summary: 'Calculate how fast heat passes through a wall from its material, thickness and area and the temperature difference across it.'
parameters:
  k: 'k — thermal conductivity of the material'
  A: 'A — wall area'
  d: 'd — wall thickness'
  dT: 'ΔT — temperature difference between the two faces'
variables:
  - 'heat conducted through the wall, in joules'
  - 'time, in seconds'
  - 'thermal conductivity of the material'
  - 'area the heat passes through'
  - 'temperature difference between the two faces'
  - 'wall thickness'
  - 'U-value, k/d'
---

## Try it

1. Set k = 0.04 W/(m·K), A = 15 m², d = 0.15 m and ΔT = 20 °C. The readouts show Q/t = 80 W and U = 0.267 W/(m²·K).
2. Keep the other values and raise d to 0.30 m. Q/t halves to 40 W, because the heat has twice as far to travel through the material.
3. Return d to 0.15 m and raise k to 0.80 W/(m·K). Q/t becomes 1600 W, twenty times the first value, and the wall is drawn darker.

## Real-life examples

1. **A layer of wool insulation.** With k = 0.04 W/(m·K), A = 15 m², d = 0.15 m and ΔT = 20 °C, heat passes at 80 W.
2. **A bare brick wall.** With k = 0.8 W/(m·K), the same area and temperature difference, and d = 0.25 m, heat passes at 960 W. The brick is thicker than the wool, yet it passes twelve times as much.
3. **A wooden door.** With k = 0.13 W/(m·K), A = 2 m², d = 0.04 m and ΔT = 15 °C, heat passes at about 98 W. Its U-value, 3.25 W/(m²·K), is close to the brick wall's; the door loses less in total because its area is small.

## Test yourself

1. Bring the heat-flow rate below 50 W with A greater than 10 m².
2. Bring the U-value below 0.15 W/(m²·K).
3. Make the heat-flow rate exceed 500 W with k greater than 0.5 W/(m·K).

## Intuition

On a cold day, touch a brick wall and a wool jumper that are at the same temperature. The brick feels colder. It is not colder; it carries heat away from your hand faster. How readily a material passes heat is its thermal conductivity, k. Wool with air trapped between its fibres has k of about 0.04 W/(m·K), and brick about 0.8, twenty times as much. Now take a wall of area 15 m² made of 0.15 m of wool insulation, with the inside face 20 °C warmer than the outside face. Heat passes through at 0.04 × 15 × 20 / 0.15 = 80 W, which is 80 J every second. A heater must supply that much to keep the room's temperature steady.

Each quantity changes the rate in a predictable way. Twice the area gives twice the rate, because there is twice as much wall for heat to cross. Twice the temperature difference also gives twice the rate. Twice the thickness gives half the rate. The material and the thickness always appear together as k divided by d, so builders combine them into one number, the U-value: the rate through each square metre for each degree of difference. A thin layer of a good insulator and a thick layer of a poor one can share a U-value: 0.15 m of wool has U = 0.267 W/(m²·K), and brick would need to be 3 m thick to match it. In the picture, the wall's drawn width follows d and a darker shade means a larger k. More arrows mean a larger rate, but the picture uses at most 14 arrows, so read the exact rate from the number.

## Formal

For a flat, uniform wall in steady conditions, Fourier's law gives $Q/t=kA\Delta T/d$. Q is the heat in joules that passes in time t in seconds, so Q/t is in watts. The conductivity k is in W/(m·K), the area A in m² and the thickness d in metres, with d greater than zero. $\Delta T$ is the temperature difference between the two faces; a difference of 1 °C equals a difference of 1 K.

The U-value is $U=k/d$, in W/(m²·K), and the same law becomes $Q/t=UA\Delta T$. A lower U-value means slower heat flow for the same area and temperature difference.

## Advanced

A real wall has several layers. Each layer has a thermal resistance d/k; the resistances of layers in series add, and the overall U-value is the reciprocal of their sum. Thin films of still air at the two surfaces add resistance as well, so the faces of a wall differ in temperature by less than the indoor and outdoor air do. Published U-values include these films. Moisture raises the conductivity of most insulating materials, and air leaking through gaps carries heat that this conduction model does not count.

## Derivation

1. Fourier's law: the rate is proportional to the conductivity, the area and the temperature difference, and inversely proportional to the thickness.
2. Collect the two properties of the wall itself, its material and its thickness, into one quantity, the U-value.
3. Substitute it. The rate is the U-value times the area times the temperature difference.

## Real world

### Double glazing

Two panes with a sealed layer of still gas between them conduct much less heat than a single pane, because the gas has a far lower conductivity than glass.

### Roof insulation

Much of a house's heat can escape through the roof. A thick layer of low-conductivity material there lowers the U-value and the heating needed.

### Fur and feathers

Fur and feathers hold a layer of still air next to the skin. The air's low conductivity does most of the insulating.

### Building rules

Many building codes set a largest permitted U-value for walls, roofs and windows. A builder can meet it with a better insulator or a thicker layer.
