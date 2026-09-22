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
