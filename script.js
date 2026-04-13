/* YZ-MAIL SECURE GATEWAY - Enterprise Portal Logic */

const state = {
    ip: '95.89.46.41'
};

const router = {
    navigate: function(view) {
        const home = document.getElementById('portal-main-view');
        const error = document.getElementById('view-error');
        
        if (view === 'error') {
            home?.classList.add('hidden');
            error?.classList.remove('hidden');
        } else {
            error?.classList.add('hidden');
            home?.classList.remove('hidden');
        }
        if (window.lucide) lucide.createIcons();
    }
};

// Enterprise System Initialization Logs
const bootLogs = [
    "YZ-SYSTEMS GATEWAY INITIALIZATION [BUILD 4.12.3]",
    "VERIFYING LOCAL NODE_AMS_01 INTEGRITY...",
    "ESTABLISHING IDENTITY_PROVIDER_SAML_HANDSHAKE...",
    "CERT_CHAIN: VALIDATING ROOT_CA_YZ_CORE... [OK]",
    "ZTA_POLICY: APPLYING ZERO_TRUST_ACCESS_CONTROL...",
    "IPSEC_TUNNEL: ROTATING CIPHER KEYS (AES-256-GCM)...",
    "FIPS_140_2: HARDWARE_TOKEN_INTERFACE_INITIALIZED",
    "NODE_READY. AUTHENTICATE TO ACCESS AMS_CLUSTER_ALPHA."
];

async function runBoot() {
    const terminal = document.getElementById('terminal-content');
    if (!terminal) return;

    for (const text of bootLogs) {
        const timestamp = "[" + new Date().toISOString().replace('T', ' ').substring(0, 19) + "]";
        const line = document.createElement('div');
        line.innerHTML = '<span style="opacity: 0.4; font-family: Roboto Mono, monospace;">' + timestamp + '</span> <strong>SYSTEM:</strong> ' + text;
        terminal.appendChild(line);
        terminal.scrollTop = terminal.scrollHeight;
        
        const delay = 100 + Math.floor(Math.random() * 300);
        await new Promise(resolve => setTimeout(resolve, delay));
    }

    await new Promise(resolve => setTimeout(resolve, 600));
    const bootContainer = document.getElementById('boot-sequence');
    if (bootContainer) {
        bootContainer.style.opacity = '0';
        bootContainer.style.transition = 'opacity 0.5s ease-out';
        
        setTimeout(() => {
            bootContainer.classList.add('hidden');
            const mainApp = document.getElementById('app-content');
            if (mainApp) mainApp.classList.remove('hidden');
            initApp();
        }, 500);
    }
}

function initApp() {
    renderDiag();
    setInterval(updateIP, 8000);
    if (window.lucide) lucide.createIcons();
}

function toggleModal(id, show) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.toggle('hidden', !show);
    if (show && id === 'diag-modal') renderDiag();
    if (window.lucide) lucide.createIcons();
}

// Enterprise Auth Handler (Mock Login - Access Restricted)
document.getElementById('auth-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const errorEl = document.getElementById('auth-error');
    if (errorEl) {
        errorEl.classList.remove('hidden');
        errorEl.style.animation = 'none';
        errorEl.offsetHeight; 
        errorEl.style.animation = 'shake 0.4s cubic-bezier(.36,.07,.19,.97) both';
    }
});

function renderDiag() {
    const container = document.getElementById('diag-stats');
    if (!container) return;

    const stats = [
        { label: 'Tunnel Latency', value: '14.2 ms' },
        { label: 'Uptime (Global)', value: '99.98%' },
        { label: 'Encryption Stck', value: 'RSA-4096' },
        { label: 'MFA Status', value: 'ENABLED' }
    ];

    container.innerHTML = stats.map(s => 
        '<div style="padding: 1rem; border: 1px solid var(--border-color); background: rgba(255,255,255,0.01);">' +
            '<div style="font-size: 9px; text-transform: uppercase; color: var(--text-secondary); margin-bottom: 4px;">' + s.label + '</div>' +
            '<div style="font-weight: 700; font-size: 0.9rem;">' + s.value + '</div>' +
        '</div>'
    ).join('');
}

function updateIP() {
    const el = document.getElementById('display-ip');
    if (el) {
        if (Math.random() > 0.95) {
            const parts = state.ip.split('.');
            parts[3] = Math.floor(Math.random() * 255);
            state.ip = parts.join('.');
            el.textContent = state.ip;
        }
    }
}

window.onload = runBoot;
