---
title: Simple harmonic motion
summary: 'Follow an ideal spring released from rest, and see how mass and stiffness set its oscillation period.'
parameters:
  A: 'A — maximum displacement from equilibrium'
  k: 'k — spring stiffness'
  m: 'm — oscillating mass'
  x: 't — time since release'
variables:
  - 'maximum displacement from equilibrium'
  - 'spring stiffness'
  - 'constant oscillating mass'
  - 'angular frequency in radians per second'
---

## Try it

1. Set A = 3 m, k = 1 N/m and m = 1 kg. The position starts at +3 m with zero velocity and repeats after about 6.28 s.
2. Keep k and m fixed and reduce A to 1 m. The excursion and maximum speed decrease, but the time between successive peaks remains about 6.28 s.
3. Keep m = 1 kg and increase k to 4 N/m. The period halves to about 3.14 s. In 2D, compare the position curve with its dashed derivative: position extrema have zero velocity, while crossings of equilibrium have maximum speed.

## Real-life examples

1. **A heavier model mass.** With A = 1 m, k = 2 N/m and m = 3 kg, the period is about 7.70 s and maximum speed about 0.816 m/s.
2. **A stiffer, lighter model.** With A = 0.5 m, k = 4 N/m and m = 0.5 kg, the period is about 2.22 s and maximum speed about 1.41 m/s.
3. **A softer model spring.** With A = 3 m, k = 0.3 N/m and m = 1 kg, the period is about 11.47 s and maximum speed about 1.64 m/s. These are idealized examples, not specifications for vehicle or industrial springs.

## Test yourself

1. Make the period approximately 6.28 s.
2. Choose m at least 3 kg and a numerical k within 0.05 of m. In the given units this makes the period close to 2π seconds.
3. Set A = 4 m and make the period less than 2 s.

## Intuition

Pull a mass away from its equilibrium position and release it from rest. The spring pulls it back toward equilibrium. At the centre, the restoring force is zero, but the mass is moving, so it passes through. On the other side the force slows it until it stops and reverses. Without damping, this sequence repeats without losing amplitude.

The ideal restoring force is proportional to displacement and points in the opposite direction. A larger displacement therefore brings a proportionally larger acceleration, allowing a wider oscillation to take the same time. This amplitude-independent period belongs to the ideal linear model. The 3D scene measures positive displacement downward from its equilibrium marker; the 2D graph shows that displacement against time, with velocity overlaid on the same numerical scale in different units.

## Formal

For positive mass m and stiffness k, $m\ddot x=-kx$, or $\ddot x+\omega^2x=0$ with $\omega=\sqrt{k/m}$. The position x is displacement from equilibrium, not the spring's total length. The display uses $x(t)=A\cos(\omega t)$, corresponding to release from x = A with zero initial velocity.

The velocity is $v(t)=-A\omega\sin(\omega t)$ and the period is $T=2\pi\sqrt{m/k}$. Amplitude A changes the maximum displacement and speed but not the period. The angular frequency ω is in radians per second; cycles per second are $f=1/T=\omega/(2\pi)$.

## Advanced

Other initial conditions introduce a phase: x(t) = A cos(ωt+φ). The conserved energy is ½mv² + ½kx² = ½kA². For a vertical spring, measure x from the static equilibrium where gravity and spring force already balance. Damping reduces amplitude, and nonlinear restoring forces can make period depend on amplitude. A pendulum approximates simple harmonic motion only at small angles.

## Derivation

1. Combine the spring's restoring force with Newton's second law, using displacement from equilibrium.
2. Substitute a cosine with angular frequency ω. Its second derivative is −ω² times itself, so the equation holds when ω² = k/m.
3. One full cycle changes phase by 2π, giving T = 2π/ω. No amplitude appears in this period formula.

## Real world

### Small oscillations

Many systems near a stable equilibrium have an approximately linear restoring force. A spring-mass model can then describe small motion even when the full system is more complicated.

### Comparing real and ideal springs

A real oscillation may decay or change period at large amplitude. Observing those differences helps identify when damping or a nonlinear model is needed.
