---
title: Electric power and energy bills
summary: >-
  A power rating in watts times the hours it runs gives the energy used,
  and dividing by 1000 turns it into the kilowatt-hours an electricity
  bill actually charges for — which is why a kettle costs real money
  each month but an LED bulb barely registers.
parameters:
  P: appliance power P
  t: hours used per month t
  c: price per kWh c
variables:
  - power — the rate an appliance uses energy, in watts
  - time — how many hours a month the appliance actually runs
  - energy — the total energy used, in watt-hours (divided by 1000 for kWh)
  - price — what the utility charges for each kilowatt-hour
charts: []
---

## Try it

1. Set «appliance power P» to a kettle's 2200 W, «hours used per month t» to 5 and the price to 0.28. The readouts show 11 kWh and a cost of 3.08 dollars: a high power costs real money even for a few hours.
2. Set P to a fridge's 150 W and t to 720 hours (it runs all month). The readouts show 108 kWh and 30.24 dollars: a modest power adds up when the hours are long.
3. Drop P to an LED bulb's 9 W with t = 120 hours. The cost is only 0.30 dollars. Even at the slider's maximum of 730 hours it stays under 2 dollars.

## Real-life examples

1. **Kettle.** At 2200 W, boiled for about 5 hours across a month, it uses 11 kWh — around 3.08 dollars at 0.28 dollars/kWh.
2. **Fridge.** At an average 150 W but running nearly all 720 hours in the month, it uses 108 kWh — around 30.24 dollars, the biggest single cost of the three.
3. **LED bulb.** At just 9 W for 120 hours (4 hours a night), it uses only 1.08 kWh — about 30 cents for the whole month.

## Test yourself

1. Get the monthly cost to exactly 3 dollars, kettle-like.
2. Using a device under 15 W, still push the monthly cost above 1 dollar.
3. Using a 2000 W device, keep the monthly cost under 2 dollars.

## Intuition

A power rating in watts says how fast an appliance spends energy, the same way a car's speed says how fast it covers distance — and just as speed times time gives distance, power times time gives total energy used. A kettle rated 2200 W spends energy at a furious rate, but it is usually only on for a few minutes a day; a fridge is rated far lower, around 150 W, but it never really switches off, so its hours add up across the whole month instead.

That trade-off is exactly why the fridge, not the kettle, tends to be the bigger line on a real bill: «hours used per month t» matters just as much as «appliance power P». Drop «appliance power P» right down to an LED bulb's 9 W, though, and no matter how long «hours used per month t» runs, the monthly cost barely moves — which is the whole point of switching a house over to LEDs.

## Formal

Energy used is power times time, $E = Pt$; measured in watt-hours when $P$ is in watts and $t$ in hours, then divided by 1000 to get the kilowatt-hours ($\text{kWh}$) an electricity meter actually reads.

The bill is that energy times the price per kWh: $\text{Cost} = \dfrac{Ptc}{1000}$, combining the appliance's rating, how long it runs and the local tariff into one number.

## Advanced

Utilities often charge a lower "off-peak" price $c$ at night, when demand is low, which is why some appliances — dishwashers, EV chargers, immersion heaters — can be scheduled to run overnight for a meaningfully smaller bill for the exact same energy.

## Derivation

1. Energy used is power multiplied by the time it runs: $E = Pt$, in watt-hours.
2. A meter and a bill both read kilowatt-hours, so divide by 1000: $E_{kWh} = Pt/1000$.
3. Multiplying that by the price per kWh gives the bill itself: $\text{Cost} = E_{kWh}c$.

## Real world

### Energy labels

The EU and similar energy-label systems rate appliances mainly by how many kWh they use in typical operation each year, precisely because that — not the power rating alone — predicts the real running cost.

### Smart meters

Smart meters track power draw continuously and multiply by the time at each price band, giving a household a live running total of the bill instead of one estimate at the end of the month.

### Standby power

Devices left on standby still draw a small constant power for every hour of the month, which is why many small "always-on" gadgets can add up to a noticeable slice of a bill despite each one seeming trivial.

### Solar panels

A home solar panel effectively subtracts from the hours of grid power used each month, which is exactly why its payback time is calculated using this same power-times-time-times-price arithmetic run in reverse.
