import type { Lesson } from './types'

const r = String.raw

/** Lessons that need no bespoke visualization — they are pure data on top of function-plot / surface-3d. */
export const more: Lesson[] = [
  {
    id: 'exponential-growth',
    title: 'Exponential growth and decay',
    subject: 'calculus',
    difficulty: 'high-school',
    equation: r`\frac{dy}{dt} = ky \;\Rightarrow\; y = y_0 e^{kt}`,
    summary: 'When the rate of change is proportional to the amount present, you get an exponential — growth if $k > 0$, decay if $k < 0$.',
    concepts: ['differential-equation', 'exponential', 'rate-of-change'],
    prerequisites: ['derivative'],
    related: ['rc-circuit'],
    visualization: { type: 'function-plot', options: { expr: 'y0*exp(k*x)', domain: [0, 10], range: [-1, 12], mode: 'tangent' } },
    parameters: {
      k: { label: 'rate constant k', min: -1, max: 0.6, step: 0.01, value: 0.25 },
      y0: { label: 'starting amount y₀', min: 0.5, max: 8, step: 0.1, value: 1 },
      x: { label: 'time t', min: 0, max: 10, step: 0.01, value: 4 },
    },
    variables: [
      { symbol: 'y', meaning: 'the amount present at time t' },
      { symbol: 'k', meaning: 'fractional change per unit time' },
      { symbol: 'y_0', meaning: 'the amount at t = 0' },
    ],
    explanation: {
      intuition: [
        'Drag the point along the curve and compare the two readouts: the slope is always $k$ times the height. The more there is, the faster it grows — that feedback loop is what “exponential” means.',
        'Make $k$ negative. The same rule now says “the more there is, the faster it disappears”, so the curve falls quickly at first and then ever more slowly, never quite reaching zero.',
      ],
      formal: ['$y\' = ky$ with $y(0) = y_0$ has the unique solution $y = y_0 e^{kt}$.', 'Doubling time (or half-life) is $\\ln 2 / |k|$ — independent of the current amount.'],
      advanced: ['Uniqueness: if $y$ solves the equation then $\\frac{d}{dt}\\left(y e^{-kt}\\right) = 0$, so $y e^{-kt}$ is constant. This integrating-factor trick generalises to every linear first-order ODE.'],
    },
    derivation: [
      { tex: r`\frac{dy}{y} = k\,dt`, note: 'Separate the variables: everything with $y$ on one side.' },
      { tex: r`\ln y = kt + C`, note: 'Integrate both sides.' },
      { tex: r`y = e^{C} e^{kt} = y_0 e^{kt}`, note: 'Exponentiate; the constant is fixed by the starting amount.' },
    ],
    realWorld: [
      { title: 'Compound interest', text: 'Money earning a percentage of itself grows exponentially.' },
      { title: 'Radioactive decay', text: 'Each nucleus has a fixed chance of decaying per second, so the sample shrinks with a constant half-life.' },
      { title: 'Epidemics and populations', text: 'Early spread is exponential because every case creates new cases.' },
      { title: 'Cooling', text: 'A hot drink approaches room temperature exponentially (Newton’s law of cooling).' },
    ],
  },
  {
    id: 'sine-wave',
    title: 'Travelling wave',
    subject: 'physics',
    difficulty: 'high-school',
    equation: r`y = A \sin\!\left(2\pi\left(\tfrac{x}{\lambda} - ft\right) + \varphi\right), \qquad v = f\lambda`,
    summary: 'Amplitude, wavelength, frequency and phase — four knobs that describe every simple wave, from sound to light.',
    concepts: ['wave', 'amplitude', 'frequency', 'wavelength', 'phase'],
    prerequisites: ['unit-circle', 'function-graph'],
    related: ['projectile-motion'],
    visualization: {
      type: 'function-plot',
      options: { expr: 'A*sin(2*pi*(x/L - f*t) + phi)', domain: [0, 12], range: [-3.2, 3.2], mode: 'plain', animate: { param: 't', speed: 1, loop: [0, 20] } },
    },
    parameters: {
      A: { label: 'amplitude A', min: 0.2, max: 3, step: 0.05, value: 1.5 },
      L: { label: 'wavelength λ', min: 1, max: 8, step: 0.1, value: 4, unit: 'm' },
      f: { label: 'frequency f', min: 0.1, max: 1.5, step: 0.05, value: 0.4, unit: 'Hz' },
      phi: { label: 'phase φ', min: 0, max: 6.28, step: 0.01, value: 0, unit: 'rad' },
      x: { label: 'watch position x', min: 0, max: 12, step: 0.05, value: 3, unit: 'm' },
      t: { label: 'time t', min: 0, max: 20, step: 0.01, value: 0, unit: 's' },
    },
    variables: [
      { symbol: 'A', meaning: 'amplitude — the maximum displacement' },
      { symbol: r`\lambda`, meaning: 'wavelength — distance between neighbouring crests' },
      { symbol: 'f', meaning: 'frequency — oscillations per second at any fixed point' },
      { symbol: r`\varphi`, meaning: 'phase — where in its cycle the wave starts' },
      { symbol: 'v', meaning: 'wave speed, always $f\\lambda$' },
    ],
    explanation: {
      intuition: [
        'Watch the marked point: it only moves up and down, while the pattern slides to the right. A wave carries shape and energy, not material.',
        'Raise the frequency and the point bobs faster; stretch the wavelength and the crests spread out. Do both and the pattern races along — its speed is exactly $f\\lambda$: one wavelength forward for every cycle completed.',
      ],
      formal: ['$y(x,t) = A\\sin(kx - \\omega t + \\varphi)$ with $k = 2\\pi/\\lambda$ and $\\omega = 2\\pi f$.', 'A point of constant phase satisfies $kx - \\omega t = \\text{const}$, so it moves at $v = \\omega/k = f\\lambda$.'],
      advanced: ['Any $g(x - vt)$ solves the wave equation $\\partial_t^2 y = v^2 \\partial_x^2 y$; sinusoids matter because the equation is linear, so by Fourier’s theorem every solution is a superposition of them.'],
    },
    derivation: [
      { tex: r`y = A\sin(kx - \omega t)`, note: 'A sine in space that also advances in time.' },
      { tex: r`kx - \omega t = \text{const} \;\Rightarrow\; \frac{dx}{dt} = \frac{\omega}{k}`, note: 'Follow one crest: its phase stays fixed.' },
      { tex: r`v = \frac{2\pi f}{2\pi/\lambda} = f\lambda`, note: 'Substitute the definitions of $\\omega$ and $k$.' },
    ],
    realWorld: [
      { title: 'Sound', text: 'Frequency is pitch, amplitude is loudness; speed is fixed by the air, so higher notes have shorter wavelengths.' },
      { title: 'Light and radio', text: 'The same relation with $v = c$: your Wi-Fi at 2.4 GHz has a 12.5 cm wavelength.' },
      { title: 'AC electricity', text: 'Mains voltage is a 50/60 Hz sine; phase differences between voltage and current determine real power.' },
      { title: 'Musical strings', text: 'Two opposite travelling waves add up to the standing waves that set a string’s notes.' },
    ],
  },
  {
    id: 'projectile-motion',
    title: 'Projectile motion',
    subject: 'physics',
    difficulty: 'high-school',
    equation: r`y = x\tan\theta - \frac{g\,x^2}{2v^2\cos^2\theta}`,
    summary: 'Constant horizontal velocity plus constant downward acceleration traces a parabola.',
    concepts: ['kinematics', 'vectors', 'parabola', 'gravity'],
    prerequisites: ['function-graph', 'newtons-second-law', 'unit-circle'],
    related: ['sine-wave'],
    visualization: {
      type: 'function-plot',
      options: { expr: 'x*tan(th*pi/180) - 9.81*x^2/(2*v^2*cos(th*pi/180)^2)', domain: [0, 100], range: [-8, 52], mode: 'tangent', animate: { param: 'x', speed: 22, loop: [0, 100] } },
    },
    parameters: {
      v: { label: 'launch speed v', min: 5, max: 31, step: 0.5, value: 25, unit: 'm/s' },
      th: { label: 'launch angle θ', min: 5, max: 85, step: 1, value: 45, unit: '°' },
      x: { label: 'horizontal position x', min: 0, max: 100, step: 0.1, value: 0, unit: 'm' },
    },
    variables: [
      { symbol: 'v', meaning: 'launch speed' },
      { symbol: r`\theta`, meaning: 'launch angle above the horizontal' },
      { symbol: 'g', meaning: 'gravitational acceleration, 9.81 m/s²' },
      { symbol: 'x, y', meaning: 'horizontal distance and height; the ground is y = 0' },
    ],
    explanation: {
      intuition: [
        'The ball does two independent things at once: it drifts sideways at a steady speed, and it falls exactly as if it had been dropped. The tangent line shows its direction of travel at each moment — flat at the top, where all the vertical speed has been used up.',
        'Sweep the angle from 5° to 85°. The landing point moves out, peaks at 45°, and comes back; angles that add to 90° (say 30° and 60°) land in the same place. The part of the curve below the axis is where the ball would go if the ground were not there.',
      ],
      formal: ['$x = v\\cos\\theta\\, t$ and $y = v\\sin\\theta\\, t - \\tfrac12 g t^2$; eliminating $t$ gives the trajectory.', 'Range $R = \\dfrac{v^2 \\sin 2\\theta}{g}$, maximum height $\\dfrac{v^2\\sin^2\\theta}{2g}$.'],
      advanced: ['With linear drag $-b\\mathbf{v}$ the components still decouple, but the path is no longer symmetric and the optimum angle drops below 45°. With quadratic drag the equations couple and must be integrated numerically.'],
    },
    derivation: [
      { tex: r`x = v\cos\theta\; t, \qquad y = v\sin\theta\; t - \tfrac12 g t^2`, note: 'No horizontal force; constant downward force $mg$.' },
      { tex: r`t = \frac{x}{v\cos\theta}`, note: 'Solve the first equation for time.' },
      { tex: r`y = x\tan\theta - \frac{g x^2}{2v^2\cos^2\theta}`, note: 'Substitute: a quadratic in $x$ — a parabola.' },
    ],
    realWorld: [
      { title: 'Sport', text: 'Basketball arcs, long jumps and golf drives are all launch-angle problems.' },
      { title: 'Fountains and hoses', text: 'Each water droplet is a projectile; the stream draws the parabola for you.' },
      { title: 'Spaceflight', text: 'Throw fast enough and the ground curves away as quickly as you fall — an orbit is a projectile that keeps missing.' },
    ],
  },
  {
    id: 'rc-circuit',
    title: 'RC circuit charging',
    subject: 'electricity',
    difficulty: 'university',
    equation: r`V_C(t) = V_0\left(1 - e^{-t/RC}\right)`,
    summary: 'A capacitor charging through a resistor approaches the supply voltage exponentially, with time constant $\\tau = RC$.',
    concepts: ['capacitor', 'time-constant', 'exponential', 'differential-equation'],
    prerequisites: ['ohms-law', 'exponential-growth'],
    related: ['sine-wave'],
    visualization: { type: 'function-plot', options: { expr: 'V0*(1 - exp(-x/(R*C/1000)))', domain: [0, 10], range: [-1, 13], mode: 'tangent' } },
    charts: [{ title: 'Charging current: largest at the start, then dying away', xLabel: 't (s)', yLabel: 'I (mA)', domain: [0, 10], marker: 'x', series: [{ label: 'I = (V₀/R)·e^(−t/RC)', expr: 'V0/R*exp(-x/(R*C/1000))' }] }],
    parameters: {
      V0: { label: 'supply voltage V₀', min: 1, max: 12, step: 0.5, value: 9, unit: 'V' },
      R: { label: 'resistance R', min: 0.5, max: 10, step: 0.1, value: 2, unit: 'kΩ' },
      C: { label: 'capacitance C', min: 100, max: 2000, step: 50, value: 1000, unit: 'µF' },
      x: { label: 'time t', min: 0, max: 10, step: 0.01, value: 2, unit: 's' },
    },
    variables: [
      { symbol: 'V_C', meaning: 'voltage across the capacitor' },
      { symbol: 'V_0', meaning: 'supply voltage it is charging toward' },
      { symbol: r`\tau = RC`, meaning: 'time constant — here kΩ × µF ÷ 1000 gives seconds' },
    ],
    explanation: {
      intuition: [
        'Think of filling a tank through a narrow pipe from a reservoir: the fuller the tank, the smaller the pressure difference, the slower it fills. The tangent line is the charging rate — steep at first, nearly flat at the end.',
        'Set the time slider to $t = RC$ (2 s with the starting values): the capacitor has reached about 63% of the supply. After $5RC$ it is within 1%. Bigger $R$ or bigger $C$ stretches the whole curve sideways without changing its shape.',
      ],
      formal: ['Kirchhoff’s voltage law: $V_0 = IR + V_C$ with $I = C\\,dV_C/dt$, so $RC\\,\\dot V_C + V_C = V_0$.', 'Solution with $V_C(0) = 0$: $V_C = V_0(1 - e^{-t/\\tau})$, $I = \\frac{V_0}{R}e^{-t/\\tau}$.'],
      advanced: ['In the frequency domain the same circuit is a first-order low-pass filter, $H(j\\omega) = 1/(1 + j\\omega RC)$, with its −3 dB corner at $\\omega = 1/RC$ — the time constant and the cut-off are the same fact in two languages.'],
    },
    derivation: [
      { tex: r`V_0 = R\,C\frac{dV_C}{dt} + V_C`, note: 'Voltage around the loop sums to zero; the current is the rate of charge arriving on the capacitor.' },
      { tex: r`\frac{d}{dt}(V_0 - V_C) = -\frac{1}{RC}(V_0 - V_C)`, note: 'The remaining gap obeys the decay equation $y\' = ky$ with $k = -1/RC$.' },
      { tex: r`V_C = V_0\left(1 - e^{-t/RC}\right)`, note: 'The gap decays exponentially from $V_0$ to zero.' },
    ],
    realWorld: [
      { title: 'Timers and blinkers', text: 'The 555 timer and countless delay circuits measure time by waiting for an RC curve to cross a threshold.' },
      { title: 'Filters', text: 'RC networks smooth power supplies and remove hiss or rumble in audio.' },
      { title: 'Touch screens', text: 'Your finger adds capacitance; the controller notices the charging time change.' },
      { title: 'Camera flashes and defibrillators', text: 'Charge slowly through a resistor, release quickly into the load.' },
    ],
  },
  {
    id: 'gradient',
    title: 'Surfaces and the gradient',
    subject: 'calculus',
    difficulty: 'university',
    equation: r`z = x^2 + y^2, \qquad \nabla f = \left(\frac{\partial f}{\partial x}, \frac{\partial f}{\partial y}\right) = (2x,\, 2y)`,
    summary: 'A function of two variables is a landscape. The gradient is the compass that always points straight uphill.',
    concepts: ['partial-derivative', 'gradient', 'tangent-plane', 'multivariable'],
    prerequisites: ['derivative'],
    related: ['exponential-growth'],
    visualization: { type: 'surface-3d', options: { expr: 'x^2 + y^2', extent: 2, zRange: [0, 8] } },
    parameters: {
      x0: { label: 'point x', min: -2, max: 2, step: 0.01, value: 1 },
      y0: { label: 'point y', min: -2, max: 2, step: 0.01, value: -0.6 },
    },
    variables: [
      { symbol: r`\partial f/\partial x`, meaning: 'slope if you walk in the x direction only' },
      { symbol: r`\partial f/\partial y`, meaning: 'slope if you walk in the y direction only' },
      { symbol: r`\nabla f`, meaning: 'the gradient vector (orange arrow on the floor)' },
    ],
    explanation: {
      intuition: [
        'Drag to rotate the bowl, then move the point with the sliders. The small orange tile is the tangent plane — the surface’s best flat approximation there, the 3D version of a tangent line.',
        'The arrow on the floor is the gradient. It always points directly away from the bottom of the bowl — the steepest way up — and it grows as the walls get steeper. At the very bottom it vanishes: flat ground, a minimum.',
      ],
      formal: ['$\\nabla f = (f_x, f_y)$. The directional derivative along a unit vector $\\mathbf{u}$ is $\\nabla f \\cdot \\mathbf{u}$, maximised when $\\mathbf{u} \\parallel \\nabla f$.', 'Tangent plane at $(a,b)$: $z = f(a,b) + f_x(a,b)(x-a) + f_y(a,b)(y-b)$.'],
      advanced: ['The gradient is perpendicular to level curves: along a curve $\\gamma$ with $f(\\gamma(t))$ constant, the chain rule gives $\\nabla f \\cdot \\gamma\' = 0$. Critical points are classified by the Hessian — here $2I$, positive definite, hence a strict minimum.'],
    },
    derivation: [
      { tex: r`\frac{\partial f}{\partial x} = \lim_{h\to0}\frac{f(x+h,\,y) - f(x,\,y)}{h} = 2x`, note: 'Freeze $y$ and differentiate as usual.' },
      { tex: r`D_{\mathbf u} f = f_x u_1 + f_y u_2 = \nabla f \cdot \mathbf u`, note: 'Any direction is a mix of the two axis directions.' },
      { tex: r`\nabla f \cdot \mathbf u = |\nabla f| \cos\alpha`, note: 'Largest when $\\alpha = 0$: walking along the gradient climbs fastest.' },
    ],
    realWorld: [
      { title: 'Machine learning', text: 'Training a neural network is gradient descent on a loss surface with millions of dimensions.' },
      { title: 'Weather maps', text: 'Wind is driven by the pressure gradient; tightly packed isobars mean a steep gradient and strong wind.' },
      { title: 'Heat flow', text: 'Heat flows along the negative temperature gradient (Fourier’s law).' },
      { title: 'Hiking', text: 'On a contour map the gradient points straight across the contour lines — the steepest path.' },
    ],
  },
]
