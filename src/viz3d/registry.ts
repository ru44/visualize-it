import { defineAsyncComponent, type Component } from 'vue'

/** 3D scenes a lesson can opt into with `visualization3d: { type }` in its lesson.yaml. Same props/emits as 2D visualizations. */
export const viz3dRegistry: Record<string, Component> = {
  projectile: defineAsyncComponent(() => import('./Projectile3D.vue')),
  'block-force': defineAsyncComponent(() => import('./BlockForce3D.vue')),
  'gas-box': defineAsyncComponent(() => import('./GasBox3D.vue')),
  surface: defineAsyncComponent(() => import('./SurfaceMesh3D.vue')),
  airfoil: defineAsyncComponent(() => import('./Airfoil3D.vue')),
  orbit: defineAsyncComponent(() => import('./Orbit3D.vue')),
  spring: defineAsyncComponent(() => import('./Spring3D.vue')),
  seasons: defineAsyncComponent(() => import('./Seasons3D.vue')),
}
