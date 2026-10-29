import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'katex/dist/katex.min.css'
import './style.css'
import App from './App.vue'
import { router } from './router'

createApp(App).use(createPinia()).use(router).mount('#app')

// Every deploy renames the hashed chunks. A tab that still holds the previous index.html (opened before
// the deploy, or served from the 10-minute GitHub Pages cache) then asks for files that no longer exist,
// and every link seems dead. Reload once onto the new build; the guard stops a loop if the reload still
// lands on the old page.
const STALE_CHUNK = /dynamically imported module|Importing a module script failed|Failed to fetch/
function reloadForNewBuild() {
  const last = Number(sessionStorage.getItem('viz-reload') ?? 0)
  if (Date.now() - last < 30_000) return
  sessionStorage.setItem('viz-reload', String(Date.now()))
  location.reload()
}
window.addEventListener('vite:preloadError', (e) => {
  e.preventDefault()
  reloadForNewBuild()
})
router.onError((err) => {
  if (STALE_CHUNK.test(String((err as Error)?.message))) reloadForNewBuild()
})

// Offline support: register the service worker in production builds only.
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}))
}
