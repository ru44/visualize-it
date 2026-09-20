import type { Lesson } from './types'

const r = String.raw

export const electricity: Lesson[] = [
  {
    id: 'ohms-law',
    title: "Ohm's law",
    subject: 'electricity',
    difficulty: 'high-school',
    equation: r`V = IR`,
    summary: 'Voltage pushes, resistance resists, and the current that results is exactly their ratio.',
    concepts: ['voltage', 'current', 'resistance', 'power'],
    prerequisites: ['slope'],
    related: ['newtons-second-law'],
    charts: [
      { title: 'I–V characteristic: slope is 1/R', xLabel: 'V (volts)', yLabel: 'I (amps)', domain: [0, 24], marker: 'V', series: [{ label: 'I = V / R', expr: 'x/R' }] },
    ],
    visualization: {
      type: 'ohm-circuit',
      options: {},
    },
    parameters: {
      V: { label: 'voltage V', min: 0, max: 24, step: 0.5, value: 9, unit: 'V' },
      R: { label: 'resistance R', min: 1, max: 100, step: 1, value: 30, unit: 'Ω' },
    },
    variables: [
      { symbol: 'V', meaning: 'voltage — the electrical push supplied by the battery' },
      { symbol: 'I', meaning: 'current — the rate charge moves around the loop' },
      { symbol: 'R', meaning: 'resistance — how much the resistor opposes that flow' },
      { symbol: 'P', meaning: 'power — the rate energy is dissipated as heat in the resistor' },
    ],
    explanation: {
      intuition: [
        'Drag up and down on the circuit to set the voltage $V$. Watch the dots travelling around the loop: they speed up as $V$ rises, because a bigger push drives a bigger current. Now imagine turning the resistor\'s dial instead — a larger $R$ chokes the same push down to a smaller current, exactly like squeezing a hose narrows the flow of water for the same pump pressure.',
        'The resistor also glows a little brighter as the power $P = VI$ climbs, which is the heat it is dissipating. This is a deliberately conceptual picture: the dots move together, in one direction, at a speed you can actually see. Real electrons in a wire drift at only a millimetre or so per second, jostling randomly, and — because they carry negative charge — they physically drift opposite to the conventional current direction shown here.',
      ],
      formal: [
        'For an ohmic conductor at fixed temperature, current is proportional to voltage: $V = IR$, where $R$ is a constant of proportionality called resistance, measured in ohms ($\\Omega$).',
        'The power dissipated as heat is $P = VI$, which combines with Ohm\'s law to give the equivalent forms $P = I^2R = \\dfrac{V^2}{R}$.',
      ],
    },
    derivation: [
      {
        tex: r`I \propto V`,
        note: 'Picture charge flow like water through a pipe: doubling the pressure (voltage) doubles the flow (current), for a fixed pipe.',
      },
      {
        tex: r`R \equiv \frac{V}{I} \;\Rightarrow\; V = IR`,
        note: 'Define resistance as that constant of proportionality — the "narrowness" of the pipe. Rearranging gives Ohm\'s law.',
      },
      {
        tex: r`P = VI = I(IR) = I^2R = \left(\frac{V}{R}\right)^{\!2}\! R = \frac{V^2}{R}`,
        note: 'Power is voltage times current; substituting $V = IR$ (or $I = V/R$) gives the two equivalent heating formulas.',
      },
    ],
    realWorld: [
      { title: 'Phone chargers', text: 'A charger converts mains voltage down to a safe, steady voltage so a predictable, current-limited charge flows into the battery.' },
      { title: 'Sensors', text: 'Many sensors are resistors whose value changes with light, heat or strain; measuring the resulting current reveals the physical quantity.' },
      { title: 'Power supplies', text: 'Regulated supplies hold $V$ steady across changing loads, so $I = V/R$ still delivers the right current as $R$ varies.' },
      { title: 'Fuses and heating elements', text: 'A fuse wire is sized so that at its rated current $P = I^2R$ heats it enough to melt and break the circuit; a kettle element uses the same heating to boil water.' },
    ],
  },
]
