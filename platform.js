/* ============================================================
   KodNest Platform — Auth, Routing & State
   ============================================================ */

'use strict';

// ── Demo Credentials ──────────────────────────────────────────
const USERS = [
    { email: 'admin@kodnest.com', password: 'admin123', role: 'admin', name: 'Admin User' },
    { email: 'user@kodnest.com', password: 'user123', role: 'user', name: 'KodNest User' },
];

// ── Products Registry ─────────────────────────────────────────
// Add new products here — no other code changes needed
const PRODUCTS = [
    {
        id: 'p1',
        name: 'Placement Readiness Platform',
        shortName: 'Placement Platform',
        description: 'AI-powered JD analysis, ATS resume scoring, company intel, and 7-day placement prep plan.',
        icon: 'layers',
        iconClass: 'blue',
        src: 'index.html',
        access: ['admin', 'user'],
        features: ['JD Analysis', 'AI Resume Builder', 'ATS Scoring', 'Company Intel'],
        navLabel: 'Product 1',
    },
    {
        id: 'p2',
        name: 'Job Notification Tracker',
        shortName: 'Job Tracker',
        description: 'Track job applications, save listings, manage notifications, and monitor your job search pipeline.',
        icon: 'briefcase',
        iconClass: 'purple',
        src: 'konestprjct/index.html',
        access: ['admin'],
        features: ['Job Listings', 'Save & Apply', 'Filters', 'Digest'],
        navLabel: 'Product 2',
    },
];

// ── State ─────────────────────────────────────────────────────
const AUTH_KEY = 'platform_auth';

function getAuth() {
    try { return JSON.parse(localStorage.getItem(AUTH_KEY)) || null; }
    catch { return null; }
}

function setAuth(user) {
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
}

function clearAuth() {
    localStorage.removeItem(AUTH_KEY);
}

function isLoggedIn() { return !!getAuth(); }

function hasAccess(product) {
    const auth = getAuth();
    if (!auth) return false;
    return product.access.includes(auth.role);
}

// ── Router ────────────────────────────────────────────────────
let currentView = 'dashboard'; // 'dashboard' | 'p1' | 'p2' | 'profile' | 'settings'

function navigate(view) {
    currentView = view;
    render();
    window.scrollTo(0, 0);
}

