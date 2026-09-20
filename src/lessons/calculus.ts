import type { Lesson } from './types'

const r = String.raw

export const calculus: Lesson[] = [
  {
    id: 'function-graph',
    title: 'Function graph',
    subject: 'functions',
    difficulty: 'beginner',
    equation: r`f(x) = ax^2 + bx + c`,
    summary: 'A function is a machine: put in x, get out f(x). The graph is every input–output pair drawn at once.',
    concepts: ['function', 'input', 'output', 'graph'],
    prerequisites: [],
    related: ['slope', 'derivative'],
    visualization: {
      type: 'function-plot',
      options: { expr: 'a*x^2 + b*x + c', domain: [-6, 6], range: [-8, 12], mode: 'plain' },
    },
    parameters: {
      x: { label: 'input x', min: -6, max: 6, step: 0.05, value: 1.5 },
      a: { label: 'a — curvature', min: -2, max: 2, step: 0.05, value: 1 },
      b: { label: 'b — tilt', min: -4, max: 4, step: 0.1, value: 0 },
      c: { label: 'c — vertical shift', min: -6, max: 6, step: 0.1, value: 0 },
    },
    variables: [
      { symbol: 'x', meaning: 'the input you choose' },
      { symbol: 'f(x)', meaning: 'the output the rule produces' },
      { symbol: 'a', meaning: 'how sharply the curve bends, and whether it opens up or down' },
      { symbol: 'b', meaning: 'shifts the turning point sideways' },
      { symbol: 'c', meaning: 'where the curve crosses the vertical axis' },
    ],
    explanation: {
      intuition: [
        'Drag the point. Its horizontal position is the input, its height is the output. The curve is simply the trail left by every possible input.',
        'Now change $a$, $b$ and $c$. You are not moving a drawing — you are changing the rule, and the picture follows. Set $a = 0$ and the parabola collapses into a straight line.',
      ],
      formal: [
        'A function $f: \\mathbb{R} \\to \\mathbb{R}$ assigns exactly one output to each input. Its graph is the set $\\{(x, f(x))\\}$.',
        'For a quadratic, the vertex sits at $x = -\\tfrac{b}{2a}$ and the sign of $a$ decides whether it is a minimum or a maximum.',
      ],
      advanced: ['The three parameters are coordinates on the space of quadratics; completing the square shows every parabola is an affine image of $y = x^2$, which is why they all share one shape up to scaling.'],
    },
    derivation: [
      { tex: r`f(x) = ax^2 + bx + c`, note: 'Start from the general quadratic.' },
      { tex: r`f(x) = a\left(x + \tfrac{b}{2a}\right)^2 + c - \tfrac{b^2}{4a}`, note: 'Complete the square: the same rule, rewritten as a shifted copy of $ax^2$.' },
      { tex: r`x_{\text{vertex}} = -\tfrac{b}{2a}`, note: 'The squared term is smallest when it is zero — that is the turning point you see on the graph.' },
    ],
    realWorld: [
      { title: 'Thrown objects', text: 'Height against time for a ball in flight is a downward-opening parabola.' },
      { title: 'Pricing', text: 'Revenue against price is often quadratic: too cheap or too expensive both lose money.' },
      { title: 'Satellite dishes', text: 'A parabolic cross-section reflects every incoming ray to a single focus.' },
    ],
  },
  {
    id: 'slope',
    title: 'Slope',
    subject: 'functions',
    difficulty: 'beginner',
    equation: r`m = \frac{\Delta y}{\Delta x} = \frac{y_2 - y_1}{x_2 - x_1}`,
    summary: 'Slope measures steepness: how much the output changes for each step in the input.',
    concepts: ['slope', 'rate-of-change', 'line'],
    prerequisites: ['function-graph'],
    related: ['derivative'],
    visualization: {
      type: 'function-plot',
      options: { expr: 'm*x + b', domain: [-6, 6], range: [-8, 8], mode: 'secant' },
    },
    parameters: {
      m: { label: 'm — slope', min: -3, max: 3, step: 0.05, value: 0.75 },
      b: { label: 'b — intercept', min: -5, max: 5, step: 0.1, value: -1 },
      x: { label: 'first point x₁', min: -6, max: 6, step: 0.05, value: -2 },
      h: { label: 'run Δx', min: 0.25, max: 6, step: 0.05, value: 4 },
    },
    variables: [
      { symbol: r`\Delta x`, meaning: 'the run — horizontal distance between the two points' },
      { symbol: r`\Delta y`, meaning: 'the rise — vertical distance between them' },
      { symbol: 'm', meaning: 'rise divided by run' },
    ],
    explanation: {
      intuition: [
        'Pick two points on the line and walk from one to the other: first across (the run), then up (the rise). Slope is rise per unit of run.',
        'Move the points or change the run. The triangle changes size, yet the ratio never changes. That constancy is exactly what makes a line a line.',
      ],
      formal: [
        'For $y = mx + b$ and any $x_1 \\ne x_2$: $\\dfrac{y_2 - y_1}{x_2 - x_1} = \\dfrac{m(x_2 - x_1)}{x_2 - x_1} = m$.',
        'All rise–run triangles on a line are similar, so their ratio is an invariant of the line.',
      ],
      advanced: ['Constant difference quotient characterises affine maps: $f$ is affine iff $\\frac{f(x_2)-f(x_1)}{x_2-x_1}$ is independent of the points. The derivative extends this by asking only for the limit as the points merge.'],
    },
    derivation: [
      { tex: r`y_1 = mx_1 + b, \quad y_2 = mx_2 + b`, note: 'Evaluate the line at two inputs.' },
      { tex: r`y_2 - y_1 = m(x_2 - x_1)`, note: 'Subtract: the intercept $b$ cancels.' },
      { tex: r`\frac{y_2 - y_1}{x_2 - x_1} = m`, note: 'Divide by the run. The result does not depend on which points you picked.' },
    ],
    realWorld: [
      { title: 'Speed', text: 'On a distance–time graph, slope is speed: metres gained per second elapsed.' },
      { title: 'Roads and ramps', text: 'A 6% grade means 6 m of rise per 100 m of run.' },
      { title: 'Unit prices', text: 'Cost against quantity is a line whose slope is the price per item.' },
    ],
  },
  {
    id: 'derivative',
    title: 'Derivative',
    subject: 'calculus',
    difficulty: 'high-school',
    equation: r`f(x) = x^2 \;\Rightarrow\; f'(x) = 2x`,
    summary: 'The derivative is the slope of a curve at a single point — the instantaneous rate of change.',
    concepts: ['function', 'slope', 'derivative', 'rate-of-change'],
    prerequisites: ['slope', 'limit'],
    related: ['integral'],
    visualization: {
      type: 'function-plot',
      options: { expr: 'x^2', domain: [-4, 4], range: [-8, 12], mode: 'tangent', showDerivative: true },
    },
    parameters: {
      x: { label: 'point x', min: -4, max: 4, step: 0.01, value: 1 },
    },
    variables: [
      { symbol: 'f(x)', meaning: 'the curve (solid)' },
      { symbol: "f'(x)", meaning: 'its slope at each x (dashed)' },
    ],
    explanation: {
      intuition: [
        'A curve has no single slope — its steepness changes as you move. The tangent line shows the slope at exactly one point: the direction the curve is heading right there.',
        'Drag the point. The small dot on the dashed line records the tangent’s slope at each $x$. Collect all those slopes and you get a new function: the derivative. For $x^2$ it is the straight line $2x$ — negative where the curve falls, zero at the bottom, positive where it rises.',
      ],
      formal: [
        "$f'(x) = \\lim_{h \\to 0} \\dfrac{f(x+h) - f(x)}{h}$, provided the limit exists.",
        "The tangent at $x_0$ is the best linear approximation: $f(x) \\approx f(x_0) + f'(x_0)(x - x_0)$.",
      ],
      advanced: ['Differentiability at $x_0$ means $f(x_0 + h) = f(x_0) + f\'(x_0)h + o(h)$: the error of the tangent shrinks faster than $h$ itself. Differentiable implies continuous, but not conversely — $|x|$ at 0 has two one-sided slopes and no tangent.'],
    },
    derivation: [
      { tex: r`\frac{f(x+h) - f(x)}{h} = \frac{(x+h)^2 - x^2}{h}`, note: 'Slope of the secant through $x$ and $x + h$.' },
      { tex: r`= \frac{2xh + h^2}{h} = 2x + h`, note: 'Expand and cancel $h$ (allowed, because $h \\ne 0$).' },
      { tex: r`f'(x) = \lim_{h \to 0} (2x + h) = 2x`, note: 'Let the second point slide into the first. The secant becomes the tangent.' },
    ],
    realWorld: [
      { title: 'Velocity and acceleration', text: 'Velocity is the derivative of position; acceleration is the derivative of velocity.' },
      { title: 'Optimization', text: 'Maxima and minima sit where the derivative is zero — the tangent is flat.' },
      { title: 'Economics', text: 'Marginal cost is the derivative of total cost: the price of making one more unit.' },
      { title: 'Machine learning', text: 'Gradient descent trains models by repeatedly stepping against the derivative of the error.' },
    ],
  },
  {
    id: 'limit',
    title: 'Limit',
    subject: 'calculus',
    difficulty: 'high-school',
    equation: r`\lim_{x \to 0} \frac{\sin x}{x} = 1`,
    summary: 'A limit describes what a function approaches as the input approaches a value — even if it never arrives.',
    concepts: ['function', 'approach', 'limit', 'continuity'],
    prerequisites: ['function-graph'],
    related: ['derivative', 'integral'],
    visualization: {
      type: 'function-plot',
      options: { expr: 'sin(x)/x', domain: [-7, 7], range: [-0.6, 1.4], mode: 'limit', limitAt: 0 },
    },
    parameters: {
      d: { label: 'distance from 0', min: 0.001, max: 6, step: 0.001, value: 3 },
    },
    variables: [
      { symbol: 'x', meaning: 'the input, sliding toward 0 from both sides' },
      { symbol: r`\tfrac{\sin x}{x}`, meaning: 'undefined at x = 0 (that would be 0/0) — shown as a hollow point' },
    ],
    explanation: {
      intuition: [
        'At $x = 0$ this function has a hole: $0/0$ means nothing. But a limit never asks what happens at the point — it asks what happens on the way there.',
        'Pull the two dots toward the hole and watch the readouts: 0.84…, 0.998…, 0.99998… The outputs close in on 1 from both sides. That destination is the limit.',
      ],
      formal: [
        '$\\lim_{x \\to a} f(x) = L$ means: for every $\\varepsilon > 0$ there is a $\\delta > 0$ such that $0 < |x - a| < \\delta$ implies $|f(x) - L| < \\varepsilon$.',
        'Here $a = 0$, $L = 1$. The condition $0 < |x - a|$ is why the value at $a$ itself is irrelevant.',
      ],
      advanced: ['Negating the definition is how limits are shown not to exist: there is an $\\varepsilon > 0$ such that every $\\delta$-neighbourhood contains an $x$ with $|f(x) - L| \\ge \\varepsilon$. Equivalently (Heine), $f(x_n) \\to L$ for every sequence $x_n \\to a$ with $x_n \\ne a$ — which is exactly what the shrinking readouts sample.'],
    },
    derivation: [
      { tex: r`\cos x \;<\; \frac{\sin x}{x} \;<\; 1 \qquad (0 < |x| < \tfrac{\pi}{2})`, note: 'Compare areas of a triangle, a circular sector and a larger triangle on the unit circle.' },
      { tex: r`\lim_{x \to 0} \cos x = 1`, note: 'The lower bound rises to 1; the upper bound is already 1.' },
      { tex: r`\lim_{x \to 0} \frac{\sin x}{x} = 1`, note: 'Squeeze theorem: trapped between two things that approach 1, it must approach 1 too.' },
    ],
    realWorld: [
      { title: 'Instantaneous speed', text: 'Speed “at an instant” is a limit of average speeds over shrinking time intervals.' },
      { title: 'Small-angle approximation', text: 'This exact limit is why $\\sin\\theta \\approx \\theta$ works for pendulums and optics.' },
      { title: 'Numerical methods', text: 'Every simulation that refines its step size is relying on a limit existing.' },
    ],
  },
  {
    id: 'integral',
    title: 'Integral',
    subject: 'calculus',
    difficulty: 'high-school',
    equation: r`\int_0^4 x^2 \, dx = \frac{64}{3}`,
    summary: 'An integral adds up infinitely many infinitely thin slices. Start with rectangles and watch them converge.',
    concepts: ['area', 'riemann-sum', 'integral', 'accumulation'],
    prerequisites: ['function-graph', 'limit'],
    related: ['area-under-curve', 'derivative'],
    visualization: {
      type: 'function-plot',
      options: { expr: 'x^2', domain: [-1, 5], range: [-2, 20], mode: 'riemann', rule: 'left' },
    },
    parameters: {
      n: { label: 'number of rectangles', min: 1, max: 500, step: 1, value: 4 },
      a: { label: 'lower bound a', min: 0, max: 4, step: 0.05, value: 0 },
      b: { label: 'upper bound b', min: 0, max: 5, step: 0.05, value: 4 },
    },
    variables: [
      { symbol: 'a, b', meaning: 'where the accumulation starts and stops' },
      { symbol: 'dx', meaning: 'the width of one slice, shrinking toward zero' },
      { symbol: 'f(x)\\,dx', meaning: 'the area of one thin slice' },
    ],
    explanation: {
      intuition: [
        'We know how to find the area of a rectangle, not of a curved region. So cheat: cover the region with rectangles and add them up.',
        'With 4 rectangles the fit is poor. Slide to 10, 50, 500 — the gaps vanish and the sum settles on a single number. The integral is that number.',
      ],
      formal: [
        '$\\int_a^b f(x)\\,dx = \\lim_{n \\to \\infty} \\sum_{i=1}^{n} f(x_i^*)\\,\\Delta x$ with $\\Delta x = \\tfrac{b-a}{n}$.',
        'For continuous $f$ the limit exists and is independent of the sample points $x_i^*$ (left, right or midpoint).',
      ],
      advanced: ['Riemann integrability: the upper and lower Darboux sums can be made arbitrarily close. Every continuous function on $[a,b]$ qualifies; for a monotone $f$ the gap is at most $|f(b) - f(a)|\\,\\Delta x$, which is the $O(1/n)$ error you see for left-endpoint rectangles. The midpoint rule improves this to $O(1/n^2)$.'],
    },
    derivation: [
      { tex: r`\sum_{i=1}^{n} \left(\tfrac{4i}{n}\right)^2 \cdot \tfrac{4}{n} = \frac{64}{n^3} \sum_{i=1}^{n} i^2`, note: 'Right-endpoint rectangles of width $4/n$.' },
      { tex: r`= \frac{64}{n^3} \cdot \frac{n(n+1)(2n+1)}{6}`, note: 'Use the closed form for a sum of squares.' },
      { tex: r`\xrightarrow{\,n \to \infty\,} \frac{64 \cdot 2}{6} = \frac{64}{3}`, note: 'The same value the antiderivative gives: $\\left[\\tfrac{x^3}{3}\\right]_0^4$.' },
    ],
    realWorld: [
      { title: 'Distance from speed', text: 'Add up speed × tiny time step over a trip and you get distance travelled.' },
      { title: 'Energy', text: 'Your electricity bill is power integrated over time (kWh).' },
      { title: 'Probability', text: 'The chance of landing in a range is the integral of the density over it.' },
      { title: 'Volume and mass', text: 'Slice an object thinly, add the slices: that is how CT scanners and CAD tools compute volume.' },
    ],
  },
  {
    id: 'area-under-curve',
    title: 'Area under a curve',
    subject: 'calculus',
    difficulty: 'high-school',
    equation: r`\int_a^b v(t)\,dt = \text{net displacement}`,
    summary: 'Area below the axis counts as negative. The integral is a running total, not just a size.',
    concepts: ['signed-area', 'accumulation', 'integral'],
    prerequisites: ['integral'],
    related: ['derivative'],
    visualization: {
      type: 'function-plot',
      options: { expr: '2*sin(x)', domain: [-0.5, 10], range: [-3, 3], mode: 'area' },
    },
    parameters: {
      a: { label: 'start a', min: 0, max: 9.5, step: 0.05, value: 0 },
      b: { label: 'end b', min: 0, max: 9.5, step: 0.05, value: 4.5 },
    },
    variables: [
      { symbol: 'v(t)', meaning: 'velocity at time t — here 2 sin t, forwards then backwards' },
      { symbol: 'a, b', meaning: 'start and end of the time window' },
    ],
    explanation: {
      intuition: [
        'Read the curve as the velocity of a car. While it is above the axis the car moves forward and distance piles up (teal). Below the axis the car reverses and the total is paid back (red).',
        'Drag the end time past $\\pi$ and watch the signed area start to fall. At $2\\pi$ it returns to zero: the car is back where it started, even though it drove the whole time.',
      ],
      formal: [
        '$\\int_a^b f = A_{+} - A_{-}$, where $A_{+}$ and $A_{-}$ are the areas above and below the axis.',
        'Total distance is a different quantity: $\\int_a^b |f(t)|\\,dt = A_{+} + A_{-}$.',
      ],
      advanced: ['With $F(b) = \\int_a^b f$, the Fundamental Theorem gives $F\'(b) = f(b)$: the rate at which area accumulates equals the height of the curve at the moving edge. That is why the running total peaks exactly where $f$ crosses zero.'],
    },
    derivation: [
      { tex: r`\int_0^{b} 2\sin t \, dt = \big[-2\cos t\big]_0^{b}`, note: 'An antiderivative of $2\\sin t$ is $-2\\cos t$.' },
      { tex: r`= 2 - 2\cos b`, note: 'This is the running total plotted against the end time $b$.' },
      { tex: r`b = 2\pi \;\Rightarrow\; 2 - 2 = 0`, note: 'Equal areas above and below cancel exactly.' },
    ],
    realWorld: [
      { title: 'Net vs. total', text: 'A bank balance is the signed integral of cash flow; turnover is the unsigned one.' },
      { title: 'AC electricity', text: 'Mains current integrates to zero over a cycle — which is why RMS, not the average, measures its strength.' },
      { title: 'Work', text: 'Force × distance, signed: a force opposing motion removes energy.' },
    ],
  },
]
