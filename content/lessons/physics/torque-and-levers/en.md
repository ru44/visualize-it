---
title: Torque balance and the lever
summary: >-
  A lever balances when the turning effect on each side matches — a small force
  far from the pivot can balance a large force close to it.
parameters:
  F1: known force F1
  d1: its distance from pivot d1
  x: 'lever arm for F2, d2'
variables:
  - a known force and its distance from the pivot
  - distance of the balancing force from the pivot (the horizontal axis)
  - force needed at distance $d_2$ to balance the lever
---

## Intuition

Drag $d_2$ (labelled $x$) outward, away from the pivot: the required balancing force $F_2$ drops sharply — moving the same force further from the pivot buys a much bigger turning effect, so less force is needed to match $F_1 d_1$.

Push $d_2$ toward the pivot instead and the curve shoots upward: balancing a force close to the pivot with almost no lever arm of your own requires enormous force — the practical reason a long crowbar needs so much less effort than a short one to move the same load.

## Formal

Equilibrium requires equal and opposite torques: $F_1 d_1 = F_2 d_2$, so $F_2 = F_1 d_1 / d_2$.

This is a hyperbola in $d_2$: $F_2$ and $d_2$ are inversely proportional for fixed $F_1 d_1$.

## Advanced

This is the special case of torque $\boldsymbol\tau = \mathbf r \times \mathbf F$ for forces perpendicular to the lever arm, where the magnitude is simply $rF$; a mechanical advantage of $d_1/d_2$ trades force for distance moved (the lever's effort end travels further), so no energy is gained — work in equals work out, a first illustration of the conservation principle behind every simple machine.

## Derivation

1. Torque is force times distance from the pivot.
2. A balanced lever has equal and opposite torques.
3. Solve for the balancing force.

## Real world

### Crowbars and wrenches
A longer handle multiplies the turning force you can apply for the same effort.

### Seesaws
Two people of different weight balance by sitting at different distances from the pivot.

### Wheelbarrows
The load, wheel and handle positions set a mechanical advantage via exactly this torque balance.

### Bridge and crane design
Counterweights are placed at calculated distances to balance the torque of a load being lifted.
