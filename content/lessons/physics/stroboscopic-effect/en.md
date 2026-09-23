---
title: The stroboscopic effect
summary: >-
  Film a spinning wheel and it can look like it slows down, freezes, or
  even spins backwards on screen — not because the wheel changed, but
  because the camera only takes a picture a certain number of times a
  second.
parameters:
  rpm: wheel speed (rpm)
  fps: camera frame rate
  t: time
variables:
  - the wheel's true rotation rate
  - the camera's sampling rate
charts: []
---

## Try it

1. Press play. The left wheel spins smoothly at the true speed; the right one shows only what the camera would record.
2. Raise "camera frame rate" toward the wheel's own speed. The right wheel slows down, even though nothing about the real wheel changed.
3. Keep raising it further. At some point the right wheel appears to reverse direction.

## Real-life examples

1. **A car wheel at 80 rpm, filmed at 24 frames a second.** The classic "wagon-wheel effect" — the spokes on screen crawl backwards even though the car is moving forward.
2. **A fast fan at 300 rpm, filmed at 60 frames a second.** The blades line up almost exactly once a frame, so the fan on screen looks like it is barely turning.
3. **A wheel at 120 rpm under 50 Hz lighting.** Many countries run lights (and some cameras) at 50 Hz; a wheel turning at exactly 2 revolutions a second can look almost frozen under them.

## Test yourself

1. Find rpm and fps values where the wheel appears completely frozen on camera.
2. Find values where the right wheel clearly appears to spin backwards.
3. Set the frame rate to 50 or higher with a slow wheel (20 rpm or under), so the true motion is captured cleanly with no illusion at all.

## Intuition

Imagine a friend describing a clock's second hand to you, but only allowed to glance at it once every few seconds. If they glance every 60 seconds and the hand is always back at the same mark, they will swear the hand never moves at all — even though it is sweeping around the whole time. A camera does exactly this to a spinning wheel: it does not see the motion between frames, only where the wheel happened to be each time the shutter opened.

Drag "camera frame rate" toward the wheel's own turning rate and watch the right-hand wheel on screen. When the wheel turns close to a whole number of turns between two frames, the spokes land almost back where they started, and the wheel looks nearly still. Push the frame rate a little past that point and the spokes land just short of a full turn each frame — which looks exactly like a small turn backwards, even though the real wheel never reversed.

## Formal

Write the wheel's true rotation rate as $f_w$ (turns per second) and the camera's sampling rate as $f_s$ (frames per second). The apparent rate the eye reads off the sampled frames is $f_a = f_w - n f_s$, where $n = \mathrm{round}\!\left(\dfrac{f_w}{f_s}\right)$ is chosen to make $|f_a|$ as small as possible.

This is exactly the aliasing problem from signal sampling: a rotating wheel is a periodic signal, the camera's frame rate is the sampling rate, and $f_s/2$ is the Nyquist limit above which the true rotation rate can no longer be told apart from a slower or reversed one.

## Advanced

The same folding formula explains why a strobe light tuned to almost exactly the wheel's rotation rate can freeze it in place for direct viewing — the technique used to tune engines and set turntable speeds before quartz timers were common — and why any periodic motion sampled below twice its own frequency (violating the Nyquist rate) will alias into a slower, apparently different motion.

## Derivation

1. the wheel truly turns at $f_w = \dfrac{\text{rpm}}{60}$ turns per second
2. the camera only records a new picture every $\dfrac{1}{f_s}$ seconds
3. $f_a = f_w - n f_s$, choosing the integer $n$ that makes $|f_a|$ smallest

## Real world

### Old films and car chases
The wagon-wheel effect was already well known in silent-film westerns, whenever a wheel's spoke pattern turned close to a whole number of times between frames.

### Strobe lights in workshops
Mechanics and machinists once used strobe lights tuned to a spinning part's speed to "freeze" it for inspection while it was still running, using this exact effect on purpose.

### LED and fluorescent lighting on video
Lights that flicker at mains frequency can make fans, wheels and even helicopter rotors on video look like they are turning at the wrong speed or standing still.

### Digital audio and video sampling
The same folding formula, applied to sound instead of rotation, is why digital audio must be sampled above twice the highest frequency it needs to reproduce — the same Nyquist limit at work.
