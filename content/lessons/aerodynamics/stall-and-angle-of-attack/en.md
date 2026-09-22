---
title: Stall and the critical angle
summary: >-
  This is why planes can stall even while flying fast: lift depends on the
  wing's angle, not its speed, and tilting too far collapses it at any speed.
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

## Try it

1. Picture an aircraft on a slow final approach, tilted 13°, close to the edge but still flying.
2. Push «angle of attack α» past about 15° and watch the streamlines over the wing. They start to wobble, separate, and tint red.
3. Now raise «airspeed v» a lot. Nothing changes — the stall doesn't care how fast you're going.

## Real-life examples

1. **Normal cruise flight.** Tilted 5° and flying at 60 m/s, the wing has plenty of safety margin below the critical angle.
2. **A slow final approach.** Tilted 13° and flying at only 25 m/s, it's close to the edge but the flow is still smoothly attached.
3. **A steep, fast pull-up that still stalls.** Tilted to 18°, past the critical angle, even at a fast 70 m/s the wing has already lost its lift.

## Test yourself

1. Push the angle of attack past 15° while flying fast (at least 60 m/s), to prove stall doesn't care about speed.
2. Find the angle that gives the highest possible lift coefficient, about 1.87, right at the edge of stall.
3. Stall the wing at a slow, landing-like speed, between 20 and 35 m/s.

## Intuition

Picture an aircraft on a slow final approach, tilted 13°, close to the edge of a stall but still flying safely. Push «angle of attack α» past about 15° and watch the streamlines over the top of the wing: instead of following the curved surface smoothly, they start to wobble, separate, and tint red. That's the air losing its grip on the wing — it can no longer follow the increasingly steep curve, peels away, and the smooth downward push on the air that made lift breaks down with it.

Notice that raising «airspeed v» does nothing to trigger this: you can stall a wing at any speed, fast or slow, high in the sky or on final approach. What matters is purely the angle between the wing and the oncoming air. A common mistake is thinking stall means "too slow"; the honest statement is "too steep" — slow flight just happens to need a steep angle to make enough lift, which is why stalls often happen near landing speed, but a diving aircraft can just as easily stall by pulling its nose up too hard.

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
