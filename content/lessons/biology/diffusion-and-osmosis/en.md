---
title: Diffusion and osmosis
summary: >-
  Particles wander randomly, but the net drift is always from crowded to sparse
  — that simple rule explains diffusion across a membrane and why cells swell or
  shrink.
parameters:
  nLeft: particles on the left
  nRight: particles on the right
  perm: membrane permeability — fraction of pores open
  temp: temperature
  split: divider position
variables:
  - net flux — particles crossing the membrane per unit time
  - >-
    diffusion coefficient — how readily particles move, set by permeability and
    temperature
  - concentration on each side of the membrane
  - the concentration gradient across the membrane
---

## Try it

1. Watch the particles bounce across the membrane at random — some already crossing left to right and back again.
2. Drag "particles on the left" far above "particles on the right." More crossings now happen left-to-right than right-to-left, simply because more particles start out on that side.
3. Raise membrane permeability. Crossings happen more often on both sides at once, and the two sides even out faster.

## Real-life examples

- **A sugar cube dissolving in hot tea.** A strong gradient (180 particles versus 10), a warm temperature (350 K) and half-open pores (50%) drive sugar quickly away from the crowded spot next to the cube.
- **Salt almost evened out in a glass of water.** With the two sides nearly matched (100 versus 90 particles) and free-flowing pores (70%), the net flow is already small — most crossings now cancel out.
- **A cold, thick cell wall barely letting anything through.** A big gradient (150 versus 20) but a nearly closed membrane (10% permeability) at a cold temperature (150 K) means diffusion crawls along slowly.

## Test yourself

1. Bring both sides to the same particle count, within 5 of each other.
2. Set up a gradient three times as crowded on the left as the right, with the membrane more than 80% open.
3. Slow diffusion right down: drop permeability under 20% and cool the system below 160 K.

## Intuition

Watch the particles cross the membrane at random — there is no rule telling more of them to go left than right, or vice versa. But because you start with far more particles on the crowded side, far more random crossings happen left-to-right than right-to-left simply by sheer numbers, and the net flow is from high concentration to low, until both sides look roughly the same.

Raise permeability and crossings happen more often on both sides at once, so equilibrium arrives faster without changing where it settles; raise temperature and particles jitter more energetically, speeding diffusion the same way. This particle view is a conceptual model — real molecules do not carry little identity tags, but the statistics of many random individual crossings reproduce Fick’s law of diffusion exactly.

## Formal

Fick’s first law states $J = -D\,dC/dx$: net flux is proportional to the concentration gradient and points from high to low concentration.

At equilibrium, $dC/dx = 0$ and net flux vanishes, even though individual particles keep crossing in both directions — a dynamic, not a static, balance.

## Advanced

Osmosis is diffusion of water specifically, driven by a solute gradient the water cannot cross to equalise directly: water moves toward the higher-solute side instead, and the pressure needed to stop that flow is the osmotic pressure, $\Pi = iMRT$ for a solute of molarity $M$ with $i$ dissociated particles per formula unit — the same ideal-gas-shaped relation that governs pressure in a gas.

## Derivation

1. Each particle on the left has the same chance per unit time of crossing — more particles there means more crossings.
2. Subtract the right-to-left crossings, which follow the same rule with $n_{right}$ in place of $n_{left}$.
3. The net flow shrinks as the two sides equalise, reaching zero exactly at balance — this is Fick’s law in its simplest, discrete form.

## Real world

### Cells in salt water
A red blood cell in seawater loses water by osmosis and shrivels; in pure water it swells and can burst.

### Kidney function
Nephrons rely on concentration gradients across membranes to reclaim water and solutes from urine.

### Plant turgor
Water entering plant cells by osmosis presses the cell membrane against the rigid wall, keeping the plant upright.

### Gas exchange in lungs
Oxygen and carbon dioxide diffuse across the thin membrane of alveoli, each moving down its own concentration gradient.
