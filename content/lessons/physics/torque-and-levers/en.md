---
title: Torque balance and the lever
summary: >-
  This is why a long crowbar needs so much less effort than a short one to
  lift the same heavy load.
parameters:
  F1: known force F1
  d1: its distance from pivot d1
  x: 'lever arm for F2, d2'
variables:
  - a known force and its distance from the pivot
  - distance of the balancing force from the pivot (the horizontal axis)
  - force needed at distance $d_2$ to balance the lever
---

## Try it

1. Watch the lever balanced with a force F1 at a fixed distance d1 from the pivot.
2. Drag the slider "lever arm for F2, d2" further from the pivot. Watch the balancing force F2 drop.
3. Now drag it close to the pivot instead. The balancing force needed shoots up.

## Real-life examples

1. **Prying a rock with a crowbar.** A 40 N push at the far end (0.5 m from the pivot) needs only 4 N of resistance-matching force at a 5 m arm — leverage that turns a modest push into a much larger effect near the rock.
2. **Balancing a seesaw.** A 30 N side sitting 1.5 m from the pivot balances a 15 N side sitting twice as far out, at 3 m.
3. **Lifting with a wheelbarrow.** A 45 N load resting just 0.5 m from the wheel (the pivot) needs only 15 N of lifting force at the handles, 1.5 m away.

## Test yourself

1. Make the balancing force F₂ exactly 10 N.
2. With F1 = 40 N, find a distance d1 from the pivot and a lever arm where only 8 N is needed to balance it.
3. Find a combination of forces and distances where the balancing force F₂ drops below 2 N.

## Intuition

Picture prying a rock with a crowbar: pushing with 40 N at 0.5 m from the pivot. Drag the slider "lever arm for F2, d2" outward, away from the pivot: the required balancing force drops sharply, because moving the same force further from the pivot buys a much bigger turning effect, so less force is needed to match the push on the other side.

Push it toward the pivot instead and the curve shoots upward: balancing a force close to the pivot with almost no lever arm of your own takes enormous force — the practical reason a long crowbar needs so much less effort than a short one to move the same load.

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
