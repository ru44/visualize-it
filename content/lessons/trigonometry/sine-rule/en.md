---
title: Sine rule
summary: >-
  In any triangle, not just a right triangle, a bigger side always sits opposite
  a bigger angle, in a ratio that is exactly the same at all three corners.
parameters:
  a: side a — opposite angle A
  b: side b — opposite angle B
  c: side c — opposite angle C
variables:
  - side a, opposite angle A
  - side b, opposite angle B
  - side c, opposite angle C
  - angle A, worked out from the three sides
  - angle B, worked out from the three sides
  - angle C, worked out from the three sides
---

## Try it

1. Look at the three readouts a/sin A, b/sin B and c/sin C for the starting 5 m, 6 m, 7 m triangle: all three land on the same number.
2. Drag slider c up or down. All three ratios change together, yet stay equal to one another the whole time.
3. Pull sliders a and b close together, so the two sides are nearly equal, and watch angles A and B become nearly equal too.

## Real-life examples

1. **A triangular field measured by tape.** Sides of 5 m, 6 m and 7 m: the sine rule turns those three lengths into every angle of the field.
2. **A tall, narrow roof truss.** Sides of 4 m, 4 m and 7 m: the two equal sides sit opposite two equal, small angles, while the odd side out gets the wide apex angle.
3. **Two legs of a sailing course.** Legs of 6, 8 and 9 nautical miles: a navigator uses the same ratio to work out the heading change at each turn.

## Test yourself

1. Push the shared ratio a/sin A up to about 10.
2. Make sides a and b agree to within 0.3 m while stretching c past 8 m.
3. Make side a the longest of the three sides.

## Intuition

A 5 m, 6 m, 7 m triangular field has three different angles, one at each corner, and three different side lengths facing them. Drag any slider and watch the three ratio readouts: no matter how the triangle changes shape, a side divided by the sine of its own opposite angle always comes out the same number as the other two sides treated the same way.

That is the whole rule in one picture: the longer a side is, the bigger the angle sitting across from it — but not in a simple straight-line way, in a way that keeps this one ratio locked. Drag c up on its own and both the side and its opposite angle C grow together, exactly enough to keep a/sin A, b/sin B and c/sin C all equal.

## Formal

For a triangle with sides $a$, $b$, $c$ opposite angles $A$, $B$, $C$: $\dfrac{a}{\sin A} = \dfrac{b}{\sin B} = \dfrac{c}{\sin C}$.

Unlike $\sin\theta = \text{opposite}/\text{hypotenuse}$, this relation needs no right angle at all — it holds for every triangle, however obtuse or narrow.

## Advanced

Given two sides and an angle that is *not* between them (SSA), solving $\sin B = \dfrac{b\sin A}{a}$ for $B$ can have two valid solutions, since $\sin B$ is positive for both an acute and an obtuse angle — the "ambiguous case," where the same measurements describe two genuinely different triangles. The sliders here fix all three sides directly, which always pins down one triangle exactly, so this particular picture cannot show the ambiguity; it shows up only in that different SSA setup.

## Derivation

1. Drop the altitude from the vertex at $C$ down to side $c$: it splits the triangle into two right triangles, and the same altitude equals $h = b\sin A = a\sin B$ measured from either one.
2. Dividing both expressions for $h$ by $\sin A \sin B$ gives $\dfrac{a}{\sin A} = \dfrac{b}{\sin B}$.
3. Dropping a second altitude, this time from $A$, brings in the third side the same way, giving $\dfrac{a}{\sin A} = \dfrac{b}{\sin B} = \dfrac{c}{\sin C}$.

## Real world

### Triangulation without a total station
A surveyor who can measure one side and two angles of a triangle — far easier than measuring every side directly — uses the sine rule to fill in the rest.

### Sailing and dead reckoning
A navigator who knows the length and heading of one leg of a course, and the angle turned at each waypoint, uses the sine rule to work out the other legs.

### Astronomy
Early astronomers measured a star's parallax from two points on Earth's orbit, then used the sine rule on the resulting long, thin triangle to compute distances light-years across.

### Radio and phone tower positioning
A phone's rough location can be estimated from the angles at which its signal reaches two towers of known separation, using the same sine rule triangle.
