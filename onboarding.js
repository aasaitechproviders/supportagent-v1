/* ═══════════════════════════════════════════════════════════════════
   onboarding.js — SupportGent Inline Guides + Demo Store v1
   Provides: inline tips, onboarding checklist, one-click demo store
═══════════════════════════════════════════════════════════════════ */

/* ── Demo store data ─────────────────────────────────────────────── */
const DEMO_AGENT = {
  name: "Priya's Boutique",
  type: 'sales',
  brand_color: '#7C6FFF',
  welcome_message: "Hi! 👋 I'm your smart shopping assistant. Ask me anything about our products, prices, or delivery!",
  system_prompt: "You are a friendly and enthusiastic sales assistant for Priya's Boutique, a curated fashion and lifestyle store based in Hyderabad. Help customers discover products, compare options, check prices and availability, and guide them smoothly to purchase. Always be warm, helpful, and concise. If you don't have information about a specific product, suggest the closest alternatives from the catalog.",
  ui_language: 'en'
}

const DEMO_KNOWLEDGE_TEXT = `PRIYA'S BOUTIQUE — FULL PRODUCT CATALOG & STORE GUIDE

═══ ETHNIC WEAR ═══

1. Floral Cotton Kurti
   Price: ₹699 | SKU: KRT-001
   Sizes: XS, S, M, L, XL, 2XL, 3XL
   Colors: Sky Blue, Dusty Pink, Sunshine Yellow, Mint Green
   Material: 100% Pure Cotton
   Description: Lightweight daily-wear kurti with vibrant floral block print. Machine washable. Perfect for office, college, and casual outings.

2. Embroidered Silk Kurti
   Price: ₹1,499 | SKU: KRT-002
   Sizes: S, M, L, XL, 2XL
   Colors: Royal Blue, Maroon, Teal
   Material: Art Silk with hand-embroidery
   Description: Occasion-wear kurti with intricate embroidery on the neckline and hemline. Ideal for weddings, festivals, and parties. Dry clean recommended.

3. Indo-Western Kurti Set (Kurti + Palazzo)
   Price: ₹1,199 | SKU: KRT-003
   Sizes: S, M, L, XL, 2XL
   Colors: Peach, Lavender, Sage Green
   Material: Rayon
   Description: Coordinated kurti + wide-leg palazzo set. Relaxed fit, extremely comfortable. Great for long days out or travel.

4. Anarkali Suit Set (Full Set: Kurti + Churidar + Dupatta)
   Price: ₹2,499 | SKU: ANK-001
   Sizes: S, M, L, XL, 2XL
   Colors: Magenta, Navy, Mustard
   Material: Georgette top, cotton bottom
   Description: Classic Anarkali silhouette with flared skirt. Comes with matching dupatta. Perfect for weddings and festive celebrations.

═══ ACCESSORIES ═══

5. Handmade Jute Tote Bag
   Price: ₹349 | SKU: BAG-001
   Colors: Natural, Black, Brown
   Capacity: ~10L
   Description: Eco-friendly handwoven jute bag with cotton lining and inside pocket. Sturdy enough for daily grocery runs or beach outings. Loop handles.

6. Oxidized Silver Jhumka Earrings
   Price: ₹249 | SKU: EAR-001
   Material: Zinc alloy with oxidized silver finish
   Description: Traditional bell-shaped jhumka earrings with tribal motifs. Lightweight. Perfect for ethnic outfits. Hypoallergenic hooks.

7. Kundan Necklace Set (Necklace + Earrings)
   Price: ₹899 | SKU: JWL-001
   Colors: Gold with Red, Gold with Green, Gold with Blue stones
   Description: Elegant Kundan set for weddings and functions. Gift-ready box packaging included.

8. Printed Cotton Dupatta
   Price: ₹199 | SKU: DUP-001
   Sizes: 2.5 metres (standard)
   Colors: Orange, Purple, Turquoise (with contrasting prints)
   Material: Pure cotton
   Description: Versatile block-printed dupatta. Mix and match with any kurti or salwar set.

═══ HOME DECOR ═══

9. Handpainted Terracotta Pot (Set of 3)
   Price: ₹599 | SKU: DEC-001
   Sizes: Small, Medium, Large
   Description: Artisan-painted terracotta pots featuring peacock and floral motifs. Perfect for indoor plants, gifting, or home display. Drainage holes included.

10. Macramé Wall Hanging
    Price: ₹899 | SKU: DEC-002
    Sizes: Small (30cm), Medium (60cm), Large (90cm)
    Colors: Natural White, Ivory
    Description: Handcrafted macramé wall art in boho style. Adds a warm, artistic touch to any room. Cotton rope, wooden dowel included.

11. Warli Art Canvas (Set of 2)
    Price: ₹1,199 | SKU: DEC-003
    Size: 30cm × 40cm each
    Description: Handpainted Warli tribal art on stretched canvas. Ready to hang. Pair them or display separately.

═══ STORE POLICIES ═══

SHIPPING:
- Free shipping on all orders above ₹999
- Flat ₹60 shipping for orders below ₹999
- Standard delivery: 3–5 working days
- Express delivery (₹120 extra): 1–2 working days
- We ship across India including remote PIN codes

RETURNS & EXCHANGES:
- 7-day return policy from date of delivery
- Items must be unworn, unwashed, with original tags
- Defective or wrong items: full refund + free return pickup
- Sale items are non-returnable
- Exchanges available (subject to stock availability)

PAYMENT OPTIONS:
- UPI (Google Pay, PhonePe, Paytm)
- Net banking (all major banks)
- Credit/Debit cards (Visa, Mastercard, RuPay)
- Cash on delivery (orders up to ₹3,000)
- EMI available on cards (orders above ₹2,000)

CONTACT & SUPPORT:
- WhatsApp: +91 98765 43210 (Mon–Sat, 10am–7pm)
- Email: support@priyasboutique.com
- Instagram: @priyasboutique
- Response time: within 4 hours on business days

FREQUENTLY ASKED QUESTIONS:

Q: Do you offer customization or alterations?
A: Yes! For bulk orders (10+ pieces) or custom designs, WhatsApp us. For standard size alterations, we offer free alterations on orders above ₹1,499.

Q: How do I find my size?
A: Check our size chart — XS fits bust 32", S fits 34", M fits 36", L fits 38", XL fits 40", 2XL fits 42", 3XL fits 44".

Q: Do you have an offline store?
A: We're currently online-only, but we're based in Hyderabad. Local customers can arrange try-before-you-buy appointments on request via WhatsApp.

Q: Can I track my order?
A: Yes! You'll receive a tracking link via WhatsApp and email once your order ships.

Q: Do you sell wholesale?
A: Yes, for wholesale inquiries (50+ pieces), please email us or WhatsApp for a catalogue and pricing.

Q: What if I receive a damaged product?
A: We're so sorry if that happens! WhatsApp us a photo within 48 hours of delivery and we'll arrange a replacement or full refund immediately.`

