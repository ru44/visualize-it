---
title: The greenhouse effect
summary: >-
  Without an atmosphere Earth would sit near −18 °C. With one, it sits near
  +15 °C. The gap between those two numbers is the whole greenhouse effect.
parameters:
  alb: albedo — sunlight reflected
  x: greenhouse strength
variables:
  - the albedo — the fraction of sunlight Earth reflects straight back to space
  - the solar constant, 1361 W/m², the Sun's power per square metre at Earth's distance
  - the Stefan-Boltzmann constant, 5.67 × 10⁻⁸ W/(m²·K⁴)
  - the effective greenhouse strength, how much outgoing heat the atmosphere traps
  - the surface temperature
---

## Intuition

Set greenhouse strength to 0 — no trapping atmosphere at all — and the curve settles near −18 °C, the temperature Earth's surface would reach from sunlight alone with today's albedo. That is colder than any inhabited place on the planet, and it is the honest number for an airless Earth: reflective, sunlit, but with nothing to hold the heat in.

Now drag greenhouse strength up toward its present-day value near 0.78 and the temperature climbs to about +15 °C, Earth's actual average. The atmosphere is not adding energy; it is slowing down how fast the energy that arrived can leave, the same way a blanket keeps you warm by slowing heat loss rather than generating any of its own.

## Formal

The disc Earth presents to the Sun has area $\pi r^2$ while the sphere that radiates the heat away has area $4\pi r^2$, so the absorbed solar power per square metre of surface, averaged over day and night, is $(1-\alpha)\frac{S_{0}}{4}$. A greenhouse atmosphere absorbs and re-radiates part of the outgoing heat, cutting the effective outward flux to $\sigma T^4\left(1-\frac{\epsilon}{2}\right)$.

Setting absorbed equal to emitted and solving for temperature gives $T = \left[\frac{(1-\alpha)S_{0}}{4\sigma(1-\epsilon/2)}\right]^{1/4}$ — a fourth root, because radiated power grows with the fourth power of temperature.

## Advanced

This one-layer model is a simplification: real greenhouse warming depends on the vertical structure of the atmosphere, where different gases absorb different wavelengths, and on feedbacks — warmer air holds more water vapour, itself a greenhouse gas, which amplifies the initial warming (a positive feedback), while more clouds can reflect more sunlight (a partial negative feedback). Climate sensitivity is usually quoted as the equilibrium warming from doubling CO₂ concentration, once these fast feedbacks have played out.

## Derivation

1. Only Earth's cross-sectional disc catches sunlight, but the whole sphere radiates it back out, splitting the absorbed power by a factor of four.
2. At equilibrium, absorbed solar power must equal the heat actually escaping to space, reduced by whatever fraction the atmosphere re-radiates back down.
3. Solving that balance for temperature gives the surface temperature as a fourth root of the incoming flux.

## Real world

### Climate change
Rising CO₂ and methane increase effective greenhouse strength, pushing surface temperature up along exactly this curve.

### Venus
Venus's thick CO₂ atmosphere pushes its greenhouse strength so high that its surface reaches roughly 465 °C, hotter than Mercury despite being farther from the Sun.

### Greenhouses and cars
A literal greenhouse (or a parked car) warms by trapping infrared radiation behind glass, a related but distinct mechanism from the atmospheric greenhouse effect.

### Ice ages and albedo feedback
More ice means higher albedo, which reflects more sunlight and cools the planet further, a feedback loop that can deepen an ice age once it starts.
