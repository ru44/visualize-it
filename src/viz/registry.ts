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
const OdeSystem = defineAsyncComponent(() => import('./OdeSystem.vue'))
const LogicGates = defineAsyncComponent(() => import('./LogicGates.vue'))
const SortSteps = defineAsyncComponent(() => import('./SortSteps.vue'))
const GraphSearch = defineAsyncComponent(() => import('./GraphSearch.vue'))
const BitsViz = defineAsyncComponent(() => import('./BitsViz.vue'))
const GradientFit = defineAsyncComponent(() => import('./GradientFit.vue'))
const Diffusion = defineAsyncComponent(() => import('./Diffusion.vue'))
const MoonPhases = defineAsyncComponent(() => import('./MoonPhases.vue'))
const SupplyDemand = defineAsyncComponent(() => import('./SupplyDemand.vue'))
const Sampling = defineAsyncComponent(() => import('./Sampling.vue'))
const MatrixTransform = defineAsyncComponent(() => import('./MatrixTransform.vue'))
const ComplexPlane = defineAsyncComponent(() => import('./ComplexPlane.vue'))
const RayOptics = defineAsyncComponent(() => import('./RayOptics.vue'))
const Buoyancy = defineAsyncComponent(() => import('./Buoyancy.vue'))
const PeriodicTable = defineAsyncComponent(() => import('./PeriodicTable.vue'))
const CipherWheel = defineAsyncComponent(() => import('./CipherWheel.vue'))
const ModClock = defineAsyncComponent(() => import('./ModClock.vue'))
const VennSets = defineAsyncComponent(() => import('./VennSets.vue'))
const PolyFit = defineAsyncComponent(() => import('./PolyFit.vue'))
const NeuralNet = defineAsyncComponent(() => import('./NeuralNet.vue'))
const Embeddings = defineAsyncComponent(() => import('./Embeddings.vue'))
const NextToken = defineAsyncComponent(() => import('./NextToken.vue'))
const DotGrid = defineAsyncComponent(() => import('./DotGrid.vue'))
const PowersOfTen = defineAsyncComponent(() => import('./PowersOfTen.vue'))
const Chessboard = defineAsyncComponent(() => import('./Chessboard.vue'))
const Sieve = defineAsyncComponent(() => import('./Sieve.vue'))
const QueryTable = defineAsyncComponent(() => import('./QueryTable.vue'))
const SearchRace = defineAsyncComponent(() => import('./SearchRace.vue'))
const MapReduce = defineAsyncComponent(() => import('./MapReduce.vue'))
const Photoelectric = defineAsyncComponent(() => import('./Photoelectric.vue'))
const DoubleSlit = defineAsyncComponent(() => import('./DoubleSlit.vue'))
const WaveFunction = defineAsyncComponent(() => import('./WaveFunction.vue'))
const EnergyLevels = defineAsyncComponent(() => import('./EnergyLevels.vue'))
const Qubit = defineAsyncComponent(() => import('./Qubit.vue'))
const FreeFall = defineAsyncComponent(() => import('./FreeFall.vue'))
const XorCipher = defineAsyncComponent(() => import('./XorCipher.vue'))
const FrequencyAnalysis = defineAsyncComponent(() => import('./FrequencyAnalysis.vue'))
const HashAvalanche = defineAsyncComponent(() => import('./HashAvalanche.vue'))
const ToySPN = defineAsyncComponent(() => import('./ToySPN.vue'))
const EllipticCurve = defineAsyncComponent(() => import('./EllipticCurve.vue'))
const RotationCurve = defineAsyncComponent(() => import('./RotationCurve.vue'))
const Lensing = defineAsyncComponent(() => import('./Lensing.vue'))
const Expansion = defineAsyncComponent(() => import('./Expansion.vue'))
const QuarkBuilder = defineAsyncComponent(() => import('./QuarkBuilder.vue'))
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
  'ode-system': OdeSystem,
  'logic-gates': LogicGates,
  'sort-steps': SortSteps,
  'graph-search': GraphSearch,
  bits: BitsViz,
  'gradient-fit': GradientFit,
  diffusion: Diffusion,
  'moon-phases': MoonPhases,
  'supply-demand': SupplyDemand,
  sampling: Sampling,
  'matrix-transform': MatrixTransform,
  'complex-plane': ComplexPlane,
  'ray-optics': RayOptics,
  buoyancy: Buoyancy,
  'periodic-table': PeriodicTable,
  'cipher-wheel': CipherWheel,
  'mod-clock': ModClock,
  'venn-sets': VennSets,
  'poly-fit': PolyFit,
  'neural-net': NeuralNet,
  embeddings: Embeddings,
  'next-token': NextToken,
  'dot-grid': DotGrid,
  'powers-of-ten': PowersOfTen,
  'chessboard': Chessboard,
  'sieve': Sieve,
  'query-table': QueryTable,
  'search-race': SearchRace,
  'map-reduce': MapReduce,
  'photoelectric': Photoelectric,
  'double-slit': DoubleSlit,
  'wave-function': WaveFunction,
  'energy-levels': EnergyLevels,
  'qubit': Qubit,
  'free-fall': FreeFall,
  'xor-cipher': XorCipher,
  'frequency-analysis': FrequencyAnalysis,
  'hash-avalanche': HashAvalanche,
  'toy-spn': ToySPN,
  'elliptic-curve': EllipticCurve,
  'rotation-curve': RotationCurve,
  'lensing': Lensing,
  'expansion': Expansion,
  'quark-builder': QuarkBuilder,
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
