<script setup lang="ts">
import type { ParamSpec } from '../lessons/types'
import { fmt } from '../engine/math'

defineProps<{ name: string; spec: ParamSpec; value: number }>()
defineEmits<{ set: [name: string, value: number] }>()
</script>

<template>
  <label class="block">
    <span class="flex items-baseline justify-between text-sm">
      <span>{{ spec.label }}</span>
      <span class="num">{{ fmt(value) }}<span v-if="spec.unit" style="color: var(--muted)"> {{ spec.unit }}</span></span>
    </span>
    <input
      type="range"
      class="mt-1 w-full"
      :min="spec.min"
      :max="spec.max"
      :step="spec.step"
      :value="value"
      @input="$emit('set', name, +($event.target as HTMLInputElement).value)"
    />
  </label>
</template>
