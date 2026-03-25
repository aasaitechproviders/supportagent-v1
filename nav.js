/* ══════════════════════════════════════════════════════════════════
   nav.js — SupportGent Navigation v3
   Exact same pattern as reference home.html nav system
   Deps: api.js must load first
   Usage: const { user } = await renderNav('dashboard')
══════════════════════════════════════════════════════════════════ */

const _NAV_SECTIONS = [
  {
    label: 'Workspace',
    items: [
      { page:'dashboard',     href:'home.html',          label:'Dashboard',     icon:'🏠' },
      { page:'agents',        href:'agents.html',        label:'My Agents',     icon:'🤖' },
      { page:'conversations', href:'conversations.html', label:'Conversations', icon:'💬' },
    ]
  },
  {
    label: 'Account',
    items: [
      { page:'payments', href:'payments.html', label:'Billing',  icon:'⚡' },
      { page:'account',  href:'account.html',  label:'Account',  icon:'👤' },
    ]
  }
]

// Build sidebar HTML into existing #sidebar element
function _buildSidebar(activePage) {
  const sidebar = document.getElementById('sidebar')
  if (!sidebar) return

  const navHtml = _NAV_SECTIONS.map(sec => `
    <div class="nav-section">
      <div class="nav-section-label">${sec.label}</div>
      ${sec.items.map(it => `
        <a class="nav-item ${it.page === activePage ? 'active' : ''}" href="${it.href}">
          <span class="nav-icon">${it.icon}</span>${it.label}
        </a>`).join('')}
    </div>`).join('')

  sidebar.innerHTML = `
    <a class="sidebar-logo" href="home.html">
      <span class="logo-mark">S</span>Support<span class="logo-gent">Gent</span>
    </a>

    <!-- User skeleton (shown while loading) -->
    <div class="sidebar-user-skel" id="sidebar-user-skel">
      <div class="skel" style="width:34px;height:34px;min-width:34px;border-radius:50%;"></div>
      <div style="flex:1;display:flex;flex-direction:column;gap:5px;">
        <div class="skel" style="height:10px;width:90px;border-radius:4px;"></div>
        <div class="skel" style="height:8px;width:110px;border-radius:3px;"></div>
      </div>
    </div>

    <!-- User chip (shown after auth) -->
    <a class="sidebar-user loading" id="sidebar-user-real" href="account.html">
      <div class="sidebar-avatar" id="nav-avatar"></div>
      <div class="sidebar-user-info">
        <div class="sidebar-user-name"  id="nav-user-name"></div>
        <div class="sidebar-user-plan" id="nav-user-plan"></div>
      </div>
    </a>

    <!-- Token usage widget -->
    <div id="token-sidebar-widget" style="display:none;">
      <div class="token-sidebar-widget" onclick="location.href='payments.html'" title="Manage billing">
        <div class="tsw-header">
          <span class="tsw-label">Monthly Tokens</span>
          <span class="tsw-badge" id="tsw-pct">0%</span>
        </div>
        <div class="progress-bar"><div class="progress-fill" id="tsw-fill" style="width:0%"></div></div>
        <div class="tsw-sub">
          <span id="tsw-used">0 used</span>
          <span id="tsw-cap">0</span>
        </div>
      </div>
    </div>

    <!-- Nav sections -->
    <div id="sidebar-nav">${navHtml}</div>

    <!-- Quick actions -->
    <div class="sidebar-quick-actions">
      <div class="sqa-label">Quick Actions</div>
      <a href="agents.html?create=1" class="btn btn-primary btn-sm" style="width:100%;justify-content:center;margin-bottom:7px;">+ New Agent</a>
      <a href="agents.html" class="btn btn-secondary btn-sm" style="width:100%;justify-content:center;">View All Agents</a>
    </div>

    <div class="sidebar-bottom">
      <button class="btn-logout" onclick="logout()">
        <span style="font-size:14px;">↩</span> Sign Out
      </button>
    </div>`
}