const DEMO_PRODUCTS_CSV = `name,price,category,description,sku,stock_qty,image_url
Floral Cotton Kurti,699,Ethnic Wear,Lightweight daily-wear kurti with vibrant floral block print. Available in XS-3XL. Machine washable.,KRT-001,48,
Embroidered Silk Kurti,1499,Ethnic Wear,Occasion-wear kurti with intricate hand-embroidery. Perfect for weddings and festivals.,KRT-002,22,
Indo-Western Kurti Set,1199,Ethnic Wear,Coordinated kurti and wide-leg palazzo set. Rayon fabric. Great for travel and long days.,KRT-003,35,
Anarkali Suit Set,2499,Ethnic Wear,Classic Anarkali with flared skirt. Includes kurti and churidar and dupatta. Georgette top.,ANK-001,18,
Handmade Jute Tote Bag,349,Accessories,Eco-friendly handwoven jute bag with cotton lining. Sturdy for daily use.,BAG-001,60,
Oxidized Silver Jhumka Earrings,249,Accessories,Traditional bell-shaped jhumka earrings. Lightweight and hypoallergenic.,EAR-001,80,
Kundan Necklace Set,899,Accessories,Elegant Kundan necklace with matching earrings. Gift-box packaging included.,JWL-001,25,
Printed Cotton Dupatta,199,Accessories,Versatile block-printed dupatta. Pure cotton. Mix and match with any outfit.,DUP-001,70,
Handpainted Terracotta Pot Set,599,Home Decor,Set of 3 artisan-painted terracotta pots with peacock and floral motifs.,DEC-001,30,
Macramé Wall Hanging,899,Home Decor,Handcrafted boho macramé wall art. Cotton rope with wooden dowel. 3 sizes available.,DEC-002,20,
Warli Art Canvas Set,1199,Home Decor,Set of 2 handpainted Warli tribal art canvases. Ready to hang. 30cmx40cm each.,DEC-003,15,`

