---
title: 'Fusion inside stars: from hydrogen to iron'
summary: A star's core gets hotter as it runs low on lighter fuel, and each hotter stage fuses a heavier element — hydrogen, then helium, then carbon and on up to iron, where fusion stops paying off.
parameters:
  temperature: core temperature
  stage: reaction step
variables:
  - the energy released by one fusion step, in MeV
  - the mass lost in the reaction — what went in minus what came out
  - the nucleus's binding energy, the energy needed to break it apart into separate protons and neutrons
  - the mass number, how many protons and neutrons the nucleus holds in total
charts: []
---

## Try it

1. Watch the top row: at 15 million kelvin, the Sun's actual core temperature, the reaction ladder shows the proton-proton chain, the way the Sun turns hydrogen into helium.
2. Press play and watch "reaction step" cycle through all three steps of that chain, one row lit up at a time.
3. Drag "core temperature" past 100 million kelvin. The ladder switches to helium fusing into carbon, and the blue dot on the bottom chart jumps further along the curve.

## Real-life examples

1. **The Sun's core, right now.** At 15 million kelvin, four hydrogen nuclei fuse into one helium nucleus through three steps, releasing about 26.7 MeV each time the chain completes.
2. **A red giant's core.** Once a star like the Sun runs low on hydrogen, its core shrinks and heats past 100 million kelvin, hot enough to fuse helium into carbon.
3. **The core of a dying massive star, days before it explodes.** At around 3 billion kelvin, silicon nuclei fuse in a fast chain that ends at iron-56 — the point where fusion no longer gives back more energy than it takes.

## Test yourself

1. Set the core hot enough to fuse helium into carbon, but no hotter than carbon burning needs.
2. Push the temperature high enough that the star finally starts forming iron.
3. Cool the core back to the Sun's temperature and step through the whole proton-proton chain.

## Intuition

Every row in the reaction ladder is a real step the Sun's core takes right now: two protons crash together and one turns into a neutron, making a deuteron; that deuteron catches a third proton to make helium-3; and two helium-3 nuclei finally meet to make one helium-4, spitting the two spare protons back out. Each of those three steps needs the core hot enough that nuclei collide hard enough to get close, so raising "core temperature" past 15 million kelvin does nothing new for hydrogen — it is already fusing as fast as the Sun needs.

Push the slider past 100 million kelvin instead, and the whole ladder changes: the star has run out of easy hydrogen fuel nearby, its core has shrunk and heated up, and helium nuclei are now slamming together hard enough to build carbon. Keep pushing — carbon into neon, oxygen into silicon, silicon into iron — and notice on the bottom chart that the blue dot climbs a curve that keeps flattening out. By iron-56, at the peak of that curve, there is no heavier nucleus fusion can build that pays back more energy than it costs, which is why a star's fusion story ends there.

## Formal

Every nucleus has a binding energy $E_b$, the energy it would take to pull it apart into separate protons and neutrons; dividing by its mass number $A$ gives $E_b/A$, plotted on the bottom chart. Fusing two light nuclei into one heavier one raises $E_b/A$, all the way up to $A \approx 56$ — iron — after which it very slowly falls.

That rise in binding energy shows up as released energy: fusing nuclei into a more tightly bound one loses a small amount of mass $\Delta m$, converted straight into energy by $Q = \Delta m\,c^2$, the number shown in each row of the ladder.

## Advanced

Each fusion stage needs a higher core temperature than the last because the product nuclei carry more and more positive charge, so their electrical repulsion — the Coulomb barrier from the companion lesson on fusion — gets stronger every stage. Every stage after hydrogen also burns through its fuel far faster than the one before, so a massive star spends millions of years fusing hydrogen but only days fusing silicon into iron, right before its core collapses.

## Derivation

1. Binding energy per nucleon measures how tightly held together a nucleus is, in MeV for each proton or neutron inside it.
2. That value climbs steeply for the lightest elements and keeps climbing, more and more slowly, until it peaks at iron-56.
3. Because fusing toward iron always raises binding energy per nucleon, it always releases energy — and because nothing beyond iron raises it further, fusing past iron would cost energy instead.

## Real world

### The Sun and every star like it
Stars spend almost all of their lives fusing hydrogen, because it is fusion's easiest, longest-lasting fuel.

### Red giants
When a star runs low on hydrogen its core contracts and heats up, igniting helium fusion and swelling the star's outer layers into a red giant.

### Supernovae
Once a massive star's core turns to iron, fusion can no longer hold it up against its own gravity, and the core collapses in under a second, triggering a supernova.

### Nucleosynthesis
Every element heavier than iron in the universe, including the iodine used in medicine, was forged in the extreme heat of a supernova or colliding neutron stars, not ordinary stellar fusion.
