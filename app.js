/**
 * Job Notification Tracker - SaaS Skeleton
 * Philosophy: No-install, intentional navigation, premium feel
 */

const routes = {
    '/': {
        title: 'Stop Missing The Right Jobs.',
        subtext: 'Precision-matched job discovery delivered daily at 9AM.',
        progress: 'Welcome',
        step: 'Step 1 of 6',
        status: 'Initialization',
        render: () => `
            <div class="kn-hero">
                <h1 class="kn-hero__headline">Stop Missing The Right Jobs.</h1>
                <p class="kn-hero__subtext">Precision-matched job discovery delivered daily at 9AM.</p>
                <a href="#/settings" class="kn-button kn-button--primary" style="font-size: 18px; padding: 16px 40px;">Start Tracking</a>
            </div>
        `
    },
    '/dashboard': {
        title: 'Dashboard',
        subtext: 'Your current job opportunities and tracking status.',
        progress: 'Overview',
        step: 'Step 2 of 6',
        status: 'In Progress',
        render: () => `
            <div class="kn-workspace">
                <div class="kn-empty-state">
                    <div class="kn-empty-state__icon">🔭</div>
                    <h2 class="kn-empty-state__title">No jobs yet.</h2>
                    <p class="kn-empty-state__subtitle">In the next step, you will load a realistic dataset of high-quality Indian tech roles.</p>
                    <div class="kn-mt-40">
                        <a href="#/settings" class="kn-button kn-button--secondary">Review Preferences</a>
                    </div>
                </div>
            </div>
        `
    },
    '/settings': {
        title: 'Job Preferences',
        subtext: 'Configure your target roles to enable precision matching.',
        progress: 'Configuration',
        step: 'Step 3 of 6',
        status: 'In Progress',
        render: () => `
            <div class="kn-workspace">
                <div class="kn-card">
                    <div class="kn-form-group">
                        <label class="kn-label">Role Keywords</label>
                        <input type="text" class="kn-input" placeholder="e.g. Frontend, React, Product Manager">
                    </div>
                    <div class="kn-form-group">
                        <label class="kn-label">Preferred Locations</label>
                        <input type="text" class="kn-input" placeholder="e.g. Bangalore, Remote, Hyderabad">
                    </div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
                        <div class="kn-form-group">
                            <label class="kn-label">Work Mode</label>
                            <select class="kn-select">
                                <option>Remote</option>
                                <option>Hybrid</option>
                                <option>Onsite</option>
                            </select>
                        </div>
                        <div class="kn-form-group">
                            <label class="kn-label">Experience Level</label>
                            <select class="kn-select">
                                <option>Entry Level (0-2 yrs)</option>
                                <option>Mid-Level (3-5 yrs)</option>
                                <option>Senior (6+ yrs)</option>
                            </select>
                        </div>
                    </div>
                    <div class="kn-mt-16">
                        <button class="kn-button kn-button--primary">Save Preferences</button>
                    </div>
                </div>
            </div>
            <aside class="kn-panel">
                <div class="kn-card">
                    <h3>Why settings matter?</h3>
                    <p class="kn-mt-8" style="font-size: 14px; color: #666;">
                        Our matching engine uses these parameters to filter out noise. Precision is the key to stopping the "Missing Job" problem.
                    </p>
                </div>
            </aside>
        `
    },
    '/saved': {
        title: 'Saved Jobs',
        subtext: 'Roles you have earmarked for application.',
        progress: 'Organization',
        step: 'Step 4 of 6',
        status: 'In Progress',
        render: () => `
            <div class="kn-workspace">
                <div class="kn-empty-state">
                    <div class="kn-empty-state__icon">🔖</div>
                    <h2 class="kn-empty-state__title">Your collection is empty.</h2>
                    <p class="kn-empty-state__subtitle">Saved jobs will appear here for quick access and tracking.</p>
                </div>
            </div>
        `
    },
    '/digest': {
        title: 'Daily Digest',
        subtext: 'Your top 10 matches for today.',
        progress: 'Curation',
        step: 'Step 5 of 6',
        status: 'In Progress',
        render: () => `
            <div class="kn-workspace">
                <div class="kn-empty-state">
                    <div class="kn-empty-state__icon">📬</div>
                    <h2 class="kn-empty-state__title">Next digest at 9:00 AM.</h2>
                    <p class="kn-empty-state__subtitle">We curate the best matches daily. Check back tomorrow morning.</p>
                </div>
            </div>
        `
    },
    '/proof': {
        title: 'Proof of Ship',
        subtext: 'Artifact collection and final verification.',
        progress: 'Finalization',
        step: 'Step 6 of 6',
        status: 'Shipped',
        render: () => `
            <div class="kn-workspace">
                <div class="kn-card">
                    <h3>Deployment Artifacts</h3>
                    <p class="kn-mt-16 text-slate-500">
                        Placeholder for artifact collection. In the next steps, you will use this section to verify the project deployment.
                    </p>
                    <div class="kn-mt-24" style="height: 200px; border: 2px dashed var(--color-border); display: flex; align-items: center; justify-content: center; color: #ccc;">
                        Artifact Dropzone
                    </div>
                </div>
            </div>
        `
    }
};

function handleRouteChange() {
    const hash = window.location.hash.slice(1) || '/';
    const route = routes[hash] || routes['/'];

    // Update Headings and Content
    const titleEl = document.querySelector('.kn-title');
    const subtextEl = document.querySelector('.kn-subtext');
    const containerEl = document.querySelector('.kn-main');

    // Hide header on landing page for true hero effect
    const headerEl = document.querySelector('.kn-header');
    if (hash === '/') {
        if (headerEl) headerEl.style.display = 'none';
        if (containerEl) containerEl.style.display = 'block'; // Non-grid for landing
    } else {
        if (headerEl) headerEl.style.display = 'block';
        if (containerEl) containerEl.style.display = 'grid'; // Grid for app
        if (titleEl) titleEl.textContent = route.title;
        if (subtextEl) subtextEl.textContent = route.subtext;
    }

    if (containerEl) {
        containerEl.innerHTML = route.render();
    }

    // Update Top Bar
    const progressEl = document.querySelector('.kn-progress');
    const statusEl = document.querySelector('.kn-badge');

    if (progressEl) {
        progressEl.innerHTML = `
            <span>${route.progress}</span>
            <span>/</span>
            <span>${route.step}</span>
        `;
    }

    if (statusEl) {
        statusEl.textContent = route.status;
        statusEl.className = 'kn-badge';
        if (route.status === 'Shipped') {
            statusEl.classList.add('kn-badge--shipped');
        }
    }

    // Update Navigation Active State
    document.querySelectorAll('.kn-nav-link').forEach(link => {
        const linkHash = link.getAttribute('href').slice(1);
        if (linkHash === hash) {
            link.classList.add('kn-nav-link--active');
        } else {
            link.classList.remove('kn-nav-link--active');
        }
    });

    // Close Mobile Menu if open
    const nav = document.querySelector('.kn-nav');
    if (nav) nav.classList.remove('kn-nav--open');

    // Scroll to top
    window.scrollTo(0, 0);
}

function toggleMobileMenu() {
    const nav = document.querySelector('.kn-nav');
    if (nav) nav.classList.toggle('kn-nav--open');
}

// Event Listeners
window.addEventListener('hashchange', handleRouteChange);
window.addEventListener('load', handleRouteChange);

// Export for use in HTML
window.toggleMobileMenu = toggleMobileMenu;
