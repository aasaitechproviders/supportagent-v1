/* ══════════════════════════════════════════════════
   nav.js — SupportGent Navigation v3
   Deps: api.js must load first
   Usage: const { user } = await initNav('page-id')
══════════════════════════════════════════════════ */

const _NAV = [
  { label:'Workspace', items:[
    { page:'dashboard',     href:'home.html',          label:'Dashboard',     emoji:'🏠' },
    { page:'agents',        href:'agents.html',        label:'My Agents',     emoji:'🤖' },
    { page:'conversations', href:'conversations.html', label:'Conversations', emoji:'💬' },
  ]},
  { label:'Account', items:[
    { page:'payments', href:'payments.html', label:'Billing', emoji:'⚡' },
    { page:'account',  href:'account.html',  label:'Account', emoji:'👤' },
  ]}
]

function _buildSidebar(activePage) {
  const sidebar = document.getElementById('sidebar')
  if (!sidebar) return
  sidebar.innerHTML = `
    <a class="sidebar-logo" href="home.html">
      <div class="sidebar-logo-mark">S</div>Support<span>Gent</span>
    </a>
    <div class="sidebar-body">
      <div id="sidebar-user-skel" style="display:flex;align-items:center;gap:10px;padding:8px 4px;margin-bottom:6px;">
        <div class="skel" style="width:34px;height:34px;min-width:34px;border-radius:50%;"></div>
        <div style="flex:1;display:flex;flex-direction:column;gap:5px;">
          <div class="skel" style="height:10px;width:65%;border-radius:4px;"></div>
          <div class="skel" style="height:8px;width:40%;border-radius:3px;"></div>
        </div>
      </div>
      <div id="sidebar-user-real" class="sidebar-user" onclick="location.href='account.html'" title="Account" style="display:none;">
        <div class="sidebar-avatar" id="nav-avatar">?</div>
        <div style="flex:1;min-width:0;">
          <div class="sidebar-user-name" id="nav-name">—</div>
          <div class="sidebar-user-plan" id="nav-plan">—</div>
        </div>
        <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" style="color:var(--text-3);flex-shrink:0;"><polyline points="9 18 15 12 9 6"/></svg>
      </div>
      <div id="token-widget" class="token-widget" onclick="location.href='payments.html'" title="Billing" style="display:none;">
        <div class="tw-top"><span class="tw-label">Monthly tokens</span><span class="tw-pct" id="tw-pct">0%</span></div>
        <div class="tw-bar"><div class="tw-fill" id="tw-fill" style="width:0%"></div></div>
        <div class="tw-nums"><span id="tw-used">0 used</span><span id="tw-cap">0</span></div>
      </div>
      ${_NAV.map(sec=>`
        <div class="nav-section">
          <div class="nav-section-label">${sec.label}</div>
          ${sec.items.map(it=>`
            <a class="nav-item ${it.page===activePage?'active':''}" href="${it.href}">
              <span class="nav-icon" style="font-size:15px;">${it.emoji}</span>${it.label}
            </a>`).join('')}
        </div>`).join('')}
      <div style="margin-top:12px;padding:12px;background:var(--accent-dim);border-radius:12px;">
        <div style="font-size:10.5px;font-weight:700;color:var(--accent);margin-bottom:8px;">Quick Actions</div>
        <button class="btn btn-primary btn-sm create-btn" style="width:100%;justify-content:center;margin-bottom:6px;" onclick="location.href='agents.html?create=1'">+ New Agent</button>
        <a href="agents.html" class="btn btn-secondary btn-sm" style="width:100%;justify-content:center;">View All Agents</a>
      </div>
    </div>
    <div class="sidebar-bottom">
      <button class="btn-logout" onclick="logout()">
        <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
        Sign Out
      </button>
    </div>`
}

function _populateUser(user) {
  document.getElementById('sidebar-user-skel').style.display = 'none'
  const el = document.getElementById('sidebar-user-real')
  el.style.display = 'flex'
  const { name='', avatar='', plan='starter', tokens } = user
  const nav = document.getElementById('nav-avatar')
  if (nav) {
    if (avatar && (avatar.startsWith('data:') || avatar.startsWith('http')))
      nav.innerHTML = `<img src="${avatar}" alt=""/>`
    else nav.textContent = name?.[0]?.toUpperCase() || '?'
  }
  const planLabel = {starter:'Starter Plan',grower:'Grower Plan',enterprise:'Enterprise'}
  const nn = document.getElementById('nav-name'); if(nn) nn.textContent = name || 'User'
  const np = document.getElementById('nav-plan'); if(np) np.textContent = planLabel[plan] || plan
  if (tokens) {
    const w = document.getElementById('token-widget'); if(w) w.style.display='block'
    const used = tokens.monthly_used||0, cap = tokens.monthly_cap||1
    const pct = Math.min(100, Math.round(used/cap*100))
    const fill = document.getElementById('tw-fill')
    if(fill){ fill.style.width=pct+'%'; fill.className='tw-fill'+(pct>=90?' danger':pct>=70?' warn':'') }
    const pe = document.getElementById('tw-pct'); if(pe) pe.textContent=pct+'%'
    const ue = document.getElementById('tw-used'); if(ue) ue.textContent=fmtTokens(used)+' used'
    const ce = document.getElementById('tw-cap');  if(ce) ce.textContent=fmtTokens(cap)
  }
}

function _initMobile() {
  const sb=document.getElementById('sidebar'), bd=document.getElementById('sidebar-backdrop'), btn=document.getElementById('mob-menu-btn')
  const close=()=>{sb?.classList.remove('mob-open');bd?.classList.remove('open')}
  btn?.addEventListener('click',()=>{sb?.classList.toggle('mob-open');bd?.classList.toggle('open')})
  bd?.addEventListener('click',close)
}

function _initTheme() {
  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.style.cssText='background:none;border:none;cursor:pointer;padding:4px 8px;border-radius:8px;font-size:17px;line-height:1;'
    const upd = () => btn.textContent = document.documentElement.getAttribute('data-theme')==='dark' ? '☀️' : '🌙'
    upd()
    btn.addEventListener('click', () => { toggleTheme(); upd() })
  })
  applyTheme(_theme.cur)
}

function dismissSkeleton() {
  const el = document.getElementById('page-skeleton')
  if (!el||el._done) return; el._done=true
  el.style.opacity='0'; el.style.transition='opacity .25s'
  setTimeout(()=>el?.remove(), 280)
}
function revealSidebarUser() {}

async function initNav(activePage) {
  const params = new URLSearchParams(location.search)
  if (params.get('token')) { setToken(params.get('token')); history.replaceState({},''  ,location.pathname) }
  if (!getToken()) { location.replace('/'); return {} }
  _buildSidebar(activePage)
  _initMobile()
  _initTheme()
  try {
    const user = await apiFetch('/auth/me')
    _populateUser(user)
    return { user }
  } catch(e) { clearToken(); location.replace('/'); return {} }
}
