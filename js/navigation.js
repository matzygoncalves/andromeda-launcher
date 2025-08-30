/**
 * 🧭 Funções de Navegação
 * Gerencia a navegação entre páginas do sistema
 */

// Função para mostrar página principal
function showMainPage() {
    hideAllPages();
    document.getElementById('mainPage').classList.add('active');
}

// Função para mostrar backend dashboard
function showBackendDashboard() {
    hideAllPages();
    document.getElementById('backendPage').classList.add('active');
}

// Função para mostrar frontend dashboard
function showFrontendDashboard() {
    hideAllPages();
    document.getElementById('frontendPage').classList.add('active');
}

// Função para mostrar status do sistema
function showSystemStatus() {
    hideAllPages();
    document.getElementById('statusPage').classList.add('active');
}

// Função para esconder todas as páginas
function hideAllPages() {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
}

// Função para abrir frontend em nova aba
function openFrontendInNewTab() {
    window.open('http://localhost:5173', '_blank');
}

// Função para testar API Electron
function testElectronAPI() {
    if (window.electronAPI && window.electronAPI.openDevTools) {
        try {
            window.electronAPI.openDevTools();
            showToast('✅ API Electron funcionando! DevTools abertos.', 'success');
        } catch (error) {
            showToast('❌ Erro ao abrir DevTools: ' + error.message, 'error');
        }
    } else {
        showToast('❌ API Electron não encontrada', 'error');
    }
}

// Exportar funções para uso global
window.showMainPage = showMainPage;
window.showBackendDashboard = showBackendDashboard;
window.showFrontendDashboard = showFrontendDashboard;
window.showSystemStatus = showSystemStatus;
window.openFrontendInNewTab = openFrontendInNewTab;
window.testElectronAPI = testElectronAPI;

console.log('🧭 Módulo de navegação carregado');
