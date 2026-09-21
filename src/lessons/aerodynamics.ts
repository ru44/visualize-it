import type { Lesson } from './types'

const r = String.raw

export const aerodynamics: Lesson[] = [
  {
    id: 'lift',
    title: 'Lift and the airfoil',
    subject: 'aerodynamics',
    difficulty: 'university',
    equation: r`L = \tfrac12 \rho v^2 S\, C_L`,
    summary: 'A wing turns the airflow downward; by Newton\u2019s third law the air pushes back up on the wing. That force, together with the pressure difference it creates, is lift.',
    concepts: ['lift', 'angle-of-attack', 'pressure', 'circulation'],
    prerequisites: ['newtons-second-law', 'function-graph'],
    related: ['stall-and-angle-of-attack', 'lift-to-drag', 'bernoulli'],
    visualization: { type: 'airfoil', options: {} },
    parameters: {
      alpha: { label: 'angle of attack α', min: -5, max: 20, step: 0.5, value: 5, unit: '°' },
      v: { label: 'airspeed v', min: 10, max: 90, step: 1, value: 50, unit: 'm/s' },
    },
    charts: [
      {
        title: 'Lift coefficient vs angle of attack',
        xLabel: 'α (°)',
        yLabel: 'C_L',
        domain: [-5, 20],
        marker: 'alpha',
        series: [{ label: 'C_L(α)', expr: 'x < 15 ? 0.11*(x+2) : 1.87 - 0.19*(x-15)' }],
      },
    ],
    variables: [
      { symbol: 'L', meaning: 'lift force, perpendicular to the oncoming flow' },
      { symbol: r`\rho`, meaning: 'air density' },
      { symbol: 'v', meaning: 'airspeed' },
      { symbol: 'S', meaning: 'wing area' },
      { symbol: 'C_L', meaning: 'lift coefficient — how effectively the shape and angle turn air, given α' },
    ],
    explanation: {
      intuition: [
        'Drag the angle of attack up and watch the streamlines: the wing tilts and every line bends downward as it passes, most sharply just behind the trailing edge, where the downward deflection is drawn as downwash. Turning that much air downward every second requires a downward force on the air \u2014 so by Newton\u2019s third law the air pushes the wing up. That reaction force is most of what you feel as lift. You should ignore the old "equal transit time" story that air splitting at the leading edge must meet back up at the trailing edge at the same time: it is not true, does not follow from any physical law, and gets the direction of causation backwards.',
        'Raise the airspeed slider instead and the lift and drag arrows both grow \u2014 lift with the square of speed, so doubling v roughly quadruples L. Notice the streamlines bunch closer together just above the wing\u2019s curved upper surface: that tighter spacing is faster-moving air, and faster-moving air has lower pressure (Bernoulli). The suction on top and the higher pressure underneath add up to the same lift force as the momentum picture \u2014 two ways of describing one phenomenon, not two competing mechanisms.',
      ],
      formal: [
        'Lift is defined as the force component perpendicular to the free-stream velocity: $L = \\tfrac12 \\rho v^2 S\\, C_L$, with $C_L$ an empirical/theoretical function of angle of attack $\\alpha$ (and Reynolds number, Mach number, camber, \u2026).',
        'For a thin cambered airfoil at modest α, thin-airfoil theory gives $C_L \\approx 2\\pi(\\alpha - \\alpha_{L0})$ (radians), i.e. lift grows linearly with angle of attack away from the zero-lift angle $\\alpha_{L0}$ set by the camber \u2014 the near-linear region drawn in the chart below.',
      ],
      advanced: [
        'Formally, lift on a 2D airfoil equals $\\rho v \\Gamma$ (the Kutta\u2013Joukowski theorem), where $\\Gamma$ is the circulation of the flow around the section. The Kutta condition \u2014 that the flow must leave smoothly at a sharp trailing edge rather than wrapping around it \u2014 is what fixes $\\Gamma$ to a unique physical value instead of leaving it undetermined, and it is this same condition, not equal transit time, that makes the flow above the wing move faster.',
      ],
    },
    derivation: [
      { tex: r`\dot{p}_{\text{air}} = \dot m\, \Delta v_y`, note: 'The wing deflects a mass flow rate $\\dot m$ of air downward by a vertical velocity change $\\Delta v_y$ (the downwash).' },
      { tex: r`L = \dot{p}_{\text{air}} = \rho v S \cdot v\sin\alpha \;\propto\; \rho v^2 S \sin\alpha`, note: 'The mass flow scales with $\\rho v S$ and the deflection scales with $v$ and $\\alpha$; near-linear response is folded into $C_L(\\alpha)$.' },
      { tex: r`L = \tfrac12 \rho v^2 S\, C_L(\alpha)`, note: 'Conventionally written with a factor $\\tfrac12$ so that $C_L$ matches the dimensionless coefficient measured in wind tunnels.' },
    ],
    realWorld: [
      { title: 'Takeoff and landing', text: 'Flaps increase effective camber and area at low speed, boosting $C_L$ so the wing can make enough lift before the wheels leave the ground.' },
      { title: 'Bird and insect flight', text: 'Birds actively vary α and camber stroke by stroke; the same $L = \\tfrac12\\rho v^2 S C_L$ relation governs a sparrow as much as an airliner.' },
      { title: 'Formula 1 wings', text: 'Inverted airfoils on a race car generate downforce the same way, pressing tyres into the track for more cornering grip.' },
      { title: 'Sailing upwind', text: 'A sail is a cambered airfoil in cross-section; trimming it changes its effective angle of attack to the apparent wind.' },
    ],
  },
  {
    id: 'drag-equation',
    title: 'The drag equation',
    subject: 'aerodynamics',
    difficulty: 'high-school',
    equation: r`D = \tfrac12 \rho v^2 C_D A`,
    summary: 'Drag resists motion through a fluid and grows with the square of speed, so doubling your speed quadruples the force you must fight.',
    concepts: ['drag', 'dynamic-pressure', 'drag-coefficient'],
    prerequisites: ['newtons-second-law', 'function-graph'],
    related: ['lift', 'lift-to-drag', 'terminal-velocity'],
    visualization: {
      type: 'function-plot',
      options: { expr: '0.5*rho*Cd*A*x^2', domain: [0, 60], range: [-20, 900], mode: 'tangent' },
    },
    charts: [
      {
        title: 'Power needed to overcome drag: P = D\u00b7v \u221d v\u00b3',
        xLabel: 'v (m/s)',
        yLabel: 'P (kW)',
        domain: [0, 60],
        marker: 'x',
        series: [{ label: 'P(v)', expr: '0.5*rho*Cd*A*x^3/1000' }],
      },
    ],
    parameters: {
      rho: { label: 'fluid density ρ', min: 0.02, max: 1.3, step: 0.01, value: 1.225, unit: 'kg/m\u00b3' },
      Cd: { label: 'drag coefficient C_D', min: 0.1, max: 1.5, step: 0.01, value: 0.3 },
      A: { label: 'frontal area A', min: 0.5, max: 10, step: 0.1, value: 2.2, unit: 'm\u00b2' },
      x: { label: 'speed v', min: 0, max: 60, step: 0.5, value: 25, unit: 'm/s' },
    },
    variables: [
      { symbol: 'D', meaning: 'drag force, opposing motion' },
      { symbol: r`\rho`, meaning: 'fluid density' },
      { symbol: 'v', meaning: 'speed relative to the fluid' },
      { symbol: 'C_D', meaning: 'drag coefficient \u2014 how bluff or streamlined the shape is' },
      { symbol: 'A', meaning: 'reference (usually frontal) area' },
    ],
    explanation: {
      intuition: [
        'Drag the speed point along the curve: the curve is a parabola, and its tangent line \u2014 the extra force needed for one more m/s \u2014 gets steeper and steeper as you move right. Near v = 0 the tangent is almost flat, but by highway speed a small further increase costs a large extra push, which is exactly why fuel economy falls off a cliff on the motorway.',
        'Now change $C_D$ or the frontal area $A$: the whole parabola scales up or down but keeps its shape, because both sit as a plain multiplier in front of $v^2$. A cyclist tucking into an aerodynamic crouch is shrinking $A$; a streamlined car body is shrinking $C_D$ \u2014 both attack the same multiplier rather than fighting the unavoidable $v^2$ growth.',
      ],
      formal: [
        'Drag is defined via the dynamic pressure $q = \\tfrac12\\rho v^2$ and a dimensionless coefficient: $D = qC_D A = \\tfrac12 \\rho v^2 C_D A$.',
        'Power to overcome drag at constant speed is $P = Dv = \\tfrac12\\rho v^3 C_D A$ \u2014 cubic in speed, which is why top speed is so expensive to buy.',
      ],
      advanced: [
        'Total drag splits into parasitic drag (skin friction + form drag, both $\\propto v^2$, dominant at high speed) and induced drag from generating lift ($\\propto 1/v^2$, dominant at low speed) \u2014 see the lift-to-drag lesson for why their sum has a single minimum that defines best-range speed.',
      ],
    },
    derivation: [
      { tex: r`q = \tfrac12 \rho v^2`, note: 'Dynamic pressure: the kinetic energy per unit volume of the oncoming flow.' },
      { tex: r`D = q \cdot C_D A`, note: '$C_D$ packages all the messy shape- and Reynolds-number-dependent physics into one measured number.' },
      { tex: r`D = \tfrac12 \rho v^2 C_D A`, note: 'Combine: drag grows with the square of speed for any fixed shape and orientation.' },
    ],
    realWorld: [
      { title: 'Cycling and running', text: 'Above a jog, air drag dominates human effort; aero bars and skin suits chase small $C_D A$ reductions because the payoff compounds with $v^2$.' },
      { title: 'Vehicle fuel economy', text: 'Cruising fuel consumption rises roughly with $v^3$ once drag dominates rolling resistance \u2014 the reason motorway mpg drops sharply above about 100 km/h.' },
      { title: 'Skydiving', text: 'A skydiver\u2019s belly-down posture maximises $A$ and $C_D$ to slow their terminal velocity for a safer, more controllable fall.' },
      { title: 'Wind loads on structures', text: 'Engineers size a building or bridge\u2019s wind bracing using exactly this $v^2$ law, with hurricane-speed winds in mind.' },
    ],
  },
  {
    id: 'bernoulli',
    title: 'Bernoulli and continuity',
    subject: 'aerodynamics',
    difficulty: 'university',
    equation: r`p + \tfrac12 \rho v^2 = \text{const}, \qquad A_1 v_1 = A_2 v_2`,
    summary: 'Squeeze a steady flow through a narrower pipe and it must speed up (continuity); where it speeds up, its pressure must fall (Bernoulli).',
    concepts: ['continuity', 'pressure', 'incompressible-flow'],
    prerequisites: ['newtons-second-law'],
    related: ['lift', 'drag-equation'],
    visualization: { type: 'venturi', options: {} },
    parameters: {
      v1: { label: 'inlet speed v\u2081', min: 2, max: 30, step: 0.5, value: 10, unit: 'm/s' },
      ratio: { label: 'throat / inlet area', min: 0.2, max: 1, step: 0.01, value: 0.5 },
    },
    variables: [
      { symbol: 'p', meaning: 'static pressure' },
      { symbol: 'v', meaning: 'flow speed' },
      { symbol: 'A', meaning: 'pipe cross-sectional area' },
      { symbol: r`\rho`, meaning: 'fluid density (assumed constant \u2014 incompressible)' },
    ],
    explanation: {
      intuition: [
        'Shrink the throat with the drag handle and watch the particles: the same number must pass every cross-section each second, so where the pipe narrows they must speed up to keep up \u2014 that\u2019s continuity, just like traffic bunching and accelerating through a lane closure.',
        'Now look at the three manometer tubes. The liquid sits lower at the throat than at the inlet or outlet \u2014 the fast-moving air there is at lower pressure. Nothing is being destroyed: energy per unit volume ($p + \\tfrac12\\rho v^2$) stays constant along the pipe, so the kinetic-energy term the fluid gains by speeding up is paid for exactly by the pressure term it loses.',
      ],
      formal: [
        'Continuity for an incompressible fluid in a stream tube: $A_1 v_1 = A_2 v_2$, i.e. mass flow rate $\\rho A v$ is constant.',
        'Bernoulli\u2019s equation along a streamline (steady, inviscid, incompressible, no elevation change): $p_1 + \\tfrac12\\rho v_1^2 = p_2 + \\tfrac12\\rho v_2^2$.',
      ],
      advanced: [
        'Bernoulli\u2019s equation is the steady-flow, along-a-streamline statement of energy conservation for an inviscid fluid \u2014 it follows from integrating the Euler momentum equation $\\rho(\\mathbf v\\cdot\\nabla)\\mathbf v = -\\nabla p$ along a streamline. Real venturis lose a little total pressure to viscosity, which is why the outlet manometer here is drawn exactly level with the inlet only in this ideal, lossless model.',
      ],
    },
    derivation: [
      { tex: r`\rho A_1 v_1 = \rho A_2 v_2 \;\Rightarrow\; A_1 v_1 = A_2 v_2`, note: 'Mass in equals mass out for steady incompressible flow through a tube of varying area.' },
      { tex: r`dp = -\rho v\, dv`, note: "Euler's equation along a streamline with no other forces: a speeding fluid parcel is pushed forward by falling pressure." },
      { tex: r`p_1 + \tfrac12\rho v_1^2 = p_2 + \tfrac12\rho v_2^2`, note: 'Integrate from station 1 to station 2: the sum is conserved along the streamline.' },
    ],
    realWorld: [
      { title: 'Carburettors and atomisers', text: 'Air accelerated through a venturi throat drops in pressure enough to draw fuel or perfume up a side tube.' },
      { title: 'Flow meters', text: 'Measuring the pressure drop through a known constriction (a venturi or orifice meter) gives the flow rate directly.' },
      { title: 'Aneurysms', text: 'Blood speeding up through a narrowed artery drops in local pressure \u2014 the same physics, with real physiological consequences.' },
      { title: 'Wind around buildings', text: 'Air squeezed between tall buildings speeds up and its pressure drops, which is why gaps between towers feel so much windier.' },
    ],
  },
  {
    id: 'stall-and-angle-of-attack',
    title: 'Stall and the critical angle',
    subject: 'aerodynamics',
    difficulty: 'university',
    equation: r`C_L(\alpha) \nearrow \text{until } \alpha_{\text{crit}}, \text{ then } C_L \searrow`,
    summary: 'Lift is set by angle of attack, not speed \u2014 push that angle past a critical value at any speed and the flow separates, lift collapses, and the wing stalls.',
    concepts: ['stall', 'separation', 'angle-of-attack', 'boundary-layer'],
    prerequisites: ['lift'],
    related: ['lift', 'lift-to-drag'],
    visualization: { type: 'airfoil', options: {} },
    parameters: {
      alpha: { label: 'angle of attack α', min: -5, max: 20, step: 0.5, value: 14, unit: '°' },
      v: { label: 'airspeed v', min: 10, max: 90, step: 1, value: 40, unit: 'm/s' },
    },
    charts: [
      {
        title: 'Lift coefficient vs angle of attack',
        xLabel: 'α (°)',
        yLabel: 'C_L',
        domain: [-5, 20],
        marker: 'alpha',
        series: [{ label: 'C_L(α)', expr: 'x < 15 ? 0.11*(x+2) : 1.87 - 0.19*(x-15)' }],
      },
    ],
    variables: [
      { symbol: r`\alpha`, meaning: 'angle of attack \u2014 the angle between the chord line and the oncoming flow' },
      { symbol: r`\alpha_{\text{crit}}`, meaning: 'critical (stall) angle, here about 15\u00b0' },
      { symbol: 'C_L', meaning: 'lift coefficient, which peaks at $\\alpha_{\\text{crit}}$' },
    ],
    explanation: {
      intuition: [
        'Push the angle slider past about 15\u00b0 and watch the streamlines over the top of the wing: instead of following the curved upper surface smoothly, they start to wobble, separate, and tint red. That is the boundary layer losing its grip on the surface \u2014 it can no longer turn the corner around the increasingly steep upper curve and peels away, and the smooth downward deflection of air that produced lift breaks down with it.',
        'Notice the airspeed slider does nothing to trigger this \u2014 you can stall a wing at any speed, fast or slow, high in the sky or on final approach. What matters is purely the angle between the chord and the oncoming air. A common misconception is that stall means "too slow"; the honest statement is "too steep": low-speed flight just happens to need a steep angle to make enough lift, which is why stalls are more often met near landing speed, but a diving aircraft can just as easily stall by pulling the nose up too hard.',
      ],
      formal: [
        '$C_L(\\alpha)$ rises roughly linearly (thin-airfoil theory, $C_L \\approx 2\\pi\\alpha$ in radians) until flow separation begins near $\\alpha_{\\text{crit}}$, after which $C_L$ falls even as $\\alpha$ keeps increasing.',
        'Stall speed follows directly from $L = W$ at $C_{L,\\max}$: $v_{\\text{stall}} = \\sqrt{2W/(\\rho S C_{L,\\max})}$ \u2014 a speed, but caused by an angle.',
      ],
      advanced: [
        'Separation occurs where the boundary layer\u2019s momentum can no longer overcome the adverse pressure gradient on the aft upper surface (where pressure is recovering back toward free-stream). Turbulent boundary layers resist separation better than laminar ones because they mix momentum from the outer flow back toward the wall \u2014 which is why vortex generators and turbulators are deliberately used to delay stall.',
      ],
    },
    derivation: [
      { tex: r`L = W \;\Rightarrow\; \tfrac12\rho v^2 S C_L = W`, note: 'In steady level flight lift must exactly balance weight.' },
      { tex: r`C_L \le C_{L,\max}`, note: 'The lift coefficient has a hard ceiling set by the airfoil and reached at $\\alpha_{\\text{crit}}$.' },
      { tex: r`v_{\text{stall}} = \sqrt{\dfrac{2W}{\rho S\, C_{L,\max}}}`, note: 'Solving for the minimum speed at which enough lift is even possible \u2014 fly any slower and no angle of attack will save you.' },
    ],
    realWorld: [
      { title: 'Stall warning systems', text: 'Aircraft use angle-of-attack sensors, not airspeed alone, to warn pilots \u2014 exactly because stall is an angle phenomenon.' },
      { title: 'Landing technique', text: 'Pilots fly a target approach speed specifically to keep a safety margin between the angle of attack in use and $\\alpha_{\\text{crit}}$.' },
      { title: 'Stall strips and slats', text: 'Small fixed strips or deployable slats on the leading edge re-energise the boundary layer to push $\\alpha_{\\text{crit}}$ higher.' },
      { title: 'Car spoilers and rear wings', text: 'The same separation physics limits how much downforce a rear wing can generate before it stalls and downforce collapses.' },
    ],
  },
  {
    id: 'lift-to-drag',
    title: 'Lift-to-drag ratio and glide',
    subject: 'aerodynamics',
    difficulty: 'advanced',
    equation: r`\frac{L}{D} = \frac{C_L}{C_D}, \qquad C_D = C_{D,0} + \frac{C_L^2}{\pi\, AR\, e}`,
    summary: 'How far a glider travels for every metre it sinks is set entirely by the lift-to-drag ratio \u2014 and long, slender wings maximise it by cutting induced drag.',
    concepts: ['glide-ratio', 'induced-drag', 'aspect-ratio', 'optimisation'],
    prerequisites: ['lift', 'drag-equation', 'derivative'],
    related: ['lift', 'drag-equation', 'stall-and-angle-of-attack'],
    visualization: {
      type: 'function-plot',
      options: {
        expr: '(0.11*(x+2)) / (0.02 + (0.11*(x+2))^2/(pi*AR*0.85))',
        domain: [-1, 14],
        range: [-2, 22],
        mode: 'tangent',
      },
    },
    charts: [
      {
        title: 'Induced drag falls sharply as aspect ratio rises',
        xLabel: 'AR',
        yLabel: 'C_D at α = 5°',
        domain: [4, 30],
        marker: 'AR',
        series: [{ label: 'C_D(AR)', expr: '0.02 + (0.11*7)^2/(pi*x*0.85)' }],
      },
    ],
    parameters: {
      AR: { label: 'aspect ratio AR', min: 4, max: 30, step: 0.5, value: 7 },
      x: { label: 'angle of attack α', min: -1, max: 14, step: 0.25, value: 5, unit: '°' },
    },
    variables: [
      { symbol: 'L/D', meaning: 'lift-to-drag ratio \u2014 also the glide ratio: metres travelled per metre descended' },
      { symbol: 'AR', meaning: 'aspect ratio, $b^2/S$ (span squared over wing area)' },
      { symbol: 'e', meaning: 'Oswald efficiency factor (here fixed at 0.85), how close the wing is to an ideal elliptical loading' },
      { symbol: 'C_{D,0}', meaning: 'parasitic (zero-lift) drag coefficient' },
    ],
    explanation: {
      intuition: [
        'Drag the angle-of-attack point along the L/D curve: it climbs, peaks, then falls again. Too little angle and there is barely any lift to divide by; too much and induced drag (the price of making lift) grows faster than lift itself, dragging the ratio back down. The peak is the single best angle to fly for maximum distance per metre of height given up \u2014 that is literally what "best glide speed" means.',
        'Now raise the aspect-ratio slider and watch the whole curve lift and its peak grow: a higher AR means a longer, narrower wing for the same area, and that alone reduces induced drag for a given amount of lift. It is exactly why gliders and albatrosses have such long, slender wings \u2014 they are not built for speed, they are built to trade the least possible drag for the lift they need.',
      ],
      formal: [
        'Total drag coefficient splits into a nearly-constant parasitic term and an induced term that grows with the square of $C_L$: $C_D = C_{D,0} + C_L^2/(\\pi\\, AR\\, e)$.',
        'Best glide occurs where $L/D = C_L/C_D$ is maximised; differentiating shows this happens exactly where induced drag equals parasitic drag, $C_L^2/(\\pi AR e) = C_{D,0}$.',
      ],
      advanced: [
        'Induced drag is the unavoidable energy cost of shedding trailing vortices that carry away the downward momentum given to the air (see the lift lesson). Its coefficient $\\propto C_L^2/AR$ is why, for fixed lift, doubling the span (and hence AR, at fixed area) quarters the induced drag \u2014 the deep reason sailplane and albatross wings are so long and thin, at the structural cost of more bending moment at the wing root.',
      ],
    },
    derivation: [
      { tex: r`\frac{L}{D} = \frac{C_L}{C_{D,0} + C_L^2/(\pi AR e)}`, note: 'Write the ratio as a function of $C_L$ alone, with everything else held fixed.' },
      { tex: r`\frac{d}{dC_L}\!\left(\frac{L}{D}\right) = 0 \;\Rightarrow\; C_{D,0} = \frac{C_L^2}{\pi AR e}`, note: 'Differentiate and set to zero: the maximum occurs where parasitic drag exactly equals induced drag.' },
      { tex: r`\left(\frac{L}{D}\right)_{\max} = \frac{1}{2}\sqrt{\frac{\pi AR e}{C_{D,0}}}`, note: 'Solve for $C_L$ at that point and substitute back \u2014 best glide ratio grows with the square root of aspect ratio.' },
    ],
    realWorld: [
      { title: 'Sailplanes', text: 'Competition gliders reach $L/D$ above 60 with aspect ratios near 30, letting them travel 60 km for every kilometre of altitude lost.' },
      { title: 'Albatrosses', text: 'One of the highest aspect ratios in nature lets albatrosses glide enormous distances over the ocean between wingbeats.' },
      { title: 'Engine-out procedures', text: 'Airliner pilots are trained to fly the best-glide speed \u2014 the AoA that maximises $L/D$ \u2014 to reach the furthest possible landing site after total engine failure.' },
      { title: 'Winglets', text: 'Winglets raise the effective aspect ratio without adding physical span, cutting induced drag and saving fuel on long cruises.' },
    ],
  },
  {
    id: 'terminal-velocity',
    title: 'Terminal velocity',
    subject: 'aerodynamics',
    difficulty: 'university',
    equation: r`v(t) = v_t \tanh\!\left(\frac{g t}{v_t}\right), \qquad v_t = \sqrt{\frac{2mg}{\rho C_D A}}`,
    summary: 'A falling body speeds up only until drag grows to match gravity \u2014 after that its speed levels off at a fixed terminal value.',
    concepts: ['terminal-velocity', 'differential-equation', 'drag'],
    prerequisites: ['newtons-second-law', 'drag-equation', 'derivative'],
    related: ['drag-equation', 'exponential-growth'],
    visualization: {
      type: 'function-plot',
      options: { expr: 'sqrt(2*m*9.81/(1.225*Cd*A)) * tanh(9.81*x/sqrt(2*m*9.81/(1.225*Cd*A)))', domain: [0, 30], range: [-4, 70], mode: 'tangent' },
    },
    charts: [
      {
        title: 'Drag force climbs toward weight, then holds steady',
        xLabel: 't (s)',
        yLabel: 'force (N), weight shown flat',
        domain: [0, 30],
        marker: 'x',
        series: [
          { label: 'drag force', expr: '0.5*1.225*Cd*A*(sqrt(2*m*9.81/(1.225*Cd*A)) * tanh(9.81*x/sqrt(2*m*9.81/(1.225*Cd*A))))^2' },
          { label: 'weight m·g', expr: 'm*9.81' },
        ],
      },
    ],
    parameters: {
      m: { label: 'mass m', min: 40, max: 120, step: 1, value: 75, unit: 'kg' },
      Cd: { label: 'drag coefficient C_D', min: 0.5, max: 1.4, step: 0.01, value: 1.0 },
      A: { label: 'frontal area A', min: 0.3, max: 1.2, step: 0.01, value: 0.7, unit: 'm\u00b2' },
      x: { label: 'time t', min: 0, max: 30, step: 0.1, value: 8, unit: 's' },
    },
    variables: [
      { symbol: 'v(t)', meaning: 'downward speed at time t' },
      { symbol: 'v_t', meaning: 'terminal velocity \u2014 the speed at which drag exactly balances weight' },
      { symbol: 'm', meaning: 'mass of the falling body' },
      { symbol: 'C_D, A', meaning: 'drag coefficient and frontal area, same as in the drag equation' },
    ],
    explanation: {
      intuition: [
        'Drag the time point along the curve: it starts steep, exactly like free fall under gravity alone, then bends over and flattens toward a ceiling. Early on drag is tiny compared to weight, so the body accelerates at nearly $g$; as speed builds, drag \u2014 growing with $v^2$ \u2014 catches up to weight and the net force, and hence the acceleration, shrinks toward zero.',
        'Now raise the mass slider: terminal velocity increases, because a heavier body needs more drag force, hence more speed, to balance its larger weight. Raise the frontal area instead (think: skydiver opening their arms and legs) and terminal velocity falls \u2014 more drag per unit speed means less speed is needed to reach balance. A skydiver in a head-down dive versus a spread-eagle "box" position is choosing between two very different $A$ values, and hence two very different terminal speeds.',
      ],
      formal: [
        'Newton\u2019s second law with quadratic drag: $m\\dot v = mg - \\tfrac12\\rho C_D A v^2$, giving the differential equation solved by $v(t) = v_t\\tanh(gt/v_t)$.',
        'Terminal velocity is where acceleration is zero: $mg = \\tfrac12 \\rho C_D A v_t^2 \\;\\Rightarrow\\; v_t = \\sqrt{2mg/(\\rho C_D A)}$.',
      ],
      advanced: [
        'The $\\tanh$ solution is exact for constant $C_D$; in reality $C_D$ itself varies with Reynolds number and body orientation (a tumbling skydiver has a time-varying effective $A$), so real trajectories only approximate this closed form, though it remains an excellent first model for parachutists and falling objects in air.',
      ],
    },
    derivation: [
      { tex: r`m\dot v = mg - \tfrac12\rho C_D A v^2`, note: 'Weight acts down at all times; drag acts up, opposing motion, and grows with $v^2$.' },
      { tex: r`\dot v = g\left(1 - \frac{v^2}{v_t^2}\right), \qquad v_t^2 = \frac{2mg}{\rho C_D A}`, note: 'Rewrite using the terminal velocity $v_t$ as a natural speed scale \u2014 the ODE becomes separable.' },
      { tex: r`v(t) = v_t\tanh\!\left(\frac{gt}{v_t}\right)`, note: 'Separate and integrate from $v(0)=0$; $\\tanh$ starts linear (like free fall) and saturates at 1 (speed \u2192 $v_t$).' },
    ],
    realWorld: [
      { title: 'Skydiving', text: 'A belly-to-earth skydiver reaches about 55 m/s terminal velocity; head-down, with far less frontal area, the same person can exceed 90 m/s.' },
      { title: 'Raindrops', text: 'Small raindrops fall gently at only a few m/s terminal velocity, which is why fine drizzle drifts rather than stings.' },
      { title: 'Parachute design', text: 'A parachute\u2019s huge area is chosen specifically to make $v_t$ survivably small before landing.' },
      { title: 'Hailstone size and damage', text: 'Larger hailstones have higher terminal velocity (mass grows faster than area), which is why big hail is so much more damaging.' },
    ],
  },
  {
    id: 'mach-number',
    title: 'Mach number and compressibility',
    subject: 'aerodynamics',
    difficulty: 'advanced',
    equation: r`M = \frac{v}{a}, \qquad a = \sqrt{\gamma R T}`,
    summary: 'Mach number compares your speed to the local speed of sound; that ratio, not raw speed, decides when shock waves and compressibility effects take over.',
    concepts: ['mach-number', 'speed-of-sound', 'compressibility', 'shock-wave'],
    prerequisites: ['ideal-gas-law', 'function-graph'],
    related: ['drag-equation', 'lift'],
    visualization: {
      type: 'function-plot',
      options: { expr: 'sqrt(1.4*287*x)', domain: [200, 320], range: [260, 370], mode: 'plain' },
    },
    charts: [
      {
        title: 'Mach number vs air temperature at fixed aircraft speed',
        xLabel: 'T (K)',
        yLabel: 'M = v / a',
        domain: [200, 320],
        marker: 'x',
        series: [{ label: 'M(T)', expr: 'vAircraft/sqrt(1.4*287*x)' }],
      },
    ],
    parameters: {
      x: { label: 'air temperature T', min: 200, max: 320, step: 1, value: 288, unit: 'K' },
      vAircraft: { label: 'aircraft speed', min: 50, max: 340, step: 5, value: 250, unit: 'm/s' },
    },
    variables: [
      { symbol: 'M', meaning: 'Mach number, v/a \u2014 dimensionless' },
      { symbol: 'a', meaning: 'local speed of sound' },
      { symbol: r`\gamma`, meaning: 'ratio of specific heats for air, about 1.4' },
      { symbol: 'R', meaning: 'specific gas constant for air, 287 J/(kg\u00b7K)' },
      { symbol: 'T', meaning: 'absolute air temperature' },
    ],
    explanation: {
      intuition: [
        'Drag the temperature point along the curve: the speed of sound rises with the square root of temperature, so the same aircraft speed corresponds to a lower Mach number in warm air and a higher Mach number in cold air. That is why "how fast" only tells half the story \u2014 the same 250 m/s is comfortably subsonic on a warm day at sea level but pushes much closer to Mach 1 at the cold temperatures found at cruise altitude.',
        'Now raise the aircraft-speed slider and watch the Mach-number chart respond \u2014 the marker climbs toward and past M = 1. Airliners deliberately cruise around M \u2248 0.8, fast enough to cover distance efficiently but comfortably below the point where shock waves start forming over the wing, which would sharply increase drag and disturb the smooth airflow the whole lift picture depends on.',
      ],
      formal: [
        'For an ideal gas, the speed of sound is $a = \\sqrt{\\gamma R T}$ \u2014 it depends only on temperature, not on pressure or density directly.',
        'Flow regimes are classified by Mach number: subsonic $M<0.8$, transonic $0.8<M<1.2$, supersonic $1.2<M<5$, hypersonic $M>5$.',
      ],
      advanced: [
        'As local flow accelerates over a curved surface (like a wing) even a subsonic free stream can reach M = 1 locally; beyond that a shock wave forms where the flow abruptly, almost discontinuously, decelerates back to subsonic \u2014 producing wave drag and, in transonic flight, buffet. Wing sweep and supercritical airfoil sections are specifically shaped to delay this local shock formation to a higher free-stream Mach number.',
      ],
    },
    derivation: [
      { tex: r`p = \rho R T`, note: 'Ideal gas law relates pressure, density and temperature for air.' },
      { tex: r`a^2 = \left(\frac{\partial p}{\partial \rho}\right)_{s} = \gamma R T`, note: 'The speed of sound is the rate small pressure disturbances propagate \u2014 an isentropic (adiabatic, reversible) process, giving the factor $\\gamma$.' },
      { tex: r`M = \frac{v}{a} = \frac{v}{\sqrt{\gamma R T}}`, note: 'Divide actual speed by the local speed of sound to get the dimensionless Mach number.' },
    ],
    realWorld: [
      { title: 'Airliner cruise speed', text: 'Cruising near M \u2248 0.8 in the cold air at 11 km altitude balances fuel efficiency against the sharp drag rise approaching M = 1.' },
      { title: 'Concorde and supersonic transport', text: 'Sustained supersonic cruise (M > 1) demands very different, thin swept or delta wings to manage shock waves and wave drag.' },
      { title: 'Transonic wing design', text: 'Sweep and supercritical airfoils delay the local Mach-1 point on the wing to higher speeds, pushing back the onset of wave drag.' },
      { title: 'Sonic booms', text: 'A shock wave trailing a supersonic aircraft reaches the ground as the sudden pressure jump heard as a boom.' },
    ],
  },
]
