/**
 * 🚀 Controle dos Servidores
 * Gerencia os servidores Django e React
 */

// Variáveis para controlar o status dos servidores
let backendStatus = false;
let frontendStatus = false;

// Função para iniciar servidor backend Django
async function startBackendServer() {
    try {
        showToast('🔄 Iniciando servidor backend...', 'info');
        
        const result = await window.electronAPI.startBackendServer();
        
        if (result.success) {
            backendStatus = true;
            showToast('✅ ' + result.message, 'success');
            updateBackendStatus();
        } else {
            showToast('❌ ' + result.message, 'error');
        }
    } catch (error) {
        showToast('❌ Erro ao iniciar backend: ' + error.message, 'error');
    }
}

// Função para parar servidor backend Django
async function stopBackendServer() {
    try {
        showToast('🔄 Parando servidor backend...', 'info');
        
        const result = await window.electronAPI.stopBackendServer();
        
        if (result.success) {
            backendStatus = false;
            showToast('✅ ' + result.message, 'success');
            updateBackendStatus();
        } else {
            showToast('❌ ' + result.message, 'error');
        }
    } catch (error) {
        showToast('❌ Erro ao parar backend: ' + error.message, 'error');
    }
}

// Função para iniciar servidor frontend React
async function startFrontendDev() {
    try {
        showToast('🔄 Iniciando servidor frontend...', 'info');
        
        const result = await window.electronAPI.startFrontendDev();
        
        if (result.success) {
            frontendStatus = true;
            showToast('✅ ' + result.message, 'success');
            updateFrontendStatus();
        } else {
            showToast('❌ ' + result.message, 'error');
        }
    } catch (error) {
        showToast('❌ Erro ao iniciar frontend: ' + error.message, 'error');
    }
}

// Função para parar servidor frontend React
async function stopFrontendDev() {
    try {
        showToast('🔄 Parando servidor frontend...', 'info');
        
        const result = await window.electronAPI.stopFrontendDev();
        
        if (result.success) {
            frontendStatus = false;
            showToast('✅ ' + result.message, 'success');
            updateFrontendStatus();
        } else {
            showToast('❌ ' + result.message, 'error');
        }
    } catch (error) {
        showToast('❌ Erro ao parar frontend: ' + error.message, 'error');
    }
}

// Função para verificar status dos servidores
async function checkServerStatus() {
    try {
        const backendResult = await window.electronAPI.getBackendStatus();
        const frontendResult = await window.electronAPI.getFrontendStatus();
        
        backendStatus = backendResult.running;
        frontendStatus = frontendResult.running;
        
        updateBackendStatus();
        updateFrontendStatus();
    } catch (error) {
        console.error('Erro ao verificar status:', error);
    }
}

// Função para atualizar interface do backend
function updateBackendStatus() {
    const statusElement = document.getElementById('backendStatus');
    const startBtn = document.getElementById('startBackendBtn');
    const stopBtn = document.getElementById('stopBackendBtn');
    
    if (statusElement) {
        if (backendStatus) {
            statusElement.textContent = '🟢 Online';
            statusElement.className = 'text-green-400 font-semibold';
        } else {
            statusElement.textContent = '🔴 Offline';
            statusElement.className = 'text-red-400 font-semibold';
        }
    }
    
    if (startBtn) {
        startBtn.disabled = backendStatus;
        if (backendStatus) {
            startBtn.className = 'bg-gray-500 cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105';
        } else {
            startBtn.className = 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105';
        }
    }
    
    if (stopBtn) {
        stopBtn.disabled = !backendStatus;
        if (!backendStatus) {
            stopBtn.className = 'bg-gray-500 cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105';
        } else {
            stopBtn.className = 'bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105';
        }
    }
}

// Função para atualizar interface do frontend
function updateFrontendStatus() {
    const statusElement = document.getElementById('frontendStatus');
    const startBtn = document.getElementById('startFrontendBtn');
    const stopBtn = document.getElementById('stopFrontendBtn');
    
    if (statusElement) {
        if (frontendStatus) {
            statusElement.textContent = '🟢 Online';
            statusElement.className = 'text-green-400 font-semibold';
        } else {
            statusElement.textContent = '🔴 Offline';
            statusElement.className = 'text-red-400 font-semibold';
        }
    }
    
    if (startBtn) {
        startBtn.disabled = frontendStatus;
        if (frontendStatus) {
            startBtn.className = 'bg-gray-500 cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105';
        } else {
            startBtn.className = 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105';
        }
    }
    
    if (stopBtn) {
        stopBtn.disabled = !frontendStatus;
        if (!frontendStatus) {
            stopBtn.className = 'bg-gray-500 cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105';
        } else {
            stopBtn.className = 'bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105';
        }
    }
}

