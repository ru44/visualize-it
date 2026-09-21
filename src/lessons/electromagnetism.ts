import type { Lesson } from './types'

const r = String.raw

export const electromagnetism: Lesson[] = [
  {
    id: 'coulombs-law',
    title: "Coulomb's law and the electric field",
    subject: 'electromagnetism',
    difficulty: 'high-school',
    equation: r`F = k\frac{q_1 q_2}{r^2}, \qquad \mathbf{E} = \frac{\mathbf{F}}{q}`,
    summary: 'Two charges push or pull along the line joining them, falling off with the square of the distance. Every charge fills the space around it with a field — the force per unit charge a test charge would feel there.',
    concepts: ['coulombs-law', 'electric-field', 'superposition', 'inverse-square-law'],
    prerequisites: ['newtons-second-law'],
    related: ['electric-potential', 'lorentz-force', 'series-parallel'],
    visualization: { type: 'electric-field', options: {} },
    parameters: {
      q1: { label: 'charge q1', min: -5, max: 5, step: 0.1, value: 2, unit: 'µC' },
      q2: { label: 'charge q2', min: -5, max: 5, step: 0.1, value: -2, unit: 'µC' },
      d: { label: 'separation d', min: 1, max: 6, step: 0.1, value: 3, unit: 'm' },
      px: { label: 'test point x', min: -4, max: 4, step: 0.05, value: 0.5, unit: 'm' },
      py: { label: 'test point y', min: -2.4, max: 2.4, step: 0.05, value: 1.2, unit: 'm' },
    },
    variables: [
      { symbol: 'k', meaning: "Coulomb's constant, $8.99\\times10^9\\ \\mathrm{N\\,m^2/C^2}$" },
      { symbol: 'q_1, q_2', meaning: 'the two point charges' },
      { symbol: 'r', meaning: 'distance between them, or between a charge and the field point' },
      { symbol: r`\mathbf{E}`, meaning: 'electric field — force per unit charge at a point' },
    ],
    explanation: {
      intuition: [
        'Drag the black test charge around. The short arrows are the field: they point the way a small positive charge would be pushed, and they fade where the field is weak. Near either charge they crowd inward or outward; far away they blend into a gentle outward (or inward) flow from the pair.',
        'Watch the thin force lines on the test charge — one pull toward q1, one toward q2 — and the thick arrow that is their sum. Flip q2 from negative to positive and the two thin lines swap from pulling together to pushing apart; the field arrows near the midpoint flip too.',
      ],
      formal: [
        'The force between two point charges is $F = k\\dfrac{q_1q_2}{r^2}$, directed along the line joining them: repulsive if $q_1q_2>0$, attractive if $q_1q_2<0$.',
        'The field of a point charge is $\\mathbf{E} = k\\dfrac{q}{r^2}\\hat{\\mathbf{r}}$; fields from multiple charges simply add, vector by vector — this is superposition.',
      ],
      advanced: [
        'Superposition holds because Maxwell\'s equations are linear in the sources: $\\nabla\\cdot\\mathbf{E} = \\rho/\\varepsilon_0$ has a Green\'s-function solution that is a sum over point charges. The same inverse-square form falls out of Gauss\'s law applied to a sphere, since the flux through it is fixed while its area grows as $r^2$.',
      ],
    },
    derivation: [
      { tex: r`F = k\frac{q_1q_2}{r^2}`, note: "Coulomb's experimental law for two point charges." },
      { tex: r`\mathbf{E} \equiv \frac{\mathbf{F}}{q_{\text{test}}} = k\frac{q}{r^2}\hat{\mathbf{r}}`, note: 'Divide by a small test charge to define the field, independent of what probes it.' },
      { tex: r`\mathbf{E}_{\text{total}} = \mathbf{E}_1 + \mathbf{E}_2`, note: 'Superposition: each source contributes its own field, added as vectors.' },
    ],
    realWorld: [
      { title: 'Photocopiers and laser printers', text: 'A charged drum attracts toner particles exactly where light has (or has not) neutralised it.' },
      { title: 'Lightning', text: 'Charge separation in a storm cloud builds a field strong enough to ionise air and discharge in a bolt.' },
      { title: 'Electrostatic precipitators and spray painting', text: 'Charged particles are steered by an applied field onto a grounded surface.' },
      { title: 'Atoms and bonds', text: 'The same $1/r^2$ attraction between nucleus and electrons (screened by other electrons) shapes chemical bonding.' },
    ],
  },
  {
    id: 'electric-potential',
    title: 'Electric potential and equipotentials',
    subject: 'electromagnetism',
    difficulty: 'university',
    equation: r`V = k\frac{q}{r}, \qquad \mathbf{E} = -\nabla V`,
    summary: 'Potential is the energy per unit charge stored at a point — a scalar landscape whose downhill direction is the electric field.',
    concepts: ['electric-potential', 'equipotential', 'gradient', 'potential-energy'],
    prerequisites: ['coulombs-law', 'gradient'],
    related: ['coulombs-law', 'gradient', 'lorentz-force'],
    visualization: { type: 'electric-field', options: {} },
    parameters: {
      q1: { label: 'charge q1', min: -5, max: 5, step: 0.1, value: 2, unit: 'µC' },
      q2: { label: 'charge q2', min: -5, max: 5, step: 0.1, value: 2, unit: 'µC' },
      d: { label: 'separation d', min: 1, max: 6, step: 0.1, value: 3, unit: 'm' },
      px: { label: 'test point x', min: -4, max: 4, step: 0.05, value: 0.5, unit: 'm' },
      py: { label: 'test point y', min: -2.4, max: 2.4, step: 0.05, value: 1.2, unit: 'm' },
    },
    variables: [
      { symbol: 'V', meaning: 'electric potential — potential energy per unit charge' },
      { symbol: 'k', meaning: "Coulomb's constant" },
      { symbol: r`\nabla V`, meaning: 'the gradient of the potential, an uphill-pointing vector' },
    ],
    explanation: {
      intuition: [
        'With both charges positive, drag the test point outward from between them: the potential readout falls the whole way, smoothly, even though the field arrows (which are $-\\nabla V$) point outward from both charges and can momentarily cancel exactly on the midline.',
        'Potential has no direction — it is just a number at every point, like altitude on a map. The field is the compass built from that map: it always points the way potential drops fastest, exactly like the gradient arrow in the surfaces lesson, just pointing downhill instead of up.',
      ],
      formal: [
        'For a point charge, $V(r) = k q/r$, taking $V=0$ at infinity; potentials from several charges add as plain numbers (no direction to worry about), unlike fields.',
        'The field is minus the gradient of potential: $\\mathbf{E} = -\\nabla V$, so $E_x = -\\partial V/\\partial x$ and likewise for $y$. Surfaces of constant $V$ (equipotentials) are always perpendicular to $\\mathbf{E}$.',
      ],
      advanced: [
        'Because $\\nabla\\times\\mathbf{E} = 0$ for static charges, $\\mathbf{E}$ is a conservative field and $V$ exists globally as $V(\\mathbf{r}) = -\\int_\\infty^{\\mathbf r} \\mathbf{E}\\cdot d\\boldsymbol{\\ell}$, path-independent. This fails once fields change in time — Faraday\'s law reintroduces a curl, and a single-valued potential is no longer enough.',
      ],
    },
    derivation: [
      { tex: r`W = -\int_\infty^{r} \mathbf{F}\cdot d\boldsymbol{\ell} = kqq_{\text{test}}\!\left(\frac{1}{r}\right)`, note: 'Work done bringing a test charge in from infinity against the field.' },
      { tex: r`V \equiv \frac{W}{q_{\text{test}}} = \frac{kq}{r}`, note: 'Potential is that work per unit test charge — independent of the prober.' },
      { tex: r`E_x = -\frac{\partial V}{\partial x}, \quad E_y = -\frac{\partial V}{\partial y}`, note: 'The field is the negative gradient: it points where $V$ decreases fastest.' },
    ],
    realWorld: [
      { title: 'Circuits', text: 'Voltage on a battery or outlet is exactly this potential, measured relative to a chosen reference (ground).' },
      { title: 'Cathode-ray and electron-beam devices', text: 'Electrons accelerate through a potential difference, gaining kinetic energy $qV$.' },
      { title: 'Neurons', text: 'The membrane potential across a neuron is a few tens of millivolts, and its change drives the action potential.' },
      { title: 'Van de Graaff generators', text: 'Charge is carried up a belt until the dome reaches a huge potential relative to ground.' },
    ],
  },
  {
    id: 'lorentz-force',
    title: 'Lorentz force and cyclotron motion',
    subject: 'electromagnetism',
    difficulty: 'university',
    equation: r`\mathbf{F} = q(\mathbf{E} + \mathbf{v}\times\mathbf{B})`,
    summary: 'A moving charge in a magnetic field feels a force perpendicular to its velocity — it steers the particle without ever speeding it up, bending straight lines into circles.',
    concepts: ['lorentz-force', 'magnetic-field', 'cyclotron-motion', 'cross-product'],
    prerequisites: ['coulombs-law', 'newtons-second-law'],
    related: ['coulombs-law', 'faradays-law'],
    visualization: { type: 'lorentz-force', options: {} },
    parameters: {
      q: { label: 'charge q', min: -3, max: 3, step: 1, value: 1, unit: 'e' },
      v: { label: 'speed v', min: 1, max: 10, step: 0.5, value: 5, unit: '×10⁵ m/s' },
      B: { label: 'magnetic field B', min: -2, max: 2, step: 0.1, value: 1, unit: 'T' },
      E: { label: 'electric field E', min: 0, max: 3, step: 0.1, value: 0, unit: '×10⁵ V/m' },
    },
    variables: [
      { symbol: 'q', meaning: 'the particle\'s charge, in multiples of the elementary charge' },
      { symbol: 'v', meaning: "the particle's speed" },
      { symbol: 'B', meaning: 'magnetic field strength, into the screen when positive' },
      { symbol: 'E', meaning: 'uniform electric field strength, pointing up the screen' },
    ],
    explanation: {
      intuition: [
        'With E off, the particle traces a perfect circle — the magnetic force only ever turns the velocity, never lengthens or shortens it, because $\\mathbf{v}\\times\\mathbf{B}$ is always perpendicular to $\\mathbf{v}$. Set $q=0$ and the force vanishes: no charge, no push, a straight line.',
        'Flip the sign of $q$ or of $B$ and the particle curves the other way — the trail (its fading history) traces the mirror circle. Turn on $E$ and the circle stops closing on itself: the constant sideways push adds a steady drift on top of the circular motion, sketching a looping, drifting path.',
      ],
      formal: [
        'The full electromagnetic force is $\\mathbf{F} = q\\mathbf{E} + q\\mathbf{v}\\times\\mathbf{B}$. The magnetic term has magnitude $qvB\\sin\\theta$ and points perpendicular to both $\\mathbf{v}$ and $\\mathbf{B}$.',
        'With $\\mathbf{E}=0$, the speed is constant (magnetic force does no work: $\\mathbf{F}\\cdot\\mathbf{v}=0$), so the particle moves in a circle of radius $r = mv/(|q|B)$ with period $T = 2\\pi m/(|q|B)$ — independent of speed.',
      ],
      advanced: [
        'A velocity selector balances $qE = qvB$, passing only particles with $v = E/B$ undeflected regardless of charge or mass — the basis of mass spectrometry once the selected beam curves in a separate magnetic region and $m = qBr/v$ is read off from the radius.',
      ],
    },
    derivation: [
      { tex: r`\mathbf{F} = q\mathbf{v}\times\mathbf{B}, \qquad |\mathbf{F}| = qvB \ (\mathbf{v}\perp\mathbf{B})`, note: 'The magnetic force is always perpendicular to the velocity.' },
      { tex: r`\mathbf{F}\cdot\mathbf{v} = q(\mathbf{v}\times\mathbf{B})\cdot\mathbf{v} = 0`, note: 'A force perpendicular to v does no work, so speed — and hence the force magnitude — stays constant: uniform circular motion.' },
      { tex: r`\frac{mv^2}{r} = qvB \ \Rightarrow\ r = \frac{mv}{qB}, \quad T = \frac{2\pi r}{v} = \frac{2\pi m}{qB}`, note: 'Set the magnetic force equal to the centripetal force required for a circle of radius r.' },
    ],
    realWorld: [
      { title: 'Mass spectrometers', text: 'Ions of different mass-to-charge ratio curve with different radii in a known B, revealing their mass.' },
      { title: 'Auroras', text: "Charged solar-wind particles spiral along Earth's magnetic field lines toward the poles, exciting the atmosphere to glow." },
      { title: 'Velocity selectors', text: 'Crossed E and B fields pass only particles at one speed, $v=E/B$, used to prepare particle beams.' },
      { title: 'Cyclotrons and mass spectrometers', text: 'Particle accelerators use the fact that the cyclotron period is independent of speed to keep particles in sync as they spiral outward.' },
    ],
  },
  {
    id: 'faradays-law',
    title: "Faraday's law of induction",
    subject: 'electromagnetism',
    difficulty: 'university',
    equation: r`\varepsilon = -N\frac{d\Phi}{dt}`,
    summary: 'A changing magnetic flux through a loop induces an emf equal to (minus) the rate that flux is changing — the steeper the flux curve, the bigger the induced voltage.',
    concepts: ['electromagnetic-induction', 'magnetic-flux', 'emf', 'lenzs-law'],
    prerequisites: ['sine-wave', 'derivative'],
    related: ['lorentz-force', 'sine-wave'],
    visualization: {
      type: 'function-plot',
      options: { expr: 'B*A*cos(2*pi*f*x)', domain: [0, 4], range: [-4.5, 4.5], mode: 'tangent' },
    },
    parameters: {
      B: { label: 'field strength B', min: 0.2, max: 2, step: 0.1, value: 1, unit: 'T' },
      A: { label: 'loop area A', min: 0.2, max: 2, step: 0.1, value: 1, unit: 'm²' },
      f: { label: 'rotation frequency f', min: 0.1, max: 2, step: 0.05, value: 0.5, unit: 'Hz' },
      N: { label: 'number of turns N', min: 1, max: 200, step: 1, value: 50 },
      x: { label: 'time t', min: 0, max: 4, step: 0.02, value: 1, unit: 's' },
    },
    variables: [
      { symbol: r`\Phi`, meaning: 'magnetic flux through the loop, $B A\\cos(2\\pi f t)$' },
      { symbol: r`\varepsilon`, meaning: 'induced electromotive force (voltage)' },
      { symbol: 'N', meaning: 'number of turns of wire in the coil' },
      { symbol: 'f', meaning: 'frequency at which the loop rotates (or the field varies)' },
    ],
    explanation: {
      intuition: [
        'The curve above is the flux $\\Phi(t)$ through a coil — think of it as a loop of wire spinning in a fixed field, so the field "seen" through the loop rises and falls like a cosine. Drag the point along the curve: the tangent line is the induced emf. It is steepest — biggest emf — exactly where the flux itself crosses zero, and flat — zero emf — at the peaks and troughs of flux.',
        'The chart below plots that slope directly as a sine wave, a quarter-cycle ahead of the flux. Raise the frequency $f$ and both the flux oscillates faster and the emf curve grows taller: doubling how fast the flux changes doubles the voltage it induces, even though the flux amplitude $BA$ never changed.',
      ],
      formal: [
        "Faraday's law: the emf induced around a loop equals minus the rate of change of flux through it, $\\varepsilon = -d\\Phi/dt$; with $N$ turns each carrying the same flux, $\\varepsilon = -N\\,d\\Phi/dt$.",
        'For $\\Phi(t) = BA\\cos(2\\pi f t)$, differentiating gives $\\varepsilon(t) = N B A\\, 2\\pi f\\sin(2\\pi f t)$ — the emf amplitude scales with $B$, $A$, $N$, and, critically, with $f$.',
      ],
      advanced: [
        "Faraday's law in differential form is $\\nabla\\times\\mathbf{E} = -\\partial\\mathbf{B}/\\partial t$: a time-varying $B$ field creates a curling (non-conservative) $E$ field even with no wire present at all — the loop just gives us a convenient way to measure the effect as a voltage.",
      ],
    },
    derivation: [
      { tex: r`\Phi(t) = B A \cos(2\pi f t)`, note: 'Flux through a loop whose orientation relative to a fixed field varies sinusoidally.' },
      { tex: r`\varepsilon = -N\frac{d\Phi}{dt}`, note: "Faraday's law: emf is minus the rate of change of total flux linkage." },
      { tex: r`\varepsilon(t) = N B A \, 2\pi f \sin(2\pi f t)`, note: 'Differentiate the cosine; the minus sign becomes a phase shift, giving a sine.' },
    ],
    realWorld: [
      { title: 'Generators', text: 'Turbines spin coils in a magnetic field (or vice versa) to generate essentially all grid electricity this way.' },
      { title: 'Transformers', text: 'An alternating current in one coil creates a changing flux that induces a voltage in a neighbouring coil, stepping voltage up or down.' },
      { title: 'Induction cooktops', text: 'A rapidly alternating field induces eddy currents directly in the pan, heating it without a hot element.' },
      { title: 'Wireless charging and RFID', text: 'A changing flux from a transmitter coil induces current in a nearby receiver coil with no physical contact.' },
    ],
  },
  {
    id: 'series-parallel',
    title: 'Series and parallel resistors',
    subject: 'electricity',
    difficulty: 'high-school',
    equation: r`R_s = R_1+R_2, \qquad \frac{1}{R_p}=\frac{1}{R_1}+\frac{1}{R_2}`,
    summary: 'The same two resistors behave very differently wired end-to-end versus side-by-side: series divides the voltage, parallel divides the current.',
    concepts: ['kirchhoffs-laws', 'series-circuit', 'parallel-circuit', 'voltage-divider', 'current-divider'],
    prerequisites: ['ohms-law'],
    related: ['rc-circuit', 'rlc-resonance', 'ac-power'],
    visualization: { type: 'series-parallel', options: {} },
    parameters: {
      V: { label: 'supply voltage V', min: 1, max: 24, step: 0.5, value: 12, unit: 'V' },
      R1: { label: 'resistance R1', min: 1, max: 100, step: 1, value: 20, unit: 'Ω' },
      R2: { label: 'resistance R2', min: 1, max: 100, step: 1, value: 60, unit: 'Ω' },
      mode: { label: 'series (0) / parallel (1)', min: 0, max: 1, step: 1, value: 0 },
    },
    variables: [
      { symbol: 'R_1, R_2', meaning: 'the two resistors' },
      { symbol: 'R_s, R_p', meaning: 'equivalent resistance in series and in parallel' },
      { symbol: 'I_1, I_2', meaning: 'current through each resistor' },
      { symbol: 'V_1, V_2', meaning: 'voltage drop across each resistor' },
    ],
    explanation: {
      intuition: [
        'Tap the diagram to flip between series and parallel and watch the current dots. In series there is only one path, so both resistors carry exactly the same dots at the same speed — the same current flows through everything in the loop, one after another.',
        'In parallel, the current splits: the branch with the smaller resistance gets visibly denser, faster-moving dots, because it offers less opposition and so draws more current, while both resistors now sit directly across the full battery voltage rather than sharing it.',
      ],
      formal: [
        "Kirchhoff's voltage law (around a loop, drops sum to the source) and current law (current in equals current out at a node) fully determine both circuits. In series, $I$ is common and $V_1+V_2=V$; in parallel, $V$ is common and $I_1+I_2=I$.",
        'Series resistances add directly, $R_s=R_1+R_2$; parallel resistances add as reciprocals, $1/R_p=1/R_1+1/R_2$, so $R_p$ is always smaller than either resistor alone.',
      ],
      advanced: [
        'The voltage divider $V_2 = V\\dfrac{R_2}{R_1+R_2}$ and current divider $I_1 = I\\dfrac{R_2}{R_1+R_2}$ are the two-resistor special cases of a much more general fact: any linear resistive network reduces, from the point of view of two terminals, to a single Thévenin resistance.',
      ],
    },
    derivation: [
      { tex: r`V = I R_1 + I R_2 = I(R_1+R_2) \;\Rightarrow\; R_s = R_1+R_2`, note: 'Series: same current I through both, voltages add around the loop.' },
      { tex: r`I = \frac{V}{R_1}+\frac{V}{R_2} = V\left(\frac1{R_1}+\frac1{R_2}\right)`, note: 'Parallel: same voltage V across both, currents add at the node.' },
      { tex: r`\frac{1}{R_p} = \frac{1}{R_1}+\frac{1}{R_2}, \qquad V_2 = V\frac{R_2}{R_1+R_2}`, note: 'Define R_p from I=V/R_p; the series voltage divider follows from V_2=IR_2.' },
    ],
    realWorld: [
      { title: 'Household wiring', text: 'Outlets are wired in parallel so each appliance sees the full mains voltage and works independently of the others.' },
      { title: 'Old-style string lights', text: 'Wired in series, one broken bulb once broke the whole string — a classic demonstration of why series is fragile.' },
      { title: 'Voltage-divider sensors', text: 'A fixed resistor in series with a variable one (thermistor, photoresistor) creates a voltage that tracks temperature or light.' },
      { title: 'Battery packs', text: 'Cells in series add voltage; cells in parallel add capacity — pack designers combine both.' },
    ],
  },
  {
    id: 'rlc-resonance',
    title: 'RLC resonance',
    subject: 'electricity',
    difficulty: 'university',
    equation: r`I(f) = \frac{V}{\sqrt{R^2+\left(2\pi f L-\dfrac{1}{2\pi f C}\right)^2}}, \qquad f_0=\frac{1}{2\pi\sqrt{LC}}`,
    summary: 'A resistor, inductor and capacitor in series pass current best at one special frequency, where the inductor and capacitor\'s opposite reactances exactly cancel.',
    concepts: ['impedance', 'reactance', 'resonance', 'q-factor'],
    prerequisites: ['sine-wave', 'rc-circuit'],
    related: ['series-parallel', 'ac-power'],
    visualization: {
      type: 'function-plot',
      options: {
        expr: 'V / sqrt(R^2 + (2*pi*x*L/1000 - 1/(2*pi*x*C*1e-6))^2)',
        domain: [10, 400],
        range: [0, 1.1],
        mode: 'tangent',
      },
    },
    parameters: {
      V: { label: 'source voltage V', min: 1, max: 20, step: 0.5, value: 10, unit: 'V' },
      R: { label: 'resistance R', min: 1, max: 50, step: 1, value: 10, unit: 'Ω' },
      L: { label: 'inductance L', min: 1, max: 200, step: 1, value: 50, unit: 'mH' },
      C: { label: 'capacitance C', min: 1, max: 200, step: 1, value: 20, unit: 'µF' },
      x: { label: 'drive frequency f', min: 10, max: 400, step: 1, value: 159, unit: 'Hz' },
    },
    variables: [
      { symbol: 'L', meaning: 'inductance (drawn in mH; the physics uses henries)' },
      { symbol: 'C', meaning: 'capacitance (drawn in µF; the physics uses farads)' },
      { symbol: 'f_0', meaning: 'resonant frequency, where reactances cancel' },
      { symbol: 'Q', meaning: 'quality factor — sharpness of the resonance peak' },
    ],
    explanation: {
      intuition: [
        'Drag the frequency point along the curve. Current is small at low and high frequency and peaks sharply near one frequency in the middle — the inductor resists fast changes (its reactance $2\\pi fL$ grows with $f$) while the capacitor resists slow ones (its reactance $1/2\\pi fC$ shrinks with $f$); only near $f_0$ do those two opposing effects cancel and the circuit looks purely resistive.',
        'Shrink $R$ with the default $L$ and $C$ and watch the peak grow taller and narrower — less resistance means less to limit the current right at resonance, and a sharper filter that only lets a narrow band of frequencies through.',
      ],
      formal: [
        'Inductors and capacitors have frequency-dependent reactances $X_L=2\\pi fL$ and $X_C=1/(2\\pi fC)$; total series impedance magnitude is $|Z|=\\sqrt{R^2+(X_L-X_C)^2}$, and current amplitude is $I=V/|Z|$.',
        'Resonance occurs where $X_L=X_C$, giving $f_0=1/(2\\pi\\sqrt{LC})$ and the minimum possible impedance $|Z|=R$, so current there is simply $I=V/R$.',
      ],
      advanced: [
        'The sharpness of the peak is captured by the quality factor $Q=\\dfrac{1}{R}\\sqrt{L/C} = \\dfrac{f_0}{\\Delta f}$, the resonant frequency divided by the bandwidth where power falls to half its peak value — high-Q circuits ring longer and select frequencies more selectively, the same trade-off that governs radio tuners and musical resonators alike.',
      ],
    },
    derivation: [
      { tex: r`Z = R + j\left(2\pi f L - \frac{1}{2\pi f C}\right)`, note: 'Series impedance: resistor is real, inductor and capacitor contribute opposite-signed imaginary reactances.' },
      { tex: r`|Z| = \sqrt{R^2+\left(2\pi f L-\frac{1}{2\pi f C}\right)^2}, \qquad I=\frac{V}{|Z|}`, note: "Ohm's law for AC circuits uses the impedance magnitude." },
      { tex: r`2\pi f_0 L = \frac{1}{2\pi f_0 C} \;\Rightarrow\; f_0 = \frac{1}{2\pi\sqrt{LC}}`, note: 'Reactances cancel exactly at resonance, minimising impedance and maximising current.' },
    ],
    realWorld: [
      { title: 'Radio tuning', text: 'Turning a dial changes C (or L) to move $f_0$ to the station you want to pick out of the air.' },
      { title: 'Wireless power transfer', text: 'Transmitter and receiver coils are tuned to the same resonant frequency to transfer energy efficiently over a gap.' },
      { title: 'Metal detectors', text: 'A metal object nearby shifts the coil\'s effective inductance, detuning the resonance in a way the circuit can sense.' },
      { title: 'Audio filters and equalisers', text: 'RLC-like resonant stages boost or cut a narrow band of frequencies around $f_0$.' },
    ],
  },
  {
    id: 'ac-power',
    title: 'Instantaneous and average AC power',
    subject: 'electricity',
    difficulty: 'university',
    equation: r`p(t) = v(t)i(t) = V_0 I_0\sin(\omega t)\sin(\omega t-\varphi), \qquad P_{\text{avg}} = \tfrac12 V_0 I_0\cos\varphi`,
    summary: 'Instantaneous power in an AC circuit oscillates and can even go briefly negative; only its time average — set by the phase lag between voltage and current — is the power you actually pay for.',
    concepts: ['instantaneous-power', 'real-power', 'power-factor', 'rms'],
    prerequisites: ['sine-wave'],
    related: ['series-parallel', 'rlc-resonance'],
    visualization: {
      type: 'function-plot',
      options: {
        expr: 'V0*I0*sin(2*pi*50*x)*sin(2*pi*50*x - phi)',
        domain: [0, 0.04],
        range: [-55, 55],
        mode: 'area',
      },
    },
    parameters: {
      V0: { label: 'voltage amplitude V0', min: 1, max: 20, step: 0.5, value: 10, unit: 'V' },
      I0: { label: 'current amplitude I0', min: 1, max: 10, step: 0.5, value: 5, unit: 'A' },
      phi: { label: 'phase lag φ (current behind voltage)', min: 0, max: 3.14, step: 0.05, value: 0.8, unit: 'rad' },
      a: { label: 'window start a', min: 0, max: 0.04, step: 0.001, value: 0, unit: 's' },
      b: { label: 'window end b', min: 0, max: 0.04, step: 0.001, value: 0.02, unit: 's' },
    },
    variables: [
      { symbol: 'v(t), i(t)', meaning: 'instantaneous voltage and current, both at 50 Hz' },
      { symbol: r`\varphi`, meaning: 'phase lag of current behind voltage' },
      { symbol: 'p(t)', meaning: 'instantaneous power, their product' },
      { symbol: r`\cos\varphi`, meaning: 'power factor — the fraction of $V_0I_0$ that is real, usable power' },
    ],
    explanation: {
      intuition: [
        'The shaded area between $a$ and $b$ is energy delivered in that window — signed, so parts where the curve dips below zero are energy briefly flowing backward into the source. With $\\varphi=0$ (voltage and current in step) the curve barely dips negative; drag $\\varphi$ up toward $\\pi/2$ and the negative lobes grow until they nearly cancel the positive ones.',
        'Set the window to one full cycle ($a=0$, $b=0.02$\\,s) and watch the net shaded area shrink as $\\varphi$ increases — that net area over a cycle, divided by the cycle length, is exactly the average power $\\tfrac12V_0I_0\\cos\\varphi$: same voltage and current amplitudes, but less delivered work whenever they fall out of step.',
      ],
      formal: [
        'Instantaneous power is simply the product $p(t)=v(t)i(t)$ for $v=V_0\\sin\\omega t$ and $i=I_0\\sin(\\omega t-\\varphi)$; expanding with a product-to-sum identity splits it into a constant term plus a term oscillating at $2\\omega$.',
        'Only the constant term survives averaging over a full cycle: $P_{\\text{avg}} = \\tfrac12 V_0I_0\\cos\\varphi = V_{\\text{rms}}I_{\\text{rms}}\\cos\\varphi$, where $\\cos\\varphi$ is called the power factor.',
      ],
      advanced: [
        'For a pure resistor $\\varphi=0$ and all delivered energy is dissipated; for a pure inductor or capacitor $\\varphi=\\pm\\pi/2$ and $\\cos\\varphi=0$ — energy sloshes in and out with zero net transfer, which is why reactive loads still draw current (and heat wiring) without registering as billed energy, and utilities penalise a low power factor.',
      ],
    },
    derivation: [
      { tex: r`p(t) = V_0I_0\sin(\omega t)\sin(\omega t-\varphi)`, note: 'Instantaneous power is just voltage times current.' },
      { tex: r`\sin A\sin B = \tfrac12\big[\cos(A-B)-\cos(A+B)\big] \;\Rightarrow\; p(t) = \tfrac12 V_0I_0\cos\varphi - \tfrac12 V_0I_0\cos(2\omega t-\varphi)`, note: 'A product-to-sum identity splits power into a constant part and a part oscillating at twice the line frequency.' },
      { tex: r`P_{\text{avg}} = \frac{1}{T}\int_0^T p(t)\,dt = \tfrac12 V_0I_0\cos\varphi`, note: 'The oscillating term integrates to zero over a full cycle, leaving only the constant term.' },
    ],
    realWorld: [
      { title: 'Electricity bills', text: 'Meters bill real (average) power, not the larger apparent power $V_{\\text{rms}}I_{\\text{rms}}$ drawn when the power factor is below 1.' },
      { title: 'Industrial motors', text: 'Large inductive motor loads lag current behind voltage; factories add capacitor banks to correct the power factor and cut wasted current.' },
      { title: 'Inverters and solar systems', text: 'Grid-tied inverters actively control phase to keep the power factor near 1 and maximise real power delivered.' },
      { title: 'RMS ratings', text: 'Appliance voltage and current ratings (like "230 V") are RMS values chosen precisely so $P=V_{\\text{rms}}I_{\\text{rms}}\\cos\\varphi$ matches the familiar DC power formula.' },
    ],
  },
]
