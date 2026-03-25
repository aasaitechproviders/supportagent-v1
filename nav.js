/* ══════════════════════════════════════════════════════════════════
   nav.js — SupportGent Navigation Controller v2
   Deps: api.js must be loaded first
   Usage: const { user } = await initNav('page-id')
══════════════════════════════════════════════════════════════════ */

const _NAV = [
  {
    label: 'Workspace',
    items: [
      {
        page:'dashboard', href:'home.html',
        icon:`<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>`,
        label:'Dashboard'
      },
      {
        page:'agents', href:'agents.html',
        icon:`<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>`,
        label:'My Agents'
      },
      {
        page:'conversations', href:'conversations.html',
        icon:`<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
        label:'Conversations'
      },
    ]
  },
  {
    label: 'Account',
    items: [
      {
        page:'payments', href:'payments.html',
        icon:`<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>`,
        label:'Billing'
      },
      {
        page:'account', href:'account.html',
        icon:`<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
        label:'Account'
      },
    ]
  }
]

// SVG icons for theme toggle
const _ICON_MOON = `<svg class="icon-moon" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`
const _ICON_SUN  = `<svg class="icon-sun" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" style="display:none"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`

function _buildSidebar(activePage) {
  const sidebar = document.getElementById('sidebar')
  if (!sidebar) return

  sidebar.innerHTML = `
    <a class="sidebar-logo" href="home.html">
      <div class="sidebar-logo-mark">S</div>
      <span class="sidebar-logo-text">Support<span>Gent</span></span>
    </a>

    <div id="sidebar-user-skel" class="sidebar-user-skel">
      <div class="skel" style="width:34px;height:34px;min-width:34px;border-radius:50%;"></div>
      <div style="flex:1;display:flex;flex-direction:column;gap:5px;">
        <div class="skel" style="height:11px;width:70%;border-radius:4px;"></div>
        <div class="skel" style="height:9px;width:45%;border-radius:3px;"></div>
      </div>
    </div>
    <div id="sidebar-user-real" class="sidebar-user loading" onclick="location.href='account.html'" title="Account">
      <div class="sidebar-avatar" id="nav-avatar">?</div>
      <div class="sidebar-user-info">
        <div class="sidebar-user-name" id="nav-name">—</div>
        <div class="sidebar-user-plan" id="nav-plan">—</div>
      </div>
      <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" style="color:var(--text-3);flex-shrink:0"><polyline points="9 18 15 12 9 6"/></svg>
    </div>

    <div id="token-sidebar-widget" class="token-sidebar-widget" onclick="location.href='payments.html'" title="Manage billing" style="display:none;">
      <div class="tsw-header">
        <span class="tsw-label">Monthly Tokens</span>
        <span class="tsw-badge" id="tsw-badge">—</span>
      </div>
      <div class="tsw-bar"><div class="tsw-fill" id="tsw-fill" style="width:0%"></div></div>
      <div class="tsw-sub">
        <span id="tsw-used">—</span>
        <span id="tsw-cap">—</span>
      </div>
    </div>

    ${_NAV.map(section => `
      <div class="nav-section">
        <div class="nav-section-label">${section.label}</div>
        ${section.items.map(item => `
          <a class="nav-item ${item.page === activePage ? 'active' : ''}" href="${item.href}">
            <span class="nav-icon">${item.icon}</span>
            ${item.label}
          </a>
        `).join('')}
      </div>
    `).join('')}

    <div class="sidebar-bottom">
      <button class="btn-logout" onclick="logout()">
        <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
        Sign Out
      </button>
    </div>
  `
}

function _populateUser(user) {
  revealSidebarUser()
  const { name = '', avatar = '', plan = 'starter', tokens } = user

  const navAvatar = document.getElementById('nav-avatar')
  if (navAvatar) {
    if (avatar && (avatar.startsWith('data:') || avatar.startsWith('http')))
      navAvatar.innerHTML = `<img src="${avatar}" alt=""/>`
    else
      navAvatar.textContent = name?.[0]?.toUpperCase() || '?'
  }

  const el_name = document.getElementById('nav-name')
  if (el_name) el_name.textContent = name || 'User'

  const el_plan = document.getElementById('nav-plan')
  if (el_plan) el_plan.textContent = (plan.charAt(0).toUpperCase() + plan.slice(1)) + ' Plan'

  // Token widget
  if (tokens) {
    const widget = document.getElementById('token-sidebar-widget')
    if (widget) widget.style.display = 'block'
    const used = tokens.monthly_used || 0
    const cap  = tokens.monthly_cap  || 1
    const pct  = Math.min(100, Math.round(used / cap * 100))
    const fill = document.getElementById('tsw-fill')
    if (fill) {
      fill.style.width = pct + '%'
      fill.className   = 'tsw-fill' + (pct >= 90 ? ' danger' : pct >= 70 ? ' warn' : '')
    }
    const badge  = document.getElementById('tsw-badge')
    const usedEl = document.getElementById('tsw-used')
    const capEl  = document.getElementById('tsw-cap')
    if (badge)  badge.textContent  = pct + '%'
    if (usedEl) usedEl.textContent = fmtTokens(used) + ' used'
    if (capEl)  capEl.textContent  = fmtTokens(cap)
  }
}

function _initMobile() {
  const sidebar  = document.getElementById('sidebar')
  const backdrop = document.getElementById('sidebar-backdrop')
  const btn      = document.getElementById('mob-menu-btn')
  const close    = () => { sidebar?.classList.remove('mob-open'); backdrop?.classList.remove('open') }
  btn?.addEventListener('click', () => {
    sidebar?.classList.toggle('mob-open')
    backdrop?.classList.toggle('open')
  })
  backdrop?.addEventListener('click', close)
}

async function initNav(activePage) {
  // Handle ?token= from OAuth redirect
  const params = new URLSearchParams(location.search)
  if (params.get('token')) { setToken(params.get('token')); history.replaceState({}, '', location.pathname) }

  if (!getToken()) { location.replace('/'); return {} }

  _buildSidebar(activePage)
  _initMobile()

  // Wire up theme toggles with SVG icons
  document.querySelectorAll('.theme-toggle').forEach(b => {
    b.innerHTML = _ICON_MOON + _ICON_SUN
    b.addEventListener('click', toggleTheme)
  })
  // Apply current theme to icons
  applyTheme(_theme.cur)

  try {
    const user = await apiFetch('/auth/me')
    _populateUser(user)
    return { user }
  } catch (e) {
    clearToken(); location.replace('/'); return {}
  }
}
