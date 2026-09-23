---
title: Composing transformations
summary: >-
  Rotate a shape and then stretch it, or stretch it and then rotate it — same
  two moves, same numbers, but usually a different final shape, because
  matrix order matters.
parameters:
  angle: rotation angle θ
  k: stretch factor k
variables:
  - the rotation matrix, turning every point by θ
  - the stretch matrix, scaling every point sideways by a factor of k
  - the rotation angle
  - the stretch factor along the horizontal axis
---

## Try it

1. Set angle to 0. The orange square (rotate then stretch) and the green square (stretch then rotate) sit exactly on top of each other.
2. Now raise the angle toward 90°. The two squares peel apart into visibly different shapes, even though both use the exact same θ and k.
3. Bring k back down to 1 (no stretch at all). The two squares snap back together, whatever the angle — with nothing to stretch, order stops mattering.

## Real-life examples

1. **A right-angle turn, then a stretch.** At angle = 90°, k = 2, rotating first then stretching sends a square into a very different shape than stretching first then rotating.
2. **A gentle 45° turn.** Even a modest angle of 45° with a mild stretch of 1.5 is enough to clearly separate the two outcomes.
3. **No rotation at all.** At angle = 0°, both orders agree exactly — the dashed gap between their two test-vector dots disappears.

## Test yourself

1. Bring the angle down to 0° so the two composite shapes coincide exactly.
2. Set the angle between 60° and 120° with a stretch above 1.8, so the two shapes clearly disagree.
3. Push the stretch factor k all the way up to 3.

## Intuition

Stand facing north and take one step forward, then turn 90° right: you end up one step north of where you started, now facing east. Turn 90° right first instead, then take that same step forward: you end up one step east of where you started, facing east — a completely different spot, from the exact same two moves. Matrices behave the same way: applying a rotation and then a stretch is not the same machine as applying the stretch and then the rotation, because each transformation changes the very directions the next one acts on.

The orange square on screen shows the unit square rotated first, then stretched sideways; the green square shows it stretched first, then rotated. Drag the angle slider away from 0° and watch them separate — the dashed line joining their two marked corners is a direct measure of how much the order changed the outcome.

## Formal

For a rotation $R(\theta)$ and a stretch $S(k)$, "rotate then stretch" is the matrix product $S(k)R(\theta)$, and "stretch then rotate" is $R(\theta)S(k)$.

In general $R(\theta)S(k) \neq S(k)R(\theta)$: matrix multiplication is associative but not commutative, so the order in which transformations are applied changes the result.

## Advanced

The two products always share the same determinant, $\det\big(S(k)R(\theta)\big) = \det\big(R(\theta)S(k)\big) = k$, since $\det(AB) = \det(A)\det(B)$ for any matrices — so both orders scale area by the same amount even while sending individual points to different places.

## Derivation

1. Write the two building blocks as matrices: $R(\theta) = \begin{pmatrix}\cos\theta & -\sin\theta\\ \sin\theta & \cos\theta\end{pmatrix}$, a pure rotation, and $S(k) = \begin{pmatrix}k & 0\\ 0 & 1\end{pmatrix}$, a pure horizontal stretch.
2. The product $S(k)R(\theta)$ rotates a vector by θ first, then stretches the rotated result by k.
3. The product $R(\theta)S(k)$ stretches a vector by k first, then rotates the stretched result by θ — landing somewhere different whenever θ is not 0 and k is not 1.

## Real world

### Robot arms
Each joint of a robot arm applies its own rotation or shift to a coordinate frame, and swapping the order two joints move in sends the hand to a different final position.

### Computer graphics pipelines
A 3-D engine multiplies scale, rotation and translation matrices in a fixed, deliberate order for every object, because reordering them would visibly warp the scene.

### Crystal structures
Applying two symmetry operations to a crystal lattice in different orders can land on a different but equally valid arrangement of atoms, which is exactly how some crystals form multiple related structures.

### Quantum mechanics
Many pairs of quantum operations, like measuring position then momentum versus momentum then position, give different results depending on their order — the deep reason behind the uncertainty principle.
