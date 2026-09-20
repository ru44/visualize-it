import type { Lesson } from './types'

const r = String.raw

export const geometry: Lesson[] = [
  {
    id: 'pythagorean-theorem',
    title: 'Pythagorean theorem',
    subject: 'geometry',
    difficulty: 'beginner',
    equation: r`a^2 + b^2 = c^2`,
    summary: 'In any right triangle, the squares built on the two legs together cover exactly as much area as the square built on the hypotenuse.',
    concepts: ['right triangle', 'hypotenuse', 'square', 'area'],
    prerequisites: [],
    related: ['circle', 'unit-circle'],
    visualization: {
      type: 'right-triangle',
      options: {},
    },
    parameters: {
      a: { label: 'a — leg', min: 1, max: 8, step: 0.1, value: 3 },
      b: { label: 'b — leg', min: 1, max: 8, step: 0.1, value: 4 },
    },
    variables: [
      { symbol: 'a', meaning: 'length of one leg (drag its far vertex)' },
      { symbol: 'b', meaning: 'length of the other leg (drag its far vertex)' },
      { symbol: 'c', meaning: 'length of the hypotenuse, opposite the right angle' },
      { symbol: 'θ', meaning: 'the angle opposite side a' },
    ],
    explanation: {
      intuition: [
        'Drag either far vertex and watch the triangle stretch while the three tinted squares grow and shrink with it. The blue square sitting on leg $a$ has area $a^2$, the teal square on leg $b$ has area $b^2$, and the amber square leaning on the hypotenuse has area $c^2$. No matter how you distort the triangle, the blue area plus the teal area always exactly fills the amber one.',
        'This only works because the corner between $a$ and $b$ stays a right angle — that small marked square at the vertex is the whole reason the identity holds. Try to picture what would happen if that corner opened wider than $90°$: the two smaller squares would no longer add up to the third, which is exactly what the readouts below let you check as $a^2+b^2$ versus $c$ squared.',
      ],
      formal: [
        'For a triangle with a right angle between sides of length $a$ and $b$, and hypotenuse $c$ opposite that right angle, $a^2 + b^2 = c^2$.',
        'Conversely, if a triangle\'s side lengths satisfy $a^2+b^2=c^2$, the angle opposite $c$ must be exactly $90°$ — the theorem is an if-and-only-if statement about right angles.',
      ],
    },
    derivation: [
      {
        tex: r`(a+b)^2 = a^2 + 2ab + b^2`,
        note: 'Take a square of side $a+b$ and expand its area algebraically.',
      },
      {
        tex: r`(a+b)^2 = c^2 + 4\left(\tfrac{1}{2}ab\right)`,
        note: 'Build the same big square a second way: place four copies of the right triangle around a tilted inner square of side $c$. The big square is the tilted square plus the four triangles.',
      },
      {
        tex: r`a^2 + 2ab + b^2 = c^2 + 2ab \;\;\Rightarrow\;\; a^2 + b^2 = c^2`,
        note: 'Both expressions describe the same area, so set them equal and cancel the shared $2ab$ term — the Pythagorean theorem is what remains.',
      },
    ],
    realWorld: [
      { title: 'Squaring a corner', text: 'Builders check a corner is a true right angle by measuring a 3-4-5 triangle along the two walls: if the diagonal is 5 units when the sides are 3 and 4, the corner is square.' },
      { title: 'Screen and TV sizes', text: 'A display\'s advertised size is the diagonal of its rectangle — computed from its width and height with exactly this theorem.' },
      { title: 'Straight-line distance', text: 'GPS and mapping tools use it to turn an east-west offset and a north-south offset into a single straight-line distance.' },
      { title: 'Ladder safety', text: 'Knowing the ladder\'s length and how far its base sits from the wall tells you how high it reaches, and vice versa.' },
    ],
  },
  {
    id: 'circle',
    title: 'Circle: circumference and area',
    subject: 'geometry',
    difficulty: 'beginner',
    equation: r`A = \pi r^2, \; C = 2\pi r`,
    summary: 'Every point on a circle sits the same distance $r$ from its centre; that single number fixes how far around it is and how much area it encloses.',
    concepts: ['radius', 'diameter', 'circumference', 'area', 'pi'],
    prerequisites: [],
    related: ['unit-circle', 'integral'],
    visualization: {
      type: 'circle',
      options: {},
    },
    parameters: {
      r: { label: 'r — radius', min: 0.5, max: 5, step: 0.05, value: 2 },
    },
    variables: [
      { symbol: 'r', meaning: 'the radius — drag the handle on the rim to change it' },
      { symbol: 'C', meaning: 'the circumference, the distance once around the circle' },
      { symbol: 'A', meaning: 'the area enclosed by the circle' },
    ],
    explanation: {
      intuition: [
        'Drag the handle on the rim: the radius line stretches, and the circle grows or shrinks around it. Below, that same rim gets cut and laid out flat as a straight segment — watch how its length always lines up with about $6.28$ copies of the radius, tick by tick. That number, $2\\pi$, is not a coincidence of this one circle; it is the same for every circle you could draw.',
        'Because $C$ scales with $r$, the ratio $C/r$ never changes as you drag — it is always $2\\pi$. That is really the definition of $\\pi$: the fixed proportion between how far around a circle is and how big it is across.',
      ],
      formal: [
        'A circle of radius $r$ centred at a point $O$ is the set of points at distance exactly $r$ from $O$; its circumference is $C = 2\\pi r$.',
        'The disk it encloses has area $A = \\pi r^2$, and for every circle the ratio $C/d$ of circumference to diameter equals the constant $\\pi$.',
      ],
    },
    derivation: [
      {
        tex: r`A \approx n \cdot \left(\tfrac{1}{2}\, r \cdot \tfrac{C}{n}\right)`,
        note: 'Slice the disk into $n$ thin wedges from the centre. Each wedge is nearly a triangle of height $r$ and base $C/n$, a sliver of the circumference.',
      },
      {
        tex: r`\text{wedges, alternated point-up / point-down} \;\longrightarrow\; \text{rectangle of sides } r \text{ and } \tfrac{C}{2}`,
        note: 'Lay the wedges side by side, alternating direction so they interlock. As $n\\to\\infty$ the zig-zag edge straightens into a rectangle of height $r$ and width $C/2$ — half the unrolled circumference.',
      },
      {
        tex: r`A = r \cdot \frac{C}{2} = r \cdot \frac{2\pi r}{2} = \pi r^2`,
        note: 'Multiply the rectangle\'s two sides and substitute $C = 2\\pi r$: the disk\'s area falls out as $\\pi r^2$.',
      },
    ],
    realWorld: [
      { title: 'Wheels and gears', text: 'A wheel\'s circumference tells you how far it travels in one full turn, which is how odometers and gear ratios are calculated.' },
      { title: 'Pipes and cable', text: 'A pipe\'s cross-sectional area, $\\pi r^2$, determines how much water or cable can pass through it.' },
      { title: 'Orbits', text: 'To a good approximation a planet or satellite traces a circle, so $C = 2\\pi r$ gives the distance it covers each revolution.' },
      { title: 'Pizza economics', text: 'Area grows with $r^2$ while price often scales closer to $r$, which is why one large pizza usually beats two small ones.' },
    ],
  },
]
