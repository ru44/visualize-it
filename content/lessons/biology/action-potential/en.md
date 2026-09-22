---
title: The action potential (FitzHugh–Nagumo)
summary: >-
  A nerve cell stays quiet under a weak nudge but fires an all-or-nothing spike
  once a stimulus crosses a threshold — then needs a short recovery before it
  can fire again.
parameters:
  I: stimulus current I
  a: a — recovery offset
  b: b — recovery coupling
  tau: τ — recovery timescale
  tView: time marker
variables:
  - 'membrane voltage (in scaled, dimensionless units)'
  - >-
    recovery variable — models slower ion-channel processes that bring the
    membrane back down
  - injected stimulus current
  - recovery offset
  - recovery coupling strength
  - 'timescale over which recovery acts, slow compared to v'
---

## Intuition

Drag I up gradually from zero and, for a while, v barely responds — a weak stimulus just decays back to rest. Push I past a threshold, though, and v suddenly rockets up and back down in a sharp spike, regardless of exactly how far past threshold you went: that all-or-nothing shape is the hallmark of a real action potential.

After the spike, w stays elevated for a while and pulls v below its resting level before both relax back — that dip is the refractory period, when the neuron is much harder to fire again even with a strong stimulus. Raise τ and recovery slows down, stretching out the refractory period; this is a simplified two-variable stand-in for the four-variable Hodgkin–Huxley model of real sodium and potassium channels.

## Formal

The nullcline $w = v - v^3/3 + I$ is cubic; where it crosses the line $w=(v+a)/b$ sets the resting point, and if that crossing sits on the cubic’s middle (unstable) branch, small perturbations grow into a full spike.

For $I$ below threshold the system has a single stable resting equilibrium; crossing threshold moves the equilibrium onto the unstable branch and switches the dynamics to an excitable, spiking regime.

## Advanced

FitzHugh–Nagumo is a two-dimensional reduction of the four-dimensional Hodgkin–Huxley equations, keeping only a fast excitable variable ($v$) and a slow recovery variable ($w$); it reproduces the threshold, spike shape and refractory period of a real neuron qualitatively while being simple enough to analyse with phase-plane methods, at the cost of the biophysical detail (separate sodium and potassium conductances) the original model carries.

## Derivation

1. The cubic term makes $v$ excitable: it self-accelerates near rest but is pulled back once large, producing a sharp spike rather than smooth growth.
2. The recovery variable $w$ chases $v$ slowly (large $\tau$), rising during the spike and pulling $v$ back down afterward.
3. That timescale separation between fast $v$ and slow $w$ is what produces a sharp spike followed by a refractory dip, rather than a smooth oscillation.

## Real world

### Nerve signalling
Every thought, reflex and muscle contraction starts with action potentials like this one racing down axons.

### Local anaesthetics
Drugs like lidocaine block the sodium channels behind the threshold, preventing action potentials in the treated area.

### Cardiac rhythm
Heart cells fire similar all-or-nothing spikes, and a refractory period like this one prevents the heart from re-triggering too soon.

### Epilepsy
Seizures involve neurons firing in a hypersynchronised way when normal threshold and refractory dynamics break down.
