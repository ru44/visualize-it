---
title: Torque balance and the lever
summary: 'Balance turning effects about a pivot and see why a longer perpendicular lever arm needs less force.'
parameters:
  F1: 'F₁ — known force'
  d1: 'd₁ — its perpendicular arm'
  x: 'd₂ — balancing force’s perpendicular arm'
variables:
  - 'known force and its perpendicular arm about the pivot'
  - 'perpendicular arm of the balancing force'
  - 'force needed to give an equal, opposite torque'
---

## Try it

1. Set F₁ = 20 N, d₁ = 2 m and d₂ = 4 m. The first torque has magnitude 40 N·m, balanced by F₂ = 10 N on the other side.
2. Keep F₁ and d₁ fixed and double d₂ to 8 m. The balancing force halves to 5 N; the required balancing torque stays 40 N·m.
3. Reduce d₂ to 1 m. The required force rises to 40 N. In 3D the counterweight adjusts after a brief visual tilt; the 2D curve always gives the balanced value, not the transient force.

## Real-life examples

1. **A long effort arm.** A 40 N load with arm 0.5 m produces 20 N·m. An opposing effort with arm 5 m needs only 4 N in the ideal balance model.
2. **Two sides of a lever.** A 30 N force at 1.5 m balances a 15 N force at 3 m. Both torque magnitudes are 45 N·m.
3. **A three-to-one arm ratio.** A 45 N load at 0.5 m balances a 15 N effort at 1.5 m. The longer effort arm reduces force while increasing the distance that the effort point moves for a given small rotation.

## Test yourself

1. Make the required balancing force approximately 10 N.
2. Keep F₁ at 40 N and choose the arms so F₂ is within 0.3 N of 8 N.
3. Make the required balancing force less than 2 N.

## Intuition

A force's turning effect depends on where and how it acts. A 10 N force with a perpendicular arm of 4 m produces the same torque magnitude as 20 N with an arm of 2 m. If the two torques act in opposite directions, they can balance about the pivot.

The graph asks how much balancing force is needed as its arm changes. Keeping the first torque fixed means the product F₂d₂ must stay fixed, so a longer arm needs a smaller force. It does not create energy: in an ideal moving lever, the point with the longer arm travels farther for the same rotation. The fixed pivot also supplies a support force, which must be included when balancing forces on the whole lever.

## Formal

Torque magnitude is $\tau=Fd_\perp$, where d⊥ is the perpendicular distance from the pivot to the force's line of action. For forces perpendicular to their position arms, this equals the arm length. Opposite torques balance when $F_1d_1=F_2d_2$.

For $d_2>0$, the required force is $F_2=F_1d_1/d_2$. The formula assumes a fixed pivot and includes no extra torque from the lever's own weight or friction. Zero net torque means zero angular acceleration in this fixed-axis model, not necessarily zero angular velocity; a stationary balanced lever also starts at rest.

## Advanced

For a force making angle θ with its position vector, torque magnitude is rF sin θ. The component directed through the pivot contributes no torque. If F₁ is the load and F₂ is the effort here, the ideal force advantage F₁/F₂ is d₂/d₁. This is the reciprocal of the effort-to-load force ratio, so define the ratio before using the term “mechanical advantage.”

## Derivation

1. Find each torque magnitude by multiplying force by its perpendicular arm.
2. For rotational balance, the clockwise and counterclockwise torque magnitudes must be equal.
3. Divide by the positive arm d₂ to find the required balancing force F₂.

## Real world

### A handle

Applying a force farther from a fixed pivot increases its turning effect when the perpendicular component is unchanged. Pushing directly toward the pivot gives no torque about it.

### Balancing loads

Loads of different weights can balance at different perpendicular distances. The support carries the combined load even though the torques cancel.
