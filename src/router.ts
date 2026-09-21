import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './pages/Home.vue'
import { t, type Key } from './i18n'

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/subject/:subject', component: () => import('./pages/SubjectView.vue'), props: true },
    { path: '/lesson/:id', component: () => import('./pages/LessonView.vue'), props: true },
    { path: '/explore', component: () => import('./pages/LessonView.vue') },
    { path: '/graph', component: () => import('./pages/GraphView.vue'), meta: { title: 'graph.title' } },
    { path: '/map', component: () => import('./pages/MapView.vue'), meta: { title: 'map.title' } },
    { path: '/:rest(.*)*', component: () => import('./pages/NotFound.vue'), meta: { title: 'nf.title' } },
  ],
  scrollBehavior: (to) => (to.hash ? { el: to.hash, top: 70 } : { top: 0 }),
})

router.afterEach((to) => {
  if (!to.path.startsWith('/lesson') && !to.path.startsWith('/subject') && to.path !== '/explore') document.title = to.meta.title ? `${t(to.meta.title as Key)} — Visualize It` : 'Visualize It'
})
