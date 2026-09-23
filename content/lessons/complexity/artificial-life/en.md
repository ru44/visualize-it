---
title: Tiny creatures that live, eat and split
summary: Give a handful of dots one rule about energy — wander, eat, split when full, starve when empty — and a whole population rises or crashes depending only on how much food shows up.
parameters:
  initial: creatures at the start
  food: food appearing each step
  step: step
variables:
  - a creature's stored energy
charts: []
---

## Try it

1. Press play. Each blue dot wanders the grid; the small green specks are food.
2. Drag "food appearing each step" down close to zero and watch the population shrink as creatures run out of energy.
3. Drag it back up high. The population booms, with dots splitting into pairs again and again.

## Real-life examples

1. **A hungry world.** 10 creatures, only 3 food specks appearing each step, run for 100 steps: with so little to eat, most of the population starves before it can reproduce.
2. **A balanced world.** 10 creatures with 10 food specks each step, run for 100 steps: births and deaths roughly balance, and the population settles instead of crashing or exploding.
3. **A small colony, plenty of food.** Just 4 creatures but 15 food specks each step, run for 60 steps: the colony has more than it can eat and grows quickly.

## Test yourself

1. Set food to 3 or fewer and run for at least 100 steps. Watch the population fall.
2. Set food to 12 or more and run for at least 60 steps. Watch the population climb.
3. Start with 5 creatures or fewer and run for at least 30 steps. Watch a small colony grow.

## Intuition

Each dot follows the same short list of rules: move to a random neighbouring square, lose one unit of energy for the trouble, and if the square it lands on holds food, eat it and gain energy. Nothing tells a creature to look for food on purpose — it just happens to gain energy when it stumbles onto some, the same way a real animal happens to find something to eat while wandering.

Energy is the whole story after that. A creature with plenty of energy splits into two, each keeping half; a creature with none left simply disappears. No rule mentions "population" or "balance" at all, yet turn the food slider down and the population you see quietly shrinks, turn it up and it booms — a colony-level outcome built entirely from what single dots do to themselves.

## Formal

Each creature keeps one number, its energy $E$. Every step it moves to a random neighbouring cell and $E$ decreases by one; if that cell holds food, $E$ increases and the food is removed.

A creature is removed once $E \le 0$ (it has starved), and it is replaced by two creatures once $E \ge 12$, each starting with half its energy: $E \ge 12 \Rightarrow \text{split in two}$.

## Advanced

This is a minimal instance of what the field calls artificial life: no explicit fitness function is written down, yet the population-level dynamics — growth, decline, an equilibrium size set by the food supply — are the same ones ecologists write as differential equations for real predator–prey and resource-limited populations, recovered here from purely local, energy-based rules.

## Derivation

1. Every step each creature moves to a random neighbouring cell, and its energy $E$ drops by one.
2. Landing on a food cell adds energy and removes the food.
3. A creature with $E \le 0$ starves; one with $E \ge 12$ splits into two, each keeping half the energy.

## Real world

### Ecology
A population's size settles near the level its food supply can sustain — its carrying capacity — the same balance between eating and starving shown here.

### Predator–prey models
Classic population models (Lotka–Volterra) write the same births-minus-deaths bookkeeping as coupled equations instead of individual wandering dots.

### Swarm robotics
Simple robots that only know "move, sense nearby resources, recharge" can forage a whole area efficiently without any robot knowing the group's overall plan.

### Evolutionary algorithms
Splitting only once a threshold is reached, and disappearing once resources run out, is the same selection pressure that lets computer programs "evolve" solutions without anyone specifying which individual should survive.
