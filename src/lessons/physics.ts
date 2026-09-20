import type { Lesson } from './types'

const r = String.raw

export const physics: Lesson[] = [
  {
    id: 'newtons-second-law',
    title: "Newton's second law",
    subject: 'physics',
    difficulty: 'high-school',
    equation: r`F = ma`,
    summary: 'A net force accelerates a mass in proportion to the force and in inverse proportion to the mass.',
    concepts: ['force', 'mass', 'acceleration', 'momentum'],
    prerequisites: ['slope', 'derivative'],
    related: ['area-under-curve'],
    visualization: {
      type: 'block-force',
      options: {},
    },
    parameters: {
      F: { label: 'force F', min: 0, max: 50, step: 0.5, value: 10, unit: 'N' },
      m: { label: 'mass m', min: 0.5, max: 20, step: 0.5, value: 2, unit: 'kg' },
    },
    variables: [
      { symbol: 'F', meaning: 'the net force pushing the block' },
      { symbol: 'm', meaning: "the block's mass, shown by its size" },
      { symbol: 'a', meaning: 'the resulting acceleration, F divided by m' },
      { symbol: 'v', meaning: "the block's velocity, which grows steadily under constant acceleration" },
    ],
    explanation: {
      intuition: [
        'Drag left and right on the diagram to change the force $F$. Watch the orange arrow grow, and watch the block leap off the starting line faster and faster — a bigger push means a bigger acceleration, and the effect is immediate.',
        'Now picture the same push on a much heavier block: it grows visibly bigger as you raise $m$. For an identical force it now crawls instead of races, because acceleration is force *shared out* over mass — the green arrow above it shrinks even though the orange arrow behind it has not.',
      ],
      formal: [
        "Newton's second law states that the net force on an object equals the rate of change of its momentum: $F = \\dfrac{dp}{dt}$.",
        'For an object of constant mass, momentum is $p = mv$, so $F = m\\dfrac{dv}{dt} = ma$ — force equals mass times acceleration.',
      ],
    },
    derivation: [
      { tex: r`p = mv`, note: 'Momentum is mass times velocity — a measure of how hard it is to stop something moving.' },
      { tex: r`F = \frac{dp}{dt}`, note: 'Force is defined as how quickly momentum changes over time.' },
      { tex: r`F = \frac{d(mv)}{dt} = m\frac{dv}{dt} = ma`, note: 'When the mass stays constant it comes out of the derivative, leaving force equal to mass times acceleration.' },
    ],
    realWorld: [
      { title: 'Cars', text: 'A more powerful engine applies more force, so the same car accelerates faster for a given mass.' },
      { title: 'Rockets', text: 'As a rocket burns fuel its mass falls, so the same thrust produces ever greater acceleration.' },
      { title: 'Sports', text: 'A heavier shot put needs a much larger push than a light ball to leave the hand with the same acceleration.' },
    ],
  },
]
