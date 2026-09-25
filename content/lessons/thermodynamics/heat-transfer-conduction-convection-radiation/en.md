---
title: Three ways heat moves
summary: >-
  A metal spoon left in hot tea gets warm at the handle without touching
  the tea, air above a radiator rises even though nothing pushes it, and
  sunlight warms your face across 150 million kilometres of empty space —
  conduction, convection and radiation, the only three ways heat can travel.
parameters:
  dT: temperature difference ΔT
  k: thermal conductivity of the material k
  Tsurf: hot surface's absolute temperature T
variables:
  - heat transferred by conduction, convection, and radiation
  - thermal conductivity of the material
  - the area heat crosses
  - temperature difference driving the flow
  - thickness of the conducting material
  - convective heat transfer coefficient
  - emissivity of the radiating surface
  - the Stefan–Boltzmann constant, 5.67×10⁻⁸ W/(m²·K⁴)
  - absolute temperature of the radiating surface
---

## Try it

1. Raise the slider "temperature difference ΔT". Watch the heat spreading along the spoon, the rising air above the radiator, and the radiating sun all intensify together.
2. Raise the slider "thermal conductivity k" toward copper's value. Watch only the spoon's heat front race ahead — convection and radiation do not care what the spoon is made of.
3. Raise the slider "hot surface temperature T" toward 800 K. Watch the radiated power climb far faster than ΔT alone would suggest.

## Real-life examples

1. **A steel spoon left in hot tea.** With ΔT = 70°C between the tea and the air, and steel's conductivity (k = 15 W/(m·K)), heat creeps up the handle by direct contact — conduction, molecule bumping molecule.
2. **A radiator warming a room.** With ΔT = 40°C between the radiator and the room air, but a poor conductor like wood nearby (k = 0.2 W/(m·K)), almost none of the useful warming comes from touching the radiator — it comes from convection, air heated at the radiator rising and carrying warmth around the room.
3. **A red-hot stove element.** At Tsurf = 800 K with a large ΔT = 60°C and a copper pan (k = 400 W/(m·K)) on top, both conduction into the pan and radiation off the glowing element are intense — you can feel the heat before you even touch anything.

## Test yourself

1. Get the conduction rate along the spoon to about 1 W.
2. Get the radiated power from the hot surface to about 500 W.
3. Set up a very hot, very conductive scene: ΔT above 60°C with a conductivity above 200 W/(m·K).

## Intuition

Heat always moves from hot to cold, but it has exactly three routes for getting there. Touch a metal spoon left in a hot drink and the handle warms even though your hand never touched the liquid — that is conduction, energy passed molecule to molecule through a solid, fastest through metals and slowest through wood, wool or air. On screen, drag the slider "thermal conductivity k" toward copper's value and watch the heated stretch of the spoon race outward much faster than it does for wood.

Hold your hand above a radiator, not beside it, and you feel warm air rising — that is convection, heat carried physically by a moving fluid, air or water, as the warmed part becomes less dense and floats upward while cooler fluid sinks in to replace it. Raise the slider "temperature difference ΔT" and the rising-air arrows above the radiator panel lengthen, because a bigger temperature gap drives faster circulation. Finally, step outside on a sunny day and feel warmth on your skin with no air or contact involved at all — that is radiation, energy carried by light itself across empty space, which is also how a glowing stove element or the Sun, 150 million kilometres away with no medium in between, can still warm you.

## Formal

Conduction follows Fourier's law, $Q_{cond}/t = kA\Delta T/d$: the rate of heat flow through a solid is set by the material's conductivity $k$, the area $A$ it crosses, the temperature difference $\Delta T$, and the thickness $d$ it must cross.

Convection is described by Newton's law of cooling, $Q_{conv}/t = hA\Delta T$, and radiation by the Stefan–Boltzmann law, $Q_{rad}/t = \varepsilon\sigma AT^4$ — power rising with the *fourth power* of absolute temperature, which is why a surface only slightly hotter can radiate dramatically more.

## Advanced

Because radiated power scales as $T^4$, doubling a surface's absolute temperature multiplies its radiated power by sixteen, not two — a subtlety that conduction and convection, both linear in $\Delta T$, do not share, and the reason extremely hot objects (a stove element, a star) are dominated by radiative heat loss even when touching or surrounding fluid could also carry heat away.

## Derivation

1. Conduction: heat creeps through a solid at a rate set by the material's conductivity, the crossing area and temperature difference, and inversely by how thick the material is.
2. Convection: a moving fluid carries heat at a rate set by a transfer coefficient that bundles up all the details of how the fluid flows.
3. Radiation: every warm surface radiates power set by its area and the fourth power of its absolute temperature, with no fluid or contact required at all.

## Real world

### Cookware handles
Pan and pot handles are made of wood or plastic, both poor conductors, specifically so heat from the metal body cannot creep into your hand by conduction.

### Double-glazed windows
A thin layer of trapped air between two panes blocks conduction (air conducts poorly) while the sealed gap also suppresses convection currents that would otherwise carry heat straight through.

### Thermos flasks
A vacuum between a thermos's two walls stops conduction and convection completely, since both need matter to carry heat, leaving only slow radiation across the gap — that vacuum is why a thermos keeps drinks hot for hours.

### Central heating radiators
Despite the name, household "radiators" transfer most of their heat by convection, warming the air that touches them and letting that air carry the warmth around the room.
