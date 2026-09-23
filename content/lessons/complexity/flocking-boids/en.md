---
title: 'Flocking: three rules, no leader'
summary: Every bird only watches its neighbours, yet the whole flock turns, tightens and spreads as one.
parameters:
  sep: separation radius
  align: alignment radius
  coh: cohesion radius
  t: step
variables:
  - separation radius
  - alignment radius
  - cohesion radius
  - step
charts: []
---

## Try it

1. Press play. 36 birds start scattered with random headings and settle into a moving flock.
2. Raise "cohesion radius" to its top value. Birds far away start turning toward the crowd, and the scattered dots pull into one cluster.
3. Now drop "alignment radius" to its lowest value while cohesion stays high. The cluster stays tight but never agrees on a direction, so it churns in place instead of flying off as one.

## Real-life examples

1. **A loose flying flock.** Pigeons a few body-lengths apart, each still copying the heading of birds within about six body-lengths: the flock drifts together without ever bunching up.
2. **A tight starling murmuration.** Neighbours within twelve body-lengths set the heading and the pull reaches sixteen: thousands of starlings turn as a single moving sheet.
3. **A scattered feeding flock.** Wide separation and almost no alignment or cohesion: each bird pecks at its own patch of ground, barely reacting to the others.

## Test yourself

1. Push both "alignment radius" and "cohesion radius" high enough that the flock moves as one tight, aligned sheet.
2. Keep separation wide and cohesion low so the birds stay spread out and never form a crowd.
3. Set alignment to its lowest value while cohesion stays high, so the birds cluster together but keep turning past each other.

## Intuition

Picture 36 pigeons dropped into a field, each about 30 cm long, all facing a random direction. Every pigeon obeys three rules and nothing else: don't get closer than "separation radius" body-lengths to another bird, match the heading of anything within "alignment radius", and turn toward the average position of anything within "cohesion radius". No pigeon sees the whole flock, and no pigeon is in charge.

Drag "cohesion radius" up and birds on opposite sides of the screen start turning toward each other, because each one now senses neighbours much further away. Drag "alignment radius" up instead and the flock stops churning and starts gliding in one direction, because nearby birds now copy each other's heading instead of just avoiding a collision. The readout "order" is 1 when every bird faces the same way and 0 when headings are random, so it is a single number for "has the flock agreed on a direction yet?"

## Formal

Each boid $i$ has a position and a heading. At every step it looks at its neighbours within three radii and combines three steering terms: away from anything closer than the separation radius, the average heading of anything within the alignment radius, and the direction to the average position of anything within the cohesion radius.

$\vec v_i \leftarrow \vec v_i + w_s\sum_{d_{ij}<r_s}(-\hat d_{ij}) + w_a\sum_{d_{ij}<r_a}\hat h_j + w_c\sum_{d_{ij}<r_c}\hat d_{ij}$, then the boid turns toward the heading of $\vec v_i$ by at most a fixed angle per step.

## Advanced

This is Craig Reynolds' 1987 "boids" model, one of the first demonstrations that realistic flocking, herding and schooling needs no leader and no global plan: three purely local rules, applied identically by every agent, are enough. The same three-term structure — repel the near, average the medium, attract the far — reappears in traffic models, crowd simulation and the Vicsek and Couzin models covered in the next lessons, which relax or rearrange these same three radii.

## Derivation

1. Any neighbour closer than the separation radius pushes the boid's steering away from it, so bodies never overlap.
2. Any neighbour within the alignment radius adds its heading to an average that the boid turns toward, so nearby birds end up facing the same way.
3. Any neighbour within the cohesion radius pulls the steering toward the average position of the group, so the flock does not drift apart.

## Real world

### Bird flocks and fish schools
Starling murmurations and sardine schools follow the same three local rules: living animals with no leader still produce one coordinated shape.

### Robot swarms
Warehouse and drone swarms use separation, alignment and cohesion terms so that hundreds of simple robots avoid collisions and move as a group without a central controller.

### Computer animation
Reynolds built the boids model for film, and flocking crowds in animated movies and games are still generated this way instead of being hand-animated bird by bird.

### Traffic and crowds
Models of highway traffic and pedestrian crowds reuse the same idea: keep a following distance, match the speed of nearby traffic, and drift toward where the crowd is heading.