// Populate user chip after data loads
function _populateUser(user) {
  // Hide skeleton, show real chip
  const skel = document.getElementById('sidebar-user-skel')
  const real = document.getElementById('sidebar-user-real')
  if (skel) skel.classList.add('hidden')
  if (real) real.classList.remove('loading')

  const { name = '', email = '', avatar = '', plan = 'starter', tokens } = user

  // Avatar
  const av = document.getElementById('nav-avatar')
  if (av) {
    if (avatar && (avatar.startsWith('data:') || avatar.startsWith('http')))
      av.innerHTML = `<img src="${avatar}" alt=""/>`
    else
      av.textContent = name?.[0]?.toUpperCase() || '?'
  }

  const planLabel = { starter:'Starter Plan', grower:'Grower Plan', enterprise:'Enterprise' }
  const nameEl = document.getElementById('nav-user-name')
  const planEl = document.getElementById('nav-user-plan')
  if (nameEl) nameEl.textContent = name || 'User'
  if (planEl) planEl.textContent = planLabel[plan] || plan

  // Token widget
  if (tokens) {
    const widget = document.getElementById('token-sidebar-widget')
    if (widget) widget.style.display = 'block'
    const used  = tokens.monthly_used  || 0
    const cap   = tokens.monthly_cap   || 1
    const pct   = Math.min(100, Math.round(used / cap * 100))
    const fill  = document.getElementById('tsw-fill')
    const pctEl = document.getElementById('tsw-pct')
    const usedEl = document.getElementById('tsw-used')
    const capEl  = document.getElementById('tsw-cap')
    if (fill) {
      fill.style.width = pct + '%'
      fill.className   = 'progress-fill' + (pct >= 90 ? ' danger' : pct >= 70 ? ' warn' : '')
    }
    if (pctEl)  pctEl.textContent  = pct + '%'
    if (usedEl) usedEl.textContent = fmtTokens(used) + ' used'
    if (capEl)  capEl.textContent  = fmtTokens(cap)
  }
}

// Mobile sidebar helpers
function openMobileSidebar() {
  document.getElementById('sidebar')?.classList.add('mob-open')
  document.getElementById('sidebarBackdrop')?.classList.add('open')
  document.body.style.overflow = 'hidden'
}
function closeMobileSidebar() {
  document.getElementById('sidebar')?.classList.remove('mob-open')
  document.getElementById('sidebarBackdrop')?.classList.remove('open')
  document.body.style.overflow = ''
}

// For backward-compat: both 'sidebarBackdrop' (from home.html pattern) and 'sidebar-backdrop'
function _initMobile() {
  const btn1 = document.getElementById('mob-menu-btn')
  const btn2 = document.getElementById('mobMenuBtn')
  const bd1  = document.getElementById('sidebarBackdrop')
  const bd2  = document.getElementById('sidebar-backdrop')
  const open = () => {
    document.getElementById('sidebar')?.classList.add('mob-open')
    ;[bd1,bd2].forEach(bd => bd?.classList.add('open'))
    document.body.style.overflow = 'hidden'
  }
  const close = () => {
    document.getElementById('sidebar')?.classList.remove('mob-open')
    ;[bd1,bd2].forEach(bd => bd?.classList.remove('open'))
    document.body.style.overflow = ''
  }
  ;[btn1,btn2].forEach(btn => btn?.addEventListener('click', open))
  ;[bd1,bd2].forEach(bd => bd?.addEventListener('click', close))
}

// Topbar actions slot (set from page JS)
function setTopbarActions(html) {
  const el = document.getElementById('topbar-actions')
  if (el) el.innerHTML = html
}

// dismissSkeleton - page-level skeleton
function dismissSkeleton() {
  const el = document.getElementById('page-skeleton')
  if (!el || el._done) return
  el._done = true
  el.classList.add('skel-hiding')
  setTimeout(() => el?.remove(), 350)
}

// revealSidebarUser — compat shim
function revealSidebarUser() {
  document.getElementById('sidebar-user-skel')?.classList.add('hidden')
  document.getElementById('sidebar-user-real')?.classList.remove('loading')
}

// ── MAIN ENTRY POINT ─────────────────────────────────────────────
async function renderNav(activePage) {
  // Handle ?token= from OAuth redirect
  const params = new URLSearchParams(location.search)
  if (params.get('token')) {
    setToken(params.get('token'))
    history.replaceState({}, '', location.pathname)
  }

  if (!getToken()) { location.replace('/'); return null }

  // Handle ?create=1 on agents page
  if (location.pathname.endsWith('agents.html') && params.get('create')) {
    // will be handled by page after renderNav resolves
  }

  // Build sidebar structure
  _buildSidebar(activePage)
  _initMobile()

  // Init theme toggles (emoji style matching reference)
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark'
  document.querySelectorAll('.theme-toggle').forEach(b => {
    b.textContent = isDark ? '☀️' : '🌙'
    b.addEventListener('click', () => {
      toggleTheme()
      const dark = document.documentElement.getAttribute('data-theme') === 'dark'
      document.querySelectorAll('.theme-toggle').forEach(x => x.textContent = dark ? '☀️' : '🌙')
    })
  })

  // Fetch user
  try {
    const user = await apiFetch('/auth/me')
    _populateUser(user)
    return { user }
  } catch(e) {
    clearToken()
    location.replace('/')
    return null
  }
}

// Backward compat: initNav is same as renderNav
async function initNav(activePage) {
  return renderNav(activePage)
}
