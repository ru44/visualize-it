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

## Try it

1. Watch the trace sit flat and quiet, with the stimulus current $I$ at zero — a resting neuron.
2. Raise $I$ a little and let go. The trace dips slightly and settles back to rest: no spike.
3. Keep raising $I$ past about 1 on its scale. The trace suddenly shoots up into a sharp spike and drops back down — the neuron has fired.

## Real-life examples

- **A neuron at rest.** With no stimulus at all ($I = 0$), the membrane voltage stays flat and quiet, the way a doorbell nobody is touching stays silent.
- **A gentle nudge, no spike.** A weak stimulus ($I = 0.2$) barely disturbs the resting voltage, like a light touch on a doorbell button that isn't quite hard enough to ring it.
- **A strong current, firing again and again.** A stimulus well past threshold ($I = 1.2$) with a faster recovery ($\tau = 8$) makes the neuron spike over and over, the way a held-down doorbell rings again and again.

## Test yourself

1. Push the stimulus current $I$ above 1.0 so the neuron keeps firing spike after spike.
2. Set the two recovery settings, $a$ and $b$, to the same number.
3. Slow the recovery all the way to $\tau = 20$ while keeping the stimulus current below 0.2, so the neuron stays quiet.

## Intuition

Think of a doorbell: a light brush of the button does nothing, but press it hard enough and it rings fully, all at once — never a soft, half-way ring. A neuron works the same way. Raise the first slider, the stimulus current $I$, just a little. The line for membrane voltage, $v$, barely stirs before settling back down to rest. Now push $I$ further, past about 1 on its scale. This time $v$ does not creep up gently. It rockets into one sharp spike and drops straight back down — the same all-or-nothing jump every time, however far past the threshold you pushed.

After that spike, the neuron cannot fire again right away. A second line on the chart, the recovery variable $w$, stays raised for a while. It pulls $v$ below its resting level before both settle back down. That dip is the refractory period — like a doorbell briefly disconnected right after it rings, even if you press it again straight away. Raise the slider called $\tau$, the recovery timescale, and that disconnected period stretches out longer. Real neurons manage this with two separate ion gates, for sodium and for potassium; this simplified model keeps only a fast spiking variable and a slow recovery variable, just enough to reproduce the threshold, the spike, and the refractory pause.

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
