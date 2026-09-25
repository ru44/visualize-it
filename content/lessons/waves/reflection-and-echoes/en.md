---
title: Reflection and echoes
summary: >-
  A pulse that hits a wall bounces back, and timing how long the round trip
  takes tells you how far away the wall is — the idea behind echoes, sonar
  and a bat's built-in radar.
parameters:
  d: distance to the wall d
  v: speed of the wave v
  endType: end type
variables:
  - distance to the reflecting wall
  - speed of the wave
  - the round-trip echo delay
---

## Try it

1. Watch the pulse travel right, hit the wall, and bounce back toward the source. Read the echo delay in the readouts.
2. Drag the distance slider d further out. The pulse takes longer to return, and the echo delay grows.
3. Switch the end type slider between 0 and 1. At a fixed (hard) end the pulse flips upside down when it bounces; at a free end it bounces back the same way up — the timing is identical either way.

## Real-life examples

1. **Shouting at a cliff.** Standing 34 m from a rock face (d = 34, v = 340 m/s), your shout returns as a clear, separate echo about 0.2 seconds later.
2. **Sonar pinging the seafloor.** A sonar pulse sent straight down to a 750 m seafloor in seawater (d = 750, v = 1500 m/s) takes a full second to return, giving the water's depth.
3. **A bat's call near an open doorway.** Close to a soft, open boundary (d = 5, v = 340 m/s, free end) most of the pulse passes through rather than reflecting strongly, and what little returns comes back the same way up.

## Test yourself

1. Set up an echo that takes exactly 0.5 seconds to return.
2. Set up an echo that takes exactly 2 seconds to return.
3. Switch to a free end with the wall closer than 10 m away.

## Intuition

Shout toward a distant wall and, a short moment later, you hear your own shout come back — an echo. The sound did not vanish when it reached the wall; it bounced, retracing its path back to your ears, and the delay you hear is just the time the round trip took. The picture on screen shows exactly this: a pulse leaves the source, travels to the wall, and returns, with a readout timing the whole trip.

Not every reflection looks the same. Off a hard wall — what physicists call a fixed end — the returning pulse comes back flipped upside down. Off a soft or open boundary — a free end — it comes back the same way up. Either way, the timing is unchanged: what matters for measuring distance is only how long the round trip took, not which way the pulse is flipped when it returns.

## Formal

A pulse travelling at speed $v$ covers the distance $d$ to a reflector and the same distance $d$ back, so the round-trip echo delay is $t_{echo} = 2d/v$. Measuring that delay and knowing the wave's speed is enough to recover the distance, $d = v\,t_{echo}/2$, without ever having to reach the reflector directly.

A fixed end forces the medium to stay still exactly at the boundary, which flips the reflected pulse's sign; a free end lets the boundary move freely, which keeps the reflected pulse's sign the same. Neither condition changes $v$ or the travel time, only the shape of what comes back.

## Advanced

Real sonar and radar systems send a short, sharp pulse rather than a single point so that the returning echo can be timed precisely against a known transmission moment; the sharper the pulse, the less two nearby reflectors' echoes overlap and blur together, which sets a limit on how close together two objects can be and still be told apart.

## Derivation

1. The pulse takes a time $d/v$ to travel out to the reflector.
2. It takes the same time $d/v$ to travel back.
3. Adding the two legs gives the total round-trip echo delay, $t_{echo} = 2d/v$.

## Real world

### Bats
Bats emit ultrasonic calls and time the echoes bouncing off insects and obstacles to build a moving picture of their surroundings in complete darkness.

### Sonar
Ships and submarines send sound pulses through water and time their echoes off the seafloor or other vessels to measure depth and distance.

### Medical ultrasound
An ultrasound probe sends sound pulses into the body and times echoes reflecting off internal boundaries between tissues to build an image.

### Concert hall acoustics
Architects shape walls and ceilings to control how sound reflects inside a hall, avoiding echoes that arrive late enough to be heard as a distinct, distracting repeat.
