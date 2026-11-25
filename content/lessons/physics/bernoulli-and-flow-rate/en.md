---
title: Bernoulli and flow rate
summary: 'Keep flow rate constant through a changing pipe area, then use an ideal energy balance to compare pressures at equal height.'
parameters:
  v1: 'v₁ — speed at section 1'
  A1: 'A₁ — area at section 1'
  x: 'A₂ — area at section 2'
variables:
  - 'cross-sectional areas at the two sections'
  - 'flow speeds at the two sections'
  - 'static pressure difference p₁−p₂ at equal height'
charts:
  - title: Static pressure difference at density 1000 kg/m³
    xLabel: area A₂ (cm²)
    yLabel: Δp (kPa)
    series:
      - p₁ − p₂
---

## Try it

1. Set v₁ = 2 m/s, A₁ = 6 cm² and A₂ = 3 cm². The second area is half the first, so v₂ = 4 m/s. The lower chart gives p₁−p₂ = 6 kPa for density 1000 kg/m³.
2. Keep v₁ and A₁ fixed and set A₂ = 6 cm². The speeds are equal and the ideal pressure difference is zero.
3. Increase A₂ to 9 cm². The second speed falls to about 1.33 m/s and p₁−p₂ becomes about −1.11 kPa: pressure is higher at the wider section in this ideal model.

## Real-life examples

1. **Equal areas.** With v₁ = 1.5 m/s and both areas 6 cm², v₂ = 1.5 m/s and the ideal pressure difference is zero. Real pipe friction can still cause a pressure loss.
2. **A quarter-area section.** With v₁ = 1.5 m/s, A₁ = 6 cm² and A₂ = 1.5 cm², v₂ = 6 m/s and p₁−p₂ = 16.875 kPa.
3. **A ninth-area section.** With v₁ = 1 m/s, A₁ = 9 cm² and A₂ = 1 cm², v₂ = 9 m/s and p₁−p₂ = 40 kPa. The model holds the upstream flow fixed as the second area changes.

## Test yourself

1. Make A₁/A₂ = 2 so the second speed is twice the first.
2. Make the second speed approximately 8 m/s.
3. Make v₂²−v₁² approximately 20 m²/s². At the fixed fluid density, this corresponds to a pressure difference of 10 kPa.

## Intuition

Imagine a steady flow of incompressible liquid through a pipe with no leaks. The volume entering each second must equal the volume leaving. That volume rate is cross-sectional area multiplied by average speed. If a section has half the area, the liquid must move twice as fast there to carry the same volume each second.

Continuity gives the speed relation. To find a pressure difference, we need an energy model as well. For steady flow with negligible friction, no pump or turbine between the sections, equal height and approximately uniform section speeds, Bernoulli's equation relates increased speed to lower static pressure. This is a comparison along the same flow, not a rule that every faster fluid anywhere has lower pressure. The 3D pipe illustrates the area change; the lower chart calculates the pressure difference.

## Formal

For steady incompressible flow, $Q=A_1v_1=A_2v_2$, so $v_2=v_1A_1/A_2$. The area ratio is dimensionless; both areas must use the same unit. Here the controls use cm² and speeds use m/s. To express Q in m³/s, convert with $1\ \mathrm{cm^2}=10^{-4}\ \mathrm{m^2}$.

Under the stated ideal-flow assumptions at equal height, $p_1+\tfrac12\rho v_1^2=p_2+\tfrac12\rho v_2^2$. Thus $\Delta p=p_1-p_2=\tfrac12\rho(v_2^2-v_1^2)$. The pressure chart fixes $\rho=1000\ \mathrm{kg/m^3}$ and displays kPa. A positive Δp means lower static pressure at section 2; a negative value means higher pressure there.

## Advanced

At unequal heights, include the gravitational term ρgz. Viscous losses, pumps and turbines require additional energy terms, and nonuniform velocity profiles can require corrections. Narrowing a real outlet may also change the overall flow rate because the supply pressure and pipe resistance determine it. Here v₁ and A₁ remain fixed, so changing A₂ preserves the specified flow rate by construction.

## Derivation

1. Equate the mass passing both sections per second. The constant density cancels, leaving equal volume flow rates.
2. Apply the ideal Bernoulli energy balance between the two equal-height sections along the flow.
3. Rearrange to obtain p₁−p₂, then use the continuity relation for v₂.

## Real world

### Flow measurement

A narrowed section can produce a measurable pressure difference related to flow rate. Practical instruments need calibration and corrections for departures from the ideal model.

### Comparing pipe sections

A speed measurement and area at one section can estimate average speed at another for steady incompressible flow without leaks. Pressure needs the extra energy assumptions; continuity alone does not determine it.