const DEMO_CATEGORIES_CSV = `name,description,slug
Ethnic Wear,Traditional and fusion Indian ethnic clothing including kurtis and anarkalis and suit sets,ethnic-wear
Accessories,Handcrafted jewellery bags and dupattas to complement your ethnic outfits,accessories
Home Decor,Artisan-crafted home decor pieces celebrating Indian folk art traditions,home-decor`

/* ── Progress tracking ────────────────────────────────────────────── */
const OB_KEY = 'sg_ob_progress'

const SG_OB = {
  /* step keys: create_agent, add_knowledge, add_products, publish */
  getProgress() {
    try { return JSON.parse(localStorage.getItem(OB_KEY) || '{}') } catch { return {} }
  },
  setProgress(obj) {
    localStorage.setItem(OB_KEY, JSON.stringify(obj))
  },
  markDone(step) {
    const p = this.getProgress()
    p[step] = true
    this.setProgress(p)
    this._updateChecklistUI()
  },
  isDone(step) {
    return !!this.getProgress()[step]
  },
  allDone() {
    const p = this.getProgress()
    return p.create_agent && p.add_knowledge && p.add_products && p.publish
  },
  reset() {
    localStorage.removeItem(OB_KEY)
    localStorage.removeItem('sg_tips_dismissed')
  },

  /* ── Inline tip system ───────────────────────────────────────────── */
  _dismissed() {
    try { return JSON.parse(localStorage.getItem('sg_tips_dismissed') || '[]') } catch { return [] }
  },
  _dismiss(key) {
    const d = this._dismissed()
    if (!d.includes(key)) d.push(key)
    localStorage.setItem('sg_tips_dismissed', JSON.stringify(d))
  },
  isTipDismissed(key) {
    return this._dismissed().includes(key)
  },

  /**
   * showInlineTip(insertBefore, key, icon, title, body, opts)
   * Inserts a dismissible tip card before the target element.
   * opts: { closeable: true, cta: { label, onclick } }
   */
  showInlineTip(insertBefore, key, icon, title, body, opts = {}) {
    if (this.isTipDismissed(key)) return
    if (document.getElementById('tip-' + key)) return

    const wrap = document.createElement('div')
    wrap.id = 'tip-' + key
    wrap.className = 'ob-tip'
    wrap.innerHTML = `
      <div class="ob-tip-icon">${icon}</div>
      <div class="ob-tip-body">
        <div class="ob-tip-title">${title}</div>
        <div class="ob-tip-desc">${body}</div>
        ${opts.cta ? `<button class="ob-tip-cta" id="tip-cta-${key}">${opts.cta.label}</button>` : ''}
      </div>
      ${opts.closeable !== false ? `<button class="ob-tip-close" title="Dismiss" onclick="SG_OB._dismissTip('${key}')">✕</button>` : ''}
    `
    insertBefore.parentNode.insertBefore(wrap, insertBefore)

    if (opts.cta) {
      document.getElementById('tip-cta-' + key).onclick = opts.cta.onclick
    }
  },

  _dismissTip(key) {
    this._dismiss(key)
    const el = document.getElementById('tip-' + key)
    if (el) {
      el.style.opacity = '0'
      el.style.transform = 'translateY(-6px)'
      el.style.transition = 'all .2s'
      setTimeout(() => el.remove(), 220)
    }
  },

  /* ── Onboarding checklist card ───────────────────────────────────── */
  renderChecklist(container) {
    if (!container) return
    const p = this.getProgress()

    const STEPS = [
      { key: 'create_agent',  icon: '🤖', label: 'Create your first AI agent',   href: 'agents.html?create=1' },
      { key: 'add_knowledge', icon: '📚', label: 'Add knowledge (products/FAQs)', href: '#' },
      { key: 'add_products',  icon: '📦', label: 'Upload your product catalog',   href: '#' },
      { key: 'publish',       icon: '🚀', label: 'Publish & share your agent',    href: '#' },
    ]

    const done = STEPS.filter(s => p[s.key]).length
    if (done === STEPS.length) { container.style.display = 'none'; return }

    const pct = Math.round(done / STEPS.length * 100)

    container.innerHTML = `
      <div class="ob-checklist-header">
        <div>
          <div class="ob-checklist-title">🗺️ Setup Guide</div>
          <div class="ob-checklist-sub">${done} of ${STEPS.length} steps complete</div>
        </div>
        <div style="text-align:right">
          <div class="ob-checklist-pct">${pct}%</div>
          <div style="background:var(--surface-3);border-radius:100px;height:5px;width:80px;margin-top:4px">
            <div style="background:var(--accent);height:100%;border-radius:100px;width:${pct}%;transition:width .5s"></div>
          </div>
        </div>
      </div>
      <div class="ob-checklist-steps">
        ${STEPS.map(s => `
          <div class="ob-checklist-step ${p[s.key] ? 'done' : ''}">
            <div class="ob-step-check">${p[s.key] ? '✓' : ''}</div>
            <span>${s.icon} ${s.label}</span>
          </div>
        `).join('')}
      </div>
    `
    container.style.display = 'block'
    this._checklistContainer = container
  },

  _updateChecklistUI() {
    if (this._checklistContainer) this.renderChecklist(this._checklistContainer)
  },

  /* ── Demo Store Loader ───────────────────────────────────────────── */
  async loadDemoStore() {
    // Show the progress modal
    const overlay = document.createElement('div')
    overlay.className = 'modal-overlay open'
    overlay.style.cssText = 'z-index:500;backdrop-filter:blur(6px)'
    overlay.innerHTML = `
      <div class="modal" style="max-width:420px;text-align:center">
        <div style="font-size:48px;margin-bottom:10px" id="demo-modal-emoji">⚡</div>
        <div class="modal-title" style="margin-bottom:6px" id="demo-modal-title">Setting up your demo store…</div>
        <div class="modal-sub" id="demo-modal-sub">This takes less than 10 seconds</div>
        <div style="margin:18px 0 6px">
          <div style="background:var(--surface-3);border-radius:100px;height:6px;overflow:hidden">
            <div id="demo-prog-bar" style="background:var(--accent);height:100%;width:0%;border-radius:100px;transition:width .4s ease"></div>
          </div>
        </div>
        <div style="font-size:12px;color:var(--text-3)" id="demo-prog-label">Starting…</div>
      </div>
    `
    document.body.appendChild(overlay)

    const prog = (pct, label) => {
      document.getElementById('demo-prog-bar').style.width = pct + '%'
      document.getElementById('demo-prog-label').textContent = label
    }

    const setTitle = (emoji, title, sub) => {
      document.getElementById('demo-modal-emoji').textContent = emoji
      document.getElementById('demo-modal-title').textContent = title
      if (sub) document.getElementById('demo-modal-sub').textContent = sub
    }

    try {
      // Step 1: Create agent
      prog(10, 'Creating agent…')
      const agent = await apiFetch('/agents', {
        method: 'POST',
        body: JSON.stringify({
          name: DEMO_AGENT.name,
          type: DEMO_AGENT.type,
          brand_color: DEMO_AGENT.brand_color,
          welcome_message: DEMO_AGENT.welcome_message,
          system_prompt: DEMO_AGENT.system_prompt,
          ui_language: DEMO_AGENT.ui_language
        })
      })
      const agentId = agent._id || agent.id
      prog(30, 'Agent created! Adding product catalog…')
      this.markDone('create_agent')

      // Step 2: Add knowledge source
      prog(45, 'Loading knowledge base…')
      await apiFetch(`/agents/${agentId}/sources`, {
        method: 'POST',
        body: JSON.stringify({
          type: 'text',
          title: "Priya's Boutique — Product Catalog & Store Guide",
          content: DEMO_KNOWLEDGE_TEXT
        })
      }).catch(() => {}) // non-fatal if source fails
      this.markDone('add_knowledge')
      prog(60, 'Knowledge added! Uploading products…')

      // Step 3: Upload products CSV
      const csvBlob = new Blob([DEMO_PRODUCTS_CSV], { type: 'text/csv' })
      const prodForm = new FormData()
      prodForm.append('file', csvBlob, 'products.csv')
      await apiFetch(`/agents/${agentId}/products/import`, {
        method: 'POST',
        body: prodForm
      }).catch(() => {}) // non-fatal
      this.markDone('add_products')
      prog(80, 'Products uploaded! Uploading categories…')

      // Step 4: Upload categories CSV
      const catBlob = new Blob([DEMO_CATEGORIES_CSV], { type: 'text/csv' })
      const catForm = new FormData()
      catForm.append('file', catBlob, 'categories.csv')
      await apiFetch(`/agents/${agentId}/categories/import`, {
        method: 'POST',
        body: catForm
      }).catch(() => {}) // non-fatal
      prog(95, 'Almost done…')

      await new Promise(r => setTimeout(r, 500))
      prog(100, 'Demo store ready!')
      setTitle('🎉', 'Your demo store is ready!', "Click below to explore your AI shopping agent")

      // Replace loading state with success + CTA
      const modalEl = overlay.querySelector('.modal')
      const goBtn = document.createElement('a')
      goBtn.className = 'btn btn-primary'
      goBtn.style.cssText = 'margin-top:18px;display:inline-flex;justify-content:center'
      goBtn.textContent = '🚀 Explore Demo Store →'
      goBtn.href = `agent.html?id=${agentId}&demo=1`
      modalEl.appendChild(goBtn)

      const skipBtn = document.createElement('button')
      skipBtn.className = 'btn btn-secondary'
      skipBtn.style.cssText = 'margin-top:8px;width:100%'
      skipBtn.textContent = 'Back to dashboard'
      skipBtn.onclick = () => overlay.remove()
      modalEl.appendChild(skipBtn)

    } catch (err) {
      setTitle('😕', 'Could not create demo store', err.message || 'An error occurred')
      prog(0, 'Failed')
      const modalEl = overlay.querySelector('.modal')
      const closeBtn = document.createElement('button')
      closeBtn.className = 'btn btn-secondary'
      closeBtn.style.cssText = 'margin-top:16px;width:100%'
      closeBtn.textContent = 'Close'
      closeBtn.onclick = () => overlay.remove()
      modalEl.appendChild(closeBtn)
    }
  }
}

