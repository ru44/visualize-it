import { defineAsyncComponent, type Component } from 'vue'

const FunctionPlot = defineAsyncComponent(() => import('./FunctionPlot.vue'))
const RightTriangle = defineAsyncComponent(() => import('./RightTriangle.vue'))
const CircleViz = defineAsyncComponent(() => import('./CircleViz.vue'))
const UnitCircle = defineAsyncComponent(() => import('./UnitCircle.vue'))
const BlockForce = defineAsyncComponent(() => import('./BlockForce.vue'))
const OhmCircuit = defineAsyncComponent(() => import('./OhmCircuit.vue'))
const Airfoil = defineAsyncComponent(() => import('./Airfoil.vue'))
const Venturi = defineAsyncComponent(() => import('./Venturi.vue'))
const ElectricField = defineAsyncComponent(() => import('./ElectricField.vue'))
const LorentzForce = defineAsyncComponent(() => import('./LorentzForce.vue'))
const SeriesParallel = defineAsyncComponent(() => import('./SeriesParallel.vue'))
const Reaction = defineAsyncComponent(() => import('./Reaction.vue'))
const AtomShells = defineAsyncComponent(() => import('./AtomShells.vue'))
const Counting = defineAsyncComponent(() => import('./Counting.vue'))
const DiscreteDist = defineAsyncComponent(() => import('./DiscreteDist.vue'))
const CoinFlips = defineAsyncComponent(() => import('./CoinFlips.vue'))
const BayesGrid = defineAsyncComponent(() => import('./BayesGrid.vue'))
const Surface3D = defineAsyncComponent(() => import('./Surface3D.vue'))
const GasBox = defineAsyncComponent(() => import('./GasBox.vue'))

/**
 * Every visualization receives `params` (live values) and `options` (from the lesson),
 * and emits `set(name, value)` when the user manipulates it directly.
 */
export const vizRegistry: Record<string, Component> = {
  'function-plot': FunctionPlot,
  'right-triangle': RightTriangle,
  circle: CircleViz,
  'unit-circle': UnitCircle,
  'block-force': BlockForce,
  'ohm-circuit': OhmCircuit,
  'gas-box': GasBox,
  'surface-3d': Surface3D,
  counting: Counting,
  'discrete-dist': DiscreteDist,
  'coin-flips': CoinFlips,
  'bayes-grid': BayesGrid,
  'airfoil': Airfoil,
  'venturi': Venturi,
  'electric-field': ElectricField,
  'lorentz-force': LorentzForce,
  'series-parallel': SeriesParallel,
  'reaction': Reaction,
  'atom-shells': AtomShells,
}
