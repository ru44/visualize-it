---
title: Feedback and stability
summary: >-
  A thermostat that reacts too hard to old information doesn't settle on
  the right temperature — it overshoots, swings back, and can spiral out
  of control.
parameters:
  g: g — gain (how hard it reacts to error)
  d: d — lag (steps of delay before it can see the effect)
  r: r — target temperature
  T0: T₀ — starting temperature
variables:
  - T — the room's temperature at a given step
  - n — the step number, each check-in the thermostat makes
  - "g — the gain: how big a correction it makes per degree of error it can see"
  - r — the target temperature (the setpoint)
  - "d — the lag: how many steps late the reading it reacts to is"
  - "e — the error: the gap between the target and the reading the thermostat can currently see"
---

## Try it

1. With $d$ at 1, drag $g$ up slowly from near 0. The room settles smoothly at first, then starts to overshoot and swing back before settling — a bigger correction each time means more overshoot.
2. Push $g$ past 1 with $d = 1$. The swings stop shrinking and start growing — the same feedback that used to fix the temperature is now the thing throwing it off.
3. Now drag $d$ up while keeping $g$ fixed around 0.7. The exact same gain that used to settle down now runs away, purely because the thermostat is reacting to older and older information.

## Real-life examples

1. **A well-tuned thermostat.** Starting at 15°C with a 22°C target, a gentle gain of 0.15 and only one step of lag settles smoothly onto 22°C with barely a wobble.
2. **A twitchier thermostat, same lag.** The same room and target, but a gain of 0.7, overshoots past 22°C, swings back under it, and keeps ringing — each swing smaller than the last — before it finally settles.
3. **The same twitchy gain, but a laggier sensor.** Nothing about the gain changes from the example above — still 0.7 — but the sensor now reports readings from three steps back instead of one. The same correction that used to settle down now grows larger every swing: the room never reaches a steady 22°C at all.

## Test yourself

1. Find a gain $g$ and a lag $d$ that stay comfortably stable (below the rough threshold $2/(d+1)$).
2. Find a gain $g$ and a lag $d$ that oscillate and grow, but without $g$ being absurdly large.
3. With a lag $d$ of at least 3 steps, still find a gain $g$ low enough to remain stable.

## Intuition

Think of a shower where the water takes a few seconds to change temperature after you turn the knob. Turn it a little and wait, and you can dial in a comfortable temperature. Turn it in big, impatient jerks — reacting to how it felt a few seconds ago rather than how it feels right now — and you overshoot too hot, yank it back, overshoot too cold, and can end up jerking the knob harder and harder as the swings get worse instead of better.

A thermostat with a heater that takes time to warm a room works exactly the same way. If it reacts gently, small corrections have time to show their effect before the next one is added, so the room eases into the target. React too hard, and each correction is already excessive by the time its effect shows up — which is what "gain too high" really means: not that the machine is broken, but that it keeps over-correcting for its own last over-correction.

## Formal

Each step, the thermostat measures how far the room still is from the target, but only as it stood $d$ steps ago, $e = r - T_{n-1-d}$, and nudges the room's temperature by a fraction $g$ of that old error: $T_n = T_{n-1} + g\,e$.

With no lag ($d=0$), the temperature converges smoothly for $0 < g < 1$, oscillates but still settles for $1 < g < 2$, and grows without bound for $g > 2$. Adding lag makes the same gain more dangerous: the rough rule $g < \frac{2}{d+1}$ shows the safe gain shrinking as the delay $d$ grows — the exact threshold that separates preset 2 (stable) from preset 3 (unstable) above, at the same gain but a longer lag.

## Advanced

This rough threshold is exact for $d = 0$ and $d = 1$, but for longer lags real control systems are usually checked with the full frequency-domain stability tests (Nyquist or root-locus analysis) rather than this simplified estimate, since a delay's effect on stability depends on more than just its length.

## Derivation

1. The thermostat can only react to what it measured $d$ steps ago, so its error signal is $e = r - T_{n-1-d}$.
2. It nudges the current temperature by a fraction $g$ of that error: $T_n = T_{n-1} + g\,e$.
3. Working through the resulting recurrence shows the swings shrink, rather than grow, roughly while $g < \frac{2}{d+1}$ — more delay lowers the safe gain.

## Real world

### Home heating thermostats
A furnace that takes minutes to warm a room, paired with a thermostat reacting too aggressively to each reading, is the classic real-world source of the slow, several-minute temperature swings some houses show.

### Cruise control
A car's cruise control has to react to speed changes it can only sense a moment after they happen; too aggressive a correction on a hill produces the same overshoot-and-swing pattern as an over-tuned thermostat.

### Network congestion control
Internet data-sending rates are adjusted by feedback that only learns about congestion after a delay of one or more round trips — too aggressive a reaction to that delayed signal can make traffic oscillate between too fast and too slow.

### Voice and audio feedback (a microphone squeal)
A microphone too close to its own speaker creates a feedback loop with almost no lag and enormous gain, which is exactly the unstable, runaway regime this lesson's model predicts for $g$ far past its threshold.
