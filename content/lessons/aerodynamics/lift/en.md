---
title: Lift and the airfoil
summary: >-
  This predicts how much a wing can lift — an aircraft's, a bird's, or a
  sail's — and why tilting it too far makes that lift suddenly disappear.
parameters:
  alpha: angle of attack α
  v: airspeed v
variables:
  - 'lift force, perpendicular to the oncoming flow'
  - air density
  - airspeed
  - wing area
  - 'lift coefficient — how effectively the shape and angle turn air, given α'
charts:
  - title: Lift coefficient vs angle of attack
    xLabel: α (°)
    yLabel: C_L
    series:
      - C_L(α)
---

## Try it

1. Picture a small aircraft climbing away after takeoff, tilted 5° into the air at 50 m/s.
2. Raise «angle of attack α» slowly. The green lift arrow grows.
3. Keep going past 15°. The air over the wing breaks up, the arrow shrinks: that is a stall.

## Real-life examples

1. **A light aircraft climbing after takeoff.** Tilted 5° and flying at 50 m/s, its wing is well below the danger zone and produces strong, steady lift.
2. **The same aircraft on a slow final approach.** Tilted up to 12° and flying at only 30 m/s, it’s close to the 15° stall margin but still safely flying.
3. **A wing deliberately pushed too far.** Tilted to 17°, past the critical angle, even at 40 m/s its lift has already started to collapse.

## Test yourself

1. Reach about 20,000 N of lift while staying below the 15° stall angle.
2. Push the angle of attack just past 15° and see the lift coefficient stay above 1.5.
3. Without exceeding 15°, generate at least 30,000 N of lift.

## Intuition

Picture a small aircraft wing climbing away after takeoff, tilted 5° into the air at 50 m/s. Drag «angle of attack α» up and watch the streamlines: the wing tilts more, and every line bends downward as it passes, most sharply just behind the trailing edge. Turning that much air downward every second pushes down on the air, so the air pushes back up on the wing — that reaction is most of what you feel as lift. You can ignore the old story that air splitting at the leading edge must meet up again at the trailing edge at the same time: it isn’t true, and it gets the cause and effect backwards.

Now raise «airspeed v» instead, and watch both the lift and drag arrows grow: lift climbs fast, so doubling the speed roughly quadruples it. Notice the streamlines bunch closer together just above the wing’s curved top: that’s faster-moving air, and faster air has lower pressure. The suction on top and the higher pressure underneath add up to the same lift force as the "pushing air down" story — two ways of describing one thing, not two separate effects.

## Formal

Lift is defined as the force component perpendicular to the free-stream velocity: $L = \tfrac12 \rho v^2 S\, C_L$, with $C_L$ an empirical/theoretical function of angle of attack $\alpha$ (and Reynolds number, Mach number, camber, …).

For a thin cambered airfoil at modest α, thin-airfoil theory gives $C_L \approx 2\pi(\alpha - \alpha_{L0})$ (radians), i.e. lift grows linearly with angle of attack away from the zero-lift angle $\alpha_{L0}$ set by the camber — the near-linear region drawn in the chart below.

## Advanced

Formally, lift on a 2D airfoil equals $\rho v \Gamma$ (the Kutta–Joukowski theorem), where $\Gamma$ is the circulation of the flow around the section. The Kutta condition — that the flow must leave smoothly at a sharp trailing edge rather than wrapping around it — is what fixes $\Gamma$ to a unique physical value instead of leaving it undetermined, and it is this same condition, not equal transit time, that makes the flow above the wing move faster.

## Derivation

1. The wing deflects a mass flow rate $\dot m$ of air downward by a vertical velocity change $\Delta v_y$ (the downwash).
2. The mass flow scales with $\rho v S$ and the deflection scales with $v$ and $\alpha$; near-linear response is folded into $C_L(\alpha)$.
3. Conventionally written with a factor $\tfrac12$ so that $C_L$ matches the dimensionless coefficient measured in wind tunnels.

## Real world

### Takeoff and landing
Flaps increase effective camber and area at low speed, boosting $C_L$ so the wing can make enough lift before the wheels leave the ground.

### Bird and insect flight
Birds actively vary α and camber stroke by stroke; the same $L = \tfrac12\rho v^2 S C_L$ relation governs a sparrow as much as an airliner.

### Formula 1 wings
Inverted airfoils on a race car generate downforce the same way, pressing tyres into the track for more cornering grip.

### Sailing upwind
A sail is a cambered airfoil in cross-section; trimming it changes its effective angle of attack to the apparent wind.
