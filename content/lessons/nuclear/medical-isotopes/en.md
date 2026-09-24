---
title: Medical isotopes — imaging fast, treating slow
summary: A hospital picks technetium-99m, gone within a day, to light up a scan safely, but picks iodine-131, active for over a week, when the goal is to keep killing thyroid cells — the isotope's half-life decides the job.
parameters:
  hours: hours since injection
  isotope: isotope
variables:
  - the amount of tracer remaining after time t
  - the amount of tracer injected at time zero
  - hours since the tracer was made or injected
  - the isotope's half-life — the time for half of it to decay
  - how many half-lives have passed
charts: []
---

## Try it

1. Set "isotope" to technetium-99m and watch its curve. By hour 24, barely 6% of it is left.
2. Switch "isotope" to iodine-131 without moving "hours". Its curve has barely dropped in that same 24 hours.
3. Drag "hours" all the way to 48. Technetium-99m has essentially vanished; iodine-131 is still mostly there.

## Real-life examples

1. **A freshly injected bone scan.** At hour 0, the full dose of technetium-99m is in the body, ready to light up wherever it gathers.
2. **Reading the scan.** By hour 6, one technetium-99m half-life later, exactly half the tracer is left — still plenty for a clear image, with the rest already gone.
3. **A day into thyroid treatment.** At hour 24, an iodine-131 dose has barely decayed, still delivering a steady dose to thyroid tissue.

## Test yourself

1. Set technetium-99m to exactly one half-life, hour 6.
2. Wait long enough that technetium-99m has dropped under 5% remaining.
3. Show iodine-131 still active at least 40 hours after the dose.

## Intuition

Technetium-99m and iodine-131 both decay by the same rule — every half-life, exactly half of what is left disappears — but their half-lives are wildly different, and that difference is the entire reason a hospital picks one over the other. Set "isotope" to technetium-99m and drag "hours" forward: the curve collapses fast, because its half-life is only 6 hours, so by the next morning almost none of it is left in the body.

Switch to iodine-131 and drag the same slider: the curve barely moves, because its half-life is 8 days, about 32 times longer. That is exactly the trade a hospital wants for two different jobs — a scan needs just enough activity to light up an image for an hour or two, then wants it gone to keep the patient's radiation dose low, while treating an overactive thyroid needs an isotope that keeps delivering a dose to the target tissue for days.

## Formal

An amount $N_0$ of tracer decays to $N = N_0\left(\tfrac12\right)^{k}$ after $k$ half-lives, where $k = t/T_{1/2}$ counts how many half-lives have passed in $t$ hours — the same law behind carbon dating, just measured in hours instead of years.

Technetium-99m's $T_{1/2} = 6$ hours and iodine-131's $T_{1/2} \approx 192$ hours (8.02 days) sit on opposite ends of nuclear medicine for exactly this reason: a short $T_{1/2}$ clears the body fast after imaging, while a long one sustains a therapeutic dose.

## Advanced

What a detector actually measures is activity, not the raw amount left — activity is proportional to $N/T_{1/2}$, so a short-half-life isotope like technetium-99m is far more radioactive per atom than a long-lived one holding the same atom count, which is exactly why so little of it is needed for a clear scan. Iodine-131 concentrates specifically in the thyroid because the thyroid gland absorbs any iodine it finds to build thyroid hormone, whether the iodine is radioactive or not — the same biology that makes it useful for both imaging a thyroid and treating one.

## Derivation

1. Both isotopes obey the same halving rule, so the number of half-lives that have passed is just the elapsed time divided by the half-life.
2. Raising a half to the power of that count gives the fraction of the original tracer still left.
3. A short half-life reaches a small remaining fraction within hours, while a long half-life stays near its starting amount over the same stretch of time.

## Real world

### Bone and heart scans
Technetium-99m is attached to different carrier molecules to light up bones, the heart or the kidneys, then clears the body within a day or two.

### Thyroid imaging and treatment
A small tracer dose of iodine-131 images the thyroid; a much larger therapeutic dose destroys overactive or cancerous thyroid tissue over the following days and weeks.

### Radiation safety
Hospitals plan storage, handling and patient discharge around each isotope's half-life, since activity drops in a completely predictable way.