// ── Icons (inline SVG) ────────────────────────────────────────
const ICONS = {
    home: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
    layers: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
    briefcase: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
    user: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
    settings: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
    logout: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>`,
    lock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
    external: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`,
    arrow_left: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>`,
    check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 15 4 10"/></svg>`,
    grid: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`,
    zap: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
};

function icon(name, cls = '') {
    return `<span class="nav-icon ${cls}" style="display:inline-flex;align-items:center;">${ICONS[name] || ''}</span>`;
}

// ── Render ────────────────────────────────────────────────────
function render() {
    const auth = getAuth();
    const loginScreen = document.getElementById('login-screen');
    const shell = document.getElementById('platform-shell');

    if (!auth) {
        loginScreen.style.display = 'flex';
        shell.style.display = 'none';
        return;
    }

    loginScreen.style.display = 'none';
    shell.style.display = 'flex';

    renderSidebar(auth);
    renderTopbar(auth);
    renderContent(auth);
}

function renderSidebar(auth) {
    const initials = auth.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);

    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: 'home', access: ['admin', 'user'] },
        ...PRODUCTS.map(p => ({ id: p.id, label: p.navLabel, icon: p.icon, access: p.access, sub: p.shortName })),
        { id: 'profile', label: 'Profile', icon: 'user', access: ['admin', 'user'] },
        { id: 'settings', label: 'Settings', icon: 'settings', access: ['admin', 'user'] },
    ];

    const navHtml = navItems.map(item => {
        const canAccess = item.access.includes(auth.role);
        const isActive = currentView === item.id;
        const lockedClass = !canAccess ? 'locked' : '';
        const activeClass = isActive ? 'active' : '';
        const lockIcon = !canAccess ? `<span class="nav-icon" style="margin-left:auto;opacity:0.5;">${ICONS.lock}</span>` : '';
        return `
      <div class="nav-item ${activeClass} ${lockedClass}" onclick="navigate('${item.id}')" title="${item.label}${!canAccess ? ' (Admin only)' : ''}">
        <span class="nav-icon">${ICONS[item.icon] || ''}</span>
        <span>${item.label}</span>
        ${lockIcon}
      </div>`;
    }).join('');

    document.getElementById('sidebar-nav').innerHTML = `
    <div class="sidebar-section-label">Main</div>
    ${navHtml}
  `;

    document.getElementById('sidebar-user').innerHTML = `
    <div class="user-card" onclick="navigate('profile')">
      <div class="user-avatar">${initials}</div>
      <div class="user-info">
        <div class="user-name">${auth.name}</div>
        <div class="user-role">${auth.role}</div>
      </div>
    </div>
    <div class="nav-item" onclick="handleLogout()" style="margin-top:4px;">
      <span class="nav-icon">${ICONS.logout}</span>
      <span>Logout</span>
    </div>
  `;
}

function renderTopbar(auth) {
    const breadcrumbs = {
        dashboard: [{ label: 'Dashboard' }],
        profile: [{ label: 'Dashboard', view: 'dashboard' }, { label: 'Profile' }],
        settings: [{ label: 'Dashboard', view: 'dashboard' }, { label: 'Settings' }],
        ...Object.fromEntries(PRODUCTS.map(p => [p.id, [{ label: 'Dashboard', view: 'dashboard' }, { label: p.shortName }]])),
    };

    const crumbs = breadcrumbs[currentView] || [{ label: 'Dashboard' }];
    const crumbHtml = crumbs.map((c, i) => {
        const isLast = i === crumbs.length - 1;
        if (isLast) return `<span class="crumb-active">${c.label}</span>`;
        return `<span onclick="navigate('${c.view}')" style="cursor:pointer;transition:color 0.15s;" onmouseover="this.style.color='#0f172a'" onmouseout="this.style.color=''">${c.label}</span><span class="crumb-sep">/</span>`;
    }).join('');

    const product = PRODUCTS.find(p => p.id === currentView);
    const rightAction = product ? `
    <a href="${product.src}" target="_blank" class="topbar-btn">
      ${ICONS.external} Open in New Tab
    </a>
  ` : '';

    document.getElementById('topbar-breadcrumb').innerHTML = crumbHtml;
    document.getElementById('topbar-right').innerHTML = rightAction;
}

function renderContent(auth) {
    const container = document.getElementById('content-area');

    if (currentView === 'dashboard') {
        container.innerHTML = renderDashboard(auth);
    } else if (currentView === 'profile') {
        container.innerHTML = renderProfile(auth);
    } else if (currentView === 'settings') {
        container.innerHTML = renderSettings(auth);
    } else {
        const product = PRODUCTS.find(p => p.id === currentView);
        if (product) {
            if (!hasAccess(product)) {
                container.innerHTML = renderAccessDenied(product);
            } else {
                container.innerHTML = renderProductView(product);
            }
        }
    }
}

// ── Dashboard Home ────────────────────────────────────────────
function renderDashboard(auth) {
    const accessibleProducts = PRODUCTS.filter(p => hasAccess(p));
    const totalProducts = PRODUCTS.length;
    const now = new Date();
    const greeting = now.getHours() < 12 ? 'Good morning' : now.getHours() < 17 ? 'Good afternoon' : 'Good evening';

    const productCards = PRODUCTS.map(p => {
        const canAccess = hasAccess(p);
        const featuresHtml = p.features.map(f => `<span style="font-size:10px;padding:2px 8px;background:#f1f5f9;border-radius:20px;color:#64748b;font-weight:500;">${f}</span>`).join('');

        return `
      <div class="product-card ${!canAccess ? 'locked' : ''}">
        <div class="product-card-header">
          <div class="product-icon ${p.iconClass}">${ICONS[p.icon] || ''}</div>
          <div class="product-badges">
            <span class="badge badge-active">● Active</span>
            ${p.access.includes('admin') && !p.access.includes('user')
                ? '<span class="badge badge-admin">Admin Only</span>'
                : '<span class="badge badge-user">All Users</span>'}
          </div>
        </div>
        <div>
          <div class="product-name">${p.name}</div>
          <div class="product-desc" style="margin-top:6px;">${p.description}</div>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:6px;">${featuresHtml}</div>
        <div class="product-cta">
          ${canAccess
                ? `<button class="btn btn-primary" onclick="navigate('${p.id}')">${ICONS.zap} Open Product</button>`
                : `<button class="btn btn-secondary" disabled>${ICONS.lock} Admin Only</button>`}
          ${canAccess ? `<a href="${p.src}" target="_blank" class="btn btn-secondary">${ICONS.external}</a>` : ''}
        </div>
      </div>`;
    }).join('');

    return `
    <div class="dashboard-scroll">
      <div class="page-header">
        <div class="page-title">${greeting}, ${auth.name.split(' ')[0]} 👋</div>
        <div class="page-sub">Welcome to KodNest Platform — your unified workspace.</div>
      </div>

      <div class="stats-row">
        <div class="stat-card">
          <div class="stat-label">Total Products</div>
          <div class="stat-value">${totalProducts}</div>
          <div class="stat-sub">Integrated apps</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Your Access</div>
          <div class="stat-value">${accessibleProducts.length}</div>
          <div class="stat-sub">Products available</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Role</div>
          <div class="stat-value" style="font-size:20px;text-transform:capitalize;">${auth.role}</div>
          <div class="stat-sub">${auth.role === 'admin' ? 'Full access' : 'Standard access'}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Platform</div>
          <div class="stat-value" style="font-size:20px;">v1.0</div>
          <div class="stat-sub">KodNest SaaS</div>
        </div>
      </div>

      <div class="section-title">
        ${ICONS.grid} Products
      </div>
      <div class="products-grid">
        ${productCards}
      </div>

      <div class="section-title" style="margin-top:8px;">
        ${ICONS.zap} Quick Access
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;">
        ${accessibleProducts.map(p => `
          <button class="btn btn-secondary" onclick="navigate('${p.id}')">
            ${ICONS[p.icon]} ${p.shortName}
          </button>`).join('')}
        <button class="btn btn-secondary" onclick="navigate('profile')">${ICONS.user} Profile</button>
        <button class="btn btn-secondary" onclick="navigate('settings')">${ICONS.settings} Settings</button>
      </div>
    </div>`;
}

// ── Product Iframe View ───────────────────────────────────────
function renderProductView(product) {
    return `
    <div class="product-view">
      <div class="loading-overlay" id="iframe-loading">
        <div class="spinner"></div>
        <div class="loading-text">Loading ${product.shortName}…</div>
      </div>
      <iframe
        class="product-iframe"
        src="${product.src}"
        title="${product.name}"
        onload="document.getElementById('iframe-loading').style.display='none';"
        sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals allow-downloads"
      ></iframe>
    </div>`;
}

// ── Access Denied ─────────────────────────────────────────────
function renderAccessDenied(product) {
    return `
    <div class="dashboard-scroll">
      <div class="empty-state">
        <div class="empty-icon">${ICONS.lock}</div>
        <div class="empty-title">Access Restricted</div>
        <div class="empty-sub">${product.name} requires Admin access. Contact your administrator to request access.</div>
        <button class="btn btn-primary" style="margin-top:20px;" onclick="navigate('dashboard')">${ICONS.arrow_left} Back to Dashboard</button>
      </div>
    </div>`;
}

// ── Profile Page ──────────────────────────────────────────────
function renderProfile(auth) {
    const initials = auth.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
    const accessibleProducts = PRODUCTS.filter(p => hasAccess(p));

    return `
    <div class="settings-scroll">
      <div class="page-header">
        <div class="page-title">Profile</div>
        <div class="page-sub">Your account information and access details.</div>
      </div>

      <div class="settings-section">
        <div style="display:flex;align-items:center;gap:20px;margin-bottom:20px;">
          <div style="width:64px;height:64px;border-radius:50%;background:linear-gradient(135deg,#2563eb,#7c3aed);display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:700;color:white;">${initials}</div>
          <div>
            <div style="font-size:18px;font-weight:700;color:var(--text-primary);">${auth.name}</div>
            <div style="font-size:13px;color:var(--text-muted);margin-top:2px;">${auth.email}</div>
            <span class="badge ${auth.role === 'admin' ? 'badge-admin' : 'badge-user'}" style="margin-top:6px;display:inline-flex;">${auth.role}</span>
          </div>
        </div>
        <div class="settings-section-title">Account Details</div>
        <div class="settings-row"><span class="settings-row-label">Full Name</span><span class="settings-row-value">${auth.name}</span></div>
        <div class="settings-row"><span class="settings-row-label">Email</span><span class="settings-row-value">${auth.email}</span></div>
        <div class="settings-row"><span class="settings-row-label">Role</span><span class="settings-row-value" style="text-transform:capitalize;">${auth.role}</span></div>
        <div class="settings-row"><span class="settings-row-label">Products Accessible</span><span class="settings-row-value">${accessibleProducts.length} of ${PRODUCTS.length}</span></div>
      </div>

      <div class="settings-section">
        <div class="settings-section-title">Product Access</div>
        ${PRODUCTS.map(p => {
        const canAccess = hasAccess(p);
        return `<div class="settings-row">
            <div>
              <div class="settings-row-label">${p.name}</div>
              <div class="settings-row-value">${p.features.join(', ')}</div>
            </div>
            <span class="badge ${canAccess ? 'badge-active' : 'badge-locked'}">${canAccess ? '✓ Access Granted' : '🔒 No Access'}</span>
          </div>`;
    }).join('')}
      </div>

      <button class="btn btn-secondary" onclick="handleLogout()" style="margin-top:8px;">${ICONS.logout} Sign Out</button>
    </div>`;
}

// ── Settings Page ─────────────────────────────────────────────
function renderSettings(auth) {
    return `
    <div class="settings-scroll">
      <div class="page-header">
        <div class="page-title">Settings</div>
        <div class="page-sub">Platform configuration and preferences.</div>
      </div>

      <div class="settings-section">
        <div class="settings-section-title">Platform</div>
        <div class="settings-row"><span class="settings-row-label">Platform Version</span><span class="settings-row-value">v1.0.0</span></div>
        <div class="settings-row"><span class="settings-row-label">Products Integrated</span><span class="settings-row-value">${PRODUCTS.length}</span></div>
        <div class="settings-row"><span class="settings-row-label">Architecture</span><span class="settings-row-value">Unified SaaS Dashboard</span></div>
        <div class="settings-row"><span class="settings-row-label">Auth Mode</span><span class="settings-row-value">Role-based (localStorage)</span></div>
      </div>

      <div class="settings-section">
        <div class="settings-section-title">Registered Products</div>
        ${PRODUCTS.map(p => `
          <div class="settings-row">
            <div>
              <div class="settings-row-label">${p.name}</div>
              <div class="settings-row-value">src: ${p.src} · access: ${p.access.join(', ')}</div>
            </div>
            <span class="badge badge-active">Active</span>
          </div>`).join('')}
      </div>

      <div class="settings-section">
        <div class="settings-section-title">Session</div>
        <div class="settings-row"><span class="settings-row-label">Logged in as</span><span class="settings-row-value">${auth.email}</span></div>
        <div class="settings-row"><span class="settings-row-label">Role</span><span class="settings-row-value" style="text-transform:capitalize;">${auth.role}</span></div>
        <div style="margin-top:12px;">
          <button class="btn btn-secondary" onclick="handleLogout()">${ICONS.logout} Sign Out</button>
        </div>
      </div>
    </div>`;
}

// ── Auth Actions ──────────────────────────────────────────────
function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value.trim().toLowerCase();
    const password = document.getElementById('login-password').value;
    const errorEl = document.getElementById('login-error');

    const user = USERS.find(u => u.email === email && u.password === password);
    if (!user) {
        errorEl.style.display = 'block';
        errorEl.textContent = 'Invalid email or password. Check the demo credentials below.';
        return;
    }

    errorEl.style.display = 'none';
    setAuth({ email: user.email, name: user.name, role: user.role });
    currentView = 'dashboard';
    render();
}

function handleLogout() {
    clearAuth();
    currentView = 'dashboard';
    render();
}

// ── Role selector ─────────────────────────────────────────────
function selectRole(role) {
    document.querySelectorAll('.role-option').forEach(el => el.classList.remove('selected'));
    document.querySelector(`.role-option[data-role="${role}"]`).classList.add('selected');
    // Fill demo credentials
    if (role === 'admin') {
        document.getElementById('login-email').value = 'admin@kodnest.com';
        document.getElementById('login-password').value = 'admin123';
    } else {
        document.getElementById('login-email').value = 'user@kodnest.com';
        document.getElementById('login-password').value = 'user123';
    }
}

// ── Init ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('login-form').addEventListener('submit', handleLogin);
    render();
});
