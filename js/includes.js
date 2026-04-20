/* Tiny client-side include system for static hosting (Netlify/Cloudflare Pages).
 *
 * Usage in any page:
 *   <body data-active-nav="loan">
 *     <div data-include="header"></div>
 *     ...
 *     <div class="page-title-row">
 *       <div class="page-title-stack">
 *         <h1>...</h1>
 *         <p class="page-last-updated">Last updated: April 2026</p>
 *       </div>
 *       <div data-include="page-header"></div>   // injects the device chip
 *     </div>
 *     ...
 *     <div data-include="footer"></div>
 *     <script src="js/includes.js" defer></script>
 *   </body>
 *
 * SEO note: keep <title>, meta, JSON-LD, and the <h1> in the page itself.
 * Only chrome (nav, footer, chip) is injected.
 */
(function () {
  const PARTIAL_PATHS = {
    header: 'partials/header.html',
    footer: 'partials/footer.html',
    'page-header': 'partials/page-header.html',
  };

  const cache = new Map();
  function fetchPartial(name) {
    if (!PARTIAL_PATHS[name]) return Promise.resolve('');
    if (cache.has(name)) return cache.get(name);
    const promise = fetch(PARTIAL_PATHS[name], { cache: 'no-cache' })
      .then((r) => (r.ok ? r.text() : ''))
      .catch(() => '');
    cache.set(name, promise);
    return promise;
  }

  function markActiveNav(rootHost) {
    const activeKey = document.body && document.body.dataset
      ? document.body.dataset.activeNav
      : null;
    if (!activeKey) return;
    const topLinks = rootHost.querySelectorAll(`[data-tb-nav] a[data-nav-key="${activeKey}"]`);
    topLinks.forEach((topLink) => {
      topLink.classList.remove('text-slate-700', 'hover:bg-slate-100');
      topLink.classList.add('bg-blue-600', 'text-white');
      topLink.setAttribute('aria-current', 'page');
    });
    const bottomLink = rootHost.querySelector(`[data-tb-mobile-nav] a[data-nav-key="${activeKey}"]`);
    if (bottomLink) {
      bottomLink.classList.remove('text-slate-500');
      bottomLink.classList.add('text-blue-600');
      bottomLink.setAttribute('aria-current', 'page');
    }
    const footerLinks = document.querySelectorAll(`[data-tb-footer-nav] a[data-nav-key="${activeKey}"]`);
    footerLinks.forEach((footerLink) => {
      footerLink.classList.remove('hover:text-blue-600');
      footerLink.classList.add('text-blue-600', 'font-semibold');
      footerLink.setAttribute('aria-current', 'page');
    });
  }

  async function injectAll() {
    const hosts = Array.from(document.querySelectorAll('[data-include]'));
    await Promise.all(
      hosts.map(async (host) => {
        const name = host.getAttribute('data-include');
        const html = await fetchPartial(name);
        if (!html) return;
        host.innerHTML = html;
      }),
    );
    document.querySelectorAll('[data-include]').forEach((host) => markActiveNav(host));
    wireMobileNav();
    document.dispatchEvent(new CustomEvent('tb:partials-loaded'));
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      try { window.lucide.createIcons(); } catch (_) { /* noop */ }
    }
  }

  function wireMobileNav() {
    const toggle = document.getElementById('tb-nav-toggle');
    const closeBtn = document.getElementById('tb-nav-close');
    const panel = document.getElementById('tb-mobile-panel');
    const backdrop = document.getElementById('tb-mobile-backdrop');
    if (!toggle || !panel || !backdrop) return;

    function openPanel() {
      panel.removeAttribute('inert');
      // Force a layout pass so the transform transitions on .is-open add.
      panel.classList.add('is-open');
      backdrop.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.classList.add('tb-nav-open');
    }
    function closePanel() {
      panel.classList.remove('is-open');
      backdrop.classList.remove('is-open');
      panel.setAttribute('inert', '');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('tb-nav-open');
    }

    toggle.addEventListener('click', () => {
      if (panel.classList.contains('is-open')) closePanel(); else openPanel();
    });
    if (closeBtn) closeBtn.addEventListener('click', closePanel);
    backdrop.addEventListener('click', closePanel);
    panel.querySelectorAll('a[href]').forEach((link) => {
      link.addEventListener('click', closePanel);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && panel.classList.contains('is-open')) closePanel();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectAll);
  } else {
    injectAll();
  }
})();

/* Shared helpers other pages can call. */
window.tbToast = function (message) {
  let el = document.querySelector('.tb-toast');
  if (!el) {
    el = document.createElement('div');
    el.className = 'tb-toast';
    el.setAttribute('role', 'status');
    document.body.appendChild(el);
  }
  el.textContent = message;
  requestAnimationFrame(() => {
    el.classList.add('is-on');
    clearTimeout(el._t);
    el._t = setTimeout(() => el.classList.remove('is-on'), 1800);
  });
};

window.tbCopyShareLink = function () {
  const url = window.location.href;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard
      .writeText(url)
      .then(() => window.tbToast('Link copied to clipboard'))
      .catch(() => window.tbToast('Could not copy link'));
  } else {
    window.tbToast('Copy not supported');
  }
};

/* Flash the "Saved" indicator next to the device-save chip when the
 * partial is in place. Pages call window.tbFlashSaved() after writing
 * to localStorage. Safe to call before the partial loads.
 */
window.tbFlashSaved = function () {
  const el = document.getElementById('saved-flash');
  if (!el) return;
  el.hidden = false;
  el.classList.add('is-on');
  clearTimeout(el._t);
  el._t = setTimeout(() => {
    el.classList.remove('is-on');
    setTimeout(() => { el.hidden = true; }, 220);
  }, 1100);
};
