---
title: Bridges and trusses
summary: >-
  A triangle is the only shape that can't change without a bar changing
  length — which is exactly why bridges are built from triangles.
parameters:
  W: W — load at the tip
  L: L — length of the horizontal arm
  h: h — how far down the wall the brace attaches
variables:
  - W — the load pulling down at the tip of the bracket
  - L — the length of the horizontal arm, from the wall to the load
  - h — how far below the arm the diagonal brace meets the wall
  - θ — the angle the brace makes with the horizontal arm
  - F_brace — the axial force carried by the diagonal brace (compression)
  - F_arm — the axial force carried by the horizontal arm (tension)
---

## Try it

1. Drag $h$ (how far down the brace attaches) up, making the brace steeper. Watch both $F_{brace}$ and $F_{arm}$ fall sharply — a steeper brace carries the same load with far less internal force.
2. Now drag $L$ (the arm's length) up instead, keeping $h$ fixed. Both forces climb — a longer reach always costs more force in every member.
3. Drag $W$ (the load) up. Both $F_{brace}$ and $F_{arm}$ grow in exact proportion to $W$ — double the load, double every member's force.

## Real-life examples

1. **A small shelf bracket.** Holding 150 N of books at a 30 cm arm, with the brace meeting the wall 20 cm below (θ ≈ 34°), the brace carries about 270 N in compression and the arm about 225 N in tension.
2. **A long balcony bracket.** A 1.2 m arm carrying an 800 N load, braced 60 cm below (θ ≈ 27°, a shallower angle), pushes the brace up to about 1789 N and the arm to about 1600 N — far more force for the same kind of load.
3. **The same balcony, braced steeply instead.** Moving the same 300 N load onto a 0.6 m arm with the brace dropping a full 1.2 m below (θ ≈ 63°, a much steeper angle) cuts the brace force to about 335 N and the arm to just 150 N.

## Test yourself

1. Make the tension in the arm, $F_{arm}$, exceed 1000 N.
2. Using a brace angle steeper than 45° ($h > L$), keep the compression force $F_{brace}$ under 500 N.
3. Bring the compression force $F_{brace}$ to about 1000 N.

## Intuition

Pin three bars together at their ends and you get a shape that cannot change at all without one of the bars stretching or squashing — a triangle is rigid all by itself. Pin four bars into a square instead, and it can lean sideways into a parallelogram without any bar changing length at all: a plain square frame has no built-in resistance to that kind of shear, which is exactly why gates and bookshelves without a diagonal brace wobble.

That single diagonal brace on the shelf bracket does exactly this job: without it, the horizontal arm alone would have to resist the load by bending, the way the beam in "beam bending" does. With the brace in place, the load instead splits into two straight-line paths — compression down the brace, tension along the arm — and neither member has to bend at all, only push or pull along its own length. That is the whole appeal of a truss: turn bending into pure tension and compression, which any material resists far better.

## Formal

At the loaded joint, the vertical pull of the load must be balanced entirely by the brace, since the arm is horizontal and carries no vertical force: $F_{brace}\sin\theta = W$, so $F_{brace} = \frac{W}{\sin\theta}$, with $\theta = \arctan\frac{h}{L}$ set purely by the bracket's geometry.

The arm then has to cancel the brace's horizontal pull to keep the joint from sliding sideways, giving $F_{arm} = F_{brace}\cos\theta = \frac{W}{\tan\theta}$. A steep brace (large $\theta$) makes $\sin\theta$ close to 1 and $\tan\theta$ large, so both forces shrink; a shallow brace makes them both grow without bound as $\theta \to 0$.

## Advanced

Every member of a properly triangulated, pin-jointed truss carries pure axial force and nothing else — no bending — which is why steel truss members can be made from comparatively slender bars instead of the thick, heavy sections a bending beam of the same span would need.

## Derivation

1. The brace's angle below the horizontal arm is fixed by the bracket's proportions: $\theta = \arctan\frac{h}{L}$.
2. At the tip joint, only the brace has a vertical component of force, so it alone must support the load: $F_{brace}\sin\theta = W$, giving $F_{brace} = \frac{W}{\sin\theta}$.
3. The arm must cancel the brace's horizontal pull for the joint to stay still: $F_{arm} = F_{brace}\cos\theta = \frac{W}{\tan\theta}$.

## Real world

### Shelf and awning brackets
The exact triangle in this lesson: a horizontal arm and a diagonal brace, turning a load that would bend an unbraced arm into simple tension and compression.

### Roof trusses
A house roof's triangular truss carries the roof's weight down through a web of triangles into the walls, using far less timber or steel than a single solid bending beam would need to span the same width.

### Bridge trusses
Warren and Pratt truss bridges repeat the same triangle over and over across a span, so every member works in pure tension or compression and the whole structure stays light for its strength.

### Bicycle frames
A bicycle's diamond frame is really two triangles sharing an edge, which is why a well-triangulated frame stays rigid under a rider's weight using thin, light tubing instead of a single thick beam.
