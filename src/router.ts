import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './pages/Home.vue'

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/lesson/:id', component: () => import('./pages/LessonView.vue'), props: true },
    { path: '/explore', component: () => import('./pages/LessonView.vue') },
    { path: '/graph', component: () => import('./pages/GraphView.vue'), meta: { title: 'Graphing' } },
    { path: '/map', component: () => import('./pages/MapView.vue'), meta: { title: 'Learning map' } },
    { path: '/:rest(.*)*', component: () => import('./pages/NotFound.vue'), meta: { title: 'Not found' } },
  ],
  scrollBehavior: (to) => (to.hash ? { el: to.hash, top: 70 } : { top: 0 }),
})

router.afterEach((to) => {
  if (!to.path.startsWith('/lesson') && to.path !== '/explore') document.title = to.meta.title ? `${to.meta.title} — Visualize It` : 'Visualize It — see what the equation means'
})
