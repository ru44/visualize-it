---
title: Levers, pulleys and mechanical advantage
summary: >-
  A long enough bar lets you lift almost anything with almost no force —
  as long as you're willing to push your end a lot farther.
parameters:
  Fload: F_load — weight of the load
  dload: d_load — distance from fulcrum to the load
  deff: d_eff — distance from fulcrum to where you push
  h: h — how high the load must be lifted
variables:
  - F_eff — the force you have to push with, at the effort end of the lever
  - d_eff — the distance from the fulcrum (pivot) to where you push
  - F_load — the weight of the load being lifted
  - d_load — the distance from the fulcrum to the load
  - "M — the mechanical advantage: how many times the lever multiplies your force"
---

## Try it

1. Drag $d_{eff}$ (how far your hand is from the fulcrum) outward. Watch $F_{eff}$, the force you need, fall — and $M$ climb.
2. Now drag $d_{load}$ closer to the fulcrum instead. The same thing happens: $M$ rises, and lifting gets easier.
3. Drag $h$ (how high the load must rise) up. The force $F_{eff}$ never changes, but the distance your hand must travel grows by the same factor $M$ — the machine never gives you something for nothing.

## Real-life examples

1. **A crowbar prying up a 150 kg rock.** With the fulcrum just 5 cm from the rock (≈1500 N) and your hand 90 cm out, the mechanical advantage is 18, so it takes only about 83 N of push — but your end has to travel 54 cm to lift the rock 3 cm.
2. **A loaded wheelbarrow.** With about 600 N of dirt sitting 30 cm from the wheel (the fulcrum) and your hands 1.2 m back, the advantage is 4: you push with 150 N, but your hands travel 60 cm to raise the load 15 cm.
3. **A long pry bar under a car's corner (about 3000 N).** With the bar's pivot 10 cm from the car and your hands 2 m out, the advantage is 20 and only about 150 N of push is needed — at the cost of swinging your end 160 cm to lift the car 8 cm.

## Test yourself

1. Choose $F_{load}$, $d_{load}$ and $d_{eff}$ so the effort force needed is about 100 N.
2. Build a lever with mechanical advantage above 15 while still lifting a load heavier than 1000 N.
3. Build a lever with mechanical advantage under 1.5 that still needs an effort force of at least 70% of the load's weight.

## Intuition

A lever is a rigid bar balanced on a fulcrum: push down on one end and the other end pushes up. What decides how hard you have to push is not the weight alone, but how far each end sits from the pivot. Move your hands twice as far from the fulcrum as the load is, and you only need half the force — the bar is acting like a distance-multiplier that turns into a force-divider.

But nothing is free: swing the far end down by some amount, and the near end (twice as close to the pivot) only rises half as much. So if your effort arm is 18 times longer than the load arm, like the crowbar above, you push with 18 times less force — but you also have to push 18 times farther to lift the rock the same height. A lever trades force for distance, never eliminates the work.

## Formal

Balancing the turning effect (torque) of both ends about the fulcrum gives $F_{eff}\,d_{eff} = F_{load}\,d_{load}$, so the mechanical advantage is $M = \frac{d_{eff}}{d_{load}} = \frac{F_{load}}{F_{eff}}$: the ratio of the arm lengths equals the ratio of the forces, exactly inverted.

Rearranging gives the force you actually need to supply: $F_{eff} = \frac{F_{load}}{M}$. A pulley system works by the identical rule, just measured in rope pulled instead of arm length: pulling out $M$ metres of rope for every metre the load rises needs $M$ times less force to hold it.

## Advanced

Real levers and pulleys lose a little of this advantage to friction at the pivot or in the rope, so the force actually needed is always a bit above $F_{load}/M$; well-oiled hardware still gets close enough that $M = d_{eff}/d_{load}$ remains the number worth designing around.

## Derivation

1. A rigid lever in balance has equal turning effect on both sides of the fulcrum: the effort's push times its arm length equals the load's weight times its arm length, $F_{eff}\,d_{eff} = F_{load}\,d_{load}$.
2. Dividing both sides rearranges this into the mechanical advantage, $M = \frac{d_{eff}}{d_{load}} = \frac{F_{load}}{F_{eff}}$: the longer the effort arm compared to the load arm, the bigger the multiplication.
3. Solving directly for the force you must supply gives $F_{eff} = \frac{F_{load}}{M}$: a mechanical advantage of 10 means only a tenth of the load's weight is needed to lift it.

## Real world

### Crowbars and pry bars
A short distance from the fulcrum to a stuck object and a long handle to push gives enormous mechanical advantage for prying up rocks, nails or car corners.

### Wheelbarrows
The wheel acts as the fulcrum, so the load sits close to it while your hands push from far away, letting one person lift a load that would be far too heavy to carry.

### Block-and-tackle pulleys
A block and tackle with four rope segments supporting the load gives a mechanical advantage of 4, the same trade as a lever: pulling 4 metres of rope lifts an engine block just 1 metre, with a quarter of its weight in force.

### Seesaws and scissors
A seesaw balances two people at equal $F \cdot d$ on each side; scissors and pliers use a short jaw and a long handle so a light hand-squeeze becomes a strong cutting or gripping force.
