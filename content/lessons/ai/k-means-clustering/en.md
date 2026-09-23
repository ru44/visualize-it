---
title: k-means clustering
summary: >-
  Tell an algorithm how many groups to find, and 90 unlabelled points sort
  themselves into that many clusters just by each one joining its nearest
  centre, over and over, until nothing moves.
parameters:
  k: number of clusters k
  iter: round shown
variables:
  - how many groups you ask the algorithm to find
  - which round of the update you are looking at
charts: []
---

## Try it

1. Watch the 90 dots and the three square centres. Each round every dot changes colour to match its nearest square, then every square jumps to the average position of its own dots.
2. Drag "round" forward. The cost (total distance from every dot to its centre) drops fast at first, then the squares stop moving — the algorithm has settled.
3. Now change "clusters k" to 1, then to 6, and watch the very same 90 dots get carved up completely differently. Nobody told the algorithm the "right" answer; k decides it.

## Real-life examples

1. **Sorting shoppers by habit.** A store has 90 loyalty-card customers and asks for 3 spending types — big spenders, occasional buyers, bargain hunters. After about 10 rounds every shopper has settled into one clear group.
2. **Forcing everyone into one bucket.** Set clusters to 1 and the same 90 shoppers all collapse into a single average customer — useful for nothing, but it shows what k=1 always does.
3. **Splitting a real group by mistake.** Ask for 6 types among the same 90 shoppers, and the algorithm obeys — even cutting one natural group of similar spenders into two arbitrary halves just to fill the quota.

## Test yourself

1. Set clusters k to 3, the true number of shopper types in this data, and run at least 8 rounds until the squares stop moving.
2. Set k to 1 and run a few rounds — watch every dot turn the same colour.
3. Push k to 5 or more and run it out — watch it force splits that were not really there.

## Intuition

Picture 90 dots on the screen and three square markers. Every round has two moves: first, each dot paints itself the colour of the nearest square — that is the "assignment" step. Then each square jumps to sit exactly at the average position of the dots now wearing its colour — that is the "update" step. Repeat those two moves and the squares drift toward the middle of real clumps of dots, because a square that sits at the average of its own group can only get closer to that group next round, never further.

The number you choose for k is not discovered by the algorithm — you hand it over before anything runs. Three squares looking for three real clumps settle quickly and cleanly. One square has no choice but to average the whole screen. Six squares, hunting for six clumps that do not exist, will happily slice a single real clump in half just to have something to do with the extra squares. The shape on screen after convergence is really the answer to "if there were exactly k groups here, what would they be" — and that answer changes completely with k.

## Formal

k-means searches for k centres $c_1,\dots,c_k$ and a group label for every point $x_i$ that together minimise the total squared distance from each point to its own centre: $\arg\min_{c_1,\dots,c_k} \sum_i \min_j \lVert x_i - c_j\rVert^2$.

There is no formula that jumps straight to the answer, so the algorithm alternates two easy steps instead: fix the centres and relabel every point by its nearest one, then fix the labels and move every centre to the mean of its own points. Each step can only lower or hold the total distance, so it always settles, though not always on the same answer twice.

## Advanced

Because the starting centres are random, k-means can settle into different final groupings on different runs, and it always finds *a* local minimum of the distance total rather than the guaranteed best one — this visualisation uses the k-means++ trick of spreading the starting centres apart to make bad luck less likely. Picking k itself is a separate, harder question, often answered by watching how much the total distance drops as k grows and stopping once extra clusters stop helping much (the "elbow" method). Geometrically, the final regions form a Voronoi partition of the plane: every point in a region is closer to that region's centre than to any other.

## Derivation

1. Start by placing k centres, spread apart so two centres rarely start on top of the same clump.
2. Relabel every point with the nearest centre — this is a straight distance comparison, no learning involved.
3. Move each centre to the average position of its newly labelled points, then repeat the relabelling; the total distance never goes up, so the process settles.

## Real world

### Customer segmentation
Marketing teams cluster purchase histories into a handful of customer types to target each group differently, exactly like the shopper example above.

### Image compression
Reducing a photo's millions of colours down to a palette of k colours is literally k-means run on every pixel's colour value, with each pixel repainted the colour of its nearest cluster centre.

### Document and topic grouping
News sites and research libraries cluster articles by word content so that similar stories or papers land in the same group without anyone tagging them by hand.

### Astronomy
Astronomers cluster stars or galaxies by brightness and colour to separate genuinely different populations, such as young hot stars from old cool ones, without assuming the categories in advance.
