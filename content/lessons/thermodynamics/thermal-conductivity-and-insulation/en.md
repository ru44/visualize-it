---
title: Thermal conductivity and insulation
summary: >-
  A sheep grows a thick woolly coat instead of a thin one because
  trapped air barely conducts heat at all, and a builder chooses
  fibreglass over solid brick for exactly the same reason — how fast
  a wall leaks heat depends on one material property, its thermal
  conductivity, combined with how thick you make it.
parameters:
  k: thermal conductivity k
  A: wall area A
  d: wall thickness d
  dT: indoor–outdoor temperature difference ΔT
variables:
  - heat energy conducted
  - time
  - thermal conductivity of the material
  - area heat crosses
  - temperature difference across the wall
  - wall thickness
  - U-value, k/d
---

## Try it

1. Raise the slider "thickness d". Watch the heat-loss rate fall — a thicker wall of the same material always leaks heat more slowly.
2. Raise the slider "conductivity k" from wool's value toward brick's. Watch the same wall lose heat far faster.
3. Raise the slider "wall area A". Watch the total heat-loss rate climb, even though nothing about the wall material changed.

## Real-life examples

1. **A wool-insulated wall.** A 15 m² wall of wool insulation (k = 0.04 W/(m·K)), 15 cm thick, with a 20°C gap between inside and outside, loses only about 80 W — roughly one dim light bulb's worth of heat.
2. **A bare, uninsulated brick wall.** The same 15 m² area and 20°C gap, but now 25 cm of plain brick (k = 0.8 W/(m·K)) instead of wool, loses around 960 W — more than ten times as much heat through a wall of similar thickness.
3. **A wooden front door.** A 2 m² wooden door (k = 0.13 W/(m·K)), 4 cm thick, with a 15°C gap, loses roughly 100 W — noticeable, but far less than the same area of bare brick would.

## Test yourself

1. Get the heat-loss rate below 50 W on a wall bigger than 10 m².
2. Get the U-value below 0.3 W/(m²·K), a genuinely well-insulated wall.
3. Set up a leaky wall: heat loss above 500 W with a conductivity above 0.5 W/(m·K).

## Intuition

Push your hand against a plain brick wall and a wool jumper on a cold day, and the brick feels far colder to the touch, even at the same temperature — brick conducts heat out of your warm hand much faster than wool does, and a wall works the same way. On screen, raise the slider "conductivity k" from wool's low value toward brick's much higher one, keeping everything else fixed, and watch the heat-loss rate climb sharply for the exact same wall thickness and temperature gap.

Thickness fights back against conductivity: raise the slider "thickness d" and the same material now loses heat more slowly, because the heat has farther to travel through it. Builders combine both effects into a single number, the U-value, $U = k/d$: a low U-value means a wall barely leaks heat regardless of whether that comes from a thin layer of a very good insulator or a thick layer of an average one, which is exactly why wool, straw and trapped air (all poor conductors) make such effective, lightweight insulation compared to a slab of solid brick.

## Formal

Fourier's law gives the rate of conductive heat flow through a slab as $Q/t = kA\Delta T/d$, where $k$ is the material's thermal conductivity, $A$ the area, $\Delta T$ the temperature difference across it, and $d$ its thickness.

Builders combine $k$ and $d$ into a single U-value, $U = k/d$, so the same relationship becomes $Q/t = UA\Delta T$ — a lower U-value always means a better-insulated wall, window or roof.

## Advanced

Real walls are usually layered — plaster, brick, insulation, render — and each layer adds its own thermal resistance $d/k$ in series, so the layers' resistances simply add before being inverted back into a single overall U-value, exactly the way electrical resistors in series add before a combined current is found.

## Derivation

1. Fourier's law states that conductive heat flow through a slab depends on the material's conductivity, the crossing area, and the temperature difference, and inversely on the slab's thickness.
2. Writing that relationship out gives the heat-loss rate directly: Q/t = kAΔT/d, in watts.
3. Combining k and d into a single ratio, the U-value U = k/d, lets the same rate be written Q/t = UAΔT.

## Real world

### Double glazing
A sealed gap of still, trapped air between two panes of glass conducts far more slowly than a single thick pane, which is why double- and triple-glazed windows have dramatically lower U-values than single glazing.

### Loft insulation
Homes lose a large share of their heat through the roof, so a thick layer of low-conductivity loft insulation is one of the cheapest, most effective upgrades for cutting a heating bill.

### Animal fur and feathers
A thick coat of fur or feathers traps a layer of still air next to the skin, and since trapped air conducts heat extremely poorly, that trapped layer — not the fur itself — is what actually keeps an animal warm.

### Building regulations
Modern building codes set a maximum allowed U-value for walls, roofs and windows, forcing new buildings to use enough insulation thickness or low enough conductivity materials to meet an energy-efficiency standard.
