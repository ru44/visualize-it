---
title: 'Hypothesis testing: is the coin rigged?'
summary: >-
  A coin lands heads 55% of the time — cheating, or luck? The court's only
  question is how far outside a fair coin's natural wobble the evidence falls,
  and the answer flips entirely with how many flips you watched.
parameters:
  obs: obs — the observed share of heads
  n: n — how many flips were watched
variables:
  - how many of the fair coin's natural wobbles the evidence sits from 50%
  - the observed share of heads, as a fraction
---

## Try it

1. Start at 55% over 100 flips: the marker sits comfortably inside the bell — a fair coin wanders this far all the time, case dismissed.
2. Keep 55% but raise n to 2000: the bell squeezes to a needle, the same 55% now stands far outside it, and the verdict flips to "beyond luck".
3. Now try 70% over just 10 flips: a huge effect, yet the bell is so wide the court still shrugs — surprise needs evidence, not just a big number.

## Real-life examples

- **The suspicious casino coin.** 55% heads over 100 flips gives z = 1 — fair coins do this constantly, and accusing anyone would be embarrassing.
- **The same coin, properly surveilled.** 55% over 2000 flips gives z ≈ 4.5 — pure luck does that less than once in a hundred thousand runs.
- **The lucky demo.** 7 heads out of 10 looks damning in a headline, but z ≈ 1.3 — ten flips simply cannot convict anyone.

## Test yourself

1. Land the evidence exactly on the threshold: tune obs and n until z sits at 1.96.
2. Keep the share at 55% and make it significant using sample size alone.
3. Find a case with at least 65% heads that still fails the test — small n is the loophole.

## Intuition

Put the coin on trial. The defence's story is boring: "it is a fair coin, and fair coins wobble". That story is the bell on screen — the territory where a fair coin's share of heads naturally lands, centred on 50% and getting narrower as more flips are watched, because luck averages out. The prosecution has one exhibit: the orange marker, the share actually observed.

The court's rule is humble: convict only when the exhibit lands where luck almost never goes. Slide n and watch the whole case turn without the evidence changing — 55% inside a wide bell is nothing, 55% outside a needle-thin bell is damning. That is the entire logic of statistical significance, and also its most common misreading: "significant" never means the effect is big, only that it is too consistent to be luck.

## Formal

Under the boring hypothesis — a fair coin — the observed share of heads $h$ scatters around $0.5$ with standard deviation $\dfrac{0.5}{\sqrt{n}}$. The test statistic $z = \dfrac{h - 0.5}{0.5/\sqrt{n}}$ counts how many of those natural wobbles the evidence sits from the centre.

The conventional threshold rejects the boring hypothesis when $z$ exceeds about $1.96$, which a fair coin does by luck only a few times in a hundred runs. The corresponding tail probability is the p-value: the chance of evidence at least this extreme arising with no cheating at all.

## Advanced

The 5% convention means one "discovery" in twenty is a false alarm even when everyone is honest — and if researchers test twenty things and publish the one that crossed the line, the published record fills with lucky coins. That is p-hacking, and it is why serious fields preregister their analyses, demand replication, or move the threshold far below 5%. The deeper lesson runs both ways: failing the test never proves the coin fair (absence of evidence is not evidence of absence), and passing it with n = 2000 may flag a bias of half a percent — real, and utterly unimportant.

## Derivation

1. If the coin is fair, each flip is a 50–50 draw, so over $n$ flips the share of heads $h$ wobbles around $0.5$ with spread $\dfrac{0.5}{\sqrt{n}}$.
2. Dividing the observed gap by that natural wobble gives $z = \dfrac{h - 0.5}{0.5/\sqrt{n}}$, a pure number comparable across any experiment.
3. The normal curve says $z > 1.96$ arises from luck alone only a couple of times in a hundred — rare enough that the boring explanation is abandoned.

## Real world

### Drug approvals
"The treatment beat placebo, p < 0.05" is this exact courtroom with patients instead of flips — and regulators now often demand two independent convictions.

### A/B testing
Every tech company runs thousands of these trials daily, asking whether the new button genuinely converts better or just got lucky traffic.

### Quality alarms
Factories flag a machine when its defect share drifts outside the fair-wobble band — the same z, watching in real time.

### Spotting cheats
Online games and exams flag accounts whose win rates sit many wobbles beyond the population's bell — luck is a defence that thins exponentially.
