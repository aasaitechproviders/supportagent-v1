// ═══════════════════════════════════════════════════════════════
//  SupportGent — Navigation Controller
//  Deps: api.js must be loaded first
//  Call: const { user } = await initNav('page-id')
// ═══════════════════════════════════════════════════════════════

const _NAV_ITEMS = [
  { page:'dashboard',     href:'home.html',          icon:`<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>`, label:'Dashboard' },
  { page:'agents',        href:'agents.html',         icon:`<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>`, label:'My Agents' },
  { page:'conversations', href:'conversations.html',  icon:`<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`, label:'Conversations' },
  { page:'payments',      href:'payments.html',       icon:`<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>`, label:'Billing' },
  { page:'account',       href:'account.html',        icon:`<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`, label:'Account' },
]

function _buildSidebar(activePage) {
  const sidebar = document.getElementById('sidebar')
  if (!sidebar) return
  sidebar.innerHTML = `
    <div class="sidebar-logo">
      <div class="logo-mark">S</div>
      <span class="logo-text">SupportGent</span>
    </div>
    <nav class="sidebar-nav" id="sidebar-nav">
      ${_NAV_ITEMS.map(item => `
        <a class="nav-item ${item.page===activePage?'active':''}" href="${item.href}" data-page="${item.page}">
          ${item.icon}
          ${item.label}
        </a>
      `).join('')}
    </nav>
    <div class="sidebar-bottom">
      <div class="token-widget" id="token-widget" style="display:none;">
        <div class="token-widget-label">Monthly Tokens</div>
        <div class="token-bar"><div class="token-bar-fill" id="token-bar-fill" style="width:0%"></div></div>
        <div class="token-widget-sub">
          <span id="token-used-label">0</span>
          <span id="token-cap-label">—</span>
        </div>
      </div>
      <a class="user-chip" href="account.html" id="user-chip">
        <div class="user-avatar" id="nav-avatar">?</div>
        <div style="flex:1;min-width:0;">
          <div class="user-name" id="nav-name" style="color:var(--text3);">Loading…</div>
          <div class="user-plan" id="nav-plan">—</div>
        </div>
        <button class="btn-logout" id="nav-logout" title="Logout" onclick="event.preventDefault();event.stopPropagation();logout()">
          <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
        </button>
      </a>
    </div>
  `
  // Mobile topbar logo
  const mt = document.getElementById('mobile-topbar-logo')
  if (mt) mt.innerHTML = `<div class="logo-mark" style="width:28px;height:28px;font-size:12px;">S</div><span class="logo-text" style="font-size:16px;">SupportGent</span>`
}

function _populateUser(user) {
  const { name='', avatar='', plan='starter', tokens } = user
  // Avatar
  const navAvatar = document.getElementById('nav-avatar')
  if (navAvatar) {
    if (avatar && avatar.startsWith('data:')) navAvatar.innerHTML=`<img src="${avatar}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" alt=""/>`
    else if (avatar) navAvatar.innerHTML=`<img src="${avatar}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" alt=""/>`
    else navAvatar.textContent = name?.[0]?.toUpperCase()||'?'
  }
  const navName = document.getElementById('nav-name')
  if (navName) { navName.textContent=name||'User'; navName.style.color='' }
  const navPlan = document.getElementById('nav-plan')
  if (navPlan) navPlan.textContent=(plan.charAt(0).toUpperCase()+plan.slice(1))+' Plan'
  // Token widget
  if (tokens) {
    const tw = document.getElementById('token-widget'); if (tw) tw.style.display='block'
    const used = tokens.monthly_used||0, cap = tokens.monthly_cap||1
    const pct  = Math.min(100, Math.round(used/cap*100))
    const fill = document.getElementById('token-bar-fill')
    if (fill) {
      fill.style.width=pct+'%'
      fill.className='token-bar-fill'+(pct>=90?' danger':pct>=70?' warning':'')
    }
    const ul = document.getElementById('token-used-label'); if (ul) ul.textContent=formatTokens(used)+' used'
    const cl = document.getElementById('token-cap-label');  if (cl) cl.textContent=formatTokens(cap)
  }
}

function _initMobileSidebar() {
  const btn      = document.getElementById('mob-menu-btn')
  const sidebar  = document.getElementById('sidebar')
  const overlay  = document.getElementById('sidebar-overlay')
  const close    = () => { sidebar?.classList.remove('mob-open'); overlay?.classList.remove('open'); btn?.classList.remove('open') }
  btn?.addEventListener('click', () => {
    const open = sidebar?.classList.toggle('mob-open')
    overlay?.classList.toggle('open', open)
    btn?.classList.toggle('open', open)
  })
  overlay?.addEventListener('click', close)
}

async function initNav(activePage) {
  if (!getToken()) { location.replace('/'); return {} }
  _buildSidebar(activePage)
  _initMobileSidebar()
  try {
    const user = await apiFetch('/auth/me')
    _populateUser(user)
    return { user }
  } catch(e) {
    clearToken(); location.replace('/'); return {}
  }
}