// Função para abrir frontend em nova aba
async function openFrontendInNewTab() {
    if (frontendStatus) {
        try {
            console.log('🌐 Tentando abrir frontend no navegador...');
            const result = await window.electronAPI.openInBrowser('http://localhost:5173');
            
            if (result.success) {
                showToast('🌐 Frontend aberto no navegador padrão!', 'success');
            } else {
                showToast('❌ Erro ao abrir frontend: ' + result.message, 'error');
            }
        } catch (error) {
            console.error('❌ Erro ao abrir frontend:', error);
            showToast('❌ Erro ao abrir frontend: ' + error.message, 'error');
        }
    } else {
        showToast('⚠️ Servidor frontend não está rodando', 'warning');
    }
}

// Função para abrir backend em nova aba
async function openBackendInNewTab() {
    if (backendStatus) {
        try {
            console.log('🌐 Tentando abrir backend no navegador...');
            const result = await window.electronAPI.openInBrowser('http://localhost:8000');
            
            if (result.success) {
                showToast('🌐 Backend aberto no navegador padrão!', 'success');
            } else {
                showToast('❌ Erro ao abrir backend: ' + result.message, 'error');
            }
        } catch (error) {
            console.error('❌ Erro ao abrir backend:', error);
            showToast('❌ Erro ao abrir backend: ' + error.message, 'error');
        }
    } else {
        showToast('⚠️ Servidor backend não está rodando', 'warning');
    }
}

// Função para abrir documentação do backend
async function openBackendDocumentation() {
    if (backendStatus) {
        try {
            console.log('📚 Tentando abrir documentação do backend...');
            const result = await window.electronAPI.openInBrowser('http://localhost:8000/redoc/');
            
            if (result.success) {
                showToast('📚 Documentação do backend aberta no navegador!', 'success');
            } else {
                showToast('❌ Erro ao abrir documentação: ' + result.message, 'error');
            }
        } catch (error) {
            console.error('❌ Erro ao abrir documentação:', error);
            showToast('❌ Erro ao abrir documentação: ' + error.message, 'error');
        }
    } else {
        showToast('⚠️ Servidor backend não está rodando', 'warning');
    }
}

// Função para iniciar todos os servidores
async function startAllServers() {
    showToast('🚀 Iniciando todos os servidores...', 'info');
    
    await startBackendServer();
    await new Promise(resolve => setTimeout(resolve, 2000)); // Aguardar 2s
    await startFrontendDev();
    
    // Aguardar um pouco mais para o frontend estar pronto
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Abrir o frontend no navegador padrão
    await openFrontendInNewTab();
    
    showToast('🎉 Todos os servidores iniciados e frontend aberto!', 'success');
}

// Função para parar todos os servidores
async function stopAllServers() {
    showToast('🛑 Parando todos os servidores...', 'info');
    
    await stopBackendServer();
    await stopFrontendDev();
    
    showToast('✅ Todos os servidores parados!', 'success');
}

// Função para abrir todos os servidores no navegador
async function openAllServers() {
    showToast('🌐 Abrindo todos os servidores no navegador...', 'info');
    
    try {
        if (backendStatus) {
            await openBackendInNewTab();
        }
        
        if (frontendStatus) {
            await openFrontendInNewTab();
        }
        
        if (!backendStatus && !frontendStatus) {
            showToast('⚠️ Nenhum servidor está rodando', 'warning');
        } else {
            showToast('✅ Todos os servidores abertos no navegador!', 'success');
        }
    } catch (error) {
        showToast('❌ Erro ao abrir servidores: ' + error.message, 'error');
    }
}

// Função para fechar todos os servidores
async function closeAllServers() {
    showToast('❌ Fechando todos os servidores...', 'info');
    
    try {
        await stopAllServers();
        showToast('✅ Todos os servidores fechados!', 'success');
    } catch (error) {
        showToast('❌ Erro ao fechar servidores: ' + error.message, 'error');
    }
}

// Função para editar configuração do backend
function editBackendConfig() {
    const commandElement = document.getElementById('backendCommand');
    const directoryElement = document.getElementById('backendDirectory');
    
    if (!commandElement || !directoryElement) return;
    
    // Criar inputs de edição
    const commandInput = document.createElement('input');
    commandInput.type = 'text';
    commandInput.value = commandElement.textContent;
    commandInput.className = 'bg-gray-800 text-blue-400 border border-gray-600 rounded px-2 py-1 text-xs w-full mb-2';
    
    const directoryInput = document.createElement('input');
    directoryInput.type = 'text';
    directoryInput.value = directoryElement.textContent;
    directoryInput.className = 'bg-gray-800 text-gray-300 border border-gray-600 rounded px-2 py-1 text-xs w-full';
    
    // Criar botões de ação
    const saveBtn = document.createElement('button');
    saveBtn.textContent = '💾 Salvar';
    saveBtn.className = 'bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs mt-2 mr-2';
    
    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = '❌ Cancelar';
    cancelBtn.className = 'bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs mt-2';
    
    // Substituir conteúdo
    const container = commandElement.parentElement.parentElement;
    const originalContent = container.innerHTML;
    
    container.innerHTML = '';
    container.appendChild(commandInput);
    container.appendChild(directoryInput);
    container.appendChild(saveBtn);
    container.appendChild(cancelBtn);
    
    // Event listeners
    saveBtn.onclick = () => {
        commandElement.textContent = commandInput.value;
        directoryElement.textContent = directoryInput.value;
        container.innerHTML = originalContent;
        showToast('✅ Configuração do backend atualizada!', 'success');
        
        // Salvar no localStorage
        localStorage.setItem('backendCommand', commandInput.value);
        localStorage.setItem('backendDirectory', directoryInput.value);
    };
    
    cancelBtn.onclick = () => {
        container.innerHTML = originalContent;
    };
    
    // Focar no primeiro input
    commandInput.focus();
}