/* ── Inject onboarding CSS ───────────────────────────────────────── */
;(function injectStyles() {
  const s = document.createElement('style')
  s.textContent = `
  /* ── Inline tips ──────────────────────────────────────────── */
  .ob-tip {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    background: linear-gradient(135deg, var(--accent-soft, rgba(108,95,245,.06)), var(--accent-dim, rgba(108,95,245,.09)));
    border: 1px solid rgba(108,95,245,.18);
    border-radius: 14px;
    padding: 14px 16px;
    margin-bottom: 16px;
    position: relative;
    animation: obTipIn .25s ease;
  }
  @keyframes obTipIn { from { opacity:0; transform:translateY(-6px) } to { opacity:1; transform:none } }
  .ob-tip-icon { font-size: 22px; flex-shrink: 0; line-height: 1.2; margin-top: 1px }
  .ob-tip-body { flex: 1; min-width: 0 }
  .ob-tip-title { font-size: 13px; font-weight: 700; margin-bottom: 3px; color: var(--text) }
  .ob-tip-desc { font-size: 12px; color: var(--text-2, var(--text-3)); line-height: 1.6 }
  .ob-tip-desc strong { color: var(--text) }
  .ob-tip-desc code { background: var(--surface-3); padding: 1px 5px; border-radius: 4px; font-size: 10.5px }
  .ob-tip-cta {
    margin-top: 10px;
    display: inline-flex;
    align-items: center;
    gap: 5px;
    background: var(--accent);
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 7px 14px;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
    transition: opacity .15s;
    font-family: inherit;
  }
  .ob-tip-cta:hover { opacity: .88 }
  .ob-tip-close {
    position: absolute;
    top: 10px; right: 12px;
    background: none;
    border: none;
    color: var(--text-3);
    cursor: pointer;
    font-size: 13px;
    line-height: 1;
    padding: 2px;
    opacity: .6;
    transition: opacity .15s;
    font-family: inherit;
  }
  .ob-tip-close:hover { opacity: 1 }

  /* ── Demo banner ──────────────────────────────────────────── */
  .demo-banner {
    background: linear-gradient(135deg, #1a1040, #0f1a2e);
    border: 1px solid rgba(124,111,255,.3);
    border-radius: 18px;
    padding: 22px 24px;
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 22px;
    position: relative;
    overflow: hidden;
  }
  .demo-banner::before {
    content: '';
    position: absolute;
    top: -60px; right: -60px;
    width: 200px; height: 200px;
    background: radial-gradient(circle, rgba(124,111,255,.15), transparent 70%);
    pointer-events: none;
  }
  [data-theme=""] .demo-banner,
  :not([data-theme="dark"]) .demo-banner {
    background: linear-gradient(135deg, #f0eeff, #e8f0ff);
    border-color: rgba(108,95,245,.2);
  }
  .demo-banner-icon {
    font-size: 36px;
    width: 62px;
    height: 62px;
    background: rgba(124,111,255,.15);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    border: 1px solid rgba(124,111,255,.25);
  }
  .demo-banner-body { flex: 1 }
  .demo-banner-title {
    font-size: 15px;
    font-weight: 800;
    margin-bottom: 3px;
    letter-spacing: -.01em;
  }
  .demo-banner-sub { font-size: 12.5px; color: var(--text-3); line-height: 1.5; margin-bottom: 12px }
  .demo-banner-actions { display: flex; gap: 8px; flex-wrap: wrap }
  .btn-demo {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    background: var(--accent, #7C6FFF);
    color: #fff;
    border: none;
    border-radius: 10px;
    padding: 9px 18px;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    transition: all .18s;
    font-family: inherit;
    text-decoration: none;
  }
  .btn-demo:hover { opacity: .9; transform: translateY(-1px); box-shadow: 0 4px 14px rgba(124,111,255,.3) }
  .btn-demo.secondary {
    background: transparent;
    border: 1px solid var(--border-md, rgba(255,255,255,.12));
    color: var(--text-2);
  }
  .btn-demo.secondary:hover { background: var(--surface-2); box-shadow: none }

  /* ── Checklist card ───────────────────────────────────────── */
  .ob-checklist {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--r-lg, 16px);
    padding: 16px 18px;
    margin-bottom: 20px;
  }
  .ob-checklist-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 14px;
  }
  .ob-checklist-title { font-size: 14px; font-weight: 800 }
  .ob-checklist-sub { font-size: 11px; color: var(--text-3); margin-top: 2px }
  .ob-checklist-pct { font-size: 20px; font-weight: 800; color: var(--accent); font-family: var(--mono) }
  .ob-checklist-steps { display: flex; flex-direction: column; gap: 8px }
  .ob-checklist-step {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 12.5px;
    color: var(--text-2);
    padding: 6px 0;
    border-bottom: 1px solid var(--border);
  }
  .ob-checklist-step:last-child { border-bottom: none }
  .ob-checklist-step.done { color: var(--text-3); text-decoration: line-through }
  .ob-step-check {
    width: 20px; height: 20px;
    border-radius: 50%;
    background: var(--surface-2);
    border: 1.5px solid var(--border-md);
    color: #22c55e;
    font-size: 10px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .ob-checklist-step.done .ob-step-check {
    background: rgba(34,197,94,.12);
    border-color: rgba(34,197,94,.35);
  }

  /* ── Demo mode banner (in agent editor) ───────────────────── */
  .demo-mode-bar {
    background: linear-gradient(90deg, rgba(34,197,94,.1), rgba(124,111,255,.1));
    border: 1px solid rgba(34,197,94,.25);
    border-radius: 12px;
    padding: 12px 16px;
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 14px;
    animation: obTipIn .3s ease;
  }
  .demo-mode-bar-text { flex: 1; font-size: 12.5px; color: var(--text-2) }
  .demo-mode-bar-text strong { color: var(--text) }

  /* ── Tab guide badge ──────────────────────────────────────── */
  .tab-guide-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    background: var(--accent);
    color: #fff;
    border-radius: 50%;
    font-size: 9px;
    font-weight: 800;
    margin-left: 4px;
    vertical-align: middle;
    animation: guidePulse 2s ease infinite;
  }
  @keyframes guidePulse {
    0%,100% { box-shadow: 0 0 0 0 rgba(108,95,245,.4) }
    50% { box-shadow: 0 0 0 4px rgba(108,95,245,0) }
  }
  `
  document.head.appendChild(s)
})()

/* ─── Expose globally ───────────────────────────────────────────── */
window.SG_OB = SG_OB
