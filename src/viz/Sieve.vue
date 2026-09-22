<script setup lang="ts">
import { computed } from 'vue'
import { t } from '../i18n'
import Readouts from '../components/Readouts.vue'

// Sieve of Eratosthenes on 1..N. param p = how many primes have been used to cross out their multiples.
const props = defineProps<{ params: Record<string, number>; options: Record<string, any> }>()
const emit = defineEmits<{ set: [name: string, value: number] }>()
const W = 800
const H = 480
const N = computed(() => Math.max(20, Math.min(120, Math.round(props.params.N ?? 100))))
const smallPrimes = computed(() => { const out: number[] = []; for (let n = 2; n * n <= N.value; n++) if (out.every((q) => n % q)) out.push(n); return out })
const steps = computed(() => Math.max(0, Math.min(smallPrimes.value.length, Math.round(props.params.p ?? 1))))
const used = computed(() => smallPrimes.value.slice(0, steps.value))
const current = computed(() => used.value[used.value.length - 1])
const crossedBy = (n: number) => used.value.find((q) => n !== q && n % q === 0)
const done = computed(() => steps.value >= smallPrimes.value.length)
const isPrimeKnown = (n: number) => n > 1 && !crossedBy(n) && (done.value || used.value.includes(n) || n < (current.value ?? 2) ** 2)
const primes = computed(() => Array.from({ length: N.value }, (_, i) => i + 1).filter((n) => n > 1 && !crossedBy(n)))
const cols = 10
const S = 38
const pos = (n: number) => ({ x: 30 + ((n - 1) % cols) * S, y: 40 + Math.floor((n - 1) / cols) * S })
const readouts = computed(() => [
  { label: t('sieve.current'), value: current.value ? String(current.value) : '—', color: 'var(--neg)' },
  { label: t('sieve.remaining'), value: String(primes.value.length) },
  { label: t('sieve.status'), value: done.value ? t('sieve.done') : t('sieve.next', { p: smallPrimes.value[steps.value] ?? '' }), color: done.value ? 'var(--pos)' : 'var(--muted)' },
])
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="block w-full select-none">
      <text class="num" x="16" y="22" font-size="12" fill="var(--muted)">{{ t('sieve.hint') }}</text>
      <g v-for="n in N" :key="n">
        <rect :x="pos(n).x" :y="pos(n).y" :width="S - 4" :height="S - 4" rx="6" :fill="n === 1 ? 'var(--sunken)' : crossedBy(n) ? (crossedBy(n) === current ? 'var(--neg)' : 'var(--sunken)') : isPrimeKnown(n) ? 'var(--accent-2)' : 'var(--panel)'" :fill-opacity="crossedBy(n) === current && crossedBy(n) ? 0.35 : 1" stroke="var(--line)" />
        <text class="num" :x="pos(n).x + (S - 4) / 2" :y="pos(n).y + S / 2 + 2" text-anchor="middle" font-size="13" :fill="isPrimeKnown(n) && !crossedBy(n) ? '#fff' : crossedBy(n) ? 'var(--muted)' : 'var(--fg)'" :text-decoration="crossedBy(n) ? 'line-through' : ''">{{ n }}</text>
      </g>
      <g class="num" transform="translate(440, 60)">
        <text font-size="13" fill="var(--muted)">{{ t('sieve.used') }}</text>
        <g v-for="(q, i) in smallPrimes" :key="q" class="cursor-pointer" @click="emit('set', 'p', i + 1)"><rect :x="i * 52" y="12" width="44" height="34" rx="8" :fill="i < steps ? 'var(--accent-2)' : 'var(--panel)'" stroke="var(--line)" /><text :x="i * 52 + 22" y="35" text-anchor="middle" font-size="15" :fill="i < steps ? '#fff' : 'var(--fg)'">{{ q }}</text></g>
        <text y="90" font-size="13" fill="var(--muted)">{{ t('sieve.primes') }}</text>
        <foreignObject y="100" width="330" height="260"><div xmlns="http://www.w3.org/1999/xhtml" dir="ltr" style="font-size: 14px; line-height: 1.7; color: var(--fg); font-family: var(--font-mono, monospace)">{{ primes.join(', ') }}</div></foreignObject>
      </g>
    </svg>
    <Readouts :items="readouts" />
  </div>
</template>
