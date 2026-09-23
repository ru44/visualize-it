---
title: 'A predator hits a flock'
summary: One hunter chasing the nearest bird is enough to split a calm flock into swirling, dodging sub-flocks with nobody directing the split.
parameters:
  fear: fear radius
  speed: predator speed
  t: step
variables:
  - fear radius
  - predator's speed, as a multiple of prey speed
  - step
charts: []
---

## Try it

1. Press play. The red triangle is the predator; it always turns toward the nearest blue prey. Watch the flock's shape change as it closes in.
2. Drop "fear radius" low. Prey now ignore the predator until it is almost on top of them, so the flock barely reacts until the last moment.
3. Raise "predator speed" toward its top value. The same chase now overtakes stragglers, and the readout "fleeing now" jumps as far more of the flock reacts at once.

## Real-life examples

1. **A lazy hawk over a relaxed flock.** A short fear radius and a predator barely faster than its prey: most of the flock never reacts, and only the birds directly in its path scatter.
2. **A peregrine falcon hunting starlings.** A medium fear radius with a fast predator: the flock splits into two arms that swirl around the falcon, the "fountain effect" real starling flocks use against real falcons.
3. **A peregrine's diving stoop.** Peregrines can dive at well over 200 km/h, several times a starling's flying speed: with the fear radius and predator speed both high, the whole flock reacts from far away and scatters violently the moment the predator turns toward it.

## Test yourself

1. Set the fear radius to 40 or below, so most of the flock ignores a nearby predator until it is very close.
2. Push predator speed to at least 2.2, so the hunter closes in on stragglers far faster than they can outrun it.
3. Combine a fear radius of at least 100 with a predator speed of at least 2, matching a real peregrine stoop.

## Intuition

Picture 26 prey obeying the same three flocking rules as before, plus one more: any prey closer to the predator than "fear radius" drops everything else and turns straight away from it. The predator itself is simple too — it just always turns toward whichever prey is currently nearest.

Watch what a single rule change does to a whole flock. With the fear radius small, the predator can glide deep into the flock before anyone reacts, then the birds nearest it peel off late and the readout "fleeing now" barely moves. With the fear radius large, the predator is still far away when the first few prey notice, their flee turns push their neighbours' cohesion rule off balance, and the reaction spreads outward — the readout "groups" often rises to 2 or 3 as the flock briefly tears into separate clusters before regrouping once the predator passes.

## Formal

Every prey boid still runs the ordinary separation, alignment and cohesion rule from the flocking lesson. On top of that, any prey within the fear radius of the predator's position replaces its desired heading with the direction straight away from the predator, weighted far more heavily than the ordinary flocking terms, and turns toward it faster than usual. The predator has one rule: turn toward whichever prey is currently closest, at a fixed multiple of the prey's own speed.

No prey is told to "split the flock" or "form two arms" — that shape is a side effect of many individual flee decisions, each one only about the single nearest predator and the neighbours each prey can already see.

## Advanced

The swirling, splitting evasion seen here matches the "fountain effect" and "flash expansion" documented in real starling murmurations under falcon attack: local avoidance rules, run by thousands of birds at once, produce a large-scale evasive pattern with no bird choosing that pattern. Because each prey's turn depends only on nearby neighbours and the predator's current position, the same three-radius rule from the flocking lesson still governs the flock everywhere the predator has not yet reached.

## Derivation

1. Away from any predator, every prey still runs the separation, alignment and cohesion rule from the flocking lesson unchanged.
2. Once the predator comes closer than the fear radius, that prey drops the flocking rule and turns hard away from the predator instead.
3. Because only the nearest prey react first, and their flee turns pull on their neighbours' cohesion, the reaction spreads outward through the flock a few birds at a time.

## Real world

### Starling murmurations under attack
Filmed peregrine attacks on starling flocks show exactly this pattern: a fast-moving dark patch (the escape wave) spreading outward from the predator's position through the flock.

### Fish bait balls
Sardine schools attacked by tuna or dolphins form a tight, swirling ball for the same reason: individual fish fleeing the nearest attacker, with no fish organising the ball's shape.

### Military and traffic evasive routing
Models of vehicles or drones avoiding a fast-moving threat use the same near-field override: normal formation rules apply everywhere except close to the danger, where a much stronger avoidance term takes over.

### Ecology and hunting success
Biologists use fear-radius models like this one to explain why predators that hunt fast, cohesive groups often have lower success per attack than predators of solitary prey, even though the group is easier to find.
