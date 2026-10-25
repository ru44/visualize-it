---
title: 'Scaling laws: why bigger kept getting smarter'
summary: >-
  The surprise that built the AI era is that a model's skill follows a smooth,
  predictable law of just two knobs — brain size and reading diet — so labs
  could price intelligence like engineers, not gamblers.
parameters:
  n: n — model size, as powers of ten of parameters
  d: d — training data, as powers of ten of tokens
variables:
  - the loss, how wrong the model still is
  - the irreducible floor no scale removes
  - the brain-term constant
  - the parameter count
  - the data-term constant
  - the training token count
---

## Try it

1. Hold d still and drag n up: the loss falls along the smooth inset curve — no jumps, no magic thresholds, just a power law flattening as it goes.
2. Watch the two penalty bars as you move either slider: whichever bar is taller is the shortfall worth spending on next — the law is literally a shopping guide.
3. Build the starved giant: n at 12, d at 8.5. A trillion parameters, a few hundred million tokens — and a *worse* loss than models a hundred times smaller fed properly.

## Real-life examples

- **A GPT-2-scale run.** A billion parameters on ten billion tokens: loss around 2.5 — fluent-ish text with constant stumbles, exactly what 2019 sounded like.
- **A balanced modern run.** ~30B parameters on ~600B tokens sits on the D ≈ 20N line: both penalty bars shrink together and nothing is wasted.
- **The starved giant.** The pre-2022 habit: grow N, keep D. Its data bar dwarfs its brain bar — the law says the next dollar belonged in books, not neurons.

## Test yourself

1. Reach a loss of 2.0 or better any way you like.
2. Sit within ±0.25 of the balanced recipe (d = n + 1.3, i.e. 20 tokens per parameter) with a model of at least 10 billion parameters.
3. Recreate the starved giant — n at least 11.5, d at most 8.5 — and read which term is eating it alive.

## Intuition

The strangest fact about modern AI is not that it works but that its progress was *plottable*. Train models from millions to billions of parameters, plot their loss against size on log-log paper, and the points fall on a straight line — no plateau where sceptics predicted, no jump where enthusiasts hoped. Skill arrives on a schedule of two knobs: how many parameters the brain has, and how many tokens of text it reads. Each knob has diminishing returns of a precise, measured shape, and their shortfalls simply add.

That additivity is what the two bars on screen show, and it is where the business of AI lives. If the brain term dominates, buy parameters; if the data term dominates, buy tokens; the famous 2022 result (Chinchilla) was the embarrassment of measuring the constants carefully and finding the whole field had been building starved giants — enormous brains on thin diets. The fix — roughly twenty tokens per parameter — made smaller models beat bigger ones at the same compute price, and every serious model since has been fed by this curve. When you hear that training runs cost what power plants cost and were approved anyway, it is because this page's thermometer was trusted to move.

## Formal

The fitted law is $L = E + \frac{A}{N^{\alpha}} + \frac{B}{D^{\beta}}$, with the Chinchilla constants $E = 1.69$, $A = 406.4$, $\alpha = 0.34$, $B = 410.7$, $\beta = 0.28$. $E$ is the floor: the entropy of language itself, the part of the next word that is genuinely unpredictable at any scale.

Training compute is roughly $C \approx 6ND$ floating-point operations, so a fixed budget is a trade: more brain or more diet. Minimising $L$ subject to $6ND = C$ gives the balance where both penalty terms shrink in step — numerically close to $D \approx 20N$. Off that line, one term dominates and part of the budget is wasted, which is precisely what the starved-giant preset demonstrates.

## Advanced

The law measures next-word loss, not wisdom — yet downstream abilities ride it with surprising fidelity, and some arrive suddenly: a capability absent at one scale appears at the next, "emergence" that makes frontier training part physics, part astronomy. The law also has edges: run out of fresh text and the data term stops obeying (the "data wall" driving synthetic data and multiple epochs); and a law fit for *training* ignores that a model is run billions of times after, so inference economics pushes toward smaller models overtrained far past twenty tokens per parameter — deliberately off the Chinchilla line, wasting training compute to save serving compute, which is why the small-but-overfed model became the signature of the current era.

## Derivation

1. Three independent error sources add: the floor $E$ no scale removes, a brain shortfall falling as $N^{-\alpha}$, and a diet shortfall falling as $D^{-\beta}$.
2. Fitting hundreds of training runs pins the constants: $L = 1.69 + \frac{406.4}{N^{0.34}} + \frac{410.7}{D^{0.28}}$.
3. At a fixed compute budget $C \approx 6ND$, the loss is lowest where the two penalty terms shrink together — the balanced recipe $D \approx 20N$.

## Real world

### Budgeting a frontier model
Labs fit this curve on small cheap runs, then extrapolate to decide whether a nine-figure training run is worth approving — and the extrapolations have held.

### The Chinchilla correction
A 70B model fed 1.4T tokens outperformed a 280B model fed 300B at equal compute — the clearest public demonstration that the recipe beats raw size.

### The data wall
High-quality public text is close to exhausted at frontier scale, making data curation, licensing and synthesis the field's new bottleneck.

### Small models that punch up
Phone-sized models trained far past their "balanced" diet are this law exploited sideways: pay extra training once, save inference forever.
