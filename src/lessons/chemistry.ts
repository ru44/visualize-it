import type { Lesson } from './types'

const r = String.raw

export const chemistry: Lesson[] = [
  {
    id: 'ideal-gas-law',
    title: 'Ideal gas law',
    subject: 'chemistry',
    difficulty: 'high-school',
    equation: r`PV = nRT`,
    summary: 'Pressure, volume, amount and temperature of a gas are locked together by one constant, $R$.',
    concepts: ['pressure', 'volume', 'temperature', 'moles'],
    prerequisites: ['function-graph'],
    related: ['newtons-second-law'],
    charts: [
      { title: 'Isotherm: pressure against volume at the current T and n', xLabel: 'V (L)', yLabel: 'P (kPa)', domain: [5, 50], marker: 'V', series: [{ label: 'P = nRT / V', expr: 'n*8.314*T/x' }] },
    ],
    visualization: {
      type: 'gas-box',
      options: {},
    },
    parameters: {
      n: { label: 'amount n', min: 0.5, max: 5, step: 0.1, value: 1, unit: 'mol' },
      T: { label: 'temperature T', min: 100, max: 600, step: 5, value: 300, unit: 'K' },
      V: { label: 'volume V', min: 5, max: 50, step: 0.5, value: 25, unit: 'L' },
    },
    variables: [
      { symbol: 'P', meaning: 'pressure — force per area from particles hitting the walls' },
      { symbol: 'V', meaning: 'volume of the container, set here by dragging the piston' },
      { symbol: 'n', meaning: 'amount of gas, in moles — more particles inside' },
      { symbol: 'R', meaning: 'the gas constant, $8.314\\ \\mathrm{J\\,mol^{-1}K^{-1}}$' },
      { symbol: 'T', meaning: 'temperature — how fast the particles move' },
    ],
    explanation: {
      intuition: [
        'Drag the piston left or right to change $V$. Squeeze it in and the same particles are packed into a smaller box, so they hit the walls more often — watch the wall-hits-per-second readout climb — and the pressure gauge along the top rises. Slide the slider for $T$ up instead and every particle speeds up, so even at the same volume they slam into the walls harder and more often; slide $n$ up and there are simply more particles to do the hitting.',
        'The pressure gauge is really just a running tally of those collisions. Nothing about the gas changes discontinuously — the particle count, their speed, and the box size all adjust smoothly as you move a slider, and the gauge tracks the combined effect in real time. That direct link between "more/faster collisions" and "higher pressure" is the whole content of the ideal gas law.',
      ],
      formal: [
        'For $n$ moles of an ideal gas at absolute temperature $T$ confined to volume $V$, the pressure satisfies $PV = nRT$, with $R = 8.314\\ \\mathrm{J\\,mol^{-1}K^{-1}}$.',
        'Equivalently, pressure is proportional to the number and average kinetic energy of the particles, and inversely proportional to the volume they are confined to: $P = \\dfrac{nRT}{V}$.',
      ],
      advanced: ['Kinetic theory derives it: $PV = \\tfrac13 N m \\langle v^2 \\rangle$ together with $\\tfrac12 m\\langle v^2\\rangle = \\tfrac32 k_B T$ gives $PV = N k_B T$. Real gases deviate at high density; van der Waals corrects for molecular volume and attraction.'],
    },
    derivation: [
      {
        tex: r`P \propto \frac{1}{V} \quad \text{(Boyle)}, \qquad V \propto T \quad \text{(Charles)}, \qquad V \propto n \quad \text{(Avogadro)}`,
        note: 'Three separate experimental laws: squeezing the volume raises pressure; heating a gas at constant pressure expands it; adding more gas at constant pressure also expands it.',
      },
      {
        tex: r`P \propto \frac{nT}{V}`,
        note: 'Each law holds the other variables fixed. Combining all three, pressure must scale with the product $nT$ and inversely with $V$.',
      },
      {
        tex: r`PV = nRT`,
        note: 'Insert a single constant of proportionality $R$ to turn that combined relation into an equation — the ideal gas law.',
      },
    ],
    realWorld: [
      { title: 'Engines', text: 'A car engine compresses an air-fuel mixture (shrinking $V$ raises $P$ and $T$) before ignition, then lets the hot combustion gas expand to push the piston.' },
      { title: 'Refrigeration', text: 'Fridges and air conditioners cycle a refrigerant through compression and expansion, using the $PV = nRT$ relationship to move heat from cold to warm.' },
      { title: 'Tyres and gas tanks', text: 'A tyre\'s pressure rises on a hot day purely because $T$ went up while $n$ and $V$ stayed almost fixed — exactly the slider you can move here.' },
      { title: 'The atmosphere', text: 'Air pressure falls with altitude because there is less gas above pressing down; weather systems form as pockets of air at different $T$ and $P$ mix.' },
    ],
  },
]
