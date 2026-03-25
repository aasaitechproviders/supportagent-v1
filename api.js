// ═══════════════════════════════════════════════════════════════
//  SupportGent — Frontend API Client
//  Load order: api.js → nav.js → page script
// ═══════════════════════════════════════════════════════════════
const API = 'https://YOUR_LAMBDA_URL_HERE'  // Replace with actual Lambda URL

// ── Auth ──
function getToken()     { return localStorage.getItem('sg_token') }
function setToken(t)    { localStorage.setItem('sg_token', t) }
function clearToken()   { localStorage.removeItem('sg_token') }
function logout()       { clearToken(); location.replace('/') }

// ── Core fetch ──
async function apiFetch(path, opts = {}) {
  const token = getToken()
  const isForm = opts.body instanceof FormData
  const headers = { 'Authorization': 'Bearer ' + token }
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

// ── Formatters ──
function formatTokens(n) {
  if (n == null) return '∞'
  if (n >= 1_000_000) return (n/1_000_000).toFixed(1).replace(/\.0$/,'') + 'M'
  if (n >= 1_000)     return (n/1_000).toFixed(0) + 'K'
  return String(n)
}
function formatCurrency(amount, currency='INR') {
  const sym = currency==='USD'?'$':currency==='EUR'?'€':'₹'
  return sym + parseFloat(amount||0).toLocaleString('en-IN', { maximumFractionDigits:2, minimumFractionDigits:0 })
}
function timeAgo(date) {
  const d=new Date(date), now=new Date(), diff=Math.floor((now-d)/1000)
  if (diff<60) return 'just now'
  if (diff<3600) return Math.floor(diff/60)+'m ago'
  if (diff<86400) return Math.floor(diff/3600)+'h ago'
  if (diff<2592000) return Math.floor(diff/86400)+'d ago'
  return d.toLocaleDateString('en-IN',{ month:'short', day:'numeric' })
}
function formatDate(date) {
  if (!date) return '—'
  return new Date(date).toLocaleDateString('en-IN',{ year:'numeric', month:'short', day:'numeric' })
}

// ── Toast ──
function toast(msg, type='success') {
  let c = document.getElementById('toast-container')
  if (!c) { c=document.createElement('div'); c.id='toast-container'; c.style.cssText='position:fixed;top:20px;right:20px;z-index:99999;display:flex;flex-direction:column;gap:8px;'; document.body.appendChild(c) }
  const el = document.createElement('div')
  const icons = { success:'✓', error:'✕', info:'ℹ', warning:'⚠' }
  const colors = { success:'rgba(34,197,94,.35)', error:'rgba(248,113,113,.35)', info:'rgba(108,99,255,.35)', warning:'rgba(251,191,36,.35)' }
  el.style.cssText=`display:flex;align-items:center;gap:9px;padding:12px 18px;background:#13131f;border:1px solid ${colors[type]||colors.info};border-radius:11px;font-size:13.5px;font-family:'Sora',sans-serif;color:#eeedf8;box-shadow:0 8px 28px rgba(0,0,0,.3);animation:slideInR .3s cubic-bezier(.22,1,.36,1) both;max-width:340px;pointer-events:all;`
  el.innerHTML=`<style>@keyframes slideInR{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:none}}</style><span>${icons[type]||'·'}</span><span>${msg}</span>`
  c.appendChild(el)
  setTimeout(()=>{ el.style.opacity='0'; el.style.transform='translateX(20px)'; el.style.transition='all .3s'; setTimeout(()=>el.remove(),300) }, 3200)
}

// ── Page skeleton ──
function showSkeleton(label='Loading…') {
  let el=document.getElementById('page-skeleton')
  if (!el) {
    el=document.createElement('div'); el.id='page-skeleton'; el.className='page-skeleton'
    el.innerHTML=`<div style="display:flex;flex-direction:column;align-items:center;gap:12px;"><div class="skel-spinner"></div><div style="font-size:13px;color:var(--text3);font-family:'Sora',sans-serif;">${label}</div></div>`
    document.body.appendChild(el)
  }
}
function dismissSkeleton() {
  const el=document.getElementById('page-skeleton'); if (!el||el._done) return
  el._done=true; el.classList.add('hiding'); setTimeout(()=>el.remove(),350)
}
