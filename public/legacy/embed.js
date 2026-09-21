// Lets a classic simulation live inside the new site: hides its own chrome, follows the
// parent's theme, and reports its height so the frame never needs its own scrollbar.
(function () {
  if (window.parent === window) return
  var root = document.documentElement
  root.classList.add('embedded')
  window.addEventListener('message', function (e) {
    if (e.origin !== location.origin || !e.data || e.data.type !== 'vi-theme') return
    for (var k in e.data.vars) root.style.setProperty(k, e.data.vars[k])
  })
  function report() {
    var h = Math.max(document.body ? document.body.scrollHeight : 0, root.scrollHeight)
    window.parent.postMessage({ type: 'vi-height', height: h }, location.origin)
  }
  window.addEventListener('load', function () {
    report()
    if (window.ResizeObserver) new ResizeObserver(report).observe(document.body)
    setInterval(report, 1500)
    window.parent.postMessage({ type: 'vi-ready' }, location.origin)
  })
})()
