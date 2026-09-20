import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './pages/Home.vue'

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/lesson/:id', component: () => import('./pages/LessonView.vue'), props: true },
    { path: '/explore', component: () => import('./pages/LessonView.vue') },
    { path: '/map', component: () => import('./pages/MapView.vue') },
  ],
  scrollBehavior: () => ({ top: 0 }),
})
