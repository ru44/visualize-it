---
title: Stall and the critical angle
summary: >-
  Lift is set by angle of attack, not speed — push that angle past a critical
  value at any speed and the flow separates, lift collapses, and the wing
  stalls.
parameters:
  alpha: angle of attack α
  v: airspeed v
variables:
  - angle of attack — the angle between the chord line and the oncoming flow
  - 'critical (stall) angle, here about 15°'
  - 'lift coefficient, which peaks at $\alpha_{\text{crit}}$'
charts:
  - title: Lift coefficient vs angle of attack
    xLabel: α (°)
    yLabel: C_L
    series:
      - C_L(α)
---

## Intuition

Push the angle slider past about 15° and watch the streamlines over the top of the wing: instead of following the curved upper surface smoothly, they start to wobble, separate, and tint red. That is the boundary layer losing its grip on the surface — it can no longer turn the corner around the increasingly steep upper curve and peels away, and the smooth downward deflection of air that produced lift breaks down with it.

Notice the airspeed slider does nothing to trigger this — you can stall a wing at any speed, fast or slow, high in the sky or on final approach. What matters is purely the angle between the chord and the oncoming air. A common misconception is that stall means "too slow"; the honest statement is "too steep": low-speed flight just happens to need a steep angle to make enough lift, which is why stalls are more often met near landing speed, but a diving aircraft can just as easily stall by pulling the nose up too hard.

## Formal

$C_L(\alpha)$ rises roughly linearly (thin-airfoil theory, $C_L \approx 2\pi\alpha$ in radians) until flow separation begins near $\alpha_{\text{crit}}$, after which $C_L$ falls even as $\alpha$ keeps increasing.

Stall speed follows directly from $L = W$ at $C_{L,\max}$: $v_{\text{stall}} = \sqrt{2W/(\rho S C_{L,\max})}$ — a speed, but caused by an angle.

## Advanced

Separation occurs where the boundary layer’s momentum can no longer overcome the adverse pressure gradient on the aft upper surface (where pressure is recovering back toward free-stream). Turbulent boundary layers resist separation better than laminar ones because they mix momentum from the outer flow back toward the wall — which is why vortex generators and turbulators are deliberately used to delay stall.

## Derivation

1. In steady level flight lift must exactly balance weight.
2. The lift coefficient has a hard ceiling set by the airfoil and reached at $\alpha_{\text{crit}}$.
3. Solving for the minimum speed at which enough lift is even possible — fly any slower and no angle of attack will save you.

## Real world

### Stall warning systems
Aircraft use angle-of-attack sensors, not airspeed alone, to warn pilots — exactly because stall is an angle phenomenon.

### Landing technique
Pilots fly a target approach speed specifically to keep a safety margin between the angle of attack in use and $\alpha_{\text{crit}}$.

### Stall strips and slats
Small fixed strips or deployable slats on the leading edge re-energise the boundary layer to push $\alpha_{\text{crit}}$ higher.

### Car spoilers and rear wings
The same separation physics limits how much downforce a rear wing can generate before it stalls and downforce collapses.
