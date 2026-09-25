---
title: Refrigerators and heat pumps
summary: >-
  A refrigerator does not make cold, it moves heat uphill from a cold
  box to a warm kitchen, and it takes work to push heat the "wrong"
  way — but a heat pump exploits that same uphill trick in reverse,
  delivering more heating energy than the electrical energy it
  consumes, something a plain electric heater can never do.
parameters:
  Tc: cold reservoir T_c
  Th: hot reservoir T_h
variables:
  - coefficient of performance, cooling mode
  - coefficient of performance, heating mode
  - absolute temperature of the cold reservoir
  - absolute temperature of the hot reservoir
---

## Try it

1. Raise the slider "hot reservoir T_h" while "cold reservoir T_c" stays put. Watch both coefficients of performance fall as the temperature gap widens.
2. Lower "cold reservoir T_c" toward 250 K. Watch the cooling COP drop — pumping heat out of somewhere already very cold takes disproportionately more work.
3. Narrow the gap between T_c and T_h as much as the sliders allow. Watch both coefficients climb well above 1 — moving heat a short "distance" in temperature is cheap.

## Real-life examples

1. **A kitchen fridge.** With the inside at T_c = 277 K (4°C) and the kitchen at T_h = 295 K (22°C), an 18-degree gap gives a healthy coefficient of performance — several units of heat moved out of the fridge for every unit of work the compressor uses.
2. **A heat pump warming a home in winter.** Pulling heat from outside air at T_c = 268 K (−5°C) and delivering it indoors at T_h = 293 K (20°C), a 25-degree gap still lets a heat pump deliver noticeably more heating energy than the electrical energy it consumes.
3. **An air conditioner on a hot day.** Its cold evaporator coil runs at T_c = 283 K (10°C) to chill room air, dumping heat outside at T_h = 308 K (35°C) — a 25-degree gap that determines exactly how hard the compressor has to work to keep a room cool.

## Test yourself

1. Get the heating coefficient of performance to exactly 10.
2. Set up a hard cooling job: get the cooling COP below 4 with a very cold reservoir under 260 K.
3. Set the temperature gap between reservoirs to exactly 20 K.

## Intuition

Heat never flows from cold to hot on its own — a refrigerator forces it to, using a compressor that does mechanical work on a refrigerant, and that borrowed work is exactly why a fridge's power cord is plugged into the wall at all. On screen, raise "hot reservoir T_h" and watch both coefficients of performance drop, because pushing heat across a bigger temperature gap costs proportionally more work for the same amount of heat moved.

A heat pump runs the identical cycle with a different goal: instead of caring about the cold side getting colder, you care about the hot side getting hotter, and the same compressor work that pulled a little heat from the cold outdoor air now delivers that heat plus the work itself to the warm side. That is why a heat pump's heating coefficient of performance is always above 1 — often 3 or 4 — while a plain electric resistance heater converts its electrical energy to heat one-for-one, a coefficient of exactly 1, making it strictly the worse deal whenever a heat pump is an option.

## Formal

A reversible refrigerator's cooling coefficient of performance is $COP_{cool} = T_c/(T_h-T_c)$: heat removed from the cold side per unit of work supplied.

Running the identical cycle to deliver heat instead gives $COP_{heat} = T_h/(T_h-T_c) = COP_{cool} + 1$, always at least one unit higher than the cooling coefficient for the same two reservoirs.

## Advanced

Because $COP_{heat} = COP_{cool}+1$ and both blow up as $T_h \to T_c$, real refrigeration cycles never reach the Carnot limit — irreversibilities in real compressors, valves and heat exchangers mean actual coefficients of performance sit noticeably below the reversible ideal these formulas describe, though the ideal still sets the ceiling no real machine can beat.

## Derivation

1. A reversible refrigerator moves heat Q_c from the cold reservoir using work W, with the ratio Q_c/W fixed by T_c/(T_h−T_c).
2. Running the same cycle as a heat pump delivers Q_h = Q_c + W to the hot reservoir, giving Q_h/W = T_h/(T_h−T_c).
3. A plain resistive heater skips the cycle entirely and turns work straight into heat, giving it a coefficient of performance of exactly 1 — the baseline every heat pump beats.

## Real world

### Household fridges and freezers
Every kitchen fridge is a heat pump run in cooling mode, moving heat from its insulated interior out into the room through coils on its back or underside.

### Home heating
Air-source and ground-source heat pumps are increasingly used to heat homes because, unlike a resistive electric heater, they can deliver several times more heating energy than the electrical energy they consume.

### Air conditioning
Air conditioners are refrigerators for a room: the same cycle that keeps food cold in a fridge keeps a house cool by pumping heat from indoors to the hotter outdoors.

### Why heat pumps struggle in extreme cold
As outdoor temperature drops far below indoor temperature, the widening gap between T_c and T_h drags a heat pump's coefficient of performance down toward 1, which is why some cold-climate heat pumps add backup resistive heating for the coldest days.
