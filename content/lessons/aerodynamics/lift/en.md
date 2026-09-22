---
title: Lift and the airfoil
summary: >-
  A wing turns the airflow downward; by Newton’s third law the air pushes back
  up on the wing. That force, together with the pressure difference it creates,
  is lift.
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

## Intuition

Drag the angle of attack up and watch the streamlines: the wing tilts and every line bends downward as it passes, most sharply just behind the trailing edge, where the downward deflection is drawn as downwash. Turning that much air downward every second requires a downward force on the air — so by Newton’s third law the air pushes the wing up. That reaction force is most of what you feel as lift. You should ignore the old "equal transit time" story that air splitting at the leading edge must meet back up at the trailing edge at the same time: it is not true, does not follow from any physical law, and gets the direction of causation backwards.

Raise the airspeed slider instead and the lift and drag arrows both grow — lift with the square of speed, so doubling v roughly quadruples L. Notice the streamlines bunch closer together just above the wing’s curved upper surface: that tighter spacing is faster-moving air, and faster-moving air has lower pressure (Bernoulli). The suction on top and the higher pressure underneath add up to the same lift force as the momentum picture — two ways of describing one phenomenon, not two competing mechanisms.

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
