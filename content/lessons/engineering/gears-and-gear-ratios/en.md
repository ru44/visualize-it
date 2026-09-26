---
title: Gears and gear ratios
summary: >-
  A small gear spinning inside a big one always trades speed for turning
  force — this lesson shows exactly how much of each you get.
parameters:
  N1: N₁ — teeth on the driver gear
  N2: N₂ — teeth on the driven gear
  w1: ω₁ — driver speed (rpm)
  tau1: τ₁ — driver torque (N·m)
variables:
  - ω₁ — how fast the driver gear spins, in revolutions per minute
  - ω₂ — how fast the driven gear spins, in revolutions per minute
  - N₁ — the number of teeth on the driver gear, the one turned by the motor or the pedals
  - N₂ — the number of teeth on the driven gear, the one that does the work
  - τ₁ — the turning force (torque) put into the driver gear
  - τ₂ — the turning force (torque) that comes out of the driven gear
---

## Try it

1. Drag $N_2$ (teeth on the driven gear) up while $N_1$ stays small. Watch $\omega_2$ fall and $\tau_2$ climb — the smaller gear is now driving a much bigger one.
2. Drag $\omega_1$ (driver speed) up and down. Both gears speed up or slow down together, but their ratio never changes.
3. Drag $\tau_1$ (driver torque) up. The output torque $\tau_2$ grows by exactly the same factor as the gear ratio — nothing about the teeth changed.

## Real-life examples

1. **Climbing a hill on a bicycle.** Pedalling at 60 rpm with about 20 N·m of leg torque, a small 14-tooth front gear driving a large 42-tooth rear gear triples the torque at the wheel (to about 60 N·m) while slowing it to 20 rpm — exactly what you want for a steep climb.
2. **A car's final drive.** An engine spinning at 3000 rpm through a 10-tooth pinion into a 40-tooth ring gear (about 150 N·m at the pinion) quarters the speed to 750 rpm at the wheels while multiplying the torque to about 600 N·m.
3. **A hand-crank kitchen mixer.** Turning the handle at 60 rpm with about 5 N·m of hand effort through a 48-tooth crank gear into a 12-tooth beater gear spins the beaters four times faster, at 240 rpm, with a quarter of the torque.

## Test yourself

1. Choose $N_1$ and $N_2$ so the gear ratio $N_2/N_1$ is exactly 4.
2. With $\omega_1$ at least 200 rpm, pick $N_1$ and $N_2$ so the driven gear spins slower than 50 rpm.
3. Push the output torque $\tau_2$ above 300 N·m.

## Intuition

Picture two gears meshing, teeth interlocking so neither can slip past the other. Whatever length of tooth-edge passes the meeting point on the small gear each second must also pass on the big one — that is the only way the teeth stay locked together. So a small gear with few teeth has to spin around many more times than a big gear with many teeth, just to feed the same number of teeth past the mesh point: $\omega_2 = \omega_1 N_1/N_2$.

Now picture pushing a handle to turn the driver gear. If the driven gear turns fewer times for each turn of the driver, it also pushes back harder for each push you give — nothing is created for free. This is exactly why a bicycle in "low gear" pedals fast but climbs slowly and strongly, while "high gear" pedals slower per wheel turn but needs much more leg force.

## Formal

The tooth pitch is the same on both gears in a mesh, so each gear's pitch radius is proportional to its tooth count, and the two gears share the same speed at the point where their teeth touch: $\omega_1 N_1 = \omega_2 N_2$, which rearranges to $\omega_2 = \omega_1\frac{N_1}{N_2}$.

If the mesh has no friction losses, the power flowing in equals the power flowing out: $\tau_1\omega_1 = \tau_2\omega_2$. Substituting the speed relationship gives $\tau_2 = \tau_1\frac{N_2}{N_1}$ — torque and speed always trade off in exactly opposite directions.

## Advanced

Real gearboxes lose a few percent of power to friction between the teeth and in the bearings, so a measured $\tau_2$ is always a little less than the ideal $\tau_1 N_2/N_1$; well-made gears still reach 95–98% efficiency, close enough that the ideal formula is a good working estimate for design.

## Derivation

1. The teeth mesh without slipping, so the speed at the pitch point is the same measured from either gear: as many teeth pass per second on gear 1 as on gear 2, giving $\omega_1 N_1 = \omega_2 N_2$.
2. Solving for the driven gear's speed gives $\omega_2 = \omega_1\frac{N_1}{N_2}$: fewer teeth on the driven gear means it spins faster.
3. With no losses, power in equals power out, $\tau_1\omega_1 = \tau_2\omega_2$; substituting $\omega_2$ and simplifying gives $\tau_2 = \tau_1\frac{N_2}{N_1}$ — the driven gear gets more torque exactly in proportion to how much slower it turns.

## Real world

### Bicycle derailleurs
Shifting to a bigger rear sprocket increases $N_2$, raising the torque at the wheel for climbing; shifting to a smaller one raises speed for flat, fast riding.

### Car and truck transmissions
Low gears use a large tooth-count ratio to multiply torque for starting from a stop; high gears drop the ratio toward 1:1 so the engine does not have to spin absurdly fast at highway speed.

### Clocks and watches
A mechanical clock uses a long chain of small gear ratios to turn one slow rotation (the hour hand) into many fast ones (the second hand), each stage multiplying the speed a little.

### Wind turbines
A turbine's gearbox does the opposite of a car's: it takes the slow, high-torque turn of the blades (a few rpm) and speeds it up, through many gear stages, to the thousands of rpm a generator needs.
