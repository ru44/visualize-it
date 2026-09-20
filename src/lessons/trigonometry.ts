import type { Lesson } from './types'

const r = String.raw

export const trigonometry: Lesson[] = [
  {
    id: 'unit-circle',
    title: 'The unit circle',
    subject: 'trigonometry',
    difficulty: 'high-school',
    equation: r`(\cos\theta, \sin\theta), \quad \sin^2\theta + \cos^2\theta = 1`,
    summary: 'Sine and cosine are just the coordinates of a point walking around a circle of radius 1.',
    concepts: ['unit circle', 'sine', 'cosine', 'angle', 'periodicity'],
    prerequisites: ['pythagorean-theorem', 'circle'],
    related: ['function-graph'],
    visualization: {
      type: 'unit-circle',
      options: {},
    },
    parameters: {
      theta: { label: 'angle θ', min: 0, max: 360, step: 1, value: 40, unit: '°' },
    },
    variables: [
      { symbol: 'θ', meaning: 'the angle swept counter-clockwise from the positive x-axis' },
      { symbol: 'cos θ', meaning: 'the x-coordinate of the point on the unit circle' },
      { symbol: 'sin θ', meaning: 'the y-coordinate of the point on the unit circle' },
      { symbol: 'tan θ', meaning: 'sin θ divided by cos θ, undefined where cos θ = 0' },
    ],
    explanation: {
      intuition: [
        'Drag the point around the rim of the circle. Its horizontal distance from the centre is $\\cos\\theta$, its vertical distance is $\\sin\\theta$ — you are not memorising a table, you are watching two shadows cast by one spinning point.',
        'As you drag, the wave on the right traces itself out. The dashed connector shows why: the height of the point on the circle is exactly the height of the dot on the sine curve. Sine and cosine are the circle unrolled onto a straight timeline.',
      ],
      formal: [
        'For a point $(\\cos\\theta, \\sin\\theta)$ on the unit circle, $\\theta$ is the angle in radians measured counter-clockwise from the positive $x$-axis.',
        'Because the point always lies at distance 1 from the origin, $\\sin^2\\theta + \\cos^2\\theta = 1$ for every value of $\\theta$.',
      ],
      advanced: ['Euler’s formula packages both coordinates: $e^{i\\theta} = \\cos\\theta + i\\sin\\theta$. Angle addition becomes multiplication of exponentials, and $\\sin$, $\\cos$ are the solutions of $y\'\' = -y$ — which is why they appear in every oscillation.'],
    },
    derivation: [
      { tex: r`x^2 + y^2 = 1`, note: 'The point sits on a circle of radius 1, so its coordinates form the legs of a right triangle whose hypotenuse is 1.' },
      { tex: r`x = \cos\theta, \quad y = \sin\theta`, note: 'Define cosine and sine as exactly those coordinates: adjacent over hypotenuse and opposite over hypotenuse, with hypotenuse 1.' },
      { tex: r`\cos^2\theta + \sin^2\theta = 1`, note: 'Substituting the definitions back into the circle equation gives the Pythagorean identity — true for every angle, all at once.' },
    ],
    realWorld: [
      { title: 'Sound', text: 'A pure musical tone is a sine wave in air pressure over time; the unit circle is the machine that generates it.' },
      { title: 'AC electricity', text: 'Mains voltage oscillates as $\\sin(\\omega t)$ because it is produced by a coil rotating at constant angular speed.' },
      { title: 'Rotation', text: 'Any point on a spinning wheel or gear traces out sine and cosine in its horizontal and vertical position over time.' },
      { title: 'Navigation', text: 'Converting between a bearing-and-distance and map coordinates uses sine and cosine directly.' },
    ],
  },
]
