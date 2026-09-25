---
title: Propellers and jets
summary: >-
  Every propeller, fan and jet engine makes thrust the same way — grab some
  air and throw it backward — but grabbing a lot of air gently wastes far
  less energy than grabbing a little air violently, which is why the biggest
  engines on a modern airliner are mostly a huge, slow fan.
parameters:
  A: disc area A
  v: aircraft speed v
  dv: speed added Δv
variables:
  - thrust
  - mass flow rate of air through the disc each second
  - speed added to that air, exhaust speed minus aircraft speed
---

## Try it

1. Picture a big turbofan's intake, 8 m² of fan disc, flying at 230 m/s, adding just 60 m/s to the air.
2. Read the thrust and the propulsive efficiency — both should look impressive.
3. Shrink «disc area A» right down to 0.3 m² and crank «speed added Δv» up to 400 m/s instead. Watch efficiency fall hard even though the engine is now working much harder per kilogram of air.

## Real-life examples

1. **A modern high-bypass turbofan.** An 8 m² fan adding 60 m/s to the air at 230 m/s cruise makes about 153,000 N of thrust at roughly 88% propulsive efficiency — most of the "jet" you hear is really a big ducted fan.
2. **An old-style narrow jet engine.** A 0.3 m² core nozzle slamming the air up by 400 m/s at the same cruise speed makes less thrust, about 63,000 N, and wastes far more energy: efficiency drops to about 53%.
3. **A propeller-driven aircraft at lower speed.** A 4 m² propeller disc adding a gentle 25 m/s at 70 m/s cruise makes about 10,000 N of thrust at roughly 85% efficiency — propellers are gentle by design.

## Test yourself

1. Make about 150,000 N of thrust using a large, gentle fan — keep the speed added under 100 m/s.
2. Get the propulsive efficiency above 85%.
3. Drop the propulsive efficiency below 55% while still producing at least 40,000 N of thrust — a thirsty, narrow jet.

## Intuition

An engine only has one trick: grab some air and throw it backward faster than it arrived. Newton's third law does the rest — throw air backward, and the air pushes the engine (and the aircraft attached to it) forward with exactly the same force. Raise «speed added Δv» and watch thrust climb — more speed change on the same mass flow means more force, simple enough. But now shrink «disc area A» at the same time, keeping thrust roughly where it was: the mass of air being grabbed each second drops a lot, so producing the same force needs a much bigger speed change per kilogram.

That trade matters because kinetic energy grows with speed squared, not speed. Doubling the speed added to a small amount of air roughly quadruples the energy wasted heating and speeding up the exhaust rather than moving the aircraft forward — energy the fuel paid for but the aircraft never got the benefit of. A big slow fan barely speeds the air up at all, so almost none of the engine's energy is wasted that way; a small fast jet speeds a little air up a lot, and most of that energy just disappears backward as noise and hot, fast exhaust. That's the whole reason modern airliners buried their old narrow jets inside enormous ducted fans.

## Formal

Thrust from momentum theory is $T = \dot m\, \Delta v$, where the mass flow rate through the propulsor's disc is $\dot m = \rho A v$ (density times disc area times the air's speed through it).

The ideal propulsive efficiency — useful thrust power out, divided by total kinetic power put into the airflow — works out to $\eta = \dfrac{2v}{2v + \Delta v}$: it falls toward zero as $\Delta v$ grows relative to flight speed $v$, and rises toward 100% as $\Delta v \to 0$ (though thrust itself would then also fall toward zero, so real designs balance the two).

## Advanced

Real engines don't hit this ideal efficiency: extra losses come from the fan and core's own aerodynamic inefficiencies, swirl left in the exhaust, and (for very high-bypass fans) the extra weight and drag of a physically huge nacelle — which is why bypass ratios have grown steadily but not without limit as engine makers balance ideal propulsive efficiency against these real-world costs.

## Derivation

1. Each second, the engine accelerates a mass of air $\dot m = \rho A v$ (density times disc area times the speed of air moving through it) up by $\Delta v$.
2. Newton's second law says the force needed to change that much momentum every second is $T = \dot m\,\Delta v$, and by the third law the air pushes back on the engine with the same force, forward: that reaction is thrust.
3. Moving a huge mass of air by a small $\Delta v$ makes the same thrust as moving a small mass by a huge $\Delta v$, but wastes far less kinetic energy in the exhaust — which is exactly why propulsive efficiency $\eta = \dfrac{2v}{2v+\Delta v}$ falls as $\Delta v$ grows.

## Real world

### High-bypass turbofans
Most of the air a modern airliner engine moves never enters the engine's hot core at all — it is pushed straight through the giant fan around the outside, exactly the "big, slow, gentle" strategy this lesson describes.

### Helicopter and drone rotors
The same trade-off explains why a helicopter's huge, slow rotor disc is so much more efficient at hovering than a small, screaming ducted fan would be for the same thrust.

### Why fighter jets sacrifice efficiency for speed
A fighter's narrow, high-speed exhaust is a deliberate low-efficiency choice, trading fuel economy for the compact size and huge thrust-to-weight ratio a big slow fan could never match.

### Sailing ship propellers versus paddlewheels
Even without an engine, the same idea appears in ship propulsion history: a wide, slow-turning propeller pushes more water gently and wastes less energy than a small, fast one churning the same thrust.