// Função para editar configuração do frontend
function editFrontendConfig() {
    const commandElement = document.getElementById('frontendCommand');
    const directoryElement = document.getElementById('frontendDirectory');
    
    if (!commandElement || !directoryElement) return;
    
    // Criar inputs de edição
    const commandInput = document.createElement('input');
    commandInput.type = 'text';
    commandInput.value = commandElement.textContent;
    commandInput.className = 'bg-gray-800 text-blue-400 border border-gray-600 rounded px-2 py-1 text-xs w-full mb-2';
    
    const directoryInput = document.createElement('input');
    directoryInput.type = 'text';
    directoryInput.value = directoryElement.textContent;
    directoryInput.className = 'bg-gray-800 text-gray-300 border border-gray-600 rounded px-2 py-1 text-xs w-full';
    
    // Criar botões de ação
    const saveBtn = document.createElement('button');
    saveBtn.textContent = '💾 Salvar';
    saveBtn.className = 'bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs mt-2 mr-2';
    
    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = '❌ Cancelar';
    cancelBtn.className = 'bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs mt-2';
    
    // Substituir conteúdo
    const container = commandElement.parentElement.parentElement;
    const originalContent = container.innerHTML;
    
    container.innerHTML = '';
    container.appendChild(commandInput);
    container.appendChild(directoryInput);
    container.appendChild(saveBtn);
    container.appendChild(cancelBtn);
    
    // Event listeners
    saveBtn.onclick = () => {
        commandElement.textContent = commandInput.value;
        directoryElement.textContent = directoryInput.value;
        container.innerHTML = originalContent;
        showToast('✅ Configuração do frontend atualizada!', 'success');
        
        // Salvar no localStorage
        localStorage.setItem('frontendCommand', commandInput.value);
        localStorage.setItem('frontendDirectory', directoryInput.value);
    };
    
    cancelBtn.onclick = () => {
        container.innerHTML = originalContent;
    };
    
    // Focar no primeiro input
    commandInput.focus();
}

// Exportar funções para uso global
window.startBackendServer = startBackendServer;
window.stopBackendServer = stopBackendServer;
window.startFrontendDev = startFrontendDev;
window.stopFrontendDev = stopFrontendDev;
window.checkServerStatus = checkServerStatus;
window.openFrontendInNewTab = openFrontendInNewTab;
window.openBackendInNewTab = openBackendInNewTab;
window.openBackendDocumentation = openBackendDocumentation;
window.startAllServers = startAllServers;
window.stopAllServers = stopAllServers;
window.openAllServers = openAllServers;
window.closeAllServers = closeAllServers;
window.editBackendConfig = editBackendConfig;
window.editFrontendConfig = editFrontendConfig;

// Função para carregar configurações salvas
function loadSavedConfigurations() {
    // Carregar configurações do backend
    const savedBackendCommand = localStorage.getItem('backendCommand');
    const savedBackendDirectory = localStorage.getItem('backendDirectory');
    
    if (savedBackendCommand) {
        const commandElement = document.getElementById('backendCommand');
        if (commandElement) commandElement.textContent = savedBackendCommand;
    }
    
    if (savedBackendDirectory) {
        const directoryElement = document.getElementById('backendDirectory');
        if (directoryElement) directoryElement.textContent = savedBackendDirectory;
    }
    
    // Carregar configurações do frontend
    const savedFrontendCommand = localStorage.getItem('frontendCommand');
    const savedFrontendDirectory = localStorage.getItem('frontendDirectory');
    
    if (savedFrontendCommand) {
        const commandElement = document.getElementById('frontendCommand');
        if (commandElement) commandElement.textContent = savedFrontendCommand;
    }
    
    if (savedFrontendDirectory) {
        const directoryElement = document.getElementById('frontendDirectory');
        if (directoryElement) directoryElement.textContent = savedFrontendDirectory;
    }
}

// Verificar status inicial quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    // Carregar configurações salvas
    loadSavedConfigurations();
    
    setTimeout(checkServerStatus, 1000); // Verificar após 1 segundo
    
    // Verificar status a cada 10 segundos
    setInterval(checkServerStatus, 10000);
});

console.log('🚀 Módulo de controle dos servidores carregado');
