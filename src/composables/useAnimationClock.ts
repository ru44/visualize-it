import { onMounted, onUnmounted, ref, type Ref } from 'vue'

/** True when the viewer asked the OS for reduced motion — every animated sim must honor it. */
export const prefersReducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * The scaffolding every animated sim used to copy-paste: a requestAnimationFrame loop that calls
 * `frame(dt)` with a clamped delta (seconds) while the component is mounted, and never starts at
 * all under prefers-reduced-motion, so each sim's first render doubles as its static fallback.
 */
export function useRafLoop(frame: (dt: number) => void) {
  let raf = 0
  let last = 0
  function tick(now: number) {
    const dt = Math.min((now - last) / 1000, 0.05)
    last = now
    frame(dt)
    raf = requestAnimationFrame(tick)
  }
  onMounted(() => {
    last = performance.now()
    if (!prefersReducedMotion()) raf = requestAnimationFrame(tick)
  })
  onUnmounted(() => cancelAnimationFrame(raf))
}

/** A shared clock in seconds: most sims only need "time passing" to phase their packets and waves. */
export function useAnimationClock(): Ref<number> {
  const time = ref(0)
  useRafLoop((dt) => (time.value += dt))
  return time
}
