// Finds every symbol a formula uses, so the build can insist each one is explained somewhere.
// Returns tokens such as: \alpha  \int  C_L  \dot{m}  x  '  !
const LAYOUT = new Set(['left', 'right', 'big', 'Big', 'bigg', 'Bigg', 'quad', 'qquad', 'displaystyle', 'tfrac', 'dfrac', 'frac', 'sqrt', 'begin', 'end', 'mathrm', 'text', 'operatorname', 'mathbf', 'boldsymbol', 'vec', 'hat', 'bar', 'overline', 'underline', 'limits', 'nolimits', 'dbinom', 'tbinom', 'binom', 'xrightarrow', 'label', 'phantom', 'hspace', 'vspace', 'checkmark', 'tfrac', 'stackrel', 'substack', 'array', 'cases', 'aligned', 'pmatrix', 'bmatrix', 'matrix', 'rm', 'it', 'bf', 'sf', 'scriptstyle', 'scriptscriptstyle', 'textstyle', 'thinspace', 'negthinspace', 'cdot', 'times', 'pm', 'mp', 'Rightarrow', 'iff', 'to', 'rightarrow', 'leftarrow', 'approx', 'ne', 'neq', 'le', 'leq', 'ge', 'geq', 'll', 'gg', 'cdots', 'dots', 'ldots', 'vdots', 'ddots', 'langle', 'rangle', 'lvert', 'rvert', 'lVert', 'rVert', 'mid', 'colon', 'setminus', 'in', 'notin', 'subseteq', 'subset', 'cup', 'cap', 'emptyset', 'forall', 'exists', 'neg', 'lor', 'land', 'oplus', 'odot', 'equiv', 'sim', 'simeq', 'cong', 'propto', 'infty', 'partial', 'nabla', 'int', 'iint', 'oint', 'sum', 'prod', 'lim', 'sin', 'cos', 'tan', 'cot', 'sec', 'csc', 'arcsin', 'arccos', 'arctan', 'atan', 'sinh', 'cosh', 'tanh', 'log', 'ln', 'exp', 'max', 'min', 'sup', 'inf', 'det', 'dim', 'ker', 'deg', 'gcd', 'erf', 'mathbb', 'mathcal', 'mathscr', 'mathfrak', 'dot', 'ddot', 'tilde', 'prime', 'circ', 'degree', 'ast', 'star', 'bullet', 'top', 'bot', 'perp', 'parallel', 'angle', 'triangle', 'square', 'Box', 'ell', 'hbar', 'imath', 'jmath', 'wp', 'Re', 'Im', 'aleph', 'implies', 'impliedby', 'longrightarrow', 'Longrightarrow', 'mapsto', 'uparrow', 'downarrow', 'leftrightarrow', 'Leftrightarrow', 'not', 'over', 'atop', 'choose', 'above', 'ge', 'le', 'underset', 'overset', 'Longleftrightarrow', 'Leftrightarrow', 'longleftrightarrow', 'rightleftharpoons', 'gets', 'searrow', 'nearrow', 'arg', 'operatorname'])
// Of those, the ones a learner needs explained (the rest are pure layout or decoration):
const EXPLAIN = new Set(['Delta', 'nabla', 'partial', 'int', 'iint', 'oint', 'sum', 'prod', 'lim', 'infty', 'propto', 'approx', 'pm', 'mp', 'to', 'Rightarrow', 'iff', 'mid', 'binom', 'dbinom', 'sqrt', 'frac', 'dfrac', 'tfrac', 'dot', 'ddot', 'hat', 'bar', 'vec', 'mathbf', 'mathbb', 'langle', 'in', 'subseteq', 'cup', 'cap', 'cdot', 'times', 'sin', 'cos', 'tan', 'arctan', 'atan', 'log', 'ln', 'exp', 'tanh', 'max', 'min', 'erf', 'ne', 'neq', 'le', 'leq', 'ge', 'geq', 'll', 'gg', 'dots', 'cdots', 'text', 'mathrm', 'operatorname', 'rightleftharpoons', 'gets', 'searrow', 'nearrow', 'arg'])
const CANON: Record<string, string> = { dfrac: 'frac', tfrac: 'frac', dbinom: 'binom', neq: 'ne', leq: 'le', geq: 'ge', cdots: 'dots', ldots: 'dots', rightarrow: 'to', varepsilon: 'varepsilon', atan: 'arctan', Longleftrightarrow: 'iff', Leftrightarrow: 'iff', longleftrightarrow: 'iff' }

export function symbolsOf(tex: string): string[] {
  const out = new Set<string>()
  // strip \text{…} / \mathrm{…} / \operatorname{…} contents (words, units), and numbers
  let s = tex.replace(/\\\\/g, ' ').replace(/&/g, ' ').replace(/\\(text|mathrm|operatorname|textbf|textit)\s*\{[^{}]*\}/g, (m, cmd) => (out.add('\\' + (cmd === 'mathrm' ? 'mathrm' : 'text')), ' '))
  s = s.replace(/\\(?:left|right)\s*[.(){}\[\]|]/g, ' ').replace(/\\[,;:!> ]/g, ' ')
  // decorated letters: \dot{m} \hat{p} \bar{x} \vec{v}
  s = s.replace(/\\(dot|ddot|hat|bar|vec|tilde)\s*\{?\s*(\\?[A-Za-z]+)\s*\}?/g, (_, cmd, letter) => (out.add('\\' + cmd), out.add(letter), ' '))
  // \mathbb{R} \mathcal{F}
  s = s.replace(/\\(mathbb|mathcal|mathscr)\s*\{[^}]*\}/g, (_, cmd) => (out.add('\\' + cmd), ' '))
  // commands
  s = s.replace(/\\([A-Za-z]+)/g, (_, cmd) => {
    const c = CANON[cmd] ?? cmd
    if (EXPLAIN.has(c) || !LAYOUT.has(c)) out.add('\\' + c)
    return ' '
  })
  // letters with an optional subscript: C_L, v_y, x_0, k_B, C_{L,\max}
  s = s.replace(/([A-Za-z])\s*_\s*(\{[^{}]*\}|[A-Za-z0-9])/g, (_, base, sub) => {
    const clean = sub.replace(/[{}\\]/g, '').replace(/\s+/g, '')
    out.add(`${base}_${clean}`)
    out.add(base)
    return ' '
  })
  for (const m of s.matchAll(/[A-Za-z]/g)) out.add(m[0])
  if (/'/.test(s)) out.add("'")
  if (/(?<![\\!])!(?!=)/.test(s)) out.add('!')
  return [...out]
}

/** Tokens that count as "explained" by a lesson's variable symbol, e.g. "\Delta x" → \Delta, x, \Delta x. */
export function tokensOfVariable(sym: string): string[] {
  const parts = sym.split(/\s*,\s*/)
  const out = new Set<string>()
  for (const p of parts) {
    out.add(p.replace(/\s+/g, ''))
    for (const t of symbolsOf(p)) out.add(t)
    const m = /^([A-Za-z])\s*_\s*\{?([^{}]*)\}?$/.exec(p.replace(/\s+/g, ''))
    if (m) out.add(`${m[1]}_${m[2].replace(/\\/g, '')}`)
  }
  return [...out]
}
