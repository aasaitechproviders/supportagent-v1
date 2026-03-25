/* ══════════════════════════════════════════════════════════════════
   api.js — SupportGent Frontend API Client + Utilities v2
   Load first on every page
══════════════════════════════════════════════════════════════════ */
const API = 'https://fypouhme3gqldqk6sk75b75udy0ltonb.lambda-url.ap-southeast-2.on.aws'

// ── Auth ──────────────────────────────────────────────────────────
function getToken()  { return localStorage.getItem('sg_token') }
function setToken(t) { localStorage.setItem('sg_token', t) }
function clearToken(){ localStorage.removeItem('sg_token') }
function logout()    { clearToken(); location.replace('/') }

// ── Theme (light / dark, persisted) ──────────────────────────────
const _theme = { cur: localStorage.getItem('sg_theme') || 'light' }
function applyTheme(t) {
  _theme.cur = t
  document.documentElement.setAttribute('data-theme', t === 'dark' ? 'dark' : '')
  localStorage.setItem('sg_theme', t)
  // Update emoji in all theme-toggle buttons
  document.querySelectorAll('.theme-toggle').forEach(b => {
    b.textContent = t === 'dark' ? '☀️' : '🌙'
  })
}
function toggleTheme() { applyTheme(_theme.cur === 'dark' ? 'light' : 'dark') }
;(function(){ applyTheme(_theme.cur) })()

// ── Core fetch ────────────────────────────────────────────────────
async function apiFetch(path, opts = {}) {
  const token  = getToken()
  const isForm = opts.body instanceof FormData
  const headers = {}
  if (token) headers['Authorization'] = 'Bearer ' + token
  if (!isForm) headers['Content-Type'] = 'application/json'
  Object.assign(headers, opts.headers || {})
  const res = await fetch(API + path, { ...opts, headers })
  if (res.status === 401) { clearToken(); location.replace('/'); return }
  if (!res.ok) {
    const e = await res.json().catch(() => ({ error: 'Request failed' }))
    throw new Error(e.error || 'Request failed')
  }
  return res.json()
}

// ── Formatters ────────────────────────────────────────────────────
function fmtTokens(n) {
  if (n == null) return '∞'
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M'
  if (n >= 1_000)     return Math.round(n / 1_000) + 'K'
  return String(n)
}
// Alias used across some pages
const formatTokens = fmtTokens

function fmtNum(n) {
  if (n == null) return '—'
  return Number(n).toLocaleString('en-IN')
}

function fmtCurrency(amount, cur = 'INR') {
  const sym = cur === 'USD' ? '$' : cur === 'EUR' ? '€' : '₹'
  return sym + parseFloat(amount || 0).toLocaleString('en-IN', { maximumFractionDigits: 2 })
}

function timeAgo(date) {
  if (!date) return '—'
  const d = new Date(date), now = new Date(), diff = Math.floor((now - d) / 1000)
  if (diff < 60)     return 'just now'
  if (diff < 3600)   return Math.floor(diff / 60) + 'm ago'
  if (diff < 86400)  return Math.floor(diff / 3600) + 'h ago'
  if (diff < 604800) return Math.floor(diff / 86400) + 'd ago'
  return d.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })
}

function fmtDate(date) {
  if (!date) return '—'
  return new Date(date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })
}
// Alias used across some pages
const formatDate = fmtDate

// ── Toast ─────────────────────────────────────────────────────────
function toast(msg, type = 'success', duration = 3200) {
  let c = document.getElementById('toast-container')
  if (!c) {
    c = document.createElement('div')
    c.id = 'toast-container'
    document.body.appendChild(c)
  }
  const icons = { success:'✓', error:'✕', info:'ℹ', warning:'⚠' }
  const el = document.createElement('div')
  el.className = 'toast ' + type
  el.innerHTML = `<span style="flex-shrink:0;font-size:12px;opacity:.7">${icons[type] || 'ℹ'}</span><span style="flex:1">${msg}</span>`
  c.appendChild(el)
  setTimeout(() => {
    el.classList.add('fade-out')
    el.addEventListener('animationend', () => el.remove(), { once: true })
  }, duration)
}

// ── Page skeleton ─────────────────────────────────────────────────
function dismissSkeleton() {
  const el = document.getElementById('page-skeleton')
  if (!el || el._done) return
  el._done = true
  el.classList.add('skel-hiding')
  setTimeout(() => el?.remove(), 350)
}

function revealSidebarUser() {
  document.getElementById('sidebar-user-skel')?.classList.add('hidden')
  document.getElementById('sidebar-user-real')?.classList.remove('loading')
}

// ── Copy to clipboard ─────────────────────────────────────────────
function copyText(text, label = 'Copied!') {
  navigator.clipboard.writeText(text)
    .then(() => toast(label, 'success'))
    .catch(() => toast('Copy failed', 'error'))
}

// ── Confirm modal helper ──────────────────────────────────────────
// Creates a reusable confirmation modal instead of browser confirm()
function confirmModal({ title = 'Are you sure?', message = '', confirmText = 'Confirm', danger = false } = {}) {
  return new Promise((resolve) => {
    const overlay = document.createElement('div')
    overlay.className = 'modal-overlay open'
    overlay.style.zIndex = '400'
    overlay.innerHTML = `
      <div class="modal" style="max-width:420px">
        <div class="modal-header">
          <div>
            <div class="modal-title">${title}</div>
            ${message ? `<div class="modal-sub">${message}</div>` : ''}
          </div>
          <button class="modal-close" id="_cm-close">✕</button>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" id="_cm-cancel">Cancel</button>
          <button class="btn ${danger ? 'btn-danger' : 'btn-primary'}" id="_cm-confirm">${confirmText}</button>
        </div>
      </div>
    `
    document.body.appendChild(overlay)
    const cleanup = (val) => { overlay.remove(); resolve(val) }
    overlay.querySelector('#_cm-confirm').onclick = () => cleanup(true)
    overlay.querySelector('#_cm-cancel').onclick  = () => cleanup(false)
    overlay.querySelector('#_cm-close').onclick   = () => cleanup(false)
    overlay.addEventListener('click', e => { if (e.target === overlay) cleanup(false) })
  })
}
