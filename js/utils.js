/**
 * 🛠️ Funções Utilitárias
 * Funções auxiliares para o sistema
 */

// Sistema de fila para toasts
let toastQueue = [];
let isProcessingQueue = false;

// Função para mostrar toast
function showToast(message, type = 'success') {
    const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) return;
    
    // Adicionar toast à fila
    toastQueue.push({ message, type });
    
    // Processar fila se não estiver sendo processada
    if (!isProcessingQueue) {
        processToastQueue();
    }
}

// Função para processar a fila de toasts
async function processToastQueue() {
    if (isProcessingQueue || toastQueue.length === 0) return;
    
    isProcessingQueue = true;
    
    while (toastQueue.length > 0) {
        const { message, type } = toastQueue.shift();
        await showSingleToast(message, type);
        
        // Aguardar um pouco antes de mostrar o próximo toast
        if (toastQueue.length > 0) {
            await new Promise(resolve => setTimeout(resolve, 200));
        }
    }
    
    isProcessingQueue = false;
}

// Função para limpar todos os toasts
function clearAllToasts() {
    const toastContainer = document.getElementById('toastContainer');
    if (toastContainer) {
        toastContainer.innerHTML = '';
    }
    toastQueue = [];
    isProcessingQueue = false;
}

// Função para limpar toast específico
function clearToast(toastId) {
    const toast = document.getElementById(toastId);
    if (toast) {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 300);
    }
}

// Função para mostrar um toast individual
function showSingleToast(message, type = 'success') {
    return new Promise((resolve) => {
        const toastContainer = document.getElementById('toastContainer');
        if (!toastContainer) {
            resolve();
            return;
        }
        
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        
        // Adicionar ID único para o toast
        const toastId = 'toast-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
        toast.id = toastId;
        
        toastContainer.appendChild(toast);
        
        // Mostrar toast com animação
        setTimeout(() => toast.classList.add('show'), 100);
        
        // Remover toast após 5 segundos
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.remove();
                }
                resolve();
            }, 300);
        }, 5000);
    });
}

// Função para formatar data
function formatDate(date) {
    return new Date(date).toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Função para formatar bytes
function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// Função para debounce
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Função para throttle
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Função para validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Função para validar senha
function isValidPassword(password) {
    return password && password.length >= 8;
}

// Função para copiar texto para clipboard
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        showToast('✅ Texto copiado para clipboard!', 'success');
    } catch (err) {
        showToast('❌ Erro ao copiar texto', 'error');
    }
}

// Função para gerar ID único
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Função para limpar formulário
function clearForm(formId) {
    const form = document.getElementById(formId);
    if (form) {
        form.reset();
        showToast('🧹 Formulário limpo com sucesso!', 'success');
    }
}

// Função para mostrar loading
function showLoading(elementId, message = 'Carregando...') {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = `
            <div class="text-center text-gray-400 py-8">
                <div class="text-4xl mb-2 animate-spin">⏳</div>
                <p>${message}</p>
            </div>
        `;
    }
}

// Função para esconder loading
function hideLoading(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = '';
    }
}

// Exportar funções para uso global
window.showToast = showToast;
window.clearAllToasts = clearAllToasts;
window.clearToast = clearToast;
window.formatDate = formatDate;
window.formatBytes = formatBytes;
window.debounce = debounce;
window.throttle = throttle;
window.isValidEmail = isValidEmail;
window.isValidPassword = isValidPassword;
window.copyToClipboard = copyToClipboard;
window.generateId = generateId;
window.clearForm = clearForm;
window.showLoading = showLoading;
window.hideLoading = hideLoading;

console.log('🛠️ Módulo de utilitários carregado');
