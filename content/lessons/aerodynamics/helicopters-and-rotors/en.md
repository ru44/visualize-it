---
title: Helicopters and rotors
summary: >-
  A helicopter's rotor is just a spinning wing, making lift the whole way
  round — and tilting that spinning disc, not the fuselage, is how a
  helicopter actually moves forward, climbs and turns.
parameters:
  R: rotor radius R
  W: aircraft weight W
  tilt: rotor tilt
variables:
  - induced (downwash) velocity at the rotor disc
  - thrust
  - air density
  - rotor disc area
---

## Try it

1. Picture a small helicopter, rotor radius 3.84 m, weighing 6,076 N, hovering with the rotor level.
2. Read the downwash speed and the hover power — both are estimates, but realistic ones.
3. Drag «rotor tilt» forward a few degrees. Watch total thrust climb slightly and the whole disc — not the fuselage — lean to push the aircraft ahead.

## Real-life examples

1. **A light helicopter hovering.** A 3.84 m rotor lifting 6,076 N pushes air down at roughly 7.3 m/s and needs on the order of 44 kW of ideal power to hover — a real light helicopter's engine also has to cover losses this estimate ignores.
2. **A heavy-lift helicopter hovering.** A 16 m rotor lifting nearly 550,000 N still only pushes air down at about 16.7 m/s — barely more than twice the light helicopter's downwash, despite lifting almost 100 times the weight, because its disc is so much bigger.
3. **The light helicopter tilted forward for cruise.** Tilt the same rotor 12° forward and, to keep supporting the same weight, total thrust has to rise by about 2% — a small but real extra cost of flying fast.

## Test yourself

1. Get the hover downwash velocity down to about 8 m/s by choosing a big enough rotor for a light aircraft.
2. Push disc loading (thrust over disc area) above 400 N/m² — a compact, power-hungry rotor.
3. Tilt the rotor forward past 10° and see total thrust climb more than 1% above the aircraft's weight.

## Intuition

A helicopter's rotor blade is a wing, full stop — it has an airfoil cross-section, an angle of attack, and it makes lift the same way any wing does, it just does it by spinning in a circle instead of moving in a straight line. To hover, that spinning wing has to push a wide column of air straight down hard enough to support the whole aircraft's weight. Drag «rotor radius R» up and watch the downwash speed readout fall even though the aircraft weighs the same: a bigger disc spreads the same downward push over far more air, so each kilogram of air only needs a gentle shove — exactly the same "big and gentle beats small and violent" idea that makes a wide propeller more efficient than a narrow jet.

Now try «rotor tilt». A real helicopter doesn't pitch its whole fuselage to fly forward the way a plane does — instead, a mechanism called the swashplate tilts the spinning rotor disc itself, changing each blade's pitch angle at a different point in its own rotation so the whole disc leans one way while the fuselage stays comfortably level underneath it. Tilt the disc forward and the thrust vector, which always points straight through the disc, now has a small forward component pushing the helicopter ahead — while the vertical component still has to support the same weight, which is why total thrust has to climb slightly whenever the disc leans.

## Formal

By momentum theory, a rotor hovering with thrust $T$ over a disc of area $A$ in air of density $\rho$ pushes air down with induced velocity $v_i = \sqrt{\dfrac{T}{2\rho A}}$; the ideal power needed to hover is $P = T\,v_i$.

Thrust divided by disc area, $T/A$, is called disc loading: low disc loading (a large rotor for the aircraft's weight) means low downwash speed and low ideal power, which is exactly why heavy-lift helicopters carry enormous rotors rather than small, screaming ones.

## Advanced

Real hover power exceeds this ideal (induced) power because of blade profile drag, tip losses, and tail-rotor power needed to counter the main rotor's reaction torque — typically the ideal power this lesson estimates is 60-70% of the total shaft power a real engine must deliver, with the rest covering those extra losses.

## Derivation

1. Hovering steadily, the rotor pushes a column of air of roughly the disc's own cross-section downward, gaining downwash speed $w$: $L \approx \dot m\, w, \quad \dot m = \rho A v_i$.
2. Solving for the induced velocity gives $v_i = \sqrt{T/(2\rho A)}$ — the factor of 2 appears because the air continues accelerating below the disc, so only half its eventual speed change has happened right at the rotor.
3. The ideal power needed is force times velocity, $P = T\, v_i$: both fall as the disc area $A$ grows, since a bigger disc needs a smaller $v_i$ to support the same thrust.

## Real world

### Why heavy-lift helicopters have huge rotors
The Mil Mi-26, one of the heaviest helicopters ever built, carries an enormous 32 m rotor precisely to keep disc loading — and hover power — as low as this physics allows.

### Ground effect
Hovering close to the ground, the downwash can't fully develop, effectively raising the air pressure under the rotor and cutting the power needed to hover — pilots use this deliberately for a heavier, more efficient takeoff.

### Tandem and coaxial rotor helicopters
Aircraft like the Chinook (tandem) or Kamov Ka-52 (coaxial) use two rotors partly to avoid the tail-rotor power penalty, and partly to fit more total disc area — and so lower disc loading — into a compact airframe.

### Autorotation
If the engine fails, a helicopter's rotor keeps spinning driven by the upward flow of air through it during a controlled descent, still generating enough lift for a safe landing without any engine power at all.
