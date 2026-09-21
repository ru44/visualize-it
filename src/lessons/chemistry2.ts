import type { Lesson } from './types'

const r = String.raw

/** Chemistry and thermodynamics lessons — reaction/atom visualizations plus data-only function-plot lessons. */
export const chemistry2: Lesson[] = [
  {
    id: 'chemical-reaction',
    title: 'Balancing a reaction: making water',
    subject: 'chemistry',
    difficulty: 'high-school',
    equation: r`2\,\mathrm{H_2} + \mathrm{O_2} \;\rightarrow\; 2\,\mathrm{H_2O}`,
    summary: 'Atoms are never created or destroyed in a reaction — they are only rearranged. The coefficients in a balanced equation say exactly how many molecules combine.',
    concepts: ['balancing', 'conservation-of-mass', 'stoichiometry', 'limiting-reactant', 'molar-mass'],
    prerequisites: [],
    related: ['atomic-structure', 'chemical-equilibrium'],
    visualization: { type: 'reaction', options: {} },
    parameters: {
      h2: { label: 'H₂ molecules', min: 0, max: 12, step: 1, value: 6 },
      o2: { label: 'O₂ molecules', min: 0, max: 8, step: 1, value: 2 },
      progress: { label: 'reaction progress', min: 0, max: 1, step: 0.01, value: 0 },
    },
    variables: [
      { symbol: 'n(\\mathrm{H_2})', meaning: 'number of hydrogen molecules you start with' },
      { symbol: 'n(\\mathrm{O_2})', meaning: 'number of oxygen molecules you start with' },
      { symbol: r`M`, meaning: 'molar mass: 1.008 g/mol for H, 15.999 g/mol for O' },
    ],
    explanation: {
      intuition: [
        'Drag the h2 and o2 sliders to set how many of each molecule are on the table, then scrub progress. Watch every ball on the left pair off: two H₂ and one O₂ always vanish together and two bent H₂O molecules appear on the right — never a leftover atom, never one created from nothing.',
        'Push h2 up and o2 down (or the reverse) and the excess reactant stops reacting once the other one runs out — those molecules pick up a dashed “excess” ring and just sit there. That is a limiting reactant: whichever ingredient runs out first caps how much product you can make, no matter how much of the other you have.',
      ],
      formal: [
        'The balanced equation $2\\mathrm{H_2} + \\mathrm{O_2} \\rightarrow 2\\mathrm{H_2O}$ fixes the mole ratio $2:1:2$. The number of reaction events is $n = \\min\\!\\left(\\lfloor n(\\mathrm{H_2})/2 \\rfloor,\\; n(\\mathrm{O_2})\\right)$, giving $2n$ water molecules.',
        'Conservation of mass follows from conservation of atoms: total H atoms and total O atoms are identical before and after, so total mass is identical before and after — $\\sum m_{\\text{reactants}} = \\sum m_{\\text{products}}$.',
      ],
      advanced: [
        'Balancing is really solving a linear system: assign unknown coefficients to each species and require the atom count of each element to match on both sides. For simple reactions this is done by inspection; for redox reactions with many species it is solved via the null space of the atomic composition matrix.',
      ],
    },
    derivation: [
      { tex: r`a\,\mathrm{H_2} + b\,\mathrm{O_2} \rightarrow c\,\mathrm{H_2O}`, note: 'Start with unknown whole-number coefficients.' },
      { tex: r`\text{H: } 2a = 2c \qquad \text{O: } 2b = c`, note: 'Count each element separately on both sides; the counts must match.' },
      { tex: r`a = c,\; b = c/2 \;\Rightarrow\; (a,b,c) = (2,1,2)`, note: 'Smallest whole-number solution: the familiar $2\\mathrm{H_2} + \\mathrm{O_2} \\rightarrow 2\\mathrm{H_2O}$.' },
    ],
    realWorld: [
      { title: 'Rocket fuel', text: 'Liquid hydrogen and liquid oxygen burn in exactly this reaction to power upper-stage rocket engines.' },
      { title: 'Fuel cells', text: 'Run the reaction in reverse-controlled steps and you extract electrical energy instead of heat — the basis of hydrogen fuel cells.' },
      { title: 'Cooking and baking', text: 'Recipe ratios are stoichiometry: too little of one ingredient and the rest goes to waste, exactly like a limiting reactant.' },
      { title: 'Industrial synthesis', text: 'Chemical plants deliberately feed an excess of the cheaper reactant so the expensive one is used as completely as possible.' },
    ],
  },
  {
    id: 'atomic-structure',
    title: 'Inside the atom: protons, neutrons, shells',
    subject: 'chemistry',
    difficulty: 'high-school',
    equation: r`A = Z + N, \qquad {}^{A}_{Z}\mathrm{X}`,
    summary: 'An atom is a tiny charged nucleus of protons and neutrons surrounded by electrons arranged in shells — and it is the outermost shell that decides how an element reacts.',
    concepts: ['proton', 'neutron', 'electron', 'atomic-number', 'mass-number', 'isotope', 'electron-shell', 'valence-electron'],
    prerequisites: [],
    related: ['chemical-reaction', 'ph-scale'],
    visualization: { type: 'atom-shells', options: {} },
    parameters: {
      Z: { label: 'atomic number Z (protons)', min: 1, max: 20, step: 1, value: 11 },
      N: { label: 'neutrons N', min: 0, max: 24, step: 1, value: 12 },
    },
    variables: [
      { symbol: 'Z', meaning: 'atomic number — number of protons, fixes the element' },
      { symbol: 'N', meaning: 'number of neutrons in the nucleus' },
      { symbol: 'A', meaning: 'mass number, $A = Z + N$' },
    ],
    explanation: {
      intuition: [
        'Drag horizontally to change Z and watch the nucleus label update, the element symbol and name change, and a whole new electron fill up — the shells drain and refill in the fixed order 2, then 8, then 8, then 2. That refilling pattern is the periodic table in miniature: every time a shell just filled, you land on a noble gas (He, Ne, Ar).',
        'The dots in the outermost, half-drawn shell are highlighted — those are the valence electrons. They are the only ones close enough to the surface to be shared or traded with another atom, which is why elements with the same number of valence electrons (same column of the periodic table) behave alike even though their nuclei are completely different.',
      ],
      formal: [
        'The mass number $A = Z + N$ counts nucleons; the atomic number $Z$ alone identifies the element and is written as a subscript, $A$ as a superscript: ${}^{A}_{Z}\\mathrm{X}$. Atoms with the same $Z$ but different $N$ are isotopes of the same element.',
        'For the first twenty elements, electron shells fill in the order 2, 8, 8, 2 (capacities $2n^2$ only for the first shell; beyond that the simple 2-8-8 pattern is what you observe before 3d orbitals complicate things at $Z = 21$).',
      ],
      advanced: [
        'The 2-8-8-2 rule is a simplification: real shell filling follows the Aufbau principle over subshells $1s\\,2s\\,2p\\,3s\\,3p\\,4s\\ldots$, and 4s fills before 3d — which is exactly why potassium (Z=19) and calcium (Z=20) put their next two electrons in a new outer shell rather than completing the third one, matching the diagram’s 2-8-8-2 shown here.',
      ],
    },
    derivation: [
      { tex: r`\text{nucleus: } Z \text{ protons } (+e) + N \text{ neutrons } (0)`, note: 'Charge of the nucleus is $+Ze$; almost all the mass is here.' },
      { tex: r`\text{electrons: } Z \text{ (neutral atom)}`, note: 'A neutral atom has exactly as many electrons as protons.' },
      { tex: r`A = Z + N`, note: 'Protons and neutrons both have mass $\\approx 1$ u; electrons are about 1800× lighter and barely add to $A$.' },
    ],
    realWorld: [
      { title: 'Carbon dating', text: 'Carbon-14, an isotope with two extra neutrons compared to ordinary carbon-12, decays at a known rate used to date organic remains.' },
      { title: 'Nuclear power', text: 'Uranium-235 versus uranium-238 differ only in neutron count, but only the lighter isotope sustains a chain reaction.' },
      { title: 'The periodic table', text: 'Columns are groups of elements with the same valence electron count — that shared outer shell is why sodium and potassium react so similarly.' },
      { title: 'Chemical bonding', text: 'Atoms react to fill or empty their valence shell — this single idea explains why table salt is $\\mathrm{NaCl}$, one-to-one.' },
    ],
  },
  {
    id: 'ph-scale',
    title: 'The pH scale',
    subject: 'chemistry',
    difficulty: 'high-school',
    equation: r`\mathrm{pH} = -\log_{10}\!\big[\mathrm{H^+}\big]`,
    summary: 'pH compresses an enormous range of acidity into a small, usable number by taking a logarithm — every single pH unit is a ×10 change in hydrogen-ion concentration.',
    concepts: ['logarithm', 'acid', 'base', 'concentration', 'pOH'],
    prerequisites: ['exponential-growth'],
    related: ['dilution-molarity', 'chemical-equilibrium'],
    visualization: {
      type: 'function-plot',
      options: { expr: '-log10(x)', domain: [0.0001, 0.1], range: [0, 5], mode: 'tangent' },
    },
    parameters: {
      x: { label: 'H⁺ concentration [H⁺]', min: 0.0001, max: 0.1, step: 0.0001, value: 0.001, unit: 'mol/L' },
    },
    variables: [
      { symbol: r`[\mathrm{H^+}]`, meaning: 'hydrogen-ion (hydronium) concentration in mol/L' },
      { symbol: r`\mathrm{pH}`, meaning: 'the negative base-10 logarithm of $[\\mathrm{H^+}]$' },
      { symbol: r`\mathrm{pOH}`, meaning: 'the same idea for hydroxide; at 25°C, $\\mathrm{pH} + \\mathrm{pOH} = 14$' },
    ],
    explanation: {
      intuition: [
        'Drag the point left toward tiny concentrations and pH climbs; drag it right toward larger concentrations and pH falls. Notice how fast the curve bends — near $[\\mathrm{H^+}] = 0.1$ it is nearly flat, but as you approach zero it shoots upward. That steepening tangent is the signature of a logarithm: equal ratios of concentration (×10, ×10, ×10 …) produce equal steps in pH (1, 1, 1 …), not equal steps in concentration.',
        'Because the scale is logarithmic, a change from pH 5 to pH 4 is not “a bit more acidic” — it is ten times more hydrogen ions. Two solutions three pH units apart differ in acidity by a factor of $10^3 = 1000$, even though their pH values look close together on the slider.',
      ],
      formal: [
        '$\\mathrm{pH} = -\\log_{10}[\\mathrm{H^+}]$, so $[\\mathrm{H^+}] = 10^{-\\mathrm{pH}}$. Pure water at 25°C has $[\\mathrm{H^+}] = 10^{-7}\\,\\text{mol/L}$, i.e. $\\mathrm{pH} = 7$.',
        'Water self-ionises with $K_w = [\\mathrm{H^+}][\\mathrm{OH^-}] = 10^{-14}$ at 25°C, which gives $\\mathrm{pH} + \\mathrm{pOH} = 14$: an acid’s low pH is mirrored by a high pOH.',
      ],
      advanced: [
        'Buffers resist pH change because they contain a reservoir of a weak acid and its conjugate base; the Henderson–Hasselbalch equation $\\mathrm{pH} = \\mathrm{p}K_a + \\log_{10}\\!\\big([\\mathrm{A^-}]/[\\mathrm{HA}]\\big)$ shows that adding a little strong acid or base mostly shifts the ratio of the two reservoir species rather than the free $[\\mathrm{H^+}]$ itself, which is why blood and lab buffers hold pH nearly constant.',
      ],
    },
    derivation: [
      { tex: r`[\mathrm{H^+}] \text{ ranges over many orders of magnitude}`, note: 'From about $1\\,\\text{mol/L}$ in strong acid to $10^{-14}\\,\\text{mol/L}$ in strong base — too wide a range for a linear scale to be useful.' },
      { tex: r`\mathrm{pH} \equiv -\log_{10}[\mathrm{H^+}]`, note: 'Taking a log turns that huge multiplicative range into a small, additive one, roughly 0 to 14.' },
      { tex: r`\Delta[\mathrm{H^+}] \times 10 \;\Longleftrightarrow\; \Delta\mathrm{pH} = 1`, note: 'Because $\\log_{10}(10x) = \\log_{10}x + 1$, every ×10 in concentration is exactly one pH unit.' },
    ],
    realWorld: [
      { title: 'Blood chemistry', text: 'Human blood is buffered tightly between pH 7.35 and 7.45; drifting outside that narrow band is medically dangerous.' },
      { title: 'Soil and agriculture', text: 'Crops have preferred soil pH ranges; farmers add lime (base) or sulfur (acid) to shift it.' },
      { title: 'Swimming pools', text: 'Pool chemistry is kept near pH 7.4 — too acidic corrodes equipment, too basic lets chlorine stop working.' },
      { title: 'Ocean acidification', text: 'Absorbed $\\mathrm{CO_2}$ has dropped average ocean pH by about 0.1 — a seemingly small number that is really a ~30% rise in hydrogen-ion concentration.' },
    ],
  },
  {
    id: 'dilution-molarity',
    title: 'Molarity and dilution',
    subject: 'chemistry',
    difficulty: 'high-school',
    equation: r`C_1 V_1 = C_2 V_2`,
    summary: 'Diluting a solution never changes how many moles of solute are present — only the volume they are spread through, so concentration and volume trade off exactly.',
    concepts: ['molarity', 'moles', 'concentration', 'volume', 'dilution'],
    prerequisites: ['function-graph'],
    related: ['ph-scale', 'chemical-reaction'],
    visualization: {
      type: 'function-plot',
      options: { expr: 'C1*V1/x', domain: [0.5, 10], range: [0, 5], mode: 'plain' },
    },
    parameters: {
      C1: { label: 'starting concentration C₁', min: 0.1, max: 5, step: 0.1, value: 2, unit: 'mol/L' },
      V1: { label: 'starting volume V₁', min: 0.1, max: 5, step: 0.1, value: 1, unit: 'L' },
      x: { label: 'final volume V₂', min: 0.5, max: 10, step: 0.1, value: 2, unit: 'L' },
    },
    variables: [
      { symbol: 'C', meaning: 'molarity — moles of solute per litre of solution' },
      { symbol: 'V_1, V_2', meaning: 'volume before and after dilution' },
      { symbol: 'n', meaning: 'moles of solute, $n = C_1 V_1$, unchanged by adding solvent' },
    ],
    explanation: {
      intuition: [
        'Drag the final-volume point x along the curve: as you add more solvent (larger V₂), the concentration C₂ traces a falling curve, never a straight line — doubling the volume exactly halves the concentration, tripling it exactly thirds the concentration. That shape, $y = k/x$, is the signature of “fixed quantity spread over a variable size”.',
        'Raise C₁ or V₁ instead and the whole curve scales upward — you started with more moles of solute, so for any final volume the diluted concentration is higher. The moles you began with, $C_1V_1$, is the one number that survives dilution unchanged; everything else is just geometry.',
      ],
      formal: [
        'Molarity is defined $C = n/V$, so the moles present are $n = CV$. Dilution adds solvent only, so $n$ is constant: $C_1V_1 = n = C_2V_2$.',
        'Solving for the new concentration, $C_2 = \\dfrac{C_1V_1}{V_2}$ — an inverse relationship between concentration and final volume, exactly the curve you are dragging along.',
      ],
      advanced: [
        'The same bookkeeping — a conserved quantity partitioned across a changing extensive variable — underlies far more than chemistry: pressure and volume in an isothermal gas ($PV = \\text{const}$), or density and volume for a fixed mass, all trace the same rectangular hyperbola.',
      ],
    },
    derivation: [
      { tex: r`n = C_1 V_1`, note: 'Moles of solute in the original, concentrated solution.' },
      { tex: r`\text{add solvent: } n \text{ unchanged}, \quad V_1 \to V_2`, note: 'Diluting adds only solvent — no solute is added or removed.' },
      { tex: r`C_2 = \frac{n}{V_2} = \frac{C_1V_1}{V_2}`, note: 'Same moles, larger volume, proportionally smaller concentration.' },
    ],
    realWorld: [
      { title: 'Lab work', text: 'Chemists routinely make a dilute working solution from a concentrated stock using exactly $C_1V_1 = C_2V_2$.' },
      { title: 'Medicine dosing', text: 'IV drug concentrations are diluted to safe, precise levels using the same relationship.' },
      { title: 'Cooking', text: 'Diluting concentrated juice or stock with water is dilution — the same mass of flavour compounds, spread thinner.' },
      { title: 'Environmental science', text: 'Pollutant concentration in a river drops as it mixes with more water downstream — the pollutant load is conserved even as its concentration falls.' },
    ],
  },
  {
    id: 'reaction-rate',
    title: 'Reaction rate and the Arrhenius equation',
    subject: 'chemistry',
    difficulty: 'university',
    equation: r`[\mathrm{A}] = [\mathrm{A}]_0\, e^{-kt}, \qquad k = A_f\, e^{-E_a/RT}`,
    summary: 'For a first-order reaction, concentration decays exponentially with a rate constant $k$ that is itself exponentially sensitive to temperature — which is why a small temperature rise can dramatically speed a reaction up.',
    concepts: ['rate-law', 'rate-constant', 'activation-energy', 'arrhenius-equation', 'catalyst'],
    prerequisites: ['exponential-growth', 'derivative'],
    related: ['chemical-equilibrium', 'entropy-and-heat-engines'],
    visualization: {
      type: 'function-plot',
      options: {
        expr: 'A0*exp(-(Af*exp(-Ea/(8.314*T)))*x)',
        domain: [0, 100],
        range: [0, 1.2],
        mode: 'tangent',
      },
    },
    charts: [
      {
        title: 'Rate constant k rises steeply with temperature',
        xLabel: 'T (K)',
        yLabel: 'k (1/s)',
        domain: [250, 400],
        marker: 'T',
        series: [{ label: 'k = Af·exp(−Ea/RT)', expr: 'Af*exp(-Ea/(8.314*x))' }],
      },
    ],
    parameters: {
      A0: { label: 'initial concentration [A]₀', min: 0.1, max: 2, step: 0.05, value: 1, unit: 'mol/L' },
      Af: { label: 'pre-exponential factor Aƒ', min: 1000000, max: 50000000, step: 1000000, value: 10000000, unit: '1/s' },
      Ea: { label: 'activation energy Ea', min: 20000, max: 80000, step: 1000, value: 48570, unit: 'J/mol' },
      T: { label: 'temperature T', min: 250, max: 400, step: 1, value: 300, unit: 'K' },
      x: { label: 'time t', min: 0, max: 100, step: 0.5, value: 20, unit: 's' },
    },
    variables: [
      { symbol: '[\\mathrm{A}]', meaning: 'concentration of the reactant at time t' },
      { symbol: 'k', meaning: 'rate constant, set by temperature via the Arrhenius equation' },
      { symbol: 'E_a', meaning: 'activation energy — the energy barrier molecules must clear to react' },
      { symbol: 'A_f', meaning: 'pre-exponential (frequency) factor — how often molecules collide with the right orientation' },
    ],
    explanation: {
      intuition: [
        'Drag the time point x along the curve: the tangent line is the instantaneous rate, steep and fast right at the start when there is a lot of reactant, flattening out as [A] is used up — the rate is always proportional to how much is left, the same feedback pattern as radioactive decay.',
        'Now drag temperature T upward instead. The whole curve collapses toward zero much faster, even though T only moved a little — because T sits inside a nested exponential in the Arrhenius equation, a modest temperature rise multiplies k, and hence the rate, by a large factor. That extreme sensitivity is why a 10°C rise can roughly double many everyday reaction rates.',
      ],
      formal: [
        'A first-order rate law $\\dfrac{d[\\mathrm{A}]}{dt} = -k[\\mathrm{A}]$ integrates to $[\\mathrm{A}] = [\\mathrm{A}]_0 e^{-kt}$, the same differential equation as exponential decay.',
        'The Arrhenius equation $k = A_f e^{-E_a/RT}$ says only the fraction of molecular collisions with kinetic energy at least $E_a$ contribute to reaction — that fraction is set by the Boltzmann distribution, and it grows sharply with $T$.',
      ],
      advanced: [
        'A catalyst provides an alternative reaction pathway with a lower $E_a$ without being consumed itself; because $k$ depends exponentially on $E_a$, even a modest reduction in activation energy produces a large increase in rate — this is why enzymes, with active sites that stabilise the transition state, can accelerate biochemical reactions by many orders of magnitude.',
      ],
    },
    derivation: [
      { tex: r`\frac{d[\mathrm{A}]}{dt} = -k[\mathrm{A}]`, note: 'First-order rate law: the rate is proportional to how much reactant remains.' },
      { tex: r`\int \frac{d[\mathrm{A}]}{[\mathrm{A}]} = -k\int dt \;\Rightarrow\; \ln[\mathrm{A}] = -kt + \ln[\mathrm{A}]_0`, note: 'Separate variables and integrate, exactly as for exponential decay.' },
      { tex: r`[\mathrm{A}] = [\mathrm{A}]_0 e^{-kt}, \qquad k = A_f e^{-E_a/RT}`, note: 'Exponentiate; substitute the Arrhenius form for how $k$ depends on temperature.' },
    ],
    realWorld: [
      { title: 'Cooking', text: 'Heat speeds up the Maillard browning reactions in food — higher T means dramatically larger k.' },
      { title: 'Refrigeration', text: 'Cooling food slows the reactions and microbial growth that cause spoilage by shrinking k.' },
      { title: 'Industrial catalysts', text: 'The Haber process for ammonia uses an iron catalyst to lower $E_a$ enough to be commercially viable at moderate temperature.' },
      { title: 'Enzymes in the body', text: 'Body-temperature reactions that would otherwise be far too slow to sustain life proceed quickly because enzymes lower the activation energy.' },
    ],
  },
  {
    id: 'chemical-equilibrium',
    title: 'Dynamic equilibrium',
    subject: 'chemistry',
    difficulty: 'university',
    equation: r`\mathrm{A} \rightleftharpoons \mathrm{B}, \qquad K = \frac{k_f}{k_r}`,
    summary: 'A reversible reaction does not stop — it settles into a dynamic balance where the forward and reverse reactions proceed at equal rates, leaving concentrations constant but far from zero on either side.',
    concepts: ['equilibrium', 'equilibrium-constant', 'forward-rate', 'reverse-rate', 'le-chateliers-principle'],
    prerequisites: ['reaction-rate'],
    related: ['chemical-reaction', 'reaction-rate'],
    visualization: {
      type: 'function-plot',
      options: {
        expr: 'A0*(kr + kf*exp(-(kf+kr)*x))/(kf+kr)',
        domain: [0, 20],
        range: [0, 1.1],
        mode: 'plain',
      },
    },
    charts: [
      {
        title: '[A] falls while [B] rises, both levelling off at equilibrium',
        xLabel: 't (s)',
        yLabel: 'concentration (mol/L)',
        domain: [0, 20],
        marker: 'x',
        series: [
          { label: '[A]', expr: 'A0*(kr + kf*exp(-(kf+kr)*x))/(kf+kr)' },
          { label: '[B] = A0 − [A]', expr: 'A0 - (A0*(kr + kf*exp(-(kf+kr)*x))/(kf+kr))' },
        ],
      },
    ],
    parameters: {
      A0: { label: 'initial [A]₀', min: 0.2, max: 2, step: 0.1, value: 1, unit: 'mol/L' },
      kf: { label: 'forward rate constant kƒ', min: 0.01, max: 1, step: 0.01, value: 0.3, unit: '1/s' },
      kr: { label: 'reverse rate constant kᵣ', min: 0.01, max: 1, step: 0.01, value: 0.1, unit: '1/s' },
      x: { label: 'time t', min: 0, max: 20, step: 0.1, value: 5, unit: 's' },
    },
    variables: [
      { symbol: '[\\mathrm{A}], [\\mathrm{B}]', meaning: 'concentrations of reactant and product' },
      { symbol: 'k_f, k_r', meaning: 'forward and reverse rate constants' },
      { symbol: 'K', meaning: 'equilibrium constant, $K = k_f/k_r$, the equilibrium ratio $[\\mathrm{B}]/[\\mathrm{A}]$' },
    ],
    explanation: {
      intuition: [
        'Drag the time point x along the curve: [A] falls quickly at first, then flattens — not to zero, but to a fixed positive level. It flattens because the reaction never actually stops; A is still turning into B and B is still turning back into A, but at equal rates, so the concentrations stop changing even though molecules keep converting both ways.',
        'Raise kƒ relative to kᵣ and the plateau shifts lower — equilibrium favours B more strongly. This is the microscopic picture behind Le Chatelier’s principle: nudging the balance of rates (by changing concentration, temperature, or pressure) shifts where the system settles, without ever truly stopping the underlying back-and-forth.',
      ],
      formal: [
        'With $\\mathrm{A} \\underset{k_r}{\\overset{k_f}{\\rightleftharpoons}} \\mathrm{B}$ and mass balance $[\\mathrm{B}] = [\\mathrm{A}]_0 - [\\mathrm{A}]$, the net rate $\\dfrac{d[\\mathrm{A}]}{dt} = -k_f[\\mathrm{A}] + k_r[\\mathrm{B}]$ is a linear ODE with an exponential approach to a constant.',
        'At equilibrium $\\dfrac{d[\\mathrm{A}]}{dt} = 0$, so $k_f[\\mathrm{A}]_{eq} = k_r[\\mathrm{B}]_{eq}$, giving the equilibrium constant $K = k_f/k_r = [\\mathrm{B}]_{eq}/[\\mathrm{A}]_{eq}$.',
      ],
      advanced: [
        'Le Chatelier’s principle is a consequence, not a separate law: perturbing $[\\mathrm{A}]$, $[\\mathrm{B}]$, or (through their temperature dependence) $k_f$ and $k_r$ changes the instantaneous net rate away from zero, and the same first-order relaxation dynamics carries the system to a new equilibrium consistent with the new $K$.',
      ],
    },
    derivation: [
      { tex: r`\frac{d[\mathrm{A}]}{dt} = -k_f[\mathrm{A}] + k_r([\mathrm{A}]_0 - [\mathrm{A}])`, note: 'Forward reaction removes A; reverse reaction, fed by B, restores it.' },
      { tex: r`\frac{d[\mathrm{A}]}{dt} = -(k_f+k_r)[\mathrm{A}] + k_r[\mathrm{A}]_0`, note: 'Collect terms: a linear ODE relaxing toward a fixed point.' },
      { tex: r`[\mathrm{A}] = \frac{[\mathrm{A}]_0\big(k_r + k_f e^{-(k_f+k_r)t}\big)}{k_f + k_r}`, note: 'Solve; as $t\\to\\infty$ this approaches the equilibrium value $[\\mathrm{A}]_0 k_r/(k_f+k_r)$.' },
    ],
    realWorld: [
      { title: 'Haber process', text: 'Ammonia synthesis is a genuine equilibrium; engineers choose pressure and temperature to push it toward more product without stopping the reverse reaction entirely.' },
      { title: 'Blood oxygen transport', text: 'Haemoglobin binding oxygen is a reversible equilibrium — release in tissues and uptake in the lungs both rely on the balance shifting with local concentration.' },
      { title: 'Carbonated drinks', text: '$\\mathrm{CO_2}$ dissolved in a sealed bottle is in equilibrium with gaseous $\\mathrm{CO_2}$ above it; opening the bottle shifts that balance and it fizzes.' },
      { title: 'Solubility equilibria', text: 'A saturated salt solution with undissolved crystals at the bottom is at dynamic equilibrium — dissolving and recrystallising continue at equal rates.' },
    ],
  },
  {
    id: 'first-law-thermodynamics',
    title: 'The first law: energy, heat, and work',
    subject: 'thermodynamics',
    difficulty: 'university',
    equation: r`\Delta U = Q - W, \qquad W = \int_{V_1}^{V_2} P\,dV`,
    summary: 'Energy is conserved: whatever internal energy a gas gains equals the heat added minus the work it does expanding — and that work is exactly the area under its pressure–volume curve.',
    concepts: ['internal-energy', 'heat', 'work', 'pressure-volume-work', 'isothermal-process'],
    prerequisites: ['area-under-curve', 'integral'],
    related: ['entropy-and-heat-engines', 'ideal-gas-law'],
    visualization: {
      type: 'function-plot',
      options: { expr: 'n*8.314*T/x', domain: [0.5, 10], range: [0, 5200], mode: 'area' },
    },
    parameters: {
      n: { label: 'amount of gas n', min: 0.1, max: 5, step: 0.1, value: 1, unit: 'mol' },
      T: { label: 'temperature T', min: 200, max: 500, step: 10, value: 300, unit: 'K' },
      a: { label: 'initial volume V₁', min: 0.5, max: 9, step: 0.1, value: 1, unit: 'L' },
      b: { label: 'final volume V₂', min: 1, max: 10, step: 0.1, value: 5, unit: 'L' },
    },
    variables: [
      { symbol: 'U', meaning: 'internal energy of the gas' },
      { symbol: 'Q', meaning: 'heat added to the gas (positive) or removed (negative)' },
      { symbol: 'W', meaning: 'work done by the gas as it expands, the shaded area under P(V)' },
      { symbol: 'P, V, T', meaning: 'pressure, volume, and absolute temperature of the gas' },
    ],
    explanation: {
      intuition: [
        'Drag a and b to set the start and end volume of the expansion. The shaded region under the curve is the work the gas does pushing outward — widen the shaded strip and you can see directly why expanding further, or starting at higher pressure, always means more work done, exactly the way the area under a velocity curve is distance.',
        'Raise T with a and b fixed and the whole P–V curve lifts upward, so the same shaded interval covers more area — hotter gas pushes harder at every volume, so the same expansion does more work. This is the P–V picture behind “heating a gas lets it do more work”, the core idea of every heat engine.',
      ],
      formal: [
        'The first law states $\\Delta U = Q - W$: internal energy changes by whatever heat comes in minus whatever work goes out.',
        'For a gas expanding at (quasi-)constant conditions, work is $W = \\int_{V_1}^{V_2} P\\,dV$ — the signed area under the P–V curve between the two volumes.',
      ],
      advanced: [
        'For an ideal gas held at constant temperature, $U$ depends on $T$ alone, so an isothermal expansion has $\\Delta U = 0$ and therefore $Q = W = nRT\\ln(V_2/V_1)$ — all the heat absorbed is converted directly into work, with no change in internal energy, a special case that will later contrast sharply with the adiabatic and Carnot-cycle processes used in real engines.',
      ],
    },
    derivation: [
      { tex: r`P = \frac{nRT}{V}`, note: 'Ideal gas law, rearranged to give pressure as a function of volume at fixed $n, T$.' },
      { tex: r`W = \int_{V_1}^{V_2} \frac{nRT}{V}\,dV = nRT\big[\ln V\big]_{V_1}^{V_2}`, note: 'Integrate the P–V curve — temperature is constant so it comes outside the integral.' },
      { tex: r`W = nRT\ln\!\frac{V_2}{V_1}, \qquad \Delta U = 0 \;\Rightarrow\; Q = W`, note: 'Isothermal ideal gas: internal energy is unchanged, so all absorbed heat becomes work.' },
    ],
    realWorld: [
      { title: 'Car engines', text: 'Each piston stroke is a P–V expansion; the enclosed area of the whole cycle on a P–V diagram is the net work per cycle.' },
      { title: 'Compressed air tools', text: 'Releasing compressed air does mechanical work as it expands, cooling in the process exactly as the first law predicts.' },
      { title: 'Weather', text: 'Rising air parcels expand and cool as they do work pushing against lower surrounding pressure — the same P–V work at planetary scale.' },
      { title: 'Refrigerators', text: 'A refrigerant is compressed (work done on it) and later expands (work done by it), moving heat against its natural direction using externally supplied work.' },
    ],
  },
  {
    id: 'entropy-and-heat-engines',
    title: 'Entropy and the limits of heat engines',
    subject: 'thermodynamics',
    difficulty: 'university',
    equation: r`\eta_{\text{Carnot}} = 1 - \frac{T_c}{T_h}`,
    summary: 'No engine can turn all its heat into work — the second law caps every heat engine’s efficiency below 100%, and that cap depends only on the hot and cold reservoir temperatures.',
    concepts: ['second-law', 'entropy', 'carnot-efficiency', 'heat-engine', 'reversibility'],
    prerequisites: ['first-law-thermodynamics'],
    related: ['first-law-thermodynamics', 'specific-heat'],
    visualization: {
      type: 'function-plot',
      options: { expr: '1 - Tc/x', domain: [400, 900], range: [0, 1], mode: 'tangent' },
    },
    charts: [
      {
        title: 'Efficiency for several cold-reservoir temperatures',
        xLabel: 'Th (K)',
        yLabel: 'η',
        domain: [400, 900],
        marker: 'x',
        series: [
          { label: 'Tc = 250 K', expr: '1 - 250/x' },
          { label: 'Tc = 300 K', expr: '1 - 300/x' },
          { label: 'Tc = 350 K', expr: '1 - 350/x' },
        ],
      },
    ],
    parameters: {
      Tc: { label: 'cold reservoir Tc', min: 250, max: 350, step: 5, value: 300, unit: 'K' },
      x: { label: 'hot reservoir Th', min: 400, max: 900, step: 5, value: 600, unit: 'K' },
    },
    variables: [
      { symbol: 'T_h, T_c', meaning: 'absolute temperature of the hot and cold reservoirs' },
      { symbol: r`\eta`, meaning: 'efficiency — the fraction of heat input converted into useful work' },
      { symbol: 'S', meaning: 'entropy — roughly, the number of equivalent microscopic ways energy can be arranged' },
    ],
    explanation: {
      intuition: [
        'Drag the hot-reservoir point x to the right: efficiency climbs but visibly bends over, always staying under the horizontal line at 1 — no matter how hot you make the source, some of the heat is thermodynamically required to flow to the cold side unused. The tangent line’s shrinking slope shows the diminishing return of pushing Th higher and higher.',
        'Raise Tc instead and the whole curve drops — a smaller temperature gap between hot and cold means less available work per unit of heat. Engines are fundamentally about that gap, not about either temperature alone; a “hot” engine exhausting into an equally hot environment does no better than a cool one exhausting into the cold.',
      ],
      formal: [
        'The second law forbids any engine operating between two reservoirs from exceeding the Carnot efficiency $\\eta_{\\text{Carnot}} = 1 - T_c/T_h$, achieved only by a reversible cycle.',
        'Equivalently, no process can decrease the total entropy of an isolated system: $\\Delta S_{\\text{total}} \\ge 0$, with equality only for reversible processes — real engines always generate some entropy and so fall short of the Carnot bound.',
      ],
      advanced: [
        'Entropy can be understood statistically as $S = k_B\\ln\\Omega$, where $\\Omega$ is the number of microscopic arrangements consistent with the observed macroscopic state; the second law is then simply the statement that isolated systems evolve toward their overwhelmingly more probable, higher-$\\Omega$ configurations, which is why heat spontaneously flows from hot to cold and not the reverse.',
      ],
    },
    derivation: [
      { tex: r`\eta = \frac{W}{Q_h} = \frac{Q_h - Q_c}{Q_h}`, note: 'Efficiency is useful work out divided by heat drawn from the hot reservoir.' },
      { tex: r`\text{reversible cycle: } \frac{Q_c}{Q_h} = \frac{T_c}{T_h}`, note: 'For a reversible (Carnot) cycle, heat exchanged is proportional to reservoir temperature.' },
      { tex: r`\eta_{\text{Carnot}} = 1 - \frac{Q_c}{Q_h} = 1 - \frac{T_c}{T_h}`, note: 'Substitute; this is the maximum efficiency any engine can achieve between $T_h$ and $T_c$.' },
    ],
    realWorld: [
      { title: 'Power plants', text: 'Steam turbines are built to run at the highest practical Th and lowest practical Tc precisely to push efficiency toward the Carnot limit.' },
      { title: 'Car engines', text: 'Real combustion engines achieve well under 40% efficiency — friction, heat loss, and irreversibility all add entropy beyond the Carnot minimum.' },
      { title: 'Refrigerators and heat pumps', text: 'Running the same cycle in reverse moves heat from cold to hot using work — bounded by the same Tc/Th ratio, now expressed as a coefficient of performance.' },
      { title: 'Why perpetual motion fails', text: 'A “free energy” machine claiming 100% conversion of heat to work at any finite temperature gap violates the second law, which is why every such device in history has failed.' },
    ],
  },
  {
    id: 'specific-heat',
    title: 'Specific heat and latent heat',
    subject: 'thermodynamics',
    difficulty: 'high-school',
    equation: r`Q = mc\Delta T, \qquad Q = mL`,
    summary: 'Heating a substance raises its temperature smoothly — except during a phase change, where every joule goes into breaking or forming bonds instead, and the temperature holds perfectly flat.',
    concepts: ['specific-heat-capacity', 'latent-heat', 'phase-change', 'enthalpy'],
    prerequisites: ['area-under-curve'],
    related: ['first-law-thermodynamics', 'entropy-and-heat-engines'],
    visualization: {
      type: 'function-plot',
      options: {
        expr: 't1 = m*41800/P; t2 = t1 + m*334000/P; t3 = t2 + m*418600/P; x < t1 ? -20 + P*x/(m*2090) : (x < t2 ? 0 : (x < t3 ? 100*(x - t2)/(t3 - t2) : 100))',
        domain: [0, 450],
        range: [-25, 110],
        mode: 'plain',
      },
    },
    parameters: {
      P: { label: 'heating power P', min: 200, max: 2000, step: 50, value: 1000, unit: 'W' },
      m: { label: 'mass of ice/water m', min: 0.1, max: 2, step: 0.1, value: 0.5, unit: 'kg' },
      x: { label: 'time t', min: 0, max: 450, step: 1, value: 100, unit: 's' },
    },
    variables: [
      { symbol: 'Q', meaning: 'heat energy delivered' },
      { symbol: 'c', meaning: 'specific heat capacity — energy to raise 1 kg by 1°C' },
      { symbol: 'L', meaning: 'latent heat — energy to change phase with no temperature change' },
      { symbol: 'm', meaning: 'mass being heated' },
    ],
    explanation: {
      intuition: [
        'Drag the time point x forward and follow the temperature: it climbs steadily as ice warms, then suddenly goes flat at 0°C even though the heater keeps running — that plateau is the ice melting. All the energy during the flat stretch is going into breaking the crystal structure, none of it into temperature.',
        'Keep dragging and temperature resumes climbing through liquid water, then flattens again at 100°C for boiling. Raise the heating power P and every stage compresses sideways — same total energy needed, delivered faster; raise the mass m instead and every stage stretches out, because there is simply more material to heat and melt.',
      ],
      formal: [
        'While no phase change is occurring, $Q = mc\\Delta T$: heat delivered is proportional to mass, specific heat capacity, and temperature rise, so $T$ rises linearly in time for constant power.',
        'During a phase change, $Q = mL$ with temperature held fixed: the plateau length in time is $mL/P$, proportional to mass and latent heat, inversely proportional to power.',
      ],
      advanced: [
        'The energy absorbed during melting or boiling is really a change in enthalpy at constant pressure, $\\Delta H = mL$, and at the molecular level it goes entirely into breaking intermolecular bonds (hydrogen bonds, for water) rather than increasing average kinetic energy — which is exactly why temperature, a measure of average kinetic energy, does not move during the plateau.',
      ],
    },
    derivation: [
      { tex: r`Q_{\text{ice}} = mc_{\text{ice}}\big(0 - (-20)\big), \quad t_1 = \frac{Q_{\text{ice}}}{P}`, note: 'Time to warm ice from −20°C to 0°C at constant power P.' },
      { tex: r`Q_{\text{melt}} = mL_f, \quad t_2 = t_1 + \frac{Q_{\text{melt}}}{P}`, note: 'Time added by the melting plateau: energy goes into latent heat, not temperature.' },
      { tex: r`Q_{\text{water}} = mc_{\text{water}}(100 - 0), \quad t_3 = t_2 + \frac{Q_{\text{water}}}{P}`, note: 'Time added heating liquid water up to boiling; the curve is built by chaining these three stages plus the plateaus.' },
    ],
    realWorld: [
      { title: 'Cooking', text: 'Water stays at a rolling 100°C boil no matter how high the stove is turned — extra heat just boils it faster, it never gets hotter at sea level.' },
      { title: 'Ice packs', text: 'Ice at 0°C absorbs a large amount of heat while melting without warming up, making it far more effective at cooling than the same mass of cold water.' },
      { title: 'Climate moderation', text: 'Oceans have a high specific heat capacity, so coastal climates change temperature more slowly than inland regions for the same energy input.' },
      { title: 'Steam burns', text: 'Steam at 100°C carries far more energy than boiling water at the same temperature, because of the latent heat released when it condenses on skin.' },
    ],
  },
]
