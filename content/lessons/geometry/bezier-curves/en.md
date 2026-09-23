---
title: Bezier curves
summary: >-
  Every curve drawn by a font, a vector-art app or a video game's camera path
  is built from a few control points and one simple rule: repeated
  averaging.
parameters:
  t: progress t
  p1x: first control point, x
  p1y: first control point, y
  p2x: second control point, x
  p2y: second control point, y
variables:
  - progress along the curve, from 0 to 1
  - the fixed starting point
  - the first control point
  - the second control point
  - the fixed ending point
---

## Try it

1. Drag the slider t from 0 to 1. The orange dot traces the curve, and the two grey helper segments show how it is built at every instant.
2. Drag the first control point (the left grey circle) up and down. The whole curve leans toward it, even though the curve never touches it.
3. Move both control points to the far top corners. The curve now bulges into an almost-rectangular arc instead of a gentle hill.

## Real-life examples

1. **A gentle hill.** Two control points above the middle, both at the same height, give a smooth, symmetric arc — the default shape of a bezier.
2. **A wide, flat-topped arch.** Pulling both control points out to the far left and right corners flattens the curve's top into a broad, almost rectangular sweep.
3. **A steep S-curve.** Putting one control point high and the other low sends the curve up sharply, levels it off, then drops it again.

## Test yourself

1. Push t all the way to the end of the curve.
2. Bring t back to the very start of the curve.
3. Raise both control points close to the top of the frame.

## Intuition

Start with three plain points and one shared fraction, t. Slide a point t of the way from the first to the second, and another point t of the way from the second to the third — two new points, built by nothing more than averaging. Now slide a third point t of the way between those two new points, and you land exactly on the curve. Drag the slider t and watch this whole three-step average happen live: the grey construction lines are that averaging, frozen at whatever t you chose.

A cubic bezier, the kind used almost everywhere, just adds one more layer of the same idea with four points instead of three. The curve never touches its two middle control points — they only pull on it, like a rope tied to two poles — which is exactly why dragging a control point bends the whole shape smoothly instead of creating a sharp corner.

## Formal

A cubic Bezier curve with control points $P_0, P_1, P_2, P_3$ is $B(t) = (1-t)^3 P_0 + 3(1-t)^2 t\, P_1 + 3(1-t) t^2 P_2 + t^3 P_3$ for $t \in [0, 1]$.

Each coefficient is a term of $((1-t) + t)^3 = 1$, so the four weights always add to exactly 1 and $B(t)$ is always a weighted average of the four points.

## Advanced

The same formula is $B(t) = \sum_{i=0}^{n} \binom{n}{i} (1-t)^{n-i} t^i P_i$ for degree $n$ (here $n = 3$); the construction shown, repeated linear interpolation, is de Casteljau's algorithm, and it is the numerically stable way every real font renderer and vector-graphics library actually evaluates the curve.

## Derivation

1. Slide a point a fraction t of the way along each of the three segments joining the four control points in order, giving three new points.
2. Slide a point the same fraction t along each of the two segments joining those three new points, giving two more points.
3. Slide a point the same fraction t along the last remaining segment; that final point is B(t), a point exactly on the curve.

## Real world

### Fonts
Every letter in nearly every digital font is outlined with cubic or quadratic Bezier curves, which is why type still looks smooth at any size.

### Vector graphics and animation
Drawing and animation software use Bezier control points to let an artist bend a path or an "easing" curve with just a few draggable handles.

### Video game cameras
A camera gliding smoothly between two viewpoints in a game or film often follows a Bezier path so its speed and direction change without any sudden jump.

### Robotics
A robot arm planning a smooth path between two positions can use a Bezier curve so the motion has no abrupt corners that would jolt the motors.
