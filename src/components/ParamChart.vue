<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { Line } from 'vue-chartjs'
import { Chart, LineController, LineElement, PointElement, LinearScale, Legend, Tooltip } from 'chart.js'
import type { ChartSpec } from '../lessons/types'
import { makeFn } from '../engine/math'

Chart.register(LineController, LineElement, PointElement, LinearScale, Legend, Tooltip)

const props = defineProps<{ spec: ChartSpec; params: Record<string, number> }>()

// chart.js needs concrete colours, so resolve the CSS variables and re-resolve on theme change.
const themeTick = ref(0)
const observer = new MutationObserver(() => themeTick.value++)
onMounted(() => observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] }))
onUnmounted(() => observer.disconnect())
const css = (name: string) => getComputedStyle(document.documentElement).getPropertyValue(name).trim()

const fns = computed(() => props.spec.series.map((s) => makeFn(s.expr)))

const data = computed(() => {
  void themeTick.value
  const palette = [css('--accent'), css('--pos'), css('--accent-2')]
  const [x0, x1] = props.spec.domain
  const datasets: any[] = props.spec.series.map((s, i) => ({
    label: s.label,
    data: Array.from({ length: 81 }, (_, k) => {
      const x = x0 + ((x1 - x0) * k) / 80
      return { x, y: fns.value[i](x, props.params) }
    }),
    borderColor: palette[i % palette.length],
    borderWidth: 2,
    pointRadius: 0,
    tension: 0,
  }))
  const m = props.spec.marker
  if (m && m in props.params) {
    const x = props.params[m]
    datasets.push({ label: 'now', data: [{ x, y: fns.value[0](x, props.params) }], borderColor: css('--accent-2'), backgroundColor: css('--accent-2'), pointRadius: 6, showLine: false })
  }
  return { datasets }
})

const options = computed(() => {
  void themeTick.value
  const axis = (text: string) => ({
    type: 'linear' as const,
    title: { display: true, text, color: css('--muted') },
    ticks: { color: css('--muted') },
    grid: { color: css('--grid') },
    border: { color: css('--line') },
  })
  return {
    responsive: true,
    maintainAspectRatio: false,
    animation: false as const,
    parsing: false as const,
    scales: { x: { ...axis(props.spec.xLabel), min: props.spec.domain[0], max: props.spec.domain[1] }, y: axis(props.spec.yLabel) },
    plugins: { legend: { labels: { color: css('--fg'), boxWidth: 12, filter: (l: { text: string }) => l.text !== 'now' } } },
  }
})
</script>

<template>
  <figure class="border-t px-4 py-3" style="border-color: var(--line)">
    <figcaption class="label mb-2">{{ spec.title }}</figcaption>
    <div class="h-56"><Line :data="data as any" :options="options as any" /></div>
  </figure>
</template>
