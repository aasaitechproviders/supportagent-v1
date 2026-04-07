/* ══════════════════════════════════════════════════════════════════
   nav.js — SupportGent Navigation v3 (i18n)
   Deps: i18n.js + api.js must load first
   Usage: const { user } = await renderNav('dashboard')
══════════════════════════════════════════════════════════════════ */

const _NAV_SECTIONS = [
  {
    labelKey: 'workspace',
    items: [
      { page:'dashboard',     href:'home.html',          labelKey:'navDashboard',     icon:'🏠' },
      { page:'agents',        href:'agents.html',        labelKey:'navMyAgents',      icon:'🤖' },
      { page:'conversations', href:'conversations.html', labelKey:'navConversations', icon:'💬' },
      { page:'merchant',      href:'merchant.html',      label:'Merchant Corner',     icon:'🏪' },
    ]
  },
  {
    labelKey: 'navSettings',
    items: [
      { page:'channels', href:'channels.html', labelKey:'navChannels', icon:'📡' },
    ]
  },
  {
    labelKey: 'navAccount',
    items: [
      { page:'payments', href:'payments.html', labelKey:'navBilling',     icon:'⚡' },
      { page:'account',  href:'account.html',  labelKey:'navAccountPage', icon:'👤' },
    ]
  }
]

// Build sidebar HTML into existing #sidebar element
function _buildSidebar(activePage) {
  const sidebar = document.getElementById('sidebar')
  if (!sidebar) return

  const navHtml = _NAV_SECTIONS.map(sec => `
    <div class="nav-section">
      <div class="nav-section-label">${t(sec.labelKey)}</div>
      ${sec.items.map(it => `
        <a class="nav-item ${it.page === activePage ? 'active' : ''}" href="${it.href}">
          <span class="nav-icon">${it.icon}</span>${it.label || t(it.labelKey)}
        </a>`).join('')}
    </div>`).join('')

  // Language switcher options
  const langOptions = Object.entries(LANG_META).map(([code, meta]) =>
    `<option value="${code}" ${getLang() === code ? 'selected' : ''}>${meta.native}</option>`
  ).join('')

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
          <span class="tsw-label">${t('navMonthlyTokens')}</span>
          <span class="tsw-badge" id="tsw-pct">0%</span>
        </div>
        <div class="progress-bar"><div class="progress-fill" id="tsw-fill" style="width:0%"></div></div>
        <div class="tsw-sub">
          <span id="tsw-used">0 ${t('navUsed')}</span>
          <span id="tsw-cap">0</span>
        </div>
      </div>
    </div>

    <!-- Nav sections -->
    <div id="sidebar-nav">${navHtml}</div>

    <!-- Quick actions -->
    <div class="sidebar-quick-actions">
      <div class="sqa-label">${t('navQuickActions')}</div>
      <a href="agents.html?create=1" class="btn btn-primary btn-sm" style="width:100%;justify-content:center;margin-bottom:7px;">${t('navNewAgent')}</a>
      <a href="agents.html" class="btn btn-secondary btn-sm" style="width:100%;justify-content:center;">${t('navViewAllAgents')}</a>
    </div>

    <!-- Language switcher + Sign Out always anchored at bottom -->
    <div class="sidebar-bottom">
      <select onchange="setLang(this.value)" style="width:100%;height:30px;padding:0 8px;border-radius:var(--r-sm);border:1px solid var(--border-md);background:var(--surface-2);color:var(--text);font-family:var(--font);font-size:12px;cursor:pointer;outline:none;margin-bottom:8px;display:block;">
        ${langOptions}
      </select>
      <button class="btn-logout" onclick="logout()">
        <span style="font-size:14px;">↩</span> ${t('navSignOut')}
      </button>
    </div>`
}

// Populate user chip after data loads
function _populateUser(user) {
  const skel = document.getElementById('sidebar-user-skel')
  const real = document.getElementById('sidebar-user-real')
  if (skel) skel.classList.add('hidden')
  if (real) real.classList.remove('loading')

  const { name = '', email = '', avatar = '', plan = 'starter', tokens } = user

  const av = document.getElementById('nav-avatar')
  if (av) {
    if (avatar && (avatar.startsWith('data:') || avatar.startsWith('http')))
      av.innerHTML = `<img src="${avatar}" alt=""/>`
    else
      av.textContent = name?.[0]?.toUpperCase() || '?'
  }

  const planLabel = {
    starter:    t('planStarter'),
    grower:     t('planGrower'),
    enterprise: t('planEnterprise'),
  }
  const nameEl = document.getElementById('nav-user-name')
  const planEl = document.getElementById('nav-user-plan')
  if (nameEl) nameEl.textContent = name || 'User'
  if (planEl) planEl.textContent = planLabel[plan] || plan

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
    if (usedEl) usedEl.textContent = fmtTokens(used) + ' ' + t('navUsed')
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

function setTopbarActions(html) {
  const el = document.getElementById('topbar-actions')
  if (el) el.innerHTML = html
}

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

// ── MAIN ENTRY POINT ─────────────────────────────────────────────
async function renderNav(activePage) {
  const params = new URLSearchParams(location.search)
  if (params.get('token')) {
    setToken(params.get('token'))
    history.replaceState({}, '', location.pathname)
  }

  if (!getToken()) { location.replace('/'); return null }

  _buildSidebar(activePage)
  _initMobile()

  const isDark = document.documentElement.getAttribute('data-theme') === 'dark'
  document.querySelectorAll('.theme-toggle').forEach(b => {
    b.textContent = isDark ? '☀️' : '🌙'
    b.addEventListener('click', () => {
      toggleTheme()
      const dark = document.documentElement.getAttribute('data-theme') === 'dark'
      document.querySelectorAll('.theme-toggle').forEach(x => x.textContent = dark ? '☀️' : '🌙')
    })
  })

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

async function initNav(activePage) {
  return renderNav(activePage)
}
