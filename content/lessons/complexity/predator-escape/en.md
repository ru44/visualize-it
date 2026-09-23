---
title: Escaping a faster predator
summary: A slower animal can still outlast a faster one, if it reacts to stale information and refuses to run in a straight line.
parameters:
  delay: reaction delay
  zigzag: zigzag amplitude
  step: tick
variables:
  - how many ticks late the prey reacts to the predator
  - how sharply the prey zigzags side to side while fleeing
  - which tick of the chase you are watching
charts: []
---

## Try it

1. Set "reaction delay" and "zigzag amplitude" both low and press play. The orange predator, faster than the blue prey, closes the distance almost in a straight line.
2. Raise "zigzag amplitude" to about 50° and restart. The prey's path bends side to side, and the predator's trail shows it overshooting every turn.
3. Watch the "closest approach" readout: a strong zigzag keeps it much larger than a straight run does, even with the same reaction delay.

## Real-life examples

1. **A slow, straight retreat.** A short 2-tick delay and almost no zigzag still lets the faster predator close in steadily over 120 ticks.
2. **A realistic dash with some swerve.** A 6-tick delay with a moderate 30° zigzag keeps the prey clear for the full 120 ticks, even though the predator is faster.
3. **A sluggish reaction saved by a hard swerve.** Even with a slow 14-tick reaction delay, a sharp 55° zigzag keeps the prey ahead for 160 ticks.

## Test yourself

1. Set the zigzag amplitude below 5° and run to tick 100 or beyond. Watch the predator close the gap almost in a straight chase.
2. Set the zigzag amplitude to 40° or more with a reaction delay of 10 ticks or more, and run to tick 120. The prey stays clear far longer than a straight run would allow.
3. Set the reaction delay to 14 ticks with a zigzag amplitude of 50° or more, and watch the prey survive despite reacting so late.

## Intuition

The blue prey does not know where the orange predator is right now; it only knows where it WAS a few ticks ago, because reacting takes time for any nervous system. Drag "reaction delay" up and you make that stale information older, which should make escape harder, since the prey is always running from a target that has already moved.

But the predator has its own limit: even though it is faster in a straight line, it can only turn by a fixed amount each tick, exactly like a car cannot spin on a dime. A prey that runs straight lets the predator settle onto a simple, aimed path. A prey that zigzags keeps forcing the predator to correct course, and each correction wastes a turn the predator could have spent closing distance instead. That is why raising "zigzag amplitude" helps even when "reaction delay" stays high.

## Formal

The predator turns its heading toward the prey's current position but by at most a fixed amount $\Delta\theta_{\max}$ per tick, so its path lags behind any sudden change in the prey's direction even though its speed $v_{\text{pred}} > v_{\text{prey}}$. The prey instead sets its heading away from the predator's position from $d$ ticks earlier, a reaction delay, plus a swerve term: $\theta_{\text{prey}}(t) = \text{away}\big(x_{\text{pred}}(t-d)\big) + A\sin\!\big(\tfrac{2\pi t}{T}\big)$, where $A$ is the zigzag amplitude and $T$ its fixed period.

Because the predator's turn is capped at $\Delta\theta_{\max}$, a swerve that changes the prey's direction faster than the predator can follow forces a real overshoot every half-period, and that overshoot, not the prey's raw speed, is what keeps the closest-approach distance large even though the prey is slower overall.

## Advanced

This is a simplified, discrete version of a pursuit-evasion differential game with delayed information: the predator plays a bounded-curvature pure-pursuit strategy, while the prey's optimal evasion against a turn-limited pursuer is provably a zigzag whose period is tuned to the pursuer's maximum turn rate, not to the prey's own top speed. Real escape responses (fish C-starts, rabbit jinking) show amplitudes and timings close to what this optimisation predicts.

## Derivation

1. The prey looks up the predator's position from several ticks earlier, since a real nervous system cannot react to information it has not yet received.
2. It sets its heading directly away from that stale position, then adds a side-to-side swerve on top of that heading.
3. The predator, faster in a straight line but limited in how sharply it can turn each tick, overshoots every time the prey's swerve changes direction, which is why a sharp zigzag keeps the gap open even against a faster chaser.

## Real world

### Fish C-start escapes
Many fish snap their body into a C-shape and dart off at a sharp angle when a predator strikes, a single hard zigzag rather than a straight sprint, exploiting exactly this turning-rate limit.

### Rabbits and hares jinking
A hare being chased by a fox does not run in a straight line; it cuts sharp, unpredictable turns that repeatedly force the faster fox to overshoot and re-aim.

### Fighter jet evasive manoeuvres
Pilots evading a faster missile are trained to make hard, unpredictable turns rather than fly straight, since the missile's own guidance has a maximum turn rate it cannot exceed.

### Human reaction time in sport
A goalkeeper reacting to where a ball was struck, not where it currently is, faces the same stale-information problem as the prey here, which is why disguised, changing-direction shots beat straight ones.
