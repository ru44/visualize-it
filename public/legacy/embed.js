// Lets a classic simulation live inside the new site: hides its own chrome, follows the
// parent's theme, reports its height so the frame never needs its own scrollbar, and swaps its
// words for another language. Only text changes: the simulation's code, canvas, controls and
// layout stay exactly as they were.
(function () {
  var root = document.documentElement
  var SKIP = { SCRIPT: 1, STYLE: 1, CANVAS: 1, SVG: 1, NOSCRIPT: 1, TEXTAREA: 1, MATH: 1 }
  var INLINE = { B: 1, STRONG: 1, EM: 1, I: 1, A: 1, SPAN: 1, SUB: 1, SUP: 1, BR: 1, CODE: 1, U: 1, SMALL: 1, MARK: 1, FONT: 1 }
  var TEXTBLOCK = { P: 1, LI: 1, H1: 1, H2: 1, H3: 1, H4: 1, H5: 1, H6: 1, DD: 1, DT: 1, TD: 1, TH: 1, LABEL: 1, FIGCAPTION: 1, SUMMARY: 1, BLOCKQUOTE: 1 }
  var ATTRS = ['placeholder', 'title', 'aria-label']
  function norm(s) { return String(s).replace(/\s+/g, ' ').trim() }
  // Formulas are never translated. MathJax writes each one as a preview, a rendering and a source
  // script whose markup depends on the browser's fonts, so a formula becomes a short marker ⟦1⟧ in
  // the key and is put back untouched after the words around it are swapped.
  var MATH = '.MathJax_Preview,.MathJax,.MathJax_CHTML,.mjx-chtml,.MathJax_Display,.MJXc-display,mjx-container,script[type^="math/"],.MathJax_SVG,.MathJax_SVG_Display,.MathJax_MathML'
  var TEX = /\\\([\s\S]*?\\\)|\\\[[\s\S]*?\\\]|\$\$[\s\S]*?\$\$/g
  function isMath(n) { return n.nodeType === 1 && n.matches && n.matches(MATH) }
  function hasMath(el) { return !!el.querySelector(MATH) || new RegExp(TEX.source).test(el.textContent) }
  function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/ /g, '&nbsp;') }
  function tokenize(el) {
    var html = ''
    var groups = []
    var open = false
    function tok(item) { if (open) groups[groups.length - 1].push(item); else { groups.push([item]); html += '⟦' + groups.length + '⟧'; open = true } }
    function text(s) { if (s.trim()) { html += esc(s); open = false } else if (!open) html += esc(s) }
    ;(function rec(node) {
      for (var c = node.firstChild; c; c = c.nextSibling) {
        if (c.nodeType === 3) {
          var s = c.nodeValue
          var re = new RegExp(TEX.source, 'g')
          var last = 0
          var m
          while ((m = re.exec(s))) { text(s.slice(last, m.index)); tok({ tex: m[0] }); last = re.lastIndex }
          text(s.slice(last))
        } else if (c.nodeType === 1) {
          if (isMath(c)) { tok({ node: c }); continue }
          var sh = c.cloneNode(false).outerHTML
          var cut = sh.lastIndexOf('</')
          open = false
          html += cut >= 0 ? sh.slice(0, cut) : sh
          rec(c)
          html += cut >= 0 ? sh.slice(cut) : ''
          open = false
        }
      }
    })(el)
    return { key: norm(html), groups: groups }
  }
  function mathReady(fn) {
    var M = window.MathJax
    if (M && M.Hub && M.Hub.Queue) M.Hub.Queue(fn)
    else if (M && M.startup && M.startup.promise) M.startup.promise.then(fn)
    else fn()
  }
  function hasText(el) {
    for (var n = el.firstChild; n; n = n.nextSibling) if (n.nodeType === 3 && norm(n.nodeValue)) return true
    return false
  }
  // A "unit" is an element whose words belong together: it holds text and only inline markup,
  // so a sentence with a bold word is translated as one sentence, not in fragments.
  function isUnit(el) {
    if (!hasText(el) && !el.querySelector('b,strong,em,i,a,span,code')) return false
    for (var c = el.firstElementChild; c; c = c.nextElementSibling) { if (isMath(c)) continue; if (!INLINE[c.tagName] || c.querySelector('p,div,ul,ol,li,table,canvas,svg,input,select,button')) return false }
    return !!norm(el.textContent)
  }
  function keyOf(el) { return hasMath(el) ? tokenize(el).key : /</.test(el.innerHTML) ? norm(el.innerHTML) : norm(el.textContent) }
  function walk(node, onUnit, onText) {
    for (var c = node.firstChild; c; c = c.nextSibling) {
      if (c.nodeType === 3) { if (norm(c.nodeValue)) onText(c) }
      else if (c.nodeType === 1 && !SKIP[c.tagName.toUpperCase()] && !isMath(c) && !(c.__viOut !== undefined && c.innerHTML === c.__viOut)) {
        if (isUnit(c)) onUnit(c)
        else walk(c, onUnit, onText)
      }
    }
  }
  function collect() {
    var out = []
    var add = function (k) { if (k && out.indexOf(k) < 0 && /[A-Za-z]/.test(k.replace(/⟦\d+⟧/g, ''))) out.push(k) }
    if (document.title) add(norm(document.title))
    walk(document.body, function (el) { add(keyOf(el)) }, function (t) { add(norm(t.nodeValue)) })
    document.querySelectorAll('input[type=button],input[type=submit],input[type=reset]').forEach(function (i) { add(norm(i.value)) })
    ATTRS.forEach(function (a) { document.querySelectorAll('[' + a + ']').forEach(function (e) { add(norm(e.getAttribute(a))) }) })
    return out
  }

  var dict = null
  var patterns = []
  function lookup(key) {
    if (!key) return null
    if (Object.prototype.hasOwnProperty.call(dict, key)) return dict[key]
    for (var i = 0; i < patterns.length; i++) {
      var m = patterns[i].re.exec(key)
      if (m) return patterns[i].out.replace(/\{(\d+)\}/g, function (_, j) { return m[+j + 1] })
    }
    return null
  }
  function translate(scope) {
    walk(scope, unit, textNode)
    document.querySelectorAll('input[type=button],input[type=submit],input[type=reset]').forEach(function (i) { var v = lookup(norm(i.value)); if (v != null) i.value = v })
    ATTRS.forEach(function (a) { document.querySelectorAll('[' + a + ']').forEach(function (e) { var v = lookup(norm(e.getAttribute(a))); if (v != null) e.setAttribute(a, v) }) })
  }
  // The page's own elements must survive a translation: its scripts hold references to them to
  // update readouts and react to clicks. So the translated HTML is only a template. Its words are
  // poured into the existing elements, matched by position, and formulas are moved back in place.
  // If the element structure differs, nothing is replaced and the parts are translated one by one.
  function kids(n) { var a = []; for (var c = n.firstElementChild; c; c = c.nextElementSibling) if (!isMath(c) && !c.hasAttribute('data-vi-m')) a.push(c); return a }
  function same(o, t) {
    var a = kids(o), b = kids(t)
    if (a.length !== b.length) return false
    for (var i = 0; i < a.length; i++) if (a[i].tagName !== b[i].tagName || !same(a[i], b[i])) return false
    return true
  }
  // Plain formatting (bold, subscripts, a link) that no script can be holding on to: no id, no
  // inline handler. Inside such an element the translation may reorder the tags freely.
  var FORMAT = { B: 1, STRONG: 1, EM: 1, I: 1, U: 1, SUB: 1, SUP: 1, BR: 1, SMALL: 1, CODE: 1, MARK: 1, FONT: 1, A: 1, SPAN: 1 }
  function plain(el) {
    for (var c = el.firstElementChild; c; c = c.nextElementSibling) {
      if (isMath(c)) continue
      if (!FORMAT[c.tagName] || c.id) return false
      for (var i = 0; i < c.attributes.length; i++) if (/^on/i.test(c.attributes[i].name)) return false
      if (!plain(c)) return false
    }
    return true
  }
  function place(el, html, math) {
    var tmpl = document.createElement('div')
    tmpl.innerHTML = math ? html.replace(/⟦(\d+)⟧/g, '<span data-vi-m="$1"></span>') : html
    var groups = math ? math.groups : []
    if (!same(el, tmpl)) {
      if (!plain(el)) return false
      while (el.firstChild) el.removeChild(el.firstChild)
      while (tmpl.firstChild) el.appendChild(tmpl.firstChild)
      el.querySelectorAll('span[data-vi-m]').forEach(function (ph) {
        ;(groups[+ph.getAttribute('data-vi-m') - 1] || []).forEach(function (it) { ph.parentNode.insertBefore(it.node || document.createTextNode(it.tex), ph) })
        ph.remove()
      })
      return true
    }
    ;(function pour(o, t) {
      var olds = kids(o)
      var k = 0
      var out = []
      for (var c = t.firstChild; c; c = c.nextSibling) {
        if (c.nodeType === 3) out.push(document.createTextNode(c.nodeValue))
        else if (c.nodeType === 1 && c.hasAttribute('data-vi-m')) (groups[+c.getAttribute('data-vi-m') - 1] || []).forEach(function (it) { out.push(it.node || document.createTextNode(it.tex)) })
        else if (c.nodeType === 1) { var oc = olds[k++]; pour(oc, c); out.push(oc) }
      }
      while (o.firstChild) o.removeChild(o.firstChild)
      out.forEach(function (n) { o.appendChild(n) })
    })(el, tmpl)
    return true
  }
  function unit(el) {
    {
      var math = hasMath(el) ? tokenize(el) : null
      var v = lookup(math ? math.key : keyOf(el))
      // No translation for the whole element: translate its parts one by one instead.
      if (v == null) { walk(el, unit, textNode); return }
      if (!math && !el.firstElementChild && !/</.test(v)) el.textContent = v
      else if (!place(el, v, math)) { walk(el, unit, textNode); return }
      // Remember what we wrote: if the simulation later rewrites this element (a live readout),
      // it no longer matches and is translated again.
      el.__viOut = el.innerHTML
      if (TEXTBLOCK[el.tagName]) { el.dir = 'rtl' === root.getAttribute('data-vi-dir') ? 'rtl' : 'ltr'; if (el.parentElement && /^(UL|OL)$/.test(el.parentElement.tagName)) el.parentElement.dir = el.dir }
    }
  }
  function textNode(t) {
    var raw = t.nodeValue
    var v = lookup(norm(raw))
    if (v == null) return
    t.nodeValue = raw.match(/^\s*/)[0] + v + raw.match(/\s*$/)[0]
    var p = t.parentElement
    if (p && TEXTBLOCK[p.tagName] && root.getAttribute('data-vi-dir') === 'rtl') p.dir = 'rtl'
  }
  function applyText(d, lang, dir) {
    dict = d || {}
    patterns = Object.keys(dict).filter(function (k) { return /\{\d+\}/.test(k) }).map(function (k) {
      var src = k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\\\{\d+\\\}/g, '(.+?)')
      return { re: new RegExp('^' + src + '$'), out: dict[k], fixed: k.replace(/\{\d+\}/g, '').length }
    }).sort(function (a, b) { return b.fixed - a.fixed }) // the most specific pattern wins
    root.lang = lang
    root.setAttribute('data-vi-dir', dir)
    root.classList.toggle('vi-rtl', dir === 'rtl')
    if (document.title && lookup(norm(document.title))) document.title = lookup(norm(document.title))
    mathReady(function () { translate(document.body) })
    // Simulations change their own labels as they run (Pause ↔ Resume, live counters). Translate
    // whatever they write, as they write it.
    // Translate exactly the elements that changed, inside the observer callback, which runs before
    // the browser paints, so a readout rewritten every frame never shows its English.
    new MutationObserver(function (records) {
      var seen = []
      for (var i = 0; i < records.length; i++) {
        var r = records[i]
        var el = r.type === 'characterData' ? r.target.parentElement : r.target
        if (!el || seen.indexOf(el) >= 0) continue
        seen.push(el)
        if (r.type === 'attributes') { var v = lookup(norm(el.value)); if (v != null) el.value = v; continue }
        if (el.__viOut !== undefined && el.innerHTML === el.__viOut) continue
        if (el.nodeType === 1 && !isMath(el) && isUnit(el)) unit(el)
        else if (el.nodeType === 1) walk(el, unit, textNode)
      }
    }).observe(document.body, { childList: true, characterData: true, subtree: true, attributes: true, attributeFilter: ['value'] })
  }

  // ?vi-extract=1 prints every piece of text on the page, so translators get the exact keys.
  if (/[?&]vi-extract=1/.test(location.search)) {
    window.addEventListener('load', function () { setTimeout(function () { mathReady(function () { console.log('VI-EXTRACT ' + JSON.stringify(collect())) }) }, 800) })
    return
  }
  if (window.parent === window) return
  root.classList.add('embedded')
  window.addEventListener('message', function (e) {
    if (e.origin !== location.origin || !e.data) return
    if (e.data.type === 'vi-theme') for (var k in e.data.vars) root.style.setProperty(k, e.data.vars[k])
    if (e.data.type === 'vi-text') applyText(e.data.dict, e.data.lang, e.data.dir)
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
